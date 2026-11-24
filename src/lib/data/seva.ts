import type { SevaIcon } from "@/components/seva/DharmaIcons";

/**
 * "Give Seva": the ways a devotee can give, by their own choice. Each seva has its own colour and a gold line-drawn symbol (drawn by
 * SevaArt, so these cards never repeat the photographs used on the initiatives pages), a short line on what the gift goes towards, and a few suggested offerings.
 *
 * About the wording and the amounts:
 *  - The amounts are auspicious round figures (₹101, ₹501, ₹1,100 ...), the way people give in a temple. They are only
 *    suggestions; every seva also takes any amount the devotee writes in.
 *  - The line under each amount says what it goes TOWARDS. It is not a promise of an exact result, because the real cost
 *    of a meal, a day of fodder or a pair of chappals changes with place and season. The note on the page says so.
 *  - Put the real, current costs here once the team has them, and the page picks them up.
 */
export interface SevaOffering {
  amount: number;
  /** The words under the amount: what it goes towards. */
  label: string;
}

export interface SevaType {
  slug: string;
  /** Used as the "cause" of the donation, so receipts and reports say what it was for. */
  title: string;
  hindi: string;
  /** One line on the card. */
  tagline: string;
  /** A sentence or two in the offering step. */
  about: string;
  /** The line-drawn symbol of this seva (see DharmaIcons). */
  icon: SevaIcon;
  /** The seva's own colours: [light, deep]. */
  tone: [string, string];
  /** The one seva that is not like the others (“Seva of My Choice”): drawn light, with dark text, so it stands apart. */
  special?: boolean;
  offerings: SevaOffering[];
}

export const SEVA_TYPES: SevaType[] = [
  {
    slug: "annadan",
    icon: "thali",
    title: "Annadan Seva",
    hindi: "अन्नदान",
    tagline: "A warm meal, shared with respect.",
    about: "Your seva goes towards cooking and sharing simple, clean meals at bhandaras, temples and places where people go without food.",
    tone: ["#f59e3b", "#c2570c"],
    offerings: [
      { amount: 501, label: "Towards meals for a small group" },
      { amount: 1100, label: "Towards a day of meal-sharing" },
      { amount: 2100, label: "Towards a larger bhandara" },
      { amount: 5100, label: "Towards a festival bhandara" },
    ],
  },
  {
    slug: "gaushala",
    icon: "cow",
    title: "Gau Seva",
    hindi: "गौ सेवा",
    tagline: "Fodder and care for cows.",
    about: "Your seva goes towards fodder, clean water and basic care for cows in the gaushalas we work with.",
    tone: ["#6fbf5a", "#2f6f2a"],
    offerings: [
      { amount: 101, label: "Towards a day of fodder" },
      { amount: 501, label: "Towards fodder for a week" },
      { amount: 1100, label: "Towards fodder and care for a month" },
      { amount: 2100, label: "Towards a gaushala's larger need" },
    ],
  },
  {
    slug: "education",
    icon: "book",
    title: "Bal Vidya Seva (Children)",
    hindi: "बाल विद्या सेवा",
    tagline: "Books, uniforms and fees for children.",
    about: "Your seva goes towards what a child needs to keep learning: books, stationery, uniforms and school fees.",
    tone: ["#5aa2f0", "#1f4f9e"],
    offerings: [
      { amount: 251, label: "Towards books and stationery" },
      { amount: 1100, label: "Towards a school kit and uniform" },
      { amount: 2100, label: "Towards a child's fees for a term" },
      { amount: 5100, label: "Towards a child's learning for the year" },
    ],
  },
  {
    slug: "pani-ki-pyau",
    icon: "kalash",
    title: "Jal Seva (Pani Ki Pyau)",
    hindi: "जल सेवा",
    tagline: "Cool, clean water for every thirsty traveller.",
    about: "Your seva goes towards setting up and looking after drinking-water points, especially in the hot months.",
    tone: ["#38c2c7", "#0b6f78"],
    offerings: [
      { amount: 251, label: "Towards a water point's upkeep" },
      { amount: 501, label: "Towards clean water for a month" },
      { amount: 1100, label: "Towards matkas, cups and cleaning" },
      { amount: 2100, label: "Towards a new water point" },
    ],
  },
  {
    slug: "juta-seva",
    icon: "paduka",
    title: "Juta Seva (Footwear)",
    hindi: "जूता सेवा",
    tagline: "Footwear for feet that walk far.",
    about: "Your seva goes towards footwear for people who walk long distances, and towards looking after the footwear of devotees at the temple.",
    tone: ["#e07a8a", "#a02a43"],
    offerings: [
      { amount: 201, label: "Towards a pair of chappals" },
      { amount: 501, label: "Towards footwear for a few people" },
      { amount: 1100, label: "Towards footwear for a family" },
      { amount: 2100, label: "Towards a footwear drive" },
    ],
  },
  {
    slug: "health",
    icon: "health",
    title: "Health Care Seva",
    hindi: "स्वास्थ्य सेवा",
    tagline: "Basic medical help and medicines.",
    about: "Your seva goes towards health camps, basic check-ups and medicines for people who cannot easily afford them.",
    tone: ["#52c1a0", "#136f55"],
    offerings: [
      { amount: 251, label: "Towards basic medicines" },
      { amount: 1100, label: "Towards a person's check-up and medicines" },
      { amount: 2100, label: "Towards a health camp's needs" },
      { amount: 5100, label: "Towards a larger medical need" },
    ],
  },
  {
    slug: "ambulance",
    icon: "ambulance",
    title: "Ambulance Seva",
    hindi: "एम्बुलेंस सेवा",
    tagline: "Help that reaches people in an emergency.",
    about: "Your seva goes towards helping people in an emergency reach a hospital: fuel, upkeep and the people who drive.",
    tone: ["#ef6a5a", "#a52118"],
    offerings: [
      { amount: 501, label: "Towards fuel for a few trips" },
      { amount: 1100, label: "Towards a day of running" },
      { amount: 2100, label: "Towards upkeep and supplies" },
      { amount: 5100, label: "Towards a month of running" },
    ],
  },
  {
    slug: "vriddhashram",
    icon: "elder",
    title: "Vriddh Seva (Elders)",
    hindi: "वृद्ध सेवा",
    tagline: "Care and company for our elders.",
    about: "Your seva goes towards meals, medicines and a little comfort for elders who have no one to look after them.",
    tone: ["#b48be6", "#5c3a99"],
    offerings: [
      { amount: 501, label: "Towards an elder's meals and medicines" },
      { amount: 1100, label: "Towards a week of care" },
      { amount: 2100, label: "Towards warm clothes and bedding" },
      { amount: 5100, label: "Towards a month of care" },
    ],
  },
  {
    slug: "rain-basera",
    icon: "shelter",
    title: "Rain Basera Seva (Shelter)",
    hindi: "रैन बसेरा सेवा",
    tagline: "A safe place to rest on cold and rainy nights.",
    about: "Your seva goes towards bedding, blankets and upkeep of a night shelter for people who have nowhere to stay.",
    tone: ["#7d8fe0", "#2c3a8c"],
    offerings: [
      { amount: 301, label: "Towards a blanket" },
      { amount: 1100, label: "Towards bedding for a few people" },
      { amount: 2100, label: "Towards a shelter's winter needs" },
      { amount: 5100, label: "Towards a shelter's upkeep" },
    ],
  },
  {
    slug: "your-choice",
    special: true,
    icon: "diya",
    title: "Seva of My Choice",
    hindi: "अपनी इच्छा की सेवा",
    tagline: "Tell us what is in your heart.",
    about: "Give for something that is not listed. Write what you would like your seva to go towards, and our team will get in touch to see how it can be done.",
    tone: ["#f2b53f", "#9a5b00"],
    offerings: [
      { amount: 501, label: "A seva gift" },
      { amount: 1100, label: "A seva gift" },
      { amount: 2100, label: "A seva gift" },
      { amount: 5100, label: "A seva gift" },
    ],
  },
];

