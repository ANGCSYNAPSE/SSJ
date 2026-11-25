"use client";
import Ornament from "@/components/ui/Ornament";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Car,
  Building2,
  Target, Flame, Flower2, HeartHandshake, HandHeart, Sun, Scale, HandHelping } from "lucide-react";
import { NumberTile } from "@/components/ui/ArtCard";
import AdSlot from "@/components/ui/AdSlot";
import SourceNote from "@/components/ui/SourceNote";
import BhajanPlayer, { type Bhajan } from "@/components/baba-shyam/BhajanPlayer";
import WisdomCarousel, { type Wisdom } from "@/components/baba-shyam/WisdomCarousel";
import RitualsTimeline from "@/components/baba-shyam/RitualsTimeline";
import { KHATU } from "@/lib/data/khatuReference";

const wisdomQuotes = [
  "सच्चे दिल से जो याद करे, बाबा श्याम उसकी सुनते हैं।",
  "जो शरण में आया, उसे मेरा आसरा मिला।",
];

/** The sayings that turn by themselves in "Words of Divine Wisdom". */
const WISDOM: Wisdom[] = [
  { text: "Where devotion resides, blessings follow.", by: "Devotional saying" },
  { text: "सच्चे दिल से जो याद करे, बाबा श्याम उसकी सुनते हैं।", by: "Devotional saying", hindi: true },
  { text: "हारे का सहारा, बाबा श्याम हमारा।", by: "The devotees' cry", hindi: true },
  { text: "जो शरण में आया, उसे मेरा आसरा मिला।", by: "Devotional saying", hindi: true },
  { text: "True devotion is shown in selfless service.", by: "Teaching of Baba Shyam" },
];

/** Each bhajan plays from the artist's own (or the label's) channel on YouTube. */
const BHAJANS: Bhajan[] = [
  { title: "Gajab Mere Khatu Wale", hindi: "गजब मेरे खाटू वाले", artist: "Kanhiya Mittal", youtubeId: "2RgwkOoG3R8", channel: "Kanhiya Mittal Entertainments" },
  { title: "Kuch To Hai Sarkar Teri", hindi: "कुछ तो है सरकार तेरी सरकारी में", artist: "Sanjay Mittal", youtubeId: "mnxbQAym4G8", channel: "Saawariya" },
  { title: "Shyam Charno Mein De Do Thikana", hindi: "श्याम चरणों में दे दो ठिकाना", artist: "Lakhbir Singh Lakkha", youtubeId: "hYQ1kM9LJbg", channel: "JMD Bhakti Sagar" },
];

