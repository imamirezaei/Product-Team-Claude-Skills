import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { PACKAGE_ROOT } from '../utils/packageRoot.js';
import { copyGlobal } from '../scaffold/copyGlobal.js';

const ROLE_LABELS = {
  pm: 'Product Manager',
  designer: 'Product Designer',
};

const ROLE_POLICY_DIR = {
  pm: 'product-manager',
  designer: 'product-designer',
};

const ROLE_OUTPUT_STYLE = {
  pm: {
    src: path.join('product-manager', 'output-styles', 'product-manager-standard.md'),
    dest: path.join('.claude', 'output-styles', 'product-manager-standard.md'),
  },
  designer: {
    src: path.join('product-designer', 'output-styles', 'design-standard.md'),
    dest: path.join('.claude', 'output-styles', 'design-standard.md'),
  },
};

// Files/dirs that must NEVER be overwritten during an update
const PROTECTED = [
  'CLAUDE.md',
  '.claude/skills/',
  '.claude/agents/',
  '.claude/settings.json',
  'CLAUDE.local.md',
  '.claude/settings.local.json',
];

function readPackageVersion() {
  const pkgPath = path.join(PACKAGE_ROOT, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return pkg.version;
}

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
  console.log(chalk.bold('Claude Setup — Policy Update'));
  console.log(chalk.dim('─'.repeat(40)));

  // ── Guard: must have been initialized ─────────────────────────────────────
  const setupFile = path.join(cwd, 'claude-workflow', '.claude-setup');
  if (!fs.existsSync(setupFile)) {
    console.error(chalk.red('\n✗ This project has not been initialized yet.'));
    console.error(chalk.dim('  Run: claude-pm init\n'));
    process.exit(1);
  }

  let setup = {};
  try {
    setup = JSON.parse(fs.readFileSync(setupFile, 'utf8'));
  } catch {
    console.error(chalk.red('\n✗ Could not read .claude-setup file.'));
    console.error(chalk.dim('  Try re-running: claude-pm init --force\n'));
    process.exit(1);
  }

  const { role, version: prevVersion } = setup;
  const newVersion = readPackageVersion();
  const roleLabel = ROLE_LABELS[role] ?? role ?? 'unknown';

  console.log('');
  console.log(chalk.dim(`  Role:             ${roleLabel}`));
  console.log(chalk.dim(`  Previous version: ${prevVersion ?? 'unknown'}`));
  console.log(chalk.dim(`  New version:      ${newVersion}`));
  console.log('');

  // ── Update shared policy ──────────────────────────────────────────────────
  console.log(chalk.bold('Updating policy files...'));
  const sharedSrc = path.join(PACKAGE_ROOT, 'policy', 'shared');
  const sharedDest = path.join(cwd, 'claude-workflow', 'policy', 'shared');
  if (fs.existsSync(sharedSrc)) {
    copyDirRecursive(sharedSrc, sharedDest);
    console.log(`  ${chalk.green('✓')} claude-workflow/policy/shared/`);
  }

  // ── Update role-specific policy ───────────────────────────────────────────
  if (role && ROLE_POLICY_DIR[role]) {
    const rolePolicySrc = path.join(PACKAGE_ROOT, 'policy', ROLE_POLICY_DIR[role]);
    const rolePolicyDest = path.join(cwd, 'claude-workflow', 'policy', ROLE_POLICY_DIR[role]);
    if (fs.existsSync(rolePolicySrc)) {
      copyDirRecursive(rolePolicySrc, rolePolicyDest);
      console.log(`  ${chalk.green('✓')} claude-workflow/policy/${ROLE_POLICY_DIR[role]}/`);
    }
  }

  // ── Update root policy files (e.g. settings.json) ────────────────────────
  const policyRoot = path.join(PACKAGE_ROOT, 'policy');
  const policyDest = path.join(cwd, 'claude-workflow', 'policy');
  for (const entry of fs.readdirSync(policyRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      fs.copyFileSync(path.join(policyRoot, entry.name), path.join(policyDest, entry.name));
    }
  }

  // ── Update interview file ─────────────────────────────────────────────────
  const interviewFileMap = {
    pm: 'product-manager-interview.md',
    designer: 'designer-interview.md',
  };
  const interviewFile = interviewFileMap[role];
  if (interviewFile) {
    const interviewSrc = path.join(PACKAGE_ROOT, 'interview', interviewFile);
    const interviewDest = path.join(cwd, 'claude-workflow', 'interview', interviewFile);
    if (fs.existsSync(interviewSrc)) {
      fs.mkdirSync(path.dirname(interviewDest), { recursive: true });
      fs.copyFileSync(interviewSrc, interviewDest);
      console.log(`  ${chalk.green('✓')} claude-workflow/interview/${interviewFile}`);
    }
  }

  // ── Update output style in .claude/ ──────────────────────────────────────
  if (role && ROLE_OUTPUT_STYLE[role]) {
    const { src, dest } = ROLE_OUTPUT_STYLE[role];
    const styleSrc = path.join(PACKAGE_ROOT, 'policy', src);
    const styleDest = path.join(cwd, dest);
    if (fs.existsSync(styleSrc) && fs.existsSync(path.dirname(styleDest))) {
      fs.copyFileSync(styleSrc, styleDest);
      console.log(`  ${chalk.green('✓')} ${dest}`);
    }
  }

  // ── Update global ~/.claude/ ──────────────────────────────────────────────
  console.log('');
  console.log(chalk.bold('Updating global files...'));
  const globalInstalled = copyGlobal();
  for (const p of globalInstalled) {
    console.log(`  ${chalk.green('✓')} ${p}`);
  }

  // ── Confirm protected files untouched ─────────────────────────────────────
  console.log('');
  console.log(chalk.dim('Protected (not touched):'));
  for (const p of PROTECTED) {
    console.log(chalk.dim(`  – ${p}`));
  }

  // ── Write updated setup file ──────────────────────────────────────────────
  fs.writeFileSync(setupFile, JSON.stringify({ version: newVersion, role }, null, 2), 'utf8');

  console.log('');
  console.log(chalk.green(`✓ Policy updated to version ${newVersion}.`));
  console.log('');
  console.log(chalk.dim('  Commit the changes:'));
  console.log(chalk.cyan(`  git add claude-workflow/ && git commit -m "Update policy to v${newVersion}"`));
  console.log('');
}
