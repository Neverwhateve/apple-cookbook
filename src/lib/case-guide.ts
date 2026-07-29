export type CaseGuideInput = {
  title: string;
  tags: readonly string[];
  symptoms: readonly string[];
};

export type CaseGuide = {
  questions: readonly [string, string, string];
};

type GuideRule = CaseGuide & { matches: (input: CaseGuideInput) => boolean };

function searchableText({ title, tags, symptoms }: CaseGuideInput) {
  return [title, ...tags, ...symptoms].join(" ").toLocaleLowerCase("zh-CN");
}

function hasAny(input: CaseGuideInput, terms: readonly string[]) {
  const text = searchableText(input);
  return terms.some((term) => text.includes(term.toLocaleLowerCase("zh-CN")));
}

const guides: readonly GuideRule[] = [
  {
    matches: (input) => hasAny(input, ["安全锁定", "激活锁", "apple 账户", "apple id", "密码", "失窃设备保护", "付款"]),
    questions: [
      "顾客要完成的具体操作是什么？这是设备密码、Apple 账户，还是付款/所有权问题？",
      "设备是否属于顾客本人，且顾客能自行完成所需的认证？不要要求顾客说出密码。",
      "是否已经涉及激活锁、数据、隐私或付款风险？如果是，先停止一般排查。"
    ]
  },
  {
    matches: (input) => hasAny(input, ["发热", "很烫", "电池", "charging", "充电", "battery"]),
    questions: [
      "发热只在充电时发生，还是日常使用、更新后或待机时也会发生？",
      "是否同时出现掉电快、充电暂停、无法充电、异常重启或安全提示？",
      "设备是否异常高温、鼓包、破损或无法安全使用？如果是，立即停止常规排查。"
    ]
  },
  {
    matches: (input) => hasAny(input, ["通知", "notifications", "微信", "提醒"]),
    questions: [
      "只有一个 App 收不到，还是所有 App 都有同样情况？",
      "消息根本没有到设备，还是只缺少声音、横幅或锁定屏幕提醒？",
      "是否正在使用 Apple Watch、专注模式或通知摘要，导致提醒显示在别处或被延后？"
    ]
  },
  {
    matches: (input) => hasAny(input, ["wifi", "无线局域网", "个人热点", "网络", "airdrop", "隔空投送", "homekit", "homepod"]),
    questions: [
      "是这一台设备、这一张网络，还是所有设备和网络都会发生？",
      "问题是找不到网络/设备、无法加入，还是已连接但没有互联网或传输失败？",
      "是否使用 VPN、个人热点、桥接器或公司/学校网络等会改变连接条件的环境？"
    ]
  },
  {
    matches: (input) => hasAny(input, ["airpods", "蓝牙", "配对", "音频", "声音"]),
    questions: [
      "设备是真的断开连接，还是仍显示已连接但声音去了另一台设备或出现断续？",
      "问题影响两只耳机、单只耳机，还是只在一台来源设备或一个 App 中发生？",
      "是否有充电、进液、破损、异常发热或更换单只耳机/充电盒等会改变下一步的情况？"
    ]
  }
];

const defaultGuide: CaseGuide = {
  questions: [
    "这个现象从什么时候开始？是否在更新、设置、迁移或更换配件后出现？",
    "是所有场景都会发生，还是只影响一个 App、设备或配件？",
    "屏幕上是否有提示、警告，或已经影响到设备能否稳定使用？"
  ]
};

/**
 * Deterministic retail triage: it selects only from reviewed, authored
 * questions. It deliberately makes no inference beyond the article’s own
 * title, tags, and customer symptoms.
 */
export function getCaseGuide(input: CaseGuideInput): CaseGuide {
  return guides.find((guide) => guide.matches(input)) ?? defaultGuide;
}
