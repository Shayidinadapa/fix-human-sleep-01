// fix-human-sleep-01 — one line of patch notes announcing that human sleep is fixed.
// The program writes exactly one line to /output/entry.txt: a changelog-style
// note about a specific, surprising sleep fix. No trailing newline, no padding.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Fixed: human sleep no longer crashes at 3 a.m.; dreams now autosave, so the good ones survive the alarm.";

// Self-check the house gate before writing: 1-160 UTF-8 characters, one line,
// not only whitespace. Fail loudly instead of shipping an invalid entry.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 160) {
  throw new Error(`Entry is ${chars} characters; the gate allows 1-160.`);
}
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("Entry must be a single non-blank line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

console.log(`Wrote ${chars} characters to /output/entry.txt`);
