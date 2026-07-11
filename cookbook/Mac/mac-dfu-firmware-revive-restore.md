---
title: Mac 需要修复或恢复固件
slug: mac-dfu-firmware-revive-restore
device:
  - Mac
category: Mac
tags:
  - Mac
  - Firmware
  - DFU
  - Startup
  - Repair
aliases:
  - Mac DFU revive restore
  - Mac firmware revive
  - Mac firmware restore
  - Mac starts to exclamation point in a circle
  - Mac blank screen after update
  - Mac stuck in firmware recovery mode
  - Mac 无法进入 DFU
  - Mac 固件恢复
  - Mac 修复固件
  - Mac 恢复固件
verification: Official
difficulty: Advanced
updated: 2026-07-11
official_sources:
  - https://support.apple.com/zh-cn/108900
  - https://support.apple.com/en-us/108900
  - https://support.apple.com/zh-cn/102675
  - https://support.apple.com/en-us/102768
  - https://support.apple.com/zh-cn/102541
community_sources:
  - https://discussions.apple.com/thread/255460941
  - https://discussions.apple.com/thread/255062128
  - https://discussions.apple.com/thread/256101935
  - https://www.reddit.com/r/mac/comments/1rgfu3l/macbookair_will_not_enter_dfu_mode_what_am_i/
  - https://www.reddit.com/r/mac/comments/1twjjxs/cant_get_into_dfu_mode_but_still_this_shows/
status: canonical
popular: true
---

# Mac 需要修复或恢复固件

搭载 Apple 芯片或 Apple T2 安全芯片的 Mac，在极少数情况下可能需要用另一台 Mac 修复或恢复固件。先确认这不是普通启动、显示器、恢复模式或登录问题；如果确实进入固件分支，优先选择“修复 Mac”，因为修复不会抹掉 Mac。

---

## 症状

- “Mac 更新断电后开不了机。”
- “开机只有圆圈里面一个感叹号。”
- “Mac 可以通电，但一直黑屏。”
- “Mac Studio 指示灯一直琥珀色闪烁。”
- “Finder 看不到 DFU 模式。”
- “Apple Configurator / 访达恢复失败。”
- “修复和恢复有什么区别，会不会抹掉资料？”
- “我没有第二台 Mac，能不能自己做 DFU？”

---

## 可能原因

1. **固件需要修复或恢复**
   - Apple 说明，搭载 Apple 芯片或 Apple T2 安全芯片的 Mac，可能在断电中断 macOS 安装等少见情况下需要修复或恢复固件。
2. **客户看到的是其他启动屏幕**
   - 问号、禁止符号、恢复助理、锁形图标、激活锁、目标磁盘模式和普通空白屏幕都有不同处理路径，不应直接进入 DFU。
3. **主机 Mac、线缆或 DFU 端口条件不满足**
   - Apple 要求另一台运行 macOS 14 或更高版本的 Mac、互联网连接、足够储存空间，以及同时支持数据传输和充电的 USB-C 至 USB-C 线缆；不要使用雷雳 3 充电线。
4. **DFU 按键时机或连接方式错误**
   - 笔记本和台式 Mac 的进入 DFU 方法不同，受影响 Mac 必须连接到正确 DFU 端口，并且不应通过 USB 集线器连接。
5. **恢复会触发数据和激活锁风险**
   - Apple 区分“修复”和“恢复”：修复不会抹掉 Mac；恢复会抹掉 Mac 并恢复为出厂设置。恢复后可能需要之前用于这台 Mac 的 Apple 账户登录。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先读取屏幕或状态灯：圆圈围绕的感叹号、无法通过空白屏幕方案解决的黑屏、固件恢复模式状态灯，或 macOS 安装错误无法用其他方法解决，才进入固件修复/恢复分支。
