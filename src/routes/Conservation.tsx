import { pages } from "../data/pages";
import { identity, mandate, mission, stats } from "../data/facts";

/**
 * UWA's own /conservation/ page is empty — confirmed against their WordPress
 * REST API, where content.rendered is an unfilled Brizy container. Rather than
 * invent conservation copy to paper over that, this page is assembled from
 * material that genuinely exists (the mission, the mandate, the vision and
 * core values from the About page) and says plainly what is still missing.
 */
export function Conservation() {
  const vision = pages.about.sections.find((s) =>
    s.heading?.toUpperCase().includes("VISION"),
  );
  const values = pages.about.sections.find((s) =>
    s.heading?.toLowerCase().includes("core values"),
  );
  const whatWeDo = pages.about.sections.find((s) =>
    s.heading?.toLowerCase().includes("what we do"),
  );

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        Conservation
      </p>
      <h1 className="mt-4 max-w-[16ch] font-display text-[length:var(--step-5)] font-light leading-[1.02]">
        A mandate, not a marketing line
      </h1>

      <blockquote className="mt-16 max-w-[30ch] border-l border-mist/30 pl-8">
        <p className="font-display text-[length:var(--step-3)] font-light leading-[1.15]">
          &ldquo;{mission.quote}&rdquo;
        </p>
        <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
          <cite className="not-italic">{mission.attribution}</cite>
          <span aria-hidden="true"> · </span>Established {identity.established}
        </footer>
      </blockquote>

      <section aria-labelledby="responsibility" className="mt-24">
        <h2
          id="responsibility"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          What UWA is responsible for
        </h2>
        <dl className="mt-8 grid gap-x-8 gap-y-8 border-t border-mist/20 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {mandate.map((entry) => (
            <div key={entry.label}>
              <dt className="font-mono text-[length:var(--step-4)] leading-none tabular-nums">
                {entry.count}
              </dt>
              <dd className="mt-3 max-w-[18ch] font-body leading-snug text-papyrus/85">
                {entry.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {(vision || values || whatWeDo) && (
        <div className="mt-24 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {[whatWeDo, vision, values].filter(Boolean).map((section, i) => (
            <section key={i}>
              {section?.heading && (
                <h2 className="font-display text-[length:var(--step-2)] font-light leading-tight">
                  {section.heading}
                </h2>
              )}
              {section?.body && (
                <p className="mt-4 max-w-[54ch] font-body leading-relaxed text-papyrus/85">
                  {section.body}
                </p>
              )}
            </section>
          ))}
        </div>
      )}

      <section aria-labelledby="numbers" className="mt-24">
        <h2
          id="numbers"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          What the parks hold
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-6 border-t border-mist/20 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <li key={stat.label} className="font-body text-papyrus/85">
              <span className="font-mono text-papyrus">
                {stat.prefix}
                {stat.value.toLocaleString("en-GB")}
                {stat.suffix}
              </span>{" "}
              {stat.label}
              {stat.note && (
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-mist">
                  {stat.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Honest gap, stated plainly. Not lorem ipsum, not invented copy. */}
      <section
        aria-labelledby="pending"
        className="mt-24 border border-mist/25 p-6 md:p-8"
      >
        <h2
          id="pending"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          Content pending
        </h2>
        <p className="mt-4 max-w-[70ch] font-body leading-relaxed text-papyrus/85">
          UWA&rsquo;s conservation page currently publishes no body copy, so the
          programme detail that belongs here — anti-poaching operations, revenue
          sharing with neighbouring communities, human–wildlife conflict
          mitigation, wildlife research and the Ramsar programme — has not been
          written in. Nothing has been invented to fill the space. This section
          is waiting on copy from UWA.
        </p>
      </section>
    </div>
  );
}
