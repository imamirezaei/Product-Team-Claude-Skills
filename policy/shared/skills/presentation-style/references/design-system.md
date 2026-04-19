# Design System Reference — Presentation Style

This document contains the complete design system extracted from the canonical presentation template. Every presentation generated with this skill MUST follow these specifications exactly.

---

## 1. Color Palette

Six color families, each with shades at 50 (lightest), 100, 400, 600, 800, and sometimes 900 (darkest).

```css
:root {
  /* Blue — primary accent, title slide background, links, step numbers */
  --blue-50: #e6f1fb;
  --blue-100: #b5d4f4;
  --blue-400: #378add;
  --blue-600: #185fa5;
  --blue-800: #0c447c;
  --blue-900: #042c53;

  /* Teal — secondary accent, success/positive states, "reads repo" badges */
  --teal-50: #e1f5ee;
  --teal-100: #9fe1cb;
  --teal-400: #1d9e75;
  --teal-600: #0f6e56;
  --teal-800: #085041;

  /* Purple — tertiary accent, agents, special categories */
  --purple-50: #eeedfe;
  --purple-100: #cecbf6;
  --purple-400: #7f77dd;
  --purple-600: #534ab7;
  --purple-800: #3c3489;

  /* Amber — dynamic/personal data, warnings, generated content */
  --amber-50: #faeeda;
  --amber-100: #fac775;
  --amber-400: #ba7517;
  --amber-600: #854f0b;
  --amber-800: #633806;

  /* Coral — pain points, problems, negative states */
  --coral-50: #faece7;
  --coral-400: #d85a30;
  --coral-600: #993c1d;
  --coral-800: #712b13;

  /* Gray — neutral, secondary text, private/gitignored items */
  --gray-50: #f1efe8;
  --gray-100: #d3d1c7;
  --gray-200: #b4b2a9;
  --gray-400: #888780;
  --gray-600: #5f5e5a;
  --gray-800: #444441;

  /* Semantic tokens */
  --text: #1a1a18; /* Primary text */
  --text-sec: #5f5e5a; /* Secondary text / body paragraphs */
  --text-hint: #888780; /* Hint text / labels */
  --bg: #ffffff; /* Primary background */
  --bg-sec: #f8f7f4; /* Secondary background (summary slides, callouts) */
  --bg-ter: #f1efe8; /* Tertiary background (code inline, mono badges) */
  --border: rgba(0, 0, 0, 0.1);
  --border-med: rgba(0, 0, 0, 0.18);

  /* Shape */
  --radius: 8px;
  --radius-lg: 12px;

  /* Typography */
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

### Color Usage Rules

| Purpose                                        | Color Family                                |
| ---------------------------------------------- | ------------------------------------------- |
| Title slide background                         | `--blue-900`                                |
| Primary accent, step numbers, links            | blue                                        |
| Success, positive, "updated" badges            | teal                                        |
| Generated/personal content, "untouched" badges | amber                                       |
| Problems, pain points                          | coral                                       |
| Special categories, agents                     | purple                                      |
| Neutral, private, secondary                    | gray                                        |
| Callout boxes with key insight                 | `--teal-50` bg + `--teal-400` left border   |
| Warning/important callout                      | `--amber-50` bg + `--amber-400` left border |

---

## 2. Typography

```css
body {
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.6;
  color: var(--text);
}
```

| Element           | Size                       | Weight | Line-height | Color                                                    |
| ----------------- | -------------------------- | ------ | ----------- | -------------------------------------------------------- |
| Title slide h1    | 52px                       | 500    | 1.1         | white                                                    |
| Slide h2          | 36px (or 28px for smaller) | 500    | —           | `--text`                                                 |
| h3                | 17px                       | 500    | —           | `--text`                                                 |
| Body paragraph    | 15px                       | 400    | 1.7         | `--text-sec`                                             |
| Lead paragraph    | 18px                       | 400    | 1.6         | `--text-sec`                                             |
| Slide label       | 11px                       | 500    | —           | `--text-hint`, uppercase, letter-spacing: 0.08em         |
| Pill text         | 11px                       | 500    | —           | color-800 variant                                        |
| Stat number       | 36px                       | 500    | —           | `--text`                                                 |
| Stat label        | 12px                       | 400    | —           | `--text-sec`                                             |
| Mono/code inline  | 12px                       | 400    | —           | `--text`, font-family: 'SF Mono', 'Fira Code', monospace |
| Code block (dark) | 12px                       | 400    | —           | #e8e6e0 on `--gray-800`                                  |

---

## 3. Slide Structure

Every slide uses this base:

```css
.slide {
  min-height: 100vh;
  padding: 60px 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid var(--border);
}
```

### Slide Types

#### A. Title Slide (first slide only)

- Background: `var(--blue-900)`, all text white
- Top: small label (team name + year), uppercase, `rgba(255,255,255,0.45)`
- Center: h1 at 52px, max-width 700px
- Below h1: lead paragraph at 18px, `rgba(255,255,255,0.55)`, max-width 560px
- Bottom: row of key stats (large number + small label), separated by 1px vertical dividers (`rgba(255,255,255,0.12)`)

#### B. Content Slide (majority of slides)

- Background: `var(--bg)` (white)
- Starts with `.slide-label` (e.g., "Layer 1 · Policy")
- Then h2 at 36px
- Then optional subtitle paragraph at 14px, `--text-sec`
- Then content area using grids, cards, file-rows, etc.
- max-width for content: typically 900px–960px

#### C. Summary/Closing Slide

- Background: `var(--bg-sec)` (#f8f7f4)
- Same structure as content slide
- Often features a grid of `.stat` boxes and a grid of summary cards

---

## 4. Component Library

### 4.1 Pill / Badge

```css
.pill {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 20px;
}
```

Variants: `.pill-blue`, `.pill-teal`, `.pill-purple`, `.pill-amber`, `.pill-gray`, `.pill-coral`
Each uses `color-50` as background and `color-800` as text.

### 4.2 Card

```css
/* Primary card — white with subtle border */
.card {
  background: var(--bg);
  border: 0.5px solid var(--border-med);
  border-radius: var(--radius-lg); /* 12px */
  padding: 20px 24px;
}

