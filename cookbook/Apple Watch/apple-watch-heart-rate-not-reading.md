---
schemaVersion: 2
id: apple-watch-heart-rate-not-reading
title: Apple Watch 测不到心率或心率数据不显示
slug: apple-watch-heart-rate-not-reading
summary: Apple Watch 的“心率”App 没有读数、体能训练中不显示心率，或心率数据不写入“健康”App 时，先检查手腕检测、心率权限、佩戴贴合度和传感器接触，再区分环境影响与需要 Apple 支持检测的硬件问题。
symptoms:
  - Apple Watch 测不到心率
  - Apple Watch 不显示心率
  - Apple Watch 心率 App 没有数据
  - Apple Watch 体能训练不显示心率
  - Apple Watch 心率数据不记录到健康 App
  - Apple Watch 心率读数忽高忽低
  - Apple Watch 心率传感器不工作
devices:
  - Apple Watch
  - iPhone
platforms:
  - watchOS
  - iOS
systemVersions:
  - watchOS 5 或更高版本（部分心率功能）
  - watchOS 9 或更高版本（低电量模式可能减少或关闭部分后台测量）
categories:
  - Apple Watch
tags:
  - Apple Watch
  - Health
  - Heart Rate
  - watchOS
keywords:
  - Apple Watch 心率
  - Apple Watch 心率测不到
  - Apple Watch 心率不显示
  - Apple Watch 心率传感器
  - Apple Watch 体能训练心率
  - Apple Watch 健康心率数据
aliases:
  - Apple Watch heart rate not reading
  - Apple Watch heart rate not showing
  - Apple Watch heart rate sensor not working
  - Apple Watch workout heart rate missing
  - Apple Watch no heart rate data
errorMessages:
  - 无法读取心率
  - 没有心率读数
officialTerms:
  - 心率
  - 心率传感器
  - 手腕检测
  - 隐私与安全性
  - 健康
  - 体能训练
communityTerms:
  - 心率一直空白
  - 运动时没有心率
  - 心率不跳
  - 表背读不到心跳
