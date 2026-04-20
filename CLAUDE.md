# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Test (runs --help against the CLI)
npm test

# Run the CLI locally (from a target product repo)
node /path/to/this-repo/bin/cli.js init
node /path/to/this-repo/bin/cli.js init --role designer
node /path/to/this-repo/bin/cli.js update

# Publish to npm
npm publish
```

## Architecture

This is an **npm CLI package** (`claude-pm`) that installs Claude Code skills, commands, and structured context for product managers and designers into their product repos.

### 4-Layer context model

```
Policy Layer      policy/                         → maintainer owns, updated via npm
Interview Engine  interview/pm-interview.md       → run once per PM/designer
Dynamic Layer     CLAUDE.md + context.md files    → output of interview, never overwritten by update
Personal Layer    CLAUDE.local.md + settings.local.json → gitignored, PM-owned
```

### Key directories

| Directory | Purpose |
|---|---|
| `bin/cli.js` | CLI entry point. Two commands: `init` and `update`. |
| `src/commands/` | `init.js` and `update.js` — orchestrate the setup steps |
| `src/scaffold/copyGlobal.js` | Copies skills/commands/output-styles to `~/.claude/` |
| `src/scaffold/copyProject.js` | Copies policy + templates into the user's product repo |
| `src/scaffold/patchGitignore.js` | Adds entries to protect personal files |
| `src/utils/isPlaceholder.js` | Detects unmodified template files by sentinel string |
| `policy/` | Role-specific rules, commands, skills (SKILL.md), output styles |
| `pm-template/` | Placeholder files copied to the user's product repo on PM init |
| `designer-template/` | Placeholder files copied to the user's product repo on designer init |
| `interview/` | Interview markdown files for PM and designer onboarding |

### Two roles

`init` accepts `--role pm` (default) or `--role designer`. Role drives which template directory, skill set, agent file, and output style are used. See `ROLE_CONFIG` in `src/scaffold/copyProject.js`.

### Placeholder sentinel

Files containing `"Replace this file with the interview engine output."` are considered placeholders. `isPlaceholder()` in `src/utils/isPlaceholder.js` is used throughout `copyProject.js` to decide whether to overwrite. This protects generated (post-interview) files from being reset on re-init.

### Update vs Init

- `init`: full setup — global files + project scaffold + gitignore. Guarded by presence of `claude-workflow/` (use `--force` to override).
- `update`: only refreshes `claude-workflow/policy/`, `claude-workflow/interview/`, global `~/.claude/` files, and output styles. Never touches `CLAUDE.md`, context files, agents, or settings.

### What gets installed where

**Global (`~/.claude/`)** — shared across all user projects:
- `skills/shared/`, `skills/product-manager/`, `skills/product-designer/`
- `commands/product-manager/`, `commands/product-designer/`
- `commands/start-interview.md`, `commands/start-designer-interview.md` (written inline in `copyGlobal.js`)
- `output-styles/pm-standard.md`, `output-styles/design-standard.md`

**Project-level** — inside the user's product repo:
- `claude-workflow/policy/` — full policy copy for `@file` imports
- `claude-workflow/interview/` — interview markdown
- `claude-workflow/.claude-pm-version` — tracks installed version
- `CLAUDE.md`, `.claude/settings.json`, `.claude/agents/`, `.claude/skills/<role>/*/context.md`
