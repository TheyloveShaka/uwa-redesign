import { useEffect, useRef, useState } from "react";
import { stats } from "../../data/facts";
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
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist-deep">
          By the numbers
        </p>
        <h2
          id="numbers-heading"
          className="mt-4 max-w-[20ch] font-display text-[length:var(--step-4)] font-light leading-[1.05]"
        >
          What the parks actually hold
        </h2>

        <dl className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
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
                {/* Only rendered where the source actually supplies a note. */}
                {stat.note && (
                  <p className="mt-2 max-w-[26ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-mist-deep">
                    {stat.note}
                  </p>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
