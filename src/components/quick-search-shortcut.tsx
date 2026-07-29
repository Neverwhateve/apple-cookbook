"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/** Makes the symptom search reachable from any point in a retail workflow. */
export function QuickSearchShortcut() {
  const router = useRouter();

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if (event.isComposing || isEditableTarget(event.target)) return;
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey)) return;

      event.preventDefault();
      router.push("/#site-search");
    };

    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, [router]);

  return null;
}
