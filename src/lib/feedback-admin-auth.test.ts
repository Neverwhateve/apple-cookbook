import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { canUseAdminCredentials } from "./feedback-admin.ts";

const originalEnvironment = {
  accounts: process.env.APPLE_COOKBOOK_ADMIN_ACCOUNTS_BASE64,
  username: process.env.APPLE_COOKBOOK_ADMIN_USERNAME,
  password: process.env.APPLE_COOKBOOK_ADMIN_PASSWORD,
  nodeEnv: process.env.NODE_ENV
};

function restoreEnvironment(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
    return;
  }

  (process.env as Record<string, string | undefined>)[name] = value;
}

afterEach(() => {
  restoreEnvironment("APPLE_COOKBOOK_ADMIN_ACCOUNTS_BASE64", originalEnvironment.accounts);
  restoreEnvironment("APPLE_COOKBOOK_ADMIN_USERNAME", originalEnvironment.username);
  restoreEnvironment("APPLE_COOKBOOK_ADMIN_PASSWORD", originalEnvironment.password);
  restoreEnvironment("NODE_ENV", originalEnvironment.nodeEnv);
});

describe("administrator account authentication", () => {
  it("accepts any configured account while rejecting non-members", () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "test";
    process.env.APPLE_COOKBOOK_ADMIN_ACCOUNTS_BASE64 = Buffer.from(
      JSON.stringify([
        { username: "FirstAdmin", password: "test-password-first" },
        { username: "SecondAdmin", password: "test-password-second" }
      ])
    ).toString("base64");

    assert.equal(canUseAdminCredentials("FirstAdmin", "test-password-first"), true);
    assert.equal(canUseAdminCredentials("SecondAdmin", "test-password-second"), true);
    assert.equal(canUseAdminCredentials("FirstAdmin", "wrong"), false);
    assert.equal(canUseAdminCredentials("Unknown", "test-password-first"), false);
  });

  it("fails closed when an explicit multi-account payload is malformed", () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "test";
    process.env.APPLE_COOKBOOK_ADMIN_ACCOUNTS_BASE64 = "not a base64 payload";
    process.env.APPLE_COOKBOOK_ADMIN_USERNAME = "admin";
    process.env.APPLE_COOKBOOK_ADMIN_PASSWORD = "legacy-password";

    assert.equal(canUseAdminCredentials("admin", "legacy-password"), false);
  });
});
