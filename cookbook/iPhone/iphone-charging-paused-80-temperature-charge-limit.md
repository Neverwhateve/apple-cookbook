---
schemaVersion: 2
id: iphone-charging-paused-80-temperature-charge-limit
title: iPhone 充电停在 80% 或显示充电暂停
slug: iphone-charging-paused-80-temperature-charge-limit
summary: >-
  iPhone 充到 80% 左右停止、锁定屏幕显示“Charging On Hold / 充电暂停”、电池页面显示温度原因，或 iPhone 15
  及更新机型设置了充电上限时，先判断它是保护电池的正常行为、温度保护、充电上限，还是配件/供电异常。这个问题不要直接按“充不进电”或“电池坏了”处理。
symptoms:
  - “iPhone 充到 80% 就不动了。”
  - “显示 Charging On Hold，等温度正常后继续。”
  - “手机摸起来不热，但说因为温度暂停充电。”
  - “优化电池充电关了还是停在 80%。”
  - “iPhone 15 / iPhone 16 / iPhone 17 只充到我设的上限。”
  - “锁屏说几点会充满，能不能马上充满？”
  - “iOS 26 电池里显示预计充到 80% 或上限需要多久。”
  - “电池里显示慢充或充电器不兼容。”
  - “更新以后充电变慢，是不是系统坏了？”
devices:
  - iPhone
platforms:
  - iOS
systemVersions:
  - iOS 26
  - iOS 18
  - iOS 13
categories:
  - iPhone
tags:
  - iPhone
  - iOS
  - Battery
  - 电池
  - 充电
  - Charging
  - Heat
  - 发热
keywords: []
aliases:
  - iPhone charging paused at 80
  - iPhone Charging On Hold
  - iPhone stopped charging at 80 percent
  - iPhone charge limit 80
  - iPhone optimized battery charging
  - iPhone 充电暂停
  - iPhone 充到 80 不动
  - iPhone 充电因温度暂停
  - iPhone 充电上限
errorMessages:
  - “手机摸起来不热，但说因为温度暂停充电。”
  - iPhone 充电暂停
  - iPhone 充电因温度暂停
officialTerms: []
communityTerms: []
difficulty: Quick
estimatedTime: null
verificationLevel: Official
status: canonical
canonicalArticleId: iphone-charging-paused-80-temperature-charge-limit
solutions:
  - id: solution-30e9fac0121b
    title: Apple 官方方案
    summary: null
    kind: recommended
    steps:
      - 先看 iPhone 当前提示：锁定屏幕是否显示预计充满时间，设置 电池是否显示充电暂停、慢充、充电器不兼容，或 iOS 26 的预计充电时间。
      - 如果锁定屏幕显示“优化电池充电”预计充满时间，而顾客现在需要充满，按住通知并轻点立即充电。
      - >-
        如果是 iPhone 15 各款机型或更新机型，打开设置 电池 充电，检查充电上限是否设置为 80%、85%、90% 或
        95%。需要更高电量时，把上限调高。
      - 如果是 iPhone 14 或更早机型，打开设置 电池 电池健康与充电，检查优化电池充电状态。
      - >-
        如果用户说优化电池充电从未出现或不稳定，先确认它是否有足够学习条件。Apple 说明这项功能至少需要 14
        天学习充电习惯，并且需要在特定位置至少充电 9 次、每次至少 5 小时，才会发挥作用。
      - 不要把优化电池充电或充电上限直接说成故障。Apple 说明关闭充电优化会增加电池损耗并缩短电池寿命。
      - >-
        如果 iOS 26 显示预计充电时间，按电量判断：低于 80% 时通常显示充到 80% 所需时间；高于 80% 时显示充到 100%
        或所设上限所需时间。
      - >-
        如果提示因为温度暂停充电，把 iPhone 和充电器移到较凉爽的地方，停止高负载
        App，取下厚重保护壳，并避免阳光直射、车内高温或被子/枕头覆盖。
      - 等待电池温度回到正常工作范围。Apple 说明温度恢复正常后充电会继续。
      - >-
        如果顾客抱怨“充得慢”，检查是否使用 7.5W 或更低功率有线充电器、10W 以下无线充电器、Qi1 无线充、车载 USB、电脑 USB、USB
        集线器或多口充电器共享功率。
      - >-
        需要更快充电时，使用适合机型的 USB-C Power Delivery 充电器和合格线缆；无线充电优先使用 MagSafe 或 Qi2
        认证充电器。
      - 如果 iOS 18 或更新版本显示慢充，解释这不代表 iPhone 或充电器一定损坏，只是更高功率充电器可能改善体验。
      - 如果 iOS 26 显示充电器不兼容，或充电器已连接但没有充电，转入配件、线缆、接口和供电路径排查。
      - >-
        如果多次在凉爽环境、不同充电器、不同线缆和不同插座下仍频繁温度暂停，记录截图、环境温度、充电器型号、线缆、是否无线充电、保护壳和电池健康，再联系
        Apple 支持。
    verificationLevel: Official
    sourceIds:
      - official-a16810fd1611
      - official-95c15eb8aea4
      - official-d9fe4d1df125
      - official-39069b4bb1de
      - official-652e4800d38c
    warnings: []
    limitations: []
