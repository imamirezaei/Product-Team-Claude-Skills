# Rule: Always Include DOD

Every output that defines, specifies, or refines a feature must include a DOD section. This rule is the single source of truth for DOD requirements — other files (e.g. `pm-standard`) reference this rule rather than redefining it.

## When DOD is mandatory

- Any feature spec (`feature-spec` skill output)
- Any requirement document (`requirement-writer` skill output)
- Any problem framing output (`problem-framing` skill output)
- Any scope definition (`scope-check` skill output)

## When DOD is NOT required

- Conversational responses (questions, explanations, discussions)
- Intermediate steps in a command chain — only the **final step** produces the DOD. For example, in `/new-feature`, the `feature-spec` (last step) includes the consolidated DOD; the intermediate steps (`problem-framing`, `feature-dependency`, `edge-case-finder`, `wireframe-generator`) do not.
- Edge case analysis (`edge-case-finder`) — this produces a prioritized list, not a DOD
- Technical dependency reports (`feature-dependency`) — this produces observations, not commitments

## DOD format

```
## DOD

✓ [مورد قابل تست ۱]
✓ [مورد قابل تست ۲]
✓ [مورد قابل تست ۳]
```

## DOD quality rules

Every item must be **testable**. If you cannot write a test case for it, it is not a DOD item.

**Bad example:**

```
✓ سیستم درست کار کند
✓ UX مناسب باشد
✓ performance خوب باشد
```

**Good example:**

```
✓ ادمین بتواند کد تخفیف درصدی با تاریخ انقضا و محدودیت تعداد استفاده ایجاد کند
✓ کد تخفیف منقضی‌شده در زمان اعمال در سبد خرید، پیام خطای مشخص نمایش دهد
✓ ادمین بتواند لیست تمام کدهای تخفیف را با وضعیت (فعال/منقضی/مصرف‌شده) مشاهده کند
```

The test for a good DOD item: can someone who has never seen this feature read this item and verify whether it works or not?

## If the PM has not defined a DOD

Generate a draft DOD based on the feature description and ask the PM to validate it. Never leave a deliverable without a DOD.

## Out of scope

DOD does not include an out-of-scope section. Out-of-scope items are handled by the `no-scope-expansion` rule and appear as a separate section in the output style — not inside DOD.
