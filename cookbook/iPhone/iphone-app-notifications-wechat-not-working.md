---
schemaVersion: 2
id: iphone-app-notifications-wechat-not-working
title: iPhone 上微信或其他 App 收不到通知、没有声音或只在打开 App 后才出现
slug: iphone-app-notifications-wechat-not-working
summary: 微信或单个 App 收不到通知时，先分清通知根本没有送达、被静音/专注模式/摘要延后，还是已显示在 Apple Watch 或通知中心；不要把第三方 App 的账号、服务器或联系人问题误判成 iPhone 硬件故障。
symptoms:
  - “微信收不到通知，打开 App 才看到消息。”
  - “微信有消息但没有声音或横幅。”
  - “只有微信不提醒，其他 App 正常。”
  - “锁屏没有通知，Apple Watch 上却有。”
  - “更新后通知都不见了。”
  - “通知中心能看到，但当时没有弹出来。”
devices:
  - iPhone
  - iPad
  - Apple Watch
platforms:
  - iOS
  - iPadOS
  - watchOS
systemVersions:
  - 当前 iOS、iPadOS 和 watchOS
categories:
  - iPhone
tags:
  - iPhone
  - iPad
  - 微信
  - App 通知
  - Notifications
  - Focus
  - Apple Watch
keywords:
  - 微信收不到通知
  - 微信没有提醒
  - 微信里有消息但不响
  - App 收不到推送
  - iPhone 通知不显示
  - 通知中心有但没有横幅
aliases:
  - WeChat notifications not working
  - WeChat not receiving notifications on iPhone
  - iPhone app notifications not working
  - 微信不弹通知
  - 微信里消息不提醒
  - 微信有消息没声音
errorMessages: []
officialTerms:
  - 允许通知
  - 通知摘要
  - 专注模式
  - 通知中心
  - 从我的 iPhone 镜像
communityTerms:
  - 推送不来
  - 不弹窗
  - 消息静默
difficulty: Quick
estimatedTime: 5 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: iphone-app-notifications-wechat-not-working
solutions:
  - id: official-app-notification-path
    title: 先确认通知送到哪里，再检查这个 App 的通知权限
    summary: “我们先确认消息有没有到设备、是被静音或延后了，还是只影响微信；这样不用一开始就重装 App 或改一堆设置。”
    kind: recommended
    steps:
      - 先让顾客用另一台设备向自己发送一条可复现的微信消息，并确认问题只影响微信、多个 App，还是只有声音/横幅缺失。
      - 打开“设置”App，轻点“App”，选择“微信”，轻点“通知”，确认“允许通知”已打开，并检查锁定屏幕、通知中心、横幅和声音的提醒方式。
      - 从锁定屏幕或通知中心向左轻扫一条同类通知，轻点“选项”或“查看设置”，确认没有把这个 App 临时静音；再检查通知是否被放进定时摘要或受专注模式影响。
      - 如果顾客使用 Apple Watch，确认通知是否已显示在手表上；iPhone 锁定时，通知通常显示在 Apple Watch 或 iPhone 其中一处，而不是两处同时显示。
      - 在权限与系统通知都正常、且只有微信受影响时，说明微信自身的账号、聊天、App 内通知或服务状态不属于 Apple 可直接确认的范围；让顾客在微信内核对对应聊天和通知设置，必要时联系 App 开发者。
    verificationLevel: Official
    sourceIds:
      - official-app-notifications
      - official-manage-notifications
      - official-watch-notifications
    warnings:
      - 不要为了通知问题要求顾客退出 Apple 账户、抹掉设备，或删除尚未确认已备份的 App 数据。
    limitations:
      - Apple 可以确认系统通知设置和 Apple Watch 的显示位置，但不能确认微信服务器、账号状态、联系人设置或 App 内规则。
  - id: escalation-app-notification-path
    title: 何时停止一般排查并进入进一步支持
    summary: 多个 Apple 和第三方 App 都无法收到通知、系统设置无法保存，或问题伴随设备无法稳定使用时，需要记录事实后再进入进一步支持。
    kind: escalation
    steps:
      - 记录受影响的 App 范围、是否只缺少声音/横幅、是否使用 Apple Watch、专注模式或通知摘要，以及已确认的设置。
      - 如果只有一个第三方 App 受影响，优先转向该 App 开发者的支持路径；如果多个 App 都受影响且系统设置已确认，获取进一步 Apple 支持。
    verificationLevel: Official
    sourceIds:
      - official-app-notifications
      - official-manage-notifications
    warnings:
      - 不要承诺重装 App、重置所有设置或更新系统一定能恢复第三方 App 的通知。
    limitations: []
warnings:
  - “没有横幅”“没有声音”“通知只到 Apple Watch”“打开 App 才看到消息”是不同现象，先确认哪一个发生。
  - 第三方 App 的服务、账号和聊天级静音设置不属于 Apple 官方系统设置的结论范围。
