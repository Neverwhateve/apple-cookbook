---
schemaVersion: 2
id: mac-activation-lock-erase-resale-transfer
title: Mac 出现激活锁，或出售、抹掉后仍要求原 Apple 账户
slug: mac-activation-lock-erase-resale-transfer
summary: Mac 在抹掉、恢复、出售或二手设置时要求原 Apple 账户，或“查找”无法关闭时，先按所有权和屏幕状态分流。抹掉 Mac 不会绕过激活锁；只有关联账户的所有者、原所有者或符合 Apple 要求的购买凭证支持路径才能处理。
symptoms:
  - Mac 抹掉后要求输入原来的 Apple 账户
  - 二手 Mac 显示激活锁，无法设置
  - 卖 Mac 前不知道怎么关闭查找我的 Mac
  - Mac 还在我的查找列表里，买家无法激活
  - 忘记关闭查找我的 Mac，已经把 Mac 送人了
  - Mac 恢复后说锁定到所有者
devices:
  - Mac
platforms:
  - macOS
systemVersions:
  - macOS Catalina 10.15 或更高版本（支持的机型）
  - 当前 macOS
categories:
  - Mac
tags:
  - Mac
  - Activation Lock
  - 查找
  - Apple 账户
  - 二手设备
  - Trade In
keywords:
  - Mac 激活锁
  - Mac 锁定到所有者
  - Mac 出售后无法激活
  - 关闭查找我的 Mac
  - Mac 原 Apple 账户
aliases:
  - Mac Activation Lock
  - Mac locked to owner
  - remove Activation Lock from Mac
  - Mac asks for previous Apple Account
  - sold Mac still in Find My
errorMessages:
  - 激活锁
  - 锁定到所有者
  - 要求输入 Apple 账户密码
officialTerms:
  - 激活锁
  - 查找我的 Mac
  - 抹掉所有内容和设置
  - Apple 账户
communityTerms:
  - Mac 被前机主锁了
  - 二手 Mac 解不开
  - 查找没关就卖了
difficulty: Moderate
estimatedTime: 5 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: mac-activation-lock-erase-resale-transfer
solutions:
  - id: confirm-owner-and-remove-find-my-before-transfer
    title: 所有人仍可登录时，先关闭“查找我的 Mac”再抹掉
    summary: 这是出售、赠送、折抵或交给新所有者前的标准路径；关闭“查找”会移除激活锁。
    kind: recommended
    steps:
      - 先确认顾客是这台 Mac 关联 Apple 账户的所有者，并且仍能登录该 Apple 账户。不要索取、记录或代为输入顾客密码。
      - 在 Mac 上打开“系统设置”，点按边栏顶部的姓名，进入“iCloud”。在 macOS 15 或更高版本中点按“查看全部”后进入“查找我的 Mac”；在 macOS 14 或更早版本中直接找到“查找我的 Mac”。
      - 关闭“查找我的 Mac”，并在提示时由顾客输入自己的 Apple 账户密码。Apple 说明关闭“查找”会移除 Mac 的激活锁。
      - 如果是准备出售、赠送或折抵，先完成备份；在支持“抹掉助理”的机型上使用“抹掉所有内容和设置”，它会退出 Apple 服务、关闭“查找”和激活锁，并抹掉内容与设置。
      - 重装 macOS 后停在设置助理，按 Command-Q 关机，不要替下一位所有者继续设置。
    verificationLevel: Official
    sourceIds:
      - apple-mac-activation-lock
      - apple-turn-off-find-my
      - apple-erase-mac
      - apple-prepare-mac-transfer
    warnings:
      - 抹掉 Mac 会移除本机所有信息；在出售或转让前先确认备份和数据迁移已完成。
      - 不要把 Apple 账户密码、Mac 登录密码和固件密码混为一谈。
    limitations:
      - “抹掉所有内容和设置”只适用于 Apple 列出的支持机型和 macOS 版本；其他 Mac 需要按 Apple 的恢复和抹掉流程准备转让。
  - id: remove-activation-lock-after-ownership-transfer
    title: 已经不在手边的 Mac，由原所有者从“查找”中移除
    summary: 已出售或赠送但忘记关闭“查找”时，原所有者仍可通过自己的 Apple 账户移除激活锁；这会影响设备上的数据。
    kind: alternative
    steps:
      - 让原所有者使用自己的 Apple 账户前往 iCloud.com/find，或在另一台自己的 Apple 设备上的“查找”中选择该 Mac。
      - 如果设备已经不再由原所有者使用，按 Apple 的“抹掉”与“移除”流程处理：远程抹掉后，从设备列表中移除该 Mac。
      - 告知新所有者：移除完成后，Mac 可能仍需要抹掉、恢复或重新安装 macOS，才能关联新的 Apple 账户；不要反复猜密码或继续恢复来尝试绕过锁。
      - 如果 Mac 离线，远程抹掉会等到下次接入网络后才执行；在原所有者的移除动作完成前，不应承诺现场能立即完成交接。
    verificationLevel: Official
    sourceIds:
      - apple-mac-activation-lock
      - apple-remove-device-find-my
    warnings:
      - 远程抹掉会删除设备上的所有内容。
      - 只有关联 Apple 账户的所有者才能完成这个路径；新买家不能用自己的账户替代原账户。
    limitations:
      - “查找”功能和远程操作并非在所有国家或地区可用，且离线设备需要等待网络连接。
  - id: escalate-activation-lock-ownership-boundary
    title: 无法登录原账户、属于他人或属于组织时，停止技术绕过并走所有权路径
    summary: 激活锁是所有权保护，不是普通网络、登录密码或恢复模式故障。保留购买凭证和屏幕信息，再由合适的所有者或组织处理。
    kind: escalation
    steps:
      - 如果屏幕显示的是另一个人的 Apple 账户，或顾客购买的是二手 Mac，联系原所有者或销售方，请其从自己的“查找”中移除设备；不要建议第三方“解锁”服务、刷机或更换部件来绕过。
      - 如果顾客是原所有者但忘记了自己的 Apple 账户信息，先转入 Apple 账户恢复，而不是继续抹掉 Mac。
      - 如果顾客拥有 Apple 要求的购买凭证并需要停用激活锁协助，使用 Apple 的激活锁支持请求路径；不承诺一定批准或可在店内立即完成。
      - 如果 Mac 属于公司或学校，联系组织 IT 或设备管理员；组织拥有的设备可能由 Apple 商务或机构管理流程控制。
      - 如果信息指向维修后的部件锁定或“完成维修”状态，改用“维修助理”或对应的 Mac 维修流程，不要按普通二手设备解锁处理。
    verificationLevel: Official
    sourceIds:
      - apple-mac-activation-lock
    warnings:
      - Apple 账户或激活锁不能通过抹掉、恢复、DFU 复活或反复重装 macOS 绕过。
    limitations:
      - 本文不能验证所有权，也不能替代 Apple 的购买凭证审核、账户恢复或组织设备管理流程。
