#!/usr/bin/env node
/**
 * Validates the structure of skills, commands, and templates in this repo.
 *
 * Checks:
 *   1. Every policy/<role>/skills/<name>/SKILL.md has frontmatter with `name` and `description`.
 *   2. Every policy/<role>/commands/*.md has frontmatter with `description`.
 *   3. The placeholder sentinel from src/utils/isPlaceholder.js only appears
 *      inside the role template directories — never elsewhere.
 *   4. Every templateDir referenced by ROLE_CONFIG exists on disk.
 *
 * Exits 0 on success, 1 on any failure. Run via `npm run validate:skills`.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const errors = [];
const warnings = [];
function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// --- Load source-of-truth values from the package itself ----------------------

const isPlaceholderModule = await import(
  pathToFileURL(path.join(ROOT, 'src', 'utils', 'isPlaceholder.js')).href
);
const SENTINEL = isPlaceholderModule.SENTINEL;
if (typeof SENTINEL !== 'string' || SENTINEL.length === 0) {
  err('Could not load SENTINEL string from src/utils/isPlaceholder.js');
}

const copyProjectModule = await import(
  pathToFileURL(path.join(ROOT, 'src', 'scaffold', 'copyProject.js')).href
);
const ROLE_CONFIG = copyProjectModule.ROLE_CONFIG;
if (!ROLE_CONFIG || typeof ROLE_CONFIG !== 'object') {
  err('Could not load ROLE_CONFIG from src/scaffold/copyProject.js');
}

// --- Helpers ------------------------------------------------------------------

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}

function listFiles(dir, predicate) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (predicate(full, entry.name)) out.push(full);
    }
  }
  return out;
}

function relPath(p) {
  return path.relative(ROOT, p) || '.';
}

/**
 * Extract the YAML frontmatter block from a markdown file.
 * Returns the raw frontmatter string, or null if none.
 */
function extractFrontmatter(content) {
  if (!content.startsWith('---')) return null;
  const endIdx = content.indexOf('\n---', 3);
  if (endIdx === -1) return null;
  return content.slice(3, endIdx).trim();
}

/**
 * Crude YAML key detector that tolerates quoted, multi-line, and folded values.
 * It looks for top-level "<key>:" lines (not indented).
 */
function frontmatterHasKey(frontmatter, key) {
  const re = new RegExp(`^${key}\\s*:\\s*\\S`, 'm');
  return re.test(frontmatter);
}

// --- Check 1: Skill frontmatter ----------------------------------------------

function checkSkillFrontmatter() {
  const policyDir = path.join(ROOT, 'policy');
  const skillFiles = listFiles(policyDir, (full, name) => name === 'SKILL.md');
  for (const file of skillFiles) {
    const content = readFile(file);
    const fm = extractFrontmatter(content);
    if (fm === null) {
      err(`${relPath(file)}: missing YAML frontmatter`);
      continue;
    }
    if (!frontmatterHasKey(fm, 'name')) {
      err(`${relPath(file)}: frontmatter missing required key "name"`);
    }
    if (!frontmatterHasKey(fm, 'description')) {
      err(`${relPath(file)}: frontmatter missing required key "description"`);
    }
  }
  if (skillFiles.length === 0) warn('No SKILL.md files found under policy/');
}

// --- Check 2: Command frontmatter --------------------------------------------

function checkCommandFrontmatter() {
  const policyDir = path.join(ROOT, 'policy');
  const commandFiles = listFiles(policyDir, (full, name) => {
    return name.endsWith('.md') && full.includes(`${path.sep}commands${path.sep}`);
  });
  for (const file of commandFiles) {
    const content = readFile(file);
    const fm = extractFrontmatter(content);
    if (fm === null) {
      err(`${relPath(file)}: missing YAML frontmatter`);
      continue;
    }
    if (!frontmatterHasKey(fm, 'description')) {
      err(`${relPath(file)}: frontmatter missing required key "description"`);
    }
  }
  if (commandFiles.length === 0) warn('No command files found under policy/<role>/commands/');
}

// --- Check 3: Placeholder sentinel containment -------------------------------

function checkSentinelContainment() {
  if (!SENTINEL) return;
  const allowedTemplateDirs = Object.values(ROLE_CONFIG ?? {})
    .map(c => c.templateDir)
    .filter(Boolean);

  const allowedRoots = new Set(allowedTemplateDirs.map(d => path.join(ROOT, d)));

  // Files that legitimately reference the sentinel (define it, use it in code,
  // or document it). These are NOT placeholders — they describe the placeholder
  // mechanism itself.
  const allowedFiles = new Set([
    path.join(ROOT, 'src', 'utils', 'isPlaceholder.js'),
    path.join(ROOT, 'src', 'commands', 'doctor.js'),
    path.join(ROOT, 'CLAUDE.md'),
    path.join(ROOT, 'interview', 'product-manager-interview.md'),
    path.join(ROOT, 'interview', 'designer-interview.md'),
  ]);

  // Directories we never scan
  const skipDirs = new Set([
    path.join(ROOT, 'node_modules'),
    path.join(ROOT, '.git'),
  ]);

  const stack = [ROOT];
  while (stack.length) {
    const cur = stack.pop();
    if (skipDirs.has(cur)) continue;
    let entries;
    try { entries = fs.readdirSync(cur, { withFileTypes: true }); }
    catch { continue; }
    for (const entry of entries) {
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      // Skip anything inside an allowed template root.
      if ([...allowedRoots].some(r => full === r || full.startsWith(r + path.sep))) {
        continue;
      }
      // Skip self (this script intentionally references the sentinel by importing it).
      if (full === __filename) continue;
      // Skip files that legitimately reference the sentinel for documentation/code reasons.
      if (allowedFiles.has(full)) continue;
      // Only scan likely-text files to keep things fast and safe.
      const ext = path.extname(entry.name).toLowerCase();
      if (!['.md', '.txt', '.json', '.yml', '.yaml', '.js', '.mjs', '.cjs'].includes(ext)) {
        continue;
      }
      let content;
      try { content = readFile(full); }
      catch { continue; }
      if (content.includes(SENTINEL)) {
        err(
          `${relPath(full)}: contains placeholder sentinel outside of an allowed template directory ` +
          `(allowed: ${allowedTemplateDirs.join(', ')})`
        );
      }
    }
  }
}

// --- Check 4: ROLE_CONFIG points at real template directories ----------------

function checkRoleConfig() {
  if (!ROLE_CONFIG) return;
  for (const [role, cfg] of Object.entries(ROLE_CONFIG)) {
    const dir = path.join(ROOT, cfg.templateDir);
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
      err(
        `ROLE_CONFIG.${role}.templateDir points at "${cfg.templateDir}" ` +
        `which does not exist as a directory at the repo root`
      );
    }
    const policySkillsDir = path.join(ROOT, 'policy', cfg.skillsDir);
    if (cfg.skillsDir && !fs.existsSync(policySkillsDir)) {
      err(
        `ROLE_CONFIG.${role}.skillsDir = "${cfg.skillsDir}" but policy/${cfg.skillsDir}/ does not exist`
      );
    }
  }
}

// --- Run ---------------------------------------------------------------------

checkSkillFrontmatter();
checkCommandFrontmatter();
checkSentinelContainment();
checkRoleConfig();

if (warnings.length) {
  console.warn(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.warn(`  - ${w}`);
}

if (errors.length) {
  console.error(`\nvalidate-skills FAILED with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('validate-skills: OK');
