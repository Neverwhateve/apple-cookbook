---
schemaVersion: 2
id: iphone-notifications-not-working-focus-summary-watch
title: iPhone 收不到通知、没有声音或延迟
slug: iphone-notifications-not-working-focus-summary-watch
summary: iPhone 通知不弹、没有声音、只在 Apple Watch 上出现或被延迟到摘要时，先检查单个 App 通知、静音和音量、专注模式、定时推送摘要、Apple Watch 路由和信息过滤。
symptoms:
  - iPhone 收不到通知
  - iPhone 通知没有声音
  - 微信或信息通知不弹
  - 通知只在 Apple Watch 上出现
  - 通知延迟到摘要才出现
  - 锁屏没有通知
  - 专注模式关了还是没提醒
  - App 图标没有红点
devices:
  - iPhone
  - iPad
  - Apple Watch
platforms:
  - iOS
  - iPadOS
  - watchOS
systemVersions:
  - iOS 15 或更高版本
  - iOS 16 或更高版本
  - iOS 18.1 或更高版本
  - iOS 18.4 或更高版本
categories:
  - iPhone
tags:
  - iPhone
  - iPad
  - Apple Watch
  - Notifications
  - Focus
  - Messages
  - Apple Intelligence
keywords:
  - 通知设置
  - 允许通知
  - 通知中心
  - 专注模式
  - 勿扰模式
  - 定时推送摘要
  - 生成通知摘要
  - 首要通知
  - Apple Watch 通知
  - 信息通知
aliases:
  - iPhone notifications not working
  - iPhone notification sound not working
  - iPhone notifications delayed
  - notifications only on Apple Watch
  - Focus mode silencing notifications
  - scheduled summary notifications
  - notification badge missing
  - iPhone no notification sound
  - 微信不通知
  - 信息没有提醒
errorMessages: []
officialTerms:
  - 允许通知
  - 通知中心
  - 锁定屏幕
  - 横幅
  - 标记
  - 播报通知
  - 重要提醒
  - 专注模式
  - 勿扰模式
  - 定时推送摘要
  - 生成通知摘要
  - 首要通知
communityTerms:
  - 红点不显示
  - 推送不响
  - 只震不响
  - 锁屏不弹
  - 手表截胡通知
  - 消息被勿扰吃掉
  - 通知被摘要收走
