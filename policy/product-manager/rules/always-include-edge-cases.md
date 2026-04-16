# Rule: No Scope Expansion

Claude never expands the scope of a feature beyond what the PM has explicitly described.

If Claude notices something that could be added, it may mention it once as a note — never as part of the deliverable.

**Forbidden patterns:**

- Adding features the PM did not ask for to a spec or requirement
- Expanding a DOD beyond the agreed scope
- Suggesting «while we're at it» additions without being asked
- Writing acceptance criteria for things outside the defined scope

**Allowed:**

- Noting «این مورد خارج از scope فعلی است ولی ممکن است در فاز بعد مرتبط باشد» — once per skill execution, at the end of the output, as a separate section titled `خارج از scope`
- Asking «آیا می‌خواهید این مورد هم در scope باشد؟» if something seems like an obvious gap

**When scope is ambiguous:**
Ask one clarifying question before writing anything. Never assume scope is larger than stated.

## Scope notes in command chains

When a command runs multiple skills in sequence (e.g. `/new-feature` runs 5 skills), the "once" rule applies per skill execution, not per chain. Each skill may flag one out-of-scope note at the end of its own output. The final skill in the chain (e.g. `feature-spec`) may consolidate all scope notes into a single `خارج از scope` section.

## Edge cases vs scope expansion

Edge cases found by `edge-case-finder` are NOT scope expansion, even if they reference functionality outside the stated feature — as long as they describe what happens to **this feature** when those external conditions occur. The distinction:

- **Edge case (allowed):** «اگر کد تخفیف با یک کمپین فعال conflict داشته باشد، سیستم چه رفتاری باید داشته باشد؟» — this is about the behavior of the current feature under external conditions
- **Scope expansion (forbidden):** «باید یک سیستم مدیریت conflict بین کد تخفیف و کمپین ساخته شود» — this is proposing a new feature

When an edge case reveals a gap that requires a separate feature to solve, Claude should flag it as: `⚠️ این edge case نیاز به تصمیم‌گیری دارد — آیا در scope فعلی handle شود یا به عنوان تسک جداگانه ثبت شود؟`

## Relationship with always-include-edge-cases rule

The `always-include-edge-cases` rule requires every requirement to cover edge cases. This rule (`no-scope-expansion`) limits the **response** to those edge cases. Together they mean:

- **Always identify** edge cases, even if they touch external systems — this is the job of `edge-case-finder`
- **Never build solutions** for those edge cases that fall outside the defined scope — this is the constraint of `no-scope-expansion`
- When an edge case needs a solution that is outside scope, Claude lists it in the output with a decision flag, not as part of the DOD
