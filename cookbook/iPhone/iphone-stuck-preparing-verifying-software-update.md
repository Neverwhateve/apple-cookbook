---
title: iPhone 设置或更新时卡在正在准备更新、正在验证更新
slug: iphone-stuck-preparing-verifying-software-update
device:
  - iPhone
  - iPad
category: iPhone
tags:
  - iPhone
  - iPad
  - iOS
  - iPadOS
  - 软件更新
  - 设置助理
  - 数据迁移
aliases:
  - iPhone stuck preparing update
  - iPhone stuck verifying update
  - new iPhone stuck software update
  - iPhone setup stuck on software update
  - iOS update stuck preparing update
  - iOS update stuck verifying update
  - iPhone 新机设置卡在软件更新
  - iPhone 卡在正在准备更新
  - iPhone 卡在正在验证更新
  - iPhone 传输数据卡在更新
verification: Official
difficulty: Moderate
updated: 2026-07-11
official_sources:
  - https://support.apple.com/zh-cn/108905
  - https://support.apple.com/zh-cn/118575
  - https://support.apple.com/zh-cn/118106
  - https://support.apple.com/zh-cn/102317
  - https://support.apple.com/zh-cn/108969
  - https://support.apple.com/zh-cn/109057
  - https://support.apple.com/zh-cn/109046
  - https://support.apple.com/zh-cn/102659
  - https://support.apple.com/zh-cn/120001
  - https://support.apple.com/zh-cn/102421
community_sources:
  - https://discussions.apple.com/thread/256189818
  - https://discussions.apple.com/thread/255571796
  - https://discussions.apple.com/thread/255531482
  - https://www.reddit.com/r/iphone/comments/1nj8v4t/stuck_on_verifying_update_screen_upgrading_to/
  - https://www.reddit.com/r/applehelp/comments/1kzc9rm/new_iphone_16_plus_stuck_in_the_software_update/
  - https://www.reddit.com/r/iphone/comments/1c2f2an/solution_for_new_iphone_stuck_updating_ios_during/
status: canonical
popular: true
---

# iPhone 设置或更新时卡在正在准备更新、正在验证更新

新 iPhone 设置、快速开始迁移、无线更新或电脑更新时，设备可能长时间停在“软件更新”“正在准备更新”“正在验证更新”或 Apple 标志进度条。先判断它是在正常安装、下载文件损坏、储存空间不足、网络不稳定，还是需要改用电脑更新或恢复。

---

## 症状

- “新 iPhone 设置到软件更新就不动了。”
- “快速开始传输数据前卡在正在准备更新。”
- “iOS 26 正在验证更新一个小时。”
- “更新进度条看起来完全没有动。”
- “设置助理没有跳过更新的按钮。”
- “旧手机已经转移 eSIM，新手机还卡在更新。”
- “删除更新在哪里？还没进主屏幕怎么办？”

---

## 可能原因

1. **更新仍在进行，只是进度看起来很慢**
   - Apple 说明，更新、从备份恢复或抹掉后出现 Apple 标志和进度条时，进度条可能移动缓慢或看上去静止，持续时间取决于文件数量和正在进行的操作类型。
2. **设备无法完成无线更新**
   - Apple 的无线更新排查包括确认机型支持、释放储存空间、删除已下载更新并重新下载，以及改用 Mac 或 iTunes 更新。
3. **新机设置或快速开始迁移受网络和迁移量影响**
   - Apple 说明，快速开始需要旧设备 Wi-Fi 和蓝牙，新设备连接 Wi-Fi 或蜂窝网络；直接从旧设备传输时，两台设备必须相邻、接电，并等待传输完成，所需时间取决于网络状况和传输数据量。
4. **设备已经进入恢复屏幕或电脑更新错误分支**
   - Apple 说明，看到“连接电脑”屏幕、电脑提示恢复模式、设备停在 Apple 标志无进度条，或恢复助理反复无法恢复时，可能需要恢复模式并用电脑更新或恢复。
5. **更新失败后叠加 eSIM 或数据迁移风险**
   - Apple 说明，不应在排查时删除 eSIM，除非运营商指示；删除 eSIM 后需要联系运营商重新取得 eSIM。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先确认屏幕状态：是在设置助理的“软件更新”，主屏幕后“正在准备更新 / 正在验证更新”，Apple 标志加进度条，还是“连接电脑”恢复屏幕。
