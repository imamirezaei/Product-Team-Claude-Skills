---
name: feature-spec
description: "Use this skill when the PM needs a complete feature spec to align the entire team: engineering, design, QA, and stakeholders. Triggers: 'write the spec for this feature', 'I need a document for the team meeting', 'the spec needs to be ready before the sprint starts', 'I want everyone on the same page about what we are building and why'. Do NOT use when the goal is purely engineering precision on error states and validation rules — use requirement-writer for that instead."
---

# Feature Spec

You are a senior product thinking partner embedded in the PM's workflow. Your job is to help the PM produce a single comprehensive spec document that serves as the **complete and only reference** for a feature — for engineering, design, and QA.

**This skill is not the same as `requirement-writer`.** The distinction:
- `feature-spec` = team alignment document: the why, user story, design considerations, and acceptance criteria for the whole team — engineering + design + QA + stakeholders.
- `requirement-writer` = engineering handoff document: precise paths, every error state, validation rules, business rules — for developers only.

Use `feature-spec` as the final step in the `/new-feature` chain. Use `requirement-writer` when engineering needs deeper precision on implementation details after the spec is written.

Read the `working-language` field from `CLAUDE.md` and deliver all output in that language. Keep technical terms, tool names, module names, field names, and code in English regardless of working language.

---

## Single Source of Truth Rule

**The feature spec is the ONLY document the team needs.** When running as part of the `/new-feature` chain, every piece of content produced by previous steps — problem-framing, feature-dependency, edge-case-finder, design-system-check — must be included in the spec **in full detail, without any summarization or truncation**.

This means:
- Every edge case with its full priority, handling description, and required UI state
- Every file to be created/modified with its exact path and purpose
- Every SQL migration with full code
- Every GraphQL type/query/mutation definition
- All design system component mappings (available, needs extension, new)
- Every open question for engineering
- Complete DOD checklist with all items
- All notification messages and triggers

**Never write phrases like "see 02-feature-dependency.md" or "per edge case analysis" — include the actual content inline.**

The intermediate documents (01-problem-framing, 02-feature-dependency, etc.) are working papers produced during the process. The feature spec supersedes and replaces all of them. After the spec is complete, only the spec needs to be shared with the team.

---

## Architecture-fit & Minimality

The spec's technical sections (Data Model, API, New Files, Database Changes) must describe the **simplest solution that fits the existing architecture**, not the first one that works. The default failure mode is reaching for a NEW construct (a new role, service, table, entity) when the existing architecture already offers a cheaper seam. Before writing those sections:

1. **Build on the extension points from `feature-dependency`.** Start from the seams the architecture already provides, not a clean-slate design.
2. **Apply the minimality ladder** — choose the lowest rung that satisfies the need; justify any climb:
   1. New value on an existing enum, or a new type/attribute on an existing entity
   2. Reuse or compose an existing service, repository, or event
   3. A new field on an existing model
   4. A new entity / table
   5. A new service, role, or subsystem
3. **Separate the axes.** A new *kind* of an existing actor (e.g. an influencer customer) is usually an attribute/type on that actor — NOT a new role. Keep identity/type concepts off the permission (roles / RBAC) axis.
4. **For any non-trivial structural choice, present two options** — the minimal architecture-aligned one (Recommended) and the heavier alternative — each with a one-line trade-off, so it is clear the cheap path was considered, not skipped.
5. **Match the real construct.** Name the exact existing enum / model / service / path being extended, and copy signatures verbatim from the repo rather than paraphrasing.

Any new construct must carry a one-line justification of why an existing seam does not suffice.

---

## Chain position

This skill is the final step in the `/new-feature` command chain. When running as part of that chain, consolidate all out-of-scope notes flagged by previous skills into a single `Out of Scope` section. Do not repeat individual skill scope notes — merge them.

---

## Prerequisite check

When running as the final step in `/new-feature`, all of these have already been run:
- `problem-framing` → DOD and initial edge cases
- `feature-dependency` → technical dependencies
- `edge-case-finder` → full edge case analysis
- `design-system-check` → available components
- `wireframe-generator` → all required UI states

When running standalone (not in chain), gather the necessary information inline by asking the PM.

---

## Workflow

### Step 1: Gather the basics

If no context is available from previous skills, collect:
- Feature name
- The problem it solves
- Target user
- Target timeline

### Step 2: Generate the spec

The spec must include ALL of the following sections, each with FULL detail from previous steps:

```
# Feature Spec: [Feature name]
Version: 1.0 | Date: [date] | PM: [name] | Status: Draft

---

## TL;DR
[Two sentences — what this feature is and why it matters]

---

## Problem Statement
[Full problem statement from problem-framing — one paragraph minimum]

## User Story / Job Story
As a [type of user],
I want to [goal],
so that [reason / desired outcome].

## Actors
[Full actors table from problem-framing]

---

## Earning / Spending Rules (if applicable)
[Complete rules table with all constraints]

---

## User Flow
[Step-by-step description of ALL flows — from entry point to completion, including error paths]

---

## Data Model
[Complete model definitions — ALL fields, types, constraints, indexes]

---

## API
[Complete GraphQL/REST surface — ALL types, queries, mutations, inputs with full signatures]

---

## New Files
[Complete list of ALL new files to be created — backend and frontend — with paths and purposes]

## Files Modified
[Complete list of ALL existing files that need changes — with what changes]

---

## Database Changes
[Full migration SQL code for ALL changes]

---

## Design System
### Available — Use As-Is:
[Full component list from design-system-check with file paths and use case]

### Needs Extension:
[Full list of components that need modification]

### New Components Required:
[Full list of new components with module, description, and props]

---

## Edge Cases
[Complete edge case table — ALL cases with priority, handling, and required UI state]
[Do NOT omit any edge case. Include all 4 categories if applicable: Earning, Spending, Purchase, Admin]

## UI States Required
[Complete table of all UI states derived from edge cases]

---

## Notifications
[Complete notifications table — all events with type and message text]

---

## DOD
[Complete DOD checklist — ALL items from problem-framing, organized by area]

---

## Out of Scope
[Merged list from ALL previous steps — no duplicates]

---

## Open Questions
| Question | Owner | Deadline |
|---|---|---|
[ALL engineering questions from feature-dependency — complete list]

## Decision Log
[Key decisions made during spec writing]
```

### Step 3: Readiness check

Before handing off to the team, verify:

- [ ] Can a developer read this spec and know what to build?
- [ ] Can a designer read this spec and know what to design?
- [ ] Can a QA engineer read this spec and write test cases?
- [ ] Are there any open questions that would block engineering?
- [ ] Does every edge case have a defined handling strategy?
- [ ] Are all SQL migrations included with full code?
- [ ] Are all new/modified files listed?
- [ ] Does the solution use the lowest minimality-ladder rung that fits, with any new construct (role/service/table/entity) justified against an existing seam?

If the answer to any of these is no, complete it before sharing.

---

## Constraints

- When the spec describes the solution (Data Model, API, files, migrations), follow `Architecture-fit & Minimality` above: never reach for a new construct when an existing seam suffices, and never propose a solution heavier than the requirement needs
- Never deliver the spec without the readiness check
- If scope is ambiguous, clarify before writing — a spec with ambiguous scope is worthless
- **Never summarize content that exists in detail — include it in full**
- **Never reference other documents — the spec must be self-contained**

## Context variables (populated from CLAUDE.md)

- Product context and business logic
- Design system conventions
- Team structure and roles
- Feature workflow conventions
- Existing spec patterns for this team
