import { CONTACT } from "@/lib/constants";
import type { LegalSection } from "./types";

export const refundSections: LegalSection[] = [
  {
    id: "overview",
    title: "In short",
    body: [
      [
        "A payment made by mistake or twice is refunded.",
        "The registration fee is not refundable once your registration has been approved and listed.",
        "Donations are voluntary and generally not refundable, except when made in error.",
        "Approved refunds go back to the same account you paid from, usually within 5 to 7 working days.",
      ],
    ],
  },
  {
    id: "registration-fee",
    title: "Registration fee",
    body: [
      "The registration fee covers the review of your registration and your place on the platform. We will refund the amount you paid, in full, if:",
      [
        "you paid the same fee twice, or paid more than was due;",
        "a technical fault charged you but your account was not created; or",
        "we reject your registration for a reason that is not your fault, such as a listing we cannot accept.",
      ],
      "If you change your mind before your registration has been reviewed, write to us within 7 days of paying and we will consider a refund. Once a registration is approved and listed, the fee is not refundable. A rejection because the information you gave was false or misleading does not qualify for a refund.",
    ],
  },
  {
    id: "partial",
    title: "Part payments and partial refunds",
    body: [
      "The fee can be paid in parts. A refund is made against the specific payment that qualifies. We may refund part of a payment where only part of it was due (for example an excess amount). Your fee balance is updated to match, and if what you have paid then falls below the minimum first payment, your registration may be put on hold until the balance is paid again.",
    ],
  },
  {
    id: "donations",
    title: "Donations",
    body: [
      "Donations are given freely for seva and are generally not refundable. If you donated by mistake, for the wrong amount, or twice, write to us within 7 days with your name, the date, the amount and the payment reference, and we will refund the error after checking it.",
    ],
  },
  {
    id: "fees",
    title: "Payment gateway charges",
    body: [
      "Razorpay may charge a fee to process a payment. If you paid that fee on top of the amount, it is not returned with a refund, because the gateway keeps it. The refund is for the amount that was due to us.",
    ],
  },
  {
    id: "how-to-ask",
    title: "How to ask for a refund",
    body: [
      `Email ${CONTACT.email} from the address on your account. Please include your name, the date and amount of the payment, and the payment or receipt reference (you will find it in the receipt email and on your profile). Tell us briefly why you are asking.`,
      "We will reply after checking the payment, and tell you whether it is approved. We may ask for more information to confirm that the request is genuine.",
    ],
  },
  {
    id: "timeline",
    title: "How long it takes",
    body: [
      "Once a refund is approved we start it straight away. It is sent back to the original payment method (card, UPI or bank account) through Razorpay and usually reaches you within 5 to 7 working days, depending on your bank. You will see a \"Refund initiated\" note in your notifications on the website. If it has not arrived after 10 working days, write to us with the payment reference.",
    ],
  },
  {
    id: "cancel",
    title: "Cancelling your registration or account",
    body: [
      `You can ask us to close your account or withdraw a registration at any time by writing to ${CONTACT.email}. Closing an account does not by itself entitle you to a refund; the sections above decide that.`,
    ],
  },
];;
