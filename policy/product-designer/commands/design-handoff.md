---
description: Prepare a complete handoff package for engineering — Vuetify constraint check followed by handoff document generation
---

Prepare a complete, engineering-ready handoff package for the current feature design.

This command runs two skills in sequence and produces a handoff document that engineering can implement without follow-up questions.

## Chain

**Step 1 — vuetify-constraint-check**
Verify that every UI component in the design has a Vuetify 3 equivalent. Map all components, check theming compliance, and resolve or document any gaps before proceeding.

If any ⚠️ Vuetify gap is unresolved and marked `Blocked: yes`, stop here. The designer must resolve the gap before the handoff document is generated.

At the end of step 1 (if all gaps are resolved or non-blocking), output:
```
Step 1 complete. Proceeding to design-handoff.
[One sentence: number of components checked, gaps found (or none), status]
```

**Step 2 — design-handoff**
Generate the complete handoff document including:
- Prerequisites confirmation (Vuetify check, policy review, state coverage, PM wireframe approval)
- State table
- Component specification (Vuetify component + props + slots + theme tokens per element)
- Interaction behavior table
- Design decisions log
- Open items (must be minimal)

## How to start

Ask the designer to confirm:
1. Has `design-policy-review` been run and passed? (No unresolved policy blockers)
2. Are all required states designed? (Happy path, empty, loading, error states)
3. Has the PM approved the wireframe this design is based on?

Then ask for:
- Feature name
- List of all designed states
- Description of each state or Figma link

## Output language

Read `working-language` from `CLAUDE.md`. Deliver all prose in that language. All component names, prop names, and code stay in English.
