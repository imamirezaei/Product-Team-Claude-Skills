# Design Policy

This document defines the design constraints and principles that apply to all product design work. It is the reference used by `design-policy-review` and `design-policy-first` to evaluate design decisions.

All design work must be compatible with this policy before handoff to engineering.

---

## Tech Stack Constraint

The frontend is built with **Vue 3 + Vuetify 3**. All UI components must use or extend Vuetify components. Custom components from scratch are only permitted when:
1. No Vuetify component covers the use case, AND
2. The design system maintainer has approved the new component

This is a hard constraint, not a preference. Designs that require non-Vuetify components must be flagged at the design stage, not discovered during implementation.

---

## RTL-First

The product is RTL/Persian-first. All layouts, spacing, iconography, and text alignment must work correctly in RTL. LTR compatibility is secondary and should not drive layout decisions.

Specific rules:
- Use start/end directional language (not left/right) in design notes
- Icons with directional meaning (arrows, chevrons, back/forward) must be mirrored for RTL
- Padding and margin must be symmetric or explicitly specified for both sides
- Text in inputs, labels, and buttons follows the content language (Persian text = RTL, English text = LTR within RTL container)

---

## Pragmatism Over Creativity

This product serves a professional user base in a high-accountability context (financial, operational, or transactional). Design decisions must prioritize:

1. **Clarity** — the user must always know what state they are in and what action is available
2. **Predictability** — consistent patterns reduce cognitive load
3. **Maintainability** — designs that cannot be implemented with Vuetify in a reasonable time frame are out of scope

Creative exploration is welcome during discovery. In execution, defer to established patterns unless there is a specific user problem that requires deviation.

---

## Component Reuse

Before designing a new component:
1. Check the Vuetify component library for existing coverage
2. Check the product's design system for existing custom components
3. Check recent screens for similar patterns already in production

New components must be approved by the design system maintainer and documented before use.

---

## States Coverage

Every screen and component must define behavior for all applicable states:

| State | Required? |
|---|---|
| Default / loaded | Always |
| Empty (no data) | Required if list or data-dependent |
| Loading / skeleton | Required if async data |
| Error (system) | Required if data is fetched or submitted |
| Error (user input) | Required if form or input |
| Success / confirmation | Required if action has a result |
| Disabled | Required if element can be unavailable |
| Expired / invalid | Required if session, token, or status-dependent |

Designs submitted without all required states are incomplete.

---

## Microcopy Standards

- Labels, buttons, and messages must be in the working language (Persian unless otherwise configured)
- Error messages must explain what went wrong AND what the user should do next
- Button labels must be action verbs, not nouns ("Save" not "Save Button")
- Empty state copy must explain why it is empty and what the user can do
- Loading states must communicate progress when possible ("Loading your data..." not just a spinner)
- Avoid jargon in user-facing copy; technical terms are acceptable in internal labels

---

## Accessibility Baseline

- Color contrast: minimum 4.5:1 for body text, 3:1 for large text (WCAG AA)
- Interactive elements must have a visible focus state
- Form fields must have associated labels (not just placeholders)
- Error states must not rely on color alone — use an icon or text indicator
- Touch targets: minimum 44×44px on mobile views

---

## Handoff Requirements

A design is ready for handoff when:
- All required states are designed (see States Coverage above)
- All components are mapped to Vuetify equivalents or flagged for design system review
- Microcopy is finalized (not placeholder text)
- Spacing and layout use the design token system (not arbitrary values)
- The design has passed `design-policy-review` skill check
- The designer has verified Vuetify compatibility via `vuetify-constraint-check`
