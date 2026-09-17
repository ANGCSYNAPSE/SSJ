"use client";

import Image from "next/image";
import Link from "next/link";
import AdSlot from "@/components/ui/AdSlot";

export default function ManagementTeamPage() {

  const SECONDARY_NAV = [
    { label: "Overview", href: "/team" },
    { label: "Chairman", href: "/team/chairman" },
    { label: "Mukhya Trustee", href: "/team/mukhya-trustee" },
    { label: "Trustees", href: "/team/trustees" },
    { label: "Management Team", href: "/team/management-team", active: true },
    { label: "Advisory Board", href: "/team/advisory-board" },
    { label: "State Team", href: "/team/state-team" },
  ];

  const MANAGEMENT_TEAM = [
    {
      image: "/images/team/management/alok-vardhan.png",
      name: "Shri Alok Vardhan",
      role: "Director of Operations",
      dept: "Operations",
      location: "Jaipur, RJ",
      desc: "Oversees daily seva logistics, matrimonial portal checks, and tech implementation across state temples.",
    },
    {
      image: "/images/team/management/meera-rajpal.png",
      name: "Smt. Meera Rajpal",
      role: "Chief Financial Officer",
      dept: "Finance & Accounts",
      location: "New Delhi, DL",
      desc: "Manages donation allocations, audits, and corpus transparency with dedicated tracking protocols.",
    },
    {
      image: "/images/team/management/vivek-dev.png",
      name: "Shri Vivek Dev",
      role: "Head of Technology",
      dept: "IT & Systems",
      location: "Bengaluru, KA",
      desc: "Maintains the online directories, devotee registration databases, and secure online payment gateways.",
    },
    {
      image: "/images/team/management/rajesh-agnihotri.png",
      name: "Shri Rajesh Agnihotri",
      role: "Media & PR Manager",
      dept: "Communications",
      location: "Mumbai, MH",
      desc: "Coordinates bhajan sandhya streams, live broadcasts, and updates the spiritual newsletter monthly.",
    },
    {
      image: "/images/team/management/sharda-singhal.png",
      name: "Smt. Sharda Singhal",
      role: "Community Seva Lead",
      dept: "Outreach",
      location: "Khatu, RJ",
      desc: "Drives pilgrim medical relief camps, food distributions, and volunteer deployment plans.",
    },
    {
      image: "/images/team/management/naman-sharda.png",
      name: "Shri Naman Sharda",
      role: "General Legal Counsel",
      dept: "Legal & SLAs",
      location: "Chandigarh, HR",
      desc: "Ensures structural compliance for trust certifications, land management, and statutory frameworks.",
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
          <Link href="/team" className="text-[#8c8c8c]">
            {"Our Team"}
          </Link>
          <span className="text-[#9ca3af]">/</span>
          <span className="font-semibold text-primary">{"Management Team"}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-maroon px-6 py-16 text-center lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6">
          <h1 className="font-serif text-4xl font-bold text-[#f2c75c] sm:text-5xl lg:text-[56px]">
            {"MANAGEMENT TEAM"}
          </h1>
          <p className="max-w-[800px] text-base text-white/90 sm:text-lg">
            {"Meet the professionals responsible for managing operations and driving the organization's day-to-day activities under the divine grace of Baba Shyam."}
          </p>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Management Team grid */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-[60px]">
        <div className="mx-auto grid max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MANAGEMENT_TEAM.map((person) => (
            <div
              key={person.name}
              className="flex flex-col gap-5 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6 shadow-[0px_8px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="relative h-[240px] w-full overflow-hidden rounded-xl">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl font-bold text-maroon">{person.name}</h3>
                <p className="text-sm font-semibold uppercase text-primary">{person.role}</p>
                <div className="flex items-center gap-2 text-[13px] whitespace-nowrap">
                  <span className="font-medium text-[#3e1815]">{person.dept}</span>
                  <span className="text-[#9ca3af]">•</span>
                  <span className="text-[#595656]">{person.location}</span>
                </div>
              </div>
              <p className="text-sm leading-[22px] text-[#595656]">{person.desc}</p>
              <Link
                href="#"
                className="w-fit rounded-lg bg-[#fff3e0] px-5 py-3 text-sm font-semibold text-primary"
              >
                {"View Profile →"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <AdSlot size="leaderboard" />
    </>
  );
}
