/**
 * Hand-drawn silhouettes — the Reference-C foreground layers.
 *
 * These are real vectors, not placeholders: they are the elements that cut across the
 * oversized poster type and create depth by occlusion rather than by drop shadow.
 *
 * Conventions:
 *  - every shape uses `fill="currentColor"` so colour comes from a token on the parent
 *  - no strokes that scale badly; outlines are drawn as filled paths
 *  - each has `aria-hidden` by default — they are decorative. If a silhouette is ever the
 *    only thing conveying meaning, pass a `title` and it becomes an accessible image.
 */

import type { SVGProps } from "react";

type SilhouetteProps = SVGProps<SVGSVGElement> & {
  /** Supply only when the shape carries meaning on its own; otherwise it stays decorative. */
  title?: string;
};

function svgProps({ title, ...rest }: SilhouetteProps) {
  return {
    ...rest,
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    ...(title
      ? { role: "img" as const, "aria-label": title }
      : { "aria-hidden": true as const, focusable: false as const }),
  };
}

/**
 * Umbrella thorn acacia — the signature tree of the Ugandan savanna.
 * Used on Kidepo and Lake Mburo. Flat-topped canopy with the characteristic
 * upward-forking trunk.
 */
export function Acacia(props: SilhouetteProps) {
  return (
    <svg viewBox="0 0 240 170" {...svgProps(props)}>
      {/* canopy — flat top, ragged underside */}
      <path d="M18 64C34 43 62 29 100 26c42-3 82 8 110 30 8 6 10 12 4 14-10 3-22-2-34-4-22-4-44-6-66-5-27 1-53 6-78 14-9 3-16 2-19-3-2-4 0-6 1-8Z" />
      <path d="M52 72c22-7 47-11 72-12 24-1 48 1 70 6 6 1 9 4 6 7-3 2-9 1-15 0-20-4-41-6-62-5-22 1-44 5-64 11-6 2-11 2-12-1-1-3 2-5 5-6Z" />
      {/* trunk with the acacia's forking habit */}
      <path d="M112 58c-1 12-2 20-3 28-2 22-4 46-6 78h18c-2-32-3-56-4-78 0-8-1-16-1-28Z" />
      <path d="M114 66c-12-2-24-7-35-14-3-2-6-2-7 0-1 3 1 5 4 7 12 8 25 13 38 15Z" />
      <path d="M120 66c12-2 25-7 36-14 3-2 6-2 7 1s-2 5-5 7c-12 7-25 12-38 14Z" />
    </svg>
  );
}

/**
 * Grey crowned crane — Uganda's national bird, on the flag.
 * The crown of stiff golden filaments is the whole identity of the bird; it must read
 * clearly even at small sizes, so the spikes are drawn generously.
 */
export function CrownedCrane(props: SilhouetteProps) {
  return (
    <svg viewBox="0 0 150 230" {...svgProps(props)}>
      {/* crown filaments */}
      <path d="M74 46c-1-9-4-17-8-25-1-3 1-5 3-3 5 7 8 15 10 24Zm8-1c2-10 6-19 12-26 2-2 4 0 3 3-5 8-8 16-9 25Zm-19 4c-5-8-11-14-18-19-3-2-5 1-3 3 7 5 13 11 17 19Zm34 1c6-8 12-14 20-18 3-2 5 1 2 3-7 4-13 10-17 18ZM56 58c-7-5-15-8-23-9-3 0-4 3-1 4 8 2 15 5 21 9Zm50 1c7-5 14-8 22-9 3 0 4 3 1 4-8 2-15 5-21 9Z" />
      {/* head, beak and neck */}
      <path d="M86 56c11 0 20 8 20 19 0 6-2 10-6 14l-4 3 22 6c3 1 3 4 0 4l-27-5c-4 2-8 2-12 1-9-3-15-11-15-21 0-11 10-21 22-21Z" />
      <path d="M74 92c-3 16-5 30-4 42 1 14 5 26 12 36l-14 8c-8-13-12-28-13-45-1-14 1-28 5-43Z" />
      {/* body */}
      <path d="M72 168c14-8 32-9 47-2 18 8 27 25 24 43-2 10-8 17-17 20-14 5-31 3-45-5-14-9-22-22-21-35 0-9 5-16 12-21Z" />
      {/* tail plume */}
      <path d="M139 196c8 3 15 9 20 17 2 3-1 6-4 4-6-6-13-11-20-14Z" />
      {/* legs — long and thin, the crane's whole posture depends on them */}
      <path d="M83 206c3-1 5 1 5 4l2 30 10 5c3 1 2 5-1 5l-16-1c-2 0-4-2-4-4l-1-35c0-2 2-4 5-4Z" />
      <path d="M104 204c3-1 5 1 5 4l3 32 10 5c3 2 1 5-2 5l-15-1c-2 0-4-2-4-4l-2-37c0-2 2-4 5-4Z" />
    </svg>
  );
}

