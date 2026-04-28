---
description: Start a complete feature development process from problem framing to DOD and wireframe
---

⚠️ **Plan mode check:** If plan mode is currently active (the system has told you to write to a `~/.claude/plans/` file), STOP immediately. Tell the user: "Plan mode is active — please exit plan mode before running this command. While plan mode is on, deliverables cannot be saved to `.claude/outputs/`." Do not proceed until plan mode is off.

---

**Session folder:** At step 1, derive a kebab-case slug from the feature name (e.g. `media-metrics`, `payment-flow-redesign`). Use this slug as the folder name for ALL deliverables produced in this session: `.claude/outputs/{session-slug}/`. Do not split outputs by format — all files (md, html) go into the same session folder.

---

Start a complete process for defining a new feature. Run each step in order and wait for PM approval before proceeding to the next.

**Step 1 — Problem Framing**
Run the `problem-framing` skill.
Output: DOD, preliminary edge cases, preliminary dependencies.

**Step 2 — Feature Dependency**
Run the `feature-dependency` skill using the output from Step 1.
Output: Technical dependency report, complexity estimate, questions for engineering.

**Step 3 — Edge Case Finder**
Run the `edge-case-finder` skill using outputs from Steps 1 and 2.
Output: Prioritized edge cases with risk levels and required UI states.

**Step 3.5 — Design System Check**
Run the `design-system-check` skill using the feature's UI needs surfaced in Steps 1–3.
Output: Available components, components needing extension, and new components required.
This step informs the wireframe — the wireframe must use existing components wherever possible.

**Step 4 — Wireframe Generator**
Run the `wireframe-generator` skill using all edge cases and states from Step 3, and available components from Step 3.5.
Output: Mid-fidelity HTML wireframe covering all states, using existing design system components.

**Step 5 — Feature Spec**
Run the `feature-spec` skill, consolidating all outputs from Steps 1-4.
Consolidate all out-of-scope notes from previous steps into a single Out of Scope section.
Output: Complete feature spec ready for team handoff.

---

Target feature: $ARGUMENTS

If $ARGUMENTS is empty, ask the PM to describe the feature before starting Step 1.
