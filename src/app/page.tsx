import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Cable,
  Clock,
  FilePlus2,
  Folder,
  Laptop,
  Layers3,
  LockKeyhole,
  Router,
  ShieldCheck,
  Smartphone,
  Tags,
  Users
} from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { SearchPanel } from "@/components/search-panel";
import { getAllArticles, getAllCategories, getAllTags } from "@/lib/cookbook";

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
  const productCategories = categories.filter((category) =>
    ["iPhone", "AirPods", "Apple Watch", "Mac", "HomePod"].includes(category.name)
  );
  const categoryIcons = new Map([
    ["iPhone", Smartphone],
    ["Mac", Laptop],
    ["AirPods", Cable],
    ["Apple Watch", Users],
    ["HomePod", Router]
  ]);
  const topicCounts = topicGroups.map((topic) => ({
    ...topic,
    count: articles.filter((article) =>
      [article.category, ...article.tags, ...article.device].some((value) => topic.match.includes(value))
    ).length
  }));

  return (
    <main className="bg-white dark:bg-zinc-950">
      <section className="mx-auto max-w-5xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pb-12 sm:pt-16">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Apple Cookbook 知识库</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          快速查找 Apple 零售故障排查答案
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          按顾客原话、产品或问题类型定位文章。每篇内容区分官方步骤、已验证思路和升级处理路径。
        </p>
        <div className="mx-auto mt-8 max-w-4xl text-left">
          <SearchPanel articles={articles} />
        </div>
      </section>

      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-12">
            <section aria-labelledby="products-title">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 id="products-title" className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                    按产品浏览
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    先选设备或服务，再进入对应的问题清单。
                  </p>
                </div>
                <Link href="/categories" className="hidden text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 sm:inline">
                  全部分类
                </Link>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {productCategories.map((category) => {
                  const Icon = categoryIcons.get(category.name) ?? Folder;

                  return (
                    <Link
                      key={category.name}
                      href={`/categories/${encodeURIComponent(category.name)}`}
                      className="group rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
                    >
                      <Icon className="h-5 w-5 text-zinc-500 transition group-hover:text-zinc-950 dark:group-hover:text-zinc-50" />
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{category.name}</h3>
                        <span className="text-sm text-zinc-500">{category.items.length} 篇</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {category.items.slice(0, 2).map((item) => item.title).join("、")}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="topics-title">
              <h2 id="topics-title" className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                按问题类型浏览
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {topicCounts.map((topic) => {
                  const Icon = topic.icon;

                  return (
                    <Link
                      key={topic.name}
                      href={topic.href}
                      className="group flex items-start gap-4 rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
                    >
                      <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-semibold text-zinc-950 dark:text-zinc-50">{topic.name}</span>
                          <span className="text-sm text-zinc-500">{topic.count} 篇</span>
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">{topic.description}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="popular-title">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 id="popular-title" className="flex items-center gap-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                  <Layers3 className="h-5 w-5" />
                  常见问题
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {popular.map((article) => (
                  <ArticleCard key={article.route} article={article} />
                ))}
              </div>
            </section>

            <section aria-labelledby="recent-title">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 id="recent-title" className="flex items-center gap-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                  <Clock className="h-5 w-5" />
                  最近更新
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {recentlyUpdated.map((article) => (
                  <ArticleCard key={article.route} article={article} />
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
                <FilePlus2 className="h-4 w-4" />
                没找到问题？
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                提交顾客原话、现象和设备背景，系统会记录到每日待复核清单。
              </p>
              <Link
                href="/feedback"
                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                提交反馈
              </Link>
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
                <ShieldCheck className="h-4 w-4" />
                内容原则
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                <li>Apple 官方方案与非官方临时处理方法始终明确区分。</li>
                <li>文章说明问题原因，也说明什么时候应停止继续排查。</li>
                <li>搜索优先匹配顾客原话、别名、中文和英文关键词。</li>
              </ul>
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
                  <Tags className="h-4 w-4" />
                  热门标签
                </h2>
                <Link href="/tags" className="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50">
                  查看全部
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 14).map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
                  <Folder className="h-4 w-4" />
                  全部分类
                </h2>
                <Link href="/categories" className="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50">
                  查看全部
                </Link>
              </div>
              <div className="space-y-2">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.name}
                    href={`/categories/${encodeURIComponent(category.name)}`}
                    className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    <span>{category.name}</span>
                    <span className="text-zinc-500">{category.items.length}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
                <Layers3 className="h-4 w-4" />
                快速入口
              </h2>
              <div className="mt-4 space-y-3">
                {popular.slice(0, 4).map((article) => (
                  <Link key={article.route} href={article.route} className="group block text-sm">
                    <span className="font-medium text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                      {article.title}
                    </span>
                    <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
