---
schemaVersion: 2
id: airpods-microphone-not-working-call-unclear
title: AirPods 麦克风没有声音、对方听不清或通话音质异常
slug: airpods-microphone-not-working-call-unclear
summary: >-
  使用 AirPods 通话、录音或视频会议时对方听不到、声音断续或很小，先确认通话输入确实使用 AirPods，检查“麦克风”位置设置，再区分 Mac 上蓝牙麦克风模式导致的音质降低与连接或硬件问题。
symptoms:
  - 对方听不到 AirPods 麦克风的声音
  - AirPods 通话时对方说声音很小或断断续续
  - 用 AirPods 录音或视频会议没有声音
  - 只有左边或右边 AirPod 的麦克风能用
  - AirPods 麦克风自动切到没有佩戴的那一只
  - Mac 连接 AirPods 后打开会议 App，音乐变得很闷或有杂音
  - AirPods 可以听到声音，但不能正常说话
devices:
  - AirPods
  - AirPods Pro
  - AirPods Max
  - iPhone
  - iPad
  - Mac
  - Apple Watch
platforms:
  - iOS
  - iPadOS
  - macOS
  - watchOS
systemVersions:
  - iOS 26 或当前支持版本
  - iPadOS 26 或当前支持版本
  - macOS Tahoe 或当前支持版本
categories:
  - AirPods
tags:
  - AirPods
  - Microphone
  - Phone Calls
  - FaceTime
  - Mac
keywords:
  - 麦克风
  - 通话
  - 录音
  - 对方听不清
  - 输入设备
  - 蓝牙麦克风模式
aliases:
  - AirPods microphone not working
  - AirPods mic not working
  - AirPods call microphone not working
  - AirPods 麦克风没声音
  - AirPods 通话对方听不见
  - AirPods 录音没有声音
  - AirPods 只有一边麦克风可用
errorMessages:
  - 对方听不到我的声音
  - 麦克风没有声音
  - 通话时声音很小或断断续续
officialTerms:
  - 麦克风
  - 自动切换 AirPods
  - 始终左 AirPod
  - 始终右 AirPod
  - 蓝牙耳机麦克风
