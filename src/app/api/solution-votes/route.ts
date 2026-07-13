import { NextRequest, NextResponse } from "next/server";
import { getPublishedArticles } from "@/lib/cookbook";
import {
  getSolutionVoteCounts,
  getSolutionVoteStorageUnavailableReason,
  recordSolutionVote
} from "@/lib/solution-votes";

export const dynamic = "force-dynamic";

function getVoteableArticle(articleId: string) {
  return getPublishedArticles().find((article) => article.id === articleId);
}

function voteableSolutions(articleId: string) {
  return (
    getVoteableArticle(articleId)?.solutions
      .filter((solution) => solution.kind !== "escalation" && solution.steps.length > 0)
      .map(({ id, verificationLevel }) => ({ id, verificationLevel })) ?? []
  );
}

function addShareAuthorBaselines(
  counts: Record<string, number>,
  solutions: ReturnType<typeof voteableSolutions>
) {
  return Object.fromEntries(
    solutions.map((solution) => [
      solution.id,
      (counts[solution.id] ?? 0) + (solution.verificationLevel === "Verified" ? 1 : 0)
    ])
  );
}

function noStoreJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export async function GET(request: NextRequest) {
  const articleId = request.nextUrl.searchParams.get("articleId") ?? "";
  const solutions = voteableSolutions(articleId);

  if (!articleId || solutions.length === 0) {
    return noStoreJson({ error: "Article or voteable solutions not found." }, 404);
  }

  try {
    const counts = await getSolutionVoteCounts(
      articleId,
      solutions.map((solution) => solution.id)
    );
    return noStoreJson({ counts: addShareAuthorBaselines(counts, solutions) });
  } catch (error) {
    console.error("Solution vote counts could not be read.", { error });
    return noStoreJson({ error: "暂时无法读取实践反馈。" }, 500);
  }
}

export async function POST(request: NextRequest) {
  const storageUnavailableReason = getSolutionVoteStorageUnavailableReason();
  if (storageUnavailableReason) return noStoreJson({ error: storageUnavailableReason }, 503);

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const articleId = typeof body.articleId === "string" ? body.articleId : "";
    const solutionId = typeof body.solutionId === "string" ? body.solutionId : "";
    const voterId = typeof body.voterId === "string" ? body.voterId : "";

    const solution = voteableSolutions(articleId).find((item) => item.id === solutionId);
    if (!solution) {
      return noStoreJson({ error: "Article or solution not found." }, 404);
    }

    const result = await recordSolutionVote(articleId, solutionId, voterId);
    return noStoreJson({
      ...result,
      count: result.count + (solution.verificationLevel === "Verified" ? 1 : 0)
    });
  } catch (error) {
    if (error instanceof SyntaxError || (error instanceof Error && /^Invalid /.test(error.message))) {
      return noStoreJson({ error: "实践反馈格式无效。" }, 400);
    }

    console.error("Solution vote could not be persisted.", { error });
    return noStoreJson({ error: "暂时无法记录实践反馈，请稍后重试。" }, 500);
  }
}
