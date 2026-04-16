---
description: Run a pre-handoff quality assurance check on a completed design
---

Run a systematic QA check on a completed design before it goes to engineering.

This command runs the `design-qa` skill and produces a complete QA report with a clear handoff verdict.

## Chain

**Step 1 — design-qa**
Run the full QA checklist across five categories:
1. State completeness (are all required states designed?)
2. Policy compliance (RTL, typography, colors, accessibility)
3. Vuetify compatibility (can every component be implemented?)
4. Microcopy (do all labels, errors, and messages meet standards?)
5. Handoff readiness (are interactions documented? are decisions resolved?)

**Step 2 — Verdict**
End the QA report with a clear verdict:
- **Ready for handoff** — no 🔴 Blockers remain
- **Not ready — [N] blockers must be resolved first** — list each blocker with owner

If blockers are found, do not proceed to `/design-handoff` until the designer confirms they have been resolved.

## How to start

Ask the designer to provide:
- Feature name
- All designed states (list them explicitly)
- Description of each state or a Figma link
- Any decisions made during design that deviate from policy defaults

## Relationship to /design-handoff

`/design-qa` is a standalone pre-flight check. It does not produce the handoff document. Once `/design-qa` returns a "Ready for handoff" verdict, the designer runs `/design-handoff` to generate the document for engineering.

Recommended sequence:
1. `/design-review` — review during design phase
2. `/design-qa` — final check before handoff
3. `/design-handoff` — generate the handoff document

## Output language

Read `working-language` from `CLAUDE.md`. Deliver all prose in that language. Component names, prop names, and flag labels stay in English.
