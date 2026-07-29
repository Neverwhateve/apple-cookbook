type CategoryPresentation = {
  label: string;
  description: string;
};

const knownCategories: Record<string, CategoryPresentation> = {
  AirPods: { label: "AirPods", description: "连接、声音、充电与固件" },
  "Apple ID": { label: "Apple 账户（Apple ID）", description: "账户、密码、登录与激活锁定" },
  "Apple Watch": { label: "Apple Watch", description: "配对、同步、充电与日常使用" },
  "Family Sharing": { label: "家庭共享", description: "屏幕使用时间、儿童账号与购买请求" },
  HomePod: { label: "HomePod", description: "设置、播放与家庭控制" },
  iCloud: { label: "iCloud", description: "备份、同步、储存空间与照片" },
  iPad: { label: "iPad", description: "键盘、触控与系统功能" },
  iPhone: { label: "iPhone", description: "设置、连接、支付与日常故障" },
  Mac: { label: "Mac", description: "系统、储存、登录与硬件功能" },
  Networking: { label: "网络与热点", description: "Wi‑Fi、个人热点与连接问题" },
  查找: { label: "查找", description: "位置共享、设备定位与离线查找" },
  连续互通: { label: "连续互通", description: "隔空投送、跨设备发现与连接" }
};

export function categoryPresentation(category: string): CategoryPresentation {
  return knownCategories[category] ?? { label: category, description: "浏览这个主题下的排查文章" };
}
