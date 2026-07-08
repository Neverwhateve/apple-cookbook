import Link from "next/link";
import { ClipboardList, FilePlus2, Inbox, Search } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";

export const metadata = {
  title: "Submit Feedback | Apple Cookbook",
  description: "Submit missing Apple troubleshooting topics and article feedback."
};

export default async function FeedbackPage({
  searchParams
}: {
  searchParams?: Promise<{ topic?: string }>;
}) {
  const topic = (await searchParams)?.topic ?? "";

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="min-w-0">
        <div className="mb-6">
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Daily work intake</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Submit a missing problem or recipe update.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Send customer wording, symptoms, and context so the topic can be reviewed, deduplicated, and turned into a cookbook recipe.
          </p>
        </div>

        <FeedbackForm initialTitle={topic} />
      </section>

      <aside className="space-y-4">
        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            <Inbox className="h-4 w-4" />
            What gets recorded
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>A structured feedback record for automation.</li>
            <li>A daily work checklist item for review.</li>
            <li>Customer wording that can improve search aliases.</li>
          </ul>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            <ClipboardList className="h-4 w-4" />
            Review path
          </h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>Check whether an existing recipe already covers it.</li>
            <li>Research official Apple sources first.</li>
            <li>Create or update Markdown in the cookbook.</li>
          </ol>
        </section>

        <Link
          href="/"
          className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 text-sm font-medium transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
        >
          <span className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search existing recipes
          </span>
          <FilePlus2 className="h-4 w-4 text-zinc-500" />
        </Link>
      </aside>
    </main>
  );
}
