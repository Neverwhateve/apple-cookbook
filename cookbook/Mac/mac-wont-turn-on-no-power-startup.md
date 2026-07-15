---
schemaVersion: 2
id: mac-wont-turn-on-no-power-startup
title: Mac 无法开机、黑屏或按电源键没有反应
slug: mac-wont-turn-on-no-power-startup
summary: Mac 按电源键没有反应、疑似没通电、一直黑屏，或已经通电但停在问号、禁止符号等启动画面时，先按 Apple 官方顺序区分电源、配件、显示器、启动屏幕和服务计划。
symptoms:
  - Mac 无法开机
  - Mac 开不了机
  - Mac 按电源键没反应
  - MacBook 黑屏不开机
  - Mac mini 没有电源
  - Mac 风扇转但屏幕黑
  - Mac 有声音但屏幕没有画面
  - Mac 开机显示问号文件夹
  - Mac 开机显示禁止符号
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
  - Startup
  - Power
  - Battery
  - Display
  - Service
keywords:
  - Mac 无法开机
  - Mac 黑屏
  - Mac 没反应
  - Mac 电源按钮
  - Mac 启动失败
  - Mac 空白屏幕
  - Mac 问号文件夹
  - Mac 禁止符号
  - Mac mini 无法开机
aliases:
  - Mac won't turn on
  - Mac does not power on
  - Mac black screen on startup
  - MacBook won't start
  - Mac mini no power
  - Mac stuck on question mark folder
  - Mac startup blank screen
errorMessages:
  - support.apple.com/mac/startup
  - 问号
  - 由直线穿过的圆圈
  - 禁止符号
officialTerms:
  - 电源按钮
  - 启动
  - 空白屏幕
  - macOS 恢复
  - 启动选项
  - 磁盘工具
  - Apple 诊断
  - 适用于“无法开机”问题的 Mac mini 服务计划
communityTerms:
  - 按开机键没反应
  - 黑屏不开机
  - 有电没画面
  - 插电没反应
  - 开机卡住
