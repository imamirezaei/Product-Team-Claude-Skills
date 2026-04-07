import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { PACKAGE_ROOT } from '../utils/packageRoot.js';
import { copyGlobal } from '../scaffold/copyGlobal.js';

// Files/dirs that must NEVER be overwritten during an update
const PROTECTED = [
  'CLAUDE.md',
  '.claude/skills/product',
  '.claude/agents/product-agent.md',
  '.claude/settings.json',
  'CLAUDE.local.md',
  '.claude/settings.local.json',
];

function readPackageVersion() {
  const pkgPath = path.join(PACKAGE_ROOT, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return pkg.version;
}

/**
 * Recursively copies src into dest, overwriting everything.
 * Used only for policy files (rules, commands, SKILL.md files, output-styles).
 * context.md files inside skills are NOT touched because we only copy SKILL.md files.
 */
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export function runUpdate() {
  const cwd = process.cwd();

  console.log('');
  console.log(chalk.bold('Claude PM — به‌روزرسانی policy'));
  console.log(chalk.dim('─'.repeat(40)));

  // ── Guard: must have been initialized ─────────────────────────────────────
  const versionFile = path.join(cwd, 'claude-workflow', '.claude-pm-version');
  if (!fs.existsSync(versionFile)) {
    console.error(chalk.red('\n✗ این پروژه هنوز initialize نشده.'));
    console.error(chalk.dim('  ابتدا اجرا کنید: claude-pm init\n'));
    process.exit(1);
  }

  const prevVersion = fs.readFileSync(versionFile, 'utf8').trim();
  const newVersion = readPackageVersion();

  console.log('');
  console.log(chalk.dim(`  نسخه قبلی: ${prevVersion}`));
  console.log(chalk.dim(`  نسخه جدید: ${newVersion}`));
  console.log('');

  // ── Update policy layer in ./claude-workflow/policy/ ──────────────────────
  console.log(chalk.bold('به‌روزرسانی policy در پروژه...'));
  const policySrc = path.join(PACKAGE_ROOT, 'policy');
  const policyDest = path.join(cwd, 'claude-workflow', 'policy');
  copyDirRecursive(policySrc, policyDest);
  console.log(`  ${chalk.green('✓')} claude-workflow/policy/`);

  // Update interview file too
  const interviewSrc = path.join(PACKAGE_ROOT, 'interview');
  const interviewDest = path.join(cwd, 'claude-workflow', 'interview');
  copyDirRecursive(interviewSrc, interviewDest);
  console.log(`  ${chalk.green('✓')} claude-workflow/interview/`);

  // Update pm-standard output style in .claude/
  const pmStandardSrc = path.join(PACKAGE_ROOT, 'policy', 'output-styles', 'pm-standard.md');
  const pmStandardDest = path.join(cwd, '.claude', 'output-styles', 'pm-standard.md');
  if (fs.existsSync(path.dirname(pmStandardDest))) {
    fs.copyFileSync(pmStandardSrc, pmStandardDest);
    console.log(`  ${chalk.green('✓')} .claude/output-styles/pm-standard.md`);
  }

  // ── Update global ~/.claude/ ──────────────────────────────────────────────
  console.log('');
  console.log(chalk.bold('به‌روزرسانی فایل‌های global...'));
  const globalInstalled = copyGlobal();
  for (const p of globalInstalled) {
    console.log(`  ${chalk.green('✓')} ${p}`);
  }

  // ── Confirm protected files untouched ─────────────────────────────────────
  console.log('');
  console.log(chalk.dim('فایل‌های شخصی دست نخورده ماندند:'));
  for (const p of PROTECTED) {
    console.log(chalk.dim(`  – ${p}`));
  }

  // ── Write new version ─────────────────────────────────────────────────────
  fs.writeFileSync(versionFile, newVersion, 'utf8');

  console.log('');
  console.log(chalk.green(`✓ Policy به نسخه ${newVersion} به‌روز شد.`));
  console.log('');
  console.log(chalk.dim('  پیشنهاد: تغییرات را commit کنید:'));
  console.log(chalk.cyan(`  git add claude-workflow/ && git commit -m "Update PM policy to v${newVersion}"`));
  console.log('');
}
