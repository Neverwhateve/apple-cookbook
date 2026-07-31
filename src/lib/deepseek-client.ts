import { getAiConfig } from "./ai-config.ts";

export type DeepSeekUsage = {
  inputTokens: number | null;
  outputTokens: number | null;
};

export class DeepSeekError extends Error {
  constructor(
    message: string,
    readonly code: "disabled" | "budget" | "timeout" | "network" | "http" | "invalid_response",
    readonly retryable = false
  ) {
    super(message);
    this.name = "DeepSeekError";
  }
}

function extractJson(content: string) {
  const withoutFence = content.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");
  if (start < 0 || end < start) throw new DeepSeekError("Model did not return a JSON object.", "invalid_response");

  try {
    return JSON.parse(withoutFence.slice(start, end + 1)) as unknown;
  } catch {
    throw new DeepSeekError("Model returned invalid JSON.", "invalid_response");
  }
}

export async function requestDeepSeekJson(system: string, user: string) {
  const config = getAiConfig();
  if (!config.enabled || !config.apiKey) throw new DeepSeekError("AI assistant is disabled.", "disabled");

  let lastError: DeepSeekError | undefined;
  for (let attempt = 0; attempt <= config.maxRetries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.timeoutMs);
    const startedAt = Date.now();

    try {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: config.model,
          temperature: 0,
          // The provider recommends an explicit ceiling for JSON output so a
          // structured response cannot be cut off mid-object.
          max_tokens: 1_000,
          response_format: { type: "json_object" },
          // V4 Flash may otherwise spend its whole completion budget on
          // reasoning_content and leave message.content empty. We only need
          // the JSON result for this deterministic classification request.
          thinking: { type: "disabled" },
          messages: [
            { role: "system", content: system },
            { role: "user", content: user }
          ]
        }),
        signal: controller.signal
      });
      const latencyMs = Date.now() - startedAt;

      if (!response.ok) {
        const retryable = response.status === 429 || response.status >= 500;
        throw new DeepSeekError(`DeepSeek returned HTTP ${response.status}.`, "http", retryable);
      }

      const payload = (await response.json()) as {
        choices?: { message?: { content?: unknown } }[];
        usage?: { prompt_tokens?: unknown; completion_tokens?: unknown };
      };
      const content = payload.choices?.[0]?.message?.content;
      if (typeof content !== "string") throw new DeepSeekError("DeepSeek response had no message content.", "invalid_response");

      return {
        value: extractJson(content),
        latencyMs,
        usage: {
          inputTokens: typeof payload.usage?.prompt_tokens === "number" ? payload.usage.prompt_tokens : null,
          outputTokens: typeof payload.usage?.completion_tokens === "number" ? payload.usage.completion_tokens : null
        } satisfies DeepSeekUsage
      };
    } catch (error) {
      const normalized =
        error instanceof DeepSeekError
          ? error
          : error instanceof DOMException && error.name === "AbortError"
            ? new DeepSeekError("DeepSeek request timed out.", "timeout", true)
            : new DeepSeekError("DeepSeek network request failed.", "network", true);
      lastError = normalized;
      if (!normalized.retryable || attempt === config.maxRetries) break;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError ?? new DeepSeekError("DeepSeek request failed.", "network");
}