communityTerms: []
difficulty: Quick
estimatedTime: 5-15 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: check-airpods-microphone-selection
    title: 先确认 AirPods 是通话或录音的输入设备
    summary: Apple 的 AirPods 使用手册允许在连接后指定麦克风位置；自动切换会选择任一只可用的 AirPod，也可以固定使用左侧或右侧。
    kind: recommended
    steps:
      - 在 iPhone、iPad 或 Mac 上确认 AirPods 已连接；如果尚未连接，先播放一段音频确认输出设备正确。
      - 在 iPhone 或 iPad 上前往“设置”，轻点屏幕顶部附近的 AirPods 名称；在 Mac 上打开“系统设置”，点按边栏中的 AirPods。
      - 打开“麦克风”，先选择“自动切换 AirPods”。如果只有一侧麦克风异常，可以分别测试“始终左 AirPod”和“始终右 AirPod”。
      - 重新加入电话、FaceTime 或视频会议，并在 App 的音频设置中再次选择 AirPods 作为麦克风；不要只确认扬声器输出。
      - 如果固定到某一侧后恢复，检查另一只 AirPod 是否被摘下、放在充电盒中或没有正常连接；这能区分麦克风选择问题与整副 AirPods 故障。
    verificationLevel: Official
    sourceIds:
      - apple-airpods-settings
      - apple-airpods-calls
    warnings:
      - “自动切换 AirPods”不是对麦克风硬件的维修或质量保证；固定一侧只是用于排查输入来源。
    limitations:
      - Apple 手册说明了麦克风位置选项，但没有承诺某一设置能解决所有通话或录音故障。
  - id: isolate-mac-bluetooth-microphone-mode
    title: Mac 打开会议或聊天 App 后音质降低时，先关闭占用麦克风的 App
    summary: Apple 说明，蓝牙耳机在使用内建麦克风时会切换到另一种蓝牙模式，音乐音质和音量可能降低，并可能出现静电或爆裂声。
    kind: recommended
    steps:
      - 如果问题只在 Mac 上打开视频会议、聊天或录音 App 后出现，先退出所有正在使用 AirPods 麦克风的 App。
      - 确认“系统设置”没有打开“声音”设置，然后重新试听音频。
      - 如果音质仍然降低，点按菜单栏中的“控制中心”>“声音”，先选择 Mac 内置扬声器，再重新选择 AirPods。
      - 如果需要通话，请在会议 App 中重新选择 AirPods 麦克风，并接受启用蓝牙麦克风后音乐质量可能降低的限制。
    verificationLevel: Official
    sourceIds:
      - apple-mac-bluetooth-headset-quality
    warnings:
      - 这是蓝牙音频模式的已知行为，不等同于 AirPods 麦克风已经损坏。
    limitations:
      - Apple 的此页面专门说明 Mac 上的音质降低，不适用于证明 iPhone 或 iPad 上的同一原因。
  - id: reconnect-and-reset-airpods-microphone
    title: 重新连接并重置 AirPods，区分连接状态与持续性故障
    summary: 当麦克风位置和 App 输入都正确但仍无声时，按 Apple 的连接和重置流程重新建立连接；不要在没有保留重要证据时反复抹除设备。
    kind: alternative
    steps:
      - 将 iPhone、iPad 或 Mac 更新到当前可用的最新系统版本，并确认两只 AirPods 都放在充电盒中且正在充电。
      - 在设备的蓝牙设置中确认 AirPods 已出现；如果出现但无法正常使用，合上充电盒等待 15 秒，再打开并重新连接。
      - 如果仍然异常，按照 AirPods 机型对应的 Apple 流程重置 AirPods，再重新配对并测试麦克风。
      - 先用系统电话或录音功能做最小测试，再回到第三方会议 App；如果只有某个 App 异常，检查该 App 的麦克风权限和输入设备。
      - 如果重置后在多个设备、多个 App 中都无法录音或通话，记录 AirPods 型号、系统版本、左右耳测试结果和是否受潮或摔落，再联系 Apple 支持或获取服务。
    verificationLevel: Official
    sourceIds:
      - apple-airpods-connect
      - apple-airpods-reset
    warnings:
      - 重置会清除配对状态；如果是二手 AirPods 的账户关联问题，重置不能替代原所有者移除“查找锁定”。
    limitations:
      - 没有设备日志和跨 App 测试结果时，不能远程判断是软件、连接、麦克风位置还是硬件故障。
  - id: mac-microphone-quality-escalation
    title: 多设备和多 App 都失败时停止重复尝试并升级处理
    summary: 如果正确选择输入、重新连接和重置后仍无法使用，保留现场信息并联系 Apple 支持；不要把未经 Apple 说明的清洁、拆机或第三方固件操作写成官方方案。
    kind: escalation
    steps:
      - 记录 AirPods 的具体型号、固件版本（如设备可查看）、配对设备型号和系统版本。
      - 记录问题是否只发生在左侧、右侧、Mac 或某个 App，以及使用内置麦克风时是否正常。
      - 如果 AirPods 在多个兼容设备和系统 App 中都没有麦克风输入，停止自行拆解或使用液体清洁麦克风开口。
      - 联系 Apple 支持或获取服务，并提供上述对照结果。
    verificationLevel: Official
    sourceIds:
      - apple-airpods-reset
      - apple-airpods-settings
    warnings:
      - 本文不建议拆开 AirPods，也不把非 Apple 社区方法标记为官方方案。
    limitations:
      - Apple 中文官方资料没有为所有 AirPods 麦克风故障提供单独的硬件诊断流程。
warnings:
  - 先区分“能听见但对方听不见”与“整个 AirPods 无法连接”；不要把麦克风输入问题当作扬声器无声处理。
  - 在多个 App 中测试时，不要同时让多个 App 占用蓝牙耳机麦克风。
  - 如果设备曾进液、严重摔落或发热异常，停止继续使用并联系 Apple 支持。
limitations:
  - 本文覆盖 AirPods 在电话、FaceTime、录音、视频会议和 Mac 蓝牙音频中的麦克风输入排查，不覆盖 iPhone 或 iPad 内置麦克风硬件故障。
  - Mac 使用蓝牙麦克风时的音质下降是 Apple 说明的模式限制，不代表所有“对方听不清”都由该原因造成。
  - 第三方 App 的麦克风权限、输入选择和网络质量需要在对应 App 中单独核对。
