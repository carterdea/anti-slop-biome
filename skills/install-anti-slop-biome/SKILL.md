---
name: install-anti-slop-biome
description: Install or audit the anti-slop-biome GritQL rule pack in a JavaScript or TypeScript repository that uses Biome. Use when a user asks to add anti-slop rules, tighten Biome against low-evidence TypeScript patterns, compare a repository against anti-slop, or vendor the rule pack.
compatibility: Requires Biome 2.x and a JavaScript or TypeScript repository.
---

# Install anti-slop-biome

Vendor the rules into the target repository so the team owns and can tune them.

## Workflow

1. Read the target repository's instructions and Biome configuration.
2. Confirm it uses Biome 2.x. Do not add or upgrade Biome unless the user asked.
3. Choose a profile from `references/profiles.md`. Default to `core` for an existing codebase and `strict` for a new codebase.
4. Copy the selected files from `assets/rules/` to `biome-plugins/anti-slop-biome/` in the target repository.
5. Add the copied relative paths to the existing top-level `plugins` array. Preserve its current entries and formatting.
6. Run Biome against a narrow representative path first. Treat the result as an audit, not an instruction to rewrite the code mechanically.
7. Identify false positives and project-policy conflicts. Remove or path-scope rules that do not fit the repository.
8. Run the repository's normal lint command after the profile is agreed.

Do not run `--write` while evaluating the pack. These rules intentionally provide diagnostics without automatic rewrites.

## Handoff

Report:

- installed profile and rule names
- files copied and configuration changed
- diagnostic counts by rule
- confirmed false positives or policy conflicts
- rules left disabled and why

Keep the distinction between GritQL syntax coverage and Oxlint's scope-aware behavior explicit.
