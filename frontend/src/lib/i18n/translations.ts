import type { LocaleCode } from "./locales";

/**
 * Site chrome (top bar, header nav, footer) translated into every supported
 * locale. Page body content is still English-only — see the i18n rollout
 * notes in the PR description for the plan to extend this per page.
 *
 * Hindi devotional phrases used verbatim across the site (e.g. "जय श्री
 * श्याम") are NOT part of this dictionary — they stay fixed in Hindi
 * regardless of the selected locale.
 */
export interface Dictionary {
  "nav.home": string;
  "nav.about": string;
  "nav.initiatives": string;
  "nav.babaShyam": string;
  "nav.events": string;
  "nav.team": string;
  "nav.more": string;

  "more.blog": string;
  "more.templeDirectory": string;
  "more.templeRegistration": string;
  "more.artists": string;
  "more.artistRegistration": string;
  "more.contact": string;
  "more.donation": string;

  "header.signUp": string;
  "header.registration": string;
  "header.signOut": string;

  "topbar.getApp": string;
  "topbar.now": string;
  "topbar.support": string;
  "topbar.selectLanguage": string;

  "footer.tagline": string;
  "footer.quickLinks": string;
  "footer.support": string;
  "footer.contact": string;
  "footer.aboutUs": string;
  "footer.history": string;
  "footer.ourVision": string;
  "footer.sevaList": string;
  "footer.gallery": string;
  "footer.contactUs": string;
  "footer.privacyPolicy": string;
  "footer.donationFaq": string;
  "footer.volunteer": string;
  "footer.liveHelp": string;
  "footer.rightsReserved": string;
}

export type TranslationKey = keyof Dictionary;

