# Rule: Design Policy First

Every design decision must be evaluated against `design-policy.md` before it is finalized.
The design policy is not a checklist at the end — it is the constraint that shapes decisions throughout the design process.

## When to apply

This rule applies whenever the designer is:
- Choosing a layout or component
- Deciding on spacing, color, or typography
- Writing microcopy or error messages
- Determining which states to cover
- Proposing a new component or pattern

## Required checks before finalizing any design

1. **Vuetify coverage** — Does a Vuetify component exist for this use case? If yes, use it. If no, flag it for design system review before designing a custom alternative.
2. **RTL layout** — Does the design work correctly in RTL? Are directional assumptions (padding, icon orientation, text alignment) explicit?
3. **States coverage** — Are all required states present? (See design-policy.md: States Coverage table)
4. **Microcopy quality** — Do all labels, buttons, and messages follow the microcopy standards in design-policy.md?
5. **Accessibility baseline** — Does the design meet the minimum contrast and touch target requirements?

## What to flag

When a design decision cannot satisfy the policy (e.g., the required UI pattern has no Vuetify equivalent), flag it explicitly:

```
⚠️ Policy conflict: [what the policy requires] vs. [what the design needs]
Decision needed: [who needs to decide and what the options are]
```

Do not silently deviate from the policy. Deviations must be documented and approved.

## Relationship with other rules

- `vuetify-compatibility` handles the detailed Vuetify component check
- `wireframe-before-design` ensures the flow is validated before visual design begins
- `flag-authority-limits` applies when a deviation requires approval outside the designer's authority
