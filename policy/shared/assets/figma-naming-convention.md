# Figma Naming Convention
> **Audience:** Design Team + Tech Team
> **Purpose:** A shared language between Figma and Vue/Vuetify 3 — identical naming on both sides means zero translation at handoff.
> **Golden Rule:** If a layer, variant, or token has a name in Figma, that exact name must be used in code.

---

## Philosophy

Designers and developers speak different languages. Designers talk about "frames", "groups", and "layers". Developers talk about "components", "props", and "slots". This document is a permanent map between the two.

**Practical result:** When a developer opens a Figma file, every layer name should be immediately meaningful — no explanation from the designer needed.

---

## Level 1 — Pages

Each page represents a product domain.

**Format:** `PascalCase`

| Figma Page | Vue Router Module |
|---|---|
| `Dashboard` | `/dashboard/` |
| `Payment` | `/payment/` |
| `Auth` | `/auth/` |
| `Settings` | `/settings/` |
| `Profile` | `/profile/` |

**Rules:**
- Page name = Vue router folder name
- Utility pages: `_Components`, `_Tokens`, `_Archive` — start with underscore to separate from product pages
- Never: `Page 1`, `New Page`, `Copy of Dashboard`

---

## Level 2 — Screens (top-level frames on canvas)

Each top-level frame on the canvas is a product screen.

**Format:** `PascalCase` — exactly matching the Vue page component name

| Figma Screen | Vue Component | Route |
|---|---|---|
| `Login` | `AuthLogin.vue` | `/auth/login` |
| `Checkout` | `PaymentCheckout.vue` | `/payment/checkout` |
| `Confirmation` | `PaymentConfirmation.vue` | `/payment/confirmation` |
| `Overview` | `DashboardOverview.vue` | `/dashboard` |
| `EditProfile` | `SettingsEditProfile.vue` | `/settings/profile` |

**Rules:**
- Screen name = component name without any page suffix
- For responsive variants of one screen, use a dot separator: `Checkout`, `Checkout·Mobile`, `Checkout·Tablet`
- Never: `Frame 1234`, `Screen Copy`, `new checkout here`

---

## Level 3 — Components

### 3a — Custom components (built by the team)

**Format:** `PascalCase` — exactly matching the Vue component name

```
PaymentCard       →  <PaymentCard />
TransactionRow    →  <TransactionRow />
UserAvatar        →  <UserAvatar />
FilterChip        →  <FilterChip />
EmptyState        →  <EmptyState />
LoadingOverlay    →  <LoadingOverlay />
```

**Rules:**
- Name starts with the function, not the appearance — `PaymentCard` not `WhiteRoundedBox`
- Never: `Card1`, `new-type`, `Component/payment-card`

---

### 3b — Vuetify primitives

For components that come directly from Vuetify, use the component name without the `V` prefix:

| Figma Component | Vuetify | Vue |
|---|---|---|
| `Btn` | `VBtn` | `<v-btn>` |
| `Card` | `VCard` | `<v-card>` |
| `TextField` | `VTextField` | `<v-text-field>` |
| `Select` | `VSelect` | `<v-select>` |
| `Autocomplete` | `VAutocomplete` | `<v-autocomplete>` |
| `Combobox` | `VCombobox` | `<v-combobox>` |
| `Checkbox` | `VCheckbox` | `<v-checkbox>` |
| `Radio` | `VRadio` | `<v-radio>` |
| `Switch` | `VSwitch` | `<v-switch>` |
| `Slider` | `VSlider` | `<v-slider>` |
| `Chip` | `VChip` | `<v-chip>` |
| `Badge` | `VBadge` | `<v-badge>` |
| `Alert` | `VAlert` | `<v-alert>` |
| `Dialog` | `VDialog` | `<v-dialog>` |
| `Menu` | `VMenu` | `<v-menu>` |
| `Tooltip` | `VTooltip` | `<v-tooltip>` |
| `Snackbar` | `VSnackbar` | `<v-snackbar>` |
| `DataTable` | `VDataTable` | `<v-data-table>` |
| `List` | `VList` | `<v-list>` |
| `ListItem` | `VListItem` | `<v-list-item>` |
| `Tabs` | `VTabs` | `<v-tabs>` |
| `Tab` | `VTab` | `<v-tab>` |
| `ExpansionPanel` | `VExpansionPanel` | `<v-expansion-panel>` |
| `NavigationDrawer` | `VNavigationDrawer` | `<v-navigation-drawer>` |
| `AppBar` | `VAppBar` | `<v-app-bar>` |
| `BottomNavigation` | `VBottomNavigation` | `<v-bottom-navigation>` |
| `ProgressLinear` | `VProgressLinear` | `<v-progress-linear>` |
| `ProgressCircular` | `VProgressCircular` | `<v-progress-circular>` |
| `Skeleton` | `VSkeletonLoader` | `<v-skeleton-loader>` |
| `Img` | `VImg` | `<v-img>` |
| `Icon` | `VIcon` | `<v-icon>` |
| `Avatar` | `VAvatar` | `<v-avatar>` |
| `Divider` | `VDivider` | `<v-divider>` |
| `Sheet` | `VSheet` | `<v-sheet>` |
| `FileInput` | `VFileInput` | `<v-file-input>` |
| `Textarea` | `VTextarea` | `<v-textarea>` |
| `OtpInput` | `VOtpInput` | `<v-otp-input>` |

