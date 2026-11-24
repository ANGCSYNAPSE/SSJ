"use client";
import Ornament from "@/components/ui/Ornament";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  Users,
  HeartHandshake,
  Building2,
  Map,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  BadgeCheck,
  Headphones,
  Leaf,
  Check,
  Mail,
  Phone,
  Clock,
  Lock,
  ChevronUp,
  CalendarDays,
  Landmark,
} from "lucide-react";
import { INITIATIVES } from "@/lib/data/initiatives";
import InitiativeShowcase from "@/components/initiatives/InitiativeShowcase";
import AdSlot from "@/components/ui/AdSlot";
import SevaHomeSection from "@/components/seva/SevaHomeSection";
import TickerBand from "@/components/ui/TickerBand";
import { Mandala, SEVA_ICONS } from "@/components/seva/DharmaIcons";
import { Eyebrow, HighlightWord, PhotoFrame } from "@/components/ui/Flourish";
import { CONTACT, telHref } from "@/lib/constants";
import HeroGateway from "@/components/home/HeroGateway";
import DarshanSchedule from "@/components/darshan/DarshanSchedule";
import LiveDarshanCard from "@/components/darshan/LiveDarshanCard";

/** Underline-arrow accent used next to hero and about-section CTAs. */
function CtaArrow({ src, className = "" }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={className} aria-hidden />
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const testimonials = [
    { name: "Rahul Sharma", program: "Education Support", text: "The scholarship from Shyam Jagat changed my life. Today I am a software engineer and I owe it all to their support and faith in me.", photo: "/images/home/success-1.png" },
    { name: "Priya Verma", program: "Employment Portal", text: "Through the Employment Portal, I found a job that matches my skills. Shyam Jagat didn't just give me work — they gave me purpose and confidence.", photo: "/images/home/success-2.png" },
    { name: "Rameshwar Ji", program: "Old Age Home", text: "I was alone and struggling. The Old Age Home gave me a family again. The warmth, care, and respect I receive here is beyond words.", photo: "/images/home/success-3.png" },
  ];

  const whyChoose = [
    { icon: SEVA_ICONS.diya, title: "Faith Driven", desc: "Our seva is rooted in the teachings of Baba Shyam: service as devotion.", colour: "#c2570c" },
    { icon: Eye, title: "Transparent", desc: "We aim to share openly how donations are used, and to keep honest records of our seva.", colour: "#0f766e" },
    { icon: Users, title: "Community Focused", desc: "Guided by the community, for the community, built on trust and everyone taking part.", colour: "#9b2335" },
    { icon: BadgeCheck, title: "Volunteer Powered", desc: "Seva is carried by volunteers and members who give their time with sincerity.", colour: "#2f6b3a" },
    { icon: Headphones, title: "Here to Help", desc: "Write to us or call us any time. We reply as soon as we can.", colour: "#3b4a9e" },
    { icon: Leaf, title: "Lasting Change", desc: "We focus on steady change that lasts, not only short-term relief.", colour: "#a16207" },
  ];

  const stats = [
    { icon: Clock, title: "Requests within 24 hours", sub: "Fast response" },
    { icon: Headphones, title: "Dedicated Support", sub: "Human help" },
    { icon: Users, title: "Community", sub: "Strong network" },
    { icon: Lock, title: "100% Confidential", sub: "Secure" },
  ];

  // Four short answers, each ending in a step the visitor can take.
  const faqs = [
    {
      q: "What is Shyam Jagat?",
      a: "A faith-based seva family devoted to Baba Shyam. We aim to serve through food, water, care for cows, children's learning and more, as one community.",
      href: "/initiatives",
      cta: "See our seva",
    },
    {
      q: "How do I join Shyam Jagat?",
      a: "Create your account in a few minutes and choose how you wish to take part: as a volunteer, devotee, artist, temple or more.",
      href: "/signup",
      cta: "Join us",
    },
    {
      q: "How can I volunteer?",
      a: "Volunteering is free. Pick \"Volunteer\" while signing up, tell us your city and what you can help with, and our team will reach out.",
      href: "/signup?register=volunteer",
      cta: "Become a volunteer",
    },
    {
      q: "How can I give seva?",
      a: "Choose a seva you love, give any amount, and add a name or a prayer if you wish. It takes about two minutes, and you get a receipt by email.",
      href: "/#give-seva",
      cta: "Give seva",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative -mt-[112px] flex min-h-[calc(100svh+112px)] w-full items-center justify-center overflow-hidden bg-[#06183f] lg:min-h-[var(--hero-min,calc(100svh+112px))]">
        <HeroGateway />

        {/* Content sits in the open centre of the gateway, like the SS4 reference. */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh+112px)] w-full max-w-[1440px] flex-col items-center justify-start gap-6 lg:min-h-[var(--hero-min,calc(100svh+112px))] px-5 pb-8 pt-[calc(122px+56.3vw)] text-center sm:gap-7 sm:px-8 lg:gap-8 lg:px-16 lg:pb-10 lg:pt-[calc(112px+var(--open-top,40vw)+28px)]">
          <div className="flex w-full max-w-[760px] flex-col items-center">

            <h1 className="flex flex-wrap items-center justify-center gap-x-3 font-serif text-[clamp(2rem,4.2vw,4.25rem)] font-extrabold leading-[1.12] drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]">
              <span className="text-[#ff9b19]">सहयोग</span>
              <span className="text-white">सेवा</span>
              <span className="text-[#ffd04f]">समर्पण</span>
            </h1>

            <p className="mt-3 max-w-[560px] text-sm font-semibold leading-6 text-white [text-shadow:0_2px_5px_rgba(0,0,0,0.9)] sm:text-base">
              Shree Shyam Jagat is a platform dedicated to spreading devotion and serving humanity
            </p>

            <Link
              href="/signup"
              className="group mt-5 inline-flex h-11 items-center justify-center gap-3 rounded-[13px] bg-gradient-to-r from-[#f47700] to-[#ff9417] px-7 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-105 sm:text-base"
            >
              Become a Member
              <CtaArrow src="/images/home/arrow-member.svg" className="h-3 w-6" />
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid w-full max-w-[820px] grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { icon: Users, label: "Devotees Connected" },
              { icon: HeartHandshake, label: "Seva Initiatives" },
              { icon: Building2, label: "Temples Associated" },
              { icon: Map, label: "States Covered" },
            ].map((s) => (
              <div
                key={s.label}
                className="group flex cursor-default items-center gap-3 rounded-xl border border-white/30 bg-[#0b3970]/55 px-4 py-2.5 text-left text-white shadow-[0_5px_18px_rgba(0,0,0,0.16)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd04f]/70 hover:bg-[#0b3970]/80 hover:shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-[#f47700]">
                  <s.icon className="h-[18px] w-[18px] text-white" aria-hidden />
                </span>
                <span className="min-w-0 text-sm font-bold leading-tight sm:text-[15px]">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Mission card */}
          <div className="flex w-full max-w-[430px] items-center gap-4 rounded-[17px] border border-white/30 bg-gradient-to-r from-[#fff1d8] to-[#ffe2ad] px-4 py-3 text-left shadow-[0_10px_28px_rgba(0,0,0,0.25)] sm:px-5 sm:py-3.5">
            <div className="h-9 w-1 shrink-0 rounded-full bg-[#e47105]" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-[#21170b]">Our Mission</p>
              <p className="mt-1 text-[11px] leading-[17px] text-[#4a3800] sm:text-xs sm:leading-[18px]">
                To create a global community of devotees united by faith, service and compassion.
              </p>
            </div>
            <CtaArrow src="/images/home/feather.svg" className="h-12 w-9 shrink-0" />
          </div>

          {/* Quick links, over the road at the foot of the gateway */}
          <div className="mt-auto grid w-full max-w-[860px] grid-cols-2 gap-2.5 pt-4 sm:gap-3 lg:grid-cols-4">
            {[
              { icon: Landmark, title: "Find a Temple", text: "Browse temples", href: "/temple-directory" },
              { icon: CalendarDays, title: "Upcoming Events", text: "Join a satsang near you", href: "/events" },
              { icon: HeartHandshake, title: "Seva Initiatives", text: "Serve with devotion", href: "/initiatives" },
              { icon: Heart, title: "Donate", text: "Support our mission", href: "/donation" },
            ].map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="group flex items-center gap-3 rounded-[14px] border border-white/30 bg-[#06183f]/60 px-3.5 py-3 text-left text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#ffd04f]/70 hover:bg-[#0b3970]/75"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f47700]">
                  <q.icon className="h-[18px] w-[18px] text-white" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-bold leading-tight">{q.title}</span>
                  <span className="block text-[11px] leading-tight text-white/85">{q.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* A ribbon of our seva, strung across the foot of the hero */}
      <TickerBand />

      {/* AD - LEADERBOARD */}


      <AdSlot size="leaderboard" />

      {/* ABOUT SHYAM JAGAT SECTION */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* The picture keeps its own proportions (1024 x 880), so nothing is cropped at any screen width. */}
            <PhotoFrame className="order-2 lg:order-1" side="left">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[35px] shadow-[-16px_18px_50px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/home/about-seva.jpg"
                alt="Volunteers in a temple courtyard teaching children, checking an elder's health, serving food and practising crafts"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[38%_50%]"
              />
            </div>
            </PhotoFrame>
            <div className="order-1 lg:order-2">
              <Eyebrow className="mb-5">{"Who we are"}</Eyebrow>
              <h2 className="font-serif text-4xl font-semibold text-[#583939] lg:text-[52px] lg:leading-[1.1]">
                {"About"} <HighlightWord>Shyam Jagat</HighlightWord>
              </h2>
              <p className="mt-6 text-lg leading-[37px] text-[#8c8c8c]">
                {"Shyam Jagat is a spiritual and social organization inspired by Baba Shyam, dedicated to serving humanity through faith and action. We uplift communities across areas: quality education for children, skill training for employment, free meals for food security, safe shelter for the homeless, free healthcare camps, and women empowerment programs. Together, we aim to build a compassionate and self-reliant society where everyone can thrive with dignity."}
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex h-[38px] w-[177px] items-center justify-center gap-3 rounded-[14px] bg-[#e47105] text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                {"Know More"}
                <CtaArrow src="/images/home/arrow-about.svg" className="h-3 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT BABA SHYAM SECTION */}
      <section className="relative overflow-hidden bg-[#fdf6ec] py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[87px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow className="mb-5">{"Our inspiration"}</Eyebrow>
              <h2 className="font-serif text-4xl font-semibold text-black lg:text-[52px] lg:leading-[1.1]">
                {"About"} <HighlightWord>Baba Shyam</HighlightWord>
              </h2>
              <p className="mt-6 max-w-[504px] text-lg leading-[37px] text-[#8c8c8c]">
                {"\"Born as Barbarik, the legendary grandson of Bhima, he possessed unparalleled warrior strength. Yet, his greatest act was the supreme sacrifice of his own head for the victory of Dharma (truth). Pleased by his selfless devotion, Lord Krishna blessed him with his own name—Shyam—decreeing that he would be revered in Kalyug as the ultimate savior of the defeated.\""}
              </p>
              <Link
                href="/baba-shyam"
                className="mt-8 inline-flex h-[38px] w-[177px] items-center justify-center gap-3 rounded-[14px] bg-[#e47105] text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                {"Know More"}
                <CtaArrow src="/images/home/arrow-about.svg" className="h-3 w-6" />
              </Link>
            </div>
            <PhotoFrame side="right">
            <div className="relative h-96 overflow-hidden rounded-[35px] lg:h-[550px] shadow-[16px_18px_50px_rgba(0,0,0,0.25)] ">
              <Image
                src="/images/home/about-baba.png"
                alt="Baba Shyam"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            </PhotoFrame>
          </div>
        </div>
      </section>

      {/* SHYAM BABA DARSHAN: the aarti timetable (winter and summer) and the latest aarti from the temple */}
      <section className="bg-maroon py-16 text-white lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 lg:flex-row lg:gap-16 lg:px-[80px]">
          <div className="flex flex-1 flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[#d4af37]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                  {"Shri Shyam Mandir, Khatushyamji"}
                </p>
                <span className="h-px w-6 bg-[#d4af37]" />
              </div>
              <h2 className="font-serif text-4xl font-semibold leading-[1.1] lg:text-[48px]">
                {"Shyam Baba Darshan"}
              </h2>
              <p className="max-w-[560px] text-base leading-relaxed text-white/85">
                {"The daily aarti timings, with the winter and summer times side by side, and the darshan aarti from the temple."}
              </p>
            </div>
            <DarshanSchedule />
            {/* Hidden for now, along with "All Aarti" in the More menu:
            <Link href="/aarti" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#ffd04f] hover:underline">
              {"All Aarti, Chalisa, Bhajan and Yatra"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            */}
          </div>

          <LiveDarshanCard className="lg:w-[480px] lg:self-start" />
        </div>
      </section>

      {/* OUR INITIATIVES - BENTO */}
      <section className="bg-[#fdf6ec] py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.96px] text-[#e87722]">
              {"WHAT WE DO"}
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-[1.1] text-[#6b1f1f] lg:text-[52px]">
              {"Our"} <span className="text-[#e87722]">{"Initiatives"}</span>
            </h2>
            <div className="h-0.5 w-[120px] bg-[#e87722] opacity-60" />
            <p className="text-base leading-relaxed text-[#6b4a4a] opacity-85">
              {"Simple acts of seva, guided by faith and compassion. Choose any card to see what we aim to do."}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-[1300px]">
            <InitiativeShowcase items={INITIATIVES} layout="bento" />
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/initiatives"
              className="inline-flex items-center gap-2 rounded-full bg-[#e87722] px-3.5 py-2.5 text-sm font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              {"See all our initiatives"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* GIVE SEVA */}
      <SevaHomeSection />

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta={"Explore"} />

      {/* SUCCESS STORIES */}
      <section className="bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">
              {"Success Stories"}
            </h2>
            <Ornament />
            <p className="text-lg leading-7 text-[#595656]">
              {"Real lives, real impact — stories of hope and transformation."}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-[#d4af37]/25 bg-[#fffbf3] p-7 shadow-[0_12px_16px_rgba(139,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(194,87,12,0.18)]"
              >
                <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[120px] font-bold leading-none text-[#e47105]/15">&rdquo;</span>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-[#e47105]/20 transition-transform duration-300 group-hover:scale-105">
                    <Image src={item.photo} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <p className="font-serif text-xl font-bold leading-tight text-[#3e1815]">{item.name}</p>
                    <span className="w-fit rounded-full bg-[#7b2d2d] px-2.5 py-1 text-xs font-semibold text-white">{item.program}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#e47105] text-[#e47105]" aria-hidden />
                  ))}
                </div>
                <p className="relative italic leading-[27px] text-[#3e1815]">&ldquo;{item.text}&rdquo;</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/25 bg-white transition-colors hover:bg-cream"
            >
              <ChevronLeft className="h-5 w-5 text-[#3e1815]" aria-hidden />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-6 rounded-full bg-[#e47105]" />
              <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
              <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/25 bg-white transition-colors hover:bg-cream"
            >
              <ChevronRight className="h-5 w-5 text-[#3e1815]" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SHYAM JAGAT */}
      <section className="relative overflow-hidden px-6 py-16 lg:px-[108px] lg:py-24">
        {/* The temple behind everything, under a deep maroon wash so the cards and the heading stand out. */}
        <Image src="/images/home/hero.png" alt="" fill sizes="100vw" className="object-cover object-center" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b0707]/95 via-[#4a0e0e]/90 to-[#2b0707]/95" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#e87722] via-[#ffd04f] to-[#e87722]" />

        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffd04f]">{"OUR PROMISE TO TRY"}</p>
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-white lg:text-[48px]">
              {"Why Choose Shyam Jagat"}
            </h2>
            <div className="h-[3px] w-[100px] rounded bg-gradient-to-r from-[#e87722] to-[#ffd04f]" />
            <p className="text-lg leading-7 text-[#f5d9a0]">
              {"Built on faith, driven by purpose, and working towards lasting change."}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((f, i) => {
              const Icon = f.icon as React.ComponentType<{ className?: string; strokeWidth?: number }>;
              const wide = i === 5;
              return (
                <div
                  key={f.title}
                  className={`group relative isolate overflow-hidden rounded-[28px] border border-[#f6dc8c]/25 p-7 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f6dc8c]/60 hover:shadow-[0_26px_50px_rgba(0,0,0,0.45)] sm:p-8 ${i === 0 ? "lg:col-span-2" : ""} ${wide ? "sm:col-span-2 lg:col-span-3" : ""}`}
                  style={{ background: `radial-gradient(120% 120% at 0% 0%, ${f.colour}, color-mix(in srgb, ${f.colour} 45%, #1a0505))` }}
                >
                  {/* a mandala turning slowly behind, and a big faded number */}
                  <Mandala className="gs-spin-slow pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 text-[#f6dc8c]/25" />
                  <span aria-hidden className="pointer-events-none absolute -bottom-6 right-5 -z-10 select-none font-serif text-[130px] font-bold leading-none text-white/[0.08]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={`flex h-full flex-col gap-6 ${wide ? "lg:flex-row lg:items-center lg:gap-10" : ""}`}>
                    {/* the symbol, inside a small temple arch */}
                    <span className="flex h-[88px] w-[68px] shrink-0 items-center justify-center rounded-t-[34px] rounded-b-md border border-[#f6dc8c]/60 bg-white/10 shadow-[inset_0_0_18px_rgba(246,220,140,0.15)] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-9 w-9 text-[#f6dc8c] drop-shadow-[0_0_6px_rgba(255,214,120,0.5)]" strokeWidth={1.4} />
                    </span>
                    <div className="flex flex-col gap-3">
                      <p className="font-serif text-[28px] font-bold leading-tight">{f.title}</p>
                      <Ornament className="text-[#f6dc8c]" />
                      <p className="max-w-[460px] text-[15px] leading-[24px] text-white/90">{f.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* TEMPLE REGISTRATION CTA */}
      <section className="bg-white px-6 py-6 lg:px-[108px] lg:py-8">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-[#d4af37]/25 shadow-[0_12px_30px_rgba(139,0,0,0.07)]">
          <div className="grid lg:grid-cols-2">
          <div className="relative order-2 min-h-[360px] lg:order-1 lg:min-h-[520px]">
            <Image
              src="/images/home/temple-cta.png"
              alt="A temple at sunset"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div className="order-1 flex flex-col gap-6 bg-[#fdf6ec] px-6 py-14 lg:order-2 lg:justify-center lg:px-20 lg:py-20">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.96px] text-[#e87722]">
                {"FOR TEMPLES"}
              </p>
              <h2 className="font-serif text-[32px] font-semibold leading-[1.1] text-[#3e1815] lg:text-[44px]">
                {"Register Your Temple"}
              </h2>
              <p className="max-w-[560px] text-base leading-[26px] text-[#595656]">
                {"List your temple on Shyam Jagat and connect with millions of devotees. Help pilgrims discover your sacred space, darshan timings, and upcoming events."}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {["Reach millions of devotees online", "Manage events & donations digitally", "Free listing with premium options"].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <Check className="h-[18px] w-[18px] shrink-0 text-[#e87722]" aria-hidden />
                  <p className="text-sm leading-[22px] text-[#3e1815]">{b}</p>
                </div>
              ))}
            </div>
            <Link
              href="/signup?register=temple"
              className="inline-flex h-14 w-fit min-w-[196px] items-center justify-center whitespace-nowrap rounded-lg bg-[#e87722] px-6 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              {"Register as Temple →"}
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* ARTIST REGISTRATION CTA */}
      <section className="bg-white px-6 py-6 lg:px-[108px] lg:py-8">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-[#d4af37]/25 shadow-[0_12px_30px_rgba(139,0,0,0.07)]">
          <div className="grid lg:grid-cols-2">
          <div className="flex flex-col gap-6 bg-[#fdf6ec] px-6 py-14 lg:justify-center lg:px-20 lg:py-20">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.96px] text-[#e87722]">
                {"FOR ARTISTS"}
              </p>
              <h2 className="font-serif text-[32px] font-semibold leading-[1.1] text-[#3e1815] lg:text-[44px]">
                {"Share Your Art with the World"}
              </h2>
              <p className="max-w-[560px] text-base leading-[26px] text-[#595656]">
                {"Join Shyam Jagat as a devotional artist. Showcase your talent at spiritual events, cultural programs, and sacred gatherings across India."}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {["Get discovered by event organizers", "Perform at prestigious temples & festivals", "Fair compensation & timely payments"].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <Check className="h-[18px] w-[18px] shrink-0 text-[#e87722]" aria-hidden />
                  <p className="text-sm leading-[22px] text-[#3e1815]">{b}</p>
                </div>
              ))}
            </div>
            <Link
              href="/signup?register=artist"
              className="inline-flex h-14 w-fit min-w-[196px] items-center justify-center whitespace-nowrap rounded-lg bg-[#e87722] px-6 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              {"Register as Artist →"}
            </Link>
          </div>
          <div className="relative min-h-[360px] lg:min-h-[520px]">
            <Image
              src="/images/home/artist-cta.png"
              alt="Devotional dancers performing at an evening event"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white px-6 py-10">
        <div className="mx-auto grid max-w-[1224px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.title} className="group flex items-center gap-4 rounded-2xl border border-[#e0b94f]/50 bg-gradient-to-br from-[#fffdf8] to-[#fdf3dc] px-5 py-4 shadow-[0_6px_16px_rgba(107,31,31,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#e0b94f] hover:shadow-[0_14px_28px_rgba(194,87,12,0.15)]">
              <span className="flex h-[58px] w-[44px] shrink-0 items-center justify-center rounded-t-[22px] rounded-b-md border border-[#e0b94f] bg-[#fff4d6] text-[#b45309] transition-colors group-hover:bg-[#e47105] group-hover:text-white">
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-snug text-[#4a0e0e]">{s.title}</span>
                <span className="mt-0.5 block text-xs text-[#8a6a4a]">{s.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN THE SHYAM FAMILY */}
      <section className="bg-white px-6 py-8 lg:px-[90px]">
        <div className="relative isolate mx-auto flex max-w-[1224px] flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#ef851f] via-[#e58330] to-[#c2570c] px-8 py-9 text-white shadow-[0_20px_44px_rgba(194,87,12,0.3)] sm:flex-row sm:gap-8">
          <Mandala className="gs-spin-slow pointer-events-none absolute -right-16 -top-24 -z-10 h-[360px] w-[360px] text-white/20" />
          <span aria-hidden className="pointer-events-none absolute inset-2.5 -z-10 rounded-[20px] border border-white/35" />
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white">
              <CtaArrow src="/images/home/family-icon.svg" className="h-12 w-12" />
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold sm:text-[33px]">
                {"Join the Shyam Family"}
              </p>
              <p className="mt-1 max-w-[420px] font-light text-white/95 sm:text-lg">
                {"Be a part of our mission and help us create a better society."}
              </p>
            </div>
          </div>
          <Link
            href="/signup"
            className="flex shrink-0 items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-lg font-semibold text-[#e47105] shadow-lg transition-opacity hover:opacity-90"
          >
            {"Become a Member"}
            <CtaArrow src="/images/home/arrow-join.svg" className="h-3 w-4" />
          </Link>
        </div>
      </section>

      {/* AD - LEADERBOARD 2 */}
      <AdSlot size="leaderboard" cta={"Learn More"} />

      {/* FAQ */}
      <section className="bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">
              {"Frequently Asked Questions"}
            </h2>
            <Ornament />
            <p className="text-lg leading-7 text-[#595656]">
              {"Have questions? We have answers."}
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[860px] flex-col gap-3">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                href={item.href}
                cta={item.cta}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-white px-6 py-6 lg:px-[108px] lg:py-8">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-[#d4af37]/25 shadow-[0_12px_30px_rgba(139,0,0,0.07)]">
          <div className="grid lg:grid-cols-2">
          <div className="relative flex flex-col gap-8 overflow-hidden bg-[#fdf6ec] px-6 py-14 lg:px-24 lg:py-24">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="/images/home/contact-bg.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative flex flex-col gap-6">
              <h2 className="font-serif text-4xl font-semibold leading-[1.1] text-[#4a0e0e] lg:text-[56px]">
                {"Need Assistance?"}
                <br />
                {"We're here to help."}
              </h2>
              <p className="max-w-[500px] text-base leading-relaxed text-[#4b5563]">
                {"We are always here to help you. Whether you have a question, want to volunteer, make a donation, or need assistance - our helpdesk is here for you."}
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Mail, text: CONTACT.email, href: `mailto:${CONTACT.email}` },
                  { icon: Phone, text: CONTACT.phone, href: telHref(CONTACT.phone) },
                  { icon: MapPin, text: "Jaipur, Rajasthan, India", href: undefined },
                  { icon: Clock, text: "Mon-Sat : 9 AM - 6 PM", href: undefined },
                ].map((row) => (
                  <div key={row.text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e87722]">
                      <row.icon className="h-[18px] w-[18px] text-white" aria-hidden />
                    </div>
                    {row.href ? (
                      <a href={row.href} className="text-base text-[#4b5563] transition-colors hover:text-[#e47105] hover:underline">
                        {row.text}
                      </a>
                    ) : (
                      <p className="text-base text-[#4b5563]">{row.text}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-white px-6 py-14 lg:px-12 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.96px] text-[#e87722]">
              {"GET IN TOUCH"}
            </p>
            <h2 className="font-serif text-[32px] font-semibold leading-[1.2] text-[#4a0e0e] lg:text-[40px]">
              {"Send Us Your Query"}
            </h2>
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#4b5563]">{"First Name"}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={"First Name"}
                    className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#4b5563]">{"Last Name"}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={"Last Name"}
                    className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#4b5563]">{"Email Address"}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={"Email Address"}
                    className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#4b5563]">{"Mobile Number"}</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder={"Mobile Number"}
                    className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#4b5563]">{"Subject"}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={"Subject"}
                  className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#4b5563]">{"Message"}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={"Write your message here..."}
                  rows={4}
                  className="resize-none rounded-lg border border-[#e5e7eb] p-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 flex h-14 items-center justify-center rounded-lg bg-[#e87722] text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                {"Send Message →"}
              </button>
            </form>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({
  q,
  a,
  href,
  cta,
  open,
  onToggle,
}: {
  q: string;
  a?: string;
  href?: string;
  cta?: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-[#d4af37]/25 bg-white p-5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-bold text-[#3e1815]">{q}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-[#7b2d2d]" aria-hidden />
        ) : (
          <span className="shrink-0 text-xl text-[#7b2d2d]">›</span>
        )}
      </button>
      {open && a && (
        <div className="mt-3 flex flex-col gap-3">
          <p className="text-sm leading-[22px] text-[#595656]">{a}</p>
          {href && cta && (
            <Link href={href} className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#e47105] px-4 py-2 text-[13px] font-bold text-white transition-opacity hover:opacity-90">
              {cta}
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
