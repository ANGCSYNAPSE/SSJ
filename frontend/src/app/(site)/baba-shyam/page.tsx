"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lamp,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Car,
  Building2,
  Target,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

const journey = [
  {
    step: 1,
    title: "Birth",
    image: "/images/baba-shyam/timeline/1-birth.png",
    desc: "Born to Ghatotkacha and Ahilavati, Barbarika came into the world with extraordinary strength and divine purpose.",
  },
  {
    step: 2,
    title: "Training from Lord Shiva",
    image: "/images/baba-shyam/timeline/2-training-shiva.png",
    desc: "Through intense penance and devotion, Barbarika received the blessings and training of Lord Shiva himself.",
  },
  {
    step: 3,
    title: "Three Divine Arrows",
    image: "/images/baba-shyam/timeline/3-three-arrows.png",
    desc: "Lord Shiva bestowed upon him three infallible arrows - each capable of destroying entire armies single-handedly.",
  },
  {
    step: 4,
    title: "Meeting Lord Krishna",
    image: "/images/baba-shyam/timeline/4-meeting-krishna.png",
    desc: "Before the Kurukshetra war, Barbarika encountered Lord Krishna who tested his resolve and wisdom.",
  },
  {
    step: 5,
    title: "The Supreme Sacrifice",
    image: "/images/baba-shyam/timeline/5-supreme-sacrifice.png",
    desc: "When Krishna requested his head as an offering, Barbarika unhesitatingly gave it - an act of ultimate devotion.",
  },
  {
    step: 6,
    title: "Witness of Mahabharata",
    image: "/images/baba-shyam/timeline/6-witness-mahabharata.png",
    desc: "His severed head was placed on a hill from where he witnessed the entire Mahabharata war as promised by Krishna.",
  },
  {
    step: 7,
    title: "Blessed as Baba Shyam",
    image: "/images/baba-shyam/timeline/7-blessed-baba-shyam.png",
    desc: "Lord Krishna declared Barbarika would be worshipped as Shyam in Kaliyuga and millions would be blessed by his grace.",
  },
];

const teachings = [
  { emoji: "🙏", title: "Faith", desc: "True devotion brings peace, strength, and divine grace in every moment of life." },
  { emoji: "🌸", title: "Humility", desc: "Remain humble regardless of power or position — greatness lies in simplicity." },
  { emoji: "💛", title: "Sacrifice", desc: "Selfless service and giving without expectation is the highest virtue." },
  { emoji: "🤲", title: "Compassion", desc: "Open your heart and help those who are in need — see the divine in every being." },
  { emoji: "✨", title: "Truth", desc: "Walk the path of righteousness and let truth be your guiding light." },
  { emoji: "🌍", title: "Equality", desc: "Serve everyone without discrimination — all are equal in the eyes of Baba Shyam." },
  { emoji: "🕉️", title: "Seva", desc: "Serving humanity is the truest and highest form of serving God himself." },
];

const testimonials = [
  { quote: "Baba Shyam answered my prayers when all hope was lost. His divine grace brought healing to my family.", name: "Meera Devi, Jaipur" },
  { quote: "I came with a broken heart and left with peace. Baba Shyam's presence is beyond words — it must be felt.", name: "Rajesh Sharma, Delhi" },
  { quote: "Years of struggle ended the moment I surrendered to Baba Shyam with full faith. He never disappoints his devotees.", name: "Anita Singh, Mumbai" },
];

const miracleStats = [
  { value: "10M+", label: "Devotees Annually" },
  { value: "800+", label: "Years of Worship" },
  { value: "100K+", label: "Daily Prayers" },
  { value: "∞", label: "Miracles of Faith" },
];

