import { pages } from "../data/pages";
import { identity, mandate } from "../data/facts";

export function About() {
  const about = pages.about;

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        About
      </p>
      <h1 className="mt-4 max-w-[18ch] font-display text-[length:var(--step-5)] font-light leading-[1.02]">
        {identity.name}
      </h1>
      <p className="mt-8 max-w-[52ch] font-body text-[length:var(--step-1)] leading-relaxed text-papyrus/90">
        {identity.status}. Established {identity.established}.
      </p>

      <dl className="mt-16 grid gap-x-8 gap-y-8 border-y border-mist/20 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {mandate.map((entry) => (
          <div key={entry.label}>
            <dt className="font-mono text-[length:var(--step-3)] leading-none tabular-nums">
              {entry.count}
            </dt>
            <dd className="mt-2 max-w-[18ch] font-body text-sm leading-snug text-papyrus/85">
              {entry.label}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-20 grid gap-x-16 gap-y-14 md:grid-cols-2">
        {about.sections.map((section, i) => (
          <section key={`${section.heading}-${i}`}>
            {section.heading && (
              <h2 className="font-display text-[length:var(--step-2)] font-light leading-tight">
                {section.heading}
              </h2>
            )}
            {section.body && (
              <p className="mt-4 max-w-[54ch] font-body leading-relaxed text-papyrus/85">
                {section.body}
              </p>
            )}
          </section>
        ))}
      </div>

      {about.sourceUrl && (
        <p className="mt-20 font-mono text-[10px] uppercase tracking-[0.12em] text-mist">
          Source:{" "}
          <a
            href={about.sourceUrl}
            className="underline underline-offset-4 transition-colors hover:text-papyrus"
          >
            ugandawildlife.org
          </a>
        </p>
      )}
    </div>
  );
}
