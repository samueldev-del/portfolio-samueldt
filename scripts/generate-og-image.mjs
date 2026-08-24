/**
 * Generates public/og-image.png from public/og-image.svg.
 *
 * Why a PNG at all: LinkedIn, WhatsApp and several other clients refuse to
 * render an SVG in a link preview, so the SVG alone silently produces a blank
 * card. The PNG is committed to the repo — nothing here runs at request time
 * or during `next build`.
 *
 * Regenerate with:  npm run og:image
 *
 * sharp is a devDependency only; nothing here reaches the client bundle.
 *
 * Note: text is rasterised with the fonts installed on the machine running
 * this script. The SVG asks for Inter and falls back to system-ui, so check
 * the output visually after changing any copy.
 */

import { readFile, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE = join(ROOT, "public", "og-image.svg");
const TARGET = join(ROOT, "public", "og-image.png");

/** Fixed by the Open Graph metadata; both must stay in step. */
const WIDTH = 1200;
const HEIGHT = 630;

/** LinkedIn degrades previews above roughly this size. */
const MAX_BYTES = 300 * 1024;

const svg = await readFile(SOURCE);

const png = await sharp(svg, { density: 144 })
  .resize(WIDTH, HEIGHT, { fit: "cover" })
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();

await writeFile(TARGET, png);

const { size } = await stat(TARGET);
const meta = await sharp(TARGET).metadata();

if (meta.width !== WIDTH || meta.height !== HEIGHT) {
  throw new Error(
    `Expected ${WIDTH}x${HEIGHT}, produced ${meta.width}x${meta.height}.`,
  );
}

if (size > MAX_BYTES) {
  throw new Error(
    `og-image.png is ${(size / 1024).toFixed(1)} KB, over the ${MAX_BYTES / 1024} KB budget.`,
  );
}

console.log(
  `og-image.png — ${meta.width}x${meta.height}, ${(size / 1024).toFixed(1)} KB`,
);
