import fs from 'fs';
import path from 'path';

const ENTRIES = [
  'CLAUDE.local.md',
  '.claude/settings.local.json',
];

const MARKER_START = '# claude-team';
const MARKER_END = '# end claude-team';

/**
 * Idempotently adds asam-pm private file entries to .gitignore.
 * Wraps additions in marker comments so re-running is safe.
 */
export function patchGitignore(cwd) {
  const gitignorePath = path.join(cwd, '.gitignore');

  let existing = '';
  if (fs.existsSync(gitignorePath)) {
    existing = fs.readFileSync(gitignorePath, 'utf8');
  }

  // Already patched
  if (existing.includes(MARKER_START)) return false;

  const block = [
    '',
    MARKER_START,
    ...ENTRIES,
    MARKER_END,
    '',
  ].join('\n');

  fs.writeFileSync(gitignorePath, existing + block, 'utf8');
  return true;
}