difficulty: Quick
estimatedTime: 10 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-app-notification-style
    title: 先检查单个 App 的通知入口和提醒样式
    summary: Apple 的通知排查从“设置 > 通知”里的具体 App 开始，确认允许通知、提醒位置、声音、标记和预览方式。
    kind: recommended
    steps:
      - 打开“设置”App，轻点“通知”。
      - 在“通知样式”下选择收不到通知的 App。
      - 打开“允许通知”，并确认锁定屏幕、通知中心或横幅中至少有一个提醒位置符合顾客预期。
      - 如果问题是没有声音，进入该 App 的通知设置，轻点“声音”并选择通知声音；同时确认 iPhone 没有静音且音量没有完全调低。
      - 如果问题是 App 图标没有红点，确认该 App 的“标记”已打开。
      - 如果顾客以为通知完全没到，先从锁定屏幕或通知中心查看历史通知，排除只是显示方式为“数量”或被分组。
    verificationLevel: Official
    sourceIds:
      - apple-use-notifications
      - apple-change-notification-settings
      - apple-view-respond-notifications
    warnings: []
    limitations:
      - 第三方 App 自己的账号、后台服务或服务器推送故障不由 iOS 通知设置单独证明。
      - iOS 16 或更高版本才支持在锁定屏幕上选择数量、叠放或列表显示方式。
  - id: check-focus-and-do-not-disturb
    title: 排除专注模式、勿扰模式和跨设备共享
    summary: 专注模式可以静音全部通知或只允许特定联系人和 App；开启跨设备共享时，其他 Apple 设备上的专注模式也会影响通知。
    kind: recommended
    steps:
      - 打开控制中心，查看是否有“勿扰模式”“睡眠”“工作”等专注模式正在启用。
      - 如果正在启用，临时关闭该专注模式后重新测试通知。
      - 打开“设置 > 专注模式”，点进对应专注模式，检查“联系人”和“App”是否允许了需要提醒的人或 App。
      - 检查该专注模式是否设置了定时、位置、App 或锁定屏幕触发条件，避免它自动再次开启。
      - 如果顾客有 Apple Watch、iPad 或 Mac，检查这些设备是否也开启了专注模式；启用“在设备之间共享”时，一个设备上的专注模式可影响关联设备。
      - 对必须穿透静音的受支持 App，在“设置 > 通知 > 对应 App”中查看是否有“重要提醒”并按业务需要开启。
    verificationLevel: Official
    sourceIds:
      - apple-watch-iphone-notifications
      - apple-focus-allow-silence
      - apple-do-not-disturb
    warnings:
      - 不要为了临时恢复通知而长期允许所有 App 打断；应只允许真正需要即时提醒的联系人或 App。
    limitations:
      - “驾驶”专注模式中不能允许 App 通知；需要按 Apple 的驾驶专注模式规则处理。
  - id: check-summary-priority-ai
    title: 检查定时推送摘要、通知摘要和首要通知
    summary: 通知可能没有丢失，而是被延后到“定时推送摘要”，或被 Apple 智能摘要、优先级显示改变了呈现方式。
    kind: alternative
    steps:
      - 打开“设置 > 通知 > 定时推送摘要”，查看目标 App 是否被包括在摘要中。
      - 如果顾客需要立即收到该 App 的通知，把该 App 从定时推送摘要中移出，或关闭定时推送摘要后测试。
      - 在支持 Apple 智能的机型上，打开“设置 > 通知 > 生成通知摘要”，按需要关闭全局摘要或关闭特定 App 的通知摘要。
      - 如果顾客以为重要通知被“顶到上面”或排序异常，打开“设置 > 通知 > 首要通知”，检查是否开启，以及是否针对特定 App 关闭。
      - 告知顾客 Apple 智能摘要可能与原文不同，重要信息应点开通知或进入 App 查看全文。
    verificationLevel: Official
    sourceIds:
      - apple-use-notifications
      - apple-change-notification-settings
      - apple-view-respond-notifications
    warnings:
      - Apple 智能摘要使用生成式模型，不能替代原始通知内容；涉及付款、医疗、出行或安全信息时要查看全文。
    limitations:
      - “生成通知摘要”和“首要通知”只适用于 Apple 规定的支持机型、系统版本、语言和地区条件。
  - id: check-watch-routing-and-message-filters
    title: 分流 Apple Watch 路由和“信息”通知过滤
    summary: 配对 Apple Watch 后，通知默认显示在 iPhone 或 Apple Watch 之一；“信息”还可能因对话设置、未知发件人或垃圾信息过滤而看起来没有提醒。
    kind: recommended
    steps:
      - 如果顾客佩戴 Apple Watch，先判断 iPhone 当时是否解锁：iPhone 解锁时通知到 iPhone，iPhone 锁定或睡眠且 Apple Watch 未锁定时通知到 Apple Watch。
      - 在 iPhone 上打开 Apple Watch App，进入“我的手表 > 通知”，点进目标 App。
      - 对 iPhone 和 Apple Watch 都有的 App，确认是“从我的 iPhone 镜像”还是自定义为“允许通知”“发送到通知中心”或“关闭通知”。
      - 如果在 Apple Watch 上读过或关闭过通知，告知顾客该通知也会从 iPhone 上关闭。
      - 如果只有“信息”异常，检查对应对话是否被静音，并查看未知发件人或垃圾信息过滤位置。
    verificationLevel: Official
    sourceIds:
      - apple-watch-iphone-notifications
      - apple-use-notifications
      - apple-messages-notifications
    warnings: []
    limitations:
      - Apple Watch 通知路由是预期行为，不代表 iPhone 推送服务损坏。
