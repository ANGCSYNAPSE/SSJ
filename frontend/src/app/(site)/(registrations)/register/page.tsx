"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  WandSparkles,
  Music,
  Home,
  Bed,
  ShoppingBag,
  Users,
  Users2,
  Scroll,
  BookOpen,
  Calendar,
  Heart,
  MousePointer2,
  Edit3,
  ShieldCheck,
  Globe,
  Award,
  Headphones,
  Tag,
  ChevronDown,
  ArrowRight,
  Sparkle,
} from "lucide-react";

const categories = [
  {
    icon: Palette,
    title: "Artist",
    desc: "Showcase your spiritual art, paintings, and craftsmanship to the global community.",
    href: "/artist-registration",
  },
  {
    icon: WandSparkles,
    title: "Dancer",
    desc: "Share your classical and devotional dance performances at major festivals.",
    href: "/dancer-registration",
  },
  {
    icon: Music,
    title: "Musician",
    desc: "Bring divine melodies — kirtan, bhajan, and classical music instrumental.",
    href: "/musician-registration",
  },
  {
    icon: Home,
    title: "Temple",
    desc: "Register your temple, coordinate live streams, and manage devotee schedules.",
    href: "/temple-registration",
  },
  {
    icon: Bed,
    title: "Dharamshala",
    desc: "List your dharamshala or pilgrim accommodation for visiting travelers.",
    href: "/dharamshala-registration",
  },
  {
    icon: Users,
    title: "Organisation (Mandal)",
    desc: "Register your local religious, cultural, or community bhajan mandali.",
    href: "/mandal-registration",
  },
  {
    icon: Users2,
    title: "Community",
    desc: "Create or join a local devotee community group in your region.",
    href: "#",
  },
  {
    icon: Scroll,
    title: "Pandit / Purohit",
    desc: "Offer local or virtual puja, havan, and holy ceremonial services.",
    href: "#",
  },
  {
    icon: BookOpen,
    title: "Kathavachak",
    desc: "Share divine stories, host discourses, and spread devotional knowledge.",
    href: "#",
  },
  {
    icon: Calendar,
    title: "Event Organiser",
    desc: "Host, promote, and coordinate spiritual events, yatras, and celebrations.",
    href: "#",
  },
  {
    icon: Heart,
    title: "Volunteer",
    desc: "Contribute your time, skills, and energy to serve the holy community.",
    href: "#",
  },
  {
    icon: ShoppingBag,
    title: "Products",
    desc: "Sell spiritual goods — authentic puja items, books, clothing, and crafts.",
    href: "#",
  },
];

const steps = [
  {
    icon: MousePointer2,
    number: "01",
    title: "Choose Your Category",
    desc: "Select the profile that best aligns with your spiritual art, services, or organization.",
  },
  {
    icon: Edit3,
    number: "02",
    title: "Fill Your Details",
    desc: "Complete the secure registration form with your authentic credentials and portfolio.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Get Verified & Go Live",
    desc: "Our team will review your application. Once verified, you are immediately live!",
  },
];

const benefits = [
  {
    icon: Globe,
    title: "Nationwide Visibility",
    desc: "Reach millions of devotees actively looking for spiritual services and items.",
  },
  {
    icon: Award,
    title: "Verified Trust Badge",
    desc: "Earn a golden trust badge to showcase authenticity and build devotee confidence.",
  },
  {
    icon: Headphones,
    title: "Community Support",
    desc: "Get dedicated round-the-clock help from our digital seva support specialists.",
  },
  {
    icon: Tag,
    title: "Free Listing",
    desc: "Absolutely no hidden charges or fees to create your profile and start listing.",
  },
];