difficulty: Quick
estimatedTime: 10-15 分钟；观察设置或佩戴调整后的结果可能需要一次完整体能训练
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-settings-and-test-manually
    title: 先确认心率权限、手腕检测和“心率”App
    summary: 先排除设置关闭或只是在等待后台读数；打开“心率”App 手动测量，并确认 iPhone 上的 Watch 设置允许心率数据。
    kind: recommended
    steps:
      - 在 Apple Watch 上打开“心率”App，保持手腕静止并等待读数；不要把一次后台没有立即更新误判为传感器故障。
      - 在 Apple Watch 上前往“设置 > 隐私与安全性 > 健康 > 心率”，确认“心率”已打开；也可在 iPhone 的 Watch App 中打开“我的手表 > 隐私”确认。
      - 在 iPhone 的 Watch App 中打开“我的手表 > 密码”，确认“手腕检测”已打开；关闭时无法获得后台心率读数。
      - 如果只是在体能训练中没有数据，重新打开“体能训练”App，选择与实际运动相符的项目，并观察几分钟。
    verificationLevel: Official
    sourceIds:
      - apple-watch-heart-rate-accuracy
      - apple-watch-heart-rate-monitoring
      - apple-watch-heart-rate-manual
    warnings:
      - 心率功能关闭后，相关健康记录和通知也会受影响；不要为了排查长期关闭隐私或安全设置。
    limitations:
      - 文章无法确认用户的实际权限状态、系统版本或某个第三方健康 App 是否获得访问授权。
  - id: improve-watch-contact-and-fit
    title: 调整手表位置、清洁传感器并改善皮肤接触
    summary: Apple Watch 需要在手腕外侧稳定贴合，表背与皮肤接触；过松、位置过低、汗水或水分都可能让光学传感器难以读数。
    kind: recommended
    steps:
      - 将 Apple Watch 戴在腕骨以上、靠近肘部的一侧，让表背接触皮肤；不要把表戴在手腕骨下方。
      - 调整表带到舒适但不松动的程度。体能训练时可以适当收紧，训练结束后再调松；不要勒到麻木或疼痛。
      - 擦干手腕和表背，清除汗水、乳液或污渍后再打开“心率”App 测试；水和汗可能导致记录效果不佳。
      - 如果佩戴位置、贴合度和清洁都正常仍没有任何读数，使用另一只手腕或在静止状态下复测。
    verificationLevel: Official
    sourceIds:
      - apple-watch-wear
      - apple-watch-heart-rate-accuracy
      - apple-watch-heart-rate-manual
    warnings:
      - 不要把表带勒得过紧，也不要用尖锐工具刮擦传感器或自行拆开表背。
    limitations:
      - 纹身、寒冷导致的皮肤灌注降低、剧烈或不规律运动等因素可能影响读数，即使硬件正常也不保证每次都有稳定结果。
  - id: separate-environment-from-service
    title: 根据场景复测，并在持续无读数时联系 Apple 支持
    summary: 先用相同佩戴条件在静止状态和体能训练中分别复测；若所有场景都没有读数，或伴随传感器、表背或其他硬件异常，应停止反复抹掉设备并寻求检测。
    kind: alternative
    steps:
      - 在温暖、干燥、静止的环境中打开“心率”App 手动测量，再用一次常见体能训练复测；记录是否只有寒冷、纹身区域或不规律运动时异常。
      - 如果只是某些运动或环境没有稳定读数，先改善贴合度并理解传感器限制；不要用一次异常高或低的读数诊断身体状况。
      - 如果“心率”App、体能训练和后台健康记录在不同场景都完全没有读数，且设置、佩戴和清洁均已确认，联系 Apple 支持或授权服务提供商评估硬件。
      - 如果出现胸痛、胸闷、呼吸困难、晕厥或其他紧急症状，不要等待 Apple Watch 读数，应立即联系当地急救服务。
    verificationLevel: Official
    sourceIds:
      - apple-watch-heart-rate-accuracy
      - apple-watch-heart-rate-monitoring
    warnings:
      - Apple Watch 不能替代医生诊断，也不能保证检测到每一种心脏问题；心率功能异常与身体症状必须分开处理。
    limitations:
      - 只有 Apple 支持或授权服务提供商才能确认传感器、主板或其他硬件故障。
  - id: account-for-low-power-side-effects
    title: 排查低电量模式对后台心率测量的影响
    summary: 低电量模式会关闭或降低部分后台健康测量和通知；如果问题只发生在低电量模式下，应先恢复正常模式再比较。
    kind: alternative
    steps:
      - 查看 Apple Watch 控制中心或“设置 > 电池”，确认是否开启了“低电量模式”。
      - 在有足够电量时暂时关闭低电量模式，保持相同佩戴和运动条件，再比较“心率”App、体能训练和“健康”App 的数据。
      - 如果低电量模式下只缺少后台心率，而手动打开“心率”App 仍能读数，应把它视为模式副作用，不要据此判断传感器损坏。
    verificationLevel: Official
    sourceIds:
      - apple-watch-heart-rate-accuracy
      - apple-watch-heart-rate-monitoring
    warnings:
      - 关闭低电量模式会增加耗电；测试完成后按实际通知和健康监测需求选择模式。
    limitations:
      - 不同 Apple Watch 机型和 watchOS 版本对低电量模式的影响可能不同，文章不承诺所有功能在每个版本完全一致。
warnings:
  - Apple Watch 的心率读数可能受佩戴、皮肤接触、寒冷、纹身和运动类型影响；没有读数不等于已经确认硬件损坏。
  - Apple Watch 不能替代医生诊断；有急性症状时应立即寻求医疗帮助。
  - 不要自行拆机、加热、冷冻或更换心率传感器。
limitations:
  - 本文覆盖 Apple Watch 心率 App、体能训练和后台健康记录不显示或不稳定的排查；不覆盖心电图、房颤历史或血氧功能的单独问题。
  - 文章无法远程确认传感器硬件、第三方 App 权限或地区功能可用性。