warnings:
  - 关闭专注模式、摘要或静音过滤会增加打扰；只为需要即时处理的 App 和联系人恢复即时通知。
  - 对金融、医疗、出行、安全类通知，不要只依赖 Apple 智能摘要或锁屏预览判断完整内容。
limitations:
  - 本文处理 iOS/iPadOS/watchOS 通知设置和 Apple Watch 路由；第三方 App 服务器推送、账号登录、地区服务中断需由 App 或服务商确认。
  - 受管理设备、企业配置描述文件、家长控制或屏幕使用时间可能限制通知设置。
  - “生成通知摘要”和“首要通知”依赖 Apple 智能支持条件，并非所有 iPhone、语言或地区都可用。
sources:
  - id: apple-watch-iphone-notifications
    title: 如何在 iPhone 和 Apple Watch 上收到通知
    url: https://support.apple.com/zh-cn/108274
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: 2025-09-30
    official: true
  - id: apple-use-notifications
    title: 在 iPhone 或 iPad 上使用通知
    url: https://support.apple.com/zh-cn/108781
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: 2026-04-13
    official: true
  - id: apple-change-notification-settings
    title: 更改 iPhone 的通知设置
    url: https://support.apple.com/zh-cn/guide/iphone/iph7c3d96bab/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-17
    publishedAt: null
    official: true
  - id: apple-view-respond-notifications
    title: 在 iPhone 上查看和响应通知
    url: https://support.apple.com/zh-cn/guide/iphone/iph6534c01bc/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-17
    publishedAt: null
    official: true
  - id: apple-focus-allow-silence
    title: 在 iPhone 上为专注模式允许或静音通知
    url: https://support.apple.com/zh-cn/guide/iphone/iph21d43af5b/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-17
    publishedAt: null
    official: true
  - id: apple-do-not-disturb
    title: 如何关闭或打开 iPhone 或 iPad 的“勿扰模式”
    url: https://support.apple.com/zh-cn/105112
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-17
    publishedAt: 2026-06-29
    official: true
  - id: apple-messages-notifications
    title: 在 iPhone 上停止、静音和更改信息通知
    url: https://support.apple.com/zh-cn/guide/iphone/iph62faab6a4/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-17
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-17
lastUpdatedAt: 2026-07-17
createdAt: 2026-07-17
relatedArticles:
  - iphone-ipad-speaker-microphone-audio-not-working
  - iphone-imessage-messages-not-sending-green-waiting-activation
  - ask-to-buy-requests-not-showing
  - screen-time-requests-not-working
popular: true
---

# iPhone 收不到通知、没有声音或延迟

iPhone 通知“不见了”通常不是一个原因：可能是某个 App 的“允许通知”关闭，通知只进了通知中心，声音被静音或音量太低，专注模式正在过滤，通知被放进定时摘要，也可能因为 Apple Watch 配对后通知按 Apple 设计去了手表。

先不要删除 App、还原所有设置或抹掉设备。最快的顺序是：先确认通知是否实际到达，再检查单个 App 通知样式，然后看专注模式、摘要和 Apple Watch 路由。

---

## 症状

- “微信/信息不弹通知。”
- “锁屏没有提醒，打开 App 才看到消息。”
- “通知来了但没有声音。”
- “Apple Watch 会震，iPhone 不亮屏。”
- “通知都跑到摘要里，过一会儿才出现。”
- “App 图标没有红点。”
- “关闭勿扰后还是收不到某个 App 的通知。”
- “通知中心有记录，但锁屏没显示。”
- “信息只有某个联系人没提醒。”

---

## 可能原因

1. **单个 App 的通知权限或提醒位置关闭**
   - Apple 的排查入口是“设置 > 通知 > 对应 App”。如果“允许通知”、锁定屏幕、通知中心、横幅、声音或标记没有按预期打开，就会表现为不弹窗、不响或没有红点。
