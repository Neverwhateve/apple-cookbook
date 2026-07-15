---
schemaVersion: 2
id: mac-printer-offline-cant-print-airprint
title: Mac 打印机无法打印、离线或找不到
slug: mac-printer-offline-cant-print-airprint
summary: Mac 打印没反应、打印机显示离线、队列暂停、找不到 AirPrint 打印机或只能从其他设备打印时，先按队列、网络、打印机本体、App、驱动和打印系统顺序排查，最后才还原打印系统。
symptoms:
  - Mac 打印机显示离线
  - 打印任务一直卡在队列里
  - 点打印没有反应
  - Mac 找不到 AirPrint 打印机
  - 同一台打印机手机能打 Mac 不能打
  - 打印队列暂停或作业出错
  - 打印机有纸有墨但 Mac 不能打印
  - 重新添加打印机后才能打印
devices:
  - Mac
platforms:
  - macOS
systemVersions:
  - 当前版本的 macOS
categories:
  - Mac
tags:
  - Mac
  - macOS
  - Printer
  - AirPrint
  - Wi-Fi
  - USB
  - Drivers
keywords:
  - Mac 打印机
  - 打印机离线
  - 打印不了
  - 打印队列
  - 打印中心
  - AirPrint
  - 隔空打印
  - 找不到打印机
  - 还原打印系统
  - 打印机驱动
aliases:
  - Mac printer offline
  - Mac can't print
  - AirPrint printer not found Mac
  - printer queue paused Mac
  - reset printing system Mac
  - Mac 打印机离线
  - Mac 找不到打印机
  - Mac 打印任务卡住
  - 隔空打印找不到打印机
errorMessages:
  - Printer Offline
  - The printer is offline
  - Hold for Authentication
  - Printing - Waiting
  - Unable to connect to printer
officialTerms:
  - Print Center
  - Printers & Scanners
  - AirPrint
  - Reset printing system
  - Print Dialog Extensions
communityTerms:
  - 打印机离线
  - 打印任务卡住
  - 打印队列暂停
  - 打印机搜不到
  - 驱动不兼容
