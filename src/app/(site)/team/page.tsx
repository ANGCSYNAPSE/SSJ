"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

export default function TeamPage() {

  const SECONDARY_NAV = [
    { label: "Overview", href: "/team", active: true },
    { label: "Chairman", href: "/team/chairman" },
    { label: "Mukhya Trustee", href: "/team/mukhya-trustee" },
    { label: "Trustees", href: "/team/trustees" },
    { label: "Management Team", href: "/team/management-team" },
    { label: "Advisory Board", href: "/team/advisory-board" },
    { label: "State Team", href: "/team/state-team" },
  ];

  const LEADERSHIP = [
    {
      image: "/images/team/chairman.png",
      name: "Shri Ramesh Kumar Ji",
      role: "Chairman — Shree Shyam Jagat",
      desc: "Providing the core strategic vision and spiritual direction to unite our efforts across borders and initiatives.",
      cta: "Explore Profile →",
      href: "/team/chairman",
    },
    {
      image: "/images/team/mushta-trustee.png",
      name: "Smt. Sunita Devi Ji",
      role: "Mukhya Trustee",
      desc: "Overseeing the core administrative and ethical frameworks of the spiritual trusts, ensuring values-based execution.",
      cta: "Explore Profile →",
      href: "/team/mukhya-trustee",
    },
    {
      image: "/images/team/board-of-trustees.png",
      name: "Board of Trustees",
      role: "Governing Body",
      desc: "A highly dedicated board of spiritual practitioners, business leaders, and social reformers directing our legal trusts.",
      cta: "View All Trustees →",
      href: "/team/trustees",
    },
  ];

  return (
    <>
      {/* Secondary team nav */}
      <div className="border-b border-[#e5e7eb] bg-cream">
        <div className="mx-auto flex max-w-[1280px] gap-10 overflow-x-auto px-6 lg:px-20">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`shrink-0 whitespace-nowrap border-b-4 py-5 text-sm ${
                item.active
                  ? "border-primary font-bold text-primary"
                  : "border-transparent font-medium text-[#3e1815]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white px-6 pb-2 pt-6 lg:px-20">
        <div className="mx-auto flex max-w-[1280px] items-center gap-2 text-[13px]">
          <Link href="/" className="text-[#8c8c8c]">
            {"Home"}
          </Link>
          <span className="text-[#9ca3af]">/</span>
          <span className="text-[#8c8c8c]">{"Our Team"}</span>
          <span className="text-[#9ca3af]">/</span>
          <span className="font-semibold text-primary">{"Overview"}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-maroon px-6 py-16 text-center lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6">
          <h1 className="font-serif text-4xl font-bold text-[#f2c75c] sm:text-5xl lg:text-[56px]">
            {"OUR TEAM"}
          </h1>
          <p className="max-w-[800px] text-base text-white/90 sm:text-lg">
            {"Meet the dedicated people working together under the divine grace of Baba Shyam to guide, grow, and strengthen our global socio-spiritual mission."}
          </p>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Leadership Board */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-[60px]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
          <div>
            <h2 className="font-serif text-[36px] font-bold text-[#4a0e0e]">{"Leadership Board"}</h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-primary" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {LEADERSHIP.map((person) => (
              <div
                key={person.name}
                className="flex flex-col gap-5 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6 shadow-[0px_8px_8px_rgba(0,0,0,0.04)]"
              >
                <div className="relative h-[260px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-2xl font-bold text-maroon">{person.name}</h3>
                  <p className="text-sm font-semibold uppercase text-primary">{person.role}</p>
                </div>
                <p className="text-sm leading-[22px] text-[#595656]">{person.desc}</p>
                <Link
                  href={person.href}
                  className="w-fit rounded-lg bg-[#fff3e0] px-5 py-3 text-sm font-semibold text-primary"
                >
                  {person.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team CTA */}
      <section className="bg-white px-6 pb-16 pt-5 lg:px-20 lg:pb-[60px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col items-start gap-8 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-cream p-8 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col items-start gap-4">
              <h2 className="font-serif text-[32px] font-bold text-maroon">{"Management Team"}</h2>
              <p className="text-[15px] leading-6 text-[#595656]">
                {"Our executive operations, event coordinators, and day-to-day administrative personnel ensure that local darshans, matrimonial connections, temple list updates, and medical sevas are handled seamlessly."}
              </p>
              <Link
                href="/team/management-team"
                className="flex items-center gap-1.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                {"Explore Management Team"} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-xl lg:w-[320px]">
              <Image
                src="/images/team/management-team.png"
                alt="Management Team"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Board + State Committee */}
      <section className="bg-cream px-6 pb-20 pt-5 lg:px-20 lg:pb-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-7">
            <h3 className="font-serif text-[26px] font-bold text-maroon">{"Advisory Board"}</h3>
            <p className="text-sm leading-[22px] text-[#595656]">
              {"Sages, retired jurists, and highly experienced community elders who keep our policies anchored in ethics and dharma."}
            </p>
            <Link
              href="/team/advisory-board"
              className="w-fit rounded-md bg-[#fff3e0] px-5 py-2.5 text-[13px] font-semibold text-primary"
            >
              {"Meet Advisors →"}
            </Link>
          </div>
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-7">
            <h3 className="font-serif text-[26px] font-bold text-maroon">{"State Committee Teams"}</h3>
            <p className="text-sm leading-[22px] text-[#595656]">
              {"Regional teams managing local chapters, temple registries, bhajan sandhya bookings, and social support grids across 15+ Indian states."}
            </p>
            <Link
              href="/team/state-team"
              className="w-fit rounded-md bg-[#fff3e0] px-5 py-2.5 text-[13px] font-semibold text-primary"
            >
              {"Explore Chapters →"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
