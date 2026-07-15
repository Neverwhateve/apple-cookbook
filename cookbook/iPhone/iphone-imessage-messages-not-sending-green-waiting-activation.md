---
schemaVersion: 2
id: iphone-imessage-messages-not-sending-green-waiting-activation
title: iPhone 无法发送或接收信息，iMessage 变绿色或等待激活
slug: iphone-imessage-messages-not-sending-green-waiting-activation
summary: >-
  顾客看到“尚未送达”、收不到短信、iMessage 变成绿色气泡，或“信息”一直显示正在等待激活时，先分清楚是
  iMessage、RCS、短信/彩信，还是电话号码激活问题。最快路径是先保证网络和运营商短信服务可用，再检查 iMessage
  登录、发送与接收地址、“开始新对话时使用”的号码选择和新机号码激活。
symptoms:
  - “蓝色 iMessage 突然变成绿色。”
  - “一直显示尚未送达。”
  - “换新 iPhone 后 iMessage 等待激活。”
  - “别人能发给我，我发不出去。”
  - “只能用 Apple 账户邮箱发，手机号不能用。”
  - “更新 iOS 26 后，同一个手机号在发送与接收里出现两次。”
  - “验证码短信收不到。”
  - “RCS 一直激活不了。”
  - “换到安卓后收不到 iPhone 朋友发来的短信。”
  - “新信息总是从邮箱发出去，不是手机号。”
  - “设置新 iPhone 时 eSIM 没激活，后来信息一直是绿色。”
devices:
  - iPhone
  - iPad
  - Mac
platforms: []
systemVersions:
  - iOS 26
  - iOS 18
  - iOS 26.1
  - iOS 26.5
categories:
  - iPhone
tags:
  - iPhone
  - iPad
  - Mac
  - Messages
  - iMessage
  - RCS
  - SMS
  - Carrier
  - Apple Account
keywords: []
aliases:
  - iMessage not sending
  - iMessage waiting for activation
  - iMessage green bubbles
  - messages not delivered
  - iPhone not receiving texts
  - RCS not activating iPhone
  - RCS setting missing iPhone
  - RCS Business Messages iPhone
  - inactive SIM iMessage activation
  - duplicate phone number iMessage
  - iPhone 信息发不出去
  - iMessage 正在等待激活
  - iMessage 变绿色
  - 信息尚未送达
  - iPhone 收不到验证码短信
  - 同一手机号显示两次
  - iMessage 用邮箱发送不是手机号
