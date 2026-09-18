"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Building2,
  Music,
  Calendar,
  Settings,
} from "lucide-react";
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
    { title: "Temple Registration & Management", desc: "Register temples, manage profiles, update schedules, and showcase offerings to thousands of devotees online." },
    { title: "Artist Registration & Slot Booking", desc: "Bhajan singers, katha speakers, and performers can register, set availability, and get booked for events seamlessly." },
    { title: "Live Darshan & Aarti Feed", desc: "Stream live aarti and darshan in real time, allowing devotees worldwide to participate in sacred rituals from anywhere." },
    { title: "Puja / Seva / Darshan Booking", desc: "Devotees can book personalized pujas, sevas, and darshan slots at their preferred temple with ease." },
    { title: "Center Dashboard", desc: "A unified control center for managing all platform activity - content, users, bookings, and operations - in one place." },
    { title: "Events & Activities", desc: "Discover, create, and manage spiritual events, satsangs, bhajan programs, and community gatherings." },
    { title: "Donations & Fundraising", desc: "Enable transparent, secure donations to temples, causes, and relief initiatives with campaign tracking." },
    { title: "Spiritual Content", desc: "Access a rich library of bhajans, kathas, articles, and devotional videos curated for every seeker." },
    { title: "Analytics & Reports", desc: "Real-time dashboards and detailed reports for administrators and organizers to track impact and engagement." },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative -mt-[140px] flex min-h-[674px] w-full items-center justify-center overflow-hidden pt-[140px]">
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
          <div className="h-1 w-[120px] bg-[#e47105]" />
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
              <h2 className="font-serif text-4xl font-semibold leading-[1.1] text-[#583939] lg:text-[48px]">
                {"Who We Are"}
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-[#e47105]" />
              <div className="mt-8 flex flex-col gap-6 text-lg leading-[1.8] text-[#444]">
                <p>{"Shyam Jagat is a spiritual and social organization inspired by the divine teachings and blessings of Baba Shyam. Our mission is to transform lives by combining devotion with meaningful social service, creating a community where compassion, dignity, and opportunity are accessible to everyone."}</p>
                <p>{"We believe that true devotion is expressed through selfless service. Every initiative we undertake is driven by the values of kindness, equality, and humanity, helping individuals and families build a brighter future."}</p>
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[540px] overflow-hidden rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.13)]">
              <Image
                src="/images/about/Rectangle.png"
                alt="Shyam Jagat volunteers gathered together"
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="bg-[#fdf6ec] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[100px]">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e8ddd0] border-t-[6px] border-t-[#e47105] bg-white p-8 lg:p-12">
              <h3 className="font-serif text-[32px] font-bold text-[#3e1815]">
                {"Our Vision"}
              </h3>
              <p className="mt-6 text-base leading-[1.8] text-[#444]">
                {"To build a compassionate, empowered, and self-reliant society where every individual has access to education, healthcare, food, shelter, employment opportunities, and a life of dignity under the blessings of Baba Shyam."}
              </p>
            </div>
            <div className="rounded-2xl border border-[#e8ddd0] border-t-[6px] border-t-[#e47105] bg-white p-8 lg:p-12">
              <h3 className="font-serif text-[32px] font-bold text-[#3e1815]">
                {"Our Mission"}
              </h3>
              <p className="mt-6 text-base leading-[1.8] text-[#444]">
                {"Our mission is to serve society through sustainable initiatives that uplift lives, strengthen communities, and inspire people to contribute towards a better tomorrow. We strive to create lasting social impact by empowering individuals with the resources, support, and opportunities they need to thrive."}
              </p>
            </div>
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
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-3.5 rounded-2xl border border-[#d4af37]/25 bg-[#fff8f0] p-6 shadow-[0_4px_10px_rgba(0,0,0,0.03)]"
              >
                <span className="mt-1 h-10 w-1 shrink-0 rounded-sm bg-[#e47105]" />
                <div>
                  <h3 className="font-semibold text-[#3e1815]">{feature.title}</h3>
                  <p className="mt-3.5 text-sm leading-[1.6] text-[#8c8c8c]">
                    {feature.desc}
                  </p>
                </div>
              </div>
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
    </>
  );
}
