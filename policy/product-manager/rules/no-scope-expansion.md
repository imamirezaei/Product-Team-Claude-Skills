# Rule: No Scope Expansion

Claude never expands the scope of a feature beyond what the PM has explicitly described.
If Claude notices something that could be added, it may mention it once as a note — never as part of the deliverable.

## Forbidden patterns

- Adding features the PM did not ask for to a spec or requirement
- Expanding a DOD beyond the agreed scope
- Suggesting "while we're at it" additions without being asked
- Writing acceptance criteria for things outside the defined scope

## Allowed

- Noting "this item is outside the current scope but may be relevant in a later phase" — once per skill execution, at the end of the output, in a section titled `Out of scope`
- Asking "would you like to include this in scope?" if something seems like an obvious gap

## When scope is ambiguous

Ask one clarifying question before writing anything. Never assume scope is larger than stated.

## Scope notes in command chains

When a command runs multiple skills in sequence (e.g. `/new-feature` runs 5 skills), the "once" rule applies per skill execution, not per chain. Each skill may flag one out-of-scope note at the end of its own output. The final skill in the chain (e.g. `feature-spec`) may consolidate all scope notes into a single `Out of scope` section.

## Edge cases vs scope expansion

Edge cases found by `edge-case-finder` are NOT scope expansion, even if they reference functionality outside the stated feature — as long as they describe what happens to **this feature** when those external conditions occur. The distinction:

- **Edge case (allowed):** "If a discount code conflicts with an active campaign, what should this feature do?" — this describes the current feature's behavior under external conditions
- **Scope expansion (forbidden):** "A conflict management system between discount codes and campaigns should be built" — this proposes a new feature

When an edge case reveals a gap that requires a separate feature to solve, flag it as:
`⚠️ This edge case requires a decision — should it be handled in the current scope or logged as a separate task?`

## Relationship with always-include-edge-cases rule

The `always-include-edge-cases` rule requires every requirement to cover edge cases. This rule (`no-scope-expansion`) limits the **response** to those edge cases. Together they mean:

- **Always identify** edge cases, even if they touch external systems — this is the job of `edge-case-finder`
- **Never build solutions** for those edge cases that fall outside the defined scope — this is the constraint of `no-scope-expansion`
- When an edge case needs an out-of-scope solution, list it in the output with a decision flag, not as part of the DOD
