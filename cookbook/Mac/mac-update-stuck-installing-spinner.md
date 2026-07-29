---
schemaVersion: 2
id: mac-update-stuck-installing-spinner
title: Mac 更新或安装 macOS 卡住、一直转圈或停在剩余几分钟
slug: mac-update-stuck-installing-spinner
summary: >-
  Mac 更新 macOS 时停在“准备安装”“剩余 5 分钟”“不到 1 分钟”、Apple 标志进度条或一直转圈。先区分安装仍在进行、储存空间或网络不足、启动磁盘问题，以及需要 macOS 恢复或固件修复的少数情况。
symptoms:
  - “Mac 更新一直卡在 5 分钟。”
  - “macOS 安装进度条一个小时没动。”
  - “Mac 更新时黑屏或一直转圈。”
  - “软件更新一直显示正在准备。”
  - “macOS 下载完成但安装失败。”
  - “更新后 Mac 进不了系统。”
  - “我不敢强制关机，会不会把 Mac 弄坏？”
devices:
  - Mac
platforms:
  - macOS
systemVersions:
  - macOS Tahoe 26
  - macOS Sequoia 15
  - macOS Sonoma 14
categories:
  - Mac
tags:
  - Mac
  - macOS
  - Software Update
  - Installation
  - Recovery
  - Storage
keywords:
  - Mac 更新卡住
  - Mac 一直转圈
  - macOS 安装失败
  - macOS 剩余 5 分钟
  - macOS 正在准备安装
  - Mac 更新后黑屏
  - Mac update stuck
  - macOS install stuck
aliases:
  - Mac update stuck installing
  - macOS update stuck at 5 minutes
  - Mac stuck preparing update
  - macOS installation spinning
errorMessages:
  - 安装 macOS 时发生错误
  - 软件已损坏，无法验证
  - 无法进行个性化设置
officialTerms:
  - 软件更新
  - macOS 恢复
  - 安全模式
  - 磁盘工具
  - 修复 Mac 固件
communityTerms:
  - 卡在 5 分钟
  - 卡在 20 分钟
  - 一直转圈
  - 更新不动
  - 更新后黑屏
difficulty: Moderate
estimatedTime: 10–60 分钟基础检查；恢复、重新安装或固件处理时间另计
verificationLevel: Official
status: canonical
canonicalArticleId: mac-update-stuck-installing-spinner
solutions:
  - id: mac-update-install-official-path
    title: Apple 官方方案
    summary: 先给安装留出合理时间，再按储存空间、网络、安全模式、恢复、磁盘修复和固件边界逐级处理。
    kind: recommended
    steps:
      - 先记录屏幕文字、停留时间、Mac 机型、当前 macOS 版本和是否有备份。更新期间接入电源并保持网络连接。
      - 如果仍显示 Apple 标志和进度条，先等待；进度条可能移动缓慢或看似静止。不要仅因短时间停在某个分钟数就立刻中断。
      - 如果能进入 macOS，打开“系统设置 > 通用 > 储存空间”，确认有足够可用空间，并删除可确认的下载文件或其他大文件。
      - 确认互联网连接稳定。macOS 安装器需要联网下载系统，并获取适用于这台 Mac 的固件和其他信息。
      - 如果从“软件更新”或 App Store 安装仍失败，在备份可用的前提下尝试安全模式，再重新安装。
      - 如果问题持续，从 macOS 恢复启动，再选择重新安装 macOS。重新安装前不要在“磁盘工具”中抹掉启动宗卷；抹掉会改变数据风险。
      - 在 macOS 恢复的“磁盘工具”中按 Apple 指引修复启动磁盘；如果旧安装器提示已损坏或无法验证，删除旧安装器并从 Apple 重新获取。
      - 如果 Mac 无法正常启动、反复回到安装界面或出现恢复屏幕，优先继续走 macOS 恢复，而不是反复强制关机。
      - 对搭载 Apple 芯片或 Apple T2 安全芯片的 Mac，只有在持续安装失败且 Apple 指引或支持人员确认时，才进入“修复或恢复固件”分支；先选择“修复 Mac”，因为“恢复 Mac”会抹掉设备。
      - 只有在前述方案无效、备份和数据风险已确认，或 Apple 支持明确要求时，才考虑抹掉 Mac 并恢复出厂设置。
    verificationLevel: Official
    sourceIds:
      - official-mac-install-error-102531
      - official-mac-update-108382
      - official-macos-install-102662
      - official-mac-startup-mchlp2889
    warnings:
      - 不要在 Apple 标志和进度条仍显示活动时反复强制关机；中断安装可能导致恢复或启动问题。
      - 抹掉启动宗卷或选择“恢复 Mac”可能造成数据丢失，执行前必须确认备份和数据边界。
    limitations:
      - 远程步骤无法确认安装进度条是否仍在写入，也无法替代对启动磁盘或固件的硬件检测。
