---
name: presentation-style
description: Generate HTML slide-deck presentations with a specific, polished design system. Use this skill whenever the user asks to create a presentation, slide deck, pitch deck, or any multi-slide HTML document. Trigger on phrases like "پرزنتیشن بساز", "presentation", "slide deck", "pitch deck", "اسلاید", "دک", "ارائه بساز", "make a presentation", "create slides", "make me a deck". Also trigger when the user references this design style explicitly, says "with the same presentation style", or asks for "an HTML presentation". Even if the user just says "I need to present X" or "prepare slides for X", use this skill. Do NOT use for PowerPoint (.pptx) files — this skill produces single-file HTML presentations only.
---

# Presentation Style Skill

Generate polished, single-file HTML slide-deck presentations following a precise design system.

## Before You Start

**Read the design system reference first:**
Open and read `references/design-system.md` (in the same directory as this SKILL.md) before writing any HTML. It contains the complete color palette, typography scale, component library, and composition patterns. Do not rely on memory — re-read it every time.

## Output Format

- Single `.html` file
- Self-contained (all CSS in `<style>` within `<head>`, no external dependencies)
- Each slide is a `<div class="slide">` with `min-height: 100vh`
- Slides are stacked vertically (scroll-based, not paginated)
- Save to `/mnt/user-data/outputs/` and present via `present_files`

## Slide Deck Structure

Every presentation follows this structure:

### Slide 1 — Title Slide

- Dark blue background (`--blue-900`), all text white
- Top-left: small uppercase label with team/org name and year
- Center: main title as `h1` at 52px, max-width 700px
- Below title: one-sentence description at 18px, reduced opacity
- Bottom: row of 3–5 key stats (number + label), separated by thin vertical dividers
- This slide sets the emotional tone — keep it clean, keep it confident

### Slide 2 — Context / Problem

- White background
- Slide label (e.g., "Context", "Background")
- Use a `grid-2` of `.card` elements for pain points or observations
- Each card: coral-colored uppercase category label → h3 title → short body text
- If not a problem slide, use cards with blue or teal labels for neutral context

### Slides 3–N — Content Slides

Choose the right components for each slide's purpose. See the Component Selection Guide below.

### Final Slide — Summary / Closing

- Background: `var(--bg-sec)` (warm off-white)
- Grid of summary cards (what this delivers)
- Optional: row of stat boxes with key numbers
- No call-to-action buttons — this style is informational, not promotional

## Component Selection Guide

Match your content type to the right component:

| Content Type                      | Component(s) to Use                                   |
| --------------------------------- | ----------------------------------------------------- |
| Problems, pain points, challenges | `grid-2` of `.card` with coral labels                 |
| Architecture, system layers       | Stacked `.arch-layer` bars with `↕` arrows            |
| File/directory structure          | `.tree-line` with color-highlighted names             |
| Feature list, capability grid     | `grid-3` or `grid-4` of `.skill-card`                 |
| Sequential process, setup steps   | `.step-row` with numbered circles                     |
| Rules, policies, constraints      | `.rule-row` with dot markers                          |
| Commands, key-value pairs         | `.cmd-row` with mono names                            |
| File listing with metadata        | `.file-row` with icon + name + description + pill     |
| How things combine                | Horizontal flex of `.card` with `+` and `=` operators |
| Key metrics                       | Flex row of `.stat` boxes                             |
| Key insight or callout            | Teal callout box with left border                     |
| Warning or caveat                 | Amber callout box with left border                    |
| Side-by-side comparison           | `grid-2` with independent content per column          |
| Code snippets                     | Dark code block (`--gray-800` bg, light text)         |

## Critical Style Rules

1. **Never use shadows.** No `box-shadow` anywhere.
2. **Never use gradients.** All backgrounds are flat colors.
3. **Never use icons or images.** This is a typography-and-structure-only design.
4. **Never use bold (700).** Use medium (500) for headings, normal (400) for body.
5. **Borders are 0.5px.** Not 1px, not 2px. Always `0.5px solid var(--border-med)` for cards.
6. **Colors follow semantic rules.** Each color family has a defined purpose — check the reference.
7. **Max content width is 960px.** Never wider than that for the content area.
8. **Slide padding is always `60px 72px`.** Never change this.
9. **All text left-aligned** except `.stat-num` which is centered.
10. **Monospace for technical names.** File paths, commands, config keys, code use `'SF Mono', 'Fira Code', monospace`.

## Content & Language

- If the user provides content in Persian, the presentation should be in Persian with `dir="rtl"` on the `<html>` tag
- English technical terms (e.g., API, backend, CLAUDE.md) stay in English even in Persian presentations
- For RTL presentations, flip horizontal layouts: `.arch-layer` tag goes left, label goes right
- Keep text concise — this style uses 12–13px body text, so long paragraphs don't work
- Each slide should communicate one idea

## Building Process

1. Read `references/design-system.md`
2. Plan the slide sequence (title → context → content slides → summary)
3. For each slide, pick components from the Component Selection Guide
4. Write the complete HTML with all CSS variables and component classes in `<style>`
5. Include ALL CSS from the design system reference — do not cherry-pick
6. Save to `/mnt/user-data/outputs/presentation.html` (or a descriptive name)
7. Present via `present_files`

## Example Slide Label Patterns

Slide labels help orient the viewer. They are small uppercase text above the h2. Examples:

- "Context" — for problem/background slides
- "Layer 1 · Policy" — for system architecture sections
- "Process" — for step-by-step flows
- "Summary" — for closing slides
- Use `·` (middle dot) as separator, not `-` or `/`

## Checklist Before Delivery

- [ ] Title slide has dark blue-900 background with stats at bottom
- [ ] Every slide has a `.slide-label`
- [ ] Color usage follows semantic rules (check reference)
- [ ] No shadows, no gradients, no icons, no images
- [ ] Borders are 0.5px
- [ ] Font weights are 400 and 500 only
- [ ] Monospace used for all technical text
- [ ] Content max-width ≤ 960px
- [ ] Callout boxes use left-border pattern
- [ ] Final slide uses `--bg-sec` background
- [ ] File is self-contained (no external CSS/JS)
