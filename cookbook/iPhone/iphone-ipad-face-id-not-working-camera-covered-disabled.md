---
schemaVersion: 2
id: iphone-ipad-face-id-not-working-camera-covered-disabled
title: iPhone 或 iPad Face ID 无法使用、识别失败或提示摄像头被遮挡
slug: iphone-ipad-face-id-not-working-camera-covered-disabled
summary: Face ID 解锁、Apple Pay、App 登录或口罩识别失败时，先区分正常要求输入密码、设置未开启、TrueDepth 摄像头被遮挡、脸部或眼睛被遮挡、姿势距离限制，以及需要服务的 Face ID 停用提示。
symptoms:
  - Face ID 无法解锁 iPhone
  - Face ID 无法解锁 iPad
  - Face ID 识别不了
  - Face ID 一直要求输入密码
  - Face ID 提示摄像头被遮挡
  - Face ID 戴口罩不能用
  - Face ID 无法设置
  - Face ID 已停用
devices:
  - iPhone
  - iPad
platforms:
  - iOS
  - iPadOS
systemVersions:
  - 当前支持的 iOS
  - 当前支持的 iPadOS
categories:
  - iPhone
tags:
  - iPhone
  - iPad
  - Face ID
  - TrueDepth
  - Apple Pay
  - Accessibility
keywords:
  - Face ID 无法使用
  - Face ID 失败
  - 面容 ID 失效
  - 原深感摄像头
  - 摄像头被遮挡
  - 戴口罩解锁
  - 必须输入密码
aliases:
  - Face ID not working
  - Face ID unavailable
  - Face ID disabled
  - Face ID camera covered
  - Face ID asks for passcode
  - Face ID with mask not working
  - TrueDepth camera covered
  - iPhone Face ID failed
  - iPad Face ID failed
errorMessages:
  - 摄像头被遮挡
  - Face ID 已停用
  - 需要输入密码才能启用 Face ID
  - Face ID 不可用
  - 稍后尝试设置 Face ID
officialTerms:
  - Face ID
  - TrueDepth camera
  - Face ID with a mask
  - Require Attention for Face ID
  - Attention Aware Features
communityTerms:
  - 面容坏了
  - 刘海摄像头坏了
  - 刷脸失败
  - 口罩解锁不灵
  - 老是输密码
