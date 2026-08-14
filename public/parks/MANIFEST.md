# Asset Replacement Manifest: UWA Homepage Redesign

This document specifies all photography and footage that must be commissioned or licensed to replace the placeholder images and video currently in this directory. The images below are UWA's own copyrighted material from ugandawildlife.org, used for speculative redesign purposes only, they are not licensed for production deployment.

> **STATUS UPDATE, read alongside the notices below.**
>
> * Notice (a) is **superseded**: the hero no longer ships a local video file at all. It embeds
>   UWA's own real hero video (`youtube.com/embed/3XZfbd8yugI`, confirmed live on
>   ugandawildlife.org), the same standard iframe technique their own site uses. There is no
>   watermarked comp left to replace and no local footage to license: the video is UWA's actual
>   embed, not an asset this project owns or ships. `hero-poster-hippos.webp` (YouTube's own
>   official thumbnail for that video) is the poster/fallback still, and the colour requirement
>   below is already satisfied by the real footage (low-key: hippos, water, forest canopy,
>   overcast sky, no bright sun disc), verified by measurement rather than assumed.
> * Notice (b) is **resolved**: `pnpm optimize:images` re-encodes every asset to WebP, run most
>   recently at 1995 KB -> 1598 KB (20% smaller), all within budget. Filenames below end `.webp`.
>   Untouched sources are kept locally in `.image-originals/` (gitignored).
> * Notice (c) still stands and is the most important one for whoever commissions photography.

---

## IMPORTANT NOTICES

### (a) Hero Video Constraint: Colour and Resolution

The current `hero.mp4` (700×394 pixels) is an **Adobe Stock *comp* file** with a visible watermark on every frame. It must be replaced with a **licensed full-resolution master**.

**Critical colour requirement:** No pixel behind the headline may be brighter than roughly **`#6B6B6B`** (RGB 107,107,107). The current crane footage is high-key, its brightest pixel is `#EDF4F6` (near-white sky), and achieves only 3.11:1 contrast against the cream headline even under a 52% scrim, falling below the required 4.5:1 floor for WCAG AA compliance.

