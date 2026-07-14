import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Cable,
  FilePlus2,
  Folder,
  Headphones,
  Laptop,
  Layers3,
  LockKeyhole,
  Router,
  ShieldCheck,
  Smartphone,
  Tablet,
  Tags
} from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { SearchPanel } from "@/components/search-panel";
import {
  getIndexableArticles,
  getPublishedArticles,
  getPublishedCategories,
  getPublishedSearchDocuments,
  getPublishedTags
} from "@/lib/cookbook";
import { compareRecentArticles } from "@/lib/recent-sort";

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
      <path d="M12.5 4.5h7l1 5h-9z" />
      <rect x="8.75" y="9" width="14.5" height="14.5" rx="4.25" />
      <path d="M11.5 23.5h9l-1 4h-7z" />
      <path d="M23.5 14.25h1.75v3.5H23.5" />
      <path d="M14.25 13.75h3.5" />
      <path d="M14.25 18.75h3.5" />
    </svg>
  );
}

function VisionIcon({ className }: { className?: string }) {
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
      <path d="M5 15.5c1.2-4.2 4.4-6.5 8.6-6.5h4.8c4.2 0 7.4 2.3 8.6 6.5" />
      <path d="M5 15.5v3.25A4.25 4.25 0 0 0 9.25 23h3.1a4.2 4.2 0 0 0 3.65-2.1A4.2 4.2 0 0 0 19.65 23h3.1A4.25 4.25 0 0 0 27 18.75V15.5" />
      <path d="M8.75 17.5h4.5" />
      <path d="M18.75 17.5h4.5" />
    </svg>
  );
}

const productItems = [
  { label: "iPhone", category: "iPhone", icon: Smartphone },
  { label: "Mac", category: "Mac", icon: Laptop },
  { label: "iPad", category: "iPad", icon: Tablet },
  { label: "Watch", category: "Apple Watch", icon: AppleWatchIcon },
  { label: "Vision", category: "Vision Pro", icon: VisionIcon },
  { label: "AirPods", category: "AirPods", icon: Headphones }
];

const topicGroups = [
  {
    name: "家庭共享",
    description: "屏幕使用时间、购买前询问和儿童账号",
    href: "/categories/Family%20Sharing",
    match: ["Family Sharing"],
    facet: "category" as const,
    icon: LockKeyhole
  },
  {
    name: "网络与热点",
    description: "Wi-Fi 无法联网、加入网络和个人热点",
    href: "/categories/Networking",
    match: ["Networking"],
    facet: "category" as const,
    icon: Router
  },
  {
    name: "连续互通",
    description: "隔空投送、设备发现和跨设备连接",
    href: "/categories/%E8%BF%9E%E7%BB%AD%E4%BA%92%E9%80%9A",
    match: ["连续互通"],
    facet: "category" as const,
    icon: Cable
  },
  {
    name: "电池问题",
    description: "耗电、发热、电池健康和续航异常",
    href: "/tags/%E7%94%B5%E6%B1%A0",
    match: ["电池"],
    facet: "tag" as const,
    icon: BatteryCharging
  }
];

export default function HomePage() {
  const articles = getPublishedArticles();
  const categories = getPublishedCategories(articles);
  const tags = getPublishedTags(articles);
  const publishedArticles = getIndexableArticles(articles);
  const searchDocuments = getPublishedSearchDocuments(articles);
  const availableCategories = new Set(categories.filter((category) => category.items.length > 0).map((category) => category.name));
  const recentlyUpdated = [...publishedArticles].sort(compareRecentArticles).slice(0, 6);
  const popular = publishedArticles
    .filter((article) => article.popular)
    .sort(compareRecentArticles)
    .slice(0, 6);
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
    count: publishedArticles.filter((article) =>
      topic.facet === "category" ? topic.match.includes(article.category) : article.tags.some((tag) => topic.match.includes(tag))
    ).length
  }));

  return (
    <main className="bg-zinc-50 dark:bg-zinc-950">
      <section className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 text-center sm:px-6 sm:pb-14 sm:pt-20">
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-6xl">
            用你遇到的现象，找到解决办法
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300 sm:text-xl">
            搜索症状、错误提示、设备或功能名称。Apple 官方步骤优先，社区经验会明确标注。
          </p>

          <div id="site-search" className="mx-auto mt-8 max-w-4xl scroll-mt-24 text-left">
            <SearchPanel articles={searchDocuments} />
          </div>

          <h2 className="mt-12 text-lg font-semibold text-zinc-950 dark:text-zinc-50">按设备浏览</h2>
          <nav aria-label="产品支持" className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            {productItems.filter((product) => availableCategories.has(product.category)).map((product) => {
              const Icon = product.icon;

              return (
                <Link
                  key={product.category}
                  href={`/categories/${encodeURIComponent(product.category)}`}
                  className="group flex flex-col items-center gap-3 text-sm font-medium text-zinc-800 transition hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 transition group-hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:group-hover:bg-zinc-800">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span>{product.label}</span>
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