warnings: []
limitations: []
sources:
  - id: official-a16810fd1611
    title: Apple 支持：如果 iPhone 或 iPod touch 无法充电
    url: 'https://support.apple.com/zh-cn/108805'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-95c15eb8aea4
    title: Apple 支持：关于 iPhone 的“充电上限”和“优化电池充电”
    url: 'https://support.apple.com/zh-cn/108055'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-d9fe4d1df125
    title: Apple 支持：关于 iPhone 的充电速度
    url: 'https://support.apple.com/zh-cn/120619'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-39069b4bb1de
    title: Apple 支持：为 iPhone 电池充电并进行维护
    url: 'https://support.apple.com/zh-cn/105105'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: official-652e4800d38c
    title: Apple 支持：如果 iPhone 或 iPad 温度过高或过低
    url: 'https://support.apple.com/zh-cn/118431'
    publisher: Apple
    sourceType: official-support
    accessedAt: null
    publishedAt: null
    official: true
  - id: community-a48b6e1ea7e3
    title: Apple Support Community 旧版引文（原始标题未记录）
    url: 'https://discussions.apple.com/thread/256040409'
    publisher: Apple Support Community
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-654e6104e8c4
    title: Apple Support Community 旧版引文（原始标题未记录）
    url: 'https://discussions.apple.com/thread/255653029'
    publisher: Apple Support Community
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-210b540fb17f
    title: Reddit 旧版引文（原始标题未记录）
    url: >-
      https://www.reddit.com/r/applehelp/comments/1fm1csv/charging_on_hold_due_to_temperature/
    publisher: Reddit
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
  - id: community-6e25c8f87958
    title: Reddit 旧版引文（原始标题未记录）
    url: >-
      https://www.reddit.com/r/iphone/comments/12hqqyp/charging_on_hold_charging_will_resume_when_iphone/
    publisher: Reddit
    sourceType: community
    accessedAt: null
    publishedAt: null
    official: false
lastVerifiedAt: '2026-07-14'
lastUpdatedAt: '2026-07-14'
createdAt: null
relatedArticles:
  - iphone-wont-charge-wired-liquid-detected
  - iphone-battery-drains-after-update
  - iphone-stuck-preparing-verifying-software-update
popular: false
---

# iPhone 充电停在 80% 或显示充电暂停

iPhone 充到 80% 左右停止、锁定屏幕显示“Charging On Hold / 充电暂停”、电池页面显示温度原因，或 iPhone 15 及更新机型设置了充电上限时，先判断它是保护电池的正常行为、温度保护、充电上限，还是配件/供电异常。这个问题不要直接按“充不进电”或“电池坏了”处理。

---

## 症状

- “iPhone 充到 80% 就不动了。”
- “显示 Charging On Hold，等温度正常后继续。”
- “手机摸起来不热，但说因为温度暂停充电。”
- “优化电池充电关了还是停在 80%。”
- “iPhone 15 / iPhone 16 / iPhone 17 只充到我设的上限。”
- “锁屏说几点会充满，能不能马上充满？”
- “iOS 26 电池里显示预计充到 80% 或上限需要多久。”
- “电池里显示慢充或充电器不兼容。”
- “更新以后充电变慢，是不是系统坏了？”

---

## 可能原因

1. **优化电池充电正在延后 80% 以上充电**
   - Apple 说明，iOS 会学习日常充电习惯，并在预测 iPhone 会长时间连接充电器时暂缓充电至 80% 以上；锁定屏幕会显示预计充满时间。这个学习过程需要足够时间和固定位置充电记录。
2. **iPhone 15 及更新机型设置了充电上限**
   - Apple 说明，iPhone 15 各款机型及更新机型可以在 80% 到 100% 之间选择充电上限。iPhone 会充到接近所选上限后停止。
