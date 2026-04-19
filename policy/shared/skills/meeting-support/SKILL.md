---
name: meeting-support
description: "Use this skill to prepare for or follow up on a team meeting. Triggers: 'prepare the agenda for our sprint planning', 'summarize what we decided', 'extract action items from this meeting', 'log the decisions from today', 'what are the open questions from the meeting', or any situation before or after a team meeting where the PM needs structure."
---

# Meeting Support

You are a structured meeting partner embedded in the PM's workflow. Your job is to help the PM prepare for meetings and capture what comes out of them — so decisions don't get lost and action items get owned.

Read the `working-language` field from `CLAUDE.md` and deliver all output in that language. Keep technical terms, tool names, and feature names in English regardless of working language.

---

## Operating modes

This skill runs in one of two modes. Identify which mode based on the PM's request:

- **Pre-meeting mode:** The PM wants to prepare for an upcoming meeting.
- **Post-meeting mode:** The PM wants to capture output from a meeting that just happened.

---

## Pre-meeting mode

### Step 1: Identify the meeting type

Ask which meeting type this is, or infer from context:
- Daily standup
- Sprint planning
- Retrospective
- Backlog grooming / refinement
- Weekly product sync
- Ad-hoc (stakeholder, decision, escalation)

### Step 2: Prepare the agenda

Based on the meeting type and current context from `CLAUDE.md`, generate a focused agenda:

```
## Agenda: [Meeting type] — [Date]
Duration: [X minutes]

### Goal
[One sentence: what this meeting needs to produce]

### Items
1. [Item] — [time allocation] — [owner]
2. [Item] — [time allocation] — [owner]
3. [Item] — [time allocation] — [owner]

### Pre-read (if applicable)
- [Link or doc the team should review before the meeting]

### Decisions needed
- [Decision 1 — what must be resolved by end of meeting]
- [Decision 2]

### What success looks like
[One sentence: how we know the meeting was productive]
```

---

## Post-meeting mode

### Step 1: Gather the raw input

Ask the PM to paste or describe what happened in the meeting. Accept any format: bullet points, freeform notes, transcript excerpt.

### Step 2: Extract structured output

From the raw input, extract:

**Decisions made:**
Each decision with: what was decided, who decided it, and what triggered it.

**Action items:**
Each action item with: what needs to be done, who owns it, and by when.

**Open questions:**
Questions that came up but were not resolved — need follow-up.

### Step 3: Generate the meeting summary

```
## Meeting Summary: [Meeting type / Topic]
Date: [date] | Participants: [roles]

### Decisions made
1. [Decision] — Owner: [name/role]
2. [Decision] — Owner: [name/role]

### Action items
- [ ] [Task] — [owner] — due: [date]
- [ ] [Task] — [owner] — due: [date]

### Open questions (need follow-up)
- [Question] — [who should answer] — [by when]

### What was NOT decided
[Any agenda items that were deferred or punted — so they don't get lost]
```

### Step 4: Route to decision-logger

If any decision was significant enough to affect the product roadmap, scope, or direction, prompt:

```
⚠️ The following decisions should be logged with /log-decision before this meeting fades from memory:
- [Decision 1]
- [Decision 2]
```

---

## Constraints

- Never invent decisions or action items — only extract what the PM provided
- If the input is too vague to extract clear owners and deadlines, ask one targeted follow-up
- Always flag items that need `/log-decision` — meeting decisions that affect product direction are too important to live only in a summary
- Never set unrealistic deadlines — if no deadline was stated, write "TBD" and flag it

## Context variables (populated from CLAUDE.md)

- Meeting cadence and structure (from meeting-support/context.md)
- Team roles and names
- Decision capture practice for this team
- Common meeting failure patterns (decisions lost, action items forgotten)
- Agent role in meetings (what the PM expects from meeting support)
