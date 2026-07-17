---
schemaVersion: 2
id: iphone-alarm-silent-low-volume
title: iPhone 闹钟不响、声音太小或只振动
slug: iphone-alarm-silent-low-volume
summary: iPhone 闹钟没响、音量太低、只振动，或以为静音模式和勿扰模式会让闹钟静音时，先按 Apple 官方路径检查“铃声和提醒”音量、闹钟铃声是否设为“无”、耳机输出、待机显示触感限制和手动改时间风险。
symptoms:
  - iPhone 闹钟不响
  - iPhone 闹钟声音太小
  - iPhone 闹钟只振动
  - 闹钟设了但早上没有响
  - 闹钟铃声是无
  - 静音模式下闹钟会不会响
  - 勿扰模式下闹钟会不会响
  - 戴耳机时闹钟从哪里响
  - 待机显示时闹钟没有触感
devices:
  - iPhone
platforms:
  - iOS
systemVersions:
  - 当前支持的 iOS；具体界面名称可能随 iOS 版本略有变化
categories:
  - iPhone
tags:
  - iPhone
  - Clock
  - Alarm
  - Sound
  - StandBy
keywords:
  - iPhone 闹钟
  - 闹钟不响
  - 闹钟没声音
  - 闹钟音量
  - 铃声和提醒
  - 静音模式闹钟
  - 勿扰模式闹钟
  - 待机显示闹钟
aliases:
  - iPhone alarm not going off
  - iPhone alarm no sound
  - iPhone alarm too quiet
  - iPhone alarm only vibrates
  - alarm set to none
  - alarm volume low
  - alarm in silent mode
  - alarm with headphones
errorMessages: []
officialTerms:
  - 时钟
  - 闹钟
  - 铃声
  - 铃声和提醒
  - 声效与触感反馈
  - 用按钮调整
  - 响铃/静音开关
  - 静音模式
  - 勿扰模式
  - 待机显示
communityTerms:
  - 闹钟没叫
  - 闹铃不响
  - 早八没响
  - 只震不响
  - 铃声音量太小
