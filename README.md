# Uganda Wildlife Authority — front page redesign

A speculative redesign of [ugandawildlife.org](https://ugandawildlife.org). Not affiliated with
or endorsed by UWA. Vite + React 19 + TypeScript + Tailwind v4, static build.

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # -> dist/
```

## Design rationale

The existing site's problem is not its content — the content is excellent — it is that a
Brizy mega-menu, a muted video embed and a flat grid of ten identical tiles flatten ten
genuinely different landscapes into one texture. So the redesign spends its boldness in
exactly one place and stays disciplined everywhere else.

The hero states one thesis: a single headline, a single button, footage, nothing more. No
search bar, no stat row, no badge cluster. The signature element is the **Park Strip** — ten
vertical slivers that expand on hover or keyboard focus, an accordion of landscapes rather
than a wall of cards. Its central trick is occlusion: each park's name is set in oversized
Anton and then *sandwiched* beneath a masked copy of the park's own photograph, so a gorilla's
face or a waterfall's gorge physically interrupts the letterforms. Depth comes from masking,
never from a drop shadow.

The palette is grounded in Uganda's actual materials — Bwindi's canopy, laterite murram, the
grey crowned crane on the flag — rather than the cream-and-terracotta default. Gold is
reserved: actions and live indicators only, never decoration. Fraunces carries the cinematic
calm, Anton the poster panels, Public Sans the prose, and IBM Plex Mono every figure, because
a conservation authority holds data and its typography should admit it.

## Tokens

Defined in `src/index.css` under `@theme`. No arbitrary hex anywhere else in the project.

| Token | Hex | Role |
|---|---|---|
| `--color-forest` | `#0C1F18` | primary dark ground |
| `--color-murram` | `#8C3B1E` | structural accent |
| `--color-murram-deep` | `#52220F` | warm dark gradient stop |
| `--color-crane` | `#E3A81F` | **actions and live indicators only** |
| `--color-papyrus` | `#EDE7DA` | light ground, type on dark |
| `--color-mist` | `#9AA79E` | meta text **on dark grounds only** |
| `--color-mist-deep` | `#56655B` | meta text on light grounds |
| `--color-ink` | `#060D0A` | type on light |
| `--color-glacier` | `#C9D6D8` | Rwenzori only — the coldest colour on the page |

Two tokens were added to the original brief's palette. `--color-glacier` because Rwenzori needs
a genuinely cold colour and an arbitrary hex in JSX would break the token rule. `--color-mist-deep`
because **`--color-mist` on `--color-papyrus` measures 2.03:1 and fails** — the Stats section
wanted exactly that pairing, so it needed a legitimate alternative rather than a workaround.

## Verified contrast

Contrast over photography cannot be reasoned about from token values, because the background
is the photograph. `scratchpad/png-sample.mjs` decodes the rendered screenshot and reports both
the mean and the **brightest** pixel behind a region — the brightest is what actually breaks
legibility, and measuring the mean alone hides real failures.

All figures below are worst-case (brightest pixel), not mean:

| Element | Ratio | Floor |
|---|---|---|
| Hero nav links | 4.78:1 | 4.5:1 |
| Hero kicker | 4.89:1 | 4.5:1 |
| Hero headline | 9.66:1 | 3:1 (large) |
| Strip park name | 10.74:1 | 3:1 (large) |
| Strip hook copy | 11.25:1 | 4.5:1 |
| Strip meta line | 12.70:1 | 4.5:1 |

Note that `text-shadow` earns **no** WCAG credit — it is used on the hero as belt-and-braces
on top of scrims that pass on their own, never as the thing making them pass.

## Swapping in real media

Everything in `public/parks/` is a placeholder. See `public/parks/MANIFEST.md` for the full
shot list with dimensions and file-size budgets, and `public/parks/SOURCES.md` for provenance.

- **Park stills** — replace the file at the path in each park's `image` field in
  `src/data/parks.ts`. Each park also has an optional `subjectMask` (`"cx% cy% / rw% rh%"`)
  positioning the occlusion blob over the animal in that specific frame; re-tune it when the
  photograph changes, or the effect stops landing on the subject.
- **Hero video** — replace `public/parks/hero.mp4` and update `heroVideoPoster`. The gating
  logic (viewport width, `navigator.connection.effectiveType`, reduced motion) needs no changes.

### The 3G decision

Much of this audience is on mobile 3G, so the `<video>` element only mounts above a width
threshold **and** on a connection that does not report `slow-2g`/`2g`/`3g`, **and** only when
the visitor has not asked for reduced motion. Everyone else gets the poster still, which is
already loaded as the LCP element. The video is an enhancement layered on top of a complete
page, never a requirement for it.

## Known gaps

- **`public/parks/hero.mp4` must not ship.** It is an Adobe Stock comp: 700×394 with a visible
  watermark on every frame. It also fails contrast on its own merits — its brightest pixel is
  near-white sky and measures 3.11:1 against the headline even under a 52% scrim. The licensed
  replacement needs to be low-key: nothing behind the headline brighter than about `#6B6B6B`.
- **Images are unoptimised.** They are the full-size originals from ugandawildlife.org, ~4 MB
  total, not yet resized or re-encoded. Required before the Lighthouse ≥ 90 target is credible.
- **Kibale's area is withheld.** UWA's own page publishes 321 km² for Kibale — the identical
  figure it publishes for Bwindi. Rather than republish a number we have good reason to doubt,
  or substitute one from elsewhere, the field is `null` with the reasoning in `areaDisputed`.
- **Four parks have no gazetting year** (Bwindi, Kibale, Mount Elgon, Lake Mburo) because their
  pages never state one. They render without a date. Nothing is guessed.
- **`/conservation/` and `/visitor-guide/` are empty on the live site** — verified against UWA's
  own WordPress REST API, where `content.rendered` is an empty Brizy container. Those routes are
  assembled from material that does exist and carry visible notes for what UWA must supply.
- **The brief says Murchison's gorge is 7 m; the live site says 8 m.** The site is treated as
  the source of truth, so 8 m ships.
- **No gorilla silhouette.** Two hand-drawn attempts were rendered, reviewed and rejected. The
  Bwindi occlusion uses a masked photograph instead — which is how the reference achieves it.
- Hero alt text still describes a placeholder rather than the final photograph.

## Accessibility

`prefers-reduced-motion: reduce` disables Lenis, all parallax, all count-ups and video autoplay.
The reduced-motion page is complete and identical in end-state — nothing is left stranded at
zero opacity. The Park Strip is fully keyboard operable: roving tabindex, arrow keys between
parks, Home/End to the ends, Enter to open. Focus rings are gold with a dark inner ring so they
survive over a bright photograph. One `<h1>` per page; `<header>` is a sibling of `<main>`, not
a descendant.
