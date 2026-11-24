/**
 * The "All Aarti" section: the devotional pages around Baba Shyam. The text here is written for this site.
 * The pages whose content is a hymn (Chalisa, Aarti, Bhajan) are ready to show their full text as soon as it is added:
 * put the lines in `verses` and the page shows them under the introduction.
 */
export type DevotionIcon = "darshan" | "chalisa" | "aarti" | "bhajan" | "katha" | "mela" | "yatra";

export interface DevotionSection {
  heading: string;
  body: string[];
}

export interface DevotionItem {
  slug: string;
  title: string;
  hindi: string;
  icon: DevotionIcon;
  blurb: string;
  /** Sections of plain explanation. */
  sections: DevotionSection[];
  /** For a hymn page: the text, one line per entry. Empty until the team adds it. */
  verses?: string[];
  /** Links shown at the end of the page. */
  links?: { href: string; label: string; external?: boolean }[];
}

export const DARSHAN_ITEM = {
  slug: "darshan",
  title: "Shyam Baba Darshan",
  hindi: "श्याम बाबा दर्शन",
  icon: "darshan" as const,
  blurb: "Aarti timings for winter and summer, and the darshan aarti from the temple.",
};

export const DEVOTION_ITEMS: readonly DevotionItem[] = [
  {
    slug: "chalisa",
    title: "Shri Shyam Chalisa",
    hindi: "श्याम चालीसा",
    icon: "chalisa",
    blurb: "The forty-verse prayer in praise of Baba Shyam.",
    sections: [
      {
        heading: "About the Chalisa",
        body: [
          "A Chalisa is a prayer of forty verses. The Shyam Chalisa praises Baba Shyam, the Shishdani (the one who gave his head), and asks for his blessings and protection.",
          "Devotees read it every morning or evening, on Ekadashi, and before setting out for Khatushyamji.",
        ],
      },
      {
        heading: "How devotees read it",
        body: [
          "Many devotees bathe, light a lamp before Baba Shyam's picture, and read the Chalisa slowly and with a quiet mind.",
          "Some take a vow to read it every day for forty days. Whatever you choose, what matters is faith, not the number of times.",
        ],
      },
    ],
    verses: [],
  },
  {
    slug: "shyam-aarti",
    title: "Shyam Baba Ki Aarti",
    hindi: "श्याम बाबा की आरती",
    icon: "aarti",
    blurb: "The aarti sung to Baba Shyam at the end of every puja.",
    sections: [
      {
        heading: "About the Aarti",
        body: [
          "The aarti is sung with a lit lamp at the end of a puja. It is the moment when everyone present joins in, and it is sung at the temple several times a day.",
          "At Shri Shyam Mandir, Khatushyamji, five aartis are held every day: Mangala, Shringar, Bhog, Sandhya and Shayan. See the timings on the Shyam Baba Darshan page.",
        ],
      },
    ],
    verses: [],
    links: [{ href: "/aarti/darshan", label: "Aarti timings and darshan aarti" }],
  },
  {
    slug: "bhajan",
    title: "Shyam Bhajan",
    hindi: "श्याम भजन",
    icon: "bhajan",
    blurb: "Devotional songs for Baba Shyam, for satsang and jagran.",
    sections: [
      {
        heading: "About the Bhajans",
        body: [
          "Bhajans for Baba Shyam are sung at satsang, at the all-night jagran, and on the long walk of the Nishan Yatra to Khatushyamji.",
          "Our Events page lists the bhajan sandhya and satsang being held near you.",
        ],
      },
    ],
    verses: [],
    links: [{ href: "/events", label: "Upcoming bhajan sandhya and satsang" }],
  },
  {
    slug: "katha",
    title: "Barbarik Katha",
    hindi: "बर्बरीक की कथा",
    icon: "katha",
    blurb: "The story of Barbarik, who became Baba Shyam.",
    sections: [
      {
        heading: "Who was Barbarik?",
        body: [
          "Barbarik was the son of Ghatotkacha and the grandson of Bhima, one of the Pandavas. From childhood he was a great warrior, and he held three unfailing arrows.",
          "He had made a promise to his mother: he would always stand with the side that was losing.",
        ],
      },
      {
        heading: "The gift of his head",
        body: [
          "Before the war of Kurukshetra, Lord Krishna tested him and asked for a charity: his head. Barbarik gave it without a moment's doubt, asking only that he might see the war with his own eyes.",
          "His head was placed on a hill from where he watched the whole battle.",
        ],
      },
      {
        heading: "Why he is worshipped as Shyam",
        body: [
          "Pleased by this sacrifice, Lord Krishna blessed him: in the age of Kali he would be worshipped by Krishna's own name, Shyam, and would be the support of those who have lost hope. That is why Baba Shyam is called Haare Ka Sahara, the strength of the one who has lost.",
        ],
      },
    ],
    links: [{ href: "/baba-shyam", label: "Read more about Baba Shyam" }],
  },
  {
    slug: "mela",
    title: "Falgun Mela",
    hindi: "फाल्गुन मेला",
    icon: "mela",
    blurb: "The great annual fair at Khatushyamji.",
    sections: [
      {
        heading: "When it is held",
        body: [
          "The Falgun Mela is held every year in the month of Phalguna (February to March), and its main days are around Phalguna Shukla Ekadashi and Dwadashi.",
          "The dates follow the lunar calendar, so they move every year. The Shri Shyam Mandir Committee announces them.",
        ],
      },
      {
        heading: "What happens",
        body: [
          "Devotees from all over India walk to Khatushyamji carrying nishan, the flags offered to Baba Shyam, singing bhajans on the way. Langars and rest points are set up along the roads.",
          "Millions visit during the Mela, so the queues are long and the temple timings can change.",
        ],
      },
      {
        heading: "Before you go",
        body: [
          "Check the committee's official announcements for dates, darshan arrangements and any change in timings. Plan your stay early; the dharamshalas fill up first.",
        ],
      },
    ],
    links: [
      { href: "/dharamshala", label: "Find a dharamshala" },
      { href: "/events", label: "Upcoming events" },
      { href: "https://www.shrishyammandir.com/", label: "Shri Shyam Mandir Committee (official site)", external: true },
    ],
  },
  {
    slug: "yatra",
    title: "Khatushyamji Yatra",
    hindi: "यात्रा",
    icon: "yatra",
    blurb: "How to reach Khatushyamji, and what to plan before you go.",
    sections: [
      {
        heading: "Where it is",
        body: ["Shri Shyam Mandir is in Khatushyamji, in the Sikar district of Rajasthan."],
      },
      {
        heading: "How to reach",
        body: [
          "By road: Khatushyamji is about 80 km from Jaipur and about 45 km from Sikar, with regular buses and taxis.",
          "By train: the nearest railway station is Ringas Junction, about 17 km away. Taxis and buses run from there to the temple.",
          "By air: the nearest airport is Jaipur. From there you can go by road.",
        ],
      },
      {
        heading: "Planning your visit",
        body: [
          "Aarti timings change between winter and summer. Check the Shyam Baba Darshan page before you plan your day.",
          "On Ekadashi and during the Falgun Mela the crowds are very large. Start early and keep your plans flexible.",
          "Book your stay in advance. Our directory lists dharamshalas near the temple.",
        ],
      },
    ],
    links: [
      { href: "/aarti/darshan", label: "Aarti timings" },
      { href: "/dharamshala", label: "Find a dharamshala" },
    ],
  },
];

export const findDevotion = (slug: string) => DEVOTION_ITEMS.find((item) => item.slug === slug);
