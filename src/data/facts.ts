/**
 * Verified UWA facts. Every value here is taken verbatim from ugandawildlife.org
 * or from the client brief's verified-content section.
 *
 * DO NOT ADD A NUMBER TO THIS FILE THAT YOU CANNOT POINT AT A SOURCE FOR.
 * A missing value is a correct answer. A plausible guess is a project-ending failure.
 */

export const identity = {
  name: "Uganda Wildlife Authority",
  established: 1996,
  status:
    "Semi-autonomous agency under the Ministry of Tourism, Wildlife and Antiquities",
  // Matches ugandawildlife.org's own hero exactly, including the lowercase
  // "wildlife". An earlier version of this had it capitalised, which reads
  // fine but is not what the site actually publishes.
  tagline: "Conserving & Sustaining Uganda's wildlife, since 1996",
} as const;

export const mandate = [
  { count: 10, label: "National Parks" },
  { count: 12, label: "Wildlife Reserves" },
  { count: 13, label: "Wildlife Sanctuaries" },
  { count: 5, label: "Community Wildlife Management Areas", verb: "guides" },
] as const;

export interface Stat {
  /** The figure itself, for the count-up. */
  value: number;
  /** Rendered prefix/suffix, e.g. "+" or "%" or "~". */
  prefix?: string;
  suffix?: string;
  label: string;
  /** Optional supporting clause — must also be verified. */
  note?: string;
}

export const stats: Stat[] = [
  { value: 350, suffix: "+", label: "mammal species" },
  {
    value: 1073,
    label: "recorded bird species",
    note: "≈50% of Africa's, 11% of the world's",
  },
  {
    value: 51,
    suffix: "%",
    label: "of the world's mountain gorillas",
  },
  {
    value: 1004,
    prefix: "~",
    label: "mountain gorillas alive today",
    note: "27 habituated families",
  },
  {
    value: 5000,
    prefix: "~",
    label: "chimpanzees in Uganda",
    note: "~1,500 in Kibale",
  },
];

export const mission = {
  quote:
    "To conserve, economically develop and sustainably manage the wildlife and protected areas of Uganda in partnership with neighbouring communities and other stakeholders for the benefit of the people of Uganda and the global community.",
  attribution: "Uganda Wildlife Authority",
} as const;

/**
 * Verbatim, two paragraphs, from UWA's own "Our Mandate" copy on
 * ugandawildlife.org. Nothing paraphrased.
 */
export const mandateIntro = [
  "Uganda Wildlife Authority, (UWA) is Uganda's Government agency responsible for the management and protection of Wildlife in and outside protected areas. The agency is supervised by the Ministry of Tourism, Wildlife and Antiquities.",
  "Uganda Wildlife Authority, (UWA) manages 10 National Parks; 12 Wildlife Reserves; 5 Community Wildlife Management Areas; and 13 Wildlife Sanctuaries. The ten National Parks include Queen Elizabeth, Lake Mburo, Murchison Falls, Kidepo Valley, Kibale, Mount Elgon, Rwenzori Mountains, Semuliki, Mgahinga Gorilla, and Bwindi Impenetrable National Parks.",
] as const;

/**
 * Verbatim from ugandawildlife.org, including their exact capitalisation
 * and the space before the question mark in the heading.
 */
export const conservationFacts = {
  heading:
    "How DOES Uganda Wildlife Authority Support a more Sustainable Future ?",
  body: "The Agency is mandated with sustainable management of Wildlife and the Wildlife Protected Areas of Uganda in partnership with neighboring communities and other stakeholders for the benefit of the people of Uganda and the global community",
} as const;

export const executiveDirector = {
  name: "Dr. James Musinguzi, PhD",
  title: "Executive Director",
  pullQuote: "Conserving for Generations",
  paragraph:
    "Uganda's protected areas are home to some of the world's most iconic species and landscapes, from the mountain gorillas in the misty forests of Bwindi, to the roaring waterfalls of Murchison, the tree-climbing lions of Ishasha, and the snow-capped peaks of the Rwenzori Mountains. These natural wonders are not only vital to our national identity but also to our economy, environment, and global biodiversity.",
} as const;

