import { Link, useParams } from "react-router-dom";
import { reserveBySlug, reserves } from "../data/reserves";

/**
 * Mirrors ParkDetail's pattern (route param, `*BySlug` lookup, verbatim-only
 * rendering) but simplified: Reserve carries no `panel`/`motion`/
 * `subjectMask` fields, so there is no poster-panel or occlusion treatment
 * to fake here, just a plain hero header, image or not.
 *
 * The eight directory-style reserves have no `intro` — their content lives
 * entirely in `sections` (see reserves.ts's header comment). Rendered
 * uniformly as a sequence of labeled sections works for both content
 * styles: the three flowing-prose reserves (Toro Semliki, Katonga, Kabwoya)
 * read as ordinary article sections, and the eight directory-style ones read
 * as their original labeled fields (Date Established, Fauna, ...), exactly
 * as printed, without inventing a second layout just to distinguish them.
 */
export function ReserveDetail() {
  const { slug } = useParams<{ slug: string }>();
  const reserve = slug ? reserveBySlug(slug) : undefined;

  if (!reserve) {
    return (
      <section className="mx-auto max-w-[60rem] px-6 py-40 md:px-10">
        <h1 className="font-display text-[length:var(--step-4)] font-light">
          We don&rsquo;t have a reserve at that address
        </h1>
        <p className="mt-6 max-w-[46ch] font-body text-lg leading-relaxed text-papyrus/85">
          The link may be out of date. All eleven Wildlife Reserves are listed below.
        </p>
        <ul className="mt-10 space-y-3">
          {reserves.map((r) => (
            <li key={r.slug}>
              <Link
                to={`/reserves/${r.slug}`}
                className="font-body text-papyrus/85 underline underline-offset-4 transition-colors hover:text-crane focus-visible:text-crane"
              >
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const meta = [
    reserve.areaKm2 ? `${reserve.areaKm2.toLocaleString("en-GB")} km²` : null,
    reserve.gazettedYear ? `Gazetted ${reserve.gazettedYear}` : null,
    reserve.region,
  ].filter(Boolean);

  const altText = reserve.signatureAttraction
    ? `${reserve.name}, ${reserve.signatureAttraction}`
    : reserve.name;

  // Most of areaRaw duplicates the derived areaKm2 exactly ("542 km2" for a
  // 542 areaKm2) — not worth a second line. Only worth surfacing on its own
  // when the page's own wording actually carries more than that (a
  // hectare-only original figure, a disputed pair of numbers, or Kabwoya's
  // nested-reserve explanation).
  const areaRawIsTrivial =
    reserve.areaRaw?.replace(/\s+/g, "").toLowerCase() === `${reserve.areaKm2}km2`;

  return (
    <article>
      {reserve.image ? (
        <header className="relative isolate flex min-h-[54svh] items-end overflow-hidden">
          <img
            src={reserve.image}
            alt={altText}
            width={1600}
            height={1000}
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          {/* Same two-scrim formula as ParkDetail: enough at the bottom to
              carry the wordmark and meta, a lighter one at the top so the
              floating nav stays legible over whichever photo loads. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(to top, var(--color-forest) 4%, color-mix(in oklab, var(--color-forest) 82%, transparent) 34%, color-mix(in oklab, var(--color-forest) 30%, transparent) 68%, transparent 100%), linear-gradient(to bottom, color-mix(in oklab, var(--color-forest) 64%, transparent) 0%, color-mix(in oklab, var(--color-forest) 34%, transparent) 45%, transparent 78%)",
            }}
          />
          <div className="mx-auto w-full max-w-[90rem] px-6 pb-14 md:px-10 md:pb-16">
            <Link
              to="/#reserves"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/85 transition-colors hover:text-crane focus-visible:text-crane"
            >
              ← All reserves
            </Link>
            <h1 className="mt-6 max-w-[20ch] font-poster text-[length:var(--step-6)] uppercase leading-[0.9] text-papyrus">
              {reserve.name}
            </h1>
            {meta.length > 0 && (
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/85">
                {meta.join(" · ")}
              </p>
            )}
            {reserve.areaDisputed && (
              <p className="mt-3 max-w-[52ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-mist">
                Reserve area pending confirmation from UWA
              </p>
            )}
          </div>
        </header>
      ) : (
        // No hero photo (Toro Semliki only — see reserves.ts). Rather than
        // fake a short version of the image hero, this is a plain padded
        // block: no absolute-positioned content trying to bottom-anchor
        // inside a short box, which is what caused an earlier version of
        // this to sit directly under the fixed nav and collide with its
        // logo at both mobile and desktop widths. `pt-32`/`md:pt-40` is a
        // guaranteed floor of clearance under the fixed nav regardless of
        // how many lines the name wraps to, rather than a min-height
        // guessed to "probably" leave enough room.
        <header className="bg-forest px-6 pb-14 pt-32 md:px-10 md:pb-16 md:pt-40">
          <div className="mx-auto w-full max-w-[90rem]">
            <Link
              to="/#reserves"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/85 transition-colors hover:text-crane focus-visible:text-crane"
            >
              ← All reserves
            </Link>
            <h1 className="mt-6 max-w-[20ch] font-poster text-[length:var(--step-6)] uppercase leading-[0.9] text-papyrus">
              {reserve.name}
            </h1>
            {meta.length > 0 && (
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/85">
                {meta.join(" · ")}
              </p>
            )}
            {reserve.areaDisputed && (
              <p className="mt-3 max-w-[52ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-mist">
                Reserve area pending confirmation from UWA
              </p>
            )}
          </div>
        </header>
      )}

      <div className="mx-auto grid max-w-[90rem] gap-16 px-6 py-24 md:grid-cols-[1.4fr_1fr] md:px-10 md:py-28">
        <div>
          {reserve.intro && (
            <p className="max-w-[60ch] font-body text-[length:var(--step-1)] leading-relaxed text-papyrus/90">
              {reserve.intro}
            </p>
          )}

          {/* The page's own labeled sections, verbatim, in page order. */}
          <div className={`space-y-12 ${reserve.intro ? "mt-16" : ""}`}>
            {reserve.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                  {section.heading}
                </h2>
                <p className="mt-4 max-w-[62ch] font-body leading-relaxed text-papyrus/85">
                  {section.text}
                </p>
              </section>
            ))}
          </div>

          {reserve.signatureAttraction && (
            <>
              <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                Signature attraction
              </h2>
              <p className="mt-4 max-w-[46ch] font-display text-[length:var(--step-2)] font-light leading-snug">
                {reserve.signatureAttraction}
              </p>
            </>
          )}
        </div>

        <div className="space-y-14">
          {reserve.activities.length > 0 && (
            <section aria-labelledby={`${reserve.slug}-activities`}>
              <h2
                id={`${reserve.slug}-activities`}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
              >
                Activities
              </h2>
              <ul className="mt-5 space-y-2 font-body text-papyrus/85">
                {reserve.activities.map((a) => (
                  <li key={a} className="border-b border-mist/15 pb-2">
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {reserve.keySpecies.length > 0 && (
            <section aria-labelledby={`${reserve.slug}-species`}>
              <h2
                id={`${reserve.slug}-species`}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
              >
                Key species
              </h2>
              <p className="mt-5 font-body leading-relaxed text-papyrus/85">
                {reserve.keySpecies.join(", ")}
              </p>
            </section>
          )}

          {reserve.areaRaw && !areaRawIsTrivial && (
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                Area as published
              </h2>
              <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-mist">
                {reserve.areaRaw}
              </p>
            </section>
          )}

          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-mist">
            Source:{" "}
            <a
              href={reserve.sourceUrl}
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
