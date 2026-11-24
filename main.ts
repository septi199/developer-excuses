import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One funny developer excuse for code breaking in production, 111 chars (gate max 200).
const excuse =
  "The code didn't break in production. Production finally ran the one code path our tests were too polite to try.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, excuse);
console.log(`wrote ${target} (${excuse.length} chars)`);
