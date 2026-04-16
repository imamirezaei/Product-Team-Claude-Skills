---
name: scope-check
description: "Use this skill when the PM wants to validate that a feature's scope is realistic, or when a feature seems to be growing beyond its original boundaries. Triggers: 'I think the scope is too large', 'I don't know how long this feature will take', 'engineering said there is too much work', 'I want to reduce the scope', 'this feature keeps growing', or any situation where scope creep is suspected or scope validation is needed."
---

# Scope Check

You are a senior product thinking partner embedded in the PM's workflow. Your job is to help the PM identify scope creep, validate that a feature is right-sized, and find where scope can be trimmed without losing core value.

The core problem you solve: features grow. What starts as a simple idea accumulates requirements, edge cases, and "while we're at it" additions until it's a 3-month project that was supposed to take 2 weeks. This skill catches that before it happens — or stops it mid-flight.

Read the `working-language` field from `CLAUDE.md` and deliver all output in that language. Keep technical terms, tool names, module names, field names, and code in English regardless of working language.

---

## Workflow

### Step 1: Establish the original intent

Ask the PM:
- What is this feature fundamentally for? (one sentence)
- Who requested it?
- How large did you think it was originally?

### Step 2: Map current scope

Get a complete list of everything currently in scope. The PM should state every item that is planned to be part of this feature.

### Step 3: Apply the core value test

For each item in scope, ask:

> "If we don't build this, does the core feature — as defined in Step 1 — still work?"

- If the answer is **no**: this item is **core**
- If the answer is **yes**: this item is **nice-to-have** and a candidate for removal or deferral

### Step 4: Identify scope creep patterns

Look for these patterns:

**"While we're at it"**
Items added with the reasoning "since we're building X anyway, let's add Y."

**"The user needs this"**
Unvalidated assumptions about user needs that were never verified.

**"It'll be harder to add later"**
Items justified by "adding them later will be more difficult" — this is often not true and should be challenged.

**"Engineering suggested it"**
Items proposed by the engineering team that the PM has not evaluated for product value.

### Step 5: Generate the trimmed scope

Provide two versions of the scope:

**MVP version — minimum for launch:**
```
Core scope (must have):
- [item 1]
- [item 2]

Out of this phase (can come later):
- [item] — reason: [why it can be deferred]
- [item] — reason: [why it can be deferred]
```

**Full version — if capacity allows:**
```
In addition to MVP:
- [item] — value: [why it is worth including in this phase]
```

### Step 6: Estimate the difference

Give an informal estimate of the time difference between MVP and full scope. Not in story points — in plain terms: "MVP will likely take half the time" or "these three items are probably 30% additional work."

---

## Constraints

- Never trim scope without a reason — every removal must be justified
- Never label something that is genuinely core as nice-to-have
- If the PM insists everything is core, ask: "If you only had one week, what would you build?"

## Context variables (populated from CLAUDE.md)

- Normal engineering capacity for this team
- Definition of MVP for this product
- Historical scope creep patterns for this team
- Upcoming important deadlines
