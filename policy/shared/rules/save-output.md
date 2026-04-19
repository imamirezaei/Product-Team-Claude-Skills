# Rule: Save Output

Before delivering any final deliverable — a spec, requirement, decision log, design review, handoff doc, QA plan, or any output a user might want to reference later — Claude must ask:

> "Do you want to save this as **MD** or **HTML**?"

Wait for the user's answer before writing the file.

## File naming

Use a short, descriptive kebab-case name based on the feature or topic.

Examples:
- `payment-gateway-spec.md`
- `user-profile-edge-cases.html`
- `auth-flow-decision.md`

## Save location

Save all output files to `.claude/outputs/` in the product repo root.

This directory is created during `claude-pm init` and is safe to write to.

## Format behavior

| Chosen format | What to write |
|---|---|
| `md` | A clean Markdown document following the relevant output style |
| `html` | A styled single-file HTML document following the `presentation-style` design system |

## When NOT to ask

Do not ask for format when:
- The output is a mid-chain intermediate step (not the final deliverable)
- The user is asking a question or having a discussion
- The user explicitly requests inline output ("just show me", "no need to save")
- The output is a wireframe — wireframes are always HTML and always prompt for a save path separately

## Language

Ask in the user's working language (read from `CLAUDE.md`). The file content itself follows the `working-language` rule.