difficulty: Moderate
estimatedTime: null
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: clear-queue-and-check-scope
    title: 先确认队列、目标打印机和影响范围
    summary: 打印没反应时，先看打印中心是否暂停、作业是否出错，以及是否误选了其他打印机。
    kind: recommended
    steps:
      - 打开“打印中心”或点按程序坞中的打印机队列图标。
      - 如果工具栏显示“继续”，先点按继续打印；如果某个作业出错并暂停队列，删除该作业后重试。
      - 如果单个作业暂停，选择该作业并继续；如果队列中没有刚发送的作业，回到 App 的打印对话框确认选中的打印机。
      - 尝试从“文本编辑”等另一个 App 打印一页简单文稿，区分 App 问题和全系统打印问题。
      - 记录队列状态、错误文字、连接方式和是否只有这台 Mac 受影响。
    verificationLevel: Official
    sourceIds:
      - apple-solve-printing-problems-mac
      - apple-print-center-mac
    warnings: []
    limitations:
      - 打印中心只能处理 Mac 端队列；纸张、卡纸、耗材、网络或打印机固件问题仍需继续排查。
  - id: check-printer-network-and-airprint
    title: 检查打印机本体、网络和 AirPrint 条件
    summary: 网络打印机必须和 Mac 位于同一网络；AirPrint 打印机开机后可能需要等待一两分钟才加入网络。
    kind: recommended
    steps:
      - 到打印机旁确认已开机、状态灯正常、有纸、没有卡纸、墨水或碳粉充足，线缆连接牢固。
      - 如果是 Wi-Fi 或网络打印机，确认 Mac 和打印机仍在同一无线局域网，并确认没有误连访客网络、手机热点或隔离网络。
      - 如果使用 AirPrint，确认打印机支持 AirPrint，且 Mac 与打印机接入同一个无线局域网。
      - 打印机刚开机时等待一两分钟再试；部分打印机需要时间重新加入网络。
      - 如果无线不可用，按打印机文稿临时改用 USB、以太网或桥接方式测试。
      - 如果打印机连接在 AirPort 基站或 AirPort 时间返回舱上，使用以太局域网端口或 Wi-Fi；不要把 AirPrint 期待建立在 AirPort USB 端口上。
    verificationLevel: Official
    sourceIds:
      - apple-solve-printing-problems-mac
      - apple-wireless-printing-mac
      - apple-airprint-about
    warnings:
      - 网络、企业 Wi-Fi、访客网络或路由器隔离策略可能阻止设备互相发现；不要只看两者都能上网。
    limitations:
      - 打印机型号、固件和网络配置由打印机生产企业控制；Apple 官方流程不能替代生产企业诊断。
  - id: readd-queue-and-update-software
    title: 重新添加打印机队列并检查打印软件
    summary: 旧队列损坏、驱动过旧或选错打印机软件时，重新添加队列通常比反复重启更有价值。
    kind: alternative
    steps:
      - 前往“系统设置 > 打印机与扫描仪”，点按添加打印机、扫描仪或传真机。
      - 等待一到两分钟，让本地网络上的打印机出现在列表中；必要时按 IP 地址添加。
      - 如果新添加的队列可以打印，删除旧打印机队列。
      - 检查 macOS 软件更新，并确认打印机安装了正确版本的打印机软件或驱动程序。
      - AirPrint 打印机优先使用 AirPrint；非 AirPrint 或特殊功能依赖生产企业软件时，向生产企业确认当前兼容版本。
      - 如果使用共享打印机，确认共享它的 Mac 没有睡眠、共享仍开启，并且相关 Mac 的打印软件版本一致。
    verificationLevel: Official
    sourceIds:
      - apple-solve-printing-problems-mac
      - apple-update-printer-software-mac
      - apple-add-printer-mac
    warnings:
      - 不要从不明来源下载所谓万能驱动或清理工具；驱动和固件以打印机生产企业当前说明为准。
    limitations:
      - 部分旧打印机可能没有与当前 macOS 兼容的软件；这需要生产企业确认。
  - id: disable-pde-or-reset-printing-system
    title: 关闭打印对话框扩展，最后再还原打印系统
    summary: 只有常规队列、网络、App 和驱动排查无效时，才进入 PDE 或还原打印系统分支。
    kind: alternative
    steps:
      - 如果只有某些 App 或打印选项出错，在“打印机与扫描仪”中选择该打印机，进入“选项与耗材”，勾选“使用普通打印机特性”后重试。
      - 仍无法打印且已尝试其他官方排查后，再考虑还原打印系统。
      - 在“打印机与扫描仪”中按住 Control 键点按打印机列表中的打印机，选择“还原打印系统”。
      - 如果列表为空，按住 Control 键点按空白列表，也可以选择“还原打印系统”。
      - 还原后重新添加需要使用的打印机，并重新设置默认打印机或常用预置。
    verificationLevel: Official
    sourceIds:
      - apple-solve-printing-problems-mac
      - apple-reset-printing-system-mac
    warnings:
      - 还原打印系统会删除打印机列表中的所有打印机、所有已完成打印作业信息和所有打印机预置。
      - 还原打印系统不是第一步；Apple 要求先尝试其他打印故障排除技术。
    limitations:
      - 还原打印系统只能重建 Mac 端打印配置，不能修复打印机硬件、网络隔离或生产企业服务问题。
  - id: escalate-to-admin-or-vendor
    title: 按管理边界升级处理
    summary: 公司、学校、共享打印机和生产企业驱动问题要交给对应管理员或生产企业处理。
    kind: escalation
    steps:
      - 如果打印机由公司、学校或店铺管理，记录打印机名称、队列状态、IP 地址或共享路径后联系管理员。
      - 如果只有某台打印机在所有设备上都不能打印，优先联系打印机生产企业或现场维护人员。
      - 如果同一台打印机在其他设备可用，但只有这台 Mac 无法打印，带上 macOS 版本、连接方式、错误信息和已做步骤联系 Apple 支持。
      - 不要在不清楚后果的情况下修改路由器隔离、企业 Wi-Fi、打印服务器或 MDM 配置。
    verificationLevel: Official
    sourceIds:
      - apple-solve-printing-problems-mac
      - apple-wireless-printing-mac
    warnings:
      - 管理型网络和共享打印服务器可能包含权限、证书或队列策略，普通用户不应绕过组织流程。
    limitations:
      - Apple 官方资料只覆盖 Mac 端通用排查；打印机固件、耗材、网络策略和服务器队列需要对应责任方确认。
warnings:
  - 还原打印系统会清空 Mac 上的打印机列表、已完成作业信息和打印机预置，应作为最后阶段操作。
  - 不要公开打印作业内容、队列截图中的文件名、公司打印机地址或网络配置。
  - 临时关闭网络安全、VPN 或企业策略前，应先确认你有权限；测试后恢复原配置。
limitations:
  - 打印机硬件、耗材、固件、企业打印服务器、路由器隔离和第三方驱动由生产企业或管理员控制。
  - AirPrint 支持状态以 Apple 的 AirPrint 页面和打印机生产企业提供的信息为准。
  - 本文不覆盖 iPhone 或 iPad 端 AirPrint 操作细节。
