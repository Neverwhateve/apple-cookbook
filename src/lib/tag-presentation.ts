type TagTopicDefinition = {
  slug: string;
  label: string;
  description: string;
  tags: readonly string[];
};

export type TagTopic = Omit<TagTopicDefinition, "tags"> & {
  count: number;
};

/**
 * Reader-facing tag navigation deliberately stays smaller than the article
 * taxonomy. Article tags remain complete search keywords; this list only
 * collects the recurring problems people can reasonably browse by.
 */
const tagTopics: readonly TagTopicDefinition[] = [
  {
    slug: "电池与充电",
    label: "电池与充电",
    description: "续航、发热、无法充电与液体检测",
    tags: ["Battery", "电池", "Charging", "充电", "Power", "Heat", "发热", "液体检测", "USB-C", "Lightning"]
  },
  {
    slug: "网络与连接",
    label: "网络与连接",
    description: "Wi-Fi、蓝牙、VPN 与设备配对",
    tags: ["Wi-Fi", "Network", "网络", "Internet", "Router", "VPN", "Bluetooth", "蓝牙", "Pairing"]
  },
  {
    slug: "蜂窝网络与SIM",
    label: "蜂窝网络与 SIM",
    description: "无服务、运营商、SIM 与 eSIM",
    tags: ["Cellular", "Carrier", "SIM", "eSIM"]
  },
  {
    slug: "Apple账户与安全",
    label: "Apple 账户与安全",
    description: "登录、密码、验证与设备保护",
    tags: [
      "Apple ID",
      "Apple Account",
      "Apple 账户",
      "Passcode",
      "Password",
      "Login Password",
      "Recovery",
      "Activation",
      "Activation Lock",
      "Security Lockout",
      "Stolen Device Protection",
      "Security Delay",
      "账号安全"
    ]
  },
  {
    slug: "家庭共享与屏幕使用时间",
    label: "家庭共享与屏幕使用时间",
    description: "儿童账号、购买请求与使用限制",
    tags: ["Family Sharing", "家人共享", "Screen Time", "App Limits", "Downtime", "Ask to Buy", "Notifications"]
  },
  {
    slug: "备份与存储空间",
    label: "备份与存储空间",
    description: "iCloud 备份、系统数据与迁移",
    tags: ["iCloud", "iCloud Backup", "Backup", "Storage", "System Data", "APFS", "Time Machine", "Transfer", "数据迁移", "设置助理"]
  },
  {
    slug: "系统更新与启动",
    label: "系统更新与启动",
    description: "更新失败、安装卡住、开机与恢复",
    tags: ["Software Update", "软件更新", "Update", "Firmware", "DFU", "Startup", "Installation", "Reset"]
  },
  {
    slug: "查找与位置共享",
    label: "查找与位置共享",
    description: "设备定位、位置共享与离线查找",
    tags: ["Find My", "查找", "位置共享"]
  },
  {
    slug: "钱包与支付",
    label: "钱包与支付",
    description: "Apple Pay、卡片与付款设置",
    tags: ["Wallet", "Apple Pay", "Payments", "NFC"]
  },
  {
    slug: "隐私与设备功能",
    label: "隐私与设备功能",
    description: "权限、相机、面容与辅助功能",
    tags: ["Privacy", "隐私", "Accessibility", "VoiceOver", "AssistiveTouch", "Camera", "Face ID", "Touch ID"]
  },
  {
    slug: "信息与通话",
    label: "信息与通话",
    description: "信息、电话、邮件与 FaceTime",
    tags: ["Messages", "iMessage", "RCS", "SMS", "Mail", "Email", "FaceTime"]
  },
  {
    slug: "家庭与影音",
    label: "家庭与影音",
    description: "HomeKit、家庭中枢、音频与 AirPlay",
    tags: ["HomeKit", "Home App", "Home Hub", "Matter", "Thread", "Audio", "AirPlay"]
  }
];

function matchesTopic(articleTags: readonly string[], topic: TagTopicDefinition) {
  return articleTags.some((tag) => topic.tags.includes(tag));
}

export function getTagTopics(articles: ReadonlyArray<{ tags: readonly string[] }>): TagTopic[] {
  return tagTopics
    .map((topic) => ({
      slug: topic.slug,
      label: topic.label,
      description: topic.description,
      count: articles.filter((article) => matchesTopic(article.tags, topic)).length
    }))
    .filter((topic) => topic.count > 0)
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label, "zh-CN"));
}

export function getTagTopic(slug: string) {
  return tagTopics.find((topic) => topic.slug === slug);
}

export function getArticlesForTagTopic<T extends { tags: readonly string[] }>(articles: readonly T[], slug: string): T[] {
  const topic = getTagTopic(slug);
  return topic ? articles.filter((article) => matchesTopic(article.tags, topic)) : [];
}

export function getArticleTagTopics(articleTags: readonly string[]) {
  return tagTopics.filter((topic) => matchesTopic(articleTags, topic));
}