export const findSeva = (slug: string | null | undefined) => SEVA_TYPES.find((seva) => seva.slug === slug);

/** What the seva is being given for. */
export const OCCASIONS = [
  "No special occasion",
  "Birthday",
  "Wedding anniversary",
  "In memory of a loved one",
  "Thanksgiving (a wish fulfilled)",
  "Ekadashi",
  "A festival",
  "A new beginning",
] as const;

export const PAY_METHODS = [
  { key: "any", label: "All methods", note: "UPI, card, net banking, wallet" },
  { key: "upi", label: "UPI", note: "GPay, PhonePe, Paytm and more" },
  { key: "card", label: "Card", note: "Credit or debit card" },
  { key: "netbanking", label: "Net banking", note: "Your bank's website" },
  { key: "wallet", label: "Wallet", note: "Paytm, Mobikwik and more" },
] as const;

export type PayMethodKey = (typeof PAY_METHODS)[number]["key"];

/** Would the devotee like to be present, or take part? */
export const ATTEND_OPTIONS = [
  { key: "yes", label: "Yes, I would like to" },
  { key: "maybe", label: "Maybe, please tell me when" },
  { key: "no", label: "Not needed" },
] as const;

/** How the devotee would like to hear that the seva has been done. */
export const UPDATE_OPTIONS = [
  { key: "whatsapp", label: "WhatsApp" },
  { key: "call", label: "A phone call" },
  { key: "email", label: "Email" },
  { key: "none", label: "No need" },
] as const;

/**
 * For a devotee who cannot be there: how would they like to SEE their seva? A live video call needs a volunteer at the place,
 * a signal and a fixed time, so it is a request that the team confirms by phone; if it cannot be done on the day, the team sends
 * a short video or photos instead. The recorded options need nothing but a volunteer with a phone.
 */
export const WITNESS_OPTIONS = [
  { key: "none", label: "No need" },
  { key: "photos", label: "Photos" },
  { key: "video", label: "A short video afterwards" },
  { key: "live", label: "A live video call" },
] as const;

export const WITNESS_TIMES = [
  { key: "morning", label: "Morning" },
  { key: "afternoon", label: "Afternoon" },
  { key: "evening", label: "Evening" },
] as const;
