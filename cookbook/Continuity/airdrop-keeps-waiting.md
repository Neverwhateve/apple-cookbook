---
title: 隔空投送一直等待或找不到设备
slug: airdrop-keeps-waiting
device:
  - iPhone
  - iPad
  - Mac
category: 连续互通
tags:
  - 隔空投送
  - 连续互通
  - 蓝牙
  - Wi-Fi
  - 网络
aliases:
  - AirDrop keeps waiting
  - AirDrop cannot find device
  - AirDrop failed
  - AirDrop spinning forever
  - AirDrop not showing
  - 隔空投送一直等待
  - 隔空投送找不到人
verification: Official
difficulty: Quick
updated: 2026-07-08
official_sources:
  - https://support.apple.com/en-us/119857
  - https://support.apple.com/guide/mac-help/use-airdrop-to-send-items-to-nearby-devices-mh35868/mac
  - https://support.apple.com/guide/personal-safety/secure-airdrop-ips7d84d2cdc/web
community_sources: []
status: seed
popular: true
---

# 隔空投送一直等待或找不到设备

顾客尝试用隔空投送发送照片、文件或联系人，但收件设备没有出现、传输一直显示等待，或在对方接受前就失败。

---

## 症状

- “隔空投送一直等待。”
- “对方手机不显示。”
- “刚才能看到，过一会又没了。”
- “明明没拒绝，却提示被拒绝。”
- “Mac 能看到 iPhone，但 iPhone 看不到 Mac。”
- “隔空投送找不到人。”

---

## 可能原因

1. **接收设置阻止被发现**
   - 最常见的是接收方设置为“仅限联系人”，但联系人名片、Apple 账户邮箱或电话号码没有匹配上。
2. **蓝牙或 Wi-Fi 发现不可用**
   - 隔空投送会先进行近距离发现，再开始传输。任一无线模块异常都可能导致设备不出现。
3. **设备距离太远，或个人热点状态影响连接**
   - 距离、干扰或个人热点可能中断发现流程。
4. **屏幕锁定或分享面板状态过旧**
   - 打开分享面板后，隔空投送列表可能会随设备状态变化而失效。
5. **受管理设备限制**
   - MDM 或屏幕使用时间限制可能关闭隔空投送。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 让两台设备保持唤醒、解锁，并放在彼此附近。
2. 确认两台设备都已开启 Wi-Fi 和蓝牙。
3. 在接收设备上，将隔空投送接收设置临时改为**所有人，10 分钟**进行测试。
4. 如果使用**仅限联系人**，确认双方都已登录 Apple 账户，并且发送方邮箱或电话号码已保存在联系人中。
5. 测试期间关闭个人热点。
6. 重新打开分享面板，再次尝试隔空投送。
7. 如果涉及 Mac，打开 Finder 中的“隔空投送”，确认窗口底部的发现设置。

参考来源：

- [Apple 支持：在 iPhone 和 iPad 上使用隔空投送](https://support.apple.com/en-us/119857)
- [Apple 支持：在 Mac 上使用隔空投送向附近 Apple 设备发送项目](https://support.apple.com/guide/mac-help/use-airdrop-to-send-items-to-nearby-devices-mh35868/mac)
- [Apple 个人安全使用手册：安全使用隔空投送](https://support.apple.com/guide/personal-safety/secure-airdrop-ips7d84d2cdc/web)

---

## 已验证的非官方处理思路

非官方

### 临时切到“所有人，10 分钟”，完成后再切回

- 来源：零售场景中反复出现的排查模式；与 Apple 的发现控制逻辑一致。
- 成功概率：当问题来自“仅限联系人”身份匹配时较高。
- 风险：短时间内允许附近设备发送隔空投送请求。
- 备注：只在完成本次传输所需的时间内开启，之后恢复顾客偏好的接收设置。
- 验证级别：已验证

### 深入排查网络前，先重启两台设备

- 来源：社区和零售中常见的处理方式，用于清理异常的发现状态。
- 成功概率：中等。
- 风险：低。
- 备注：适合在官方设置确认无误后执行。如果接收设置明显关闭，不应作为第一步。
- 验证级别：较可能

---

## 零售排查流程

1. 先确认失败方向：iPhone 到 iPhone、iPhone 到 Mac、Mac 到 iPhone，还是所有方向都失败。
2. 在接收方设备上，把隔空投送改为**所有人，10 分钟**。
3. 确认两台设备已解锁、距离足够近，并开启 Wi-Fi 和蓝牙。
4. 重新打开分享面板，不要继续使用旧的隔空投送列表。
5. 如果“所有人”模式下可以成功，说明很可能是“仅限联系人”的身份匹配问题。
6. 如果仍然失败，用另一台已知正常的 Apple 设备交叉测试。
7. 如果只有一台设备对所有对象都失败，继续检查限制、软件更新状态和无线模块问题。

---

## 升级处理

联系 Apple 支持：

- 隔空投送因为账户、限制或受管理设备行为而缺失，且顾客无法自行更改。
- 问题出现在更新后，并影响多个 Apple 服务。

前往 Apple Store 或授权维修点：

- 蓝牙或 Wi-Fi 在隔空投送之外也无法正常使用。
- 经过设置、重启和软件检查后，设备仍无法发现任何附近 Apple 设备。

维修或更换硬件：

- 诊断或更广泛的症状指向无线硬件故障。

---

## 相关问题

- 通用剪贴板不可用
- 接力缺失
- 连续互通相机无法识别
- iPhone 镜像无法连接

---

## 标签

- 设备：iPhone、iPad、Mac
- 系统：iOS、iPadOS、macOS
- 功能：隔空投送、连续互通
- 网络：Wi-Fi、蓝牙
- Apple ID：“仅限联系人”身份匹配
- 连续互通：近距离发现
- 隐私：接收设置
- 维修：可能涉及无线硬件问题
- 配件：不适用

---

## 元信息

- 最后更新：2026-07-08
- 来源数量：3
- 验证级别：Apple 官方
- 支持系统：当前支持隔空投送的 iOS、iPadOS、macOS 版本
- 可信度：高
