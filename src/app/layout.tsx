import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, LayoutGrid, Search } from "lucide-react";
import "./globals.css";
import { GlobalFeedbackWidget } from "@/components/global-feedback-widget";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cookbook.wuxiela.fun"),
  title: {
    default: "Apple Cookbook",
    template: "%s | Apple Cookbook"
  },
  description: "按症状、设备和错误提示查找 Apple 故障排查方案，明确区分官方步骤与社区经验。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Apple Cookbook",
    title: "Apple Cookbook",
    description: "按症状、设备和错误提示查找 Apple 故障排查方案。"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-50 -translate-y-20 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition focus:translate-y-0 dark:bg-zinc-50 dark:text-zinc-950"
        >
          跳到主要内容
        </a>
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950">
                <BookOpen className="h-4 w-4" />
              </span>
              Apple Cookbook
            </Link>
            <nav aria-label="主导航" className="flex items-center gap-2">
              <Link
                href="/categories"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:hidden"
                aria-label="浏览分类"
                title="浏览分类"
              >
                <LayoutGrid className="h-4 w-4" />
              </Link>
              <Link
                href="/categories"
                className="hidden rounded-full px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:inline-flex"
              >
                分类
              </Link>
              <Link
                href="/tags"
                className="hidden rounded-full px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:inline-flex"
              >
                标签
              </Link>
              <Link
                href="/feedback"
                className="hidden rounded-full px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:inline-flex"
              >
                反馈
              </Link>
              <Link
                href="/#site-search"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
                aria-label="搜索"
                title="搜索"
              >
                <Search className="h-4 w-4" />
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <GlobalFeedbackWidget />
      </body>
    </html>
  );
}
