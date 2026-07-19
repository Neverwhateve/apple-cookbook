---
schemaVersion: 2
id: mac-keyboard-not-working-keys-unresponsive
title: Mac 键盘按键无响应、输入异常或无法使用
slug: mac-keyboard-not-working-keys-unresponsive
summary: MacBook 内建键盘、USB 键盘或妙控键盘按键无响应、只部分按键失灵或输入结果异常时，先区分电量、连接、辅助功能、键盘布局和按键脏污，再决定是否需要服务。
symptoms:
  - Mac 键盘按键没有反应
  - MacBook 内建键盘无法输入
  - 妙控键盘无法使用
  - 外接键盘连接 Mac 后没有反应
  - 只有部分按键失灵
  - 大写锁定键或推出键按下没反应
  - Mac 按键按下后输入很慢或没有输入
  - 键盘输入的符号和按键不一致
devices:
  - MacBook
  - Mac
  - Magic Keyboard
  - USB 键盘
platforms:
  - macOS
systemVersions:
  - 当前版本的 macOS；设置名称可能随版本变化
categories:
  - Mac
tags:
  - Mac
  - macOS
  - Keyboard
  - Magic Keyboard
  - Accessibility
  - Cleaning
keywords:
  - Mac 键盘失灵
  - MacBook 键盘没反应
  - 外接键盘不能用
  - 妙控键盘无法输入
aliases:
  - Mac keyboard not working
  - MacBook keyboard keys not responding
  - Magic Keyboard not working
  - external keyboard not working on Mac
  - Mac 键盘按键失灵
  - Mac 键盘输入异常
errorMessages:
  - 慢速键
  - 鼠标键
  - 键盘设置助理
officialTerms:
  - 慢速键
  - 鼠标键
  - 键盘布局
  - 虚拟键盘
  - 键盘设置助理
  - Apple 授权服务提供商
communityTerms:
  - Mac 键盘坏了
  - Mac 键盘打不出字
  - 键盘部分按键失灵
  - 键盘按键延迟
difficulty: Quick
estimatedTime: 5-15 分钟；清洁或服务检测时间另计
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-power-and-connection
    title: 先确认键盘有电、已连接且能被 Mac 识别
    summary: 外接键盘的供电、蓝牙状态、线缆和端口会决定所有按键是否都无效；先用替代连接或另一台 Mac 区分键盘与 Mac 本体。
    kind: recommended
    steps:
      - 如果使用无线妙控键盘，确认键盘已打开且电量充足；必要时关闭后重新打开。
      - 如果使用蓝牙键盘，确认 Mac 已打开蓝牙，并断开键盘后重新连接。
      - 如果使用 USB 或其他实体线缆，拔下后重新插紧；再换 Mac 上的另一个端口测试。
      - 将外接键盘连接到另一台 Mac，或把另一把可用键盘连接到这台 Mac，记录是哪一侧随测试变化。
      - 如果 MacBook 的内建键盘全部无效，先连接电源；低电量提醒可能无法通过内建键盘看到。
    verificationLevel: Official
    sourceIds:
      - apple-mac-keys-not-responding
    warnings:
      - 不要在电池膨胀、过热、进液或线缆明显损坏时继续使用或充电；应先停止使用并联系 Apple 支持。
    limitations:
      - 替换键盘测试只能帮助定位问题，不能证明原键盘或 Mac 的硬件已经损坏。
  - id: check-accessibility-and-layout
    title: 检查慢速键、鼠标键和键盘布局
    summary: Apple 说明，辅助功能选项或输入法布局可能让按键看起来失灵、延迟或产生意外字符。
    kind: alternative
    steps:
      - 使用鼠标、触控板或屏幕键盘打开“苹果菜单 > 系统设置 > 辅助功能 > 键盘”，确认“慢速键”已关闭；开启后必须按住按键更久才会识别。
      - 打开“系统设置 > 辅助功能 > 指针控制”，确认“鼠标键”已关闭；它会改变数字键盘的行为。
      - 打开“系统设置 > 键盘 > 文字输入”，检查输入法菜单中选择的键盘布局是否与实际键盘一致。
      - 只在部分按键异常时，打开屏幕键盘或“虚拟键盘”测试同一字符，区分实体按键问题和输入设置问题。
      - 大写锁定键或推出键可能有短暂延迟，按住片刻，确认指示灯或屏幕提示是否出现。
    verificationLevel: Official
    sourceIds:
      - apple-mac-keys-not-responding
    warnings: []
    limitations:
      - 输入法布局正确只说明字符映射可能正常，不能排除按键接触或键盘硬件问题。
  - id: clean-and-escalate
    title: 按键仍无响应时按机型清洁并升级服务
    summary: 某个 MacBook 或 MacBook Pro 按键无响应、触感异常时，可按 Apple 的机型条件使用压缩空气；仍无效则安排检修。
    kind: escalation
    steps:
      - 先确认问题是单个或少数按键无响应、触感异常，而不是整把键盘都无法连接。
      - 对 MacBook（2015 年及更新机型）或 MacBook Pro（2016 年及更新机型），按 Apple 的清洁说明将电脑以 75 度角握持。
      - 使用压缩空气随附的细管，从左到右喷向键盘或受影响按键；保持喷管末端距离键盘约半英寸，喷气时不要倒置气罐。
      - 将电脑向右、向左旋转后重复从左到右喷气；不要拆键帽、插入尖锐物或把液体直接喷到键盘上。
      - 如果清洁后按键仍无响应，记录受影响按键、是否进液或跌落、键盘型号和 macOS 版本，联系 Apple 支持、Apple Store 或 Apple 授权服务提供商。
    verificationLevel: Official
    sourceIds:
      - apple-clean-mac-keyboard
      - apple-clean-apple-products
      - apple-mac-keys-not-responding
    warnings:
      - 压缩空气必须按 Apple 说明使用；不要倒置气罐，也不要把喷管贴近键盘。
      - 进液、异味、发热、膨胀或明显损坏时不要继续清洁或通电测试。
    limitations:
      - 清洁只适用于 Apple 指引覆盖的特定按键表现，不能修复液体、跌落或内部元件损坏。
