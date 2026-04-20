import fs from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';

const ROLE_DIR = {
  pm: 'product-manager',
  designer: 'product-designer',
};

function readSkillMeta(skillMdPath) {
  if (!fs.existsSync(skillMdPath)) return null;
  const content = fs.readFileSync(skillMdPath, 'utf8');
  const descMatch = content.match(/^(?:description|Description):\s*(.+)$/m)
    ?? content.match(/^#+\s+.+\n+(.+)/m);
  return descMatch ? descMatch[1].trim() : null;
}

function listSkillsForRole(roleDir, label, policyRoot) {
  const skillsPath = path.join(policyRoot, roleDir, 'skills');
  if (!fs.existsSync(skillsPath)) return;

  const skills = fs.readdirSync(skillsPath, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort();

  if (skills.length === 0) return;

  console.log('');
  console.log(chalk.bold(`  ${label} (${skills.length})`));

  for (const skill of skills) {
    const skillMd = path.join(skillsPath, skill, 'SKILL.md');
    const desc = readSkillMeta(skillMd);
    console.log(`  ${chalk.cyan(skill)}${desc ? chalk.dim(` — ${desc}`) : ''}`);
  }
}

export function runListSkills() {
  const cwd = process.cwd();

  // Determine role from .claude-setup
  const setupFile = path.join(cwd, 'claude-workflow', '.claude-setup');
  let role = null;
  if (fs.existsSync(setupFile)) {
    try {
      role = JSON.parse(fs.readFileSync(setupFile, 'utf8')).role ?? null;
    } catch {}
  }

  // Prefer project-local policy, fall back to global ~/.claude
  const localPolicy = path.join(cwd, 'claude-workflow', 'policy');
  const globalPolicy = path.join(os.homedir(), '.claude', 'skills');
  const hasLocalPolicy = fs.existsSync(localPolicy);

  console.log('');
  console.log(chalk.bold('Installed Skills'));
  console.log(chalk.dim('─'.repeat(40)));

  if (hasLocalPolicy) {
    // Shared skills
    listSkillsForRole('shared', 'Shared', localPolicy);

    // Role-specific skills
    if (role) {
      const roleLabel = role === 'pm' ? 'Product Manager' : 'Product Designer';
      listSkillsForRole(ROLE_DIR[role], roleLabel, localPolicy);
    } else {
      // No role detected — list all
      listSkillsForRole('product-manager', 'Product Manager', localPolicy);
      listSkillsForRole('product-designer', 'Product Designer', localPolicy);
    }
  } else if (fs.existsSync(globalPolicy)) {
    console.log('');
    console.log(chalk.dim('  (Reading from global ~/.claude/skills/)'));
    const subdirs = fs.readdirSync(globalPolicy, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => e.name)
      .sort();
    for (const sub of subdirs) {
      const skills = fs.readdirSync(path.join(globalPolicy, sub), { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => e.name)
        .sort();
      if (skills.length === 0) continue;
      console.log('');
      console.log(chalk.bold(`  ${sub} (${skills.length})`));
      for (const skill of skills) {
        console.log(`  ${chalk.cyan(skill)}`);
      }
    }
  } else {
    console.log('');
    console.log(chalk.yellow('  No skills found.'));
    console.log(chalk.dim('  Run claude-pm init to set up.'));
  }

  console.log('');
  console.log(chalk.dim('─'.repeat(40)));
  console.log(chalk.dim('  Commands are in ~/.claude/commands/'));
  console.log('');
}
