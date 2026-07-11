---
title: Mac 忘记登录密码，无法进入 macOS
slug: mac-forgot-login-password-reset
device:
  - Mac
category: Mac
tags:
  - Mac
  - Login Password
  - FileVault
  - Apple Account
  - Recovery
  - Backup
aliases:
  - Mac forgot login password
  - forgot Mac password
  - reset Mac login password
  - Mac password not working
  - FileVault recovery key
  - Mac 忘记密码
  - Mac 开机密码忘了
  - 忘记电脑开机密码
  - Mac 登录密码重设
  - 文件保险箱恢复密钥
verification: Official
difficulty: Advanced
updated: 2026-07-12
official_sources:
  - https://support.apple.com/zh-cn/102633
  - https://support.apple.com/zh-cn/guide/mac-help/mchlp1550/mac
  - https://support.apple.com/zh-cn/102675
  - https://support.apple.com/zh-cn/guide/security/sec4c6dc1b6e/web
  - https://support.apple.com/zh-cn/102664
  - https://support.apple.com/zh-cn/118574
community_sources:
  - https://discussions.apple.com/thread/256117235
  - https://discussions.apple.com/thread/254527949
  - https://www.reddit.com/r/mac/comments/17u1tn4/forgot_mac_password_and_dont_have_the_recovery/
  - https://www.reddit.com/r/mac/comments/1bm8jm7/i_have_an_m1_macbook_air_but_i_forgot_my_new/
status: canonical
popular: true
---

# Mac 忘记登录密码，无法进入 macOS

顾客说“忘记电脑开机密码”时，先确认这是 Mac 的本机登录密码，不是 Apple 账户密码。最快路径是先尝试登录窗口的重设入口；如果没有入口，再从 macOS 恢复使用“忘记所有密码？”或恢复密钥重设。

---

## 症状

- “我忘记电脑开机密码。”
- “Mac 开机后进不去系统。”
- “Apple ID 密码知道，但 Mac 密码不记得。”
- “输错几次后没有重设密码按钮。”
- “进入恢复模式后要我输入文件保险箱恢复密钥。”
- “能不能不抹掉资料重设密码？”
- “二手 Mac 要输入别人的 Apple ID。”

---

## 可能原因

1. **登录密码和 Apple 账户密码不是同一个概念**
   - Apple 的 Mac 使用手册说明，登录密码用于开机或从睡眠唤醒时解锁 Mac，不是用于 iCloud、App Store 等服务的 Apple 账户密码。
2. **登录窗口和锁定屏幕看起来相似**
   - Apple 说明，登录窗口只会在重新启动、启动或退出登录后显示；锁定屏幕外观相似，但不会提供密码重设选项。
3. **FileVault 会改变数据恢复边界**
   - Apple 平台安全文档说明，文件保险箱会加密宗卷；如果忘记账户密码并且无法通过 Apple 账户或恢复密钥重设，数据可能无法取回。
4. **受管理或二手 Mac 可能有额外锁定**
   - 如果看到激活锁、远程锁定 PIN、组织管理提示或别人的 Apple 账户，先把它当作所有权或管理问题，而不是普通密码问题。
5. **抹掉 Mac 是最后路径**
   - Apple 的抹掉 Mac 流程会移除本机内容并还原为出厂设置；应先确认备份和密码重设选项，再考虑抹掉。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 确认顾客看到的是登录窗口。让顾客重新启动 Mac 后再判断；如果只是锁定屏幕，先尝试切换输入法、键盘布局或外接键盘。
2. 询问是否有近期 Time Machine、iCloud Drive、桌面与文稿同步或重要 App 的云端备份。
3. 在登录窗口连续尝试输入密码，直到看到密码提示、使用 Apple 账户重设或使用恢复密钥重设等入口。
4. 如果登录窗口出现重设选项，按屏幕提示使用 Apple 账户或文件保险箱恢复密钥重设登录密码。
5. 如果登录窗口没有可用重设选项，按照 Apple 指引从 macOS 恢复启动。
6. 在“恢复”中选择一个知道密码的用户时，如果不知道任何用户密码，点按**忘记所有密码？**。
7. 按照屏幕说明继续。系统可能要求登录 Apple 账户、输入发送到受信任设备的验证码、输入文件保险箱恢复密钥、选择启动宗卷，或临时取消激活这台 Mac。
8. 重设成功后，重新启动 Mac，用新密码登录。
9. 登录后立即确认 Apple 账户、恢复联系人、FileVault 设置、备份状态和密码提示是否准确。
10. 如果无法使用 Apple 账户、恢复密钥或任何管理员账户重设密码，先说明数据边界：加密数据可能无法保留。
11. 只有在顾客接受数据风险并确认备份后，才按 Apple 的“抹掉 Mac 并还原为出厂设置”路径处理。
12. 如果开始 Apple 账户恢复，提醒顾客 Apple 说明账户恢复可能需要数天或更长时间，Apple 支持无法缩短等待时间。

参考来源：

