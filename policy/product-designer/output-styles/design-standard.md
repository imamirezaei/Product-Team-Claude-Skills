# Output Style: Design Standard

This document defines how Claude structures and formats all outputs when working with a Product Designer.

Read the `working-language` field from `CLAUDE.md` and deliver all prose, labels, and explanations in that language. Technical terms, component names, prop names, and code stay in English.

---

## Response types

### Full response
Used when the designer needs a complete deliverable: design review, constraint check, handoff doc, QA report.

Structure:
1. **Summary** — one paragraph: what was reviewed and the overall verdict
2. **Findings** — organized by section or component, using the flag format below
3. **Required actions** — items that must be resolved before handoff (numbered, clear owner)
4. **Optional improvements** — items that would improve quality but are not blockers

### Light response
Used for quick questions, clarifications, or single-component checks.

One to three paragraphs. No section headers unless the answer has distinct parts.

### Intermediate response (in skill chains)
Used when a skill runs as part of a `/design-review` or `/design-handoff` chain.

End each intermediate step with:
```
Step [N] complete. Proceeding to [next step name].
[One sentence: what was found or confirmed]
```

Do not write a full summary for intermediate steps — that is the final step's job.

---

## Flag format

Use these flags consistently in all design outputs:

| Flag | Meaning |
|---|---|
| `🔴 Blocker` | Must be resolved before handoff. Engineering cannot implement without this. |
| `🟡 Important` | Should be resolved in this phase. Will cause friction if deferred. |
| `🟢 Suggestion` | Optional improvement. Designer's discretion. |
| `⚠️ Policy conflict` | Design deviates from `design-policy.md`. Requires decision. |
| `⚠️ Vuetify gap` | No Vuetify component covers this. Requires design system review. |
| `⚠️ Authority` | This decision is outside the designer's authority. Requires sign-off. |
| `✓ Confirmed` | Checked and compliant. No action needed. |

---

## Vuetify component references

When referencing a Vuetify component in output, always include:
- Component name: `v-[name]`
- Key props relevant to this use case
- Link to documentation is optional but recommended for non-standard usage

Example:
```
Use v-data-table with :items-per-page="10" and density="compact".
For the status column, use v-chip with :color based on the status value.
```

---

## Design decision documentation

When a design decision is made during a skill run, document it inline:

```
Decision: [short title]
Chose: [what was chosen]
Reason: [one sentence]
Trade-off: [what was given up or deferred]
```

This is not a full decision log — it is an in-context note. For permanent documentation, prompt the designer to run `/log-decision`.

---

## State coverage summary

Every design review output must include a state coverage table:

| State | Status |
|---|---|
| Happy path | ✓ Covered / ⚠️ Missing |
| Empty state | ✓ Covered / ⚠️ Missing |
| Loading | ✓ Covered / ⚠️ Missing |
| Error (system) | ✓ Covered / ⚠️ Missing |
| Error (user input) | ✓ Covered / ⚠️ Missing |
| [Feature-specific states] | ✓ / ⚠️ |

---

## What Claude never does in design outputs

- Never make a final design decision on behalf of the designer — present options and flag decisions
- Never approve a design that has unresolved blockers — the summary must reflect the true status
- Never skip the state coverage summary in a design review output
- Never suggest adding scope beyond what the PM approved in the wireframe

---

## Output Delivery

When a skill produces a **final deliverable** (design policy report, Vuetify constraint check, QA report, handoff document, implementation review, generated code), ask before writing:

> "Save this as **Markdown (.md)** or **HTML (.html)**?"

Then write the file to the output directory:

- Markdown → `outputs/pd/[feature-name]-[skill-name].md`
- HTML → `outputs/pd/[feature-name]-[skill-name].html`

For HTML output, wrap the content in a clean HTML shell with inline styles — no external dependencies.

**File naming convention:**
- Use kebab-case
- Feature name first, then skill name
- Example: `checkout-redesign-design-handoff.md`

This applies to all designer skills. Do not skip this step — outputs that only exist in chat history are lost.
