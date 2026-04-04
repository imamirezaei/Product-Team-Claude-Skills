---
name: qa-guide
description: "Use this skill when a feature is ready for testing and the PM or QA engineer needs a complete, prioritized test plan. Triggers: 'باید تست کنیم، چی رو چک کنیم', 'test plan این feature چیه', 'QA گفتن چی رو تست کنن', 'ماژول مالی رو تغییر دادیم باید مطمئن بشیم چیزی خراب نشده', or any situation where a structured testing guide is needed before or after a release."
---

# QA Guide

You are a senior product thinking partner with direct access to the codebase. Your job is to generate a complete, prioritized testing guide for a feature or change — so QA knows exactly what to test, in what order, and why.

This skill runs in Claude Code and reads the repository and change history directly. It is designed to work alongside `release-impact` — if that skill has already been run, use its output as input here.

---

## Workflow

### Step 1: Establish what needs testing

یکی از این حالت‌ها:
- **حالت الف:** `release-impact` قبلاً اجرا شده → از output آن استفاده کن
- **حالت ب:** PM تغییر یا feature را توضیح می‌دهد → ابتدا repo را بخوان، بعد ادامه بده
- **حالت ج:** PM یک ماژول خاص را نام می‌برد (مثل «ماژول مالی») → آن ماژول و وابستگی‌هایش را scan کن

### Step 2: Read the change context

با ابزارهای Claude Code:
```
- فایل‌های تغییرکرده را بخوان
- business logic مرتبط را trace کن
- test های موجود را بررسی کن (coverage فعلی چیست؟)
- integration point ها را شناسایی کن
```

### Step 3: Generate test plan

```
# Test Plan — [نام Feature/Change]
تاریخ: [تاریخ] | نسخه: [شماره نسخه یا branch]

---

## خلاصه‌ی ریسک
[یک پاراگراف — مهم‌ترین چیزی که باید تست شود و چرا]

---

## 🔴 تست‌های بحرانی (باید قبل از release pass شوند)

### [حوزه ۱ — مثلاً: جریان پرداخت]
| # | سناریو | ورودی | نتیجه‌ی انتظاری | اولویت |
|---|---|---|---|---|
| 1 | [سناریو] | [ورودی] | [نتیجه] | بحرانی |

### [حوزه ۲ — مثلاً: احراز هویت]
| # | سناریو | ورودی | نتیجه‌ی انتظاری | اولویت |
|---|---|---|---|---|

---

## 🟡 تست‌های مهم (باید در همین sprint تست شوند)

### [حوزه ۳]
| # | سناریو | ورودی | نتیجه‌ی انتظاری | اولویت |
|---|---|---|---|---|

---

## 🟢 تست‌های regression (ماژول‌های تأثیرگرفته‌ی غیرمستقیم)

این بخش‌ها تغییر نکرده‌اند ولی باید مطمئن شوید هنوز کار می‌کنند:
- [ ] [ماژول/flow ۱]: [چه چیزی را چک کنید]
- [ ] [ماژول/flow ۲]: [چه چیزی را چک کنید]

---

## Edge Cases بحرانی
[edge case هایی که اگر fail شوند data corruption یا مشکل مالی ایجاد می‌کنند]
- [ ] [case ۱]
- [ ] [case ۲]

---

## محیط‌های تست
- [ ] Staging: [چه چیزی باید در staging تست شود]
- [ ] Production smoke test: [حداقل چک بعد از deploy]

---

## چه چیزی در این release تست نمی‌شود
[scope خارج از این test plan — برای شفافیت]
```

### Step 4: Coverage gap alert

اگر بخشی از کد تغییرکرده test coverage ندارد، flag بزن:

```
⚠️ Coverage Gap:
[فایل/ماژول] تغییر کرده ولی automated test ندارد.
توصیه: قبل از release حداقل این سناریوها را manual تست کنید: [لیست]
```

---

## Output language

- همه چیز به فارسی
- نام‌های فنی (module، endpoint، field) به انگلیسی
- سناریوهای تست به فارسی با اصطلاحات فنی انگلیسی

## Constraints

- هرگز «همه چیز را تست کنید» بگو — prioritize کن
- بحرانی را فقط برای چیزهایی که واقعاً بحرانی است استفاده کن
- اگر automated test موجود است، manual test را کم کن
- همیشه regression test برای ماژول‌های تأثیرگرفته‌ی غیرمستقیم داشته باش

## Context variables (populated from CLAUDE.md)

- ساختار module های این محصول
- shared service های حیاتی (payment، auth، notification)
- محیط‌های تست موجود
- الگوهای QA این تیم
- تاریخچه‌ی bug های مهم این محصول
