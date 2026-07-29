---
schemaVersion: 2
id: mac-battery-wont-charge
title: Mac 电池无法充电、显示“不在充电”或只能维持电量
slug: mac-battery-wont-charge
summary: Mac 已接入电源却显示“不在充电”、电量继续下降或充电停在某个百分比时，先区分正常的电池健康暂停、供电不足、线缆和端口问题，再进入诊断或服务流程。
symptoms:
  - Mac 电池无法充电
  - Mac 显示“不在充电”
  - Mac 插着电源但电量继续下降
  - Mac 充电很慢
  - Mac 充电停在某个百分比
  - MacBook 充电指示灯闪烁
  - Mac 充电器接上没有反应
devices:
  - Mac
platforms:
  - macOS
systemVersions:
  - 当前受支持的 macOS
  - 搭载 Apple 芯片的 Mac
  - 搭载 Intel 芯片的 Mac
categories:
  - Mac
tags:
  - Mac
  - Battery
  - Charging
  - Power
  - USB-C
  - Accessory
keywords:
  - Mac 不充电
  - MacBook 不充电
  - Mac 电池不充电
  - Mac 电池状态不在充电
  - Mac 插电电量下降
  - Mac 充电停在上限
  - Mac MagSafe 闪烁
aliases:
  - Mac battery won’t charge
  - Mac battery not charging
  - Battery Is Not Charging MacBook
  - MacBook plugged in but not charging
  - MacBook charging stopped
errorMessages:
  - 不在充电
  - Battery Is Not Charging
  - 电源适配器未连接
officialTerms:
  - 电池健康管理
  - 充电上限
  - 优化电池充电
  - MagSafe
  - Apple 诊断
  - 系统管理控制器
communityTerms:
  - 插着电但电量不涨
  - 充电器没坏但 Mac 不充电
  - 换线还是不充电
difficulty: Moderate
estimatedTime: 10-20 分钟；需要诊断或维修时另计
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-status-and-power-path
    title: 先确认状态、功率和充电路径
    summary: “不在充电”不一定代表电池损坏；先看电池状态和电量变化，再用合适的电源、线缆、插座和端口做一次可观察的交叉检查。
    kind: recommended
    steps:
      - 打开菜单栏的“电池”菜单，记录显示的是“正在充电”“不在充电”还是仅连接了电源；同时记录电量是否继续下降。
      - 如果只是停在某个百分比或设置的上限，先检查“系统设置”>“电池”中的优化电池充电、充电上限和电池健康设置；这类暂停可能是正常的电池保护行为。
      - 使用 Mac 随附或与机型匹配的电源适配器和充电线，直接连接到可靠的墙上插座；不要把“能给手机充电”的低功率适配器直接当成 Mac 的等效电源。
      - 检查插座、适配器、线缆、USB-C 或 MagSafe 端口是否松动、破损或有碎屑。发现破损、异味、异常发热或电池鼓包时，停止使用，不要继续通电试验。
      - 如果使用 MagSafe，确认接头与端口清洁、干燥且没有金属碎屑；如果指示灯反复呈琥珀色闪烁，按 Apple 的 MagSafe 适配器流程重新断开、清洁、冷却并连接。
      - 将 Mac 放在阴凉、通风良好的位置，关闭暂时不需要的高负载 App 后再观察；高性能任务可能消耗的电量超过电源提供的电量。
      - 重启 Mac，并检查 macOS 和相关固件更新。搭载 Apple 芯片的 Mac 通过重新启动处理电源管理；Intel Mac 只有在符合机型条件时才按 Apple 的 SMC 指南操作。
      - 如果 Mac 曾长期存放，接入匹配的电源适配器至少 20 分钟后再判断是否仍无法充电。
    verificationLevel: Official
    sourceIds:
      - apple-mac-battery-wont-charge
      - apple-mac-not-charging-status
      - apple-magsafe-adapter
    warnings:
      - 不要使用损坏的线缆、适配器或端口，也不要用金属工具清理充电端口。
      - 不要因为电量停在某个百分比就直接判定电池故障；先检查充电上限、温度和电池健康设置。
    limitations:
      - 仅凭菜单栏状态不能确认电池、主板、电源适配器或端口的硬件状态。
      - 不同 Mac 机型支持的充电方式、适配器功率和电池设置不同。
  - id: route-charge-limit-and-not-charging
    title: 按停在百分比还是电量下降分流
    summary: 停在设置的上限、插电后电量不变、以及电量持续下降是不同表现；先记录百分比和使用负载，再决定是等待、换电源还是进入服务。
    kind: alternative
    steps:
      - 如果电量接近设置的充电上限，检查“电池”设置，并在顾客确实需要满电时使用系统提供的“立即充满”等选项；不要为了排查而随意关闭所有电池健康功能。
      - 如果显示“不在充电”且电量保持不变，优先怀疑电源功率不足或 Mac 当前负载过高；换用匹配的适配器和线缆，并在关闭高负载 App 后复测。
      - 如果显示“不在充电”且电量继续下降，先停止高负载工作并确认适配器、插座、线缆和端口；无法恢复稳定充电时进入 Apple 诊断或服务路径。
      - 如果 Mac 完全无法开机或接入电源没有任何反应，转到 [Mac 无法开机](/recipes/Mac/mac-wont-turn-on-no-power-startup) 的电源和启动分流，不要只按电池问题处理。
    verificationLevel: Official
    sourceIds:
      - apple-mac-not-charging-status
      - apple-mac-battery-wont-charge
      - apple-mac-wont-turn-on
    warnings:
      - 不要用网络帖子中的“彻底放空电池”或非官方固件操作作为标准方案；这可能增加数据和硬件风险。
    limitations:
      - 充电上限、优化电池充电和温度保护的具体入口会因机型与 macOS 版本变化。
  - id: diagnostics-and-service
    title: 官方检查后仍无法充电时执行诊断或服务
    summary: 经过匹配电源、低风险端口检查、冷却、重启和软件更新仍无法稳定充电时，不要继续盲目更换零件；记录证据并让 Apple 诊断或授权服务确认硬件。
    kind: escalation
    steps:
      - 记录 Mac 机型、芯片类型、macOS 版本、电池百分比、菜单栏状态、适配器类型、线缆类型、MagSafe 指示灯和是否在高负载运行。
      - 保存一次复测结果：换插座、换匹配线缆或适配器、拔除扩展坞和外设、冷却后重启分别发生了什么。
      - 在 Mac 能正常使用时先完成备份；不要为了排查充电问题抹掉 Mac、删除电池数据或安装来历不明的“电池修复”工具。
      - 使用 Apple 诊断检查可能的硬件组件；如果诊断给出参考代码，连同代码和复现条件一起交给 Apple 支持。
      - 如果仍无法充电、适配器或端口损坏、出现鼓包/异味/液体/异常发热，联系 Apple 或 Apple 授权服务提供商，不要自行拆机。
    verificationLevel: Official
    sourceIds:
      - apple-mac-battery-wont-charge
      - apple-magsafe-adapter
    warnings:
      - 维修或更换电池可能涉及数据、保修和安全风险；先备份并确认服务边界。
    limitations:
      - Apple 的支持文章不能远程确认具体硬件故障，也不能承诺更换某个零件一定解决问题。