const festivals = [
  { image: "/images/baba-shyam/festivals/falgun-mela.png", title: "Falgun Mela", when: "Feb/Mar", desc: "The grandest festival when millions visit Khatu for 3 days." },
  { image: "/images/baba-shyam/festivals/janmashtami.png", title: "Janmashtami", when: "August", desc: "Celebrating birth of Lord Krishna with bhajans and midnight puja." },
  { image: "/images/baba-shyam/festivals/ekadashi.png", title: "Ekadashi", when: "Monthly", desc: "Sacred fasting day observed with special aarti and darshan." },
  { image: "/images/baba-shyam/festivals/bhajan-sandhya.png", title: "Bhajan Sandhya", when: "Seasonal", desc: "Devotional music evenings filled with kirtan and community prayer." },
  { image: "/images/baba-shyam/festivals/shyam-katha.png", title: "Shyam Katha", when: "Year-round", desc: "Regular discourses narrating the divine story of Baba Shyam." },
];

const rituals = [
  { time: "4:30 AM", title: "Mangla Aarti", desc: "The first prayer of the day to wake the deity." },
  { time: "7:00 AM", title: "Shringar Darshan", desc: "Deity adorned with ornaments and flowers." },
  { time: "12:00 PM", title: "Rajbhog", desc: "Grand mid-day meal offered to Baba Shyam." },
  { time: "3:00 PM", title: "Afternoon Darshan", desc: "Temple reopens for devotees after rest." },
  { time: "7:00 PM", title: "Sandhya Aarti", desc: "Evening prayers amidst spiritual hymns." },
  { time: "9:00 PM", title: "Shayan Darshan", desc: "Final prayers before the deity retires for night." },
];

const bhajans = [
  { title: "Shyam Teri Bansi", artist: "Popular Devotional Artist" },
  { title: "Hey Shyam Sunder", artist: "Popular Devotional Artist" },
  { title: "Khatu Wale Shyam", artist: "Popular Devotional Artist" },
];

const wisdomQuotes = [
  "सच्चे दिल से जो याद करे, बाबा श्याम उसकी सुनते हैं।",
  "जो शरण में आया, उसे मेरा आसरा मिला।",
];

const galleryFilters = ["All", "Temple", "Devotees", "Aarti", "Decorations", "Festivals", "Annadan"];

const galleryItems = [
  { image: "/images/baba-shyam/gallery/aarti-hall.png", category: "Aarti", height: "h-[260px]" },
  { image: "/images/baba-shyam/gallery/family-blessing.png", category: "Devotees", height: "h-[400px]" },
  { image: "/images/baba-shyam/gallery/annadan-queue.png", category: "Annadan", height: "h-[400px]" },
  { image: "/images/baba-shyam/gallery/temple-courtyard.png", category: "Temple", height: "h-[260px]" },
  { image: "/images/baba-shyam/gallery/diya-evening.png", category: "Festivals", height: "h-[260px]" },
  { image: "/images/baba-shyam/gallery/decorations.png", category: "Decorations", height: "h-[400px]" },
];

const visitFacts = [
  { icon: MapPin, label: "Location", value: "Khatu Village, Sikar, Rajasthan — 80km from Jaipur" },
  { icon: Clock, label: "Timings", value: "4:30 AM – 9:30 PM daily, extended during festivals" },
  { icon: Car, label: "Parking", value: "Large parking facility available near the temple" },
  { icon: Building2, label: "Accommodation", value: "Dharamshalas and hotels available for pilgrims" },
  { icon: Target, label: "Nearby", value: "Salasar Balaji — 65km, Ringas Railway Station — 17km" },
];

