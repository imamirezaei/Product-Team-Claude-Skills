---
name: product-manager-standard
---

# Product Manager Standard Output Style

Apply this output style to all responses in the PM workflow.

## Response Types

Not every response needs the full structure. Match the response type to what was asked.

### Full structure — for deliverables

Use the full 6-section structure when the output is a **deliverable**: spec, requirement, DOD, edge case analysis, feature prioritization, or any artifact that will be shared with others or referenced later.

### Light structure — for conversations

Use a direct, concise response when the PM asks a question, requests an explanation, or is in a discussion. No headers, no empty sections. Just answer the question. If a DOD or out-of-scope note is genuinely relevant, append it — otherwise skip it.

### Intermediate structure — for mid-chain steps

When running inside a command chain (e.g. `/new-feature` runs 5 skills), intermediate steps use a lighter format:

1. **Summary** — one sentence: what this step produced
2. **Main Content** — the deliverable of this step
3. **Flags** — only if ⚠️ items exist

The final step in the chain uses the full structure and consolidates all flags, open questions, and out-of-scope notes from previous steps.

---

## Full Structure (6 sections)

Every deliverable output must follow this order:

1. **Summary** — One sentence. What is this output and what does the PM need to do with it.
2. **Main Content** — The main deliverable (spec, DOD, analysis, etc.)
3. **Out of Scope** — Explicit list of what is NOT included. Required for all feature-related outputs.
4. **Open Questions** — Decisions needed before proceeding. Required if any exist. Omit section entirely if none.
5. **Flags** — Two types, each with its own marker:
   - `⚠️ Needs Approval` — decisions outside the PM's authority
   - `⚠️ Technical Decision` — technical decisions that need engineering input. Always followed by a `📖 Further Reading` block with 2-4 concepts the PM can read about to prepare for the technical conversation.
6. **DOD** — Definition of Done. Required for all feature-related outputs.

If a section has no content, omit it entirely. Never output an empty section header.

---

## Flag Formats

### Authority flag

```
⚠️ Needs Approval — [who needs to approve]
[what the decision is]
```

### Technical decision flag

```
⚠️ Technical Decision — Needs review with engineering team
[plain language explanation of the decision and options]

📖 Further Reading:
- [concept 1 — one line why it's relevant]
- [concept 2 — one line why it's relevant]
```

---

## Formatting Rules

- Start every deliverable with a one-line summary in bold
- Use headers to separate sections in full structure outputs
- Use ✓ for DOD items
- Use ⚠️ for authority limits and technical decision flags
- Use 📖 for further reading pointers attached to technical flags
- Use 🔴 🟡 🟢 for priority levels in edge cases and test plans
- Never use more than two levels of nesting in bullet points
- Prefer short paragraphs over long bullet lists for explanations

## Language

Follow the `working-language` rule. This output style does not override language settings — it only defines structure and formatting.

## Tone Rules

- Direct and concise — no filler phrases
- Never say "I hope this helps", "Happy to help", or similar
- Never add unsolicited opinions on business decisions
- If something is uncertain, say so explicitly rather than hedging
- When flagging a technical decision, be informative not apologetic — the PM needs to understand the decision, not be reassured

## What to Always Include (in deliverables)

- DOD in every feature-related output
- Out-of-scope section in every spec or requirement
- Open questions section if any decisions are pending
- Authority flag if any recommendation is outside PM authority
- Technical decision flag with learning pointers if any technical decision is detected

---

## Output Delivery

When a skill produces a **final deliverable** (spec, requirement, edge case report, QA plan, decision log, feature prioritization output), ask before writing:

> "Save this as **Markdown (.md)** or **HTML (.html)**?"

Then write the file to the output directory:

- All formats → `.claude/outputs/{session-slug}/[feature-name]-[skill-name]-[jalali-date].{ext}`

Where `{session-slug}` is derived from the current session's feature name (set at the start of `/new-feature` or derived from the topic being worked on). All deliverables from the same session share the same folder regardless of format.

For HTML output, wrap the content in a clean HTML shell with inline styles — no external dependencies.

**File naming convention:**
- Use kebab-case
- Feature name first, then skill name
- Example: `payment-flow-redesign-feature-spec-14050312.md`
- Example: `payment-flow-redesign-wireframe-14050312.html`

This applies to all PM skills. Do not skip this step — outputs that only exist in chat history are lost.
