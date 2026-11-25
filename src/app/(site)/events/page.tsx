"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Filter,
  ShieldCheck,
  Clock,
  Landmark,
  BookOpenText,
  Music4,
  Drama,
  HandHeart,
  Flower2,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";
import { DharmaCard, type DharmaPattern } from "@/components/ui/ArtCard";
import RegularCalendar from "@/components/events/RegularCalendar";
import { EVENTS } from "@/lib/events";

type SelectProps = {
  icon: ComponentType<{ className?: string }>;
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

function FilterSelect({ icon: Icon, options, selectedIndex, onChange }: SelectProps) {
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
        <span className="truncate text-[#595656]">{options[selectedIndex]}</span>
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-[rgba(212,175,55,0.25)] bg-white shadow-lg">
          {options.map((option, i) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(i);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm ${
                selectedIndex === i ? "bg-primary text-white" : "text-[#595656] hover:bg-cream"
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
  const [dateIndex, setDateIndex] = useState(0);
  const [locationIndex, setLocationIndex] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);

  const dateOptions = [
    "Select Date (All Upcoming)",
    "This Week",
    "This Month",
    "Next Month",
  ];
  const locationOptions = [
    "Location (All Cities)",
    "Jaipur",
    "Sikar",
    "Khatu",
    "Delhi",
  ];
  const typeOptions = [
    "Event Type (All Category)",
    "Temple Festival",
    "Music & Bhajan",
    "Seva & Charity",
  ];

  const upcomingEvents = EVENTS;

  const categories: { icon: typeof Landmark; title: string; desc: string; tone: string; pattern: DharmaPattern }[] = [
    { icon: Landmark, title: "Temple Festivals", desc: "Janmashtami, Holi, Phalguna & Deepawali celebrations", tone: "#c2570c", pattern: "mandala" },
    { icon: BookOpenText, title: "Spiritual Discourses", desc: "Bhagwat Katha, Pravachan, Satsangs & spiritual teachings", tone: "#3b4a9e", pattern: "jaali" },
    { icon: Music4, title: "Bhajan Sandhya", desc: "Soulful devotional music and night long kirtans", tone: "#9b2335", pattern: "ripples" },
    { icon: Drama, title: "Cultural Programs", desc: "Classical dance drama, theatrical arts & exhibits", tone: "#a16207", pattern: "rays" },
    { icon: HandHeart, title: "Seva Charity Drives", desc: "Volunteering for Food Seva, Medical Camps & Old Age assistance", tone: "#2f6b3a", pattern: "dots" },
    { icon: Flower2, title: "Meditation Retreats", desc: "Pranayama, yoga shivirs, and quiet mind workshops", tone: "#0f766e", pattern: "lotus" },
  ];

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
          <p className="text-lg font-bold uppercase text-[#d4af37]">{"|| जय श्री श्याम ||"}</p>
          <h1 className="text-center font-serif text-4xl font-bold leading-none text-white sm:text-6xl lg:text-[72px]">
            {"Sacred Events & Celebrations"}
          </h1>
          <p className="max-w-[800px] text-center text-sm leading-relaxed text-cream sm:text-lg lg:text-xl">
            {"Discover and participate in upcoming spiritual gatherings, grand festivals, temple ceremonies, and traditional cultural programs dedicated to Baba Shyam and the service of Dharma."}
          </p>

          <div className="flex w-full max-w-[1000px] flex-col gap-3 rounded-xl bg-white p-3 shadow-[0px_8px_12px_rgba(0,0,0,0.13)] lg:flex-row lg:items-center">
            <FilterSelect icon={Calendar} options={dateOptions} selectedIndex={dateIndex} onChange={setDateIndex} />
            <FilterSelect icon={MapPin} options={locationOptions} selectedIndex={locationIndex} onChange={setLocationIndex} />
            <FilterSelect icon={Filter} options={typeOptions} selectedIndex={typeIndex} onChange={setTypeIndex} />
            <button
              type="button"
              className="rounded-lg bg-primary px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-primary-dark"
            >
              {"FIND EVENTS"}
            </button>
          </div>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Upcoming Events */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <SectionHeader
            eyebrow={"Every Year, Every Fortnight"}
            title={"Regular Observances"}
            desc={"The festivals and days that come round again and again for devotees of Baba Shyam. Their dates follow the lunar calendar, so confirm them with the temple committee before you travel."}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event.title}
                href={`/events/${event.slug}`}
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
                    <div className="absolute left-4 top-4 flex min-w-16 flex-col items-center justify-center rounded-xl border border-[#d4af37] bg-white px-3 py-2.5">
                      <p className="text-lg font-bold leading-none text-primary">{event.day}</p>
                      <p className="mt-1 text-[10px] font-semibold uppercase text-[#595656]">{event.month}</p>
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
                    <p className="text-sm font-semibold text-primary">{"Free"}</p>
                    <p className="text-xs text-[#8c8c8c]">{"(no pass needed)"}</p>
                  </div>
                  <span className="rounded-md bg-primary px-4 py-2 text-[13px] font-bold text-white">
                    {"Know more"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot size="rectangle" />

      {/* The regular calendar */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <SectionHeader
            eyebrow={"Sacred Rhythm"}
            title={"The Regular Dharmik Calendar"}
            desc={"What comes round again and again for a devotee of Baba Shyam: the aartis of every day, Ekadashi every fortnight, and the great days of the year."}
          />
          <RegularCalendar />
        </div>
      </section>

      {/* Browse by category */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <SectionHeader
            eyebrow={"Categories"}
            title={"Browse by Spiritual Event Type"}
            desc={"Filter events based on your devotional path. Connect with programs tailored to specific areas of worship, community support, and spiritual learning."}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <DharmaCard key={category.title} icon={category.icon} title={category.title} tone={category.tone} pattern={category.pattern}>
                {category.desc}
              </DharmaCard>
            ))}
          </div>
        </div>
      </section>

      {/* The Seva Gallery */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-6 rounded-[28px] border border-[rgba(212,175,55,0.45)] bg-white px-6 py-12 text-center shadow-[0px_12px_32px_rgba(139,0,0,0.06)] sm:px-12">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">{"Gallery"}</p>
          <h2 className="font-serif text-3xl font-semibold leading-[1.1] text-[#3e1815] sm:text-4xl">{"Wishes fulfilled, in pictures and videos"}</h2>
          <p className="max-w-[640px] text-base leading-relaxed text-[#595656]">{"Photographs and videos of the seva of own wish, shared with the people whose wish it was."}</p>
          <Link href="/seva#gallery" className="rounded-lg bg-primary px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-primary-dark">
            {"Open the gallery"}
          </Link>
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
            {"Are You a Temple or Satsang Samiti?"}
          </p>
          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl lg:text-[48px]">
            {"Host & Promote Your Spiritual Events"}
          </h2>
          <p className="text-base leading-relaxed text-cream max-w-[700px]">
            {"Expand your spiritual reach. List your upcoming temple celebrations, continuous live darshan timings, or bhajan gatherings on Shree Shyam Jagat to connect with millions of devotees globally."}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="#"
              className="rounded-lg bg-primary px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-primary-dark"
            >
              {"SUBMIT EVENT"}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-white hover:text-maroon"
            >
              {"CONTACT FOR HELP"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
