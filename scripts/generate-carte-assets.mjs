/**
 * Generates the baked assets the digital business card needs:
 *
 *   1. public/carte-qr.svg         — the QR code, styled to match the brand
 *   2. public/carte-icon.png       — home-screen icon (iOS rejects SVG here)
 *   3. public/carte-portrait.jpg   — the card's portrait, pre-sized for 88px @3x
 *   4. src/lib/carte-generated.ts  — base64 photo for the vCard + blur placeholder
 *
 * All are committed to the repo. Nothing here runs at request time or during
 * `next build`, so the site ships with zero QR/image dependencies.
 *
 * Regenerate with:  npm run carte:assets
 *
 * qrcode and sharp are devDependencies only — nothing here ends up in the
 * client bundle or in a server runtime.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import QRCode from "qrcode";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Must match CARD.cardUrl. Changing it invalidates every printed/shown QR. */
const TARGET_URL = "https://samueldt.com/carte";

const DARK = "#0a0d18";
const QUIET_ZONE = 4; // modules — below 4 and some scanners fail
const CORNER = 0.3; // module corner radius, as a fraction of module size

/**
 * Renders the QR matrix by hand rather than using QRCode.toString(), so the
 * modules can be rounded and the finder patterns styled. Error correction is
 * pinned to "H" (~30% recoverable) precisely because the styling eats into the
 * scanner's margin for error.
 */
function renderQrSvg(matrix, size) {
  const total = size + QUIET_ZONE * 2;
  const parts = [];

  const isFinder = (row, col) =>
    (row < 7 && col < 7) ||
    (row < 7 && col >= size - 7) ||
    (row >= size - 7 && col < 7);

  // Data + timing modules, as individually rounded squares.
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!matrix[row * size + col]) continue;
      if (isFinder(row, col)) continue;
      parts.push(
        `<rect x="${col + QUIET_ZONE}" y="${row + QUIET_ZONE}" width="1" height="1" rx="${CORNER}"/>`,
      );
    }
  }

  // Finder patterns: drawn as three deliberate shapes instead of 49 squares each.
  for (const [row, col] of [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ]) {
    const x = col + QUIET_ZONE;
    const y = row + QUIET_ZONE;
    parts.push(
      `<rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" rx="1.8" fill="none" stroke="${DARK}" stroke-width="1"/>`,
      `<rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx="0.9"/>`,
    );
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="geometricPrecision" role="img" aria-label="QR code linking to ${TARGET_URL}">`,
    `<rect width="${total}" height="${total}" fill="#ffffff"/>`,
    `<g fill="${DARK}">${parts.join("")}</g>`,
    `</svg>`,
  ].join("");
}

/**
 * The home-screen icon.
 *
 * iOS ignores SVG for `apple-touch-icon` — it silently falls back to a
 * screenshot of the page — so this has to be a real PNG. iOS also applies its
 * own squircle mask, hence the full-bleed square with the glyph inset.
 */
async function generateIcon() {
  const M = 180; // apple-touch-icon, @3x for a 60pt slot
  const g = 112; // glyph box
  const o = (M - g) / 2; // glyph origin

  const finder = (x, y) =>
    `<rect x="${o + x}" y="${o + y}" width="30" height="30" rx="10" fill="none" stroke="url(#warm)" stroke-width="7"/>` +
    `<rect x="${o + x + 11}" y="${o + y + 11}" width="8" height="8" rx="2.5" fill="url(#warm)"/>`;

  // A handful of data modules — enough to read as a QR at 60pt, not a real code.
  const modules = [
    [44, 4], [44, 16], [56, 10], [68, 4], [80, 16], [92, 10],
    [4, 44], [16, 44], [10, 56], [4, 68], [16, 80], [10, 92],
    [44, 44], [56, 56], [68, 44], [44, 68], [80, 56], [92, 80],
    [56, 92], [68, 80], [92, 44], [80, 92], [44, 92], [68, 68],
  ]
    .map(
      ([x, y]) =>
        `<rect x="${o + x}" y="${o + y}" width="8" height="8" rx="2.5" fill="url(#warm)"/>`,
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${M}" height="${M}" viewBox="0 0 ${M} ${M}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#171b2b"/><stop offset="1" stop-color="#080b14"/>
      </linearGradient>
      <linearGradient id="warm" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f8c882"/><stop offset="0.5" stop-color="#f0a050"/><stop offset="1" stop-color="#e8734a"/>
      </linearGradient>
    </defs>
    <rect width="${M}" height="${M}" fill="url(#bg)"/>
    ${finder(0, 0)}${finder(82, 0)}${finder(0, 82)}
    ${modules}
  </svg>`;

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(join(ROOT, "public", "carte-icon.png"), png);
  console.log(`icon      ${M}x${M} png -> public/carte-icon.png (${(png.length / 1024).toFixed(1)} KB)`);
}

async function generateQr() {
  const qr = QRCode.create(TARGET_URL, { errorCorrectionLevel: "H" });
  const { size, data } = qr.modules;
  const svg = renderQrSvg(data, size);

  const out = join(ROOT, "public", "carte-qr.svg");
  await writeFile(out, svg + "\n", "utf8");
  console.log(`qr        ${size}x${size} modules -> public/carte-qr.svg (${svg.length} bytes)`);
}

const SOURCE_PHOTO = join(ROOT, "public", "samuel.JPG");

/** `.rotate()` first so EXIF orientation is applied before any crop. */
const square = (size, quality) =>
  sharp(SOURCE_PHOTO)
    .rotate()
    .resize(size, size, { fit: "cover", position: "attention" })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

async function generatePhotos() {
  // 256px is plenty for the vCard: contact apps render it at ~60-120px.
  const avatar = await square(256, 72);

  // The card shows the portrait at 88px CSS, so 264px covers a 3x display.
  // Pre-sizing it means the LCP element is a ~15 KB file rather than the 57 KB
  // original going through image optimisation on the first ever request.
  const portrait = await square(264, 82);
  await writeFile(join(ROOT, "public", "carte-portrait.jpg"), portrait);

  // A 16px thumbnail is enough to hint at the composition behind a blur filter.
  const blur = await square(16, 55);
  const blurUrl = `data:image/jpeg;base64,${blur.toString("base64")}`;

  const base64 = avatar.toString("base64");

  const contents = `/**
 * GENERATED FILE — do not edit by hand.
 * Run \`node scripts/generate-carte-assets.mjs\` to regenerate.
 */

/**
 * A 256x256 JPEG of public/samuel.JPG, base64-encoded for the vCard's PHOTO
 * field so the saved contact shows a face. Inlined as a module rather than read
 * from disk so the vCard route stays fully static, with no filesystem or image
 * dependency at build or request time.
 */
export const AVATAR_BASE64 =
  "${base64}";

/** 16x16 placeholder behind the card portrait while it decodes. */
export const PORTRAIT_BLUR_DATA_URL =
  "${blurUrl}";
`;

  const out = join(ROOT, "src", "lib", "carte-generated.ts");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, contents, "utf8");

  console.log(
    `portrait  264x264 jpeg -> public/carte-portrait.jpg (${(portrait.length / 1024).toFixed(1)} KB)`,
  );
  console.log(
    `avatar    256x256 jpeg -> src/lib/carte-generated.ts (${(base64.length / 1024).toFixed(1)} KB base64) + ${(blurUrl.length / 1024).toFixed(1)} KB blur`,
  );
}

await generateQr();
await generateIcon();
await generatePhotos();
