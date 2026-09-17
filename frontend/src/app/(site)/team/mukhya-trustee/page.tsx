"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Linkedin, Youtube } from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

const SOCIAL_LINKS = [
  { href: "#", label: "Email", icon: Mail },
  { href: "#", label: "LinkedIn", icon: Linkedin },
  { href: "#", label: "YouTube", icon: Youtube },
];

export default function MukhyaTrusteePage() {

  const SECONDARY_NAV = [
    { label: "Overview", href: "/team" },
    { label: "Chairman", href: "/team/chairman" },
    { label: "Mukhya Trustee", href: "/team/mukhya-trustee", active: true },
    { label: "Trustees", href: "/team/trustees" },
    { label: "Management Team", href: "/team/management-team" },
    { label: "Advisory Board", href: "/team/advisory-board" },
    { label: "State Team", href: "/team/state-team" },
  ];

  const FOCUS_AREAS = [
    {
      title: "Empowering Rural Women",
      desc: "Leading vocational sewing, craft design, and computer literacy centers enabling sustainable incomes.",
    },
    {
      title: "Senior Citizen Welfare",
      desc: "Establishing dignified housing and high-care nursing units in Jaipur and Sikar old age homes.",
    },
    {
      title: "Anoop Seva Matrimonials",
      desc: "Preserving family values and traditional structures via community-backed online matchmaking support.",
    },
  ];

  const CREDENTIALS = [
    { label: "Full Name", value: "Smt. Sunita Devi Ji" },
    { label: "Trustee ID", value: "SSJ-TR-002" },
    { label: "Term", value: "Life Trustee" },
    { label: "Area of Work", value: "Women and Elder Social Seva" },
    { label: "Location", value: "Sikar, Rajasthan" },
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
          <span className="font-semibold text-primary">{"Mukhya Trustee"}</span>
        </div>
      </div>

      {/* Profile header */}
      <section className="bg-maroon px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 lg:flex-row lg:items-center">
          <div className="relative size-[280px] shrink-0 overflow-hidden rounded-[20px] border-4 border-[#f2c75c] sm:size-[340px] lg:size-[400px]">
            <Image
              src="/images/team/mushta-trustee.png"
              alt={"Smt. Sunita Devi Ji"}
              fill
              priority
              className="object-cover"
              sizes="400px"
            />
          </div>
          <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <div className="flex flex-col gap-2">
              <h1 className="font-serif text-4xl font-bold text-[#f2c75c] sm:text-5xl">
                {"Smt. Sunita Devi Ji"}
              </h1>
              <p className="text-lg font-semibold uppercase text-white/90">
                {"Mukhya Trustee — Shree Shyam Jagat"}
              </p>
            </div>
            <p className="max-w-2xl text-base leading-[26px] text-white/80">
              {"A pillar of administrative ethics and community welfare, Smt. Sunita Devi Ji governs the traditional family trusts dedicated to Khatu temple operations, women empowerment, and senior care homes."}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                {"Connect with Office"}
              </Link>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8d3135] text-white transition-colors hover:bg-[#8d3135]/80"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Quote + vision + sidebar */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex flex-1 flex-col gap-10">
            <div className="flex flex-col gap-5 rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-white p-8 sm:p-10">
              <p className="font-serif text-3xl font-bold leading-tight text-maroon sm:text-4xl">
                {"“Real empowerment means enabling our daughters and protecting our elders.”"}
              </p>
              <p className="text-base leading-[26px] text-[#595656]">
                {"“The strength of Shyam Jagat lies in the self-reliance we can generate for the most vulnerable. Through active skills education and transparent donor support, we aim to expand our women cooperatives and elder care networks across all districts.”"}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-[32px] font-bold text-[#4a0e0e]">
                {"Vision & Areas of Focus"}
              </h2>
              <div className="flex flex-col gap-4">
                {FOCUS_AREAS.map((area) => (
                  <div
                    key={area.title}
                    className="flex flex-col gap-2 rounded-xl border border-[#e5e7eb] bg-white p-6"
                  >
                    <p className="text-lg font-semibold text-primary">{area.title}</p>
                    <p className="text-sm leading-[22px] text-[#595656]">{area.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-[360px] lg:shrink-0">
            <div className="flex flex-col gap-6 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-cream p-7">
              <h3 className="font-serif text-2xl font-bold text-maroon">{"Key Credentials"}</h3>
              <div className="flex flex-col gap-4">
                {CREDENTIALS.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex flex-col gap-1 pb-3 ${
                      i < CREDENTIALS.length - 1 ? "border-b border-[#e5e7eb]" : ""
                    }`}
                  >
                    <p className="text-xs uppercase text-[#8c8c8c]">{item.label}</p>
                    <p className="text-[15px] font-semibold text-[#3e1815]">{item.value}</p>
                  </div>
                ))}
              </div>
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
    </>
  );
}
