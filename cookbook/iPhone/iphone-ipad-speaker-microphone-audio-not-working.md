---
schemaVersion: 2
id: iphone-ipad-speaker-microphone-audio-not-working
title: iPhone 或 iPad 扬声器无声、通话听不清或麦克风没声音
slug: iphone-ipad-speaker-microphone-audio-not-working
summary: iPhone 或 iPad 外放、听筒、通话声音、录音或视频通话麦克风异常时，先分清输出、输入、App 权限、静音/音量、蓝牙音频路由、保护膜污垢和需要服务的硬件边界。
symptoms:
  - iPhone 扬声器没有声音
  - iPad 扬声器没有声音
  - iPhone 通话听不到对方
  - 对方听不到我的声音
  - 录音没有声音
  - 视频通话麦克风没声音
  - 听筒声音小或有杂音
  - 扬声器按钮变灰
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
  - Audio
  - Speaker
  - Microphone
  - FaceTime
keywords:
  - iPhone 没声音
  - iPhone 扬声器坏了
  - iPhone 麦克风没声音
  - 通话对方听不到
  - 听筒声音小
  - 录音没有声音
  - 视频会议麦克风
aliases:
  - iPhone no sound
  - iPhone speaker not working
  - iPad speaker not working
  - iPhone microphone not working
  - iPad microphone not working
  - caller cannot hear me
  - can't hear calls on iPhone
  - speaker button grayed out
  - audio not working on iPad
errorMessages:
  - 扬声器不可用
  - 麦克风不可用
  - 无法访问麦克风
  - 需要麦克风权限
officialTerms:
  - speaker
  - receiver
  - microphone
  - Ring/Silent switch
  - Do Not Disturb
  - Voice Memos
  - FaceTime
  - Bluetooth audio
communityTerms:
  - 听筒坏了
  - 外放没声
  - 免提灰色
  - 麦坏了
  - 对方听不到
