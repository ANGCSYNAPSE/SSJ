"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  HandHeart,
  Utensils,
  GraduationCap,
  XCircle,
  Soup,
  Home,
  BookOpen,
  UserRound,
  Briefcase,
  PlusSquare,
  Lock,
  CreditCard,
  Building2,
  Smartphone,
  QrCode,
  Wallet,
  ShieldCheck,
  FileBadge2,
  BarChart3,
  Crown,
  Shield,
  Sparkles,
  Check,
  Phone,
  Mail,
  Star,
  Minus,
  Plus,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";
import { API_URL } from "@/lib/api";

const impactStats = [
  { icon: Users, value: "25,000+", label: "Community Members" },
  { icon: HandHeart, value: "₹1.8 Cr+", label: "Donations Raised" },
  { icon: Utensils, value: "4,50,000+", label: "Meals Served" },
  { icon: GraduationCap, value: "850+", label: "Students Supported" },
  { icon: XCircle, value: "120+", label: "Families Assisted" },
];

const amountTiers = ["₹501", "₹1,100", "₹2,100", "₹5,100", "₹11,000", "Custom"];

const causes = [
  { icon: Soup, label: "Annadan" },
  { icon: Home, label: "Old Age Home" },
  { icon: BookOpen, label: "Education" },
  { icon: UserRound, label: "Women Empowerment" },
  { icon: Briefcase, label: "Employment" },
  { icon: XCircle, label: "Marriage Bureau" },
  { icon: PlusSquare, label: "Medical Support" },
  { icon: XCircle, label: "Temple Dev." },
];

const paymentMethods = [
  { icon: CreditCard, label: "Credit / Debit Card" },
  { icon: Building2, label: "Net Banking" },
  { icon: Smartphone, label: "UPI" },
  { icon: QrCode, label: "QR Code" },
  { icon: Wallet, label: "Wallet" },
];

const donors = [
  { name: "Rahul Sharma", time: "2 hours ago", amount: "₹1,100", cause: "Education Fund", avatar: "/images/donation/avatars/rahul.png" },
  { name: "Neha Gupta", time: "Yesterday", amount: "₹5,100", cause: "Annadan", avatar: "/images/donation/avatars/neha.png" },
  { name: "Anonymous", time: "Today", amount: "₹2,100", cause: "Women Empowerment", avatar: "/images/donation/avatars/anonymous.png" },
  { name: "Sunil Ji", time: "3 days ago", amount: "₹11,000", cause: "Temple Dev.", avatar: "/images/donation/avatars/sunil.png" },
  { name: "Priya Devi", time: "1 week ago", amount: "₹501", cause: "Old Age Home", avatar: "/images/donation/avatars/priya.png" },
];

const testimonials = [
  { text: "Supporting Shyam Jagat gave me immense peace. Knowing that my donation helped educate children and feed families is truly fulfilling.", name: "Amit Verma", place: "Delhi" },
  { text: "The transparency and regular updates make me feel connected to every initiative. Proud to contribute.", name: "Priya Sharma", place: "Jaipur" },
  { text: "Serving through donations is another form of devotion. Shyam Jagat has created a wonderful platform.", name: "Sunil Agarwal", place: "Mumbai" },
];

const breakdown = [
  { pct: 35, label: "Annadan" },
  { pct: 25, label: "Education" },
  { pct: 15, label: "Women Empowerment" },
  { pct: 10, label: "Old Age Home" },
  { pct: 10, label: "Employment" },
  { pct: 5, label: "Temple Dev." },
];

const plans = [
  {
    key: "sadasya",
    icon: XCircle,
    title: "सदस्य",
    subtitle: "Begin Your Journey",
    price: "Free",
    period: "Forever",
    features: ["Monthly Newsletter", "Event Notifications", "Live Darshan Access", "Digital Wallpapers"],
    cta: "Register Now",
    note: null,
    variant: "light" as const,
  },
  {
    key: "karyakarta",
    icon: Sparkles,
    title: "कार्यकर्ता",
    subtitle: "Serve & Grow",
    price: "₹ 1,100",
    period: "/year",
    features: ["Special Darshan Access", "Seva Opportunities", "Temple Prasadam Monthly", "VIP Entry in Events"],
    cta: "Register Now →",
    note: "Cancel anytime · No hidden fees",
    variant: "dark" as const,
    badge: "Most Popular",
  },
  {
    key: "sanrakshak",
    icon: Crown,
    title: "संरक्षक",
    subtitle: "Ultimate Devotion",
    price: "₹ 11,000",
    period: "/year",
    features: ["Priority Seatings", "Name on Donor Wall", "Family Puja Inclusion", "Annual Retreat Invite"],
    cta: "Register Now",
    note: "Limited spots available",
    variant: "light" as const,
  },
  {
    key: "sevadar",
    icon: Shield,
    title: "सेवादार",
    subtitle: "Ultimate Protector",
    price: "₹ 51,000",
    period: "/year",
    features: [
      "All Patron Benefits",
      "Personal Pujari for Family Events",
      "Exclusive Temple Tours",
      "Direct Line to Trust Members",
      "Name on Temple Plaque",
    ],
    cta: "Register Now",
    note: "Limited spots available",
    variant: "light" as const,
    badge: "Premium",
  },
];