/**
 * NO GORILLA VECTOR — this is a deliberate design decision, not an omission.
 *
 * Two hand-authored attempts at a mountain gorilla silhouette were rendered and reviewed.
 * The first read as a teddy bear, the second as a hollow croissant. Flat geometry (trees,
 * volcanic cones, a sun) hand-authors fine as bezier paths; recognisable animal anatomy does
 * not, and a silhouette that doesn't read is worse than no silhouette because it actively
 * looks amateur at 14vw.
 *
 * The Reference-B occlusion effect on Bwindi is therefore achieved the way the reference
 * actually achieves it — with a PHOTOGRAPH, not a vector: the park image renders twice, the
 * oversized type is sandwiched between the two copies, and the top copy carries a per-park
 * `subjectMask` (a CSS mask positioned over the animal in that specific photograph, authored
 * per park in `parks.ts`). The animal then genuinely occludes the letterforms.
 *
 * Bwindi's vector foreground layer is `CanopyEdge` + drifting mist, which is truer to the
 * park's identity anyway — Bwindi's signature is the impenetrable forest itself.
 */

/**
 * Ostrich — Kidepo Valley. Uganda's only ostrich population is in Kidepo, which makes it
 * the honest signature animal for that panel rather than a generic savanna cutout.
 */
export function Ostrich(props: SilhouetteProps) {
  return (
    <svg viewBox="0 0 170 240" {...svgProps(props)}>
      {/* head and beak */}
      <path d="M74 20c8 0 15 6 15 14 0 3-1 6-3 8l16 5c3 1 2 5-1 4l-19-4c-2 1-5 2-8 2-8 0-14-7-14-15s6-14 14-14Z" />
      {/* long neck */}
      <path d="M70 46c-2 20-2 38 1 54 2 12 6 22 12 30l-16 11c-8-11-13-24-16-39-3-19-3-38 0-57Z" />
      {/* body — the great plume mass */}
      <path d="M66 128c17-9 38-9 55 1 20 11 30 32 26 54-3 16-14 26-30 28-19 3-39-3-52-16-12-12-17-28-13-44 2-10 7-18 14-23Z" />
      {/* tail plume */}
      <path d="M146 152c9 2 17 8 22 17 2 3-2 7-5 4-7-7-14-13-22-16Z" />
      {/* legs */}
      <path d="M80 208c3 0 5 2 5 5l-2 22 8 3c3 1 2 4-1 4H70c-3 0-4-2-3-4l4-25c0-3 2-5 5-5Z" />
      <path d="M112 206c3 0 5 2 5 5l1 24 8 3c3 1 2 4-1 4h-19c-3 0-4-2-4-4l4-27c0-3 3-5 6-5Z" />
    </svg>
  );
}

/**
 * Plains zebra — Lake Mburo. Drawn as a solid silhouette; the stripe motif is handled
 * separately as a clip-path wipe in the Lake Mburo section transition, so putting stripes
 * in here too would say the same thing twice.
 */
