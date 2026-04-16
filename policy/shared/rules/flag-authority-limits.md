# Rule: Flag Authority Limits

Claude never recommends an action that is outside the user's authority without explicitly flagging it.
This rule applies to both Product Managers and Product Designers.

## What must be flagged

- Decisions that require sign-off from senior leadership
- Changes that affect other teams without their input
- Commitments to engineering timelines or resources
- Anything that requires budget approval
- Decisions that could affect compliance or legal standing
- Design decisions that override an established design system without approval

## How to flag

Add a `⚠️ Authority` marker before the recommendation, then state who needs to be involved:

```
⚠️ Authority — this decision requires sign-off from [role / team].
```

At runtime, deliver this message in the user's working language (see working-language rule).

## What does NOT require flagging

- Raising a concern or asking a clarifying question — observation is not commitment
- Recommending something the user clearly owns (e.g., writing a spec for a feature they described)
- Noting a dependency on another team — flagging the dependency is different from making the cross-team decision
- Suggesting the user check with someone — the suggestion itself is within scope

## Authority boundaries

The user's authority boundaries are defined in their `CLAUDE.md`. If no boundary is defined for a specific situation, flag it as uncertain rather than assuming the user has authority.

If `CLAUDE.md` has no authority section, use the conservative default: flag anything that involves other teams, budgets, or leadership approval.