warnings:
  - 不要把“电池没有立即充到 100%”与“完全无法充电”当作同一个症状。
  - 电池鼓包、进液、异味、烧蚀、适配器异常发热或线缆破损时，停止排查并进入服务路径。
  - 不要将社区建议的放电、拆机、刷固件或非原厂配件操作写成 Apple 官方方案。
limitations:
  - 本文覆盖 Mac 笔记本电脑常见的“不在充电”、充电停在设置上限、供电不足和充电配件分流，不覆盖每一种主板或电池故障。
  - 适配器功率和可充电线缆要求取决于 Mac 机型；购买替换件前应按 Apple 的机型与适配器说明确认。
  - 使用扩展坞、显示器供电、第三方线缆或企业电源管理时，现场结果可能不同。
sources:
  - id: apple-mac-battery-wont-charge
    title: 如果 Mac 电池无法充电
    url: https://support.apple.com/zh-cn/guide/mac-help/mh29198/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-29
    publishedAt: null
    official: true
  - id: apple-mac-not-charging-status
    title: 如果 Mac 电池状态是“不在充电”
    url: https://support.apple.com/zh-cn/guide/mac-help/-mh20876/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-29
    publishedAt: null
    official: true
  - id: apple-magsafe-adapter
    title: 如果 MagSafe 线缆或电源适配器无法正常工作
    url: https://support.apple.com/zh-cn/102372
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-29
    publishedAt: 2026-05-29
    official: true
  - id: apple-mac-wont-turn-on
    title: 如果 Mac 无法开机
    url: https://support.apple.com/zh-cn/102623
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-29
    publishedAt: null
    official: true
  - id: community-mac-not-charging-2026-03
    title: MacBook says battery not charging, NOTHING IS WRONG
    url: https://www.reddit.com/r/applehelp/comments/1s4q8c4/macbook_says_battery_not_charging_nothing_is_wrong/
    publisher: Reddit r/applehelp
    sourceType: community
    accessedAt: 2026-07-29
    publishedAt: 2026-03-27
    official: false
  - id: community-mac-not-charging-2026-06
    title: Macbook not charging at all
    url: https://www.reddit.com/r/mac/comments/1v3jkip/macbook_not_charging_at_all/
    publisher: Reddit r/mac
    sourceType: community
    accessedAt: 2026-07-29
    publishedAt: 2026-06-25
    official: false
