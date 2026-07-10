---
title: iPhone 无法设置或转移 eSIM
slug: iphone-esim-setup-transfer-fails
device:
  - iPhone
category: iPhone
tags:
  - iPhone
  - eSIM
  - Cellular
  - Carrier
  - Activation
  - Transfer
aliases:
  - iPhone eSIM setup failed
  - iPhone eSIM transfer failed
  - iPhone add eSIM not working
  - iPhone cannot activate eSIM
  - eSIM iMessage uses email
  - duplicate SIM phone number iMessage
  - iPhone eSIM 无法激活
  - iPhone eSIM 转移失败
  - iPhone 添加 eSIM 失败
  - eSIM 后 iMessage 用邮箱发送
  - iMessage 同一个手机号显示两次
verification: Official
difficulty: Moderate
updated: 2026-07-10
official_sources:
  - https://support.apple.com/zh-cn/118669
  - https://support.apple.com/zh-cn/102478
  - https://support.apple.com/zh-cn/123879
  - https://support.apple.com/zh-cn/123878
  - https://support.apple.com/zh-cn/101569
  - https://support.apple.com/zh-cn/guide/iphone/iph7a2a9399b/ios
  - https://support.apple.com/zh-cn/125367
community_sources:
  - https://discussions.apple.com/thread/255768471
  - https://discussions.apple.com/thread/255207618
  - https://discussions.apple.com/thread/256210119
  - https://www.reddit.com/r/applehelp/comments/1oee9kg/cellular_data_option_is_greyed_out_saying_no_sim/
status: canonical
popular: true
---

# iPhone 无法设置或转移 eSIM

顾客在新 iPhone 上添加 eSIM、从旧 iPhone 转移号码、扫描二维码或从安卓设备转移 eSIM 时失败。先确认机型、地区、运营商支持方式和原设备条件，再处理激活错误；不要先删除旧 eSIM 或抹掉设备。

---

## 症状

- “新机转移 eSIM 失败。”
- “添加 eSIM 时一直转圈。”
- “旧 iPhone 上点了转移，新 iPhone 没激活。”
- “扫描二维码以后没有蜂窝网络。”
- “显示完成运营商蜂窝套餐设置，但点进去失败。”
- “国行 iPhone Air / iPhone 17e 不能写入 eSIM。”
- “换 eSIM 后 iMessage 只能用邮箱发。”
- “发送与接收里同一个手机号出现两次。”
- “删除 eSIM 后号码回不来了。”

---

## 可能原因

1. **运营商不支持当前激活方式**
   - Apple 说明，eSIM 快速转移、运营商激活、二维码、运营商 App、运营商链接和手动输入是不同路径；是否可用取决于运营商。
2. **两台 iPhone 不满足快速转移条件**
   - Apple 要求两台设备使用同一 Apple 账户、旧 iPhone 已用设备密码解锁、两台设备彼此靠近并打开蓝牙，且都运行 iOS 18.4 或更高版本。
3. **新 iPhone 已看到号码，但线路没有正确启用**
   - Apple 的失败排查要求在“蜂窝网络”里检查要激活的号码；如果号码出现，可以先关闭再重新打开。
4. **运营商设置、账户或 EID / IMEI 需要运营商处理**
   - Apple 要求检查 eSIM 部分的运营商设置，并在仍无法设置时联系运营商，同时准备电话号码、运营商账户 PIN、IMEI 或 EID。
5. **中国大陆 eSIM 规则不同**
   - Apple 说明，中国大陆只有特定机型支持中国大陆运营商 eSIM，并且必须前往运营商线下营业厅办理。
6. **误删 eSIM 后需要重新激活**
   - Apple 说明，抹掉 iPhone 时如果抹掉 eSIM，需要联系运营商才能重新激活蜂窝号码。
7. **已失效的同号 SIM 影响 iMessage 电话号码激活**
   - Apple 说明，更新至 iOS 26 后，如果已激活 SIM 卡号码与已失效 SIM 卡相同，可能导致 iMessage 不能用电话号码激活，信息改用邮箱发送，或同一号码在“发送与接收”中显示两次。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先确认顾客要做哪一种操作：从旧 iPhone 快速转移、运营商激活、扫描二维码、运营商 App / 链接、手动输入，还是从安卓设备转移。
