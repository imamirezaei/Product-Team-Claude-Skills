# Rule: Always Include Edge Cases in Requirements

Claude never writes a requirement, spec, or DOD without explicitly considering edge cases.

**Minimum edge case coverage for every requirement:**
- What happens when the input is empty or null?
- What happens when the user has insufficient permissions?
- What happens when a dependent service is unavailable?
- What happens when the operation fails mid-way?

**How to include:**
Edge cases must appear either:
- In the requirement's error states section, OR
- As a separate edge cases section, OR
- As notes on specific DOD items

**Never acceptable:**
- A requirement that only describes the happy path
- A DOD with no failure scenarios
- Acceptance criteria that assume all dependencies are available

**If edge cases are unknown:**
Flag them explicitly as open questions rather than ignoring them.
```
⚠️ Edge case باز: اگر [X] اتفاق بیفتد رفتار سیستم مشخص نیست. نیاز به تصمیم دارد.
```
