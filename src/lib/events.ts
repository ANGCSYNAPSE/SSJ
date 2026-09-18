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

export const EVENTS: EventDetail[] = [
  {
    slug: "khatu-shyam-phalgun-mela-2026",
    day: "24",
    month: "MAR",
    tag: "TEMPLE FESTIVAL",
    image: "/images/events/phalgun-mela.png",
    heroImage: "/images/events/detail/phalgun-mela-hero.png",
    title: "Khatu Shyam Phalgun Mela 2026",
    organizer: "Shree Shyam Mandir Committee",
    location: "Khatu Dham, Sikar, Rajasthan",
    time: "04:00 AM onwards",
    dateRange: "March 18 - 24, 2026",
    entryPass: "Free (Registration Mandatory)",
    about: [
      "The annual Phalgun Mela of Khatu Shyam Ji is one of India's most vibrant and sacred devotional congregations, drawing millions of bhakts (devotees) from all corners of the globe. Celebrated in the holy month of Phalguna (typically February/March), the mela represents the ultimate surrender to Baba Shyam, who is worshipped as the supreme protector of Dharma in Kaliyuga.",
      'During this week-long event, the atmosphere in Khatu Dham is filled with continuous divine chants of "Jai Shree Shyam." The main highlight is the Nishan Yatra, where pilgrims complete a barefoot march carrying sacred flags, offering them at the temple feet to symbolize victory of good over evil.',
    ],
    timelineTitle: "Mela Program Schedule",
    timeline: [
      {
        dayLabel: "Day 1",
        date: "18 MAR",
        title: "Pratham Shringaar & Dhwaj Aarohan",
        desc: "The commencement of the divine mela. Sacred flag hoisting ceremony at Khatu Dham entrance gate accompanied by Vedic hymns, blowing of conchs, and mass devotional prayers.",
        icon: "star",
      },
      {
        dayLabel: "Day 3",
        date: "20 MAR",
        title: "Nishan Yatra Procession Begins",
        desc: "Devotees start their foot march (padyatra) from Ringas to Khatu temple carrying sacred saffron colored Nishan flags to present to Baba Shyam.",
        icon: "arrow-right",
      },
      {
        dayLabel: "Day 5",
        date: "22 MAR",
        title: "Grand Bhajan Sandhya by Eminent Artists",
        desc: "A massive overnight devotional music program featuring prominent spiritual singers chanting soulful bhajans, creating an atmosphere of sheer divine ecstasy.",
        icon: "music",
      },
      {
        dayLabel: "Day 7",
        date: "24 MAR",
        title: "Mahaprasad & Bhandara Seva",
        desc: "The conclusion of the grand Phalguna celebration. Distribution of sacred prasad and food offerings (bhandara) serving lakhs of pilgrims with love and humbleness.",
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
    slug: "nayan-shringaar-bhajan-sandhya",
    day: "02",
    month: "APR",
    tag: "MUSIC & BHAJAN",
    image: "/images/events/bhajan-sandhya.png",
    heroImage: "/images/events/bhajan-sandhya.png",
    title: "Devotional Nayan Shringaar & Bhajan Sandhya",
    organizer: "Shyam Jagat Seva Samiti",
    location: "Birla Auditorium, Jaipur",
    time: "06:30 PM - 10:30 PM",
    dateRange: "April 2, 2026",
    entryPass: "Free (Registration Mandatory)",
    about: [
      "Immerse yourself in an evening of soulful devotion at the Nayan Shringaar & Bhajan Sandhya, where Baba Shyam's divine form is adorned in a breathtaking eye-catching shringaar before thousands of gathered devotees.",
      "Renowned bhajan artists take the stage through the night, leading the congregation through waves of kirtan and Jai Shree Shyam chants, culminating in a grand aarti and prasad distribution for every attendee.",
    ],
    timelineTitle: "Evening Program Schedule",
    timeline: [
      {
        dayLabel: "6:30 PM",
        date: "OPEN",
        title: "Devotee Arrival & Nayan Shringaar Darshan",
        desc: "Gates open for devotees to take darshan of Baba Shyam's specially adorned Nayan Shringaar before the evening program begins.",
        icon: "star",
      },
      {
        dayLabel: "7:30 PM",
        date: "BHAJAN",
        title: "Opening Kirtan & Invocation",
        desc: "Resident singers open the evening with invocation bhajans, setting the devotional tone for the night ahead.",
        icon: "music",
      },
      {
        dayLabel: "8:30 PM",
        date: "MAIN",
        title: "Grand Bhajan Sandhya by Guest Artists",
        desc: "Eminent devotional singers take the stage for a soul-stirring set of bhajans and kirtans, joined by the full congregation.",
        icon: "arrow-right",
      },
      {
        dayLabel: "10:00 PM",
        date: "AARTI",
        title: "Maha Aarti & Prasad Vitran",
        desc: "The evening closes with a grand collective aarti followed by prasad distribution to every devotee present.",
        icon: "heart",
      },
    ],
    gallery: [
      "/images/events/bhajan-sandhya.png",
      "/images/events/kolkata-bhajan.png",
      "/images/events/phalgun-mela.png",
      "/images/events/deepawali.png",
    ],
  },
  {
    slug: "annadan-seva-drive-satsang",
    day: "12",
    month: "APR",
    tag: "SEVA & CHARITY",
    image: "/images/events/annadan-seva.png",
    heroImage: "/images/events/annadan-seva.png",
    title: "Grand Annadan Seva Drive & Satsang",
    organizer: "Dharma Seva Foundation",
    location: "Shyam Nagar Community Hall, Jaipur",
    time: "11:00 AM - 04:00 PM",
    dateRange: "April 12, 2026",
    entryPass: "Free (Open for All Volunteers & Devotees)",
    about: [
      "The Grand Annadan Seva Drive brings together hundreds of volunteers and devotees to prepare and distribute wholesome meals to underprivileged families, elders, and pilgrims — an act of seva rooted in the belief that feeding the hungry is among the highest forms of devotion.",
      "The day combines hands-on community service with a closing satsang, giving every participant the chance to serve selflessly and then sit together in shared prayer and reflection under the grace of Baba Shyam.",
    ],
    timelineTitle: "Seva Day Schedule",
    timeline: [
      {
        dayLabel: "11:00 AM",
        date: "START",
        title: "Opening Prayers & Volunteer Briefing",
        desc: "The day begins with a short prayer for the success of the seva, followed by a briefing for all registered volunteers.",
        icon: "star",
      },
      {
        dayLabel: "12:00 PM",
        date: "SEVA",
        title: "Food Packet Assembly",
        desc: "Volunteers work in teams to prepare and pack fresh meals for distribution across the city's underserved neighborhoods.",
        icon: "heart",
      },
      {
        dayLabel: "1:30 PM",
        date: "DRIVE",
        title: "Community Distribution Drive",
        desc: "Teams fan out to distribute meals directly to families, elders, and pilgrims across designated distribution points.",
        icon: "arrow-right",
      },
      {
        dayLabel: "3:30 PM",
        date: "CLOSE",
        title: "Closing Satsang",
        desc: "Volunteers and beneficiaries gather for a closing satsang of bhajans and gratitude before the drive concludes.",
        icon: "music",
      },
    ],
    gallery: [
      "/images/events/annadan-seva.png",
      "/images/events/winter-blanket.png",
      "/images/events/gauseva.png",
      "/images/events/deepawali.png",
    ],
  },
];

export function getEventBySlug(slug: string): EventDetail | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

export function getRelatedEvents(slug: string): EventDetail[] {
  return EVENTS.filter((e) => e.slug !== slug);
}