sources:
  - id: apple-watch-heart-rate-accuracy
    title: 使用 Apple Watch 获得更加准确的测量结果
    url: https://support.apple.com/zh-cn/105002
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2026-03-12
    official: true
  - id: apple-watch-heart-rate-monitoring
    title: 使用 Apple Watch 监测你的心率
    url: https://support.apple.com/zh-cn/120277
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2025-12-15
    official: true
  - id: apple-watch-heart-rate-manual
    title: 在 Apple Watch 上检查心率
    url: https://support.apple.com/zh-cn/guide/watch/apda88aefe4c/watchos
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-19
    publishedAt: null
    official: true
  - id: apple-watch-wear
    title: 佩戴 Apple Watch
    url: https://support.apple.com/zh-cn/118234
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-19
    publishedAt: 2026-03-12
    official: true
lastVerifiedAt: 2026-07-19
lastUpdatedAt: 2026-07-19
createdAt: 2026-07-19
relatedArticles:
  - apple-watch-battery-drains-fast
  - apple-watch-wont-charge-turn-on-red-lightning
  - apple-watch-wont-connect-pair-iphone
  - iphone-notifications-not-working-focus-summary-watch
popular: false
---

# Apple Watch 测不到心率或心率数据不显示

Apple Watch 没有心率读数，可能是设置被关闭、手腕检测未开启、表背没有稳定接触皮肤，也可能只是寒冷、汗水、纹身或运动方式让传感器暂时难以读取。先在“心率”App 中手动测试，再按设置、佩戴和场景逐项排查。

不要把“健康”App 暂时没有新数据直接等同于传感器损坏。Apple Watch 会按活动和状态获取后台读数，间隔可能变化；只有在设置、佩戴和多个场景都排除后仍完全没有读数，才适合联系 Apple 支持评估硬件。

---

## 症状

- “打开‘心率’App 一直没有读数。”
- “体能训练开始了，但心率区域是空白。”
- “Apple Watch 的心率没有同步到 iPhone 的‘健康’App。”
- “有时能测到，有时显示没有心率数据。”
- “换了表带、天气变冷或运动出汗后开始测不到。”

## 先判断是哪一种情况

1. **手动测量也没有读数**：优先检查心率权限、手腕检测、佩戴和传感器接触。
2. **手动能测到，只有后台没有数据**：检查手腕检测、低电量模式和佩戴稳定性；后台读数不会每秒更新。
3. **只有某种运动或天气下异常**：先考虑运动类型、寒冷、汗水、纹身和贴合度等测量条件。
4. **所有场景都完全没有读数**：在完成设置和佩戴排查后，联系 Apple 支持或授权服务提供商。

## 排查步骤

### 1. 打开“心率”App 手动测试

在 Apple Watch 上打开“心率”App，保持手腕静止并等待读数。再在 iPhone 的 Watch App 中检查“我的手表 > 隐私”里的心率权限，以及“我的手表 > 密码”里的“手腕检测”。

如果“手腕检测”关闭，Apple Watch 无法获得后台心率读数；如果心率权限关闭，相关测量和健康记录也会受影响。

### 2. 让表背稳定接触皮肤

将 Apple Watch 戴在腕骨以上的手腕外侧，调到舒适且不松动的位置。运动时可以适当收紧表带，但不要勒到疼痛、麻木或皮肤发白。

擦干手腕和表背，去除汗水、乳液和污渍后重新测试。水和汗会影响记录效果；表带太松、手表在手腕上滑动，也会让传感器难以保持接触。

### 3. 用静止状态和体能训练分别复测

先在温暖、干燥、静止的环境中手动测量，再开始一次与实际运动相符的体能训练。记录是两种状态都没有读数，还是只有寒冷、不规律运动或某种佩戴方式下异常。

皮肤灌注、寒冷、纹身和运动类型都可能影响光学心率传感器。节律性运动通常更容易获得稳定读数；一次异常高、低或缺失的读数不能单独用来判断手表或身体状况。

### 4. 排除低电量模式的副作用

在 Apple Watch 上打开“设置 > 电池”，确认是否开启“低电量模式”。如果问题只发生在低电量模式下，在电量充足时暂时关闭它，用相同佩戴和运动条件比较“心率”App、体能训练和“健康”App。

