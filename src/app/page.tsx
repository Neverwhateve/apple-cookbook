import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Cable,
  FilePlus2,
  Folder,
  Laptop,
  Layers3,
  LockKeyhole,
  Router,
  ShieldCheck,
  Smartphone,
  Tags
} from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { SearchPanel } from "@/components/search-panel";
import { getAllArticles, getAllCategories, getAllTags } from "@/lib/cookbook";

function AppleWatchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      <path d="M12.5 5.5h7l1 4h-9z" />
      <rect x="9" y="9" width="14" height="14" rx="4" />
      <path d="M11.5 23h9l-1 4h-7z" />
      <path d="M23.5 14.5h1.5v3h-1.5" />
      <path d="M14 13.5h4" />
      <path d="M14 18.5h4" />
    </svg>
  );
}

function AirPodsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      <path d="M9.5 7.5a4 4 0 0 0-4 4v1.25a3.25 3.25 0 0 0 6.5 0v-1.5a3.75 3.75 0 0 0-2.5-3.75Z" />
      <path d="M9 15.5v9a2 2 0 0 0 4 0v-9.75" />
      <path d="M22.5 7.5a4 4 0 0 1 4 4v1.25a3.25 3.25 0 0 1-6.5 0v-1.5a3.75 3.75 0 0 1 2.5-3.75Z" />
      <path d="M23 15.5v9a2 2 0 0 1-4 0v-9.75" />
    </svg>
  );
}

const topicGroups = [
  {
    name: "账号与家庭",
    description: "Apple ID、家人共享、屏幕使用时间和购买请求",
    href: "/categories/Apple%20ID",
    match: ["Apple ID", "Family Sharing", "Screen Time"],
    icon: LockKeyhole
  },
  {
    name: "联网与蜂窝",
    description: "Wi-Fi、个人热点、SIM、eSIM 和运营商网络",
    href: "/categories/Networking",
    match: ["Networking", "Cellular", "SIM", "eSIM", "Carrier", "Network"],
    icon: Router
  },
  {
    name: "设备连接",
    description: "AirDrop、AirPods、Apple Watch 和连续互通",
    href: "/categories/Continuity",
    match: ["Continuity", "AirPods", "Apple Watch", "Bluetooth"],
    icon: Cable
  },
  {
    name: "电池与更新",
    description: "充电、耗电、系统更新卡住和固件更新",
    href: "/tags/Battery",
    match: ["Battery", "Update", "Firmware", "Charging"],
    icon: BatteryCharging
  }
];

export default function HomePage() {
  const articles = getAllArticles();
  const categories = getAllCategories();
  const tags = getAllTags();
  const recentlyUpdated = [...articles].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 6);
  const popular = articles.filter((article) => article.popular).slice(0, 6);
  const productOrder = ["iPhone", "Mac", "Apple Watch", "AirPods", "HomePod"];
  const productCategories = productOrder
    .map((name) => categories.find((category) => category.name === name))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));
  const categoryIcons = new Map([
    ["iPhone", Smartphone],
    ["Mac", Laptop],
    ["AirPods", AirPodsIcon],
    ["Apple Watch", AppleWatchIcon],
    ["HomePod", Router]
  ]);
  const quickActions = [
    {
      title: "查看全部分类",
      href: "/categories",
      icon: Folder
    },
    {
      title: "浏览热门标签",
      href: "/tags",
      icon: Tags
    },
    {
      title: "提交新问题",
      href: "/feedback",
      icon: FilePlus2
    }
  ];
  const topicCounts = topicGroups.map((topic) => ({
    ...topic,
    count: articles.filter((article) =>
      [article.category, ...article.tags, ...article.device].some((value) => topic.match.includes(value))
    ).length
  }));

  return (
    <main className="bg-zinc-50 dark:bg-zinc-950">
      <section className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 text-center sm:px-6 sm:pb-14 sm:pt-20">
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-6xl">
            Apple Cookbook 支持
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-xl leading-8 text-zinc-700 dark:text-zinc-300">
            需要协助？从这里开始。
          </p>

          <nav aria-label="产品支持" className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-5">
            {productCategories.map((category) => {
              const Icon = categoryIcons.get(category.name) ?? Folder;

              return (
                <Link
                  key={category.name}
                  href={`/categories/${encodeURIComponent(category.name)}`}
                  className="group flex flex-col items-center gap-3 text-sm font-medium text-zinc-800 transition hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 transition group-hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:group-hover:bg-zinc-800">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-4 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <Icon className="h-5 w-5 flex-none text-zinc-500 transition group-hover:text-zinc-950 dark:group-hover:text-white" />
                  <span>{action.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="search-title" className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="search-title" className="text-center text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
            搜索更多主题
          </h2>
          <div className="mx-auto mt-7 max-w-4xl">
            <SearchPanel articles={articles} />
          </div>
        </div>
      </section>

      <section aria-labelledby="topics-title" className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="topics-title" className="text-center text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
            按问题类型浏览
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topicCounts.map((topic) => {
              const Icon = topic.icon;

              return (
                <Link
                  key={topic.name}
                  href={topic.href}
                  className="group rounded-lg bg-white p-5 transition hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                >
                  <Icon className="h-6 w-6 text-zinc-500 transition group-hover:text-zinc-950 dark:group-hover:text-white" />
                  <h3 className="mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50">{topic.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{topic.description}</p>
                  <p className="mt-4 text-sm text-zinc-500">{topic.count} 篇文章</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="popular-title" className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex items-center justify-between gap-4">
            <h2 id="popular-title" className="flex items-center gap-2 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
              <Layers3 className="h-6 w-6" />
              常见问题
            </h2>
            <Link href="/categories" className="hidden text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 sm:inline-flex">
              查看全部
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popular.map((article) => (
              <ArticleCard key={article.route} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="recent-title" className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex items-center justify-between gap-4">
            <h2 id="recent-title" className="flex items-center gap-2 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
              <ShieldCheck className="h-6 w-6" />
              最近更新
            </h2>
            <Link href="/tags" className="hidden text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 sm:inline-flex">
              浏览标签
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentlyUpdated.map((article) => (
              <ArticleCard key={article.route} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="explore-title" className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="explore-title" className="text-center text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
            探索更多内容
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                <Tags className="h-5 w-5" />
                热门标签
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.slice(0, 16).map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="rounded-full bg-white px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                <Folder className="h-5 w-5" />
                全部分类
              </h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.name}
                    href={`/categories/${encodeURIComponent(category.name)}`}
                    className="group flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm transition hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800"
                  >
                    <span>{category.name}</span>
                    <span className="inline-flex items-center gap-1 text-zinc-500">
                      {category.items.length}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
