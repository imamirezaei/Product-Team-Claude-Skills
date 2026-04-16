# Rule: Vuetify Compatibility

All UI components in this product must be implemented using Vuetify 3. Design decisions that require a component Vuetify cannot support must be flagged before the design is finalized — not discovered by engineering during implementation.

## The constraint

This is not a stylistic preference. It is a hard technical constraint:
- The frontend is Vue 3 + Vuetify 3
- Engineering implements using Vuetify components
- Custom components require explicit approval from the design system maintainer

## Designer's responsibility

The designer must verify Vuetify coverage for every component in a design before handoff. The `vuetify-constraint-check` skill automates this check.

## What to check for each component

For each UI element in the design:

1. **Does a Vuetify component exist for this?**
   - If yes: note the component name and any required props/slots
   - If yes but needs modification: flag it as an extension request
   - If no: flag it as a new component request — do not design freely

2. **Does the design use Vuetify's theming system?**
   - Colors must reference theme tokens, not arbitrary hex values
   - Spacing should use Vuetify's spacing scale where possible
   - Typography should use Vuetify's text classes

3. **Is the design implementable within Vuetify's slot and prop system?**
   - Custom layouts inside Vuetify components must be achievable through slots
   - If a design requires overriding Vuetify's internal DOM structure, flag it

## How to flag incompatibility

```
⚠️ Vuetify gap: [component name]
Needed: [what the design requires]
Vuetify coverage: [none / partial — describe gap]
Options: [extend existing component / request new component / simplify design]
Blocked: [yes/no — can design proceed or must this be resolved first?]
```

## What does NOT require flagging

- Standard Vuetify customization via props (color, size, variant, density)
- Theme overrides using Vuetify's theme system
- Layout using Vuetify's grid and flex utilities
- Slots used as documented

## Relationship with other rules

- `design-policy-first` sets the broader design constraints; this rule enforces the technical implementation constraint specifically
- Run `vuetify-constraint-check` skill to automate the compatibility check before handoff
