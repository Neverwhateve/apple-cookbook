"use client";

import { Check, ChevronRight, MessageCircleQuestion, ShieldAlert } from "lucide-react";
import { useState } from "react";
import type { ArticleSolution } from "@/lib/article-schema";
import { getCaseGuide } from "@/lib/case-guide";
import { customerExplanationFor } from "@/lib/customer-explanation";
import { VerificationBadge } from "@/components/verification-badge";

type ArticleQuickStartProps = {
  solution: ArticleSolution;
  detailsHref?: string;
  title: string;
  articleSummary: string;
  tags: readonly string[];
  symptoms: readonly string[];
  escalationSteps?: readonly string[];
};

/**
 * A small, deliberately constrained retail workflow. The authored solution
 * remains the source of truth; this only puts the first safe decision in the
 * employee's line of sight while a customer is waiting.
 */
export function ArticleQuickStart({ solution, detailsHref, title, articleSummary, tags, symptoms, escalationSteps = [] }: ArticleQuickStartProps) {
  const initialSteps = solution.steps.slice(0, 3);
  const [stepIndex, setStepIndex] = useState(0);

  if (initialSteps.length === 0) return null;

  const currentStep = initialSteps[stepIndex];
  const hasNextStep = stepIndex < initialSteps.length - 1;
  const customerScript = customerExplanationFor({ solutionSummary: solution.summary, articleSummary, title });
  const caseGuide = getCaseGuide({ title, tags, symptoms });
  const escalationSummary = escalationSteps[0];
  const warningSummary = solution.warnings[0];

  return (
    <section
      aria-labelledby="quick-start-title"
      className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 shadow-sm dark:border-blue-900 dark:bg-blue-950/25"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">现场处理 · Case Mode</p>
          <h2 id="quick-start-title" className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            先问、再做一个安全动作
          </h2>
        </div>
        <VerificationBadge level={solution.verificationLevel} compact />
      </div>

      <div className="mt-4 rounded-xl bg-white/80 p-4 dark:bg-zinc-950/60">
        <div className="flex items-start gap-2">
          <MessageCircleQuestion className="mt-0.5 h-4 w-4 flex-none text-blue-700 dark:text-blue-300" aria-hidden="true" />
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">先确认这三件事</h3>
            <ol className="mt-2 space-y-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              {caseGuide.questions.map((question, index) => (
                <li key={question} className="flex gap-2">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">{index + 1}.</span>
                  <span>{question}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        {symptoms.length > 0 ? (
          <p className="mt-3 border-t border-blue-100 pt-3 text-xs leading-5 text-zinc-600 dark:border-blue-950 dark:text-zinc-400">
            这条路径适合：{symptoms.slice(0, 3).join("、")}
          </p>
        ) : null}
      </div>

      <div className="mt-4" aria-live="polite">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">现在做</h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">第 {stepIndex + 1} / {initialSteps.length} 步</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-zinc-800 dark:text-zinc-200">{currentStep}</p>
        {hasNextStep ? (
          <button
            type="button"
            onClick={() => setStepIndex((index) => Math.min(index + 1, initialSteps.length - 1))}
            className="mt-3 inline-flex min-h-11 items-center gap-1 rounded-full bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
          >
            已完成，下一步
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <Check className="h-4 w-4" aria-hidden="true" />
            已完成初步安全检查；按结果决定继续、观察或服务。
          </p>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-3 dark:border-amber-900/70 dark:bg-amber-950/20">
        <div className="flex gap-2">
          <ShieldAlert className="mt-0.5 h-4 w-4 flex-none text-amber-700 dark:text-amber-300" aria-hidden="true" />
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              {escalationSummary ? "停止常规排查并升级处理" : "先不要随机尝试"}
            </h3>
            <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              {escalationSummary
                ? `出现以下情况时，停止常规排查并进入服务或进一步支持路径：${escalationSummary}`
                : warningSummary ?? "如果出现安全警告、无法稳定使用、账户或数据风险，请停止常规排查并查看完整升级处理。"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 border-l-2 border-blue-500 pl-3">
        <h3 className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">可以这样向顾客解释</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">“{customerScript}”</p>
      </div>

      {detailsHref ? (
        <a
          href={detailsHref}
          className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-300 dark:focus-visible:ring-offset-zinc-950"
        >
          查看完整步骤、条件与升级处理
        </a>
      ) : null}
    </section>
  );
}
