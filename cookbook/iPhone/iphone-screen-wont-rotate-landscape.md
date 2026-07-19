---
schemaVersion: 2
id: iphone-screen-wont-rotate-landscape
title: iPhone 屏幕无法旋转或横屏不生效
slug: iphone-screen-wont-rotate-landscape
summary: iPhone 转横屏后画面仍保持竖屏、竖排方向锁定似乎关不掉，或只有某个 App 不支持横屏时，先检查控制中心的方向锁定，再用支持横屏的 App 和“测距仪”水平仪区分 App 限制、系统状态和可能的设备问题。
symptoms:
  - iPhone 屏幕无法旋转
  - iPhone 横屏不生效
  - iPhone 一直保持竖屏
  - 关闭竖排方向锁定后仍不能横屏
  - iPhone 横过来画面不变
  - 只有某个 App 不能横屏
  - iPhone 屏幕方向锁定
  - iPhone 自动旋转失效
devices:
  - iPhone
  - iPod touch
platforms:
  - iOS
systemVersions:
  - 当前 iOS
categories:
  - iPhone
tags:
  - iPhone
  - Display
  - Accessibility
keywords:
  - 屏幕旋转
  - 横屏
  - 竖屏
  - 竖排方向锁定
  - 自动旋转
  - 方向锁定
aliases:
  - iPhone screen won't rotate
  - iPhone stuck in portrait mode
  - iPhone landscape mode not working
  - iPhone rotation lock won't turn off
  - iPhone 横屏打不开
  - iPhone 旋转屏幕没反应
errorMessages:
  - 没有特定错误提示，屏幕横过来后仍保持竖屏
officialTerms:
  - 竖排方向锁定
  - 控制中心
  - 测距仪
  - 水平仪
communityTerms:
  - 自动旋转坏了
  - 横屏失灵
  - 屏幕不跟着转
difficulty: Quick
estimatedTime: 5-10 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: turn-off-rotation-lock-and-test-supported-app
    title: 关闭竖排方向锁定，并在支持横屏的 App 中测试
    summary: Apple 官方建议先在控制中心关闭“竖排方向锁定”，再使用计算器或 Safari 等支持横屏的 App 测试；某个 App 不旋转不一定是设备故障。
    kind: recommended
    steps:
      - 在没有主屏幕按钮的 iPhone 上，从屏幕右上角向下轻扫打开控制中心；其他机型按对应手势打开控制中心。
      - 轻点“竖排方向锁定”按钮，确认它处于关闭状态；如果控制中心没有这个按钮，先在控制中心中添加或访问更多控制。
      - 关闭控制中心，将 iPhone 横过来，等待画面变化。
      - 不要只在原来的 App 中判断：打开“计算器”或 Safari 等可在横屏模式下工作的 App，再次测试。
      - 如果其他 App 能横屏而原 App 不能，先按该 App 的设计或开发者支持处理，不要为了这个现象抹掉 iPhone。
    verificationLevel: Official
    sourceIds:
      - apple-rotate-screen-support
      - apple-rotate-iphone-guide
    warnings:
      - 并非所有 App 都支持屏幕旋转；一个 App 不横屏不能单独证明 iPhone 的方向检测有故障。
    limitations:
      - 该步骤只能区分常见的 App 支持性问题，不能确认方向传感器或显示硬件状态。
  - id: test-orientation-with-level-and-restart
    title: 用“测距仪”水平仪验证方向检测，再重新启动 iPhone
    summary: 如果多个支持横屏的 App 都不旋转，可以用“测距仪”中的“水平仪”观察设备是否检测到方向变化；Apple 官方建议屏幕仍无法旋转时重新启动。
    kind: alternative
    steps:
      - 打开“测距仪”App，轻点“水平仪”。
      - 将 iPhone 紧贴一个平面物体并转动设备，观察水平仪是否能随方向变化并显示绿色；这只是方向检测的辅助观察，不是硬件诊断结论。
      - 如果水平仪卡住或多个支持横屏的 App 仍不旋转，先保存未完成的工作，再重新启动 iPhone。
      - 重新启动后再次确认“竖排方向锁定”已关闭，并在计算器或 Safari 中复测。
    verificationLevel: Official
    sourceIds:
      - apple-rotate-screen-support
    warnings:
      - 水平仪测试不能单独证明传感器损坏；避免把一次 App 卡顿直接归因为硬件故障。
    limitations:
      - 水平仪是辅助观察，设备摆放、App 状态或界面限制都可能影响判断。
  - id: escalate-after-supported-apps-and-restart
    title: 多个支持横屏的 App 仍失败时记录信息并升级
    summary: 如果关闭方向锁定、在多个支持横屏的 App 中测试并重新启动后仍失败，记录机型、iOS 版本、受影响的 App 和复现过程，再联系 Apple 支持。
    kind: escalation
    steps:
      - 记录 iPhone 机型、iOS 版本、是否所有支持横屏的 App 都失败、水平仪是否能响应方向变化，以及问题从何时开始。
      - 分别测试计算器、Safari 等支持横屏的 App，避免只用一个不支持横屏的 App 作为证据。
      - 如果重新启动后仍无法旋转，不要安装所谓“传感器修复”描述文件、清理工具或来源不明的配置。
      - 将记录提供给 Apple 支持；如果同时存在触屏失灵、摔落或进液迹象，说明这些情况并按设备安全建议处理。
    verificationLevel: Official
    sourceIds:
      - apple-rotate-screen-support
    warnings:
      - 联系支持前不要安装来源不明的配置文件或“传感器校准”工具。
    limitations:
      - 远程排查不能确认方向传感器、显示组件或主板是否存在硬件故障。