difficulty: Quick
estimatedTime: 3-10 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-alert-volume-and-buttons
    title: 先调“铃声和提醒”音量，而不是只调媒体音量
    summary: Apple 将闹钟音量放在“声效与触感反馈”的“铃声和提醒”音量里；拖动滑块时会播放提醒铃声，可直接确认音量变化。
    kind: recommended
    steps:
      - 打开“设置”App，轻点“声效与触感反馈”。
      - 在“铃声和提醒”下方拖移音量滑块，并听滑块拖动时播放的提醒铃声是否足够响。
      - 如果顾客希望用 iPhone 侧边音量按钮调整闹钟音量，打开“用按钮调整”；如果不希望误触按钮影响闹钟音量，则关闭它并用设置里的滑块固定。
      - 回到“时钟”App，保留一个几分钟后的测试闹钟，确认铃声音量是否符合预期。
      - 如果拖动“铃声和提醒”滑块本身也没有任何声音，转到扬声器文章排查本机声音输出。
    verificationLevel: Official
    sourceIds:
      - apple-set-change-alarm
      - apple-iphone-clock-alarm-guide
      - apple-adjust-volume
    warnings:
      - 不要只用控制中心或正在播放媒体时的音量判断闹钟音量；媒体音量和“铃声和提醒”音量不是同一件事。
      - 关闭“用按钮调整”后，侧边音量键不再改变铃声和提醒音量，用户需要回到设置里调整。
    limitations:
      - 本步骤不能排除扬声器硬件、第三方闹钟 App 或睡眠定时相关设置问题。
  - id: make-sure-alarm-sound-is-not-none
    title: 闹钟只振动时，检查这个闹钟的铃声是否设为“无”
    summary: Apple 明确指出，闹钟只是振动时，应确认该闹钟的“铃声”没有设为“无”，并重新选择一个铃声。
    kind: recommended
    steps:
      - 打开“时钟”App，轻点“闹钟”标签。
      - 轻点“编辑”，再轻点没有声音的那个闹钟。
      - 轻点“铃声”，确认当前没有选中“无”。
      - 选择一个可听见的铃声；如需振动，可在同一入口按用户需求配置振动，但不要把声音留为“无”。
      - 轻点“存储”或“完成”，再设一个临近时间测试。
    verificationLevel: Official
    sourceIds:
      - apple-set-change-alarm
      - apple-iphone-clock-alarm-guide
    warnings:
      - 不要把“只振动”直接判断为系统故障；单个闹钟的铃声设为“无”是高频原因。
      - 修改重复闹钟前先确认是不是用户每天依赖的闹钟，避免误删或改错。
    limitations:
      - 如果问题来自起床闹钟、睡眠定时或第三方 App，本步骤只覆盖普通“时钟”闹钟的铃声设置。
  - id: separate-silent-focus-headphones-and-standby
    title: 分清静音、勿扰、耳机和待机显示的预期行为
    summary: Apple 说明静音模式、响铃/静音开关和勿扰模式不会影响闹钟声音；连接耳机时，闹钟会同时通过 iPhone 内建扬声器和耳机播放；使用待机显示时闹钟触感会停用。
    kind: recommended
    steps:
      - 如果用户担心静音模式、操作按钮静音或响铃/静音开关导致闹钟不响，说明这些设置不会让“时钟”闹钟静音。
      - 如果用户担心勿扰模式或其他专注模式导致闹钟不响，说明 Apple 官方路径同样写明勿扰模式不会影响闹钟声音。
      - 如果 iPhone 连接了有线或无线耳机，告知闹钟会以设定音量通过 iPhone 内建扬声器和耳机播放；测试时把耳机连接状态也记录下来。
      - 如果问题发生在“待机显示”场景，重点确认闹钟铃声不是“无”；Apple 说明使用待机显示时闹钟的触感功能会停用。
      - 如果仍然复现，记录具体场景：普通闹钟还是起床闹钟、是否连接耳机、是否在待机显示、是否只缺触感还是声音也没有。
    verificationLevel: Official
    sourceIds:
      - apple-set-change-alarm
      - apple-iphone-buttons-controls
    warnings:
      - 不要告诉用户必须关闭勿扰模式或静音模式才能让 Apple“时钟”闹钟响；这与 Apple 官方说明不一致。
      - 待机显示下没有触感不等于闹钟声音一定失败，要分开记录声音和触感。
    limitations:
      - 本步骤说明的是 Apple“时钟”闹钟的官方行为；第三方闹钟 App、日历提醒或通知可能受静音、专注模式和通知设置影响。
  - id: avoid-manual-time-and-escalate-real-failures
    title: 不要靠手动改时间测试或修复闹钟
    summary: Apple 不建议通过手动调整 iPhone 时间来改变 App 行为，因为这可能影响闹钟；完成音量和铃声检查后仍失败，应升级为系统、扬声器或数据记录问题。
    kind: escalation
    steps:
      - 不要为了让闹钟提前触发而手动更改 iPhone 日期或时间。
      - 使用正常当前时间，创建一个几分钟后的新测试闹钟，并让 iPhone 保持开机。
      - 如果新测试闹钟可以响，回头检查原闹钟是否被关闭、重复日期是否不符合预期、铃声是否为“无”或音量是否太低。
      - 如果多个新建闹钟在当前时间下仍然没有声音，先用“铃声和提醒”滑块和其他系统声音确认扬声器是否工作。
      - 记录 iPhone 型号、iOS 版本、闹钟时间、是否重复、铃声名称、耳机连接状态、是否待机显示，以及是否只有触感缺失；再联系 Apple 支持或转硬件/系统排查。
    verificationLevel: Official
    sourceIds:
      - apple-set-change-alarm
      - apple-adjust-volume
    warnings:
      - 手动改时间可能影响闹钟和其他 App 行为，不应作为修复建议。
      - 不要建议安装第三方“闹钟修复”描述文件、清理工具或未知来源 App。
    limitations:
      - 远程文章无法证明某一次过往闹钟为什么没有响；只能通过可复现测试和设置记录缩小范围。