/* Secondary card — light fill, no border */
.card-sec {
  background: var(--bg-sec);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
}
```

### 4.3 Grids

```css
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
.grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
}
```

### 4.4 Architecture Layer

Horizontal bar with label left and tag right. Each layer gets its own color family as background (color-50).

```css
.arch-layer {
  border-radius: var(--radius); /* 8px */
  padding: 14px 20px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

Between layers: a centered `↕` arrow in `--gray-400`.

### 4.5 File Row

```css
.file-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 0.5px solid var(--border);
}
.file-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
}
.file-name {
  font-size: 13px;
  font-weight: 500;
  font-family: "SF Mono", monospace;
}
.file-desc {
  font-size: 12px;
  color: var(--text-sec);
}
```

### 4.6 Step Row (numbered steps)

```css
.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--blue-600);
  color: white;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Step body has h3 + paragraph. Optional dark code block below.

### 4.7 Skill Card (small feature card)

```css
.skill-card {
  background: var(--bg);
  border: 0.5px solid var(--border-med);
  border-radius: var(--radius-lg);
  padding: 16px 18px;
}
.skill-card h3 {
  font-size: 13px;
  font-family: "SF Mono", monospace;
}
.skill-card p {
  font-size: 12px;
  color: var(--text-sec);
  line-height: 1.5;
}
```

### 4.8 Command / Key-Value Row

```css
.cmd-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 0.5px solid var(--border);
}
.cmd-name {
  font-family: "SF Mono", monospace;
  font-size: 13px;
  font-weight: 500;
  color: var(--blue-800);
  min-width: 160px;
}
.cmd-desc {
  font-size: 12px;
  color: var(--text-sec);
}
```

### 4.9 Rule Row (dot + title + description)

```css
.rule-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 0.5px solid var(--border);
}
.rule-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue-400);
  margin-top: 6px;
}
.rule-title {
  font-size: 13px;
  font-weight: 500;
}
.rule-desc {
  font-size: 12px;
  color: var(--text-sec);
}
```

### 4.10 Stat Box

```css
.stat {
  text-align: center;
  padding: 20px;
  background: var(--bg-sec);
  border-radius: var(--radius-lg);
}
.stat-num {
  font-size: 36px;
  font-weight: 500;
  color: var(--text);
}
.stat-label {
  font-size: 12px;
  color: var(--text-sec);
  margin-top: 4px;
}
```

### 4.11 Callout Box (key insight)

```html
<div
  style="padding: 16px 20px; background: var(--teal-50); border-radius: var(--radius); border-left: 3px solid var(--teal-400);"
