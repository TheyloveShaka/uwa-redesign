import { Link } from "react-router-dom";
import {
  mandate,
  mandateIntro,
  mission,
  identity,
  conservationStrategies,
} from "../data/facts";
import { pages } from "../data/pages";
import { contact } from "../data/facts";

/**
 * UWA's own /conservation/ URL publishes no body copy, confirmed against
 * their WordPress REST API, where content.rendered is an unfilled Brizy
 * container. That is still true and disclosed below.
 *
 * It is NOT true that UWA publishes nothing about conservation anywhere:
 * their homepage carries the mission statement, the mandate, and a
 * "Wildlife/Eco-System Conservation" section naming their actual strategies.
 * An earlier version of this page conflated "the /conservation/ page is
 * empty" with "there is nothing to show here" and rendered a bare pending
 * notice; that overstated the gap. This page now uses everything UWA has
 * actually published, verbatim, and discloses only the real remaining gap.
 */
export function Conservation() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        Conservation
      </p>
      <h1 className="mt-4 max-w-[16ch] font-display text-[length:var(--step-5)] font-light leading-[1.02]">
        A mandate, not a marketing line
      </h1>

      <blockquote className="mt-16 max-w-[30ch] border-l-2 border-uwa/45 pl-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
          Our Conservation Mission
        </p>
        <p className="mt-4 font-display text-[length:var(--step-3)] font-light leading-[1.15]">
          &ldquo;{mission.quote}&rdquo;
        </p>
        <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
          <cite className="not-italic">{mission.attribution}</cite>
          <span aria-hidden="true"> &middot; </span>Established {identity.established}
        </footer>
      </blockquote>

      <section aria-labelledby="our-mandate" className="mt-20 max-w-[62ch]">
        <h2 id="our-mandate" className="font-display text-[length:var(--step-2)] font-light">
          Our Mandate
        </h2>
        <div className="mt-5 space-y-4 font-body leading-relaxed text-papyrus/85">
          {mandateIntro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="responsibility" className="mt-20">
        <h2
          id="responsibility"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          What UWA is responsible for
        </h2>
        <dl className="mt-8 grid gap-x-8 gap-y-8 border-t border-uwa/25 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {mandate.map((entry) => (
            <div key={entry.label}>
              <dt className="font-mono text-[length:var(--step-4)] leading-none tabular-nums text-uwa-light">
                {entry.count}
              </dt>
              <dd className="mt-3 max-w-[18ch] font-body leading-snug text-papyrus/85">
                {entry.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="strategies" className="mt-20 max-w-[62ch]">
        <h2
          id="strategies"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          Wildlife/Eco-System Conservation
        </h2>
        <p className="mt-5 font-body leading-relaxed text-papyrus/85">
          {conservationStrategies}
        </p>
      </section>

      {/* Honest gap, stated plainly and now scoped correctly: the dedicated
          /conservation/ URL on the live site is empty, not the whole topic. */}
      <section
        aria-labelledby="pending"
        className="mt-20 border border-mist/25 p-6 md:p-8"
      >
        <h2
          id="pending"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          What is still missing here
        </h2>
        <p className="mt-4 max-w-[70ch] font-body leading-relaxed text-papyrus/85">
          UWA&rsquo;s dedicated /conservation/ page currently publishes no body
          copy of its own, so the deeper programme detail that page would
          normally carry, anti-poaching operations, revenue-sharing figures,
          human&ndash;wildlife conflict mitigation case studies, wildlife
          research output, and the Ramsar programme, has not been written in
          here. Everything above this note is real, published UWA copy from
          elsewhere on their site. Nothing below it has been invented.
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-mist">
          Empty source page:{" "}
          <a
            href={pages.conservation.sourceUrl ?? undefined}
            className="underline underline-offset-4 transition-colors hover:text-papyrus"
          >
            ugandawildlife.org/conservation
          </a>
        </p>
      </section>

      <p className="mt-16 max-w-[52ch] font-body leading-relaxed text-papyrus/85">
        For anything urgent, UWA answers on{" "}
        <a
          href={`tel:${contact.tollFree.replace(/\s/g, "")}`}
          className="font-mono text-papyrus underline underline-offset-4 transition-colors hover:text-crane focus-visible:text-crane"
        >
          {contact.tollFree}
        </a>{" "}
        or{" "}
        <a
          href={`mailto:${contact.email}`}
          className="underline underline-offset-4 transition-colors hover:text-crane focus-visible:text-crane"
        >
          {contact.email}
        </a>
        .
      </p>

      <Link
        to="/"
        className="mt-12 inline-block w-fit rounded-full border border-papyrus/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-papyrus transition-colors hover:border-crane hover:bg-crane hover:text-ink focus-visible:border-crane focus-visible:bg-crane focus-visible:text-ink"
      >
        Back to the parks
      </Link>
    </div>
  );
}