2. 如果看到 Apple 标志和进度条，先接入电源并等待。Apple 说明进度条可能缓慢或看似静止；如果出现“正在更新”信息，表示更新仍在进行。
3. 如果设备可进入主屏幕，打开**设置 > 通用 > [设备] 储存空间**，确认有足够空间。需要时启用“卸载未使用的 App”或手动删除可重新下载的内容。
4. 如果无线更新仍无法安装，打开**设置 > 通用 > [设备] 储存空间**，在 App 列表中找到更新，轻点更新并选择**删除更新**。
5. 回到**设置 > 通用 > 软件更新**，重新下载并安装最新更新。
6. 如果列表中没有更新，或问题再次发生，改用 Mac、Apple 设备 App 或 iTunes 更新设备。
7. 用电脑更新时，先更新 Mac、Apple 设备 App 或 iTunes；将 iPhone 或 iPad 直接连接到电脑 USB 端口，不要通过键盘或 USB 集线器。
8. 如果电脑更新时出现错误，按 Apple 顺序更换线缆或 USB 端口，重启电脑和设备，并检查第三方安全软件是否阻止连接 Apple 软件更新服务器。
9. 如果设备显示“连接电脑”屏幕、电脑提示恢复模式、设备长时间停在 Apple 标志且没有进度条，或恢复助理反复失败，将设备置于恢复模式并优先选择**更新**。更新会尝试重新安装系统而不抹掉数据。
10. 如果恢复模式“更新”失败，或 Apple 支持要求恢复，再选择**恢复**。恢复会抹掉设备，之后只能从可用备份恢复。
11. 如果新机设置期间已经转移或激活 eSIM，不要在没有运营商准备的情况下删除 eSIM；需要抹掉或重新设置前，确认是否保留 eSIM，或先联系运营商确认重新激活路径。

参考来源：

