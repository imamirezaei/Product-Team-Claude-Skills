import fs from 'fs';
import path from 'path';

/**
 * Returns true if cwd (or any parent up to filesystem root) contains a .git directory.
 */
export function detectGitRepo(cwd = process.cwd()) {
  let dir = cwd;
  while (true) {
    if (fs.existsSync(path.join(dir, '.git'))) return true;
    const parent = path.dirname(dir);
    if (parent === dir) return false;
    dir = parent;
  }
}