2. **手机静音或音量太低**
   - Apple 明确提醒，如果 iPhone 已静音或音量被完全调低，通知不会播放声音。
3. **专注模式或勿扰模式正在过滤**
   - 专注模式可以暂时静音全部通知，或只允许特定联系人和 App；开启“在设备之间共享”后，其他关联设备上的专注模式也可能影响本机。
4. **定时推送摘要或 Apple 智能改变了通知呈现**
   - 通知可能被放进“定时推送摘要”，或在支持机型上被 Apple 智能生成摘要、按首要通知优先显示。
5. **Apple Watch 接管了通知显示位置**
   - Apple 说明，使用 Apple Watch 时通知默认显示在 Apple Watch 或 iPhone 上，而不是两者都显示。
6. **“信息”对话或过滤规则影响提醒**
   - 如果只有“信息”异常，可能是某个对话被静音，或未知发件人/垃圾信息过滤让顾客以为没有收到。
7. **第三方 App、账号或服务端推送异常**
   - iOS 通知设置正确时，仍可能是 App 自身登录状态、服务器推送、地区服务或账号限制问题。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先从锁定屏幕或通知中心找通知历史：锁定屏幕从屏幕中间向上轻扫，其他屏幕从顶部中央向下轻扫。
2. 如果通知历史存在，先判断是显示方式、声音、摘要或 Apple Watch 路由问题，不要直接重装 App。
3. 打开**设置 > 通知**，在“通知样式”下选择收不到通知的 App。
4. 打开**允许通知**。
5. 按顾客预期选择提醒位置：锁定屏幕、通知中心、横幅。
6. 如果问题是没有声音，轻点**声音**并选择通知声音；同时确认 iPhone 没有静音，音量没有完全调低。
7. 如果问题是 App 图标没有红点，打开**标记**。
8. 如果锁屏只显示数量或叠放，看起来像“没通知”，在**设置 > 通知**中检查显示方式：数量、叠放或列表。
9. 打开控制中心，查看是否启用了“勿扰模式”“睡眠”“工作”等专注模式；如果启用，先临时关闭后测试。
10. 进入**设置 > 专注模式**，点进正在影响通知的专注模式。
11. 在**联系人**和 **App** 中确认需要提醒的人或 App 是否被允许，或是否被静音。
12. 检查该专注模式是否设置了定时、位置、App 或锁定屏幕触发条件。
13. 如果有 Apple Watch、iPad 或 Mac，检查这些设备是否也开启专注模式；启用“在设备之间共享”时，专注模式可以跨关联设备工作。
14. 打开**设置 > 通知 > 定时推送摘要**，查看目标 App 是否被包括在摘要中；如果需要即时提醒，将它移出摘要或关闭摘要后测试。
15. 在支持 Apple 智能的机型上，检查**设置 > 通知 > 生成通知摘要**和**首要通知**，确认是否改变了通知的展示方式。
16. 如果佩戴 Apple Watch，按 Apple 的路由规则判断：iPhone 解锁时通知到 iPhone；iPhone 锁定或睡眠且 Apple Watch 未锁定时，通知到 Apple Watch。
17. 在 iPhone 上打开 **Apple Watch App > 我的手表 > 通知**，点进目标 App，确认是“从我的 iPhone 镜像”还是自定义为“允许通知”“发送到通知中心”或“关闭通知”。
18. 如果只有“信息”通知异常，检查具体对话是否被静音，并查看未知发件人或垃圾信息过滤位置。
19. 对必须穿透静音的受支持 App，检查该 App 通知设置中是否有**重要提醒**；只为真正需要即时处理的 App 开启。
20. 如果以上设置都正确，但只有某个第三方 App 仍没有推送，更新 App、重新登录对应账号，并联系 App 服务方确认推送服务状态。

参考来源：

