---
name: telegram-rich-message
description: "Use when a PM has raw Telegram message copy and needs to hand it to engineering as a ready-to-use Rich Message payload. Triggers: 'turn this into a Telegram rich message', 'format this for the bot', 'prepare this notification for Telegram', 'make a rich_message for this copy'. Converts plain copy into a valid InputRichMessage block (markdown or html) the technical team can pass to sendRich without edits."
---

# Telegram Rich Message Builder

Convert raw message copy into a **valid, ready-to-use Telegram `InputRichMessage` payload** that the engineering team can pass directly to the backend `sendRich` method — no manual edits required.

This skill is the product → engineering handoff for Telegram Rich Messages. The PM writes intent and copy; this skill produces the exact structured payload.

## Output language rule

- **Skill instructions and the "notes for engineering" are in English.**
- **The message body keeps the original language of the PM's copy.** If the copy is Persian, the rendered text stays Persian and `is_rtl` defaults to `true`. Never translate the message content.

## Inputs to gather

If not already provided, ask the PM for:

1. **The raw copy** — the text/message they want to send.
2. **Structure intent** (optional) — e.g. "a title, two bullet points, and a quote at the end". If absent, infer a sensible structure from the copy.
3. **Format preference** (optional) — `markdown` (default) or `html`. Default to **markdown** because it is readable; switch to **html** if the copy contains many Markdown-special characters or is assembled from dynamic values where escaping `< > &` is simpler.
4. **Direction** (optional) — default `is_rtl: true` for Persian/Arabic copy; `false` for purely LTR copy.

## What to produce

Always output **exactly one** `InputRichMessage` JSON block. This is the object the backend places in `rich_message`:

```json
{
  "markdown": "<the formatted content>",
  "is_rtl": true
}
```

or, when HTML is chosen:

```json
{
  "html": "<the formatted content>",
  "is_rtl": true
}
```

> **Exactly one** of `markdown` or `html` — never both, never neither. The backend `sendRich` method throws otherwise.

Then add a short **Notes for engineering** block showing the call form:

```js
await telegramSendMessageRepository.sendRich(chatId, { markdown /* or html */: "..." }, { isRtl: true });
```

## Formatting reference — Rich Markdown

Map PM intent to Rich Markdown syntax. **This differs from Telegram's legacy `parse_mode` Markdown** — use the new syntax:

| Intent | Rich Markdown |
|---|---|
| Title / section heading | `# Heading 1` … `###### Heading 6` |
| Bold | `**bold**` (not `*bold*`) |
| Italic | `*italic*` or `_italic_` |
| Strikethrough | `~~strike~~` (not `~strike~`) |
| Spoiler | `\|\|spoiler\|\|` |
| Marked / highlight | `==marked==` |
| Inline code / IDs | `` `code` `` |
| Code block | ```` ```lang … ``` ```` |
| Bulleted list | `- item` |
| Numbered list | `1. item` |
| Task list | `- [ ] todo` / `- [x] done` |
| Blockquote | `> quote` (prefix each line) |
| Link | `[label](https://…)` |
| Divider | `---` |
| Table | `\| H1 \| H2 \|` + `\|:--\|--:\|` rows |

## Formatting reference — Rich HTML (when chosen)

`<b>`, `<i>`, `<u>`, `<s>`, `<code>`, `<mark>`, `<tg-spoiler>`, `<h1>`…`<h6>`, `<p>`, `<pre>`, `<blockquote>`, `<a href="…">`, lists via `<ul>/<ol>/<li>`. Escape `<`, `>`, `&` in literal text as `&lt;`, `&gt;`, `&amp;`.

## Limits to respect (warn the PM if exceeded)

- ≤ **32768** characters total.
- ≤ **500** blocks (each list item, table row, quote line counts).
- ≤ **16** nesting levels.
- ≤ **50** media attachments; ≤ **20** table columns.

If the copy is over a limit, flag it and propose trimming or splitting into multiple messages.

## Media caveat

If the message includes a media block (photo/video/audio), warn: **the bot must have media-send permission in the target chat** (relevant for groups/channels). Media blocks accept only HTTP/HTTPS URLs and must be their own block.

## Constraints

- Output must be a single valid `InputRichMessage` block — directly usable, no placeholders.
- Preserve the original copy's language and meaning; only add structure/formatting.
- Escape correctly for the chosen format so the payload renders as intended.
- Default `is_rtl: true` unless the copy is clearly LTR-only.
- Do not invent links, IDs, or data that the PM did not provide.
- Prefer the simplest formatting that conveys the intent — do not over-decorate.

## Example

**PM raw copy (Persian):**
> گزارش روزانه. وضعیت سرور سالم است. تعداد درخواست‌ها ۱۲۳۴۰. خلاصه: امروز بدون مشکل.

**Output — InputRichMessage:**

```json
{
  "markdown": "# گزارش روزانه\n\n- وضعیت سرور: **سالم**\n- تعداد درخواست‌ها: `12,340`\n\n> خلاصه: امروز بدون مشکل.",
  "is_rtl": true
}
```

**Notes for engineering:**
```js
await telegramSendMessageRepository.sendRich(
  chatId,
  { markdown: "# گزارش روزانه\n\n- وضعیت سرور: **سالم**\n- تعداد درخواست‌ها: `12,340`\n\n> خلاصه: امروز بدون مشکل." },
  { isRtl: true },
);
```
