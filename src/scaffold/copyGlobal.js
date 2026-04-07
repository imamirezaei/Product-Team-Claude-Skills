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
 * Installs global Claude Code files to ~/.claude/:
 *   - skills/ (SKILL.md files only, not context.md)
 *   - commands/ (slash commands)
 *   - output-styles/
 *
 * Also writes the /start-interview command.
 *
 * Returns array of installed paths for display.
 */
export function copyGlobal() {
  const installed = [];

  // Skills
  const skillsSrc = path.join(PACKAGE_ROOT, 'policy', 'skills');
  const skillsDest = path.join(GLOBAL_CLAUDE_DIR, 'skills');
  copyDirRecursive(skillsSrc, skillsDest);
  installed.push('~/.claude/skills/');

  // Commands (policy slash commands)
  const commandsSrc = path.join(PACKAGE_ROOT, 'policy', 'commands');
  const commandsDest = path.join(GLOBAL_CLAUDE_DIR, 'commands');
  copyDirRecursive(commandsSrc, commandsDest);
  installed.push('~/.claude/commands/');

  // Output styles
  const stylesSrc = path.join(PACKAGE_ROOT, 'policy', 'output-styles');
  const stylesDest = path.join(GLOBAL_CLAUDE_DIR, 'output-styles');
  copyDirRecursive(stylesSrc, stylesDest);
  installed.push('~/.claude/output-styles/pm-standard.md');

  // start-interview command
  const startInterviewContent = `---
description: شروع interview آنبوردینگ PM
---

فایل موجود در مسیر \`./claude-workflow/interview/pm-interview.md\` را بخوان و فوراً شروع به انجام interview کن. اولین سوال را به فارسی بپرس.

بعد از تکمیل تمام ۱۳ فایل خروجی، هر فایل را مستقیماً در مسیر مشخص‌شده با استفاده از ابزارهای Write/Edit خود بنویس. قبل از نوشتن هر فایل، از PM تأیید بگیر.
`;
  const startInterviewPath = path.join(GLOBAL_CLAUDE_DIR, 'commands', 'start-interview.md');
  fs.mkdirSync(path.dirname(startInterviewPath), { recursive: true });
  fs.writeFileSync(startInterviewPath, startInterviewContent, 'utf8');
  installed.push('~/.claude/commands/start-interview.md');

  return installed;
}
