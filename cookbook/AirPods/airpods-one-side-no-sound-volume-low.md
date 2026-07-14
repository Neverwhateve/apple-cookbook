---
schemaVersion: 2
id: airpods-one-side-no-sound-volume-low
title: AirPods 只有一只耳机有声音或左右音量不一样
slug: airpods-one-side-no-sound-volume-low
summary: 一侧 AirPod 没声音、声音很小或左右音量不一致时，先确认两只耳机都在充电，再单独测试故障耳机；如果是音量偏小，检查网罩清洁和辅助功能里的左右平衡。
symptoms:
  - AirPods 只有一只耳机有声音
  - 左边 AirPod 没声音
  - 右边 AirPod 没声音
  - AirPods 一边声音很小
  - AirPods 左右音量不一样
  - 一只 AirPod 音量比另一只大
  - AirPods 只响一边
  - AirPods balance 偏了
  - AirPods 充电盒里显示一只没电
  - 更换单只 AirPod 后还是不能用
devices:
  - AirPods
  - AirPods Pro
  - iPhone
  - iPad
platforms:
  - iOS
  - iPadOS
systemVersions:
  - 当前 iOS 和 iPadOS；具体设置名称可能随系统版本变化
categories:
  - AirPods
tags:
  - AirPods
  - Audio
  - Charging
  - Accessibility
  - Cleaning
  - Reset
keywords:
  - 单侧无声
  - 左右声道
  - 音频平衡
  - 麦克风网罩
  - 扬声器网罩
  - 耳塞
  - 充电状态
  - AirPod 更换设备
aliases:
  - one AirPod no sound
  - left AirPod not working
  - right AirPod not working
  - one AirPod louder than the other
  - AirPods one side quieter
  - AirPods audio balance
  - AirPods only one side works
errorMessages: []
officialTerms:
  - 充电状态
  - 音频与视觉
  - 平衡
  - 麦克风和扬声器网罩
  - AirPod 更换设备
communityTerms:
  - 一边响一边不响
  - 左耳没声
  - 右耳很小声
  - 声音偏一边
  - 单耳模式坏了
