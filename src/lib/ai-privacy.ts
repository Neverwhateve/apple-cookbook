export type SanitizationResult = {
  sanitized: string;
  replacements: string[];
};

type Pattern = { tag: string; expression: RegExp };

// Conservative patterns intentionally prefer a false positive to leaking a
// customer identifier to a model, logs, or durable store.
const patterns: readonly Pattern[] = [
  { tag: "RECOVERY_KEY", expression: /\b(?:[A-Z0-9]{4}[-\s]){5,}[A-Z0-9]{4}\b/gi },
  { tag: "IMEI", expression: /\b\d{15}(?:\d{2})?\b/g },
  { tag: "ID_NUMBER", expression: /\b\d{17}[\dXx]\b/g },
  { tag: "VERIFICATION_CODE", expression: /(?:验证码|verification\s*code|otp)\s*(?:是|为|:|：)?\s*\d{4,8}/gi },
  { tag: "PHONE", expression: /(?<!\d)(?:\+?86[-\s]?)?1[3-9]\d[-\s]?\d{4}[-\s]?\d{4}(?!\d)/g },
  { tag: "PHONE", expression: /(?<![\d+])\+?[1-9]\d{0,2}[\s.-]?\(?\d{1,4}\)?(?:[\s.-]?\d{2,4}){2,4}(?!\d)/g },
  { tag: "EMAIL", expression: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi },
  { tag: "ORDER_ID", expression: /(?:订单|order)\s*(?:号|编号|number|#)?\s*[:：#-]?\s*[A-Z0-9-]{6,}/gi },
  { tag: "REPAIR_ID", expression: /(?:维修|修理|case)\s*(?:号|编号|number|#)?\s*[:：#-]?\s*[A-Z0-9-]{6,}/gi },
  { tag: "PASSWORD", expression: /(?:密码|password|passcode)\s*(?:是|为|:|：)?\s*[^\s，。；;]{4,}/gi },
  { tag: "SERIAL_NUMBER", expression: /(?:序列号|serial(?:\s*number)?)\s*(?:是|为|:|：)?\s*[A-Z0-9]{8,20}/gi },
  { tag: "ADDRESS", expression: /(?:地址|住址|address)\s*(?:是|为|:|：)?\s*[^\n]{6,80}/gi }
];

export function sanitizeAiInput(input: string): SanitizationResult {
  let sanitized = input.replace(/\u0000/g, "").trim().slice(0, 2_000);
  const replacements = new Set<string>();

  for (const { tag, expression } of patterns) {
    sanitized = sanitized.replace(expression, () => {
      replacements.add(tag);
      return `[${tag}]`;
    });
  }

  // An email following Apple Account wording is more specific in persisted
  // analytics even though its content has already been removed above.
  if (/(?:apple\s*(?:id|账户|账号)|apple account)\s*[:：]?\s*\[EMAIL\]/i.test(sanitized)) {
    sanitized = sanitized.replace(/\[EMAIL\]/g, "[APPLE_ACCOUNT]");
    replacements.delete("EMAIL");
    replacements.add("APPLE_ACCOUNT");
  }

  return { sanitized: sanitized.replace(/\s{3,}/g, " ").trim(), replacements: [...replacements] };
}

export function sanitizeFreeText(input: unknown, maximum = 600) {
  return sanitizeAiInput(typeof input === "string" ? input.slice(0, maximum) : "").sanitized;
}
