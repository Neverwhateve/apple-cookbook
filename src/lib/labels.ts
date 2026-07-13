export const verificationLabels = {
  Official: "主方案：Apple 官方",
  Verified: "已验证",
  Likely: "较可能",
  Experimental: "实验性",
  Unknown: "待确认"
} as const;

export const verificationDescriptions = {
  Official: "推荐步骤有 Apple 官方来源；文章中的社区经验会单独标注。",
  Verified: "该方法有可靠来源或实际验证，但不是 Apple 官方结论。",
  Likely: "该方法有一定案例或逻辑支持，仍需结合具体环境判断。",
  Experimental: "该方法只在部分场景中验证，使用前请先阅读风险与限制。",
  Unknown: "目前证据不足，不能确认该方法是否有效。"
} as const;

export const difficultyLabels = {
  Quick: "快速",
  Moderate: "中等",
  Advanced: "进阶"
} as const;

export const statusLabels = {
  seed: "初始条目",
  draft: "草稿",
  reviewed: "已复核",
  canonical: "标准条目"
} as const;
