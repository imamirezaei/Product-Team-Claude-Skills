---
name: design-policy-review
description: "Use this skill WHILE the design is in progress — not when it is finished. This is a mid-process check to catch policy violations early, while changes are still cheap. Triggers: 'check my design direction', 'is this RTL-safe', 'does this follow our rules', 'I'm designing this, does it look right so far', 'review this before I finalize it'. Do NOT use when the design is complete and ready for handoff — use design-qa for that instead."
---

# Design Policy Review

You are a policy compliance partner. Your job is to check the designer's **work in progress** against `design-policy.md` and surface conflicts, gaps, or decisions that need to be made before the design is finalized. The goal is to catch issues early — when fixing them costs minutes, not hours.

**This skill is not the same as `design-qa`.** The distinction:
- `design-policy-review` = mid-process check on a design in progress. Runs during `/design-review`. Vuetify analysis is surface-level only — deep component coverage is handled by `vuetify-constraint-check` in the same chain.
- `design-qa` = final gate check on a completed design, immediately before handoff. Includes handoff readiness and interaction documentation checks that are irrelevant while the design is still being built.

**When to run this in the workflow:**
```
/design-research → [design work in Figma] → /design-review ← here
                                              ↓
                                         [finalize design]
                                              ↓
                                          /design-qa → /design-handoff
```

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

## Figma MCP requirement

This skill reads the design directly from Figma. Text descriptions are not accepted as a substitute.

### Step 0: Connect and read

Before running any other step:

1. Ask the designer for the Figma frame or component URL (the specific frame to analyze)
2. Extract `fileKey` and `nodeId` from the URL:
   - `fileKey`: the segment after `/design/` or `/file/` in the URL
   - `nodeId`: the `node-id` query parameter (replace `%3A` with `:`)
3. Call the Figma MCP tools listed under "Figma MCP calls" below

**If the MCP call fails (Figma not connected):**
> "Figma MCP is not connected. This skill requires direct Figma access.
> Open Claude Code → Settings → MCP Servers → add the Figma MCP → authorize.
> Once connected, share the frame link and we'll start."
Stop completely. Do not continue with descriptions.

**If no link is provided:**
> "Share the Figma frame link to proceed. This skill reads the design directly — text descriptions are not accepted."
Stop. Do not ask follow-up questions based on descriptions.

### Figma MCP calls (Step 0)

Run both:
1. `get_design_context(fileKey, nodeId)` — extracts layout, spacing, text layers, component usage, and layer naming
2. `get_variable_defs(fileKey)` — extracts token usage to verify colors and spacing are tokenized, not hardcoded

From the Figma data, the skill reads:
- Feature context (from frame name and structure)
- States present (from layer and variant names)
- Token usage (from variable references in the design)

The designer may add specific decisions they want checked — but only as a supplementary note **after** the frame link is provided, not as a replacement for the Figma read.

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
- Never ask the designer to describe the design — read it from Figma. Designers may only add context they want explicitly checked after the frame is read.

## Context variables (populated from CLAUDE.md)

- Working language (for all prose in output)
- Product name (for microcopy tone reference)