2. 如果是 iPhone 到 iPhone 快速转移，确认运营商支持 eSIM 快速转移。
3. 确认两台 iPhone 使用顾客自己的同一 Apple 账户登录，旧 iPhone 已用设备密码解锁。
4. 将两台 iPhone 放在附近，打开蓝牙，并确认两台设备都运行 iOS 18.4 或更高版本。
5. 在新 iPhone 上打开**设置 > 蜂窝网络 > 设置蜂窝号码**或**添加 eSIM**，选择要从另一台 iPhone 转移的号码；如果没有看到号码，选择从附近 iPhone 转移。
6. 在旧 iPhone 上按照提示确认转移；如果要求输入验证码，输入新 iPhone 上显示的代码。
7. 等待新 iPhone 上的蜂窝号码激活。Apple 说明，新 iPhone 激活后，旧 SIM 会停用。
8. 如果新 iPhone 出现**完成运营商蜂窝套餐设置**横幅，轻点横幅并按运营商网页继续；需要协助时联系运营商。
9. 如果使用二维码、运营商链接、运营商 App 或手动输入，请按运营商提供的资料完成；确认码必须使用运营商提供的号码。
10. 如果从安卓设备转移 eSIM，将两台手机并排放置；无法扫描二维码时，使用 Apple 提供的“其他选项”流程输入会话 ID 和配对代码。
11. 如果 eSIM 设置失败，打开再关闭飞行模式。
12. 打开**设置 > 蜂窝网络**，检查要激活的号码是否出现；如果出现，将该号码关闭再重新打开。
13. 重新启动 iPhone。
14. 打开**设置 > 通用 > 关于本机**，在 eSIM 部分检查运营商设置版本；如果出现运营商设置更新，选择“好”或“更新”。
15. 如果仍无法设置 eSIM，联系运营商，并准备电话号码、运营商账户密码或 PIN、iPhone 的 IMEI 和 EID。
16. 在 iOS 18 或更高版本上，可以使用最新版 Apple 支持 App 运行其他诊断，帮助区分设备问题和运营商配置问题。
17. 如果 eSIM 设置后蜂窝网络可用，但 iMessage 只能用邮箱发送，或同一电话号码在**设置 > App > 信息 > 发送与接收**中显示两次，按 Apple 的 iOS 26 同号已失效 SIM 流程处理：更新到 iOS 26.1 或更高版本，或移除/删除已失效的同号 SIM。

参考来源：

