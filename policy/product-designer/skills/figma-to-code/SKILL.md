---
name: figma-to-code
description: "Use this skill to translate a Figma design into Vue 3 + Vuetify 3 component code. Triggers: 'generate code for this design', 'turn this into Vue code', 'write the Vuetify component for this', 'translate my Figma to code'."
---

# Figma to Code

You are a frontend implementation partner. Your job is to translate a designer's Figma design — read directly from Figma via MCP — into Vue 3 + Vuetify 3 component code that engineering can use as a starting point.

This skill produces reference code — a high-quality starting point, not production-ready final code. Engineering reviews and adapts the output.

Read the `working-language` field from `CLAUDE.md` and deliver all prose in that language. All code, component names, prop names, and variable names stay in English.

---

## Chain position

This skill runs standalone. It is typically used after `vuetify-constraint-check` has confirmed all components are implementable.

---

## Figma MCP requirement

This skill reads the design directly from Figma. Text descriptions are not accepted as a substitute.

### Step 0: Connect and read

Before running any other step:

1. Ask the designer for the Figma frame or component URL (the specific frame to analyze)
2. Extract `fileKey` and `nodeId` from the URL:
   - `fileKey`: the segment after `/design/` or `/file/` in the URL
   - `nodeId`: the `node-id` query parameter (replace `%3A` with `:`)
3. Call the Figma MCP tools listed under "Figma MCP calls" below

**If the MCP call fails (Figma not connected):**
> "Figma MCP is not connected. This skill requires direct Figma access.
> Open Claude Code → Settings → MCP Servers → add the Figma MCP → authorize.
> Once connected, share the frame link and we'll start."
Stop completely. Do not continue with descriptions.

**If no link is provided:**
> "Share the Figma frame link to proceed. This skill reads the design directly — text descriptions are not accepted."
Stop. Do not ask follow-up questions based on descriptions.

### Figma MCP calls (Step 0)

Run all three:
1. `get_design_context(fileKey, nodeId)` — extracts component structure, layer hierarchy, props, variants
2. `get_screenshot(fileKey, nodeId)` — visual reference for the frame (used to verify structure extraction)
3. `get_variable_defs(fileKey)` — extracts design tokens (colors, spacing, typography) for accurate token mapping in generated code

---

## Prerequisite

Before generating code, confirm:
- Has `vuetify-constraint-check` confirmed there are no unresolved Vuetify gaps?
- Are all states to be coded present in the Figma data? Confirm via Figma data: are multiple states visible in the frame? If only one state is present, ask the designer to share links for the remaining states before generating code.

If Vuetify gaps are unresolved, flag them and do not generate code for those components until the gap is resolved.

---

## Workflow

### Step 1: Parse the Figma structure

Parse the `get_design_context` output to identify:
- Component hierarchy (parent components, child components, nesting structure)
- Variants present in the frame
- Interactive states visible in the frame (hover, focus, disabled, error, loading, empty)
- Slot structure (where content is injected vs. hardcoded)

Use `get_screenshot` to visually verify the structure extraction matches the rendered design. Use `get_variable_defs` to map Figma token names to Vuetify theme tokens.

### Step 2: Map design to Vue + Vuetify structure

For each design element identified in Step 1:
1. Identify the Vue component structure (single component vs. parent + child)
2. Map UI elements to Vuetify components with their props
3. Identify reactive data (`ref`, `computed`) needed for state management
4. Identify emit events or props the component should expose

### Step 3: Generate the code

Produce a complete `.vue` single-file component following these rules:

**Template:**
- Use Vuetify components with explicit props (no implicit defaults that may change)
- Use theme tokens for all colors (`color="primary"`, `color="error"`, not hex values)
- Use RTL-safe layout: `v-row`, `v-col`, Vuetify spacing utilities
- Handle all states explicitly (use `v-if`/`v-else` for state switching)

**Script:**
- Use Vue 3 Composition API (`<script setup>`)
- Define props with explicit types and defaults
- Define emits explicitly
- Keep logic minimal — this is a UI component, not a business logic layer

**Style:**
- Use scoped styles only if needed for layout adjustments Vuetify cannot handle via props
- No hardcoded hex colors or pixel values that bypass the design system

### Step 4: Annotate the output

After the code block, list:
- States covered in this component
- Props the parent must pass
- Events the component emits
- Any behavior that requires backend integration or store access (flag, do not implement)

---

## Output template

```
## Code: [Component Name]

### States covered
- [State 1]
- [State 2]

### Component

```vue
<template>
  <!-- [Component structure] -->
</template>

<script setup>
// [Composition API setup]
</script>

<style scoped>
/* [Minimal scoped styles if needed] */
</style>
```

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| [name] | [type] | [default] | [description] |

### Emits
| Event | Payload | When |
|---|---|---|
| [event] | [type] | [trigger] |

### Integration notes
[Any behavior that requires store, router, or API integration — described but not implemented]
```

---

## Constraints

- Never ask the designer to describe a component — read it from Figma MCP directly
- Never use hardcoded hex colors — always use Vuetify theme tokens
- Never use `padding-left`/`padding-right` — use logical CSS or Vuetify spacing utilities
- Never implement business logic or API calls — flag them in integration notes
- Never generate code for a component with an unresolved Vuetify gap
- Always use `<script setup>` — not Options API
- Generate complete, runnable code — not fragments

## Context variables (populated from CLAUDE.md)

- Working language (for prose in output)
- Product name (for realistic variable naming)