errorMessages: []
officialTerms: []
communityTerms: []
difficulty: Moderate
estimatedTime: null
verificationLevel: Official
status: canonical
canonicalArticleId: iphone-imessage-messages-not-sending-green-waiting-activation
solutions:
  - id: solution-079608cb4ff8
    title: Apple 官方方案
    summary: null
    kind: recommended
    steps:
      - 先看气泡颜色和错误文字。蓝色是 iMessage；绿色是 RCS、短信或彩信；“尚未送达”“等待激活”“需要验证”分别走不同分支。
      - 确认 iPhone 或 iPad 可以使用 Wi-Fi 或蜂窝数据访问互联网。
      - 如果看到红色感叹号和“尚未送达”，先轻点感叹号并选择重试；如果仍失败，再轻点感叹号并选择用短信发送。
      - 如果无法发送或接收普通短信、彩信或 RCS，先联系运营商确认短信服务套餐、号码状态、RCS 支持和彩信支持。
      - 打开设置 App 信息，确认iMessage 信息已打开。
      - 轻点发送与接收，确认顾客的电话号码和 Apple 账户都在“通过下列方式收发 iMessage 信息”中被选中。
      - >-
        如果顾客专门问 RCS，打开设置 App 信息 RCS 信息，确认 RCS 已开启；如果看不到这个入口，先判断运营商或地区是否支持 iPhone
        RCS。
      - 如果刚打开 RCS 后仍不可用，先告知可能有短暂延迟；不要把所有绿色气泡都当作 iMessage 故障。
      - >-
        如果是新 iPhone 或刚转移 eSIM / SIM，等待号码完成 iMessage 激活；期间可临时使用 Apple 账户邮箱收发
        iMessage。
      - 如果 iMessage 不可用时需要自动改发短信，打开设置 App 信息 用短信发送。
      - 如果看到“正在等待激活”，关闭 iMessage 和 FaceTime，重新启动设备，再重新打开 iMessage 和 FaceTime。
      - 确认设置 通用 日期与时间中的时区正确。
      - >-
        如果新信息总是从 Apple 账户邮箱发出，打开设置 App 信息
        发送与接收，在开始新对话时使用下选择电话号码；如果旧对话最初由邮箱开始，需要开始一条新对话才能改用号码。
      - >-
        如果设置装有 iOS 26 的新 iPhone 时 eSIM 或 iMessage 没有激活，稍后完成 eSIM 设置后，回到设置 App
        信息，关闭再打开 iMessage 信息。
      - >-
        如果更新至 iOS 26 后电话号码无法激活、信息改用邮箱发送，或同一号码在设置 App 信息 发送与接收中显示两次，先更新到 iOS 26.1
        或更高版本。
      - >-
        如果更新后仍看到同号重复，打开设置 蜂窝网络，找到已失效的同号 SIM；实体 SIM 直接取出，eSIM 则删除已失效 eSIM，再回到设置
        App 信息 发送与接收选择电话号码。
      - 如果 24 小时后电话号码旁边仍没有勾号，联系运营商确认可以发送和接收国际短信；Apple 说明运营商最长可能需要 24 小时验证电话号码。
      - >-
        如果 Apple 账户或邮箱登录 iMessage / FaceTime 也失败，按 Apple
        的在线激活流程尝试启用账户，或改用已验证的电子邮件地址登录。
      - >-
        如果某个联系人一直显示绿色，确认对方是否使用 Apple 设备、是否打开 iMessage，以及你发送到的电话号码或邮箱是否在对方
        iMessage“发送与接收”中可用。
      - >-
        如果顾客已经换到非 Apple 手机，把 SIM 卡装回原 iPhone 并连接蜂窝数据，在设置 App 信息关闭 iMessage，再关闭
        FaceTime；如果 iPhone 不在身边，使用 Apple 的在线注销 iMessage 工具。
    verificationLevel: Official
    sourceIds:
      - official-02aaf4af40c5
      - official-8e5caa164f4c
      - official-669feede652b
      - official-6cbaad3b0736
      - official-b1a4935f9255
      - official-c37876046c62
      - official-b6abc525eaf0
      - official-1799b9b92fb4
      - official-c476076362b4
      - official-83aa71e3c4ea
    warnings: []
    limitations: []
