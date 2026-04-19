# Context: wireframe-generator — [Product Name]

> This file is populated by the Designer Interview engine. Replace the placeholders below with product-specific values after running the interview.

---

## Product context

- **Product name:** [Product Name]
- **Product mission:** [One sentence describing what the product does and for whom]
- **Working language:** [fa / en — determines UI label language in wireframes]
- **Platform:** [mobile-first / desktop-first / both]
- **RTL layout:** [yes / no]

---

## When designers use this skill

Run `wireframe-generator` before opening Figma. The wireframe output serves as a **layout exploration artifact** — it answers "which UX pattern fits this feature?" before visual design begins.

Share the generated HTML with the PM and Tech team to align on the pattern choice. Start Figma work only after the pattern decision is made.

---

## Design system alignment

> These rules prevent wireframe patterns from conflicting with what the design system can actually support.

| Pattern | Supported in design system? | Notes |
|---|---|---|
| Modal | [Yes / Partial / No] | [e.g., "Use VDialog — max-width 480px"] |
| Side drawer | [Yes / Partial / No] | [e.g., "Use VNavigationDrawer — right side"] |
| Inline expansion | [Yes / Partial / No] | [e.g., "No component — custom implementation needed"] |
| Full page form | [Yes / Partial / No] | [e.g., "Standard page layout — no extra component needed"] |
| Wizard / Stepper | [Yes / Partial / No] | [e.g., "Use VStepper component"] |
| Bottom sheet | [Yes / Partial / No] | [e.g., "VBottomSheet — mobile only"] |

---

## Interaction pattern preferences

> Team-agreed conventions for when to use which pattern. Update after design reviews.

| Pattern | Team stance | Notes |
|---|---|---|
| Modal | Preferred / Neutral / Avoid | |
| Side drawer | Preferred / Neutral / Avoid | |
| Inline expansion | Preferred / Neutral / Avoid | |
| Full page form | Preferred / Neutral / Avoid | |
| Bottom sheet | Preferred / Neutral / Avoid | |
| Wizard / Stepper | Preferred / Neutral / Avoid | |

---

## Realistic demo content

> The wireframe uses realistic (but fictional) data so reviewers focus on flow, not placeholder text.

- **Typical item names:** [e.g., "Invoice #1042", "User: Ali Rezaei", "Order #88-B"]
- **Typical statuses:** [e.g., "Pending", "Approved", "Rejected", "In Progress"]
- **Typical actions:** [e.g., "Submit", "Approve", "Archive", "Assign"]
- **Typical field labels:** [e.g., "Title", "Due Date", "Assignee", "Notes"]

---

## Handoff note

After the team picks a pattern from the wireframe HTML, record the decision in `decision-logger` and begin the Figma design using:

1. The selected interaction pattern from the wireframe
2. The state list from the wireframe (happy, empty, loading, error, edge cases)
3. Real Vuetify 3 components as mapped in `figma-to-vue-rules.md`

Do not redesign patterns that have been decided in the wireframe phase without flagging it as a scope change.

---

## Notes for this product

[Any product-specific constraints, UX conventions, or team decisions that affect wireframe generation. Examples:]

- [e.g., "All destructive actions must show a confirmation modal — no inline confirm"]
- [e.g., "Designer owns the final pattern decision — wireframe is a proposal, not a mandate"]
- [e.g., "RTL layout is required — test all patterns in RTL before presenting"]
