/**
 * Page copy extracted verbatim from ugandawildlife.org. Nothing here is written
 * by us; `todo` records what the live site does not provide.
 *
 * TWO PAGES ARE GENUINELY EMPTY ON THE LIVE SITE — this is a real finding, not a
 * scraping failure. /conservation/ and /visitor-guide/ both return an empty
 * Brizy container from UWA's own WordPress REST API. Those routes are therefore
 * assembled from material that DOES exist (the mission, the mandate counts, the
 * substantive About page) and carry visible TODOs for what UWA must supply.
 */

export interface PageSection {
  heading: string | null;
  body: string | null;
}

export interface PageContent {
  title: string | null;
  sections: PageSection[];
  sourceUrl: string | null;
  todo: string[];
}

export const pages: Record<string, PageContent> = {
  conservation: {
    title: "Conservation",
    sections: [],
    sourceUrl: "https://ugandawildlife.org/conservation/",
    todo: ["sections/body copy — verified via the site's own WP REST API (wp-json/wp/v2/pages/60) that content.rendered is an empty Brizy container (`<div class=\"brz-root__container ...\"></div>`); the live page currently renders no body text, only the standard site nav/footer"],
  },
  visitorGuide: {
    title: "Visitor Guide",
    sections: [],
    sourceUrl: "https://ugandawildlife.org/visitor-guide/",
    todo: ["sections/body copy — verified via the site's own WP REST API (wp-json/wp/v2/pages/2338) that content.rendered is empty (\"\"); the live page currently renders no body text, only the standard site nav/footer"],
  },
  about: {
    title: "About UWA",
    sections: [
      { heading: "Conserving & Sustaining Wildlife", body: "Uganda Wildlife Authority, (UWA) manages 10 National Parks; 12 Wildlife reserves; 5 Community Wildlife Management Areas; and 13 Wildlife Sanctuaries. The ten National Parks include Queen Elizabeth, Lake Mburo, Murchison Falls, Kidepo Valley, Kibale, Mount Elgon, Rwenzori Mountains, Semuliki, Mgahinga Gorilla, and Bwindi Impenetrable National Parks. These parks display the best in East Africa. Their Rift Valley landscapes and tropical forests make dramatic backdrops to an extensive variety of flora and fauna." },
      { heading: "What we do?", body: "Ecosystem Management; Monitoring & Research; Wildlife Resource Protection; Promoting Protected Areas as Tourism Destinations; Community Conservation Activities; Problem Animal Management; Licensing for Wildlife Use. Uganda Wildlife Authority (UWA) is a semi-autonomous government agency that conserves and manages Uganda's wildlife for the people of Uganda and the global community." },
      { heading: "OUR VISION", body: "To be a global leader in wildlife conservation" },
      { heading: "OUR MISSION", body: "To conserve, economically develop and sustainably manage the wildlife and protected areas of Uganda in partnership with neighboring communities and other stakeholders for the benefit of the people of Uganda and the global community." },
      { heading: "Uganda's Wildlife", body: "The parks offer 'traditional' savanna safaris along with boat tours, forest hikes, mountain climbing, and wildlife research activities. Uganda is unrivaled on the continent as a bird-watching destination with over 1,000 species of birds – several of which are found nowhere else on the planet. It is also home to 13 types of primates including over half of the world's endangered Mountain Gorillas; and our closest relative – the chimpanzee." },
      { heading: "Our Core Values", body: "Uganda Wildlife Authority upholds the following core values that are central to its operations. These values are in line with the organisational beliefs, culture and tradition that help drive staff to achieve the organisational mission: Strong Commitment to Conservation, Integrity, Teamwork, Excellent Service, Professionalism." },
    ],
    sourceUrl: "https://ugandawildlife.org/about-uwa/",
    todo: [],
  },
  bookingTerms: {
    title: "UWA Booking Terms",
    sections: [
      { heading: "Booking terms", body: "All visitors will be required to present valid identification documents to confirm resident status." },
      { heading: "Booking Terms", body: "No terms available. To support the growing tourism industry and provide better customer services within the parks, UWA has identified opportunities for investment in services, products and infrastructure and accommodation facilities. There are opportunities for development of new ecotourism products and services, within and outside the national parks, by the private sector or through public-private partnerships. We unfortunately have no booking terms available. Please do subscribe to our mailing list to receive all important updates about the Uganda Wildlife Authority." },
    ],
    sourceUrl: "https://ugandawildlife.org/booking-terms/",
    todo: ["The page itself states no detailed booking terms are currently published (\"No terms available\" / \"We unfortunately have no booking terms available\") — this is the live site's actual content, not a fetch failure"],
  },
};

/**
 * Site-wide fraud notice. Must survive the redesign — renders as a QUIET
 * BORDERED NOTE in the footer. Never a modal, never gold, never an alert colour.
 * Reproduced verbatim; only the mangled character encoding was repaired.
 */
export const fraudAlert = {
  body: "Fraud Alert !\n*IMPORTANT NOTICE TO ALL CLIENTS AND TOURISTS*\nUganda Wildlife Authority (UWA) communicates only through the official contact details published on this website. We do not recognize or authorize any communication via phone numbers, emails, or social media accounts not listed here.\nUWA shall not be liable for any losses, fraud, or miscommunication arising from dealings with unofficial contacts.\nFor verification of licensed tourism operators, please visit the Uganda Tourism Board (UTB) website at http://utb.go.ug.\nTo protect yourself:\n• Always verify contact information via this website.\n• Report suspicious contacts immediately.\nThank you for your vigilance.",
  sourceUrl: "https://ugandawildlife.org/ (site-wide footer, present on all pages including the homepage)",
} as const;