limitations:
  - 本文不诊断微信服务器、联系人关系、群聊设置或第三方 App 的内部推送规则。
sources:
  - id: official-app-notifications
    title: 在 iPhone 上为特定 App 打开或关闭通知
    url: https://support.apple.com/zh-cn/120681
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-29
    publishedAt: 2026-04-07
    official: true
  - id: official-manage-notifications
    title: 在 iPhone 或 iPad 上使用通知
    url: https://support.apple.com/zh-cn/108781
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-29
    publishedAt: 2026-04-13
    official: true
  - id: official-watch-notifications
    title: 如何在 iPhone 和 Apple Watch 上收到通知
    url: https://support.apple.com/zh-cn/108274
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-29
    publishedAt: 2025-09-30
    official: true
lastVerifiedAt: 2026-07-29
lastUpdatedAt: 2026-07-29
createdAt: 2026-07-29
relatedArticles:
  - iphone-imessage-messages-not-sending-green-waiting-activation
  - apple-watch-wont-connect-pair-iphone
popular: false
---

# iPhone 上微信或其他 App 收不到通知、没有声音或只在打开 App 后才出现

先确认这是不是“微信没有通知”，还是通知被放到通知中心、通知摘要、专注模式或 Apple Watch。只有微信受影响时，重点是系统通知权限与 App 自己的设置；不要把它直接当成 iPhone 硬件故障。

---

## 症状

- 微信或单个 App 收到新内容后，没有横幅、声音或锁定屏幕提醒。
- 通知中心有记录，但顾客当时没有看到或听到。
- iPhone 锁定时没有提醒，Apple Watch 却有提醒。
- 只有打开微信后，顾客才看到新消息。

---

## 可能原因

1. **提醒的显示位置或方式被关闭、静音或延后**
   - “允许通知”、横幅、声音、通知摘要和专注模式会改变提醒何时何地出现。
2. **通知显示在另一台已配对设备上**
   - 使用 Apple Watch 时，iPhone 锁定或睡眠状态下，通知可能显示在手表上。
3. **微信自身的 App、账号或聊天级规则**
   - 当其他 App 都正常且系统权限已确认时，Apple 无法确认微信服务器、账号或聊天级设置。

---

## Apple 官方方案

验证级别：Apple 官方

1. 在“设置”>“App”>“微信”>“通知”中确认“允许通知”和所需提醒方式。
2. 在通知中心查看是否已有通知；从通知上轻扫后选择“查看设置”，确认没有临时静音。
3. 确认专注模式、通知摘要和 Apple Watch 是否改变了通知的显示位置或时间。
4. 只影响微信且系统设置正常时，转向微信内的设置或 App 开发者支持，不把第三方 App 问题说成 iPhone 已损坏。

参考来源：

- [在 iPhone 上为特定 App 打开或关闭通知](https://support.apple.com/zh-cn/120681)
- [在 iPhone 或 iPad 上使用通知](https://support.apple.com/zh-cn/108781)
- [如何在 iPhone 和 Apple Watch 上收到通知](https://support.apple.com/zh-cn/108274)

---

## 如何向顾客解释

> “我们先确认消息有没有到设备、提醒是被静音或延后了，还是显示在另一台设备上。这样就不会为了一个 App 的通知先做不必要的重置。”

---

## 零售排查流程

1. 先问：只有微信不提醒，还是所有 App 都一样？缺的是横幅、声音，还是根本没有通知？
2. 再问：顾客是否佩戴 Apple Watch、正在使用专注模式，或曾把通知放入摘要？
3. 用一条可复现的消息确认通知实际出现在哪里。
4. 只检查相关 App 的系统通知设置，再检查顾客愿意展示的 App 内设置。
5. 明确结局：已恢复、顾客观察、第三方 App 路径，或多个 App 的系统性问题需要进一步支持。

---

## 升级处理

停止一般排查并获取进一步协助：

- 多个 Apple 与第三方 App 都无法通知，且系统设置已确认。
- 通知设置无法保存，或问题同时伴随设备无法稳定使用。
- 只有微信或另一款第三方 App 受影响时，系统设置已正常，应进入该 App 的支持路径。

交接时记录：

- 受影响的是单个 App 还是多个 App；
- 通知缺少的是声音、横幅、锁定屏幕还是全部；
- Apple Watch、专注模式、通知摘要和系统 App 通知设置的结果；
- 已完成的安全步骤及结果。

---

## 相关问题

- [iPhone 无法发送或接收信息，iMessage 变绿色或等待激活](/recipes/iPhone/iphone-imessage-messages-not-sending-green-waiting-activation)
- [Apple Watch 无法连接或无法与 iPhone 配对](/recipes/Apple%20Watch/apple-watch-wont-connect-pair-iphone)
