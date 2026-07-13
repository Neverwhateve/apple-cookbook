const GLOBAL_FEEDBACK_HIDDEN_ROOTS = ["/feedback", "/admin", "/recipes"] as const;

export function isGlobalFeedbackHiddenPath(pathname: string) {
  return GLOBAL_FEEDBACK_HIDDEN_ROOTS.some((root) => pathname === root || pathname.startsWith(`${root}/`));
}
