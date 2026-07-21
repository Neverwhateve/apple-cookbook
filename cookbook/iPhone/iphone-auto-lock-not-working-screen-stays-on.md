---
schemaVersion: 2
id: iphone-auto-lock-not-working-screen-stays-on
title: iPhone 不自动锁定、屏幕一直亮或自动锁定选项异常
slug: iphone-auto-lock-not-working-screen-stays-on
summary: iPhone 闲置后屏幕不变暗、不自动锁定或自动锁定时间不符合预期时，先检查“显示与亮度”中的自动锁定，再区分注视感知、全天候显示屏和特定使用场景导致的正常显示。
symptoms:
  - iPhone 屏幕一直亮不自动关闭
  - iPhone 闲置后不会自动锁定
  - iPhone 自动锁定时间不生效
  - iPhone 自动锁定选项变灰或找不到
  - iPhone 锁定后屏幕仍显示时间和通知
  - iPhone 看着屏幕时不会自动变暗
devices:
  - iPhone
platforms:
  - iOS
systemVersions:
  - 当前 iOS；设置名称和可用选项可能随版本、机型和设备状态变化
categories:
  - iPhone
tags:
  - iPhone
  - 自动锁定
  - 锁定屏幕
  - 显示与亮度
keywords:
  - iPhone 自动锁定失效
  - iPhone 屏幕一直亮
  - iPhone 不自动锁屏
  - iPhone auto lock not working
aliases:
  - iPhone 不自动锁屏
  - iPhone 屏幕不自动熄灭
  - iPhone 自动锁定没反应
  - iPhone 一直不锁屏
  - iPhone screen stays on
  - iPhone auto lock not working
errorMessages:
  - 自动锁定
  - 注视感知功能
  - 全天候显示屏
  - 显示与亮度
officialTerms:
  - 自动锁定
  - 注视感知功能
  - 全天候显示屏
  - 显示与亮度
  - 锁定屏幕
communityTerms:
  - 自动锁屏失效
  - 屏幕常亮
  - 锁屏时间不生效
difficulty: Quick
estimatedTime: 5-10 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-auto-lock-and-test
    title: 检查“自动锁定”并做最小测试
    summary: Apple 官方路径是“设置”>“显示与亮度”>“自动锁定”；先选择明确的较短时长，再锁定设备并在桌面静置测试。
    kind: recommended
    steps:
      - 打开“设置”>“显示与亮度”>“自动锁定”，确认没有被设为“永不”；选择一个明确的时长。
      - 回到主屏幕，按一下侧边按钮手动锁定，再唤醒后不要触碰屏幕，观察是否在设定时长后变暗并锁定。
      - 如果只是在主屏幕测试，注意 Apple 使用手册说明：iPhone 保持在主屏幕且不操作时，自动锁定时间会减半；不要把这个现象误认为设置失效。
      - 若“自动锁定”选项变灰或不可更改，记录当前电量模式、设备管理状态和 iOS 版本，不要安装描述文件或第三方解锁工具。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-auto-lock-guide
      - apple-iphone-passcode-guide
    warnings:
      - “永不”或较长的自动锁定时长会增加他人接触未锁定设备的风险，也可能增加耗电。
    limitations:
      - 菜单可用时长和设备管理限制可能随 iOS 版本、机型和组织策略变化。
  - id: distinguish-attention-and-always-on
    title: 排除注视感知和全天候显示屏造成的误判
    summary: 面容 ID 机型在检测到你注视时可能不会变暗或锁定；支持全天候显示屏的机型在锁定后也可能以低亮度继续显示锁定屏幕。
    kind: alternative
    steps:
      - 如果你看着屏幕时它不变暗，暂时移开视线并等待完整的自动锁定时长；面容 ID 机型可在“设置”>“面容 ID 与密码”检查“注视感知功能”。
      - 如果侧边按钮锁定后仍能看到时间、通知或小组件，前往“设置”>“显示与亮度”检查“全天候显示屏”；先关闭它，再按侧边按钮测试真正的黑屏表现。
      - 将 iPhone 正面朝下或移开遮挡物后再测一次；不要把低亮度锁定屏幕误判为设备没有锁定。
      - 如果屏幕仍有亮度但触碰需要认证、通知不显示完整内容且侧边按钮能正常锁定，这更像显示方式而不是自动锁定失败。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-lock-screen-guide
      - apple-iphone-display-always-on-guide
    warnings:
      - 关闭“注视感知功能”会改变部分面容 ID 交互体验；关闭“全天候显示屏”只改变锁定屏幕显示，不会修复按键或屏幕硬件。
    limitations:
      - 全天候显示屏只在支持的 iPhone 机型上提供；中国大陆可用性和显示选项以设备实际设置为准。
  - id: isolate-system-and-hardware
    title: 用侧边按钮和系统页面区分软件与硬件问题
    summary: 如果设置正确但屏幕不熄灭，先重启并在“设置”页面做一次无媒体、无导航的测试；持续失败或伴随按键异常时再升级。
    kind: escalation
    steps:
      - 退出视频播放、导航、CarPlay 车载、连续互通相机等可能保持屏幕活动的场景，关闭屏幕镜像或外接显示后再测。
      - 在“设置”页面保持不操作，确认屏幕是否按设定时长变暗；再按侧边按钮，确认设备是否立即进入锁定状态。
      - 重启 iPhone 后重新检查“自动锁定”，记录设备型号、iOS 版本、设定时长、是否开启注视感知和全天候显示屏，以及测试结果。
      - 如果侧边按钮无法锁定、屏幕亮度和触控同时异常，或在无特殊场景的系统页面仍不自动锁定，联系 Apple 支持或授权服务提供商；不要先抹掉 iPhone。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-lock-screen-guide
      - apple-iphone-display-always-on-guide
    warnings:
      - Apple 官方页面说明特定场景会关闭屏幕或改变显示；不能仅凭屏幕是否全黑远程断定硬件故障。
    limitations:
      - 远程排查不能确认屏幕、侧边按钮或主板故障；维修前先做好备份并保留现象记录。
