"use client";

import { Bookmark, Check, ClipboardCheck, Copy, PinOff, Share2, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { articleShareUrl } from "@/lib/article-share-url";
import {
  getCaseOutcome,
  getCaseNote,
  isCasePinned,
  recordRecentCase,
  setCaseOutcome,
  setCaseNote,
  togglePinnedCase,
  type RetailCaseOutcome
} from "@/lib/retail-case-store";

const outcomeOptions: Array<{
  value: RetailCaseOutcome;
  label: string;
  description: string;
  icon: typeof Check;
}> = [
  { value: "resolved", label: "现场已解决", description: "顾客已确认结果，可以结束本次处理。", icon: Check },
  { value: "follow_up", label: "需要观察", description: "说明观察条件，以及何时应再次联系或回来。", icon: ClipboardCheck },
  { value: "service", label: "转服务／进一步支持", description: "停止重复排查，带着已确认的现象进入下一路径。", icon: Wrench }
];

export function ArticleActions({ title, route }: { title: string; route: string }) {
  const [message, setMessage] = useState("");
  const [pinned, setPinned] = useState(false);
  const [outcome, setOutcome] = useState<RetailCaseOutcome | undefined>();
  const [note, setNote] = useState("");
  const [showOutcomeOptions, setShowOutcomeOptions] = useState(false);

  useEffect(() => {
    recordRecentCase(route, title);
    setPinned(isCasePinned(route));
    setOutcome(getCaseOutcome(route));
    setNote(getCaseNote(route) ?? "");
  }, [route, title]);

  function shareUrl() {
    return articleShareUrl(window.location.href);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setMessage("链接已复制");
    } catch {
      setMessage("浏览器未允许复制，请从地址栏复制链接");
    }
  }

  async function copyHandoff() {
    const outcomeLabel = outcomeOptions.find((option) => option.value === outcome)?.label ?? "尚未记录";
    const handoff = [
      `案例：${title}`,
      `当前状态：${outcomeLabel}`,
      "已使用 Cookbook Case Mode 进行初步安全检查。",
      "交接时请确认：现象范围、开始时间／触发条件、屏幕提示，以及已完成的步骤。",
      "请勿在备注或交接中写入姓名、电话、Apple 账户、序列号或其他顾客资料。"
    ].join("\n");

    try {
      await navigator.clipboard.writeText(handoff);
      setMessage("交接摘要已复制");
    } catch {
      setMessage("浏览器未允许复制，请手动记录交接要点");
    }
  }

  async function shareArticle() {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, url: shareUrl() });
      setMessage("分享面板已打开");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("暂时无法分享，请复制链接");
    }
  }

  function togglePin() {
    const isPinned = togglePinnedCase(route, title);
    setPinned(isPinned);
    setMessage(isPinned ? "已固定到工作台" : "已从工作台取消固定");
  }

  function recordOutcome(nextOutcome: RetailCaseOutcome) {
    setCaseOutcome(route, title, nextOutcome);
    setOutcome(nextOutcome);
    setShowOutcomeOptions(false);
    setMessage(outcomeOptions.find((option) => option.value === nextOutcome)?.label ?? "已记录处理结果");
  }

  function saveNote() {
    setCaseNote(route, title, note);
    setMessage(note.trim() ? "本地工作备注已保存" : "本地工作备注已清除");
  }

  const selectedOutcome = outcomeOptions.find((option) => option.value === outcome);

  const buttonClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={togglePin} className={buttonClass} aria-pressed={pinned}>
        {pinned ? <PinOff className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        {pinned ? "取消固定" : "固定案例"}
      </button>
      <button type="button" onClick={copyLink} className={`${buttonClass} hidden sm:inline-flex`}>
        <Copy className="h-4 w-4" />
        复制链接
      </button>
      <button type="button" onClick={shareArticle} className={buttonClass}>
        <Share2 className="h-4 w-4" />
        分享
      </button>
      <button
        type="button"
        onClick={() => setShowOutcomeOptions((visible) => !visible)}
        className={buttonClass}
        aria-expanded={showOutcomeOptions}
      >
        <ClipboardCheck className="h-4 w-4" />
        {selectedOutcome ? selectedOutcome.label : "记录处理结果"}
      </button>
      <button type="button" onClick={copyHandoff} className={buttonClass}>
        <Copy className="h-4 w-4" />
        复制交接摘要
      </button>
      {showOutcomeOptions ? (
        <div className="basis-full rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">本次案例的下一状态</p>
          <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">只记录案例状态，不要记录姓名、号码、序列号或其他顾客资料。</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {outcomeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => recordOutcome(option.value)}
                  className={`rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    option.value === outcome
                      ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40"
                      : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-zinc-50">
                    <Icon className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                    {option.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-zinc-600 dark:text-zinc-400">{option.description}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <label htmlFor="case-note" className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">本地工作备注（可选）</label>
            <p id="case-note-help" className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              只写已确认的现象、已完成步骤或下一步；不写姓名、号码、Apple 账户、序列号或其他顾客资料。
            </p>
            <textarea
              id="case-note"
              value={note}
              onChange={(event) => setNote(event.target.value.slice(0, 240))}
              maxLength={240}
              rows={3}
              aria-describedby="case-note-help"
              placeholder="例如：已确认仅在公司 Wi‑Fi 复现；顾客将在家用其他网络观察。"
              className="mt-3 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{note.length}/240 · 只保存在当前设备</span>
              <button type="button" onClick={saveNote} className={buttonClass}>保存备注</button>
            </div>
          </div>
        </div>
      ) : null}
      <span className="text-sm text-zinc-500 dark:text-zinc-400" role="status" aria-live="polite">
        {message}
      </span>
    </div>
  );
}
