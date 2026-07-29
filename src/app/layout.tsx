import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Search, ShieldAlert } from "lucide-react";
import "./globals.css";
import { GlobalFeedbackWidget } from "@/components/global-feedback-widget";
import { OfflineCache } from "@/components/offline-cache";
import { QuickSearchShortcut } from "@/components/quick-search-shortcut";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cookbook.wuxiela.fun"),
  title: {
    default: "Apple Cookbook",
    template: "%s | Apple Cookbook"
  },
  description: "用顾客的话快速进入 Apple 问题处理、服务判断与官方支持路径。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Apple Cookbook",
    title: "Apple Cookbook",
    description: "用顾客的话快速进入 Apple 问题处理、服务判断与官方支持路径。"
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
        <OfflineCache />
        <QuickSearchShortcut />
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-50 -translate-y-20 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition focus:translate-y-0 dark:bg-zinc-50 dark:text-zinc-950"
        >
          跳到主要内容
        </a>
        <header className="sticky top-0 z-20 bg-[#f5f5f7]/90 backdrop-blur-xl dark:bg-black/90">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2 sm:px-6 sm:py-3">
            <Link href="/" className="flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-zinc-950 transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-zinc-50 dark:focus-visible:ring-offset-zinc-950">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950">
                <BookOpen className="h-4 w-4" />
              </span>
              Apple Cookbook
            </Link>
            <nav aria-label="主导航" className="flex items-center gap-2">
              <Link
                href="/service"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.035)] transition hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:hidden"
                aria-label="服务判断"
                title="服务判断"
              >
                <ShieldAlert className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="hidden min-h-11 items-center rounded-full px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-900 sm:inline-flex"
              >
                解决问题
              </Link>
              <Link
                href="/service"
                className="hidden min-h-11 items-center rounded-full px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-900 sm:inline-flex"
              >
                服务判断
              </Link>
              <Link
                href="/categories"
                className="hidden min-h-11 items-center rounded-full px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-900 sm:inline-flex"
              >
                产品
              </Link>
              <Link
                href="/paths"
                className="hidden min-h-11 items-center rounded-full px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-900 md:inline-flex"
              >
                工作场景
              </Link>
              <Link
                href="/#site-search"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.035)] transition hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                aria-label="搜索"
                title="搜索（⌘K）"
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
