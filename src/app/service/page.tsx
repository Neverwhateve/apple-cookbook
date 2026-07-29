import Link from "next/link";
import { ArrowRight, ClipboardList, LockKeyhole, ShieldAlert, TriangleAlert } from "lucide-react";

const triageChecks = [
  {
    title: "先停下来：安全或物理异常",
    description: "电池鼓包、冒烟、异常高温、进液、破损或设备无法安全使用时，不要继续进行一般设置或软件排查。",
    icon: TriangleAlert
  },
  {
    title: "先保护：账户、隐私或数据风险",
    description: "Apple 账户、激活锁、密码、付款或可能的数据风险，不要以“试试看”为由要求顾客提供凭证或执行抹掉操作。",
    icon: LockKeyhole
  },
  {
    title: "先记录：已经确认的事实",
    description: "记录机型、系统版本、开始时间、可复现条件、屏幕提示和已完成步骤。下一位同事不应从头再问一次。",
    icon: ClipboardList
  }
];

export default function ServicePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50 px-4 py-10 dark:bg-zinc-950 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold tracking-wide text-amber-800 dark:text-amber-200">服务判断 · Service Triage</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          先识别红灯，再决定下一步。
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          这不是替代诊断的服务清单。它帮助你在顾客面前先停止不安全的尝试、保护账户和数据，并带着清楚的事实进入下一条路径。
        </p>

        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/70 dark:bg-amber-950/20" aria-labelledby="stop-title">
          <div className="flex gap-3">
            <ShieldAlert className="mt-1 h-6 w-6 flex-none text-amber-800 dark:text-amber-200" aria-hidden="true" />
            <div>
              <h2 id="stop-title" className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">遇到这些情况，停止常规排查</h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                <li>• 安全或物理异常：异常高温、鼓包、冒烟、进液、破损或无法安全使用。</li>
                <li>• 设备无法稳定使用：无法完成启动、持续意外重启、明显图像异常或触控无法正常使用。</li>
                <li>• 账户、激活锁、隐私、付款或数据风险：不要猜测、不要求共享密码，也不要在没有计划的情况下抹掉设备。</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="服务判断原则">
          {triageChecks.map((check) => {
            const Icon = check.icon;

            return (
              <div key={check.title} className="rounded-2xl bg-white p-5 dark:bg-zinc-900">
                <Icon className="h-5 w-5 text-amber-800 dark:text-amber-200" aria-hidden="true" />
                <h2 className="mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50">{check.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{check.description}</p>
              </div>
            );
          })}
        </section>

        <section className="mt-10 rounded-2xl bg-white p-6 dark:bg-zinc-900" aria-labelledby="next-title">
          <h2 id="next-title" className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">接下来怎么做</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            <li><span className="font-semibold text-zinc-950 dark:text-zinc-50">1.</span> 用顾客实际看到的现象和提示搜索最接近的案例。</li>
            <li><span className="font-semibold text-zinc-950 dark:text-zinc-50">2.</span> 在案例页确认服务边界和已完成的安全步骤。</li>
            <li><span className="font-semibold text-zinc-950 dark:text-zinc-50">3.</span> 向顾客说明：你已确认什么、为什么现在不建议继续试错、下一步会发生什么。</li>
          </ol>
          <Link
            href="/#site-search"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900"
          >
            搜索具体症状
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </section>
    </main>
  );
}
