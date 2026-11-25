"use client";
import Ornament from "@/components/ui/Ornament";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CalendarCheck,
  HandHeart,
  LayoutDashboard,
  Music,
  Radio,
  Settings,
  Sunrise,
  Target,
  Users,
} from "lucide-react";
import { FramedCard, NumberTile } from "@/components/ui/ArtCard";
import WhoWeAreArt from "@/components/about/WhoWeAreArt";
import { SOURCES } from "@/lib/data/khatuReference";
import AdSlot from "@/components/ui/AdSlot";

export default function AboutPage() {

  const roles = [
    { icon: Users, label: "Devotees" },
    { icon: Building2, label: "Temples" },
    { icon: Music, label: "Artists" },
    { icon: Calendar, label: "Organizers" },
    { icon: Settings, label: "Administrators" },
  ];

  const features = [
    { icon: Building2, title: "Temple Registration & Management", desc: "Register temples, manage profiles, update schedules, and showcase offerings to thousands of devotees online." },
    { icon: Music, title: "Artist Registration & Slot Booking", desc: "Bhajan singers, katha speakers, and performers can register, set availability, and get booked for events seamlessly." },
    { icon: Radio, title: "Live Darshan & Aarti Feed", desc: "Stream live aarti and darshan in real time, allowing devotees worldwide to participate in sacred rituals from anywhere." },
    { icon: CalendarCheck, title: "Puja / Seva / Darshan Booking", desc: "Devotees can book personalized pujas, sevas, and darshan slots at their preferred temple with ease." },
    { icon: LayoutDashboard, title: "Center Dashboard", desc: "A unified control center for managing all platform activity - content, users, bookings, and operations - in one place." },
    { icon: Calendar, title: "Events & Activities", desc: "Discover, create, and manage spiritual events, satsangs, bhajan programs, and community gatherings." },
    { icon: HandHeart, title: "Donations & Fundraising", desc: "Enable transparent, secure donations to temples, causes, and relief initiatives with campaign tracking." },
    { icon: BookOpen, title: "Spiritual Content", desc: "Access a rich library of bhajans, kathas, articles, and devotional videos curated for every seeker." },
    { icon: BarChart3, title: "Analytics & Reports", desc: "Real-time dashboards and detailed reports for administrators and organizers to track impact and engagement." },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative -mt-[112px] flex min-h-[674px] w-full items-center justify-center overflow-hidden pt-[112px]">
        <Image
          src="/images/about/Hero.png"
          alt="Shyam Jagat temple at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140505]/40 to-[#140505]/65" />
        <div className="relative flex flex-col items-center gap-6 px-6 text-center">
          <p className="text-xl uppercase tracking-wide text-white/90">
            {"|| जय श्री श्याम ||"}
          </p>
          <h1 className="font-serif text-4xl text-balance font-bold text-white sm:text-7xl">
            {"About Shyam Jagat"}
          </h1>
          <Ornament />
          <p className="text-lg text-balance font-light text-white/90 sm:text-[22px]">
            {"Serving Humanity with Faith, Compassion, and Purpose"}
          </p>
        </div>
      </section>

      {/* AD - LEADERBOARD */}
      <AdSlot size="leaderboard" />

      {/* WHO WE ARE SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[100px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e0b94f] bg-[#fdebd0] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#b45309]">
                <span className="h-2 w-2 rounded-full bg-[#e47105]" aria-hidden />
                {"Our story"}
              </span>
              <h2 className="font-serif text-4xl font-semibold leading-[1.1] text-[#583939] lg:text-[48px]">
                {"Who We Are"}
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-[#e47105]" />
              <div className="mt-8 flex flex-col gap-6 text-lg leading-[1.8] text-[#444]">
                <p>{"Shyam Jagat is a spiritual and social organization inspired by the divine teachings and blessings of Baba Shyam. Our mission is to transform lives by combining devotion with meaningful social service, creating a community where compassion, dignity, and opportunity are accessible to everyone."}</p>
                <p>{"We believe that true devotion is expressed through selfless service. Every initiative we undertake is driven by the values of kindness, equality, and humanity, helping individuals and families build a brighter future."}</p>
              </div>
            </div>
            <WhoWeAreArt className="mx-auto w-full max-w-[540px]" />
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="bg-[#fdf6ec] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[100px]">
          <div id="mission" className="grid scroll-mt-32 gap-8 lg:grid-cols-2">
            <FramedCard tone="light" icon={Sunrise} eyebrow="Vision" title="Our Vision">
              <p>{"To build a compassionate, empowered, and self-reliant society where every individual has access to education, healthcare, food, shelter, employment opportunities, and a life of dignity under the blessings of Baba Shyam."}</p>
            </FramedCard>
            <FramedCard tone="dark" icon={Target} eyebrow="Mission" title="Our Mission">
              <p>{"Our mission is to serve society through sustainable initiatives that uplift lives, strengthen communities, and inspire people to contribute towards a better tomorrow. We strive to create lasting social impact by empowering individuals with the resources, support, and opportunities they need to thrive."}</p>
            </FramedCard>
          </div>
        </div>
      </section>

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta={"Explore"} />

      {/* OUR BELIEF SECTION */}
      <section className="bg-maroon px-6 py-16 text-white lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-semibold lg:text-[48px]">
              {"Our Belief"}
            </h2>
            <div className="h-1 w-20 rounded-full bg-[#e47105]" />
          </div>
          <p className="max-w-[900px] text-center text-lg leading-[1.8] text-white/90 lg:text-xl">
            {"At Shyam Jagat, we believe that even the smallest act of kindness can create a lasting impact. Guided by the blessings of Baba Shyam, we encourage every individual to become a part of this journey of service, compassion, and positive change. Together, we are not just serving people—we are building hope, creating opportunities, and shaping a stronger, kinder society for generations to come."}
          </p>
          <Link
            href="/signup"
            className="flex items-center gap-2.5 rounded-md bg-[#e47105] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
            {"Join the Shyam Family"}
          </Link>
        </div>
      </section>

      {/* PLATFORM ECOSYSTEM OVERVIEW */}
      <section className="bg-white px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] lg:px-[80px]">
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="rounded-full bg-[#e47105] px-3.5 py-2 text-xs font-semibold uppercase text-white">
              {"Platform Ecosystem Overview"}
            </span>
            <h2 className="max-w-[1280px] font-serif text-4xl font-semibold leading-[1.1] text-[#583939] lg:text-[48px]">
              {"One Platform. Every Role. Infinite Devotion."}
            </h2>
            <p className="max-w-[700px] text-lg leading-[1.6] text-[#444]">
              {"A multi-role spiritual ecosystem seamlessly connecting Devotees, Temples, Artists, Event Organizers, and Administrators - all under the blessings of Baba Shyam."}
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {roles.map((role, i) => (
              <div key={role.label} className="flex items-center gap-4">
                <div className="flex items-center gap-2.5 rounded-full border border-[#d4af37]/25 bg-[#fff8f0] px-3.5 py-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[14px] bg-[#e47105]">
                    <role.icon className="h-4 w-4 text-white" aria-hidden />
                  </span>
                  <p className="text-[13px] font-semibold text-[#3e1815]">
                    {role.label}
                  </p>
                </div>
                {i < roles.length - 1 && (
                  <span className="hidden h-px w-10 bg-[#d4af37]/25 sm:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <NumberTile key={feature.title} n={i + 1} icon={feature.icon} title={feature.title}>
                {feature.desc}
              </NumberTile>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-maroon px-6 py-[18px] text-center sm:flex-row sm:text-left">
            <p className="text-sm font-semibold text-white">
              {"Join thousands of devotees, temples, and artists already on the platform."}
            </p>
            <Link
              href="/signup"
              className="shrink-0 rounded-full bg-[#e47105] px-4 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
            >
              {"Get Started"}
            </Link>
          </div>
        </div>
      </section>

      {/* SOURCES: where the details about Baba Shyam and Khatushyamji come from */}
      <section id="sources" className="scroll-mt-32 bg-[#fdf6ec] px-6 py-14 lg:py-16">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-serif text-2xl font-semibold text-[#583939] lg:text-3xl">{"Sources"}</h2>
          <div className="mt-3 h-1 w-14 rounded-full bg-[#e47105]" />
          <p className="mt-5 text-[15px] leading-relaxed text-[#444]">
            {"The details on this site about Baba Shyam and the Khatushyamji temple (the story, the history, the aarti times, the distances and the Falgun Mela) are written from one reference, and from these sources:"}
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {SOURCES.map((src) => (
              <li key={src.id} className="rounded-xl border border-[#e0b94f]/50 bg-white px-5 py-4">
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#9a4b06] underline decoration-dotted underline-offset-2 hover:text-[#e47105]">
                  {src.label}
                </a>
                <p className="mt-1 text-sm leading-relaxed text-[#6b6b6b]">{src.what}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] leading-relaxed text-[#6b6b6b]">
            {"The story of Barbarik comes from folk and Puranic tradition and is told in more than one way. Where the tellings differ, we write only what they share, and say \"by tradition\" for dates such as the first temple (1027 CE). Aarti times can change on festivals; the temple committee's notice is final."}
          </p>
        </div>
      </section>
    </>
  );
}
