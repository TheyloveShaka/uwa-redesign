import { Link } from "react-router-dom";
import { mandate, mission, identity } from "../../data/facts";

/**
 * The mission, given the weight it deserves. This is the section that separates
 * a wildlife *authority* from a tour operator, so it states a mandate rather
 * than selling anything: one quote, the numbers UWA is responsible for, and a
 * single link. No urgency, no offer, no second CTA.
 */
export function ConservationBlock() {
  return (
    <section
      aria-labelledby="conservation-heading"
      className="border-t border-mist/15 bg-forest px-6 py-24 text-papyrus md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[90rem]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          Our mandate
        </p>
        <h2 id="conservation-heading" className="sr-only">
          Conservation mandate
        </h2>

        <blockquote className="mt-8 max-w-[26ch] md:max-w-[20ch]">
          <p className="font-display text-[length:var(--step-4)] font-light leading-[1.12]">
            &ldquo;{mission.quote}&rdquo;
          </p>
          <footer className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
            <cite className="not-italic">{mission.attribution}</cite>
            <span aria-hidden="true"> · </span>
            Established {identity.established}
          </footer>
        </blockquote>

        <dl className="mt-20 grid gap-x-8 gap-y-10 border-t border-mist/20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {mandate.map((entry) => (
            <div key={entry.label}>
              <dt className="font-mono text-[length:var(--step-4)] leading-none tabular-nums">
                {entry.count}
              </dt>
              <dd className="mt-3 max-w-[18ch] font-body leading-snug text-papyrus/85">
                {entry.label}
                {/* CWMAs are guided, not managed — the distinction is UWA's own. */}
                {"verb" in entry && entry.verb && (
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                    {entry.verb}, not managed
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          to="/conservation"
          className="mt-16 inline-block rounded-full border border-papyrus/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-papyrus transition-colors hover:border-crane hover:bg-crane hover:text-ink focus-visible:border-crane focus-visible:bg-crane focus-visible:text-ink"
        >
          Our conservation work
        </Link>
      </div>
    </section>
  );
}