>
  <p style="font-size: 13px; color: var(--teal-800);">
    <strong>The key insight:</strong> ...
  </p>
</div>
```

Use teal for positive/insight, amber for warning.

### 4.12 Dark Code Block

```css
code.step-cmd {
  font-family: "SF Mono", monospace;
  font-size: 12px;
  background: var(--gray-800);
  color: #e8e6e0;
  padding: 8px 14px;
  border-radius: 6px;
  display: block;
  margin-top: 8px;
}
```

### 4.13 Mono Inline Badge

```css
.mono {
  font-family: "SF Mono", "Fira Code", monospace;
  font-size: 12px;
  background: var(--bg-ter);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text);
}
```

### 4.14 Tree / Directory Listing

```css
.tree-line {
  font-family: "SF Mono", monospace;
  font-size: 12px;
  line-height: 2;
  color: var(--text-sec);
}
/* Color highlights for tree items */
.tree-line .hl-blue {
  color: var(--blue-600);
  font-weight: 500;
}
.tree-line .hl-teal {
  color: var(--teal-600);
  font-weight: 500;
}
.tree-line .hl-purple {
  color: var(--purple-600);
  font-weight: 500;
}
.tree-line .hl-amber {
  color: var(--amber-600);
  font-weight: 500;
}
.tree-line .hl-gray {
  color: var(--gray-400);
}
.tree-line .comment {
  color: var(--gray-400);
  font-style: italic;
}
```

### 4.15 Divider

```css
.divider {
  height: 1px;
  background: var(--border);
  margin: 32px 0;
}
```

---

## 5. Slide Composition Patterns

### Pattern: Problem / Pain Points

Use a `grid-2` of `.card` elements. Each card starts with a coral-colored uppercase label (e.g., "Pain point 1"), then h3 title, then 13px body text.

### Pattern: Architecture / Layer Diagram

Stack `.arch-layer` elements vertically with `↕` arrows between them. Each layer uses a different color family.

### Pattern: Side-by-Side Comparison

Use `grid-2` with left and right sections. Each side has its own subheading and content (file-rows, tree-lines, cards).

### Pattern: Feature/Skill Grid

Use `grid-3` or `grid-4` of `.skill-card` elements grouped under `.skill-group-label` headings.

### Pattern: Numbered Process / Steps

Stack `.step-row` elements. Each has a `.step-num` circle and `.step-body` with h3, paragraph, and optional code block.

### Pattern: Rules / Key-Value List

Stack `.rule-row` or `.cmd-row` elements. Each has a visual marker, name, and description.

### Pattern: Stats Summary

Use a flex row of `.stat` boxes. Each has a large number and small label.

### Pattern: Equation / Composition

Use a horizontal flex layout with cards separated by `+` and `=` operators to show how things combine.

---

## 6. Overall Design Principles

1. **Warm neutral palette.** The grays are warm-toned (#F1EFE8, not cool blue-grays). The background is never pure white for secondary surfaces.
2. **Restraint in color.** Only one color accent per semantic purpose. Never mix two accent colors in the same component.
3. **Ultra-thin borders.** Cards use `0.5px solid var(--border-med)`. Never thick borders.
4. **Generous whitespace.** Slides have 60px top/bottom, 72px left/right padding. Content max-widths are 720px–960px.
5. **Typography hierarchy through size and opacity, not bold.** Headings are weight 500 (medium), not 700 (bold). Body text is weight 400.
6. **Monospace for technical labels.** File names, commands, config keys all use 'SF Mono'.
7. **Small text for detail.** Descriptions are 12px–13px. Labels are 11px.
8. **No decorative elements.** No gradients, no shadows, no icons, no images. Everything is typography + color + structure.
9. **Left-aligned.** No centered text except stat numbers. Everything else flows left.
10. **Single-page scroll.** Each slide is `min-height: 100vh`. The deck is one continuous HTML file.
