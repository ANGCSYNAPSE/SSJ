"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  XCircle,
  BookOpen,
  Music,
  Star,
  Heart,
  Sun,
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
        className="flex w-full items-center gap-2 rounded-lg bg-cream px-4 py-3 text-sm"
      >
        <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span className="truncate text-[#595656]">{value}</span>
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
                value === option ? "bg-primary text-white" : "text-[#595656] hover:bg-cream"
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

const dateOptions = ["Select Date (All Upcoming)", "This Week", "This Month", "Next Month"];
const locationOptions = ["Location (All Cities)", "Jaipur", "Sikar", "Khatu", "Delhi"];
const typeOptions = ["Event Type (All Category)", "Temple Festival", "Music & Bhajan", "Seva & Charity"];

const upcomingEvents = [
  {
    day: "24",
    month: "MAR",
    tag: "TEMPLE FESTIVAL",
    image: "/images/events/phalgun-mela.png",
    title: "Khatu Shyam Phalgun Mela 2026",
    organizer: "Shree Shyam Mandir Committee",
    location: "Khatu Dham, Sikar, Rajasthan",
    time: "04:00 AM onwards",
  },
  {
    day: "02",
    month: "APR",
    tag: "MUSIC & BHAJAN",
    image: "/images/events/bhajan-sandhya.png",
    title: "Devotional Nayan Shringaar & Bhajan Sandhya",
    organizer: "Shyam Jagat Seva Samiti",
    location: "Birla Auditorium, Jaipur",
    time: "06:30 PM - 10:30 PM",
  },
  {
    day: "12",
    month: "APR",
    tag: "SEVA & CHARITY",
    image: "/images/events/annadan-seva.png",
    title: "Grand Annadan Seva Drive & Satsang",
    organizer: "Dharma Seva Foundation",
    location: "Shyam Nagar Community Hall, Jaipur",
    time: "11:00 AM - 04:00 PM",
  },
];

const timeline = [
  { day: "MON", date: "23", title: "Monthly Ekadashi Kirtan", time: "05:00 PM", location: "Shyam Mandir, Jaipur" },
  { day: "TUE", date: "24", title: "Procession Nishan Yatra Start", time: "06:00 AM", location: "Khatu Dham" },
  { day: "THU", date: "26", title: "Bhajan Sandhya by Kanhiya Mittal", time: "07:00 PM", location: "Jaipur Grounds" },
  { day: "SAT", date: "28", title: "Dharma Charioty Medical Camp", time: "09:00 AM", location: "Sikar Community Hall" },
];

const calendarWeeks = [
  ["23", "24", "25", "26", "27", "28", "29"],
  ["30", "31", "1", "2", "3", "4", "5"],
];
const highlightedDates: Record<string, "major" | "bhajan"> = { "24": "major", "26": "bhajan" };
const dimmedDates = new Set(["1", "2", "3", "4", "5"]);

const categories = [
  { icon: XCircle, title: "Temple Festivals", desc: "Janmashtami, Holi, Phalguna & Deepawali celebrations" },
  { icon: BookOpen, title: "Spiritual Discourses", desc: "Bhagwat Katha, Pravachan, Satsangs & spiritual teachings" },
  { icon: Music, title: "Bhajan Sandhya", desc: "Soulful devotional music and night long kirtans" },
  { icon: Star, title: "Cultural Programs", desc: "Classical dance drama, theatrical arts & exhibits" },
  { icon: Heart, title: "Seva Charity Drives", desc: "Volunteering for Food Seva, Medical Camps & Old Age assistance" },
  { icon: Sun, title: "Meditation Retreats", desc: "Pranayama, yoga shivirs, and quiet mind workshops" },
];

const pastEvents = [
  { date: "Nov 2025", title: "Gopashtami Gauseva Celebration", image: "/images/events/gauseva.png" },
  { date: "Nov 2025", title: "Grand Deepawali Mahotsav Jaipur", image: "/images/events/deepawali.png" },
  { date: "Dec 2025", title: "Shyam Bhajan Sandhya - Kolkata", image: "/images/events/kolkata-bhajan.png" },
  { date: "Jan 2026", title: "Winter Blanket Distribution Drive", image: "/images/events/winter-blanket.png" },
];

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex items-center gap-3">
        <div className="h-px w-6 bg-primary" />
        <p className="text-sm font-bold uppercase tracking-wide text-primary">{eyebrow}</p>
        <div className="h-px w-6 bg-primary" />
      </div>
      <h2 className="font-serif text-3xl font-semibold leading-[1.1] text-[#3e1815] sm:text-4xl lg:text-[48px]">
        {title}
      </h2>
      <p className="max-w-[760px] text-base leading-[1.6] text-[#595656] opacity-90">{desc}</p>
    </div>
  );
}