difficulty: Moderate
estimatedTime: 10-30 分钟；需要服务检测或恢复系统时另计
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-power-button-accessories-display
    title: 先确认电源、按住电源按钮、拔配件和显示器
    summary: Apple 对“Mac 无法开机”的首选顺序是检查电源连接，按住电源按钮约 10 秒，拔下所有配件后重试，再按屏幕是否有内容分流。
    kind: recommended
    steps:
      - 确认电源线、电源适配器和插座正常；如果有另一套兼容电源线或适配器，换一套做对照。
      - Mac 台式机或使用外接显示器时，确认显示器已接入电源、已开机，并牢固连接到 Mac。
      - 按住 Mac 的电源按钮约 10 秒钟；配备触控 ID 的 Mac 笔记本电脑按住触控 ID。松开后，再像平常一样按下并松开电源按钮。
      - 从 Mac 上拔下所有配件和线缆，包括打印机、移动设备、外置硬盘、USB 集线器、扩展坞和读卡器，只保留必要电源后再重复电源按钮步骤。
      - Mac 笔记本电脑疑似没电时，接入电源适配器，拔下除电源外的设备，然后按住 Command-Control 和电源按钮尝试重新启动；恢复后先让电池至少充到 10%。
      - 如果屏幕出现 Apple 标志、进度条、问号、禁止符号、锁形图标或其他内容，说明 Mac 已经开机，转入启动屏幕分流，不要继续反复按电源。
      - 如果完全没有画面、没有声音、没有指示灯或仍无法开机，记录电源、线缆、配件和屏幕表现，准备联系 Apple 支持或服务点。
    verificationLevel: Official
    sourceIds:
      - apple-mac-wont-turn-on
      - apple-mac-black-screen-guide
    warnings:
      - 不要拆开 Mac、短接电源触点、烘烤主板或使用来历不明的电源适配器。
      - 发现电源线破损、适配器异常发热、进液、异味或电池鼓包时，停止通电尝试并进入服务路径。
    limitations:
      - 远程文章无法确认主板、电池、屏幕、接口或电源适配器硬件状态。
      - 不同 Mac 机型的电源按钮位置和显示器连接方式不同。
  - id: route-startup-screen-recovery
    title: 有画面但不能进系统时，按启动屏幕处理
    summary: 问号、禁止符号、空白屏幕、Apple 标志进度条和恢复助理都不是同一类故障；Apple 官方把它们归入“无法顺利完成启动”分流。
    kind: alternative
    steps:
      - 如果看到问号文件夹，先按 Apple 的问号启动屏幕流程处理启动磁盘或 macOS 重新安装问题。
      - 如果看到由直线穿过的圆圈，按禁止符号流程处理 macOS 版本、启动磁盘和恢复问题。
      - 如果 Mac 似乎已开机但一直是空白屏幕，优先按 Apple 的空白屏幕流程，不要直接判定主板损坏。
      - 需要进入 macOS 恢复时，Apple 芯片 Mac 关机后按住电源按钮，直到看到“正在载入启动选项”或“选项”；Intel Mac 按 Apple 指定启动组合键进入恢复。
      - 如果启动组合键不起作用，先按住电源按钮最长 10 秒关机，再开机并重新按住组合键；无线键盘不稳定时优先改用内建键盘或有线键盘。
      - 在恢复环境中需要修复启动磁盘时，先用“磁盘工具”检查和修复；需要重装 macOS 或抹掉前，先确认备份和数据风险。
    verificationLevel: Official
    sourceIds:
      - apple-mac-startup-screens
      - apple-macos-recovery
      - apple-startup-key-combinations
    warnings:
      - 不要把“能显示问号或禁止符号”的 Mac 当作完全无电源故障处理。
      - 抹掉磁盘或恢复系统可能导致数据丢失；没有备份时先说明风险。
    limitations:
      - 本文只做启动屏幕分流；具体问号、禁止符号、FileVault、激活锁和重装失败需要进入对应专项流程。
  - id: check-mac-mini-2023-service-program
    title: M2 Mac mini 无法再开机时检查服务计划
    summary: Apple 已确认极少数搭载 M2 芯片的 Mac mini 2023 机型可能无法再开机，受影响生产日期为 2024 年 6 月 16 日至 2024 年 11 月 23 日。
    kind: alternative
    steps:
      - 如果设备是搭载 M2 芯片的 Mac mini 2023，并且症状是无法再开机，打开 Apple 中国大陆中文服务计划页面。
      - 使用 Apple 页面上的序列号查询工具检查是否符合“适用于‘无法开机’问题的 Mac mini 服务计划”。
      - 如果符合条件，按 Apple 页面选择服务选项；Apple 或 Apple 授权服务提供商会免费提供检修服务。
      - 如果序列号不符合条件，继续按普通电源、配件、显示器、启动屏幕和服务检测流程处理。
    verificationLevel: Official
    sourceIds:
      - apple-mac-mini-no-power-program
    warnings:
      - 不要因为症状相似就承诺所有 Mac mini 或所有 M2 Mac 都在免费服务范围内，必须以 Apple 序列号查询结果为准。
    limitations:
      - 服务计划只覆盖 Apple 指定范围的 Mac mini 机型和生产日期；其他 Mac 不适用这项计划。
  - id: escalate-power-or-hardware-service
    title: 多套电源和官方分流后仍失败时升级服务
    summary: 完成官方电源和启动分流后仍没有反应，或存在进液、跌落、鼓包、异味、无法识别电源等风险，应停止反复尝试并联系 Apple 支持或授权服务。
    kind: escalation
    steps:
      - 记录 Mac 型号、芯片类型、macOS 大致版本、发生前动作、电源适配器和线缆、是否进液或跌落、屏幕是否有任何图标或背光。
      - 记录尝试过的电源插座、线缆、适配器、外接显示器和拔除配件结果。
      - 如果 Mac 能进入恢复或启动选项，先备份可访问数据或确认 Time Machine、iCloud Drive、桌面与文稿同步状态。
      - 如果无法开机、无法进入恢复、无法完成磁盘修复或疑似硬件故障，联系 Apple 支持、Apple Store 或 Apple 授权服务提供商。
      - 送修前如设备还能启动，先备份并退出不必要账户；完全无法开机时，不要承诺本机数据一定可恢复。
    verificationLevel: Official
    sourceIds:
      - apple-mac-wont-turn-on
      - apple-mac-startup-screens
    warnings:
      - 反复通电可能加重进液、电池或电源路径问题；有安全迹象时应停止。
      - 服务检测可能需要备份、密码、Apple 账户或购买凭证；提前确认所有权和数据风险。
    limitations:
      - Apple 官方文章能给出排查顺序，但硬件结论仍需要现场诊断。
