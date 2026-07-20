---
schemaVersion: 2
id: apple-watch-notifications-not-showing
title: Apple Watch 收不到通知、通知只显示在 iPhone 或提醒不响
slug: apple-watch-notifications-not-showing
summary: Apple Watch 不显示 App 通知、通知只出现在 iPhone、某个 App 被静音或手表不震动提醒时，先判断通知应显示在哪台设备，再检查连接、锁定、勿扰模式和 Apple Watch App 中的通知设置。
symptoms:
  - Apple Watch 收不到信息、电话或 App 通知
  - 通知只显示在 iPhone 上，没有出现在 Apple Watch
  - Apple Watch 只有部分 App 不显示通知
  - Apple Watch 有通知但不震动、不响或只进入通知中心
  - 表盘顶部没有红色未读通知图标
  - Apple Watch 显示红色 iPhone 图标、红色 X 或连接中断
devices:
  - Apple Watch
  - iPhone
platforms:
  - watchOS
  - iOS
systemVersions:
  - 当前可用的 watchOS 和 iOS
categories:
  - Apple Watch
tags:
  - Apple Watch
  - 通知
  - iPhone
  - 勿扰模式
  - Apple Watch App
keywords:
  - Apple Watch 收不到通知
  - Apple Watch 通知不显示
  - Apple Watch 通知不提醒
  - Apple Watch 通知只在 iPhone
aliases:
  - 苹果手表没有通知
  - Apple Watch 不震动提醒
  - Apple Watch 信息通知不见了
  - Apple Watch App 通知关闭
  - 手表通知只在手机上
errorMessages:
  - 红色 iPhone 图标
  - 红色 X 图标
  - 勿扰模式
  - 飞行模式
officialTerms:
  - 通知中心
  - 从我的 iPhone 镜像
  - 通知提示
  - Apple Watch App
  - 控制中心
communityTerms:
  - 苹果手表收不到消息
  - 手表不震动
  - 手表通知不弹
  - iPhone 有消息手表没反应
