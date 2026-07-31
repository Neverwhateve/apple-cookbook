export type AiConfig = {
  enabled: boolean;
  loggingEnabled: boolean;
  feedbackEnabled: boolean;
  dailyReportEnabled: boolean;
  apiKey?: string;
  baseUrl: string;
  model: string;
  timeoutMs: number;
  maxRetries: number;
  /** Maximum server-side model calls per UTC day. Zero fails closed. */
  dailyBudget: number;
  /** Operator-supplied prices in one chosen currency unit, per million tokens. */
  inputCostPerMillion: number;
  outputCostPerMillion: number;
};

function positiveInteger(value: string | undefined, fallback: number, maximum: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.min(Math.floor(parsed), maximum) : fallback;
}

function nonNegativeNumber(value: string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function getAiConfig(): AiConfig {
  const apiKey = process.env.DEEPSEEK_API_KEY?.trim();
  const requested = process.env.AI_ASSISTANT_ENABLED === "true";

  return {
    // AI is deliberately unavailable without both an opt-in flag and a key.
    enabled: requested && Boolean(apiKey),
    loggingEnabled: process.env.AI_LOGGING_ENABLED === "true",
    feedbackEnabled: process.env.AI_FEEDBACK_ENABLED === "true",
    dailyReportEnabled: process.env.AI_DAILY_REPORT_ENABLED === "true",
    apiKey,
    baseUrl: (process.env.DEEPSEEK_BASE_URL?.trim() || "https://api.deepseek.com").replace(/\/$/, ""),
    model: process.env.DEEPSEEK_MODEL?.trim() || "deepseek-v4-flash",
    timeoutMs: positiveInteger(process.env.DEEPSEEK_TIMEOUT_MS, 12_000, 60_000),
    maxRetries: positiveInteger(process.env.DEEPSEEK_MAX_RETRIES, 1, 3),
    dailyBudget: positiveInteger(process.env.DEEPSEEK_DAILY_BUDGET, 0, 100_000),
    inputCostPerMillion: nonNegativeNumber(process.env.DEEPSEEK_INPUT_COST_PER_MILLION),
    outputCostPerMillion: nonNegativeNumber(process.env.DEEPSEEK_OUTPUT_COST_PER_MILLION)
  };
}

export function publicAiAvailability() {
  const config = getAiConfig();
  return {
    enabled: config.enabled,
    feedbackEnabled: config.enabled && config.feedbackEnabled
  };
}