warnings:
  - 先区分 Apple“时钟”闹钟、起床闹钟、日历提醒、提醒事项和第三方闹钟 App；不同提醒类型受设置影响不同。
  - 不要把静音模式、响铃/静音开关或勿扰模式写成 Apple“时钟”闹钟不响的原因。
  - 不要用手动更改日期或时间来测试或修复闹钟。
limitations:
  - 本文覆盖 iPhone 自带“时钟”App 的普通闹钟音量和无声排查；不覆盖 Apple Watch 独立闹钟、HomePod 闹钟、第三方闹钟 App 或企业受管理设备策略。
  - 本文不能还原某一次闹钟未响的历史现场，也不能远程证明扬声器硬件状态。
sources:
  - id: apple-set-change-alarm
    title: 如何在 iPhone 上设置和更改闹钟
    url: https://support.apple.com/zh-cn/118444
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: 2026-04-16
    official: true
  - id: apple-iphone-clock-alarm-guide
    title: 在 iPhone 上的“时钟”中设定闹钟
    url: https://support.apple.com/zh-cn/guide/iphone/iph2909d3a74/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: apple-adjust-volume
    title: 调整 iPhone 的音量
    url: https://support.apple.com/zh-cn/guide/iphone/iphb71f9b54d/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: apple-iphone-buttons-controls
    title: 使用 iPhone 上的操作按钮、侧边按钮和其他控制
    url: https://support.apple.com/zh-cn/105103
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-18
lastUpdatedAt: 2026-07-18
createdAt: 2026-07-18
relatedArticles:
  - iphone-ipad-speaker-microphone-audio-not-working
  - iphone-notifications-not-working-focus-summary-watch
popular: true
---

# iPhone 闹钟不响、声音太小或只振动

先把问题限定在 Apple 自带“时钟”App 的闹钟。闹钟不响、声音太小或只振动时，不要先怪静音模式或勿扰模式；Apple 官方说明这些设置不会影响闹钟声音。优先检查“铃声和提醒”音量、单个闹钟铃声是否为“无”、耳机连接状态和待机显示触感限制。

---

## 症状

- “iPhone 闹钟设了，但早上没有响。”
- “闹钟声音特别小，听不见。”
- “闹钟只振动，没有铃声。”
- “开了静音模式或勿扰模式，担心闹钟被静音。”
- “戴着耳机睡觉，闹钟不知道从哪里响。”
- “待机显示时闹钟没有震动。”
- “想用音量键调大闹钟，但好像没有生效。”

---

## 可能原因

1. **“铃声和提醒”音量太低**
   - Apple 将闹钟音量放在“声效与触感反馈”的“铃声和提醒”音量里，不应只看媒体音量。
2. **单个闹钟的铃声设为“无”**
   - Apple 明确说明，如果闹钟只是振动，应确认该闹钟的铃声没有设为“无”。
3. **误把静音模式或勿扰模式当作原因**
   - Apple 官方说明，勿扰模式、响铃/静音开关和静音模式不会影响闹钟声音。
4. **耳机或待机显示场景被误解**
   - 连接耳机时，闹钟会通过 iPhone 内建扬声器以及耳机播放；使用待机显示时，闹钟触感功能会停用。
5. **手动改时间或第三方 App 场景**
   - Apple 不建议通过手动调整 iPhone 时间改变 App 行为，因为这可能影响闹钟；第三方闹钟 App 不等同于 Apple“时钟”闹钟。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 打开“设置”App，轻点“声效与触感反馈”。
