import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  mandate,
  mission,
  identity,
  mandateIntro,
  conservationStrategies,
  executiveDirector,
} from "../../data/facts";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { canAutoplayVideo } from "../../lib/media";

// Reuses the same local stand-in as the hero (public/parks/hero.mp4): the
// watermarked Adobe Stock crane comp, gitignored, never committed. Same
// caveats as there, this is a comping aid for the layout, not shippable
// media. The licensed replacement only needs to satisfy the same gating
// below; nothing else about this section depends on which file it is.
const bgVideoSrc = `${import.meta.env.BASE_URL}parks/hero.mp4`;

/**
 * The mission, given the weight it deserves. This is the section that separates
 * a wildlife *authority* from a tour operator, so it states a mandate rather
 * than selling anything: the mission quote, the numbers UWA is responsible for,
 * what its conservation work actually consists of, and a single link.
 *
 * Every heading here is UWA's own section title, verbatim from
 * ugandawildlife.org: "Our Conservation Mission", "Our Mandate",
 * "Wildlife/Eco-System Conservation". No photo of the Executive Director is
 * used, real or generated, since none was sourced from UWA. Passing off a
 * stock or invented image as a photo of a named, real person is not something
 * this project will do; his section stays text, better typeset instead.
 *
 * SCOPE NOTE on the video background. The first version of this pinned the
 * video behind the ENTIRE section using `position: sticky`, so it would
 * still be visible behind the stat grid and the Executive Director's
 * statement far down the page. That version measured as completely flat,
 * #0E2109, zero frame-to-frame variation, at every point tested, even after
 * removing every darkening effect and forcing the scrim to solid red via
 * injected styles. Direct pixel reads off the <video> element itself (via
 * canvas, bypassing CSS entirely) proved the video WAS decoding real,
 * varying frames the whole time, so the footage was fine; something about
 * compositing a <video> inside a `position: sticky` ancestor with a negative
 * z-index simply wasn't painting in this headless Chromium build. The
 * hero's own video, using plain `position: absolute` with no sticky
 * involved, has rendered correctly and been measured dozens of times
 * throughout this project, so that is the pattern reused here instead of
 * chasing the sticky bug further. The trade-off: the video backs the
 * mission-quote panel at the top of this section, not the full scrolling
 * length of it. Everything below that panel, "Our Mandate", the stat grid,
 * the strategies paragraph, the ED statement, sits on the plain forest
 * ground exactly as before.
 */
