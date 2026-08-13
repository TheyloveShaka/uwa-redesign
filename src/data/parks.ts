/**
 * Park model. EVERY string here is verbatim from ugandawildlife.org — see `sourceUrl`.
 * Generated from the extraction staging JSON rather than retyped, because hand-copying
 * figures between documents is exactly how a wrong number reaches production.
 *
 * `todo` records what the live site does not state. A park with a null field renders
 * WITHOUT that field. It never renders a guess.
 */

export type PanelVariant = "poster" | "plain";

export interface Park {
  slug: string;
  name: string;
  region: string | null;
  areaKm2: number | null;
  /** Set when we have reason to doubt the figure the live site publishes. */
  areaDisputed?: string;
  gazettedYear: number | null;
  /** First substantive paragraph, verbatim from the park's page. */
  intro: string;
  /** Grounded in the page's own wording — not written marketing copy. */
  signatureAttraction: string;
  activities: string[];
  keySpecies: string[];
  image: string;
  /**
   * Where the photo's actual subject sits, in the SLIVER'S OWN box (not the
   * source image's pixels) — "cx% cy%" or "cx% cy% / rw% rh%" (ellipse
   * radii). Consumed by ParkStrip's occlusion mask (§4): a second copy of
   * the same photo is clipped to this blob and layered over the park name,
   * so the animal/landform genuinely occludes the letterforms instead of
   * faking depth with a drop shadow. Hand-picked by eye against each source
   * photo, accounting for how much a cover-cropped portrait sliver zooms
   * into an off-centre subject. Optional: a park without one falls back to
   * a sensible centred blob rather than losing the effect.
   */
  subjectMask?: string;
  /** Only three parks get the full Reference-C poster panel; the rest reveal plainly. */
  panel: PanelVariant;
  /** Single motion idea, keyed in the panel component. */
  motion: string;
  sourceUrl: string;
  todo: string[];
}

