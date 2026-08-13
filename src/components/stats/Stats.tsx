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

export function Stats() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section
      aria-labelledby="numbers-heading"
      className="bg-papyrus px-6 py-24 text-ink md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[90rem]">
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

        <dl className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            // UWA's own site supplies this line for the mammal figure
            // specifically; every other stat keeps whatever note it already
            // carries in facts.ts, or none where the source gave none.
            const note = stat.label === "mammal species" ? mammalFact : stat.note;
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

        {/* UWA's own homepage disagrees with itself on three of these
            figures. Disclosed rather than quietly resolved, per this
            project's rule that a conflicting source is reported, never
            silently picked for the visitor. Kept small and factual, not an
            alert: a footnote, not a warning. */}
        <div className="mt-16 max-w-[70ch] border-t border-mist-deep/20 pt-8">
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