const testimonials = [
  {
    quote:
      "Singing bhajan at Khatu Shyam Ji events under Shyam Jagat's platform has been the absolute pinnacle of my career. The energy and management are purely spiritual.",
    avatar: "/images/register/avatar-mukesh.png",
    name: "Pandit Mukesh Sharma",
    role: "Bhajan Singer",
  },
  {
    quote:
      "Registering our historical temple brought us completely online. We now handle darshan bookings smoothly and can stream aarti to elders across the country.",
    avatar: "/images/register/avatar-ramdas.png",
    name: "Mahant Ramdas Ji",
    role: "Temple Administrator",
  },
  {
    quote:
      "As a classical Kathak dancer, finding the right spiritual platforms was hard. Shyam Jagat linked us directly to major divine events across India.",
    avatar: "/images/register/avatar-aparna.png",
    name: "Aparna Sen",
    role: "Classical Dancer",
  },
];

const faqs = [
  {
    q: "Is there any registration fee?",
    a: "No, registration on the Shyam Jagat platform is absolutely free of charge for all individual artists, temples, and organizations.",
  },
  {
    q: "What is the verification process?",
    a: "Our dedicated seva committee reviews every profile within 24 to 48 hours. We verify ID proofs and credentials to maintain the sacred environment of our directory.",
  },
  {
    q: "Can I manage multiple profiles?",
    a: "Yes, you can register as an individual and also manage a temple or mandal listing using a unified admin dashboard.",
  },
  {
    q: "How do travelers contact dharamshalas?",
    a: "Once listed, your contact info, location map, and booking guidelines will be directly visible to millions of pilgrims who can call or book instantly.",
  },
];

function PremiumAdSlot() {
  return (
    <div className="flex flex-col items-center bg-cream px-6 py-10 lg:px-20">
      <div className="flex h-[320px] w-full max-w-[1280px] flex-col items-center justify-center gap-4 rounded-[20px] border border-[#d1d5db] bg-[#e5e7eb] p-8 text-center">
        <span className="rounded-full border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#6b7280]">
          Ad Placeholder
        </span>
        <p className="max-w-[760px] font-serif text-3xl font-bold text-[#374151] sm:text-4xl">
          Premium Ad Space
        </p>
        <p className="max-w-[760px] text-base leading-relaxed text-[#6b7280]">
          Reserve this high-visibility placement for sponsored content, featured
          listings, or community announcements.
        </p>
        <span className="rounded-full border border-[#d1d5db] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#6b7280]">
          1280 × 320 px • Premium placement
        </span>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[2px] text-primary">{eyebrow}</p>
      <h2 className="font-serif text-3xl font-bold text-maroon sm:text-4xl lg:text-[44px]">
        {title}
      </h2>
      <div className="h-[3px] w-[100px] bg-primary" />
    </div>
  );
}