difficulty: Quick
estimatedTime: 5-15 分钟；需要服务时更久
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: separate-passcode-requirement-from-face-id-failure
    title: 先区分正常安全要求和真正的 Face ID 故障
    summary: Apple 说明，重启、超过一段时间未解锁、连续识别失败、远程锁定或进入关机/SOS 流程后，系统会要求输入密码；这不等于 Face ID 损坏。
    kind: recommended
    steps:
      - 询问用户看到的是“必须输入密码”还是 Face ID 转圈、识别失败、无法设置或明确提示已停用。
      - 如果设备刚重启、刚开机、长时间未解锁、连续多次识别失败，或刚按住侧边按钮和音量键进入关机/SOS 界面，先输入设备密码。
      - 输入密码后锁屏再试一次 Face ID；如果恢复正常，把它记录为安全机制触发，不继续重置 Face ID。
      - 如果每次都无法识别、某个用途没有启用、提示摄像头被遮挡，继续按设置、遮挡和姿势分支排查。
    verificationLevel: Official
    sourceIds:
      - apple-face-id-advanced-technology
    warnings:
      - 不要把 Apple 的安全验证机制解释成硬件故障。
      - 不要要求用户关闭密码；Face ID 必须依赖设备密码作为后备验证。
    limitations:
      - 本步骤只能解释正常要求输入密码的场景；不能排除摄像头遮挡、设置或硬件问题。
  - id: check-settings-update-camera-face-and-distance
    title: 按 Apple 官方顺序检查更新、设置、遮挡、脸部和距离
    summary: Apple 的 Face ID 故障排查顺序是先更新系统和确认机型支持，再检查 Face ID 设置、TrueDepth 摄像头遮挡、脸部遮挡、朝向距离、重启、替用外貌和重设 Face ID。
    kind: recommended
    steps:
      - 更新到当前可用的 iOS 或 iPadOS，并确认这台 iPhone 或 iPad 型号支持 Face ID。
      - 打开“设置”>“Face ID 与密码”，确认 Face ID 已设置，并确认要使用的功能已打开，例如 iPhone/iPad 解锁、Apple Pay、App Store 或具体 App。
      - 检查 TrueDepth 摄像头区域，移除污渍、保护膜、手机壳、贴纸或屏幕配件；iPad 横向使用时也要确认手指或手掌没有挡住摄像头。
      - 确认眼睛、鼻子和嘴巴可被摄像头看到；如果戴口罩并已设置口罩 Face ID，至少要让眼睛和眼周区域清晰可见。
      - 摘下可能阻挡红外光的太阳镜；如果戴口罩，口罩不要太高或太靠近眼睛。
      - 调整朝向和距离：iPhone 13 或更新机型在 iOS 16 或更新版本可横向使用 Face ID，较旧 iPhone 需要竖向；iPad 可多方向使用；设备应在手臂距离以内。
      - 重新启动设备，输入密码后再次测试 Face ID。
      - 如果外貌变化很大，添加替用外貌；如果仍失败，重设 Face ID 后重新设置。
    verificationLevel: Official
    sourceIds:
      - apple-face-id-not-working
      - apple-face-id-advanced-technology
    warnings:
      - 重设 Face ID 会删除当前 Face ID 数据，需要用户重新录入。
      - 如果屏幕、前置摄像头区域或机身近期受损，不要反复按软件问题处理。
    limitations:
      - Apple 文档给的是通用路径；具体 App 的 Face ID 开关还可能受 App 自身设置影响。
  - id: handle-mask-glasses-attention-and-accessibility
    title: 处理口罩、眼镜、注视要求和辅助功能差异
    summary: 口罩 Face ID 有机型、系统、横竖屏和眼部可见性限制；注视要求和辅助功能设置也会改变识别体验。
    kind: alternative
    steps:
      - 如果用户戴口罩，确认设备是 iPhone 12 或更新机型，且运行 iOS 15.4 或更新版本。
      - 在“设置”>“Face ID 与密码”中开启“戴口罩使用 Face ID”，并按提示重新设置。
      - 如果戴眼镜和口罩，在同一页面添加眼镜；Apple 说明最多可添加四副眼镜。
      - 戴口罩时保持眼睛无遮挡；不要使用太阳镜，并注意口罩 Face ID 不支持横向模式。
      - 如果用户因视力、行动或眼部状态无法稳定注视屏幕，检查“设置”>“辅助功能”>“Face ID 与注视”，谨慎调整“需要注视以启用 Face ID”。
      - 如果用户依赖 VoiceOver 或其他辅助功能，先确认关闭注视要求是否是其无障碍需求，不要为了提高安全性强行改回。
    verificationLevel: Official
    sourceIds:
      - apple-face-id-mask
      - apple-face-id-attention-settings
      - apple-attention-aware
    warnings:
      - Apple 明确说明“需要注视以启用 Face ID”会提供额外安全性；关闭前要向用户说明安全取舍。
      - 戴口罩 Face ID 不适用于太阳镜，也不适用于 iPhone 12 以前机型。
    limitations:
      - 口罩 Face ID 只覆盖支持机型和系统版本；不解决 TrueDepth 摄像头硬件故障。
  - id: escalate-disabled-or-cannot-set-up-face-id
    title: 无法设置或提示 Face ID 已停用时升级服务
    summary: Apple 说明，如果摄像头无法工作并且不能设置 Face ID，可能需要服务；涉及 TrueDepth 激光系统时只能由受训技术人员维修。
    kind: escalation
    steps:
      - 如果重设后仍提示无法设置、Face ID 不可用、Face ID 已停用，记录完整提示、设备型号、系统版本、摔落进水维修史和已完成步骤。
      - 如果前置相机、自拍、视频通话或原深感摄像头区域也异常，优先按服务路径处理，不继续建议抹掉设备。
      - 告知用户 Apple 对 TrueDepth 激光系统有安全要求，非正规维修或非原装部件可能影响安全机制。
      - 联系 Apple 支持、Apple Store 或 Apple 授权服务提供商检查；不要承诺第三方更换组件后 Face ID 一定恢复。
    verificationLevel: Official
    sourceIds:
      - apple-face-id-not-working
      - apple-face-id-advanced-technology
    warnings:
      - 不要建议用户自行拆机、加热、压屏或替换 TrueDepth 组件。
      - 抹掉设备通常不能修复 TrueDepth 硬件或安全停用问题，还会带来数据风险。
    limitations:
      - 远程文章无法确认是否为硬件、维修配件、液体损坏或安全机制停用。
