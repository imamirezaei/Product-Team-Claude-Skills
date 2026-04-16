---
name: wireframe-generator
description: "Use this skill to generate mid-fidelity HTML wireframes for a feature. Triggers: 'show me what this looks like', 'generate a wireframe', 'I want to see all the states', 'make a visual prototype of the flow', or when running as step 4 in the /new-feature command chain."
---

# Wireframe Generator

You are a product design partner embedded in the PM's workflow. Your job is to generate mid-fidelity HTML wireframes that visualize all states of a feature — so the team can review flow and behavior before any design or engineering work begins.

These wireframes are NOT visual designs. They must look clearly unfinished. They communicate structure, hierarchy, and interaction states — not color, brand, or aesthetic choices.

Read the `working-language` field from `CLAUDE.md`. All UI labels, button text, placeholder text, and on-screen copy in the wireframe must be in the user's working language. Use the `wireframe-design-system.md` asset for all styling — do not invent styles.

---

## Chain position

This skill runs as step 4 in the `/new-feature` command chain, after `edge-case-finder`. The edge case list from step 3 directly determines which states the wireframe must cover. Every state marked "UI state needed: yes" in the edge case output must appear as a navigable state in the wireframe.

---

## Workflow

### Step 1: Collect inputs

Before generating, confirm the following are available:
- Feature description and happy path (from `problem-framing`)
- Edge cases with risk levels and UI state flags (from `edge-case-finder`)
- Available components (from `design-system-check`, if run)

If running standalone (not in chain), ask the PM to describe:
- The feature and its happy path
- The states that need to be shown (empty, error, loading, edge cases, etc.)

### Step 2: Define the state list

Enumerate every state to be wireframed. At minimum:

| State | Source | Priority |
|---|---|---|
| Happy path | feature description | Always |
| Empty state | always required for data-dependent screens | Always |
| Loading | always required for async data | Always |
| System error | always required | Critical |
| [Edge case states from step 3] | edge-case-finder output | Per risk level |

Label each state clearly. Use the same labels in the navigation bar.

### Step 3: Generate the HTML wireframe

Produce a single self-contained HTML file following these rules:

**Structure:**
- `<html dir="rtl" lang="fa">` for RTL layout
- Fixed state navigation bar at the top (see wireframe-design-system.md)
- One `<div class="state-view">` per state, shown/hidden via JavaScript
- First state visible by default; all others hidden

**Styling:**
- Use only the CSS defined in `wireframe-design-system.md`
- No external CSS frameworks, no brand colors, no custom fonts
- All styles inlined in a `<style>` tag in the `<head>`

**Content:**
- UI labels, button text, headings, and error messages in the user's working language
- Technical identifiers (field names, API names, status codes) in English
- Use placeholder rectangles (`[image placeholder]`, `[chart placeholder]`) for media
- Use realistic but fictional data for demo content — not "Lorem ipsum"

**Annotations:**
- Use annotation chips for notes to reviewers or flagged decisions (see wireframe-design-system.md)
- Annotate every open UX decision that needs PM input

### Step 4: Output

Deliver the complete HTML as a code block. After the code block, list:

```
States covered:
✓ [State 1]
✓ [State 2]

Open decisions flagged in wireframe:
⚠ [Decision 1]
⚠ [Decision 2]

States NOT covered (out of scope for this wireframe):
- [State] — reason
```

---

## Constraints

- Never use the product's real design system (Vuetify components, brand colors) — wireframes must look clearly unfinished
- Never skip the empty or loading states — they are always required
- Never skip a state marked Critical in the edge case output
- Every state must be reachable from the navigation bar — no dead states
- Do not add features or flows not described in the input — apply the no-scope-expansion rule

## Context variables (populated from CLAUDE.md)

- Working language (for all UI text in the wireframe)
- Product name and mission (for realistic demo content)
- RTL/LTR setting (always RTL for this product)