- [Apple 支持：如果你忘记了 Mac 登录密码](https://support.apple.com/zh-cn/102633)
- [Mac 使用手册：在 Mac 上更改登录密码](https://support.apple.com/zh-cn/guide/mac-help/mchlp1550/mac)
- [Apple 支持：如果你的 Mac 无法顺利完成启动](https://support.apple.com/zh-cn/102675)
- [Apple 平台安全：macOS 中的文件保险箱恢复](https://support.apple.com/zh-cn/guide/security/sec4c6dc1b6e/web)
- [Apple 支持：抹掉 Mac 并还原为出厂设置](https://support.apple.com/zh-cn/102664)
- [Apple 支持：无法重设 Apple 账户密码时如何使用账户恢复](https://support.apple.com/zh-cn/118574)

---

## 先分清三种密码

验证级别：Apple 官方

1. **Mac 登录密码**：用于登录本机用户、解锁 FileVault 加密宗卷、从睡眠唤醒 Mac。
2. **Apple 账户密码**：用于 iCloud、App Store、查找、激活锁和部分密码重设流程。
3. **FileVault 恢复密钥**：打开文件保险箱时生成或由组织托管，用于忘记登录密码时解锁加密宗卷或进入恢复流程。

不要告诉顾客“知道 Apple ID 就一定能解锁 Mac”。Apple 账户可能是重设路径的一部分，但 FileVault、恢复密钥、激活锁和管理状态会影响结果。

---

## 没有恢复密钥时怎么办

验证级别：Apple 官方

1. 先尝试 Apple 账户重设入口。部分 Mac 设置允许用 Apple 账户重设登录密码。
2. 如果 Mac 由公司或学校管理，联系 IT。组织可能托管 FileVault 恢复密钥。
3. 如果没有 Apple 账户重设路径，也没有恢复密钥，先检查是否有 Time Machine 或云端备份。
4. 如果数据已无可用解锁路径，只能在顾客接受数据损失风险后抹掉 Mac 并重新设置。
5. 不要承诺 Apple Store、维修点或第三方工具可以绕过 FileVault 并保留本机数据。

---

## 已验证的非官方处理思路

非官方

### 通过“终端 resetpassword”打开重设助理

- 来源：Reddit 和 Apple Support Community 中常见建议。
- 成功概率：中等，取决于 Mac 机型、FileVault、恢复环境和账户设置。
- 风险：中等。Apple 当前中文支持文章优先描述登录窗口和恢复助理中的重设入口；不要把终端命令作为首选路径。
- 备注：如果 Apple 官方界面没有显示入口，且顾客具备操作能力，可作为理解恢复助理的一种社区线索，但最终仍按 Apple 屏幕提示执行。
- 验证级别：较可能

### 直接抹盘重装

- 来源：Reddit 中常见“没有恢复密钥就抹掉”的建议。
- 成功概率：高，可以重新获得一台可设置的 Mac，但不等于恢复数据。
- 风险：高。会丢失本机数据，并且如果有激活锁或组织管理，抹掉后仍可能无法正常设置。
- 备注：只在密码重设路径不可用、备份已确认、顾客接受数据风险后考虑。
- 验证级别：较可能

---

## 零售排查流程

1. 复述顾客问题：“你忘的是 Mac 登录密码，不是 Apple 账户密码，对吗？”
2. 让顾客描述屏幕：登录窗口、锁定屏幕、FileVault 恢复密钥、激活锁、远程锁定 PIN，还是组织管理提示。
3. 询问是否最近改过密码、键盘布局、外接键盘、企业管理、二手机来源或维修。
4. 先尝试登录窗口的官方重设入口。
5. 没有入口时，从 macOS 恢复使用“忘记所有密码？”或恢复密钥流程。
6. FileVault 相关提示出现时，先问恢复密钥在哪里：密码 App、iCloud 钥匙串、纸质记录、组织 IT、MDM 管理平台。
7. 重设前先确认备份，不要承诺保留本机数据。
8. 如果无法重设，说明下一步是账户恢复、联系组织 IT、找原所有者解除激活锁，或在接受数据风险后抹掉 Mac。
9. 处理完成后帮助顾客设置密码提示、恢复联系人、备份和 FileVault 恢复密钥保存方式。

---

## 升级处理

联系 Apple 支持：

- 顾客无法判断屏幕类型或恢复流程卡住。
- Apple 账户密码也忘记，需要进入账户恢复。
- 设备显示激活锁，顾客拥有购买凭证并需要解除支持。

联系公司或学校 IT：

- Mac 由组织管理。
- FileVault 恢复密钥可能由 MDM 托管。
- 登录窗口、恢复助理或设置助理显示组织配置。

前往 Apple Store 或授权维修点：

- Mac 无法启动到登录窗口或恢复模式。
- 键盘、触控板、显示器、存储或主板疑似硬件故障。
- 重设或抹掉流程反复失败。

---

## 相关问题

- [Mac 需要修复或恢复固件](/recipes/Mac/mac-dfu-firmware-revive-restore)
- Mac 显示激活锁
- Mac 启动时显示问号文件夹
- Mac 无法开机或黑屏
- Apple 账户无法重设密码

---

## 标签

- 设备：Mac
- 系统：macOS
- 功能：登录密码、FileVault、恢复助理、备份、抹掉 Mac
- 网络：Apple 账户重设和账户恢复可能需要联网
- Apple ID：Apple 账户、激活锁、账户恢复
- 隐私：FileVault 加密、本机数据、恢复密钥
- 维修：通常不是硬件问题；无法启动或恢复失败时再进入维修路径
- 配件：外接键盘、电源、Time Machine 磁盘

---

## 元信息

- 最后更新：2026-07-12
- 来源数量：10
- 验证级别：Apple 官方
- 支持系统：当前 macOS；具体重设入口取决于 Mac 机型、FileVault、Apple 账户和管理状态
- 可信度：高