warnings:
  - 绝不要求顾客透露 Apple 账户密码、购买凭证的完整敏感信息或他人的账户信息。
  - 不要把激活锁描述为硬件故障，也不要承诺 Apple Store、运营商或第三方能绕过它。
  - 出售、赠送、折抵前必须先处理备份和数据迁移；移除激活锁不等于保留本机数据。
limitations:
  - 激活锁仅适用于符合 Apple 系统要求的 Mac；看到登录窗口、FileVault 恢复密钥、远程锁定 PIN 或组织管理提示时，应转到对应的专门流程。
  - 已维修的 Apple 芯片 Mac 在特定系统版本上可能需要“维修助理”完成部件配置，这与普通设备转让不同。
sources:
  - id: apple-mac-activation-lock
    title: Mac 激活锁
    url: https://support.apple.com/zh-cn/102541
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-23
    publishedAt: 2026-07-09
    official: true
  - id: apple-remove-device-find-my
    title: 在 Mac 上的“查找”中移除设备
    url: https://support.apple.com/zh-cn/guide/findmy-mac/fmm251eff839/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-23
    publishedAt: null
    official: true
  - id: apple-erase-mac
    title: 抹掉 Mac
    url: https://support.apple.com/zh-cn/guide/mac-help-cn/mchl7676b710/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-23
    publishedAt: null
    official: true
  - id: apple-turn-off-find-my
    title: 关闭设备和物品上的查找
    url: https://support.apple.com/zh-cn/guide/icloud/mmdc23b125f6/icloud
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-23
    publishedAt: null
    official: true
  - id: apple-prepare-mac-transfer
    title: 出售、赠送、折抵或回收 Mac 前该怎么做
    url: https://support.apple.com/zh-cn/102773
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-23
    publishedAt: 2026-02-02
    official: true
lastVerifiedAt: 2026-07-23
lastUpdatedAt: 2026-07-23
createdAt: 2026-07-23
relatedArticles:
  - mac-forgot-login-password-reset
  - mac-dfu-firmware-revive-restore
  - apple-account-verification-failed
popular: false
---

# Mac 出现激活锁，或出售、抹掉后仍要求原 Apple 账户

当 Mac 在抹掉、恢复、出售或二手设置时要求原 Apple 账户，不要把它当成普通登录密码、网络或恢复模式问题。激活锁是“查找”带来的所有权保护；抹掉 Mac 也不会绕过它。先确认顾客是否是关联账户的所有者、设备是否仍在手边，以及当前是转让前准备、已转让后移除，还是二手/组织所有权场景。

---

## 症状

- “Mac 重装后要求前机主的 Apple 账户。”
- “我把 Mac 抹掉了，怎么还是激活锁？”
- “二手 Mac 说锁定到所有者。”
- “卖掉 Mac 后，买家说无法激活。”
- “查找我的 Mac 关不掉。”
- “我忘记退出 Apple 账户就把 Mac 送人了。”

---

## 可能原因

