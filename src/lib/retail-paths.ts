export type RetailPath = {
  id: string;
  label: string;
  description: string;
  query?: string;
  href?: string;
};

export type RetailPathGroup = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  paths: readonly RetailPath[];
};

/**
 * A deliberately short set of retail entry points. These are not a second
 * taxonomy: each one gets an employee back to customer language and the same
 * ranked search used on the home page.
 */
export const retailPathGroups: readonly RetailPathGroup[] = [
  {
    id: "symptoms",
    eyebrow: "顾客正在遇到的问题",
    title: "先从现象开始",
    description: "适合顾客已经在描述“哪里不对”。先选现象，再确认范围与条件。",
    paths: [
      {
        id: "slow-or-hot",
        label: "变慢、掉电或发热",
        description: "性能、更新后耗电、充电温度保护与安全边界。",
        query: "我的 iPhone 很烫"
      },
      {
        id: "connection",
        label: "连不上、总断开",
        description: "Wi‑Fi、蓝牙、AirPods、热点与配对。",
        query: "无法连接"
      },
      {
        id: "alerts",
        label: "收不到通知或消息",
        description: "通知显示、专注模式、信息和 App 提醒。",
        query: "微信收不到通知"
      },
      {
        id: "power",
        label: "充不上电或无法开机",
        description: "充电、液体检测、开机与需停止排查的情况。",
        query: "充不上电"
      },
      {
        id: "account",
        label: "忘记密码、无法登录",
        description: "设备密码、Apple 账户、激活锁与账户安全。",
        query: "忘记密码 无法登录"
      },
      {
        id: "cellular",
        label: "无服务、SIM 或 eSIM",
        description: "蜂窝网络、实体 SIM、eSIM 与运营商边界。",
        query: "无服务 SIM"
      }
    ]
  },
  {
    id: "setup",
    eyebrow: "顾客想完成一件事",
    title: "设置、迁移和开始使用",
    description: "适合没有故障、但需要把设备或功能正确用起来的对话。",
    paths: [
      {
        id: "pair-airpods",
        label: "连接 AirPods 或重新配对",
        description: "开始配对前先确认设备、充电和已有连接。",
        query: "AirPods 配对"
      },
      {
        id: "transfer-esim",
        label: "转移 eSIM 或开通蜂窝网络",
        description: "把设备设置和运营商条件分开确认。",
        query: "eSIM 转移"
      },
      {
        id: "icloud-backup",
        label: "备份、照片同步或腾出空间",
        description: "先弄清 iCloud、设备储存空间和同步条件。",
        query: "iCloud 储存空间已满"
      },
      {
        id: "family-controls",
        label: "设置家庭共享或屏幕使用时间",
        description: "儿童账户、购买请求、使用限制和家庭成员。",
        query: "屏幕使用时间 不生效"
      },
      {
        id: "find-my",
        label: "共享位置或查找设备",
        description: "确认共享对象、位置状态与隐私边界。",
        query: "看不到家人的位置"
      },
      {
        id: "share-content",
        label: "隔空投送或个人热点",
        description: "跨设备分享与网络共享的现场设置。",
        query: "个人热点 不工作"
      }
    ]
  },
  {
    id: "service",
    eyebrow: "不要继续试错",
    title: "安全、数据和服务判断",
    description: "出现红灯时，先保护顾客与设备，再带着清楚的事实进入下一步。",
    paths: [
      {
        id: "service-triage",
        label: "判断是否应停止常规排查",
        description: "异常高温、物理损伤、稳定性、账户和数据风险。",
        href: "/service"
      },
      {
        id: "liquid-or-charge",
        label: "进液、异常发热或无法安全充电",
        description: "先确认安全边界，不要尝试绕过保护提示。",
        query: "液体检测 无法充电"
      },
      {
        id: "activation-or-ownership",
        label: "激活锁或设备所有权",
        description: "不要索要密码，也不要在没有计划时抹掉设备。",
        query: "激活锁 无法激活"
      }
    ]
  }
];

export function retailPathHref(path: RetailPath) {
  if (path.href) return path.href;
  return `/?q=${encodeURIComponent(path.query ?? "")}#site-search`;
}
