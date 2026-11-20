import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules for using the Shyam Jagat website, registering, paying the registration fee and donating.",
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Agreeing to these terms",
    body: [
      `These terms govern your use of ${SITE.name} at www.shyamjagat.com (the "website"). By creating an account, registering, paying or simply using the website, you agree to these terms and to our Privacy Policy and Refund Policy. If you do not agree, please do not use the website.`,
    ],
  },
  {
    id: "eligibility",
    title: "Who may use it",
    body: [
      "You must be at least 18 years old to create an account or register. A temple, dharamshala, mandal or other group may be registered only by a person who is authorised to act for it.",
    ],
  },
  {
    id: "accounts",
    title: "Your account",
    body: [
      [
        "Give true and current information, and keep it up to date.",
        "Keep your password secret. You are responsible for what happens under your account; tell us straight away if you think someone else is using it.",
        "One person, one account. Do not create accounts for other people without their permission.",
      ],
      "Your account can carry three marks: email verified (you entered the code we emailed), phone verified (you entered the code we texted) and verified by the Shyam Jagat team (our team has checked your details). The team mark is given at our discretion and may be removed if details turn out to be wrong.",
    ],
  },
  {
    id: "registrations",
    title: "Registrations and listings",
    body: [
      "You can register as an artist, dancer, musician, temple, dharamshala or mandal. Each registration is reviewed by our team before it is approved, and we may ask you for changes, approve it, reject it, suspend it or remove it if the information is incomplete, inaccurate, misleading, or goes against the purpose of the platform.",
      "Approval is not an endorsement or guarantee by Shyam Jagat of any person, temple or organisation. We are a platform that connects people; arrangements between devotees, artists, temples and organisers are between them.",
    ],
  },
  {
    id: "fee",
    title: "Registration fee",
    body: [
      "Registering needs a one-time registration fee. The total and the smallest first payment are shown on the website when you pay, and you may pay the rest later in parts. The amounts are set by Shyam Jagat and may change; a change does not affect what you have already paid.",
      "Your account is created only after the minimum first payment is confirmed. Payments are processed by Razorpay and are counted once Razorpay confirms them. Refunds are handled under our Refund Policy.",
    ],
  },
  {
    id: "donations",
    title: "Donations",
    body: [
      "Donations are voluntary. You choose the amount and the cause, and may donate anonymously. Receipts, including receipts for tax purposes where they apply, are issued as described on the donation page. Donations are generally not refundable, as explained in the Refund Policy.",
    ],
  },
  {
    id: "conduct",
    title: "How you may use the website",
    body: [
      "You agree not to:",
      [
        "Post anything false, offensive, hateful, unlawful, or that infringes someone else's rights.",
        "Pretend to be another person or organisation.",
        "Upload malicious files, scrape the website, or try to break or bypass its security.",
        "Use the website to send spam or to collect other people's information.",
        "Use the name of Baba Shyam, Shyam Jagat or its logo to mislead others or for commercial gain without our written permission.",
      ],
      "We may remove content and suspend or end accounts that break these rules.",
    ],
  },
  {
    id: "your-content",
    title: "Your content",
    body: [
      "You keep ownership of the photos, text and other material you upload. You give Shyam Jagat permission to store it and to display it on the website and in our promotion of the community, for as long as your listing or account exists. You confirm that you have the right to share what you upload.",
    ],
  },
  {
    id: "ownership",
    title: "Our content",
    body: [
      "The website, its design, logo, text and images belong to Shyam Jagat or are used with permission. You may view and share them for personal, non-commercial purposes, but you may not copy or reuse them for other purposes without our written permission.",
    ],
  },
  {
    id: "third-parties",
    title: "Other services",
    body: [
      "The website relies on services run by others, such as Razorpay for payments and Google for sign-in and translation. Their own terms and privacy policies apply when you use them, and we are not responsible for their availability or conduct.",
    ],
  },
  {
    id: "disclaimer",
    title: "Availability and our responsibility",
    body: [
      "We work to keep the website running and accurate, but it is provided \"as it is\" and we cannot promise that it will always be available or free of errors. Information on listings, events and artists is supplied by the people concerned; please check details before travelling or making arrangements.",
      "To the fullest extent the law allows, Shyam Jagat is not liable for indirect or consequential losses, or for loss caused by events outside our control. Nothing in these terms limits any right you have under law that cannot be limited.",
    ],
  },
  {
    id: "ending",
    title: "Ending your account",
    body: [
      `You can stop using the website at any time and may ask us to close your account by writing to ${CONTACT.email}. We may suspend or close an account that breaks these terms. Sections that by their nature should continue (for example about content, payments already made and liability) continue after an account ends.`,
    ],
  },
  {
    id: "law",
    title: "Governing law",
    body: [
      "These terms are governed by the laws of India. Any dispute will be subject to the courts of Jaipur, Rajasthan, after we have first tried to settle it in good faith.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may change these terms from time to time. The date at the top shows the latest version. If you keep using the website after a change, you accept the new terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The simple rules for being part of the Shyam Jagat community online. Please read them before you register, pay or donate."
      sections={sections}
    />
  );
}
