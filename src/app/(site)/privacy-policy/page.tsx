import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What information Shyam Jagat collects, why, who it is shared with, and the choices you have.",
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: [
      `${SITE.name} ("we", "us") runs this website, www.shyamjagat.com, a community platform for devotees, temples, dharamshalas, artists, dancers, musicians and mandals. This policy explains what personal information we collect when you use the website, why we collect it, and the choices you have. By using the website you agree to this policy.`,
      `You can reach us at ${CONTACT.email}.`,
    ],
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: [
      "We collect only what is needed to run the platform:",
      [
        "Account details: your name, email address, mobile number and password. Your password is stored only in a scrambled (hashed) form, so nobody at Shyam Jagat can read it.",
        "Location: the city and state you give us.",
        "Registration details: if you register as an artist, dancer, musician, temple, dharamshala or mandal, the information you fill in on that form (for example names, experience, address, contact details, social links, photos and documents).",
        "Payments: when you pay the registration fee or donate, the payment is handled by Razorpay. We receive and keep the order and payment reference, the amount, the status and a receipt number. We never see or store your card, UPI PIN or bank login details.",
        "Donations: your name, email, phone, the cause you choose, and whether you want to stay anonymous or receive a receipt.",
        "Messages: anything you send through the contact form.",
        "Sign-in and security records: the time you signed in, your device and browser type, and your IP address, kept so we can protect accounts and end sessions that look suspicious.",
        "Sign in with Google (when you choose it): your name, email address and profile picture, as shared by Google. We do not receive your Google password and we do not read any of your Google data beyond this.",
      ],
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: [
      [
        "To create and secure your account, and to verify your email address and mobile number with one-time codes.",
        "To review and publish registrations, and to tell you whether a registration is approved or needs changes.",
        "To process the registration fee and donations, send receipts, and handle refunds.",
        "To send you notifications inside the website and emails about your account, payments and registrations. We may also tell you about events and seva activities of Shyam Jagat; you can ask us to stop at any time.",
        "To answer your messages and requests.",
        "To keep the website safe, prevent misuse and fraud, and meet our legal duties.",
      ],
      "We do not sell your personal information, and we do not use it for third-party advertising.",
    ],
  },
  {
    id: "public-information",
    title: "What other people can see",
    body: [
      "Your account details are private. Only information that is meant to be listed publicly (for example the name, city and contact details of an approved temple or artist listing, or the name on a donation you did not mark anonymous) may appear on the website, and only after the listing is approved. Please do not put anything in a public listing that you do not want others to see.",
    ],
  },
  {
    id: "who-we-share-with",
    title: "Who we share information with",
    body: [
      "We share information only with the service providers who help us run the platform, and only what each one needs:",
      [
        "Razorpay, to take payments and make refunds.",
        "Email and text-message providers, to deliver one-time codes, receipts and account emails.",
        "Hosting and database providers (such as Vercel and Neon), where the website and its data are stored.",
        "Cloudinary, where the images and files you upload are stored.",
        "Google, if you use Sign in with Google or the page-translation tool.",
      ],
      "We may also disclose information when the law requires it, or to protect the rights, safety and property of Shyam Jagat, its members or the public. If the organisation is ever restructured, your information may move to the successor, which must honour this policy.",
    ],
  },
  {
    id: "google",
    title: "Google user data",
    body: [
      "If you sign in with Google, we use your Google email address, name and profile picture only to create your account or sign you in, and to show your name on your profile. We do not use it for advertising, we do not sell it, and we do not share it except with the providers listed above to run the service.",
      "Shyam Jagat's use of information received from Google APIs adheres to the Google API Services User Data Policy, including its Limited Use requirements.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and similar storage",
    body: [
      "We use a small number of cookies and browser storage that the website needs to work:",
      [
        "A secure, sign-in cookie that keeps you signed in. It cannot be read by scripts on the page and is removed when you sign out or it expires.",
        "Small items in your browser, such as your language choice and notices you have already seen.",
        "The page-translation tool (Google Translate) may set its own cookies when you change language.",
      ],
      "You can clear cookies in your browser settings; you will then need to sign in again.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: [
      "We keep your account and registration details for as long as your account exists. Payment and receipt records are kept for as long as accounting and tax rules require. Sign-in records are kept for a limited time. Unfinished sign-ups that are never completed expire and are cleared automatically. When you ask us to delete your account we remove or anonymise your personal information, except what we must keep by law.",
    ],
  },
  {
    id: "security",
    title: "How we protect it",
    body: [
      "Passwords are hashed, one-time codes expire and lock after repeated wrong tries, sessions can be ended, and all traffic to the website is encrypted. Access to the admin panel is limited to authorised team members. No system is perfectly secure, so please choose a strong password and keep it to yourself.",
    ],
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: [
      "You may, at any time:",
      [
        "See and update your name, location and registration details from your profile.",
        "Ask us for a copy of the personal information we hold about you.",
        "Ask us to correct or delete your information, or to close your account.",
        "Withdraw your consent to messages about events and activities.",
      ],
      `To make a request, email ${CONTACT.email} from the address on your account. We will respond within a reasonable time and in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023. If you are unhappy with our answer, write to the same address and mark it "Grievance".`,
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      "The registration features are meant for people aged 18 and over. We do not knowingly collect information from children. If you believe a child has given us their information, tell us and we will remove it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The date at the top shows when it last changed. If a change is significant we will tell you on the website or by email.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your trust matters to us. This page explains, in plain words, what we collect, why, and how you stay in control."
      sections={sections}
    />
  );
}
