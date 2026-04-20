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

/**
 * Installs global Claude Code files to ~/.claude/:
 *   - skills/shared/, skills/product-manager/, skills/product-designer/
 *   - commands/product-manager/, commands/product-designer/
 *   - output-styles/product-manager-standard.md, output-styles/design-standard.md
 *   - commands/start-interview.md, commands/start-designer-interview.md
 *
 * Returns array of installed paths for display.
 */
export function copyGlobal() {
  const installed = [];

  // ── Skills ─────────────────────────────────────────────────────────────────
  copySkillsFrom('shared', 'shared');
  copySkillsFrom('product-manager', 'product-manager');
  copySkillsFrom('product-designer', 'product-designer');
  installed.push('~/.claude/skills/');

  // ── Commands ───────────────────────────────────────────────────────────────
  copyCommandsFrom('product-manager', 'product-manager');
  copyCommandsFrom('product-designer', 'product-designer');
  installed.push('~/.claude/commands/');

  // ── Output styles ──────────────────────────────────────────────────────────
  const stylesSrc = path.join(PACKAGE_ROOT, 'policy');
  const stylesDest = path.join(GLOBAL_CLAUDE_DIR, 'output-styles');
  fs.mkdirSync(stylesDest, { recursive: true });

  const pmStyle = path.join(stylesSrc, 'product-manager', 'output-styles', 'product-manager-standard.md');
  if (fs.existsSync(pmStyle)) {
    fs.copyFileSync(pmStyle, path.join(stylesDest, 'product-manager-standard.md'));
  }

  const designStyle = path.join(stylesSrc, 'product-designer', 'output-styles', 'design-standard.md');
  if (fs.existsSync(designStyle)) {
    fs.copyFileSync(designStyle, path.join(stylesDest, 'design-standard.md'));
  }
  installed.push('~/.claude/output-styles/');

  // ── /start-interview (PM) ──────────────────────────────────────────────────
  const startInterviewContent = `---
description: Start the PM onboarding interview
---

Read the file at \`./claude-workflow/interview/product-manager-interview.md\` and immediately start the interview.

Your first question must ask which language the PM wants: Persian or English.
Use the selected language for all interview questions and PM-facing guidance during the interview.
Generate every output file in English only, regardless of the interview language.

After completing all 14 output files, write each file directly to its specified path using your Write/Edit tools. Ask the PM for approval before writing each file.
`;
  const startInterviewPath = path.join(GLOBAL_CLAUDE_DIR, 'commands', 'start-interview.md');
  fs.mkdirSync(path.dirname(startInterviewPath), { recursive: true });
  fs.writeFileSync(startInterviewPath, startInterviewContent, 'utf8');
  installed.push('~/.claude/commands/start-interview.md');

  // ── /start-designer-interview ─────────────────────────────────────────────
  const startDesignerInterviewContent = `---
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
  const startDesignerInterviewPath = path.join(GLOBAL_CLAUDE_DIR, 'commands', 'start-designer-interview.md');
  fs.writeFileSync(startDesignerInterviewPath, startDesignerInterviewContent, 'utf8');
  installed.push('~/.claude/commands/start-designer-interview.md');

  return installed;
}
