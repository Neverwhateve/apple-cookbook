---
schemaVersion: 2
id: mac-activation-lock-after-erase-transfer
title: Mac 抹掉后出现激活锁或要求原 Apple 账户
slug: mac-activation-lock-after-erase-transfer
summary: Mac 抹掉、恢复出厂设置、维修或二手转让后仍显示激活锁，或要求输入原 Apple 账户时，先区分“查找”激活锁、普通登录密码和组织管理锁定，再按设备归属处理。
symptoms:
  - “Mac 抹掉后还要输入原来的 Apple ID。”
  - “二手 Mac 开机要求前任用户的 Apple 账户。”
  - “Mac 显示激活锁，无法继续设置。”
  - “我已经恢复出厂设置了，为什么还不能激活？”
  - “出售 Mac 前忘记关闭查找，现在怎么移除激活锁？”
  - “Mac 维修后提示部件锁定到别人的 Apple 账户。”
devices:
  - Mac
  - MacBook Air
  - MacBook Pro
  - Mac mini
  - iMac
  - Mac Studio
platforms:
  - macOS
systemVersions:
  - macOS Catalina 10.15 或更高版本（符合条件的 Mac 可用激活锁）
  - macOS Tahoe 26 或更高版本（部分维修后部件检查）
categories:
  - Mac
tags:
  - Mac
  - Activation Lock
  - Find My
  - Apple Account
  - Second-hand Device
  - Repair
keywords: []
aliases:
  - Mac Activation Lock after erase
  - Mac asks for previous owner Apple ID
  - Mac locked to previous owner
  - second hand Mac activation lock
  - Mac 激活锁无法解除
  - Mac 抹掉后无法激活
  - 二手 Mac 要前任 Apple 账户
  - Mac 查找激活锁
errorMessages:
  - “激活锁”
  - “输入用于设置这台 Mac 的 Apple 账户和密码”
  - “这台 Mac 已与某个 Apple 账户关联”
officialTerms:
  - Activation Lock
  - Find My Mac
  - Apple Account
communityTerms: []
difficulty: Moderate
estimatedTime: 15–30 分钟（不含原所有者或 Apple 支持处理时间）
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: solution-mac-activation-lock-official
    title: Apple 官方方案
    summary: 先确认设备归属；自己的 Mac 关闭“查找我的 Mac”，已经不在手上的 Mac 通过 iCloud 查找移除；二手设备必须由原所有者移除，不能用抹掉或刷机绕过。
    kind: recommended
    steps:
      - 先拍下或记录屏幕上的准确提示。如果要求原 Apple 账户、显示“激活锁”，或 Mac 抹掉后停在激活步骤，这是激活锁分支；如果只是本机用户登录窗口，则先按登录密码或 FileVault 路径处理。
      - 如果 Mac 仍在你手上且能进入系统，打开苹果菜单 > 系统设置，点按边栏顶部你的姓名 > iCloud > 查看全部（或显示更多 App）> 查找我的 Mac，然后关闭它，并按提示输入 Apple 账户密码。
      - 在关闭“查找我的 Mac”之前，不要把 Mac 交给买家、维修点或回收方。Apple 说明，关闭“查找”后激活锁会自动移除。
      - 如果 Mac 已经卖出、赠出或不在手上，前往 iCloud.com/find，登录原 Apple 账户，选择这台 Mac 并点按“移除”。Mac 处于离线状态时，网页移除是 Apple 提供的处理路径。
      - 如果你是二手 Mac 买家，让前任所有者在设备上关闭“查找我的 Mac”，或在 iCloud.com/find 中选择这台 Mac 并移除。买家自己的 Apple 账户不能解除绑定到前任账户的激活锁。
      - 如果前任所有者无法操作，但你有有效购买凭证，使用 Apple 的激活锁支持请求；不要承诺 Apple 一定可以解除，也不要先抹掉或反复恢复来“尝试绕过”。
      - 如果设备属于公司或学校，联系其 IT 部门或管理员。企业或教育机构所有的设备可能需要组织侧处理，而不是个人 Apple 账户恢复。
      - 如果提示来自维修后的部件而不是整台 Mac，且 Mac 搭载 Apple 芯片并运行 macOS Tahoe 26 或更高版本，按 Apple 建议使用“维修助理”检查未完成维修；部件可能仍锁定到其他 Apple 账户。
    verificationLevel: Official
    sourceIds:
      - official-mac-activation-lock
      - official-remove-activation-lock
      - official-find-my-mac-remove
      - official-mac-find-off
      - official-mac-repair-assistant
    warnings:
      - 抹掉 Mac 会删除本机内容，但不会自动绕过激活锁；先确认备份、设备归属和 Apple 账户。
      - 不要购买或推荐所谓“绕过激活锁”、第三方解锁工具或强制刷机服务。
    limitations:
      - Apple 是否根据购买凭证协助处理激活锁，需由 Apple 支持单独评估。
      - macOS 菜单名称会因系统版本和语言设置略有差异。
