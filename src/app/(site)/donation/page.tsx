"use client";
import Ornament from "@/components/ui/Ornament";

import { useEffect, useState, type ComponentType } from "react";
import { CONTACT, telHref } from "@/lib/constants";
import PolicyLink from "@/components/legal/PolicyDialog";
import Image from "next/image";
import Link from "next/link";
import {
  Ambulance,
  BadgeCheck,
  BookOpen,
  Building2,
  CreditCard,
  Droplets,
  FileBadge2,
  Footprints,
  HandHeart,
  Heart,
  Home,
  Lock,
  Mail,
  Minus,
  Phone,
  Plus,
  QrCode,
  ShieldCheck,
  Smartphone,
  Soup,
  Sprout,
  Stethoscope,
  Umbrella,
  UserRound,
  Wallet,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";
import { useAuth } from "@/components/auth/AuthProvider";
import StoriesSoon from "@/components/home/StoriesSoon";
import RecentOfferings from "@/components/donation/RecentOfferings";
import { API_URL } from "@/lib/api";
import { CheckoutDismissed, openRazorpayCheckout } from "@/lib/razorpay";
import { SEVA_TYPES } from "@/lib/data/seva";

type Icon = ComponentType<{ className?: string }>;

const AMOUNT_MIN = 11;
const amountTiers = ["₹501", "₹1,100", "₹2,100", "₹5,100", "₹11,000", "Custom"];

/** What a donation can go towards: the services of Our Initiatives (the same ones as the Seva forms), or wherever it is needed most. */
const CAUSE_ICONS: Record<string, Icon> = {
  annadan: Soup,
  gaushala: Sprout,
  education: BookOpen,
  "pani-ki-pyau": Droplets,
  "juta-seva": Footprints,
  health: Stethoscope,
  ambulance: Ambulance,
  vriddhashram: Home,
  "rain-basera": Umbrella,
};
const NEEDED_MOST = { slug: "", label: "Where it is needed most", icon: Heart as Icon };
const causes: { slug: string; label: string; icon: Icon }[] = [
  ...SEVA_TYPES.filter((s) => !s.special).map((s) => ({ slug: s.slug, label: s.title.split(" (")[0], icon: CAUSE_ICONS[s.slug] ?? Heart })),
  NEEDED_MOST,
];

/** The ways of paying, and the way of paying the payment window is told to show. */
const paymentMethods: { icon: Icon; label: string; method: "card" | "netbanking" | "upi" | "wallet" }[] = [
  { icon: CreditCard, label: "Credit / Debit Card", method: "card" },
  { icon: Building2, label: "Net Banking", method: "netbanking" },
  { icon: Smartphone, label: "UPI", method: "upi" },
  { icon: QrCode, label: "QR Code (UPI)", method: "upi" },
  { icon: Wallet, label: "Wallet", method: "wallet" },
];

const assurances = [
  { icon: ShieldCheck, label: "Secure payment by Razorpay" },
  { icon: FileBadge2, label: "A receipt for every offering" },
  { icon: UserRound, label: "Your seva saved in your profile" },
  { icon: HandHeart, label: "You choose what it goes towards" },
];

const goes = [
  { icon: HandHeart, title: "You choose", text: "Pick the seva when you give. Your offering is recorded for it, and the receipt says what it was for." },
  { icon: FileBadge2, title: "A receipt", text: "Every offering gets a receipt by email, with the amount and the seva." },
  { icon: UserRound, title: "In your profile", text: "Sign in with the same email, and every offering is listed under Payments & seva in your profile." },
  { icon: Sprout, title: "Shared openly", text: "We aim to share how offerings are used as each seva begins. Seva starts place by place, as support allows." },
];

const faqsLeft = [
  { q: "Is my donation secure?", a: "Payments are taken by Razorpay, a licensed payment gateway, in its own payment window. We never see or store your card, UPI or bank details." },
  { q: "Can I donate monthly?", a: "Not as an automatic monthly payment yet. You can give any time you wish, and many devotees give on every Ekadashi. We aim to add monthly giving later." },
  { q: "Will I receive a receipt?", a: "Yes. When you leave \"Send me a receipt\" ticked, a receipt comes to your email, with the amount and the seva it was for. If you need a receipt for tax purposes, please write to us before you give, and we will tell you what we can issue." },
  { q: "Can I donate anonymously?", a: "Yes. Tick \"Keep my donation private\" and your name will not be shown on the website. We still keep your details, so we can send your receipt." },
];

const faqsRight = [
  { q: "How is the money used?", a: "It goes towards the seva you choose when you give: food, water, care for cows, children's learning, health and more. Seva starts place by place, as support allows, and we aim to share openly how offerings are used." },
  { q: "What is the minimum donation?", a: "You can give any amount from ₹11. The amounts on this page are only suggestions; choose Custom to write your own." },
  { q: "Can I donate from outside India?", a: "It depends on the card or account you pay with, and on what the payment gateway allows for it. If your payment does not go through, please write to us and we will help." },
  { q: "How do I track my donation?", a: "Sign in with the email you used to give. Your offerings and their receipts are listed in your profile, under Payments & seva. If you gave without signing in, use the same email when you create your account." },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#d4af37]/25 py-6">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 text-left">
        <span className="font-semibold text-[#6b1f1f]">{q}</span>
        {open ? <Minus className="h-5 w-5 shrink-0 text-[#7b2d2d]" aria-hidden /> : <Plus className="h-5 w-5 shrink-0 text-[#7b2d2d]" aria-hidden />}
      </button>
      {open && <p className="mt-3 text-sm leading-[22px] text-[#6b6b6b]">{a}</p>}
    </div>
  );
}