warnings: []
limitations: []
sources:
  - id: official-02aaf4af40c5
    title: Apple 支持：如果你无法在 iPhone 或 iPad 上发送或接收信息
    url: 'https://support.apple.com/zh-cn/118433'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-8e5caa164f4c
    title: Apple 支持：如果你无法在 iPhone 上打开或登录 iMessage 信息或 FaceTime 通话
    url: 'https://support.apple.com/zh-cn/119859'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-669feede652b
    title: Apple 支持：如果无法在 iOS 26 中用你的电话号码激活 iMessage 信息
    url: 'https://support.apple.com/zh-cn/125367'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-6cbaad3b0736
    title: Apple 支持：如果你的 iPhone 使用你的电子邮件地址发送短信
    url: 'https://support.apple.com/zh-cn/101744'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-b1a4935f9255
    title: Apple 支持：如果 iPhone 上的信息显示为绿色
    url: 'https://support.apple.com/zh-cn/105087'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-c37876046c62
    title: Apple 支持：iMessage 信息、RCS 和短信/彩信有什么区别？
    url: 'https://support.apple.com/zh-cn/104972'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-b6abc525eaf0
    title: Apple 支持：在 iPhone 上打开 RCS 信息
    url: 'https://support.apple.com/zh-cn/122195'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-1799b9b92fb4
    title: Apple 支持：在“信息”或 FaceTime 通话中添加或移除你的电话号码
    url: 'https://support.apple.com/zh-cn/108758'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-c476076362b4
    title: Apple 支持：在 iPhone 上或在线注销 iMessage 信息
    url: 'https://support.apple.com/zh-cn/102455'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-83aa71e3c4ea
    title: Apple 旧版引文（原始标题未记录）
    url: 'https://support.apple.com/zh-cn/guide/iphone/iph3d039b67/ios'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: community-06d6f0d727e4
    title: Apple Support Community 旧版引文（原始标题未记录）
    url: 'https://discussions.apple.com/thread/255954997'
    publisher: Apple Support Community
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-f34b559e2c52
    title: Apple Support Community 旧版引文（原始标题未记录）
    url: 'https://discussions.apple.com/thread/255870381'
    publisher: Apple Support Community
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-384736fbb4e4
    title: Apple Support Community 旧版引文（原始标题未记录）
    url: 'https://discussions.apple.com/thread/256201662'
    publisher: Apple Support Community
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-d632f4004f95
    title: discussionschinese.apple.com 旧版引文（原始标题未记录）
    url: 'https://discussionschinese.apple.com/thread/254643097'
    publisher: discussionschinese.apple.com
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-2abe61cc3d4d
    title: Reddit 旧版引文（原始标题未记录）
    url: >-
      https://www.reddit.com/r/iphone/comments/1swc6ny/got_new_phones_for_me_and_my_wife_imessage_isnt/
    publisher: Reddit
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-8a76c3be8c7d
    title: Reddit 旧版引文（原始标题未记录）
    url: >-
      https://www.reddit.com/r/iphone/comments/1tes8ma/rcs_messaging_wont_activate_on_my_iphone_what_is_going_on/
    publisher: Reddit
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
lastVerifiedAt: '2026-07-14'
lastUpdatedAt: '2026-07-14'
createdAt: null
relatedArticles:
  - iphone-esim-setup-transfer-fails
  - iphone-invalid-sim-no-sim
  - iphone-sos-no-service-searching
  - iphone-ipad-wifi-no-internet-unable-to-join
popular: false
---

# iPhone 无法发送或接收信息，iMessage 变绿色或等待激活

顾客看到“尚未送达”、收不到短信、iMessage 变成绿色气泡，或“信息”一直显示正在等待激活时，先分清楚是 iMessage、RCS、短信/彩信，还是电话号码激活问题。最快路径是先保证网络和运营商短信服务可用，再检查 iMessage 登录、发送与接收地址、“开始新对话时使用”的号码选择和新机号码激活。

---

## 症状

- “蓝色 iMessage 突然变成绿色。”
- “一直显示尚未送达。”
- “换新 iPhone 后 iMessage 等待激活。”
- “别人能发给我，我发不出去。”
- “只能用 Apple 账户邮箱发，手机号不能用。”
- “更新 iOS 26 后，同一个手机号在发送与接收里出现两次。”
- “验证码短信收不到。”
- “RCS 一直激活不了。”
- “换到安卓后收不到 iPhone 朋友发来的短信。”
- “新信息总是从邮箱发出去，不是手机号。”
- “设置新 iPhone 时 eSIM 没激活，后来信息一直是绿色。”

---

## 可能原因

1. **信息类型不同**
   - Apple 说明，iMessage 使用 Wi-Fi 或蜂窝数据发送，显示蓝色气泡；RCS、短信和彩信由运营商短信服务提供，显示绿色气泡。
2. **iMessage 暂时不可用或没有打开**
   - Apple 说明，绿色气泡可能是因为顾客或收件人的设备关闭了 iMessage，或 iMessage 暂时不可用。
3. **新设备需要更新“信息”设置**
   - Apple 说明，设置新设备后可能需要更新“信息”设置；电话号码没有被选中时，iMessage 可能改用 Apple 账户邮箱或退回短信/RCS。
4. **运营商短信服务、RCS 或彩信没有正常工作**
   - Apple 说明，短信、彩信和 RCS 需要运营商服务支持；RCS 还需要 iOS 18 或更高版本和支持 iPhone RCS 的运营商短信服务套餐。