export const parks: Park[] = [
  {
    slug: "bwindi-impenetrable-national-park",
    name: "Bwindi Impenetrable National Park",
    region: "South - Western Uganda (Kisoro)",
    areaKm2: 321,
    gazettedYear: null,
    intro: "Bwindi Impenetrable National Park, located in south-western Uganda on the edge of the Rift Valley, is one of Africa's most ancient and biologically diverse rainforests. Dating back over 25,000 years, this mist-covered jungle is home to an incredible 400 plant species and provides refuge to some of the world's rarest wildlife.",
    signatureAttraction: "Mountain gorilla trekking — the park protects approximately 459 mountain gorillas, almost half of the world's remaining population",
    activities: ["Gorilla trekking","Cultural walks/village visits with the Batwa and Bakiga communities"],
    keySpecies: ["mountain gorillas","chimpanzees","baboons","elephants","forest antelopes","African green broadbill","Shelley's crimsonwing"],
    image: "/parks/gorilla-uganda-primate-trekking-eating.jpeg",
    subjectMask: "61% 46% / 42% 46%",
    panel: "poster",
    motion: "mist-drift",
    sourceUrl: "https://ugandawildlife.org/national-parks/bwindi-impenetrable-national-park/",
    todo: ["gazettedYear","activities (no dedicated activities list found on page; inferred from body copy)"],
  },
  {
    slug: "mgahinga-gorilla-national-park",
    name: "Mgahinga Gorilla National Park",
    region: "Kisoro district",
    areaKm2: 33.7,
    gazettedYear: 1991,
    intro: "Size: 33.7km2, making it Uganda's smallest National Park. The park takes its name from “Gahinga” – the local word for the piles of volcanic stones cleared from farmland at the foot of the volcanoes. The British administration declared the area a game sanctuary in 1930; it was gazetted as a National Park in 1991.",
    signatureAttraction: "One habituated transboundary mountain gorilla group, plus the endangered golden monkey, in the Virunga volcanoes",
    activities: ["Gorilla trekking","Guided tour with a Batwa guide"],
    keySpecies: ["mountain gorillas","golden monkey","elephants","giant forest hog","bush pigs","bushbuck","buffalos","leopards","Kivu ground thrush","turaco"],
    image: "/parks/Mgahinga-national-park.jpg",
    subjectMask: "48% 33% / 46% 50%",
    panel: "plain",
    motion: "volcano-parallax",
    sourceUrl: "https://ugandawildlife.org/national-parks/mgahinga-gorilla-national-park/",
    todo: ["activities (no dedicated activities list found on page; inferred from body copy)"],
  },
  {
    slug: "queen-elizabeth-national-park",
    name: "Queen Elizabeth National Park",
    region: "Kasese District",
    areaKm2: 1978,
    gazettedYear: 1952,
    intro: "Queen Elizabeth National Park is Uganda's most popular and biodiverse safari destination, offering breathtaking landscapes, abundant wildlife, and rich cultural heritage. Straddling the equator, the park features monuments marking the exact spot where it crosses latitude 00, adding to its uniqueness.",
    signatureAttraction: "Tree-climbing lions of Ishasha — lions that perch in fig trees waiting to ambush Uganda kobs",
    activities: ["Game viewing","Boat cruise on the Kazinga Channel","Cultural tours in Bakonzo, Basongora, and Banyabindi communities","Storytelling sessions","Traditional dances and music performances"],
    keySpecies: ["elephants","buffaloes","hippos","Uganda kobs","waterbucks","lions","leopards","spotted hyenas","side-striped jackals","chimpanzees","black-and-white colobus monkeys","vervet monkeys","olive baboons","African fish eagle","shoebill stork","flamingos","papyrus gonolek","Nile crocodiles","pink-backed pelicans","saddle-billed storks"],
    image: "/parks/tree-climbing-lions-in-ishasha-1.jpg",
    subjectMask: "65% 37% / 40% 44%",
    panel: "plain",
    motion: "branch-foreground",
    sourceUrl: "https://ugandawildlife.org/national-parks/queen-elizabeth-national-park/",
    todo: [],
  },
  {
    slug: "murchison-falls-national-park",
    name: "Murchison Falls National Park",
    region: "Masindi",
    areaKm2: 3840,
    gazettedYear: 1952,
    intro: "Murchison Falls National Park is Uganda's oldest and largest conservation area, covering vast expanses of savanna, woodland, and riverine forests. Originally gazetted as a game reserve in 1926, the park was officially designated as one of Uganda's first national parks in 1952.",
    signatureAttraction: "Murchison Falls — the Victoria Nile forced through an 8-meter-wide gorge before plunging 45 meters into the Devil's Cauldron",
    activities: ["Game drives","Boat cruises along the Nile","Birdwatching"],
    keySpecies: ["African elephants","giraffes","buffaloes","Uganda kobs","Nile crocodiles","hippos","shoebill stork","white-crested turaco","red-winged grey warbler","African fish eagle","Goliath heron","saddle-billed stork"],
    image: "/parks/murchison-falls.webp",
    subjectMask: "55% 50% / 26% 62%",
    panel: "poster",
    motion: "water-column",
    sourceUrl: "https://ugandawildlife.org/national-parks/murchison-falls-national-park/",
    todo: ["region (page states only district ‘Masindi’, no broader region label given)"],
  },
  {
    slug: "kidepo-valley-national-park",
    name: "Kidepo Valley National Park",
    region: "karamoja District",
    areaKm2: 1442,
    gazettedYear: 1962,
    intro: "Kidepo Valley National Park is Uganda's most remote and least explored national park, yet it is widely regarded as one of Africa's most breathtaking wilderness areas. Located in the semi-arid valleys of Karamoja, the park borders South Sudan to the northwest and Kenya just 5km to the east, sitting approximately 700km from Kampala.",
    signatureAttraction: "Uganda's only wild ostrich population, plus lions, large buffalo herds and Rothschild's giraffes in the Narus Valley",
    activities: ["Game viewing in the Narus Valley","Birdwatching","Cultural visits with the Karamojong and Ik people"],
    keySpecies: ["lions","buffaloes","elephants","zebras","hartebeests","Rothschild's giraffes","ostriches","secretary birds","northern carmine bee-eaters","little green bee-eaters","Abyssinian scimitarbill"],
    image: "/parks/uwa-national-parks-kidepo-valley-herd-of-buffalos.jpg",
    subjectMask: "50% 60% / 74% 34%",
    panel: "poster",
    motion: "heat-shimmer",
    sourceUrl: "https://ugandawildlife.org/national-parks/kidepo-valley-national-park/",
    todo: [],
  },
  {
    slug: "kibale-national-park",
    name: "Kibale National Park",
    region: "Kabarole district, Western Uganda.",
    areaKm2: null,
    areaDisputed: "The live site publishes 321 km2 for Kibale — the identical figure it publishes for Bwindi. Almost certainly a duplication error in UWA's own page, so the figure is withheld rather than republished. Restore it once UWA confirms the real area.",
    gazettedYear: null,
    intro: "Kibale National Park is renowned for its extraordinary primate diversity, and the Kanyanchu Primate Walk stands as the park's flagship experience. This immersive trek offers visitors a rare chance to encounter 13 different primate species, with diurnal monkeys such as red colobus, black-and-white colobus, L'Hoest's monkey, and grey-cheeked mangabey frequently spotted in the forest canopy.",
    signatureAttraction: "Kanyanchu Primate Walk chimpanzee tracking — over 90% sighting success rate",
    activities: ["Kanyanchu Primate Walk (chimpanzee tracking)","Guided chimpanzee tracking walks","Chimpanzee Habituation Experience"],
    keySpecies: ["chimpanzees","red colobus","black-and-white colobus","L'Hoest's monkey","grey-cheeked mangabey","olive baboons","forest elephants","bush pigs","duikers","Nahan's francolin","Cassin's spinetail","Blue-headed bee-eater","Lowland masked apalis"],
    image: "/parks/Kibale-chimpanzees.jpg",
    subjectMask: "50% 33% / 42% 46%",
    panel: "plain",
    motion: "canopy-dapple",
    sourceUrl: "https://ugandawildlife.org/national-parks/kibale-national-park/",
    todo: ["gazettedYear","areaKm2 (withheld — see areaDisputed)"],
  },
  {
    slug: "semuliki-national-park",
    name: "Semuliki National Park",
    region: "Bundibugyo District, Uganda",
    areaKm2: 220,
    gazettedYear: 1993,
    intro: "Semuliki National Park, established as a forest reserve in 1932 and upgraded to national park status in 1993, is East Africa's only true lowland tropical rainforest. Situated on the remote western side of the Rwenzori Mountains, the park is dominated by the easternmost extension of the vast Ituri Forest of the Congo Basin.",
    signatureAttraction: "Sempaya Hot Springs — geothermal springs hot enough to boil eggs",
    activities: ["Birdwatching","Visiting the Sempaya Hot Springs","Cultural encounters with the Batwa, Bakonjo, Bwamba and Batuku communities"],
    keySpecies: ["elephants","chimpanzees","baboons","forest antelopes","hippos","crocodiles","spot-breasted ibis","Hartlaub's duck","Congo serpent eagle","chestnut-flanked goshawk","red-thighed sparrowhawk","Western bronze-naped pigeon","yellow-throated cuckoo"],
    image: "/parks/semuliki.-national-park-springs.jpg",
    subjectMask: "62% 64% / 46% 52%",
    panel: "plain",
    motion: "steam-plume",
    sourceUrl: "https://ugandawildlife.org/national-parks/semuliki-national-park/",
    todo: ["gazettedYear (page gives two dates: 1932 as forest reserve, 1993 upgraded to national park status — 1993 used here)"],
  },
  {
    slug: "rwenzori-mountains",
    name: "Rwenzori Mountains",
    region: "Bundibugyo District",
    areaKm2: 996,
    gazettedYear: 1991,
    intro: "The Rwenzori Mountains, often called the “Mountains of the Moon,” rise majestically in western Uganda along the Uganda-DR Congo border. This 120km-long and 65km-wide mountain range is home to some of the most breathtaking and diverse landscapes in Africa, from equatorial snow-capped peaks to lush montane forests and moorlands.",
    signatureAttraction: "Margherita Peak (5,109m) on Mount Stanley — Africa's third-highest peak",
    activities: ["Mountaineering to Margherita Peak","Mid-level non-technical treks","Guided nature walks","Homestead visits","Traditional cultural performances with Bakonzo villages"],
    keySpecies: [],
    image: "/parks/Activities-in-Rwenzori-National-Park-1.jpeg",
    subjectMask: "66% 63% / 46% 50%",
    panel: "plain",
    motion: "cloud-wipe",
    sourceUrl: "https://ugandawildlife.org/national-parks/rwenzori-mountains/",
    todo: ["keySpecies (page states “over 70 mammal species and 217 bird species” but does not name specific species)"],
  },
  {
    slug: "mount-elgon-national-park",
    name: "Mount Elgon",
    region: "Mbale, Eastern Uganda",
    areaKm2: 1121,
    gazettedYear: null,
    intro: "Mount Elgon is an extinct volcano and one of Uganda's oldest geological formations, with its first eruption occurring around 24 million years ago. At one point in history, it was Africa's tallest mountain, standing even higher than Kilimanjaro's 5,895m. However, millions of years of erosion have gradually reduced its height to 4,321m, ranking it as the 4th highest peak in East Africa and the 8th highest on the continent.",
    signatureAttraction: "Wagagai Peak (4,321m) and the 40km² caldera — one of the largest intact volcanic craters in the world",
    activities: ["Trekking to Wagagai Peak","Visiting the Caldera","Sipi Falls","Hot Springs","Kitum Cave","Bagisu Imbalu circumcision ceremony (cultural, every even-numbered year)"],
    keySpecies: ["Lammergeyer (bearded vulture)","Tacazze sunbird","Jackson's francolin","Blue monkeys","Black-and-white colobus monkeys","Bushbucks","duikers","Forest elephants","Leopards","hyenas"],
    image: "/parks/mt-elgon-national-park-1.jpeg",
    subjectMask: "69% 74% / 62% 32%",
    panel: "plain",
    motion: "falling-columns",
    sourceUrl: "https://ugandawildlife.org/national-parks/mount-elgon-national-park/",
    todo: ["gazettedYear"],
  },
  {
    slug: "lake-mburo",
    name: "Lake Mburo National Park",
    region: "Nyabushozi County, Kiruhura District",
    areaKm2: 370,
    gazettedYear: null,
    intro: "Lake Mburo National Park may be Uganda's smallest savanna park, but it is rich in biodiversity, scenic beauty, and cultural significance. Conveniently located near the highway linking Kampala to western Uganda, the park offers an accessible yet immersive safari experience.",
    signatureAttraction: "Uganda's only population of impalas, plus zebras and elands (Africa's largest antelope species)",
    activities: ["Boat safaris","Game drives","Guided walking safaris","Birdwatching"],
    keySpecies: ["zebras","impalas","elands","buffaloes","Defassa waterbucks","reedbucks","hippos","crocodiles","leopards","hyenas","bushpigs","warthogs","topis","Mosque swallow","Black-bellied bustard","Bare-faced go-away bird","Rüppell's starling","Southern ground hornbill","Black-throated barbet"],
    image: "/parks/zebras-in-lake-mburo-1.jpg",
    subjectMask: "54% 44% / 64% 44%",
    panel: "plain",
    motion: "stripe-wipe",
    sourceUrl: "https://ugandawildlife.org/national-parks/lake-mburo/",
    todo: ["gazettedYear"],
  },
];

export const parkBySlug = (slug: string): Park | undefined =>
  parks.find((p) => p.slug === slug);

/** The three parks that get a full Reference-C poster panel. */
export const posterParks = parks.filter((p) => p.panel === "poster");