export default function RegisterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden px-6 py-16 lg:px-20">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/register/hero.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgba(107,31,31,0.85)]" />
        </div>
        <div className="relative flex max-w-[850px] flex-col items-center gap-6 text-center">
          <p className="text-base font-bold uppercase tracking-[3px] text-primary">
            || जय श्री श्याम ||
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[45px] lg:leading-[64px]">
            Join the Shyam Jagat Community
          </h1>
          <p className="text-base leading-7 text-cream-light opacity-90 sm:text-lg text-balance">
            Register as an individual, organization, or service provider and
            become part of our growing spiritual family. Unite in faith,
            service, and devotion.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-px w-[60px] bg-primary/60" />
            <span className="flex size-7 items-center justify-center rounded-full bg-primary/10">
              <Sparkle className="h-4 w-4 text-primary" />
            </span>
            <span className="h-px w-[60px] bg-primary/60" />
          </div>
        </div>
      </section>

      <PremiumAdSlot />

      {/* Category Selection */}
      <section className="flex flex-col items-center gap-12 bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[2px] text-primary">
            Get Started
          </p>
          <h2 className="max-w-[800px] font-serif text-3xl font-bold text-maroon sm:text-4xl lg:text-[44px]">
            Choose Your Registration Category
          </h2>
          <div className="h-[3px] w-[100px] bg-primary" />
        </div>

        <div className="grid w-full max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="flex flex-col justify-between rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-white p-8 shadow-[0px_10px_12px_rgba(107,31,31,0.05)]"
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <category.icon className="h-7 w-7 text-primary" />
                  </span>
                  <span className="rounded-full bg-primary/[0.08] px-2.5 py-1 text-[11px] font-semibold text-primary">
                    FREE
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-2xl font-bold text-[#3d1010]">
                    {category.title}
                  </h3>
                  <p className="text-sm leading-[22px] text-[#595656]">{category.desc}</p>
                </div>
              </div>
              {category.href === "#" ? (
                <button
                  type="button"
                  disabled
                  className="mt-6 flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-[#e5e7eb] px-4 py-2.5 text-sm font-semibold text-[#9ca3af]"
                >
                  Coming Soon
                </button>
              ) : (
                <Link
                  href={category.href}
                  className="mt-6 flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Register Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <PremiumAdSlot />

      {/* How It Works */}
      <section className="flex flex-col items-center gap-14 bg-white px-6 py-16 lg:px-20 lg:py-24">
        <SectionHeader eyebrow="Simple Process" title="How It Works" />
        <div className="grid w-full max-w-[1280px] gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-cream-light p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-8 w-8 text-primary" />
                </span>
                <span className="font-serif text-5xl font-bold text-maroon/15">
                  {step.number}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-serif text-[22px] font-bold text-[#3d1010]">
                  {step.title}
                </h3>
                <p className="text-sm leading-[22px] text-[#595656]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="flex flex-col items-center gap-14 bg-cream-light px-6 py-16 lg:px-20 lg:py-24">
        <SectionHeader eyebrow="Advantages" title="Why Register with Shyam Jagat?" />
        <div className="grid w-full max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col gap-4 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-8 shadow-[0px_8px_8px_rgba(0,0,0,0.03)]"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <benefit.icon className="h-7 w-7 text-primary" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-serif text-xl font-bold text-[#3d1010]">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-[22px] text-[#595656]">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PremiumAdSlot />

      {/* Testimonials */}
      <section className="flex flex-col items-center gap-14 bg-white px-6 py-16 lg:px-20 lg:py-24">
        <SectionHeader eyebrow="Feedback" title="Voices from Our Sacred Family" />
        <div className="grid w-full max-w-[1280px] gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-6 rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-cream-light p-10"
            >
              <p className="font-serif text-6xl font-extrabold leading-[30px] text-primary/30">
                &ldquo;
              </p>
              <p className="text-[15px] italic leading-6 text-[#3d1010]">{t.quote}</p>
              <div className="h-px w-full bg-border" />
              <div className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-maroon">{t.name}</p>
                  <p className="text-[13px] text-[#6b7280]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PremiumAdSlot />

      {/* FAQ */}
      <section className="flex flex-col items-center gap-14 bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <SectionHeader eyebrow="Questions" title="Frequently Asked Questions" />
        <div className="flex w-full max-w-[800px] flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <button
                key={faq.q}
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="flex flex-col gap-3 rounded-xl border border-[rgba(212,175,55,0.25)] bg-white p-6 text-left"
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <p className="font-serif text-lg font-bold text-[#3d1010]">{faq.q}</p>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    <ChevronDown className="h-4 w-4 text-primary" />
                  </span>
                </div>
                {isOpen && (
                  <p className="text-sm leading-[22px] text-[#595656]">{faq.a}</p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="flex flex-col items-center gap-8 bg-maroon px-6 py-20 text-center lg:px-20 lg:py-[120px]">
        <div className="flex max-w-[800px] flex-col gap-4">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-[48px]">
            Ready to Join Our Family?
          </h2>
          <p className="text-base leading-relaxed text-cream opacity-80">
            Take a leap of faith. Registering takes less than 5 minutes and is
            100% free. Connect directly with millions of Baba Shyam devotees.
          </p>
        </div>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white transition hover:bg-primary-dark"
        >
          Start Registration <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
