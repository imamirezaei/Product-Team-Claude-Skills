# Product Team Claude Skills

[![npm version](https://img.shields.io/npm/v/product-team-claude-skills)](https://www.npmjs.com/package/product-team-claude-skills)

Claude Code setup for product teams. This package installs role-specific skills, commands, output styles, and onboarding flows for:

- Product Managers
- Product Designers

The current repository ships:

- 10 PM skill definitions
- 8 Product Designer skill definitions
- 6 shared skill definitions
- 19 PM command files
- 15 Designer command files
- 2 onboarding interviews in `interview/`
- 8 documentation pages in `docs/`

The published CLI command is still `claude-pm`.

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

### Product Manager

```bash
cd /path/to/your-product-repo
claude-pm init
```

After Claude opens, run:

```text
/start-interview
```

### Product Designer

```bash
cd /path/to/your-product-repo
claude-pm init --role designer
```

After Claude opens, run:

```text
/start-designer-interview
```

Useful options:

- `claude-pm init --role pm`
- `claude-pm init --role designer`
- `claude-pm init --force`

What `claude-pm init` does:

1. Installs global files into `~/.claude/`
2. Scaffolds project files into the current repo
3. Patches `.gitignore` for private Claude files
4. Opens Claude Code if `claude` is available in `PATH`

---

## Update

Refresh the policy layer for an already initialized repo:

```bash
npm update -g product-team-claude-skills
claude-pm update
```

`claude-pm update` refreshes:

- `claude-workflow/policy/`
- `claude-workflow/interview/`
- global files in `~/.claude/`

It does not rerun onboarding and does not overwrite generated context files such as:

- `CLAUDE.md`
- `.claude/skills/.../context.md`
- `.claude/agents/...`
- `CLAUDE.local.md`
- `.claude/settings.local.json`

---

## What Gets Installed

### Global files in `~/.claude/`

| Path                                             | Contents                          |
| ------------------------------------------------ | --------------------------------- |
| `~/.claude/skills/shared/`                       | 6 shared `SKILL.md` files         |
| `~/.claude/skills/product-manager/`              | 10 PM `SKILL.md` files            |
| `~/.claude/skills/product-designer/`             | 8 Designer `SKILL.md` files       |
| `~/.claude/commands/product-manager/`            | 19 PM command files               |
| `~/.claude/commands/product-designer/`           | 15 Designer command files         |
| `~/.claude/commands/start-interview.md`          | PM onboarding entry command       |
| `~/.claude/commands/start-designer-interview.md` | Designer onboarding entry command |
| `~/.claude/output-styles/pm-standard.md`         | PM output style                   |
| `~/.claude/output-styles/design-standard.md`     | Designer output style             |

### Project scaffold for PM repos

| Path                                          | Contents                                      |
| --------------------------------------------- | --------------------------------------------- |
| `claude-workflow/policy/`                     | Full policy copy used by the repo             |
| `claude-workflow/interview/`                  | `pm-interview.md` and `designer-interview.md` |
| `claude-workflow/.claude-pm-version`          | Installed package version marker              |
| `CLAUDE.md`                                   | PM context root file                          |
| `.claude/settings.json`                       | Claude Code repo settings                     |
| `.claude/output-styles/pm-standard.md`        | PM output style inside the repo               |
| `.claude/agents/product-agent.md`             | PM agent placeholder                          |
| `.claude/skills/product-manager/*/context.md` | PM context placeholders                       |

### Project scaffold for Designer repos

| Path                                           | Contents                                      |
| ---------------------------------------------- | --------------------------------------------- |
| `claude-workflow/policy/`                      | Full policy copy used by the repo             |
| `claude-workflow/interview/`                   | `pm-interview.md` and `designer-interview.md` |
| `claude-workflow/.claude-pm-version`           | Installed package version marker              |
| `CLAUDE.md`                                    | Designer context root file                    |
| `.claude/settings.json`                        | Claude Code repo settings                     |
| `.claude/output-styles/design-standard.md`     | Designer output style inside the repo         |
| `.claude/agents/design-agent.md`               | Designer agent placeholder                    |
| `.claude/agents/handoff-agent.md`              | Handoff agent placeholder                     |
| `.claude/skills/product-designer/*/context.md` | Designer context placeholders                 |

### Private files

These are added to `.gitignore`:

| Path                          | Purpose                  |
| ----------------------------- | ------------------------ |
| `CLAUDE.local.md`             | Private notes            |
| `.claude/settings.local.json` | Personal local overrides |

---

## Skills

### Product Manager skills

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

### Product Designer skills

- `design-handoff`
- `design-policy-review`
- `design-qa`
- `design-research`
- `figma-to-code`
- `implementation-review`
- `microcopy-writer`
- `vuetify-constraint-check`

### Shared skills

- `design-system-check`
- `meeting-support`
- `presentation-style`
- `prompt-optimizer`
- `task-writer`
- `wireframe-generator`

---

## Onboarding Flows

### PM onboarding

Source: [interview/pm-interview.md](interview/pm-interview.md)

Current repo version:

- Structured multi-section interview
- Starts by asking working language
- Generates PM context files in English
- Supports repo and no-repo modes
- Targets 14 generated output files

### Designer onboarding

Source: [interview/designer-interview.md](interview/designer-interview.md)

Current repo version:

- Figma-first onboarding
- Verifies Figma MCP access first
- Asks two short setup questions
- Reads one or two Figma files
- Generates Designer context files in English
- Targets 11 generated output files per the onboarding spec

---

## Documentation

The repository currently includes these HTML docs in [`docs/`](docs/):

| File                                                   | Purpose                         |
| ------------------------------------------------------ | ------------------------------- |
| [docs/index.html](docs/index.html)                     | Overview / landing page                  |
| [docs/pipeline.html](docs/pipeline.html)               | Context Pipeline deep-dive               |
| [docs/presentation.html](docs/presentation.html)       | General team presentation                |
| [docs/presentation-pm.html](docs/presentation-pm.html) | Product Manager presentation             |
| [docs/presentation-pd.html](docs/presentation-pd.html) | Product Designer presentation            |
| [docs/pm-presentation.html](docs/pm-presentation.html) | PM presentation (alternate layout)       |
| [docs/pd-presentation.html](docs/pd-presentation.html) | Designer presentation (alternate layout) |
| [docs/figma-to-vue.html](docs/figma-to-vue.html)       | Figma → Vue / Vuetify reference          |

---

## Repository Structure

```text
product-team-claude-skills/
├── bin/
│   └── cli.js
├── src/
│   ├── commands/
│   │   ├── init.js
│   │   └── update.js
│   ├── scaffold/
│   │   ├── copyGlobal.js
│   │   ├── copyProject.js
│   │   └── patchGitignore.js
│   └── utils/
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
│   ├── designer-interview.md
│   └── pm-interview.md
├── pm-template/
├── designer-template/
├── docs/
│   ├── index.html
│   ├── pipeline.html
│   ├── presentation.html
│   ├── presentation-pm.html
│   ├── presentation-pd.html
│   ├── pm-presentation.html
│   ├── pd-presentation.html
│   └── figma-to-vue.html
└── README.md
```

---

## License

UNLICENSED
