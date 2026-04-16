import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import chalk from 'chalk';
import { detectGitRepo } from '../utils/detectGitRepo.js';
import { detectClaude } from '../utils/detectClaude.js';
import { copyGlobal } from '../scaffold/copyGlobal.js';
import { copyProject } from '../scaffold/copyProject.js';
import { patchGitignore } from '../scaffold/patchGitignore.js';
import { PACKAGE_ROOT } from '../utils/packageRoot.js';

function readPackageVersion() {
  const pkgPath = path.join(PACKAGE_ROOT, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return pkg.version;
}

function printStep(icon, msg) {
  console.log(`  ${icon} ${msg}`);
}

const ROLE_LABELS = {
  pm: 'Product Manager',
  designer: 'Product Designer',
};

const INTERVIEW_COMMANDS = {
  pm: '/start-interview',
  designer: '/start-designer-interview',
};

export async function runInit({ force = false, role = 'pm' } = {}) {
  const cwd = process.cwd();
  const roleLabel = ROLE_LABELS[role] ?? role;

  console.log('');
  console.log(chalk.bold(`Claude ${roleLabel} Setup`));
  console.log(chalk.dim('─'.repeat(40)));

  // ── Guard: must be inside a git repo ──────────────────────────────────────
  if (!detectGitRepo(cwd)) {
    console.error(chalk.red('\n✗ This directory is not a git repository.'));
    console.error(chalk.dim('  Create one first with git init or git clone.\n'));
    process.exit(1);
  }

  // ── Guard: existing setup ─────────────────────────────────────────────────
  const alreadySetup = fs.existsSync(path.join(cwd, 'claude-workflow'));
  if (alreadySetup && !force) {
    console.log(chalk.yellow('\n⚠  The claude-workflow directory already exists.'));
    console.log(chalk.dim('   To update the policy layer, run:'));
    console.log(chalk.cyan('   claude-pm update\n'));
    process.exit(0);
  }

  console.log('');

  // ── Step 1: Global files ──────────────────────────────────────────────────
  console.log(chalk.bold('Installing global files...'));
  const globalInstalled = copyGlobal();
  for (const p of globalInstalled) {
    printStep(chalk.green('✓'), p);
  }

  console.log('');

  // ── Step 2: Project scaffold ──────────────────────────────────────────────
  console.log(chalk.bold('Scaffolding project files...'));
  const version = readPackageVersion();
  const projectInstalled = copyProject(cwd, version, role);
  for (const p of projectInstalled) {
    printStep(chalk.green('✓'), p);
  }

  console.log('');

  // ── Step 3: .gitignore ────────────────────────────────────────────────────
  const patched = patchGitignore(cwd);
  if (patched) {
    printStep(chalk.green('✓'), '.gitignore updated (CLAUDE.local.md protected)');
  } else {
    printStep(chalk.dim('–'), '.gitignore already configured');
  }

  console.log('');
  console.log(chalk.dim('─'.repeat(40)));

  // ── Step 4: Launch interview ──────────────────────────────────────────────
  const claudeVersion = detectClaude();
  const interviewCommand = INTERVIEW_COMMANDS[role];

  if (claudeVersion) {
    console.log('');
    console.log(chalk.bold('Ready to start the interview...'));
    console.log(chalk.dim(`  Claude Code: ${claudeVersion}`));
    console.log('');
    console.log(chalk.cyan('  Launching Claude Code.'));
    console.log(chalk.cyan(`  Once it opens, type: ${interviewCommand}`));
    console.log('');

    // Small pause so user can read the message before Claude takes over the terminal
    await new Promise(r => setTimeout(r, 2000));

    const result = spawnSync('claude', [], { stdio: 'inherit', cwd });
    if (result.error) {
      console.log(chalk.yellow('\n⚠  Claude Code could not be launched.'));
      console.log(chalk.dim('  Run it manually with: claude'));
    }
  } else {
    console.log('');
    console.log(chalk.yellow('⚠  Claude Code was not found in PATH.'));
    console.log('');
    console.log('  To install Claude Code:');
    console.log(chalk.cyan('  npm install -g @anthropic-ai/claude-code'));
    console.log('');
    console.log('  After installing, run this from the current directory:');
    console.log(chalk.cyan('  claude'));
    console.log(`  Then type: ${interviewCommand}`);
  }

  console.log('');
  console.log(chalk.green('✓ Setup complete.'));
  console.log(chalk.dim('  To update later: claude-pm update'));
  console.log('');
}
