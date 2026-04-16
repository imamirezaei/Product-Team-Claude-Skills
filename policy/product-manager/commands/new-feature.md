---
description: Start a complete feature development process from problem framing to DOD and wireframe
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

**Step 4 — Wireframe Generator**
Run the `wireframe-generator` skill using all edge cases and states from Step 3.
Output: Mid-fidelity HTML wireframe covering all states (happy path, empty, error, edge cases).

**Step 5 — Feature Spec**
Run the `feature-spec` skill, consolidating all outputs from Steps 1-4.
Consolidate all out-of-scope notes from previous steps into a single Out of Scope section.
Output: Complete feature spec ready for team handoff.

---

Target feature: $ARGUMENTS

If $ARGUMENTS is empty, ask the PM to describe the feature before starting Step 1.
