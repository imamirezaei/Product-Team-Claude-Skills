---
name: wireframe-generator
description: "Use this skill to generate interactive HTML wireframes showing a feature in multiple states AND multiple interaction pattern variants. Triggers: 'show me what this looks like', 'generate a wireframe', 'I want to see all the states', 'show me different ways to implement this', 'make a visual prototype of the flow', 'what are the different UX options for this feature', or when running as step 4 in the /new-feature command chain."
---

# Wireframe Generator

You are a product design partner embedded in both the PM's and Designer's workflow. Your job is to generate mid-fidelity HTML wireframes that do two things simultaneously:

1. **Show all states** of a feature — happy path, empty, loading, error, and every edge case that needs a UI state
2. **Show multiple interaction pattern variants** for every key interaction — so the team can compare layout patterns (modal vs. sidebar vs. inline expansion vs. full page, etc.) and choose the best UX before any design or engineering work begins

These wireframes are **not visual designs**. They must look clearly unfinished. They communicate structure, hierarchy, flow, and interaction behavior — not color, brand, or aesthetic choices.

---

## Who uses this skill

This is a **shared skill** — both Product Managers and Product Designers run it:

- **PM**: runs it after `edge-case-finder` to validate flow decisions and align with the designer before Figma work starts
- **Designer**: runs it to explore layout patterns and present trade-offs to the team before committing to a design direction

The output HTML is shared with the entire team (PM, Designer, Tech) as a decision artifact.

---

## Chain position

When running in the `/new-feature` command chain, this skill runs as **step 4** (after `edge-case-finder`). Every edge case flagged as "UI state needed: yes" in step 3 must appear as a navigable state in the wireframe.

When running standalone, gather inputs directly from the user (see Step 1).

---

## Workflow

### Step 1 — Gather inputs

Confirm the following are available. If not, ask for them before generating:

| Input | Source | Required |
|---|---|---|
| Feature name and one-sentence description | User | Yes |
| Happy path — step-by-step user flow | `problem-framing` or user | Yes |
| Edge cases with risk levels | `edge-case-finder` or user | Recommended |
| Key user actions (what the user clicks / submits / triggers) | User | Yes |
| Platform (mobile-first, desktop-first, or both) | `CLAUDE.md` or user | Yes |
| Any patterns to include or avoid | User | Optional |

---

### Step 2 — Identify interaction decision points

Read the happy path and scan for every **interaction decision point** — a moment in the flow where multiple valid UX patterns exist and the team must choose one.

**Common triggers:**

| Interaction type | Pattern decision needed |
|---|---|
| Click → show new content or form | Yes — modal, side drawer, inline expand, full page |
| Form submit → confirmation or result | Yes — inline alert, modal, toast notification, redirect |
| Long-form input (5+ fields) | Yes — single page, wizard/stepper, multi-step modal |
| List item → detail view | Yes — full page route, side panel, inline expand, modal |
| Destructive action (delete, archive) | Yes — inline confirm, modal confirm, undo toast |
| Filter / search panel | Yes — sidebar filter, top filter bar, filter chips |
| Bulk action on selected items | Yes — sticky bottom bar, top toolbar, contextual dropdown |
| Navigation to a sub-section | Yes — tabs, accordion, full page route, modal |
| File or media upload | Yes — inline drop zone, modal picker, floating panel |
| Settings or preferences | Yes — full page settings, side drawer, modal |

For each decision point, select **2 to 4 candidate patterns**. Do not list more than 4 — it creates decision paralysis.

Name each pattern clearly in the wireframe: "Modal", "Side Drawer", "Inline Expand", "Full Page Form", etc.

---

### Step 3 — Define the state list

Enumerate every state to be wireframed. These apply **within each pattern variant**:

| State | Source | Required |
|---|---|---|
| Happy path | Feature description | Always |
| Empty state | All data-dependent screens | Always |
| Loading | All async data | Always |
| System error | Always | Critical |
| Form validation error | Features with forms | If applicable |
| Success / completion confirmation | Post-action screens | If applicable |
| Permission denied / access gated | Role-restricted features | If applicable |
| [Edge case states from step 3] | `edge-case-finder` output | Per risk level |

---

### Step 4 — Generate the HTML wireframe

