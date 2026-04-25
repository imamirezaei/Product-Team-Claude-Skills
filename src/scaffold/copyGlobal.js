import fs from 'fs';
import path from 'path';
import os from 'os';
import { PACKAGE_ROOT } from '../utils/packageRoot.js';

const GLOBAL_CLAUDE_DIR = path.join(os.homedir(), '.claude');

/**
 * Recursively copies src directory into dest, creating dirs as needed.
 * Never overwrites files listed in protectedRelPaths.
 */
function copyDirRecursive(src, dest, { protectedRelPaths = [], baseForRelative = dest } = {}) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, { protectedRelPaths, baseForRelative });
    } else {
      const relPath = path.relative(baseForRelative, destPath);
      if (protectedRelPaths.includes(relPath)) continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Copies skills from a policy subdirectory into ~/.claude/skills/<subdir>.
 * Skips the directory silently if it does not exist.
 */
function copySkillsFrom(policySub, destSubdir) {
  const src = path.join(PACKAGE_ROOT, 'policy', policySub, 'skills');
  if (!fs.existsSync(src)) return;
  const dest = path.join(GLOBAL_CLAUDE_DIR, 'skills', destSubdir);
  copyDirRecursive(src, dest);
}

/**
 * Copies commands from a policy subdirectory into ~/.claude/commands/<subdir>.
 * Skips the directory silently if it does not exist.
 */
function copyCommandsFrom(policySub, destSubdir) {
  const src = path.join(PACKAGE_ROOT, 'policy', policySub, 'commands');
  if (!fs.existsSync(src)) return;
  const dest = path.join(GLOBAL_CLAUDE_DIR, 'commands', destSubdir);
  copyDirRecursive(src, dest);
}

function removeIfExists(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

/**
 * Installs role-specific Claude Code files to ~/.claude/.
 * Only installs files for the given role; removes the other role's files.
 *
 * Returns array of installed paths for display.
 */
export function copyGlobal(role = 'pm') {
  const installed = [];
  const commandsDir = path.join(GLOBAL_CLAUDE_DIR, 'commands');
  fs.mkdirSync(commandsDir, { recursive: true });

  // ── Shared skills (always) ─────────────────────────────────────────────────
  copySkillsFrom('shared', 'shared');

  // ── Role-specific skills ───────────────────────────────────────────────────
  if (role === 'pm') {
    copySkillsFrom('product-manager', 'product-manager');
    removeIfExists(path.join(GLOBAL_CLAUDE_DIR, 'skills', 'product-designer'));
  } else {
    copySkillsFrom('product-designer', 'product-designer');
    removeIfExists(path.join(GLOBAL_CLAUDE_DIR, 'skills', 'product-manager'));
  }
  installed.push('~/.claude/skills/');

  // ── Role-specific commands ─────────────────────────────────────────────────
  if (role === 'pm') {
    copyCommandsFrom('product-manager', 'product-manager');
    removeIfExists(path.join(GLOBAL_CLAUDE_DIR, 'commands', 'product-designer'));
  } else {
    copyCommandsFrom('product-designer', 'product-designer');
    removeIfExists(path.join(GLOBAL_CLAUDE_DIR, 'commands', 'product-manager'));
  }
  installed.push('~/.claude/commands/');

  // ── Output styles ──────────────────────────────────────────────────────────
  const stylesSrc = path.join(PACKAGE_ROOT, 'policy');
  const stylesDest = path.join(GLOBAL_CLAUDE_DIR, 'output-styles');
  fs.mkdirSync(stylesDest, { recursive: true });

  if (role === 'pm') {
    const pmStyle = path.join(stylesSrc, 'product-manager', 'output-styles', 'product-manager-standard.md');
    if (fs.existsSync(pmStyle)) {
      fs.copyFileSync(pmStyle, path.join(stylesDest, 'product-manager-standard.md'));
    }
    removeIfExists(path.join(stylesDest, 'design-standard.md'));
  } else {
    const designStyle = path.join(stylesSrc, 'product-designer', 'output-styles', 'design-standard.md');
    if (fs.existsSync(designStyle)) {
      fs.copyFileSync(designStyle, path.join(stylesDest, 'design-standard.md'));
    }
    removeIfExists(path.join(stylesDest, 'product-manager-standard.md'));
  }
  installed.push('~/.claude/output-styles/');

  // ── Clean up old command names ─────────────────────────────────────────────
  removeIfExists(path.join(commandsDir, 'start-interview.md'));
  removeIfExists(path.join(commandsDir, 'start-designer-interview.md'));

  // ── /start-pm-interview ────────────────────────────────────────────────────
  if (role === 'pm') {
    const content = `---
description: Start the PM onboarding interview
---

Read the file at \`./claude-workflow/interview/product-manager-interview.md\` and immediately follow the instructions in that file. Start with Step 0.
`;
    fs.writeFileSync(path.join(commandsDir, 'start-pm-interview.md'), content, 'utf8');
    removeIfExists(path.join(commandsDir, 'start-pd-interview.md'));
    installed.push('~/.claude/commands/start-pm-interview.md');

  // ── /start-pd-interview ────────────────────────────────────────────────────
  } else {
    const content = `---
description: Start Product Designer onboarding — connects Figma MCP, reads the Figma file, and generates all 11 context files
---

Read the file at \`./claude-workflow/interview/designer-interview.md\` and immediately start the onboarding flow.

Follow the steps exactly as written:
1. Check Figma MCP access via whoami
2. Ask two quick questions (language + repository status)
3. Ask for Figma file link(s)
4. Read the Figma file using MCP tools
5. Generate all 11 output files

Generate every output file in English only, regardless of the selected working language.
After generating all 11 files, write each file directly to its specified path using your Write/Edit tools. Ask the designer for approval before writing.
`;
    fs.writeFileSync(path.join(commandsDir, 'start-pd-interview.md'), content, 'utf8');
    removeIfExists(path.join(commandsDir, 'start-pm-interview.md'));
    installed.push('~/.claude/commands/start-pd-interview.md');
  }

  return installed;
}
