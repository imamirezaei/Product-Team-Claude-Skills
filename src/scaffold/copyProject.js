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
      // Never overwrite files that have been filled in (non-placeholder)
      if (fs.existsSync(destPath) && !isPlaceholder(destPath)) {
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const ROLE_CONFIG = {
  pm: {
    templateDir: 'pm-template',
    skillsDir: 'product-manager',
    outputStyleSrc: path.join('policy', 'product-manager', 'output-styles', 'pm-standard.md'),
    outputStyleDest: path.join('.claude', 'output-styles', 'pm-standard.md'),
    agentSrc: path.join('.claude', 'agents', 'product-agent.md'),
    agentDest: path.join('.claude', 'agents', 'product-agent.md'),
  },
  designer: {
    templateDir: 'designer-template',
    skillsDir: 'product-designer',
    outputStyleSrc: path.join('policy', 'product-designer', 'output-styles', 'design-standard.md'),
    outputStyleDest: path.join('.claude', 'output-styles', 'design-standard.md'),
    agentSrc: path.join('.claude', 'agents', 'design-agent.md'),
    agentDest: path.join('.claude', 'agents', 'design-agent.md'),
  },
};

// Scaffolds project-level files into the user's product repo (cwd).
// Writes to: claude-workflow/policy/, claude-workflow/interview/,
// CLAUDE.md, .claude/settings.json, .claude/output-styles/,
// .claude/agents/, .claude/skills/<role>/*/context.md,
// and claude-workflow/.claude-pm-version.
// Returns array of installed paths for display.
export function copyProject(cwd, packageVersion, role = 'pm') {
  const installed = [];
  const cfg = ROLE_CONFIG[role] ?? ROLE_CONFIG.pm;
  const templateDir = path.join(PACKAGE_ROOT, cfg.templateDir);

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
  installed.push('claude-workflow/.claude-pm-version');

  // 4. CLAUDE.md placeholder (skip if already generated)
  const claudeMdDest = path.join(cwd, 'CLAUDE.md');
  const claudeMdSrc = path.join(templateDir, 'CLAUDE.md');
  if (isPlaceholder(claudeMdDest)) {
    fs.copyFileSync(claudeMdSrc, claudeMdDest);
    installed.push('CLAUDE.md');
  }

  // 5. .claude/settings.json (only write if not present — preserve user's settings)
  const settingsDest = path.join(cwd, '.claude', 'settings.json');
  const settingsSrc = path.join(templateDir, '.claude', 'settings.json');
  if (!fs.existsSync(settingsDest)) {
    fs.mkdirSync(path.dirname(settingsDest), { recursive: true });
    fs.copyFileSync(settingsSrc, settingsDest);
    installed.push('.claude/settings.json');
  }

  // 6. Output style (always keep up to date)
  const outputStyleSrc = path.join(PACKAGE_ROOT, cfg.outputStyleSrc);
  const outputStyleDest = path.join(cwd, cfg.outputStyleDest);
  if (fs.existsSync(outputStyleSrc)) {
    fs.mkdirSync(path.dirname(outputStyleDest), { recursive: true });
    fs.copyFileSync(outputStyleSrc, outputStyleDest);
    installed.push(cfg.outputStyleDest);
  }

  // 7. Agent placeholder
  const agentSrc = path.join(templateDir, cfg.agentSrc);
  const agentDest = path.join(cwd, cfg.agentDest);
  if (fs.existsSync(agentSrc)) {
    fs.mkdirSync(path.dirname(agentDest), { recursive: true });
    if (isPlaceholder(agentDest)) {
      fs.copyFileSync(agentSrc, agentDest);
      installed.push(cfg.agentDest);
    }
  }

  // 8. Skill context.md placeholders (role-specific)
  const skillsSrc = path.join(templateDir, '.claude', 'skills', cfg.skillsDir);
  const skillsDest = path.join(cwd, '.claude', 'skills', cfg.skillsDir);
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
    installed.push(`.claude/skills/${cfg.skillsDir}/ (${skillDirs.length} skills)`);
  }

  // 9. For designer: also copy the extra handoff-agent placeholder
  if (role === 'designer') {
    const handoffAgentSrc = path.join(templateDir, '.claude', 'agents', 'handoff-agent.md');
    const handoffAgentDest = path.join(cwd, '.claude', 'agents', 'handoff-agent.md');
    if (fs.existsSync(handoffAgentSrc)) {
      fs.mkdirSync(path.dirname(handoffAgentDest), { recursive: true });
      if (isPlaceholder(handoffAgentDest)) {
        fs.copyFileSync(handoffAgentSrc, handoffAgentDest);
        installed.push('.claude/agents/handoff-agent.md');
      }
    }
  }

  return installed;
}
