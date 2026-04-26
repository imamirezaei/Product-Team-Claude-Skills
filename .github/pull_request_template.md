<!--
  Thanks for opening a PR! Please fill out this template.
  See CONTRIBUTING.md for full guidelines.
-->

## Summary

<!-- One or two sentences describing what changed and why. -->

## Type of change

- [ ] Bug fix (existing skill / command / code)
- [ ] New skill or command
- [ ] New role
- [ ] CLI code change
- [ ] Documentation
- [ ] Translation
- [ ] Other:

## Linked issue

<!-- "Closes #123" if this PR closes an issue, or "Refs #123" if related. -->

Closes #

## Checklist

- [ ] I forked the repo and worked on a feature branch (not `main`)
- [ ] Commits follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, etc.)
- [ ] `npm test` passes locally
- [ ] `npm run validate:skills` passes locally
- [ ] If I added a skill / command, it has correct frontmatter (`name`, `description`)
- [ ] If I added a role, both `<role>-template/` and `ROLE_CONFIG` are updated
- [ ] I manually tested `node bin/cli.js init` in a temp repo (if CLI behavior changed)
- [ ] Docs / README updated if user-facing behavior changed

## Notes for the maintainer

<!-- Anything reviewer should know — context, screenshots, edge cases. -->
