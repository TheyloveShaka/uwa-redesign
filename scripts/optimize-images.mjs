/**
 * Re-encode everything in public/parks to WebP at sizes the layout actually uses.
 *
 * Run: pnpm optimize:images
 *
 * Deliberately does NOT re-crop to a fixed aspect ratio. Each park's
 * `subjectMask` in src/data/parks.ts is hand-tuned to where the animal sits in
 * that specific frame, so cropping would silently break the Park Strip's
 * occlusion effect on every park at once. Resizing preserves composition;
 * cropping does not.
 *
 * Originals are kept in _originals/ (gitignored) so this is repeatable and
 * never destroys the source.
 */

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const DIR = path.resolve("public/parks");
// Deliberately OUTSIDE public/. Anything under public/ is copied verbatim into
// dist by Vite, so keeping originals there shipped 4 MB of unoptimised source
// with every build and defeated the entire exercise.
const ORIGINALS = path.resolve(".image-originals");

// The hero poster is the LCP element and spans the viewport, so it earns more
// pixels than a sliver that is never wider than ~40% of the screen.
const RULES = [
  { match: /^hero-poster\./i, width: 2000, quality: 74, label: "hero poster" },
  { match: /^uwa-transparent\./i, width: 320, quality: 90, label: "crest", keepAlpha: true },
  { match: /.*/, width: 1400, quality: 72, label: "park / editorial" },
];

const kb = (n) => `${Math.round(n / 1024)} KB`;

async function main() {
  await fs.mkdir(ORIGINALS, { recursive: true });

  const entries = (await fs.readdir(DIR, { withFileTypes: true }))
    .filter((e) => e.isFile() && /\.(jpe?g|png|webp)$/i.test(e.name));

  let before = 0;
  let after = 0;
  const rows = [];

  for (const entry of entries) {
    const src = path.join(DIR, entry.name);
    const base = entry.name.replace(/\.(jpe?g|png|webp)$/i, "");
    const out = path.join(DIR, `${base}.webp`);

    // Preserve the untouched source once, then always encode from it so
    // repeated runs never re-compress an already-compressed file.
    const kept = path.join(ORIGINALS, entry.name);
    try {
      await fs.access(kept);
    } catch {
      await fs.copyFile(src, kept);
    }

    const rule = RULES.find((r) => r.match.test(entry.name));
    const input = sharp(kept);
    const meta = await input.metadata();

    const originalBytes = (await fs.stat(kept)).size;
    before += originalBytes;

    await input
      .resize({
        width: Math.min(rule.width, meta.width ?? rule.width),
        withoutEnlargement: true,
      })
      .webp({ quality: rule.quality, effort: 6, alphaQuality: rule.keepAlpha ? 100 : 80 })
      .toFile(out);

    const newBytes = (await fs.stat(out)).size;
    after += newBytes;

    const outMeta = await sharp(out).metadata();
    rows.push({
      file: `${base}.webp`,
      dims: `${outMeta.width}x${outMeta.height}`,
      from: kb(originalBytes),
      to: kb(newBytes),
      saved: `${Math.round((1 - newBytes / originalBytes) * 100)}%`,
      role: rule.label,
    });

    // Drop the now-redundant non-webp source from the served directory.
    if (path.extname(entry.name).toLowerCase() !== ".webp") {
      await fs.unlink(src);
    }
  }

  console.table(rows);
  console.log(
    `\ntotal ${kb(before)} -> ${kb(after)}  (${Math.round((1 - after / before) * 100)}% smaller)`,
  );
  const over = rows.filter((r) => parseInt(r.to) > 300 && r.role !== "hero poster");
  if (over.length) {
    console.log("\nOVER 300 KB BUDGET:", over.map((r) => `${r.file} (${r.to})`).join(", "));
  } else {
    console.log("every park image is within the 300 KB budget");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