difficulty: Quick
estimatedTime: 5-15 分钟；清洁后需要等待至少 2 小时完全干燥
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: test-charging-and-single-airpod
    title: 先确认两只 AirPods 都在充电，再单独测试故障耳机
    summary: Apple 的官方流程先排除充电和临时连接状态，再判断是否需要重置或设置更换设备。
    kind: recommended
    steps:
      - 确保充电盒本身已充满电；如果充电盒无法充电，先处理充电盒问题。
      - 将两只 AirPods 都放入充电盒内，并充电 30 秒。
      - 在 iPhone 或 iPad 附近打开充电盒。
      - 在 iPhone 或 iPad 上查看 AirPods 充电状态，确认每只 AirPod 都在充电。
      - 将无法正常使用的 AirPod 放入对应耳朵，另一只 AirPod 留在充电盒中，并合上充电盒盒盖。
      - 播放音频来测试这只 AirPod 是否能单独发声。
      - 如果故障 AirPod 可以播放声音，把两只 AirPods 都放回充电盒内再充电 30 秒，然后在 iPhone 或 iPad 附近打开充电盒，重新测试两只 AirPods。
      - 如果仍有一只 AirPod 无法正常使用，按 Apple 指引重置 AirPods。
      - 如果刚更换过单只 AirPod，按 Apple 的更换设备设置流程处理，不要只重复普通连接步骤。
    verificationLevel: Official
    sourceIds:
      - apple-one-airpod-not-working
      - apple-airpods-not-charging
      - apple-reset-airpods
      - apple-set-up-replacement-airpods
    warnings:
      - 如果 AirPod 或充电盒进水、明显损坏或过热，不要继续充电测试；先停止使用并联系 Apple 支持或服务点。
      - 重置会移除当前蓝牙配对记录，需要重新连接 AirPods。
    limitations:
      - 该流程主要适用于 AirPods 和 AirPods Pro；AirPods Max 的结构和重置方式不同。
      - 如果一侧无法充电，根因可能是充电盒、触点、耳机本体或更换件状态，文章无法远程确认硬件故障。
  - id: check-mesh-cleaning-and-balance
    title: 音量一边大一边小时，检查网罩和左右平衡
    summary: Apple 要求先检查麦克风和扬声器网罩是否有碎屑，再确认辅助功能里的平衡滑块位于中间。
    kind: alternative
    steps:
      - 如果是一只 AirPod 声音比另一只大或小，先取下 AirPods 耳塞，检查每只 AirPod 上的麦克风和扬声器网罩。
      - 如果看到碎屑或声音问题像是被堵住，按对应机型的 Apple 清洁说明处理 AirPods 或 AirPods Pro。
      - 清洁时不要用水冲洗普通 AirPods，不要使用尖锐物体或研磨材料。
      - 清洁 AirPods Pro 或 AirPods 网罩后，按 Apple 要求等待至少 2 小时完全干燥，再放入充电盒或继续使用。
      - 在 iPhone 或 iPad 上打开“设置 > 辅助功能 > 音频与视觉 > 平衡”。
      - 确认平衡设置在中间位置；如果滑块偏向左侧或右侧，把它移回中间后重新播放同一段音频测试。
    verificationLevel: Official
    sourceIds:
      - apple-one-airpod-not-working
      - apple-clean-airpods
      - apple-clean-airpods-pro
    warnings:
      - 不要把液体倒入耳机开口、充电端口或充电盒；不要用尖锐工具刮网罩。
      - 设备未完全干燥前不要放入充电盒或继续佩戴。
    limitations:
      - 清洁只能解决可见脏污、堵塞或皮肤刺激相关问题；不能修复跌落、进液或元件故障。
      - 音频平衡设置只影响这台 iPhone 或 iPad 的输出；其他设备仍需分别检查。
  - id: escalate-after-official-steps
    title: 官方步骤后仍单侧异常时升级处理
    summary: 完成充电、单耳测试、清洁、平衡和重置后仍异常，应记录现象并联系 Apple 支持或服务点。
    kind: escalation
    steps:
      - 记录 AirPods 型号、左右哪一侧异常、当前配对设备、系统版本、是否更换过单只 AirPod 或充电盒。
      - 记录每只 AirPod 是否能在充电状态中显示电量，以及单独测试时是否能发声。
      - 如果同一侧在多台 iPhone 或 iPad 上都无法发声，或清洁和重置后仍明显偏小，联系 Apple 支持或预约 Apple Store / Apple 授权服务提供商。
      - 如果刚更换过单只 AirPod 或充电盒，把购买或维修记录一起带上，按更换设备流程核对。
    verificationLevel: Official
    sourceIds:
      - apple-one-airpod-not-working
      - apple-clean-airpods-pro
      - apple-set-up-replacement-airpods
    warnings:
      - 不要用第三方工具、胶水、针具或压缩空气尝试修复网罩或充电触点。
    limitations:
      - 远程步骤不能替代 Apple 对电池、扬声器、麦克风、充电盒或更换件配对状态的检测。
warnings:
  - 清洁和充电前先检查是否有液体、腐蚀、膨胀、异味或明显损坏；出现这些情况时停止使用并升级处理。
  - 清洁后等待至少 2 小时完全干燥，再放入充电盒或使用。
  - 不要把非官方的刷机、拆机、强行清触点方法当作标准处理。
limitations:
  - 本文不覆盖 AirPods Max，也不诊断听力、耳道或第三方 App 音频设置问题。
  - 如果异常只发生在某个 App、某段音频或某台设备上，需要另查 App、音频源或设备输出设置。
  - AirPods 型号不同，清洁区域、耳塞结构和重置方式可能不同。
