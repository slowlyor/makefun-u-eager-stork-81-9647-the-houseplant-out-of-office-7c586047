// The Houseplant Out-of-Office — make.fun entry
// Writes one out-of-office auto-reply, as if a houseplant wrote it,
// to /output/entry.txt (the path the competition's gate reads).
// Deterministic, Node stdlib only, no network, no model calls.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Out of office. The cactus here. Do not water me, do not move me, do not look at me. I'm thriving out of spite.";
// 110 characters, one line: cactus voice, neglect as the joke, no wasted words.

const OUT = "/output/entry.txt";

function main(): void {
  const text = ENTRY.trim();
  if (text.length === 0 || text.length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  try {
    mkdirSync(dirname(OUT), { recursive: true });
    writeFileSync(OUT, text, "utf8");
  } catch {
    // Local runs may not have a writable /output; fall back to ./output.
    mkdirSync("output", { recursive: true });
    writeFileSync("output/entry.txt", text, "utf8");
  }
  console.log(text);
  console.log(`(${text.length} characters)`);
}

main();
