import { Link } from "react-router-dom";
import {
  mandate,
  mission,
  identity,
  mandateIntro,
  conservationStrategies,
  executiveDirector,
} from "../../data/facts";

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
            {/* Was max-w-22ch on desktop, narrower than mobile, which wrapped
                this to one or two words per line at 38px and read as broken
                rather than deliberate. Widened so it sets like an actual
                pull-quote paragraph instead of a single word column. */}
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

        {/* UWA's own "Our Mandate" copy, verbatim, under its own heading.
            A left rule in the brand green separates it from the mission
            above rather than just relying on spacing, and the crest sits
            beside the heading as the section's one piece of real UWA
            imagery, small and quiet rather than a logo dropped in large. */}
        <div className="mt-20 max-w-[62ch] border-l-2 border-uwa/45 pl-6 md:pl-9">
          <div className="flex items-center gap-3">
            <img
              src="/parks/uwa-transparent.webp"
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

        {/* The numbers, restyled to carry the green retheme through: the
            figures pick up --color-uwa-light as an accent, the divider
            above them does too, so the same brand colour that anchors the
            heading rule reappears here rather than the section reverting
            to plain papyrus-on-forest partway through. */}
        <dl className="mt-16 grid gap-x-8 gap-y-10 border-t border-uwa/25 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {mandate.map((entry) => (
            <div key={entry.label}>
              <dt className="font-mono text-[length:var(--step-4)] leading-none tabular-nums text-uwa-light">
                {entry.count}
              </dt>
              <dd className="mt-3 max-w-[18ch] font-body leading-snug text-papyrus/85">
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
            than more institutional prose. Text only, on purpose, see the
            note at the top of this file. */}
        <div className="mt-20 max-w-[46rem] border-t border-uwa/25 pt-10">
          <div aria-hidden="true" className="h-px w-16 bg-uwa-light" />
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            Message from the Executive Director
          </p>
          <p className="mt-6 font-display text-[length:var(--step-3)] font-light leading-snug text-papyrus">
            &ldquo;{executiveDirector.pullQuote}&rdquo;
          </p>
          <p className="mt-6 max-w-[60ch] font-body leading-relaxed text-papyrus/85">
            {executiveDirector.paragraph}
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
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
    </section>
  );
}