The replacement clip must be **low-key**: shot at dusk, backlit, or against dark water or forest canopy. Subject-wise, the grey crowned crane (Uganda's national bird) is ideal and aligns with park messaging.

### (b) Image Optimisation is Outstanding

All current files are full-size originals downloaded from ugandawildlife.org (total ~4 MB across 17 files) and have **not been resized, re-encoded, or optimized**. Before launch, they must be:
- Resized to the target dimensions below
- Re-encoded to WebP or AVIF (progressive JPEGs as fallback only)
- Validated to meet Lighthouse >= 90 score on 3G connectivity budget

### (c) Bwindi Requires Clear Subject Separation

The Bwindi image specifically must have a **clear, well-separated subject (gorilla) against a distinguishable background**. The occlusion effect (masked animal layered over the park name in the panel) depends on this separation to read correctly. Two hand-drawn gorilla vector attempts were rejected; the current implementation uses a masked copy of the photograph itself, so composition is critical.

---

## Asset Slots by Category

### Hero Section

| Filename | Current Dimensions | Target Dimensions | Target Aspect | Max Size | Description |
|---|---|---|---|---|---|
| `hero.mp4` | 700×394 | 1920×1080 minimum | 16:9 | 3 MB | **[URGENT]** Licensed video loop, 10–20 seconds, silent, seamless loop. Low-key colour (no pixel > #6B6B6B). H.264 MP4. Replace Adobe Stock watermarked comp. |
| `hero-poster.webp` | 1120×700 | 2400×1350 | 16:9 | 250 KB | Static poster fallback for hero section if video cannot autoplay. Landscape, high-impact composition. WebP or AVIF preferred. |
| `hero-video-poster.webp` | 704×400 | 2400×1350 | 16:9 | 250 KB | Video placeholder still, shown while video loads. Low-key aesthetic to match video mood. WebP or AVIF preferred. |

### Park Sliver Panels (Ten Parks)

All park images are used as portrait slivers (1600×2400 px, 2:3 aspect ratio, max 300 KB each) in the parkstrip component. Subject sits within the `subjectMask` region; secondary occlusion effect layers a cropped copy of the same image over the park name text.

| Filename | Current Dimensions | Target Dimensions | Target Aspect | Max Size | Description |
|---|---|---|---|---|---|
| `gorilla-uganda-primate-trekking-eating.webp` | 2048×1366 | 1600×2400 | 2:3 | 300 KB | **[CRITICAL]** Bwindi Impenetrable: Mountain gorilla in mid-action (trekking, feeding, or resting pose). Must have clear gorilla subject with separable background for occlusion mask (subject at ~61% 46%). WebP or AVIF. Placeholder EXIF credit: Matthias Mugisha. |
| `Mgahinga-national-park.webp` | 1120×700 | 1600×2400 | 2:3 | 300 KB | Mgahinga Gorilla: Mountain gorilla or golden monkey in volcanic highland setting. Subject at ~48% 33% of frame. WebP or AVIF. |
| `tree-climbing-lions-in-ishasha-1.webp` | 900×600 | 1600×2400 | 2:3 | 300 KB | Queen Elizabeth (Ishasha): Tree-climbing lion(s) in fig tree or acacia, distinctive behaviour shot. Subject at ~65% 37%. WebP or AVIF. |
| `murchison-falls.webp` | 1600×1067 | 1600×2400 | 2:3 | 300 KB | Murchison Falls: The waterfall itself, Victoria Nile plunging through 8m gorge into Devil's Cauldron. Vertical crop to emphasise cascade and power. Subject at ~55% 50%. WebP or AVIF. |
| `uwa-national-parks-kidepo-valley-herd-of-buffalos.webp` | 800×531 | 1600×2400 | 2:3 | 300 KB | Kidepo Valley: Wild ostrich (Uganda's only population) preferred; acceptable alternatives: large buffalo herd or mixed wildlife (lions, giraffes, zebras). Subject at ~50% 60%. WebP or AVIF. |
| `Kibale-chimpanzees.webp` | 1120×700 | 1600×2400 | 2:3 | 300 KB | Kibale: Chimpanzee(s) in forest canopy or ground, ideally capturing behaviour (feeding, socialising, or in motion). Kanyanchu Primate Walk experience. Subject at ~50% 33%. WebP or AVIF. |
| `semuliki.-national-park-springs.webp` | 1095×700 | 1600×2400 | 2:3 | 300 KB | Semuliki: Sempaya Hot Springs, geothermal springs with visible steam/heat rising. Landscape shot showing water and thermal activity. Subject at ~62% 64%. WebP or AVIF. |
| `Activities-in-Rwenzori-National-Park-1.webp` | 1024×768 | 1600×2400 | 2:3 | 300 KB | Rwenzori Mountains: Margherita Peak (5,109m) or mountaineering party on snow-capped high altitude terrain. Subject at ~66% 63%. WebP or AVIF. |
| `mt-elgon-national-park-1.webp` | 1280×720 | 1600×2400 | 2:3 | 300 KB | Mount Elgon: Wagagai Peak (4,321m) summit or caldera (40 km² volcanic crater) landscape. Emphasise scale and geological grandeur. Subject at ~69% 74%. WebP or AVIF. |
| `zebras-in-lake-mburo-1.webp` | 1129×750 | 1600×2400 | 2:3 | 300 KB | Lake Mburo: Zebra herd, impalas, or elands (Africa's largest antelope) in savanna setting. Uganda's only impala population; eland herds distinctive. Subject at ~54% 44%. WebP or AVIF. |

### Wildlife Reserve Images (Ten Reserves)

Extracted alongside `src/data/reserves.ts` — the eleven Wildlife Reserves distinct from the ten National Parks above. No reserve-page UI exists yet in this codebase (this was a data/asset extraction pass only), so no fixed sliver aspect ratio is assumed here the way it is for the Park Sliver Panels; whoever designs that UI should pick dimensions to match. Toro Semliki Wildlife Reserve has no row: its own page's `og:image` resolves to the generic `UWA-Rangers.jpeg` placeholder rather than a reserve-specific photo, so `image` is `null` on that entry in `reserves.ts` and nothing was downloaded for it.

| Filename | Current Dimensions | Max Size | Description |
|---|---|---|---|
| `katonga-wildlife-reserve-bay.webp` | 799×533 | 300 KB | Katonga: Lake Albert-style bay shoreline with dugout canoes, consistent with Katonga's wetland/Katonga River system. WebP or AVIF. |
| `ajai-wildlife-reserve-crowned-cranes.webp` | 582×466 | 300 KB | Ajai: grey crowned cranes (Uganda's national bird). Not a species named in Ajai's own Fauna text; generic rather than reserve-specific. WebP or AVIF. |
| `bugungu-wildlife-reserve-airstrip.webp` | 800×531 | 300 KB | Bugungu: light aircraft and ground crew on a dirt airstrip, illustrating fly-in access near Murchison Falls. WebP or AVIF. |
| `karuma-wildlife-reserve-nile-rapids.webp` | 799×534 | 300 KB | Karuma: river rapids through forest, consistent with the Victoria Nile at Karuma Falls (not named in the reserve's own page text). WebP or AVIF. |
| `kigezi-wildlife-reserve-lion.webp` | 1024×576 | 300 KB | Kigezi: a lion resting in a tree. Lion is named in Kigezi's own Fauna list, though the generic filename suggests a stock/library shot rather than a Kigezi-specific capture. WebP or AVIF. |
| `kyambura-wildlife-reserve-lions.webp` | 800×534 | 300 KB | Kyambura: a pride of lions in grassland, consistent with lion being named in Kyambura's own Fauna list. WebP or AVIF. |
| `pian-upe-wildlife-reserve-ostriches.webp` | 1024×500 | 300 KB | Pian-Upe: a group of ostriches in savanna grassland, directly consistent with Pian-Upe's own Fauna text ("Birds include ostrich Struthio camelus"). WebP or AVIF. |
| `matheniko-wildlife-reserve-camels.webp` | 602×354 | 300 KB | Matheniko: **[FLAG]** shows a herd of domestic camels — not any species in Matheniko's own Fauna list (lion, leopard, cheetah, giraffe, eland, roan antelope, Bright's gazelle) and not native Ugandan wildlife. This is genuinely UWA's own `og:image` for the page; used as-is, mismatch noted in `reserves.ts`'s `todo` for this entry. Replacement photography should actually depict one of the listed species. WebP or AVIF. |
| `bokora-wildlife-reserve-birds.webp` | 800×557 | 300 KB | Bokora: two small birds (swallow-tailed bee-eater type) in flight/perched. Bokora's own Fauna text names only mammals, so this can't be cross-checked against page copy. Filename pattern suggests a Flickr-sourced photo. WebP or AVIF. |
| `kabwoya-wildlife-reserve-elephants.webp` | 800×531 | 300 KB | Kabwoya: **[FLAG]** an elephant family herd. Elephants are not named in Kabwoya's own Fauna list (Uganda kob, bush duiker, oribi, warthog, bushbuck, bushpig, colobus, hippo, buffalo, leopard, hyena, chimpanzees). Source filename `elephtans.jpg` is UWA's own typo. Used as-is; mismatch noted in `reserves.ts`'s `todo` for this entry. WebP or AVIF. |

### Supporting/Secondary Images

These images are used as secondary subject illustrations in park detail pages, conservation sections, or activity showcases. Dimensions are preserved from source; resize and re-encode as WebP/AVIF before launch.

| Filename | Current Dimensions | Max Size | Description |
|---|---|---|---|
| `the-batwa-of-mgahinga.webp` | 1120×700 | 300 KB | Mgahinga cultural context: Batwa guide or community member. Used alongside primary park image to highlight indigenous experience. Placeholder EXIF credit: Matthias Mugisha. |
| `rangers-stopping-poaching.webp` | 1049×700 | 300 KB | Conservation messaging: UWA ranger(s) on anti-poaching patrol or with arrested poacher/confiscated goods. Illustrates ranger dedication and park protection. |
| `UWA-Rangers.webp` | 1200×800 | 300 KB | Conservation / Queen Elizabeth: Rangers in formation during patrol in Queen Elizabeth National Park. Illustrates ranger professionalism and coordination. EXIF description: "A team of rangers from the Uganda Wildlife Authority (UWA) in formation as they go on patrol in Queen Elizabeth Park, in Uganda." |
| `mountain_gorilla_babyface__.webp` | 2000×1333 | 300 KB | Bwindi / Mgahinga generic: Close-up of young mountain gorilla face. Used for comparison or emotional impact in gorilla-focused pages. Generic subject (not tied to a specific sliver). |
| `sunset-in-murchison-falls.webp` | 1120×700 | 300 KB | Murchison Falls alternative: Sunset/golden hour light over the falls or Nile. Adds visual variety if hero or primary image cannot be refreshed immediately. |
| `elephants-in-murchison-falls-national-park.webp` | 1120×700 | 300 KB | Murchison Falls alternative: African elephant(s) in park savanna. Supplements primary waterfall image if needed for content variety. |

### Logo / Graphic Assets

| Filename | Current Dimensions | Use | Notes |
|---|---|---|---|
| `uwa-transparent.webp` | 485×544 | UWA wordmark/logo | Not a photographic asset; preserve as vector or high-res raster if logo is refreshed. |

---

## Summary

**Total slots to replace:** 16 photography/videography assets (13 park slivers + 3 hero media) + 6 supporting images + 10 wildlife reserve images = **32 assets**.

**Files already confirmed with dimensions:** All 17 downloaded UWA park images + 3 hero files + 10 wildlife reserve images (30 total). One file (`uwa-transparent.webp`) is graphic/logo, not an asset requiring photography commission.

**Outstanding:** 
- Exact resolution of `hero.mp4` internal codec parameters (see hero video constraint section).
- Licence confirmation for Adobe Stock and UWA use rights.
- Sizing and encoding pipeline before QA.

---

## Photography Guidelines

### Colour & Mood
- **Hero video:** Low-key, dark tones (dusk, backlit, dark water, forest canopy). Max pixel brightness #6B6B6B behind text.
- **Park slivers:** Vibrant, saturated wildlife or landscape photography. High visual impact in 2:3 portrait crop.
- **Supporting images:** Natural, documentary-style (for ranger/conservation shots); iconic (for landmarks and wildlife).

### Licensing Requirements
- All images must be **UWA-authorized, commercially licensed, or original photography** by a commissioned photographer.
- **Current assets are NOT FOR PRODUCTION.** They are UWA's copyrighted material from their live site, used only for this speculative pitch.
- Obtain explicit written licence permitting use on the production website before deploying any replacement.

### File Format & Encoding
- Primary formats: **WebP** (VP8 codec, lossy) or **AVIF** (AV1 codec).
- Fallback: **Progressive JPEG** (quality 75–82) for older browsers only.
- **Video:** H.264 MP4 (AAC audio optional; recommend silent for hero loop).
- Validate Lighthouse performance >= 90 on simulated 4G/3G after optimization.

---

## Version & Attribution

**Compiled:** 2026-08-13  
**Photographer credits from EXIF metadata:**
- `semuliki.-national-park-springs.webp`, `zebras-in-lake-mburo-1.webp`: Matthias Mugisha  
- `UWA-Rangers.webp`: UWA (description embedded in EXIF)

All dimensions and file sizes verified directly from downloaded files (not estimated).
