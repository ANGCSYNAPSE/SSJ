/**
 * THE REFERENCE for everything this site says about Baba Shyam and the Khatushyamji temple.
 *
 * Any fact about the deity, the temple, the history, the distances, the Falgun Mela or the aarti times should be written from
 * here (or from `darshan.ts`, which holds the aarti timetable as the temple committee publishes it), so that no two pages can
 * ever say different things. When a fact has to change, it changes here once.
 *
 * Where the sources differ (the story of Barbarik is folk and Puranic tradition, told in more than one way), the site writes only
 * what all the tellings share, and says "by tradition" for the rest.
 */

export interface Source {
  id: string;
  label: string;
  what: string;
  url: string;
}

/** What the facts below were taken from. They are listed on the About page, under "Sources". */
export const SOURCES: readonly Source[] = [
  {
    id: "committee",
    label: "Shri Shyam Mandir Committee, Khatushyamji",
    what: "The temple's own committee: the aarti timetable, the live darshan, notices and the Falgun Mela announcements.",
    url: "https://www.shrishyammandir.com/",
  },
  {
    id: "wiki-temple",
    label: "Khatu Shyam Temple (Wikipedia)",
    what: "The history of the temple, Shyam Kund, the Nishan Yatra and the Falgun Mela.",
    url: "https://en.wikipedia.org/wiki/Khatu_Shyam_Temple",
  },
  {
    id: "wiki-barbarika",
    label: "Barbarika (Wikipedia)",
    what: "Who Barbarik was: his parents, the three arrows, and the fact that his story is folk tradition, not part of the Mahabharata text itself.",
    url: "https://en.wikipedia.org/wiki/Barbarika",
  },
  {
    id: "utsav",
    label: "Utsav, Ministry of Culture, Government of India",
    what: "A short account of Shri Shyam Mandir, Khatushyamji.",
    url: "https://utsav.gov.in/view-darshan/shri-shyam-mandir-khatushyamji-1",
  },
];

export const KHATU = {
  /** Names and places */
  templeName: "Shri Shyam Mandir",
  place: "Khatushyamji, Sikar district, Rajasthan",
  village: "Khatu",
  district: "Sikar",
  state: "Rajasthan",

  /** Who Baba Shyam is, in the tradition */
  deity: {
    birthName: "Barbarik (also spelled Barbareek or Barbarika)",
    father: "Ghatotkacha",
    mother: "Maurvi (also called Morvi or Kamkantkata)",
    grandfather: "Bhima, one of the five Pandavas",
    /** The committee greets Baba Shyam as "Morvinandan": the son of Morvi. */
    committeeGreeting: "Jai Shri Morvinandan, Jai Shri Khatu Shyamji",
    blessing: "Lord Krishna blessed him that in Kalyug he would be worshipped by Krishna's own name, Shyam.",
    titles: ["Shyam Baba", "Haare Ka Sahara (the strength of the one who has lost)", "Shishdani (the one who gave his head)"],
  },

  /** The temple's history. Dates here are by tradition. */
  history: {
    firstTempleYear: 1027,
    firstTempleBy: "King Roop Singh Chauhan, who was guided in a dream to the place where the head lay buried at what is now Shyam Kund",
    rebuiltYear: 1720,
    rebuiltNote: "The present temple, built in white marble in the Rajasthani style, is said to have been rebuilt in 1720 CE (Vikram Samvat 1777).",
    note: "These dates come from tradition and are not confirmed by archaeology, so the site always says \"by tradition\".",
  },

  /** How far it is, in kilometres (rounded) */
  distances: { jaipur: 80, sikar: 45, ringas: 17 },
  nearest: { railway: "Ringas Junction", airport: "Jaipur" },

  /** The Falgun Mela */
  mela: {
    month: "Phalguna (February to March)",
    mainDays: "around Phalguna Shukla Ekadashi and Dwadashi",
    note: "The dates follow the lunar calendar, so they move every year. The committee announces them a few weeks before.",
    nishanYatra: "Devotees walk about 17 km from Ringas (Reengus) to the temple carrying nishan, the saffron flags offered to Baba Shyam.",
    year2026: "21 to 28 February 2026",
  },

  /** The five aartis of every day. Their times are in darshan.ts (AARTI_TIMES). */
  aartiCount: 5,

  /** What we do NOT claim: the committee does not publish visitor counts, so the site says "millions" and no more. */
  visitors: "Millions of devotees every year, most of them around the Falgun Mela",
} as const;

/** One small line, for the foot of a section: where the details above it come from. */
export const SOURCE_LINE = "Details about Baba Shyam and Khatushyamji follow the Shri Shyam Mandir Committee and the public sources listed on our About page.";
