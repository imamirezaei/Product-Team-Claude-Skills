#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const pkg = require(path.join(__dirname, '..', 'package.json'));

const VALID_ROLES = ['pm', 'designer'];
const ROLE_LABELS = {
  pm: 'Product Manager',
  designer: 'Product Designer',
};

async function promptRole() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    console.log('');
    console.log('  What is your role?');
    console.log('  1. Product Manager');
    console.log('  2. Product Designer');
    console.log('');
    rl.question('  Enter 1 or 2: ', (answer) => {
      rl.close();
      const map = { '1': 'pm', '2': 'designer', 'pm': 'pm', 'designer': 'designer' };
      const role = map[answer.trim().toLowerCase()];
      if (!role) {
        console.error('\n  Invalid choice. Please enter 1 or 2.\n');
        process.exit(1);
      }
      resolve(role);
    });
  });
}

const program = new Command();

program
  .name('claude-pm')
  .description('Claude Code setup for product teams (Product Managers and Designers)')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize setup in the current product repo')
  .option('--role <role>', 'Team role: pm or designer (skips the interactive prompt)')
  .option('--force', 'Re-run even if claude-workflow/ already exists')
  .action(async (options) => {
    let role = options.role?.toLowerCase();

    if (role && !VALID_ROLES.includes(role)) {
      console.error(`\n✗ Unknown role: "${options.role}". Use --role pm or --role designer.\n`);
      process.exit(1);
    }

    if (!role) {
      role = await promptRole();
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

program
  .command('doctor')
  .description('Check the health of your Claude setup in this repo')
  .action(async () => {
    const { runDoctor } = await import('../src/commands/doctor.js');
    runDoctor();
  });

program
  .command('list-skills')
  .description('List all installed skills for this repo')
  .action(async () => {
    const { runListSkills } = await import('../src/commands/listSkills.js');
    runListSkills();
  });

program.parse();