3. **温度保护限制 80% 以上充电**
   - Apple 说明，电池温度超过建议范围时，软件可能会在 80% 以上限制充电；温度恢复正常后会继续充电。
4. **充电器、无线充、集线器或车载 USB 供电较慢**
   - Apple 说明，低功率有线/无线充电器、USB 集线器、车载端口、多口充电器共享功率，以及连接其他配件，都可能让充电比预期慢。
5. **边充边高负载使用导致发热和降速**
   - Apple 说明，充电期间使用图形密集型 App、游戏、相机或高画质视频，可能降低充电速度。
6. **真正的配件或充电故障**
   - 如果不是停在 80% 或接近上限，而是完全不充、反复断开、显示“不兼容充电器”或“配件不受支持”，应转入充电配件和接口排查。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先看 iPhone 当前提示：锁定屏幕是否显示预计充满时间，**设置 > 电池**是否显示充电暂停、慢充、充电器不兼容，或 iOS 26 的预计充电时间。
2. 如果锁定屏幕显示“优化电池充电”预计充满时间，而顾客现在需要充满，按住通知并轻点**立即充电**。
3. 如果是 iPhone 15 各款机型或更新机型，打开**设置 > 电池 > 充电**，检查充电上限是否设置为 80%、85%、90% 或 95%。需要更高电量时，把上限调高。
4. 如果是 iPhone 14 或更早机型，打开**设置 > 电池 > 电池健康与充电**，检查**优化电池充电**状态。
5. 如果用户说优化电池充电从未出现或不稳定，先确认它是否有足够学习条件。Apple 说明这项功能至少需要 14 天学习充电习惯，并且需要在特定位置至少充电 9 次、每次至少 5 小时，才会发挥作用。
6. 不要把优化电池充电或充电上限直接说成故障。Apple 说明关闭充电优化会增加电池损耗并缩短电池寿命。
7. 如果 iOS 26 显示预计充电时间，按电量判断：低于 80% 时通常显示充到 80% 所需时间；高于 80% 时显示充到 100% 或所设上限所需时间。
8. 如果提示因为温度暂停充电，把 iPhone 和充电器移到较凉爽的地方，停止高负载 App，取下厚重保护壳，并避免阳光直射、车内高温或被子/枕头覆盖。
9. 等待电池温度回到正常工作范围。Apple 说明温度恢复正常后充电会继续。
10. 如果顾客抱怨“充得慢”，检查是否使用 7.5W 或更低功率有线充电器、10W 以下无线充电器、Qi1 无线充、车载 USB、电脑 USB、USB 集线器或多口充电器共享功率。
11. 需要更快充电时，使用适合机型的 USB-C Power Delivery 充电器和合格线缆；无线充电优先使用 MagSafe 或 Qi2 认证充电器。
12. 如果 iOS 18 或更新版本显示**慢充**，解释这不代表 iPhone 或充电器一定损坏，只是更高功率充电器可能改善体验。
13. 如果 iOS 26 显示**充电器不兼容**，或充电器已连接但没有充电，转入配件、线缆、接口和供电路径排查。
14. 如果多次在凉爽环境、不同充电器、不同线缆和不同插座下仍频繁温度暂停，记录截图、环境温度、充电器型号、线缆、是否无线充电、保护壳和电池健康，再联系 Apple 支持。

参考来源：