Produce a **single self-contained HTML file** with a two-level navigation system.

#### Navigation architecture

**Level 1 — Pattern Variant Bar (top, fixed)**
One button per interaction pattern variant. Pattern names and count come from Step 2 — not hardcoded. Examples: "Dashboard Cards", "Data Table", "Kanban Board", "Timeline View", "List + Filter", "Wizard", "Inline Edit", "Split View".

**Level 2 — State Bar (below pattern bar, fixed)**
One button per state defined in Step 3. States apply within each pattern.

#### How to build the HTML

The wireframe is a **single self-contained HTML file**. Build it fresh for each feature — do not assume a fixed set of patterns. The structure is always the same; only the content changes.

**CSS:** Use all tokens, components, and layout rules defined in `wireframe-design-system.md`. Do not redefine them here — read that file and inline the CSS into the `<style>` block of the generated HTML. Add only feature-specific layout CSS on top of the design system base.

**Additional CSS required for the two-level navigation (not in design system):**

```css
.pattern-nav { position:fixed; top:0; left:0; right:0; background:#111; padding:10px 16px; display:flex; align-items:center; gap:8px; z-index:1000; flex-wrap:wrap; }
.pattern-nav-label { color:#888; font-size:11px; font-family:system-ui,sans-serif; }
.pattern-btn { background:transparent; color:#bbb; border:1px solid #444; padding:5px 14px; border-radius:5px; font-size:12px; font-family:system-ui,sans-serif; cursor:pointer; }
.pattern-btn.active { background:#fff; color:#111; border-color:#fff; font-weight:600; }
.state-nav { position:fixed; top:41px; left:0; right:0; background:#222; padding:7px 16px; display:flex; gap:6px; z-index:999; flex-wrap:wrap; }
.page-body { padding-top:84px; padding-bottom:40px; }
.frame { max-width:900px; margin:0 auto; padding:24px 16px; }
.screen { background:var(--surface); border:1px solid var(--border); border-radius:8px; overflow:hidden; min-height:520px; }
.screen-header { padding:14px 20px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
.screen-title { font-size:16px; font-weight:600; color:var(--text-primary); font-family:system-ui,sans-serif; }
.screen-body { padding:20px; }
.pattern-view { display:none; } .pattern-view.active { display:block; }
.state-view { display:none; } .state-view.active { display:block; }
.tradeoff-panel { background:#fffde7; border:1px solid #f0d060; border-radius:8px; padding:14px 18px; margin-bottom:24px; font-family:system-ui,sans-serif; font-size:13px; }
.tradeoff-title { font-weight:700; font-size:13px; color:#333; margin-bottom:10px; }
.tradeoff-cols { display:flex; gap:24px; flex-wrap:wrap; }
.tradeoff-col { flex:1; min-width:200px; }
.tradeoff-col strong { font-size:12px; color:#555; display:block; margin-bottom:6px; }
.tradeoff-col ul { margin:0; padding-inline-start:16px; }
.tradeoff-col li { margin-bottom:4px; line-height:1.5; color:#444; }
.tradeoff-pro strong { color:#27ae60; }
.tradeoff-con strong { color:#c0392b; }
```

**Required JavaScript (always include exactly this):**

```js
let currentPattern = null;
document.addEventListener('DOMContentLoaded', () => {
  const firstPatternBtn = document.querySelector('.pattern-btn');
  if (firstPatternBtn) firstPatternBtn.click();
});
function showPattern(patternId) {
  document.querySelectorAll('.pattern-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.pattern-btn').forEach(btn => btn.classList.remove('active'));
  const pv = document.getElementById('pattern-' + patternId);
  if (pv) pv.classList.add('active');
  event.target.classList.add('active');
  currentPattern = patternId;
  const firstStateBtn = document.querySelector('.state-btn');
  if (firstStateBtn) { document.querySelectorAll('.state-btn').forEach((b,i) => b.classList.toggle('active', i===0)); }
  showStateForPattern(patternId, document.querySelector('.state-btn')?.dataset.state || 'happy');
}
function showStateForPattern(patternId, stateId) {
  const prefix = patternId + '-';
  document.querySelectorAll('[id^="' + prefix + '"]').forEach(el => el.classList.remove('active'));
  const sv = document.getElementById(prefix + stateId);
  if (sv) sv.classList.add('active');
}
function showState(stateId) {
  if (!currentPattern) return;
  showStateForPattern(currentPattern, stateId);
  document.querySelectorAll('.state-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}
```

