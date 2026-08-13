import { Link } from "react-router-dom";
import { contact, cta } from "../data/facts";
import { pages } from "../data/pages";
import { parks } from "../data/parks";

/**
 * Utilitarian on purpose. Someone reaching this page is trying to book a permit
 * or phone a human, not admire typography — so it is scannable, dense, and gets
 * out of the way. The drama lives on the homepage.
 */
export function PlanYourVisit() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        Plan your visit
      </p>
      <h1 className="mt-4 max-w-[18ch] font-display text-[length:var(--step-5)] font-light leading-[1.02]">
        Permits, rates and contacts
      </h1>

      <div className="mt-16 grid gap-x-16 gap-y-16 md:grid-cols-2">
        <section aria-labelledby="permits">
          <h2
            id="permits"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
          >
            Permits and rates
          </h2>
          <p className="mt-5 max-w-[52ch] font-body leading-relaxed text-papyrus/85">
            Park entry fees, gorilla and chimpanzee tracking permits, and all
            other conservation tariffs are published by UWA in a single rates
            document.
          </p>
          <a
            href={cta.secondary.href}
            className="mt-8 inline-block rounded-full bg-crane px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-90"
          >
            {cta.secondary.label} (PDF)
          </a>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-mist">
            Conservation tariff, July 2024 – June 2026
          </p>
        </section>

        <section aria-labelledby="contact-uwa">
          <h2
            id="contact-uwa"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
          >
            Reservations
          </h2>
          <dl className="mt-5 space-y-4 font-body text-papyrus/85">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                Toll free
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${contact.tollFree.replace(/\s/g, "")}`}
                  className="font-mono text-[length:var(--step-1)] text-papyrus transition-colors hover:text-crane"
                >
                  {contact.tollFree}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                Telephone
              </dt>
              <dd className="mt-1 font-mono">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-crane"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-crane"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                Head office
              </dt>
              <dd className="mt-1 max-w-[30ch]">{contact.address}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section aria-labelledby="terms" className="mt-24">
        <h2
          id="terms"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          Booking terms
        </h2>
        <div className="mt-6 space-y-6 border-t border-mist/20 pt-8">
          {pages.bookingTerms.sections.map((section, i) => (
            <div key={i}>
              {section.body && (
                <p className="max-w-[76ch] font-body leading-relaxed text-papyrus/85">
                  {section.body}
                </p>
              )}
            </div>
          ))}
          {/* The live page genuinely states that no detailed terms are
              published. Saying so is more useful than inventing terms. */}
          <p className="max-w-[76ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-mist">
            UWA&rsquo;s booking-terms page currently states that no detailed
            terms are published. Nothing has been drafted in their place.
          </p>
        </div>
      </section>

      <section aria-labelledby="where" className="mt-24">
        <h2
          id="where"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          Where you can go
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-mist/20 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {parks.map((park) => (
            <li key={park.slug}>
              <Link
                to={`/parks/${park.slug}`}
                className="font-body text-papyrus/85 transition-colors hover:text-crane focus-visible:text-crane"
              >
                {park.name}
              </Link>
              {park.region && (
                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-mist">
                  {park.region}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
