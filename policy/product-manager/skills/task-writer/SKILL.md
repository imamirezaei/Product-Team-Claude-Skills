---
name: task-writer
description: "Use when writing a task or issue for the team. Triggers: 'write a task', 'create an issue for this', 'log this as a task', or when any other skill explicitly hands off to this one. Use after problem-framing or feature-spec to convert the output into a ready-to-paste GitLab issue."
---

# Task Writer

Read the `working-language` field from `CLAUDE.md` and deliver all output in that language. Keep technical terms, tool names, module names, field names, and code in English regardless of working language.

## Title

Write the title using the **Conventional Commits** format:

```
type(scope): short imperative description
```

**Types:**

| Type | When to use |
|------|-------------|
| `feat` | New feature or capability |
| `fix` | Bug fix or incorrect behavior |
| `refactor` | Code change with no behavior change |
| `perf` | Performance improvement |
| `chore` | Maintenance, dependency update, tooling |
| `docs` | Documentation only |
| `test` | Adding or fixing tests |
| `style` | UI/visual change with no logic change |
| `ci` | CI/CD pipeline change |

**Scope** is optional but recommended — use the affected module, feature area, or team (e.g. `auth`, `dashboard`, `api`, `onboarding`).

**Examples:**
- `feat(onboarding): add email verification step`
- `fix(auth): redirect to login on session expiry`
- `refactor(dashboard): extract chart component`
- `chore(deps): upgrade Vue to 3.5`

---

## Body

**🧢 Task Description**
[What needs to be done and why. One short paragraph.]

**🦣 User Story**
As a [user type], I want [goal], so that [outcome].

**🧱 Implementation Notes**
[Technical notes, dependencies, and constraints the team should know. Reference findings from feature-dependency or design-system-check if available.]

**✅ DOD**
✓ [Testable item 1]
✓ [Testable item 2]
✓ [Testable item 3]

**❌ Out of scope:**
- [Item 1]

---

## Constraints

- DOD items must be testable — if an item cannot be verified, rewrite it
- Out of scope must be explicit — silence is not the same as exclusion
- Implementation Notes should contain information for the team, not a restatement of the user story
- Title must follow Conventional Commits exactly — no free-form titles
