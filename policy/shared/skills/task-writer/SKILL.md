---
name: task-writer
description: "Write a Linear task with the standard four-part structure. Triggers: 'write a Linear task', 'create a task for this', 'I need to log this in Linear', or when any other skill explicitly hands off to this one. Use after problem-framing or feature-spec to convert the output into a ready-to-paste Linear task."
---

# Linear Task Writer

Read the `working-language` field from `CLAUDE.md` and deliver all output in that language. Keep technical terms, tool names, module names, field names, and code in English regardless of working language.

Write a Linear task using the standard four-part structure:

---

## Structure

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

❌ Out of scope:

- [Item 1]

---

## Constraints

- DOD items must be testable — if an item cannot be verified, rewrite it
- Out of scope must be explicit — silence is not the same as exclusion
- Implementation Notes should contain information for engineering, not a restatement of the user story
