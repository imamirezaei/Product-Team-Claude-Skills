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

export async function runInit({ force = false } = {}) {
  const cwd = process.cwd();

  console.log('');
  console.log(chalk.bold('Claude PM Setup'));
  console.log(chalk.dim('─'.repeat(40)));

  // ── Guard: must be inside a git repo ──────────────────────────────────────
  if (!detectGitRepo(cwd)) {
    console.error(chalk.red('\n✗ این پوشه یک git repository نیست.'));
    console.error(chalk.dim('  ابتدا با git init یا git clone یک repo ایجاد کنید.\n'));
    process.exit(1);
  }

  // ── Guard: existing setup ─────────────────────────────────────────────────
  const alreadySetup = fs.existsSync(path.join(cwd, 'claude-workflow'));
  if (alreadySetup && !force) {
    console.log(chalk.yellow('\n⚠  پوشه claude-workflow قبلاً وجود دارد.'));
    console.log(chalk.dim('   برای به‌روزرسانی policy layer از دستور زیر استفاده کنید:'));
    console.log(chalk.cyan('   claude-pm update\n'));
    process.exit(0);
  }

  console.log('');

  // ── Step 1: Global files ──────────────────────────────────────────────────
  console.log(chalk.bold('نصب فایل‌های global...'));
  const globalInstalled = copyGlobal();
  for (const p of globalInstalled) {
    printStep(chalk.green('✓'), p);
  }

  console.log('');

  // ── Step 2: Project scaffold ──────────────────────────────────────────────
  console.log(chalk.bold('ساختن فایل‌های پروژه...'));
  const version = readPackageVersion();
  const projectInstalled = copyProject(cwd, version);
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

  if (claudeVersion) {
    console.log('');
    console.log(chalk.bold('آماده شروع interview...'));
    console.log(chalk.dim(`  Claude Code: ${claudeVersion}`));
    console.log('');
    console.log(chalk.cyan('  Claude Code در حال باز شدن است.'));
    console.log(chalk.cyan('  بعد از باز شدن، تایپ کنید: /start-interview'));
    console.log('');

    // Small pause so PM can read the message before Claude takes over the terminal
    await new Promise(r => setTimeout(r, 2000));

    const result = spawnSync('claude', [], { stdio: 'inherit', cwd });
    if (result.error) {
      console.log(chalk.yellow('\n⚠  Claude Code راه‌اندازی نشد.'));
      console.log(chalk.dim('  دستی اجرا کنید: claude'));
    }
  } else {
    console.log('');
    console.log(chalk.yellow('⚠  Claude Code در PATH یافت نشد.'));
    console.log('');
    console.log('  برای نصب Claude Code:');
    console.log(chalk.cyan('  npm install -g @anthropic-ai/claude-code'));
    console.log('');
    console.log('  بعد از نصب، از این پوشه اجرا کنید:');
    console.log(chalk.cyan('  claude'));
    console.log('  سپس تایپ کنید: /start-interview');
  }

  console.log('');
  console.log(chalk.green('✓ Setup کامل شد.'));
  console.log(chalk.dim('  برای به‌روزرسانی: claude-pm update'));
  console.log('');
}
