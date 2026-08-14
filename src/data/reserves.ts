/**
 * Wildlife Reserve model. EVERY string here is verbatim from ugandawildlife.org: see
 * `sourceUrl` on each entry. Extracted separately from src/data/parks.ts (the ten
 * National Parks) because the reserve pages are a genuinely different content type on
 * the live site, not just a smaller version of a park page.
 *
 * Two things stood out doing this extraction, both preserved rather than smoothed over:
 *
 * 1. The reserves INDEX page (https://ugandawildlife.org/wildlife-reserves/) has no body
 *    content at all beyond the site's shared header/footer/mega-menu — confirmed by
 *    reading the raw network response, not just waiting out a slow client render. It is
 *    a published WordPress "Article" post with an empty `og:description` and "Time to
 *    read: Less than a minute". The mega-menu present on every page of the site is the
 *    only place the 11 reserves are actually named and linked.
 *
 * 2. Eight of the eleven individual reserve pages (Ajai, Bugungu, Karuma, Kigezi,
 *    Kyambura, Pian-Upe, Matheniko, Bokora) are not written in the flowing-paragraph
 *    style of the National Park pages. They read like entries copied from an old
 *    protected-areas directory: short labeled fields (Date Established / Geographical
 *    Location / Physical Features / Vegetation / Fauna), garbled OCR-style characters
 *    in places ("SOkm" for "50km", "3r25'E" for a longitude, "l,000" for "1,000"), and
 *    in Matheniko's case a stray citation — "lUCN Directory of Afrotropical Protected
 *    Areas" — bleeding directly into the body text. That citation is the strongest
 *    evidence for where this content actually originated. Several of these pages also
 *    give two figures for their own area (a km2 headline and a parenthetical hectare
 *    figure) that do not convert to the same number; see `areaDisputed` on the affected
 *    entries. None of this is cleaned up here — it is reproduced as printed, exactly as
 *    the standing verbatim rule requires, with `todo` recording what's inconsistent,
 *    garbled, or missing. Because these pages have no flowing intro paragraph distinct
 *    from their labeled fields, `intro` is `null` for all eight; their content lives
 *    entirely in `sections`.
 *
 * See `reserveCountDiscrepancy` below for the "12 vs 11" count conflict on the
 * homepage, recorded in the same spirit as the `sourceConflicts` export in
 * src/data/facts.ts.
 *
 * This file is a data/extraction pass only — no UI consumes it yet. Presentation-only
 * fields from Park (panel, motion, subjectMask) are deliberately not carried over here;
 * whoever builds the reserves UI should add whatever that design actually needs.
 */

export interface ReserveSection {
  /** Section heading exactly as printed on the page (e.g. "Fauna", "Vegetation"). */
  heading: string;
  /** Verbatim body text of that section. */
  text: string;
}

export interface Reserve {
  slug: string;
  /** Full name as titled on the page, or as the page's own body text names it. */
  name: string;
  /** Geographical location / district, as stated (paraphrased down from a longer verbatim sentence only where noted in `todo`). */
  region: string | null;
  /** Derived km2 figure. Converted from hectares where the page only gives ha (see `todo`). Withheld (null) only when no figure at all is derivable. */
  areaKm2: number | null;
  /** The area figure(s) exactly as printed on the page, unconverted. */
  areaRaw: string | null;
  /** Set when the page's own km2 and hectare figures for its own area don't agree with each other. */
  areaDisputed?: string;
  gazettedYear: number | null;
  /**
   * First substantive descriptive paragraph, verbatim — only present on the three
   * reserve pages written in flowing prose (Toro Semliki, Katonga, Kabwoya). Null on
   * the eight directory-style pages, which have no paragraph distinct from `sections`.
   */
  intro: string | null;
  /** Remaining labeled sections of the page, verbatim, in page order. */
  sections: ReserveSection[];
  /** Grounded in the page's own wording: not written marketing copy. Null where the page names no discrete flagship attraction. */
  signatureAttraction: string | null;
  activities: string[];
  keySpecies: string[];
  /** WebP path under /public/parks, or null where the page's own og:image is a sitewide generic placeholder rather than a reserve-specific photo. */
  image: string | null;
  sourceUrl: string;
  todo: string[];
}

