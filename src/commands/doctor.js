import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawnSync } from 'child_process';
import chalk from 'chalk';

const ROLE_LABELS = {
  pm: 'Product Manager',
  designer: 'Product Designer',
};

function check(label, pass, detail = '') {
  const icon = pass ? chalk.green('✓') : chalk.red('✗');
  const text = pass ? chalk.white(label) : chalk.red(label);
  const note = detail ? chalk.dim(`  → ${detail}`) : '';
  console.log(`  ${icon} ${text}`);
  if (note) console.log(`     ${note}`);
  return pass;
}

export function runDoctor() {
  const cwd = process.cwd();
  const claudeDir = path.join(os.homedir(), '.claude');
  let allGood = true;

  console.log('');
  console.log(chalk.bold('Claude Setup — Health Check'));
  console.log(chalk.dim('─'.repeat(40)));

  // ── Node version ──────────────────────────────────────────────────────────
  console.log('');
  console.log(chalk.dim('Runtime'));
  const [major] = process.versions.node.split('.').map(Number);
  allGood = check(`Node.js v${process.versions.node}`, major >= 18, major < 18 ? 'Need >=18. Visit nodejs.org' : '') && allGood;

  const claudeCheck = spawnSync('claude', ['--version'], { encoding: 'utf8' });
  const claudeVersion = claudeCheck.status === 0 ? claudeCheck.stdout.trim() : null;
  allGood = check(
    claudeVersion ? `Claude Code ${claudeVersion}` : 'Claude Code',
    !!claudeVersion,
    !claudeVersion ? 'Run: npm install -g @anthropic-ai/claude-code' : ''
  ) && allGood;

  // ── Git repo ──────────────────────────────────────────────────────────────
  console.log('');
  console.log(chalk.dim('Project'));
  const isGitRepo = fs.existsSync(path.join(cwd, '.git'));
  allGood = check('Git repository', isGitRepo, !isGitRepo ? 'Run: git init' : '') && allGood;

  const setupFile = path.join(cwd, 'claude-workflow', '.claude-setup');
  const hasSetup = fs.existsSync(setupFile);
  allGood = check('claude-workflow initialized', hasSetup, !hasSetup ? 'Run: claude-pm init' : '') && allGood;

  let role = null;
  let version = null;
  if (hasSetup) {
    try {
      const setup = JSON.parse(fs.readFileSync(setupFile, 'utf8'));
      role = setup.role;
      version = setup.version;
    } catch {}
  }

  if (role) {
    check(`Role: ${ROLE_LABELS[role] ?? role}`, true);
  }
  if (version) {
    check(`Installed version: ${version}`, true);
  }

  // ── Policy files ──────────────────────────────────────────────────────────
  console.log('');
  console.log(chalk.dim('Policy files'));
  const policyDir = path.join(cwd, 'claude-workflow', 'policy');
  allGood = check('claude-workflow/policy/ exists', fs.existsSync(policyDir)) && allGood;

  const sharedPolicy = path.join(policyDir, 'shared');
  allGood = check('Shared policy', fs.existsSync(sharedPolicy)) && allGood;

  if (role) {
    const rolePolicy = path.join(policyDir, role === 'pm' ? 'product-manager' : 'product-designer');
    allGood = check(`${ROLE_LABELS[role]} policy`, fs.existsSync(rolePolicy)) && allGood;
  }

  // ── CLAUDE.md ─────────────────────────────────────────────────────────────
  console.log('');
  console.log(chalk.dim('Context'));
  const claudeMd = path.join(cwd, 'CLAUDE.md');
  const claudeMdExists = fs.existsSync(claudeMd);
  let claudeMdGenerated = false;
  if (claudeMdExists) {
    const content = fs.readFileSync(claudeMd, 'utf8');
    claudeMdGenerated = !content.includes('Replace this file with the interview engine output.');
  }
  allGood = check('CLAUDE.md present', claudeMdExists) && allGood;
  if (claudeMdExists) {
    check(
      claudeMdGenerated ? 'CLAUDE.md generated (interview complete)' : 'CLAUDE.md is a placeholder (interview not yet run)',
      claudeMdGenerated,
      !claudeMdGenerated ? `Run the interview: open Claude, then type ${role === 'designer' ? '/start-designer-interview' : '/start-interview'}` : ''
    );
  }

  // ── Skill context files ───────────────────────────────────────────────────
  if (role) {
    const skillsDir = path.join(cwd, '.claude', 'skills', role === 'pm' ? 'product-manager' : 'product-designer');
    if (fs.existsSync(skillsDir)) {
      const skills = fs.readdirSync(skillsDir, { withFileTypes: true }).filter(e => e.isDirectory());
      const generated = skills.filter(e => {
        const ctx = path.join(skillsDir, e.name, 'context.md');
        if (!fs.existsSync(ctx)) return false;
        return !fs.readFileSync(ctx, 'utf8').includes('Replace this file with the interview engine output.');
      });
      console.log('');
      console.log(chalk.dim('Skills'));
      check(
        `${generated.length}/${skills.length} skill contexts generated`,
        generated.length === skills.length,
        generated.length < skills.length ? 'Re-run the interview to fill remaining contexts' : ''
      );
    }
  }

  // ── Global ~/.claude/ ─────────────────────────────────────────────────────
  console.log('');
  console.log(chalk.dim('Global'));
  check('~/.claude/skills/ exists', fs.existsSync(path.join(claudeDir, 'skills'))) && allGood;
  check('~/.claude/commands/ exists', fs.existsSync(path.join(claudeDir, 'commands'))) && allGood;

  // ── Outputs directory ─────────────────────────────────────────────────────
  console.log('');
  console.log(chalk.dim('Outputs'));
  check('.claude/outputs/html/ exists', fs.existsSync(path.join(cwd, '.claude', 'outputs', 'html'))) && allGood;
  check('.claude/outputs/md/ exists', fs.existsSync(path.join(cwd, '.claude', 'outputs', 'md'))) && allGood;

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('');
  console.log(chalk.dim('─'.repeat(40)));
  if (allGood) {
    console.log(chalk.green('  ✓ Everything looks good.'));
  } else {
    console.log(chalk.yellow('  ⚠  Some checks failed. See details above.'));
  }
  console.log('');
}