- [Apple 支持：如何在 iPhone 和 Apple Watch 上收到通知](https://support.apple.com/zh-cn/108274)
- [Apple 支持：在 iPhone 或 iPad 上使用通知](https://support.apple.com/zh-cn/108781)
- [iPhone 使用手册：更改 iPhone 的通知设置](https://support.apple.com/zh-cn/guide/iphone/iph7c3d96bab/ios)
- [iPhone 使用手册：在 iPhone 上查看和响应通知](https://support.apple.com/zh-cn/guide/iphone/iph6534c01bc/ios)
- [iPhone 使用手册：在 iPhone 上为专注模式允许或静音通知](https://support.apple.com/zh-cn/guide/iphone/iph21d43af5b/ios)
- [Apple 支持：如何关闭或打开 iPhone 或 iPad 的“勿扰模式”](https://support.apple.com/zh-cn/105112)
- [iPhone 使用手册：在 iPhone 上停止、静音和更改信息通知](https://support.apple.com/zh-cn/guide/iphone/iph62faab6a4/ios)

---

## Apple Watch 通知为什么不同时出现在 iPhone 上

验证级别：Apple 官方

Apple Watch 配对后，通知默认不会同时在 iPhone 和 Apple Watch 上提醒：

1. 如果 iPhone 已解锁，通知会显示在 iPhone 上。
2. 如果 iPhone 锁定或睡眠，且 Apple Watch 未锁定，通知会显示在 Apple Watch 上。
3. 如果你在 Apple Watch 上阅读或关闭了通知，系统也会从 iPhone 上关闭这些通知。
4. 如果某个 App 在 Apple Watch 上设置为“发送到通知中心”，Apple Watch 不会发出提醒。
5. 如果某个 App 在 Apple Watch 上设置为“关闭通知”，它不会向 Apple Watch 发送通知。

参考来源：

- [Apple 支持：如何在 iPhone 和 Apple Watch 上收到通知](https://support.apple.com/zh-cn/108274)

---

## 专注模式和勿扰模式检查

验证级别：Apple 官方

1. 打开控制中心，查看是否有专注模式图标或“勿扰模式”“睡眠”“工作”等名称。
2. 再次轻点当前专注模式可将它关闭。
3. 如果顾客希望在专注模式期间仍收到某些通知，进入**设置 > 专注模式 > 对应专注模式 > 联系人或 App**。
4. 确保选择的是**允许下列通知**，再添加需要提醒的联系人或 App。
5. 检查“设置定时”、位置、App、锁定屏幕或其他自动触发条件。
6. 检查关联 Apple 设备是否开启同一专注模式，尤其是打开“在设备之间共享”的情况。
7. 不要把专注模式长期改成“全部允许”来解决单个 App 问题；应只允许需要即时提醒的对象。

参考来源：

- [Apple 支持：如何在 iPhone 和 Apple Watch 上收到通知](https://support.apple.com/zh-cn/108274)
- [iPhone 使用手册：在 iPhone 上为专注模式允许或静音通知](https://support.apple.com/zh-cn/guide/iphone/iph21d43af5b/ios)
- [Apple 支持：如何关闭或打开 iPhone 或 iPad 的“勿扰模式”](https://support.apple.com/zh-cn/105112)

---

## 摘要、首要通知和 Apple 智能

验证级别：Apple 官方

1. **定时推送摘要**会把选定 App 的通知按设定时间集中显示。如果用户需要某个 App 立刻提醒，不要把它放进摘要。
2. **生成通知摘要**会把长通知或叠放通知生成摘要；摘要适合快速浏览，但不能替代原文。
3. **首要通知**会把可能错过的重要即时通知优先显示在通知中心顶部。
4. Apple 智能功能受机型、系统版本、语言和地区条件限制；不要向不支持的设备承诺这些入口一定存在。
5. Apple 智能摘要使用生成式模型，涉及付款、医疗、出行、安全或账号验证码时，应点开通知或进入 App 查看完整内容。

参考来源：

- [Apple 支持：在 iPhone 或 iPad 上使用通知](https://support.apple.com/zh-cn/108781)
- [iPhone 使用手册：更改 iPhone 的通知设置](https://support.apple.com/zh-cn/guide/iphone/iph7c3d96bab/ios)
- [iPhone 使用手册：在 iPhone 上查看和响应通知](https://support.apple.com/zh-cn/guide/iphone/iph6534c01bc/ios)

---

## 零售排查流程

1. 先问清楚是完全收不到、锁屏不显示、通知中心有但不响、只在 Apple Watch 上响，还是只影响某个 App 或联系人。
2. 让顾客现场发一条可复现通知；同时观察锁屏、通知中心、Apple Watch 和 App 图标标记。
3. 检查**设置 > 通知 > 对应 App**：允许通知、提醒位置、声音、标记和预览。
4. 检查静音状态和音量，不要把“没有声音”误判成“没有推送”。
5. 检查控制中心和**设置 > 专注模式**，确认没有勿扰、睡眠、工作、驾驶或自动触发条件。
6. 检查**定时推送摘要**、**生成通知摘要**和**首要通知**，确认通知没有被延迟或重新排序。
7. 如果配对 Apple Watch，按 Apple 路由规则解释为什么 iPhone 和手表不会同时提醒，并检查 Watch App 的通知设置。
8. 如果只有“信息”异常，检查具体对话、未知发件人和垃圾信息过滤。
9. 如果只有某个第三方 App 异常，确认 App 已更新、账号已登录、App 内通知设置已开启，再让顾客联系 App 服务方。
10. 不要直接建议抹掉 iPhone；除非同时出现系统设置无法保存、大量 App 权限异常或设备管理限制无法排除。

---

## 升级处理

联系 App 或服务方：

- iOS 通知、专注模式、摘要和 Apple Watch 设置都正确，但只有某个第三方 App 长期不推送。
- 同一 App 在多名用户或多个设备上同时异常，疑似服务端推送问题。

联系 Apple 支持：

- 多个 Apple 自带 App 和第三方 App 都无法保存通知设置。
- 专注模式关闭后仍被系统级静音，且重启、系统更新后仍可复现。
- Apple Watch 通知路由、锁定状态或配对状态异常，无法按 Apple 规则解释。

前往 Apple Store 或授权维修点：

- 通知问题同时伴随扬声器、震动、锁定按钮、触控或系统设置不可用等硬件/系统异常。
- 设备受管理配置影响，用户无法更改关键通知设置，需要组织管理员或服务人员协助确认。

---

## 相关问题

- [iPhone 或 iPad 扬声器无声、通话听不清或麦克风没声音](/recipes/iPhone/iphone-ipad-speaker-microphone-audio-not-working)
- [iPhone 无法发送或接收信息，iMessage 变绿色或等待激活](/recipes/iPhone/iphone-imessage-messages-not-sending-green-waiting-activation)
- [孩子购买前询问请求没有出现在家长设备上](/recipes/Family%20Sharing/ask-to-buy-requests-not-showing)
- [孩子请求更多屏幕使用时间后家长收不到](/recipes/Family%20Sharing/screen-time-requests-not-working)
- Apple Watch 收不到通知
- 微信通知不显示
- App 图标没有红点

---

## 标签

- 设备：iPhone、iPad、Apple Watch
- 系统：iOS、iPadOS、watchOS
- 功能：通知、通知中心、专注模式、勿扰模式、定时推送摘要、Apple 智能
- Apple ID：通常不涉及
- 连续互通：Apple Watch 通知路由、跨设备专注模式
- 隐私：锁屏预览、信息过滤
- 维修：通常不涉及；只有同时出现声音、震动、触控或系统设置异常时才考虑
- 配件：Apple Watch

---

## 元信息

- 最后更新：2026-07-17
- 来源数量：7
- 验证级别：Apple 官方
- 支持系统：当前 iOS、iPadOS、watchOS；部分摘要和首要通知功能依赖 Apple 智能支持条件
- 可信度：高
