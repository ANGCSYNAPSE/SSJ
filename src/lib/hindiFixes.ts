/**
 * Words the automatic Hindi translation gets wrong for a seva / temple site. Each rule turns the machine's wording
 * into the wording a devotee would actually expect. Add a line here whenever another word reads badly in Hindi:
 * `from` is every wrong form the translation produces, `to` is what the page should say instead.
 *
 * Matching is on whole words (Devanagari letters either side count as part of a word), so "घटना" does not
 * clip the inside of a longer word. A rule marked `exact` only applies when the wrong wording is the whole text of a
 * label (a menu item, a button, a tag), which is how single everyday words like "घर" are kept safe in sentences.
 * Longer, more specific rules go first.
 */
export interface HindiFix {
  from: readonly string[];
  to: string;
  /** Only when it is the whole text of the element. */
  exact?: boolean;
  /** What the English was, for whoever edits this list. */
  english?: string;
}

export const HINDI_FIXES: readonly HindiFix[] = [
  // Events: "incidents / happenings" is wrong, these are programmes: satsang, jagran, bhandara, katha.
  { english: "Events", from: ["घटनाएँ", "घटनाएं"], to: "कार्यक्रम" },
  { from: ["घटनाओं"], to: "कार्यक्रमों" },
  { english: "Event", from: ["घटना", "इवेंट", "इवेंट्स"], to: "कार्यक्रम" },
  { english: "Join (button)", from: ["जोड़ना"], to: "जुड़ें", exact: true },
  { english: "Register (button)", from: ["पंजीकरण करवाना"], to: "पंजीकरण करें" },
  { english: "Retrospective Gallery", from: ["पूर्वव्यापी गैलरी"], to: "यादगार झलकियाँ" },
  { english: "Retreat", from: ["रिट्रीट"], to: "शिविर" },
  { english: "weekdays", from: ["बैठा"], to: "शनिवार", exact: true },
  { from: ["मंगल"], to: "मंगलवार", exact: true },
  { from: ["गुरु"], to: "गुरुवार", exact: true },

  // Menus and headings
  { english: "Home (menu)", from: ["घर"], to: "होम", exact: true },
  { english: "Get Involved (footer)", from: ["उलझना", "शामिल हो जाओ"], to: "जुड़ें" },
  { english: "Sign In (footer)", from: ["दाखिल करना"], to: "लॉग इन करें" },
  { english: "Get in touch", from: ["संपर्क में रहो", "संपर्क में रहें"], to: "संपर्क करें" },
  { english: "Get started", from: ["शुरू हो जाओ"], to: "शुरू करें" },
  { english: "Our Mission", from: ["हमारा विशेष कार्य"], to: "हमारा संकल्प" },
  { english: "Our Vision", from: ["हमारा नज़रिया", "हमारा नजरिया"], to: "हमारी दृष्टि" },
  { english: "Who We Are", from: ["हम जो हैं"], to: "हमारा परिचय" },
  { english: "Know More", from: ["अधिक जानते हैं"], to: "और जानें" },
  { english: "Explore chapters", from: ["अध्यायों का जानें"], to: "क्षेत्रीय इकाइयाँ देखें" },
  { english: "Explore Management Team", from: ["का जानें"], to: "देखें" },
  { english: "Explore", from: ["अन्वेषण करना", "अन्वेषण करें", "अन्वेषण", "एक्सप्लोर करें", "एक्सप्लोर"], to: "जानें" },
  { english: "Browse", from: ["ब्राउज़ करें", "ब्राउज़ करना"], to: "देखें" },

  // Numbers on the home page
  { english: "Temples Associated", from: ["संबंधित मंदिर"], to: "जुड़े मंदिर" },
  { english: "Devotees Connected", from: ["भक्त जुड़े हुए हैं"], to: "जुड़े हुए भक्त" },
  { english: "States Covered", from: ["शामिल राज्य"], to: "राज्यों में उपस्थिति" },
  { english: "Currently Streaming", from: ["वर्तमान में स्ट्रीमिंग हो रही है"], to: "अभी सीधा प्रसारण" },

  // Forms and actions
  { english: "Email Address", from: ["मेल पता"], to: "ईमेल पता" },
  { english: "Remember me", from: ["मुझे याद करो"], to: "मुझे याद रखें" },
  { english: "Sign Up", from: ["साइन अप करें", "साइन अप", "साइनअप"], to: "पंजीकरण करें" },
  { english: "Donate", from: ["दान करना", "दान करो"], to: "दान करें" },
  { english: "Terms of Service", from: ["सेवा की शर्तों"], to: "नियम और शर्तों" },
  { from: ["सेवा की शर्तें"], to: "नियम और शर्तें" },
  { english: "Book Artists", from: ["पुस्तक कलाकार"], to: "कलाकार बुक करें" },
  { english: "Go Live", from: ["रहने जाओ"], to: "लाइव करें", exact: true },

  // Donation page
  { english: "Custom amount", from: ["रिवाज़", "रिवाज"], to: "अपनी राशि", exact: true },
  { english: "Credit / Debit Card", from: ["जमा करना / खर्च करना का कार्ड"], to: "क्रेडिट / डेबिट कार्ड" },
  { english: "UPI", from: ["है मैं"], to: "UPI", exact: true },
  { english: "QR Code", from: ["क्यू आर संहिता"], to: "QR कोड" },
  { english: "Wallet", from: ["बटुआ"], to: "वॉलेट", exact: true },
  { english: "Temple Dev.", from: ["मंदिर देव."], to: "मंदिर विकास" },
  { english: "Free", from: ["मुक्त"], to: "निःशुल्क", exact: true },
  { english: "Premium", from: ["अधिमूल्य"], to: "प्रीमियम", exact: true },
  // "सेवादार" is already Hindi in the page; passing it through translation turns it into this.
  { english: "Sevadar", from: ["परिवहनदार"], to: "सेवादार" },
  { english: "Monthly Prasadam", from: ["मंदिर का प्रसाद मासिक"], to: "हर महीने मंदिर का प्रसाद" },

  // The British spelling "Organisations" is left half-translated (in English letters, with a stray dash).
  { english: "Organisations", from: ["organizations-", "Organizations-", "organisations-"], to: "संगठन", exact: true },

  // Names and spellings
  { from: ["खातु"], to: "खाटू" },
  { from: ["श्यामा"], to: "श्याम" },
  { from: ["कन्हिया"], to: "कन्हैया" },

  { english: "Seva Appeal (ad label)", from: ["सेवा अपील"], to: "सेवा आह्वान" },
  { english: "Old Age Home", from: ["वृद्धावस्था गृह", "ओल्ड एज होम", "वृद्ध आयु घर", "वृद्धाश्रम घर"], to: "वृद्धाश्रम" },
  // "Invoice" is translated as "चालान", which also means a traffic fine or a police case.
  { english: "Invoice", from: ["चालान"], to: "इनवॉइस" },
  { english: "Volunteers", from: ["स्वयं सेवक", "स्वयं सेवकों"], to: "स्वयंसेवक" },
];

const DEVANAGARI = "\\u0900-\\u097F";
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const alternatives = (from: readonly string[]) => [...from].sort((a, b) => b.length - a.length).map(escape).join("|");

/** One compiled pattern per rule. */
export const COMPILED_FIXES = HINDI_FIXES.map((fix) => ({
  exact: Boolean(fix.exact),
  to: fix.to,
  pattern: fix.exact
    ? new RegExp(`^(\\s*)(?:${alternatives(fix.from)})(\\s*)$`, "u")
    : new RegExp(`(?<![${DEVANAGARI}])(?:${alternatives(fix.from)})(?![${DEVANAGARI}])`, "gu"),
}));

/** The text with every known bad Hindi wording replaced. Returns the same string when nothing needed fixing. */
export function polishHindi(text: string): string {
  // Almost every rule is about Hindi words; the one exception is a leftover English word.
  if (!/[ऀ-ॿ]/.test(text) && !/organi[sz]ations-/i.test(text)) return text;
  let out = text;
  for (const { pattern, to, exact } of COMPILED_FIXES) {
    out = exact ? out.replace(pattern, (_m, pre: string, post: string) => `${pre}${to}${post}`) : out.replace(pattern, to);
  }
  return out;
}
