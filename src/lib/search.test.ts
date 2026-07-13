import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeSearchText, searchDocuments } from "./search.ts";
import type { SearchDocument } from "./search.ts";

function makeDocument(overrides: Partial<SearchDocument>): SearchDocument {
  return {
    id: "default",
    title: "默认文章",
    route: "/recipes/default",
    summary: "用于搜索测试的默认文章。",
    symptoms: [],
    keywords: [],
    intentKeywords: [],
    aliases: [],
    devices: [],
    platforms: [],
    systemVersions: [],
    errorMessages: [],
    officialTerms: [],
    communityTerms: [],
    solutionSteps: [],
    category: "测试",
    verification: "Official",
    difficulty: "Quick",
    updated: "2026-07-13",
    status: "canonical",
    ...overrides
  };
}

const documents: SearchDocument[] = [
  makeDocument({
    id: "find-my-location",
    title: "查找 App 中无法看到家庭成员位置",
    route: "/recipes/find-my/location-sharing-not-working",
    summary: "家人共享已开启，但联系人位置不显示或长时间不更新。",
    symptoms: ["查找里面看不到家人的位置", "老婆位置看不到"],
    keywords: ["位置共享", "家人共享"],
    aliases: ["Family location not showing", "I cannot see my family location"],
    devices: ["iPhone", "iPad"],
    platforms: ["iOS", "iPadOS"],
    officialTerms: ["查找", "共享我的位置"],
    solutionSteps: ["打开“查找”，确认已开启“共享我的位置”。"],
    category: "查找"
  }),
  makeDocument({
    id: "wifi-no-internet",
    title: "iPhone 或 iPad 无法连接 Wi-Fi",
    route: "/recipes/networking/wifi-no-internet",
    summary: "设备无法加入无线局域网，或连接后显示无互联网连接。",
    symptoms: ["输入密码后提示无法加入网络", "无线网络连不上"],
    keywords: ["Wi-Fi", "WLAN", "网络"],
    aliases: ["iPhone unable to join network", "WiFi no internet"],
    devices: ["iPhone", "iPad"],
    platforms: ["iOS", "iPadOS"],
    solutionSteps: ["确认飞行模式已关闭，再重新加入 Wi-Fi。"],
    category: "Networking"
  }),
  makeDocument({
    id: "charging-at-80",
    title: "iPhone 充电停在 80% 或显示充电暂停",
    route: "/recipes/iphone/charging-paused-80",
    summary: "这通常与充电上限、优化电池充电或温度保护有关。",
    symptoms: ["iPhone 充到 80% 就不动了"],
    keywords: ["充电", "温度", "充电上限"],
    aliases: ["iPhone charging paused at 80", "iPhone charge limit 80"],
    devices: ["iPhone"],
    platforms: ["iOS"],
    systemVersions: ["iOS 18"],
    officialTerms: ["优化电池充电"],
    solutionSteps: ["在“设置 > 电池 > 充电”中检查充电上限。"],
    category: "iPhone"
  }),
  makeDocument({
    id: "battery-health",
    title: "iPhone Battery Health 与电池健康说明",
    route: "/recipes/iphone/battery-health",
    summary: "查看最大容量、峰值性能容量和维修建议。",
    symptoms: ["battery health 显示维修"],
    keywords: ["电池健康"],
    devices: ["iPhone"],
    platforms: ["iOS"],
    officialTerms: ["Battery Health"],
    category: "iPhone"
  }),
  makeDocument({
    id: "mac-system-data",
    title: "Mac 储存空间中的系统数据、APFS 快照与可清除空间",
    route: "/recipes/mac/system-data-and-apfs-snapshots",
    summary: "了解系统数据占用过多时，哪些内容可由 macOS 自动清除。",
    symptoms: ["系统数据占了很多空间"],
    keywords: ["系统数据", "APFS", "可清除空间"],
    aliases: ["Mac System Data taking up space"],
    devices: ["Mac"],
    platforms: ["macOS"],
    officialTerms: ["System Data", "Purgeable Space"],
    category: "Mac",
    difficulty: "Moderate"
  }),
  makeDocument({
    id: "restore-error-4013",
    title: "恢复 iPhone 时出现错误 4013",
    route: "/recipes/iphone/restore-error-4013",
    summary: "电脑更新或恢复 iPhone 时显示 4013，可先检查连接和系统版本。",
    keywords: ["恢复", "更新"],
    devices: ["iPhone"],
    platforms: ["iOS", "macOS"],
    errorMessages: ["错误 4013", "The iPhone could not be restored. An unknown error occurred (4013)."],
    solutionSteps: ["更新 macOS 或 Apple Devices，然后更换 USB 线缆重试。"],
    category: "恢复"
  }),
  makeDocument({
    id: "restore-error-4014",
    title: "恢复 iPhone 时出现错误 4014",
    route: "/recipes/iphone/restore-error-4014",
    summary: "电脑恢复 iPhone 时显示错误 4014。",
    devices: ["iPhone"],
    platforms: ["iOS", "macOS"],
    errorMessages: ["错误 4014"],
    category: "恢复"
  }),
  makeDocument({
    id: "airpods-pairing",
    title: "AirPods 无法连接或重新配对",
    route: "/recipes/airpods/pairing",
    summary: "AirPods 不出现在蓝牙列表中时，重新放入充电盒并重置。",
    symptoms: ["蓝牙找不到耳机"],
    keywords: ["AirPods", "蓝牙", "配对"],
    devices: ["AirPods"],
    platforms: ["iOS"],
    category: "AirPods"
  })
];