- [Apple 支持：在 iPhone 上设置 eSIM](https://support.apple.com/zh-cn/118669)
- [Apple 支持：如果你无法在 iPhone 上设置 eSIM](https://support.apple.com/zh-cn/102478)
- [Apple 支持：在中国大陆将 eSIM 与 iPhone 搭配使用](https://support.apple.com/zh-cn/123879)
- [Apple 支持：将 eSIM 从安卓设备转移到 iPhone](https://support.apple.com/zh-cn/123878)
- [Apple 支持：查找在 iPhone 上提供 eSIM 服务的无线运营商和全球服务提供商](https://support.apple.com/zh-cn/101569)
- [Apple 支持：如果无法在 iOS 26 中用你的电话号码激活 iMessage 信息](https://support.apple.com/zh-cn/125367)

---

## eSIM 设置后 iMessage 只能用邮箱发送

验证级别：Apple 官方

1. 先区分问题范围：如果电话、蜂窝数据和普通短信都不可用，回到 eSIM 激活和运营商排查；如果只有 iMessage 电话号码不可用，继续检查信息设置。
2. 打开**设置 > App > 信息 > 发送与接收**，查看同一电话号码是否显示两次，或电话号码是否无法被选中。
3. 如果设备已更新到 iOS 26，先更新到 iOS 26.1 或更高版本。
4. 打开**设置 > 蜂窝网络**，检查是否存在同一电话号码的两张 SIM。
5. 如果其中一张已经失效，实体 SIM 直接取出；已失效 eSIM 则轻点并删除 eSIM。
6. 回到**设置 > App > 信息 > 发送与接收**，选择要用于 iMessage 的电话号码。
7. 如果 iMessage 仍无法激活，转到 iMessage 激活文章继续检查网络、日期时间、运营商短信服务和 24 小时等待条件。

参考来源：

- [Apple 支持：如果无法在 iOS 26 中用你的电话号码激活 iMessage 信息](https://support.apple.com/zh-cn/125367)
- [Apple 支持：如果你无法在 iPhone 上打开或登录 iMessage 信息或 FaceTime 通话](https://support.apple.com/zh-cn/119859)

---

## 中国大陆机型和营业厅分流

验证级别：Apple 官方

1. 先确认机型。Apple 说明，在中国大陆支持中国大陆运营商 eSIM 的机型包括 iPhone 17e（型号 A3635）和 iPhone Air（型号 A3518）。
2. 如果顾客使用其他 iPhone 机型，或使用在中国大陆境外购买的 iPhone，Apple 说明无法安装中国大陆运营商提供的 eSIM 描述文件。
3. 中国大陆支持的 eSIM iPhone 必须前往运营商线下营业厅办理，营业厅工作人员会完成必需的身份检查并激活 eSIM。
4. 前往营业厅前，先完成新 iPhone 设置并迁移数据；如果无法迁移数据，至少完成 iCloud 备份。
5. 提醒顾客携带政府签发的身份证件或护照；如果适用，也带上现有 SIM 卡。
6. 中国大陆购买且支持 eSIM 的同一台 iPhone 上最多可以激活并储存两个 eSIM。
7. 在中国大陆境外旅行时，中国大陆购买的支持 eSIM iPhone 可以激活当地运营商 eSIM，但必须启用定位服务；在中国大陆无法安装境外运营商提供的 eSIM。
8. 如果已经有两个 eSIM，境外再添加旅行 eSIM 前需要先删除一个；Apple 说明回国后若要重新激活已删除的 eSIM，必须前往运营商线下营业厅办理。

参考来源：

- [Apple 支持：在中国大陆将 eSIM 与 iPhone 搭配使用](https://support.apple.com/zh-cn/123879)

---

## 已验证的非官方处理思路

非官方

### 让运营商重新下发或重新配置 eSIM

- 来源：Apple 官方失败排查要求最终联系运营商；Apple Support Community 中也有用户把转移失败归因于运营商需要重新配置或重新下发 eSIM。
- 成功概率：中等，尤其适合号码在旧设备停用、新设备没有服务、或运营商网页流程失败的情况。
- 风险：中等。运营商可能需要账户验证，期间号码可能暂时不可用。
- 备注：不要让顾客自行删除旧 eSIM 后再联系运营商；先确认运营商可以重新下发或补换。
- 验证级别：较可能

### 不建议把抹掉设备当作第一步

- 来源：Apple 的 iPhone 使用手册说明，抹掉 iPhone 时可以保留或抹掉 eSIM；如果抹掉 eSIM，需要联系运营商重新激活。
- 成功概率：未知。
- 风险：高。可能丢失当前可用号码、增加运营商补办成本，并扩大数据恢复工作量。
- 备注：只有在已经备份、明确是否保留 eSIM，并且 Apple 支持或运营商要求时才考虑抹掉设备。
- 验证级别：Apple 官方风险说明

---

## 零售排查流程

1. 先问清楚顾客处于哪一步：新机设置中、设置后添加 eSIM、从旧 iPhone 转移、从安卓转移、扫描二维码，还是运营商 App 激活。
2. 记录报错原文、号码是否已经出现在“蜂窝网络”、旧设备号码是否仍可用、运营商名称、IMEI 和 EID。
3. 先判断地区和机型。中国大陆 eSIM 场景优先确认 iPhone Air / iPhone 17e 型号和线下营业厅要求。
4. 快速转移失败时，检查同一 Apple 账户、设备密码、蓝牙、距离、iOS 版本和运营商是否支持快速转移。
5. 如果号码已经在新 iPhone 上出现，按 Apple 步骤关闭再打开该号码、飞行模式、重启、检查运营商设置。
6. 如果蜂窝号码已可用但 iMessage 用邮箱发送，检查**发送与接收**是否有同号重复；这属于 iMessage 电话号码激活分支，不一定代表 eSIM 激活失败。
7. 如果号码没有出现，或出现运营商网页/二维码/确认码错误，优先转运营商处理，不要猜测为 Apple ID 或硬件问题。
8. 不建议顾客删除正在使用的 eSIM、抹掉设备、反复还原网络设置或使用第三方 eSIM 工具来“抢救”号码。
9. 如果运营商确认账户和 eSIM 配置正常，但 iPhone 仍无法识别或激活，再用 Apple 支持 App 诊断并评估服务路径。

---

## 升级处理

联系运营商：

- eSIM 快速转移不显示号码，或运营商不支持快速转移。
- 出现运营商网页、二维码、确认码、账户 PIN、EID 或 IMEI 相关错误。
- 旧设备号码停用，新设备仍无法拨打电话。
- 中国大陆 eSIM 需要线下营业厅身份检查、补换卡或重新激活。

联系 Apple 支持：

- 完成 Apple 官方失败排查和运营商设置检查后仍无法设置 eSIM。
- iOS 18 或更新版本需要运行 Apple 支持 App 诊断。
- 运营商确认 eSIM、账户、EID 和 IMEI 都正常，但设备仍无法激活蜂窝网络。

前往 Apple Store 或授权维修点：

- 多个运营商 eSIM 都无法在同一台设备上激活，并且运营商侧确认配置正常。
- Apple 支持诊断提示设备问题。
- 同一 eSIM / 号码在其他兼容设备或运营商流程中可用，但这台 iPhone 始终失败。

---

## 相关问题

- [iPhone 无法发送或接收信息，iMessage 变绿色或等待激活](/recipes/iPhone/iphone-imessage-messages-not-sending-green-waiting-activation)
- [iPhone 显示无 SIM 卡或无效 SIM 卡](/recipes/iPhone/iphone-invalid-sim-no-sim)
- [iPhone 显示 SOS、无服务或正在搜索](/recipes/iPhone/iphone-sos-no-service-searching)
- iPhone 无法激活
- iPhone 换机后蜂窝号码不见了

---

## 标签

- 设备：iPhone
- 系统：iOS
- 功能：eSIM、蜂窝网络、号码转移、设备激活
- 网络：运营商账户、运营商设置、旅行 eSIM
- Apple ID：快速转移要求同一 Apple 账户
- 隐私：电话号码、IMEI、EID、运营商账户 PIN
- 维修：通常先排除运营商配置；少数情况可能涉及蜂窝硬件

---

## 元信息

- 最后更新：2026-07-10
- 来源数量：11
- 验证级别：Apple 官方
- 支持系统：当前 iOS；eSIM 功能取决于机型、地区、运营商和 iOS 版本
- 可信度：高
