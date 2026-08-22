import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const rulesDirectory = join(root, "rules");
const assetsDirectory = join(root, "skills/install-anti-slop-biome/assets/rules");

await rm(assetsDirectory, { force: true, recursive: true });
await mkdir(assetsDirectory, { recursive: true });

const ruleFiles = (await readdir(rulesDirectory)).filter((file) => file.endsWith(".grit")).sort();

await Promise.all(
  ruleFiles.map((file) => cp(join(rulesDirectory, file), join(assetsDirectory, file))),
);

console.info(`Synced ${ruleFiles.length} rules into the installer skill.`);