warnings: []
limitations: []
sources:
  - id: official-mac-activation-lock
    title: Apple 支持：Mac 激活锁
    url: https://support.apple.com/zh-cn/102541
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: 2026-07-09
    official: true
  - id: official-remove-activation-lock
    title: Apple 支持：如何解除激活锁
    url: https://support.apple.com/zh-cn/108934
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: 2026-06-10
    official: true
  - id: official-find-my-mac-remove
    title: Apple 支持：在 Mac 上的“查找”中移除设备
    url: https://support.apple.com/zh-cn/guide/findmy-mac/fmm251eff839/mac
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: official-mac-find-off
    title: Apple 支持：关闭设备和物品上的查找
    url: https://support.apple.com/zh-cn/guide/icloud/mmdc23b125f6/icloud
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: official-mac-repair-assistant
    title: Apple 支持：使用“维修助理”完成 iPhone 或 iPad 维修
    url: https://support.apple.com/zh-cn/120579
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: 2026-05-04
    official: true
lastVerifiedAt: 2026-07-18
lastUpdatedAt: 2026-07-18
createdAt: 2026-07-18
relatedArticles:
  - mac-forgot-login-password-reset
  - mac-dfu-firmware-revive-restore
  - iphone-ipad-cant-activate-activation-server-unavailable
popular: false
---

# Mac 抹掉后出现激活锁或要求原 Apple 账户

Mac 抹掉、恢复出厂设置、维修或二手转让后，如果设置流程显示“激活锁”或要求输入原 Apple 账户，先不要继续刷机。激活锁是“查找”提供的设备归属保护；抹掉数据不会自动解除它。处理关键是让原所有者移除设备，或在有购买凭证时向 Apple 发起支持请求。

---

## 症状

- Mac 抹掉、恢复出厂设置或二手转让后要求输入前任用户的 Apple 账户。
- 设置流程显示“激活锁”，无法继续激活或进入桌面。
- 出售 Mac 前忘记关闭“查找我的 Mac”，买家无法完成设置。
- 维修后的部件要求其他 Apple 账户，或无法完成维修。

## 可能原因

1. **“查找我的 Mac”仍处于打开状态**：抹掉内容会删除数据，但不会自动解除激活锁。
2. **设备仍绑定原所有者**：二手 Mac 需要原所有者在设备上或 iCloud.com/find 中移除。
3. **组织管理或维修部件锁定**：公司、学校或维修后的部件可能需要组织或维修方处理。

## 先判断是哪一种锁定

- **激活锁**：屏幕要求输入用于设置这台 Mac 的 Apple 账户和密码，或明确显示“激活锁”。这通常与“查找我的 Mac”有关。
- **本机登录密码**：Mac 能进入原来的登录窗口，但只是无法登录某个本机用户。这不是激活锁，参见 [Mac 忘记登录密码、FileVault 或恢复密钥](/recipes/Mac/mac-forgot-login-password-reset)。
- **组织管理**：设备属于公司或学校，显示远程管理、组织所有或管理员提示。联系组织 IT，不要把它当作个人账户问题。
- **维修部件锁定**：整机可以使用，但维修后的部件提示需要其他 Apple 账户或无法完成维修。按“维修助理”提示和维修点流程处理。

---

## Apple 官方方案

1. 先确认屏幕提示是激活锁，而不是本机登录密码、FileVault、远程管理或维修部件提示。
2. 如果 Mac 仍在原所有者手上，关闭“查找我的 Mac”并输入原 Apple 账户密码。
3. 如果 Mac 已经不在手上，原所有者前往 iCloud.com/find，选择这台 Mac 并移除。
4. 如果是二手 Mac，要求前任所有者完成移除；买家自己的 Apple 账户不能解除前任账户的激活锁。
5. 如果原所有者无法操作但有有效购买凭证，发起 Apple 激活锁支持请求，等待 Apple 评估。
6. 如果设备属于公司或学校，联系组织 IT 或管理员。
7. 维修部件提示锁定时，按 Apple 的“维修助理”路径和维修点流程处理，不要反复抹掉整台 Mac。
8. 在激活锁解除前，不要使用第三方绕过工具、强制刷机或承诺可以绕过的服务。

## 自己的 Mac：在交付前关闭激活锁

如果 Mac 还在你手上并能进入系统：

1. 打开苹果菜单 > **系统设置**。
2. 点按边栏顶部你的姓名，然后点按 **iCloud**。
3. 点按 **查看全部**（部分系统显示“显示更多 App”）。
4. 点按 **查找我的 Mac**，再将它关闭。
5. 按提示输入 Apple 账户密码。

关闭“查找我的 Mac”后，激活锁会自动移除。完成后再备份数据、抹掉 Mac 并还原为出厂设置；不要只抹掉磁盘而跳过账户退出和“查找”处理。