warnings:
  - Face ID 连续失败后要求输入密码是安全机制，不一定是故障。
  - 如果提示 Face ID 已停用、无法设置，或前置摄像头区域受损，应尽快走服务路径。
  - 不要把关闭注视要求当作通用修复；这会降低一部分安全保护。
limitations:
  - 本文覆盖 iPhone 和支持 Face ID 的 iPad；不覆盖 Touch ID、Apple Watch 解锁 Mac 或第三方 App 自身账号问题。
  - 本文不提供绕过设备密码、失窃设备保护、安全延迟或 Apple 账户验证的方法。
sources:
  - id: apple-face-id-not-working
    title: If Face ID isn't working on your iPhone or iPad Pro
    url: https://support.apple.com/en-us/118243
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: 2025-10-27
    official: true
  - id: apple-face-id-advanced-technology
    title: About Face ID advanced technology
    url: https://support.apple.com/en-us/102381
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: 2024-12-09
    official: true
  - id: apple-face-id-mask
    title: Use Face ID while wearing a mask with iPhone 12 and later
    url: https://support.apple.com/en-us/102452
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: 2026-03-30
    official: true
  - id: apple-face-id-attention-settings
    title: Change Face ID and attention settings on iPhone
    url: https://support.apple.com/guide/iphone/change-face-id-and-attention-settings-iph646624222/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-attention-aware
    title: Turn Attention Aware features on or off on your iPhone or iPad Pro
    url: https://support.apple.com/en-us/102216
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-15
lastUpdatedAt: 2026-07-15
createdAt: 2026-07-15
relatedArticles:
  - iphone-stolen-device-protection-security-delay
  - iphone-unavailable-security-lockout-forgot-passcode
  - apple-wallet-cant-add-card-apple-pay
popular: false
---

# iPhone 或 iPad Face ID 无法使用、识别失败或提示摄像头被遮挡

Face ID 失败时，先不要直接重设、抹掉或判断“面容坏了”。最重要的是把三类情况分开：Apple 的安全机制要求输入设备密码、Face ID 设置或遮挡导致识别失败、TrueDepth 摄像头或安全系统需要服务。

---

## 症状

- “Face ID 解不开锁，只能输密码。”
- “戴口罩以后 Face ID 不灵。”
- “iPad 横着用提示摄像头被遮挡。”
- “Apple Pay 或 App 登录不弹 Face ID。”
- “设置 Face ID 时提示稍后尝试。”
- “重设以后还是无法设置 Face ID。”
- “屏幕上提示 Face ID 已停用。”
- “换了膜或摔过以后 Face ID 不识别。”

---

## 可能原因

1. **系统按安全规则要求输入密码**
   - Apple 说明，设备刚重启、超过一定时间未解锁、连续多次 Face ID 识别失败、远程锁定或进入关机/SOS 流程后，都可能必须先输入密码。
2. **Face ID 没有为当前用途开启**
   - 解锁、Apple Pay、App Store 和第三方 App 可能分别需要在“Face ID 与密码”或 App 内开启。
3. **TrueDepth 摄像头被遮挡或污染**
   - 保护膜、污渍、手机壳、贴纸、iPad 横向时的手掌，都可能挡住摄像头。
4. **脸部、眼睛、口罩、太阳镜或姿势不符合条件**
   - Apple 要求摄像头能看见关键面部区域；口罩 Face ID 还要求支持机型、支持系统、眼部无遮挡且不能戴太阳镜。
5. **外貌变化、注视要求或辅助功能设置影响识别**
   - 外貌变化很大时可添加替用外貌；部分用户可能需要调整注视相关辅助功能。