低电量模式会关闭或降低部分后台健康测量和通知。如果手动打开“心率”App 仍能读数，通常应先把问题归为模式影响，而不是立即认定传感器损坏。

### 5. 何时联系 Apple 支持

如果心率权限、手腕检测、佩戴贴合和传感器清洁都正常，而且“心率”App、体能训练和后台记录在多个场景都完全没有读数，请联系 Apple 支持或授权服务提供商。只有检测才能确认是否是传感器、主板或其他硬件故障。

不要自行拆开 Apple Watch 或尝试加热、冷冻、刮擦传感器。

## 健康安全提醒

Apple Watch 不能替代医生诊断，也不能检测心脏病发作。如果本人出现胸痛、胸闷、呼吸困难、晕厥或其他紧急症状，不要等待手表读数，应立即联系当地急救服务。

## 可能原因

1. 心率权限或“手腕检测”关闭，导致手动或后台测量受限。
2. 表背没有稳定接触皮肤，表带过松、位置过低、汗水或水分影响传感器。
3. 寒冷、纹身、皮肤灌注或不规律运动影响光学心率传感器。
4. 低电量模式降低或关闭部分后台健康测量。
5. 在设置和佩戴条件都正常时，才需要考虑传感器或其他硬件故障。

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 打开 Apple Watch 的“心率”App，保持手腕静止并等待读数。
2. 在 Apple Watch 上前往“设置 > 隐私与安全性 > 健康 > 心率”，确认心率已打开。
3. 在 iPhone 的 Watch App 中打开“我的手表 > 密码”，确认“手腕检测”已打开。
4. 将手表戴在腕骨以上的手腕外侧，擦干手腕和表背，并调整到舒适且不松动的位置。
5. 在温暖、干燥、静止的环境中手动复测，再用一次体能训练复测。
6. 检查“设置 > 电池”是否开启低电量模式；如只在该模式下缺少后台读数，在电量充足时暂时关闭后比较。
7. 如果所有场景都没有读数，联系 Apple 支持或授权服务提供商评估硬件。

参考来源：

- [Apple 支持：使用 Apple Watch 获得更加准确的测量结果](https://support.apple.com/zh-cn/105002)
- [Apple 支持：使用 Apple Watch 监测你的心率](https://support.apple.com/zh-cn/120277)
- [Apple 支持：在 Apple Watch 上检查心率](https://support.apple.com/zh-cn/guide/watch/apda88aefe4c/watchos)
- [Apple 支持：佩戴 Apple Watch](https://support.apple.com/zh-cn/118234)

## 零售排查流程

1. 先问是“心率”App 手动也没有读数，还是只有体能训练或后台健康记录缺失。
2. 记录 Apple Watch 型号、watchOS 版本、是否开启手腕检测、是否开启低电量模式。
3. 检查表带位置、贴合度、表背清洁、手腕干燥情况，并在静止状态复测。
4. 询问问题是否只发生在寒冷、纹身区域、出汗或某种不规律运动中。
5. 设置、佩戴和多个场景都排除后仍完全没有读数，转 Apple 支持或授权服务。

## 升级处理

联系 Apple 支持或授权服务提供商：

- “心率”App、体能训练和后台健康记录在多个场景都完全没有读数。
- 心率权限、手腕检测、佩戴贴合和传感器清洁均已确认正常。
- 心率缺失同时伴随表背损伤、进液、摔落、异常发热或其他硬件异常。

如果用户出现胸痛、胸闷、呼吸困难、晕厥或其他紧急症状，不要等待 Apple Watch 读数，应立即联系当地急救服务。

## 相关问题

- [Apple Watch 电池耗电太快或续航明显变短](/recipes/Apple%20Watch/apple-watch-battery-drains-fast)
- [Apple Watch 无法充电、不开机或显示红色闪电](/recipes/Apple%20Watch/apple-watch-wont-charge-turn-on-red-lightning)
- [Apple Watch 无法连接或无法与 iPhone 配对](/recipes/Apple%20Watch/apple-watch-wont-connect-pair-iphone)
- [iPhone 收不到通知、没有声音或延迟](/recipes/iPhone/iphone-notifications-not-working-focus-summary-watch)