**HTML skeleton (fill in based on the feature):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wireframe — [Feature Name]</title>
  <style>
    /* paste required CSS tokens + structural CSS here */
    /* add any additional layout CSS this feature needs */
  </style>
</head>
<body>

<!-- PATTERN VARIANT BAR — one button per pattern identified in Step 2 -->
<div class="pattern-nav">
  <span class="pattern-nav-label">Pattern:</span>
  <button class="pattern-btn" onclick="showPattern('p1')">[Pattern 1 Name]</button>
  <button class="pattern-btn" onclick="showPattern('p2')">[Pattern 2 Name]</button>
  <!-- add p3, p4 if needed — max 4 -->
</div>

<!-- STATE BAR — one button per state identified in Step 3 -->
<div class="state-nav">
  <button class="state-btn" data-state="happy" onclick="showState('happy')">Happy Path</button>
  <button class="state-btn" data-state="empty" onclick="showState('empty')">Empty State</button>
  <button class="state-btn" data-state="loading" onclick="showState('loading')">Loading</button>
  <button class="state-btn" data-state="error" onclick="showState('error')">Error</button>
  <!-- add edge case states here, e.g.: <button class="state-btn" data-state="expired" onclick="showState('expired')">Expired Session</button> -->
</div>

<div class="page-body">

  <!-- ═══════════════════════════════════ -->
  <!-- PATTERN 1: [Pattern 1 Name]        -->
  <!-- ═══════════════════════════════════ -->
  <div id="pattern-p1" class="pattern-view">
    <div class="frame">

      <!-- Trade-off panel: explain when this pattern fits and when it doesn't -->
      <div class="tradeoff-panel">
        <div class="tradeoff-title">[Pattern 1 Name] — When to choose this</div>
        <div class="tradeoff-cols">
          <div class="tradeoff-col tradeoff-pro">
            <strong>✓ Use when:</strong>
            <ul>
              <li>[reason 1]</li>
              <li>[reason 2]</li>
            </ul>
          </div>
          <div class="tradeoff-col tradeoff-con">
            <strong>✗ Avoid when:</strong>
            <ul>
              <li>[reason 1]</li>
              <li>[reason 2]</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- STATES: render each state for this pattern -->
      <div id="p1-happy" class="state-view">
        <div class="screen">
          <div class="screen-header">
            <span class="screen-title">[Screen Title]</span>
            <!-- primary actions for this pattern go here -->
          </div>
          <div class="screen-body">
            <!-- feature UI for Pattern 1, happy path -->
            <!-- use placeholder-block divs for content areas not yet defined -->
            <!-- use annotation spans to explain interaction decisions inline -->
          </div>
        </div>
      </div>

      <div id="p1-empty" class="state-view">
        <div class="screen">
          <div class="screen-header"><span class="screen-title">[Screen Title]</span></div>
          <div class="screen-body">
            <div class="empty-state">
              <div class="empty-icon">○</div>
              <div class="empty-title">[Nothing here yet — what belongs here?]</div>
              <div class="empty-body">[Explain how to create the first item]</div>
              <button class="btn-primary">[Primary CTA]</button>
            </div>
          </div>
        </div>
      </div>

      <div id="p1-loading" class="state-view">
        <div class="screen">
          <div class="screen-header"><span class="screen-title">[Screen Title]</span></div>
          <div class="screen-body">
            <div class="loading-state">
              <div class="spinner"></div>
              <div class="loading-text">Loading...</div>
            </div>
          </div>
        </div>
      </div>

      <div id="p1-error" class="state-view">
        <div class="screen">
          <div class="screen-header"><span class="screen-title">[Screen Title]</span></div>
          <div class="screen-body">
            <div class="alert alert-error"><strong>Something went wrong</strong> — [what happened and what can the user do]</div>
            <button class="btn-secondary">Retry</button>
          </div>
        </div>
      </div>

      <!-- add edge case states here, following the same id convention: p1-[stateId] -->

    </div>
  </div>

  <!-- ═══════════════════════════════════ -->
  <!-- PATTERN 2: [Pattern 2 Name]        -->
  <!-- ═══════════════════════════════════ -->
  <div id="pattern-p2" class="pattern-view">
    <div class="frame">
      <!-- same structure as Pattern 1 — tradeoff panel + all states -->
      <!-- state div ids use prefix p2-: p2-happy, p2-empty, p2-loading, p2-error, ... -->
    </div>
  </div>

  <!-- repeat for p3, p4 if needed -->

