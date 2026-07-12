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
  - AirDrop No People Found
  - AirDrop code
  - 隔空投送一直等待
  - 隔空投送找不到人
  - 隔空投送没有找到任何人
  - 隔空投送代码
verification: Official
difficulty: Quick
updated: 2026-07-12
official_sources:
  - https://support.apple.com/zh-cn/119857
  - https://support.apple.com/zh-cn/guide/iphone/iphcd8b9f0af/ios
  - https://support.apple.com/zh-cn/guide/mac-help/mh35868/mac
  - https://support.apple.com/zh-cn/guide/personal-safety/secure-airdrop-ips7d84d2cdc/web
  - https://support.apple.com/zh-cn/120421
community_sources:
  - https://discussions.apple.com/thread/256209185
  - https://discussions.apple.com/thread/252044315
  - https://discussions.apple.com/thread/255160349
  - https://www.reddit.com/r/iphone/comments/1ppd6u7/air_drop_no_longer_works_after_the_ios_262_update/
  - https://www.reddit.com/r/applehelp/comments/1erllle/iphone_to_mac_airdrop_no_people_found/
  - https://www.reddit.com/r/applehelp/comments/v0h2w4/airdrop_not_working_make_sure_to_have_their_email/
status: canonical
popular: true
---

# 隔空投送一直等待或找不到设备

顾客尝试用隔空投送发送照片、文件或联系人，但收件设备没有出现、传输一直显示等待，或在对方接受前就失败。先确认两台设备在 10 米内、Wi-Fi 和蓝牙已打开、个人热点已断开、接收设置允许发现，再处理联系人身份、隔空投送代码、VPN 或 Mac 防火墙这类边界问题。

---

## 症状

- “隔空投送一直等待。”
- “对方手机不显示。”
- “刚才能看到，过一会又没了。”
- “明明没拒绝，却提示被拒绝。”
- “Mac 能看到 iPhone，但 iPhone 看不到 Mac。”
- “隔空投送找不到人。”
- “对方让我输入隔空投送代码。”
- “显示 No People Found。”
- “换成所有人 10 分钟才偶尔能传。”
- “离开 Wi-Fi 后担心会不会走蜂窝数据。”

---

## 可能原因

1. **接收设置阻止被发现**
   - 最常见的是接收方设置为“仅限联系人”，但联系人名片、Apple 账户邮箱或电话号码没有匹配上。
2. **新系统要求非联系人使用隔空投送代码**
   - Apple 说明，使用 iOS 26.2、iPadOS 26.2、macOS 26.2 或更高版本时，如果未在通讯录中的某人尝试发送项目，需要使用隔空投送代码。代码通过后，双方可在 30 天内继续隔空投送，无需再次使用代码。
3. **蓝牙或 Wi-Fi 发现不可用**
   - 隔空投送会先进行近距离发现，再开始传输。任一无线模块异常都可能导致设备不出现。
4. **设备距离太远，或个人热点状态影响连接**
   - Apple 要求两台设备位于 10 米（30 英尺）范围内；距离、干扰或个人热点可能中断发现流程。
5. **屏幕锁定或分享面板状态过旧**
   - 打开分享面板后，隔空投送列表可能会随设备状态变化而失效。
6. **VPN、第三方安全软件或 Mac 防火墙干扰局域网发现**
   - Apple 在连续互通相关支持文档中提醒，VPN 配置不应阻止局域联网，Mac 防火墙也不应设置为阻止所有传入连接。
7. **受管理设备限制**
   - MDM、配置描述文件或屏幕使用时间限制可能关闭隔空投送。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 让两台设备保持唤醒、解锁，并放在彼此附近。
2. 确认两台设备距离在 10 米（30 英尺）范围内。
3. 确认两台设备都已开启 Wi-Fi 和蓝牙。
4. 测试期间断开个人热点。
5. 在接收设备上，将隔空投送接收设置临时改为**所有人，10 分钟**进行测试。
6. 如果使用**仅限联系人**，确认双方都已登录 Apple 账户，并且发送方的 Apple 账户邮箱或电话号码已保存在接收方联系人名片中。
7. 如果对方不在通讯录中，且双方设备运行 iOS 26.2、iPadOS 26.2、macOS 26.2 或更新版本，让接收方点按“获取隔空投送代码”，发送方输入该代码后再传输。代码通过后，Apple 说明双方可在 30 天内继续共享和接收项目；不想继续共享时，可在“通讯录”的“其他已知联系人”中忽略此人。
8. 如果两台设备都运行 iOS 17 或更高版本，可以尝试把两台 iPhone 放在一起发起隔空投送；如果这个近距离入口误导顾客以为只能碰一碰才能传，也可以回到分享面板中的普通隔空投送列表。
9. 如果使用同一个 Apple 账户在自己的设备之间传输，Apple 说明项目会自动接受并保存；如果不是同一账户，则仍需要接收方接受。
10. 如果涉及 Mac，打开 Finder 中的“隔空投送”，或从控制中心打开隔空投送，并确认接收设置。
11. 如果 Mac 或 iPhone 安装了 VPN 或第三方安全软件，确认它没有阻止局域联网；Mac 防火墙不应设置为阻止所有传入连接。
12. 重新打开分享面板，再次尝试隔空投送。
13. 如果设备已开始传输后离开蓝牙或 Wi-Fi 覆盖范围，Apple 说明传输可能通过互联网继续。出差或漫游时如不想产生蜂窝数据费用，可在**设置 > 通用 > 隔空投送**关闭“使用蜂窝数据”。
14. 如果仍无法正常使用隔空投送，重新启动两台设备后再试。

