import Link from "next/link";
import { ArrowRight, Search, ShieldAlert } from "lucide-react";
import { retailPathGroups, retailPathHref } from "@/lib/retail-paths";

export const metadata = {
  title: "按工作场景开始",
  description: "按顾客症状、设置任务或服务判断进入 Apple Cookbook 的现场处理路径。"
};

export default function PathsPage() {
  return (
    <main className="bg-zinc-50 dark:bg-zinc-950">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-300">现场入口 · Retail Paths</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            先选顾客现在要完成的事。
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            不必先知道产品术语。按顾客正在描述的现象、想完成的设置，或需要判断的风险进入；随后再用具体症状缩小范围。
          </p>
          <Link
            href="/#site-search"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-950"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            直接输入顾客原话
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 sm:py-14">
        {retailPathGroups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-24" aria-labelledby={`${group.id}-title`}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className={group.id === "service" ? "text-sm font-semibold text-amber-800 dark:text-amber-200" : "text-sm font-semibold text-blue-700 dark:text-blue-300"}>
                  {group.eyebrow}
                </p>
                <h2 id={`${group.id}-title`} className="mt-1 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
                  {group.title}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">{group.description}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.paths.map((path) => (
                <Link
                  key={path.id}
                  href={retailPathHref(path)}
                  className={group.id === "service"
                    ? "group rounded-2xl border border-amber-200 bg-amber-50/70 p-5 transition hover:border-amber-300 hover:bg-amber-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-amber-900/70 dark:bg-amber-950/15 dark:hover:bg-amber-950/30"
                    : "group rounded-2xl bg-white p-5 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-900 dark:hover:bg-zinc-800"}
                >
                  {group.id === "service" ? <ShieldAlert className="h-5 w-5 text-amber-800 dark:text-amber-200" aria-hidden="true" /> : null}
                  <h3 className={group.id === "service" ? "mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50" : "text-base font-semibold text-zinc-950 dark:text-zinc-50"}>
                    {path.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{path.description}</p>
                  <span className={group.id === "service" ? "mt-5 inline-flex items-center gap-1 text-sm font-medium text-amber-800 dark:text-amber-200" : "mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-300"}>
                    开始确认
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
