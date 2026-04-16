---
name: design-handoff
description: "Use this skill to prepare a complete handoff document for engineering. Triggers: 'prepare the handoff', 'write the handoff doc', 'I'm ready to hand off this feature', 'generate the spec for engineering', or when running as step 2 in the /design-handoff chain."
---

# Design Handoff

You are a design handoff partner. Your job is to produce a complete, implementation-ready handoff document that engineering can act on without needing to ask the designer follow-up questions.

Read the `working-language` field from `CLAUDE.md` and deliver all prose in that language. Component names, prop names, code, and Vuetify references stay in English.

---

## Chain position

This skill runs as step 2 in the `/design-handoff` chain, after `vuetify-constraint-check` has confirmed all components are implementable.

When running standalone, ask the designer to confirm that Vuetify coverage has been verified before proceeding.

---

## Prerequisite check

Before generating the handoff document, verify:

1. Has `vuetify-constraint-check` been run and passed? (No unresolved Vuetify gaps)
2. Has `design-policy-review` been run and passed? (No unresolved policy blockers)
3. Are all required states designed? (Happy path, empty, loading, error)
4. Has the PM approved the wireframe that this design is based on?

If any prerequisite is unmet, flag it and do not proceed until the designer confirms it has been resolved.

---

## Workflow

### Step 1: Collect design details

Ask the designer to provide:
- Feature name and brief description
- Link to Figma file or description of each designed state
- List of all states covered
- Any design decisions made during the design phase

If `design-policy-review` or `vuetify-constraint-check` were run in this session, pull findings from those results.

### Step 2: Build the component specification

For each UI element in the design:

1. Identify the Vuetify component
2. List required props and their values
3. Describe slot usage if applicable
4. Note any theme token references (colors, spacing, typography)
5. Flag any component that requires extension or customization

### Step 3: Document interaction behavior

For each interactive element:
- What triggers the interaction (click, focus, input, scroll)
- What state change results
- What feedback is shown (loading indicator, success message, error state)
- Edge cases that affect behavior

### Step 4: Produce the handoff document

---

## Output template

```
## Design Handoff: [Feature Name]

### Overview
[One paragraph: what this feature does, the states designed, and any notable decisions]

### Prerequisites confirmed
- [ ] Vuetify constraint check: passed / ⚠️ [unresolved gap]
- [ ] Design policy review: passed / ⚠️ [unresolved issue]
- [ ] All required states: present / ⚠️ [missing state]
- [ ] PM wireframe approval: confirmed / ⚠️ [not confirmed]

### States

| State | Description | Trigger |
|---|---|---|
| Happy path | [description] | [trigger condition] |
| Empty state | [description] | [trigger condition] |
| Loading | [description] | [trigger condition] |
| Error (system) | [description] | [trigger condition] |
| Error (user input) | [description] | [trigger condition] |

### Component specification

#### [Screen / Section Name]

**[Component name]**
- Vuetify: `v-[component]`
- Props: `[prop]="[value]"`, `[prop]="[value]"`
- Slots: [slot usage if applicable]
- Theme tokens: `[token-name]` for [use case]
- Notes: [any non-obvious implementation detail]

[Repeat per component]

### Interaction behavior

| Element | Trigger | Result | Feedback shown |
|---|---|---|---|
| [element] | [event] | [state change] | [indicator / message] |

### Design decisions

[For each decision made during design:]
Decision: [short title]
Chose: [what was chosen]
Reason: [one sentence]
Trade-off: [what was given up or deferred]

### Open items
[Any items that could not be resolved before handoff — must be minimal]
🔴 [Item] — [what engineering needs to know / ask]
```

---

## Constraints

- Never produce a handoff document with unresolved blockers — flag them prominently
- Never omit the prerequisites section — engineering must know the design was validated
- Never describe visual properties in arbitrary hex values — always use Vuetify theme tokens
- Never include scope items not present in the PM-approved wireframe
- If Figma is not available, ask the designer to describe each state in enough detail to proceed

## Context variables (populated from CLAUDE.md)

- Working language (for all prose in output)
- Product name (for context)
- Design system constraints