5. **iMessage 或 FaceTime 激活未完成**
   - Apple 说明，激活可能需要蜂窝数据或 Wi-Fi，iPhone 使用电话号码激活 iMessage/FaceTime 时可能会通过短信完成，且可能产生运营商费用。
6. **iOS 26 中存在同号的已失效 SIM 卡**
   - Apple 说明，更新至 iOS 26 后，如果已激活 SIM 卡号码与一张已失效 SIM 卡相同，可能无法用电话号码激活 iMessage，表现为绿色气泡、用邮箱发送或同一号码在“发送与接收”中显示两次。
7. **新对话默认从 Apple 账户邮箱发出**
   - Apple 说明，可以在“开始新对话时使用”中选择电话号码；如果现有对话是用邮箱开始的，想改用电话号码需要开始新对话。
8. **设置 iOS 26 新 iPhone 时 eSIM 或 iMessage 没有完成激活**
   - Apple 说明，稍后在“设置”中设置 eSIM 后，iMessage 可能不会自动激活，可能显示“尚未送达”、绿色短信/RCS，或来自邮箱而不是电话号码。
9. **电话号码仍注册在旧 iPhone 的 iMessage 上**
   - Apple 提供了在 iPhone 上或在线注销 iMessage 的流程，用于换到非 Apple 手机后仍收不到短信的场景。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先看气泡颜色和错误文字。蓝色是 iMessage；绿色是 RCS、短信或彩信；“尚未送达”“等待激活”“需要验证”分别走不同分支。
2. 确认 iPhone 或 iPad 可以使用 Wi-Fi 或蜂窝数据访问互联网。
3. 如果看到红色感叹号和“尚未送达”，先轻点感叹号并选择**重试**；如果仍失败，再轻点感叹号并选择**用短信发送**。
4. 如果无法发送或接收普通短信、彩信或 RCS，先联系运营商确认短信服务套餐、号码状态、RCS 支持和彩信支持。
5. 打开**设置 > App > 信息**，确认**iMessage 信息**已打开。
6. 轻点**发送与接收**，确认顾客的电话号码和 Apple 账户都在“通过下列方式收发 iMessage 信息”中被选中。
7. 如果顾客专门问 RCS，打开**设置 > App > 信息 > RCS 信息**，确认 RCS 已开启；如果看不到这个入口，先判断运营商或地区是否支持 iPhone RCS。
8. 如果刚打开 RCS 后仍不可用，先告知可能有短暂延迟；不要把所有绿色气泡都当作 iMessage 故障。
9. 如果是新 iPhone 或刚转移 eSIM / SIM，等待号码完成 iMessage 激活；期间可临时使用 Apple 账户邮箱收发 iMessage。
10. 如果 iMessage 不可用时需要自动改发短信，打开**设置 > App > 信息 > 用短信发送**。
11. 如果看到“正在等待激活”，关闭 iMessage 和 FaceTime，重新启动设备，再重新打开 iMessage 和 FaceTime。
12. 确认**设置 > 通用 > 日期与时间**中的时区正确。
13. 如果新信息总是从 Apple 账户邮箱发出，打开**设置 > App > 信息 > 发送与接收**，在**开始新对话时使用**下选择电话号码；如果旧对话最初由邮箱开始，需要开始一条新对话才能改用号码。
14. 如果设置装有 iOS 26 的新 iPhone 时 eSIM 或 iMessage 没有激活，稍后完成 eSIM 设置后，回到**设置 > App > 信息**，关闭再打开 **iMessage 信息**。
15. 如果更新至 iOS 26 后电话号码无法激活、信息改用邮箱发送，或同一号码在**设置 > App > 信息 > 发送与接收**中显示两次，先更新到 iOS 26.1 或更高版本。
16. 如果更新后仍看到同号重复，打开**设置 > 蜂窝网络**，找到已失效的同号 SIM；实体 SIM 直接取出，eSIM 则删除已失效 eSIM，再回到**设置 > App > 信息 > 发送与接收**选择电话号码。
17. 如果 24 小时后电话号码旁边仍没有勾号，联系运营商确认可以发送和接收国际短信；Apple 说明运营商最长可能需要 24 小时验证电话号码。
18. 如果 Apple 账户或邮箱登录 iMessage / FaceTime 也失败，按 Apple 的在线激活流程尝试启用账户，或改用已验证的电子邮件地址登录。
19. 如果某个联系人一直显示绿色，确认对方是否使用 Apple 设备、是否打开 iMessage，以及你发送到的电话号码或邮箱是否在对方 iMessage“发送与接收”中可用。
20. 如果顾客已经换到非 Apple 手机，把 SIM 卡装回原 iPhone 并连接蜂窝数据，在**设置 > App > 信息**关闭 iMessage，再关闭 FaceTime；如果 iPhone 不在身边，使用 Apple 的在线注销 iMessage 工具。