sources:
  - id: apple-airpods-settings
    title: 更改 AirPods 或 AirPods Pro 设置
    url: https://support.apple.com/zh-cn/guide/airpods/dev57e5b7e58/web
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: apple-airpods-calls
    title: 使用 AirPods 3、AirPods 4 或 AirPods Pro 接打电话
    url: https://support.apple.com/zh-cn/guide/airpods/devac96438de/web
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: apple-mac-bluetooth-headset-quality
    title: 如果将蓝牙耳机与 Mac 配合使用时音质降低
    url: https://support.apple.com/zh-cn/102217
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: apple-airpods-connect
    title: 如果 AirPods 或 AirPods Pro 无法连接
    url: https://support.apple.com/zh-cn/118576
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
  - id: apple-airpods-reset
    title: 如何重置 AirPods 和 AirPods Pro
    url: https://support.apple.com/zh-cn/118531
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-18
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-18
lastUpdatedAt: 2026-07-18
createdAt: null
relatedArticles:
  - airpods-wont-connect-pair-reset
  - airpods-one-side-no-sound-volume-low
  - iphone-ipad-speaker-microphone-audio-not-working
popular: false
---

# AirPods 麦克风没有声音、对方听不清或通话音质异常

使用 AirPods 通话、录音或视频会议时，对方听不到、声音断续或很小，先确认通话或 App 使用的是 AirPods 麦克风，再检查“麦克风”位置设置。Mac 上如果只是打开会议 App 后音乐变闷、变小或出现杂音，优先按蓝牙麦克风模式排查。

---

## 症状

- “对方听不到我的声音。”
- “AirPods 可以听歌，但通话时别人听不见。”
- “录音或视频会议没有录到 AirPods 的声音。”
- “只有左边或右边 AirPod 的麦克风能用。”
- “Mac 打开会议 App 后音乐变得很闷或有杂音。”

---

## 可能原因

1. **App 仍在使用设备内置麦克风**：能听到 AirPods 的声音，不代表通话输入已经切换到 AirPods。
2. **麦克风位置固定到了未佩戴或异常的一侧**：AirPods 可以自动选择任一只，也可以固定使用左侧或右侧。
3. **Mac 进入蓝牙麦克风模式**：Apple 说明，蓝牙耳机同时用于播放和麦克风时，音频质量和音量可能下降，并可能出现静电或爆裂声。
4. **连接状态或单侧耳机状态异常**：配对记录、充电接触或某一侧没有正常连接，都可能影响测试结果。
5. **第三方 App、系统或硬件问题**：如果只有一个 App 失败，先核对该 App 的权限和输入设备；多个设备和 App 都失败时才升级判断。

---

## 先判断问题发生在哪里

