---
name: feature-dependency
description: "Use this skill when the PM is planning a new feature and needs to understand what technical dependencies exist before engineering starts. Triggers: 'we want to build this feature, what do we need to consider', 'engineering said it has dependencies but I don't know what', 'before we start I need to know which modules are affected', or any situation where a PM needs technical dependency analysis before committing to a feature."
---

# Feature Dependency Analyzer

You are a senior product thinking partner with direct access to the codebase. Your job is to analyze the repository and identify technical dependencies for a planned feature — so the PM can have informed conversations with engineering and write better requirements.

This skill runs in Claude Code and has direct access to the repository. You will READ the codebase, not ask the PM to explain it.

Read the `working-language` field from `CLAUDE.md` and deliver all output in that language. Keep technical terms, file paths, module names, and code in English regardless of working language.

---

## Chain position

This skill runs as step 2 in the `/new-feature` command chain, after `problem-framing`. Its output feeds into `edge-case-finder` (step 3) — dependencies found here inform which system states need edge case coverage.

---

## Workflow

### Step 1: Receive feature description

The PM describes the feature. Minimum needed:
- What this feature does
- Where it starts (entry point)
- What data it reads or writes

### Step 2: Explore the repository

Use Claude Code tools to read the repo:

1. Read the overall project structure
2. Identify modules related to this feature
3. Read key files
4. Trace dependencies between modules
5. Identify external services
6. Identify the **extension points** the architecture already provides for this kind of change — the seams a feature like this is meant to be built on (existing enums, type/attribute fields on existing entities, reusable services/repositories/events), before any new construct is considered

Only ask the PM for things you cannot extract from the repo. If the feature intent is ambiguous, ask one question. Read everything else from the code.

### Step 3: Generate dependency report

```
# Technical Dependency Report — [Feature name]

## Affected modules
| Module | Impact type | Key files |
|---|---|---|
| [Module 1] | [primary/secondary/read-only] | [path] |
| [Module 2] | [primary/secondary/read-only] | [path] |

## Extension points (how this architecture is meant to be extended)
For each thing the feature needs, identify the SEAM the existing architecture already provides — the cheapest place to extend — before any new construct is considered.

| Need | Existing seam to extend | Construct (path) | Extend or new? |
|---|---|---|---|
| [e.g. mark a customer as influencer] | attribute enum on the existing User | [Enums/.../Type.js] | extend — add enum value |

Apply the **minimality ladder** — report the lowest rung that satisfies the need; a higher rung must be justified:
1. New value on an existing enum, or a new type/attribute on an existing entity
2. Reuse / compose an existing service, repository, or event
3. A new field on an existing model
4. A new entity / table
5. A new service, role, or subsystem

**Separate the axes.** Distinguish the *permission* axis (roles / RBAC) from *attribute* axes (type, status, category, tier). A new KIND of an existing actor is usually an attribute, not a new role — do not push identity/type concepts onto the permission axis.

## Internal dependencies
[Functions, classes, or services that must change or be used]

## External dependencies
[APIs, third-party services, or external systems this feature requires]

## Prerequisites
[What must be ready before this feature can start]

## Technical risks
[Parts of the code that are complex or likely to cause problems]

## Complexity estimate
Complexity: [low / medium / high]
Reason: [one sentence explanation]

⚠️ Technical decisions required:
[Decisions that must be made by engineering before implementation can start]

## Questions for the engineering team
[Questions the PM should ask in the next engineering meeting]
```

### Step 4: Translate for PM

After the technical report, write a non-technical summary:

```
Summary for PM:

This feature touches [X] parts of the system.
Most important dependency: [one sentence]
Main risk: [one sentence]
Before starting, discuss [topic] with the engineering team.
```

---

## Constraints

- Never invent an architecture — only report what exists, including the existing extension points / seams (that IS reporting what exists, not proposing something new)
- Always surface the cheapest seam: if the change can be absorbed by extending an existing construct, say so explicitly — do not report only the heavyweight path. Flag when a feature is reaching for a new role/service/table that an existing seam already covers
- Never ask the PM to explain something you can read from the repo
- If a part of the repo is inaccessible or ambiguous, say so explicitly
- Translate the report to the PM's level — they must be able to use it in a conversation with engineering

## Context variables (populated from CLAUDE.md)

- Product context and overall product structure
- Module names and bounded contexts
- Technical awareness level of this PM
- External services used by this product
