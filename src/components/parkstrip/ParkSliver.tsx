import { forwardRef } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "motion/react";
import type { Park } from "../../data/parks";
import { SPRING } from "../../lib/motion";
import { FOCAL_POSITION, IMAGE_DIMENSIONS, maskGradient, metaLine } from "./parkStrip.constants";

interface ParkSliverProps {
  park: Park;
  isActive: boolean;
  isTabbable: boolean;
  eager: boolean;
  prefersReducedMotion: boolean;
  onHoverStart: () => void;
  onFocusIndex: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onNavigate: () => void;
}

/**
 * One vertical sliver of the desktop/tablet Park Strip — a single real
 * <button>, per §4's "do not fake ARIA roles" instruction. The whole
 * button is the interactive surface (hover/focus expands it, click or
 * Enter/Space navigates to the park page); "Explore →" inside is styled
 * like a link but is plain text, not a nested <a>, because nesting
 * interactive content inside a <button> is invalid HTML and would just
 * create a second control pointing at the same destination as the first.
 *
 * Content is layered for occlusion (the signature trick, §4):
 *   1. the photo itself (brightness alone carries collapsed vs. expanded)
 *   2. a localised scrim, so the name stays legible against any photo
 *   3. the oversized park name
 *   4. the SAME photo again, masked to a blob over the subject — so the
 *      animal/landform in the photograph visibly sits in front of the
 *      letterforms. Depth comes from that masking, never a drop shadow.
 *   5. the hook + "Explore →" + meta line, always on top
 */
