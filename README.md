# anti-slop-biome

Opinionated Biome rules that reject low-evidence and low-signal TypeScript and JavaScript patterns.

This project is inspired by [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop). It reimplements the rules as Biome GritQL plugins. Vendor the rules into your repository, read them, and change them to match your team's standards.

## Install with an agent skill

```bash
npx skills add carterdea/anti-slop-biome --skill install-anti-slop-biome
```

Then ask your coding agent to install or audit anti-slop-biome in the current repository.

## Manual installation

Copy selected files from `rules/` into your repository, for example at `biome-plugins/anti-slop-biome/`, then register each file in `biome.json`:

```json
{
  "plugins": [
    "./biome-plugins/anti-slop-biome/no-chained-type-assertions.grit",
    "./biome-plugins/anti-slop-biome/no-conditional-empty-object-spread.grit"
  ]
}
```

Run `biome lint` or `biome check` normally. Plugin diagnostics can be suppressed with `biome-ignore lint/plugin/<file-name>: reason`, though changing or path-scoping a vendored rule is usually clearer.

## Profiles

The installer skill defines two profiles:

- `core` contains seven direct syntax rules suitable for an initial audit of an existing codebase.
- `strict` adds six rules for teams that intentionally ban runtime `typeof`, `shape` names, and broad `unknown` contracts.

## Rules

| Rule | Profile | Coverage |
| --- | --- | --- |
| `no-chained-type-assertions` | core | Nested `as` and angle-bracket assertions |
| `no-conditional-empty-object-spread` | core | Conditional object spreads with an empty-object branch |
| `no-known-value-widening` | core | Broad annotations on variable declarations with known initializers |
| `no-module-mocking` | core | Vitest and Jest `mock`, `doMock`, and `unstable_mockModule` calls |
| `no-object-parameters` | core | Direct `object` function parameters |
| `no-reflect-apply` | core | Direct and computed global `Reflect.apply` calls |
| `no-reflect-get` | core | Direct and computed global `Reflect.get` calls |
| `no-runtime-typeof` | strict | Runtime `typeof` expressions |
| `no-shape-in-symbol-names` | strict | JavaScript, TypeScript, private, and JSX bindings containing `shape` |
| `no-unknown-parameters` | strict | Direct `unknown` parameters except `cause` |
| `no-unknown-returns` | strict | Direct `unknown`, `Promise<unknown>`, and `PromiseLike<unknown>` returns |
| `no-unknown-type-aliases` | strict | Type aliases directly hiding `unknown` |
| `no-unsafe-dictionary-type` | strict | `Record` and index-signature dictionaries with unsafe value types |

## Parity boundary

GritQL is syntax-aware but does not expose the scope and data-flow APIs used by the Oxlint implementation. This pack does not claim exact parity for alias resolution or flows across bindings.

Two upstream rules are not implemented:

- `no-widen-then-assert` requires reliable binding resolution and flow tracking.
- `require-safety-comment-for-type-assertion` requires attaching comments to assertion owners. Biome's built-in `noUnsafeTypeAssertion` is the cleaner strict alternative when all non-const assertions should be rejected.

The reduced coverage is intentional. A smaller honest rule is better than a broad pattern with noisy false positives.

## Development

```bash
bun install --frozen-lockfile
bun run sync:skill-assets
bun run check
```

`rules/` is canonical. Run `bun run sync:skill-assets` after changing a rule; tests verify that the installer assets remain identical.

## License

MIT
