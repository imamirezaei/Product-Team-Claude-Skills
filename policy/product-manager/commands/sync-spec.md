---
description: Compare the feature spec with the current implementation and surface any drift
---

Check whether the feature spec is still aligned with what has actually been built.

Run the `feature-dependency` skill to read the current implementation, then compare it against the existing feature spec for this feature.

For each difference found:
1. State what the spec says
2. State what the implementation actually does
3. Classify the drift: **spec is outdated** / **implementation deviated** / **needs PM decision**
4. Propose a specific update to the spec or flag it as a decision

Do not update any spec file automatically. Present the proposed changes and wait for PM approval before applying them.

Feature or spec to check: $ARGUMENTS

If $ARGUMENTS is empty, ask the PM which feature spec to check, or use the most recently modified spec file.
