import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  BellRing,
  CircleHelp,
  ClipboardCheck,
  FilePlus2,
  Headphones,
  Laptop,
  LockKeyhole,
  ShieldAlert,
  Smartphone,
  Tablet,
  Wifi
} from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { CaseShelf } from "@/components/case-shelf";
import { SearchPanel } from "@/components/search-panel";
import {
  getIndexableArticles,
  getPublishedArticles,
  getPublishedCategories,
  getPublishedSearchDocuments
} from "@/lib/cookbook";
import { compareRecentArticles } from "@/lib/recent-sort";

const productItems = [
  { label: "iPhone", category: "iPhone", icon: Smartphone },
  { label: "Mac", category: "Mac", icon: Laptop },
  { label: "iPad", category: "iPad", icon: Tablet },
  { label: "Apple Watch", category: "Apple Watch", icon: BellRing },
  { label: "AirPods", category: "AirPods", icon: Headphones }
];

const symptomShortcuts = [
  { label: "设备发热", query: "我的 iPhone 很烫", icon: BatteryCharging },
  { label: "电池不耐用", query: "电池耗电很快", icon: BatteryCharging },
  { label: "无法连接", query: "无法连接", icon: Wifi },
  { label: "收不到通知", query: "收不到通知", icon: BellRing },
  { label: "Mac 很慢", query: "我的 Mac 很慢", icon: Laptop },
  { label: "账户或密码", query: "忘记密码 无法登录", icon: LockKeyhole }
];

const workingModes = [
  {
    title: "解决一个问题",
    description: "从顾客原话开始。",
    href: "#site-search",
    icon: CircleHelp,
    tone: "blue"
  },
  {
    title: "判断是否需要服务",
    description: "先识别红灯与风险。",
    href: "/service",
    icon: ShieldAlert,
    tone: "amber"
  },
  {
    title: "设置新设备",
    description: "迁移、配对和开始使用。",
    href: "/paths#setup",
    icon: ClipboardCheck,
    tone: "blue"
  },
  {
    title: "提交新问题",
    description: "留下真实的顾客表述。",
    href: "/feedback",
    icon: FilePlus2,
    tone: "blue"
  }
] as const;

export default function HomePage() {
  const articles = getPublishedArticles();
  const categories = getPublishedCategories(articles);
  const publishedArticles = getIndexableArticles(articles);
  const searchDocuments = getPublishedSearchDocuments(articles);
  const availableCategories = new Set(categories.filter((category) => category.items.length > 0).map((category) => category.name));
  const featuredArticles = publishedArticles.filter((article) => article.popular).sort(compareRecentArticles).slice(0, 3);
  const priorityArticles = (featuredArticles.length ? featuredArticles : [...publishedArticles].sort(compareRecentArticles)).slice(0, 3);

  return (
    <main className="min-h-[calc(100vh-4.25rem)] bg-[#f5f5f7] py-3 dark:bg-black sm:py-5">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <section className="grid gap-3 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)]" aria-labelledby="home-title">
          <div className="rounded-[24px] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.035)] dark:bg-zinc-900 sm:p-9">
            <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
              Apple Cookbook · 现场问题处理
            </p>
            <h1 id="home-title" className="mt-5 max-w-lg text-[2.45rem] font-semibold leading-[1.05] tracking-[-0.055em] text-zinc-950 dark:text-zinc-50 sm:text-6xl">
              顾客在等。<br />先找到下一步。
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base">
              输入顾客说的话、看到的提示或设备现象。Cookbook 会先给出最可能的安全路径，再带你完成处理。
            </p>
            <nav aria-label="现场快捷入口" className="mt-7 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {symptomShortcuts.map((shortcut) => {
                const Icon = shortcut.icon;

                return (
                  <Link
                    key={shortcut.label}
                    href={`/?q=${encodeURIComponent(shortcut.query)}#site-search`}
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#f5f5f7] px-3 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  >
                    <Icon className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    {shortcut.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div id="site-search" className="scroll-mt-24">
            <SearchPanel articles={searchDocuments} />
          </div>
        </section>

        <section className="mt-3" aria-labelledby="mode-title">
          <div className="mb-3 flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">选择你的工作方式</p>
              <h2 id="mode-title" className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
                先处理，再阅读
              </h2>
            </div>
            <p className="hidden max-w-sm text-right text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:block">先进入正确的工作方式，避免在顾客面前随机尝试。</p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {workingModes.map((mode) => {
              const Icon = mode.icon;
              const iconClass = mode.tone === "amber"
                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200"
                : "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300";

              return (
                <Link
                  key={mode.title}
                  href={mode.href}
                  className="group flex min-h-44 flex-col justify-between rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:p-5"
                >
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">{mode.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-zinc-500 dark:text-zinc-400">{mode.description}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
                      开始 <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <CaseShelf />

      <div className="mx-auto max-w-6xl px-3 pb-3 sm:px-6">
        <section aria-labelledby="priority-title" className="rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.035)] dark:bg-zinc-900 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">从常见案例开始</p>
              <h2 id="priority-title" className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">常用现场路径</h2>
            </div>
            <Link href="/categories" className="inline-flex min-h-10 items-center gap-1 rounded-full bg-[#f5f5f7] px-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 dark:bg-zinc-800 dark:text-blue-300 dark:hover:bg-zinc-700">
              按设备浏览 <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {priorityArticles.map((article) => <ArticleCard key={article.route} article={article} />)}
          </div>
        </section>

        <section aria-labelledby="service-title" className="mt-3 grid gap-5 rounded-[24px] bg-[#fff8ec] p-5 dark:bg-amber-950/20 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex gap-3">
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"><ShieldAlert className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <p className="text-xs font-semibold tracking-wide text-amber-800 dark:text-amber-200">需要服务判断？</p>
              <h2 id="service-title" className="mt-1 text-xl font-semibold tracking-[-0.035em] text-zinc-950 dark:text-zinc-50">先识别红灯，而不是继续试错。</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">出现安全警告、无法稳定使用、账户或数据风险时，先停止一般排查。</p>
            </div>
          </div>
          <Link href="/service" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-950">
            开始服务判断 <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section aria-labelledby="products-title" className="mt-3 rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.035)] dark:bg-zinc-900 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">需要按设备缩小范围时</p>
              <h2 id="products-title" className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">浏览产品</h2>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">设备是筛选条件，不是第一步。</p>
          </div>
          <nav aria-label="产品支持" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {productItems.filter((product) => availableCategories.has(product.category)).map((product) => {
              const Icon = product.icon;
              return <Link key={product.category} href={`/categories/${encodeURIComponent(product.category)}`} className="group flex min-h-28 flex-col justify-between rounded-2xl bg-[#f5f5f7] p-4 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-800 dark:hover:bg-zinc-700"><Icon className="h-6 w-6 text-zinc-500 transition group-hover:text-blue-700 dark:group-hover:text-blue-300" aria-hidden="true" /><span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{product.label}</span></Link>;
            })}
          </nav>
          <Link href="/feedback" className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-blue-700 dark:text-zinc-400 dark:hover:text-blue-300">没有找到确定答案？提交真实顾客问题 <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
        </section>
      </div>
    </main>
  );
}
