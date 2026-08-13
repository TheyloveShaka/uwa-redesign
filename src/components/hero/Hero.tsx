import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { EASE, DUR } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { canAutoplayVideo } from "../../lib/media";
import { identity, mandate } from "../../data/facts";

// Hero video is active again: the user restored public/parks/hero.mp4.
// It is still an Adobe Stock comp, not licensed footage: 700x394, with a
// visible watermark on every frame. It is gitignored and must never be
// committed. Treat it strictly as a local stand-in for comping the layout,
// not as shippable media.
//
// The gating below (viewport width, connection type, reduced motion) already
// works, and applies just the same to this comp as it will to the licensed
// replacement. That replacement's only hard requirement is that nothing
// behind the headline is brighter than roughly #6B6B6B: dusk, backlit, or
// against dark water or canopy. This comp's footage is high-key (pale sky,
// pale grass) and does not meet that bar on its own, which is why the
// video-only scrim boost below exists: it darkens the frame enough to hold
// contrast while this stand-in is what is actually playing.
const heroVideoSrc: string | null = "/parks/hero.mp4";
const heroVideoPoster = "/parks/hero-poster.webp";

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
  const canPlayVideo =
    heroVideoSrc !== null && canAutoplayVideo(prefersReducedMotion);

  const nationalParks = mandate.find(
    (entry) => entry.label === "National Parks",
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-forest text-papyrus"
      style={{ height: "100svh" }}
    >
      {/* Layer 1: media. The gradient lives on the container so it still
          reads as a deliberate, finished background if the poster 404s. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(165deg, var(--color-forest) 0%, var(--color-murram-deep) 100%)",
        }}
      >
        {!posterFailed && (
          // Alt text describes the photograph that is actually here, not a
          // placeholder. If the file is replaced, rewrite this to match the new
          // frame — alt text that describes the wrong image is worse than none.
          <img
            src="/parks/hero-poster.webp"
            alt="Sunset over Murchison Falls National Park: a dirt track curves through open savanna towards the low sun, with borassus palms silhouetted along the horizon"
            width={1920}
            height={1080}
            fetchPriority="high"
            loading="eager"
            onError={() => setPosterFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {heroVideoSrc && canPlayVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={heroVideoSrc}
            poster={heroVideoPoster}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            style={{
              opacity: videoReady ? 1 : 0,
              transition: "opacity 600ms ease",
            }}
          />
        )}
      </div>

      {/* Video-only scrim boost.
          Every other scrim on this hero was tuned against the sunset still,
          which is dark and warm and does most of the legibility work itself.
          The crane footage is the opposite: high-key, pale sky and pale
          grass, almost no dark values anywhere, so cream type over it loses
          contrast badly. A flat wash strong enough to hold contrast also
          hid the footage entirely, which defeats the point of having video
          at all. This is a vertical gradient instead: light at the top so
          the cranes stay visible, darkening through the band the content
          block now sits in (roughly 58 to 90 percent down), full forest by
          the bottom edge. Exists only while the video is actually showing,
          and drops away the moment the still is what's on screen. */}
      {videoReady && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-forest) 22%, transparent) 0%, color-mix(in oklab, var(--color-forest) 16%, transparent) 30%, color-mix(in oklab, var(--color-forest) 74%, transparent) 55%, color-mix(in oklab, var(--color-forest) 90%, transparent) 78%, var(--color-forest) 100%)",
            transition: "opacity 600ms ease",
          }}
        />
      )}

      {/* Layer 2: warm scrim — legibility without going to flat black. */}
      <motion.div
        aria-hidden="true"
        initial={initial}
        animate="visible"
        variants={scrimReveal}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 30%, color-mix(in oklab, var(--color-forest) 70%, transparent) 65%, var(--color-forest) 100%), linear-gradient(to bottom, transparent 85%, color-mix(in oklab, var(--color-murram-deep) 45%, transparent) 100%)",
        }}
      />

      {/* Layer 2b: top scrim, purely for nav legibility over the bright sky.
          Same technique as the bottom scrim above — a soft gradient, not a
          bar or a shadow — so the nav still reads as floating over the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40"
        style={{
          // Strengthened after an independent WORST-CASE measurement. Sampling the
          // mean pixel behind the nav gave a comfortable 4.76:1, but the brightest
          // cloud in that band measured 3.78:1 — a real fail at the point where
          // legibility actually breaks. Mean contrast over a photograph flatters
          // itself; the bright pixels are what you lose the type against.
          // Holding the gradient stronger for its first half fixes it while
          // affecting only the top strip of sky, well above the sunset band.
          backgroundImage:
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-forest) 64%, transparent) 0%, color-mix(in oklab, var(--color-forest) 38%, transparent) 45%, transparent 100%)",
        }}
      />

      {/* Layer 2c: localised legibility scrim behind the centred content
          stack. The bottom scrim above fades out well before the vertical
          middle of the frame, which is exactly where the kicker sits over
          the brightest part of the sunset — this radial patch picks up the
          slack there without darkening the photo as a whole. Sized to reach
          past the second headline line too, since "still runs" sits over the
          sun disc.

          Per design-critique Fix 1: sized/positioned so it reads as light
          falloff, not a rectangle. Colour is --color-murram-deep rather than
          --color-forest — forest is a green-black, so mixing it over a gold
          sunset shifts the hue toward grey; murram-deep darkens the value
          while keeping the sky warm. Verified this doesn't cost contrast: a
          --color-forest version at the same geometry/opacity was measured
          first (kicker 5.99:1, nav 5.20:1, headline 11.47:1 at 1440x900 —
          the numbers to fall back to if this ever needs revisiting), then
          swapped to murram-deep and re-measured with the identical method
          (rendered pixels behind the text, scratchpad/measure.mjs, WCAG
          formula — text-shadow below is NOT part of the SC 1.4.3
          calculation and earns no credit here):
            1440x900 — kicker 5.22:1, nav links 5.07:1, "still runs" 9.41:1
            375x812  — kicker 6.68:1, nav links 5.98:1, "still runs" 8.85:1
          All ≥ 4.5:1. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 78% 66% at 50% 46%, color-mix(in oklab, var(--color-murram-deep) 72%, transparent) 0%, color-mix(in oklab, var(--color-murram-deep) 42%, transparent) 45%, transparent 74%)",
        }}
      />

      {/* Layer 3: content. Anchored to the lower part of the frame (roughly
          58 to 90 percent down) instead of dead centre, so the top half of
          the video stays clear of type and the cranes actually read. */}
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
            // measurably help real perceptual legibility against cloud
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
