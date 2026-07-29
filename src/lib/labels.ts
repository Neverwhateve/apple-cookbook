export const verificationLabels = {
  Official: "主方案：Apple 官方",
  Verified: "已验证",
  Likely: "较可能",
  Experimental: "实验性",
  Unknown: "待确认"
} as const;

/** The permission an employee has when choosing a path in front of a customer. */
export const verificationActionLabels = {
  Official: "可直接按官方路径处理",
  Verified: "符合条件时可用",
  Likely: "先确认条件再使用",
  Experimental: "不是标准处理路径",
  Unknown: "暂勿作为处理建议"
} as const;

export const verificationDescriptions = {
  Official: "可直接按 Apple 官方路径处理；社区和同事实践会单独标注，不与官方步骤混用。",
  Verified: "有可靠来源或重复实践验证，但不是 Apple 官方结论；只在条件匹配时使用。",
  Likely: "有一定案例或逻辑支持，但必须先确认条件，不能作为默认修复承诺。",
  Experimental: "只在部分场景验证，不是门店标准路径；先阅读风险与限制。",
  Unknown: "证据不足，暂时不能作为顾客设备的处理建议。"
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