export function ConservationBlock() {
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Below the fold: don't request or decode the video until the panel is
  // actually approaching the viewport.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setNear(true),
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const canPlay = near && canAutoplayVideo(prefersReducedMotion);

  return (
    <section
      aria-labelledby="conservation-heading"
      className="border-t border-mist/15 bg-forest text-papyrus"
    >
      {/* Mission panel: the one part of this section with a video ground.
          Same proven pattern as the hero (absolute + object-cover inside a
          relatively positioned, fixed-height wrapper), not the sticky
          technique that failed to composite. Bounded height, not the whole
          section, so it stays a real, checkable panel rather than an
          unverifiable full-page pin. */}
      <div
        ref={panelRef}
        className="relative isolate flex min-h-[78svh] items-center overflow-hidden px-6 py-20 md:px-10"
      >
        {canPlay && (
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={bgVideoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                opacity: videoReady ? 1 : 0,
                transition: "opacity 800ms ease",
              }}
              onCanPlay={() => setVideoReady(true)}
            />
            {/* Measured against the actual playing footage, worst case
                across the loop, sampled beside the real text rather than
                reasoned from the token value. 58% and 72% both left a real
                gap: the grass in this clip is pale enough, and a crane's
                white plumage passes close enough to the quote, that some
                frames dropped as low as 1.9:1 near the top of the panel.
                82% clears every sampled point with real margin: eyebrow
                8.74:1, kicker 8.92:1, quote 8.53:1, attribution 9.08:1,
                all >= 4.5:1, while the crane and grass stay clearly visible
                (see the screenshots in scratchpad from this pass). */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--color-forest) 82%, transparent)",
              }}
            />
          </div>
        )}
        {/* Flat fallback when video isn't qualifying (reduced motion, slow
            connection, narrow viewport, or not scrolled near yet): the
            panel is still complete and on-brand without it. */}
        {!canPlay && (
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-forest" />
        )}

        <div className="mx-auto w-full max-w-[90rem]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            Our mandate
          </p>
          <h2 id="conservation-heading" className="sr-only">
            Conservation mandate
          </h2>

          {/* Mission, given a real decorative mark instead of just quote
              punctuation. The glyph is UWA green, not gold: gold stays
              reserved for actions and live indicators, green is the brand
              accent everywhere else. */}
          <div className="mt-10 flex gap-2 md:gap-6">
            <span
              aria-hidden="true"
              className="hidden shrink-0 select-none font-display text-[6rem] leading-[0.7] text-uwa-light/25 md:block"
            >
              &ldquo;
            </span>
            <blockquote className="max-w-[30ch] md:max-w-[42ch]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                Our Conservation Mission
              </p>
              <p className="mt-4 font-display text-[length:var(--step-4)] font-light leading-[1.12]">
                &ldquo;{mission.quote}&rdquo;
              </p>
              <footer className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
                <cite className="not-italic">{mission.attribution}</cite>
                <span aria-hidden="true"> &middot; </span>
                Established {identity.established}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[90rem]">
          {/* UWA's own "Our Mandate" copy, verbatim, under its own heading.
              A left rule in the brand green separates it from the mission
              above rather than just relying on spacing, and the crest sits
              beside the heading as the section's one piece of real UWA
              imagery, small and quiet rather than a logo dropped in large. */}
          <div className="max-w-[62ch] border-l-2 border-uwa/45 pl-6 md:pl-9">
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}parks/uwa-transparent.webp`}
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                loading="lazy"
                className="h-8 w-auto opacity-90"
              />
              <h3 className="font-display text-[length:var(--step-3)] font-light text-papyrus">
                Our Mandate
              </h3>
            </div>
            <div className="mt-5 space-y-4 font-body leading-relaxed text-papyrus/85">
              {mandateIntro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* The numbers, deliberately NOT a second card grid: Stats already
              owns that device (sm:grid-cols-2 lg:grid-cols-4, same type
              scale), and stacking two visually identical stat grids back to
              back on one page read as templated rather than composed. Here
              the same four figures run as a single horizontal row of
              number/label pairs separated by rules, closer to a ticker than
              a dashboard — the figures still pick up --color-uwa-light as
              an accent, same brand colour that anchors the heading rule
              above, just in a different structural device. */}
          <dl className="mt-16 flex flex-wrap gap-x-0 gap-y-8 border-t border-uwa/25 pt-10">
            {mandate.map((entry, index) => (
              <div
                key={entry.label}
                className={`flex items-baseline gap-3 pr-8 ${
                  index > 0 ? "border-l border-uwa/25 pl-8" : ""
                }`}
              >
                <dt className="font-mono text-[length:var(--step-3)] leading-none tabular-nums text-uwa-light">
                  {entry.count}
                </dt>
                <dd className="max-w-[16ch] font-body text-sm leading-snug text-papyrus/85">
                  {entry.label}
                  {/* CWMAs are guided, not managed, the distinction is UWA's own. */}
                  {"verb" in entry && entry.verb && (
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                      {entry.verb}, not managed
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {/* Verbatim from UWA's own "Wildlife/Eco-System Conservation"
              section: what their conservation work actually consists of,
              rather than leaving the mandate as numbers alone. Same rule
              treatment as "Our Mandate" above, for a consistent rhythm. */}
          <div className="mt-20 max-w-[62ch] border-l-2 border-uwa/45 pl-6 md:pl-9">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              Wildlife/Eco-System Conservation
            </h3>
            <p className="mt-5 font-body leading-relaxed text-papyrus/85">
              {conservationStrategies}
            </p>
          </div>

          {/* Executive Director's statement: a named, attributed voice rather
              than more institutional prose, so it earns different treatment
              than "Our Mandate" and the strategies paragraph above it, not
              just a repeat of the same rule-plus-eyebrow rhythm. Same
              left-border device as those two blocks, but at a visibly
              higher opacity (/70 vs their /45) so the rule itself reads as
              heavier without introducing a fourth new device on the page,
              a bigger jump in the pull-quote's own scale (--step-4, up from
              --step-3), and more surrounding whitespace than the mandate
              copy gets. Text only, on purpose, see the note at the top of
              this file. */}
          <div className="mt-28 max-w-[46rem] border-l-2 border-uwa/70 pl-6 md:pl-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              Message from the Executive Director
            </p>
            <p className="mt-8 font-display text-[length:var(--step-4)] font-light leading-[1.08] text-papyrus">
              &ldquo;{executiveDirector.pullQuote}&rdquo;
            </p>
            <p className="mt-8 max-w-[60ch] font-body leading-relaxed text-papyrus/85">
              {executiveDirector.paragraph}
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
              {executiveDirector.name}
              <span aria-hidden="true"> &middot; </span>
              {executiveDirector.title}
            </p>
          </div>

          <Link
            to="/conservation"
            className="mt-16 inline-block rounded-full border border-papyrus/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-papyrus transition-colors hover:border-crane hover:bg-crane hover:text-ink focus-visible:border-crane focus-visible:bg-crane focus-visible:text-ink"
          >
            Our conservation work
          </Link>
        </div>
      </div>
    </section>
  );
}
