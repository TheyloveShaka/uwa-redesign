import { Link, useParams } from "react-router-dom";
import { parkBySlug, parks } from "../data/parks";

/**
 * One template, ten parks. Every field is verbatim from ugandawildlife.org and
 * anything the site does not state is simply absent — there are no placeholder
 * figures and no invented prose anywhere on this page.
 */
export function ParkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const park = slug ? parkBySlug(slug) : undefined;

  if (!park) {
    return (
      <section className="mx-auto max-w-[60rem] px-6 py-40 md:px-10">
        <h1 className="font-display text-[length:var(--step-4)] font-light">
          We don&rsquo;t have a park at that address
        </h1>
        <p className="mt-6 max-w-[46ch] font-body text-lg leading-relaxed text-papyrus/85">
          The link may be out of date. All ten national parks are listed below.
        </p>
        <ul className="mt-10 space-y-3">
          {parks.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/parks/${p.slug}`}
                className="font-body text-papyrus/85 underline underline-offset-4 transition-colors hover:text-crane focus-visible:text-crane"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // Built only from non-null values, so a park with no gazetting year shows
  // its area alone rather than an empty slot or a fabricated date.
  const meta = [
    park.areaKm2 ? `${park.areaKm2.toLocaleString("en-GB")} km²` : null,
    park.gazettedYear ? `Gazetted ${park.gazettedYear}` : null,
    park.region,
  ].filter(Boolean);

  return (
    <article>
      <header className="relative isolate flex min-h-[70svh] items-end overflow-hidden">
        <img
          src={park.image}
          alt={`${park.name} — ${park.signatureAttraction}`}
          width={1600}
          height={1000}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to top, var(--color-forest) 4%, color-mix(in oklab, var(--color-forest) 82%, transparent) 34%, color-mix(in oklab, var(--color-forest) 30%, transparent) 68%, transparent 100%)",
          }}
        />
        <div className="mx-auto w-full max-w-[90rem] px-6 pb-16 md:px-10 md:pb-20">
          <Link
            to="/#parks"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/85 transition-colors hover:text-crane focus-visible:text-crane"
          >
            ← All parks
          </Link>
          <h1 className="mt-6 max-w-[16ch] font-poster text-[length:var(--step-6)] uppercase leading-[0.9] text-papyrus">
            {park.name}
          </h1>
          {meta.length > 0 && (
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/85">
              {meta.join(" · ")}
            </p>
          )}
          {park.areaDisputed && (
            <p className="mt-3 max-w-[52ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-mist">
              Park area pending confirmation from UWA
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto grid max-w-[90rem] gap-16 px-6 py-24 md:grid-cols-[1.4fr_1fr] md:px-10 md:py-28">
        <div>
          <p className="max-w-[54ch] font-body text-[length:var(--step-1)] leading-relaxed text-papyrus/90">
            {park.intro}
          </p>
          <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            Signature attraction
          </h2>
          <p className="mt-4 max-w-[46ch] font-display text-[length:var(--step-2)] font-light leading-snug">
            {park.signatureAttraction}
          </p>
        </div>

        <div className="space-y-14">
          {park.activities.length > 0 && (
            <section aria-labelledby={`${park.slug}-activities`}>
              <h2
                id={`${park.slug}-activities`}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
              >
                Activities
              </h2>
              <ul className="mt-5 space-y-2 font-body text-papyrus/85">
                {park.activities.map((a) => (
                  <li key={a} className="border-b border-mist/15 pb-2">
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {park.keySpecies.length > 0 && (
            <section aria-labelledby={`${park.slug}-species`}>
              <h2
                id={`${park.slug}-species`}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
              >
                Key species
              </h2>
              <p className="mt-5 font-body leading-relaxed text-papyrus/85">
                {park.keySpecies.join(", ")}
              </p>
            </section>
          )}

          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-mist">
            Source:{" "}
            <a
              href={park.sourceUrl}
              className="underline underline-offset-4 transition-colors hover:text-papyrus"
            >
              ugandawildlife.org
            </a>
          </p>
        </div>
      </div>
    </article>
  );
}