export default function BabaShyamPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const journey = [
    {
      step: 1,
      title: "Birth",
      image: "/images/baba-shyam/timeline/1-birth.png",
      desc: "Born to Ghatotkacha and Maurvi (Morvi), and grandson of the mighty Bhima, he was destined for greatness.",
    },
    {
      step: 2,
      title: "Penance and the Grace of Shiva",
      image: "/images/baba-shyam/timeline/2-training-shiva.png",
      desc: "A warrior of rare skill, he learnt the art of war from his mother Maurvi and prayed with deep devotion to Lord Shiva.",
    },
    {
      step: 3,
      title: "Three Infallible Arrows",
      image: "/images/baba-shyam/timeline/3-three-arrows.png",
      desc: "He held three infallible arrows (Teen Baan), a divine boon that could end any war in moments.",
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
      desc: "When Krishna asked for his head as a gift, he gave it gladly, asking only to see the great war.",
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
    { icon: Flame, tone: "#c2570c", title: "Faith", desc: "Unwavering belief in the divine, even in the darkest of times." },
    { icon: Flower2, tone: "#9b2335", title: "Humility", desc: "True greatness lies in surrender and humbleness before the divine." },
    { icon: HeartHandshake, tone: "#a16207", title: "Sacrifice", desc: "The highest form of devotion is selfless sacrifice for a greater good." },
    { icon: HandHeart, tone: "#0f766e", title: "Compassion", desc: "Baba Shyam teaches us to show kindness to all beings, regardless of status." },
    { icon: Sun, tone: "#3b4a9e", title: "Truth", desc: "Standing for what is right, even when it is the harder path to take." },
    { icon: Scale, tone: "#2f6b3a", title: "Equality", desc: "He blesses the poor and rich alike, seeing no difference among true devotees." },
    { icon: HandHelping, tone: "#8b1d2c", title: "Seva", desc: "Selfless service to others is the truest form of worship." },
  ];

  const testimonials = [
    { quote: "“When all hope seemed lost, I turned to Baba Shyam. My prayers were answered in ways I never imagined possible. His blessings changed my life forever.”", name: "Meera Devi, Jaipur" },
    { quote: "“I have witnessed countless miracles through my devotion to Baba Shyam. He truly is the saviour of the hopeless and the answerer of every true prayer.”", name: "Rajesh Sharma, Delhi" },
    { quote: "“Baba Shyam's grace helped my family through our darkest hour. Our faith in him has only grown stronger with each passing year.”", name: "Anita Singh, Mumbai" },
  ];

  const miracleStats = [
    { value: "Millions", label: "Devotees every year" },
    { value: `${KHATU.history.firstTempleYear} CE`, label: "First temple, by tradition" },
    { value: `${KHATU.distances.ringas} km`, label: "Nishan Yatra walk from Ringas" },
    { value: String(KHATU.aartiCount), label: "Aartis every day" },
  ];

  const festivals = [
    { image: "/images/baba-shyam/festivals/falgun-mela.png", title: "Falgun Mela", when: "February – March (Phalguna)", desc: "The grandest celebration: millions of devotees come, many of them walking the Nishan Yatra from Ringas, over several days." },
    { image: "/images/baba-shyam/festivals/janmashtami.png", title: "Janmashtami", when: "August – September", desc: "Celebrating Lord Krishna's birth with festivities and prayers, for the one who carries Krishna's own name." },
    { image: "/images/baba-shyam/festivals/ekadashi.png", title: "Ekadashi", when: "Twice every month", desc: "A special day for Baba Shyam: devotees fast, pray and travel to Khatushyamji, seeking his blessings." },
    { image: "/images/baba-shyam/festivals/bhajan-sandhya.png", title: "Bhajan Sandhya", when: "At satsang and jagran", desc: "Evenings and all-night gatherings of devotional music, filled with soulful hymns and prayers." },
    { image: "/images/baba-shyam/festivals/shyam-katha.png", title: "Shyam Katha", when: "As devotees gather", desc: "Storytelling sessions narrating the divine tales and teachings of Baba Shyam." },
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
    { icon: MapPin, label: "Location", value: KHATU.place },
    { icon: Clock, label: "Timings", value: "Darshan follows the aarti timetable, which differs in winter and summer (see Daily Temple Rituals)" },
    { icon: Car, label: "Getting there", value: `About ${KHATU.distances.jaipur} km from Jaipur and ${KHATU.distances.sikar} km from Sikar. Nearest station: ${KHATU.nearest.railway} (about ${KHATU.distances.ringas} km); nearest airport: ${KHATU.nearest.airport}` },
    { icon: Building2, label: "Where to stay", value: "Dharamshalas and hotels near the temple (see our Dharamshala directory)" },
    { icon: Target, label: "Nearby", value: "Shyam Kund, the sacred pond beside the temple" },
  ];

  const visibleGallery =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-[112px] flex min-h-[678px] w-full items-center overflow-hidden pt-[112px]">
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
          <h1 className="max-w-xl font-serif text-4xl text-balance font-bold leading-[1.05] text-white lg:text-[72px]">
            {"The Divine Legacy of Baba Shyam"}
          </h1>
          <p className="max-w-xl text-balance md:text-xl italic leading-relaxed text-white/90">
            {"“Sachche dil se jo yaad kare, Baba Shyam uski sunte hain.”"}
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="#journey"
              className="rounded-lg bg-[#e87722] p-4 md:px-8 md:py-3.5 text-sm md:text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              {"Explore His Journey"}
            </Link>
            <Link
              href="/temple-directory"
              className="rounded-lg border border-white p-4 md:px-8 md:py-3.5 text-sm md:text-base font-semibold text-white transition-colors hover:bg-white/10"
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
              <Ornament />
            </div>
            <div className="flex flex-col gap-5 text-base leading-[1.8] text-[#6b4f4f]">
              <p>{"Khatu Shyam Ji, revered as Baba Shyam, is Barbarik, the grandson of the mighty Bhima, whom Lord Krishna blessed to be worshipped in Kalyug by his own name, Shyam. Known as Haare Ka Sahara, the strength of the one who has lost, he is the deity of the poor, the wronged and the hopeless."}</p>
              <p>{"His temple in Khatu, Rajasthan, draws millions of devotees each year who come seeking his blessings, believing that he hears every sincere prayer, especially those made from a place of true devotion and surrender."}</p>
              <p>{"Baba Shyam's story is one of ultimate sacrifice, unwavering faith, and boundless compassion — a story that continues to inspire generations of devotees across the world."}</p>
            </div>
            <div className="grid w-full grid-cols-3 gap-6 text-center text-white">
              {[
                { value: "Millions", label: "Devotees every year" },
                { value: `${KHATU.history.firstTempleYear} CE`, label: "First temple, by tradition" },
                { value: String(KHATU.aartiCount), label: "Aartis every day" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 rounded-xl bg-[#e47105] p-5">
                  <p className="font-serif text-[28px] font-bold">{stat.value}</p>
                  <p className="text-xs font-medium uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
            <SourceNote />
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
            <Ornament />
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
                <p>{"Barbarika was the son of Ghatotkacha and Maurvi (Morvi), and the grandson of Bhima, one of the five Pandavas. From a young age he showed extraordinary courage. He learnt the art of war from his mother and prayed to Lord Shiva with deep devotion."}</p>
                <p>{"By tradition he held three infallible arrows, a divine boon, with which a single warrior could end a whole war. With this power, Barbarika vowed to fight for the weaker side in any battle, so that fairness would be kept."}</p>
                <p>{"When the Mahabharata war approached, Lord Krishna tested Barbarika's resolve. Understanding that Barbarika's power alone could end the war in a single day, Krishna asked for his head as alms, disguised as a Brahmin."}</p>
                <p>{"Barbarika recognised Krishna's true form and offered his head willingly, asking only that he might see the war. His head was placed on a hill, from where he watched the whole battle. Pleased with his devotion, Krishna blessed him to be worshipped in Kalyug under the name Shyam."}</p>
              </div>
              <div className="rounded-xl border border-[#d4a017] bg-white/[0.04] p-8">
                <p className="font-serif text-xl italic leading-relaxed text-[#d4a017]">
                  {"“In Kalyug you will be worshipped by my own name, Shyam, and you will be the support of those who have lost.”"} — Lord Krishna, as the tradition tells it
                </p>
              </div>
              <SourceNote tone="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* THE DIVINE JOURNEY TIMELINE */}
      <section id="journey" className="flex scroll-mt-[112px] flex-col items-center bg-[#fdf6ec] pt-20">
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
            <Ornament />
            <p className="max-w-[600px] text-lg text-[#6b4f4f]">
              {"Timeless wisdom for a devoted life"}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {teachings.map((item, i) => (
              <NumberTile key={item.title} n={i + 1} icon={item.icon} tone={item.tone} title={item.title} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                {item.desc}
              </NumberTile>
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
              <Ornament />
            </div>
            <div className="flex flex-col gap-5 text-base leading-[1.8] text-[#6b4f4f]">
              <p>{"The Khatu Shyam Ji temple, in the small town of Khatu in Sikar district, Rajasthan, is one of the most revered pilgrimage sites in India, drawing devotees from every corner of the country and beyond. By tradition the first temple was built in 1027 CE, at the place where Baba Shyam's head is said to have been found, near what is now Shyam Kund."}</p>
              <p>{"The temple complex, with its intricate architecture and serene atmosphere, offers a spiritual sanctuary where devotees come to seek blessings, fulfill vows, and experience the divine presence of Baba Shyam."}</p>
              <p>{"Every year, especially during the Falgun Mela, the temple witnesses an extraordinary gathering of devotees, each carrying their own story of faith, hope, and gratitude toward Baba Shyam."}</p>
            </div>
            <div className="flex flex-col gap-3">
              {["📍 Khatushyamji, Sikar, Rajasthan", "🕐 Darshan follows the aarti timetable", "🎪 Falgun Mela, every Phalguna"].map((chip) => (
                <span key={chip} className="w-fit rounded-lg bg-[#fdf6ec] px-5 py-3 text-[15px] font-semibold text-[#6b1f1f]">
                  {chip}
                </span>
              ))}
            </div>
            <SourceNote />
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
            <Ornament />
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
            <Ornament />
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
            <Ornament />
            <p className="max-w-[600px] text-lg text-[#6b4f4f]">
              {"The five aartis of every day at Shri Shyam Mandir, Khatushyamji, with their winter and summer times"}
            </p>
          </div>
          <RitualsTimeline />
          <SourceNote className="text-center" />
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
            <Ornament />
          </div>
          <BhajanPlayer bhajans={BHAJANS} />
          <p className="-mt-8 text-center text-xs text-white/45">{"Press play to listen. Each bhajan plays from the singer's own channel on YouTube."}</p>
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
            <Ornament />
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
            <Ornament />
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
              <SourceNote />
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
          <WisdomCarousel items={WISDOM} />
        </div>
      </section>

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta={"Explore"} />
    </>
  );
}
