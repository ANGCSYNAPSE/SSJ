"use client";

import Image from "next/image";
import Link from "next/link";
import AdSlot from "@/components/ui/AdSlot";
import { STATE_CHAPTERS } from "@/lib/stateTeams";

export default function StateTeamPage() {
  const SECONDARY_NAV = [
    { label: "Overview", href: "/team" },
    { label: "Chairman", href: "/team/chairman" },
    { label: "Mukhya Trustee", href: "/team/mukhya-trustee" },
    { label: "Trustees", href: "/team/trustees" },
    { label: "Management Team", href: "/team/management-team" },
    { label: "Advisory Board", href: "/team/advisory-board" },
    { label: "State Team", href: "/team/state-team", active: true },
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
          <Link href="/team" className="text-[#8c8c8c]">
            {"Our Team"}
          </Link>
          <span className="text-[#9ca3af]">/</span>
          <span className="font-semibold text-primary">{"State Team"}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-maroon px-6 py-16 text-center lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6">
          <h1 className="font-serif text-4xl font-bold text-[#f2c75c] sm:text-5xl lg:text-[56px]">
            {"STATE COMMITTEES"}
          </h1>
          <p className="max-w-[800px] text-base text-white/90 sm:text-lg">
            {"Empowering localized darshans, state level matrimonial services, local bhajan sandhya bookings, and relief works through structured regional chapters across India."}
          </p>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Regional chapters + sidebar */}
      <section className="bg-cream px-6 pb-16 pt-5 lg:px-20 lg:pb-[60px]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-[32px] font-bold text-[#4a0e0e]">
                {"Explore Regional Chapters"}
              </h2>
              <p className="text-sm text-[#595656]">
                {"Click on any state chapter to review active districts, registered temples, and localized seva statistics."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {STATE_CHAPTERS.map((state) => (
                <Link
                  key={state.slug}
                  href={`/team/state-team/${state.slug}`}
                  className="flex flex-col gap-4 rounded-xl border border-[rgba(212,175,55,0.25)] bg-white p-6 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0px_8px_16px_rgba(0,0,0,0.06)]"
                >
                  <h3 className="font-serif text-[22px] font-bold text-maroon">
                    {state.name}
                  </h3>
                  <p className="text-sm text-[#595656]">{state.members} {"Active Executive Members"}</p>
                  <p className="text-[13px] font-semibold text-primary">{"View Team →"}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-[360px] lg:shrink-0">
            <div className="flex flex-col gap-5 rounded-2xl bg-maroon p-7">
              <h3 className="font-serif text-2xl font-bold text-[#f2c75c]">
                {"Our PAN-India Presence"}
              </h3>
              <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/team/state/pan-india-map.png"
                  alt={"Map of Shyam Jagat's PAN-India presence"}
                  fill
                  className="object-cover"
                  sizes="360px"
                />
              </div>
              <p className="text-[13px] leading-5 text-white/80">
                {"Bridging devotion across 15+ states with active local committees managing darshan operations, pilgrim food kitchens, and state chapter support."}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[rgba(212,175,55,0.25)] bg-cream p-4">
              <p className="text-[9px] font-semibold text-[#9ca3af]">{"ADVERTISEMENT"}</p>
              <div className="flex h-[250px] w-[300px] max-w-full items-center justify-center rounded-md border border-[#e5e7eb] bg-[#ebebeb]">
                <p className="text-sm font-medium text-[#8c8c8c]">{"Devotional Ad Spot — 300 × 250"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdSlot size="leaderboard" />
    </>
  );
}
