import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeAiInput } from "./ai-privacy.ts";

test("redacts customer identifiers before model or log use", () => {
  const result = sanitizeAiInput("Apple ID test@example.com，电话 13800138000，IMEI 490154203237518，验证码 123456，序列号 C02ABC123XYZ");
  assert.match(result.sanitized, /\[APPLE_ACCOUNT\]/);
  assert.match(result.sanitized, /\[PHONE\]/);
  assert.match(result.sanitized, /\[IMEI\]/);
  assert.match(result.sanitized, /\[VERIFICATION_CODE\]/);
  assert.match(result.sanitized, /\[SERIAL_NUMBER\]/);
  assert.doesNotMatch(result.sanitized, /test@example\.com|13800138000|490154203237518|123456|C02ABC123XYZ/);
});

test("does not treat ordinary troubleshooting text as sensitive", () => {
  const result = sanitizeAiInput("iPhone 插在 Mac 上能充电，但 Finder 里看不到。");
  assert.equal(result.sanitized, "iPhone 插在 Mac 上能充电，但 Finder 里看不到。");
  assert.deepEqual(result.replacements, []);
});