2. 如果是问号、禁止符号、锁形图标、激活锁、恢复助理、目标磁盘模式或普通登录窗口，先按对应启动屏幕处理，不要直接恢复固件。
3. 确认受影响 Mac 是搭载 Apple 芯片或 Apple T2 安全芯片的 Mac。其他 Mac 机型不适用这条固件修复/恢复流程。
4. 准备另一台运行 macOS 14 或更高版本的 Mac，连接互联网，并预留足够储存空间下载修复或恢复所需数据。
5. 准备一根同时支持数据传输和充电的 USB-C 至 USB-C 线缆，例如部分 Apple 产品随附的 USB-C 充电线。不要使用雷雳 3 充电线。
6. 将受影响 Mac 接到 Apple 指定的 DFU 端口；主机 Mac 的另一端可接任一 USB-C 端口。不要通过 USB 集线器或其他设备转接。
7. 如果是 Mac 笔记本电脑，确保两台 Mac 都接入电源；如有 MagSafe，受影响 Mac 用 MagSafe 供电，USB-C 口只用于 DFU 线缆。
8. 按 Apple 对应机型的按键步骤让受影响 Mac 进入 DFU 模式。进入 DFU 后，受影响 Mac 应显示空白屏幕，主机 Mac 的访达应显示 DFU 窗口。
9. 在访达的 DFU 窗口中，先选择**修复 Mac**。修复通常更快，并且不会抹掉 Mac。
10. 修复期间让主机 Mac 保持唤醒；如果提示先更新主机 Mac 软件，按提示更新后再继续。
11. 如果修复完成后受影响 Mac 自动重新启动，按提示选择启动宗卷、输入已知用户密码或选择启动磁盘。
12. 只有在修复失败或 Apple 支持要求时，才选择**恢复 Mac**。恢复会抹掉 Mac 并恢复为出厂设置。
13. 恢复后，如果系统提示登录，请使用之前在这台 Mac 上使用的 Apple 账户。T2 Mac 可能还需要从 macOS 恢复重新安装 macOS。
14. 如果访达没有显示 DFU 窗口，检查访达边栏设置是否显示“CD、DVD 和 iOS 设备”，重新连接 DFU 端口，重新把握按键时机，并尝试另一根符合要求的 USB-C 线缆。
15. 如果使用网页代理、防火墙、VPN 或安全软件，确认主机 Mac 可以访问 Apple 网络；必要时关闭 VPN 或安全软件后再试。

参考来源：

