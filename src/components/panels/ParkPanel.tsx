import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Park } from "../../data/parks";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { Acacia, CanopyEdge, SunDisc } from "../silhouettes";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reference-C poster panel. Flat graded sky (no photo texture), oversized Anton
 * name, silhouette foreground, three layers parallaxing at different rates.
 *
 * Exactly ONE motion idea per park, derived from that park's actual signature
 * attraction. Seven of the ten parks use `variant="plain"` and get a simple
 * reveal — the payload cost of ten bespoke panels is real for a 3G audience,
 * and the seventh would prove nothing the third didn't.
 */

type PanelProps = { park: Park; variant?: "poster" | "plain" };

const SKY: Record<string, string> = {
  "mist-drift":
    "linear-gradient(to bottom, #16352A 0%, #0F2A21 42%, var(--color-forest) 100%)",
  "water-column":
    "linear-gradient(to bottom, color-mix(in oklab, var(--color-murram) 70%, var(--color-papyrus)) 0%, var(--color-murram) 38%, var(--color-murram-deep) 100%)",
  "heat-shimmer":
    "linear-gradient(to bottom, color-mix(in oklab, var(--color-murram) 45%, var(--color-papyrus)) 0%, color-mix(in oklab, var(--color-murram) 80%, var(--color-papyrus)) 40%, var(--color-murram-deep) 100%)",
};