difficulty: Quick
estimatedTime: 5–15 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: determine-notification-device
    title: 先确认通知本来应该显示在哪台设备
    summary: Apple 的默认行为不是让通知同时出现在 iPhone 和 Apple Watch；iPhone 解锁时通知通常在 iPhone 上，iPhone 锁定或睡眠时才会转到手表。
    kind: recommended
    steps:
      - 锁定 iPhone，再用测试 App 发送一条通知；如果 iPhone 处于解锁状态，先在 iPhone 的通知中心查看，不要把“手表没有同步显示”直接判断成故障。
      - 确认 Apple Watch 没有锁定，并观察表盘顶部是否出现红色未读通知图标；手表已锁定时通知会发送到 iPhone。
      - 在 Apple Watch 上按下侧边按钮打开控制中心，确认没有打开“勿扰模式”，并查看是否有红色 iPhone 或红色 X 图标。
      - 在 Apple Watch 上按住表盘顶部并向下轻扫，检查通知是否已经收到但没有即时弹出。
    verificationLevel: Official
    sourceIds:
      - apple-watch-notifications
      - apple-iphone-watch-notifications
    warnings:
      - iPhone 解锁时通知出现在 iPhone 上是 Apple 的设备归属规则，不是通知丢失。
    limitations:
      - 不同 watchOS 版本打开控制中心和通知中心的手势可能不同。
  - id: restore-watch-app-notification-settings
    title: 检查 Apple Watch App 中的 App 通知设置
    summary: 某一个或一组 App 不提醒时，在 iPhone 的 Apple Watch App 中检查“通知”，确认没有被关闭、静音或改成只发送到通知中心。
    kind: alternative
    steps:
      - 在 iPhone 上打开 Apple Watch App，轻点“我的手表”，再轻点“通知”。
      - 找到收不到通知的 App；对支持镜像的 App 选择“从我的 iPhone 镜像”，或在自定义选项中选择“允许通知”。
      - 如果设置显示“发送到通知中心”，通知可能只会保存到通知中心而不会在手表上发出声音或显示提醒；如果 App 已关闭通知，请重新打开。
      - 在 Apple Watch 的通知中心中向左轻扫相关通知并检查是否曾选择过静音；必要时在 iPhone 的 Apple Watch App 中重新开启该 App。
      - 在 iPhone 的“设置”>“通知”中确认该 App 也允许通知；不要只检查手表端开关。
    verificationLevel: Official
    sourceIds:
      - apple-watch-notifications
      - apple-iphone-watch-notifications
    warnings:
      - “发送到通知中心”和“关闭通知”不是同一种设置；修改前先确认用户需要声音、触感还是仅保留记录。
    limitations:
      - 第三方 App 可提供的通知选项少于 Apple 自带 App，具体项目以设备显示为准。
  - id: restore-connection-and-network
    title: 连接中断或第三方 App 不推送时恢复连接
    summary: Apple Watch 与 iPhone 断开时，通知会留在 iPhone；第三方 App 还需要配对的 iPhone 已连接 Wi-Fi 或蜂窝网络才能传送推送通知。
    kind: alternative
    steps:
      - 将 Apple Watch 和配对的 iPhone 彼此靠近放置；在 iPhone 上确认飞行模式已关闭、Wi-Fi 和蓝牙已打开。
      - 在 Apple Watch 控制中心确认飞行模式已关闭；如果出现红色 iPhone 或红色 X 图标，先重新连接两台设备。
      - 重新启动 Apple Watch 和 iPhone，然后锁定 iPhone 再测试一条通知。
      - 如果只有第三方 App 失败，确认配对的 iPhone 已开机并连接 Wi-Fi 或蜂窝网络；蜂窝版 Apple Watch 离开 iPhone 时也不能绕过第三方 App 的这一条件。
      - 如果手表仍无法连接，记录连接图标和测试结果，不要在没有备份或明确提示的情况下直接抹掉手表。
    verificationLevel: Official
    sourceIds:
      - apple-watch-pairing-connection
      - apple-watch-notifications
      - apple-watch-away-from-iphone
    warnings:
      - 取消配对和重新配对可能需要较长时间；先完成近距离、开关设置和重启等低风险步骤。
    limitations:
      - 本流程不能证明某个第三方 App 的推送服务或账户状态正常。
  - id: escalate-after-isolation
    title: 仍然没有通知时保留证据并升级
    summary: 连接、锁定状态、勿扰模式和 App 设置都正确但仍无法收到通知时，先用一个 Apple 自带 App 做对照，再带着测试结果联系 Apple 支持或 App 开发者。
    kind: escalation
    steps:
      - 记录 Apple Watch 型号、watchOS 版本、iPhone 型号与 iOS 版本、受影响的 App、通知是否出现在 iPhone 以及控制中心图标。
      - 分别测试“信息”或“电话”等 Apple 自带通知与一个第三方 App，记录是所有通知失败还是仅单个 App 失败。
      - 如果 Apple 自带通知也失败，记录重新启动、靠近连接和 Apple Watch App 通知设置的结果，联系 Apple 支持。
      - 如果只有一个第三方 App 失败，确认 iPhone 端通知允许后联系该 App 开发者；不要把单个 App 推送故障归因于手表硬件。
    verificationLevel: Official
    sourceIds:
      - apple-watch-notifications
      - apple-watch-pairing-connection
    warnings:
      - 不要为了测试通知而关闭所有隐私、安全或专注模式保护；只改变受影响 App 的必要设置。
    limitations:
      - Apple 官方页面不能诊断第三方 App 的服务器推送、账户或应用内部问题。
warnings:
  - Apple Watch 与 iPhone 默认不会同时显示同一条通知；先确认通知归属规则。
  - 勿扰模式、锁定状态和连接状态会改变通知送达位置或提醒方式。
  - 不要把通知进入通知中心、通知静音、通知关闭和完全未送达混为一谈。
limitations:
  - 本文覆盖 Apple Watch 与 iPhone 配对使用时的通知显示与提醒排查，不覆盖单个 App 的账号、服务器推送或内容过滤规则。
  - 蜂窝版 Apple Watch 的可用连接和第三方 App 推送仍受配对 iPhone 网络条件影响。