difficulty: Quick
estimatedTime: 5-20 分钟；需要清洁或服务时更久
verificationLevel: Official
status: canonical
canonicalArticleId: null
solutions:
  - id: separate-output-input-and-route
    title: 先分清是输出、输入还是音频路由问题
    summary: Apple 的排障路径会分别测试扬声器、接收器和麦克风；先确定是听不到声音、对方听不到你，还是声音被送到蓝牙或其他设备。
    kind: recommended
    steps:
      - 问清楚故障发生在哪里：电话听筒、免提外放、媒体播放、闹钟铃声、语音备忘录、FaceTime、微信或某个会议 App。
      - 打开“控制中心”或当前 App 的音频选择，确认声音没有输出到 AirPods、蓝牙音箱、车机、AirPlay 或助听设备。
      - 断开不需要的蓝牙音频设备，再测试 iPhone 或 iPad 本机扬声器和麦克风。
      - 如果只有 AirPods 或蓝牙设备异常，转到耳机或蓝牙配件路径；不要把它当作本机扬声器或麦克风故障。
      - 如果只有一个第三方 App 异常，先检查该 App 的权限、音频输入输出选择和更新；如果电话、语音备忘录或 FaceTime 等 Apple App 也异常，再继续系统级排查。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-no-sound
      - apple-iphone-microphones
    warnings:
      - 不要在没有分清音频路由前直接建议抹掉设备或维修扬声器。
      - 不要要求用户发送含有隐私内容的录音；只需要确认是否有波形或能否听到测试音。
    limitations:
      - 本步骤只能定位大方向，不能单独证明扬声器、接收器或麦克风硬件是否损坏。
  - id: test-speaker-receiver-volume-and-silent-settings
    title: 测试扬声器、听筒、音量和静音相关设置
    summary: Apple 建议先检查静音开关、专注模式、音量和设置里的铃声，再播放测试音；如果听筒或扬声器仍没有声音、失真或有杂音，可能需要服务。
    kind: recommended
    steps:
      - 如果设备有响铃/静音开关，确认没有显示橙色；如果是操作按钮机型，确认当前动作没有让设备保持静音。
      - 关闭“专注模式”或“勿扰模式”，避免把通知、来电或提醒静音误判为扬声器坏。
      - 打开“设置”>“声音与触感”，拖动“铃声和提醒”滑块，听扬声器是否播放铃声。
      - 播放一段本地媒体或 Apple App 中的声音，并用侧边音量键把音量调高。
      - 打电话时分别测试贴近耳朵的接收器和免提扬声器；记录是只有听筒小声、只有免提无声，还是所有输出都无声。
      - 移除可能挡住接收器或扬声器开口的保护膜、壳、贴纸和脏污，必要时按 Apple 清洁指引轻柔清洁。
      - 如果扬声器按钮变灰、多个 Apple App 都无声、声音失真或有杂音，且重启和更新后仍复现，联系 Apple 支持或授权服务。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-no-sound
      - apple-cleaning-iphone
      - apple-cleaning-ipad
    warnings:
      - 不要把液体、压缩空气、尖锐工具或金属针伸入扬声器、听筒或麦克风开口。
      - 如果设备近期进水、摔落或维修过，避免反复提高音量测试造成进一步风险。
    limitations:
      - 铃声测试主要验证扬声器输出；通话接收器和 App 音频还需要分场景测试。
  - id: test-microphones-with-apple-apps-and-permissions
    title: 用 Apple App 和权限设置测试麦克风
    summary: Apple 建议用“语音备忘录”、相机视频或 FaceTime 等方式分辨麦克风是否工作；第三方 App 还要检查“隐私与安全性”里的麦克风权限。
    kind: recommended
    steps:
      - 打开“语音备忘录”录一小段测试音，播放时确认是否能听到自己的声音或看到录音波形。
      - 用“相机”录一段普通视频和一段自拍视频，分别播放，确认前后方向录制时是否都有声音。
      - 如果电话或 FaceTime 中对方听不到你，尝试免提、普通听筒、前后摄像头视频和另一个 Apple App 交叉测试。
      - 打开“设置”>“隐私与安全性”>“麦克风”，确认需要使用麦克风的第三方 App 已获得权限。
      - 如果某个 App 不在麦克风权限列表，先在 App 内触发一次麦克风请求，或重新安装/更新该 App 后再检查权限。
      - 移除挡住麦克风开口的手机壳、保护膜、贴纸或污垢，特别注意底部、听筒附近和后置摄像头附近的开口。
      - 如果 Apple App 录音也没有声音，或多个麦克风方向都失败，记录设备型号、系统版本、摔落进水史和测试结果后升级服务。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-microphones
      - apple-control-hardware-access
      - apple-cleaning-iphone
      - apple-cleaning-ipad
    warnings:
      - 麦克风测试可能录到私密谈话；只录无敏感内容的短测试音。
      - 不要把关闭隐私权限限制当成通用修复；只给实际需要麦克风的 App 授权。
    limitations:
      - 远程文章无法判断是单个麦克风、音频 IC、外壳遮挡、App 编码还是网络通话质量问题。
  - id: separate-call-network-and-service-boundaries
    title: 区分通话网络质量、App 问题和硬件服务边界
    summary: 通话断续、延迟或对方听不清不一定是麦克风坏；如果本机录音正常，优先看蜂窝/Wi-Fi、FaceTime 或第三方 App 的通话质量。
    kind: escalation
    steps:
      - 如果语音备忘录和相机视频录音正常，但电话、FaceTime 或某个会议 App 中声音断续，先按网络、运营商、App 和账号状态排查。
      - 如果只有蜂窝电话异常，测试 Wi-Fi 通话、FaceTime 音频或另一个通话 App，并记录信号、运营商和 SIM/eSIM 状态。
      - 如果只有 FaceTime 异常，检查 Apple 服务、网络连接和 FaceTime 设置；不要因为一次网络通话差就判断麦克风硬件坏。
      - 如果所有 Apple App 的录音和通话输入都失败，或扬声器/听筒输出同时异常，停止反复重置，联系 Apple 支持安排检测。
      - 如果设备有液体、摔落、非正规维修或开孔堵塞痕迹，把这些作为服务记录，不要承诺软件步骤一定能修复。
    verificationLevel: Official
    sourceIds:
      - apple-iphone-microphones
      - apple-iphone-no-sound
      - apple-facetime-iphone
    warnings:
      - 抹掉设备通常不是第一步；在备份和硬件边界清楚前不要让用户承担数据风险。
      - 不要承诺清洁、重启或系统更新能修复进液、跌落或部件损坏。
    limitations:
      - 本文不覆盖运营商语音服务、第三方会议平台服务器状态或 App 后台降噪算法的完整排查。
