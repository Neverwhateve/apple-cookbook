import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getPublishedSearchDocuments } from "./cookbook.ts";
import { searchDocuments } from "./search.ts";

type RankedCorpusCase = {
  readonly query: string;
  readonly expectedTopId: string;
  readonly expectedRoute: string;
};

const rankedCases: readonly RankedCorpusCase[] = [
  {
    query: "为什么看不到家人的位置",
    expectedTopId: "location-sharing-not-working",
    expectedRoute: "/recipes/Find%20My/location-sharing-not-working"
  },
  {
    query: "wifi连不上",
    expectedTopId: "iphone-ipad-wifi-no-internet-unable-to-join",
    expectedRoute: "/recipes/Networking/iphone-ipad-wifi-no-internet-unable-to-join"
  },
  {
    query: "Mac邮件发不出去",
    expectedTopId: "mac-mail-cant-send-receive-email",
    expectedRoute: "/recipes/Mac/mac-mail-cant-send-receive-email"
  },
  {
    query: "系统数据很大",
    expectedTopId: "mac-system-data-storage-apfs-snapshots-purgeable-space",
    expectedRoute: "/recipes/Mac/mac-system-data-storage-apfs-snapshots-purgeable-space"
  },
  {
    query: "隔空投送一直等待",
    expectedTopId: "airdrop-keeps-waiting",
    expectedRoute: "/recipes/Continuity/airdrop-keeps-waiting"
  },
  {
    query: "个人热点灰色",
    expectedTopId: "iphone-personal-hotspot-not-working-greyed-out",
    expectedRoute: "/recipes/Networking/iphone-personal-hotspot-not-working-greyed-out"
  },
  {
    query: "iCloud备份失败空间不足",
    expectedTopId: "icloud-storage-full-iphone-backup-fails",
    expectedRoute: "/recipes/iCloud/icloud-storage-full-iphone-backup-fails"
  },
  {
    query: "AirPods盒子充不了电",
    expectedTopId: "airpods-wont-charge-case-not-working",
    expectedRoute: "/recipes/AirPods/airpods-wont-charge-case-not-working"
  },
  {
    query: "屏幕时间限制没用",
    expectedTopId: "screen-time-limits-not-blocking",
    expectedRoute: "/recipes/Family%20Sharing/screen-time-limits-not-blocking"
  },
  {
    query: "Apple Pay刷卡失败",
    expectedTopId: "apple-pay-declined-terminal-not-working",
    expectedRoute: "/recipes/iPhone/apple-pay-declined-terminal-not-working"
  },
  {
    query: "钱包添加不了卡",
    expectedTopId: "apple-wallet-cant-add-card-apple-pay",
    expectedRoute: "/recipes/iPhone/apple-wallet-cant-add-card-apple-pay"
  },
  {
    query: "忘记Mac登录密码",
    expectedTopId: "mac-forgot-login-password-reset",
    expectedRoute: "/recipes/Mac/mac-forgot-login-password-reset"
  },
  {
    query: "信息绿色 激活等待",
    expectedTopId: "iphone-imessage-messages-not-sending-green-waiting-activation",
    expectedRoute: "/recipes/iPhone/iphone-imessage-messages-not-sending-green-waiting-activation"
  },
  {
    query: "iPhone SOS无服务",
    expectedTopId: "iphone-sos-no-service-searching",
    expectedRoute: "/recipes/iPhone/iphone-sos-no-service-searching"
  },
  {
    query: "Apple ID密码忘了",
    expectedTopId: "apple-account-verification-failed",
    expectedRoute: "/recipes/Apple%20ID/apple-account-verification-failed"
  },
  {
    query: "忘记Apple账号密码",
    expectedTopId: "apple-account-verification-failed",
    expectedRoute: "/recipes/Apple%20ID/apple-account-verification-failed"
  },
  {
    query: "Forgot my Apple ID password",
    expectedTopId: "apple-account-verification-failed",
    expectedRoute: "/recipes/Apple%20ID/apple-account-verification-failed"
  }
];

const chargingAtEightyArticle = {
  id: "iphone-charging-paused-80-temperature-charge-limit",
  route: "/recipes/iPhone/iphone-charging-paused-80-temperature-charge-limit"
} as const;

const screenTimeLimitsArticleId = "screen-time-limits-not-blocking";

describe("real cookbook search corpus", () => {
  const documents = getPublishedSearchDocuments();

  for (const benchmark of rankedCases) {
    it(`keeps ${JSON.stringify(benchmark.query)} mapped to its intended article`, () => {
      const hits = searchDocuments(documents, benchmark.query);
      const topResult = hits[0]?.document;

      assert.ok(topResult, `Expected a result for ${JSON.stringify(benchmark.query)}`);
      assert.equal(topResult.id, benchmark.expectedTopId);
      assert.equal(topResult.route, benchmark.expectedRoute);
    });
  }

  it("maps 80-percent charging only when its canonical article is present", () => {
    const query = "充电到80";
    const hits = searchDocuments(documents, query);
    const canonicalExists = documents.some(
      (document) => document.id === chargingAtEightyArticle.id && document.status === "canonical"
    );

    if (!canonicalExists) {
      assert.deepEqual(
        hits,
        [],
        `${JSON.stringify(query)} must not fall back to a generic charging article`
      );
      return;
    }

    assert.equal(hits[0]?.document.id, chargingAtEightyArticle.id);
    assert.equal(hits[0]?.document.route, chargingAtEightyArticle.route);
  });

  it("does not replace the 80-percent canonical with tangential corpus mentions", () => {
    const withoutCanonical = documents.filter(
      (document) => document.id !== chargingAtEightyArticle.id
    );

    assert.deepEqual(searchDocuments(withoutCanonical, "充电到80"), []);
  });

  it("does not replace Screen Time limits with a request article sharing an App Limits tag", () => {
    const withoutCanonical = documents.filter(
      (document) => document.id !== screenTimeLimitsArticleId
    );

    assert.deepEqual(searchDocuments(withoutCanonical, "屏幕时间限制没用"), []);
  });

  it("keeps taxonomy tags searchable without treating them as canonical intent", () => {
    const requestHit = searchDocuments(documents, "Notifications").find(
      (hit) => hit.document.id === "screen-time-requests-not-working"
    );

    assert.ok(requestHit);
    assert.ok(
      requestHit.matchedFields.some(
        (field) => field.field === "keywords" && field.terms.includes("notifications")
      )
    );
  });
});
