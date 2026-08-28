import { experiences } from "../../data/facts";

/**
 * Three cards, deliberately not three equal boxes. Only the Batwa Experience
 * carries real body copy (the other two are honestly marked "Description to
 * be supplied by UWA" — ugandawildlife.org does not supply it, and inventing
 * a paragraph of safari-brochure prose would be exactly the failure this
 * project forbids). Equal visual weight for unequal content read as a
 * mistake rather than a choice, so the layout now says the quiet part out
 * loud: the card with more to say gets more width, and the two placeholders
 * are sized and muted to read as "index card, more coming" rather than
 * "broken card, copy missing."
 */

const MEDIA: Record<string, { src: string; alt: string }> = {
  "gorilla-tracking": {
    src: `${import.meta.env.BASE_URL}parks/gorilla-uganda-primate-trekking-eating.webp`,
    alt: "A mountain gorilla feeding on foliage in dense forest undergrowth",
  },
  "chimpanzee-tracking": {
    src: `${import.meta.env.BASE_URL}parks/Kibale-chimpanzees.webp`,
    alt: "Chimpanzees in the forest canopy at Kibale",
  },
  "batwa-experience": {
    src: `${import.meta.env.BASE_URL}parks/the-batwa-of-mgahinga.webp`,
    alt: "Batwa community members outside the forest at Mgahinga",
  },
};

const FEATURED_SLUG = "batwa-experience";

export function Experiences() {
  const featured = experiences.find((item) => item.slug === FEATURED_SLUG);
  const rest = experiences.filter((item) => item.slug !== FEATURED_SLUG);
  const featuredMedia = featured ? MEDIA[featured.slug] : undefined;

  return (
    <section
      aria-labelledby="experiences-heading"
      className="bg-forest px-6 py-24 text-papyrus md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[90rem]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          Featured experiences
        </p>
        <h2
          id="experiences-heading"
          className="mt-4 max-w-[22ch] font-display text-[length:var(--step-4)] font-light leading-[1.05]"
        >
          Three ways into the forest
        </h2>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-[1.6fr_1fr]">
          {/* The one card with real body copy: wide, full-scale treatment. */}
          {featured && (
            <article>
              {featuredMedia && (
                <img
                  src={featuredMedia.src}
                  alt={featuredMedia.alt}
                  width={1400}
                  height={933}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full rounded-sm object-cover"
                />
              )}
              <h3 className="mt-7 font-display text-[length:var(--step-2)] font-light leading-tight">
                {featured.title}
              </h3>
              {"subtitle" in featured && featured.subtitle && (
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
                  {featured.subtitle}
                </p>
              )}
              {featured.body && (
                <p className="mt-4 max-w-[42ch] font-body text-lg leading-relaxed text-papyrus/85">
                  {featured.body}
                </p>
              )}
            </article>
          )}

          {/* The two placeholders: stacked, narrower, visibly quieter —
              smaller/cropped images and a further-muted placeholder note,
              rather than truncated copies of the featured card. */}
          <div className="flex flex-col gap-10">
            {rest.map((item) => {
              const media = MEDIA[item.slug];
              return (
                <article key={item.slug}>
                  {media && (
                    <img
                      src={media.src}
                      alt={media.alt}
                      width={800}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full rounded-sm object-cover opacity-90"
                    />
                  )}
                  {/* Neither placeholder card has a subtitle in facts.ts —
                      only batwa-experience does, and it's `featured` above,
                      not part of this list — so there's no subtitle branch
                      to render here. */}
                  <h3 className="mt-5 font-display text-[length:var(--step-1)] font-light leading-tight">
                    {item.title}
                  </h3>
                  {item.body ? (
                    <p className="mt-3 max-w-[34ch] font-body leading-relaxed text-papyrus/85">
                      {item.body}
                    </p>
                  ) : (
                    // Honest placeholder rather than invented copy, muted
                    // further than the plain `text-mist` this used before —
                    // but not past 4.5:1: text-mist/70 measured 4.18:1
                    // against bg-forest (real math, not eyeballed), under
                    // the floor small mono type needs. /80 measures 5.04:1,
                    // real margin, still visibly quieter than the original.
                    <p className="mt-3 max-w-[30ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-mist/80">
                      Description to be supplied by UWA
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
