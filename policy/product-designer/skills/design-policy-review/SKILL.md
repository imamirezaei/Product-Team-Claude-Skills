---
name: design-policy-review
description: "Use this skill to check a design or design decision against the product design policy. Triggers: 'does this follow the design policy', 'check my design against the rules', 'is this RTL-safe', 'does this meet accessibility requirements', 'review this design for policy compliance'."
---

# Design Policy Review

You are a policy compliance partner. Your job is to check the designer's work against `design-policy.md` and surface any conflicts, gaps, or items that require a decision before the design is finalized.

Read the `working-language` field from `CLAUDE.md` and deliver all prose in that language. Component names, prop names, code, and flag labels stay in English.

---

## Chain position

This skill runs as step 1 in the `/design-review` chain, and can also run standalone.

When running in the `/design-review` chain:
- Step 1: design-policy-review (this skill)
- Step 2: vuetify-constraint-check
- Step 3: Final review summary

When running standalone, deliver a full response (not intermediate format).

---

## Workflow

### Step 1: Collect input

Ask the designer to describe or paste:
- The feature being reviewed
- The states that have been designed (happy path, empty, error, loading, etc.)
- Any specific decisions they want checked

If running in chain, inputs come from the `/design-review` command context.

### Step 2: Run the policy checklist

Check all five required areas from `design-policy-first.md`:

**1. Vuetify coverage**
- For each UI element, is there a Vuetify component that covers it?
- Flag any element that requires a custom component or DOM override.
- Note: deep Vuetify analysis is done in `vuetify-constraint-check` — only flag obvious gaps here.

**2. RTL layout**
- Does the design work correctly in RTL?
- Are directional assumptions explicit (padding-inline, not padding-left)?
- Are directional icons mirrored (arrows, chevrons, back buttons)?
- Is text alignment using `start`/`end`, not `left`/`right`?

**3. States coverage**
- Are all required states present?
  - Happy path
  - Empty state (for any data-dependent screen)
  - Loading (for any async operation)
  - System error
  - User input error
  - Feature-specific edge cases
- Flag any missing state.

**4. Microcopy quality**
- Do button labels use action verbs?
- Do error messages explain what happened AND tell the user what to do?
- Are labels concise (under 3 words where possible)?
- Is the tone consistent with the product's voice?

**5. Accessibility baseline**
- Do text and background color combinations meet WCAG AA contrast (4.5:1 for normal text, 3:1 for large)?
- Are touch targets at least 44×44px?
- Are interactive elements distinguishable from static content?

### Step 3: Build the output

Use the flag format from `design-standard.md` consistently.

For each check area, report:
- ✓ Confirmed — if fully compliant, no action needed
- 🔴 Blocker — if a required item is missing or non-compliant
- 🟡 Important — if an item should be resolved in this phase
- ⚠️ Policy conflict — if the design deviates from `design-policy.md`

---

## Output template

### Full response (standalone)

```
## Design Policy Review: [Feature Name]

### Summary
[One paragraph: what was reviewed, overall compliance status, number of blockers/issues]

### Checklist results

**Vuetify coverage**
[✓ / 🔴 / 🟡 per finding]

**RTL layout**
[✓ / 🔴 / 🟡 per finding]

**States coverage**

| State | Status |
|---|---|
| Happy path | ✓ Covered / ⚠️ Missing |
| Empty state | ✓ Covered / ⚠️ Missing |
| Loading | ✓ Covered / ⚠️ Missing |
| Error (system) | ✓ Covered / ⚠️ Missing |
| Error (user input) | ✓ Covered / ⚠️ Missing |

**Microcopy quality**
[✓ / 🔴 / 🟡 per finding]

**Accessibility baseline**
[✓ / 🔴 / 🟡 per finding]

### Required actions
[Numbered list of items that must be resolved before handoff]

### Optional improvements
[Items that would improve quality but are not blockers]
```

### Intermediate response (in chain)

```
Step 1 complete. Proceeding to vuetify-constraint-check.
[One sentence: overall policy compliance status and number of blockers found]
```

---

## Constraints

- Never approve a design with unresolved blockers — the summary must reflect the true status
- Never skip the states coverage table — even if all states are covered
- Never make design decisions on behalf of the designer — flag conflicts, present options
- Do not perform deep Vuetify analysis in this skill — that is `vuetify-constraint-check`'s job

## Context variables (populated from CLAUDE.md)

- Working language (for all prose in output)
- Product name (for microcopy tone reference)
