# Contributing to Product Team Claude Skills

Thanks for your interest in improving this project. This document describes how to propose changes, what kinds of contributions we accept, and how the review process works.

> **TL;DR**
> Fork the repo, work on a feature branch, follow Conventional Commits, make sure CI is green, and open a PR. Only the maintainer (`@imamirezaei`) can merge to `main`.

---

## What we accept

We welcome the following kinds of contributions:

1. **Existing-content fixes** — typos, clarifications, improvements to interview questions, fixes to existing skills/commands.
2. **New skills or commands** for Product Manager or Product Designer roles.
3. **New roles** (e.g. Engineer, QA, Researcher) — these are larger; please open an issue first.
4. **CLI code changes** — bug fixes or new features in `bin/` or `src/`.
5. **Documentation** — improvements to `README.md`, `docs/`, or this file.
6. **Translations** — translated versions of interview files or templates.

If you are not sure whether your idea fits, open a [feature/skill request issue](../../issues/new/choose) before starting work.

---

## Before you start

- For **small fixes** (typos, single-line bugs), feel free to open a PR directly.
- For **anything larger** (new skill, new role, refactor, behavior change), please open an issue first so we can align on scope before you spend time on it.
- One PR per logical change. Avoid bundling unrelated fixes.

---

## Development setup

Requirements:

- Node.js `>=18`
- Git
- A separate temporary directory you can use as a "fake product repo" for smoke testing

Steps:

```bash
# 1. Fork on GitHub, then clone YOUR fork
git clone https://github.com/<your-username>/Product-Team-Claude-Skills.git
cd Product-Team-Claude-Skills

# 2. Add upstream so you can keep your fork up to date
git remote add upstream https://github.com/imamirezaei/Product-Team-Claude-Skills.git

# 3. Install
npm install

# 4. Run the same checks CI runs
npm test                    # CLI --help + skills validation
npm run validate:skills     # structural validation only

# 5. Smoke-test the CLI in a temp repo
TMP=$(mktemp -d) && cd "$TMP" && git init -q
node /path/to/your/clone/bin/cli.js init --role pm --force
ls CLAUDE.md claude-workflow/policy claude-workflow/interview
```

---

## Branching and commits

### Branching

- Always work in **your fork**, not a branch on the upstream repo.
- Branch off `main` and use a descriptive prefix:
  - `feat/<short-description>` — new feature or skill
  - `fix/<short-description>` — bug fix
  - `docs/<short-description>` — documentation only
  - `chore/<short-description>` — tooling, CI, dependencies
  - `refactor/<short-description>` — internal restructuring without behavior change

### Commits

We use **[Conventional Commits](https://www.conventionalcommits.org/)**. CI lints every commit in your PR.

Format: `<type>(<optional-scope>): <subject>`

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Examples:

```
feat(pm): add scope-check skill
fix(cli): handle missing git repo in init
docs(readme): clarify --role flag
chore(deps): bump commander to 12.1.0
```

If you need to amend or squash commits before opening a PR, do that locally — keep the history clean.

---

## Adding a new skill or command

This repo's main "content" is skills and commands. To add a new one:

### Skill checklist

- [ ] File path: `policy/<role>/skills/<skill-name>/SKILL.md` (where `<role>` is `product-manager`, `product-designer`, or `shared`)
- [ ] Frontmatter includes both `name` and `description`:
  ```markdown
  ---
  name: my-skill-name
  description: One-sentence description that explains when this skill should trigger.
  ---
  ```
- [ ] If the skill needs project-specific context, also add a placeholder `context.md` to the matching `<role>-template/.claude/skills/<role>/<skill-name>/context.md`. The placeholder body must contain the sentinel string defined in [`src/utils/isPlaceholder.js`](src/utils/isPlaceholder.js).
- [ ] Run `npm run validate:skills` locally — it should pass.

### Command checklist

- [ ] File path: `policy/<role>/commands/<command-name>.md`
- [ ] Frontmatter includes `description`:
  ```markdown
  ---
  description: One-sentence description shown in the slash-command menu.
  ---
  ```
- [ ] The body invokes the relevant skill (see existing commands for the pattern).

---

## Adding a new role

New roles are larger changes. **Please open an issue first.** Once aligned, the checklist is:

- [ ] New `<role>-template/` directory with `CLAUDE.md`, `.claude/agents/`, and `.claude/skills/<role>/<skill>/context.md` placeholders for every skill
- [ ] New `policy/<role>/` directory with `skills/`, `commands/`, `output-styles/`, and `rules/` (mirror existing roles)
- [ ] Updated `ROLE_CONFIG` in [`src/scaffold/copyProject.js`](src/scaffold/copyProject.js)
- [ ] New interview file in `interview/<role>-interview.md`
- [ ] Updated `interviewFileMap` in `src/scaffold/copyProject.js`
- [ ] Updated CLI prompts in [`bin/cli.js`](bin/cli.js)
- [ ] Updated global install in [`src/scaffold/copyGlobal.js`](src/scaffold/copyGlobal.js) so `~/.claude/` gets the new role's skills, commands, and output style
- [ ] README updated with the new role and matching `/start-<role>-interview` command

---

## PR process

1. Push your branch to your fork.
2. Open a PR against `imamirezaei/Product-Team-Claude-Skills` `main`.
3. Fill out the PR template — the checklist matters; reviewers use it.
4. Wait for CI to be green:
   - `Test (Node 18 / 20 / 22 on ubuntu-latest, macos-latest)`
   - `Lint commits (Conventional Commits)`
5. Address review feedback by pushing additional commits to your branch (do not force-push unless asked).
6. **The maintainer merges.** Contributors do not have merge permission on `main`. This is enforced by branch protection.

Review is **best-effort**; there is no SLA. If a PR has been quiet for more than two weeks, feel free to leave a polite comment.

---

## Code style

- Follow the existing patterns in `src/` (ESM imports, no semicolons-vs-semicolons fights — match the surrounding file).
- Node `>=18` features are fine. No transpilation step.
- Output complete files, not fragments.
- Avoid adding runtime dependencies unless there is a clear reason. CI-only or dev-only dependencies should use `--no-save` or live in `devDependencies`.
- Skills and commands use Markdown with YAML frontmatter — match the format of the existing files in the same directory.

For agent / Claude Code conventions, see [`CLAUDE.md`](CLAUDE.md).

---

## License

This package is published to npm and distributed publicly. By contributing, you agree that your contributions are submitted under the same terms as the rest of the project. See [`package.json`](package.json) for the current license declaration.

---

## Reporting security issues

Please do **not** open a public issue for security vulnerabilities. Instead, email `im.amirezaei@gmail.com` with details.

---

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.