export function Zebra(props: SilhouetteProps) {
  return (
    <svg viewBox="0 0 250 175" {...svgProps(props)}>
      {/* head, muzzle and ears */}
      <path d="M40 34c4-3 9-2 12 2l6 9c3-6 8-9 14-9l-3 11 9 12c3 4 3 9 0 12l-14 14c-3 3-8 3-11 0L38 68c-4-4-4-10-1-14Z" />
      {/* neck with mane */}
      <path d="M64 60c8 5 18 11 30 15l18 6-14 26c-14-5-27-13-38-23Z" />
      <path d="M58 44c10 4 20 11 29 20l-8 9c-8-9-17-16-26-20Z" />
      {/* barrel */}
      <path d="M96 78c26-9 55-10 81-2 22 6 38 19 44 37 3 10 1 19-6 24-9 6-21 6-32 2-20-7-42-9-63-6-16 2-30 0-38-9-8-9-8-22 1-33 4-6 8-10 13-13Z" />
      {/* forelegs */}
      <path d="M104 128c4 0 7 3 7 7l-2 30c0 3-2 5-5 5s-6-2-6-5l-1-31c0-3 3-6 7-6Z" />
      <path d="M126 132c4 0 7 3 7 6l-1 29c0 3-3 5-6 5s-5-2-5-5l-2-29c0-3 3-6 7-6Z" />
      {/* hindlegs */}
      <path d="M196 126c4-1 8 2 8 6l1 33c0 3-2 5-5 5s-6-2-6-5l-3-32c0-3 2-6 5-7Z" />
      <path d="M218 118c4-1 8 2 8 6l2 39c0 3-3 5-6 5s-5-2-5-5l-4-38c-1-3 2-6 5-7Z" />
      {/* tail */}
      <path d="M222 92c6 6 10 14 11 24 0 4-4 6-6 3-3-8-6-16-11-22Z" />
    </svg>
  );
}

/**
 * Virunga volcano ridge — Mgahinga. Three cones at different depths; the panel parallaxes
 * them apart to reveal the park name. Deliberately geometric and flat, in the poster idiom.
 */
export function VolcanoRidge({
  cone = "all",
  ...props
}: SilhouetteProps & { cone?: "back" | "mid" | "front" | "all" }) {
  return (
    <svg viewBox="0 0 400 160" preserveAspectRatio="none" {...svgProps(props)}>
      {(cone === "all" || cone === "back") && (
        <path d="M0 160 L96 34c4-5 10-5 14 0l96 126Z" opacity={cone === "all" ? 0.45 : 1} />
      )}
      {(cone === "all" || cone === "mid") && (
        <path d="M120 160 L226 22c4-6 11-6 15 0l104 138Z" opacity={cone === "all" ? 0.7 : 1} />
      )}
      {(cone === "all" || cone === "front") && (
        <path d="M244 160 L330 56c4-5 10-5 13 0l57 104Z" />
      )}
    </svg>
  );
}

/**
 * A flat sun disc — Reference C's sun is a solid circle, not a gradient glow.
 * Kept as a component so no panel is tempted to reach for a radial-gradient "sunburst".
 */
export function SunDisc(props: SilhouetteProps) {
  return (
    <svg viewBox="0 0 100 100" {...svgProps(props)}>
      <circle cx="50" cy="50" r="50" />
    </svg>
  );
}

/**
 * A ragged forest canopy edge — Bwindi. Used as the lowest mist/parallax layer so the
 * fog has something to sit behind.
 */
export function CanopyEdge(props: SilhouetteProps) {
  return (
    <svg viewBox="0 0 400 120" preserveAspectRatio="none" {...svgProps(props)}>
      {/* Built from overlapping crowns, not a wiggling line. Two attempts at a single ragged
          path both read as a saw blade — a canopy is a crowd of rounded crowns at different
          heights, and the only way to get that read is to actually draw the crowns. */}
      <rect x="0" y="76" width="400" height="44" />
      <circle cx="12" cy="74" r="22" />
      <circle cx="40" cy="66" r="30" />
      <circle cx="66" cy="80" r="18" />
      <circle cx="96" cy="58" r="34" />
      <circle cx="128" cy="72" r="24" />
      <circle cx="152" cy="84" r="16" />
      <circle cx="180" cy="68" r="28" />
      <circle cx="214" cy="56" r="36" />
      <circle cx="246" cy="78" r="20" />
      <circle cx="272" cy="70" r="26" />
      <circle cx="300" cy="62" r="32" />
      <circle cx="326" cy="82" r="18" />
      <circle cx="350" cy="72" r="24" />
      <circle cx="376" cy="64" r="30" />
      <circle cx="396" cy="78" r="20" />
    </svg>
  );
}
