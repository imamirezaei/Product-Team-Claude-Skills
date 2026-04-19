---
description: Compare the feature spec with the current implementation and surface any drift
---

Check whether the feature spec is still aligned with what has actually been built.

## How this works

**Step 1 — Read the spec**
Locate and read the feature spec file for this feature. If $ARGUMENTS names a spec file or feature, find it. If not, ask the PM which spec to check or use the most recently modified spec file.

**Step 2 — Read the implementation**
Use Claude Code tools to read the current implementation:
- Identify the relevant source files (routes, components, services, API handlers) for this feature
- Read them directly — do not ask the PM to describe the code
- Check git log for recent changes to these files: `git log --oneline -- [file]`

**Step 3 — Compare and classify drift**
For each difference found between spec and implementation:

1. State what the spec says
2. State what the implementation actually does
3. Classify the drift:
   - **Spec is outdated** — implementation is correct, spec needs to catch up
   - **Implementation deviated** — spec is correct, implementation diverged without a documented reason
   - **Needs PM decision** — unclear which is right; PM must decide before either is updated

**Step 4 — Present findings**

```
## Spec Drift Report: [Feature name]
Date: [date] | Spec file: [path] | Last spec update: [date from git]

### Summary
[One sentence: number of differences found, severity, recommended action]

### Differences found

| # | Spec says | Implementation does | Classification | Action |
|---|---|---|---|---|
| 1 | [spec] | [impl] | [type] | [what to do] |

### Recommended updates
[For each "Spec is outdated" item: proposed spec change]

### Decisions needed
[For each "Needs PM decision" item: the question that must be answered]

### Implementation deviations
[For each "Implementation deviated" item: flag for engineering review]
```

**Step 5 — Wait for PM approval**
Do not update any file automatically. Present the proposed changes and wait for explicit PM approval before applying them.

---

Feature or spec to check: $ARGUMENTS

If $ARGUMENTS is empty, ask the PM which feature spec to check, or use the most recently modified spec file.