describe("normalizeSearchText", () => {
  it("normalizes punctuation and inserts mixed Chinese/English boundaries", () => {
    assert.equal(normalizeSearchText("iPhone为什么连不上Wi‑Fi？"), "iphone 为什么连不上 wi fi");
  });
});

describe("searchDocuments", () => {
  it("maps conversational family-location symptoms to the canonical article", () => {
    const hits = searchDocuments(documents, "为什么看不到家人的位置");

    assert.equal(hits[0]?.document.id, "find-my-location");
    assert.ok(hits[0].termCoverage >= 0.9);
    assert.ok(hits[0].matchedFields.some((match) => match.kinds.includes("synonym")));
    assert.match(hits[0].snippet, /位置|家人/);
  });

  it("matches compact mixed-language Wi-Fi input through synonyms", () => {
    const hits = searchDocuments(documents, "wifi连不上");

    assert.equal(hits[0]?.document.id, "wifi-no-internet");
    assert.ok(hits[0].matchedFields.some((match) => match.field === "title"));
  });

  it("matches a spoken charging-at-80 query even when words occur between the terms", () => {
    const hits = searchDocuments(documents, "充电80");

    assert.equal(hits[0]?.document.id, "charging-at-80");
    assert.ok(hits[0].score > 0);
  });

  it("does not substitute a generic charging article when the 80-percent concept is absent", () => {
    const genericCharging = makeDocument({
      id: "iphone-wont-charge",
      title: "iPhone 无法充电或有线充电没有反应",
      summary: "检查充电线、适配器和充电端口。",
      symptoms: ["iPhone 充不上电"],
      keywords: ["充电", "电源"]
    });
    const withoutChargingAtEighty = [
      ...documents.filter((document) => document.id !== "charging-at-80"),
      genericCharging
    ];

    assert.deepEqual(searchDocuments(withoutChargingAtEighty, "充电到80"), []);
  });

  it("does not treat a tangential 80-percent solution mention as the article intent", () => {
    const tangentialCharging = makeDocument({
      id: "airpods-optimized-charging",
      title: "AirPods 充电盒没有反应",
      summary: "检查充电盒、线缆和电源。",
      keywords: ["AirPods", "充电盒"],
      solutionSteps: ["必要时检查优化充电上限，电量可能停在 80%。"]
    });

    assert.deepEqual(searchDocuments([tangentialCharging], "充电到80"), []);
  });

  it("does not let broad searchable tags satisfy a required canonical intent", () => {
    const screenTimeRequest = makeDocument({
      id: "screen-time-request",
      title: "屏幕使用时间请求收不到或批准后不生效",
      summary: "孩子请求更多时间后，家长没有收到请求或批准没有同步。",
      // Search documents merge taxonomy tags into `keywords`; App Limits must
      // remain searchable without making this the limits canonical.
      keywords: ["Screen Time", "App Limits"],
      intentKeywords: [],
      symptoms: ["批准更多时间后 App 仍被限制"]
    });

    assert.deepEqual(searchDocuments([screenTimeRequest], "屏幕时间限制没用"), []);
  });

  it("allows explicit frontmatter keywords to opt into a required intent", () => {
    const limitsCanonical = makeDocument({
      id: "screen-time-limits",
      title: "家长控制没有按预期生效",
      summary: "检查孩子设备上的限制设置。",
      keywords: ["Screen Time", "App Limits"],
      intentKeywords: ["App Limits"]
    });

    assert.equal(
      searchDocuments([limitsCanonical], "屏幕时间限制没用")[0]?.document.id,
      "screen-time-limits"
    );
  });

  it("does not substitute an AirPods pairing article for a charging-case failure", () => {
    const pairingOnly = documents.filter((document) => document.id === "airpods-pairing");

    assert.deepEqual(searchDocuments(pairingOnly, "AirPods盒子充不了电"), []);
  });

  it("does not substitute usage reporting for a Screen Time limits failure", () => {
    const usageReporting = makeDocument({
      id: "screen-time-usage",
      title: "家长看不到孩子的屏幕使用时间明细",
      summary: "家人共享中的使用报告没有更新。",
      symptoms: ["屏幕使用时间不显示"],
      keywords: ["屏幕使用时间", "家人共享"]
    });

    assert.deepEqual(searchDocuments([usageReporting], "屏幕时间限制没用"), []);
  });

  it("does not substitute card setup for a declined Apple Pay transaction", () => {
    const cardSetup = makeDocument({
      id: "wallet-card-setup",
      title: "Apple 钱包无法添加银行卡",
      summary: "卡片无法加入 Apple Wallet 时检查银行验证。",
      symptoms: ["添加银行卡失败"],
      keywords: ["Apple Pay", "钱包", "银行卡"]
    });

    assert.deepEqual(searchDocuments([cardSetup], "Apple Pay刷卡失败"), []);
  });

  it("does not return an unrelated article for a Wallet add-card symptom", () => {
    const genericMail = makeDocument({
      id: "mac-mail",
      title: "Mac 邮件无法发送或接收邮件",
      summary: "邮件账户离线时检查网络与账户设置。",
      keywords: ["Mac", "邮件"]
    });

    assert.deepEqual(searchDocuments([genericMail], "钱包添加不了卡"), []);
  });

  it("keeps an Apple Account password query away from device passcode recovery", () => {
    const accountPassword = makeDocument({
      id: "apple-account-password",
      title: "Apple 账户无法登录",
      summary: "无法访问账户时检查密码和可信设备。",
      aliases: ["Apple ID 密码忘了", "Forgot Apple ID password"],
      keywords: ["Apple 账户", "账户恢复"]
    });
    const devicePasscode = makeDocument({
      id: "iphone-forgot-passcode",
      title: "iPhone 不可用或忘记锁屏密码",
      summary: "忘记设备密码时可能需要抹掉 iPhone。",
      aliases: ["forgot iPhone passcode"],
      keywords: ["锁屏密码", "安全锁定"]
    });

    for (const query of [
      "Apple ID密码忘了",
      "忘记Apple账号密码",
      "我忘了Apple ID的密码",
      "Forgot my Apple ID password"
    ]) {
      const hits = searchDocuments([devicePasscode, accountPassword], query);

      assert.equal(hits[0]?.document.id, "apple-account-password", query);
      assert.ok(hits.every((hit) => hit.document.id !== "iphone-forgot-passcode"), query);
    }
  });

  it("handles an adjacent English typo with edit distance one", () => {
    const hits = searchDocuments(documents, "battrey");

    assert.equal(hits[0]?.document.id, "battery-health");
    assert.ok(hits[0].matchedFields.some((match) => match.kinds.includes("fuzzy")));
  });

  it("maps a plain-language storage symptom when a matching document exists", () => {
    const hits = searchDocuments(documents, "系统数据很大");

    assert.equal(hits[0]?.document.id, "mac-system-data");
    assert.ok(hits[0].termCoverage >= 0.9);
  });

  it("does not substitute a generic storage article when the system-data concept is absent", () => {
    const genericStorage = makeDocument({
      id: "icloud-storage-full",
      title: "iCloud 储存空间已满",
      summary: "云端空间不足会导致备份失败。",
      symptoms: ["储存占用很大"],
      keywords: ["空间不足", "备份"]
    });
    const withoutSystemData = [
      ...documents.filter((document) => document.id !== "mac-system-data"),
      genericStorage
    ];

    assert.deepEqual(searchDocuments(withoutSystemData, "系统数据很大"), []);
  });

  it("treats an error code as an exact hard constraint", () => {
    const hits = searchDocuments(documents, "iPhone 错误代码 4013");

    assert.equal(hits[0]?.document.id, "restore-error-4013");
    assert.ok(hits.every((hit) => hit.document.id !== "restore-error-4014"));
    assert.ok(hits[0].matchedFields.some((match) => match.kinds.includes("error-code")));
  });

  it("returns no result for an unrelated query", () => {
    assert.deepEqual(searchDocuments(documents, "火星天气预报"), []);
  });

  it("honours an explicit result limit without mutating input order", () => {
    const originalIds = documents.map((document) => document.id);
    const hits = searchDocuments(documents, "iphone", 2);

    assert.equal(hits.length, 2);
    assert.deepEqual(
      documents.map((document) => document.id),
      originalIds
    );
  });
});