- [Apple 支持：如果 iPhone 或 iPad 无法更新](https://support.apple.com/zh-cn/108905)
- [Apple 支持：更新你的 iPhone 或 iPad](https://support.apple.com/zh-cn/118575)
- [Apple 支持：如果你无法更新或恢复 iPhone 或 iPod touch](https://support.apple.com/zh-cn/118106)
- [Apple 支持：更新或恢复后出现 Apple 标志和进度条](https://support.apple.com/zh-cn/102317)
- [Apple 支持：如果 iPhone、iPad 或 iPod touch 上出现恢复屏幕](https://support.apple.com/zh-cn/108969)
- [Apple 支持：如果更新或恢复时看到错误信息](https://support.apple.com/zh-cn/109057)
- [Apple 支持：使用“访达”更新 iPhone、iPad 或 iPod touch](https://support.apple.com/zh-cn/109046)
- [Apple 支持：使用“快速开始”将数据传输到新的 iPhone 或 iPad](https://support.apple.com/zh-cn/102659)
- [Apple 支持：使用“访达”、Apple 设备 App 或 iTunes 将数据从旧 iOS 设备传输到新设备](https://support.apple.com/zh-cn/120001)
- [Apple 支持：如何抹掉 iPhone 或 iPad 上的 eSIM](https://support.apple.com/zh-cn/102421)

---

## 新 iPhone 设置助理卡在软件更新

验证级别：官方步骤 + 社区频率信号

1. 先接入电源，确认 Wi-Fi 稳定，并等待合理时间。不要因为进度条短时间不动就立刻强制中断。
2. 如果设置助理仍可返回上一步，优先换一个可靠 Wi-Fi，或先减少设置助理中的可选项目，再重新尝试更新。
3. 如果新 iPhone 已经进入主屏幕，按 Apple 官方步骤删除更新并重新下载，或改用电脑更新。
4. 如果新 iPhone 还没有可用数据，社区中常见的处理是先把新机作为新设备完成设置，进入主屏幕后更新 iOS，再抹掉新机并重新开始迁移。这个方法不是 Apple 对“卡在设置更新”的专门官方步骤，但它使用的是 Apple 支持的更新、抹掉和从备份/旧设备迁移流程。
5. 使用这个社区方法前，先确认旧 iPhone 数据仍完整、备份可用、Apple 账户密码可用，并特别确认 eSIM 是否已经转移到新机。
6. 如果新机已经有唯一可用的 eSIM，抹掉前不要选择删除 eSIM，除非运营商明确要求或已经准备好重新下发 eSIM。

---

## 已验证的非官方处理思路

非官方

### 先设置为新 iPhone，更新后再抹掉重新迁移

- 来源：Apple Support Community 和 Reddit 中，多名用户报告新机快速开始或设置助理卡在软件更新；常见绕行方式是先跳过迁移完成设置，更新系统，再抹掉新机并重新执行迁移。
- 成功概率：中等，尤其适合新机还没有重要本地数据、旧机和备份都完整的情况。
- 风险：中等。可能导致迁移流程重来；如果 eSIM 已转移或新机已产生新数据，抹掉前必须确认保留 eSIM 和备份边界。
- 备注：不要把它说成 Apple 官方首选方案。官方优先顺序仍是等待、释放空间、删除更新、重新下载、电脑更新、恢复模式更新。
- 验证级别：较可能

### 强制重新启动

- 来源：Apple 的恢复屏幕和无响应设备流程包含按键重新启动；Apple Community 中也常把强制重新启动作为“验证更新”界面无响应时的尝试。
- 成功概率：中等，适合屏幕无响应、没有进度、无法正常关机的情况。
- 风险：中等。正在写入系统时中断可能让设备进入恢复模式，需要电脑更新或恢复。
- 备注：如果屏幕显示明确的进度条或“正在更新”，先等待并接电；不要反复强制重启。
- 验证级别：较可能

---

## 零售排查流程

1. 先看屏幕，不要只听“卡住”：设置助理、主屏幕后无线更新、Apple 标志进度条、恢复屏幕和电脑错误是不同分支。
2. 问清楚时间：卡了 10 分钟、1 小时、过夜，还是每次都卡在同一百分比。
3. 询问数据状态：旧机是否还在、是否有 iCloud 或电脑备份、新机是否已经有新照片/聊天记录、eSIM 是否已转移。
4. 如果只是 Apple 标志进度条慢，先接电等待，并解释 Apple 明确说进度可能看似静止。
5. 如果能进主屏幕，按官方顺序检查储存空间、删除更新、重新下载，再考虑电脑更新。
6. 如果是新机设置助理卡住，优先保证旧机和备份安全；没有本地数据的新机可以考虑“先作为新机设置、更新、抹掉、重新迁移”的社区绕行，但要明确标为非官方。
7. 如果已出现恢复屏幕或电脑错误，转电脑更新流程；优先点**更新**，只有更新失败或顾客接受数据抹掉风险时才点**恢复**。
8. 不要推荐第三方刷机工具、测试版描述文件、未知固件包或绕过设置助理的工具作为零售建议。
9. 记录证据：屏幕文字、停留时长、网络、剩余空间、电脑错误码、线缆/端口、是否保留 eSIM、备份时间。

---

## 升级处理

联系 Apple 支持：

- 删除更新、重新下载、换网络和电脑更新后仍反复失败。
- 电脑更新或恢复时出现错误代码，需要进一步判断连接、软件更新服务器或设备问题。
- 顾客需要远程协助确认是否应进入恢复模式。

前往 Apple Store 或授权维修点：

- 没有可用电脑，设备已经进入恢复屏幕或无法完成更新。
- 多条线缆、多台电脑和不同网络都无法更新或恢复。
- 设备更新失败后无法开机、反复重启、异常发热或无法被电脑识别。

维修或更换硬件：

- 只有在电脑更新/恢复和诊断证据指向硬件、存储或主板相关问题时才进入维修路径。

---

## 相关问题

- [iPhone 更新后掉电快或发热](/recipes/iPhone/iphone-battery-drains-after-update)
- [iPhone 不可用、安全锁定或忘记锁屏密码](/recipes/iPhone/iphone-unavailable-security-lockout-forgot-passcode)
- [iPhone 无法设置或转移 eSIM](/recipes/iPhone/iphone-esim-setup-transfer-fails)
- [iPhone 显示 SOS、无服务或正在搜索](/recipes/iPhone/iphone-sos-no-service-searching)
- [iPhone 或 iPad 无法连接 Wi-Fi 或显示无互联网连接](/recipes/Networking/iphone-ipad-wifi-no-internet-unable-to-join)

---

## 标签

- 设备：iPhone、iPad
- 系统：iOS、iPadOS
- 功能：软件更新、设置助理、快速开始、数据迁移
- 网络：Wi-Fi、Apple 软件更新服务器
- Apple ID：迁移和恢复备份可能需要 Apple 账户
- 连续互通：快速开始
- 隐私：备份、抹掉设备、聊天记录和照片迁移
- 维修：更新/恢复失败后可能涉及硬件诊断
- 配件：USB 线缆、Mac、PC、Apple 设备 App、iTunes

---

## 元信息

- 最后更新：2026-07-11
- 来源数量：16
- 验证级别：Apple 官方
- 支持系统：当前 iOS、iPadOS；电脑更新路径取决于 macOS、Apple 设备 App 或 iTunes 版本
- 可信度：高
