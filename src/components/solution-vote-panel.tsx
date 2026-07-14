"use client";

import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { VerificationLevel } from "@/lib/article-schema";
import { rankSolutionsByPractice } from "@/lib/solution-ranking";

type VoteableSolution = {
  id: string;
  title: string;
  verificationLevel: VerificationLevel;
};

const voterIdStorageKey = "apple-cookbook-solution-voter-id";
const votedSolutionsStorageKey = "apple-cookbook-solution-votes";

function getVoterId() {
  const existing = window.localStorage.getItem(voterIdStorageKey);
  if (existing) return existing;

  const created = `browser_${crypto.randomUUID().replaceAll("-", "")}`;
  window.localStorage.setItem(voterIdStorageKey, created);
  return created;
}

function getLocallyVotedSolutions() {
  try {
    const value = JSON.parse(window.localStorage.getItem(votedSolutionsStorageKey) ?? "[]") as unknown;
    return new Set(Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);
  } catch {
    return new Set<string>();
  }
}

function rememberVote(key: string, votedSolutions: Set<string>) {
  const next = new Set(votedSolutions).add(key);
  window.localStorage.setItem(votedSolutionsStorageKey, JSON.stringify([...next]));
  return next;
}

function trustLabel(level: VerificationLevel) {
  if (level === "Official") return "Apple 官方";
  if (level === "Verified") return "同事实践";
  return "补充方法";
}

export function SolutionVotePanel({
  articleId,
  solutions
}: {
  articleId: string;
  solutions: VoteableSolution[];
}) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [countsStatus, setCountsStatus] = useState<"loading" | "ready" | "error">("loading");
  const [votedSolutions, setVotedSolutions] = useState<Set<string>>(new Set());
  const [submittingId, setSubmittingId] = useState<string>();
  const [message, setMessage] = useState("");
  const rankedSolutions = rankSolutionsByPractice(solutions, counts);

  useEffect(() => {
    setVotedSolutions(getLocallyVotedSolutions());

    const controller = new AbortController();
    fetch(`/api/solution-votes?articleId=${encodeURIComponent(articleId)}`, {
      cache: "no-store",
      signal: controller.signal
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("count request failed");
        const data = (await response.json()) as { counts?: Record<string, number> };
        setCounts(data.counts ?? {});
        setCountsStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCountsStatus("error");
        setMessage("暂时无法读取实践人数，稍后刷新即可重试。");
      });

    return () => controller.abort();
  }, [articleId]);

  async function recordVote(solutionId: string) {
    const key = `${articleId}/${solutionId}`;
    if (votedSolutions.has(key) || submittingId) return;

    setSubmittingId(solutionId);
    setMessage("");

    try {
      const response = await fetch("/api/solution-votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, solutionId, voterId: getVoterId() })
      });
      const data = (await response.json()) as { count?: number; error?: string };
      const recordedCount = data.count;

      if (!response.ok || typeof recordedCount !== "number") {
        throw new Error(data.error || "vote request failed");
      }

      setCounts((current) => ({ ...current, [solutionId]: recordedCount }));
      setCountsStatus("ready");
      setVotedSolutions((current) => rememberVote(key, current));
      setMessage("已记录你的实践反馈，谢谢分享。");
    } catch (error) {
      setMessage(error instanceof Error && error.message.includes("暂时") ? error.message : "暂时无法记录，请稍后重试。");
    } finally {
      setSubmittingId(undefined);
    }
  }

  return (
    <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="solution-votes-title">
      <h2 id="solution-votes-title" className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
        哪些方法实践有效？
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        Apple 官方方法始终优先；其他方法按实践有效人数从高到低排列。如果你亲自使用过某个方法并确认有效，可以点一下。每台浏览器对每个方法只记录一次，不公开姓名。
      </p>

      <div className="mt-5 space-y-3">
        {rankedSolutions.map((solution) => {
          const key = `${articleId}/${solution.id}`;
          const voted = votedSolutions.has(key);
          const count = counts[solution.id] ?? 0;

          return (
            <div
              key={solution.id}
              className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {trustLabel(solution.verificationLevel)}
                </span>
                <h3 className="mt-1 text-sm font-semibold leading-6 text-zinc-950 dark:text-zinc-50">{solution.title}</h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {countsStatus === "loading"
                    ? "正在读取实践反馈"
                    : countsStatus === "error"
                      ? "实践人数暂不可用"
                      : count > 0
                        ? `${count} 人实践有效`
                        : "还没有同事实践反馈"}
                </p>
              </div>
              <button
                type="button"
                disabled={voted || Boolean(submittingId)}
                aria-pressed={voted}
                onClick={() => recordVote(solution.id)}
                className="inline-flex min-h-10 flex-none items-center justify-center gap-2 rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-800 transition hover:border-blue-500 hover:text-blue-600 disabled:cursor-default disabled:border-emerald-300 disabled:bg-emerald-50 disabled:text-emerald-700 dark:border-zinc-700 dark:text-zinc-200 dark:disabled:border-emerald-900 dark:disabled:bg-emerald-950/30 dark:disabled:text-emerald-300"
              >
                <ThumbsUp aria-hidden="true" className="h-4 w-4" />
                {submittingId === solution.id ? "记录中" : voted ? "已实践有效" : "我也实践有效"}
              </button>
            </div>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-3 min-h-5 text-sm text-zinc-500 dark:text-zinc-400">
        {message}
      </p>
    </section>
  );
}
