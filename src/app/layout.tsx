import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Apple Cookbook",
  description: "Retail-first Apple troubleshooting knowledge base."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950">
                <BookOpen className="h-4 w-4" />
              </span>
              Apple Cookbook
            </Link>
            <nav className="flex items-center gap-2">
              <Link
                href="/categories"
                className="hidden rounded-full px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:inline-flex"
              >
                Categories
              </Link>
              <Link
                href="/tags"
                className="hidden rounded-full px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:inline-flex"
              >
                Tags
              </Link>
              <Link
                href="/"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
                aria-label="Search"
                title="Search"
              >
                <Search className="h-4 w-4" />
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
