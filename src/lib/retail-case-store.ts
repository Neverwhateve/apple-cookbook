export type RetailCaseOutcome = "resolved" | "follow_up" | "service";

export type RetailCaseEntry = {
  route: string;
  title: string;
  updatedAt: number;
  outcome?: RetailCaseOutcome;
  outcomeUpdatedAt?: number;
  note?: string;
  noteUpdatedAt?: number;
};

const RECENT_CASES_KEY = "apple-cookbook:retail-cases:v1";
const PINNED_CASES_KEY = "apple-cookbook:pinned-cases:v1";
const ACTIVE_CASES_KEY = "apple-cookbook:active-cases:v1";
const CHANGE_EVENT = "apple-cookbook:retail-cases-change";
const MAX_RECENT_CASES = 6;
const MAX_ACTIVE_CASES = 12;

function isCaseEntry(value: unknown): value is RetailCaseEntry {
  if (!value || typeof value !== "object") return false;

  const entry = value as Partial<RetailCaseEntry>;
  return (
    typeof entry.route === "string" &&
    typeof entry.title === "string" &&
    typeof entry.updatedAt === "number" &&
    (entry.outcome === undefined || entry.outcome === "resolved" || entry.outcome === "follow_up" || entry.outcome === "service") &&
    (entry.outcomeUpdatedAt === undefined || typeof entry.outcomeUpdatedAt === "number") &&
    (entry.note === undefined || typeof entry.note === "string") &&
    (entry.noteUpdatedAt === undefined || typeof entry.noteUpdatedAt === "number")
  );
}

function readCases(key: string): RetailCaseEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isCaseEntry).sort((left, right) => right.updatedAt - left.updatedAt);
  } catch {
    return [];
  }
}

function writeCases(key: string, entries: RetailCaseEntry[]) {
  window.localStorage.setItem(key, JSON.stringify(entries));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function getRecentCases() {
  return readCases(RECENT_CASES_KEY);
}

export function getPinnedCases() {
  return readCases(PINNED_CASES_KEY);
}

export function getActiveCases() {
  return readCases(ACTIVE_CASES_KEY).filter((entry) => entry.outcome === "follow_up" || entry.outcome === "service");
}

export function recordRecentCase(route: string, title: string) {
  const recentCases = getRecentCases();
  const existing = recentCases.find((item) => item.route === route);
  const entry: RetailCaseEntry = {
    route,
    title,
    updatedAt: Date.now(),
    outcome: existing?.outcome,
    outcomeUpdatedAt: existing?.outcomeUpdatedAt,
    note: existing?.note,
    noteUpdatedAt: existing?.noteUpdatedAt
  };
  const recent = recentCases.filter((item) => item.route !== route);
  writeCases(RECENT_CASES_KEY, [entry, ...recent].slice(0, MAX_RECENT_CASES));
}

export function isCasePinned(route: string) {
  return getPinnedCases().some((entry) => entry.route === route);
}

export function togglePinnedCase(route: string, title: string) {
  const pinned = getPinnedCases();
  const existing = pinned.find((entry) => entry.route === route);

  if (existing) {
    writeCases(
      PINNED_CASES_KEY,
      pinned.filter((entry) => entry.route !== route)
    );
    return false;
  }

  const recent = getRecentCases().find((entry) => entry.route === route);
  writeCases(PINNED_CASES_KEY, [
    {
      route,
      title,
      updatedAt: Date.now(),
      outcome: recent?.outcome,
      outcomeUpdatedAt: recent?.outcomeUpdatedAt,
      note: recent?.note,
      noteUpdatedAt: recent?.noteUpdatedAt
    },
    ...pinned
  ]);
  return true;
}

export function getCaseOutcome(route: string) {
  return getRecentCases().find((entry) => entry.route === route)?.outcome;
}

export function getCaseNote(route: string) {
  return (
    getRecentCases().find((entry) => entry.route === route)?.note ??
    getActiveCases().find((entry) => entry.route === route)?.note ??
    getPinnedCases().find((entry) => entry.route === route)?.note
  );
}

export function setCaseOutcome(route: string, title: string, outcome: RetailCaseOutcome) {
  const now = Date.now();
  const update = (entries: RetailCaseEntry[]) =>
    entries.map((entry) => (entry.route === route ? { ...entry, title, outcome, outcomeUpdatedAt: now } : entry));

  const recent = getRecentCases();
  const matchingRecent = recent.find((entry) => entry.route === route);
  writeCases(
    RECENT_CASES_KEY,
    matchingRecent
      ? update(recent)
      : [{ route, title, updatedAt: now, outcome, outcomeUpdatedAt: now }, ...recent].slice(0, MAX_RECENT_CASES)
  );

  const pinned = getPinnedCases();
  if (pinned.some((entry) => entry.route === route)) {
    writeCases(PINNED_CASES_KEY, update(pinned));
  }

  const active = getActiveCases();
  if (outcome === "resolved") {
    writeCases(
      ACTIVE_CASES_KEY,
      active.filter((entry) => entry.route !== route)
    );
    return;
  }

  const activeEntry: RetailCaseEntry = {
    route,
    title,
    updatedAt: now,
    outcome,
    outcomeUpdatedAt: now,
    note: matchingRecent?.note,
    noteUpdatedAt: matchingRecent?.noteUpdatedAt
  };
  writeCases(
    ACTIVE_CASES_KEY,
    [activeEntry, ...active.filter((entry) => entry.route !== route)].slice(0, MAX_ACTIVE_CASES)
  );
}

export function setCaseNote(route: string, title: string, note: string) {
  const now = Date.now();
  const normalizedNote = note.trim().slice(0, 240);
  const current = getRecentCases().find((entry) => entry.route === route) ?? getActiveCases().find((entry) => entry.route === route);
  const next: RetailCaseEntry = {
    route,
    title,
    updatedAt: current?.updatedAt ?? now,
    outcome: current?.outcome,
    outcomeUpdatedAt: current?.outcomeUpdatedAt,
    note: normalizedNote || undefined,
    noteUpdatedAt: normalizedNote ? now : undefined
  };
  const replace = (entries: RetailCaseEntry[]) => entries.map((entry) => (entry.route === route ? { ...entry, ...next } : entry));
  const recent = getRecentCases();
  writeCases(
    RECENT_CASES_KEY,
    recent.some((entry) => entry.route === route)
      ? replace(recent)
      : [{ ...next, updatedAt: now }, ...recent].slice(0, MAX_RECENT_CASES)
  );

  const pinned = getPinnedCases();
  if (pinned.some((entry) => entry.route === route)) writeCases(PINNED_CASES_KEY, replace(pinned));

  const active = getActiveCases();
  if (active.some((entry) => entry.route === route)) writeCases(ACTIVE_CASES_KEY, replace(active));
}

export function onRetailCasesChange(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener("storage", listener);

  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}
