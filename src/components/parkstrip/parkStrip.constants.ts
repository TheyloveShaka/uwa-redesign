import type { Park } from "../../data/parks";

/**
 * Intrinsic pixel dimensions of each park's photograph, read directly off
 * the files in public/parks/. Passed through as the <img> width/height
 * attributes so the browser can reserve the right box before the byte
 * arrives — `object-fit: cover` re-crops it visually, but without a
 * declared intrinsic size the browser has nothing to size the box against
 * and the layout jumps as each photo decodes (the CLS the perf budget in
 * §7 targets at ~0).
 */
export const IMAGE_DIMENSIONS: Record<string, [number, number]> = {
  "bwindi-impenetrable-national-park": [2048, 1366],
  "mgahinga-gorilla-national-park": [1120, 700],
  "queen-elizabeth-national-park": [900, 600],
  "murchison-falls-national-park": [1600, 1067],
  "kidepo-valley-national-park": [800, 531],
  "kibale-national-park": [1120, 700],
  "semuliki-national-park": [1095, 700],
  "rwenzori-mountains": [1024, 768],
  "mount-elgon-national-park": [1280, 720],
  "lake-mburo": [1129, 750],
};

/**
 * `object-position` overrides, keyed by slug.
 *
 * Every source photo is a landscape frame being `object-fit: cover`-cropped
 * into a portrait-ish sliver. That crops horizontally and — because the
 * crop only shows the middle slice of the image — *amplifies* how
 * off-centre a subject looks, roughly by (image aspect ratio / sliver
 * aspect ratio). A subject that sits at ~20% across the original frame can
 * land almost entirely outside a centred crop. These five parks have their
 * subject clearly off-centre in the source photo, so the crop is re-aimed
 * at it directly; the other five are close enough to centred that the
 * default "center" already keeps the subject in frame, so they're left out
 * of this map on purpose.
 */
export const FOCAL_POSITION: Record<string, string> = {
  "mgahinga-gorilla-national-park": "10% center",
  "queen-elizabeth-national-park": "58% center",
  "kibale-national-park": "17% center",
  "semuliki-national-park": "94% center",
  "rwenzori-mountains": "100% center",
};

const DEFAULT_MASK = "50% 42% / 50% 55%";

/**
 * Turns a `subjectMask` spec ("cx% cy%" or "cx% cy% / rw% rh%", positioned
 * in the sliver's own box) into the radial-gradient the occlusion layer
 * masks itself with. Falls back to a centred blob when a park has no
 * hand-tuned mask, per §4, so the effect never silently disappears.
 */
export function maskGradient(spec: string | undefined): string {
  const [position, size] = (spec ?? DEFAULT_MASK).split("/").map((part) => part.trim());
  const ellipseSize = size ?? "50% 55%";
  // The falloff is long and starts early on purpose, so occlusion never
  // reads as a hard-edged spotlight (see the note this replaced). The
  // previous curve did that with three stops — solid to 30%, a straight
  // drop to 58%, another straight drop to 88% — which is smooth in VALUE
  // at each stop but has a sharp change in SLOPE right at 30%, jumping from
  // "flat" to "falling" in one step. CSS gradients are piecewise linear
  // between stops, so that kink is real, and the eye is very sensitive to a
  // slope discontinuity even where the underlying value is continuous (a
  // Mach band). It was visible as a genuine horizontal line wherever the
  // ellipse crossed a smooth part of a photo, sky or still water. This
  // curve approximates the same overall shape, solid centre, long soft
  // tail, with enough intermediate stops that no single slope change is
  // large enough to read as an edge.
  return `radial-gradient(ellipse ${ellipseSize} at ${position}, black 0%, black 8%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.7) 32%, rgba(0,0,0,0.46) 45%, rgba(0,0,0,0.27) 58%, rgba(0,0,0,0.13) 70%, rgba(0,0,0,0.05) 82%, transparent 92%)`;
}

/**
 * "321 km² · gazetted 1991" — only the fields that actually exist on the
 * record. A park with neither (Kibale) renders no meta line at all, never
 * an empty one or a placeholder dash.
 */
export function metaLine(park: Park): string | null {
  const parts: string[] = [];
  if (park.areaKm2 != null) parts.push(`${park.areaKm2} km²`);
  if (park.gazettedYear != null) parts.push(`gazetted ${park.gazettedYear}`);
  return parts.length > 0 ? parts.join(" · ") : null;
}