- [Apple 支持：如何修复或恢复 Mac 固件](https://support.apple.com/zh-cn/108900)
- [Apple Support: How to revive or restore Mac firmware](https://support.apple.com/en-us/108900)
- [Apple 支持：如果你的 Mac 无法顺利完成启动](https://support.apple.com/zh-cn/102675)
- [Apple Support: Mac computer status indicator light behavior](https://support.apple.com/en-us/102768)
- [Apple 支持：Mac 激活锁](https://support.apple.com/zh-cn/102541)

---

## 访达看不到 DFU 窗口

验证级别：Apple 官方

1. 在主机 Mac 上打开访达设置，确认边栏会显示“CD、DVD 和 iOS 设备”。
2. 在访达边栏“位置”中查找是否出现“Mac”。
3. 从受影响 Mac 拔下 USB-C 线缆，按住电源按钮最长 10 秒让它关机。
4. 重新把线缆接到受影响 Mac 的 DFU 端口，并确认其他 USB 端口没有插接设备。
5. 重新执行 DFU 按键步骤。按键时机很重要，失败一次不代表硬件已经损坏。
6. 换一根同时支持数据传输和充电的 USB-C 至 USB-C 线缆，并直接连接两台 Mac。
7. 不要使用雷雳 3 充电线、USB 集线器、扩展坞或显示器上的转接口。

---

## 已验证的非官方处理思路

非官方

### 反复练习 DFU 按键时机

- 来源：Apple Support Community 和 Reddit 中反复出现“看不到 DFU”“只进恢复模式”“需要多试几次”的报告。
- 成功概率：中等，尤其适合线缆和端口正确，但主机 Mac 一直看不到 DFU 的情况。
- 风险：低到中等。重复尝试本身风险不高，但不要在固件修复或恢复进行中拔线或强制关机。
- 备注：Apple 官方也强调重新连接 DFU 端口、正确按键时机和换线缆；社区经验只能作为操作耐心和时机提示。
- 验证级别：较可能

### 用 Linux 或第三方工具替代另一台 Mac

- 来源：Reddit 中可见用非 Apple 工具或 Linux 主机尝试 DFU 的讨论。
- 成功概率：未知。
- 风险：高。Apple 官方要求另一台运行 macOS 14 或更高版本的 Mac，并通过访达执行修复或恢复。
- 备注：零售或客户支持场景不要推荐这类路径。没有第二台 Mac 时，应转 Apple Store 或 Apple 授权服务提供商。
- 验证级别：未知

---

## 零售排查流程

1. 先让顾客描述准确屏幕：感叹号圆圈、空白屏幕、问号、禁止符号、恢复助理、锁形图标、激活锁，还是状态灯琥珀色。
2. 问发生前动作：macOS 更新、断电、抹掉 Mac、迁移、维修后首次启动、进液跌落，还是突然无法启动。
3. 先排除普通启动和显示器路径。只有符合 Apple 固件修复条件时，才进入 DFU 流程。
4. 明确数据风险：先尝试“修复 Mac”；“恢复 Mac”会抹掉设备，只有有备份或顾客接受数据风险时才继续。
5. 核对工具：主机 Mac 版本、互联网、剩余空间、USB-C 线缆是否支持数据、受影响 Mac 的 DFU 端口、是否直连。
6. 如果顾客没有第二台 Mac，不要推荐非官方主机或第三方工具；安排 Apple 支持、Apple Store 或授权服务提供商。
7. 如果恢复后出现 Apple 账户要求，解释这是激活锁或重新激活流程，需要之前用于这台 Mac 的 Apple 账户或购买凭证支持。
8. 如果多根合规线缆、多台主机 Mac、正确端口和按键都失败，记录错误信息和状态灯，升级服务检测。

---

## 升级处理

联系 Apple 支持：

- 不确定屏幕是否属于固件恢复分支。
- 修复失败，但顾客还没有确认备份和恢复风险。
- 访达反复看不到 DFU 窗口，需要确认端口、线缆、主机 Mac 或网络条件。

前往 Apple Store 或授权维修点：

- 顾客没有另一台运行 macOS 14 或更高版本的 Mac。
- 修复和恢复都失败，或主机 Mac 多次报错。
- 设备有进液、跌落、维修史，或状态灯/诊断指向硬件问题。

维修或更换硬件：

- 只有在 DFU 修复/恢复、线缆/主机排除和服务诊断支持硬件故障时，才进入维修路径。

---

## 相关问题

- [iPhone 设置或更新时卡在正在准备更新、正在验证更新](/recipes/iPhone/iphone-stuck-preparing-verifying-software-update)
- Mac 启动时显示问号文件夹
- Mac 启动时显示禁止符号
- Mac 黑屏或外接显示器无画面
- Mac 激活锁无法解除

---

## 标签

- 设备：Mac
- 系统：macOS
- 功能：固件、DFU、启动、恢复、激活锁
- 网络：主机 Mac 需要互联网；企业网络、防火墙、VPN 可能影响 Apple 网络连接
- Apple ID：恢复后可能需要之前用于这台 Mac 的 Apple 账户
- 隐私：恢复会抹掉 Mac；修复不会抹掉 Mac
- 维修：可能涉及 Apple Store 或 Apple 授权服务提供商
- 配件：USB-C 至 USB-C 数据/充电线、主机 Mac、电源适配器、MagSafe

---

## 元信息

- 最后更新：2026-07-11
- 来源数量：10
- 验证级别：Apple 官方
- 支持系统：受影响 Mac 需为搭载 Apple 芯片或 Apple T2 安全芯片的 Mac；主机 Mac 需运行 macOS 14 或更高版本
- 可信度：高