export const ParkSliver = forwardRef<HTMLButtonElement, ParkSliverProps>(function ParkSliver(
  {
    park,
    isActive,
    isTabbable,
    eager,
    prefersReducedMotion,
    onHoverStart,
    onFocusIndex,
    onKeyDown,
    onNavigate,
  },
  ref,
) {
  const [width, height] = IMAGE_DIMENSIONS[park.slug] ?? [1200, 800];
  const objectPosition = FOCAL_POSITION[park.slug] ?? "center";
  const meta = metaLine(park);

  return (
    <motion.li
      className="relative h-full"
      style={{ flexBasis: 0, flexShrink: 1, minWidth: 0 }}
      animate={{ flexGrow: isActive ? 5.5 : 1 }}
      transition={prefersReducedMotion ? { duration: 0 } : SPRING}
    >
      <button
        ref={ref}
        type="button"
        aria-expanded={isActive}
        aria-label={`${park.name} — ${park.signatureAttraction}. View park.`}
        tabIndex={isTabbable ? 0 : -1}
        onMouseEnter={onHoverStart}
        onFocus={onFocusIndex}
        onKeyDown={onKeyDown}
        onClick={onNavigate}
        // The site-wide focus ring (index.css, `:focus-visible { outline:
        // 2px solid var(--color-crane); outline-offset: 3px }`) is an
        // unlayered rule, which in CSS cascade-layers terms always beats a
        // Tailwind utility class regardless of specificity or source order
        // — so `outline-none` here cannot suppress it, and isn't fighting
        // it. Instead this adds a solid dark ring flush against the button
        // that's wide enough to sit *underneath* that 3px-offset gold
        // outline, so the gold always has a dark backing and survives
        // being drawn over a bright photo (§4's "1px dark inner ring").
        //
        // `overflow-hidden` deliberately lives on the inner div below, not
        // here or on the <li>: a focus ring is drawn *outside* the button's
        // own border box, and clipping it at this level (or the li's, as an
        // earlier version did) silently cut the ring off entirely — caught
        // by screenshotting a real keyboard-focused state and finding no
        // ring rather than by reading the CSS. `focus-visible:z-20` on top
        // of that so the ring paints over the neighbouring, later-painted
        // sliver on its right instead of being hidden underneath it.
        className="relative z-0 block h-full w-full cursor-pointer text-left focus-visible:z-20 focus-visible:[box-shadow:0_0_0_5px_var(--color-forest)]"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Layer 1: the photograph. Brightness alone carries the
              collapsed/expanded difference, so this <img> is the only
              network request this sliver ever makes. */}
          <img
            src={park.image}
            alt=""
            width={width}
            height={height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-500 ease-out"
            style={{ objectPosition, filter: isActive ? "brightness(1)" : "brightness(0.55)" }}
          />

          {/* Collapsed label — the sliver's resting state: the park name
              set vertically, reading bottom-to-top. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-poster uppercase text-papyrus transition-opacity duration-300"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "clamp(0.8rem, 1.05vw, 1.1rem)",
              letterSpacing: "0.04em",
              opacity: isActive ? 0 : 1,
            }}
          >
            {park.name}
          </span>

          {/* Expanded content — inert to assistive tech; the button's own
              aria-label already carries the name and hook, so re-announcing
              this text would just be noise repeated across ten buttons. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            {/* Layer 2: localised scrim — legibility for the name without
                flattening the photo into a silhouette (the hero's lesson,
                §3). A radial wash behind the name plus a bottom wash behind
                the hook/meta block. */}
            <div
              className="absolute inset-0"
              style={{
                // The radial behind the NAME is deliberately lighter than it
                // first looks like it should be. The park name renders at
                // 40px+, which is WCAG "large text" — its floor is 3:1, not
                // 4.5:1. Driving 40px display type to 4.5:1 forced a near-
                // opaque wash, which both flattened the photograph and made
                // the occlusion layer above read as a bright spotlight oval,
                // because a dark base under a full-brightness masked copy
                // shows every edge of the mask.
                // The bottom linear wash stays strong: the hook and meta line
                // ARE body-size text and do need the full 4.5:1.
                backgroundImage:
                  "radial-gradient(ellipse 135% 88% at 50% 46%, color-mix(in oklab, var(--color-forest) 58%, transparent) 0%, color-mix(in oklab, var(--color-forest) 45%, transparent) 42%, color-mix(in oklab, var(--color-forest) 22%, transparent) 68%, transparent 94%), linear-gradient(to top, color-mix(in oklab, var(--color-forest) 95%, transparent) 0%, color-mix(in oklab, var(--color-forest) 82%, transparent) 22%, color-mix(in oklab, var(--color-forest) 50%, transparent) 45%, transparent 70%)",
              }}
            />

            {/* Layer 3: the name, sandwiched under the masked photo below. */}
            <h3
              className="absolute inset-x-5 top-1/2 -translate-y-1/2 font-poster uppercase leading-[0.92] text-papyrus md:inset-x-8"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 6rem)", opacity: 0.9 }}
            >
              {park.name}
            </h3>

            {/* Layer 4: the SAME photograph again, masked to the subject so
                it occludes the letterforms above. Only mounted while
                active: zero extra network bytes (identical, cached URL to
                layer 1) but the decode/paint cost is skipped for the nine
                slivers that aren't showing it. */}
            {isActive && (
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
            )}

            {/* Layer 4b: ground for the hook block, ABOVE the masked photo.
                The bottom wash in Layer 2 sits *below* Layer 4, so wherever a
                park's subject mask reaches the bottom of the frame it puts
                full-brightness photograph back over that wash and the hook
                ends up reading against bare image. Measured on Murchison,
                whose mist does exactly that: a bright pixel behind the hook
                came out at 3.03:1, under the 4.5:1 floor body copy needs.
                This layer restores a guaranteed ground for the text block
                without touching the name's occlusion, which is the one place
                the photograph is *supposed* to win. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/5"
              style={{
                backgroundImage:
                  "linear-gradient(to top, color-mix(in oklab, var(--color-forest) 94%, transparent) 0%, color-mix(in oklab, var(--color-forest) 80%, transparent) 45%, transparent 100%)",
              }}
            />

            {/* Layer 5: hook + explore + meta — always on top of the mask. */}
            <div className="absolute inset-x-5 bottom-6 md:inset-x-8 md:bottom-8">
              <p className="max-w-[30ch] font-body text-[15px] leading-snug text-papyrus md:text-base">
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
        </div>
      </button>
    </motion.li>
  );
});