参考来源：

- [Apple 支持：在 iPhone 和 iPad 上使用隔空投送](https://support.apple.com/zh-cn/119857)
- [iPhone 使用手册：使用隔空投送向附近 Apple 设备发送项目](https://support.apple.com/zh-cn/guide/iphone/iphcd8b9f0af/ios)
- [Mac 使用手册：使用隔空投送向附近 Apple 设备发送项目](https://support.apple.com/zh-cn/guide/mac-help/mh35868/mac)
- [Apple 个人安全使用手册：安全使用隔空投送](https://support.apple.com/zh-cn/guide/personal-safety/secure-airdrop-ips7d84d2cdc/web)
- [Apple 支持：iPhone 镜像：通过 Mac 使用 iPhone](https://support.apple.com/zh-cn/120421)

---

## 已验证的非官方处理思路

非官方

### 临时切到“所有人，10 分钟”，完成后再切回

- 来源：零售场景中反复出现的排查模式；与 Apple 的发现控制逻辑一致。
- 成功概率：当问题来自“仅限联系人”身份匹配时较高。
- 风险：短时间内允许附近设备发送隔空投送请求。
- 备注：Apple 的“所有人，10 分钟”会自动回退，但仍应让顾客知道这是临时测试，不是长期降低接收限制。
- 验证级别：已验证

### 深入排查网络前，先重启两台设备

- 来源：社区和零售中常见的处理方式，用于清理异常的发现状态。
- 成功概率：中等。
- 风险：低。
- 备注：适合在官方设置确认无误后执行。如果接收设置明显关闭，不应作为第一步。
- 验证级别：较可能

### Mac 方向失败时检查防火墙和安全软件

- 来源：Apple Support Community、Reddit 和 Apple 连续互通相关支持文档都反复指向 Mac 防火墙、VPN 或第三方安全软件可能影响附近设备发现。
- 成功概率：未知到中等，尤其适合 iPhone 能隔空投送给其他 iPhone，但 Mac 端显示等待、找不到人或只单向可用的情况。
- 风险：中等。不要为了传文件让顾客长期关闭防火墙或安全软件；只检查是否阻止所有传入连接或阻止局域联网。
- 备注：这不是 Apple AirDrop 主文档里的第一步，适合作为 Mac 方向失败的后段分支。
- 验证级别：较可能

---

## 零售排查流程

1. 先确认失败方向：iPhone 到 iPhone、iPhone 到 Mac、Mac 到 iPhone，还是所有方向都失败。
2. 确认顾客是在传一小批文件，还是试图一次传大量照片或视频；Apple 说明隔空投送更适合在设备间共享一小部分文件。
3. 在接收方设备上，把隔空投送改为**所有人，10 分钟**。
4. 确认两台设备已解锁、距离在 10 米内，并开启 Wi-Fi 和蓝牙。
5. 断开个人热点，重新打开分享面板，不要继续使用旧的隔空投送列表。
6. 如果“所有人”模式下可以成功，说明很可能是“仅限联系人”的身份匹配问题。检查双方联系人名片里的 Apple 账户邮箱或电话号码。
7. 如果双方是非联系人且系统提示隔空投送代码，不要误判为故障；按提示完成代码验证，并解释 30 天有效期和“其他已知联系人”移除路径。
8. 如果是 iPhone 到 Mac 或 Mac 到 iPhone 单向失败，检查 Mac 的隔空投送接收设置、VPN、第三方安全软件和防火墙是否阻止局域联网或所有传入连接。
9. 如果仍然失败，重启两台设备，并用另一台已知正常的 Apple 设备交叉测试。
10. 如果只有一台设备对所有对象都失败，继续检查限制、软件更新状态和无线模块问题。

---

## 升级处理

联系 Apple 支持：

- 隔空投送因为账户、限制或受管理设备行为而缺失，且顾客无法自行更改。
- 问题出现在更新后，并影响多个 Apple 服务。
- Mac 防火墙、VPN、第三方安全软件或企业网络限制无法由顾客自行调整。

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
- Mac 与 iPhone 之间大量照片或视频迁移
- [iPhone 或 iPad 无法连接 Wi-Fi 或显示无互联网连接](/recipes/Networking/iphone-ipad-wifi-no-internet-unable-to-join)

---

## 标签

- 设备：iPhone、iPad、Mac
- 系统：iOS、iPadOS、macOS
- 功能：隔空投送、连续互通
- 网络：Wi-Fi、蓝牙
- Apple ID：“仅限联系人”身份匹配
- 连续互通：近距离发现
- 隐私：接收设置、隔空投送代码、其他已知联系人
- 维修：可能涉及无线硬件问题
- 配件：不适用

---

## 元信息

- 最后更新：2026-07-12
- 来源数量：11
- 验证级别：Apple 官方
- 支持系统：当前支持隔空投送的 iOS、iPadOS、macOS 版本；隔空投送代码要求 iOS 26.2、iPadOS 26.2、macOS 26.2 或更新版本
- 可信度：高
