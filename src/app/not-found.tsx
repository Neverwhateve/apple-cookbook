import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">Article not found</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">The recipe may have been renamed, merged, or not created yet.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        Return to search
      </Link>
    </main>
  );
}

