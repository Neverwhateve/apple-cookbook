export type CustomerMoment = {
  title: string;
  description: string;
  demo: string[];
  completionCheck: string;
  talkingPoint: string;
};

type MomentRule = CustomerMoment & { requiredTags: readonly string[] };

const momentRules: readonly MomentRule[] = [
  {
    requiredTags: ["AirPods", "Find My"],
    title: "问题稳定后，可顺带完成“查找”教育",
    description: "只在 AirPods 已正常连接、顾客愿意了解时，确认对方知道在哪里查看设备状态和功能设置。",
    demo: ["打开“查找”App，让顾客看到设备和相关设置入口。", "说明不同机型和设置可用的功能可能不同；以顾客自己的设备画面为准。"],
    completionCheck: "请顾客自己返回“查找”App，并指出下次会从哪里查看 AirPods。",
    talkingPoint: "“现在连接已经恢复。如果你愿意，我可以带你看一下以后在哪里确认它的状态和设置。”"
  },
  {
    requiredTags: ["AirPods", "Continuity", "自动切换"],
    title: "问题稳定后，可顺带说明自动切换",
    description: "只在顾客确认问题来自设备切换、且愿意了解时，说明音频为何可能转到另一台设备，以及下次在哪里确认当前输出。",
    demo: ["让顾客在自己的设备上确认当前音频输出位置。", "说明自动切换取决于设备、账户和使用状态；不要承诺所有场景都会自动切换。"],
    completionCheck: "请顾客自行确认一次当前音频输出位置，再结束这次讲解。",
    talkingPoint: "“刚才更像是音频切到了另一台设备，而不是 AirPods 损坏。以后你可以从这里先确认声音现在输出到哪里。”"
  },
  {
    requiredTags: ["Personal Hotspot"],
    title: "问题稳定后，可顺带演示跨设备连接",
    description: "只在顾客自己的设备、账户和网络条件已确认时，演示一次最贴近日常的连接方式。",
    demo: ["让顾客从自己的另一台设备查看可用的网络或连接入口。", "说明需要满足的设备、距离、网络和账户条件；不要承诺所有设备都会自动连接。"],
    completionCheck: "让顾客自己打开另一台设备的连接入口，并说出下一次会先检查什么。",
    talkingPoint: "“现在它可以正常连接了。我们也可以一起看一下，下一次你从另一台设备接入时会在哪里看到它。”"
  },
  {
    requiredTags: ["隔空投送"],
    title: "问题稳定后，可顺带演示隔空投送边界",
    description: "只在双方设备和接收范围已确认、顾客愿意了解时，说明下次从哪里选择接收范围，以及为什么不建议长期保持开放。",
    demo: ["让顾客在自己的设备上找到隔空投送接收范围。", "说明接收范围会影响谁能发现设备；以当下的设备选项为准。"],
    completionCheck: "请顾客自行找到接收范围设置，并确认最适合其日常使用的选项。",
    talkingPoint: "“现在已经可以传送了。为了以后既方便又安心，我们可以一起看一下接收范围从哪里调整。”"
  },
  {
    requiredTags: ["Family Sharing", "Screen Time"],
    title: "问题稳定后，可顺带确认家庭设置",
    description: "只在家庭成员与权限关系已清楚、顾客愿意继续时，帮助对方理解以后在哪里查看设置。",
    demo: ["打开对应的家庭或屏幕使用时间设置，指出顾客日后会使用的入口。", "说明不同家庭成员和儿童账户看到的选项可能不同。"],
    completionCheck: "请家长自己回到对应设置，并指出下次调整限额、请求或报告的入口。",
    talkingPoint: "“这次已经处理好了。要不要我也带你看一下，以后需要调整时从哪里进入？”"
  },
  {
    requiredTags: ["iCloud Photos"],
    title: "问题稳定后，可顺带说明同步状态",
    description: "只在同步恢复或顾客已理解当前状态时，用设备上的真实状态解释照片和 iCloud 的关系。",
    demo: ["在顾客设备上指出同步状态和相关设置入口。", "说明同步需要时间、网络和可用储存空间；不要承诺内容会在固定时间内出现。"],
    completionCheck: "请顾客自己找到同步状态，并复述什么情况需要先检查网络、储存空间或设备状态。",
    talkingPoint: "“现在我们已经知道同步卡在哪里。以后你可以从这里确认它是在继续同步，还是需要先处理空间或网络。”"
  }
];

function normalizeTag(value: string) {
  return value.trim().toLocaleLowerCase("en-US");
}

export function getCustomerMoment(tags: readonly string[]): CustomerMoment | undefined {
  const normalizedTags = new Set(tags.map(normalizeTag));
  const rule = momentRules.find((candidate) => candidate.requiredTags.every((tag) => normalizedTags.has(normalizeTag(tag))));

  if (!rule) return undefined;

  return {
    title: rule.title,
    description: rule.description,
    demo: rule.demo,
    completionCheck: rule.completionCheck,
    talkingPoint: rule.talkingPoint
  };
}
