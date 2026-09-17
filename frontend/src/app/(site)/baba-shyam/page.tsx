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

const wisdomQuotes = [
  "सच्चे दिल से जो याद करे, बाबा श्याम उसकी सुनते हैं।",
  "जो शरण में आया, उसे मेरा आसरा मिला।",
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
  const [activeFilter, setActiveFilter] = useState("all");
  const [quoteIndex, setQuoteIndex] = useState(0);

  const journey = [
    {
      step: 1,
      title: "Birth",
      image: "/images/baba-shyam/timeline/1-birth.png",
      desc: "Born to Ghatotkacha and Ahilyavati, grandson of the mighty Bhima, destined for greatness.",
    },
    {
      step: 2,
      title: "Training from Lord Shiva",
      image: "/images/baba-shyam/timeline/2-training-shiva.png",
      desc: "Blessed with unmatched skills in warfare and archery directly from Lord Shiva.",
    },
    {
      step: 3,
      title: "Three Divine Arrows",
      image: "/images/baba-shyam/timeline/3-three-arrows.png",
      desc: "Received three invincible arrows from Lord Agni, capable of ending any war instantly.",
    },
    {
      step: 4,
      title: "Meeting Lord Krishna",
      image: "/images/baba-shyam/timeline/4-meeting-krishna.png",
      desc: "Encountered Lord Krishna, who tested his devotion and true understanding of dharma.",
    },
    {
      step: 5,
      title: "The Supreme Sacrifice",
      image: "/images/baba-shyam/timeline/5-supreme-sacrifice.png",
      desc: "Offered his own head as the ultimate act of devotion to ensure fairness in the great war.",
    },
    {
      step: 6,
      title: "Witness of Mahabharata",
      image: "/images/baba-shyam/timeline/6-witness-mahabharata.png",
      desc: "His head watched the entire Mahabharata war from atop a hill, seeing all that unfolded.",
    },
    {
      step: 7,
      title: "Blessed as Baba Shyam",
      image: "/images/baba-shyam/timeline/7-blessed-baba-shyam.png",
      desc: "Krishna blessed him to be worshipped in Kalyug as Shyam, granter of every true prayer.",
    },
  ];

  const teachings = [
    { emoji: "🙏", title: "Faith", desc: "Unwavering belief in the divine, even in the darkest of times." },
    { emoji: "🌸", title: "Humility", desc: "True greatness lies in surrender and humbleness before the divine." },
    { emoji: "💛", title: "Sacrifice", desc: "The highest form of devotion is selfless sacrifice for a greater good." },
    { emoji: "🤲", title: "Compassion", desc: "Baba Shyam teaches us to show kindness to all beings, regardless of status." },
    { emoji: "✨", title: "Truth", desc: "Standing for what is right, even when it is the harder path to take." },
    { emoji: "🌍", title: "Equality", desc: "He blesses the poor and rich alike, seeing no difference among true devotees." },
    { emoji: "🕉️", title: "Seva", desc: "Selfless service to others is the truest form of worship." },
  ];

  const testimonials = [
    { quote: "“When all hope seemed lost, I turned to Baba Shyam. My prayers were answered in ways I never imagined possible. His blessings changed my life forever.”", name: "Meera Devi, Jaipur" },
    { quote: "“I have witnessed countless miracles through my devotion to Baba Shyam. He truly is the saviour of the hopeless and the answerer of every true prayer.”", name: "Rajesh Sharma, Delhi" },
    { quote: "“Baba Shyam's grace helped my family through our darkest hour. Our faith in him has only grown stronger with each passing year.”", name: "Anita Singh, Mumbai" },
  ];

  const miracleStats = [
    { value: "10M+", label: "Devotees Annually" },
    { value: "800+", label: "Years of Worship" },
    { value: "100K+", label: "Daily Prayers" },
    { value: "∞", label: "Miracles of Faith" },
  ];

  const festivals = [
    { image: "/images/baba-shyam/festivals/falgun-mela.png", title: "Falgun Mela", when: "March (Annual)", desc: "The grandest celebration, drawing millions of devotees over several days of devotion and festivity." },
    { image: "/images/baba-shyam/festivals/janmashtami.png", title: "Janmashtami", when: "August", desc: "Celebrating Lord Krishna's birth with grand festivities and midnight prayers at the temple." },
    { image: "/images/baba-shyam/festivals/ekadashi.png", title: "Ekadashi", when: "Twice Monthly", desc: "Special prayers and fasting observed by devotees, seeking Baba Shyam's blessings." },
    { image: "/images/baba-shyam/festivals/bhajan-sandhya.png", title: "Bhajan Sandhya", when: "Every Evening", desc: "Devotional music sessions filling the temple with soulful hymns and prayers." },
    { image: "/images/baba-shyam/festivals/shyam-katha.png", title: "Shyam Katha", when: "Weekly", desc: "Storytelling sessions narrating the divine tales and teachings of Baba Shyam." },
  ];

  const rituals = [
    { time: "4:30 AM", title: "Mangla Aarti", desc: "The first prayer of the day, welcoming Baba Shyam with devotion at dawn." },
    { time: "7:00 AM", title: "Shringar Darshan", desc: "Devotees witness Baba Shyam adorned in beautiful attire and ornaments." },
    { time: "12:00 PM", title: "Rajbhog", desc: "A grand offering of food is presented to Baba Shyam at midday." },
    { time: "3:00 PM", title: "Afternoon Darshan", desc: "Devotees continue to seek blessings throughout the afternoon hours." },
    { time: "7:00 PM", title: "Sandhya Aarti", desc: "The evening prayer, marking the transition from day to night with devotion." },
    { time: "9:00 PM", title: "Shayan Darshan", desc: "The final prayer of the day, as Baba Shyam is prepared for rest." },
  ];

  const bhajans = [
    { title: "Shyam Teri Bansi", artist: "Popular Devotional Artist" },
    { title: "Hey Shyam Sunder", artist: "Popular Devotional Artist" },
    { title: "Khatu Wale Shyam", artist: "Popular Devotional Artist" },
  ];

  const galleryFilters = [
    { key: "all", label: "All" },
    { key: "Temple", label: "Temple" },
    { key: "Devotees", label: "Devotees" },
    { key: "Aarti", label: "Aarti" },
    { key: "Decorations", label: "Decorations" },
    { key: "Festivals", label: "Festivals" },
    { key: "Annadan", label: "Annadan" },
  ];

  const galleryItems = [
    { image: "/images/baba-shyam/gallery/aarti-hall.png", category: "Aarti", height: "h-[260px]" },
    { image: "/images/baba-shyam/gallery/family-blessing.png", category: "Devotees", height: "h-[400px]" },
    { image: "/images/baba-shyam/gallery/annadan-queue.png", category: "Annadan", height: "h-[400px]" },
    { image: "/images/baba-shyam/gallery/temple-courtyard.png", category: "Temple", height: "h-[260px]" },
    { image: "/images/baba-shyam/gallery/diya-evening.png", category: "Festivals", height: "h-[260px]" },
    { image: "/images/baba-shyam/gallery/decorations.png", category: "Decorations", height: "h-[400px]" },
  ];

  const visitFacts = [
    { icon: MapPin, label: "Location", value: "Khatu, Sikar District, Rajasthan" },
    { icon: Clock, label: "Timings", value: "4:00 AM – 10:00 PM (Daily)" },
    { icon: Car, label: "Parking", value: "Ample parking available near the temple complex" },
    { icon: Building2, label: "Accommodation", value: "Numerous dharamshalas and hotels nearby" },
    { icon: Target, label: "Nearby", value: "Well connected by road, rail, and air from major cities" },
  ];

  const visibleGallery =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-[140px] flex min-h-[678px] w-full items-center overflow-hidden pt-[140px]">
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
            {"The Divine Legacy of Baba Shyam"}
          </h1>
          <p className="max-w-xl text-xl italic leading-relaxed text-white/90">
            {"“Sachche dil se jo yaad kare, Baba Shyam uski sunte hain.”"}
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="#journey"
              className="rounded-lg bg-[#e87722] px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              {"Explore His Journey"}
            </Link>
            <Link
              href="/temple-directory"
              className="rounded-lg border border-white px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              {"Visit Khatu Temple"}
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
                {"The Divine Story of Khatu Shyam Ji"}
              </h2>
              <div className="h-[3px] w-[100px] bg-[#e87722]" />
            </div>
            <div className="flex flex-col gap-5 text-base leading-[1.8] text-[#6b4f4f]">
              <p>{"Khatu Shyam Ji, revered as Baba Shyam, is worshipped as an incarnation of Lord Krishna's blessing to Barbarika, the grandson of the mighty Bhima. Known as the “King of Kalyug,” he is the deity of the poor, the wronged, and the hopeless."}</p>
              <p>{"His temple in Khatu, Rajasthan, draws millions of devotees each year who come seeking his blessings, believing that he answers every sincere prayer, especially those made from a place of true devotion and surrender."}</p>
              <p>{"Baba Shyam's story is one of ultimate sacrifice, unwavering faith, and boundless compassion — a story that continues to inspire generations of devotees across the world."}</p>
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
              {"The Sacred History"}
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
                <p>{"Barbarika was the son of Ghatotkacha and grandson of Bhima, one of the five Pandavas. From a young age, he was blessed with extraordinary courage and was trained in the art of warfare by none other than Lord Shiva himself."}</p>
                <p>{"He was granted three invincible arrows by Lord Agni, which could destroy any enemy and always returned to his quiver. With this power, Barbarika vowed to fight for the weaker side in any battle to ensure fairness."}</p>
                <p>{"When the Mahabharata war approached, Lord Krishna tested Barbarika's resolve. Understanding that Barbarika's power alone could end the war in a single day, Krishna asked for his head as alms, disguised as a Brahmin."}</p>
                <p>{"Barbarika, recognizing Krishna's true form, offered his head willingly, fulfilling his promise of ultimate sacrifice. Pleased with his devotion, Krishna blessed him to be worshipped in Kalyug under the name Shyam."}</p>
              </div>
              <div className="rounded-xl border border-[#d4a017] bg-white/[0.04] p-8">
                <p className="font-serif text-xl italic leading-relaxed text-[#d4a017]">
                  {"“Whoever worships Barbarika's head with a true heart shall receive blessings equal to worshipping me myself.”"} — Lord Krishna
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* THE DIVINE JOURNEY TIMELINE */}
      <section id="journey" className="flex scroll-mt-[140px] flex-col items-center bg-[#fdf6ec] pt-20">
        <div className="flex flex-col items-center gap-3 px-6 pb-16 text-center lg:px-[100px]">
          <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[52px]">
            {"The Divine Journey of Barbarika"}
          </h2>
          <div className="h-2 w-36 rounded-full bg-[#e47105]" />
          <p className="max-w-[700px] text-base leading-relaxed text-[#7a5c3a]">
            {"From a mighty warrior to the beloved deity of Kalyug"}
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
            {"Faith. Devotion. Sacrifice. Blessings."}
          </p>
          <p className="text-center font-serif text-2xl font-bold tracking-[2px] text-[#f5edd8]">
            {"Jai Shree Shyam!"}
          </p>
          <div className="h-1.5 w-[190px] rounded-full bg-[#d4a017]/50" />
        </div>
      </section>

      {/* TEACHINGS */}
      <section className="bg-[#fdf6ec] px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
              {"Teachings of Baba Shyam"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="max-w-[600px] text-lg text-[#6b4f4f]">
              {"Timeless wisdom for a devoted life"}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {teachings.map((item) => (
              <div
                key={item.title}
                className="flex w-full max-w-[380px] flex-col gap-5 rounded-2xl bg-white p-10 shadow-[0_12px_12px_rgba(212,160,23,0.13)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fdf6ec] text-3xl">
                  {item.emoji}
                </div>
                <p className="font-serif text-[28px] font-bold text-[#6b1f1f]">{item.title}</p>
                <p className="text-[15px] leading-relaxed text-[#6b4f4f]">{item.desc}</p>
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
              {"Sacred Pilgrimage"}
            </span>
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#6b1f1f] lg:text-[48px]">
                {"The Divine Abode of Khatu Shyam Ji"}
              </h2>
              <div className="h-[3px] w-[100px] bg-[#e87722]" />
            </div>
            <div className="flex flex-col gap-5 text-base leading-[1.8] text-[#6b4f4f]">
              <p>{"The Khatu Shyam Ji temple, located in the small town of Khatu in Sikar district, Rajasthan, stands as one of the most revered pilgrimage sites in India, drawing devotees from every corner of the country and beyond."}</p>
              <p>{"The temple complex, with its intricate architecture and serene atmosphere, offers a spiritual sanctuary where devotees come to seek blessings, fulfill vows, and experience the divine presence of Baba Shyam."}</p>
              <p>{"Every year, especially during the Falgun Mela, the temple witnesses an extraordinary gathering of devotees, each carrying their own story of faith, hope, and gratitude toward Baba Shyam."}</p>
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
      <AdSlot size="banner" cta={"Explore"} />

      {/* MIRACLES & DIVINE BLESSINGS */}
      <section className="bg-maroon px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-white lg:text-[48px]">
              {"Miracles & Divine Blessings"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="text-lg italic text-[#f5f1e8]">{"Stories of faith from devotees whose prayers were answered"}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="flex flex-col gap-6 rounded-3xl border border-[#d4af37]/25 bg-white/5 p-10"
              >
                <p className="text-[80px] leading-[0.1] text-[#d4a017] opacity-30">&ldquo;</p>
                <p className="text-lg italic leading-relaxed text-white">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <span className="h-px w-5 bg-[#d4a017]" />
                  <p className="text-sm font-semibold uppercase text-[#d4a017]">{item.name}</p>
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
              {"Festivals & Celebrations"}
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
              {"Daily Temple Rituals"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
            <p className="max-w-[600px] text-lg text-[#6b4f4f]">
              {"The sacred rhythm of devotion at Khatu Shyam Ji temple"}
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
              {"Bhajans & Spiritual Wisdom"}
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
              {"Divine Moments Gallery"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e87722]" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {galleryFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={
                  filter.key === activeFilter
                    ? "rounded-full bg-[#e87722] px-5 py-2.5 text-sm font-semibold text-white"
                    : "rounded-full bg-[#fdf6ec] px-5 py-2.5 text-sm font-semibold text-[#6b1f1f] transition-colors hover:bg-[#f3e6cf]"
                }
              >
                {filter.label}
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
              {"Plan Your Visit"}
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
            {"Words of Divine Wisdom"}
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
                {"Where devotion resides, blessings follow."}
              </p>
              <p className="text-sm font-semibold uppercase text-[#3e1815]">{"Divine Proverb"}</p>
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
      <AdSlot size="banner" cta={"Explore"} />
    </>
  );
}