sources:
  - id: official-mac-install-error-102531
    title: Apple 支持：如果在更新或安装 macOS 时发生错误
    url: 'https://support.apple.com/zh-cn/102531'
    publisher: Apple
    sourceType: official-support
    accessedAt: '2026-07-23'
    publishedAt: '2026-05-13'
    official: true
  - id: official-mac-update-108382
    title: Apple 支持：在 Mac 上更新 macOS
    url: 'https://support.apple.com/zh-cn/108382'
    publisher: Apple
    sourceType: official-support
    accessedAt: '2026-07-23'
    publishedAt: '2026-06-04'
    official: true
  - id: official-macos-install-102662
    title: Apple 支持：如何下载和安装 macOS
    url: 'https://support.apple.com/zh-cn/102662'
    publisher: Apple
    sourceType: official-support
    accessedAt: '2026-07-23'
    publishedAt: null
    official: true
  - id: official-mac-startup-mchlp2889
    title: Apple 支持：如果 Mac 无法正常启动
    url: 'https://support.apple.com/zh-cn/guide/mac-help/mchlp2889/mac'
    publisher: Apple
    sourceType: official-support
    accessedAt: '2026-07-23'
    publishedAt: null
    official: true
  - id: community-macos-stuck-20260722
    title: Reddit：Update stuck like this for more than 12 hours
    url: 'https://www.reddit.com/r/MacOS/comments/1urjykx/update_stuck_like_this_for_more_than_12_hours_how/'
    publisher: Reddit
    sourceType: community
    accessedAt: '2026-07-23'
    publishedAt: '2026-07-09'
    official: false
  - id: community-macos-tahoe-20260722
    title: Reddit：I’m trying to update to macOS Tahoe 26 but it’s stuck like this
    url: 'https://www.reddit.com/r/mac/comments/1nisd1v/im_trying_to_update_to_macos_tahoe_26_but_its/'
    publisher: Reddit
    sourceType: community
    accessedAt: '2026-07-23'
    publishedAt: '2025-09-27'
    official: false
lastVerifiedAt: '2026-07-23'
lastUpdatedAt: '2026-07-23'
createdAt: '2026-07-22'
relatedArticles:
  - mac-system-data-storage-apfs-snapshots-purgeable-space
  - mac-dfu-firmware-revive-restore
  - iphone-stuck-preparing-verifying-software-update
warnings:
  - 不要在 Apple 标志和进度条仍显示活动时反复强制关机；中断安装可能导致恢复或启动问题。
  - 抹掉启动宗卷或选择“恢复 Mac”可能造成数据丢失，执行前必须确认备份和数据边界。
limitations:
  - 远程步骤无法确认安装进度条是否仍在写入，也无法替代对启动磁盘或固件的硬件检测。
popular: false
---

# Mac 更新或安装 macOS 卡住、一直转圈或停在剩余几分钟

Mac 更新时停在“准备安装”、剩余几分钟、Apple 标志进度条或黑屏，不代表原因只有一个。先看它是否仍在安装，再按 Apple 的储存空间、网络、安全模式、macOS 恢复和磁盘修复顺序处理；固件修复与抹掉 Mac 都是后置分支。

---

## 症状

- “Mac 更新一直卡在 5 分钟。”
- “macOS 安装进度条一个小时没动。”
- “软件更新一直显示正在准备。”
- “更新后 Mac 黑屏或进不了系统。”
- “我不敢强制关机，会不会把 Mac 弄坏？”

---

## 可能原因

1. 安装仍在进行，只是进度条或剩余时间估算没有及时变化。
2. 启动磁盘可用空间不足，或网络无法下载系统、固件和个性化信息。
3. 软件更新使用的安装器已损坏、无法验证，或其他软件干扰了安装。
4. 启动磁盘需要在 macOS 恢复中修复。
5. 极少数搭载 Apple 芯片或 T2 安全芯片的 Mac 需要修复或恢复固件。

---

## Apple 官方方案

验证级别：Apple 官方