---

## Level 4 — Variants (component properties in Figma)

**Rule:** Property name in Figma = prop name in Vue. Property value = prop value. Exact match, always.

### Standard variant properties

| Figma Property | Figma Values | Vue Prop | Vue Values |
|---|---|---|---|
| `Variant` | `filled` `outlined` `text` `tonal` `elevated` `plain` | `variant` | same |
| `Color` | `primary` `secondary` `error` `warning` `success` `info` `surface` | `color` | same |
| `Size` | `x-small` `small` `default` `large` `x-large` | `size` | same |
| `Density` | `default` `comfortable` `compact` | `density` | same |

### Boolean properties (checkboxes in Figma)

| Figma Boolean Property | Vue |
|---|---|
| `Disabled` | `:disabled="true"` |
| `Loading` | `:loading="true"` |
| `Error` | `:error="true"` |
| `Readonly` | `:readonly="true"` |
| `Active` | `:active="true"` |
| `Selected` | `:model-value="true"` |

### Slot visibility properties

| Figma Boolean Property | Meaning in Vue |
|---|---|
| `HasPrepend` | `prepend` slot is present |
| `HasAppend` | `append` slot is present |
| `HasIcon` | an icon is displayed inside the component |
| `HasActions` | `actions` slot is present |
| `HasBadge` | a badge is displayed on the component |

---

## Level 5 — Layers inside components

### 5a — Vuetify slot names (first priority)

For layers that map directly to a Vuetify slot, use the exact slot name:

| Figma Layer | Vue Slot | Where used |
|---|---|---|
| `default` | `#default` | main content |
| `prepend` | `#prepend` | before content — left in LTR, right in RTL |
| `append` | `#append` | after content — right in LTR, left in RTL |
| `title` | `#title` | primary heading |
| `subtitle` | `#subtitle` | secondary heading |
| `text` | `#text` | body text |
| `actions` | `#actions` | action buttons area |
| `placeholder` | `#placeholder` | shown while loading |
| `loader` | `#loader` | custom loading indicator |
| `header` | `#header` | top section |
| `item` | `#item` | each item in list or select |

### 5b — Semantic names for custom layers

| Figma Layer | Meaning | Example |
|---|---|---|
| `label` | text label or caption | label above an input |
| `icon` | icon element | icon next to text |
| `content` | main content area | body of a card |
| `header` | top section | top of a dialog |
| `footer` | bottom section | footer of a card |
| `badge` | count or status indicator | number on an icon |
| `avatar` | user image or initials | profile picture |
| `thumbnail` | small preview image | file preview |
| `description` | explanatory text | secondary text in a list item |
| `metadata` | supporting information | date, category |
| `empty` | empty state | empty state illustration + text |
| `error` | error state | error message |

### Names to avoid

| ❌ Wrong | ✓ Correct | Reason |
|---|---|---|
| `Rectangle 5` | `avatar` | Figma auto-generated name |
| `Frame 1234` | `content` | Figma auto-generated name |
| `Group 8` | `header` | Figma auto-generated name |
| `blue-box` | `badge` | describes appearance, not purpose |
| `big-text` | `title` | describes appearance, not purpose |
| `left-icon` | `prepend` | describes position, not meaning |
| `wrapper-div` | `content` | implementation name |
| `Container` | `content` | too generic |

---

## Level 6 — Frames inside a screen

Frames inside a screen (not a component) use `kebab-case`:

```
Checkout (screen)
├── header
├── progress-bar
├── content
│   ├── payment-form
│   │   ├── card-details
│   │   └── billing-address
│   └── order-summary
└── actions
```

