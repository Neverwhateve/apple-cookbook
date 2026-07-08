---
title: AirDrop Keeps Waiting or Cannot Find Device
slug: airdrop-keeps-waiting
device:
  - iPhone
  - iPad
  - Mac
category: Continuity
tags:
  - AirDrop
  - Continuity
  - Bluetooth
  - Wi-Fi
  - Network
aliases:
  - AirDrop keeps waiting
  - AirDrop cannot find device
  - AirDrop failed
  - AirDrop spinning forever
  - AirDrop not showing
  - 隔空投送一直等待
  - 隔空投送找不到人
verification: Official
difficulty: Quick
updated: 2026-07-08
official_sources:
  - https://support.apple.com/en-us/119857
  - https://support.apple.com/guide/mac-help/use-airdrop-to-send-items-to-nearby-devices-mh35868/mac
  - https://support.apple.com/guide/personal-safety/secure-airdrop-ips7d84d2cdc/web
community_sources: []
status: seed
popular: true
---

# AirDrop Keeps Waiting or Cannot Find Device

Customer is trying to send a photo, file, or contact with AirDrop, but the recipient does not appear, the transfer says Waiting, or it fails before acceptance.

---

## Symptoms

- "AirDrop keeps waiting."
- "Their phone does not show up."
- "It finds them once, then disappears."
- "It says declined even though they did not decline."
- "Mac can see iPhone but iPhone cannot see Mac."
- "隔空投送一直等待。"

---

## Possible Causes

1. **Receiving setting blocks discovery**
   - Most common when the recipient is set to Contacts Only and contact cards, Apple Account email, or phone numbers do not match.
2. **Bluetooth or Wi-Fi discovery is unavailable**
   - AirDrop uses nearby discovery before transfer. If either radio is impaired, devices may not appear.
3. **Devices are not close enough or are on different personal hotspot states**
   - Distance, interference, or Personal Hotspot can interrupt discovery.
4. **Screen locked or sharing sheet stale**
   - AirDrop discovery can change after the share sheet is opened.
5. **Managed device restrictions**
   - MDM or Screen Time restrictions can disable AirDrop.

---

## Official Apple Solution

Verification: Official

Steps:

1. Keep both devices awake, unlocked, and near each other.
2. Confirm Wi-Fi and Bluetooth are turned on for both devices.
3. On the receiving device, set AirDrop receiving to **Everyone for 10 Minutes** for testing.
4. If using **Contacts Only**, confirm both people are signed in to Apple Account and the sender's email address or phone number is saved in Contacts.
5. Turn off Personal Hotspot while testing.
6. Reopen the share sheet and try AirDrop again.
7. If a Mac is involved, open AirDrop in Finder and confirm the discovery setting at the bottom of the window.

References:

- Apple Support: Use AirDrop on iPhone and iPad
- Apple Support: Use AirDrop to send items to nearby Apple devices on Mac
- Apple Personal Safety User Guide: Secure AirDrop

---

## Community Verified Workarounds

Unofficial

### Toggle Everyone for 10 Minutes, then switch back

- Source: Repeated Retail troubleshooting pattern; aligns with Apple's discovery controls.
- Success probability: High when the issue is Contacts Only matching.
- Risks: Temporarily allows nearby AirDrop requests.
- Notes: Use only long enough to complete the transfer, then restore the customer's preferred receiving setting.
- Verification: Verified

### Restart both devices before deeper network troubleshooting

- Source: Common community and Retail pattern for stale discovery state.
- Success probability: Medium.
- Risks: Low.
- Notes: Best after official settings are confirmed. Do not make this the first step if receiving is clearly off.
- Verification: Likely

---

## Retail Troubleshooting Flow

1. Ask which direction fails: iPhone to iPhone, iPhone to Mac, Mac to iPhone, or all directions.
2. On the receiver, set AirDrop to **Everyone for 10 Minutes**.
3. Confirm both devices are unlocked, nearby, and have Wi-Fi and Bluetooth on.
4. Reopen the share sheet; do not rely on an old AirDrop panel.
5. If it works on Everyone, explain the likely Contacts Only identity mismatch.
6. If it still fails, test with a second known-good Apple device.
7. If only one device fails with all partners, check restrictions, software update status, and possible radio issues.

---

## Escalation

Contact Apple Support when:

- AirDrop is missing because of account, restriction, or managed-device behavior the customer cannot change.
- The issue appears after update and affects multiple Apple services.

Visit Apple Store or repair provider when:

- Bluetooth or Wi-Fi also fail outside AirDrop.
- The device cannot discover any nearby Apple device after settings, restart, and software checks.

Repair or replace hardware when:

- Diagnostics or broader symptoms point to wireless hardware failure.

---

## Related Problems

- Universal Clipboard not working
- Handoff missing
- Continuity Camera not detected
- iPhone Mirroring not connecting

---

## Tags

- Device: iPhone, iPad, Mac
- System: iOS, iPadOS, macOS
- Feature: AirDrop, Continuity
- Network: Wi-Fi, Bluetooth
- Apple ID: Contacts Only identity matching
- Continuity: Nearby discovery
- Privacy: Receiving settings
- Repair: Possible wireless hardware issue
- Accessory: Not applicable

---

## Metadata

- Last Updated: 2026-07-08
- Source Count: 3
- Verification Level: Official
- Supported Systems: Current iOS, iPadOS, macOS versions that support AirDrop
- Confidence Score: High