warnings:
  - 不要为了修复横屏而抹掉 iPhone、安装来源不明的配置文件或使用第三方“传感器校准”工具。
  - 如果只有一个 App 不横屏，先确认该 App 是否支持横屏，再联系 App 开发者。
limitations:
  - 本文覆盖 iPhone 或 iPod touch 的屏幕方向和横屏排查，不覆盖 iPad、Mac、第三方 App 内网页或游戏自身的横屏设置。
  - Apple 官方说明部分 App 不支持屏幕旋转；网页或 App 的布局限制不能通过系统设置强制改变。
sources:
  - id: apple-rotate-screen-support
    title: 在 iPhone 或 iPod touch 上旋转屏幕
    url: https://support.apple.com/zh-cn/118226
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2026-05-01
    official: true
  - id: apple-rotate-iphone-guide
    title: 转动 iPhone 屏幕
    url: https://support.apple.com/zh-cn/guide/iphone/iph3badf94ec/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-19
lastUpdatedAt: 2026-07-19
createdAt: 2026-07-19
relatedArticles:
  - iphone-ipad-touch-screen-not-responding-ghost-touch
  - iphone-notifications-not-working-focus-summary-watch
popular: false
---

# iPhone 屏幕无法旋转或横屏不生效

iPhone 转横屏后画面仍保持竖屏，先不要急着抹掉设备或安装所谓“传感器修复”工具。更稳的顺序是：确认“竖排方向锁定”已关闭，在明确支持横屏的 App 中复测，再用“测距仪”的“水平仪”观察方向检测，最后重新启动 iPhone。

---

## 症状

- iPhone 横过来后画面仍保持竖屏。
- 关闭“竖排方向锁定”后，多个 App 仍无法横屏。
- 只有某个 App 不会随设备旋转。
- 没有错误提示，但用户怀疑自动旋转或方向传感器失效。

## 可能原因

1. “竖排方向锁定”仍处于打开状态，或控制中心中的控制没有按预期关闭。
2. 当前 App 本身不支持屏幕旋转；Apple 明确说明并非所有 App 都支持横屏。
3. 系统或 App 临时状态异常，需要用其他支持横屏的 App、水平仪和重新启动来缩小范围。
4. 如果多个支持横屏的 App 在重启后仍失败，才需要让 Apple 进一步判断设备状态。

## Apple 官方方案

### 先判断是不是 App 本身的限制

Apple 官方说明，并非所有 App 都支持屏幕旋转。因此，先打开“计算器”或 Safari 这类可在横屏模式下工作的 App 测试：

- 如果计算器或 Safari 能横屏，只有原来的 App 不变，问题更可能是该 App 的布局或功能限制。
- 如果多个明确支持横屏的 App 都不变，再继续下面的设备级排查。

### 1. 关闭“竖排方向锁定”

1. 在没有主屏幕按钮的 iPhone 上，从屏幕右上角向下轻扫打开控制中心；其他机型按对应手势打开控制中心。
2. 轻点“竖排方向锁定”按钮，确认它已关闭。
3. 如果控制中心没有这个按钮，先在控制中心中访问更多控制或添加该控制。
4. 关闭控制中心，将 iPhone 横过来。
5. 用计算器或 Safari 再测一次，不要只用原来那个 App 判断。

### 2. 用“测距仪”的“水平仪”观察方向检测

1. 打开“测距仪”App。
2. 轻点“水平仪”。
3. 将 iPhone 紧贴一个平面物体，转动设备并观察水平仪是否能随方向变化。
4. 如果水平仪卡住，或多个支持横屏的 App 都不旋转，继续重启步骤。

水平仪只是辅助观察，不能单独证明方向传感器损坏；一次 App 卡住、设备摆放不平或界面本身不支持横屏，都可能造成误判。

### 3. 重新启动 iPhone

保存未完成的工作后重新启动 iPhone。开机后再次确认方向锁定已关闭，并在计算器或 Safari 中测试。如果仍然失败，记录机型、iOS 版本、受影响的 App、水平仪表现和复现步骤，再联系 Apple 支持。

## 零售排查流程

1. 先确认是所有 App 都不横屏，还是只有一个 App 不横屏。
2. 打开控制中心，确认“竖排方向锁定”已关闭。
3. 用计算器或 Safari 等支持横屏的 App 复测。
4. 用“测距仪”中的“水平仪”观察方向变化，再重新启动 iPhone。
5. 记录机型、iOS 版本、受影响 App 和是否有摔落或进液迹象。

## 升级处理

- 多个明确支持横屏的 App 在关闭方向锁定并重启后仍失败。
- “水平仪”卡住，同时还有触屏、显示或其他传感器异常。
- 设备近期摔落或进液，或问题在系统更新后持续出现。
- 只有一个 App 失败时，优先联系该 App 开发者；不要把单个 App 限制当作设备硬件故障。

## 不建议的做法

- 不要为了横屏问题直接抹掉 iPhone。
- 不要安装来源不明的描述文件、清理工具或“传感器校准”工具。
- 不要把单个 App 不横屏直接归因为硬件故障。
- 如果设备近期摔落或进液，同时出现触屏失灵、显示异常等问题，应如实告知 Apple 支持。

## 相关问题

- [iPhone 或 iPad 触屏无响应、乱跳、断触或局部失灵](/recipes/iPhone/iphone-ipad-touch-screen-not-responding-ghost-touch)
- [iPhone 收不到通知、没有声音或延迟](/recipes/iPhone/iphone-notifications-not-working-focus-summary-watch)

## 参考来源

- [Apple 支持：在 iPhone 或 iPod touch 上旋转屏幕](https://support.apple.com/zh-cn/118226)
- [iPhone 使用手册：转动 iPhone 屏幕](https://support.apple.com/zh-cn/guide/iphone/iph3badf94ec/ios)