sources:
  - id: apple-watch-notifications
    title: Apple Watch 上的通知
    url: https://support.apple.com/zh-cn/108369
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: 2025-11-24
    official: true
  - id: apple-iphone-watch-notifications
    title: 如何在 iPhone 和 Apple Watch 上收到通知
    url: https://support.apple.com/zh-cn/108274
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: null
    official: true
  - id: apple-watch-pairing-connection
    title: 如果 Apple Watch 无法与 iPhone 连接或配对
    url: https://support.apple.com/zh-cn/108360
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: 2026-07-14
    official: true
  - id: apple-watch-away-from-iphone
    title: iPhone 不在身边时使用 Apple Watch
    url: https://support.apple.com/zh-cn/108300
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-20
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-20
lastUpdatedAt: 2026-07-20
createdAt: 2026-07-20
relatedArticles:
  - apple-watch-wont-connect-pair-iphone
  - apple-watch-cellular-not-working
  - iphone-notifications-not-working-focus-summary-watch
popular: false
---

# Apple Watch 收不到通知、通知只显示在 iPhone 或提醒不响

Apple Watch 没有显示通知时，先不要默认认为通知丢失。Apple 的默认规则是：通知显示在 Apple Watch 或 iPhone 其中一台设备上，而不是同时显示；iPhone 解锁时通常由 iPhone 接收，iPhone 锁定或睡眠时才会转到手表。若规则符合但手表仍没有通知，再按连接、锁定/勿扰模式和 App 设置排查。

## 症状

- 手表收不到信息、电话或第三方 App 通知。
- iPhone 有通知，Apple Watch 没有；或者手表只在通知中心里留下记录。
- 某个 App 不提醒，但其他 App 正常。
- 手表不震动、不响，或表盘没有红色未读通知图标。
- 控制中心出现红色 iPhone、红色 X、勿扰模式或飞行模式图标。

## 可能原因

1. iPhone 处于解锁状态，通知按 Apple 的规则显示在 iPhone，而不是同时显示在 Apple Watch。
2. Apple Watch 已锁定、打开了勿扰模式，或与 iPhone 连接中断。
3. Apple Watch App 中的 App 通知被关闭、静音，或设置为只发送到通知中心。
4. 第三方 App 的配对 iPhone 没有开机或没有连接 Wi-Fi/蜂窝网络。

## Apple 官方方案

1. 锁定 iPhone，并在 Apple Watch 上打开通知中心，确认测试通知是否已到达。
2. 在 Apple Watch 上打开控制中心，关闭勿扰模式和飞行模式，并确认没有红色 iPhone 或红色 X 图标。
3. 在 iPhone 的 Apple Watch App 中打开“我的手表”>“通知”，为受影响 App 选择“从我的 iPhone 镜像”或“允许通知”。
4. 在 iPhone 的“设置”>“通知”中确认该 App 已打开“允许通知”；如果通知只在通知中心出现，取消“发送到通知中心”设置。
5. 将两台设备靠近，确认 iPhone 的 Wi-Fi、蓝牙和网络可用，然后分别重新启动 Apple Watch 与 iPhone。

## 升级处理

如果 Apple 自带的“信息”或“电话”通知也无法到达，记录设备型号、watchOS/iOS 版本、通知是否出现在 iPhone、通知中心是否有记录和控制中心图标，再联系 Apple 支持。若只有一个第三方 App 失败，完成 iPhone 与 Apple Watch App 的通知设置检查后联系该 App 开发者。

## 先判断是不是通知归属规则

1. 锁定 iPhone，再发送一条测试通知；如果 iPhone 处于解锁状态，通知出现在 iPhone 上是预期行为。
2. 确认 Apple Watch 没有锁定。手表锁定时，通知会发送到 iPhone。
3. 在 Apple Watch 上按下侧边按钮打开控制中心，确认没有打开“勿扰模式”，并查看连接图标。
4. 在手表上按住表盘顶部并向下轻扫，检查通知是否已经进入通知中心。

## 检查 Apple Watch App 的通知开关

