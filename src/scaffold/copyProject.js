import fs from 'fs';
import path from 'path';
import { PACKAGE_ROOT } from '../utils/packageRoot.js';
import { isPlaceholder } from '../utils/isPlaceholder.js';

/**
 * Recursively copies src into dest.
 * Skips destination files that already have real (non-placeholder) content.
 */
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      // Never overwrite files that have been filled in by the PM (non-placeholder)
      if (fs.existsSync(destPath) && !isPlaceholder(destPath)) {
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Scaffolds project-level files into the PM's product repo (cwd).
// Writes to: claude-workflow/policy/, claude-workflow/interview/,
// CLAUDE.md, .claude/settings.json, .claude/output-styles/pm-standard.md,
// .claude/agents/product-agent.md, .claude/skills/product/*/context.md,
// and claude-workflow/.asam-pm-version.
// Returns array of installed paths for display.
export function copyProject(cwd, packageVersion) {
  const installed = [];

  // 1. Policy layer → ./claude-workflow/policy/
  const policySrc = path.join(PACKAGE_ROOT, 'policy');
  const policyDest = path.join(cwd, 'claude-workflow', 'policy');
  copyDirRecursive(policySrc, policyDest);
  installed.push('claude-workflow/policy/');

  // 2. Interview → ./claude-workflow/interview/
  const interviewSrc = path.join(PACKAGE_ROOT, 'interview');
  const interviewDest = path.join(cwd, 'claude-workflow', 'interview');
  copyDirRecursive(interviewSrc, interviewDest);
  installed.push('claude-workflow/interview/');

  // 3. Version file
  const versionFile = path.join(cwd, 'claude-workflow', '.claude-pm-version');
  fs.writeFileSync(versionFile, packageVersion, 'utf8');
  installed.push('claude-workflow/.asam-pm-version');

  // 4. CLAUDE.md placeholder (skip if already generated)
  const claudeMdDest = path.join(cwd, 'CLAUDE.md');
  const claudeMdSrc = path.join(PACKAGE_ROOT, 'pm-template', 'CLAUDE.md');
  if (isPlaceholder(claudeMdDest)) {
    fs.copyFileSync(claudeMdSrc, claudeMdDest);
    installed.push('CLAUDE.md');
  }

  // 5. .claude/settings.json (only write if not present — preserve PM's settings)
  const settingsDest = path.join(cwd, '.claude', 'settings.json');
  const settingsSrc = path.join(PACKAGE_ROOT, 'pm-template', '.claude', 'settings.json');
  if (!fs.existsSync(settingsDest)) {
    fs.mkdirSync(path.dirname(settingsDest), { recursive: true });
    fs.copyFileSync(settingsSrc, settingsDest);
    installed.push('.claude/settings.json');
  }

  // 6. .claude/output-styles/pm-standard.md (always keep up to date)
  const pmStandardSrc = path.join(PACKAGE_ROOT, 'policy', 'output-styles', 'pm-standard.md');
  const pmStandardDest = path.join(cwd, '.claude', 'output-styles', 'pm-standard.md');
  fs.mkdirSync(path.dirname(pmStandardDest), { recursive: true });
  fs.copyFileSync(pmStandardSrc, pmStandardDest);
  installed.push('.claude/output-styles/pm-standard.md');

  // 7. .claude/agents/product-agent.md placeholder
  const agentSrc = path.join(PACKAGE_ROOT, 'pm-template', '.claude', 'agents', 'product-agent.md');
  const agentDest = path.join(cwd, '.claude', 'agents', 'product-agent.md');
  fs.mkdirSync(path.dirname(agentDest), { recursive: true });
  if (isPlaceholder(agentDest)) {
    fs.copyFileSync(agentSrc, agentDest);
    installed.push('.claude/agents/product-agent.md');
  }

  // 8. .claude/skills/product/*/context.md placeholders
  const skillsSrc = path.join(PACKAGE_ROOT, 'pm-template', '.claude', 'skills', 'product');
  const skillsDest = path.join(cwd, '.claude', 'skills', 'product');
  if (fs.existsSync(skillsSrc)) {
    const skillDirs = fs.readdirSync(skillsSrc, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => e.name);
    for (const skill of skillDirs) {
      const ctxSrc = path.join(skillsSrc, skill, 'context.md');
      const ctxDest = path.join(skillsDest, skill, 'context.md');
      fs.mkdirSync(path.dirname(ctxDest), { recursive: true });
      if (isPlaceholder(ctxDest)) {
        fs.copyFileSync(ctxSrc, ctxDest);
      }
    }
    installed.push(`.claude/skills/product/ (${skillDirs.length} skills)`);
  }

  return installed;
}