1. 接入电源并先等待合理时间。屏幕显示 Apple 标志和进度条时，短时间不动不等于安装失败。
2. 如果能进入系统，检查“系统设置 > 通用 > 储存空间”，并确认网络稳定。
3. 软件更新或 App Store 安装仍失败时，尝试安全模式后重新安装。
4. 如果仍失败，从 macOS 恢复启动并选择重新安装 macOS。不要为了排查更新问题直接抹掉启动宗卷。
5. 在 macOS 恢复的“磁盘工具”中修复启动磁盘。旧安装器若提示损坏或无法验证，应删除并从 Apple 重新获取。
6. 只有在持续安装失败并确认机型适用时，才进入 Apple 芯片或 T2 Mac 的固件修复/恢复分支；先选“修复 Mac”，不要把“恢复 Mac”当作普通更新步骤。
7. 抹掉 Mac 会带来数据风险，只在备份已确认、前面步骤无效或 Apple 支持明确要求时执行。

参考来源：

- [Apple 支持：如果在更新或安装 macOS 时发生错误](https://support.apple.com/zh-cn/102531)
- [Apple 支持：在 Mac 上更新 macOS](https://support.apple.com/zh-cn/108382)
- [Apple 支持：如何下载和安装 macOS](https://support.apple.com/zh-cn/102662)
- [Apple 支持：如果 Mac 无法正常启动](https://support.apple.com/zh-cn/guide/mac-help/mchlp2889/mac)

---

## Community Discoveries

以下为非官方的社区观察，不替代上方 Apple 官方方案。

### 有用户报告重启后安装继续完成

- 来源：2026-07-09 的 Reddit 讨论及评论；部分用户称 Mac 更新长时间停在进度条后，重启最终完成，但原帖也有用户重启后仍然卡住。
- 结论：这是一个结果不一致的社区信号，不能当作稳定修复。只有在长时间没有任何变化、系统明显无响应且已理解中断风险时，才可把一次重启视为实验性尝试；不要在明确显示正在写入、进度刚开始或设备仍有活动时反复中断。
- Confidence: Experimental

### “剩余 5 分钟”可能实际还要等待一到两小时

- 来源：2026-07-08 的 Reddit 讨论及评论；有用户报告在“剩余 5 分钟”停留约 1.5–2 小时后自行完成，也有人在等待更久后仍未完成。
- 结论：剩余时间是估算值，不能据此承诺具体完成时间。若 Apple 标志下的进度条仍有变化、设备没有明显错误提示，应先接电并继续等待；不要把“等一会儿”写成无限等待，也不要据此证明所有卡顿都正常。
- Confidence: Likely

### 关闭并重新打开“系统设置”后继续安装

- 来源：较早的 macOS Tahoe Reddit 讨论中，少数用户报告关闭“系统设置”窗口后重新启动提示，安装继续完成。
- 结论：这只适用于仍能回到桌面、更新尚未进入重启安装阶段的情况；不适用于 Apple 标志进度条或黑屏阶段。
- Confidence: Experimental

### “强制关机绝不会损坏 Mac”是错误的绝对说法

- 来源：同一近期讨论的评论区出现互相矛盾的断言；没有足够证据证明强制关机在系统安装写入期间总是安全。
- 结论：不要把这句话作为零售建议。中断安装可能让 Mac 进入恢复、反复启动或需要进一步修复；是否能恢复取决于中断时机和设备状态。
- Confidence: Myth

---

## 零售排查流程

1. 记录屏幕状态：桌面中的软件更新、准备安装、Apple 标志进度条、黑屏、问号或恢复屏幕。
2. 记录停留时间、当前版本、机型、剩余空间、网络、是否接电以及最近一次备份。
3. 能进入系统时先检查空间和网络；不要先删除系统文件或运行网上复制的 `sudo rm` 命令。
4. 进入恢复路径前确认数据边界；优先“重新安装 macOS”，避免误点“抹掉”。
5. 如果是 Apple 芯片或 T2 Mac 的持续安装故障，再判断是否需要固件修复；修复优先于恢复。

---

## 升级处理

联系 Apple 支持或授权维修点：

- 多次安装、恢复或安全模式尝试仍失败。
- Mac 无法启动、反复重启、出现问号或恢复屏幕。
- 固件修复失败，或没有第二台 Mac、无法确认 DFU 端口和机型。
- 顾客没有备份但需要保留本机数据。

---

## 相关问题

- [Mac 系统数据很大：储存空间、APFS 快照与可清除空间](/recipes/Mac/mac-system-data-storage-apfs-snapshots-purgeable-space)
- [Mac 需要修复或恢复固件](/recipes/Mac/mac-dfu-firmware-revive-restore)
- [iPhone 设置或更新时卡在正在准备更新、正在验证更新](/recipes/iPhone/iphone-stuck-preparing-verifying-software-update)
