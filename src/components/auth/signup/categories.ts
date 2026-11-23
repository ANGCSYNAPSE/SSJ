import {
  Bed,
  Home,
  Music,
  Palette,
  Users,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import type { CategoryKey } from "@/lib/api";

/**
 * Every field of the six registration forms, grouped into steps. Option lists
 * and required fields mirror the backend validators
 * (SSJ_Backend/src/validators/profiles.validator.js); change one, change both.
 *
 * Name, mobile, email and password live in the first "account" step of every
 * category; `accountLabels` rename them to what that form calls them
 * (e.g. "Contact Person Name" for a temple).
 */
export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "multi"
  | "number"
  | "date"
  | "url"
  | "tel"
  | "checkbox"
  | "file"
  | "files";

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: string[];
  minLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  requiredMessage?: string;
  /** Sits beside the next half-width field. */
  half?: boolean;
  /** For file fields: allowed MIME types and, for "files", how many. */
  accept?: string[];
  maxFiles?: number;
  /** Checked on the form but never sent (declarations, terms). */
  local?: boolean;
}

export interface Step {
  title: string;
  blurb?: string;
  fields: Field[];
}

export interface AccountLabels {
  name: string;
  namePlaceholder: string;
  mobile: string;
  email: string;
}

export interface Category {
  key: CategoryKey;
  label: string;
  blurb: string;
  icon: LucideIcon;
  accountLabels: AccountLabels;
  /** Profile keys filled from the account step instead of asked again. */
  fromAccount: Record<string, "fullName" | "mobile" | "email">;
  steps: Step[];
}

export const MAX_FILE_MB = 4;

