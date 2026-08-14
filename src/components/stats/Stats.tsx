import { useEffect, useRef, useState } from "react";
import { stats, conservationFacts, mammalFact, sourceConflicts } from "../../data/facts";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * Counts from 0 to `target` once the element enters view. Under reduced motion
 * it never animates — it returns the final value immediately, so the section is
 * complete and correct rather than a column of zeroes.
 */
function useCountUp(target: number, enabled: boolean) {
  const [value, setValue] = useState(enabled ? 0 : target);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const duration = 1100;

        function tick(now: number) {
          const t = Math.min((now - start) / duration, 1);
          // Ease-out cubic: fast first, settling gently on the real figure.
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, enabled]);

  return { ref, value };
}

function Figure({ target, animate }: { target: number; animate: boolean }) {
  const { ref, value } = useCountUp(target, animate);
  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-GB")}
    </span>
  );
}

// The single figure singled out for editorial-magazine treatment: UWA's own
// most striking claim (51% of the world's remaining mountain gorillas), not
// picked by position in the array so a future reorder of `stats` in facts.ts
// can't silently swap which figure gets the big type without this file
// noticing. Falls back to the first stat if the label ever changes upstream,
// so the section still renders something sane rather than nothing.
const STANDOUT_LABEL = "of the world's mountain gorillas";

function noteFor(stat: { label: string; note?: string }) {
  // UWA's own site supplies this line for the mammal figure specifically;
  // every other stat keeps whatever note it already carries in facts.ts, or
  // none where the source gave none.
  return stat.label === "mammal species" ? mammalFact : stat.note;
}

export function Stats() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const standout = stats.find((s) => s.label === STANDOUT_LABEL) ?? stats[0];
  const rest = stats.filter((s) => s !== standout);

  return (
    <section
      aria-labelledby="numbers-heading"
      className="relative overflow-hidden bg-papyrus px-6 py-24 text-ink md:px-10 md:py-32"
    >
      {/* The section's one supporting image — quiet, not a grid of them,
          bleeding off the right edge rather than sitting inside the text
          grid. Doesn't sit under any text (nothing is laid over it), so
          there's no photo/text contrast to verify here, unlike the hero or
          Park Strip. The reserved `lg:pr-*` gutter below is what actually
          keeps it clear of the stat grid; `overflow-hidden` on the section
          just clips the bleed cleanly at the viewport edge instead of
          causing horizontal scroll. mountain_gorilla_babyface__.webp is a
          real, sourced UWA asset (see public/parks/SOURCES.md) that isn't
          used anywhere else on the page yet, and it pairs directly with the
          mountain-gorilla figure it sits beside. */}
      <img
        src="/parks/mountain_gorilla_babyface__.webp"
        alt=""
        aria-hidden="true"
        width={800}
        height={533}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -right-10 top-28 hidden h-[42%] w-[15rem] rounded-sm object-cover shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] lg:block xl:-right-16 xl:w-[18rem]"
      />

      <div className="relative mx-auto max-w-[90rem]">
        {/* "Conservation Facts" is UWA's own eyebrow for this section on
            their homepage, verbatim, sitting directly above the same stat
            block this page is drawn from. Their heading keeps their exact
            capitalisation, including the space before the question mark. */}
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist-deep">
          Conservation facts
        </p>
        <h2
          id="numbers-heading"
          className="mt-4 max-w-[36ch] font-display text-[length:var(--step-4)] font-light leading-[1.05]"
        >
          {conservationFacts.heading}
        </h2>
        <p className="mt-6 max-w-[62ch] font-body leading-relaxed text-ink/80">
          {conservationFacts.body}
        </p>

        {/* One standout figure at editorial-magazine scale, the rest kept
            at the previous uniform size around it — five equal-weight
            numbers in one grid meant nothing anchored the eye. Reserves a
            right-hand gutter on large screens for the bleeding photo above. */}
        <div className="mt-16 grid gap-x-10 gap-y-14 lg:grid-cols-[1.15fr_1fr] lg:pr-56 xl:pr-64">
          <div className="border-t-2 border-uwa pt-6">
            <dl>
              <dt className="sr-only">{standout.label}</dt>
              <dd>
                <p className="font-mono text-[length:var(--step-6)] leading-none">
                  {standout.prefix}
                  <Figure target={standout.value} animate={animate} />
                  {standout.suffix}
                </p>
                <p className="mt-5 max-w-[26ch] font-body text-xl leading-snug">
                  {standout.label}
                </p>
                {noteFor(standout) && (
                  <p className="mt-3 max-w-[32ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-mist-deep">
                    {noteFor(standout)}
                  </p>
                )}
              </dd>
            </dl>
          </div>

          <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {rest.map((stat) => {
              const note = noteFor(stat);
              return (
                <div key={stat.label} className="border-t border-mist-deep/30 pt-6">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <p className="font-mono text-[length:var(--step-5)] leading-none">
                      {stat.prefix}
                      <Figure target={stat.value} animate={animate} />
                      {stat.suffix}
                    </p>
                    <p className="mt-4 max-w-[22ch] font-body text-lg leading-snug">
                      {stat.label}
                    </p>
                    {note && (
                      <p className="mt-2 max-w-[30ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-mist-deep">
                        {note}
                      </p>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        {/* UWA's own homepage disagrees with itself on three of these
            figures. Disclosed rather than quietly resolved, per this
            project's rule that a conflicting source is reported, never
            silently picked for the visitor. Kept small and factual, not an
            alert: a footnote, not a warning — and, per the design spec, no
            longer given its own border-top rule, so it doesn't compete
            structurally with the stat grid's own dividers above it. Size,
            colour and now whitespace alone set it apart instead. */}
        <div className="mt-20 max-w-[70ch]">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist-deep">
            A note on these figures
          </p>
          <ul className="mt-3 space-y-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-mist-deep">
            {sourceConflicts.map((conflict) => (
              <li key={conflict.topic}>
                {conflict.topic}: ugandawildlife.org publishes both{" "}
                {conflict.values.join(" and ")} on the same page.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
