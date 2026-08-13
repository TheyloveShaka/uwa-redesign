import { Link } from "react-router-dom";
import type { Park } from "../../data/parks";
import { FOCAL_POSITION, IMAGE_DIMENSIONS, maskGradient, metaLine } from "./parkStrip.constants";

interface ParkCardProps {
  park: Park;
  eager: boolean;
}

/**
 * One card of the mobile snap carousel. Unlike the desktop/tablet sliver
 * this is a real <Link> — there's no hover/focus expand state to arbitrate
 * on touch (§4: "always expanded, no hover state on touch"), so a plain
 * anchor is both simpler and lets "Explore →" exist as ordinary link text
 * rather than a stand-in the button couldn't hold without nesting.
 * Same occlusion stack as the desktop sliver, just always visible.
 */
export function ParkCard({ park, eager }: ParkCardProps) {
  const [width, height] = IMAGE_DIMENSIONS[park.slug] ?? [1200, 800];
  const objectPosition = FOCAL_POSITION[park.slug] ?? "center";
  const meta = metaLine(park);

  return (
    <li className="relative h-full shrink-0 snap-start" style={{ width: "86vw" }}>
      <Link
        to={`/parks/${park.slug}`}
        // See ParkSliver: the accessible name leads with the visible "Explore"
    // label so voice control can reach it (WCAG 2.5.3, Label in Name).
    aria-label={`Explore ${park.name}. ${park.signatureAttraction}.`}
        // overflow-hidden lives on the inner div, not here — see ParkSliver
        // for why clipping at this level silently eats the ring's own
        // outward box-shadow. Same solid-dark-ring reasoning as there too.
        className="relative block h-full w-full focus-visible:z-20 focus-visible:[box-shadow:0_0_0_5px_var(--color-forest)]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={park.image}
            alt=""
            width={width}
            height={height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 130% 82% at 50% 44%, color-mix(in oklab, var(--color-forest) 82%, transparent) 0%, color-mix(in oklab, var(--color-forest) 68%, transparent) 40%, color-mix(in oklab, var(--color-forest) 35%, transparent) 65%, transparent 92%), linear-gradient(to top, color-mix(in oklab, var(--color-forest) 95%, transparent) 0%, color-mix(in oklab, var(--color-forest) 82%, transparent) 22%, color-mix(in oklab, var(--color-forest) 50%, transparent) 45%, transparent 70%)",
            }}
          />

          <h3
            aria-hidden="true"
            className="absolute inset-x-5 top-1/2 -translate-y-1/2 font-poster uppercase leading-[0.92] text-papyrus"
            style={{ fontSize: "clamp(2.25rem, 9vw, 3.5rem)", opacity: 0.9 }}
          >
            {park.name}
          </h3>

          <img
            src={park.image}
            alt=""
            aria-hidden="true"
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition,
              maskImage: maskGradient(park.subjectMask),
              WebkitMaskImage: maskGradient(park.subjectMask),
            }}
          />

          <div aria-hidden="true" className="absolute inset-x-5 bottom-8">
            <p className="max-w-[26ch] font-body text-[15px] leading-snug text-papyrus">
              {park.signatureAttraction}
            </p>
            <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus">
              Explore →
            </span>
            {meta && (
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-papyrus/75">
                {meta}
              </p>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