warnings:
  - 屏幕一直亮可能使设备更快耗电，也可能让未锁定设备暴露在他人面前；先确认设备是否已经锁定，再判断显示问题。
  - 不要用第三方描述文件、所谓省电工具或绕过设备管理的工具修改自动锁定。
limitations:
  - 本文覆盖 iPhone 的自动锁定和锁定屏幕显示，不覆盖 iPad、Mac 或第三方 App 自己保持屏幕常亮的设置。
  - 视频、导航、CarPlay 车载、连续互通相机、低电量模式、睡眠专注模式等场景可能改变屏幕关闭行为，菜单名称也可能随系统版本变化。
sources:
  - id: apple-iphone-auto-lock-guide
    title: 使 iPhone 屏幕保持更长显示时间
    url: https://support.apple.com/zh-cn/guide/iphone/iph7117338a8/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-21
    publishedAt: null
    official: true
  - id: apple-iphone-passcode-guide
    title: 在 iPhone 上设定密码
    url: https://support.apple.com/zh-cn/guide/iphone/-iph14a867ae/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-21
    publishedAt: null
    official: true
  - id: apple-iphone-lock-screen-guide
    title: 唤醒、解锁和锁定 iPhone
    url: https://support.apple.com/zh-cn/guide/iphone/iph5a0b5b9c5/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-21
    publishedAt: null
    official: true
  - id: apple-iphone-display-always-on-guide
    title: 使 iPhone 屏幕保持更长显示时间
    url: https://support.apple.com/zh-cn/guide/iphone/iph7117338a8/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-21
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-21
lastUpdatedAt: 2026-07-21
createdAt: 2026-07-21
relatedArticles:
  - iphone-battery-drains-after-update
  - iphone-black-screen-wont-turn-on-after-battery-drained
  - iphone-ipad-face-id-not-working-camera-covered-disabled
popular: false
---

# iPhone 不自动锁定、屏幕一直亮或自动锁定选项异常

iPhone 闲置后屏幕不变暗、不会自动锁定，或锁定后仍显示时间和通知时，先做一次最小测试：退出视频、导航等活动，前往“设置”>“显示与亮度”>“自动锁定”选择明确时长，然后在“设置”页面保持不操作。若只是看着屏幕时不变暗，或锁定后以低亮度显示锁定屏幕，可能是注视感知或全天候显示屏的正常行为。