lastVerifiedAt: 2026-07-29
lastUpdatedAt: 2026-07-29
createdAt: 2026-07-29
relatedArticles:
  - mac-wont-turn-on-no-power-startup
  - mac-running-slow-performance-lag
popular: false
---

# Mac 电池无法充电、显示“不在充电”或只能维持电量

先不要把“Mac 插着电但不充电”直接判断成电池坏了。Apple 的当前指导要求先区分：电池健康功能或温度造成的正常暂停、供电足以运行但不足以充电、电脑负载过高、线缆/适配器/端口问题，以及确实需要诊断的硬件问题。

## 症状

- “Mac 插着电，电量还是在掉。”
- “右上角显示‘不在充电’。”
- “MacBook 只能充到设置的上限，是不是电池坏了？”
- “换了插座还是不充电。”
- “MagSafe 指示灯一直闪烁。”

## 可能原因

1. **充电上限、优化电池充电或温度保护**：停在设置的上限附近可能是设置或保护行为，不代表电池已损坏。
2. **电源功率不足或电脑负载过高**：电源可能足够维持 Mac 运行，却不足以同时给电池充电；视频编辑、游戏和外接设备会增加功耗。
3. **线缆、适配器、插座或端口问题**：并非所有 USB-C 线缆都能为 Mac 充电；端口中的碎屑、损坏或松动也会中断充电。
4. **软件、电源管理或硬件问题**：更新、重启和 Apple 诊断可以缩小范围，但不能替代现场硬件检测。

## Apple 官方方案

验证级别：Apple 官方

1. 打开“电池”菜单，记录状态和电量是否继续下降。
2. 检查“系统设置”>“电池”中的优化电池充电、充电上限和电池健康设置。
3. 使用与 Mac 匹配的适配器和充电线，直接连接可靠的墙上插座；同时检查插座、线缆、适配器和端口。
4. 如果使用 MagSafe，保持接头和端口清洁干燥；指示灯反复闪烁时，按 Apple 的 MagSafe 适配器流程重新连接。
5. 将 Mac 移到阴凉通风处，关闭高负载 App，重启并检查 macOS 更新。
6. 长期存放后的 Mac 先连接匹配的电源适配器至少 20 分钟。
7. 仍无法稳定充电时，先备份可访问的数据，再使用 Apple 诊断并联系 Apple 或授权服务。

参考来源：

- [Apple 支持：如果 Mac 电池无法充电](https://support.apple.com/zh-cn/guide/mac-help/mh29198/mac)
- [Apple 使用手册：如果 Mac 电池状态是“不在充电”](https://support.apple.com/zh-cn/guide/mac-help/-mh20876/mac)
- [Apple 支持：如果 MagSafe 线缆或电源适配器无法正常工作](https://support.apple.com/zh-cn/102372)
- [Apple 支持：如果 Mac 无法开机](https://support.apple.com/zh-cn/102623)

## 社区证据（非官方）

Apple 社区和 Reddit 的顾客发帖显示，顾客常把“显示连接电源”“电量不变”和“电量持续下降”混为同一件事，也会用手机充电器、低功率适配器或不确定是否支持充电的 USB-C 线缆做对照。这些帖子可帮助理解顾客用词和排查困惑，但不能证明某个机型存在普遍故障，也不能把社区建议当作 Apple 方案：

- [Reddit：MacBook says battery not charging, NOTHING IS WRONG](https://www.reddit.com/r/applehelp/comments/1s4q8c4/macbook_says_battery_not_charging_nothing_is_wrong/)
- [Reddit：Macbook not charging at all](https://www.reddit.com/r/mac/comments/1v3jkip/macbook_not_charging_at_all/)

## 零售排查流程

1. 先问电量百分比、菜单栏状态、适配器/线缆类型，以及电量是在停住还是继续下降。
2. 询问是否刚更换适配器、线缆、扩展坞、显示器，或是否在高负载、过热、长期存放后出现。
3. 用匹配的电源和线缆做一次交叉验证，检查插座和端口；不要同时更换多个变量后就下结论。
4. 按充电上限、供电不足/高负载、配件/端口和硬件诊断分支处理。
5. 记录复测结果和错误信息；能开机时先备份，再进入 Apple 诊断或服务。

## 升级处理

停止一般排查并联系 Apple 支持或授权服务：

- 使用匹配的适配器、线缆和插座后，电量仍持续下降或完全无法充电；
- 适配器、线缆、端口有破损，或出现进液、鼓包、异味、烧蚀、异常发热；
- Apple 诊断给出参考代码，或 Mac 无法稳定开机；
- 顾客需要更换电池、适配器或端口，但尚未完成机型与服务资格确认。

## 相关问题

- [Mac 无法开机、黑屏或按电源键没有反应](/recipes/Mac/mac-wont-turn-on-no-power-startup)
- [Mac 运行缓慢、卡顿或反应慢](/recipes/Mac/mac-running-slow-performance-lag)