function Waveform({ seed }: { seed: number }) {
  const bars = Array.from({ length: 20 }, (_, i) => {
    const h = 4 + ((seed * (i + 3) * 37) % 20);
    return h;
  });
  return (
    <div className="flex items-center gap-[2px] pt-2">
      {bars.map((h, i) => (
        <span key={i} className="w-[3px] rounded-sm bg-[#d4a017]" style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}

export default function BabaShyamPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [quoteIndex, setQuoteIndex] = useState(0);

  const visibleGallery =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-[100px] flex min-h-[678px] w-full items-center overflow-hidden pt-[100px]">
        <Image
          src="/images/baba-shyam/hero.png"
          alt="Khatu Shyam temple gate decorated for celebration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0505]/80 via-[#1a0505]/0 to-[#1a0505]/0" />
        <div className="relative w-full max-w-[1440px] mx-auto flex flex-col gap-8 px-6 py-16 lg:px-[100px]">
          <h1 className="max-w-xl font-serif text-6xl font-bold leading-[1.05] text-white lg:text-[72px]">
            The Divine Legacy of Baba Shyam
          </h1>
          <p className="max-w-xl text-xl italic leading-relaxed text-white/90">
            &quot;A symbol of sacrifice, compassion, courage, and unwavering devotion who continues to bless millions of devotees across the world.&quot;
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="#journey"
              className="rounded-lg bg-[#e87722] px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore His Journey
            </Link>
            <Link
              href="/temple-directory"
              className="rounded-lg border border-white px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Visit Khatu Temple
            </Link>
          </div>
        </div>
      </section>

      {/* AD - LEADERBOARD */}
      <AdSlot size="leaderboard" />

      {/* THE DIVINE STORY */}
      <section className="bg-[#fdf6ec] px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 lg:flex-row">
          <div className="flex h-[600px] w-full max-w-[483px] items-start rounded-3xl border-8 border-[#d4a017] bg-white p-3 shrink-0">
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src="/images/baba-shyam/divine-story.png"
                alt="Traditional painting of Khatu Shyam Ji"
                fill
                sizes="(min-width: 1024px) 483px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex max-w-[677px] flex-col items-start gap-8">
            <span className="text-4xl">⚛</span>
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
                The Divine Story of Khatu Shyam Ji
              </h2>
              <div className="h-[3px] w-[100px] bg-[#e87722]" />
            </div>
            <div className="flex flex-col gap-5 text-base leading-[1.8] text-[#6b4f4f]">
              <p>
                Baba Shyam, worshipped as Khatu Shyam Ji, is believed to be the incarnation of Barbarika, the brave grandson of Bhima from the Mahabharata. Renowned for his unmatched courage, humility, and devotion, Barbarika willingly sacrificed his head before the Kurukshetra war upon Lord Krishna&apos;s request.
              </p>
              <p>
                Pleased by this supreme sacrifice, Lord Krishna granted him the divine blessing that in Kaliyuga he would be worshipped as Shyam, and devotees remembering him with sincere faith would receive his blessings.
              </p>
              <p>Today, millions visit Khatu every year seeking peace, hope, strength, and divine grace.</p>
            </div>
            <div className="grid w-full grid-cols-3 gap-6 text-center text-white">
              {[
                { value: "10M+", label: "Annual Devotees" },
                { value: "800+", label: "Years of Faith" },
                { value: "1", label: "Sacred Temple" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 rounded-xl bg-[#e47105] p-5">
                  <p className="font-serif text-[28px] font-bold">{stat.value}</p>
                  <p className="text-xs font-medium uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE SACRED HISTORY */}
      <section className="bg-maroon px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-white lg:text-[48px]">
              The Sacred History
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
          </div>
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="relative h-[500px] w-full max-w-[580px] shrink-0 overflow-hidden rounded-3xl">
              <Image
                src="/images/baba-shyam/sacred-history.png"
                alt="Painting of Lord Krishna blessing Barbarika"
                fill
                sizes="(min-width: 1024px) 580px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex max-w-[580px] flex-col gap-6">
              <div className="flex flex-col gap-4 text-base leading-[1.8] text-[#f5f1e8]">
                <p>
                  Barbarika was born to Ghatotkacha and Ahilavati. From childhood he displayed exceptional bravery and dedication toward righteousness.
                </p>
                <p>
                  Through intense penance, he received three infallible arrows and a divine bow from Lord Shiva.
                </p>
                <p>
                  Before the Mahabharata war, he vowed to always support the weaker side. Recognizing the consequences of this promise, Lord Krishna tested him and eventually requested his head as an offering.
                </p>
                <p>
                  Without hesitation, Barbarika accepted, demonstrating the highest form of devotion and sacrifice. His severed head was placed on a hill from where he witnessed the entire Mahabharata war.
                </p>
              </div>
              <div className="rounded-xl border border-[#d4a017] bg-white/[0.04] p-8">
                <p className="font-serif text-xl italic leading-relaxed text-[#d4a017]">
                  &quot;In Kaliyuga, you shall be worshipped as Shyam — and those who remember you with sincerity shall receive your blessings.&quot; — Lord Krishna
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* THE DIVINE JOURNEY TIMELINE */}
      <section id="journey" className="flex scroll-mt-[100px] flex-col items-center bg-[#fdf6ec] pt-20">
        <div className="flex flex-col items-center gap-3 px-6 pb-16 text-center lg:px-[100px]">
          <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[52px]">
            The Divine Journey of Barbarika
          </h2>
          <div className="h-2 w-36 rounded-full bg-[#e47105]" />
          <p className="max-w-[700px] text-base leading-relaxed text-[#7a5c3a]">
            From a warrior&apos;s birth to eternal divine grace - the sacred story of Baba Shyam.
          </p>
        </div>

        <div className="relative w-full max-w-[900px] px-6 lg:px-0">
          <div className="absolute inset-y-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-[#c8961e]/40 lg:block" />
          {journey.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <div key={item.step} className="relative flex flex-col items-center gap-6 py-8 lg:flex-row lg:gap-0">
                <div
                  className={`flex flex-col items-center gap-3 lg:w-[380px] ${
                    left ? "lg:items-end lg:pr-10 lg:text-right" : "lg:order-3 lg:items-start lg:pl-10 lg:text-left"
                  }`}
                >
                  <div className="relative h-[180px] w-[280px] overflow-hidden rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.25)]">
                    <Image src={item.image} alt={item.title} fill sizes="280px" className="object-cover" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-[#6b1f1f]">{item.title}</p>
                  <p className="max-w-[374px] text-base leading-relaxed text-[#6b4f4f]">{item.desc}</p>
                </div>
                <div className="flex shrink-0 items-center justify-center lg:order-2 lg:w-[120px]">
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] border-[#d4a017] bg-maroon shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                    <p className="font-serif text-xl font-bold text-[#d4a017]">{item.step}</p>
                  </div>
                </div>
                <div className={`hidden lg:block lg:w-[380px] ${left ? "lg:order-3" : "lg:order-1"}`} />
              </div>
            );
          })}
        </div>

        <div className="flex w-full flex-col items-center gap-4 bg-maroon px-6 py-16 lg:px-[100px]">
          <div className="h-1.5 w-[190px] rounded-full bg-[#d4a017]/50" />
          <p className="text-center font-serif text-3xl font-bold text-[#d4a017]">
            Faith. Devotion. Sacrifice. Blessings.
          </p>
          <p className="text-center font-serif text-2xl font-bold tracking-[2px] text-[#f5edd8]">
            Jai Shree Shyam!
          </p>
          <div className="h-1.5 w-[190px] rounded-full bg-[#d4a017]/50" />
        </div>
      </section>

      {/* TEACHINGS */}
      <section className="bg-[#fdf6ec] px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
              Teachings of Baba Shyam
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="max-w-[600px] text-lg text-[#6b4f4f]">
              Sacred values and virtues that guide millions on the path of righteous living.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {teachings.map((t) => (
              <div
                key={t.title}
                className="flex w-full max-w-[380px] flex-col gap-5 rounded-2xl bg-white p-10 shadow-[0_12px_12px_rgba(212,160,23,0.13)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fdf6ec] text-3xl">
                  {t.emoji}
                </div>
                <p className="font-serif text-[28px] font-bold text-[#6b1f1f]">{t.title}</p>
                <p className="text-[15px] leading-relaxed text-[#6b4f4f]">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE DIVINE ABODE */}
      <section className="bg-white px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 lg:flex-row">
          <div className="flex w-full max-w-[580px] flex-col gap-6 shrink-0">
            <div className="relative h-[400px] w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/baba-shyam/abode/main.png"
                alt="Khatu Shyam temple at sunset"
                fill
                sizes="(min-width: 1024px) 580px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative h-[240px] overflow-hidden rounded-2xl">
                <Image
                  src="/images/baba-shyam/abode/mela.png"
                  alt="Falgun Mela crowd"
                  fill
                  sizes="(min-width: 1024px) 290px, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[240px] overflow-hidden rounded-2xl">
                <Image
                  src="/images/baba-shyam/abode/evening.png"
                  alt="Temple illuminated in the evening"
                  fill
                  sizes="(min-width: 1024px) 290px, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex max-w-[602px] flex-col gap-8">
            <span className="w-fit rounded border border-[#e87722] px-4 py-2 text-xs font-bold uppercase text-[#e87722]">
              Sacred Pilgrimage
            </span>
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
                The Divine Abode of Baba Shyam
              </h2>
              <div className="h-[3px] w-[100px] bg-[#e87722]" />
            </div>
            <div className="flex flex-col gap-5 text-base leading-[1.8] text-[#6b4f4f]">
              <p>
                The sacred Khatu Shyam Temple is located in Khatu village, Sikar district, Rajasthan. According to tradition, Baba Shyam&apos;s divine head was discovered at this location and later enshrined by the local king following divine guidance.
              </p>
              <p>
                Over the centuries, the temple has become one of India&apos;s most revered pilgrimage destinations, welcoming millions of devotees every year.
              </p>
              <p>
                Especially during the annual Falgun Mela, when devotees gather from across the world to seek Baba Shyam&apos;s blessings, the temple transforms into a magnificent ocean of faith and devotion.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {["📍 Sikar, Rajasthan", "🕐 Open 4 AM – 10 PM", "🎪 Falgun Mela (Annual)"].map((chip) => (
                <span key={chip} className="w-fit rounded-lg bg-[#fdf6ec] px-5 py-3 text-[15px] font-semibold text-[#6b1f1f]">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta="Explore" />

      {/* MIRACLES & DIVINE BLESSINGS */}
      <section className="bg-maroon px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-white lg:text-[48px]">
              Miracles &amp; Divine Blessings
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="text-lg italic text-[#f5f1e8]">
              &quot;Countless devotees believe Baba Shyam fulfills sincere prayers.&quot;
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-6 rounded-3xl border border-[#d4af37]/25 bg-white/5 p-10"
              >
                <p className="text-[80px] leading-[0.1] text-[#d4a017] opacity-30">&ldquo;</p>
                <p className="text-lg italic leading-relaxed text-white">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <span className="h-px w-5 bg-[#d4a017]" />
                  <p className="text-sm font-semibold uppercase text-[#d4a017]">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8 rounded-3xl bg-white/[0.03] p-10 lg:grid-cols-4">
            {miracleStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 text-center">
                <p className="font-serif text-4xl font-bold text-[#d4a017]">{s.value}</p>
                <p className="text-[13px] uppercase text-[#f5f1e8]/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FESTIVALS & CELEBRATIONS */}
      <section className="bg-white px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
              Festivals &amp; Celebrations
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {festivals.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-4 rounded-xl border-t-4 border-[#d4af37]/25 bg-[#fdf6ec] p-6"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-lg">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-serif text-2xl font-bold text-[#6b1f1f]">{f.title}</p>
                  <p className="text-xs font-semibold uppercase text-[#e87722]">{f.when}</p>
                  <p className="text-sm leading-relaxed text-[#6b4f4f]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAILY TEMPLE RITUALS */}
      <section className="bg-[#fdf6ec] px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
              Daily Temple Rituals
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="max-w-[600px] text-lg text-[#6b4f4f]">
              The sacred schedule of worship observed every day at Khatu Shyam Temple.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
            {rituals.map((r, i) => (
              <div key={r.time} className="flex flex-col items-center gap-6">
                <div className="flex w-full items-center">
                  <span className={`h-px flex-1 ${i === 0 ? "bg-transparent" : "bg-[#d4a017]/50"}`} />
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-maroon text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className={`h-px flex-1 ${i === rituals.length - 1 ? "bg-transparent" : "bg-[#d4a017]/50"}`} />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-[0_4px_5px_rgba(0,0,0,0.05)]">
                    <Lamp className="h-8 w-8 text-[#8b2e2e]" aria-hidden />
                  </div>
                  <p className="text-sm font-bold text-[#e87722]">{r.time}</p>
                  <p className="text-center font-serif text-xl font-bold text-[#6b1f1f]">{r.title}</p>
                  <p className="max-w-[160px] text-center text-[13px] leading-relaxed text-[#6b4f4f]">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* BHAJANS & SPIRITUAL WISDOM */}
      <section className="bg-maroon px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-white lg:text-[48px]">
              Bhajans &amp; Spiritual Wisdom
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {bhajans.map((b, i) => (
              <div key={b.title} className="flex items-center gap-5 rounded-2xl bg-white/5 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d4a017]">
                  <PlayCircle className="h-[18px] w-[18px] text-maroon" aria-hidden />
                </span>
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-serif text-xl font-bold text-white">{b.title}</p>
                  <p className="text-xs text-[#d4a017]/80">{b.artist}</p>
                  <Waveform seed={i + 1} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {wisdomQuotes.map((q) => (
              <div
                key={q}
                className="flex items-center justify-center rounded-2xl border border-[#d4a017] bg-white/[0.02] p-12"
              >
                <p className="text-center font-serif text-3xl italic text-[#f5f1e8]">&quot;{q}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVINE MOMENTS GALLERY */}
      <section className="bg-white px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
              Divine Moments Gallery
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {galleryFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={
                  filter === activeFilter
                    ? "rounded-full bg-[#e87722] px-5 py-2.5 text-sm font-semibold text-white"
                    : "rounded-full bg-[#fdf6ec] px-5 py-2.5 text-sm font-semibold text-[#6b1f1f] transition-colors hover:bg-[#f3e6cf]"
                }
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {visibleGallery.map((item) => (
              <div key={item.image} className={`relative w-full overflow-hidden rounded-2xl ${item.height}`}>
                <Image
                  src={item.image}
                  alt={item.category}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN YOUR VISIT */}
      <section className="bg-white px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
              Plan Your Visit to Khatu
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
          </div>
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="flex w-full max-w-[483px] flex-col gap-4 shrink-0">
              {visitFacts.map((fact) => (
                <div key={fact.label} className="flex items-center gap-5 rounded-xl bg-[#fdf6ec] p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                    <fact.icon className="h-5 w-5 text-[#6b1f1f]" aria-hidden />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-bold uppercase text-[#e87722]">{fact.label}</p>
                    <p className="text-[15px] text-[#6b1f1f]">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-[400px] w-full max-w-[677px] overflow-hidden rounded-3xl border-8 border-[#d4af37]/25 lg:h-[560px]">
              <Image
                src="/images/baba-shyam/map.png"
                alt="Illustrated map of Khatu Shyam Temple and Shyam Kund"
                fill
                sizes="(min-width: 1024px) 677px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WORDS OF DIVINE WISDOM CAROUSEL */}
      <section className="relative flex min-h-[686px] w-full flex-col items-center justify-center overflow-hidden bg-maroon px-6 py-16 lg:px-[100px]">
        <Image
          src="/images/baba-shyam/testimonial-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative flex w-full max-w-[1440px] flex-col items-center gap-14">
          <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">
            Words of Divine Wisdom
          </h2>
          <div className="flex w-full items-center justify-between gap-6">
            <button
              type="button"
              aria-label="Previous quote"
              onClick={() => setQuoteIndex((i) => (i === 0 ? wisdomQuotes.length - 1 : i - 1))}
              className="shrink-0 text-[#3e1815] transition-opacity hover:opacity-70"
            >
              <ChevronLeft className="h-8 w-8" aria-hidden />
            </button>
            <div className="flex max-w-[800px] flex-col items-center gap-6">
              <p className="text-[80px] leading-[0.1] text-[#e87722] opacity-30">&ldquo;</p>
              <p className="text-center font-serif text-3xl font-semibold italic text-[#e47105] lg:text-4xl">
                &quot;Where devotion resides, blessings follow.&quot;
              </p>
              <p className="text-sm font-semibold uppercase text-[#3e1815]">Divine Proverb</p>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === quoteIndex % 3 ? "bg-[#3e1815]" : "bg-[#3e1815]/30"}`}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              aria-label="Next quote"
              onClick={() => setQuoteIndex((i) => (i + 1) % wisdomQuotes.length)}
              className="shrink-0 text-[#3e1815] transition-opacity hover:opacity-70"
            >
              <ChevronRight className="h-8 w-8" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta="Explore" />
    </>
  );
}
