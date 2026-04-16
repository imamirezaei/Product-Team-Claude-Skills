# Rule: Working Language

All policy files (rules, skills, commands, output-styles) are written in English.
At runtime, all skill and command outputs must be delivered in the user's chosen working language,
read from the `working-language` field in `CLAUDE.md`.

## Where the working language is set

The interview asks the user to choose their working language once. The answer is saved to `CLAUDE.md`:

```
working-language: persian   # or: english
```

Skills and commands read this field at the start of every response. If the field is missing, ask once — do not guess.

## Runtime output rules

**When `working-language: persian`**
- All prose, explanations, labels, and UI copy in outputs are in Persian
- Wireframe HTML labels (buttons, placeholders, headings) are in Persian
- Technical terms are kept in English — do not translate them
- Mixed-language output is correct: «این feature به ماژول Payment وابسته است و باید با تیم engineering هماهنگ شود.»

**When `working-language: english`**
- All output is in English

## What always stays in English regardless of working language

- Module names, API names, field names, error codes
- Code snippets and file paths
- Tool and product names (Linear, Figma, Vuetify, etc.)
- Architectural pattern names (DDD, CQRS, REST, etc.)
- Industry-standard terms the team uses in English
- Quoted content from English sources

## What is never translated

Technical jargon that has no accurate Persian equivalent. When in doubt, keep the English term and add a short Persian explanation on first use.

## File language vs. runtime language

| Artifact | Language |
|---|---|
| Policy files (rules, skills, commands, output-styles) | English — always |
| Interview files | English — always |
| Generated files (CLAUDE.md, context.md) | English — always |
| Skill and command **outputs** | User's chosen working language |
| Wireframe HTML labels | User's chosen working language |
