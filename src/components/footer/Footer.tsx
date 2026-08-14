import { Link } from "react-router-dom";
import { contact, cta, identity, nav, socials } from "../../data/facts";
import { fraudAlert } from "../../data/pages";
import { parks } from "../../data/parks";

export function Footer() {
  return (
    <footer className="border-t border-mist/15 bg-forest px-6 pb-16 pt-24 text-papyrus md:px-10">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <img
              src="/parks/uwa-transparent.webp"
              alt="Uganda Wildlife Authority crest"
              width={160}
              height={160}
              loading="lazy"
              className="h-16 w-auto"
            />
            <p className="mt-6 max-w-[30ch] font-body leading-relaxed text-papyrus/85">
              {identity.tagline}
            </p>
            <p className="mt-4 max-w-[34ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-mist">
              {identity.status}
            </p>
          </div>

          {/* Park index */}
          <nav aria-labelledby="footer-parks">
            <h2
              id="footer-parks"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
            >
              National parks
            </h2>
            <ul className="mt-6 space-y-2.5">
              {parks.map((park) => (
                <li key={park.slug}>
                  <Link
                    to={`/parks/${park.slug}`}
                    className="font-body text-papyrus/85 transition-colors hover:text-papyrus focus-visible:text-papyrus"
                  >
                    {park.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + secondary nav */}
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              Contact
            </h2>
            <ul className="mt-6 space-y-2.5 font-body text-papyrus/85">
              <li>
                Toll free{" "}
                <a
                  href={`tel:${contact.tollFree.replace(/\s/g, "")}`}
                  className="font-mono transition-colors hover:text-papyrus"
                >
                  {contact.tollFree}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="font-mono transition-colors hover:text-papyrus"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.landline.replace(/\s/g, "")}`}
                  className="font-mono transition-colors hover:text-papyrus"
                >
                  {contact.landline}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-papyrus"
                >
                  {contact.email}
                </a>
              </li>
              <li className="max-w-[26ch] pt-2">{contact.address}</li>
            </ul>

            {/* Real, clickable profiles, not just a printed "@ugwildlife".
                A visually-hidden label per link so "X", "Instagram" and
                "Facebook" read as three distinct destinations to a screen
                reader rather than three identical "opens in a new tab"
                announcements. */}
            <ul className="mt-6 flex gap-5">
              {socials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.15em] text-mist transition-colors hover:text-papyrus focus-visible:text-papyrus"
                  >
                    {s.platform}
                    <span className="sr-only"> ({s.handle}, opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-8 space-y-2.5">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/85 transition-colors hover:text-papyrus"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* One link, not a second full nav column: UWA's own footer
                  treats "Wildlife Reserves" as a single line inside a larger
                  column rather than an expanded list, and the "National
                  parks" column here is already a full index on its own. */}
              <li>
                <Link
                  to="/#reserves"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/85 transition-colors hover:text-papyrus"
                >
                  Wildlife Reserves
                </Link>
              </li>
              <li>
                <a
                  href={cta.secondary.href}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/85 transition-colors hover:text-papyrus"
                >
                  {cta.secondary.label} (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Fraud alert — a standing notice, not an alarm. Deliberately quiet:
            a hairline border and ordinary body text. No gold (gold is reserved
            for actions), no red, no icon, and emphatically not a modal. */}
        <section
          aria-labelledby="fraud-alert-heading"
          className="mt-20 border border-mist/25 p-6 md:p-8"
        >
          <h2
            id="fraud-alert-heading"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
          >
            Fraud alert
          </h2>
          <p className="mt-4 max-w-[85ch] whitespace-pre-line font-body text-sm leading-relaxed text-papyrus/85">
            {fraudAlert.body}
          </p>
        </section>

        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
          Speculative redesign · not affiliated with or endorsed by{" "}
          {identity.name}
        </p>
      </div>
    </footer>
  );
}
