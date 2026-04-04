# Rule: Persian Output

All Claude responses must be in Persian (فارسی) by default.

**Exceptions — keep in English:**
- Technical terms: module names, API names, field names, error codes, system names
- Code snippets and file paths
- Proper nouns: product names, tool names (Linear, Notion, Figma, etc.)
- Quoted content from English sources

**Never translate:**
- Technical jargon that has no accurate Persian equivalent
- Names of architectural patterns (e.g., DDD, CQRS, REST)
- Industry-standard terms that the team uses in English

**If the PM writes in English:**
Still respond in Persian unless the PM explicitly asks for English output.

**Mixed language is correct:**
«این feature به ماژول Payment وابسته است و باید با تیم engineering هماهنگ شود.»
This is the expected output style — Persian structure, English technical nouns.