warnings:
  - 先区分“完全没通电”和“已经通电但无法完成启动”；两者处理路径不同。
  - 不要在没有备份和明确授权的情况下抹掉磁盘、恢复系统或恢复固件。
  - 电池鼓包、进液、异味、烧蚀、电源线破损或异常发热时，停止自行排查并进入服务路径。
limitations:
  - 本文覆盖 Mac 无法开机、黑屏、基础启动屏幕和 M2 Mac mini 服务计划分流，不覆盖每一种启动错误的完整修复。
  - 第三方扩展坞、显示器、维修件和企业管理策略可能改变现场表现。
  - 无法开机的 Mac 可能无法立即备份；数据恢复能力取决于硬件状态、FileVault、备份和服务方案。
sources:
  - id: apple-mac-wont-turn-on
    title: 如果 Mac 无法开机
    url: https://support.apple.com/zh-cn/102623
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-mac-startup-screens
    title: 如果你的 Mac 无法顺利完成启动
    url: https://support.apple.com/zh-cn/102675
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-mac-black-screen-guide
    title: 如果 Mac 黑屏
    url: https://support.apple.com/zh-cn/guide/mac-help/mchlp1025/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-macos-recovery
    title: 如何从“macOS 恢复”启动
    url: https://support.apple.com/zh-cn/102518
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-startup-key-combinations
    title: Mac 的启动组合键
    url: https://support.apple.com/zh-cn/102603
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-mac-mini-no-power-program
    title: 适用于“无法开机”问题的 Mac mini 服务计划
    url: https://support.apple.com/zh-cn/mac-mini-2023-service-program-for-no-power-issue
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-15
lastUpdatedAt: 2026-07-15
createdAt: 2026-07-15
relatedArticles:
  - mac-dfu-firmware-revive-restore
  - mac-forgot-login-password-reset
popular: true
---

# Mac 无法开机、黑屏或按电源键没有反应

先不要把“开不了机”直接判断成主板故障。Apple 的官方分流是：先确认电源和显示器，按住电源按钮约 10 秒，拔掉所有配件后再试；如果屏幕出现问号、禁止符号、Apple 标志、进度条或恢复助理，说明 Mac 已经开机，只是没有顺利完成启动。

---

## 症状

- “Mac 无法开机。”
- “MacBook 按电源键没有反应。”
- “插着电源也一直黑屏。”
- “风扇转、键盘亮，但屏幕没有内容。”
- “Mac mini 突然没电源。”
- “开机显示问号文件夹或禁止符号。”
- “更新后黑屏，进不了系统。”

---

## 可能原因

1. **电源、线缆、适配器、插座或显示器没有正常工作**
   - Apple 要求先检查电源连接；没有内建显示屏的 Mac 还要确认外接显示器已接入电源、连接到 Mac 并已开启。
2. **配件或线缆阻止启动**
   - Apple 建议拔下打印机、驱动器、USB 集线器、移动设备等所有配件后重复电源按钮步骤。
3. **Mac 其实已开机，但屏幕空白或启动卡住**
   - Apple 把空白屏幕、问号、禁止符号等归入不同启动屏幕分流，不应继续当作“完全没电”处理。
4. **Mac 笔记本电脑电量过低或电池/充电路径异常**
   - Apple 的 Mac 黑屏使用手册建议接入电源、拔下其他设备，并用 Command-Control-电源按钮尝试重新启动。
5. **特定 Mac mini 可能符合服务计划**
   - Apple 中国大陆中文页面说明，极少数搭载 M2 芯片的 Mac mini 2023 设备可能无法再开机，并提供序列号查询工具。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 检查电源线、电源适配器和插座；有另一套兼容电源线或适配器时，换一套做对照。
