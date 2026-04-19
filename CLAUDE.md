# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A Node.js CLI package (`claude-pm`) that scaffolds Claude Code for product teams. It installs structured workflows (skills, commands, rules) into both `~/.claude/` (global) and a target product repository. Two roles are supported: **product-manager** and **product-designer**.

## Commands

```bash
# Run the CLI locally
node bin/cli.js --help
node bin/cli.js init --role pm
node bin/cli.js init --role designer --force
node bin/cli.js update

# Smoke test (only test defined in package.json)
npm test
```

No build step — this is plain ESM JavaScript (Node ≥ 18, `"type": "module"`).

## Architecture: 4-Layer Context Assembly

```
Policy Layer    → policy/          Fixed SKILL.md, rules, commands — updated via `claude-pm update`
Interview Layer → interview/       647-line PM interview or Figma-based designer interview (run once)
Dynamic Layer   → pm-template/     Generated per-product: CLAUDE.md + context.md per skill + agent
Personal Layer  → (git-ignored)    CLAUDE.local.md + settings.local.json — never committed
```

The **policy layer** is identical for all users. When a new version ships, `claude-pm update` overwrites `policy/` and `interview/` but never touches the dynamic or personal layers.

The **interview engine** generates 14 files (PM) or 11 files (Designer) — one `CLAUDE.md`, one agent definition, and one `context.md` per skill. These are the only files that carry project-specific knowledge.

## Key Directories

| Path | Purpose |
|---|---|
| `bin/cli.js` | CLI entry point — `init` and `update` commands |
| `src/commands/` | `init.js` and `update.js` — orchestrate the full flow |
| `src/scaffold/` | `copyGlobal.js`, `copyProject.js`, `patchGitignore.js` |
| `src/utils/` | Guards: detectClaude, detectGitRepo, detectRole, isPlaceholder |
| `policy/shared/` | Skills and rules shared by both roles |
| `policy/product-manager/` | 11 PM skills, 9 commands, 4 rules, 1 output style |
| `policy/product-designer/` | 7 designer skills, 6 commands, 3 rules, 1 output style |
| `pm-template/` | Placeholder files scaffolded into product repos |
| `designer-template/` | Same for designers |
| `interview/` | `pm-interview.md` (647 lines) and `designer-interview.md` |

## Skill File Convention

Every skill lives at `policy/<role>/skills/<name>/SKILL.md`. The file contains:
- YAML frontmatter: `name` and `description` (used for skill dispatch)
- Full instructions for that skill
- References to the output style and working-language rule

When a PM runs `/new-feature`, commands chain multiple skills in sequence (problem-framing → feature-dependency → edge-case-finder → design-system-check → wireframe-generator → feature-spec).

## Init Flow

1. Guard checks: Claude Code installed? Git repo? Already initialized?
2. `copyGlobal()` — install skills/commands/output-styles to `~/.claude/`
3. `copyProject()` — scaffold `claude-workflow/policy/`, placeholders, version file
4. `patchGitignore()` — protect `CLAUDE.local.md` and `settings.local.json`
5. Print prompt to open Claude Code and run `/start-interview`

`isPlaceholder()` gates all file writes — existing user-edited files are never overwritten.

## Update Flow

1. Read `claude-workflow/.claude-pm-version` to verify initialization and compare versions
2. Overwrite `claude-workflow/policy/` and `claude-workflow/interview/` from current package
3. Reinstall to `~/.claude/` (no downgrade)
4. Protected files that are **never** touched: `CLAUDE.md`, all `context.md` files, `product-agent.md`, `settings.json`, `CLAUDE.local.md`, `settings.local.json`

## Hard Rules (Always Active)

These rules are enforced regardless of skill:
- **flag-authority-limits** — mark decisions outside the user's authority with ⚠️
- **working-language** — output in user's language; technical terms stay in English
- **always-include-dod** (PM) — every feature output includes a Definition of Done
- **no-technical-decisions** (PM) — Claude flags but never makes technical choices

## Adding a New Skill

1. Create `policy/<role>/skills/<skill-name>/SKILL.md`
2. Add a corresponding placeholder at `pm-template/.claude/skills/product-manager/<skill-name>/context.md`
3. Reference the skill in the relevant command file if it belongs in a chain
4. Add a question block to `interview/pm-interview.md` that maps to the new `context.md`
