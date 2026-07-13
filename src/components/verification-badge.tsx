import type { VerificationLevel } from "@/lib/cookbook";
import { verificationDescriptions, verificationLabels } from "@/lib/labels";

const levelClasses: Record<VerificationLevel, string> = {
  Official: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900",
  Verified: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900",
  Likely: "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900",
  Experimental: "bg-orange-50 text-orange-800 ring-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:ring-orange-900",
  Unknown: "bg-zinc-100 text-zinc-600 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800"
};

export function VerificationBadge({ level, compact = false }: { level: VerificationLevel; compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ring-1 ring-inset ${levelClasses[level]} ${
        compact ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm"
      }`}
      title={verificationDescriptions[level]}
    >
      {verificationLabels[level]}
    </span>
  );
}
