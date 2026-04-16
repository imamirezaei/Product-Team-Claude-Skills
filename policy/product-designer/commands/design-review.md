---
description: Run a full design review — policy compliance check followed by Vuetify constraint check
---

Run a complete design review on the current feature design.

This command runs two skills in sequence and produces a unified review report.

## Chain

**Step 1 — design-policy-review**
Check the design against all required areas: Vuetify coverage (surface level), RTL layout, state coverage, microcopy quality, and accessibility baseline.

At the end of step 1, output the intermediate format:
```
Step 1 complete. Proceeding to vuetify-constraint-check.
[One sentence: overall policy compliance status and number of blockers found]
```

**Step 2 — vuetify-constraint-check**
For every UI component in the design, verify Vuetify 3 coverage. Map each element to a component, check theming compliance, and flag any gaps with options.

**Step 3 — Final summary**
After both skills complete, produce a unified review report using the Full Response format from `design-standard.md`:

1. **Summary** — overall verdict, total findings by severity
2. **Findings** — organized by category (policy / Vuetify / microcopy), using flag format
3. **Required actions** — all 🔴 Blockers numbered, clear owner (designer / PM / design system)
4. **Optional improvements** — all 🟢 Suggestions

## How to start

Ask the designer to provide:
- Feature name
- All designed states (list them)
- Description of each state or Figma link
- Any design decisions made that deviate from defaults

## Output language

Read `working-language` from `CLAUDE.md`. Deliver all prose in that language. Component names, prop names, and flag labels stay in English.