export const mammalFact =
  "UGANDA boasts over 350 species of mammals, from the mighty giant mountain gorillas to the smallest ones like bats, bush babies, and shrews.";

/**
 * UWA's own homepage contradicts itself in three places. Recorded here
 * rather than resolved: per the project's hard rule, a missing or
 * conflicting value is reported, never silently guessed at or picked for
 * the visitor. `mandate` and `stats` above keep their existing verified
 * values (13, 1073, 350+); this export just names where a second, differing
 * figure appears on the source site.
 */
export const sourceConflicts = [
  {
    topic: "Wildlife Sanctuaries",
    values: ["13 Wildlife Sanctuaries", "7 Wildlife Sanctuaries"],
    note: "The mandate paragraph says 13; another section of the same homepage says 7.",
  },
  {
    topic: "Recorded bird species",
    values: ["1,060+", "1073"],
    note: "One stat block shows 1,060+, adjacent text says 1073.",
  },
  {
    topic: "Mammal species",
    values: ["345", "over 350 species of mammals"],
    note: "One stat block shows 345, the text says over 350 species of mammals.",
  },
] as const;

export const experiences = [
  {
    slug: "gorilla-tracking",
    title: "Gorilla Tracking",
    // TODO: replace with verbatim body copy from ugandawildlife.org
    body: null,
  },
  {
    slug: "chimpanzee-tracking",
    title: "Chimpanzee Tracking",
    body: null,
  },
  {
    slug: "batwa-experience",
    title: "The Batwa Experience",
    subtitle: "The Keepers of the Forest",
    body: "The forest's original inhabitants.",
  },
] as const;

export const contact = {
  tollFree: "0800 100 960",
  email: "reservations@wildlife.go.ug",
  // "Office Phone" on the live site. There is also a separate "Landline"
  // number in the same footer block, added below rather than merged in,
  // since UWA lists them as two distinct lines.
  phone: "+256 414 355000",
  landline: "+256 312 355000",
  address: "Plot 7 Kira Road, Kamwokya, P.O. Box 3530, Kampala",
  social: "@ugwildlife",
} as const;

/**
 * Verbatim from ugandawildlife.org's "Wildlife/Eco-System Conservation"
 * section. This is real published detail on what UWA's conservation work
 * consists of; an earlier pass at the Conservation page said the site
 * "publishes no body copy" for that topic, which was true of the dedicated
 * /conservation/ page but missed this section on the homepage itself.
 */
export const conservationStrategies =
  "UWA implements diverse strategies to conserve and sustainably manage wildlife. They include community participation in wildlife management; revenue sharing; collaborative management; problem animal management; wildlife use rights; and conservation education and awareness.";

export const nav = [
  { label: "Parks", href: "/#parks" },
  { label: "Conservation", href: "/conservation" },
  { label: "Plan Your Visit", href: "/plan-your-visit" },
  { label: "Media", href: "/media" },
  { label: "About", href: "/about" },
] as const;

export const cta = {
  primary: { label: "Book a permit", href: "/plan-your-visit" },
  secondary: {
    label: "UWA Rates",
    href: "https://ugandawildlife.org/wp-content/uploads/2024/03/UWA-Conservation-Tariff-July-2024-June-2026.pdf",
  },
} as const;

/**
 * Must survive the redesign. Renders as a quiet bordered note in the footer —
 * never a modal, never gold, never an alert colour.
 */
export const fraudAlert = {
  heading: "Fraud alert",
  // TODO: replace with the notice's verbatim wording from ugandawildlife.org
  body: "Uganda Wildlife Authority communicates only through its official contacts. Verify any correspondence against the contact details on this page.",
  verbatim: false,
} as const;
