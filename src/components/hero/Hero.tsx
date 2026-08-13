import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { EASE, DUR } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { identity, mandate } from "../../data/facts";

// No hero video ships. The crane comp that was here was an Adobe Stock preview:
// 700x394, watermarked on every frame, and — separately — unusable on contrast
// grounds, since its near-white sky measured 3.11:1 against the headline even
// under a 52% scrim.
//
// The still is not a fallback, it is the design. The Murchison dusk frame is
// dark and warm, so it carries the headline at 9.66:1 without fighting it.
//
// To reintroduce video: set this to the licensed file's path. The gating below
// (viewport width, connection type, reduced motion) already works, and the only
// requirement on the footage is that nothing behind the headline is brighter
// than roughly #6B6B6B — dusk, backlit, or against dark water or canopy.
const heroVideoSrc: string | null = null;
const heroVideoPoster = "/parks/hero-poster.webp";

interface NetworkInformationLike {
  effectiveType?: string;
}
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationLike;
}

const SLOW_CONNECTION_TYPES = new Set(["slow-2g", "2g", "3g"]);

// Video only earns its bytes on a wide viewport, a connection that isn't
// visibly metered, and a user who hasn't asked for less motion. Any one of
// those failing means the (already-loaded) poster image stays the whole show.
function canAutoplayHeroVideo(prefersReducedMotion: boolean): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion) return false;
  if (window.innerWidth < 768) return false;

  const { connection } = navigator as NavigatorWithConnection;
  const effectiveType = connection?.effectiveType;
  if (effectiveType && SLOW_CONNECTION_TYPES.has(effectiveType)) return false;

  return true;
}

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
    heroVideoSrc !== null && canAutoplayHeroVideo(prefersReducedMotion);

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
          The crane footage is the opposite — high-key, pale sky and pale
          grass, almost no dark values anywhere — so cream type over it loses
          contrast badly. This layer exists only while the video is actually
          showing, and drops away the moment the still is what's on screen.
          Measured after adding it; see the figures in README. */}
      {videoReady && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundColor:
              "color-mix(in oklab, var(--color-forest) 38%, transparent)",
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

      {/* Layer 3: content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
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
              Where the wild
            </motion.span>
            <motion.span
              initial={initial}
              animate="visible"
              variants={headlineLineReveal(0.43)}
              className="block"
            >
              still runs
            </motion.span>
          </h1>

          <motion.a
            href="#parks"
            initial={initial}
            animate="visible"
            variants={ctaReveal}
            className="mt-10 whitespace-nowrap rounded-full border border-papyrus/60 bg-transparent px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-papyrus transition-colors hover:border-crane hover:bg-crane hover:text-ink focus-visible:border-crane focus-visible:bg-crane focus-visible:text-ink"
          >
            Find your park
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
