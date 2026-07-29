"use client";

import { ArrowRight, FilePlus2, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { VerificationBadge } from "@/components/verification-badge";
import { difficultyLabels } from "@/lib/labels";
import { recentArticleSortValue } from "@/lib/recent-sort";
import { searchDocuments, type SearchDocument, type SearchField, type SearchHit } from "@/lib/search";

const quickQueries = ["我的 Mac 很慢", "AirPods 总是断开连接", "微信收不到通知", "我的 iPhone 很烫", "充电到 80% 暂停"];

const screenTimeChoices = [
  { label: "忘记密码，无法修改限制", href: "/recipes/Family%20Sharing/screen-time-passcode-forgot-reset" },
  { label: "限额到时仍能继续使用", href: "/recipes/Family%20Sharing/screen-time-limits-not-blocking" },
  { label: "请求收不到或批准后不生效", href: "/recipes/Family%20Sharing/screen-time-requests-not-working" },
  { label: "家长看不到使用时间明细", href: "/recipes/Family%20Sharing/screen-time-child-usage-not-showing" }
];

const heatChoices = [
  { label: "只在充电时发热／停在 80%", href: "/recipes/iPhone/iphone-charging-paused-80-temperature-charge-limit" },
  { label: "更新后持续发热或掉电快", href: "/recipes/iPhone/iphone-battery-drains-after-update" },
  { label: "温度警告、异常发烫或无法安全使用", href: "/recipes/iPhone/iphone-overheating-temperature-warning-too-hot" }
];

const fieldLabels: Record<SearchField, string> = {
  title: "标题",
  summary: "摘要",
  symptoms: "症状",
  keywords: "关键词",
  aliases: "常见说法",
  devices: "设备",
  platforms: "系统",
  systemVersions: "系统版本",
  errorMessages: "错误提示",
  officialTerms: "官方术语",
  communityTerms: "社区说法",
  solutionSteps: "解决步骤",
  category: "分类"
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedText({ text, terms }: { text: string; terms: readonly string[] }) {
  const highlightTerms = Array.from(new Set(terms.map((term) => term.trim()).filter((term) => term.length >= 2)))
    .sort((left, right) => right.length - left.length)
    .slice(0, 12);

  if (!highlightTerms.length) return text;

  const expression = new RegExp(`(${highlightTerms.map(escapeRegExp).join("|")})`, "giu");
  const parts = text.split(expression);

  return parts.map((part, index): ReactNode =>
    highlightTerms.some((term) => term.toLocaleLowerCase("zh-CN") === part.toLocaleLowerCase("zh-CN")) ? (
      <mark key={`${part}-${index}`} className="rounded-sm bg-yellow-200 px-0.5 text-inherit dark:bg-yellow-700/70">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function resultTerms(hit: SearchHit) {
  return Array.from(new Set(hit.matchedFields.flatMap((match) => match.terms)));
}

function isAmbiguousScreenTimeQuery(query: string) {
  return /屏幕.*(?:使用)?时间/.test(query) && /不生效|没用|失效|设置/.test(query);
}

function isAmbiguousHeatQuery(query: string) {
  return /热|烫|overheat|hot/i.test(query) && !/充电|charge|charging|80/.test(query);
}

function nextQuestionFor(query: string) {
  if (/慢|卡|lag|slow/i.test(query)) return "是整台设备都慢，还是只有一个 App 或联网内容慢？";
  if (/断开|连接|蓝牙|wifi|无线|网络/i.test(query)) return "设备本身断开连接，还是声音、内容或网络去了别的地方？";
  if (/通知|提醒|收不到|不响/i.test(query)) return "只有一个 App 收不到，还是所有 App 都有同样情况？";
  if (/热|烫|耗电|掉电|电池/i.test(query)) return "这是刚更新后出现，还是已经持续一周以上？";
  return "它从什么时候开始？是所有场景都会发生，还是只影响一个 App、设备或配件？";
}

export function SearchPanel({ articles }: { articles: SearchDocument[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const hasReadUrlQuery = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const trimmedQuery = query.trim();
  const showScreenTimeChoices = isAmbiguousScreenTimeQuery(trimmedQuery);
  const showHeatChoices = isAmbiguousHeatQuery(trimmedQuery);
  const needsDisambiguation = showScreenTimeChoices || showHeatChoices;

  useEffect(() => {
    const focusSearchInput = () => {
      if (window.location.hash !== "#site-search") return;

      window.requestAnimationFrame(() => searchInputRef.current?.focus());
    };

    focusSearchInput();
    window.addEventListener("hashchange", focusSearchInput);

    return () => window.removeEventListener("hashchange", focusSearchInput);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const urlQuery = url.searchParams.get("q")?.trim() ?? "";

    if (!hasReadUrlQuery.current) {
      hasReadUrlQuery.current = true;
      if (urlQuery) {
        setQuery(urlQuery);
        return;
      }
    }

    if (urlQuery === trimmedQuery) return;

    if (trimmedQuery) {
      url.searchParams.set("q", trimmedQuery);
    } else {
      url.searchParams.delete("q");
    }

    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [trimmedQuery]);

  const results = useMemo(() => {
    if (!trimmedQuery) {
      return [...articles]
        .filter((article) => article.verification !== "Unknown")
        .sort(
          (a, b) =>
            recentArticleSortValue(b) - recentArticleSortValue(a) ||
            b.updated.localeCompare(a.updated) ||
            // Pin the locale so server rendering and the user's browser keep
            // the same stable order for articles with matching dates.
            a.title.localeCompare(b.title, "zh-CN")
        )
        .slice(0, 4)
        .map((document) => ({ document, score: 0, termCoverage: 0, matchedFields: [], snippet: document.summary }));
    }

    return searchDocuments(articles, trimmedQuery, 8);
  }, [articles, trimmedQuery]);
  const visibleResults = results.slice(0, 4);

  const resultHref = (route: string) => (trimmedQuery ? `${route}?q=${encodeURIComponent(trimmedQuery)}` : route);

  const openBestResult = () => {
    // A broad Screen Time complaint needs one more symptom before ranking can
    // safely stand in for the Specialist's judgment.
    if (!trimmedQuery || results.length === 0 || needsDisambiguation) return;

    router.push(resultHref(results[0].document.route));
  };

  return (
    <section className="h-full rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.035)] dark:bg-zinc-900 sm:p-6">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          openBestResult();
        }}
      >
        <label htmlFor="cookbook-search" className="sr-only">
          搜索 Apple 故障排查文章
        </label>
        <p id="cookbook-search-help" className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          可以输入口语化症状、中英文功能名、设备、系统版本或完整错误提示。
        </p>
        <div className="flex min-h-12 items-center gap-3 rounded-xl bg-[#f5f5f7] px-3 transition focus-within:ring-2 focus-within:ring-blue-500/30 dark:bg-zinc-800">
          <Search className="h-5 w-5 flex-none text-zinc-500" aria-hidden="true" />
          <input
            id="cookbook-search"
            type="search"
            ref={searchInputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" || event.nativeEvent.isComposing) return;

              event.preventDefault();
              openBestResult();
            }}
            placeholder="例如：为什么看不到家人的位置"
            aria-describedby="cookbook-search-help cookbook-search-status"
            autoComplete="off"
            enterKeyHint="search"
            className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none placeholder:text-zinc-500 focus-visible:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-offset-zinc-950"
              aria-label="清除搜索"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2" aria-label="热门症状示例">
        {quickQueries.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setQuery(item)}
            className="min-h-11 rounded-full bg-zinc-100 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
          >
            {item}
          </button>
        ))}
      </div>

      <p id="cookbook-search-status" className="mt-5 text-xs font-semibold text-zinc-500 dark:text-zinc-400" role="status" aria-live="polite">
        {trimmedQuery
          ? results.length
            ? needsDisambiguation
              ? `找到 ${results.length} 个匹配结果 · 请先选择最接近的现象`
              : `找到 ${results.length} 个匹配结果 · 按 Return 开始最可能的处理路径`
            : "没有找到匹配结果"
          : `最近更新 · ${results.length} 篇`}
      </p>

      {showScreenTimeChoices ? (
        <section className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30" aria-labelledby="screen-time-choice-title">
          <h2 id="screen-time-choice-title" className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            先确认哪一种“没有生效”
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            屏幕使用时间的密码、限额、请求和使用记录是不同问题；请选择最接近的现象，避免直接执行不相关的步骤。
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {screenTimeChoices.map((choice) => (
              <Link
                key={choice.href}
                href={choice.href}
                className="inline-flex min-h-11 items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-950 dark:text-blue-300 dark:hover:bg-blue-950"
              >
                {choice.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {showHeatChoices ? (
        <section className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/70 dark:bg-amber-950/20" aria-labelledby="heat-choice-title">
          <h2 id="heat-choice-title" className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            先确认“发热”发生在什么场景
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            发热可能与充电温度保护、更新后的后台活动，或安全/硬件异常有关。先选最接近的现象，不要直接把它当成电池或充电器故障。
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {heatChoices.map((choice) => (
              <Link
                key={choice.href}
                href={choice.href}
                className="inline-flex min-h-11 items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium text-amber-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-950 dark:text-amber-200 dark:hover:bg-amber-950"
              >
                {choice.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {trimmedQuery && results.length > 0 && !needsDisambiguation ? (
        <aside className="mt-3 rounded-xl border border-blue-200 bg-blue-50/70 p-3 dark:border-blue-900 dark:bg-blue-950/25" aria-label="开始前先确认">
          <p className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">开始前先确认</p>
          <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{nextQuestionFor(trimmedQuery)}</p>
        </aside>
      ) : null}

      <div className="mt-3 space-y-3">
        {visibleResults.map((hit, index) => {
          const article = hit.document;
          const terms = resultTerms(hit);

          return (
            <div key={article.route}>
              {trimmedQuery && index === 0 ? (
                <p className="mb-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
                  {needsDisambiguation ? "相关结果" : "最可能答案"}
                </p>
              ) : null}
              {trimmedQuery && index === 1 ? (
                <p className="mb-2 mt-5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">其他匹配</p>
              ) : null}
              <Link
                href={resultHref(article.route)}
                className="block rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    <HighlightedText text={article.title} terms={terms} />
                  </span>
                  <VerificationBadge level={article.verification} compact />
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                    {difficultyLabels[article.difficulty]}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  <HighlightedText text={hit.snippet || article.summary} terms={terms} />
                </p>
                {hit.matchedFields.length ? (
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    命中：{hit.matchedFields.slice(0, 3).map((match) => fieldLabels[match.field]).join("、")}
                  </p>
                ) : null}
                {trimmedQuery && index === 0 && !needsDisambiguation ? (
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-300">
                    进入 Case Mode
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : null}
              </Link>
            </div>
          );
        })}

        {results.length > visibleResults.length ? (
          <p className="px-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            还有 {results.length - visibleResults.length} 个较弱匹配。先补充上面的关键信息，避免在相似文章之间反复切换。
          </p>
        ) : null}

        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-4 dark:border-zinc-700">
            <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Sparkles className="mt-0.5 h-4 w-4 flex-none" />
              <p>暂时没有找到可确认的对应答案。试试缩短描述、去掉设备型号，或换用屏幕上显示的完整错误提示；请不要因为相似关键词直接尝试不相关的步骤。</p>
            </div>
            <Link
              href={`/feedback?topic=${encodeURIComponent(query)}`}
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-950"
            >
              <FilePlus2 className="h-4 w-4" />
              提交这个问题
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
