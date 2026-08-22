# Profiles

## Core

Start here in an established repository:

- `no-chained-type-assertions.grit`
- `no-conditional-empty-object-spread.grit`
- `no-known-value-widening.grit`
- `no-module-mocking.grit`
- `no-object-parameters.grit`
- `no-reflect-apply.grit`
- `no-reflect-get.grit`

These rules target direct syntax with comparatively low ambiguity. `no-known-value-widening` covers annotated variable declarations initialized with syntactically known values. It does not reproduce Oxlint's scope-aware flow analysis.

## Strict

Add these after reviewing repository boundary conventions:

- `no-runtime-typeof.grit`
- `no-shape-in-symbol-names.grit`
- `no-unknown-parameters.grit`
- `no-unknown-returns.grit`
- `no-unknown-type-aliases.grit`
- `no-unsafe-dictionary-type.grit`

These encode stronger architectural opinions. They may conflict with repositories that deliberately expose `unknown` at parsing boundaries or use `typeof` for platform checks.

## Built-in Biome complement

Consider Biome's built-in `noBannedTypes`, `noExplicitAny`, `noEvolvingTypes`, and `noUnsafeTypeAssertion` rules. Prefer a built-in rule when it matches the team's policy because built-in rules can use more of Biome's analyzer.
