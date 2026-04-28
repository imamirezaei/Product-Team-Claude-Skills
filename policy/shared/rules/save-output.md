# Rule: Save Output

Before delivering any final deliverable — a spec, requirement, decision log, design review, handoff doc, QA plan, or any output a user might want to reference later — Claude must ask:

> "Do you want to save this as **MD** or **HTML**?"

Wait for the user's answer before writing the file.

## File naming

Use a short, descriptive kebab-case name based on the feature or topic, followed by the current date in **Jalali (Shamsi) calendar** formatted as `YYYYMMDD`.

Pattern: `{topic-slug}-{jalali-date}.{ext}`

Examples:

- `payment-gateway-spec-14050131.md`
- `user-profile-edge-cases-14050215.html`
- `auth-flow-decision-14050312.md`

To determine today's Jalali date, read it from the `currentDate` field in the session context (provided as a Gregorian date) and convert to Jalali. If conversion is not possible, ask the user for today's Jalali date before saving.

## Save location

Save files to `.claude/outputs/{session-slug}/` in the product repo root, where `{session-slug}` is a kebab-case slug derived from the current session topic or feature name.

All formats go into the same session folder:

| Format | Save path                                    |
| ------ | -------------------------------------------- |
| `md`   | `.claude/outputs/{session-slug}/filename.md` |
| `html` | `.claude/outputs/{session-slug}/filename.html` |

The session slug stays consistent across all outputs produced in the same working session. For `/new-feature`, the slug is derived from the feature name at step 1 and reused for all subsequent deliverables (spec, wireframe, edge cases).

## Format behavior

| Chosen format | What to write                                                                       |
| ------------- | ----------------------------------------------------------------------------------- |
| `md`          | A clean Markdown document following the relevant output style                       |
| `html`        | A styled single-file HTML document following the `presentation-style` design system |

## When NOT to ask

Do not ask for format when:

- The output is a mid-chain intermediate step (not the final deliverable)
- The user is asking a question or having a discussion
- The user explicitly requests inline output ("just show me", "no need to save")
- The output is a wireframe — wireframes are always HTML and always prompt for a save path separately

## Language

Ask in the user's working language (read from `CLAUDE.md`). The file content itself follows the `working-language` rule.