sources:
  - id: apple-one-airpod-not-working
    title: 如果左侧或右侧 AirPod 无法正常使用
    url: https://support.apple.com/zh-cn/100494
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: 2026-01-15
    official: true
  - id: apple-clean-airpods
    title: 如何清洁 AirPods
    url: https://support.apple.com/zh-cn/102672
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-clean-airpods-pro
    title: 如何清洁 AirPods Pro
    url: https://support.apple.com/zh-cn/120409
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: 2026-02-02
    official: true
  - id: apple-airpods-not-charging
    title: 如果 AirPods 无法充电
    url: https://support.apple.com/zh-cn/102593
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-reset-airpods
    title: 如何重置 AirPods 和 AirPods Pro
    url: https://support.apple.com/zh-cn/118531
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
  - id: apple-set-up-replacement-airpods
    title: 设置 AirPods 更换件或充电盒更换件
    url: https://support.apple.com/zh-cn/102520
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-14
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-14
lastUpdatedAt: 2026-07-14
createdAt: 2026-07-14
relatedArticles:
  - airpods-wont-charge-case-not-working
  - airpods-wont-connect-pair-reset
  - airpods-firmware-wont-update
popular: true
---

# AirPods 只有一只耳机有声音或左右音量不一样

AirPods 只响一边、某一侧声音很小，或左右音量明显不一致时，先不要直接判断耳机坏了。Apple 的官方顺序是：确认两只 AirPods 都在充电，单独测试故障耳机；如果是音量偏小，再检查麦克风和扬声器网罩、清洁方式，以及 iPhone 或 iPad 的左右平衡设置。

---

## 症状

- “左边 AirPod 没声音。”
- “右边 AirPod 能连上但没有声音。”
- “一只 AirPod 音量特别小。”
- “左右耳声音不一样大。”
- “只有把一只放回盒子，另一只才偶尔响。”
- “换了一只 AirPod 以后还是不能正常用。”
- “充电弹窗里有一只不显示电量或不充电。”

---

## 可能原因

1. **一侧 AirPod 没有正常充电或临时连接状态异常**
   - Apple 要求先把两只 AirPods 放入充电盒充电 30 秒，并在 iPhone 或 iPad 上确认每只 AirPod 都在充电。
2. **单侧耳机可以独立播放，但双耳状态没有刷新**
   - Apple 的流程会让故障侧单独留在耳朵里播放音频，再根据结果重新放回充电盒测试。
3. **麦克风或扬声器网罩被碎屑堵住**
   - Apple 针对 AirPods 和 AirPods Pro 都提供了清洁说明；音量偏小或一边更小声时，要先检查网罩。
4. **辅助功能里的左右平衡被调偏**
   - Apple 要求在“辅助功能 > 音频与视觉 > 平衡”中确认滑块在中间位置。
5. **更换单只 AirPod 或充电盒后没有完成更换设备设置**
   - 如果刚更换过单只 AirPod，Apple 要求按更换设备流程设置，而不是只重复普通播放测试。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 确保充电盒已充满电。如果充电盒无法充电，先处理充电盒充电问题。
2. 将两只 AirPods 都放入充电盒，并充电 30 秒。
3. 在 iPhone 或 iPad 附近打开充电盒。
4. 在 iPhone 或 iPad 上查看 AirPods 充电状态，确认每只 AirPod 都在充电。
5. 将无法正常使用的 AirPod 放入对应耳朵；另一只 AirPod 留在充电盒中，并合上充电盒盒盖。
6. 播放音频，测试故障侧 AirPod 是否能单独播放声音。
7. 如果故障侧可以播放声音，把两只 AirPods 都放入充电盒再充电 30 秒，然后在 iPhone 或 iPad 附近打开充电盒，重新测试双耳。
8. 如果仍有一只 AirPod 无法正常使用，按 Apple 指引重置 AirPods。
9. 如果刚更换过单只 AirPod，按 Apple 的 AirPod 更换设备设置流程处理。
10. 如果是一只 AirPod 音量比另一只大或小，取下 AirPods 耳塞，检查每只 AirPod 上的麦克风和扬声器网罩。
11. 如果有任何碎屑，按对应机型的 Apple 清洁说明清洁 AirPods 或 AirPods Pro。
12. 清洁时不要使用尖锐物体、研磨材料，也不要让液体进入不该接触液体的位置；清洁后按 Apple 要求等待至少 2 小时完全干燥。
13. 在 iPhone 或 iPad 上打开**设置 > 辅助功能 > 音频与视觉 > 平衡**。
14. 确保平衡设置在中间位置，再播放同一段音频测试左右音量。