## 症状

- iPhone 闲置后一直亮着，到了设定时间也不自动锁定。
- “自动锁定”设定似乎没有生效，或选项变灰、无法选择。
- 锁定后屏幕仍显示时间、通知或小组件。
- 看着 iPhone 时屏幕不变暗，但移开视线后行为不同。

## 可能原因

1. “显示与亮度”中的“自动锁定”被设为“永不”或时长被改动。
2. 面容 ID 的“注视感知功能”检测到你正在看屏幕，因此暂不变暗或锁定。
3. 支持全天候显示屏的机型在锁定后仍以低亮度显示锁定屏幕；屏幕亮不等于设备未锁定。
4. 视频、导航、CarPlay 车载或连续互通相机等活动改变了显示行为，或者侧边按钮、屏幕存在异常。

## Apple 官方方案

1. 打开“设置”>“显示与亮度”>“自动锁定”，先选择一个明确的较短时长，不要选“永不”。
2. 退出视频播放、导航、CarPlay 车载和连续互通相机，在“设置”页面保持不操作，等待完整时长。
3. 如果只是看着屏幕时不变暗，在“设置”>“面容 ID 与密码”中检查“注视感知功能”，移开视线后再测。
4. 如果锁定后仍显示低亮度锁定屏幕，在“设置”>“显示与亮度”中暂时关闭“全天候显示屏”。
5. 按一下侧边按钮手动锁定；如果需要认证才能进入内容、通知内容未直接显示，设备可能已经锁定，只是屏幕仍可见。

## 不同结果怎么判断

### 只要看着屏幕就不变暗

这符合注视感知功能的设计。移开视线并等待完整时长；如果仍不锁定，再关闭注视感知功能做一次对照测试。

### 侧边按钮锁定后仍能看到时间和通知

优先检查全天候显示屏。低亮度锁定屏幕仍可能显示时间、通知和小组件，但设备应保持锁定；尝试触碰需要认证的内容来确认，不要只以“是否全黑”判断。

### 只有视频、导航或车载时不熄屏

退出该活动并在“设置”页面复测。若普通系统页面按设定时长锁定，不要把特定 App 或车载会话的显示策略当成全机故障。

### 自动锁定选项变灰或所有测试都失败

记录电量模式、是否受组织管理、设备型号和 iOS 版本。重启后再次检查；若侧边按钮也无法锁定、触控或亮度异常，联系 Apple 支持或授权服务提供商。

## 零售排查流程

1. 退出视频、导航、CarPlay 车载和连续互通相机。
2. 在“设置”页面检查“自动锁定”，选择明确时长。
3. 关闭注视感知功能和全天候显示屏各测试一次，记录行为变化。
4. 按侧边按钮锁定，再尝试打开需要认证的内容，区分“已锁定但仍显示”和“没有锁定”。
5. 重启后记录设备型号、iOS 版本、设定时长、受影响场景和测试结果。

## 不要这样处理

- 不要长时间选择“永不”来掩盖问题；这会带来安全和耗电风险。
- 不要把全天候显示屏的低亮度锁定画面误判为设备没有锁定。
- 不要安装第三方描述文件或工具来修改受管理设备的自动锁定策略。
- 不要在没有备份和明确必要性的情况下先抹掉 iPhone。

## 升级处理

如果“自动锁定”设置正确，在无媒体和导航的“设置”页面仍不生效，或侧边按钮、触控、亮度还有其他异常，保存测试记录后联系 Apple 支持或授权服务提供商。

## 相关问题

- [iPhone 电池耗电太快，更新后续航明显变短](/recipes/iPhone/iphone-battery-drains-after-update)
- [iPhone 黑屏、无法开机或电量耗尽后无反应](/recipes/iPhone/iphone-black-screen-wont-turn-on-after-battery-drained)
- [iPhone 或 iPad 面容 ID 失效、提示相机被遮挡或已停用](/recipes/iPhone/iphone-ipad-face-id-not-working-camera-covered-disabled)
