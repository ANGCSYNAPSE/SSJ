export type TimelineIcon = "star" | "arrow-right" | "music" | "heart";

export type TimelineItem = {
  dayLabel: string;
  date: string;
  title: string;
  desc: string;
  icon: TimelineIcon;
};

export type EventListItem = {
  slug: string;
  day: string;
  month: string;
  tag: string;
  image: string;
  title: string;
  organizer: string;
  location: string;
  time: string;
};

export type EventDetail = EventListItem & {
  heroImage: string;
  dateRange: string;
  entryPass: string;
  about: string[];
  timelineTitle: string;
  timeline: TimelineItem[];
  gallery: string[];
};

/**
 * The observances that come round again and again, in the life of a devotee of Baba Shyam. They are the same every year (or every
 * fortnight), so nothing here is a made-up date: where a date follows the lunar calendar, it says so and points to the temple
 * committee. The facts come from the reference in lib/data/khatuReference.ts. Events that groups or temples list themselves
 * will be added next to these.
 */
export const EVENTS: EventDetail[] = [
  {
    slug: "khatu-shyam-falgun-mela",
    day: "Feb–Mar",
    month: "Every year",
    tag: "ANNUAL FAIR",
    image: "/images/events/phalgun-mela.png",
    heroImage: "/images/events/detail/phalgun-mela-hero.png",
    title: "Khatu Shyam Falgun Mela",
    organizer: "Shri Shyam Mandir Committee",
    location: "Khatushyamji, Sikar, Rajasthan",
    time: "Darshan timings can change during the Mela",
    dateRange: "Every Phalguna (February–March). 2026: 21–28 February",
    entryPass: "Free, no pass needed",
    about: [
      "The Falgun Mela is the great annual fair of Khatushyamji. It is held in the month of Phalguna (February to March), and its main days are around Phalguna Shukla Ekadashi and Dwadashi. Millions of devotees come to the temple, from every part of India.",
      "The dates follow the lunar calendar, so they move every year. The Shri Shyam Mandir Committee announces them a few weeks before. If you plan to go, check the committee's notice, and book your stay early.",
    ],
    timelineTitle: "What happens at the Mela",
    timeline: [
      {
        dayLabel: "On the road",
        date: "Nishan Yatra",
        title: "The walk to the temple",
        desc: "Devotees walk about 17 km from Ringas (Reengus) to Khatushyamji carrying nishan, the saffron flags offered to Baba Shyam, singing bhajans on the way.",
        icon: "arrow-right",
      },
      {
        dayLabel: "At the temple",
        date: "Main days",
        title: "Around Ekadashi and Dwadashi",
        desc: "Lakhs of devotees reach the temple on the main days. The queues are long, so start early and keep your plans flexible.",
        icon: "star",
      },
      {
        dayLabel: "Temple top",
        date: "Falgun Shukla",
        title: "The flag of Surajgarh",
        desc: "A white flag from Surajgarh, carried on foot over about 152 km, is hoisted on the temple every year during the Mela.",
        icon: "star",
      },
      {
        dayLabel: "All along",
        date: "Seva",
        title: "Langars and rest points",
        desc: "Free meals (langar) and rest points for pilgrims are set up along the roads and around the temple, run by volunteers and devotees.",
        icon: "heart",
      },
    ],
    gallery: [
      "/images/events/detail/gallery-1.png",
      "/images/events/detail/gallery-2.png",
      "/images/events/detail/gallery-3.png",
      "/images/events/detail/gallery-4.png",
    ],
  },
  {
    slug: "baba-shyam-janmotsav",
    day: "Kartik",
    month: "Shukla Ekadashi",
    tag: "ANNUAL FESTIVAL",
    image: "/images/events/deepawali.png",
    heroImage: "/images/events/deepawali.png",
    title: "Baba Shyam Janmotsav",
    organizer: "Shri Shyam Mandir Committee",
    location: "Khatushyamji, and Shyam mandirs everywhere",
    time: "Through the day, with bhajan and kirtan",
    dateRange: "Kartik Shukla Ekadashi, usually in November. 2026: 20–21 November",
    entryPass: "Free, no pass needed",
    about: [
      "Devotees keep Baba Shyam's birthday, also called Prakatya Diwas, on Kartik Shukla Ekadashi. This is the same day as Dev Uthani Ekadashi, which ends Chaturmas, the four months when Lord Vishnu is said to sleep.",
      "It is a different festival from the Falgun Mela, which is held in Phalguna. On the Janmotsav the temple is decorated with flowers, and devotees sing bhajans and kirtan, read the Ramcharitmanas and give food in seva. Because the tithi can begin on one day and end on the next, the day kept can differ by a day in different places.",
    ],
    timelineTitle: "How devotees keep the day",
    timeline: [
      {
        dayLabel: "The day",
        date: "Ekadashi",
        title: "Dev Uthani Ekadashi",
        desc: "The day Chaturmas ends, and the day Baba Shyam's birthday is kept. Devotees fast and pray.",
        icon: "star",
      },
      {
        dayLabel: "At the temple",
        date: "Shringar",
        title: "A temple dressed in flowers",
        desc: "The temple at Khatushyamji is decorated with flowers, and devotees come for darshan from early morning.",
        icon: "star",
      },
      {
        dayLabel: "Through the day",
        date: "Bhajan",
        title: "Bhajan, kirtan and path",
        desc: "Satsang groups sing bhajans and kirtan for Baba Shyam, and read the Ramcharitmanas.",
        icon: "music",
      },
      {
        dayLabel: "In seva",
        date: "Annadan",
        title: "Food as seva",
        desc: "Many devotees offer food (bhoj) as seva on this day.",
        icon: "heart",
      },
    ],
    gallery: [
      "/images/events/detail/gallery-1.png",
      "/images/events/detail/gallery-2.png",
      "/images/events/detail/gallery-3.png",
      "/images/events/detail/gallery-4.png",
    ],
  },
  {
    slug: "ekadashi-darshan",
    day: "Ekadashi",
    month: "Twice a month",
    tag: "EVERY FORTNIGHT",
    image: "/images/events/bhajan-sandhya.png",
    heroImage: "/images/events/bhajan-sandhya.png",
    title: "Ekadashi, the day of Baba Shyam",
    organizer: "Shri Shyam Mandir Committee, and satsang groups",
    location: "Khatushyamji, and Shyam mandirs everywhere",
    time: "Darshan follows the aarti timetable",
    dateRange: "Every Ekadashi: the 11th day of each lunar fortnight, twice a month",
    entryPass: "Free, no pass needed",
    about: [
      "Ekadashi is the eleventh day of each lunar fortnight, so it comes twice a month. For devotees of Baba Shyam it is a special day: they fast, pray, and many travel to Khatushyamji for darshan. The crowds at the temple are very large on Ekadashi, so start early and keep your plans flexible.",
      "Satsang groups and mandals in many cities hold bhajan and jagran on this day. The dates follow the lunar calendar, so check the panchang or the temple committee's notice each month.",
    ],
    timelineTitle: "How devotees keep Ekadashi",
    timeline: [
      {
        dayLabel: "Ekadashi",
        date: "Vrat",
        title: "Fast and prayer",
        desc: "Many devotees keep a fast and spend the day in prayer and remembrance of Baba Shyam.",
        icon: "star",
      },
      {
        dayLabel: "At the temple",
        date: "Darshan",
        title: "Darshan at Khatushyamji",
        desc: "Devotees come from near and far for darshan. The aartis follow the temple's winter or summer timetable.",
        icon: "arrow-right",
      },
      {
        dayLabel: "Evening",
        date: "Jagran",
        title: "Bhajan and jagran",
        desc: "Satsang groups sing bhajans for Baba Shyam, some through the night.",
        icon: "music",
      },
      {
        dayLabel: "Dwadashi",
        date: "Parana",
        title: "Breaking the fast",
        desc: "The fast is traditionally broken the next morning, on Dwadashi, with prayer and a simple meal.",
        icon: "heart",
      },
    ],
    gallery: [
      "/images/events/detail/gallery-1.png",
      "/images/events/detail/gallery-2.png",
      "/images/events/detail/gallery-3.png",
      "/images/events/detail/gallery-4.png",
    ],
  },
];

export function getEventBySlug(slug: string): EventDetail | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

export function getRelatedEvents(slug: string): EventDetail[] {
  return EVENTS.filter((e) => e.slug !== slug);
}