1. 在 iPhone 上打开 Apple Watch App，依次轻点“我的手表”>“通知”。
2. 找到收不到通知的 App。支持镜像的 App 可选择“从我的 iPhone 镜像”；也可以选择“自定义”并打开“允许通知”。
3. 如果选择了“发送到通知中心”，通知可能只进入通知中心，不会在手表上发出声音或显示提醒。若选择“关闭通知”，请重新打开。
4. 在 iPhone 的“设置”>“通知”中确认该 App 也打开“允许通知”。
5. 如果曾在手表通知中心向左轻扫并选择静音，重新在 Apple Watch App 中开启该 App 的提醒。

## 连接中断时怎么处理

1. 将 Apple Watch 和配对的 iPhone 彼此靠近。
2. 在 iPhone 控制中心确认飞行模式已关闭、Wi-Fi 和蓝牙已打开；在 Apple Watch 控制中心确认飞行模式已关闭。
3. 如果看到红色 iPhone 或红色 X 图标，重新启动 Apple Watch 和 iPhone，然后锁定 iPhone 测试通知。
4. 如果只有第三方 App 不推送，确认配对的 iPhone 已开机并连接 Wi-Fi 或蜂窝网络。蜂窝版 Apple Watch 离开 iPhone 时，第三方 App 的推送仍有这一条件。

## 区分“通知不显示”和“通知不响”

- 通知中心里有记录但没有声音或触感：优先检查 App 是否设置为“发送到通知中心”、手表是否静音，以及勿扰模式。
- iPhone 有通知，手表完全没有记录：先确认 iPhone 是否解锁、手表是否锁定以及两台设备是否连接。
- 只有一个第三方 App 没有通知：先检查 iPhone 和 Apple Watch App 的该 App 设置，再联系 App 开发者。
- 所有 App 都没有通知：用“信息”或“电话”做 Apple 自带 App 对照测试；仍失败时记录版本与图标状态并联系 Apple 支持。

## 不要这样处理

- 不要把通知没有同时出现在 iPhone 和 Apple Watch 当成同步故障。
- 不要为了单个 App 的推送问题直接抹掉 Apple Watch 或取消配对。
- 不要在没有记录原始设置和测试结果前关闭所有专注模式、隐私或安全设置。

## 仍然失败时记录什么

记录 Apple Watch 和 iPhone 的型号、watchOS 与 iOS 版本、受影响的 App、通知是否出现在 iPhone、通知中心是否有记录，以及控制中心是否出现红色 iPhone、红色 X 或勿扰模式图标。Apple 自带 App 也失败时联系 Apple 支持；只有一个第三方 App 失败时，优先联系该 App 开发者。

## 零售排查流程

1. 记录 Apple Watch 型号、watchOS 版本、iPhone 型号与 iOS 版本，以及受影响的 App。
2. 分别测试“信息”或“电话”等 Apple 自带 App 和一个第三方 App，记录通知显示位置、通知中心记录和声音/触感结果。
3. 检查 iPhone 是否解锁、Apple Watch 是否锁定、勿扰模式和飞行模式是否打开，并记录控制中心图标。
4. 检查 Apple Watch App 的“通知”和 iPhone 的“设置”>“通知”，再靠近连接并重启两台设备。
5. Apple 自带通知仍失败时升级 Apple 支持；只有第三方 App 失败时升级对应 App 开发者。

## 相关问题

- 如果手表显示红色 iPhone 图标、无法配对或频繁断开，请查看 [Apple Watch 无法连接或无法与 iPhone 配对](/recipes/Apple%20Watch/apple-watch-wont-connect-pair-iphone)。
- 如果只有蜂窝网络或离开 iPhone 后的连接能力异常，请查看 [Apple Watch 蜂窝网络无法激活、显示无服务或无法连接](/recipes/Apple%20Watch/apple-watch-cellular-not-working)。
- 如果是 iPhone 本身收不到通知或专注模式导致通知摘要异常，请查看 [iPhone 通知不显示、延迟或被专注模式过滤](/recipes/iPhone/iphone-notifications-not-working-focus-summary-watch)。