const faqsLeft = [
  { q: "Is my donation secure?", a: "Yes, all transactions are processed through 256-bit SSL encrypted gateways." },
  { q: "Can I donate monthly?" },
  { q: "Will I receive an 80G receipt?" },
  { q: "Can I donate anonymously?" },
];

const faqsRight = [
  { q: "How is the money utilized?", a: "We maintain 100% transparency. Funds are allocated across our 12+ active initiatives." },
  { q: "What is the minimum donation?" },
  { q: "Can I donate from outside India?" },
  { q: "How do I track my donation?" },
];

function ProgressRing({ pct }: { pct: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#e87722"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a?: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#d4af37]/25 py-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-semibold text-[#6b1f1f]">{q}</span>
        {open ? (
          <Minus className="h-5 w-5 shrink-0 text-[#7b2d2d]" aria-hidden />
        ) : (
          <Plus className="h-5 w-5 shrink-0 text-[#7b2d2d]" aria-hidden />
        )}
      </button>
      {open && a && <p className="mt-3 text-sm leading-[22px] text-[#8c8c8c]">{a}</p>}
    </div>
  );
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function DonationPage() {
  const [amount, setAmount] = useState("₹1,100");
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState("Annadan");
  const [payment, setPayment] = useState("UPI");
  const [anonymous, setAnonymous] = useState(false);
  const [wantReceipt, setWantReceipt] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", email: "", pan: "", message: "" });
  const [openFaqLeft, setOpenFaqLeft] = useState(0);
  const [openFaqRight, setOpenFaqRight] = useState(0);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  function resolveAmountInRupees(): number | null {
    if (amount === "Custom") {
      const value = Number(customAmount);
      return Number.isFinite(value) && value > 0 ? value : null;
    }
    const value = Number(amount.replace(/[₹,]/g, ""));
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayError("");
    setPaySuccess(false);

    const amountInRupees = resolveAmountInRupees();
    if (!amountInRupees) {
      setPayError("Please choose or enter a valid donation amount.");
      return;
    }
    if (!form.name || !form.phone || !form.email) {
      setPayError("Please fill in your name, phone, and email.");
      return;
    }

    setPaying(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Could not load the payment gateway. Check your connection and try again.");
      }

      const orderRes = await fetch(`${API_URL}/api/v1/donations/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInRupees,
          cause,
          donorName: form.name,
          email: form.email,
          phone: form.phone,
          anonymous,
          wantReceipt,
        }),
      });
      const orderPayload = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderPayload?.message ?? "Could not start the payment. Please try again.");
      }
      const order = orderPayload.data;

      const razorpay = new window.Razorpay!({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Shyam Jagat",
        description: `Donation — ${cause}`,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: { cause },
        theme: { color: "#e87722" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch(`${API_URL}/api/v1/donations/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyPayload = await verifyRes.json();
            if (!verifyRes.ok || !verifyPayload.data?.verified) {
              throw new Error("Payment could not be verified. Please contact support.");
            }
            setPaySuccess(true);
          } catch (err) {
            setPayError(err instanceof Error ? err.message : "Verification failed.");
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });
      razorpay.open();
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setPaying(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-[140px] flex flex-col overflow-hidden pt-[140px]">
        <div className="relative flex items-center overflow-hidden px-6 py-16 lg:px-[100px] lg:py-20">
          <Image src="/images/donation/hero.png" alt="Devotees serving the community" fill sizes="100vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a0b0b]/80 to-[#2a0b0b]/0" />
          <div className="relative flex w-full max-w-[1440px] mx-auto flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="font-serif text-5xl font-bold leading-[1.1] text-white lg:text-[64px]">
                Support a Noble Cause
              </h1>
              <div className="h-1 w-[120px] bg-[#e87722]" />
            </div>
            <p className="text-lg leading-relaxed w-[700px] text-balance text-[#fdf6ec]">
              Every contribution helps us serve society through education, healthcare, women empowerment, old age care, annadan, and spiritual initiatives.
            </p>
            <div className="flex flex-wrap gap-5">
              <a
                href="#donate"
                className="rounded-full bg-[#e87722] px-8 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Donate Now
              </a>
              <a
                href="#impact"
                className="rounded-full border-2 border-white px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                See Our Impact
              </a>
            </div>
          </div>
        </div>
        <div id="impact" className="flex flex-wrap items-center justify-between gap-8 bg-[#fdf6ec] px-6 py-8 lg:px-20">
          {impactStats.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="flex shrink-0 items-center justify-center rounded-xl bg-[#e87722] p-2.5">
                <s.icon className="h-6 w-6 text-white" aria-hidden />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-serif text-2xl font-semibold text-[#6b1f1f]">{s.value}</p>
                <p className="text-[13px] text-[#444]">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AD - LEADERBOARD */}
      <AdSlot size="leaderboard" />

      {/* DONATION SECTION */}
      <section id="donate" className="bg-white px-6 py-16 lg:p-[100px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16 lg:flex-row">
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col gap-10 rounded-[28px] bg-white p-6 shadow-[0_20px_30px_rgba(107,31,31,0.1)] lg:p-12"
          >
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
                    className={
                      amount === tier
                        ? "w-[155px] rounded-xl bg-[#e87722] px-6 py-3 text-[15px] font-semibold text-white"
                        : "w-[155px] rounded-xl border-[1.5px] border-[#6b1f1f] bg-[#fdf6ec] px-6 py-3 text-[15px] font-semibold text-[#6b1f1f]"
                    }
                  >
                    {tier}
                  </button>
                ))}
              </div>
              {amount === "Custom" && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-[#444]">Custom Amount</p>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter custom amount in ₹"
                    className="h-[52px] rounded-[10px] border border-[#e5e7eb] bg-[#fdf6ec] px-4 text-sm text-[#3e1815] placeholder-[#8c8c8c] focus:border-[#e87722] focus:outline-none"
                  />
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
                    onClick={() => setCause(c.label)}
                    className={
                      cause === c.label
                        ? "flex w-[112px] flex-col items-center gap-2 rounded-2xl border-2 border-[#e87722] bg-[#fff3e0] p-4"
                        : "flex w-[112px] flex-col items-center gap-2 rounded-2xl border-2 border-transparent bg-[#fdf6ec] p-4"
                    }
                  >
                    <c.icon className="h-6 w-6 text-[#6b1f1f]" aria-hidden />
                    <span className="text-center text-[11px] font-bold text-[#6b1f1f]">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#444]">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="h-[52px] rounded-[10px] border border-[#e5e7eb] bg-[#fdf6ec] px-4 text-sm text-[#3e1815] placeholder-[#8c8c8c] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#444]">Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="h-[52px] rounded-[10px] border border-[#e5e7eb] bg-[#fdf6ec] px-4 text-sm text-[#3e1815] placeholder-[#8c8c8c] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#444]">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="h-[52px] rounded-[10px] border border-[#e5e7eb] bg-[#fdf6ec] px-4 text-sm text-[#3e1815] placeholder-[#8c8c8c] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#444]">PAN Number (Optional)</label>
                  <input
                    name="pan"
                    value={form.pan}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    className="h-[52px] rounded-[10px] border border-[#e5e7eb] bg-[#fdf6ec] px-4 text-sm text-[#3e1815] placeholder-[#8c8c8c] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#444]">Message / Prayer</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="I seek Baba Shyam Ji's blessings for my family."
                  className="resize-none rounded-[10px] border border-[#e5e7eb] bg-[#fdf6ec] p-4 text-sm text-[#3e1815] placeholder-[#8c8c8c] focus:border-[#e87722] focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2.5 text-sm text-[#444]">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="h-[18px] w-[18px] rounded accent-[#e87722]"
                  />
                  Make my donation anonymous
                </label>
                <label className="flex items-center gap-2.5 text-sm text-[#444]">
                  <input
                    type="checkbox"
                    checked={wantReceipt}
                    onChange={(e) => setWantReceipt(e.target.checked)}
                    className="h-[18px] w-[18px] rounded accent-[#e87722]"
                  />
                  Receive 80G Tax Receipt
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {payError && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {payError}
                </p>
              )}
              {paySuccess && (
                <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  Thank you for your generosity! Jai Shree Shyam. 🙏
                </p>
              )}
              <button
                type="submit"
                disabled={paying}
                className="rounded-2xl bg-gradient-to-r from-[#e87722] to-[#d16206] py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {paying ? "Processing…" : "Donate Securely →"}
              </button>
              <div className="flex items-center justify-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#8c8c8c]" aria-hidden />
                <p className="text-xs text-[#8c8c8c]">256-bit SSL Encrypted Payment</p>
              </div>
            </div>
          </form>

          <div className="flex w-full flex-col gap-12 lg:w-[520px] lg:shrink-0">
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
                    className={
                      payment === m.label
                        ? "relative flex items-center gap-4 rounded-2xl border-2 border-[#e87722] bg-white p-5"
                        : "flex items-center gap-4 rounded-2xl border border-[#f3f4f6] bg-white p-5"
                    }
                  >
                    {payment === m.label && (
                      <span className="absolute -left-0.5 top-[13px] h-[22px] w-1 rounded-sm bg-[#e87722]" />
                    )}
                    <m.icon className="h-6 w-6 text-[#3e1815]" aria-hidden />
                    <span className="text-xs font-medium text-[#444]">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-[20px] bg-maroon p-8">
              <p className="text-[15px] leading-6 text-white">
                Your donation is 100% secure. We use 256-bit SSL encryption and are registered under 80G, 12A, and FCRA.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-[18px] w-[18px] text-[#e87722]" aria-hidden />
                  <p className="text-sm font-semibold text-white">SSL Secure Encryption</p>
                </div>
                <div className="flex items-center gap-3">
                  <FileBadge2 className="h-[18px] w-[18px] text-[#e87722]" aria-hidden />
                  <p className="text-sm font-semibold text-white">80G Tax Certified</p>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-[18px] w-[18px] text-[#e87722]" aria-hidden />
                  <p className="text-sm font-semibold text-white">Transparent Reporting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT DONORS */}
      <section className="bg-[#fdf6ec] px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
              Community Contributions
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="text-lg leading-relaxed text-[#8c8c8c]">
              Join thousands who are making a difference every day.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {donors.map((d) => (
              <div key={d.name} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_8px_12px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image src={d.avatar} alt={d.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-bold text-[#444]">{d.name}</p>
                    <p className="text-xs text-[#8c8c8c]">{d.time}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-2xl font-bold text-[#6b1f1f]">{d.amount}</p>
                  <p className="text-[13px] font-medium text-[#e87722]">{d.cause}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* STORIES OF FAITH & SERVICE */}
      <section className="bg-white px-6 py-16 lg:p-[100px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
              Stories of Faith &amp; Service
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="text-lg leading-relaxed text-[#8c8c8c]">
              Join thousands who are making a difference every day.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col gap-6 rounded-[20px] bg-[#fdf6ec] p-8">
                <p className="text-5xl leading-6 text-[#e87722]">&ldquo;</p>
                <p className="italic leading-[26px] text-[#444]">{t.text}</p>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#e87722] text-[#e87722]" aria-hidden />
                    ))}
                  </div>
                  <p className="font-serif text-xl font-bold text-[#6b1f1f]">{t.name}</p>
                  <p className="text-sm text-[#8c8c8c]">{t.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="bg-maroon px-6 py-16 lg:p-[100px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-white lg:text-[48px]">
              Where Your Donation Goes
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="text-lg leading-relaxed text-[#fdf6ec]">
              Complete transparency in how every rupee is utilized.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {breakdown.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.07] p-6">
                <div className="relative h-[100px] w-[100px]">
                  <ProgressRing pct={b.pct} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Utensils className="h-8 w-8 text-white/70" aria-hidden />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-2xl font-bold text-white">{b.pct}%</p>
                  <p className="text-sm text-[#fdf6ec]/80">{b.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PRICING */}
      <section className="flex flex-col items-center gap-10 bg-[#fdf6ec] px-6 py-16 lg:px-[120px] lg:py-[72px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-[#e87722] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Membership Plans
          </span>
          <h2 className="font-serif text-4xl font-extrabold leading-[1.1] text-[#3d1010] lg:text-[52px]">
            Choose Your Path of Devotion
          </h2>
          <div className="h-0.5 w-[120px] bg-[#e87722]" />
          <p className="max-w-[600px] text-base leading-relaxed text-[#6b1f1f] opacity-75">
            Join the Shyam Jagat family and be a part of something truly meaningful.
          </p>
        </div>
        <div className="grid w-full gap-6 lg:grid-cols-4">
          {plans.map((plan) => {
            const dark = plan.variant === "dark";
            return (
              <div
                key={plan.key}
                className={
                  dark
                    ? "relative flex flex-col gap-5 rounded-[28px] bg-[#3d1010] p-8 shadow-[0_0_60px_rgba(232,119,34,0.21),0_18px_44px_rgba(0,0,0,0.15)] lg:p-10"
                    : "relative flex flex-col gap-5 rounded-3xl border-[1.5px] border-[#e8ddd0] bg-white p-8 shadow-[0_18px_20px_rgba(0,0,0,0.07)] lg:p-10"
                }
              >
                {plan.badge && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e87722] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                    {plan.badge}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={
                      dark
                        ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fdf6ec]"
                        : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e8ddd0] bg-[#fdf6ec]"
                    }
                  >
                    <plan.icon className={dark ? "h-5 w-5 text-[#3d1010]" : "h-5 w-5 text-[#3d1010]"} aria-hidden />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <p className={dark ? "font-serif text-[28px] font-extrabold text-[#fdf6ec]" : "font-serif text-[28px] font-extrabold text-[#3d1010]"}>
                      {plan.title}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#e87722]">{plan.subtitle}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className={dark ? "font-serif text-4xl font-extrabold text-white" : "font-serif text-4xl font-extrabold text-[#3d1010]"}>
                    {plan.price}
                  </p>
                  <p className={dark ? "text-sm text-[#fdf6ec]/90" : "text-sm text-[#6b1f1f] opacity-70"}>{plan.period}</p>
                </div>
                <div className={dark ? "h-px bg-[#e87722] opacity-55" : "h-px bg-[#e87722] opacity-35"} />
                <div className="flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e87722]">
                        <Check className="h-3.5 w-3.5 text-white" aria-hidden />
                      </span>
                      <p className={dark ? "text-[15px] text-white" : "text-[15px] text-[#3d1010]"}>{f}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/signup"
                    className={
                      dark
                        ? "flex h-14 items-center justify-center rounded-2xl bg-[#e87722] text-sm font-bold uppercase text-white transition-opacity hover:opacity-90"
                        : plan.key === "sadasya"
                          ? "flex h-[52px] items-center justify-center rounded-2xl border-[1.5px] border-[#3d1010] text-sm font-bold uppercase text-[#3d1010]"
                          : "flex h-[52px] items-center justify-center rounded-2xl bg-[#e87722] text-sm font-bold uppercase text-white transition-opacity hover:opacity-90"
                    }
                  >
                    {plan.cta}
                  </Link>
                  {plan.note && (
                    <p className={dark ? "text-center text-xs text-[#fdf6ec]/85" : "text-center text-xs text-[#6b1f1f] opacity-70"}>
                      {plan.note}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm text-[#6b1f1f] opacity-65">
          🔒 Secure payment · 100% transparent · 80G tax benefits available
        </p>
      </section>

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta="Explore" />

      {/* FAQ */}
      <section className="bg-white px-6 py-16 lg:p-[100px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
              Frequently Asked Questions
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
          </div>
          <div className="grid gap-x-16 lg:grid-cols-2">
            <div className="flex flex-col">
              {faqsLeft.map((item, i) => (
                <FaqItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  open={openFaqLeft === i}
                  onToggle={() => setOpenFaqLeft(openFaqLeft === i ? -1 : i)}
                />
              ))}
            </div>
            <div className="flex flex-col">
              {faqsRight.map((item, i) => (
                <FaqItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  open={openFaqRight === i}
                  onToggle={() => setOpenFaqRight(openFaqRight === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="flex flex-col items-center gap-10 bg-[#fdf6ec] px-6 py-16 text-center lg:px-[120px] lg:py-24">
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3d1010] sm:text-[52px]">
            Together, We Can Make a Difference
          </h2>
          <p className="max-w-[800px] text-lg italic leading-relaxed text-[#888]">
            &quot;Your contribution is more than a donation-it is a blessing that helps transform lives.&quot;
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="#donate"
            className="rounded-full bg-[#e87722] px-9 py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Donate Today
          </a>
          <Link
            href="/signup"
            className="rounded-full border-2 border-[#3d1010] bg-[#fdf6ec] px-9 py-4 text-[15px] font-semibold text-[#3d1010] transition-colors hover:bg-[#3d1010]/5"
          >
            Become a Volunteer
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[#666]" aria-hidden />
            <p className="text-sm text-[#666]">+91 12345 67890</p>
          </div>
          <span className="hidden h-[18px] w-px bg-[#bbb] sm:block" />
          <a href="mailto:contact@shyamjagat.org" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#666]" aria-hidden />
            <p className="text-sm text-[#666]">contact@shyamjagat.org</p>
          </a>
        </div>
      </section>
    </>
  );
}
