import { experiences } from "../../data/facts";

/**
 * Three editorial cards. The body copy for two of the three is deliberately
 * absent — ugandawildlife.org does not supply it, and inventing a paragraph of
 * safari-brochure prose would be exactly the failure this project forbids.
 * The card renders its title and image and simply omits what we do not have.
 */

const MEDIA: Record<string, { src: string; alt: string }> = {
  "gorilla-tracking": {
    src: "/parks/gorilla-uganda-primate-trekking-eating.jpeg",
    alt: "A mountain gorilla feeding on foliage in dense forest undergrowth",
  },
  "chimpanzee-tracking": {
    src: "/parks/Kibale-chimpanzees.jpg",
    alt: "Chimpanzees in the forest canopy at Kibale",
  },
  "batwa-experience": {
    src: "/parks/the-batwa-of-mgahinga.jpg",
    alt: "Batwa community members outside the forest at Mgahinga",
  },
};

export function Experiences() {
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

        <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {experiences.map((item) => {
            const media = MEDIA[item.slug];
            return (
              <li key={item.slug}>
                {media && (
                  <img
                    src={media.src}
                    alt={media.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full rounded-sm object-cover"
                  />
                )}
                <h3 className="mt-7 font-display text-[length:var(--step-2)] font-light leading-tight">
                  {item.title}
                </h3>
                {"subtitle" in item && item.subtitle && (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
                    {item.subtitle}
                  </p>
                )}
                {item.body ? (
                  <p className="mt-4 max-w-[34ch] font-body leading-relaxed text-papyrus/85">
                    {item.body}
                  </p>
                ) : (
                  // Honest placeholder rather than invented copy.
                  <p className="mt-4 max-w-[34ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-mist">
                    Description to be supplied by UWA
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
