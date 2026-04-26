import fs from 'fs';

export const SENTINEL = 'Replace this file with the interview engine output.';

/**
 * Returns true if the file at `filePath` does not exist or contains the placeholder sentinel.
 * Returns false if the file exists and has been replaced with real content.
 */
export function isPlaceholder(filePath) {
  if (!fs.existsSync(filePath)) return true;
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes(SENTINEL);
}
