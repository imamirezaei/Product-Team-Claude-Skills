# PM Workflow for Claude Code

A structured system for product managers to use Claude Code. This package transforms Claude from a general-purpose assistant into a personalized product management partner.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Repository Structure](#repository-structure)
- [Receiving Updates](#receiving-updates)
- [Layer 1: Policy Layer](#layer-1-policy-layer)
- [Layer 2: Interview Engine](#layer-2-interview-engine)
- [Layer 3: Dynamic Layer](#layer-3-dynamic-layer)
- [Layer 4: Personal Layer](#layer-4-personal-layer)
- [Available Skills](#available-skills)
- [Slash Commands](#slash-commands)
- [References](#references)

---

## Quick Start

**Prerequisites:** Node.js ≥ 18, [Claude Code](https://claude.ai/code) installed.

```bash
# 1. Install the package globally
npm install -g product-team-claude-skills

# 2. Go to your product repo
cd /path/to/your-product-repo

# 3. Run init (must be inside a git repo)
claude-pm init

# 4. When Claude opens, type:
# /start-interview
```

That's it. Claude will conduct a structured interview and generate all 13 personalized files automatically.

**To update the policy layer after a new version is published:**

```bash
npm update -g product-team-claude-skills
claude-pm update
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│             Policy Layer (fixed)            │
│  policy/rules + commands + skills/schema    │  ← maintainer updates
├─────────────────────────────────────────────┤
│             Interview Engine                │
│         interview/pm-interview.md           │  ← run once per PM
├─────────────────────────────────────────────┤
│          Dynamic Layer (per PM)             │
│     CLAUDE.md + context files + agent       │  ← output of interview
├─────────────────────────────────────────────┤
│           Personal Layer (private)          │
│    CLAUDE.local.md + settings.local.json    │  ← PM manages only
└─────────────────────────────────────────────┘
```

**Policy Layer** is identical for all PMs. The maintainer updates it and team members receive changes with `claude-pm update`.

**Dynamic Layer** is unique per PM, generated from the interview. Policy updates never touch this layer.

`claude_code_full_context_assembly_expert.html` is a standalone visual reference that shows how Claude Code assembles runtime context from the fixed policy layer, the interview output, and PM-specific files.

---

## Repository Structure

```
product-team-claude-skills/
│
├── README.md
├── package.json
├── bin/cli.js                         ← CLI entry point (claude-pm command)
├── src/                               ← CLI implementation
│
├── policy/                            ← maintainer updates only
│   ├── settings.json
│   ├── rules/                         ← 6 hard rules
│   ├── commands/                      ← 7 slash commands
│   ├── output-styles/
│   └── skills/
│       ├── shared/
│       │   └── linear-task-writer/
│       └── product/                   ← 11 skill schemas
│           ├── problem-framing/SKILL.md
│           ├── feature-prioritization/SKILL.md
│           └── ...
│
├── pm-template/                       ← placeholder files copied to product repo
│   ├── CLAUDE.md
│   ├── .gitignore
│   └── .claude/
│       ├── settings.json
│       ├── agents/
│       │   └── product-agent.md
│       └── skills/product/            ← 11 context.md placeholders
│
└── interview/
    └── pm-interview.md
```

---

## What `claude-pm init` Does

When you run `claude-pm init` inside a product repo, it:

1. Copies skills, commands, and output styles to `~/.claude/` (global)
2. Copies the full policy layer to `./claude-workflow/policy/`
3. Copies placeholder files to `./.claude/`
4. Updates `.gitignore` to protect private files
5. Opens Claude Code automatically

After Claude opens, type `/start-interview`. Claude will:
- Ask questions about your product, team, and workflow (in Persian)
- Generate 13 personalized files
- Write each file directly to the correct path (you approve each write)

---

## Receiving Updates

When a new version of the package is published:

```bash
npm update -g product-team-claude-skills
claude-pm update
```

`claude-pm update` re-copies the policy layer to both `~/.claude/` and `./claude-workflow/policy/`. It never touches `CLAUDE.md`, `context.md` files, `product-agent.md`, or `settings.json`.

---

## Layer 1: Policy Layer

Defined by the maintainer, applied to all PMs. **Do not edit manually.**

### Rules

| File                           | Rule                                                     |
| ------------------------------ | -------------------------------------------------------- |
| `no-technical-decisions.md`    | Claude never makes technical decisions — only flags them |
| `no-scope-expansion.md`        | Claude never expands scope without PM's explicit request |
| `persian-output.md`            | All output in Persian; technical terms stay in English   |
| `flag-authority-limits.md`     | Any decision outside PM authority must be ⚠️ flagged     |
| `always-include-dod.md`        | Every feature-related output must include a DOD          |
| `always-include-edge-cases.md` | No requirement is accepted without edge case coverage    |

### Commands

| Command                      | Purpose                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `/new-feature [description]` | Full process: problem framing → dependency check → edge cases → feature spec |
| `/write-task [topic]`        | Write a Linear task with the four-part structure                             |
| `/find-edges [feature]`      | Find edge cases for a feature                                                |
| `/prioritize [features]`     | Compare and prioritize features against the roadmap                          |
| `/log-decision [decision]`   | Document a product decision before it gets lost                              |
| `/release-check [feature]`   | Analyze change impact before release                                         |
| `/qa-plan [feature]`         | Generate a complete, prioritized test plan                                   |

### Output Style

Every substantive output follows this structure:

1. **Summary** — one sentence
2. **Main content**
3. **Out of scope** — explicit list of what is NOT included
4. **Open questions** — decisions needed before engineering starts
5. **⚠️ Sign-off required** — if any recommendation is outside PM authority
6. **DOD** — definition of done

### Settings

- `defaultMode: plan` — Claude writes a plan before any change and waits for approval
- `effortLevel: high` — Claude reasons with maximum precision
- `additionalDirectories: ["./claude-workflow"]` — Claude reads policy files from this directory

---

## Layer 2: Interview Engine

`interview/pm-interview.md` runs a structured interview and generates 13 files. Each question maps to one or more output files — no information is collected without a purpose.

### Interview Sections and File Mapping

| Section                  | Files it populates                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Product & Business       | CLAUDE.md, edge-case-finder/context.md, feature-dependency/context.md                                         |
| Team Structure           | CLAUDE.md, feature-spec/context.md, requirement-writer/context.md                                             |
| Decision Architecture    | CLAUDE.md, feature-prioritization/context.md, decision-logger/context.md                                      |
| Feature Workflow         | CLAUDE.md, feature-spec/context.md, scope-check/context.md                                                    |
| Requirements & Handoff   | requirement-writer/context.md, feature-spec/context.md                                                        |
| Prioritization & Roadmap | feature-prioritization/context.md, scope-check/context.md                                                     |
| Documentation            | decision-logger/context.md                                                                                    |
| Technical Context        | feature-dependency/context.md, design-system-check/context.md, release-impact/context.md, qa-guide/context.md |
| Discovery & Signals      | CLAUDE.md                                                                                                     |
| PM Profile               | CLAUDE.md, all skills                                                                                         |

---

## Layer 3: Dynamic Layer

### CLAUDE.md

The most critical file. Claude reads it at the start of every session. Contains:

- Product context and business logic
- Team structure and roles
- Decision authority boundaries for this PM
- PM's technical depth and preferred communication style
- Behavioral instructions for Claude specific to this PM

### Context Files

Each skill has a `context.md` that personalizes its behavior for this specific PM and product:

```
SKILL.md (fixed logic — from maintainer)
    +
context.md (this PM's product context — from interview)
    +
CLAUDE.md (this PM's profile — from interview)
    =
Personalized output for this PM and product
```

### Updating context manually

If your product or team changes significantly, you can edit `CLAUDE.md` and the relevant `context.md` files directly. You do not need to re-run the full interview for small changes.

---

## Layer 4: Personal Layer

Files managed entirely by the PM. Never committed to git.

### CLAUDE.local.md

Private notes loaded alongside `CLAUDE.md`. Useful for things you don't want to share with the team:

```markdown
# Personal notes

- Focused on payment sprint this week
- Always sync with the lead engineer before any financial spec
- Upcoming demo on March 15 — prioritize polish over new features
```

### settings.local.json

Personal overrides on top of team settings. Created at `.claude/settings.local.json`:

```json
{
  "permissions": {
    "defaultMode": "acceptEdits"
  },
  "effortLevel": "medium"
}
```

---

## Available Skills

### Think — reasoning and decision support

**`problem-framing`**
Turns a vague feature request into a precise, engineering-ready DOD. Surfaces edge cases and likely dependencies before work begins. Run this before every new task.

**`feature-prioritization`**
Compares features against the roadmap and team capacity. Makes trade-offs explicit. Generates a defensible argument for or against a feature — useful when pushing back on ad-hoc requests from leadership. Documents the final decision.

**`decision-logger`**
Captures product decisions before they disappear into Slack history. Handles four types: UX decisions, scope decisions, rejected ideas, and meeting decisions.

### Produce — artifact generation

**`linear-task-writer`** _(shared)_
Linear task with the standard four-part Persian structure: task description, user scenario, implementation notes, DOD.

**`requirement-writer`**
Complete requirement document covering the happy path, alternative paths, error states, business rules, and validation rules.

**`feature-spec`**
Comprehensive spec that serves as the single source of truth for engineering, design, and QA. Includes user story, acceptance criteria, design notes, and DOD.

### Review — validation

**`edge-case-finder`**
Stress-tests a feature definition across six dimensions: user behavior, data, system state, business rules, operation sequence, and side effects. Prioritizes findings by risk: 🔴 critical, 🟡 important, 🟢 low.

**`scope-check`**
Identifies scope creep before it becomes a problem. Runs the core value test on each item and produces two versions: MVP (minimum for launch) and full scope — with the time difference made explicit.

### Technical Awareness — codebase intelligence

**`feature-dependency`**
Reads the repository directly and identifies technical dependencies for a planned feature. No need to explain the codebase to Claude — it reads it. Produces both a technical report and a plain-language summary the PM can use in engineering conversations.

**`design-system-check`**
Scans the design system and component library before any new UI is requested. Prevents duplicate components and identifies what can be reused versus what needs to be built from scratch.

**`release-impact`**
Analyzes the blast radius of a change before it reaches production. Identifies directly and indirectly affected modules, critical integration points, and API contract changes.

**`qa-guide`**
Generates a complete, prioritized test plan. Reads the change context from the repo, identifies coverage gaps, and produces test cases organized by risk level. Works best after `release-impact`.

---

## Slash Commands

| Command          | Skills executed                                                        |
| ---------------- | ---------------------------------------------------------------------- |
| `/new-feature`   | problem-framing → feature-dependency → edge-case-finder → feature-spec |
| `/write-task`    | linear-task-writer                                                     |
| `/find-edges`    | edge-case-finder                                                       |
| `/prioritize`    | feature-prioritization                                                 |
| `/log-decision`  | decision-logger                                                        |
| `/release-check` | release-impact → qa-guide                                              |
| `/qa-plan`       | qa-guide                                                               |

---

## References

### Repository Artifacts

- `claude_code_full_context_assembly_expert.html` — visual explanation of the full context assembly pipeline across policy, interview output, and PM-specific runtime files

### Official Claude Code Documentation

- [Explore the .claude directory](https://code.claude.com/docs/en/claude-directory) — complete reference for every file and directory Claude Code reads
- [Memory and CLAUDE.md](https://code.claude.com/docs/en/memory) — how CLAUDE.md, rules, and auto-memory work
- [Skills](https://code.claude.com/docs/en/skills) — how to build and invoke skills
- [Subagents](https://code.claude.com/docs/en/sub-agents) — defining specialized agents with their own prompts and tool restrictions
- [Settings](https://code.claude.com/docs/en/settings) — all available settings in settings.json, including permissions, hooks, and model defaults
- [Environment Variables](https://code.claude.com/docs/en/env-vars) — full reference for Claude Code environment variables
- [Permissions](https://code.claude.com/docs/en/permissions) — permission system, rule syntax, and managed policies
- [Output Styles](https://code.claude.com/docs/en/output-styles) — adding custom sections to Claude's system prompt
- [Common Workflows](https://code.claude.com/docs/en/common-workflows) — recommended patterns for everyday Claude Code usage

### Anthropic Documentation

- [Prompt Engineering Overview](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) — principles and techniques for writing effective prompts for Claude
