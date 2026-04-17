# Figma → Vue / Vuetify 3 · Translation Rules

> **Audience:** Design Team + Tech Team  
> **Purpose:** Exact translation of every Figma property to its CSS / Vue / Vuetify 3 equivalent  
> **Golden Rule:** Every value you see in Figma has a code equivalent here. Check this document before hardcoding anything.

---

## 1. Sizing Modes

### Width / Height Mode

| Figma | CSS | Vuetify 3 |
|-------|-----|-----------|
| **Fixed** `120` | `width: 120px` | `style="width: 120px"` |
| **Fill** (stretch to parent) | `width: 100%` or `flex: 1 1 0` | `class="w-100"` or `class="flex-grow-1"` |
| **Hug** (fit content) | `width: fit-content` | Omit width — default behavior |
| Min Width | `min-width: {n}px` | `style="min-width: {n}px"` |
| Max Width | `max-width: {n}px` | `style="max-width: {n}px"` |

> **Fill in code:** If the parent is a flex container, use `flex: 1`. If the parent is a block element, use `width: 100%`. These behave differently.

---

## 2. Auto Layout

### Direction & Wrap

| Figma | CSS | Vuetify 3 |
|-------|-----|-----------|
| Horizontal | `display: flex; flex-direction: row` | `class="d-flex flex-row"` |
| Vertical | `display: flex; flex-direction: column` | `class="d-flex flex-column"` |
| Wrap | `flex-wrap: wrap` | `class="flex-wrap"` |
| No Wrap | `flex-wrap: nowrap` | `class="flex-nowrap"` |

### Gap

| Figma | CSS | Vuetify 3 |
|-------|-----|-----------|
| Gap (all) | `gap: {n}px` | `class="ga-{n}"` (4px unit) |
| Horizontal gap only | `column-gap: {n}px` | `class="ga-x-{n}"` |
| Vertical gap only | `row-gap: {n}px` | `class="ga-y-{n}"` |
| Space Between | `justify-content: space-between` | `class="justify-space-between"` |
| Space Around | `justify-content: space-around` | `class="justify-space-around"` |
| Space Evenly | `justify-content: space-evenly` | `class="justify-space-evenly"` |

### Padding

| Figma | CSS | Vuetify 3 |
|-------|-----|-----------|
| All sides | `padding: {n}px` | `class="pa-{n}"` |
| Horizontal (L+R) | `padding-inline: {n}px` | `class="px-{n}"` |
| Vertical (T+B) | `padding-block: {n}px` | `class="py-{n}"` |
| Top | `padding-top: {n}px` | `class="pt-{n}"` |
| Right | `padding-right: {n}px` | `class="pr-{n}"` |
| Bottom | `padding-bottom: {n}px` | `class="pb-{n}"` |
| Left | `padding-left: {n}px` | `class="pl-{n}"` |

### Alignment — Primary Axis

| Figma | CSS | Vuetify 3 |
|-------|-----|-----------|
| Start | `justify-content: flex-start` | `class="justify-start"` |
| Center | `justify-content: center` | `class="justify-center"` |
| End | `justify-content: flex-end` | `class="justify-end"` |
| Space Between | `justify-content: space-between` | `class="justify-space-between"` |

### Alignment — Cross Axis

| Figma | CSS | Vuetify 3 |
|-------|-----|-----------|
| Top / Start | `align-items: flex-start` | `class="align-start"` |
| Center | `align-items: center` | `class="align-center"` |
| Bottom / End | `align-items: flex-end` | `class="align-end"` |
| Baseline | `align-items: baseline` | `class="align-baseline"` |
| Stretch | `align-items: stretch` | `class="align-stretch"` |

### Absolute Position inside Auto Layout

```vue
<!-- Figma: Auto Layout parent + child with "Absolute position" enabled -->
<div class="position-relative d-flex flex-column ga-4">
  <!-- regular children -->
  <div>item 1</div>
  <!-- absolute child -->
  <div class="position-absolute" style="top: 8px; right: 8px">
    badge
  </div>
</div>
```

---

## 3. Grid Layout

| Figma | Vuetify 3 |
|-------|-----------|
| 12-column grid container | `<v-container>` |
| Row | `<v-row>` |
| Column (span 6 of 12) | `<v-col cols="6">` |
| Responsive column | `<v-col cols="12" sm="6" md="4">` |
| No gutters | `<v-row no-gutters>` |
| Row gap | `<v-row class="ga-y-4">` |

---

## 4. Stroke → Border

### Stroke Position