2. 使用外接显示器或 Mac 台式机时，确认显示器已接电、开机并连接到 Mac。
3. 按住电源按钮约 10 秒；配备触控 ID 的 Mac 笔记本电脑按住触控 ID。松开后，再正常按一下电源按钮。
4. 拔下所有配件和线缆，只保留必要电源，然后重复电源按钮步骤。
5. Mac 笔记本电脑疑似没电时，接入电源适配器，拔掉除电源外的设备，按住 Command-Control 和电源按钮重新启动。
6. 如果屏幕出现内容，按具体画面处理：问号、禁止符号、空白屏幕、Apple 标志进度条、恢复助理、锁形图标或激活锁。
7. 需要进入 macOS 恢复时，Apple 芯片 Mac 关机后按住电源按钮直到看到启动选项；Intel Mac 使用 Apple 指定启动组合键。
8. 如果是 M2 Mac mini 2023 无法再开机，用 Apple 服务计划页面查询序列号是否符合条件。
9. 如果仍没有任何反应，或有进液、跌落、电池鼓包、异味、异常发热、线缆破损，停止反复通电并联系 Apple 支持或授权服务。

参考来源：

- [Apple 支持：如果 Mac 无法开机](https://support.apple.com/zh-cn/102623)
- [Apple 支持：如果你的 Mac 无法顺利完成启动](https://support.apple.com/zh-cn/102675)
- [Mac 使用手册：如果 Mac 黑屏](https://support.apple.com/zh-cn/guide/mac-help/mchlp1025/mac)
- [Apple 支持：如何从“macOS 恢复”启动](https://support.apple.com/zh-cn/102518)
- [Apple 支持：Mac 的启动组合键](https://support.apple.com/zh-cn/102603)
- [Apple 支持：适用于“无法开机”问题的 Mac mini 服务计划](https://support.apple.com/zh-cn/mac-mini-2023-service-program-for-no-power-issue)

---

## 零售排查流程

1. 让顾客描述“完全没反应”还是“有声音、背光、键盘灯、风扇、Apple 标志或错误图标”。
2. 问发生前动作：更新、进液、跌落、长时间没用、换过充电器、接了扩展坞、外接显示器、搬动 Mac mini 或维修。
3. 现场先换插座、换线、换适配器或外接显示器交叉验证；不要跳过电源和显示器。
4. 拔掉所有外设，只保留电源，执行 10 秒电源按钮步骤。
5. 如果出现问号、禁止符号、空白屏幕或恢复界面，把它归入启动屏幕分流。
6. 如果是 M2 Mac mini 2023，检查服务计划序列号资格。
7. 能进系统或恢复时，先确认备份；需要重装、抹掉或恢复固件前，说明数据风险。
8. 完全无法开机或有安全风险时，停止自行尝试，进入 Apple 支持或授权服务路径。

---

## 升级处理

联系 Apple 支持或授权服务：

- 换过电源、线缆、插座、配件和显示器后仍没有任何反应。
- Mac 不能进入启动选项、macOS 恢复或任何可诊断画面。
- 有进液、跌落、异味、异常发热、电池鼓包、端口损坏或电源线破损。
- M2 Mac mini 2023 序列号查询显示符合服务计划。
- 启动屏幕分流、磁盘工具或重装流程反复失败。

---

## 相关问题

- [Mac 需要修复或恢复固件](/recipes/Mac/mac-dfu-firmware-revive-restore)
- [Mac 忘记登录密码，无法进入 macOS](/recipes/Mac/mac-forgot-login-password-reset)
- Mac 启动时显示问号文件夹
- Mac 显示激活锁或锁形图标
- Mac 外接显示器无画面

---

## 标签

- 设备：Mac、MacBook、Mac mini、Mac Studio、iMac
- 系统：macOS
- 功能：开机、启动、电源、恢复、显示器、服务计划
- 数据：重装、抹掉或恢复前先确认备份
- 维修：完全无反应、安全风险或服务计划命中时进入服务路径
- 配件：电源适配器、电源线、外接显示器、USB 集线器、扩展坞、外置硬盘

---

## 元信息

- 最后更新：2026-07-15
- 来源数量：6
- 验证级别：Apple 官方
- 支持系统：当前 macOS；启动和恢复入口取决于 Mac 机型和芯片
- 可信度：高