参考来源：

- [Apple 支持：如果左侧或右侧 AirPod 无法正常使用](https://support.apple.com/zh-cn/100494)
- [Apple 支持：如何清洁 AirPods](https://support.apple.com/zh-cn/102672)
- [Apple 支持：如何清洁 AirPods Pro](https://support.apple.com/zh-cn/120409)
- [Apple 支持：如果 AirPods 无法充电](https://support.apple.com/zh-cn/102593)
- [Apple 支持：如何重置 AirPods 和 AirPods Pro](https://support.apple.com/zh-cn/118531)
- [Apple 支持：设置 AirPods 更换件或充电盒更换件](https://support.apple.com/zh-cn/102520)

---

## 清洁和安全边界

验证级别：Apple 官方

1. AirPods 或 AirPods Pro 接触汗水、化妆品、防晒霜、洗发水、香水、清洁剂等物质后，应按 Apple 清洁说明处理并完全干燥。
2. 普通 AirPods 不要用水冲洗，不要用尖锐物体或研磨材料清洁。
3. AirPods Pro 清洁网罩、机身、耳塞和充电盒时，按对应区域使用 Apple 说明的方法；不要把液体带入充电端口或充电盒内部。
4. 清洁 AirPods Pro 或 AirPods 网罩后，Apple 要求等待至少 2 小时完全干燥，再放入充电盒或使用。
5. 如果清洁无法解决 AirPods Pro 的问题，Apple 建议获取服务；如果设备损坏，可能需要订购更换设备。

参考来源：

- [Apple 支持：如何清洁 AirPods](https://support.apple.com/zh-cn/102672)
- [Apple 支持：如何清洁 AirPods Pro](https://support.apple.com/zh-cn/120409)

---

## 零售排查流程

1. 先问清楚是完全没声音、声音很小、左右不平衡，还是只有某个 App 或某段音频异常。
2. 记录异常侧、AirPods 型号、配对设备、系统版本，以及是否刚更换过单只 AirPod 或充电盒。
3. 查看充电弹窗或蓝牙详情，确认两只 AirPods 是否都在充电。
4. 按 Apple 官方流程充电 30 秒，并单独测试故障侧 AirPod。
5. 如果单独测试能发声，重新双耳测试；如果仍异常，再重置 AirPods。
6. 如果是音量大小不一致，先检查网罩和耳塞，再检查“音频与视觉 > 平衡”。
7. 如果刚更换过单只 AirPod 或充电盒，按更换设备流程处理。
8. 如果同一侧在多台设备上都无法发声、无法充电或清洁后仍明显偏小，升级 Apple 支持或服务检测。

---

## 升级处理

联系 Apple 支持：

- 完成充电、单耳测试、重置、清洁和平衡检查后，仍有一侧无声或明显偏小。
- AirPods 充电状态中一侧持续不显示、无法充电或电量异常。
- 刚更换过单只 AirPod 或充电盒，按更换设备流程仍无法正常使用。

前往 Apple Store 或授权维修点：

- 多台 iPhone 或 iPad 上都复现同一侧无声。
- 网罩清洁后仍明显偏小，或 AirPods 有进液、摔落、变形、腐蚀、异味等迹象。
- Apple 支持要求进行硬件检测、清洁评估或更换件核对。

---

## 相关问题

- [AirPods 无法充电或充电盒没有反应](/recipes/AirPods/airpods-wont-charge-case-not-working)
- [AirPods 无法连接或重新配对](/recipes/AirPods/airpods-wont-connect-pair-reset)
- [AirPods 固件无法更新](/recipes/AirPods/airpods-firmware-wont-update)
- [AirPods 在“查找”中显示设置未完成](/recipes/AirPods/airpods-find-my-setup-incomplete)

---

## 标签

- 设备：AirPods、AirPods Pro、iPhone、iPad
- 系统：iOS、iPadOS
- 功能：音频、充电状态、清洁、辅助功能、左右平衡、重置
- 网络：不适用
- Apple ID：通常不涉及；更换件和服务记录可能需要核对
- 维修：可能涉及电池、扬声器、麦克风、网罩、充电盒或更换件检测
