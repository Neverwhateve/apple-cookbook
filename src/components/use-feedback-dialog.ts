"use client";

import { useEffect, useRef, type RefObject } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(", ");

type FeedbackDialogOptions = {
  open: boolean;
  onClose: () => void;
  dialogRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  initialFocusSelector: string;
};

/**
 * Keeps the compact feedback panels usable as dialogs without pulling in a
 * modal dependency. Focus starts in the field the visitor needs to fill in,
 * stays inside while the panel is open, and returns to its trigger on close.
 */
export function useFeedbackDialog({
  open,
  onClose,
  dialogRef,
  triggerRef,
  initialFocusSelector
}: FeedbackDialogOptions) {
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        wasOpen.current = false;
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
      return;
    }

    wasOpen.current = true;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const activeDialog: HTMLElement = dialog;

    window.requestAnimationFrame(() => activeDialog.querySelector<HTMLElement>(initialFocusSelector)?.focus());

    function keepFocusInDialog(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(activeDialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true"
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) {
        event.preventDefault();
        activeDialog.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    activeDialog.addEventListener("keydown", keepFocusInDialog);
    return () => activeDialog.removeEventListener("keydown", keepFocusInDialog);
  }, [dialogRef, initialFocusSelector, onClose, open, triggerRef]);
}
