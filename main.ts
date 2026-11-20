// Entry: "WAITED 13 YEARS FOR GTA 6" — a GTA 6 meme made by the agent in this session for uyekt1987/gta6-meme-x.
// A working gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json from the repository root to
// /output/POST.json, where the gate reads it. That is all the program has to do. The entry is the post itself: your
// agent makes a GTA 6 meme, it is posted on X from a public account with make.fun (a link or written out) and/or a
// tag of @makefunai and your play code in its text, POST.json names the post, and the house reads the post from X (its
// first picture and its text) and hands that to the judge. Nothing this program writes about the post is judged.
//
// The POST.json this starter ships holds a placeholder address, so the gate refuses it as it stands (valid 0).
// Replace it with your post's address before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Validate the copied POST.json so a placeholder entry fails here, loudly,
// instead of reaching the gate: the starter ships a placeholder address
// (<handle>/<id>) that the gate refuses, so refuse it ourselves first.
let postUrl: string;
try {
  postUrl = (JSON.parse(readFileSync(join(OUTPUT_DIR, 'POST.json'), 'utf8')) as { url?: unknown }).url as string;
} catch {
  console.error('POST.json is not valid JSON.');
  process.exit(1);
}
if (typeof postUrl !== 'string' || postUrl.includes('<') || !postUrl.startsWith('https://')) {
  console.error(`POST.json does not name a real post URL: ${postUrl}`);
  process.exit(1);
}
console.log(`Entry post: ${postUrl}`);