- [Apple 支持：如果 iPhone 或 iPod touch 无法充电](https://support.apple.com/zh-cn/108805)
- [Apple 支持：关于 iPhone 的“充电上限”和“优化电池充电”](https://support.apple.com/zh-cn/108055)
- [Apple 支持：关于 iPhone 的充电速度](https://support.apple.com/zh-cn/120619)
- [Apple 支持：为 iPhone 电池充电并进行维护](https://support.apple.com/zh-cn/105105)
- [Apple 支持：如果 iPhone 或 iPad 温度过高或过低](https://support.apple.com/zh-cn/118431)

---

## 已验证的非官方处理思路

非官方

### 先降低热量，再判断是否故障

- 来源：Apple Support Community 和 Reddit 中，用户常说手机“摸起来不热”但系统仍显示温度暂停；官方依据是 iPhone 会按内部电池温度和系统条件限制充电。
- 成功概率：中到高，尤其适合 MagSafe、厚保护壳、边充边玩游戏、车内或夏季高温环境。
- 风险：低。
- 备注：不要用冰箱、冰袋、空调直吹冷凝水等方式快速降温；只做移到凉爽通风处、取下保护壳、停止高负载使用。
- 验证级别：Apple 官方原则 + 社区频率信号

### 换成低热量充电路径做交叉测试

- 来源：社区中常见“快充到 80% 后暂停”“无线充更热”“换充电器后改善”的表述。
- 成功概率：中等。
- 风险：低。
- 备注：可以用 Apple 或合格 USB-C PD 充电器、有线充电、取下保护壳、不要通过车载 USB 或集线器做对比。不要把某个第三方充电器品牌当作官方推荐。
- 验证级别：较可能

### 不建议长期关闭所有充电优化

- 来源：社区中常见为了“每次都充满”而关闭优化的建议。
- 成功概率：能改变部分提示，但不解决温度和供电问题。
- 风险：中等。Apple 明确说明关闭充电优化会增加电池损耗并缩短寿命。
- 备注：只在顾客明确需要马上充满时使用“立即充电”或临时调整充电上限；不要把长期关闭优化作为默认零售建议。
- 验证级别：Apple 官方

---

## 零售排查流程

1. 先确认 iPhone 是**停在 80% 附近**、**停在用户设置的上限**、**显示温度暂停**、**显示慢充/不兼容充电器**，还是**完全不充电**。
2. 打开**设置 > 电池**，看充电图、暂停原因、慢充或不兼容提示。不要只听“充不进”。
3. iPhone 15 及更新机型先查**设置 > 电池 > 充电**的上限；iPhone 14 及更早机型查**电池健康与充电**的优化电池充电。
4. 如果只是优化电池充电，解释预计充满时间和“立即充电”入口；如果用户刚换机、刚搬到新地点或充电习惯不固定，说明优化充电可能还没有满足学习条件。
5. 如果是温度暂停，先处理环境和使用方式：取下厚壳、停止游戏/相机/视频、换到凉爽处、避免无线充和高温叠加。
6. 如果是慢充，检查充电器功率、线缆、无线充规格、车载/电脑/集线器和多口充电器共享功率。
7. 如果是 iOS 26 的“充电器不兼容”或完全不充，转到充电接口和配件 canonical recipe。
8. 如果顾客担心电池坏，检查电池健康、循环、是否意外关机、是否鼓包、是否只能插电使用。单独的 80% 暂停不等于电池故障。
9. 记录证据：截图、当前电量、充电上限、优化状态、温度提示、充电器型号、线缆、保护壳、环境温度、是否无线充电和是否边充边高负载使用。

---

## 升级处理

联系 Apple 支持：

- 在凉爽环境、取下保护壳、停止高负载使用后，仍频繁显示温度暂停。
- 使用多套合格充电器和线缆后，iOS 26 仍显示充电器不兼容或无法持续充电。
- 电池页面、系统设置或诊断提示异常，顾客需要确认是否为电池或热管理问题。

前往 Apple Store 或授权维修点：

- iPhone 异常发热、鼓包、闻到异味、接口烧蚀或有液体/跌落痕迹。
- 不只是 80% 暂停，而是多套配件下完全不充、反复断电或无法开机。
- 电池健康提示维修、设备意外关机或只能插电使用。

维修或更换硬件：

- 只有在服务检测或可重复证据指向电池、接口、热传感、主板供电路径或液体损坏时，才进入维修或更换判断。

---

## 相关问题

- [iPhone 无法充电、有线充电没反应或提示液体检测](/recipes/iPhone/iphone-wont-charge-wired-liquid-detected)
- [iPhone 更新后掉电快或发热](/recipes/iPhone/iphone-battery-drains-after-update)
- [iPhone 设置或更新时卡在正在准备更新、正在验证更新](/recipes/iPhone/iphone-stuck-preparing-verifying-software-update)

---

## 标签

- 设备：iPhone
- 系统：iOS
- 功能：电池、充电、优化电池充电、充电上限、慢充
- 网络：不适用
- Apple ID：不适用
- 连续互通：不适用
- 隐私：不适用
- 维修：电池、接口、热管理、主板供电路径
- 配件：USB-C 充电器、Lightning 线缆、MagSafe、Qi2、车载 USB、USB 集线器

---

## 元信息

- 最后更新：2026-07-14
- 来源数量：9
- 验证级别：Apple 官方
- 支持系统：iOS 13 及更新版本支持优化电池充电；iPhone 15 及更新机型支持充电上限；iOS 18 及更新版本可显示慢充；iOS 26 可显示预计充电时间和充电器不兼容
- 可信度：高
