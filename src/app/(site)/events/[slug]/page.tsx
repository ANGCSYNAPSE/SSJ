"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ShieldCheck,
  User,
  Star,
  ArrowRight,
  Music,
  Heart,
  ChevronDown,
  Info,
  Clock,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";
import { getEventBySlug, getRelatedEvents, type TimelineIcon } from "@/lib/events";

const timelineIcons: Record<TimelineIcon, typeof Star> = {
  star: Star,
  "arrow-right": ArrowRight,
  music: Music,
  heart: Heart,
};

const countOptions = ["1 Person", "2 People", "3-5 People", "6-10 People", "10+ People"];

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();

  const related = getRelatedEvents(params.slug);

  const [form, setForm] = useState({ name: "", mobile: "" });
  const [count, setCount] = useState(countOptions[0]);
  const [countOpen, setCountOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.mobile) return;
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[420px] flex-col items-center justify-center overflow-hidden px-6 text-center lg:h-[520px] lg:px-20">
        <div aria-hidden className="absolute inset-0">
          <Image
            src={event.heroImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(62,24,21,0.7)]" />
        </div>
        <div className="relative flex flex-col items-center gap-6">
          <p className="text-lg font-bold uppercase text-[#d4af37]">|| जय श्री श्याम ||</p>
          <h1 className="max-w-[1000px] font-serif text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[56px]">
            {event.title}
          </h1>
          <p className="max-w-[800px] text-base leading-[1.6] text-cream sm:text-lg">
            Embark on the most sacred journey of devotion. Witness this gathering
            transformed into a divine paradise where devotees come together to seek
            the blessings of Baba Shyam.
          </p>
        </div>
      </section>

      {/* Quick info bar */}
      <section className="flex flex-col gap-6 border-b border-[rgba(212,175,55,0.25)] bg-white px-6 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:px-20">
        <div className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream">
            <Calendar className="h-5 w-5 text-primary" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold text-[#8c8c8c]">DATE</p>
            <p className="text-[15px] font-semibold text-[#3e1815]">{event.dateRange}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream">
            <MapPin className="h-5 w-5 text-primary" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold text-[#8c8c8c]">LOCATION</p>
            <p className="text-[15px] font-semibold text-[#3e1815]">{event.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream">
            <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold text-[#8c8c8c]">ORGANIZER</p>
            <p className="text-[15px] font-semibold text-[#3e1815]">{event.organizer}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream">
            <User className="h-5 w-5 text-primary" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold text-[#8c8c8c]">ENTRY PASS</p>
            <p className="text-[15px] font-semibold text-[#3e1815]">{event.entryPass}</p>
          </div>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Main grid */}
      <section className="px-6 py-12 lg:px-20 lg:py-16">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 lg:flex-row lg:items-start">
          {/* Details column */}
          <div className="flex flex-1 flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-3xl font-bold text-[#3e1815]">
                About {event.title}
              </h2>
              {event.about.map((para, i) => (
                <p key={i} className="text-[15px] leading-[1.6] text-[#595656]">
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold uppercase text-primary">Sacred Timeline</p>
                <h2 className="font-serif text-3xl font-bold text-[#3e1815]">
                  {event.timelineTitle}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {event.timeline.map((item) => {
                  const Icon = timelineIcons[item.icon];
                  return (
                    <div key={item.title} className="flex gap-6">
                      <div className="flex w-24 shrink-0 flex-col items-center gap-1">
                        <p className="text-xs font-semibold uppercase text-[#8c8c8c]">
                          {item.dayLabel}
                        </p>
                        <div className="flex w-20 items-center justify-center rounded-lg bg-maroon p-2">
                          <p className="text-base font-bold text-white">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 rounded-xl border border-[rgba(212,175,55,0.25)] bg-cream-light p-5">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-serif text-xl font-bold text-[#3e1815]">
                            {item.title}
                          </h3>
                          <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                        </div>
                        <p className="text-sm leading-[1.5] text-[#595656]">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-3xl font-bold text-[#3e1815]">
                Divine Moments Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {event.gallery.map((src, i) => (
                  <div key={i} className="relative h-[180px] w-full overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={`${event.title} gallery photo ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Register card */}
          <div className="w-full shrink-0 rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-white p-8 shadow-[0px_12px_16px_rgba(139,0,0,0.08)] lg:w-[400px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold uppercase text-primary">
                  Secure Your Entry Pass
                </p>
                <h2 className="font-serif text-[28px] font-bold text-[#3e1815]">
                  Register / RSVP
                </h2>
                <p className="text-[13px] leading-[1.4] text-[#8c8c8c]">
                  Registration is mandatory to comply with security guidelines during
                  this event.
                </p>
              </div>

              {submitted ? (
                <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  Thank you, {form.name}! Your registration is confirmed. Jai Shree
                  Shyam. 🙏
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#595656]">
                      Full Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="h-11 rounded-lg border border-[#e5e7eb] bg-cream-light px-4 text-sm text-[#3e1815] placeholder:text-[#8c8c8c] focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#595656]">
                      Mobile Number (WhatsApp)
                    </label>
                    <input
                      value={form.mobile}
                      onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      className="h-11 rounded-lg border border-[#e5e7eb] bg-cream-light px-4 text-sm text-[#3e1815] placeholder:text-[#8c8c8c] focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="relative flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#595656]">
                      Total Devotees / Family Members
                    </label>
                    <button
                      type="button"
                      onClick={() => setCountOpen((v) => !v)}
                      className="flex h-11 items-center justify-between rounded-lg border border-[#e5e7eb] bg-cream-light px-4 text-sm text-[#3e1815]"
                    >
                      {count}
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-[#8c8c8c] transition-transform ${countOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    {countOpen && (
                      <div className="absolute top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-[rgba(212,175,55,0.25)] bg-white shadow-lg">
                        {countOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setCount(option);
                              setCountOpen(false);
                            }}
                            className={`block w-full px-4 py-2.5 text-left text-sm ${
                              count === option
                                ? "bg-primary text-white"
                                : "text-[#3e1815] hover:bg-cream"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-lg bg-primary py-3.5 text-[15px] font-bold text-white transition hover:bg-primary-dark"
                  >
                    CONFIRM REGISTRATION
                  </button>
                </form>
              )}

              <div className="h-px w-full bg-[#e5e7eb]" />

              <div className="flex items-start gap-3">
                <Info className="h-4 w-4 shrink-0 text-[#8c8c8c]" aria-hidden />
                <p className="text-xs leading-[1.4] text-[#8c8c8c]">
                  Need assistance with bookings or event queries? Call our helpdesk:{" "}
                  <span className="font-bold text-primary">+91 9876543210</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdSlot size="rectangle" />

      {/* Related events */}
      <section className="bg-cream px-6 py-20 lg:px-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-primary" />
              <p className="text-sm font-bold uppercase tracking-wide text-primary">
                More Sacred Gatherings
              </p>
              <div className="h-px w-6 bg-primary" />
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-[1.1] text-[#3e1815] sm:text-[48px]">
              Related Spiritual Events
            </h2>
          </div>

          <div className="grid w-full gap-6 lg:grid-cols-2">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/events/${rel.slug}`}
                className="flex flex-col justify-between overflow-hidden rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_12px_32px_rgba(139,0,0,0.05)]"
              >
                <div>
                  <div className="relative h-[220px] w-full">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className="absolute left-4 top-4 flex w-16 flex-col items-center justify-center rounded-xl border border-[#d4af37] bg-white p-3">
                      <p className="text-[22px] font-bold leading-none text-primary">
                        {rel.day}
                      </p>
                      <p className="text-xs font-semibold uppercase text-[#595656]">
                        {rel.month}
                      </p>
                    </div>
                    <span className="absolute right-4 top-4 rounded-full bg-maroon px-3 py-1.5 text-[11px] font-bold text-white">
                      {rel.tag}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <h3 className="font-serif text-2xl font-bold leading-[1.2] text-[#3e1815]">
                      {rel.title}
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#595656]" />
                        <p className="truncate text-[13px] text-[#595656]">{rel.organizer}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#595656]" />
                        <p className="truncate text-[13px] text-[#595656]">{rel.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-[#595656]" />
                        <p className="text-[13px] text-[#595656]">{rel.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-[rgba(212,175,55,0.25)] p-5">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold text-primary">Free Entry</p>
                    <p className="text-xs text-[#8c8c8c]">(Reg. Mandatory)</p>
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
    </>
  );
}