sources:
  - id: apple-solve-printing-problems-mac
    title: 在 Mac 上解决打印问题
    url: https://support.apple.com/zh-cn/guide/mac-help/mh14002/mac
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-wireless-printing-mac
    title: 通过打印机从 Mac 以无线方式进行打印
    url: https://support.apple.com/zh-cn/guide/mac-help/mchl3c1a7aef/mac
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-reset-printing-system-mac
    title: 还原 Mac 打印系统以解决问题
    url: https://support.apple.com/zh-cn/guide/mac-help/mh14001/mac
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-print-center-mac
    title: 在 Mac 上通过打印中心管理打印机和打印作业
    url: https://support.apple.com/zh-cn/guide/mac-help/mchl33bd189d/mac
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-airprint-about
    title: 关于隔空打印
    url: https://support.apple.com/zh-cn/102895
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: 2026-04-08
    official: true
  - id: apple-update-printer-software-mac
    title: 在 Mac 上更新打印机软件（如果打印机出现打印问题）
    url: https://support.apple.com/zh-cn/guide/mac-help/mchlp1077/mac
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-add-printer-mac
    title: 在 Mac 上将打印机添加到打印机列表以便进行使用
    url: https://support.apple.com/zh-cn/guide/mac-help/mh14004/mac
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-15
lastUpdatedAt: 2026-07-15
createdAt: 2026-07-15
relatedArticles:
  - iphone-ipad-wifi-no-internet-unable-to-join
  - mac-external-display-black-screen-low-resolution
popular: true
---

# Mac 打印机无法打印、离线或找不到

Mac 打印没反应、打印机显示离线、打印队列暂停、找不到 AirPrint 打印机，或同一台打印机在其他设备上能用但 Mac 不能用时，先不要直接重置系统。更稳的顺序是：先看打印中心和目标打印机，再确认网络和打印机本体，然后重新添加队列、检查打印软件，最后才还原打印系统。

---

## 症状

- “Mac 打印机显示离线。”
- “打印任务一直卡住，删不掉也打不出来。”
- “手机能打印，Mac 找不到打印机。”
- “点打印以后没有反应。”
- “打印队列暂停，或者某个作业一直报错。”
- “重新添加打印机后才恢复。”
- “AirPrint 打印机搜不到。”

---

## 可能原因

1. **打印到了错误队列或队列被暂停**
   - Apple 要求先检查打印中心：队列可能被暂停、单个作业可能暂停，或者出错作业让整个队列停住。
2. **Mac 和网络打印机不在同一网络**
   - 网络打印机需要 Mac 与打印机仍位于同一网络；访客 Wi-Fi、热点、企业隔离网络或路由器策略都可能让设备互相发现失败。
3. **打印机本体没有准备好**
   - 打印机需要开机、状态正常、有纸、无卡纸、耗材充足，线缆也要连接牢固。
4. **AirPrint 条件不满足**
   - AirPrint 打印机需要接入无线局域网，Apple 设备也要在同一无线局域网；某些打印机开机后需要一两分钟才加入网络。
5. **App、PDE 或打印软件问题**
   - 如果只有某个 App 或某些打印选项失败，可能和 App 或打印对话框扩展有关；非 AirPrint 打印机还可能依赖生产企业驱动。
6. **旧打印机队列或打印系统配置损坏**
   - Apple 建议重新添加打印机创建新队列；所有其他方案都无效时，才还原打印系统。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 打开“打印中心”或点按程序坞里的打印机队列图标。
2. 如果看到“继续”，点按继续打印；如果某个作业出错，删除该作业后重试；如果单个作业暂停，选择它并继续。
3. 如果队列里没有刚发送的作业，回到 App 的打印对话框，确认选中的是正确打印机。
4. 从“文本编辑”等另一个 App 打印简单文稿，判断是否只有原 App 失败。
5. 到打印机旁确认已开机、状态灯正常、有纸、没有卡纸、墨水或碳粉充足，USB 或电源线连接牢固。
6. 如果是网络或 AirPrint 打印机，确认 Mac 和打印机位于同一无线局域网；打印机刚开机时，等待一两分钟再试。
7. 如果无线打印失败，按打印机文稿临时用 USB、以太网或桥接方式测试。
8. 在“系统设置 > 打印机与扫描仪”中重新添加打印机。若新队列可用，删除旧队列。
9. 检查 macOS 软件更新，并向打印机生产企业确认驱动、固件或打印软件是否为当前兼容版本。
10. 如果只有某些 App 或打印选项异常，在该打印机的“选项与耗材”里启用“使用普通打印机特性”后复测。
11. 以上方法都无效时，再按 Apple 流程还原打印系统，然后重新添加需要的打印机。