| Figma Position | CSS | Note |
|----------------|-----|------|
| **Inside** | `border: {w}px solid {color}; box-sizing: border-box` | Element size unchanged |
| **Outside** | `outline: {w}px solid {color}; outline-offset: 0` | Outside layout flow |
| **Center** | `box-shadow: 0 0 0 {w/2}px {color}` | Approximation only |

> **Center stroke** has no direct CSS equivalent. Use `box-shadow` with spread as the closest approximation — rounded corners won't be perfectly replicated.

### Stroke Style

| Figma | CSS |
|-------|-----|
| Solid | `border-style: solid` |
| Dashed | `border-style: dashed` |
| Dotted | `border-style: dotted` |

### Per-Side Stroke

| Figma | CSS |
|-------|-----|
| Top only | `border-top: {w}px solid {color}` |
| Right only | `border-right: {w}px solid {color}` |
| Bottom only | `border-bottom: {w}px solid {color}` |
| Left only | `border-left: {w}px solid {color}` |

### Vuetify Component Stroke

| Figma | Vuetify prop |
|-------|-------------|
| Stroke on button/input | `:variant="'outlined'"` |
| No stroke | `:variant="'flat'"` or `':variant="'text'"` |

---

## 5. Border Radius

### Vuetify 3 Scale

| Figma (px) | Vuetify Class | CSS |
|------------|---------------|-----|
| 0 | `rounded-0` | `border-radius: 0` |
| 2 | `rounded-sm` | `border-radius: 2px` |
| 4 | `rounded` | `border-radius: 4px` |
| 6 | `rounded-md` | `border-radius: 6px` |
| 8 | `rounded-lg` | `border-radius: 8px` |
| 12 | `rounded-xl` | `border-radius: 12px` |
| 9999 | `rounded-pill` | `border-radius: 9999px` |
| 50% | `rounded-circle` | `border-radius: 50%` |

### Per-Corner

| Figma | CSS |
|-------|-----|
| Top-left | `border-top-left-radius: {n}px` |
| Top-right | `border-top-right-radius: {n}px` |
| Bottom-right | `border-bottom-right-radius: {n}px` |
| Bottom-left | `border-bottom-left-radius: {n}px` |

