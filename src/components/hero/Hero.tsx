import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { EASE, DUR } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { canAutoplayVideo } from "../../lib/media";
import { identity, mandate } from "../../data/facts";

// Hero background is UWA's own actual hero video: this exact iframe src,
// byte for byte, was confirmed live on ugandawildlife.org via a direct DOM
// check against the real site (not just taken on trust). A standard iframe
// embed is the correct, ToS-compliant way to reuse it, same technique their
// own site uses; downloading/extracting the underlying stream would not be.
//
// UWA's own URL sets loop=0, which stops dead on the last frame once the
// clip ends. For a background element a visitor may sit on top of longer
// than the clip's own runtime, that reads as broken, so this deliberately
// overrides to loop=1 -- which the embed only honours when `playlist` is
// ALSO set to the same video ID, an easy-to-miss requirement of YouTube's
// embed API. Every other param is preserved exactly as UWA has it.
const HERO_YT_ID = "3XZfbd8yugI";
const heroVideoEmbedSrc =
  `https://www.youtube.com/embed/${HERO_YT_ID}` +
  `?autoplay=1&controls=0&start=0&end=0&modestbranding=1&wmode=transparent` +
  `&enablejsapi=1&rel=0&mute=1&loop=1&playlist=${HERO_YT_ID}`;

// Poster: not a frame grab. This is YouTube's own official thumbnail CDN
// image for this exact video (img.youtube.com/vi/<id>/maxresdefault.jpg),
// downloaded once and optimised locally the same as every other image in
// this project. It shows immediately, sits under the iframe as its loading
// state, and is what's left on screen whenever the embed doesn't qualify to
// play at all (reduced motion, narrow viewport, slow connection).
const heroVideoPoster = `${import.meta.env.BASE_URL}parks/hero-poster-hippos.webp`;

const scrimReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.fast, ease: EASE.out, delay: 0 },
  },
};

const kickerReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.fast, ease: EASE.out, delay: 0.25 },
  },
};

// Clip-path wipe: the hidden line sits fully masked from its own bottom
// edge, then the mask retreats upward as the line drifts up 12px into
// place — a slow "rising into view" rather than a plain fade.
function headlineLineReveal(delay: number): Variants {
  return {
    hidden: { clipPath: "inset(100% 0 0 0)", y: 12 },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      y: 0,
      transition: { duration: DUR.fast, ease: EASE.out, delay },
    },
  };
}

const ctaReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.fast, ease: EASE.out, delay: 0.62 },
  },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const initial = prefersReducedMotion ? false : "hidden";
  const canPlayVideo = canAutoplayVideo(prefersReducedMotion);

  const nationalParks = mandate.find(
    (entry) => entry.label === "National Parks",
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-forest text-papyrus"
      style={{ height: "100svh" }}
    >
      {/* Layer 1: media. The gradient lives on the container so it still
          reads as a deliberate, finished background if the poster 404s.
          Forest-to-forest-deep, not the old forest-to-murram amber ramp:
          this footage has no sunset in it, so a warm undertone here would
          fight the actual video instead of grounding it. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(165deg, var(--color-forest) 0%, var(--color-forest-deep) 100%)",
        }}
      >
        {!posterFailed && (
          <img
            src={heroVideoPoster}
            alt="A pod of hippos surges through shallow water at the edge of dense riverine forest"
            width={1280}
            height={720}
            fetchPriority="high"
            loading="eager"
            onError={() => setPosterFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {canPlayVideo && (
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden"
            style={{
              opacity: videoReady ? 1 : 0,
              transition: "opacity 700ms ease",
            }}
          >
            {/* Iframes have no object-fit; this is the standard technique
                for filling an arbitrary container with a fixed 16:9 embed:
                oversize on whichever axis is the constraint, then centre
                and crop with the parent's overflow:hidden. Rendering the
                player larger than its visible area is also the only real
                lever available to push YouTube's adaptive player toward a
                higher-resolution stream than a 1:1-sized embed would get,
                since there is no documented, reliable quality override for
                embeds anymore -- a heuristic, not a guarantee, but the one
                that exists. */}
            <iframe
              src={heroVideoEmbedSrc}
              title=""
              tabIndex={-1}
              allow="autoplay; encrypted-media; picture-in-picture"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100vw",
                height: "56.25vw",
                minHeight: "100%",
                minWidth: "177.78vh",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                border: 0,
              }}
              onLoad={() => {
                // onLoad only confirms the embedded document has loaded,
                // not that a frame has actually painted -- there is no
                // finer-grained signal available without pulling in the
                // full YouTube IFrame Player API for a background embed
                // that never needs playback control. The short delay is a
                // deliberate buffer against revealing a blank player before
                // real video content is behind it.
                window.setTimeout(() => setVideoReady(true), 400);
              }}
            />
          </div>
        )}
      </div>

      {/* Video-only scrim boost.
          Retuned for this footage's actual profile, measured worst-case
          across the loop (scratchpad contrast tooling), not reasoned from
          the old crane-footage numbers. Hippos, water and forest canopy are
          already low-key almost everywhere, so this stays light through the
          upper frame rather than fighting footage that's already dark -- the
          one real risk is the white splash where the hippos surge through
          the water, which sits low in frame, exactly behind the content
          block, so the gradient strengthens hardest there rather than
          uniformly across the whole frame. */}
      {videoReady && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-forest) 12%, transparent) 0%, color-mix(in oklab, var(--color-forest) 10%, transparent) 42%, color-mix(in oklab, var(--color-forest) 58%, transparent) 62%, color-mix(in oklab, var(--color-forest) 88%, transparent) 84%, var(--color-forest) 100%)",
            transition: "opacity 600ms ease",
          }}
        />
      )}

      {/* Layer 2: ground scrim — legibility for the static poster state and
          a floor under the video-only boost above. No warm sliver at the
          bottom anymore: that was murram-deep, tuned to blend into a sunset
          photo that this hero no longer shows. */}
      <motion.div
        aria-hidden="true"
        initial={initial}
        animate="visible"
        variants={scrimReveal}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 30%, color-mix(in oklab, var(--color-forest) 70%, transparent) 65%, var(--color-forest) 100%)",
        }}
      />

      {/* Layer 2b: top scrim, purely for nav legibility over the overcast
          sky/tree-line band. Same technique as the bottom scrim — a soft
          gradient, not a bar or a shadow — so the nav still reads as
          floating over the footage. Strengthened from the crane-footage
          values: measured worst-case against this footage's actual sky
          moments landed at 4.09:1 at the old strength, a real fail against
          the 4.5:1 floor, not close enough to round up. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-forest) 76%, transparent) 0%, color-mix(in oklab, var(--color-forest) 50%, transparent) 45%, transparent 100%)",
        }}
      />

      {/* Layer 3: content. Anchored to the lower part of the frame (roughly
          58 to 90 percent down) instead of dead centre, so the top half of
          the frame stays clear of type and the footage actually reads. */}
      <div
        className="absolute inset-x-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        style={{ top: "58%", bottom: "10%" }}
      >
        <div className="flex max-w-[92vw] flex-col items-center">
          <motion.p
            initial={initial}
            animate="visible"
            variants={kickerReveal}
            className="max-w-[44rem] font-mono text-[clamp(0.625rem,0.8vw,0.6875rem)] uppercase tracking-[0.2em] text-papyrus"
            // Belt-and-braces on top of a scrim that already passes on its
            // own: earns no WCAG 1.4.3 credit (that formula only compares
            // flat foreground/background colour), but a tight shadow does
            // measurably help real perceptual legibility against footage
            // detail the flat-colour math can't see.
            style={{ textShadow: "0 1px 10px rgba(6, 13, 10, 0.9)" }}
          >
            UGANDA · PEARL OF AFRICA
          </motion.p>

          {/* The headline is display type, not body copy — it deliberately
              breaks past the ~44rem reading column the kicker/CTA sit in,
              since --step-hero is large enough that a 44rem box would force
              a false third line at wide viewports. */}
          <h1
            className="mt-6 font-display font-light text-papyrus"
            style={{
              fontSize: "var(--step-hero)",
              lineHeight: 0.98,
              textShadow: "0 2px 28px rgba(6, 13, 10, 0.45)",
            }}
          >
            <motion.span
              initial={initial}
              animate="visible"
              variants={headlineLineReveal(0.34)}
              className="block"
            >
              Conserving &amp; Sustaining
            </motion.span>
            <motion.span
              initial={initial}
              animate="visible"
              variants={headlineLineReveal(0.43)}
              className="block"
            >
              Uganda&rsquo;s wildlife
            </motion.span>
            <motion.span
              initial={initial}
              animate="visible"
              variants={headlineLineReveal(0.52)}
              className="block"
            >
              Since 1996
            </motion.span>
          </h1>

          <motion.a
            href="#parks"
            initial={initial}
            animate="visible"
            variants={ctaReveal}
            className="mt-10 whitespace-nowrap rounded-full border border-papyrus/60 bg-transparent px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-papyrus transition-colors hover:border-crane hover:bg-crane hover:text-ink focus-visible:border-crane focus-visible:bg-crane focus-visible:text-ink"
          >
            Explore More
          </motion.a>
        </div>
      </div>

      {/* Layer 5: hero footer strip — the only extra elements the spec allows. */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mist md:px-10">
        <a href="#parks" className="shrink-0 transition-colors hover:text-papyrus focus-visible:text-papyrus">
          ↓ SCROLL
        </a>
        {nationalParks && (
          <span className="shrink-0">
            {/* Below 480px the full "· EST. 1996" clause crowds the scroll
                hint in the same row, so it drops to just the park count. */}
            <span className="hidden min-[480px]:inline">
              {nationalParks.count} PARKS · EST. {identity.established}
            </span>
            <span className="min-[480px]:hidden">
              {nationalParks.count} PARKS
            </span>
          </span>
        )}
      </div>
    </section>
  );
}
