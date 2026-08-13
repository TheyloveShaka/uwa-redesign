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
  tagline: "Conserving & Sustaining Uganda's Wildlife, Since 1996",
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
  phone: "+256 414 355000",
  address: "Plot 7 Kira Road, Kamwokya, P.O. Box 3530, Kampala",
  social: "@ugwildlife",
} as const;

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
