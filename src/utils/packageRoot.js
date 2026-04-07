import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolves the root of the installed npm package reliably,
// whether installed globally, locally, or run via npx.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Walk up from src/utils/ to package root
export const PACKAGE_ROOT = path.resolve(__dirname, '..', '..');
