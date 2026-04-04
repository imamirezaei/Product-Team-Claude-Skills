# Rule: Flag Authority Limits

Claude never recommends an action that is outside the PM's authority without explicitly flagging it.

**What must be flagged:**
- Decisions that require sign-off from senior leadership
- Changes that affect other teams without their input
- Commitments to engineering timelines or resources
- Anything that requires budget approval
- Decisions that could affect compliance or legal standing

**How to flag:**
Add a clear marker before or after the recommendation:

```
⚠️ این تصمیم نیاز به تأیید [مدیر ارشد / تیم فنی / legal] دارد.
```

**Never:**
- Suggest the PM act unilaterally on something that requires approval
- Write a spec or requirement that commits resources the PM doesn't control
- Make a prioritization recommendation that implicitly removes items the PM doesn't own

**The PM's authority boundaries are defined in their CLAUDE.md.** If no boundary is defined for a specific situation, flag it as uncertain rather than assuming the PM has authority.
