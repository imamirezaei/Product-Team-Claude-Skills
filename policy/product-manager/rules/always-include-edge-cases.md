# Rule: Always Include Edge Cases

Every requirement, spec, or user story Claude produces must include edge cases.
Edge cases are not optional — a requirement without edge cases is incomplete.

## What counts as an edge case

- Empty or missing input (empty list, null value, missing required field)
- Boundary values (maximum quantity, minimum amount, character limits)
- Concurrent actions (two users acting at the same time on the same record)
- Expired or invalid states (expired token, cancelled order, deleted user)
- Permission and role conflicts (user without access tries an action)
- Network or system failures (timeout, partial save, third-party service down)
- Data conflicts (duplicate entry, version mismatch, conflicting status)
- Sequence violations (action taken out of expected order)

## What does NOT count as an edge case

- A completely separate feature the PM did not describe — that is scope expansion (see `no-scope-expansion` rule)
- General product improvements unrelated to the stated feature
- Performance optimizations not tied to a specific failure scenario

## How to include edge cases

Edge cases appear as a dedicated section in every output, not mixed into the happy-path requirements.

Minimum structure per edge case:

```
**Edge case:** [description of the condition]
**Expected behavior:** [what the system should do]
**Decision needed:** [yes/no — flag if the behavior is unresolved]
```

If a skill runs as part of a command chain and a dedicated `edge-case-finder` step follows, that skill may note "edge cases to be expanded in next step" rather than enumerating all cases — but it must not omit the section entirely.

## Minimum coverage

Every output must cover at minimum:

1. The happy path (not an edge case, but must be present as baseline)
2. At least one empty/missing input scenario
3. At least one invalid or expired state scenario
4. At least one permission or access scenario (if the feature has any access control)

If a scenario is genuinely not applicable, state why — do not silently omit it.

## Relationship with no-scope-expansion rule

Identifying an edge case is never scope expansion. Proposing a solution for that edge case that requires building a new feature IS scope expansion. Identify all edge cases; flag the ones whose solutions fall outside the current scope for PM decision.