warnings:
  - 先分清本机扬声器/麦克风、蓝牙输出、App 权限和网络通话质量，不要直接判断硬件坏。
  - 清洁扬声器、听筒和麦克风开口时不要使用液体、尖锐工具或压缩空气。
  - 麦克风测试只录无敏感内容的短测试音，不要外发用户私密录音。
limitations:
  - 本文覆盖 iPhone 和 iPad 本机扬声器、接收器、麦克风和常见通话音频排障；不覆盖 AirPods 单侧无声、HomePod、Mac 音频接口、助听设备或车载蓝牙专项问题。
  - 本文不能远程确认音频芯片、扬声器、接收器、麦克风、进液或第三方维修造成的硬件故障。
sources:
  - id: apple-iphone-no-sound
    title: If you hear no sound or distorted sound from your iPhone or iPad speaker
    url: https://support.apple.com/en-us/118433
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: 2025-10-13
    official: true
  - id: apple-iphone-microphones
    title: If the microphones on your iPhone aren't working
    url: https://support.apple.com/en-us/101600
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: 2024-02-05
    official: true
  - id: apple-control-hardware-access
    title: Control access to hardware features on iPhone
    url: https://support.apple.com/guide/iphone/control-access-to-hardware-features-iph168c4bbd5/ios
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-15
    publishedAt: null
    official: true
  - id: apple-cleaning-iphone
    title: Cleaning your iPhone
    url: https://support.apple.com/en-us/108765
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: 2025-09-16
    official: true
  - id: apple-cleaning-ipad
    title: Cleaning your iPad
    url: https://support.apple.com/en-us/108765
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: 2025-09-16
    official: true
  - id: apple-facetime-iphone
    title: If you can't make or receive a FaceTime call on your iPhone or iPad
    url: https://support.apple.com/en-us/119859
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-15
    publishedAt: 2026-04-24
    official: true
lastVerifiedAt: 2026-07-15
lastUpdatedAt: 2026-07-15
createdAt: 2026-07-15
relatedArticles:
  - airpods-one-side-no-sound-volume-low
  - iphone-imessage-messages-not-sending-green-waiting-activation
  - iphone-sos-no-service-searching
popular: true
---

# iPhone 或 iPad 扬声器无声、通话听不清或麦克风没声音

iPhone 或 iPad “没声音”要先拆开看：是本机扬声器/听筒听不到、对方听不到你的麦克风、声音被送到蓝牙设备，还是只有某个通话 App 网络质量差。不要一开始就抹掉设备或判断扬声器、麦克风坏。

---

## 症状

- “iPhone 外放没有声音。”
- “打电话贴耳朵听不到，开免提才有声音。”
- “免提按钮变灰，通话没声音。”
- “对方说听不到我讲话。”
- “语音备忘录录出来没有声音。”
- “视频通话里麦克风没声音。”
- “iPad 看视频没有声音，但蓝牙耳机有声音。”
- “声音很小、破音、有杂音。”

---

## 可能原因

1. **音频输出走到了其他设备**
   - AirPods、蓝牙音箱、车机、AirPlay 或助听设备可能接管声音。
2. **音量、静音、专注模式或 App 设置影响声音**
   - 铃声静音、勿扰模式、App 内静音和通话中的音频选择都可能造成“没声音”的错觉。
3. **扬声器、听筒或麦克风开口被挡住**
   - 保护膜、手机壳、灰尘、贴纸、污垢或液体可能影响声音输入输出。
4. **第三方 App 没有麦克风权限或选错输入输出**
   - 某些会议、社交或录音 App 需要单独授权麦克风，并可能有自己的设备选择。
5. **网络通话质量或运营商路径异常**
   - FaceTime、微信、会议 App 或蜂窝电话的声音断续，不一定代表本机麦克风硬件坏。