const inputClass = "h-[52px] rounded-[10px] border border-[#e5e7eb] bg-[#fdf6ec] px-4 text-sm text-[#3e1815] placeholder-[#8c8c8c] focus:border-[#e87722] focus:outline-none";

export default function DonationPage() {
  const { user } = useAuth();
  const [amount, setAmount] = useState("₹1,100");
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState(NEEDED_MOST.slug);
  const [payment, setPayment] = useState(paymentMethods[2].label);
  const [anonymous, setAnonymous] = useState(false);
  const [wantReceipt, setWantReceipt] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [openFaqLeft, setOpenFaqLeft] = useState(0);
  const [openFaqRight, setOpenFaqRight] = useState(0);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);
  const [fee, setFee] = useState<{ total: number; minimum: number } | null>(null);

  // A link from another page can say what to give for: /donation?cause=education
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("cause");
    if (wanted && causes.some((c) => c.slug === wanted)) setCause(wanted);
  }, []);

  // Someone signed in gives from their own account: their details come in, and the email stays theirs, so it shows in their profile.
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({ ...f, name: f.name || user.fullName, phone: f.phone || user.mobile || "", email: user.email }));
  }, [user]);

  // The membership fee, as the admin has set it (never written into the page).
  useEffect(() => {
    fetch(`${API_URL}/api/v1/payments/fee`)
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => p?.data && setFee({ total: p.data.total, minimum: p.data.minimum }))
      .catch(() => undefined);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  function resolveAmountInRupees(): number | null {
    const value = amount === "Custom" ? Number(customAmount) : Number(amount.replace(/[₹,]/g, ""));
    return Number.isFinite(value) && value >= AMOUNT_MIN ? value : null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayError("");
    setPaySuccess(false);

    const amountInRupees = resolveAmountInRupees();
    if (!amountInRupees) {
      setPayError(`Please choose an amount, or write your own (at least ₹${AMOUNT_MIN}).`);
      return;
    }
    if (!form.name.trim() || !form.phone.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setPayError("Please fill in your name, phone number and a valid email.");
      return;
    }

    const chosen = causes.find((c) => c.slug === cause) ?? NEEDED_MOST;
    const method = paymentMethods.find((m) => m.label === payment)?.method;

    setPaying(true);
    try {
      const orderRes = await fetch(`${API_URL}/api/v1/donations/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInRupees,
          cause: chosen.label,
          ...(chosen.slug ? { sevaType: chosen.slug } : {}),
          donorName: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          anonymous,
          wantReceipt,
          message: form.message.trim() || undefined,
          payMethod: method === "wallet" || method === "netbanking" || method === "card" || method === "upi" ? method : "any",
        }),
      });
      const orderPayload = await orderRes.json().catch(() => null);
      if (!orderRes.ok) throw new Error(orderPayload?.message ?? "Could not start the payment. Please try again.");
      const order = orderPayload.data as { orderId: string; amount: number; currency: string; keyId: string };

      const response = await openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        label: `Donation: ${chosen.label}`,
        prefill: { name: form.name.trim(), email: form.email.trim(), contact: form.phone.trim() },
        method,
      });

      const verifyRes = await fetch(`${API_URL}/api/v1/donations/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });
      const verified = await verifyRes.json().catch(() => null);
      if (!verifyRes.ok || !verified?.data?.verified) throw new Error("We could not confirm the payment just now. If money was taken from your account, please call us with your payment reference and we will trace it.");
      setPaySuccess(true);
    } catch (err) {
      if (err instanceof CheckoutDismissed) setPayError("The payment window was closed. Nothing was charged. Press the button when you are ready.");
      else setPayError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  // Someone signed in has no need of the signup page (it sends them to the home page), so these go to their own profile.
  const joinHref = user ? "/profile" : "/signup";
  const volunteerHref = user ? "/profile" : "/signup?register=volunteer";

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-[112px] flex flex-col overflow-hidden">
        <div className="relative flex min-h-[560px] items-center overflow-hidden px-6 pb-16 pt-[calc(112px+56px)] lg:min-h-[700px] lg:px-[100px] lg:pb-24 lg:pt-[calc(112px+64px)]">
          <Image src="/images/donation/hero.png" alt="Devotees serving the community" fill sizes="100vw" priority className="origin-top scale-[1.12] object-cover object-[50%_10%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a0b0b]/80 to-[#2a0b0b]/0" />
          <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="font-serif text-5xl font-bold leading-[1.1] text-white lg:text-[64px]">Support a Noble Cause</h1>
              <Ornament />
            </div>
            <p className="w-full max-w-[700px] text-balance text-lg leading-relaxed text-[#fdf6ec]">
              Every contribution helps us serve through food, water, care for cows, children&apos;s learning, health care and more, in the spirit of seva.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#donate" className="rounded-full bg-[#e87722] px-8 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
                Donate Now
              </a>
              <a href="#how" className="rounded-full border-2 border-white px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10">
                How Your Donation Is Used
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 bg-[#fdf6ec] px-6 py-8 lg:px-20">
          {assurances.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="flex shrink-0 items-center justify-center rounded-xl bg-[#e87722] p-2.5">
                <s.icon className="h-6 w-6 text-white" aria-hidden />
              </span>
              <p className="text-[14px] font-semibold text-[#6b1f1f]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AD - LEADERBOARD */}
      <AdSlot size="leaderboard" />

      {/* DONATION SECTION */}
      <section id="donate" className="scroll-mt-28 bg-white px-6 py-16 lg:p-[100px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16 xl:flex-row">
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-10 rounded-[28px] bg-white p-6 shadow-[0_20px_30px_rgba(107,31,31,0.1)] lg:p-12">
            <div className="flex flex-col gap-4">
              <p className="text-[13px] font-bold uppercase text-[#e87722]">Make a Donation</p>
              <h2 className="font-serif text-[36px] font-semibold text-[#6b1f1f]">Choose Your Offering</h2>
              <div className="h-0.5 w-20 bg-[#e87722]" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-[#444]">Donation Amount</p>
              <div className="flex flex-wrap gap-3">
                {amountTiers.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setAmount(tier)}
                    className={amount === tier ? "w-[155px] rounded-xl bg-[#e87722] px-6 py-3 text-[15px] font-semibold text-white" : "w-[155px] rounded-xl border-[1.5px] border-[#6b1f1f] bg-[#fdf6ec] px-6 py-3 text-[15px] font-semibold text-[#6b1f1f]"}
                  >
                    {tier}
                  </button>
                ))}
              </div>
              {amount === "Custom" && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-[#444]">Custom Amount</p>
                  <input type="number" min={AMOUNT_MIN} value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} placeholder={`Enter your own amount in ₹ (at least ${AMOUNT_MIN})`} className={inputClass} />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-[#444]">Donate For</p>
              <div className="flex flex-wrap gap-3">
                {causes.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setCause(c.slug)}
                    aria-pressed={cause === c.slug}
                    className={
                      cause === c.slug
                        ? "flex w-[116px] flex-col items-center gap-2.5 rounded-t-[58px] rounded-b-2xl border-2 border-[#e87722] bg-gradient-to-b from-[#ffd9a0] to-[#fff3e0] px-3 pb-3.5 pt-5 shadow-[0_10px_22px_rgba(232,119,34,0.25)] transition-all"
                        : "flex w-[116px] flex-col items-center gap-2.5 rounded-t-[58px] rounded-b-2xl border-2 border-[#e8ddd0] bg-[#fffaf3] px-3 pb-3.5 pt-5 transition-all hover:-translate-y-1 hover:border-[#e0b94f]"
                    }
                  >
                    <span className={cause === c.slug ? "flex h-11 w-11 items-center justify-center rounded-full bg-[#e87722] text-white shadow-md" : "flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#9b5a12] shadow-sm"}>
                      <c.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-center text-[11px] font-bold leading-tight text-[#6b1f1f]">{c.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#8c8c8c]">
                {"For something that is not on this list, you can also give a "}
                <Link href="/seva" className="font-semibold text-[#e47105] hover:underline">{"seva of your own wish"}</Link>
                {"."}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="d-name" className="text-sm font-semibold text-[#444]">Full Name</label>
                  <input id="d-name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" autoComplete="name" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="d-phone" className="text-sm font-semibold text-[#444]">Phone Number</label>
                  <input id="d-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" inputMode="tel" autoComplete="tel" className={inputClass} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="d-email" className="text-sm font-semibold text-[#444]">
                  Email Address <span className="font-normal text-[#8c8c8c]">{user ? "(your account's email)" : "(your receipt comes here)"}</span>
                </label>
                <input id="d-email" name="email" type="email" value={form.email} onChange={handleChange} readOnly={!!user} placeholder="rahul@example.com" autoComplete="email" className={`${inputClass} ${user ? "cursor-not-allowed bg-[#faf6ef] text-[#6b6b6b]" : ""}`} />
                <span className="text-xs text-[#8c8c8c]">{user ? "This donation will be saved in your profile." : "To see this donation in your profile later, use the email of your Shyam Jagat account."}</span>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="d-message" className="text-sm font-semibold text-[#444]">Message / Prayer <span className="font-normal text-[#8c8c8c]">(optional)</span></label>
                <textarea id="d-message" name="message" value={form.message} onChange={handleChange} rows={4} maxLength={400} placeholder="I seek Baba Shyam Ji's blessings for my family." className="resize-none rounded-[10px] border border-[#e5e7eb] bg-[#fdf6ec] p-4 text-sm text-[#3e1815] placeholder-[#8c8c8c] focus:border-[#e87722] focus:outline-none" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2.5 text-sm text-[#444]">
                  <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-[18px] w-[18px] rounded accent-[#e87722]" />
                  Keep my donation private (do not show my name on the website)
                </label>
                <label className="flex items-center gap-2.5 text-sm text-[#444]">
                  <input type="checkbox" checked={wantReceipt} onChange={(e) => setWantReceipt(e.target.checked)} className="h-[18px] w-[18px] rounded accent-[#e87722]" />
                  Send me a receipt by email
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {payError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{payError}</p>}
              {paySuccess && (
                <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  Thank you for your generosity! Jai Shree Shyam. {wantReceipt ? "Your receipt is on its way to your email." : ""}
                </p>
              )}
              <button type="submit" disabled={paying} className="rounded-2xl bg-gradient-to-r from-[#e87722] to-[#d16206] py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
                {paying ? "Processing…" : "Donate Securely →"}
              </button>
              <div className="flex items-center justify-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#8c8c8c]" aria-hidden />
                <p className="text-xs text-[#8c8c8c]">Secure payment by Razorpay</p>
              </div>
              <p className="text-center text-xs text-[#8c8c8c]">
                {"By donating you agree to our "}
                <PolicyLink doc="terms" with={["privacy", "refund"]}>{"Terms of Service"}</PolicyLink>
                {", "}
                <PolicyLink doc="privacy" with={["terms", "refund"]}>{"Privacy Policy"}</PolicyLink>
                {" and "}
                <PolicyLink doc="refund" with={["terms", "privacy"]}>{"Refund Policy"}</PolicyLink>
                {"."}
              </p>
            </div>
          </form>

          <div className="flex w-full flex-col gap-12 xl:w-[520px] xl:shrink-0">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-[13px] font-bold uppercase text-[#e87722]">Payment Options</p>
                <h3 className="font-serif text-[28px] font-bold text-[#6b1f1f]">Choose Payment Method</h3>
              </div>
              <div className="flex flex-col gap-3">
                {paymentMethods.map((m) => (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setPayment(m.label)}
                    aria-pressed={payment === m.label}
                    className={payment === m.label ? "relative flex items-center gap-4 rounded-2xl border-2 border-[#e87722] bg-white p-5" : "flex items-center gap-4 rounded-2xl border border-[#f3f4f6] bg-white p-5 transition-colors hover:border-[#e0b94f]"}
                  >
                    {payment === m.label && <span className="absolute -left-0.5 top-[13px] h-[22px] w-1 rounded-sm bg-[#e87722]" />}
                    <m.icon className="h-6 w-6 text-[#3e1815]" aria-hidden />
                    <span className="text-xs font-medium text-[#444]">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-[20px] bg-maroon p-8">
              <p className="text-[15px] leading-6 text-white">Your payment is taken by Razorpay, in its own window. We never see or store your card, UPI or bank details.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-[18px] w-[18px] text-[#e87722]" aria-hidden />
                  <p className="text-sm font-semibold text-white">Secure payment by Razorpay</p>
                </div>
                <div className="flex items-center gap-3">
                  <FileBadge2 className="h-[18px] w-[18px] text-[#e87722]" aria-hidden />
                  <p className="text-sm font-semibold text-white">A receipt by email for every offering</p>
                </div>
                <div className="flex items-center gap-3">
                  <UserRound className="h-[18px] w-[18px] text-[#e87722]" aria-hidden />
                  <p className="text-sm font-semibold text-white">Saved in your profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT OFFERINGS */}
      <section className="bg-[#fdf6ec] px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">Recent Offerings</h2>
            <Ornament />
            <p className="text-lg leading-relaxed text-[#8c8c8c]">The latest offerings from our devotees.</p>
          </div>
          <RecentOfferings />
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* STORIES: there are none yet, so the place is held with a note */}
      <section className="bg-white px-6 py-16 lg:p-[100px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">Stories of Faith &amp; Service</h2>
            <Ornament />
            <p className="text-lg leading-relaxed text-[#8c8c8c]">Stories of hope, from the people we serve and the people who serve.</p>
          </div>
          <StoriesSoon />
        </div>
      </section>

      {/* HOW YOUR DONATION IS USED */}
      <section id="how" className="scroll-mt-28 bg-maroon px-6 py-16 lg:p-[100px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-white lg:text-[48px]">How Your Donation Is Used</h2>
            <Ornament />
            <p className="text-lg leading-relaxed text-[#fdf6ec]">You choose the seva, and we aim to share openly how it is used.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {goes.map((g) => (
              <div key={g.title} className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.07] p-7 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e87722]/90 text-white">
                  <g.icon className="h-7 w-7" aria-hidden />
                </span>
                <p className="font-serif text-xl font-bold text-white">{g.title}</p>
                <p className="text-sm leading-relaxed text-[#fdf6ec]/80">{g.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/initiatives" className="inline-flex rounded-full border-2 border-white/70 px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-white/10">
              See the seva we work towards
            </Link>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP AND VOLUNTEERING */}
      <section className="flex flex-col items-center gap-10 bg-[#fdf6ec] px-6 py-16 lg:px-[120px] lg:py-[72px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-[#e87722] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Join Us</span>
          <h2 className="font-serif text-4xl font-extrabold leading-[1.1] text-[#3d1010] lg:text-[52px]">Be Part of the Shyam Jagat Family</h2>
          <Ornament />
          <p className="max-w-[600px] text-base leading-relaxed text-[#6b1f1f] opacity-75">Give your time, or become a member. Both begin with an account.</p>
        </div>
        <div className="grid w-full max-w-[980px] gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-3xl border-[1.5px] border-[#e8ddd0] bg-white p-8 shadow-[0_18px_20px_rgba(0,0,0,0.07)] lg:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8ddd0] bg-[#fdf6ec]">
                <HandHeart className="h-5 w-5 text-[#3d1010]" aria-hidden />
              </span>
              <div>
                <p className="font-serif text-[26px] font-extrabold text-[#3d1010]">Volunteer</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#e87722]">Give your time</p>
              </div>
            </div>
            <p className="font-serif text-3xl font-extrabold text-[#3d1010]">Free</p>
            <p className="text-[15px] leading-relaxed text-[#444]">Offer your time and skills to seva near you. You choose the seva you would like to help with, and our team gets in touch.</p>
            <Link href={volunteerHref} className="mt-auto flex h-[52px] items-center justify-center rounded-2xl border-[1.5px] border-[#3d1010] text-sm font-bold uppercase text-[#3d1010] transition-colors hover:bg-[#3d1010]/5">
              {user ? "Go to my profile" : "Join as a volunteer"}
            </Link>
          </div>
          <div className="flex flex-col gap-5 rounded-[28px] bg-[#3d1010] p-8 shadow-[0_0_60px_rgba(232,119,34,0.21),0_18px_44px_rgba(0,0,0,0.15)] lg:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fdf6ec]">
                <BadgeCheck className="h-5 w-5 text-[#3d1010]" aria-hidden />
              </span>
              <div>
                <p className="font-serif text-[26px] font-extrabold text-[#fdf6ec]">Member</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#e87722]">Become part of the family</p>
              </div>
            </div>
            <p className="font-serif text-3xl font-extrabold text-white">{fee ? `₹${fee.total.toLocaleString("en-IN")}` : "Registration fee"}</p>
            <p className="text-[15px] leading-relaxed text-[#fdf6ec]/90">
              {fee
                ? `Create your account and pay the registration fee. You can pay it in parts: the first payment is at least ₹${fee.minimum.toLocaleString("en-IN")}, and the rest whenever you are ready.`
                : "Create your account and pay the registration fee. You can pay it in parts, and the rest whenever you are ready."}
            </p>
            <Link href={joinHref} className="mt-auto flex h-14 items-center justify-center rounded-2xl bg-[#e87722] text-sm font-bold uppercase text-white transition-opacity hover:opacity-90">
              {user ? "Pay in my profile" : "Become a member"}
            </Link>
          </div>
        </div>
      </section>

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta="Explore" />

      {/* FAQ */}
      <section className="bg-white px-6 py-16 lg:p-[100px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">Frequently Asked Questions</h2>
            <Ornament />
          </div>
          <div className="grid gap-x-16 lg:grid-cols-2">
            <div className="flex flex-col">
              {faqsLeft.map((item, i) => (
                <FaqItem key={item.q} q={item.q} a={item.a} open={openFaqLeft === i} onToggle={() => setOpenFaqLeft(openFaqLeft === i ? -1 : i)} />
              ))}
            </div>
            <div className="flex flex-col">
              {faqsRight.map((item, i) => (
                <FaqItem key={item.q} q={item.q} a={item.a} open={openFaqRight === i} onToggle={() => setOpenFaqRight(openFaqRight === i ? -1 : i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="flex flex-col items-center gap-10 bg-[#fdf6ec] px-6 py-16 text-center lg:px-[120px] lg:py-24">
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3d1010] sm:text-[52px]">Together, We Can Make a Difference</h2>
          <p className="max-w-[800px] text-lg italic leading-relaxed text-[#888]">&quot;Your contribution is more than a donation; it is a blessing that helps transform lives.&quot;</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="#donate" className="rounded-full bg-[#e87722] px-9 py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
            Donate Today
          </a>
          <Link href={volunteerHref} className="rounded-full border-2 border-[#3d1010] bg-[#fdf6ec] px-9 py-4 text-[15px] font-semibold text-[#3d1010] transition-colors hover:bg-[#3d1010]/5">
            {user ? "Go to my profile" : "Become a Volunteer"}
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[#666]" aria-hidden />
            <a href={telHref(CONTACT.phone)} className="text-sm text-[#666] hover:text-[#e47105] hover:underline">{CONTACT.phone}</a>
          </div>
          <span className="hidden h-[18px] w-px bg-[#bbb] sm:block" />
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#666]" aria-hidden />
            <p className="text-sm text-[#666]">{CONTACT.email}</p>
          </a>
        </div>
      </section>
    </>
  );
}
