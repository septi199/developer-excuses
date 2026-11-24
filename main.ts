import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Developer Excuses — one funny excuse for code breaking in production.
// Gate: /output/entry.txt must be UTF-8 text, 1-200 chars, not only whitespace.
const GATE_MAX_CHARS = 200;

const denial = "The code didn't break in production.";
const twist = "Production finally ran the one code path";
const blame = "our tests were too polite to try.";
const excuse = [denial, twist, blame].join(" ");

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.length > GATE_MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, over the ${GATE_MAX_CHARS} gate`);
  }
}

validateEntry(excuse);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, excuse);
console.log("entry written:", target, `(${excuse.length}/${GATE_MAX_CHARS} chars)`);