2. 在“铃声和提醒”下方拖移音量滑块；拖动时会播放提醒铃声，用来确认音量变化。
3. 如果用户希望用 iPhone 侧边音量按钮调整闹钟音量，打开“用按钮调整”；如果经常误触音量键导致闹钟变小，则关闭它。
4. 打开“时钟”App，轻点“闹钟”标签。
5. 轻点“编辑”，再轻点没有声音或只振动的那个闹钟。
6. 轻点“铃声”，确认没有选择“无”，并选取一个可听见的铃声。
7. 保存后创建一个几分钟后的测试闹钟，保持 iPhone 当前真实时间，不要手动改时间测试。
8. 如果 iPhone 连接了有线或无线耳机，按 Apple 说明，闹钟会通过 iPhone 内建扬声器以及耳机以设定音量播放。
9. 如果问题发生在“待机显示”中，先分清是没有触感还是没有声音；Apple 说明待机显示时闹钟触感功能会停用。
10. 如果拖动“铃声和提醒”滑块本身也没有声音，转到扬声器无声文章排查本机音频输出。

参考来源：

- [Apple 支持：如何在 iPhone 上设置和更改闹钟](https://support.apple.com/zh-cn/118444)
- [Apple 支持：在 iPhone 上的“时钟”中设定闹钟](https://support.apple.com/zh-cn/guide/iphone/iph2909d3a74/ios)
- [Apple 支持：调整 iPhone 的音量](https://support.apple.com/zh-cn/guide/iphone/iphb71f9b54d/ios)
- [Apple 支持：使用 iPhone 上的操作按钮、侧边按钮和其他控制](https://support.apple.com/zh-cn/105103)

---

## 零售排查流程

1. 先问清楚是 Apple 自带“时钟”App 的普通闹钟、睡眠起床闹钟、日历提醒、提醒事项，还是第三方闹钟 App。
2. 记录设备型号、iOS 版本、闹钟时间、是否重复、铃声名称、是否连接耳机、是否在待机显示中。
3. 现场打开“设置 > 声效与触感反馈”，拖动“铃声和提醒”滑块，确认提示音是否足够响。
4. 打开有问题的闹钟，确认“铃声”不是“无”，并保存一个可听见的铃声。
5. 创建一个几分钟后的测试闹钟，不要手动更改系统时间。
6. 如果用户说“开了静音或勿扰所以没响”，按 Apple 官方说明纠正：这些设置不会影响“时钟”闹钟声音。
7. 如果只在待机显示时没有触感，说明触感停用是 Apple 记录的预期行为；继续确认声音是否正常。
8. 如果所有测试都失败，再检查扬声器、系统更新、第三方 App 或服务升级路径。

---

## 升级处理

联系 Apple 支持或转设备级排查：

- 拖动“铃声和提醒”滑块时也完全没有声音。
- 多个新建测试闹钟都不响，且铃声不是“无”、音量足够高。
- 闹钟声音失真、断续，或其他系统声音也异常。
- 问题涉及系统时间异常、设备管理限制、疑似硬件损坏或更新后持续复现。

转其他文章或服务：

- 第三方闹钟 App 不响，先按该 App 的通知、后台、权限和开发者支持处理。
- 日历提醒、提醒事项或 App 推送没有声音，转通知文章。
- 扬声器整体无声、通话无声或铃声测试无声，转扬声器/麦克风文章。

---

## 相关问题

- [iPhone 收不到通知、没有声音或延迟](/recipes/iPhone/iphone-notifications-not-working-focus-summary-watch)
- [iPhone 或 iPad 扬声器无声、通话听不清或麦克风没声音](/recipes/iPhone/iphone-ipad-speaker-microphone-audio-not-working)

---

## 标签

- 设备：iPhone
- 系统：iOS
- 服务：时钟、闹钟、待机显示
- 风险：不要手动改时间测试闹钟
