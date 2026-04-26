# Product Team Claude Skills

[![npm version](https://img.shields.io/npm/v/product-team-claude-skills)](https://www.npmjs.com/package/product-team-claude-skills)

Claude Code setup for product teams. Installs role-specific skills, commands, output styles, and onboarding flows for:

- Product Managers
- Product Designers

The current repository ships:

- 10 Product Manager skill definitions
- 8 Product Designer skill definitions
- 6 shared skill definitions
- 19 Product Manager command files
- 15 Product Designer command files
- 2 onboarding interviews in `interview/`

---

## Install

```bash
npm install -g product-team-claude-skills
```

Or run without installing:

```bash
npx product-team-claude-skills init
```

Requirements:

- Node.js `>=18`
- [Claude Code](https://claude.ai/code)
- A git repository for the product you want to initialize

---

## Quick Start

```bash
cd /path/to/your-product-repo
claude-pm init
```

The CLI will ask which role to set up:

```
  What is your role?
  1. Product Manager
  2. Product Designer

  Enter 1 or 2:
```

After Claude opens, run the matching interview command:

| Role | Command |
|---|---|
| Product Manager | `/start-interview` |
| Product Designer | `/start-designer-interview` |

### Options

```bash
claude-pm init --role pm        # skip the prompt, set up as Product Manager
claude-pm init --role designer  # skip the prompt, set up as Product Designer
claude-pm init --force          # re-run even if already initialized
```

### What `claude-pm init` does

1. Checks prerequisites (Node.js version, Claude Code)
2. Installs global files into `~/.claude/`
3. Scaffolds role-specific project files into the current repo
4. Patches `.gitignore` for private Claude files
5. Opens Claude Code automatically if available

---

## Other Commands

```bash
claude-pm update       # refresh policy layer without touching personal files
claude-pm doctor       # health check — shows what's installed and what's missing
claude-pm list-skills  # list all skills available in this repo
```

---

## Update

Refresh the policy layer for an already-initialized repo:

```bash
npm update -g product-team-claude-skills
claude-pm update
```

`claude-pm update` refreshes only role-specific policy files:

- `claude-workflow/policy/shared/`
- `claude-workflow/policy/<your-role>/`
- `claude-workflow/interview/`
- global files in `~/.claude/`

It never touches generated context files:

- `CLAUDE.md`
- `.claude/skills/.../context.md`
- `.claude/agents/`
- `CLAUDE.local.md`
- `.claude/settings.local.json`

---

## What Gets Installed

### Global files in `~/.claude/`

| Path | Contents |
|---|---|
| `~/.claude/skills/shared/` | 6 shared `SKILL.md` files |
| `~/.claude/skills/product-manager/` | 10 Product Manager `SKILL.md` files |
| `~/.claude/skills/product-designer/` | 8 Product Designer `SKILL.md` files |
| `~/.claude/commands/product-manager/` | 19 Product Manager command files |
| `~/.claude/commands/product-designer/` | 15 Product Designer command files |
| `~/.claude/commands/start-interview.md` | Product Manager onboarding entry point |
| `~/.claude/commands/start-designer-interview.md` | Product Designer onboarding entry point |
| `~/.claude/output-styles/product-manager-standard.md` | Product Manager output style |
| `~/.claude/output-styles/design-standard.md` | Product Designer output style |

### Project scaffold — Product Manager

| Path | Contents |
|---|---|
| `claude-workflow/policy/shared/` | Shared rules, skills, assets |
| `claude-workflow/policy/product-manager/` | Product Manager rules, skills, commands |
| `claude-workflow/interview/product-manager-interview.md` | Onboarding interview |
| `claude-workflow/.claude-setup` | Installed version and role |
| `CLAUDE.md` | Context root file (placeholder until interview runs) |
| `.claude/settings.json` | Claude Code repo settings |
| `.claude/output-styles/product-manager-standard.md` | Output style inside the repo |
| `.claude/agents/product-agent.md` | Product Manager agent placeholder |
| `.claude/skills/product-manager/*/context.md` | Skill context placeholders |
| `.claude/outputs/html/` | HTML deliverables directory |
| `.claude/outputs/md/` | Markdown deliverables directory |

### Project scaffold — Product Designer

| Path | Contents |
|---|---|
| `claude-workflow/policy/shared/` | Shared rules, skills, assets |
| `claude-workflow/policy/product-designer/` | Product Designer rules, skills, commands |
| `claude-workflow/interview/designer-interview.md` | Onboarding interview |
| `claude-workflow/.claude-setup` | Installed version and role |
| `CLAUDE.md` | Context root file (placeholder until interview runs) |
| `.claude/settings.json` | Claude Code repo settings |
| `.claude/output-styles/design-standard.md` | Output style inside the repo |
| `.claude/agents/design-agent.md` | Product Designer agent placeholder |
| `.claude/agents/handoff-agent.md` | Handoff agent placeholder |
| `.claude/skills/product-designer/*/context.md` | Skill context placeholders |
| `.claude/outputs/html/` | HTML deliverables directory |
| `.claude/outputs/md/` | Markdown deliverables directory |

### Private files (added to `.gitignore`)

| Path | Purpose |
|---|---|
| `CLAUDE.local.md` | Private notes |
| `.claude/settings.local.json` | Personal local overrides |

---

## Skills

### Product Manager

- `decision-logger`
- `edge-case-finder`
- `feature-dependency`
- `feature-prioritization`
- `feature-spec`
- `problem-framing`
- `qa-guide`
- `release-impact`
- `requirement-writer`
- `scope-check`

### Product Designer

- `design-handoff`
- `design-policy-review`
- `design-qa`
- `design-research`
- `figma-to-code`
- `implementation-review`
- `microcopy-writer`
- `vuetify-constraint-check`

### Shared

- `design-system-check`
- `meeting-support`
- `presentation-style`
- `prompt-optimizer`
- `task-writer`
- `wireframe-generator`

---

## Onboarding Flows

### Product Manager

Source: [interview/product-manager-interview.md](interview/product-manager-interview.md)

- Structured multi-section interview
- Starts by asking working language (Persian or English)
- Generates context files in English
- Supports repo and no-repo modes
- Produces 14 output files

### Product Designer

Source: [interview/designer-interview.md](interview/designer-interview.md)

- Figma-first onboarding — reads the Figma file directly instead of asking questions
- Verifies Figma MCP access first
- Asks two short setup questions (language + repo status)
- Reads one or two Figma files via MCP
- Produces 11 output files

---

## Output Files

All deliverables produced by skills are saved into:

```
.claude/outputs/
  html/    ← styled single-file HTML documents
  md/      ← clean Markdown documents
```

File naming follows the pattern: `{topic}-{jalali-date}.{ext}`

Example: `payment-gateway-spec-14050131.md`

---

## Repository Structure

```text
product-team-claude-skills/
├── bin/
│   └── cli.js
├── src/
│   ├── commands/
│   │   ├── init.js
│   │   ├── update.js
│   │   ├── doctor.js
│   │   └── listSkills.js
│   ├── scaffold/
│   │   ├── copyGlobal.js
│   │   ├── copyProject.js
│   │   └── patchGitignore.js
│   └── utils/
│       ├── checkPrereqs.js
│       ├── detectClaude.js
│       ├── detectGitRepo.js
│       ├── detectRole.js
│       ├── isPlaceholder.js
│       └── packageRoot.js
├── policy/
│   ├── product-manager/
│   │   ├── commands/
│   │   ├── output-styles/
│   │   ├── rules/
│   │   └── skills/
│   ├── product-designer/
│   │   ├── commands/
│   │   ├── output-styles/
│   │   ├── rules/
│   │   └── skills/
│   └── shared/
│       ├── assets/
│       ├── rules/
│       └── skills/
├── interview/
│   ├── product-manager-interview.md
│   └── designer-interview.md
├── product-manager-template/
├── designer-template/
└── README.md
```

---

## Contributing

Contributions are welcome. See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full process — fork, branch, Conventional Commits, CI, and review.

- Found a bug? [Open a bug report](../../issues/new/choose).
- Want a new skill, command, or role? [Open a feature/skill request](../../issues/new/choose).
- Submitting a PR? Use a fork, work on a feature branch, make sure `npm test` passes locally, and follow the PR template. CI runs automatically; only the maintainer can merge to `main`.

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.