6. **硬件或维修边界**
   - 多个 Apple App 都无法录音、扬声器按钮灰色、声音失真或设备有进液摔落史时，需要服务检测。

---

## Apple 官方方案

1. 断开 AirPods、蓝牙音箱、车机、AirPlay 和其他音频设备，测试本机扬声器。
2. 确认没有开启静音、专注模式或勿扰模式；把音量调高。
3. 打开**设置 > 声音与触感**，拖动“铃声和提醒”滑块，听是否有铃声。
4. 用电话分别测试听筒和免提；记录是听筒、扬声器还是两者都异常。
5. 用“语音备忘录”录一段无敏感内容的测试音，再播放检查麦克风。
6. 用“相机”录普通视频和自拍视频，分别播放检查不同方向的麦克风。
7. 检查**设置 > 隐私与安全性 > 麦克风**，给实际需要麦克风的 App 授权。
8. 移除挡住扬声器、听筒或麦克风开口的保护膜、手机壳、贴纸和污垢；不要用液体、尖锐工具或压缩空气清洁开口。
9. 如果重启、更新、清洁和权限检查后仍在多个 Apple App 中复现，联系 Apple 支持或授权服务提供商检测。

---

## 零售排查流程

### 听不到声音

1. 先确认声音没有输出到 AirPods、蓝牙、AirPlay、车机或助听设备。
2. 如果只有媒体没声音，检查当前 App 的音量、静音按钮、视频静音和输出设备。
3. 如果只有铃声、提醒或来电没声音，检查静音开关、操作按钮设置、专注模式和“声音与触感”。
4. 如果只有贴耳通话听筒声音小，移除屏幕保护膜或壳，确认接收器没有被挡住。
5. 如果只有免提无声或扬声器按钮变灰，重启并更新系统后再次测试。
6. 如果多个 Apple App 都无声、声音失真或有杂音，记录测试结果并联系 Apple 支持。

### 对方听不到你

1. 先确认不是连接了蓝牙耳机、车机或外接麦克风。
2. 用“语音备忘录”测试底部麦克风；用前后视频测试不同方向的麦克风。
3. 如果 Apple App 录音正常，只有某个第三方 App 异常，检查该 App 的麦克风权限、音频设备选择和更新。
4. 如果只有电话或 FaceTime 通话断续，但录音正常，按网络、运营商、FaceTime 或 App 服务质量排查。
5. 如果录音、视频和通话输入都没有声音，或声音只有杂音，停止反复重置，转服务检测。

### 清洁和保护膜注意

Apple 的清洁建议是轻柔、少量、避免液体进入开口。处理扬声器、听筒和麦克风时尤其要保守。

1. 先关机并拔掉线缆。
2. 取下不合适的壳、膜、贴纸和接口配件。
3. 用干燥、柔软、不起绒的布擦拭外表面。
4. 不要把水、酒精或清洁剂直接倒进开口。
5. 不要用针、牙签、金属工具或压缩空气清理网罩。
6. 如果怀疑进液、腐蚀或摔落，不要继续自行清洁开孔。

---

## 升级处理

- 扬声器按钮变灰，重启和更新后仍复现。
- 听筒、扬声器或麦克风在多个 Apple App 中都失败。
- “语音备忘录”和相机视频都录不到声音。
- 声音持续失真、有杂音，或音量明显异常。
- 设备近期进液、摔落、受压、拆修或更换过屏幕/外壳。
- 清洁和移除保护膜后仍无法改善。

升级前记录：设备型号、iOS/iPadOS 版本、是否连接蓝牙、哪些 App 失败、语音备忘录测试结果、前后视频测试结果、通话听筒/免提测试结果，以及是否有进液、摔落或维修史。

---

## 相关问题

- AirPods 只有一侧没声音或左右音量不一样：看 AirPods 单侧音频文章。
- iMessage 或 FaceTime 无法激活：这是账户、网络或服务激活路径。
- Mac 摄像头或会议 App 权限：看 Mac 摄像头/权限文章。
- 车载蓝牙、助听设备、第三方会议平台服务器或运营商语音服务专项故障，不按本文作为本机音频硬件处理。
