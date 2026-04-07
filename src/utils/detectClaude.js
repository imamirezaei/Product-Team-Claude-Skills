import { execSync } from 'child_process';

/**
 * Returns the claude CLI version string if found in PATH, or null if not.
 */
export function detectClaude() {
  try {
    const version = execSync('claude --version', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
    return version || 'unknown';
  } catch {
    return null;
  }
}
