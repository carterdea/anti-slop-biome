import { describe, expect, test } from "bun:test";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const biome = join(root, "node_modules/.bin/biome");

const runLint = (fixture: string) =>
  Bun.spawnSync({
    cmd: [
      biome,
      "lint",
      "--config-path",
      join(root, "biome.json"),
      "--max-diagnostics=none",
      join(root, "tests/fixtures", fixture),
    ],
    stderr: "pipe",
    stdout: "pipe",
  });

const diagnosticFragments = [
  "assertion chain discards type evidence",
  "conditional spread hides property omission",
  "explicit broad type discards known value evidence",
  "Replace module mocking",
  "parameter uses the broad `object` type",
  "Replace `Reflect.apply`",
  "Replace `Reflect.get`",
  "A `typeof` check narrows a representation",
  "Rename this symbol for its domain role",
  "parameter leaves input unparsed",
  "function exposes `unknown`",
  "type alias hides `unknown`",
  "dictionary value type gives callers no concrete contract",
] as const;

describe("rule pack", () => {
  test("every rule reports its invalid fixture", () => {
    const result = runLint("invalid.ts");
    const output = `${result.stdout.toString()}\n${result.stderr.toString()}`;

    expect(result.exitCode).not.toBe(0);
    for (const fragment of diagnosticFragments) expect(output).toContain(fragment);
  });

  test("valid fixture has no diagnostics", () => {
    const result = runLint("valid.ts");
    expect(result.exitCode).toBe(0);
  });

  test("installer assets match canonical rules", async () => {
    const rulesDirectory = join(root, "rules");
    const assetsDirectory = join(root, "skills/install-anti-slop-biome/assets/rules");
    const files = (await readdir(rulesDirectory)).filter((file) => file.endsWith(".grit")).sort();
    const assetFiles = (await readdir(assetsDirectory)).sort();

    expect(assetFiles).toEqual(files);

    await Promise.all(
      files.map(async (file) => {
        const [rule, asset] = await Promise.all([
          readFile(join(rulesDirectory, file), "utf8"),
          readFile(join(assetsDirectory, file), "utf8"),
        ]);
        expect(asset).toBe(rule);
      }),
    );
  });
});
