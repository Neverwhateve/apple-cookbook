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
    description: "从顾客原话开始，找到下一个安全动作。",
    href: "#site-search",
    icon: CircleHelp
  },
  {
    title: "判断是否需要服务",
    description: "先识别安全、硬件、账户与数据风险。",
    href: "/service",
    icon: ShieldAlert
  },
  {
    title: "设置新设备",
    description: "迁移、更新、配对和开始使用。",
    href: "/paths#setup",
    icon: ClipboardCheck
  },
  {
    title: "提交新问题",
    description: "没有确定答案时，留下真实的顾客表述。",
    href: "/feedback",
    icon: FilePlus2
  }
];

export default function HomePage() {
  const articles = getPublishedArticles();
  const categories = getPublishedCategories(articles);
  const publishedArticles = getIndexableArticles(articles);
  const searchDocuments = getPublishedSearchDocuments(articles);
  const availableCategories = new Set(categories.filter((category) => category.items.length > 0).map((category) => category.name));
  const featuredArticles = publishedArticles.filter((article) => article.popular).sort(compareRecentArticles).slice(0, 3);
  const priorityArticles = (featuredArticles.length ? featuredArticles : [...publishedArticles].sort(compareRecentArticles)).slice(0, 3);

  return (
    <main className="bg-zinc-50 dark:bg-zinc-950">
      <section className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-300">Apple Cookbook · 现场问题处理</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-6xl">
              顾客在等。先找到下一步。
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300 sm:text-xl">
              输入顾客说的话、看到的提示或设备现象。Cookbook 会先给出最可能的安全路径，再带你完成处理。
            </p>
          </div>

          <div id="site-search" className="mx-auto mt-8 max-w-4xl scroll-mt-24 text-left">
            <SearchPanel articles={searchDocuments} />
          </div>

          <nav aria-label="现场快捷入口" className="mx-auto mt-5 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3">
            {symptomShortcuts.map((shortcut) => {
              const Icon = shortcut.icon;

              return (
                <Link
                  key={shortcut.label}
                  href={`/?q=${encodeURIComponent(shortcut.query)}#site-search`}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <Icon className="h-4 w-4 flex-none text-zinc-500 transition group-hover:text-blue-700 dark:group-hover:text-blue-300" aria-hidden="true" />
                  {shortcut.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      <section aria-labelledby="mode-title" className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">选择你的工作方式</p>
              <h2 id="mode-title" className="mt-1 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
                先处理，再阅读
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">不同问题有不同边界。先进入正确的工作方式，避免随机尝试。</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {workingModes.map((mode) => {
              const Icon = mode.icon;

              return (
                <Link
                  key={mode.title}
                  href={mode.href}
                  className="group rounded-2xl bg-white p-5 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                >
                  <Icon className="h-5 w-5 text-blue-700 dark:text-blue-300" aria-hidden="true" />
                  <h3 className="mt-5 text-base font-semibold text-zinc-950 dark:text-zinc-50">{mode.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{mode.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-300">
                    开始
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CaseShelf />

      <section aria-labelledby="priority-title" className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">从常见案例开始</p>
              <h2 id="priority-title" className="mt-1 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
                常用现场路径
              </h2>
            </div>
            <Link href="/categories" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-300">
              按设备浏览
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {priorityArticles.map((article) => (
              <ArticleCard key={article.route} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="service-title" className="border-y border-zinc-200 bg-amber-50/70 dark:border-zinc-800 dark:bg-amber-950/10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex gap-4">
            <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">需要服务判断？</p>
              <h2 id="service-title" className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">先识别红灯，而不是继续试错。</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                出现安全警告、无法稳定使用、账户或数据风险时，先从最接近的案例进入服务与进一步支持路径。
              </p>
            </div>
          </div>
          <Link
            href="/service"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-950"
          >
            开始服务判断
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="products-title" className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">需要按设备缩小范围时</p>
              <h2 id="products-title" className="mt-1 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">浏览产品</h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">设备是筛选条件，不是现场处理的第一步。</p>
          </div>
          <nav aria-label="产品支持" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {productItems.filter((product) => availableCategories.has(product.category)).map((product) => {
              const Icon = product.icon;

              return (
                <Link
                  key={product.category}
                  href={`/categories/${encodeURIComponent(product.category)}`}
                  className="group flex min-h-28 flex-col justify-between rounded-2xl bg-zinc-50 p-4 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                >
                  <Icon className="h-6 w-6 text-zinc-600 transition group-hover:text-blue-700 dark:text-zinc-300 dark:group-hover:text-blue-300" aria-hidden="true" />
                  <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{product.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 flex justify-end">
            <Link href="/feedback" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
              没有找到确定答案？提交真实顾客问题
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