warnings:
  - 本文不覆盖第三方键盘自身驱动、企业设备管理策略或单个 App 的快捷键冲突。
  - 不要把拆机、撬键帽、注入清洁液或第三方改装当作官方方案。
limitations:
  - 菜单名称、键盘接口和无线连接方式可能因 macOS 版本、Mac 机型和键盘型号而变化。
  - 如果问题只发生在一个 App 中，应另查该 App 的输入设置或快捷键。
sources:
  - id: apple-mac-keys-not-responding
    title: 如果 Mac 没有响应按键按下操作
    url: https://support.apple.com/zh-cn/guide/mac-help/mchlp1240/mac
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-clean-mac-keyboard
    title: 如何清洁 MacBook 或 MacBook Pro 的键盘
    url: https://support.apple.com/zh-cn/102365
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2026-06-04
    official: true
  - id: apple-clean-apple-products
    title: 如何清洁 Apple 产品
    url: https://support.apple.com/zh-cn/103258
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-19
lastUpdatedAt: 2026-07-19
createdAt: 2026-07-19
relatedArticles:
  - mac-bluetooth-devices-wont-connect
  - mac-trackpad-not-moving-clicking
  - mac-wont-turn-on-no-power-startup
popular: true
---

# Mac 键盘按键无响应、输入异常或无法使用

MacBook 内建键盘、USB 键盘或妙控键盘无法输入、只有部分按键失灵，或输入结果与按键不一致时，先不要直接判断键盘坏了。Apple 的排查顺序是先确认电量和连接，再检查慢速键、鼠标键与键盘布局；如果是特定 MacBook 按键触感异常或无响应，再按机型条件清洁，最后安排服务。

---

## 症状

- “Mac 键盘按什么都没有反应。”
- “MacBook 内建键盘不能打字，但触控板还能用。”
- “妙控键盘已连接，按键却没有输入。”
- “只有几个按键失灵，其他按键正常。”
- “大写锁定键按了很久才有反应。”
- “键盘按下后字符不对，像是布局变了。”
- “外接键盘在另一台 Mac 上能用，在这台 Mac 上不能用。”

---

## 可能原因

1. **无线键盘没电、未打开或蓝牙连接没有完成**
   - 外接键盘的电量、开关和蓝牙状态会影响整把键盘；线缆松动或 USB 端口也会造成相同现象。
2. **MacBook 电量过低**
   - Apple 提醒，低电量提示可能无法通过内建键盘看到；接通电源或连接外置键盘后才能确认提示。
3. **慢速键或鼠标键改变了输入行为**
   - 慢速键会要求按住按键更久，鼠标键会改变数字键盘的用途，容易被误认为按键失灵。
4. **键盘布局或输入法选择不正确**
   - 键盘能响应但字符不对时，问题可能在输入法菜单或键盘布局，而不是按键本身。
5. **按键有碎屑、触感异常或硬件受损**
   - Apple 为特定 MacBook 和 MacBook Pro 机型提供了压缩空气清洁流程；进液、跌落或清洁后仍无效时需要服务判断。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 如果使用无线妙控键盘，确认键盘已打开且电量充足；关闭后重新打开。