1. 如果你能听到对方，但对方听不到你，先检查麦克风输入；这不是单纯的播放音量问题。
2. 如果只有 Mac 在打开会议或聊天 App 后音乐质量下降，优先看 [Mac 蓝牙耳机音质降低](https://support.apple.com/zh-cn/102217) 的情况。
3. 如果 AirPods 在蓝牙列表中消失或根本无法连接，先转到 [AirPods 无法连接或重新配对](https://cookbook.wuxiela.fun/recipes/AirPods/airpods-wont-connect-pair-reset)。

---

## Apple 官方方案

验证级别：Apple 官方

### 1. 设置 AirPods 的麦克风位置

1. 确认 AirPods 已连接到 iPhone、iPad 或 Mac。
2. 在 iPhone 或 iPad 上前往“设置”，轻点屏幕顶部附近的 AirPods 名称；在 Mac 上打开“系统设置”，点按边栏中的 AirPods。
3. 轻点或点按“麦克风”。
4. 先选择“自动切换 AirPods”。如果怀疑某一侧没有正常工作，可以分别测试“始终左 AirPod”和“始终右 AirPod”。
5. 重新加入电话、FaceTime 或视频会议，并在 App 的音频设置中确认输入设备也是 AirPods。

Apple 说明，“自动切换 AirPods”会让任一只 AirPod 充当麦克风；如果只使用其中一只，那么这只会用作麦克风。固定左右两侧是排查输入来源的对照测试，不是硬件维修。

### 2. Mac 打开会议 App 后音质降低

如果问题表现为 Mac 上音乐变闷、音量变小、出现静电或爆裂声，而不是完全没有麦克风输入：

1. 退出所有使用蓝牙耳机麦克风的 App，例如视频会议或聊天 App。
2. 确认“系统设置”没有打开，也没有显示“声音”设置。
3. 如果仍然降低，点按菜单栏中的“控制中心”>“声音”，先选择 Mac 内置扬声器，再重新选择 AirPods。
4. 重新打开会议 App 后，接受蓝牙耳机使用麦克风时音频质量可能降低的限制。

Apple 说明，蓝牙耳机同时用于听取音频和通过麦克风说话时，会切换到另一种模式，直到麦克风不再使用。

### 3. 重新连接并重置

1. 将 iPhone、iPad 或 Mac 更新到当前可用的最新系统版本。
2. 将两只 AirPods 放入充电盒，并确认两只都在充电。
3. 在设备上确认蓝牙已打开，并通过控制中心的音频输出选择 AirPods。
4. 如果 AirPods 出现但无法正常使用，合上盒盖等待 15 秒，再打开并重新连接。
5. 如果仍然异常，按照 AirPods 机型对应的 [Apple 重置流程](https://support.apple.com/zh-cn/118531) 重置，再重新配对。
6. 先用系统电话或录音功能测试，再回到第三方 App；若只有一个 App 异常，检查该 App 的麦克风权限和输入设备。

---

## 零售排查流程

如果你是在购买或转交 AirPods 前做功能检查，可以按下面顺序保留可复现证据：

1. 在 iPhone 的蓝牙设置中连接 AirPods，确认左右两只都显示并有电。
2. 用系统电话或录音功能测试“自动切换 AirPods”，再分别固定左、右 AirPod 测试。
3. 播放录音，确认是否能听到自己的声音；通话测试时让对方明确反馈音量、断续和杂音。
4. 如果只在 Mac 会议 App 中出现音质降低，区分这是蓝牙麦克风模式限制还是完全没有麦克风输入。
5. 记录型号、系统版本、左右耳结果和测试 App；不要仅凭音乐能播放就判断麦克风正常。

---

## 升级处理

如果正确选择了 AirPods 麦克风、重新连接并重置后，在多个设备和多个 App 中仍然没有输入：

- 记录 AirPods 型号、配对设备、系统版本，以及左、右 AirPod 分别测试的结果。
- 如果 AirPods 曾进液、严重摔落或出现异常发热，停止继续使用并联系 Apple 支持。
- 不要拆开 AirPods，也不要把未经 Apple 说明的清洁、拆机或第三方固件操作当作官方方案。

Apple 中文官方资料没有为所有 AirPods 麦克风故障提供单独的硬件诊断流程；持续失败时应获取 Apple 支持或服务。\n\n---

## 相关问题

- [AirPods 无法连接或重新配对](https://cookbook.wuxiela.fun/recipes/AirPods/airpods-wont-connect-pair-reset)：蓝牙列表中找不到、无法配对或重置后仍无法连接。
- [AirPods 只有一只耳机有声音或左右音量不一样](https://cookbook.wuxiela.fun/recipes/AirPods/airpods-one-side-no-sound-volume-low)：主要处理播放输出单侧无声，不等同于麦克风输入失败。
- [iPhone 或 iPad 扬声器无声、通话听不清或麦克风没声音](https://cookbook.wuxiela.fun/recipes/iPhone/iphone-ipad-speaker-microphone-audio-not-working)：处理设备内置扬声器和麦克风，而不是 AirPods 麦克风。

---

## 参考来源

- [Apple 支持：更改 AirPods 或 AirPods Pro 设置](https://support.apple.com/zh-cn/guide/airpods/dev57e5b7e58/web)
- [Apple 支持：使用 AirPods 3、AirPods 4 或 AirPods Pro 接打电话](https://support.apple.com/zh-cn/guide/airpods/devac96438de/web)
- [Apple 支持：如果将蓝牙耳机与 Mac 配合使用时音质降低](https://support.apple.com/zh-cn/102217)
- [Apple 支持：如果 AirPods 或 AirPods Pro 无法连接](https://support.apple.com/zh-cn/118576)
- [Apple 支持：如何重置 AirPods 和 AirPods Pro](https://support.apple.com/zh-cn/118531)
