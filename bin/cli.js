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
  .description('Claude Code setup for product managers')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize PM setup in the current product repo')
  .option('--force', 'Re-run even if claude-workflow/ already exists')
  .action(async (options) => {
    const { runInit } = await import('../src/commands/init.js');
    await runInit({ force: options.force });
  });

program
  .command('update')
  .description('Update the policy layer (rules, skills, commands) without touching personal files')
  .action(async () => {
    const { runUpdate } = await import('../src/commands/update.js');
    runUpdate();
  });

program.parse();