> **Corner Smoothing** (Figma's Apple-style smooth corners) has no CSS equivalent. Use standard `border-radius`. For pixel-perfect curves, use an SVG path.

---

## 6. Fill → Background / Color

### Solid Fill

| Figma | CSS | Vuetify 3 |
|-------|-----|-----------|
| Solid fill | `background-color: #HEX` | `class="bg-{token}"` |
| No fill | `background: transparent` | — |
| Text color | `color: #HEX` | `class="text-{token}"` |

### Gradient Fill

| Figma | CSS |
|-------|-----|
| Linear Gradient | `background: linear-gradient({deg}deg, {color1}, {color2})` |
| Radial Gradient | `background: radial-gradient(circle, {color1}, {color2})` |
| Angular Gradient | `background: conic-gradient(from {deg}deg, {color1}, {color2})` |

> **Angle conversion:** Figma measures from 12 o'clock (top), CSS from 3 o'clock (right).  
> Formula: `css_angle = (figma_angle + 90) % 360`

| Figma Angle | CSS `deg` |
|-------------|-----------|
| 0° (top → bottom) | `180deg` |
| 90° (left → right) | `90deg` |
| 180° (bottom → top) | `0deg` |
| 270° (right → left) | `270deg` |

### Image Fill

| Figma Mode | CSS | Vue |
|------------|-----|-----|
| Fill (Cover) | `background: url() center/cover no-repeat` | `<v-img cover>` |
| Fit (Contain) | `background: url() center/contain no-repeat` | `<v-img contain>` |
| Crop | `object-fit: none; object-position: {x} {y}` | `object-position` prop |
| Tile | `background: url() repeat` | — |
| Stretch | `background-size: 100% 100%` | — |

---

## 7. Effects → Shadow / Filter

### Drop Shadow → `box-shadow`

| Figma Field | CSS Property |
|-------------|--------------|
| X | 1st value (offset-x) |
| Y | 2nd value (offset-y) |
| Blur | 3rd value (blur-radius) |
| Spread | 4th value (spread-radius) |
| Color + Opacity | `rgba(r, g, b, opacity)` |

```css
/* Figma: X=0, Y=4, Blur=8, Spread=0, #000 20% */
box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.20);

/* Inner Shadow */
box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

/* Multiple shadows */
box-shadow:
  0px 2px 4px rgba(0,0,0,0.10),
  0px 8px 16px rgba(0,0,0,0.08);
```

### Vuetify Elevation Scale

| Class | Typical Use |
|-------|-------------|
| `elevation-0` | Flat — no shadow |
| `elevation-1` | Flat card |
| `elevation-2` | Default card |
| `elevation-4` | Raised card |
| `elevation-8` | Menu, tooltip |
| `elevation-12` | Floating action button |
| `elevation-16` | Modal, dialog |
| `elevation-24` | Navigation drawer |

### Other Effects

| Figma | CSS |
|-------|-----|
| Layer Blur | `filter: blur({n}px)` |
| Background Blur | `backdrop-filter: blur({n}px)` |

---

## 8. Opacity

| Figma | CSS | Note |
|-------|-----|------|
| Layer Opacity 50% | `opacity: 0.5` | Affects all children |
| Fill color opacity | `rgba(r, g, b, 0.5)` | Affects only the color |
| Disabled state | `opacity: 0.38` | Material Design standard |

> **Key difference:** `opacity` on a layer makes all children transparent. For background-only transparency, use `rgba()` or `rgb(var(--v-theme-primary), 0.1)`.

---

## 9. Blend Modes

| Figma | CSS `mix-blend-mode` | Figma | CSS `mix-blend-mode` |
|-------|----------------------|-------|----------------------|
| Normal | `normal` | Overlay | `overlay` |
| Darken | `darken` | Soft Light | `soft-light` |
| Multiply | `multiply` | Hard Light | `hard-light` |
| Color Burn | `color-burn` | Difference | `difference` |
| Lighten | `lighten` | Exclusion | `exclusion` |
| Screen | `screen` | Hue | `hue` |
| Color Dodge | `color-dodge` | Saturation | `saturation` |
| Plus Lighter | `plus-lighter` | Luminosity | `luminosity` |

---

## 10. Typography

### Properties

| Figma | CSS | Vuetify 3 |
|-------|-----|-----------|
| Font Family | `font-family: 'Name', sans-serif` | Configured in `vuetify.js` theme |
| Font Size | `font-size: {n}px` | Use type scale below |
| Font Weight | `font-weight: {100–900}` | `class="font-weight-{name}"` |
| Italic | `font-style: italic` | `class="font-italic"` |
| Line Height (Auto) | `line-height: normal` | — |
| Line Height (px) | `line-height: {n}px` | `style="line-height: {n}px"` |
| Line Height (%) | `line-height: {n}` | `style="line-height: 1.5"` |
| Letter Spacing (px) | `letter-spacing: {n}px` | `style="letter-spacing: {n}px"` |
| Letter Spacing (%) | `letter-spacing: {n}em` | `style="letter-spacing: {n}em"` |
| Align Left | `text-align: left` | `class="text-left"` |
| Align Center | `text-align: center` | `class="text-center"` |
| Align Right | `text-align: right` | `class="text-right"` |
| Align Justify | `text-align: justify` | `class="text-justify"` |
| Uppercase | `text-transform: uppercase` | `class="text-uppercase"` |
| Lowercase | `text-transform: lowercase` | `class="text-lowercase"` |
| Capitalize | `text-transform: capitalize` | `class="text-capitalize"` |
| Underline | `text-decoration: underline` | — |
| Strikethrough | `text-decoration: line-through` | — |
| Paragraph Spacing | `margin-bottom: {n}px` on `<p>` | `class="mb-{n}"` |
| Truncate (1 line) | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` | `class="text-truncate"` |

### Vuetify 3 Type Scale

| Class | Size | Weight | Tracking |
|-------|------|--------|----------|
| `text-h1` | 96px | 300 | -1.5px |
| `text-h2` | 60px | 300 | -0.5px |
| `text-h3` | 48px | 400 | 0 |
| `text-h4` | 34px | 400 | +0.25px |
| `text-h5` | 24px | 400 | 0 |
| `text-h6` | 20px | 500 | +0.15px |
| `text-subtitle-1` | 16px | 400 | +0.15px |
| `text-subtitle-2` | 14px | 500 | +0.1px |
| `text-body-1` | 16px | 400 | +0.5px |
| `text-body-2` | 14px | 400 | +0.25px |
| `text-button` | 14px | 500 | +1.25px (UPPERCASE) |
| `text-caption` | 12px | 400 | +0.4px |
| `text-overline` | 10px | 400 | +1.5px (UPPERCASE) |

### Font Weight Classes

| Vuetify Class | Weight |
|---------------|--------|
| `font-weight-thin` | 100 |
| `font-weight-light` | 300 |
| `font-weight-regular` | 400 |
| `font-weight-medium` | 500 |
| `font-weight-bold` | 700 |
| `font-weight-black` | 900 |

---

## 11. Spacing System

Vuetify uses **4px** as the base unit. All Figma spacing values must be multiples of 4.

| Vuetify `n` | px | rem |
|-------------|-----|-----|
| 0 | 0 | 0 |
| 1 | 4px | 0.25rem |
| 2 | 8px | 0.5rem |
| 3 | 12px | 0.75rem |
| 4 | 16px | 1rem |
| 5 | 20px | 1.25rem |
| 6 | 24px | 1.5rem |
| 7 | 28px | 1.75rem |
| 8 | 32px | 2rem |
| 9 | 36px | 2.25rem |
| 10 | 40px | 2.5rem |
| 12 | 48px | 3rem |
| 16 | 64px | 4rem |

**Class format:**  
`ma-{n}` · `mx-{n}` · `my-{n}` · `mt-{n}` · `mr-{n}` · `mb-{n}` · `ml-{n}`  
Same pattern with `p` for padding: `pa-{n}` · `px-{n}` etc.  
Gap: `ga-{n}` · `ga-x-{n}` · `ga-y-{n}`

> **Design Rule:** Spacing values of 5, 7, 11, 13, etc. are not directly supported. Always use multiples of 4.

---

## 12. Constraints → Positioning

> Constraints only apply inside non-Auto-Layout frames. Inside Auto Layout, use flexbox alignment instead.

| Figma Constraint | CSS |
|-----------------|-----|
| Left | `position: absolute; left: {n}px` |
| Right | `position: absolute; right: {n}px` |
| Top | `position: absolute; top: {n}px` |
| Bottom | `position: absolute; bottom: {n}px` |
| Left & Right (stretch H) | `position: absolute; left: {n}px; right: {n}px` |
| Top & Bottom (stretch V) | `position: absolute; top: {n}px; bottom: {n}px` |
| Center H | `position: absolute; left: 50%; transform: translateX(-50%)` |
| Center V | `position: absolute; top: 50%; transform: translateY(-50%)` |
| Center H+V | `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| Scale | `width: {%}; height: {%}` relative to parent |

---

## 13. Component Structure

| Figma | Vue / Vuetify |
|-------|--------------|
| Frame | `<div>`, `<v-sheet>`, `<v-card>` |
| Group | `<div>` (no semantic meaning) |
| Section | `<section>` |
| Component (main) | Vue SFC with `<script setup>` |
| Instance | `<MyComponent />` |
| Variant | `props: { variant: 'filled' \| 'outlined' \| 'text' }` |
| Boolean Property | `v-if` / `v-show` |
| Text Property | Vue prop or slot |
| Instance Swap | `<component :is="icon" />` |

---

## 14. Component States

| Figma State | CSS | Vue / Vuetify |
|-------------|-----|--------------|
| Default | — | — |
| Hover | `:hover` | `@mouseenter` / `@mouseleave` |
| Pressed | `:active` | `@mousedown` |
| Focused | `:focus`, `:focus-visible` | `@focus` / `@blur` |
| Disabled | `:disabled` + `opacity: 0.38` | `:disabled="true"` |
| Error | `.v-input--error` | `:error="true"` |
| Loading | — | `:loading="true"` |
| Selected | `.selected` | `v-model` / `:model-value` |

### Disabled Token (Material Design)

```css
color: rgba(0, 0, 0, 0.38);           /* text */
background-color: rgba(0, 0, 0, 0.12); /* surface */
```

---

## 15. Responsive / Breakpoints

| Figma Frame | Vuetify | Range |
|-------------|---------|-------|
| Mobile (360px) | `xs` | < 600px |
| Tablet (768px) | `sm` | 600 – 959px |
| Laptop (1280px) | `md` | 960 – 1279px |
| Desktop (1440px) | `lg` | 1280 – 1919px |
| Wide (1920px+) | `xl` | 1920 – 2559px |
| Ultra-wide | `xxl` | ≥ 2560px |

### Responsive Visibility

| Goal | Vuetify Class |
|------|--------------|
| Mobile only | `class="d-flex d-sm-none"` |
| Hide on mobile | `class="d-none d-sm-flex"` |
| Desktop only | `class="d-none d-lg-flex"` |
| Hide on desktop | `class="d-flex d-lg-none"` |

### Responsive Columns

```vue
<!-- Mobile: full · Tablet: half · Desktop: third -->
<v-col cols="12" sm="6" md="4">
```

---

## 16. Clip Content

| Figma | CSS |
|-------|-----|
| Clip content ✓ | `overflow: hidden` |
| Clip content ✗ | `overflow: visible` |
| Scroll inside frame | `overflow: auto` or `overflow-y: auto` |
| Clip with shape | `clip-path: polygon(...)` |
| Mask with SVG | `mask: url(#mask-id)` |

---

## 17. Layer Order → Z-index

| Context | Vuetify Default z-index |
|---------|------------------------|
| Base content | `0` |
| Tooltip | `2000` |
| Menu / Popover | `2000` |
| Overlay backdrop | `2300` |
| Dialog / Modal | `2400` |
| Navigation Drawer | `1000` |
| App Bar | `1004` |
| Snackbar | `2500` |

---

## 18. Images & Icons

```vue
<!-- Cover (Figma: Fill) -->
<v-img :src="url" cover :aspect-ratio="16/9" />

<!-- Contain (Figma: Fit) -->
<v-img :src="url" contain />

<!-- With placeholder -->
<v-img :src="url" cover>
  <template #placeholder>
    <v-skeleton-loader type="image" />
  </template>
</v-img>

<!-- Icon — always use MDI -->
<v-icon size="24" color="primary">mdi-check-circle</v-icon>
```

---

## 19. Color System

### Vuetify Theme Tokens

| Token | Usage | Vue |
|-------|-------|-----|
| `primary` | Brand main color | `color="primary"` / `class="bg-primary"` |
| `secondary` | Supporting color | `color="secondary"` |
| `error` | Error state | `color="error"` |
| `warning` | Warning state | `color="warning"` |
| `info` | Informational | `color="info"` |
| `success` | Success state | `color="success"` |
| `surface` | Card / sheet background | `class="bg-surface"` |
| `background` | Page background | `class="bg-background"` |
| `on-primary` | Text on primary | `class="text-on-primary"` |
| `on-surface` | Text on surface | `class="text-on-surface"` |

```css
/* Access theme colors with opacity */
background: rgb(var(--v-theme-primary), 0.1);
color: rgb(var(--v-theme-on-surface));
```

---

## 20. Special Cases & Common Pitfalls

### Fill inside Auto Layout

```vue
<!-- Figma: Horizontal Auto Layout, child width = Fill -->
<div class="d-flex flex-row">
  <div style="width: 48px">icon</div>
  <div class="flex-grow-1">  <!-- Fill -->
    content
  </div>
</div>
```

### Nested Auto Layout (most common pattern)

```vue
<!--
  Figma:
  outer (Vertical, gap=16, padding=24)
    └─ inner (Horizontal, gap=8, align=center)
         ├─ icon (Fixed 24×24)
         └─ label (Fill)
-->
<div class="d-flex flex-column ga-4 pa-6">
  <div class="d-flex flex-row ga-2 align-center">
    <v-icon size="24">mdi-check</v-icon>
    <span class="flex-grow-1">label</span>
  </div>
</div>
```

### Gradient Angle Conversion

```
Formula: css_angle = (figma_angle + 90) % 360

Figma 0°   → CSS 180deg  (top to bottom)
Figma 90°  → CSS 90deg   (left to right)
Figma 180° → CSS 0deg    (bottom to top)
Figma 270° → CSS 270deg  (right to left)
```

### Center Stroke Approximation

```css
/* Figma: Center stroke 2px → CSS approximation */
box-shadow: 0 0 0 1px #534AB7;  /* half outside */
border: 1px solid #534AB7;      /* half inside */

/* ⚠ Rounded corners are not perfectly replicated */
```

### Image Aspect Ratio

```vue
<!-- Figma: Frame with 16:9 aspect ratio + image fill -->
<v-img :src="imageUrl" :aspect-ratio="16/9" cover />

<!-- Or with CSS -->
<div style="aspect-ratio: 16/9; overflow: hidden">
  <img :src="imageUrl" style="width:100%;height:100%;object-fit:cover">
</div>
```

---

## Handoff Checklist

Before sending a design to the Tech team, verify:

- [ ] All spacing values are multiples of 4px
- [ ] Font sizes match the Vuetify type scale
- [ ] Colors reference design tokens (not raw hex values)
- [ ] Auto Layout direction (H/V) and gap are clearly marked
- [ ] Padding is explicitly shown on every frame
- [ ] Responsive frames exist (mobile / tablet / desktop)
- [ ] All states are designed (hover / disabled / error / loading)
- [ ] Stroke position is specified (inside / outside / center)
- [ ] Image fill mode is specified (cover / contain / crop)
- [ ] Component variants map to props
- [ ] Icons are from MDI library or their names are specified
- [ ] Border radius values match Vuetify scale (0/2/4/6/8/12px)
- [ ] Elevation values match Vuetify scale (0/1/2/4/8/12/16/24)
- [ ] Clip content is set on overflow frames