These names map directly to the template structure in Vue.

---

## Level 7 — Design Tokens (Variables in Figma)

### Color

**Format:** `color/[role]/[variant]`

```
color/primary/default      →  theme.colors.primary
color/primary/hover        →  darken(primary, 10%)
color/secondary/default    →  theme.colors.secondary
color/error/default        →  theme.colors.error
color/surface/default      →  theme.colors.surface
color/surface/variant      →  theme.colors['surface-variant']
color/on-primary           →  theme.colors['on-primary']
color/on-surface           →  theme.colors['on-surface']
color/outline              →  theme.colors.outline
color/outline-variant      →  theme.colors['outline-variant']
```

### Spacing

**Format:** `spacing/[n]` — value equals `n × 4px`

```
spacing/1   →  4px   →  pa-1 / ma-1
spacing/2   →  8px   →  pa-2 / ma-2
spacing/4   →  16px  →  pa-4 / ma-4
spacing/6   →  24px  →  pa-6 / ma-6
spacing/8   →  32px  →  pa-8 / ma-8
```

### Typography

**Format:** `typography/[scale]`

```
typography/h1             →  text-h1
typography/h2             →  text-h2
typography/h3             →  text-h3
typography/h4             →  text-h4
typography/h5             →  text-h5
typography/h6             →  text-h6
typography/subtitle-1     →  text-subtitle-1
typography/subtitle-2     →  text-subtitle-2
typography/body-1         →  text-body-1
typography/body-2         →  text-body-2
typography/button         →  text-button
typography/caption        →  text-caption
typography/overline       →  text-overline
```

### Border radius

**Format:** `radius/[name]`

```
radius/none   →  rounded-0      →  0px
radius/sm     →  rounded-sm     →  2px
radius/base   →  rounded        →  4px
radius/md     →  rounded-md     →  6px
radius/lg     →  rounded-lg     →  8px
radius/xl     →  rounded-xl     →  12px
radius/pill   →  rounded-pill   →  9999px
radius/circle →  rounded-circle →  50%
```

### Elevation

**Format:** `elevation/[level]`

```
elevation/0   →  elevation-0
elevation/1   →  elevation-1
elevation/2   →  elevation-2
elevation/4   →  elevation-4
elevation/8   →  elevation-8
elevation/12  →  elevation-12
elevation/16  →  elevation-16
elevation/24  →  elevation-24
```

---

## Complete example

A `TransactionRow` component in Figma:

```
TransactionRow (Component)
├── Properties
│   ├── Variant: default | success | error | pending  →  color="default|success|error|warning"
│   ├── Density: default | comfortable | compact      →  density="..."
│   ├── Selected (boolean)                            →  :model-value="true"
│   └── HasActions (boolean)                          →  actions slot is present
│
├── Layers
│   ├── prepend
│   │   └── avatar            →  <v-avatar>
│   ├── content               →  default slot
│   │   ├── title             →  title slot or prop
│   │   ├── description       →  subtitle slot
│   │   └── metadata          →  below description
│   └── append
│       ├── amount            →  prop or slot
│       └── actions           →  actions slot (only when HasActions=true)
```

Vue output:

```vue
<TransactionRow
  color="success"
  density="comfortable"
  :model-value="isSelected"
>
  <template #prepend>
    <v-avatar>...</v-avatar>
  </template>

  <template #title>Bill Payment</template>
  <template #subtitle>2024/05/15</template>

  <template #append>
    <span>450,000 Toman</span>
  </template>

  <template #actions>
    <v-btn variant="text" size="small">Details</v-btn>
  </template>
</TransactionRow>
```

---

## Canvas sections

Use Figma Sections to organize the canvas:

```
[Feature] Screens      →  e.g. Payment Screens
[Feature] Components   →  e.g. Payment Components
[Name] Component       →  e.g. TransactionRow Component (for single component documentation)
_Design System         →  tokens, type scale, color palette
_Archive               →  old designs — kept for reference
```

---

## Handoff checklist

- [ ] All top-level frames (screens) use PascalCase matching their Vue component name
- [ ] All custom components use PascalCase matching their Vue component name
- [ ] No layer has a default Figma name (`Frame`, `Group`, `Rectangle` + number)
- [ ] Variant property names match Vue prop names exactly
- [ ] Boolean properties are used for states (not `Variant=Disabled`)
- [ ] Layers inside components use Vuetify slot names or semantic names
- [ ] Design tokens follow the standard naming format
- [ ] Page names match Vue router module names