2. 如果使用蓝牙键盘，确认 Mac 已打开蓝牙，断开键盘后重新连接。
3. 如果使用 USB 或其他线缆，拔下并重新插紧，再换一个 Mac 端口测试。
4. 将外接键盘连接到另一台 Mac，或把另一把可用键盘连接到这台 Mac，判断问题是跟着键盘还是跟着 Mac。
5. 如果 MacBook 内建键盘全部无效，先连接电源，等待片刻后再测试。
6. 用鼠标、触控板或屏幕键盘打开“系统设置 > 辅助功能 > 键盘”，确认“慢速键”已关闭。
7. 打开“系统设置 > 辅助功能 > 指针控制”，确认“鼠标键”已关闭。
8. 打开“系统设置 > 键盘 > 文字输入”，检查当前输入法和键盘布局是否与实际键盘一致。
9. 大写锁定键或推出键按下后可能有短暂延迟，按住片刻，观察指示灯或屏幕提示。
10. 如果是 MacBook（2015 年及更新机型）或 MacBook Pro（2016 年及更新机型）的单个按键无响应或触感异常，按 Apple 的清洁说明将电脑以 75 度角握持。
11. 使用压缩空气随附的细管，从左到右喷向键盘；喷管末端与键盘保持约半英寸距离，且不要倒置气罐。
12. 将电脑向右、向左旋转后重复喷气；不要拆键帽、插入尖锐物或把液体直接喷到键盘上。
13. 清洁后仍无响应，记录受影响按键、键盘型号、连接方式、是否进液或跌落及 macOS 版本，联系 Apple 支持或 Apple 授权服务提供商。

参考来源：

- [Apple 支持：如果 Mac 没有响应按键按下操作](https://support.apple.com/zh-cn/guide/mac-help/mchlp1240/mac)
- [Apple 支持：如何清洁 MacBook 或 MacBook Pro 的键盘](https://support.apple.com/zh-cn/102365)
- [Apple 支持：如何清洁 Apple 产品](https://support.apple.com/zh-cn/103258)

---

## 风险与边界

- 不要在键盘进液、发热、膨胀、冒烟或有异味时继续通电或清洁；先停止使用并升级处理。
- 压缩空气不是所有键盘问题的通用修复方法；只按 Apple 对适用 MacBook 机型的说明操作。
- 不要拆机、撬键帽、把液体或清洁剂直接喷入键盘，也不要使用第三方改装方法。
- 如果替换键盘测试、设置检查和适用的清洁流程都无效，远程排查不能替代 Apple 对键盘、端口和主板的检测。

---

## 零售排查流程

1. 先确认顾客说的是“完全无法输入”“单个按键无响应”“输入字符不对”，还是只在某个 App 中发生。
2. 记录 Mac 型号、芯片类型、macOS 版本，以及内建键盘或外接键盘的型号和连接方式。
3. 对外接键盘分别测试电量、开关、蓝牙、线缆、另一个端口和另一台 Mac；对 MacBook 先接通电源。
4. 使用鼠标、触控板或屏幕键盘检查“慢速键”“鼠标键”和键盘布局，不要为了测试直接修改多个输入设置。
5. 只有适用 MacBook 机型的单个按键无响应或触感异常时，才按 Apple 的 75 度角和压缩空气步骤清洁。
6. 记录清洁前后的按键表现；若出现进液、跌落、发热、膨胀、异味或清洁后仍无响应，停止远程操作并升级服务。

---

## 升级处理

- 外接键盘在另一台 Mac 上正常，但多把键盘在这台 Mac 上都异常。
- 内建键盘在接通电源、检查设置和重新启动后仍全部无响应。
- 按键存在进液、跌落、明显损坏、发热、异味或电池膨胀迹象。
- 适用机型按 Apple 清洁流程后仍有按键无响应或触感明显异常。
- 需要拆机、拆键帽、处理主板或判断端口硬件时，联系 Apple 支持、Apple Store 或 Apple 授权服务提供商。

---

## 相关问题

- [Mac 蓝牙设备无法连接或频繁断开](/recipes/Mac/mac-bluetooth-devices-wont-connect)
- [Mac 触控板无法移动指针、无法点按或手势失效](/recipes/Mac/mac-trackpad-not-moving-clicking)
- [Mac 无法开机、黑屏或按电源键没有反应](/recipes/Mac/mac-wont-turn-on-no-power-startup)

---

## 建议记录

- Mac 型号、芯片类型、macOS 版本。
- 内建键盘还是外接键盘，外接键盘的型号、接口和连接方式。
- 是所有按键、单个按键，还是只有数字键盘或大写锁定键异常。
- 是否发生进液、跌落、清洁、系统更新或更换键盘。
- 在屏幕键盘、另一把键盘或另一台 Mac 上测试的结果。