</div><!-- /page-body -->

<script>
  /* paste required JavaScript here */
</script>

</body>
</html>
```

> **Filling in the template:** Replace every `[placeholder]` with real content from the feature description and edge case list. The patterns, their names, and their UI structure come entirely from Step 2 — not from a fixed library. A dashboard feature gets chart/card variants. A list feature gets filter-bar/search variants. A form flow gets wizard/single-page variants. Match the patterns to what this feature actually needs.

---

## Pattern library reference

Use this to select which patterns to include as variant tabs:

### Overlay patterns — interrupt user flow

| Pattern | Best for | Avoid when |
|---|---|---|
| **Modal dialog** | Focused form (2–5 fields), destructive confirm, important alert | Needs background reference, complex form, mobile-first |
| **Full-screen modal** | Complex form on mobile | Desktop-primary product |
| **Side drawer** | Detail view or settings alongside main content | Mobile-first, form is too long for a panel |
| **Bottom sheet** | Mobile-first quick actions, lightweight pickers | Desktop product, complex forms |
| **Popover / Tooltip** | Contextual help, quick action inline | Primary content, forms, destructive actions |

### In-page patterns — preserve user flow

| Pattern | Best for | Avoid when |
|---|---|---|
| **Inline expansion** | Simple edit (1–3 fields) within a list | Complex validation, destructive actions |
| **Accordion** | Grouped toggleable sections | Items that need to be compared side-by-side |
| **Inline form** | Quick add in a table row | Complex validation, 4+ fields |
| **Wizard / Stepper** | Multi-step flow with clear progress | Simple 1-step actions |
| **Tab panel** | Switching between related content sets | Unrelated content, too many tabs |

### Navigation patterns — leave current context

| Pattern | Best for | Avoid when |
|---|---|---|
| **Full page route** | Complex creation or edit form (6+ fields) | User needs to reference the previous page |
| **Split view** | Master-detail on desktop | Mobile-first, narrow viewports |

---

## Output format (after the HTML code block)

```
Feature: [Feature name]
Generated: [date]

Interaction decision points:
→ [Interaction]: [Pattern A] · [Pattern B] · [Pattern C] · [Pattern D]

States covered per pattern:
✓ Happy path
✓ Empty state
✓ Loading
✓ System error
✓ [Edge case state 1] — from edge-case-finder: risk [level]
✓ [Edge case state 2] — from edge-case-finder: risk [level]

Open decisions flagged in wireframe:
⚠ [Decision 1] — owner: [PM / Designer]
⚠ [Decision 2] — owner: [PM / Designer]

States NOT covered (out of scope):
- [State] — reason

Recommendation:
[One paragraph — which pattern you lean toward and why, based on form complexity, platform (mobile/desktop), and whether the user needs to reference background content. Frame this as a starting point for team discussion, not a final decision.]
```

---

## Constraints

- Never use the product's real design system (Vuetify components, brand colors) — wireframes must look clearly unfinished
- Always include at least 2 pattern variants. Never generate a single-pattern wireframe — that is a design decision, not a wireframe
- Maximum 4 pattern variants per wireframe — more creates decision paralysis
- Every pattern must include a trade-off panel (use when / avoid when)
- Never skip empty state or loading state — they are always required
- Never skip a state marked Critical in the edge case output
- Every state must be reachable from the state navigation bar — no dead states
- Do not add features or flows not described in the input — apply the no-scope-expansion rule
- HTML must be a single self-contained file — no external dependencies

## Context variables (populated from CLAUDE.md)

- `working-language` — UI labels, button text, placeholder text, and on-screen copy must be in this language
- `product-name` — used for realistic demo content
- `platform` — mobile-first or desktop-first; affects which patterns are recommended
- `rtl` — if true, use `dir="rtl"` on the HTML element