export function ParkPanel({ park, variant = "poster" }: PanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);

  // Below the fold: don't pay for imagery or ScrollTriggers until the panel is
  // actually approaching the viewport.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setNear(true),
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // GSAP must not initialise at all under reduced motion.
    if (prefersReducedMotion || !near || variant !== "poster") return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const base = {
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      };
      // Layers move at different rates — this is what produces the depth.
      gsap.fromTo("[data-layer='back']", { yPercent: -6 }, { yPercent: 6, ease: "none", ...base });
      gsap.fromTo("[data-layer='name']", { yPercent: 8 }, { yPercent: -8, ease: "none", ...base });
      gsap.fromTo("[data-layer='fore']", { yPercent: 14 }, { yPercent: -14, ease: "none", ...base });

      if (park.motion === "mist-drift") {
        // The name emerges from fog rather than sliding in.
        gsap.fromTo(
          "[data-layer='name']",
          { opacity: 0.15, filter: "blur(14px)" },
          { opacity: 0.92, filter: "blur(0px)", ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: 0.6 } },
        );
        gsap.to("[data-mist='1']", { xPercent: 12, ease: "none", ...base });
        gsap.to("[data-mist='2']", { xPercent: -18, ease: "none", ...base });
      }

      if (park.motion === "water-column") {
        // Scroll drives the falls downward past the type.
        gsap.fromTo("[data-water]", { yPercent: -55 }, { yPercent: 55, ease: "none", ...base });
      }

      if (park.motion === "heat-shimmer") {
        // The horizon wavers. Animating the turbulence seed is cheap; animating
        // baseFrequency would re-render the filter kernel every frame.
        const turb = el.querySelector("feTurbulence");
        if (turb) {
          gsap.to({ s: 0 }, {
            s: 24, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
            onUpdate() { turb.setAttribute("seed", String(Math.round(this.targets()[0].s))); },
          });
        }
      }
    }, el);

    return () => ctx.revert(); // kills every trigger this panel made
  }, [near, prefersReducedMotion, park.motion, variant]);

  const sky = SKY[park.motion] ?? "linear-gradient(to bottom, #16352A 0%, var(--color-forest) 100%)";
  const ochre = "color-mix(in oklab, var(--color-murram) 55%, var(--color-papyrus))";

  if (variant === "plain") {
    return (
      <section
        ref={root}
        aria-labelledby={`panel-${park.slug}`}
        className="relative border-t border-mist/15 bg-forest px-6 py-24 md:px-10"
      >
        <div className="mx-auto flex max-w-[90rem] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id={`panel-${park.slug}`} className="max-w-[14ch] font-poster text-[length:var(--step-4)] uppercase leading-[0.9] text-papyrus">
              {park.name}
            </h2>
            <p className="mt-5 max-w-[46ch] font-body leading-relaxed text-papyrus/85">
              {park.signatureAttraction}
            </p>
          </div>
          <Link
            to={`/parks/${park.slug}`}
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus transition-colors hover:text-crane focus-visible:text-crane"
          >
            Explore {park.name} →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={root}
      aria-labelledby={`panel-${park.slug}`}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      style={{ backgroundImage: sky }}
    >
      {/* Back layer: sun disc / haze */}
      <div data-layer="back" className="pointer-events-none absolute inset-0 -z-30">
        {park.motion === "heat-shimmer" && (
          <SunDisc
            className="absolute left-1/2 top-[26%] h-[22vw] w-[22vw] -translate-x-1/2"
            style={{ color: ochre }}
          />
        )}
        {park.motion === "mist-drift" && (
          <>
            <div data-mist="1" className="absolute inset-x-[-20%] top-[38%] h-[26%] blur-3xl"
              style={{ background: "color-mix(in oklab, var(--color-papyrus) 22%, transparent)" }} />
            <div data-mist="2" className="absolute inset-x-[-20%] top-[54%] h-[22%] blur-3xl"
              style={{ background: "color-mix(in oklab, var(--color-papyrus) 14%, transparent)" }} />
          </>
        )}
        {park.motion === "water-column" && (
          <div data-water className="absolute left-1/2 top-0 h-[180%] w-[14vw] -translate-x-1/2 blur-2xl"
            style={{ background: "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-papyrus) 42%, transparent) 30%, color-mix(in oklab, var(--color-papyrus) 22%, transparent) 70%, transparent)" }} />
        )}
      </div>

      {/* The name — semi-transparent, poster-scale, occluded by the foreground */}
      <h2
        id={`panel-${park.slug}`}
        data-layer="name"
        className="pointer-events-none absolute inset-x-0 -z-20 px-6 text-center font-poster uppercase leading-[0.84] md:px-10"
        style={{
          fontSize: "var(--step-poster)",
          color: "color-mix(in oklab, var(--color-papyrus) 88%, transparent)",
          filter: park.motion === "heat-shimmer" ? "url(#heat-shimmer)" : undefined,
        }}
      >
        {park.name.replace(/ National Park$/, "")}
      </h2>

      {park.motion === "heat-shimmer" && (
        <svg aria-hidden="true" className="absolute h-0 w-0">
          <filter id="heat-shimmer">
            {/* scale was 14 — at that strength the letterforms read as torn
                rather than shimmering. Heat haze bends an edge, it doesn't
                shred it. Lower frequency and half the displacement gives a
                slow waver that still reads at poster scale. */}
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.022" numOctaves="2" seed="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}

      {/* Foreground silhouettes — the layer that cuts across the type */}
      <div data-layer="fore" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        {park.motion === "mist-drift" && (
          <CanopyEdge className="h-[34svh] w-full" style={{ color: "var(--color-forest)" }} />
        )}
        {park.motion === "heat-shimmer" && (
          <>
            {/* Trunks must meet the ground band, not sink behind it, and both
                trees sit right of centre so they never end up behind the copy
                card in the lower left. */}
            <Acacia className="absolute bottom-[13svh] left-[58%] h-[24svh] w-auto" style={{ color: "var(--color-murram-deep)" }} />
            <Acacia className="absolute bottom-[13svh] left-[80%] h-[16svh] w-auto" style={{ color: "var(--color-murram-deep)" }} />
            <div className="h-[14svh] w-full" style={{ background: "var(--color-murram-deep)" }} />
          </>
        )}
        {park.motion === "water-column" && (
          <div className="h-[22svh] w-full"
            style={{ background: "linear-gradient(to top, var(--color-murram-deep) 60%, transparent)" }} />
        )}
      </div>

      {/* Copy block, on a guaranteed ground */}
      <div className="relative mx-auto w-full max-w-[90rem] px-6 pb-14 pt-[60svh] md:px-10">
        <div className="max-w-[46ch] rounded-sm p-6 md:p-8"
          style={{ background: "color-mix(in oklab, var(--color-forest) 78%, transparent)" }}>
          <p className="font-body leading-relaxed text-papyrus">{park.signatureAttraction}</p>
          <Link
            to={`/parks/${park.slug}`}
            className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus transition-colors hover:text-crane focus-visible:text-crane"
          >
            Explore →
          </Link>
        </div>
      </div>
    </section>
  );
}
