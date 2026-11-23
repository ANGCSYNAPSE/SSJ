/**
 * The seva Shyam Jagat works towards. Each one has a card (with its picture), and a short dialog that opens on a click and
 * says, in plain words, what we aim to do.
 *
 * The wording is deliberate: these are aims, not guarantees. Services begin place by place, as volunteers, donations and
 * local permissions allow, so nothing here says that a service is available everywhere, or that it will always be.
 */
export interface Initiative {
  slug: string;
  /** Small label on the card. */
  tag: string;
  title: string;
  hindi: string;
  /** One line for the card. */
  desc: string;
  /** What the dialog opens with. */
  intro: string;
  /** "What we aim to do". */
  aims: string[];
  /** The pictures of this service; the first is the cover. */
  images: string[];
  /** Where the card crops a square picture (CSS object-position). The default is the centre. */
  focus?: string;
}

const img = (slug: string, count = 1) => Array.from({ length: count }, (_, i) => `/images/initiatives/seva/${slug}-${i + 1}.jpg`);

export const INITIATIVES: Initiative[] = [
  {
    slug: "annadan",
    tag: "FOOD SEVA",
    title: "Annadan (Food Seva)",
    hindi: "अन्नदान",
    desc: "Sharing simple, warm meals with people who need them.",
    intro: "Annadan, the gift of food, is the heart of seva. We aim to share meals with people who often go without them, with care and respect.",
    aims: [
      "Hold meal-sharing drives (bhandara) at temples, during festivals and in neighbourhoods where people need food.",
      "Cook and serve simple food with attention to cleanliness.",
      "Work with volunteers, donors and local kitchens, and start with what we can serve well.",
    ],
    images: img("annadan"),
  },
  {
    slug: "rain-basera",
    tag: "SHELTER",
    title: "Rain Basera (Night Shelter)",
    hindi: "रैन बसेरा",
    desc: "A safe place to rest on cold and rainy nights.",
    intro: "People without a home are the most exposed on cold, wet nights. We aim to help provide a safe place to rest, with dignity.",
    aims: [
      "Work towards temporary night shelter with clean bedding and basic facilities for people who have nowhere to stay.",
      "Work together with local bodies and partners where possible.",
      "Help people find food and information about other support nearby.",
    ],
    images: img("rain-basera"),
  },
  {
    slug: "pani-ki-pyau",
    tag: "WATER SEVA",
    title: "Pani Ki Pyau",
    hindi: "पानी की प्याऊ",
    desc: "Clean drinking water for travellers and neighbourhoods.",
    intro: "Offering water to a thirsty person is among the oldest forms of seva. We aim to help set up and look after water points for everyone.",
    aims: [
      "Support clean drinking-water points (pyau) near temples, markets and busy routes, especially in the hot months.",
      "Keep them clean and looked after with the help of volunteers.",
      "Begin with a few places and add more as support grows.",
    ],
    images: img("pani-ki-pyau", 2),
  },
  {
    slug: "ambulance",
    tag: "EMERGENCY",
    title: "Ambulance Seva",
    hindi: "एम्बुलेंस सेवा",
    desc: "Help in reaching care quickly when it matters most.",
    intro: "In an emergency, minutes matter, and not every family can arrange transport. We aim to help people reach care without delay.",
    aims: [
      "Work with ambulance services and hospitals to help people in need reach care.",
      "Keep a list of emergency contacts, and share it with the community.",
      "Over time, look at supporting an ambulance service of our own, as resources allow.",
    ],
    images: img("ambulance"),
  },
  {
    slug: "gaushala",
    tag: "GAUSHALA",
    title: "Gaushala Seva",
    hindi: "गौशाला",
    desc: "Care for abandoned and injured cows.",
    intro: "Caring for cows is part of our tradition of seva. We aim to support their shelter, food and basic care.",
    aims: [
      "Support gaushalas with fodder, shelter and medical care for cows that have been abandoned or injured.",
      "Work with existing gaushalas and with volunteers who want to help.",
      "Encourage the community to take part in this seva.",
    ],
    images: img("gaushala"),
  },
  {
    slug: "education",
    tag: "EDUCATION",
    title: "Education Support",
    hindi: "शिक्षा सहयोग",
    desc: "Helping children stay in school and enjoy learning.",
    intro: "Every child deserves a chance to learn. We aim to help children with what stands between them and the classroom.",
    aims: [
      "Support children with books, school supplies and learning activities.",
      "Look at scholarships and mentoring where funds and volunteers allow.",
      "Work with schools and teachers who share the same goal.",
    ],
    images: img("education"),
  },
  {
    slug: "health",
    tag: "HEALTH",
    title: "Health Care Seva",
    hindi: "स्वास्थ्य सेवा",
    desc: "Health check-up camps and help in reaching care.",
    intro: "Good health care should not depend on what a family can pay. We aim to bring simple health services closer to people.",
    aims: [
      "Organise health check-up, eye and blood-donation camps together with doctors and partner hospitals.",
      "Help people find the right hospital or clinic and understand their options.",
      "As our resources grow, look at supporting affordable care with hospitals and clinics.",
    ],
    images: img("health"),
  },
  {
    slug: "dharamshala",
    tag: "STAY",
    title: "Dharamshala Seva",
    hindi: "धर्मशाला सेवा",
    desc: "Simple places to stay for pilgrims and travelling families.",
    intro: "Pilgrims and families travelling for treatment or darshan often need a simple place to rest. We aim to make it easier to find one.",
    aims: [
      "Help people find dharamshalas and low-cost places to stay near temples, through our Dharamshala directory.",
      "Support dharamshalas that want to join the directory and serve travellers well.",
      "Work towards more places to stay, as support allows.",
    ],
    images: img("dharamshala"),
  },
  {
    slug: "vriddhashram",
    tag: "CARE",
    title: "Vriddhashram (Elders' Care)",
    hindi: "वृद्धाश्रम",
    desc: "Care, company and respect for our elders.",
    intro: "Elders deserve comfort, company and respect. We aim to support their care and make sure they feel they belong.",
    aims: [
      "Support homes for elders with meals, health check-ups and everyday needs.",
      "Spend time with elders: visits, festivals and company.",
      "Begin with visits and support to existing homes, and build from there.",
    ],
    images: img("vriddhashram"),
  },
  {
    slug: "juta-seva",
    tag: "SEVA",
    title: "Juta Seva Kendra",
    hindi: "जूता सेवा केंद्र",
    desc: "Footwear and simple repair for those who need it.",
    intro: "A pair of footwear is a small thing that can mean a lot, especially for people who walk long distances. We aim to offer this seva with respect.",
    aims: [
      "Help people who cannot afford footwear to receive a pair.",
      "Offer simple repair and care for footwear near temples and busy places.",
      "Work with volunteers and donors, and keep the seva simple and dignified.",
    ],
    images: ["/images/initiatives/seva/juta-seva-1.jpg", "/images/initiatives/seva/juta-seva-2.jpg", "/images/initiatives/seva/juta-seva-3.jpg"],
  },
  {
    slug: "shauchalay",
    tag: "SANITATION",
    title: "Swachh Shauchalay",
    hindi: "स्वच्छ शौचालय",
    desc: "Clean, accessible public toilets for everyone.",
    intro: "Clean public toilets are a basic need, and a matter of dignity. We aim to help keep them clean and open to all.",
    aims: [
      "Support clean, accessible public toilets near temples, markets and public places, including for people with disabilities.",
      "Help with cleaning and upkeep through volunteers and partners.",
      "Encourage everyone to keep shared places clean.",
    ],
    images: img("shauchalay"),
    focus: "center 55%",
  },
  {
    slug: "swachh-vahini",
    tag: "SWACHH VAHINI",
    title: "Swachh Vahini",
    hindi: "स्वच्छ वाहिनी",
    desc: "Community clean-up drives for a cleaner, healthier neighbourhood.",
    intro: "A clean neighbourhood is healthier for everyone. We aim to bring volunteers together to look after the places we share.",
    aims: [
      "Organise clean-up drives in streets, markets and around temples with volunteers.",
      "Spread awareness about cleanliness, hygiene and caring for the environment.",
      "Plan tree plantation and other simple community actions.",
    ],
    images: img("swachh-vahini"),
  },
];


/**
 * Services we hope to start but do not offer yet. They are listed as "Coming soon" and open no dialog, so no one reads them
 * as something already available.
 */
export const COMING_SOON: { title: string; hindi: string; desc: string }[] = [
  { title: "Marriage Bureau", hindi: "विवाह सेवा", desc: "A trusted, values-based way for families to find a match." },
  { title: "Employment Portal", hindi: "रोज़गार सहायता", desc: "Guidance and openings for people looking for work." },
  { title: "Women Empowerment", hindi: "महिला सशक्तिकरण", desc: "Skill-building and support for women's independence." },
  { title: "Disaster Relief", hindi: "आपदा राहत", desc: "Help for families affected by floods, fires and other disasters." },
  { title: "Temple Support", hindi: "मंदिर सहयोग", desc: "Helping temples with volunteers and everyday needs." },
  { title: "Spiritual Learning", hindi: "आध्यात्मिक शिक्षा", desc: "Satsang and learning that keep our culture alive." },
];

/** Shown in every dialog: what these descriptions are, and are not. */
export const INITIATIVE_NOTE =
  "These are our aims. Each service begins place by place, as volunteers, donations and local permissions allow, and it may not be available everywhere yet. Where and when a service starts will be shared on this website.";