参考来源：

- [Apple 支持：如果你无法在 iPhone 或 iPad 上发送或接收信息](https://support.apple.com/zh-cn/118433)
- [Apple 支持：如果你无法在 iPhone 上打开或登录 iMessage 信息或 FaceTime 通话](https://support.apple.com/zh-cn/119859)
- [Apple 支持：如果无法在 iOS 26 中用你的电话号码激活 iMessage 信息](https://support.apple.com/zh-cn/125367)
- [Apple 支持：如果你的 iPhone 使用你的电子邮件地址发送短信](https://support.apple.com/zh-cn/101744)
- [Apple 支持：如果 iPhone 上的信息显示为绿色](https://support.apple.com/zh-cn/105087)
- [Apple 支持：iMessage 信息、RCS 和短信/彩信有什么区别？](https://support.apple.com/zh-cn/104972)
- [Apple 支持：在 iPhone 上打开 RCS 信息](https://support.apple.com/zh-cn/122195)
- [Apple 支持：在“信息”或 FaceTime 通话中添加或移除你的电话号码](https://support.apple.com/zh-cn/108758)
- [Apple 支持：在 iPhone 上或在线注销 iMessage 信息](https://support.apple.com/zh-cn/102455)

---

## RCS、短信和彩信分流

验证级别：Apple 官方

1. 如果是绿色气泡，不要直接判断 iMessage 坏了。Apple 说明绿色气泡代表这条信息通过 RCS、短信或彩信发送，而不是 iMessage。
2. 在 iPhone 上打开 RCS 的入口是**设置 > App > 信息 > RCS 信息**。
3. RCS 需要 iOS 18 和支持 iPhone RCS 的运营商短信服务套餐；可用性会因地区和运营商而异。
4. Apple 说明，刚打开 RCS 后可能会有短暂延迟。如果 **RCS 信息**设置没有出现，RCS 可能不可用。
5. iOS 26 中可以选择用于短信、彩信和 RCS 的默认信息 App；如果顾客改过默认 App，也要确认当前发送路径。
6. 如果要在 RCS 对话中使用端到端加密，需要 iOS 26.5 以及支持端到端加密的运营商；Beta 功能会随运营商逐步推出。
7. 如果普通短信、彩信或 RCS 失败，优先转运营商确认服务、套餐、号码状态和区域支持；Apple 不提供运营商短信服务。

参考来源：

- [Apple 支持：iMessage 信息、RCS 和短信/彩信有什么区别？](https://support.apple.com/zh-cn/104972)
- [Apple 支持：在 iPhone 上打开 RCS 信息](https://support.apple.com/zh-cn/122195)
- [Apple 支持：如果你无法在 iPhone 或 iPad 上发送或接收信息](https://support.apple.com/zh-cn/118433)

---

## iOS 26 更新后只能用邮箱发送或手机号显示两次

验证级别：Apple 官方

1. 先确认是否符合这个特定症状：更新到 iOS 26 后，电话号码无法激活 iMessage、绿色气泡增多、信息改用 Apple 账户邮箱发送，或同一电话号码在**发送与接收**中显示两次。
2. 将 iPhone 更新到 iOS 26.1 或更高版本。
3. 打开**设置 > 蜂窝网络**，检查是否有两张 SIM 显示相同电话号码。
4. 如果其中一张已经失效，实体 SIM 直接取出；已失效 eSIM 则轻点并删除 eSIM。
5. 回到**设置 > App > 信息 > 发送与接收**，选择要用于 iMessage 的电话号码。
6. 如果号码仍无法激活，回到通用 iMessage 激活流程，确认网络、日期时间、运营商短信服务和最长 24 小时等待条件。

参考来源：

- [Apple 支持：如果无法在 iOS 26 中用你的电话号码激活 iMessage 信息](https://support.apple.com/zh-cn/125367)

---

## 新信息从邮箱发送，不是手机号

验证级别：Apple 官方

1. 打开**设置 > App > 信息 > 发送与接收**。
2. 在**开始新对话时使用**下选择顾客想使用的电话号码。
3. 确认电话号码也在“通过下列方式收发 iMessage 信息”中被选中。
4. 如果电话号码无法选择，回到 iMessage 激活分支，确认 SIM/eSIM、运营商短信、日期时间、系统更新和 24 小时等待条件。
5. 如果现有对话是用邮箱地址开始的，Apple 说明需要开始新的对话，之后新信息才会从电话号码发出。

参考来源：

- [Apple 支持：如果你的 iPhone 使用你的电子邮件地址发送短信](https://support.apple.com/zh-cn/101744)
- [Apple 支持：在“信息”或 FaceTime 通话中添加或移除你的电话号码](https://support.apple.com/zh-cn/108758)

---

## iOS 26 新机先跳过 eSIM，后来 iMessage 没有自动激活

验证级别：Apple 官方

1. 先确认是否符合这个特定场景：设置装有 iOS 26 的新 iPhone 时，eSIM 或 iMessage 没有完成激活；稍后设置 eSIM 后，信息显示“尚未送达”、绿色短信/RCS，或来自邮箱而不是电话号码。
2. 打开**设置 > App > 信息**。
3. 关闭 **iMessage 信息**。
4. 等待片刻后重新打开 **iMessage 信息**。
5. 回到**发送与接收**，确认电话号码被选中。
6. 如果电话号码仍无法激活，按通用 iMessage 激活流程处理，并联系运营商确认国际短信能力。

参考来源：

- [Apple 支持：如果你无法在 iPhone 上打开或登录 iMessage 信息或 FaceTime 通话](https://support.apple.com/zh-cn/119859)

---

## 已验证的非官方处理思路

非官方

### 让运营商刷新短信、eSIM 或号码配置

- 来源：Apple 官方要求短信/RCS/彩信问题联系运营商；Apple Support Community 和 Reddit 中，新机、换运营商、eSIM 转移后 iMessage 或 RCS 激活失败的讨论常指向号码或运营商配置。
- 成功概率：中等，尤其适合普通短信失败、RCS 不激活、换机后手机号无法用于 iMessage、或 eSIM 刚转移的情况。
- 风险：中等。运营商可能需要账户验证，eSIM 重新下发期间号码可能暂时不可用。
- 备注：这不是 Apple 官方替代步骤；先完成网络、iMessage 开关、发送与接收、日期时间和 24 小时等待条件。
- 验证级别：较可能

### 重置网络设置

- 来源：社区讨论中常见，但 Apple 当前“无法发送或接收信息”和 iMessage 激活文章没有把还原网络设置列为首选步骤。
- 成功概率：未知到中等。
- 风险：中等。会清除已保存的 Wi-Fi、VPN、蜂窝和相关网络设置，可能增加现场恢复成本。
- 备注：只适合在顾客备好 Wi-Fi 密码、VPN/管理配置可恢复，并且官方步骤和运营商确认仍无法解决后尝试。
- 验证级别：较可能

---

## 零售排查流程

1. 先请顾客打开一条失败对话，确认是蓝色、绿色、红色感叹号、“尚未送达”、等待激活，还是只收不到验证码。
2. 问清楚触发点：刚换新机、刚换运营商、刚转移 eSIM / SIM、刚从安卓换回来、系统更新后，还是只针对某一个联系人。
3. 红色感叹号场景先按 Apple 步骤重试，再决定是否用短信发送；不要直接重置网络设置。
4. 同时测试三件事：互联网是否可用、普通短信能否发给非 Apple 手机、iMessage 能否发给已确认打开 iMessage 的 Apple 设备。
5. 打开**设置 > App > 信息 > 发送与接收**，确认电话号码和 Apple 账户是否被选中；不要只看 Apple ID 已登录。
6. 新机或 eSIM 转移后，优先解释号码激活和运营商短信路径，避免把绿色气泡直接说成 Apple ID 故障。
7. 如果顾客说“别人看到的是我的邮箱”，先看**开始新对话时使用**，并解释旧对话可能要新开一条才会改用手机号。
8. 设置 iOS 26 新机时如果先跳过 eSIM，稍后完成 eSIM 后要检查 iMessage 是否需要关闭再打开。
9. iOS 26 后如果同一手机号在“发送与接收”中显示两次，先检查同号的已失效 SIM 或 eSIM；这比反复退出 Apple 账户更快。
10. 如果普通短信、验证码、彩信或 RCS 都异常，优先转运营商；如果只有 iMessage 异常，再按 Apple 的 iMessage / FaceTime 激活步骤处理。
11. 如果顾客换到安卓后收不到短信，走注销 iMessage，不要让顾客抹掉旧 iPhone 作为第一步。
12. 把 Reddit 或社区里的“强制重启、重置网络、重新下发 eSIM”记录为非官方经验，不要包装成 Apple 官方建议。

---

## 升级处理

联系运营商：

- 普通短信、彩信、验证码或 RCS 无法发送或接收。
- RCS 激活延迟数小时后仍失败。
- 换机、换运营商或 eSIM 转移后，电话号码无法完成 iMessage 激活。
- 运营商短信服务套餐、号码状态、国际短信、彩信或 RCS 支持需要确认。

联系 Apple 支持：

- 完成网络、日期时间、iMessage/FaceTime 关闭再打开、重启和 24 小时等待后仍无法激活 iMessage。
- 已更新到 iOS 26.1 或更高版本并移除同号已失效 SIM/eSIM 后，电话号码仍无法激活 iMessage。
- Apple 账户邮箱也无法登录 iMessage 或 FaceTime。
- 发送与接收中电话号码或 Apple 账户无法正常选择，且运营商确认短信服务正常。

前往 Apple Store 或授权维修点：

- 同一号码和运营商在其他设备可正常短信 / iMessage 激活，但这台 iPhone 持续失败。
- 设备同时存在蜂窝硬件、SIM/eSIM 识别或无服务问题。
- Apple 支持诊断提示设备问题。

---

## 相关问题

- [iPhone 无法设置或转移 eSIM](/recipes/iPhone/iphone-esim-setup-transfer-fails)
- [iPhone 显示无 SIM 卡或无效 SIM 卡](/recipes/iPhone/iphone-invalid-sim-no-sim)
- [iPhone 显示 SOS、无服务或正在搜索](/recipes/iPhone/iphone-sos-no-service-searching)
- [iPhone 或 iPad 无法连接 Wi-Fi 或显示无互联网连接](/recipes/Networking/iphone-ipad-wifi-no-internet-unable-to-join)
- Apple 账户验证失败
- 换到安卓后收不到短信

---

## 标签

- 设备：iPhone、iPad、Mac
- 系统：iOS、iPadOS、macOS
- 功能：信息、iMessage、RCS、短信、彩信、FaceTime
- 网络：Wi-Fi、蜂窝数据、运营商短信服务
- Apple ID：Apple 账户、发送与接收地址、电话号码
- 连续互通：短信转发、iCloud 云端信息
- 隐私：电话号码、Apple 账户邮箱、联系人
- 维修：通常不涉及；少数情况需排除蜂窝硬件或 SIM/eSIM 识别
- 配件：SIM、eSIM

---

## 元信息

- 最后更新：2026-07-14
- 来源数量：16
- 验证级别：Apple 官方
- 支持系统：当前 iOS、iPadOS、macOS；RCS 取决于 iOS 版本、地区和运营商支持
- 可信度：高