参考来源：

- [Apple 支持：在 Mac 上解决打印问题](https://support.apple.com/zh-cn/guide/mac-help/mh14002/mac)
- [Apple 支持：通过打印机从 Mac 以无线方式进行打印](https://support.apple.com/zh-cn/guide/mac-help/mchl3c1a7aef/mac)
- [Apple 支持：还原 Mac 打印系统以解决问题](https://support.apple.com/zh-cn/guide/mac-help/mh14001/mac)
- [Apple 支持：在 Mac 上通过打印中心管理打印机和打印作业](https://support.apple.com/zh-cn/guide/mac-help/mchl33bd189d/mac)
- [Apple 支持：关于隔空打印](https://support.apple.com/zh-cn/102895)
- [Apple 支持：在 Mac 上更新打印机软件（如果打印机出现打印问题）](https://support.apple.com/zh-cn/guide/mac-help/mchlp1077/mac)
- [Apple 支持：在 Mac 上将打印机添加到打印机列表以便进行使用](https://support.apple.com/zh-cn/guide/mac-help/mh14004/mac)

---

## 常见分支

### 打印队列里有任务但不动

1. 打开打印中心。
2. 点按“继续”恢复整个队列，或恢复单个暂停的作业。
3. 删除明显出错的作业后重新打印。
4. 如果队列里没有目标作业，说明可能打印到了另一台打印机，回到 App 中重新选择。

### Mac 找不到 AirPrint 打印机

1. 确认打印机支持 AirPrint。
2. 确认 Mac 和打印机连接到同一个无线局域网。
3. 打印机刚开机时等待一两分钟。
4. 关闭访客网络、热点、企业隔离网络等变量，或换到普通家庭 Wi-Fi 测试。
5. 必要时用 USB 或以太网临时连接，确认打印机本体可用。

### 只有一个 App 不能打印

1. 从“文本编辑”或另一个 App 打印一页简单文稿。
2. 如果其他 App 正常，查原 App 的打印设置、页面大小、PDF 或插件。
3. 对使用打印对话框扩展的打印机，可在“选项与耗材”中启用“使用普通打印机特性”复测。

### 重新添加打印机后恢复

这通常说明旧队列、旧驱动选择或本地打印配置有问题。保留新队列，删除旧队列，并确认默认打印机指向新的可用队列。

### 什么时候还原打印系统

只在队列、App、网络、打印机本体、重新添加队列和打印软件检查都无效后再做。还原打印系统会清空打印机列表、已完成打印作业信息和打印机预置；还原后需要重新添加所有打印机。

---

## 不建议

- 一上来就还原打印系统。
- 从不明网站下载万能驱动、清理工具或破解打印工具。
- 只因为 Mac 和打印机都能上网，就认定它们一定在同一可发现网络。
- 在没有权限的公司或学校网络里修改路由器、打印服务器、证书或 MDM 配置。
- 在截图或反馈中公开打印文件名、公司打印机地址、IP、队列路径或内部网络信息。

---

## 零售排查流程

1. 先问清连接方式：USB、Wi-Fi、以太网、AirPrint、共享打印机还是公司打印服务器。
2. 让顾客现场打开打印中心，记录队列是否暂停、是否有出错作业、是否选错打印机。
3. 现场确认打印机本体状态：电源、纸张、卡纸、耗材、线缆和网络。
4. 用另一个 App 打印简单文稿，再决定是 App 问题、队列问题还是打印机连接问题。
5. 重新添加一个新队列测试；新队列可用时删除旧队列。
6. 只有上述步骤无效，且顾客理解后果时，才建议还原打印系统。

---

## 升级处理

- 所有设备都不能使用这台打印机：联系打印机生产企业或现场维护人员。
- 公司、学校、店铺或共享打印服务器上的打印机出问题：联系管理员。
- 只有这台 Mac 不能打印，且 Apple 官方排查后仍失败：带上 macOS 版本、打印机型号、连接方式、错误文字和已做步骤联系 Apple 支持。

---

## 相关问题

- 如果 Mac 同时无法访问网页或内网服务，先排查 Wi-Fi 或网络连接。
- 如果外接 USB 集线器、扩展坞或转换器不稳定，先直接连接打印机或更换线缆测试。
- 如果公司或学校打印机需要账号认证、证书或打印服务器队列，按管理员流程处理，不要按家庭打印机流程强行重置。