const IMAGES = ["image/jpeg", "image/png", "image/webp"];
const DOCUMENTS = [...IMAGES, "application/pdf"];
const DOCUMENTS_WORD = [
  ...DOCUMENTS,
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const WORK_MEDIA = [...IMAGES, "video/mp4", "video/webm", "audio/mpeg", "audio/wav", "audio/mp4"];

export const STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const state = (extra: Partial<Field> = {}): Field => ({
  key: "state", label: "State", type: "select", required: true, options: STATES, half: true, ...extra,
});

const declaration = (label: string): Field => ({
  key: "declaration", label, type: "checkbox", required: true, local: true,
  requiredMessage: "Please tick the declaration to continue.",
});

/** Artists, dancers and musicians share one form; only the wording differs. */
function performer(o: {
  specialtyLabel: string;
  specialties: string[];
  secondaryLabel: string;
  guruLabel: string;
  bioLabel: string;
  bioPlaceholder: string;
  craftTitle: string;
}): Pick<Category, "steps" | "accountLabels" | "fromAccount"> {
  return {
    accountLabels: {
      name: "Full Name",
      namePlaceholder: "Enter your full name",
      mobile: "Phone Number",
      email: "Email Address",
    },
    fromAccount: {},
    steps: [
      {
        title: "Personal Information",
        fields: [
          { key: "dateOfBirth", label: "Date of Birth", type: "date", required: true, half: true },
          {
            key: "gender", label: "Gender", type: "select", required: true, half: true,
            options: ["Male", "Female", "Other", "Prefer Not to Say"],
          },
          { key: "city", label: "City", type: "text", required: true, placeholder: "Your city of residence", half: true },
          state(),
          {
            key: "profilePhoto", label: "Profile Photo", type: "file", required: true,
            accept: IMAGES, hint: "JPG or PNG",
            requiredMessage: "Please add a profile photo.",
          },
        ],
      },
      {
        title: o.craftTitle,
        fields: [
          { key: "primarySpecialty", label: o.specialtyLabel, type: "select", required: true, options: o.specialties },
          { key: "secondarySpecialty", label: o.secondaryLabel, type: "select", options: o.specialties },
          {
            key: "experience", label: "Years of Experience", type: "select", required: true,
            options: ["0-1 Years", "1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"],
          },
          { key: "guruName", label: o.guruLabel, type: "text", placeholder: "Name of your Guru or Academy" },
          {
            key: "bio", label: o.bioLabel, type: "textarea", required: true, minLength: 20,
            placeholder: o.bioPlaceholder,
          },
          { key: "portfolioLink", label: "Portfolio Link (YouTube, Instagram or Website)", type: "url", placeholder: "https://youtube.com/yourchannel" },
          {
            key: "workFiles", label: "Upload Your Work", type: "files", accept: WORK_MEDIA, maxFiles: 5,
            hint: "JPG, PNG, MP4 or MP3 · up to 5 files",
          },
        ],
      },
      {
        title: "Availability & Preferences",
        fields: [
          {
            key: "availableEvents", label: "Available for Events", type: "multi",
            options: ["Bhajan Sandhya", "Temple Festivals", "Cultural Programs", "Private Events", "Weddings & Celebrations", "Online Events"],
          },
          {
            key: "regions", label: "Preferred Performance Regions", type: "multi",
            options: ["Rajasthan", "Delhi NCR", "Uttar Pradesh", "Madhya Pradesh", "Gujarat", "Maharashtra", "Pan India"],
          },
          {
            key: "honorarium", label: "Expected Honorarium Range", type: "select", half: true,
            options: ["₹15,000-50,000", "₹50,000-100,000", "₹100,000-250,000", "₹250,000-500,000", "₹500,000+"],
          },
          {
            key: "travelWillingness", label: "Travel Willingness", type: "select", half: true,
            options: ["Within City", "Within State", "Across India"],
          },
        ],
      },
      {
        title: "Submission & Agreement",
        fields: [
          {
            key: "consentContact", type: "checkbox",
            label: "I consent to being contacted for event opportunities via email and phone.",
          },
        ],
      },
    ],
  };
}

export const CATEGORIES: Category[] = [
  {
    key: "artist",
    label: "Artist",
    blurb: "Showcase your spiritual art and craftsmanship.",
    icon: Palette,
    ...performer({
      specialtyLabel: "Primary Art Form",
      specialties: ["Bhajan Singer", "Musician", "Dancer", "Speaker", "Painter", "Composer", "Other"],
      secondaryLabel: "Secondary Art Form (Optional)",
      guruLabel: "Guru / Teacher Name (Optional)",
      bioLabel: "Brief Bio / About Your Art",
      bioPlaceholder: "Tell us about your journey as an artist, your training and what inspires your devotional art (at least 20 characters)",
      craftTitle: "Your Art & Expertise",
    }),
  },
  {
    key: "musician",
    label: "Musician",
    blurb: "Bring kirtan, bhajan and classical music.",
    icon: Music,
    ...performer({
      specialtyLabel: "Primary Instrument / Genre",
      specialties: ["Vocals / Bhajan Singing", "Tabla", "Harmonium", "Sitar", "Flute", "Dholak", "Violin", "Other"],
      secondaryLabel: "Secondary Instrument / Genre (Optional)",
      guruLabel: "Guru / Music Academy Name (Optional)",
      bioLabel: "Brief Bio / About Your Music",
      bioPlaceholder: "Tell us about your journey as a musician, your training and your devotional music (at least 20 characters)",
      craftTitle: "Your Music & Expertise",
    }),
  },
  {
    key: "temple",
    label: "Temple",
    blurb: "List your temple, darshan and aarti timings.",
    icon: Home,
    accountLabels: {
      name: "Contact Person Name",
      namePlaceholder: "e.g. Pujari Ji / Secretary",
      mobile: "Contact Phone",
      email: "Contact Email",
    },
    fromAccount: {},
    steps: [
      {
        title: "Temple Information",
        fields: [
          { key: "templeName", label: "Temple Name", type: "text", required: true, placeholder: "e.g. Shree Khatu Shyam Ji Temple" },
          { key: "deity", label: "Deity / Presiding God", type: "text", required: true, placeholder: "e.g. Khatu Shyam Ji, Hanuman Ji" },
          { key: "yearEstablished", label: "Year of Establishment", type: "text", required: true, placeholder: "e.g. 1956 or ancient", half: true },
          {
            key: "templeType", label: "Temple Type", type: "select", required: true, half: true,
            options: ["Mandir", "Dham", "Ashram", "Shrine", "Temple Complex"],
          },
          { key: "trustName", label: "Temple Trust / Organization Name", type: "text", required: true, placeholder: "e.g. Shree Shyam Mandir Committee" },
          { key: "registrationNumber", label: "Registration Number (Optional)", type: "text", placeholder: "Trust/Society Registration No." },
          {
            key: "primaryPhoto", label: "Upload Primary Temple Photo", type: "file", accept: IMAGES,
            hint: "Featured as the main image of your temple profile",
          },
        ],
      },
      {
        title: "Location & Contact Details",
        fields: [
          { key: "address", label: "Full Address", type: "textarea", required: true, minLength: 5, placeholder: "Enter complete physical address of the temple..." },
          { key: "city", label: "City / Town", type: "text", required: true, placeholder: "e.g. Sikar", half: true },
          state(),
          {
            key: "pinCode", label: "PIN Code", type: "text", required: true, placeholder: "e.g. 332602",
            pattern: /^\d{6}$/, patternMessage: "Enter a valid 6-digit PIN code.", half: true,
          },
          { key: "mapsLink", label: "Google Maps Link (Optional)", type: "url", placeholder: "Paste the share link from Google Maps" },
        ],
      },
      {
        title: "Temple Details & Services",
        fields: [
          { key: "openingTime", label: "Daily Opening Time", type: "text", required: true, placeholder: "e.g. 05:00 AM", half: true },
          { key: "closingTime", label: "Daily Closing Time", type: "text", required: true, placeholder: "e.g. 09:00 PM", half: true },
          {
            key: "aartiTimings", label: "Special Aarti Timings", type: "textarea", required: true,
            placeholder: "e.g. Mangla Aarti 5:00 AM, Shringaar Aarti 8:30 AM, Sandhya Aarti 7:00 PM",
          },
          {
            key: "services", label: "Services Offered", type: "multi",
            options: [
              "Daily Darshan", "Prasad Distribution", "Marriage Ceremonies", "Annapurna Seva (Free Meals)",
              "Spiritual Discourses", "Festival Celebrations", "Meditation Hall", "Dharamshala / Guest Stay",
              "Gaushala (Cow Shelter)", "Vedic Pathshala",
            ],
          },
          {
            key: "description", label: "Brief Description of Temple", type: "textarea", required: true, minLength: 20,
            placeholder: "Tell devotees about your temple history, significance and what makes this space special (at least 20 characters)",
          },
        ],
      },
      {
        title: "Photos & Agreement",
        fields: [
          {
            key: "gallery", label: "Temple Photo Gallery", type: "files", accept: IMAGES, maxFiles: 10,
            hint: "Up to 10 photos — main deity, exterior, interior and premises",
          },
          {
            key: "certifyAccurate", local: true, required: true, type: "checkbox",
            label: "I certify that the information provided is accurate and I am authorized to register this temple on behalf of the temple trust.",
            requiredMessage: "Please certify that the information is accurate.",
          },
          {
            key: "consentComms", type: "checkbox",
            label: "I consent to receiving communications about platform updates and devotee inquiries.",
          },
        ],
      },
    ],
  },
  {
    key: "dharamshala",
    label: "Dharamshala",
    blurb: "List pilgrim accommodation for travellers.",
    icon: Bed,
    accountLabels: {
      name: "Manager / Contact Person Name",
      namePlaceholder: "e.g. Mukesh Kumar Agarwal",
      mobile: "Mobile / WhatsApp Number",
      email: "Email Address",
    },
    fromAccount: { managerName: "fullName" },
    steps: [
      {
        title: "Trust & Property Information",
        fields: [
          { key: "name", label: "Dharamshala / Guesthouse Name", type: "text", required: true, placeholder: "e.g. Shree Shyam Kripa Dharamshala" },
          { key: "trustName", label: "Governing Trust / Society Name", type: "text" },
          { key: "licenseNumber", label: "Trust Registration / License Number", type: "text", required: true },
          {
            key: "distanceFromTemple", label: "Distance from Khatu Shyam Temple", type: "select", required: true,
            options: ["Within 500 Meters", "Within 1 Km", "Within 2 Km", "More than 2 Km"],
          },
          { key: "address", label: "Full Address", type: "textarea", required: true, minLength: 5 },
          state({ half: false }),
        ],
      },
      {
        title: "Accommodation & Pricing",
        fields: [
          { key: "totalRooms", label: "Total Number of Rooms", type: "number", required: true, placeholder: "e.g. 45", half: true },
          { key: "dormitoryBeds", label: "Dormitory Beds (If available)", type: "text", placeholder: "e.g. 2 Dormitories (20 Beds each)", half: true },
          {
            key: "pricingMode", label: "Pricing Mode", type: "select", required: true,
            options: ["Voluntary Donation (Seva)", "Fixed Price", "Both Options Available"],
          },
          { key: "suggestedPrice", label: "Suggested Price / Donation Per Night (INR)", type: "number", required: true, placeholder: "e.g. 500" },
          {
            key: "amenities", label: "Amenities Provided", type: "multi",
            options: [
              "AC Rooms", "Geyser / Hot Water", "In-house Bhojnalaya (Mess)", "Lift Facility", "Parking Area",
              "CCTV Security", "Wheelchair / Ramp Access", "Free RO Drinking Water",
            ],
          },
        ],
      },
      {
        title: "Verification & Photos",
        fields: [
          {
            key: "trustCertificate", label: "Trust Certificate / Society Registration Copy", type: "file",
            accept: DOCUMENTS, hint: "PDF or image",
          },
          {
            key: "propertyPhotos", label: "Property Front & Room Photos", type: "files", accept: IMAGES, maxFiles: 5,
            hint: "Upload 3-5 images",
          },
          {
            key: "managerIdProof", label: "Manager Government ID Proof", type: "file", accept: DOCUMENTS,
            hint: "Aadhar Card, PAN or Passport",
          },
          declaration(
            "We declare that the information provided is correct and the accommodation is clean, secure, and maintained according to pilgrim comfort standards. We authorize Shyam Jagat to verify the details.",
          ),
        ],
      },
    ],
  },
  {
    key: "mandal",
    label: "Organisation (Mandal)",
    blurb: "Register your bhajan mandali or community group.",
    icon: Users,
    accountLabels: {
      name: "Chief / President Name",
      namePlaceholder: "e.g. Mukesh Kumar Agarwal",
      mobile: "President Phone Number",
      email: "Official Email Address",
    },
    fromAccount: { presidentName: "fullName", presidentPhone: "mobile" },
    steps: [
      {
        title: "Organisation & Mandal Identity",
        fields: [
          { key: "mandalName", label: "Mandal / Organisation Name", type: "text", required: true },
          {
            key: "mandalType", label: "Mandal Type / Category", type: "select", required: true,
            options: [
              "Bhajan Mandal & Kirtan Samiti", "Religious / Charitable Trust", "Devotee Community Group",
              "Nishan Yatra Committee", "Seva & Social Welfare Society",
            ],
          },
          {
            key: "foundingYear", label: "Establishment / Founding Year", type: "text", required: true, placeholder: "e.g. 2012",
            pattern: /^\d{4}$/, patternMessage: "Enter a 4-digit year.", half: true,
          },
          { key: "registrationNumber", label: "Government Registration No. (If registered)", type: "text", half: true },
        ],
      },
      {
        title: "Location & Main Headquarters",
        fields: [
          state({ half: true }),
          { key: "city", label: "City / Region", type: "text", required: true, half: true },
          { key: "address", label: "Complete Head Office Address", type: "textarea", required: true, minLength: 5 },
          { key: "officialPhone", label: "Official Contact Phone", type: "tel", required: true },
        ],
      },
      {
        title: "Seva & Community Activities",
        fields: [
          {
            key: "memberCountBand", label: "Active Member Count (In Mandal)", type: "select",
            options: ["Fewer than 25 Members", "25 - 50 Active Members", "50 - 100 Active Members", "More than 100 Members"],
          },
          { key: "spokespersonName", label: "Key Spokesperson Name", type: "text", required: true },
          {
            key: "sevaTypes", label: "Types of Seva & Cultural Programs your Mandal organises", type: "multi",
            options: ["Bhajan Sandhya & Jagran", "Bhandara & Prasadi Seva", "Nishan Yatra Organisation", "Medical & Social Camps"],
          },
          { key: "recurringEvents", label: "Key Recurring Events / Festivals Managed", type: "text", required: true },
        ],
      },
      {
        title: "Logo, Documents & Agreement",
        fields: [
          { key: "logo", label: "Official Logo / Banner", type: "file", accept: IMAGES, hint: "JPG, PNG or WebP" },
          {
            key: "registrationDocument", label: "Registration Certificate / ID Proof", type: "file",
            accept: DOCUMENTS_WORD, hint: "PDF, Word or scanned image",
          },
          declaration(
            "We solemnly declare that all details provided above are true to our knowledge. We promise to abide by the spiritual ethos, discipline, and Seva guidelines of Shree Shyam Jagat Organization.",
          ),
        ],
      },
    ],
  },
  {
    key: "dancer",
    label: "Dancer",
    blurb: "Share classical and devotional dance at festivals.",
    icon: WandSparkles,
    ...performer({
      specialtyLabel: "Primary Dance Style",
      specialties: [
        "Kathak", "Bharatanatyam", "Odissi", "Kuchipudi", "Garba/Dandiya", "Folk Dance", "Contemporary Devotional", "Other",
      ],
      secondaryLabel: "Secondary Dance Style (Optional)",
      guruLabel: "Guru / Dance Academy Name (Optional)",
      bioLabel: "Brief Bio / About Your Dance",
      bioPlaceholder: "Tell us about your journey as a dancer, your training and your devotional performances (at least 20 characters)",
      craftTitle: "Your Dance & Expertise",
    }),
  },
];

export const categoryByKey = (key: string | null | undefined) =>
  CATEGORIES.find((category) => category.key === key);
