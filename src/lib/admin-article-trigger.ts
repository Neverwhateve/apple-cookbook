type AdminArticleTriggerResult =
  | { status: "dispatched" }
  | { status: "queued"; reason: string };

const defaultRepository = "Neverwhateve/apple-cookbook";
const defaultWorkflow = "publish-admin-article-edit.yml";

function validRepository(value: string) {
  return /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value);
}

export async function triggerAdminArticlePublication(proposalId: string): Promise<AdminArticleTriggerResult> {
  const token = process.env.APPLE_COOKBOOK_GITHUB_TOKEN?.trim();
  const repository = (process.env.APPLE_COOKBOOK_GITHUB_REPOSITORY || defaultRepository).trim();
  const workflow = (process.env.APPLE_COOKBOOK_ADMIN_EDIT_WORKFLOW || defaultWorkflow).trim();

  if (!token) {
    return { status: "queued", reason: "GitHub 即时触发凭据未配置，将由定时任务发布" };
  }

  if (!validRepository(repository) || !workflow) {
    return { status: "queued", reason: "GitHub 管理员编辑发布配置无效" };
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
          "User-Agent": "apple-cookbook-admin-edit",
          "X-GitHub-Api-Version": "2022-11-28"
        },
        body: JSON.stringify({
          ref: "main",
          inputs: { proposal_id: proposalId }
        }),
        signal: AbortSignal.timeout(5_000)
      }
    );

    if (!response.ok) {
      console.error("Admin article publication dispatch failed.", {
        proposalId,
        status: response.status
      });
      return { status: "queued", reason: `GitHub 即时触发返回 ${response.status}，将由定时任务发布` };
    }

    return { status: "dispatched" };
  } catch (error) {
    console.error("Admin article publication dispatch failed.", { proposalId, error });
    return { status: "queued", reason: "GitHub 即时触发暂时不可用，将由定时任务发布" };
  }
}