1. **“查找我的 Mac”仍处于开启状态**
   - Apple 说明，只要“查找”保持开启，激活锁就持续生效；关闭“查找”会移除激活锁。
2. **抹掉或远程抹掉没有替代所有权验证**
   - 即使远程抹掉数据，激活锁仍会阻止未经授权的人重新激活 Mac。
3. **出售、赠送或折抵前没有完成转让准备**
   - 对支持的 Mac，“抹掉所有内容和设置”会关闭“查找”和激活锁；仅抹掉文件或只退出部分服务不等于已完成转让。
4. **二手设备仍关联原所有者或组织**
   - 新所有者不能用自己的 Apple 账户替代原账户；这属于原所有者、销售方、购买凭证或组织管理边界。
5. **看到的不是激活锁**
   - Mac 登录密码、FileVault 恢复密钥、远程锁定 PIN、组织管理提示和维修部件配置都需要不同的处理路径。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先读准屏幕：是否明确显示**激活锁**、**锁定到所有者**或要求输入关联 Apple 账户；不要把普通登录窗口当作激活锁。
2. 如果顾客仍是关联 Apple 账户的所有者且 Mac 在手边，打开**系统设置 > [姓名] > iCloud > 查看全部 > 查找我的 Mac**，关闭“查找我的 Mac”，并由顾客输入自己的 Apple 账户密码。
3. 如果是准备出售、赠送或折抵，先备份。对支持的 Mac，使用**抹掉所有内容和设置**；它会退出 Apple 服务、关闭“查找”和激活锁，并抹掉内容与设置。
4. 重装 macOS 后停在设置助理，按 Command-Q 关机，保持给新所有者的开箱状态。
5. 如果 Mac 已不在手边，原所有者从 iCloud.com/find 或“查找”中按 Apple 的抹掉/移除路径移除该 Mac。远程抹掉会在设备下次联网时执行。
6. 如果看到别人的账户、设备属于组织，或顾客无法登录原账户，停止反复恢复；请原所有者、销售方、组织 IT 或 Apple 的购买凭证支持路径处理。

参考来源：

- [Apple 支持：Mac 激活锁](https://support.apple.com/zh-cn/102541)
- [Apple 支持：出售、赠送、折抵或回收 Mac 前该怎么做](https://support.apple.com/zh-cn/102773)
- [Mac 使用手册：在 Mac 上的“查找”中移除设备](https://support.apple.com/zh-cn/guide/findmy-mac/fmm251eff839/mac)

---

## 已经出售或赠送，但忘记关闭“查找”

验证级别：Apple 官方

这不是让买家在 Mac 上反复恢复的场景。原所有者应登录自己的 Apple 账户，在 iCloud.com/find 或“查找”中选择该 Mac，按 Apple 的**抹掉**与**移除**流程处理。移除完成前，新所有者不能用自己的 Apple 账户替代原账户完成激活。

远程抹掉会删除 Mac 上的内容。若设备离线，操作会等待它下次连接网络；因此应明确告知双方这不是可保证现场立即完成的流程。

---

## 零售排查流程

1. 先确认当前屏幕是激活锁、普通登录窗口、FileVault 恢复密钥、远程锁定 PIN、组织管理提示，还是维修相关提示。
2. 确认顾客身份：关联 Apple 账户的所有者、已经转让的原所有者、二手购买者，还是组织设备使用者。
3. 所有者且 Mac 在手边：关闭“查找我的 Mac”，再按转让或恢复目的决定是否抹掉。
4. 所有者但 Mac 不在手边：使用“查找”的远程抹掉/移除路径，并说明离线等待与数据删除后果。
5. 二手购买者：请原所有者或销售方移除；不要求顾客提供对方密码，也不推荐第三方绕过方案。
6. 自有设备但无法登录账户：转入 Apple 账户恢复；拥有符合要求的购买凭证时，可走 Apple 激活锁支持请求路径。
7. 组织设备：停止个人账户排查，联系组织 IT 或管理员。

---

## 升级处理

联系 Apple 或对应所有权方：

- 顾客是原所有者、能提供 Apple 要求的购买凭证，但无法停用激活锁。
- 设备要求的是另一个人的 Apple 账户，或二手销售方未能移除。
- 设备属于公司或学校，或出现组织管理信息。
- 维修后出现部件锁定、完成维修或维修助理相关信息。

不要继续技术绕过：

- 不要承诺通过抹掉、DFU 复活、重新安装 macOS、第三方软件或更换部件可以绕过激活锁。
- 不要在未备份的情况下为了转让而直接抹掉仍可访问的 Mac。

---

## 相关问题

- [忘记 Mac 登录密码，无法进入账户](/recipes/Mac/mac-forgot-login-password-reset)
- [Mac 无法启动、恢复或更新时的 DFU 固件复活与恢复](/recipes/Mac/mac-dfu-firmware-revive-restore)
- [Apple 账户验证失败、收不到验证码或账户被锁定](/recipes/Apple%20ID/apple-account-verification-failed)