export const reserves: Reserve[] = [
  {
    slug: "toro-semliki",
    name: "Toro Semliki Wildlife Reserve",
    region: "Western Uganda, within Ntoroko and Kabarole districts",
    areaKm2: 542,
    areaRaw: "542 km2",
    gazettedYear: 1926,
    intro:
      "Toro Semliki Wildlife Reserve was established as a game reserve in 1926 and was among the first protected areas to be gazetted. The main reason was to protect the large numbers of Uganda Kobs in the area. It covers an area of 542 km2. It is located in western Uganda, within   Ntoroko and Kabarole districts.",
    sections: [
      {
        heading: "Description",
        text: "Toro Semliki Wildlife Reserve enjoys a dramatic rift valley setting between the Rwenzori, Kijura escarpment and Lake Albert. The dominant vegetation type is the open acacia-combretum woodland and grassy savannah, interspersed with patches of Borassus palm forest, significant belts of riparian woodland along the main watercourses, as well as some extensive swamps towards Lake Albert. The reserve itself is topographically unremarkable, set at a relatively low altitude starting from around 700m above sea level, but on a clear day, the setting is truly awesome, with the sheer rift valley escarpment rising sharply from the eastern shore of Lake Albert, the 2500m-high Congolese Blue mountains on the western horizon and the mighty glacial peaks of the Rwenzori visible to the south-west.",
      },
      {
        heading: "Local people",
        text: "There are four communities living around the reserve. Karugutu-Kyabandara community: This community is situated in the south of the reserve, about 18km from Fort Portal town. The area is mainly inhabited by the Bakonjo who are traditional cultivators. The most important crops grown are maize, cassava, beans, soya beans, rice, and bananas some of which is sold in Rwebisengo and Ntoroko markets. Rwebisengo community: This community is located on the west and northwestern edge of the reserve in the Semliki Flats. The community mainly comprises the Batuku (Batoro-Bahuma), who are predominantly pastoralists. The Batuku are believed to be descendants of the Abarusula who were the royal army of the king Kabalega of Bunyoro Kitara Kingdom. Ntoroko fishing community: This community is situated at the south-eastern tip of Lake Albert between the estuaries of Wasa and Muzizi rivers. The area, covering approximately 4km2 has now been excised from the reserve and gazetted as a Wildlife Sanctuary to offer protection of any wildlife that interface in this area. The Ntoroko community depends mainly on fishing. Kasesenge–Kyakabaseke community: This community is located on the eastern escarpment of the rift valley. The majority of them are the Bakiga migrants who originally came to work in the tea estates in the 1960s. During the good economic times, tea provided a stable income. As the prices of tea deteriorated, they resorted to crop cultivation mainly beans, groundnuts, maize, and bananas.",
      },
      {
        heading: "Getting there",
        text: "Kampala Fort Portal via Mubende is 290km and Kampala –Fort Portal via Masaka-Mbarara-Kasese is about 465 km. Follow the route to Semuliki National Park from Fort Portal for the first 28 km before turning right at Karugutu trading center. The reserve boundary is 3km further on and the turn off to Semliki Safari Lodge is 26km further on just beyond the bridge over the river was. Branch to the right 3km to the Lodge. Lake Albert is further on 25km ahead at Ntoroko fishing village where UWA manages bandas, a campsite, and a canteen. There is an airfield managed by UWA so visitors can charter planes and land at Semliki Safari Lodge where the airfield is situated.",
      },
      {
        heading: "Activities",
        text: "Primate walk: This walk takes 3 to 4 hours and is conducted near Semliki Safari Lodge where you will meet our experienced ranger guides. Key primate species on this walk include chimpanzees, Red-tailed, vervet, Black and white colobus monkeys, Baboons. Angulates encountered are Waterbucks, Warthogs, Bushbucks, Buffaloes, Uganda Kobs, and Elephants. Game drives: There are three tracks across the savannah grassland of Toro Semliki Wildlife Reserve. Smaller forest and larger savannah elephants are regularly seen, along with Buffalo, Waterbucks, Warthog, and Uganda Kob. With luck, you may even see leopard and elusive Bushbabies. Game drives in the wildlife reserve are done in the morning, afternoon, and at night. After dark, visitors may come across curious nocturnal species such as the white-tailed mongoose. Nature walk: This takes 3 hours and it goes through a variety of habitats ranging from savannah woodland to riverine forest. Species encountered on this walk include; Ground Hornbills, Warthogs, Uganda Kobs, baboons, Black and White Colobus, and Vervet Monkeys. Community tourism: The Karugutu Community Conservation Association (KCCA) is a community-based association whose objective is conservation education through Music Dance and Drama (MDD). They organize traditional dances for the visitors and they have a shop for handcrafts at the entrance of the reserve which they sell to visitors. Members of the KCCA perform for visitors. Boat ride: This is conducted on Lake Albert and the main attractions are Shoebills, African Pygmy Goose, Blue-breasted and Blue-cheeked Bee-eaters, and Blue-headed Coucal. Hike to Nyaburogo Gorge: This is an ideal walk for birders that starts right at the Reserve Headquarters. It is a 7km hike that goes through a diversity of habitats including savanna, woodland, and a forest in the gorge. Common birds sighted include: Arrow marked Babbler, Tropical Boubal, Black-headed Bushrike, Luhdrers Bushrike and primates including Black and White Colobus, Baboons, vervets, and occasionally the Chimpanzees.",
      },
      {
        heading: "Wildlife habitats",
        text: "The Toro Semliki plain is predominantly grassy savanna and acacia-combretum woodland echoing Murchison Falls National Park at the northern end of Lake Albert. Stands of Borassus palms, lakeshore marshland, and broad river valleys filled with beautiful galley forest all add variety. Lake Albert lies outside the reserve but can be visited for canoeing and bird watching.",
      },
      {
        heading: "Wildlife in Toro Semliki",
        text: "Toro-semliki contains the same key species as Queen Elizabeth and Murchison Falls National Parks; Elephant, Buffalo, Uganda Kob, Waterbuck, Warthog, Giant Forest Hog, Hippopotamus. Primates include Chimpanzees, Baboons, and Monkeys including Vervet, Red-tailed, and Black and White Colobus. Uniquely, the 200 strong Elephant population includes savannah and forest Elephants plus a hybrid form from inter-breeding. Researchers from the University of Indiana have been studying chimpanzees in the riverine forest at Mugiri close to Semliki Safari Lodge. There are chances of encountering chimpanzees when you take a primate walk. The reserve boosts 440 bird species including Red-necked falcon, Black-billed Barbet, and the turkey like Abyssinian Ground-hornbill. The Shoebill is usually sighted in the marshes of Lake Albert.",
      },
      {
        heading: "Accommodation",
        text: "There is a campsite and budget bandas run by UWA on the shores of Lake Albert at Ntoroko, these have to be booked in advance. Meals are prepared at the canteen at the campsite. Another campsite is at the reserve headquarters in Karugutu. Semliki Safari Lodge run by a private concessionaire The Uganda Safari Company offers an upmarket tented camp. Ntoroko Game Lodge offers luxury tented camps and a campsite at Ntoroko Landing site.",
      },
    ],
    signatureAttraction:
      "Uniquely, the 200 strong Elephant population includes savannah and forest Elephants plus a hybrid form from inter-breeding",
    activities: [
      "Primate walk",
      "Game drives",
      "Nature walk",
      "Community tourism (Karugutu Community Conservation Association)",
      "Boat ride on Lake Albert",
      "Hike to Nyaburogo Gorge",
    ],
    keySpecies: [
      "Elephants (savannah, forest, and hybrid)",
      "Buffalo",
      "Uganda Kob",
      "Waterbuck",
      "Warthog",
      "Giant Forest Hog",
      "Hippopotamus",
      "Chimpanzees",
      "Baboons",
      "Vervet monkeys",
      "Red-tailed monkeys",
      "Black and White Colobus monkeys",
      "Red-necked falcon",
      "Black-billed Barbet",
      "Abyssinian Ground-hornbill",
      "Shoebill",
    ],
    image: null,
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/toro-semliki/",
    todo: [
      "name (the page's own <title> and nav menu label it just 'Toro Semliki.' with a trailing period; the fuller name 'Toro Semliki Wildlife Reserve' is what the body copy itself uses, and is used here)",
      "image (this page's og:image resolves to the sitewide generic UWA-Rangers.jpeg placeholder, not a reserve-specific photo; nothing downloaded for this entry)",
    ],
  },
  {
    slug: "katonga",
    name: "Katonga Wildlife Reserve",
    region: "Kyenjojo and Kamwenge Districts",
    areaKm2: 207,
    areaRaw: "207km2",
    gazettedYear: 1964,
    intro:
      "Katonga Wildlife Reserve with an area of 207 square kilometers was gazetted in 1964 as a game reserve, to serve as a corridor for migrating wildlife from Western Uganda to Tanzania and Sudan. It became a Wildlife Reserve in 1996 when the former Game Department and Uganda National Parks merged to form Uganda Wildlife Authority (UWA). Currently, the reserve is managed by UWA under the Kibale Conservation Area administration with a Warden In-Charge based at the Reserve Head Office at Kikorogoto.",
    sections: [
      {
        heading: "Location and access",
        text: "The 207km2 Katonga Wildlife Reserve is a savannah grassland ecosystem located within Kyenjojo and Kamwenge Districts. The journey into the Reserve is a three-hour drive from Kampala to Kyegegwa Town Council. At Kyegegwa, detour southwards for 42 km following well visible signposts.",
      },
      {
        heading: "Flora",
        text: "The Reserve's terrain is predominantly undulating in nature with distinct vegetation types. Vegetation includes grasslands, wooded grasslands, woodlands, riverine woodlands, swamp, riverine grasslands, papyrus. Most of the area is mixed savannah with acacia or woodland. However, large portions of the reserve are either permanent or seasonal wetlands. The reserve also contains various pockets of riverine and tropical forests. Its unique geographical location between forests, swamps, and savannah vegetation gives the reserve a diverse ecosystem that favors the existence of a variety of animal species. The most dominant plant species include Sporobolus Festivus and Chloris gayana. These species exist with associate species like Setaria species, Hyparrhenia species, and occasional Panicum maximum. The Katonga wetland system is interlinked with the Nile system forming an important wetland system for human survival. The variety of different vegetation types, particularly the wetlands, provides a range of habitats, which enhances the faunal diversity of the reserve.",
      },
      {
        heading: "Fauna",
        text: "Katonga Wildlife Reserve has a viable Sitatunga population inhabiting the Katonga Wetland System. The reserve also harbors a high population of waterbucks. The population of Hippos and birds is also growing in addition to primates. In the 1960s, the reserve was home to a variety of animals including the zebra, topi, and eland, which are no longer seen in the reserve. Elephant, buffalo, waterbuck, bushbuck, reedbuck, and sitatunga still occur in the reserve. Between 1971 and 1985, most of the wildlife was killed through commercial and subsistence poaching. The reserve was also heavily encroached by cultivators and cattle grazing. In 2014 however, all the encroachers in the park were evicted. In 2015 60 Impalas and 5 Zebras were successfully translocated to the reserve in order to restock and boost animal populations for tourism. The population of impalas now stands at 300 individuals The current bird checklist is over 150 including species-specific to wetlands, savannah, and forests. Other mammals include Black and White Colobus Monkey, the River Otter, and Olive Baboon, Uganda Kob, Waterbuck, Leopard, Buffalo, reedbuck, bushbuck and duiker, and chevrotain. The reserve is also home to various reptiles, amphibians, and butterflies. The table below shows the 2004 animal population census results for the reserve.",
      },
    ],
    signatureAttraction:
      "Katonga Wildlife Reserve has a viable Sitatunga population inhabiting the Katonga Wetland System",
    activities: [],
    keySpecies: [
      "Sitatunga",
      "Waterbuck",
      "Hippopotamus",
      "Elephant",
      "Buffalo",
      "Bushbuck",
      "Reedbuck",
      "Impala (translocated 2015)",
      "Zebra (translocated 2015)",
      "Black and White Colobus Monkey",
      "River Otter",
      "Olive Baboon",
      "Uganda Kob",
      "Leopard",
      "Duiker",
      "Chevrotain",
    ],
    image: "/parks/katonga-wildlife-reserve-bay.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/katonga/",
    todo: [
      "activities (no dedicated activities list found on page; inferred none)",
      "the Fauna section's own text references \"The table below shows the 2004 animal population census results\" but no table was present in the page's extracted content",
    ],
  },
  {
    slug: "ajai",
    name: "Ajai",
    region: "West Bank of the Nile between Pakwach and Nimule, Uganda",
    areaKm2: 148,
    areaRaw: "148km2 (15,800ha)",
    areaDisputed:
      "The page states both '148km2' and, parenthetically, '15,800ha' for the same figure — these don't convert to the same area (148km2 = 14,800ha, not 15,800ha). areaKm2 uses the page's headline 148km2 figure; the hectare figure is recorded as-is in areaRaw without being reconciled.",
    gazettedYear: 1965,
    intro: null,
    sections: [
      {
        heading: "Date Established",
        text: "Established in 1962 as the White Rhino Sanctuary. Established as Ajai Game Reserve in 1965",
      },
      {
        heading: "Geographical Location",
        text: "West Bank of the Nile between Pakwach and Nimule, about 10km north of Inde and 32km east-south-east of Arua. 2°55'N, 3r25'E. Altitude 700-1,000m. Area 148km2  (15,800ha).",
      },
      {
        heading: "Physical Features",
        text: "This area of rivers and riverine swamp borders the River Nile and two tributaries, the Ala and Acha. The reserve includes a number of swamp islands including Ajai island formed by gradual deposition of soil from the hills by the Ala River. The swamp is surrounded by savanna woodland. Most of the swamp is flooded during the rainy months (June to January) but dries out from February to May.",
      },
      {
        heading: "Vegetation",
        text: "Wooded savanna and grassland communities of Loudetia-Eragrostis and Hyparrhenia. There is a variety of vegetation on the island due to its gradual formation. The older eastern sector has a mosaic of savanna forest and sandy plains, areas of thick forest, rain forest, and open grass plains with Imperata (a grass occurring elsewhere only in the highlands which are the source of the Ala River). The western sector is covered in dense elephant grass Pennisetum with clumps of wild date plum Phoenix.",
      },
      {
        heading: "Fauna",
        text: "The migration of animals onto the island during the dry season is necessitated by a lack of forage in the surrounding dry scrubland. Mammals include hippopotamus Hippopotamus amphibius along the Nile, Uganda kob Kobus kob ihomasi, hartebeest Alcelaphus buselaphus, bushbuck Tragelaphus scriptus, and waterbuck Kobus elUpsiprymnus. Black and white colobus Colobus guereza and baboon Papio sp. have been recorded.",
      },
      {
        heading: "Conservation Management",
        text: "There are guard posts at Ogoko, Iriemve and Inde. Iriemve and Inde were not in use in 1980. Zoning: None. Disturbances or Deficiencies: The small size of the reserve results in many animals continually moving in and out into open areas in the vicinity where they are subject to poaching. The threatened northern white rhinoceros Ceratotherium simum cottoni has not been seen here since the war in 1979 and is assumed to have been wiped out.",
      },
      {
        heading: "Tourism Facilities",
        text: "The reserve is managed by Uganda Wildlife Safaris Ltd who offer sport hunting photographic safaris.",
      },
    ],
    signatureAttraction: null,
    activities: ["Sport hunting", "Photographic safaris"],
    keySpecies: [
      "Hippopotamus",
      "Uganda kob",
      "Hartebeest",
      "Bushbuck",
      "Waterbuck",
      "Black and white colobus",
      "Baboon",
    ],
    image: "/parks/ajai-wildlife-reserve-crowned-cranes.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/ajai/",
    todo: [
      "name (the page titles it simply 'Ajai'; body text calls it 'Ajai Game Reserve' when established in 1965, after originating as the 'White Rhino Sanctuary' in 1962 — no fuller 'Ajai Wildlife Reserve' name appears anywhere on the page)",
      "intro (page has no flowing intro paragraph; content extracted as labeled sections, see `sections`)",
      "gazettedYear (page gives two dates: 1962 as White Rhino Sanctuary, 1965 as Ajai Game Reserve; 1965 used here)",
      "areaKm2/areaDisputed (see areaDisputed)",
      "signatureAttraction (page names no current flagship attraction; historically Ajai was Uganda's White Rhino Sanctuary, but the page states the northern white rhinoceros 'has not been seen here since the war in 1979 and is assumed to have been wiped out')",
      "image (og:image shows a pair of grey crowned cranes, a species not named anywhere in this page's own Fauna text)",
    ],
  },
  {
    slug: "bugungu",
    name: "Bugungu",
    region: "Between Murchison Falls National Park and the north shore of Lake Albert",
    areaKm2: 520,
    areaRaw: "52,000ha",
    gazettedYear: 1968,
    intro: null,
    sections: [
      {
        heading: "Date Established",
        text: "1968 originally established as a Controlled Hunting Area in 1963",
      },
      {
        heading: "Geographical Location",
        text: "Between Murchison Falls  National Park and the north shore of Lake Mobutu Sese Seko (Lake Albert). 2°15'N, 3r30'E. Altitude 600- 1,300m. Area 52,000ha; contiguous to Murchison Falls National Park (384,000ha) and Karuma Wildlife Reserve  (82,000ha).",
      },
      {
        heading: "Physical Features",
        text: "The features are similar to the southern sector of Murchison Falls National Park. Bugungu Wildlife  Reserves and Karuma Wildlife  Reserve constitute a buffer zone for the southern boundary of Murchison Falls National Park.",
      },
      { heading: "Vegetation", text: "Dry thicket with some open savanna woodland" },
      {
        heading: "Fauna",
        text: "The area is well-known for chimpanzees Pan troglodytes, but the number in the reserve is unclear. Mammals include lion Panthera leo, elephant Loxodonta africana, warthog Phacochoerus aethiopicus, buffalo Syncerus caffer, waterbuck Kobus ellipsiprymnus, Uganda kob Kobus koh, hartebeest Alcelaphus buselaphus, and many small ungulates. The reserve includes part of Budongo Forest which has a relatively rich birdlife",
      },
    ],
    signatureAttraction:
      "The area is well-known for chimpanzees Pan troglodytes, but the number in the reserve is unclear",
    activities: [],
    keySpecies: [
      "Chimpanzees",
      "Lion",
      "Elephant",
      "Warthog",
      "Buffalo",
      "Waterbuck",
      "Uganda kob",
      "Hartebeest",
    ],
    image: "/parks/bugungu-wildlife-reserve-airstrip.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/bugungu/",
    todo: [
      "intro (page has no flowing intro paragraph; content extracted as labeled sections, see `sections`)",
      "gazettedYear (page gives two dates: 1968 as the reserve, 1963 as a precursor Controlled Hunting Area; 1968 used here)",
      "areaKm2 (converted from the page's stated 52,000ha; no km2 figure given directly)",
      "activities (none listed on page)",
    ],
  },
  {
    slug: "karuma",
    name: "Karuma",
    region: "Western Uganda, adjoining Murchison Falls National Park to the north",
    areaKm2: 675,
    areaRaw: "675km2 (82,000ha)",
    areaDisputed:
      "The page states both '675km2' and, parenthetically, '82,000ha' for the same figure — these don't convert to the same area (675km2 = 67,500ha, not 82,000ha; 82,000ha = 820km2, not 675km2). Bugungu's own page also cites Karuma at 82,000ha, agreeing with the parenthetical here but not with this page's headline 675km2. areaKm2 uses the headline figure; the hectare figure is recorded as-is in areaRaw without being reconciled.",
    gazettedYear: 1964,
    intro: null,
    sections: [
      { heading: "Date Established", text: "1964  Previously a Controlled Hunting Area  1962." },
      {
        heading: "Geographical Location",
        text: "Western Uganda, adjoining Murchison Falls National Park to the north. Approximately r50'N, 3r45'E. Altitude 900m – 1,300m. Area 675km2 (82,000ha); contiguous to Murchison Falls National Park 3877km2 (384,000ha) and Bugungu Wildlife Reserve 473km2 (52,000ha).",
      },
      {
        heading: "Physical Features",
        text: "This is an area of gentle relief crossed by several watercourses, south of the Victoria Nile.",
      },
      {
        heading: "Vegetation",
        text: "The savanna grasslands are dominated by elephant grass Pennisetum purpureurn and Hyparrhenia rufa with isolated forest and savanna trees representing remnants of former forest cover. It is bordered to the southwest by a forested zone.",
      },
      {
        heading: "Fauna",
        text: "Species similar to those in Murchison Falls National Park include elephant Loxodonta africana, giraffe Giraffa carrielopardalis, buffalo Syncerus caffer, and many antelope species. Large numbers of animals move in herds to and from Murchison Falls National Park.",
      },
    ],
    signatureAttraction:
      "Large numbers of animals move in herds to and from Murchison Falls National Park",
    activities: [],
    keySpecies: ["Elephant", "Giraffe", "Buffalo"],
    image: "/parks/karuma-wildlife-reserve-nile-rapids.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/karuma/",
    todo: [
      "intro (page has no flowing intro paragraph; content extracted as labeled sections, see `sections`)",
      "gazettedYear (page gives two dates: 1964 as the reserve, 1962 as a precursor Controlled Hunting Area; 1964 used here)",
      "areaKm2/areaDisputed (see areaDisputed)",
      "activities (none listed on page)",
      "image (og:image shows river rapids resembling Karuma Falls on the Victoria Nile, which this page's own text never names)",
    ],
  },
  {
    slug: "kigezi",
    name: "Kigezi",
    region: "A southward annex to Queen Elizabeth National Park",
    areaKm2: 265,
    areaRaw: "265km2 (33,000ha)",
    areaDisputed:
      "The page states both '265km2' and, parenthetically, '33,000ha' for the same figure — these don't convert to the same area (265km2 = 26,500ha, not 33,000ha). areaKm2 uses the page's headline figure; the hectare figure is recorded as-is in areaRaw without being reconciled.",
    gazettedYear: 1952,
    intro: null,
    sections: [
      { heading: "Date Established", text: "1952" },
      {
        heading: "Geographical Location",
        text: "The reserve is a southward annex to Queen Elizabeth National Park, separated from Lake Edward by a 7km wide sector of the park. 0°30'S, 29°50'E. Altitude About 1,050m. Area 265km2 (33,000ha); contiguous to Queen Elizabeth National Park 2056km2 (197,800ha) and its associated reserves.",
      },
      { heading: "Physical Features", text: "Situated on the western arm of the Central African rift valley." },
      {
        heading: "Vegetation",
        text: "The moist deciduous forest and grass savanna are similar to the sector of Queen Elizabeth National Park south of Maramagambo Forest with dominant trees of Acacia and Albizia spp., and grasses such as Imperata. Cymbopogon. Hyparrhenia, and Beckeropsis.",
      },
      {
        heading: "Fauna",
        text: "Mammals usually occur in small numbers and include: eastern black-and-white Colobus Colobus guereza and some red colobus Colobus badius, the eastern subspecies of chimpanzee Pan troglodytes schweinfurthii, lion Panthera leo, leopard Panthera pardus, elephant Loxodonta africana, warthog Phacochoerus aethiopicus, giant forest hog Hylochoerus meinerlzhageni, hippopotamus Hippopotamus artjphibius, buffalo Syncerus caffer, Uganda kob Kobus kob thormsi, waterbuck Kohus ellipsiprymnus, bushbuck Tragelaphus scriptus, topi Darttaliscus lunatus and Oribi Ourebia ourebi. The abundant birdlife is similar to Queen Elizabeth National Park.",
      },
      {
        heading: "Zoning",
        text: "The reserve acts as a buffer zone between Queen Elizabeth National Park and the well-populated areas to the south and east. There is no zonation within the reserve.",
      },
      {
        heading: "Disturbances or Deficiencies",
        text: "Settlement and cultivation in adjoining areas are encroaching on the reserve and local people poach for meat. A road from the national park to Kabale, which provides access to Kayonza Forest, crosses the reserve.",
      },
    ],
    signatureAttraction: null,
    activities: [],
    keySpecies: [
      "Eastern black-and-white colobus",
      "Red colobus",
      "Chimpanzee (Pan troglodytes schweinfurthii)",
      "Lion",
      "Leopard",
      "Elephant",
      "Warthog",
      "Giant forest hog",
      "Hippopotamus",
      "Buffalo",
      "Uganda kob",
      "Waterbuck",
      "Bushbuck",
      "Topi",
      "Oribi",
    ],
    image: "/parks/kigezi-wildlife-reserve-lion.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/kigezi/",
    todo: [
      "intro (page has no flowing intro paragraph; content extracted as labeled sections, see `sections`)",
      "areaKm2/areaDisputed (see areaDisputed)",
      "activities (none listed on page)",
      "signatureAttraction (page names no discrete flagship attraction; frames the reserve as a buffer zone sharing Queen Elizabeth National Park's fauna)",
      "image (og:image is a tree-climbing-lion photo; lion is named in this page's own Fauna list, but the generic filename ('3-1-1024x576-1.jpg') suggests a stock/library shot rather than a Kigezi-specific capture — the same genre of photo already used for Queen Elizabeth NP in public/parks/tree-climbing-lions-in-ishasha-1.webp)",
    ],
  },
  {
    slug: "kyambura",
    name: "Kyambura",
    region: "South-west Uganda, bordering the southeast of the Kazinga Channel and the south shore of Lake George",
    areaKm2: 157,
    areaRaw: "15,700ha",
    gazettedYear: 1965,
    intro: null,
    sections: [
      {
        heading: "Date Established",
        text: "Established 1965. The reserve was previously part of a larger area established as a Controlled Hunting Area.",
      },
      {
        heading: "Geographical Location",
        text: "South-west Uganda bordering the southeast of the Kazinga Channel and the south shore of Lake George. 0°05'S, 30°05'E. Altitude 700- 1,1 00m. Area 15,700ha; contiguous to Queen Elizabeth National Park (197,800ha) and its associated reserves.",
      },
      {
        heading: "Physical Features",
        text: "The terrain is characterized by small hills and about 10 crater lakes above the east wall of the western Rift Valley (here interrupted by the vast upheaval of the Ruwenzori range). The area also contains a number of swamps. The boundary with Queen Elizabeth National Park is defined by the Kyambura River which flows into the Kazinga Channel.",
      },
      { heading: "Vegetation", text: "Savanna grassland and deciduous thickets" },
      {
        heading: "Fauna",
        text: "The fauna is similar to Queen Elizabeth National Park with mammals including hippopotamus Hippopotamus amphibius, lion Panthera leo, leopard Panthera pardus, elephant Loxodonta africana, buffalo Syncerus caffer, and a variety of antelope and other small ungulates. Waterbirds feature prominently in the avifauna including occasional visits by lesser flamingo Phoeniconaias minor.",
      },
      {
        heading: "Zoning",
        text: "The reserve forms a buffer zone for animals moving out of Queen Elizabeth National Park. No zoning exists within the reserve.",
      },
      {
        heading: "Disturbances or Deficiencies",
        text: "Small fishing villages existing at the time of the declaration of the reserve remain, but further settlement is prohibited. There is poaching of hippopotamuses and other games for meat and illegal fishing.",
      },
      {
        heading: "Visitor Facilities",
        text: "Access is by unsurfaced tracks only passable in dry weather. Scientific Research: Periodic animal population surveys.",
      },
    ],
    signatureAttraction:
      "Waterbirds feature prominently in the avifauna including occasional visits by lesser flamingo Phoeniconaias minor",
    activities: [],
    keySpecies: ["Hippopotamus", "Lion", "Leopard", "Elephant", "Buffalo", "Lesser flamingo (occasional)"],
    image: "/parks/kyambura-wildlife-reserve-lions.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/kyambura/",
    todo: [
      "intro (page has no flowing intro paragraph; content extracted as labeled sections, see `sections`)",
      "areaKm2 (converted from the page's stated 15,700ha; no km2 figure given directly)",
      "activities (the live page's own text says nothing about Kyambura Gorge chimpanzee tracking — the 'Valley of the Apes' — despite that being this reserve's best-known real-world activity; only what the live page actually states is recorded here)",
    ],
  },
  {
    slug: "pian-upe",
    name: "Pian-Upe",
    region: "Eastern Uganda, north of Mount Elgon, about 50km east of Soroti",
    areaKm2: 2314,
    areaRaw: "231,400ha",
    gazettedYear: 1964,
    intro: null,
    sections: [
      { heading: "Date Established", text: "Established 1964. Previously declared as Debasien Animal Sanctuary." },
      {
        heading: "Geographical Location",
        text: "Eastern Uganda, north of Mount Elgon and SOkm east of Scroti. I'SO'-I'IS'N, 34\"34'05′-34°50'E. Altitude l,000-3,06Sm. Area 231,400ha; connected to Matheniko Game Reserve (160,000ha) by the Bokora Corridor.",
      },
      {
        heading: "Physical Features",
        text: "This is a high plateau area of rolling plains with black cotton soil drained by intermittent watercourses flowing westwards into Lake Kyoga. Most of the area is subject to inundation during the rainy season. Mount Kadam (previously Mount Debasien) near the border with Kenya, is the highest point in the reserve at 3,068m.",
      },
      {
        heading: "Vegetation",
        text: "Most of the area is wooded savanna grasslands with some forest in the north on the margins of a higher ridge.",
      },
      {
        heading: "Fauna",
        text: "A large variety of mammals in the area include lion Panthera leo, leopard Pantheia pardus (T), cheetah Acinonyx jubatus (T), giraffe Giraffa camelopardalis, buffalo Syncerus caffer, waterbuck Kobus ellipsiprymnus, Uganda kob Kobus kob, mountain reedbuck Redunca fuhorufula, roan antelope Hippotragus equinus, Jackson's hartebeest Alcelaphus buselaphus Jacksoni, oribi Ourebia ourebi. Most of the eland Taurotragus oryx, topi Damaliscus lunatus, and zebra Eguus quaga borensis migrate into the area to breed from North Bokora and Matheniko reserves and migrate northwards when the rains begin. Birds include ostrich Struthio camelus, secretary bird Sagittarius serpentarius, and yellow-billed shrike Corvinella Corvina (uncommon).",
      },
      {
        heading: "Disturbances or Deficiencies",
        text: "Settlement and grazing of domestic livestock have occurred since the declaration of the reserve. Cattle and wildlife share the same habitat during dry seasons and wildlife are now very sparse. Poaching and forest encroachment in the south, although this has been reduced by local cattle rustling activities.",
      },
    ],
    signatureAttraction:
      "Most of the eland, topi, and zebra migrate into the area to breed from North Bokora and Matheniko reserves and migrate northwards when the rains begin",
    activities: [],
    keySpecies: [
      "Lion",
      "Leopard",
      "Cheetah",
      "Giraffe",
      "Buffalo",
      "Waterbuck",
      "Uganda kob",
      "Mountain reedbuck",
      "Roan antelope",
      "Jackson's hartebeest",
      "Oribi",
      "Eland (migratory)",
      "Topi (migratory)",
      "Zebra (migratory)",
      "Ostrich",
      "Secretary bird",
      "Yellow-billed shrike (uncommon)",
    ],
    image: "/parks/pian-upe-wildlife-reserve-ostriches.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/pian-upe/",
    todo: [
      "intro (page has no flowing intro paragraph; content extracted as labeled sections, see `sections`)",
      "areaKm2 (converted from the page's stated 231,400ha; no km2 figure given directly)",
      "activities (none listed on page)",
      "the Geographical Location section's coordinates and altitude are garbled/OCR-damaged on the live page ('SOkm east of Scroti', \"I'SO'-I'IS'N\", 'l,000-3,06Sm') and reproduced exactly as printed rather than corrected",
    ],
  },
  {
    slug: "matheniko",
    name: "Matheniko",
    region: "Karamoja region, just north of Moroto, extending along the border with Kenya",
    areaKm2: 1600,
    areaRaw: "160,000ha",
    gazettedYear: 1964,
    intro: null,
    sections: [
      {
        heading: "Date Established",
        text: "Established 1964. Previously part of Central Karamoja Controlled Hunting Area.",
      },
      {
        heading: "Geographical Location",
        text: "In the Karamoja region, just north of Moroto, extending along the border with Kenya. 2°40′-3°07'N, 34°10′-34°50'E. lUCN Directory of Afrotropical Protected Areas Altitude 1,200- 1,600m. Area 160,000ha; contiguous to Bokora Corridor Game Reserve (205,600ha) and the eastern Uganda complex of Controlled Hunting Areas. Land Tenure: Government.",
      },
      {
        heading: "Physical Features",
        text: "The reserve is part of the Karamoja plateau. It is bounded on the east by the Great Rift escarpment which forms the Uganda/Kenya border in this area and is interrupted in the south by spurs and extensions of higher ground.",
      },
      { heading: "Vegetation", text: "Thorny deciduous thicket" },
      {
        heading: "Fauna",
        text: "Resident mammals include lion Panthera leo, leopard Panthera pardus (V), cheetah Acinonyx jubalus (V), giraffe Giraffa camelopardalis, eland Taurolragus oryx, roan antelope Hippotragus equinui, and Bright's gazelle Nanga notatus. The area has been the traditional pasture during the wet season for herds migrating from southern Karamoja, particularly from the Pian-Upe plains.",
      },
    ],
    signatureAttraction:
      "The area has been the traditional pasture during the wet season for herds migrating from southern Karamoja, particularly from the Pian-Upe plains",
    activities: [],
    keySpecies: ["Lion", "Leopard", "Cheetah", "Giraffe", "Eland", "Roan antelope", "Bright's gazelle"],
    image: "/parks/matheniko-wildlife-reserve-camels.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/matheniko/",
    todo: [
      "intro (page has no flowing intro paragraph; content extracted as labeled sections, see `sections`)",
      "areaKm2 (converted from the page's stated 160,000ha; no km2 figure given directly)",
      "activities (none listed on page)",
      "the Geographical Location section includes a stray citation fragment ('lUCN Directory of Afrotropical Protected Areas') that appears to be bleeding in from the page's original source material rather than being reserve content; reproduced verbatim as printed",
      "image (og:image filename literally reads 'Wildlife-species-in-the-Matheniko-wildlife-Reserve.jpg' but shows a herd of domestic camels — a species not in this page's own Fauna list and not native Ugandan wildlife; used as-is because it is genuinely the photo UWA's own page markup designates for this page)",
    ],
  },
  {
    slug: "bokora",
    name: "Bokora",
    region: "Eastern Uganda between Moroto and Mount Elgon, along the south-western boundary of the Karamoja region",
    areaKm2: 2056,
    areaRaw: "205,600ha",
    gazettedYear: 1964,
    intro: null,
    sections: [
      {
        heading: "Date Established",
        text: "Gazetted in 1964 to ensure freedom of movement for the game during migration between the Matheniko plains and Pian-Upe Game Reserve. The reserve was originally part of Central and South Karamoja Controlled Hunting Areas.",
      },
      {
        heading: "Geographical Location",
        text: "In eastern Uganda between Moroto and Mount Elgon, between Matheniko Game Reserve and Pian-Upe Game Reserve, along the south-western boundary of the Karamoja region. 2\"07′-2\"45'N, 33°50′-34°50'E. Altitude 1,000-2, 100m. Area 205,600ha; contiguous to Pian-Upe Game Reserve (228,710ha) and Matheniko Game Reserve (158,650ha). Flanked on remaining sides by four Controlled Hunting Areas totaling over 2,000,000 ha, which are contiguous to four other Controlled Hunting Areas and Kidepo Valley National Park (134,400ha).",
      },
      {
        heading: "Physical Features",
        text: "The reserve is a plateau with a few inselbergs, typical of the southern Karamoja region. The climate is relatively dry.",
      },
      {
        heading: "Vegetation",
        text: "The wooded grassland savanna on marginal land is of little or no use for agriculture or settlement.",
      },
      {
        heading: "Fauna",
        text: "A wide variety of antelopes (but not in high numbers) includes eland Taurotragus oryx, Uganda kob Kobus kob thomasi, reedbuck Redunca redunca, mountain reedbuck Redunca fulwrufula, topi Damaliscus lunatus, hartebeest Alcelaphus buselaphus jacksoni, and oribi Ourebia ourebi aequatoria. Other mammals include: spotted hyena Crocuta crocuta, leopard Panthera pardus (T)",
      },
    ],
    signatureAttraction:
      "Gazetted in 1964 to ensure freedom of movement for the game during migration between the Matheniko plains and Pian-Upe Game Reserve",
    activities: [],
    keySpecies: ["Eland", "Uganda kob", "Reedbuck", "Mountain reedbuck", "Topi", "Hartebeest", "Oribi", "Spotted hyena", "Leopard"],
    image: "/parks/bokora-wildlife-reserve-birds.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/bokora-wildlife-reserve/",
    todo: [
      "intro (page has no flowing intro paragraph; content extracted as labeled sections, see `sections`)",
      "areaKm2 (converted from the page's stated 205,600ha; no km2 figure given directly)",
      "activities (none listed on page)",
      "image (the birds shown aren't named in this page's own Fauna text, which lists only mammals, so the photo can't be cross-checked against page copy; filename pattern suggests a Flickr-sourced photo)",
    ],
  },
  {
    slug: "kabwoya",
    name: "Kabwoya Wildlife Reserve",
    region: "Hoima District, on the shoreline of Lake Albert",
    areaKm2: 87,
    areaRaw:
      "87 sq. km (the Kabwoya Wildlife Reserve/KWR itself); nested within the larger 194 sq. km Kabwoya-Kaiso Wildlife Management Area (KKWMA), which also includes a separate 107 sq. km Kaiso-Tonya Community Wildlife Area (KTCWA)",
    gazettedYear: 2002,
    intro:
      "This area was gazetted as a reserve in 2002. However, in the early 1960s, the Uganda Game Department sought to exert more control over sport hunting in Uganda by declaring certain areas to be Controlled Hunting Areas (CHAs) in which sport hunting could only be carried out by special license, and against carefully set quotas. The Kaiso-Tonya area on the shoreline of Lake Albert was gazetted as a CHA in 1963 as it harbored isolated but important populations of Uganda kob, buffalo, and hartebeest. Game Department records indicate that hunting in Kaiso-Tonya CHA, and in its smaller neighbor Buhuka CHA, was properly regulated until the mid-1970s. Thereafter, with the breakdown of law and order in Uganda, no further management of either area took place for the next 20 years.",
    sections: [
      {
        heading: "The Kabwoya-Kaiso Wildlife Management Area",
        text: "The Kabwoya-Kaiso Wildlife Management Area (KKWMA) is in Hoima District and covers the majority of the land formerly known as the Kaiso-Tonya Controlled Hunting Area. The KKWMA has a total area of 194 sq. km and comprises the Kabwoya Wildlife Reserve (KWR, area 87 sq. km) and the adjacent Kaiso-Tonya Community Wildlife Area (KTCWA, area 107 sq. km). The Hohwa River separates KWR and KTCWA. The KKWMA is bounded on the east by the foot of the Albertine Rift escarpment, to the west by the shoreline of Lake Albert, to the north by the Lwamagongo River, and to the south by the Warwire River. The KWR has been surveyed and boundary beacons installed. KKWMA is the only relatively ecologically intact area of savannah along the 200 km stretch of Lake Albert shoreline between Toro-Semliki WR in the south, and to Murchison Falls NP in the north. In its position in the Rift, and with its proximity to the large Bugoma Forest Reserve, the KKWMA is of great importance in maintaining corridors for genetic flow in the Albertine Rift. Kabwoya falls within one district, Hoima, and is surrounded by 3 sub-counties namely, Kabwoya, Kyangwali, and Buseruka.",
      },
      {
        heading: "Access",
        text: "The area is accessed by road from Hoima which is a distance of 82 km. The road was in a poor state before the oil activities started in the area. The road has been upgraded to bitumen which has greatly improved accessibility into the reserve.",
      },
      {
        heading: "Landscape",
        text: "The dominant features of the KKWMA are the Albertine Rift escarpment to the east, Lake Albert to the west, and the Hohwa River that bisects the two zones of the concession area. The main area of KKWMC is a gently sloping shelf of land between the escarpment base and the lakeshore. In the central part of the shoreline, the shelf drops to the lake in a small steep escarpment of 70 m in height. Elsewhere along the shoreline, the gradient is shallow to the beach, providing for the establishment of many fishing villages. In terms of geology, the area is comprised of alluvial sands, which are easily eroded; this area was once the floor of Lake Albert.",
      },
      {
        heading: "Flora",
        text: "The vegetation primarily comprises Hyparrhenia and Themeda grassland interspersed with patches of the undifferentiated dry thicket with Grewia spp and Acacia brevispica (Langdale-Brown 1964). Along the Hohwa River are stretches of riverine forest.",
      },
      {
        heading: "Fauna",
        text: "The various census surveys carried out in the area indicate significant populations of Uganda kob, bush duiker, oribi, warthog, bushbuck, bushpig, and colobus. There are small populations of hippo and buffalo. The main large carnivores are leopards and hyena. The most significant „flagship‟ species is chimpanzees, which are found in the riverine forest along the Hohwa River. Species once recorded in this area, but are now absent, are Bohor reedbuck, hartebeest, and giant forest hog. Three male waterbuck have also been spotted on the reserve.",
      },
    ],
    signatureAttraction:
      "The most significant „flagship‟ species is chimpanzees, which are found in the riverine forest along the Hohwa River",
    activities: [],
    keySpecies: [
      "Uganda kob",
      "Bush duiker",
      "Oribi",
      "Warthog",
      "Bushbuck",
      "Bushpig",
      "Colobus",
      "Hippo",
      "Buffalo",
      "Leopard",
      "Hyena",
      "Chimpanzees",
    ],
    image: "/parks/kabwoya-wildlife-reserve-elephants.webp",
    sourceUrl: "https://ugandawildlife.org/wildlifereserves/kabwoya/",
    todo: [
      "gazettedYear (page also describes an earlier 1963 Kaiso-Tonya Controlled Hunting Area precursor; 2002, the reserve's own gazettement date, is used here)",
      "areaKm2 (the reserve itself, KWR, is 87 sq. km; this is nested within the larger 194 sq. km Kabwoya-Kaiso Wildlife Management Area, which also includes a separate 107 sq. km Kaiso-Tonya Community Wildlife Area that is not part of the reserve — see areaRaw)",
      "activities (no dedicated activities list found on page)",
      "image (og:image filename 'elephtans.jpg' [UWA's own typo] shows an elephant family; elephants are not named anywhere in this page's own Fauna list)",
    ],
  },
];

export const reserveBySlug = (slug: string): Reserve | undefined =>
  reserves.find((r) => r.slug === slug);

/**
 * Source conflict, preserved rather than resolved by guessing — in the same spirit as
 * the `sourceConflicts` export in src/data/facts.ts.
 */
export const reserveCountDiscrepancy = {
  topic: "Wildlife Reserves count",
  values: [
    "12 Wildlife Reserves (homepage 'Our Mandate' paragraph)",
    "12 Wildlife Reserves (homepage 'Explore Uganda' section)",
    "11 Wildlife Reserves (the actual count in the site's own Parks & Reserves mega-menu)",
  ],
  note: "The homepage states '12 Wildlife Reserves' twice, in two different sections, and the two statements agree with each other. But the site's own Parks & Reserves mega-menu — the only place on the live site that actually enumerates the reserves by name and links to their pages — lists just 11: Toro Semliki, Katonga, Ajai, Bugungu, Karuma, Kigezi, Kyambura, Pian-Upe, Matheniko, Bokora, and Kabwoya. No twelfth reserve is named or linked anywhere on the live site. This file extracts exactly the 11 that are actually enumerable; the 12th is not invented.",
} as const;
