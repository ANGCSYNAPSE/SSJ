"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdSlot from "@/components/ui/AdSlot";

export default function InitiativesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const featuredInitiatives = [
    { emoji: "🤝", title: "Marriage Bureau", desc: "Helping families find compatible life partners through a trusted, community-driven matrimonial platform — built on values, trust, and mutual respect." },
    { emoji: "💼", title: "Employment Portal", desc: "Connecting job seekers with employers through placements, career guidance, and skill-based opportunities for youth and professionals to achieve financial independence." },
    { emoji: "🎓", title: "Education Support", desc: "Supporting students with scholarships, educational resources, mentorship, and financial assistance — because every child deserves access to quality education." },
    { emoji: "👩", title: "Women Empowerment", desc: "Empowering women through skill development, entrepreneurship support, financial literacy, and leadership programs to build confidence, independence, and dignity." },
  ];

  const welfareCards = [
    { emoji: "🏡", title: "Old Age Home", desc: "Providing safe, peaceful accommodation, healthcare, nutritious meals, and emotional companionship." },
    { emoji: "🍛", title: "Annadan (Food Seva)", desc: "Organizing regular food distribution drives and community kitchens so that no one sleeps hungry." },
    { emoji: "🛏️", title: "Rain Basera", desc: "Temporary shelter, clean bedding, and essential facilities for homeless individuals during difficult weather." },
    { emoji: "🏥", title: "Medical Camps", desc: "Free health check-ups, blood donation drives, and eye camps to bring quality healthcare to all." },
    { emoji: "🙏", title: "Disaster Relief", desc: "Immediate support during natural disasters — distributing food, medicines, and clothing kits." },
  ];

  const spiritualCards = [
    { emoji: "🛕", title: "Temple Support", desc: "Supporting temples through renovation, digital management, and volunteer coordination while preserving our heritage." },
    { emoji: "📖", title: "Spiritual Learning", desc: "Satsangs, bhajan evenings, and religious discourses that inspire positive values and connect youth to Indian culture." },
    { emoji: "🌱", title: "Social Service", desc: "Cleanliness drives, tree plantation, and environmental campaigns for a healthier, more responsible society." },
  ];

  const galleryFilters = [
    { key: "all", label: "All" },
    { key: "Seva", label: "Seva" },
    { key: "Medical", label: "Medical" },
    { key: "Education", label: "Education" },
    { key: "Temple", label: "Temple" },
    { key: "Women", label: "Women" },
    { key: "Community", label: "Community" },
    { key: "Festivals", label: "Festivals" },
  ];

  const galleryItems = [
    {
      image: "/images/initiatives-page/gallery/annadan-distribution.png",
      tag: "Annadan",
      title: "Annadan Food Distribution",
      meta: "Aug 12 • Jaipur",
      category: "Seva",
    },
    {
      image: "/images/initiatives-page/gallery/medical-camp.png",
      tag: "Medical",
      title: "Medical Camp",
      meta: "Aug 08 • Ajmer",
      category: "Medical",
    },
    {
      image: "/images/initiatives-page/gallery/blood-donation.png",
      tag: "Medical",
      title: "Blood Donation Drive",
      meta: "Jul 28 • Jaipur",
      category: "Medical",
    },
    {
      image: "/images/initiatives-page/gallery/education-support.png",
      tag: "Education",
      title: "Education Support",
      meta: "Jul 15 • Dausa",
      category: "Education",
    },
    {
      image: "/images/initiatives-page/gallery/women-training.png",
      tag: "Women",
      title: "Women Training Workshop",
      meta: "Jul 10 • Sikar",
      category: "Women",
    },
    {
      image: "/images/initiatives-page/gallery/temple-event.png",
      tag: "Temple",
      title: "Temple Event",
      meta: "Jun 30 • Shyam Mandir",
      category: "Temple",
    },
    {
      image: "/images/initiatives-page/gallery/bhajan-sandhya.png",
      tag: "Community",
      title: "Bhajan Sandhya",
      meta: "Jun 22 • Sikar",
      category: "Community",
    },
    {
      image: "/images/initiatives-page/gallery/volunteer-activity.png",
      tag: "Seva",
      title: "Volunteer Group Activity",
      meta: "Jun 18 • Jaipur",
      category: "Seva",
    },
    {
      image: "/images/initiatives-page/gallery/tree-plantation.png",
      tag: "Community",
      title: "Tree Plantation",
      meta: "Jun 12 • Heritage City",
      category: "Community",
    },
    {
      image: "/images/initiatives-page/gallery/old-age-visit.png",
      tag: "Old Age Home",
      title: "Old Age Home Visit",
      meta: "May 30 • Old Age Home",
      category: "Seva",
    },
    {
      image: "/images/initiatives-page/gallery/festival-celebration.png",
      tag: "Festivals",
      title: "Festival Celebration",
      meta: "May 20 • Community Ground",
      category: "Festivals",
    },
    {
      image: "/images/initiatives-page/gallery/community-gathering.png",
      tag: "Community",
      title: "Community Gathering",
      meta: "May 15 • Sector 21",
      category: "Community",
    },
  ];

  const contributions = [
    {
      emoji: "🤲",
      title: "Volunteer",
      desc: "Dedicate your time and skills to our seva programs and make a direct difference in people's lives.",
      cta: "Join as Volunteer",
      href: "/signup",
    },
    {
      emoji: "💛",
      title: "Donate",
      desc: "Your donation funds meals, medicines, education, and shelter for those who need it most.",
      cta: "Donate Now",
      href: "/donation",
    },
    {
      emoji: "🪪",
      title: "Become Member",
      desc: "Become an official Shyam Jagat member and be part of our growing family of change-makers.",
      cta: "Become a Member",
      href: "/signup",
    },
    {
      emoji: "📚",
      title: "Sponsor Education",
      desc: "Sponsor a child's education and give them the gift of knowledge, opportunity, and a brighter future.",
      cta: "Sponsor a Child",
      href: "/donation",
    },
    {
      emoji: "🍱",
      title: "Sponsor Meals",
      desc: "Fund a day's meals for 100 families and be the reason no one sleeps hungry tonight.",
      cta: "Sponsor Meals",
      href: "/donation",
    },
    {
      emoji: "🤝",
      title: "Partner With Us",
      desc: "Organizations and businesses can partner with us to scale our impact and reach more communities.",
      cta: "Partner With Us",
      href: "/contact",
    },
  ];

  const visibleGallery =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative -mt-[100px] flex min-h-[674px] w-full items-center justify-center overflow-hidden pt-[100px] lg:-mt-[140px] lg:pt-[140px]">
        <Image
          src="/images/initiatives-page/hero.png"
          alt="Volunteers serving the community at a Shyam Jagat seva event"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0505]/80 to-[#1a0505]/0" />
        <div className="relative flex flex-col items-center gap-4 px-6 py-16 text-center">
          <p className="text-2xl text-[#fff8f0]/80">{"|| जय श्री श्याम ||"}</p>
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-serif text-6xl font-bold text-white sm:text-7xl lg:text-[90px]">
              {"Our Initiatives"}
            </h1>
            <div className="h-1 w-[120px] rounded-sm bg-[#e47105]" />
          </div>
          <p className="text-xl font-semibold text-[#ffb266] sm:text-2xl">
            {"Serving Society Through Compassion & Seva"}
          </p>
          <p className="max-w-[800px] text-lg leading-8 text-[#fff8f0]/90">
            {"At Shyam Jagat, every initiative is driven by the spirit of selfless service (Seva) and inspired by the teachings of Baba Shyam. Our programs are designed to uplift individuals, strengthen families, and create opportunities for a more compassionate and self-reliant society."}
          </p>
        </div>
      </section>

      {/* AD - LEADERBOARD */}
      <AdSlot size="leaderboard" />

      {/* FEATURED INITIATIVES */}
      <section className="bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="mx-auto flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">
              {"Featured Initiatives"}
            </h2>
            <p className="max-w-[600px] text-lg leading-7 text-[#e47105]">
              {"Flagship programs creating lasting impact across communities"}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredInitiatives.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-8 rounded-2xl border border-[#d4af37]/25 bg-[#fffbf3] p-10 shadow-[0_12px_16px_rgba(139,0,0,0.05)]"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8b0000] text-3xl">
                  {item.emoji}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-[32px] font-bold text-[#3e1815]">
                    {item.title}
                  </h3>
                  <p className="text-base leading-[26px] text-[#595656]">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <Link
                    href="/initiatives"
                    className="rounded-lg bg-[#e47105] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    {"Learn More"}
                  </Link>
                  <Link
                    href="/signup"
                    className="text-base font-semibold text-[#e47105] underline"
                  >
                    {"Volunteer"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY WELFARE */}
      <section className="bg-[#fff8f0] px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex gap-8">
            <span className="h-[120px] w-2 shrink-0 rounded bg-[#8b0000]" />
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-4xl font-bold text-[#3e1815] lg:text-[48px]">
                {"Community Welfare"}
              </h2>
              <p className="text-xl text-[#595656]">
                {"Reaching every corner of society with care, shelter, nourishment and health"}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {welfareCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-5 rounded-xl border border-[#d4af37]/25 bg-white p-6"
              >
                <p className="text-3xl">{card.emoji}</p>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-[#3e1815]">{card.title}</h3>
                  <p className="text-sm leading-[22px] text-[#8c8c8c]">
                    {card.desc}
                  </p>
                </div>
                <Link
                  href="/initiatives"
                  className="text-sm font-semibold text-[#e47105]"
                >
                  {"Learn More —"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPIRITUAL & CULTURAL */}
      <section className="bg-maroon px-6 py-16 lg:px-[108px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="mx-auto flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#fff8f0] lg:text-[48px]">
              {"Spiritual & Cultural"}
            </h2>
            <p className="max-w-[600px] text-lg leading-7 text-[#ffb266]">
              {"Preserving heritage, deepening devotion, serving through faith"}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {spiritualCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-6 rounded-2xl border border-white/20 bg-white/10 p-8"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e47105] text-2xl">
                  {card.emoji}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-[28px] font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="text-base leading-[26px] text-[#fff8f0]/80">
                    {card.desc}
                  </p>
                </div>
                <Link
                  href="/initiatives"
                  className="text-sm font-semibold text-white underline"
                >
                  {"Learn More"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* COMMITMENT BANNER */}
      <section className="bg-[#fffbf3] px-6 py-16 lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-serif text-4xl font-bold text-[#3e1815] sm:text-[56px]">
              {"Our Commitment"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e47105]" />
          </div>
          <p className="max-w-[900px] text-center text-lg leading-8 text-[#595656]">
            {"Every initiative undertaken by Shyam Jagat reflects our unwavering commitment to serving humanity with faith, compassion, and responsibility. Together with our volunteers, members, and supporters, we continue to create meaningful opportunities, provide hope, and build a stronger community where everyone can live with dignity."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/signup"
              className="rounded-lg bg-[#e47105] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              {"Join as Volunteer"}
            </Link>
            <Link
              href="/donation"
              className="rounded-lg border border-[#e47105] px-6 py-3 text-base font-semibold text-[#e47105] transition-colors hover:bg-[#e47105]/10"
            >
              {"Make a Donation"}
            </Link>
          </div>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <section className="bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">
              {"Moments of Seva & Devotion"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e47105]" />
            <p className="text-lg leading-7 text-[#595656]">
              {"A glimpse into the lives we've touched and the memories we've created together."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {galleryFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={
                  filter.key === activeFilter
                    ? "rounded-full bg-[#e47105] px-4 py-2.5 text-sm font-semibold text-white"
                    : "rounded-full border border-[#7b2d2d] px-4 py-2.5 text-sm font-semibold text-[#7b2d2d] transition-colors hover:bg-[#7b2d2d]/5"
                }
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleGallery.map((item) => (
              <div
                key={item.title}
                className="group relative h-[300px] overflow-hidden rounded-xl"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-b from-[#7b2d2d]/0 to-[#7b2d2d]/80 px-4 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#e87722] px-2 py-1 text-xs font-semibold text-white">
                        {item.tag}
                      </span>
                      <p className="text-base font-bold text-white">{item.title}</p>
                    </div>
                    <p className="shrink-0 text-xs text-white/90">{item.meta}</p>
                  </div>
                  <p className="text-xs font-semibold text-[#e87722]">
                    {"View Album →"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta={"Explore"} />

      {/* HOW YOU CAN CONTRIBUTE */}
      <section className="relative overflow-hidden bg-[#fdf6ec] px-6 py-16 lg:px-[108px] lg:py-24">
        <Image
          src="/images/initiatives-page/flower-1.svg"
          alt=""
          width={320}
          height={320}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -left-[120px] -top-[120px] hidden opacity-70 lg:block"
        />
        <Image
          src="/images/initiatives-page/atom-1.svg"
          alt=""
          width={220}
          height={220}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -right-[120px] -top-[120px] hidden opacity-70 lg:block"
        />
        <Image
          src="/images/initiatives-page/flower-2.svg"
          alt=""
          width={280}
          height={280}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -bottom-[68px] -left-[140px] hidden opacity-70 lg:block"
        />
        <Image
          src="/images/initiatives-page/atom-2.svg"
          alt=""
          width={200}
          height={200}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -bottom-[68px] -right-[140px] hidden opacity-70 lg:block"
        />

        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3d1010] lg:text-[48px]">
              {"How You Can Contribute"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="text-lg leading-7 text-[#666]">
              {"Every act of giving - big or small - creates a ripple of change."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contributions.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-[20px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_12px_rgba(0,0,0,0.08)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#e87722] text-2xl">
                  {item.emoji}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#3d1010]">
                  {item.title}
                </h3>
                <p className="text-sm leading-[22px] text-[#444]">{item.desc}</p>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex w-fit items-center justify-center rounded-lg bg-[#e87722] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
