"use client";

import { useEffect } from "react";

/** Registers a deliberately narrow cache for public, already-visited retail cases. */
export function OfflineCache() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    void navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
      // Offline access is optional. A registration failure must never block a
      // customer-facing page or fall back to caching sensitive routes.
    });
  }, []);

  return null;
}