export const translations: Record<LocaleCode, Dictionary> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.initiatives": "Our Initiatives",
    "nav.babaShyam": "Baba Shyam",
    "nav.events": "Events",
    "nav.team": "Team",
    "nav.more": "More",
    "more.blog": "Blog",
    "more.templeDirectory": "Temple Directory",
    "more.templeRegistration": "Temple Registration",
    "more.artists": "Artists",
    "more.artistRegistration": "Artist Registration",
    "more.contact": "Contact Us",
    "more.donation": "Donation",
    "header.signUp": "Sign Up",
    "header.registration": "REGISTRATION",
    "header.signOut": "Sign out",
    "topbar.getApp": "Get the App",
    "topbar.now": "Now",
    "topbar.support": "24x7 Support",
    "topbar.selectLanguage": "Select language",
    "footer.tagline":
      "Preserving our timeless traditions while serving the contemporary needs of our global devotee community.",
    "footer.quickLinks": "Quick Links",
    "footer.support": "Support",
    "footer.contact": "Contact",
    "footer.aboutUs": "About Us",
    "footer.history": "History",
    "footer.ourVision": "Our Vision",
    "footer.sevaList": "Seva List",
    "footer.gallery": "Gallery",
    "footer.contactUs": "Contact Us",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.donationFaq": "Donation FAQ",
    "footer.volunteer": "Volunteer",
    "footer.liveHelp": "Live Help",
    "footer.rightsReserved": "Organization. All Rights Reserved.",
  },
  hi: {
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.initiatives": "हमारी पहल",
    "nav.babaShyam": "बाबा श्याम",
    "nav.events": "कार्यक्रम",
    "nav.team": "टीम",
    "nav.more": "और",
    "more.blog": "ब्लॉग",
    "more.templeDirectory": "मंदिर निर्देशिका",
    "more.templeRegistration": "मंदिर पंजीकरण",
    "more.artists": "कलाकार",
    "more.artistRegistration": "कलाकार पंजीकरण",
    "more.contact": "संपर्क करें",
    "more.donation": "दान",
    "header.signUp": "साइन अप करें",
    "header.registration": "पंजीकरण",
    "header.signOut": "साइन आउट करें",
    "topbar.getApp": "ऐप प्राप्त करें",
    "topbar.now": "अभी",
    "topbar.support": "24x7 सहायता",
    "topbar.selectLanguage": "भाषा चुनें",
    "footer.tagline":
      "हमारी सनातन परंपराओं को संजोते हुए, हम अपने वैश्विक भक्त समुदाय की समकालीन आवश्यकताओं की सेवा कर रहे हैं।",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.support": "सहायता",
    "footer.contact": "संपर्क",
    "footer.aboutUs": "हमारे बारे में",
    "footer.history": "इतिहास",
    "footer.ourVision": "हमारा दृष्टिकोण",
    "footer.sevaList": "सेवा सूची",
    "footer.gallery": "गैलरी",
    "footer.contactUs": "संपर्क करें",
    "footer.privacyPolicy": "गोपनीयता नीति",
    "footer.donationFaq": "दान संबंधी सामान्य प्रश्न",
    "footer.volunteer": "स्वयंसेवक",
    "footer.liveHelp": "लाइव सहायता",
    "footer.rightsReserved": "संगठन. सर्वाधिकार सुरक्षित।",
  },
  bn: {
    "nav.home": "হোম",
    "nav.about": "আমাদের সম্পর্কে",
    "nav.initiatives": "আমাদের উদ্যোগ",
    "nav.babaShyam": "বাবা শ্যাম",
    "nav.events": "অনুষ্ঠান",
    "nav.team": "দল",
    "nav.more": "আরও",
    "more.blog": "ব্লগ",
    "more.templeDirectory": "মন্দির নির্দেশিকা",
    "more.templeRegistration": "মন্দির নিবন্ধন",
    "more.artists": "শিল্পীরা",
    "more.artistRegistration": "শিল্পী নিবন্ধন",
    "more.contact": "যোগাযোগ করুন",
    "more.donation": "দান",
    "header.signUp": "সাইন আপ",
    "header.registration": "নিবন্ধন",
    "header.signOut": "সাইন আউট",
    "topbar.getApp": "অ্যাপ নিন",
    "topbar.now": "অभী",
    "topbar.support": "২৪x৭ সহায়তা",
    "topbar.selectLanguage": "ভাষা নির্বাচন করুন",
    "footer.tagline":
      "আমাদের চিরন্তন ঐতিহ্য সংরক্ষণ করে আমরা আমাদের বৈশ্বিক ভক্ত সম্প্রদায়ের সমসাময়িক প্রয়োজন পূরণ করছি।",
    "footer.quickLinks": "দ্রুত লিঙ্ক",
    "footer.support": "সহায়তা",
    "footer.contact": "যোগাযোগ",
    "footer.aboutUs": "আমাদের সম্পর্কে",
    "footer.history": "ইতিহাস",
    "footer.ourVision": "আমাদের লক্ষ্য",
    "footer.sevaList": "সেবা তালিকা",
    "footer.gallery": "গ্যালারি",
    "footer.contactUs": "যোগাযোগ করুন",
    "footer.privacyPolicy": "গোপনীয়তা নীতি",
    "footer.donationFaq": "দান সংক্রান্ত প্রশ্ন",
    "footer.volunteer": "স্বেচ্ছাসেবক",
    "footer.liveHelp": "লাইভ সহায়তা",
    "footer.rightsReserved": "সংস্থা। সর্বস্বত্ব সংরক্ষিত।",
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.about": "எங்களைப் பற்றி",
    "nav.initiatives": "எங்கள் முயற்சிகள்",
    "nav.babaShyam": "பாபா ஷ்யாம்",
    "nav.events": "நிகழ்வுகள்",
    "nav.team": "குழு",
    "nav.more": "மேலும்",
    "more.blog": "வலைப்பதிவு",
    "more.templeDirectory": "கோவில் அடைவு",
    "more.templeRegistration": "கோவில் பதிவு",
    "more.artists": "கலைஞர்கள்",
    "more.artistRegistration": "கலைஞர் பதிவு",
    "more.contact": "எங்களை தொடர்பு கொள்ள",
    "more.donation": "நன்கொடை",
    "header.signUp": "பதிவு செய்யவும்",
    "header.registration": "பதிவு",
    "header.signOut": "வெளியேறு",
    "topbar.getApp": "ஆப்பைப் பெறுங்கள்",
    "topbar.now": "அப்போது",
    "topbar.support": "24x7 ஆதரவு",
    "topbar.selectLanguage": "மொழியைத் தேர்ந்தெடுக்கவும்",
    "footer.tagline":
      "எங்கள் காலம் கடந்த பாரம்பரியங்களைப் பாதுகாத்து, எங்கள் உலகளாவிய பக்தர் சமூகத்தின் தற்கால தேவைகளை நிறைவேற்றி வருகிறோம்.",
    "footer.quickLinks": "விரைவு இணைப்புகள்",
    "footer.support": "ஆதரவு",
    "footer.contact": "தொடர்பு",
    "footer.aboutUs": "எங்களைப் பற்றி",
    "footer.history": "வரலாறு",
    "footer.ourVision": "எங்கள் நோக்கம்",
    "footer.sevaList": "சேவை பட்டியல்",
    "footer.gallery": "படத்தொகுப்பு",
    "footer.contactUs": "எங்களை தொடர்பு கொள்ள",
    "footer.privacyPolicy": "தனியுரிமைக் கொள்கை",
    "footer.donationFaq": "நன்கொடை கேள்விகள்",
    "footer.volunteer": "தன்னார்வலர்",
    "footer.liveHelp": "நேரடி உதவி",
    "footer.rightsReserved": "அமைப்பு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  },
  te: {
    "nav.home": "హోమ్",
    "nav.about": "మా గురించి",
    "nav.initiatives": "మా కార్యక్రమాలు",
    "nav.babaShyam": "బాబా శ్యామ్",
    "nav.events": "ఈవెంట్స్",
    "nav.team": "బృందం",
    "nav.more": "మరిన్ని",
    "more.blog": "బ్లాగ్",
    "more.templeDirectory": "ఆలయ డైరెక్టరీ",
    "more.templeRegistration": "ఆలయ నమోదు",
    "more.artists": "కళాకారులు",
    "more.artistRegistration": "కళాకారుల నమోదు",
    "more.contact": "మమ్మల్ని సంప్రదించండి",
    "more.donation": "విరాళం",
    "header.signUp": "సైన్ అప్",
    "header.registration": "నమోదు",
    "header.signOut": "సైన్ అవుట్",
    "topbar.getApp": "యాప్ పొందండి",
    "topbar.now": "అయితే",
    "topbar.support": "24x7 మద్దతు",
    "topbar.selectLanguage": "భాషను ఎంచుకోండి",
    "footer.tagline":
      "మా శాశ్వత సంప్రదాయాలను కాపాడుతూ, మా ప్రపంచవ్యాప్త భక్త సమాజం యొక్క ఆధునిక అవసరాలను తీరుస్తున్నాము.",
    "footer.quickLinks": "త్వరిత లింకులు",
    "footer.support": "మద్దతు",
    "footer.contact": "సంప్రదింపు",
    "footer.aboutUs": "మా గురించి",
    "footer.history": "చరిత్ర",
    "footer.ourVision": "మా దృక్పథం",
    "footer.sevaList": "సేవా జాబితా",
    "footer.gallery": "గ్యాలరీ",
    "footer.contactUs": "మమ్మల్ని సంప్రదించండి",
    "footer.privacyPolicy": "గోప్యతా విధానం",
    "footer.donationFaq": "విరాళం ప్రశ్నలు",
    "footer.volunteer": "స్వచ్ఛంద సేవకుడు",
    "footer.liveHelp": "ప్రత్యక్ష సహాయం",
    "footer.rightsReserved": "సంస్థ. అన్ని హక్కులు రక్షించబడ్డాయి.",
  },
  ml: {
    "nav.home": "ഹോം",
    "nav.about": "ഞങ്ങളെക്കുറിച്ച്",
    "nav.initiatives": "ഞങ്ങളുടെ സംരംഭങ്ങൾ",
    "nav.babaShyam": "ബാബ ശ്യാം",
    "nav.events": "പരിപാടികൾ",
    "nav.team": "ടീം",
    "nav.more": "കൂടുതൽ",
    "more.blog": "ബ്ലോഗ്",
    "more.templeDirectory": "ക്ഷേത്ര ഡയറക്ടറി",
    "more.templeRegistration": "ക്ഷേത്ര രജിസ്ട്രേഷൻ",
    "more.artists": "കലാകാരന്മാർ",
    "more.artistRegistration": "കലാകാരന്റെ രജിസ്ട്രേഷൻ",
    "more.contact": "ഞങ്ങളെ ബന്ധപ്പെടുക",
    "more.donation": "സംഭാവന",
    "header.signUp": "സൈൻ അപ്പ്",
    "header.registration": "രജിസ്ട്രേഷൻ",
    "header.signOut": "സൈൻ ഔട്ട്",
    "topbar.getApp": "ആപ്പ് നേടൂ",
    "topbar.now": "അഭി",
    "topbar.support": "24x7 പിന്തുണ",
    "topbar.selectLanguage": "ഭാഷ തിരഞ്ഞെടുക്കുക",
    "footer.tagline":
      "ഞങ്ങളുടെ ശാശ്വത പാരമ്പര്യങ്ങൾ കാത്തുസൂക്ഷിച്ചുകൊണ്ട്, ഞങ്ങളുടെ ആഗോള ഭക്ത സമൂഹത്തിന്റെ സമകാലിക ആവശ്യങ്ങൾ നിറവേറ്റുന്നു.",
    "footer.quickLinks": "ദ്രുത ലിങ്കുകൾ",
    "footer.support": "പിന്തുണ",
    "footer.contact": "ബന്ധപ്പെടുക",
    "footer.aboutUs": "ഞങ്ങളെക്കുറിച്ച്",
    "footer.history": "ചരിത്രം",
    "footer.ourVision": "ഞങ്ങളുടെ കാഴ്ചപ്പാട്",
    "footer.sevaList": "സേവാ പട്ടിക",
    "footer.gallery": "ഗാലറി",
    "footer.contactUs": "ഞങ്ങളെ ബന്ധപ്പെടുക",
    "footer.privacyPolicy": "സ്വകാര്യതാ നയം",
    "footer.donationFaq": "സംഭാവന ചോദ്യങ്ങൾ",
    "footer.volunteer": "സന്നദ്ധപ്രവർത്തകൻ",
    "footer.liveHelp": "തത്സമയ സഹായം",
    "footer.rightsReserved": "ഓർഗനൈസേഷൻ. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",
  },
  gu: {
    "nav.home": "હોમ",
    "nav.about": "અમારા વિશે",
    "nav.initiatives": "અમારી પહેલ",
    "nav.babaShyam": "બાબા શ્યામ",
    "nav.events": "કાર્યક્રમો",
    "nav.team": "ટીમ",
    "nav.more": "વધુ",
    "more.blog": "બ્લોગ",
    "more.templeDirectory": "મંદિર ડિરેક્ટરી",
    "more.templeRegistration": "મંદિર નોંધણી",
    "more.artists": "કલાકારો",
    "more.artistRegistration": "કલાકાર નોંધણી",
    "more.contact": "અમારો સંપર્ક કરો",
    "more.donation": "દાન",
    "header.signUp": "સાઇન અપ",
    "header.registration": "નોંધણી",
    "header.signOut": "સાઇન આઉટ",
    "topbar.getApp": "એપ મેળવો",
    "topbar.now": "અભી",
    "topbar.support": "24x7 સહાય",
    "topbar.selectLanguage": "ભાષા પસંદ કરો",
    "footer.tagline":
      "અમારી શાશ્વત પરંપરાઓ જાળવીને, અમે અમારા વૈશ્વિક ભક્ત સમુદાયની સમકાલીન જરૂરિયાતોની સેવા કરીએ છીએ.",
    "footer.quickLinks": "ઝડપી લિંક્સ",
    "footer.support": "સહાય",
    "footer.contact": "સંપર્ક",
    "footer.aboutUs": "અમારા વિશે",
    "footer.history": "ઇતિહાસ",
    "footer.ourVision": "અમારું વિઝન",
    "footer.sevaList": "સેવા યાદી",
    "footer.gallery": "ગેલેરી",
    "footer.contactUs": "અમારો સંપર્ક કરો",
    "footer.privacyPolicy": "ગોપનીયતા નીતિ",
    "footer.donationFaq": "દાન FAQ",
    "footer.volunteer": "સ્વયંસેવક",
    "footer.liveHelp": "લાઇવ સહાય",
    "footer.rightsReserved": "સંસ્થા. બધા હકો અનામત.",
  },
  mr: {
    "nav.home": "होम",
    "nav.about": "आमच्याबद्दल",
    "nav.initiatives": "आमचे उपक्रम",
    "nav.babaShyam": "बाबा श्याम",
    "nav.events": "कार्यक्रम",
    "nav.team": "टीम",
    "nav.more": "अधिक",
    "more.blog": "ब्लॉग",
    "more.templeDirectory": "मंदिर निर्देशिका",
    "more.templeRegistration": "मंदिर नोंदणी",
    "more.artists": "कलाकार",
    "more.artistRegistration": "कलाकार नोंदणी",
    "more.contact": "आमच्याशी संपर्क साधा",
    "more.donation": "देणगी",
    "header.signUp": "साइन अप करा",
    "header.registration": "नोंदणी",
    "header.signOut": "साइन आउट करा",
    "topbar.getApp": "अॅप मिळवा",
    "topbar.now": "अभी",
    "topbar.support": "24x7 सहाय्य",
    "topbar.selectLanguage": "भाषा निवडा",
    "footer.tagline":
      "आमच्या चिरंतन परंपरा जपत, आम्ही आमच्या जागतिक भक्त समुदायाच्या समकालीन गरजा पूर्ण करत आहोत.",
    "footer.quickLinks": "द्रुत दुवे",
    "footer.support": "सहाय्य",
    "footer.contact": "संपर्क",
    "footer.aboutUs": "आमच्याबद्दल",
    "footer.history": "इतिहास",
    "footer.ourVision": "आमचे ध्येय",
    "footer.sevaList": "सेवा यादी",
    "footer.gallery": "गॅलरी",
    "footer.contactUs": "आमच्याशी संपर्क साधा",
    "footer.privacyPolicy": "गोपनीयता धोरण",
    "footer.donationFaq": "देणगी संबंधी प्रश्न",
    "footer.volunteer": "स्वयंसेवक",
    "footer.liveHelp": "थेट मदत",
    "footer.rightsReserved": "संस्था. सर्व हक्क राखीव.",
  },
};
