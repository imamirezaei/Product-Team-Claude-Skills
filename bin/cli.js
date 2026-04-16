#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const pkg = require(path.join(__dirname, '..', 'package.json'));

const program = new Command();

program
  .name('claude-pm')
  .description('Claude Code setup for product teams (PMs and Designers)')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize setup in the current product repo')
  .option('--role <role>', 'Team role: pm or designer (default: pm)', 'pm')
  .option('--force', 'Re-run even if claude-workflow/ already exists')
  .action(async (options) => {
    const role = options.role.toLowerCase();
    if (role !== 'pm' && role !== 'designer') {
      console.error(`\n✗ Unknown role: "${options.role}". Use --role pm or --role designer.\n`);
      process.exit(1);
    }
    const { runInit } = await import('../src/commands/init.js');
    await runInit({ force: options.force, role });
  });

program
  .command('update')
  .description('Update the policy layer (rules, skills, commands) without touching personal files')
  .action(async () => {
    const { runUpdate } = await import('../src/commands/update.js');
    runUpdate();
  });

program.parse();