export default function EventsPage() {
  const [date, setDate] = useState(dateOptions[0]);
  const [location, setLocation] = useState(locationOptions[0]);
  const [eventType, setEventType] = useState(typeOptions[0]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center gap-8 overflow-hidden px-6 pb-10 pt-16 lg:px-20 lg:pb-10 lg:pt-16">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/events/hero.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgba(62,24,21,0.65)]" />
        </div>

        <div className="relative flex flex-col items-center gap-8">
          <p className="text-lg font-bold uppercase text-[#d4af37]">|| जय श्री श्याम ||</p>
          <h1 className="text-center font-serif text-5xl font-bold leading-none text-white sm:text-6xl lg:text-[72px]">
            Sacred Events &amp; Celebrations
          </h1>
          <p className="max-w-[800px] text-center text-base leading-relaxed text-cream sm:text-lg lg:text-xl">
            Discover and participate in upcoming spiritual gatherings, grand
            festivals, temple ceremonies, and traditional cultural programs
            dedicated to Baba Shyam and the service of Dharma.
          </p>

          <div className="flex w-full max-w-[1000px] flex-col gap-3 rounded-xl bg-white p-3 shadow-[0px_8px_12px_rgba(0,0,0,0.13)] lg:flex-row lg:items-center">
            <FilterSelect icon={Calendar} options={dateOptions} value={date} onChange={setDate} />
            <FilterSelect icon={MapPin} options={locationOptions} value={location} onChange={setLocation} />
            <FilterSelect icon={Filter} options={typeOptions} value={eventType} onChange={setEventType} />
            <button
              type="button"
              className="rounded-lg bg-primary px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-primary-dark"
            >
              FIND EVENTS
            </button>
          </div>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Upcoming Events */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <SectionHeader
            eyebrow="Featured Gatherings"
            title="Prominent Upcoming Events"
            desc="Experience divine grace and spiritual bliss. Book your slots, coordinate travel, and secure nishan prasad for these upcoming prominent satsangs."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event.title}
                href="#"
                className="flex flex-col justify-between overflow-hidden rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-cream-light shadow-[0px_12px_32px_rgba(139,0,0,0.05)]"
              >
                <div>
                  <div className="relative h-[220px] w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                    <div className="absolute left-4 top-4 flex w-16 flex-col items-center justify-center rounded-xl border border-[#d4af37] bg-white p-3">
                      <p className="text-[22px] font-bold leading-none text-primary">{event.day}</p>
                      <p className="text-xs font-semibold uppercase text-[#595656]">{event.month}</p>
                    </div>
                    <span className="absolute right-4 top-4 rounded-full bg-[#7b2d2d] px-3 py-1.5 text-[11px] font-bold text-white">
                      {event.tag}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <h3 className="font-serif text-2xl font-bold leading-[1.2] text-[#3e1815]">
                      {event.title}
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#595656]" />
                        <p className="truncate text-[13px] text-[#595656]">{event.organizer}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#595656]" />
                        <p className="truncate text-[13px] text-[#595656]">{event.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-[#595656]" />
                        <p className="text-[13px] text-[#595656]">{event.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-[#e5e7eb] p-5">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold text-primary">Free Entry</p>
                    <p className="text-xs text-[#8c8c8c]">(Registration Mandatory)</p>
                  </div>
                  <span className="rounded-md bg-primary px-4 py-2 text-[13px] font-bold text-white">
                    Register
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot size="rectangle" />

      {/* Weekly Calendar */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <SectionHeader
            eyebrow="Sacred Timeline"
            title="Weekly Dharamik Calendar"
            desc="Plan your pilgrimage and devotional attendance. Review hourly schedules for Aarti, satsangs, and free healthcare camps active this week."
          />

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="flex w-full flex-col gap-6 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-8 shadow-[0px_12px_16px_rgba(139,0,0,0.05)] lg:w-[519px] lg:shrink-0">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-[#3e1815]">March 2026</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full text-[#3e1815] hover:bg-cream"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full text-[#3e1815] hover:bg-cream"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-semibold text-[#8c8c8c]">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <p key={i} className="w-10 text-center">
                      {d}
                    </p>
                  ))}
                </div>
                {calendarWeeks.map((week, wi) => (
                  <div key={wi} className="flex justify-between">
                    {week.map((day, di) => {
                      const highlight = highlightedDates[day];
                      const dimmed = wi === 1 && dimmedDates.has(day) && di >= 2;
                      return (
                        <div key={di} className="flex w-10 justify-center">
                          {highlight ? (
                            <span
                              className={`flex h-8 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                                highlight === "major" ? "bg-primary" : "bg-[#7b2d2d]"
                              }`}
                            >
                              {day}
                            </span>
                          ) : (
                            <p
                              className={`text-sm ${
                                dimmed ? "text-[#8c8c8c]" : "font-medium text-[#3e1815]"
                              }`}
                            >
                              {day}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="h-px w-full bg-border" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-[3px] bg-primary" />
                  <p className="text-[13px] text-[#595656]">Major Festival / Mela Days</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-[3px] bg-[#7b2d2d]" />
                  <p className="text-[13px] text-[#595656]">Bhajan Sandhya &amp; Katha</p>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              {timeline.map((row) => (
                <div
                  key={row.title}
                  className="flex items-center gap-5 rounded-xl border border-[rgba(212,175,55,0.25)] bg-white p-5 shadow-[0px_8px_8px_rgba(139,0,0,0.02)]"
                >
                  <div className="flex w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-lg bg-cream-light p-3">
                    <p className="text-xs font-semibold text-[#8c8c8c]">{row.day}</p>
                    <p className="text-xl font-bold text-primary">{row.date}</p>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <p className="text-lg font-bold text-[#3e1815]">{row.title}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-[#595656]" />
                        <p className="text-[13px] text-[#595656]">{row.time}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#595656]" />
                        <p className="text-[13px] text-[#595656]">{row.location}</p>
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-primary px-4 py-2 text-[13px] font-bold text-white">
                    Join
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by category */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <SectionHeader
            eyebrow="Categories"
            title="Browse by Spiritual Event Type"
            desc="Filter events based on your devotional path. Connect with programs tailored to specific areas of worship, community support, and spiritual learning."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.title}
                className="flex flex-col gap-4 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-cream-light p-8"
              >
                <div className="flex size-14 items-center justify-center rounded-xl bg-primary shadow-[0px_10px_12px_rgba(232,119,34,0.2)]">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#3e1815]">{category.title}</h3>
                <p className="text-sm leading-[1.5] text-[#595656]">{category.desc}</p>
                <div className="h-px w-full bg-[rgba(212,175,55,0.4)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past events gallery */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <SectionHeader
            eyebrow="Retrospective Gallery"
            title="Moments of Divine Joy & Service"
            desc="Look back at our successful community efforts, massive cultural events, and temple festivals. Our past is a living testament of collective devotion."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pastEvents.map((event) => (
              <div
                key={event.title}
                className="overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_8px_24px_rgba(139,0,0,0.04)]"
              >
                <div className="relative h-[200px] w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-col gap-1 p-5">
                  <p className="text-xs font-semibold text-primary">{event.date}</p>
                  <p className="truncate font-serif text-xl font-bold text-[#3e1815]">
                    {event.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot size="banner" />

      {/* Host CTA */}
      <section className="relative flex flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center lg:px-20 lg:py-24">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/events/hero.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(62,24,21,0.85)]" />
        </div>
        <div className="relative flex max-w-7xl mx-auto flex-col items-center gap-6">
          <p className="text-sm font-bold uppercase text-[#d4af37]">
            Are You a Temple or Satsang Samiti?
          </p>
          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl lg:text-[48px]">
            Host &amp; Promote Your Spiritual Events
          </h2>
          <p className="text-base leading-relaxed text-cream max-w-[700px]">
            Expand your spiritual reach. List your upcoming temple celebrations,
            continuous live darshan timings, or bhajan gatherings on Shree Shyam
            Jagat to connect with millions of devotees globally.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="#"
              className="rounded-lg bg-primary px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-primary-dark"
            >
              SUBMIT EVENT
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-white hover:text-maroon"
            >
              CONTACT FOR HELP
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