6. **TrueDepth 摄像头或安全系统需要服务**
   - 如果无法设置 Face ID、提示已停用，或设备近期受损/非正规维修，软件步骤可能无法修复。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先记录屏幕原文：是“需要输入密码”、识别失败、摄像头被遮挡、无法设置，还是 Face ID 已停用。
2. 如果设备刚重启、长时间未解锁、连续识别失败，先输入设备密码，再锁屏测试一次。恢复正常时，记录为安全机制触发。
3. 更新到当前可用的 iOS 或 iPadOS，并确认这台设备支持 Face ID。
4. 打开“设置”>“Face ID 与密码”，确认 Face ID 已设置，并打开要使用的功能。
5. 清洁并露出 TrueDepth 摄像头区域，移除可能遮挡的膜、壳、贴纸或污渍。iPad 横向使用时，也确认手指和手掌没有挡住摄像头。
6. 让眼睛、鼻子和嘴巴处于摄像头可见范围；摘下可能阻挡红外光的太阳镜。
7. 调整姿势和距离。iPhone 13 或更新机型在 iOS 16 或更新版本可横向使用 Face ID；较旧 iPhone 通常需要竖向；设备保持在手臂距离以内。
8. 重新启动设备，输入密码后再试 Face ID。
9. 如果外貌变化很大，添加替用外貌。
10. 如果仍失败，重设 Face ID 后重新设置。
11. 如果摄像头无法工作、无法设置 Face ID 或提示 Face ID 已停用，停止反复重置，转 Apple 支持或授权服务检查。

参考来源：

- [Apple Support: If Face ID isn't working on your iPhone or iPad Pro](https://support.apple.com/en-us/118243)
- [Apple Support: About Face ID advanced technology](https://support.apple.com/en-us/102381)

---

## 零售排查流程

1. **确认用户描述和当前入口**
   - 问清楚失败发生在解锁、Apple Pay、下载 App、银行 App，还是设置 Face ID。
2. **先排除正常密码要求**
   - 设备刚重启或连续失败后要求密码时，让用户输入一次密码再复测。
3. **现场看遮挡和姿势**
   - 检查保护膜、摄像头污渍、屏幕破损、贴纸、壳边缘和 iPad 横向握持。
4. **检查设置开关**
   - 在“Face ID 与密码”里确认 Face ID 已设置，并确认对应用途已启用。
5. **处理口罩和眼镜**
   - 支持机型上开启“戴口罩使用 Face ID”；戴眼镜用户添加眼镜；戴口罩时不要戴太阳镜。
6. **谨慎处理辅助功能**
   - 需要调整“需要注视以启用 Face ID”时，先说明安全取舍，尤其是盲人、低视力或依赖 VoiceOver 的用户。
7. **服务边界**
   - 无法设置、Face ID 已停用、前置摄像头异常、摔落进水或非正规维修史，直接记录并升级服务。

---

## 升级处理

联系 Apple 支持、Apple Store 或 Apple 授权服务提供商前，建议记录：

- 设备型号和 iOS/iPadOS 版本。
- 具体错误文字或截图。
- Face ID 失败场景：解锁、Apple Pay、App 登录、设置流程或戴口罩。
- 是否刚重启、长时间未解锁、连续识别失败或进入过关机/SOS 界面。
- 是否贴膜、换屏、摔落、进水、维修或更换过前置摄像头/屏幕组件。
- 已完成的步骤：更新、设置开关、遮挡检查、重启、替用外貌、重设 Face ID。

升级标准：

- 无法完成 Face ID 设置。
- 系统提示 Face ID 已停用或 Face ID 不可用。
- TrueDepth 摄像头区域损坏、前置相机异常或近期有维修史。
- 重设 Face ID 后仍无法设置或仍持续失败。

---

## 相关问题

- [iPhone 显示安全延迟，无法立即更改 Apple 账户或关闭失窃设备保护](/recipes/iPhone/iphone-stolen-device-protection-security-delay)
- [iPhone 不可用、安全锁定或忘记锁屏密码](/recipes/iPhone/iphone-unavailable-security-lockout-forgot-passcode)
- [Apple 钱包无法添加银行卡或 Apple Pay 卡片](/recipes/iPhone/apple-wallet-cant-add-card-apple-pay)
