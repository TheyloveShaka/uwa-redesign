import { UGANDA_PATH, UGANDA_VIEWBOX, PARK_POINTS, formatCoords } from "../../data/uganda";
import { parks } from "../../data/parks";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * Uganda with a pin on one park.
 *
 * The country is a single drawn path, not a tiled map — see src/data/uganda.ts
 * for why. The other nine parks stay on the map as faint dots so the pin reads
 * as a position within a system rather than a lone marker floating in an
 * outline: you can see at a glance that Kidepo is remote and that Bwindi and
 * Mgahinga are neighbours in the far south-west.
 *
 * The pin is `--color-crane`. That is consistent with the "gold is only ever
 * used for actions and live indicators" rule — this is a live indicator, the
 * one thing on screen saying *you are here*.
 */

type Props = {
  slug: string;
  /** `inset` overlays a photograph; `panel` sits on a solid ground. */
  variant?: "inset" | "panel";
  className?: string;
};

export function ParkMap({ slug, variant = "inset", className = "" }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const point = PARK_POINTS[slug];
  if (!point) return null;

  const park = parks.find((p) => p.slug === slug);
  const label = park ? `${park.name} on a map of Uganda` : "Location in Uganda";
  const coords = formatCoords(point.lat, point.lon);
  const onPhoto = variant === "inset";

  return (
    <figure className={className}>
      <svg
        viewBox={UGANDA_VIEWBOX}
        role="img"
        aria-label={`${label}, ${coords}`}
        className="h-auto w-full overflow-visible"
      >
        {/* Country body. Kept low-contrast so the pin is the only thing that
            asserts itself; over a photograph it reads as an etched overlay. */}
        <path
          d={UGANDA_PATH}
          fill={
            onPhoto
              ? "color-mix(in oklab, var(--color-forest) 42%, transparent)"
              : "color-mix(in oklab, var(--color-papyrus) 6%, transparent)"
          }
          stroke="color-mix(in oklab, var(--color-papyrus) 55%, transparent)"
          strokeWidth={0.5}
          strokeLinejoin="round"
                  />

        {/* The other nine parks: context, not clutter. */}
        {Object.entries(PARK_POINTS)
          .filter(([s]) => s !== slug)
          .map(([s, p]) => (
            <circle
              key={s}
              cx={p.x}
              cy={p.y}
              r={0.9}
              fill="color-mix(in oklab, var(--color-papyrus) 45%, transparent)"
            />
          ))}

        {/* Crosshair rules — cartographic, and they draw the eye to the pin
            without needing a label line. */}
        <g stroke="color-mix(in oklab, var(--color-crane) 38%, transparent)" strokeWidth={0.35}>
          <line x1={point.x} y1={0} x2={point.x} y2={point.y - 3.4} />
          <line x1={point.x} y1={point.y + 3.4} x2={point.x} y2="100%" />
          <line x1={0} y1={point.y} x2={point.x - 3.4} y2={point.y} />
          <line x1={point.x + 3.4} y1={point.y} x2="100%" y2={point.y} />
        </g>

        {/* The pin. A slow breathing halo marks it as live; under reduced
            motion the halo simply sits still at its resting size. */}
        <circle
          cx={point.x}
          cy={point.y}
          r={3.2}
          fill="none"
          stroke="var(--color-crane)"
          strokeWidth={0.5}
          opacity={0.55}
        >
          {!prefersReducedMotion && (
            <>
              <animate
                attributeName="r"
                values="2.6;4.6;2.6"
                dur="3.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.65;0.12;0.65"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
        <circle cx={point.x} cy={point.y} r={1.9} fill="var(--color-crane)" />
      </svg>

      <figcaption
        className={`mt-3 font-mono text-[10px] uppercase tracking-[0.15em] ${
          onPhoto ? "text-papyrus/85" : "text-mist"
        }`}
      >
        {coords}
      </figcaption>
    </figure>
  );
}
