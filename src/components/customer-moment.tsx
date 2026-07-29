import { Lightbulb, Presentation } from "lucide-react";
import type { CustomerMoment } from "@/lib/customer-moments";

export function CustomerMomentCard({ moment }: { moment: CustomerMoment }) {
  return (
    <aside className="mt-12 rounded-2xl border border-violet-200 bg-violet-50/70 p-5 dark:border-violet-900/70 dark:bg-violet-950/20" aria-labelledby="customer-moment-title">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200">
          <Presentation className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-wide text-violet-800 dark:text-violet-200">可选的顾客教育</p>
          <h2 id="customer-moment-title" className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            {moment.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{moment.description}</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-white/80 p-4 dark:bg-zinc-950/60">
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          <Lightbulb className="h-4 w-4 text-violet-700 dark:text-violet-300" aria-hidden="true" />
          店内演示
        </div>
        <ol className="mt-3 space-y-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          {moment.demo.map((step, index) => (
            <li key={step} className="flex gap-2">
              <span className="font-semibold text-violet-800 dark:text-violet-200">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-3 rounded-xl border border-violet-200 bg-white/60 p-3 text-sm leading-6 text-zinc-700 dark:border-violet-900/70 dark:bg-zinc-950/40 dark:text-zinc-300">
        <span className="font-semibold text-zinc-950 dark:text-zinc-50">结束前请顾客自己试一次：</span> {moment.completionCheck}
      </div>
      <blockquote className="mt-4 border-l-2 border-violet-500 pl-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        {moment.talkingPoint}
      </blockquote>
      <p className="mt-3 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
        只在问题已稳定、顾客愿意继续了解时使用；不要在服务、账户、安全或挫折场景中打断处理。
      </p>
    </aside>
  );
}
