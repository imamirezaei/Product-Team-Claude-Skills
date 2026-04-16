---
description: Analyze the impact of a change before release
---

Analyze the impact of this change before release.

First, run the `release-impact` skill, then run the `qa-guide` skill with its output.

Feature or branch: $ARGUMENTS

If $ARGUMENTS is empty, use the `git diff` of the latest changes.
