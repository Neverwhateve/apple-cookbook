import type { Metadata } from "next";
import Link from "next/link";
import { Apple, Menu, Search } from "lucide-react";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Apple Cookbook",
  description: "面向零售场景的 Apple 故障排查知识库。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <header className="sticky top-0 z-20 bg-white/92 backdrop-blur-xl dark:bg-zinc-950/92">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-8 sm:px-10">
            <Link href="/" className="inline-flex h-10 w-10 items-center justify-start text-zinc-950 dark:text-zinc-50" aria-label="Apple Cookbook 首页">
              <Apple className="h-5 w-5 fill-current" />
            </Link>
            <nav className="flex items-center gap-3">
              <Link
                href="/categories"
                className="hidden px-2 py-2 text-sm text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50 sm:inline-flex"
              >
                分类
              </Link>
              <Link
                href="/tags"
                className="hidden px-2 py-2 text-sm text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50 sm:inline-flex"
              >
                标签
              </Link>
              <Link
                href="/feedback"
                className="hidden px-2 py-2 text-sm text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50 sm:inline-flex"
              >
                反馈
              </Link>
              <Link
                href="/"
                className="inline-flex h-10 w-10 items-center justify-center text-zinc-800 transition hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
                aria-label="搜索"
                title="搜索"
              >
                <Search className="h-5 w-5" />
              </Link>
              <ThemeToggle />
              <Link
                href="/categories"
                className="inline-flex h-10 w-10 items-center justify-center text-zinc-800 transition hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50 sm:hidden"
                aria-label="菜单"
                title="菜单"
              >
                <Menu className="h-5 w-5" />
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
