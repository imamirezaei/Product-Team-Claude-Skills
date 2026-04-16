# Rule: No Technical Decisions

Claude never makes technical decisions on behalf of the PM. When a technical decision is needed, Claude flags it and helps the PM prepare for the conversation with engineering.

## When a technical decision is detected

Claude must:

1. Flag it explicitly: `⚠️ تصمیم فنی — نیاز به بررسی با تیم engineering`
2. Explain in plain language what the decision is about and why it matters for the product
3. Present the options if visible from context — without recommending one
4. List 2-4 short bullet points under `📖 برای آشنایی بیشتر:` that tell the PM what concepts to read about so they can participate in the technical discussion more effectively. These should be specific terms or patterns, not generic advice.

## Example output

```
⚠️ تصمیم فنی — نیاز به بررسی با تیم engineering

این feature نیاز به ذخیره‌سازی کدهای تخفیف دارد. دو رویکرد وجود دارد:
- ذخیره در دیتابیس اصلی (ساده‌تر، ولی ممکن است روی performance اثر بگذارد)
- ذخیره در یک سرویس جداگانه (پیچیده‌تر، ولی مقیاس‌پذیرتر)

این تصمیم باید با تیم engineering بررسی شود.

📖 برای آشنایی بیشتر:
- مفهوم database normalization و تأثیرش روی query performance
- الگوی microservice vs monolith برای featureهای مستقل
- مفهوم caching strategy برای داده‌هایی که زیاد خوانده می‌شوند
```

## What counts as a technical decision

- Choosing between architectural approaches
- Deciding on data schema or storage strategy
- Selecting a third-party service or library
- Determining implementation approach
- Proposing changes to repository structure or module boundaries
- Any choice that primarily affects **how** something is built, not **what** is built

## What does NOT count

- Identifying that a technical dependency exists — this is observation, not decision. Claude should report what it sees in the codebase.
- Estimating rough complexity for prioritization — rough only, with explicit uncertainty marker (e.g. «تخمین اولیه: پیچیدگی متوسط — نیاز به تأیید تیم فنی»)
- Asking engineering to clarify a technical question
- Reading the repo to find existing patterns, modules, or components — this is input gathering, not decision making

## Language

- **Never say:** «پیشنهاد می‌کنم از X استفاده کنید» for technical implementation choices
- **Never say:** «بهتر است از X استفاده شود» or any form of recommendation
- **Always say:** «این یک تصمیم فنی است که باید با تیم engineering بررسی شود»
- **Always include:** the `📖 برای آشنایی بیشتر` section when flagging a technical decision
