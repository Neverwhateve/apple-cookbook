"use client";

import { Copy, Share2 } from "lucide-react";
import { useState } from "react";

export function ArticleActions({ title }: { title: string }) {
  const [message, setMessage] = useState("");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("链接已复制");
    } catch {
      setMessage("浏览器未允许复制，请从地址栏复制链接");
    }
  }

  async function shareArticle() {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, url: window.location.href });
      setMessage("分享面板已打开");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("暂时无法分享，请复制链接");
    }
  }

  const buttonClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={copyLink} className={buttonClass}>
        <Copy className="h-4 w-4" />
        复制链接
      </button>
      <button type="button" onClick={shareArticle} className={buttonClass}>
        <Share2 className="h-4 w-4" />
        分享
      </button>
      <span className="text-sm text-zinc-500 dark:text-zinc-400" role="status" aria-live="polite">
        {message}
      </span>
    </div>
  );
}
