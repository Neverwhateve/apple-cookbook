"use client";

import { type MouseEvent, type SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";

const INITIAL_FOCUS_SELECTOR = "[data-feedback-dialog-initial-focus]";

export function useFeedbackDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);
  const [open, setOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  const openDialog = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    openerRef.current = event.currentTarget;
    restoreFocusRef.current = true;
    setSessionKey((value) => value + 1);
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
      return;
    }

    setOpen(false);
  }, []);

  const handleCancel = useCallback(
    (event: SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      closeDialog();
    },
    [closeDialog]
  );

  const handleClose = useCallback(() => {
    setOpen(false);

    if (!restoreFocusRef.current) {
      restoreFocusRef.current = true;
      return;
    }

    const opener = openerRef.current;
    requestAnimationFrame(() => {
      const focusTarget = opener?.isConnected ? opener : triggerRef.current;
      focusTarget?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    restoreFocusRef.current = true;
    if (!dialog.open) dialog.showModal();

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = requestAnimationFrame(() => {
      dialog.querySelector<HTMLElement>(INITIAL_FOCUS_SELECTOR)?.focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  useEffect(
    () => () => {
      restoreFocusRef.current = false;
    },
    []
  );

  return {
    closeDialog,
    dialogRef,
    handleCancel,
    handleClose,
    open,
    openDialog,
    sessionKey,
    triggerRef
  };
}
