type FeedbackTriggerResult =
  | { status: "dispatched" }
  | { status: "queued"; reason: string };

const defaultRepository = "Neverwhateve/apple-cookbook";
const defaultWorkflow = "sync-feedback-intake.yml";

function validRepository(value: string) {
  return /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value);
}

export async function triggerFeedbackProcessing(feedbackId: string): Promise<FeedbackTriggerResult> {
  const token = process.env.APPLE_COOKBOOK_GITHUB_TOKEN?.trim();
  const repository = (process.env.APPLE_COOKBOOK_GITHUB_REPOSITORY || defaultRepository).trim();
  const workflow = (process.env.APPLE_COOKBOOK_FEEDBACK_WORKFLOW || defaultWorkflow).trim();

  if (!token) {
    return { status: "queued", reason: "GitHub 即时触发凭据未配置" };
  }

  if (!validRepository(repository) || !workflow) {
    return { status: "queued", reason: "GitHub 即时触发配置无效" };
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/actions/workflows/${encodeURIComponent(workflow)}/dispatches`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "apple-cookbook-feedback",
          "X-GitHub-Api-Version": "2022-11-28"
        },
        body: JSON.stringify({
          ref: "main",
          inputs: { feedback_id: feedbackId }
        }),
        signal: AbortSignal.timeout(5_000)
      }
    );

    if (!response.ok) {
      console.error("Immediate feedback workflow dispatch failed.", {
        feedbackId,
        status: response.status
      });
      return { status: "queued", reason: `GitHub 即时触发返回 ${response.status}` };
    }

    return { status: "dispatched" };
  } catch (error) {
    console.error("Immediate feedback workflow dispatch failed.", { feedbackId, error });
    return { status: "queued", reason: "GitHub 即时触发暂时不可用" };
  }
}
