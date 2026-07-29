import { MessageCircle } from "lucide-react";

type ArticleSymptomMatchProps = {
  symptoms: string[];
};

/**
 * Lets a Specialist confirm they opened the right article before asking a
 * customer to begin a troubleshooting path. This is intentionally a compact
 * orientation aid, not another solution or source of advice.
 */
export function ArticleSymptomMatch({ symptoms }: ArticleSymptomMatchProps) {
  const visibleSymptoms = symptoms.slice(0, 3);

  if (visibleSymptoms.length === 0) return null;

  return (
    <section
      aria-labelledby="symptom-match-title"
      className="mt-7 border-y border-zinc-200 py-5 dark:border-zinc-800"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
        <MessageCircle aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        <h2 id="symptom-match-title">顾客可能会这样说</h2>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="适合这篇文章的顾客描述">
        {visibleSymptoms.map((symptom) => (
          <li key={symptom} className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm leading-5 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {symptom}
          </li>
        ))}
      </ul>
    </section>
  );
}
