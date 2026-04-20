import { spawnSync } from 'child_process';
import chalk from 'chalk';

/**
 * Checks all prerequisites before running init.
 * Prints a clear error and exits if any check fails.
 */
export function checkPrereqs() {
  const failures = [];

  // Node.js version >= 18
  const [major] = process.versions.node.split('.').map(Number);
  if (major < 18) {
    failures.push({
      label: 'Node.js version',
      detail: `Found v${process.versions.node}, need >=18.0.0`,
      fix: 'https://nodejs.org',
    });
  }

  // Claude Code installed
  const claudeCheck = spawnSync('claude', ['--version'], { encoding: 'utf8' });
  if (claudeCheck.error || claudeCheck.status !== 0) {
    failures.push({
      label: 'Claude Code',
      detail: '"claude" command not found in PATH',
      fix: 'npm install -g @anthropic-ai/claude-code',
    });
  }

  if (failures.length === 0) return;

  console.error('');
  console.error(chalk.red('✗ Prerequisites not met:'));
  console.error('');
  for (const { label, detail, fix } of failures) {
    console.error(chalk.bold(`  ${label}`));
    console.error(chalk.dim(`    ${detail}`));
    console.error(chalk.cyan(`    Fix: ${fix}`));
    console.error('');
  }
  process.exit(1);
}
