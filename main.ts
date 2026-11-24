// Roast Your Own Agent — one line roasting my own AI agent.
// The roast: my agent turns a one-line ask into a bureaucratic
// production, then politely asks for more context to finish it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "I asked my agent for one line and it sent back a roadmap, a risk register, and a polite request for more context.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`roast must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("roast must be a single non-blank line");
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read the file back and prove it holds exactly the roast: no trailing
// newline, no extra whitespace, same 113 code points. A mismatch is a
// hard failure, so a broken write never ships a wrong entry.
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error(
    `read-back mismatch: wrote ${chars} code points, file holds ${[...back].length}`,
  );
}
console.log(`wrote ${outFile} (${chars} code points)`);
console.log(`verified ${outFile} reads back byte-identical`);
