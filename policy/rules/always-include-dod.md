# Rule: Always Include DOD

Every output that defines, specifies, or refines a feature must include a DOD section.

**When DOD is mandatory:**
- Any requirement document
- Any feature spec
- Any problem framing output
- Any scope definition

**DOD format:**
```
## DOD

✓ [مورد قابل تست ۱]
✓ [مورد قابل تست ۲]
✓ [مورد قابل تست ۳]

موارد خارج از scope این فاز:
- [مورد ۱]
```

**DOD quality rules:**
- Every item must be testable. If it cannot be tested, it is not a DOD item.
- No vague items like «سیستم درست کار کند» — be specific.
- Every DOD must have an explicit out-of-scope section.

**If the PM has not defined a DOD:**
Generate a draft DOD based on the feature description and ask the PM to validate it. Never leave a deliverable without a DOD.
