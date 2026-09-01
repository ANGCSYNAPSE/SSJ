"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Sparkles,
  Star,
  ChevronDown,
  Search,
  ArrowRight,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

type SelectProps = {
  icon: ComponentType<{ className?: string }>;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function FilterSelect({ icon: Icon, options, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center gap-2 rounded-lg border border-[rgba(212,175,55,0.25)] bg-white px-4 py-3 text-sm"
      >
        <Icon className="h-4 w-4 shrink-0 text-[#595656]" aria-hidden />
        <span className="flex-1 text-left text-[#595656]">{value}</span>
        <ChevronDown
          className={`h-3 w-3 shrink-0 text-[#595656] transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-[rgba(212,175,55,0.25)] bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm ${
                value === option
                  ? "bg-primary text-white"
                  : "text-[#595656] hover:bg-cream"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const cities = ["Select City", "Khatu", "Jaipur", "Udaipur", "Delhi", "Veraval"];
const templeTypes = ["All Types", "Ancient Temple", "Modern Temple", "Pilgrimage Site"];
const pujaTypes = ["Puja, Darshan, Seva", "Puja Only", "Darshan Only", "Seva Only"];
const ratings = ["Any Rating", "4.8+ Stars", "4.5+ Stars", "4.0+ Stars"];

const regions = ["All", "Rajasthan", "Delhi", "Gujarat", "Maharashtra", "UP"];

const temples = [
  {
    id: 1,
    name: "Khatu Shyam Temple",
    location: "Sikar, Rajasthan",
    region: "Rajasthan",
    rating: 4.9,
    image: "/images/temple-directory/khatu-shyam.png",
    description: "The sacred abode of Baba Shyam — India's most revered pilgrimage.",
    services: ["Darshan", "Puja", "Live Aarti"],
  },
  {
    id: 2,
    name: "Salasar Balaji Temple",
    location: "Churu, Rajasthan",
    region: "Rajasthan",
    rating: 4.8,
    image: "/images/temple-directory/salasar-balaji.png",
    description: "Ancient Hanuman temple known for miraculous blessings and devotion.",
    services: ["Darshan", "Seva"],
  },
  {
    id: 3,
    name: "Mehandipur Balaji",
    location: "Dausa, Rajasthan",
    region: "Rajasthan",
    rating: 4.7,
    image: "/images/temple-directory/mehandipur.png",
    description: "A powerful spiritual destination for healing and divine intervention.",
    services: ["Puja", "Healing"],
  },
  {
    id: 4,
    name: "ISKCON Temple",
    location: "Delhi",
    region: "Delhi",
    rating: 4.8,
    image: "/images/temple-directory/iskcon.png",
    description: "A grand Krishna temple promoting devotion, education, and community.",
    services: ["Darshan", "Bhajan", "Food"],
  },
  {
    id: 5,
    name: "Akshardham Temple",
    location: "Delhi",
    region: "Delhi",
    rating: 4.9,
    image: "/images/temple-directory/akshardham.png",
    description: "Magnificent temple showcasing Indian culture, spirituality, and architecture.",
    services: ["Darshan", "Exhibition"],
  },
  {
    id: 6,
    name: "Somnath Temple",
    location: "Gujarat",
    region: "Gujarat",
    rating: 4.9,
    image: "/images/temple-directory/somnath.png",
    description: "One of the 12 Jyotirlingas — a timeless symbol of faith and resilience.",
    services: ["Darshan", "Puja", "Aarti"],
  },
];

const services = [
  {
    emoji: "🛕",
    title: "Register Your Temple",
    desc: "List your temple on our platform — manage profiles, schedules, offerings, and connect with thousands of devotees online.",
  },
  {
    emoji: "📅",
    title: "Book Puja & Seva",
    desc: "Browse available pujas, sevas, and special rituals at registered temples. Book online with instant confirmation.",
  },
  {
    emoji: "📺",
    title: "Live Darshan",
    desc: "Watch live aarti and darshan streams from temples across India. Stay connected to your faith from anywhere.",
  },
  {
    emoji: "🎤",
    title: "Book Artists",
    desc: "Find and book bhajan singers, katha speakers, and performers for temple events and celebrations.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Profile",
    desc: "Fill in your temple's name, location, history, timings, and upload photos to create a stunning temple profile.",
  },
  {
    number: "02",
    title: "Add Services",
    desc: "List the pujas, sevas, darshan slots, and events your temple offers. Set availability and pricing.",
  },
  {
    number: "03",
    title: "Go Live",
    desc: "Once approved, your temple is live on the platform — start receiving bookings and connecting with devotees.",
  },
];

const blogPosts = [
  {
    date: "Jul 2026",
    tag: "Temple News",
    title: "Khatu Shyam Temple Renovations Complete — New Darshan Hall Opens",
    desc: "The newly renovated darshan hall welcomes devotees with improved facilities and shorter wait times.",
    image: "/images/temple-directory/blog-darshan-hall.png",
  },
  {
    date: "Jun 2026",
    tag: "Seva Updates",
    title: "How Shyam Jagat Served 50,000 Meals in Falgun Mela 2026",
    desc: "A record-breaking Annadan seva during this year's Falgun Mela, serving thousands of weary pilgrims.",
    image: "/images/temple-directory/blog-annadan-seva.png",
  },
  {
    date: "Jun 2026",
    tag: "Spiritual Guidance",
    title: "5 Practices for Deepening Your Daily Devotion to Baba Shyam",
    desc: "Simple yet powerful ways to strengthen your spiritual connection and bring peace to your home.",
    image: "/images/temple-directory/blog-daily-devotion.png",
  },
];

const testimonials = [
  {
    quote:
      "Registering on Shyam Jagat brought our temple online. We now receive 3x more bookings and connect with devotees we never could before.",
    name: "Pandit Ramesh Ji",
    place: "Khatu Shyam Temple, Sikar",
  },
  {
    quote:
      "The booking system is smooth and the support team is always helpful. Our temple's visibility has increased tremendously.",
    name: "Mahant Suresh Das",
    place: "Salasar Balaji Temple, Churu",
  },
  {
    quote:
      "The live darshan feature has been a blessing for elderly devotees who can't travel. Technology serving devotion beautifully.",
    name: "Acharya Vinod Ji",
    place: "ISKCON, Delhi",
  },
];

type Faq = { q: string; a?: string };

const faqsLeft: Faq[] = [
  {
    q: "How do I register my temple?",
    a: "Our platform allows full management of temple assets, schedules, darshan timings, online puja bookings, and direct communication channels with thousands of active devotees.",
  },
  { q: "Is temple registration free?" },
  { q: "How long does approval take?" },
  { q: "Can I manage multiple temples?" },
];

const faqsRight: Faq[] = [
  { q: "How do devotees find my temple?" },
  { q: "Can I offer live darshan?" },
  { q: "What payment methods are supported?" },
  { q: "How do I update temple timings?" },
];

export default function TempleDirectoryPage() {
  const [city, setCity] = useState(cities[0]);
  const [templeType, setTempleType] = useState(templeTypes[0]);
  const [pujaType, setPujaType] = useState(pujaTypes[0]);
  const [rating, setRating] = useState(ratings[0]);
  const [region, setRegion] = useState("All");
  const [openFaq, setOpenFaq] = useState<string | null>("left-0");

  const filteredTemples =
    region === "All" ? temples : temples.filter((t) => t.region === region);

  return (
    <>
      {/* Hero */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-20">
        <div className="relative mx-auto max-w-[1280px]">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 hidden size-[300px] -translate-y-1/2 opacity-[0.08] lg:block"
          >
            <Building2 className="size-full text-maroon" strokeWidth={0.5} />
          </div>

          <div className="flex max-w-[800px] flex-col items-start gap-5">
            <p className="text-sm font-semibold tracking-[2px] text-primary">
              TEMPLE DIRECTORY
            </p>
            <h1 className="font-serif text-4xl font-bold leading-[1.1] text-maroon sm:text-5xl lg:text-[56px] lg:leading-[62px]">
              Find &amp; Register a <span className="text-primary">Temple</span>
            </h1>
            <p className="text-base text-[#595656] sm:text-lg">
              Discover the perfect temple for darshan, book pujas, or register your
              temple on our growing spiritual platform.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_15px_15px_rgba(0,0,0,0.04)] lg:flex-row lg:items-center">
            <FilterSelect icon={MapPin} options={cities} value={city} onChange={setCity} />
            <FilterSelect icon={Building2} options={templeTypes} value={templeType} onChange={setTempleType} />
            <FilterSelect icon={Sparkles} options={pujaTypes} value={pujaType} onChange={setPujaType} />
            <FilterSelect icon={Star} options={ratings} value={rating} onChange={setRating} />
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-primary-dark"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden />
              Search Temples
            </button>
          </div>

          <p className="mt-6 text-sm font-medium text-[#8c8c8c]">
            500+ Temples Listed &nbsp;•&nbsp; 50+ Cities &nbsp;•&nbsp; 10,000+ Bookings
            &nbsp;•&nbsp; 4.8★ Avg Rating
          </p>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Featured Temples */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-maroon sm:text-4xl">
                Featured Temples
              </h2>
              <div className="mt-4 h-[3px] w-[100px] bg-primary" />
            </div>
            <Link
              href="#"
              className="flex items-center gap-1.5 text-[15px] font-semibold text-primary sm:text-base"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  region === r ? "bg-primary text-white" : "bg-cream text-maroon"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemples.map((temple) => (
              <div
                key={temple.id}
                className="overflow-hidden rounded-2xl bg-white shadow-[0px_10px_24px_rgba(0,0,0,0.05)]"
              >
                <div className="relative h-[220px] w-full">
                  <Image
                    src={temple.image}
                    alt={temple.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-[13px] font-semibold text-maroon">
                      {temple.rating}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <h3 className="font-serif text-[22px] font-bold text-maroon">
                    {temple.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#8c8c8c]">
                    <MapPin className="h-3.5 w-3.5" />
                    {temple.location}
                  </div>
                  <p className="text-sm leading-5 text-[#595656]">{temple.description}</p>
                  <div className="h-px w-full bg-border" />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {temple.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-md bg-cream px-2 py-1 text-[11px] font-semibold text-maroon"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="#"
                      className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-primary"
                    >
                      View Details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temple Services */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[2px] text-primary">
              SUPPORTING DEVOTION
            </p>
            <h2 className="font-serif text-3xl font-semibold text-maroon sm:text-4xl">
              Temple Services
            </h2>
            <div className="h-[3px] w-[100px] bg-primary" />
            <p className="max-w-[760px] text-base text-[#595656]">
              Everything you need to manage, discover, and connect with temples.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col items-center gap-5 rounded-[20px] bg-white p-8 text-center shadow-[0px_8px_10px_rgba(0,0,0,0.04)]"
              >
                <div className="flex size-[72px] items-center justify-center rounded-full bg-cream text-[32px]">
                  {service.emoji}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-maroon">
                  {service.title}
                </h3>
                <p className="text-sm leading-[22px] text-[#595656]">{service.desc}</p>
                <Link href="#" className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot size="rectangle" />

      {/* How It Works */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[2px] text-primary">
              SIMPLE PROCESS
            </p>
            <h2 className="font-serif text-3xl font-semibold text-maroon sm:text-4xl">
              Register Your Temple in 3 Steps
            </h2>
            <div className="h-[3px] w-[100px] bg-primary" />
            <p className="text-base text-[#595656]">
              Simple, free, and takes less than 5 minutes.
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row lg:items-center">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-1 items-center gap-4">
                <div className="flex flex-1 flex-col items-center gap-4 rounded-[20px] bg-cream p-8 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-maroon text-lg font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-[22px] font-semibold text-maroon">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-5 text-[#595656]">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden h-5 w-10 shrink-0 text-primary lg:block" />
                )}
              </div>
            ))}
          </div>

          <Link
            href="/temple-registration"
            className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-[0px_10px_10px_rgba(232,119,34,0.2)] transition hover:bg-primary-dark"
          >
            Register Your Temple Now <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[2px] text-primary">
                UPDATES &amp; BLOG
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-maroon sm:text-4xl">
                Latest from the Community
              </h2>
              <div className="mt-4 h-[3px] w-[100px] bg-primary" />
            </div>
            <Link href="#" className="flex shrink-0 items-center gap-1.5 text-base font-semibold text-primary">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <div
                key={post.title}
                className="overflow-hidden rounded-2xl bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.03)]"
              >
                <div className="relative h-[200px] w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className="absolute left-4 top-4 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                    {post.date}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <p className="text-xs font-semibold uppercase text-primary">{post.tag}</p>
                  <h3 className="font-serif text-xl font-bold text-maroon">{post.title}</h3>
                  <p className="text-sm leading-[22px] text-[#595656]">{post.desc}</p>
                  <Link href="#" className="flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[2px] text-primary">
              REVIEWS
            </p>
            <h2 className="font-serif text-3xl font-semibold text-maroon sm:text-4xl">
              What Temple Administrators Say
            </h2>
            <div className="h-[3px] w-[100px] bg-primary" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col gap-4 rounded-[20px] bg-cream p-8">
                <p className="font-serif text-5xl font-bold leading-5 text-primary/30">&ldquo;</p>
                <p className="text-[15px] italic leading-6 text-[#595656]">{t.quote}</p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-maroon">{t.name}</p>
                  <p className="text-[13px] text-[#8c8c8c]">{t.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[2px] text-primary">
              HAVE QUESTIONS?
            </p>
            <h2 className="font-serif text-3xl font-semibold text-maroon sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="h-[3px] w-[100px] bg-primary" />
          </div>

          <div className="grid w-full gap-6 sm:grid-cols-2">
            {[faqsLeft, faqsRight].map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-4">
                {column.map((faq, i) => {
                  const key = `${colIdx === 0 ? "left" : "right"}-${i}`;
                  const isOpen = openFaq === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : key)}
                      className="flex flex-col gap-3 rounded-xl border border-[rgba(212,175,55,0.25)] bg-white p-5 text-left"
                    >
                      <div className="flex w-full items-center justify-between gap-4">
                        <p className="text-[16px] font-bold text-maroon">{faq.q}</p>
                        <span className="shrink-0 text-xl font-bold text-maroon">
                          {isOpen ? "−" : "›"}
                        </span>
                      </div>
                      {isOpen && faq.a && (
                        <p className="text-sm leading-[22px] text-[#595656]">{faq.a}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot size="banner" />

      {/* CTA */}
      <section className="relative overflow-hidden bg-cream-light px-6 py-16 lg:px-20 lg:py-20">
        
        <div className="relative mx-auto flex max-w-[850px] flex-col items-center gap-8 text-center">
          <div className="flex flex-col  items-center gap-4">
            <h2 className="font-serif text-[32px] font-bold text-maroon sm:text-[44px]">
              Ready to Bring Your Temple Online?
            </h2>
            <p className="text-base text-[#595656]">
              Join 500+ temples already connecting with millions of devotees through
              Shyam Jagat.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/temple-registration"
              className="rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition hover:bg-primary-dark"
            >
              Register Your Temple
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-maroon px-7 py-3.5 text-base font-semibold text-maroon transition hover:bg-maroon hover:text-white"
            >
              Contact Our Team
            </Link>
          </div>
          <p className="text-[13px] text-[#8c8c8c]">
            Questions? Call +91 12345 67890 &nbsp;•&nbsp; temples@shyamjagat.org
          </p>
        </div>
      </section>
    </>
  );
}
