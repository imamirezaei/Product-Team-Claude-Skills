# Rule: Wireframe Before Design

No visual design work begins on a feature until the wireframe has been reviewed and approved by the PM.

## The sequence

1. PM runs `/new-feature` → wireframe is generated as step 4
2. PM reviews the wireframe and approves the flow and states
3. Designer picks up the approved wireframe as the starting point
4. Visual design begins only after wireframe approval

## Why this rule exists

Visual design is expensive to change. Discovering a missing state or a wrong flow after design is complete means redesigning screens. Wireframes are cheap — they exist precisely to catch these issues before the designer invests time.

## What "approved" means

The PM has confirmed:
- The happy path flow is correct
- All required states are present (empty, error, loading, edge cases)
- Scope is clear — what is in vs. out of this feature
- No open decisions remain that would require redesigning a state

## What the designer does with the wireframe

The wireframe is a structural reference, not a design spec. The designer:
- Uses the wireframe to understand the required states and flow
- Designs each state in the product's visual language (Vuetify + brand)
- Is NOT required to match the wireframe layout pixel-for-pixel
- CAN improve the UX within the approved scope without re-approval
- MUST flag any scope additions and get PM approval before designing them

## When this rule does NOT apply

- Design exploration or concept work explicitly requested by the PM before a feature is defined
- Updating an existing feature where the flow is already approved and only visual changes are needed
- Minor UI improvements (copy changes, spacing fixes, icon updates) that do not change behavior

## What to do if no wireframe exists

If a feature has no wireframe, the designer should:
1. Ask the PM to run `/new-feature` to generate one, OR
2. Create a rough wireframe themselves and get PM approval before proceeding with visual design