---

## 已经卖出或不在手上：通过网页移除

如果 Mac 已经交给买家，或你在抹掉前忘记关闭“查找”：

1. 打开 [iCloud.com/find](https://www.icloud.com/find)。
2. 登录原来用于这台 Mac 的 Apple 账户。
3. 选择这台 Mac。
4. 点按 **移除** 或 **移除此设备**，按页面提示完成。

这一步使用的是原所有者账户。设备可能需要离线才能从列表中移除；如果买家手上的 Mac 仍显示激活锁，让买家在联网后重新开始设置。

---

## 二手 Mac：必须由原所有者解除

二手 Mac 要求前任用户 Apple 账户时，买家不能通过自己的账户、恢复模式、重装 macOS 或再次抹掉来解除激活锁。应让卖家完成以下任一项：

- 在 Mac 上关闭“查找我的 Mac”；或
- 在 iCloud.com/find 中选择设备并移除；或
- 如果卖家仍保留购买凭证，由卖家联系 Apple 支持评估激活锁支持请求。

如果卖家无法联系、拒绝处理或无法提供可验证的购买凭证，把它视为所有权风险。不要把“可以正常开机”当作没有锁定，也不要支付所谓“远程绕过”费用。

---

## 抹掉、恢复和激活锁不是同一件事

抹掉 Mac 会删除本机内容和设置，但激活锁仍可继续阻止未经授权的重新激活。恢复模式、DFU 修复或恢复也不能替代原所有者移除设备；其中部分操作还会造成数据丢失。

如果问题发生在固件恢复或 DFU 流程，先阅读 [Mac 需要修复或恢复固件](/recipes/Mac/mac-dfu-firmware-revive-restore)，并在选择“恢复 Mac”前确认它会抹掉设备。若恢复后要求原 Apple 账户，回到本文章的激活锁分支。

---

## 维修后部件提示被锁定

如果提示不是整台 Mac 的激活锁，而是更换部件无法完成维修：

- 记录部件名称、Mac 型号、macOS 版本和屏幕原文。
- 对搭载 Apple 芯片且运行 macOS Tahoe 26 或更高版本的 Mac，按 Apple 指引使用“维修助理”检查未完成维修。
- 如果部件来自他人或其他设备，联系维修点，让其完成应由维修方处理的解锁或校准流程。
- 没有必要的 Apple 账户信息时，不要反复抹掉整台 Mac；这可能无法解决部件归属问题。

---

## 零售排查流程

1. 让顾客读出完整屏幕提示，区分激活锁、本机登录密码、远程管理和维修部件提示。
2. 问清设备来源：本人设备、二手购买、赠送、维修返还，还是公司或学校资产。
3. 如果是本人设备，先确认是否能进入系统并关闭“查找我的 Mac”；不要先抹掉或恢复。
4. 如果是二手设备，要求原所有者现场在 Mac 或 iCloud.com/find 中移除，并重新开始设置。
5. 如果原所有者不在场，记录购买凭证、序列号和屏幕原文，说明需要原所有者或 Apple 支持处理。
6. 不推荐第三方绕过、刷机或所谓远程解锁服务；这类方法不能证明设备归属，也可能造成额外数据或安全风险。

## 升级处理

- 原所有者已经移除设备，但 Mac 仍显示激活锁：记录设备序列号、账户处理时间和屏幕原文，联系 Apple 支持。
- 拥有有效购买凭证但无法解除：使用 Apple 的激活锁支持请求，等待 Apple 评估。
- 设备属于公司或学校：联系原组织 IT 或管理员。
- 二手交易卖家失联或拒绝移除：停止继续付费或刷机，优先处理退货、交易争议和设备所有权问题。
- 伴随进液、跌落、维修史或多个硬件错误：先保留激活锁状态和错误证据，再安排 Apple 或授权服务检测。

## 什么时候升级处理

- 原所有者已经移除设备，但 Mac 仍显示激活锁：记录设备序列号、账户处理时间和屏幕原文，联系 Apple 支持。
- 拥有有效购买凭证但无法解除：使用 Apple 的激活锁支持请求，等待 Apple 评估。
- 设备属于公司或学校：联系原组织 IT 或管理员。
- 二手交易卖家失联或拒绝移除：停止继续付费或刷机，优先处理退货、交易争议和设备所有权问题。
- 伴随进液、跌落、维修史或多个硬件错误：先保留激活锁状态和错误证据，再安排 Apple 或授权服务检测。

---

## 相关问题

- [Mac 忘记登录密码、FileVault 或恢复密钥](/recipes/Mac/mac-forgot-login-password-reset)
- [Mac 需要修复或恢复固件](/recipes/Mac/mac-dfu-firmware-revive-restore)
- [iPhone 或 iPad 抹掉后无法激活](/recipes/iPhone/iphone-ipad-cant-activate-activation-server-unavailable)
