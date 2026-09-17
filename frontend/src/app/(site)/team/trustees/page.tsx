"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

export default function TrusteesPage() {

  const SECONDARY_NAV = [
    { label: "Overview", href: "/team" },
    { label: "Chairman", href: "/team/chairman" },
    { label: "Mukhya Trustee", href: "/team/mukhya-trustee" },
    { label: "Trustees", href: "/team/trustees", active: true },
    { label: "Management Team", href: "/team/management-team" },
    { label: "Advisory Board", href: "/team/advisory-board" },
    { label: "State Team", href: "/team/state-team" },
  ];

  const TRUSTEES = [
    {
      image: "/images/team/trustees/vikram-singh.png",
      name: "Shri Vikram Singh Ji",
      location: "Jaipur, Rajasthan",
      desc: "Supervising IT transformation, temple verification networks, and data transparency programs.",
    },
    {
      image: "/images/team/trustees/ashok-saraf.png",
      name: "Shri Ashok Kumar Saraf",
      location: "Mumbai, Maharashtra",
      desc: "Directing financial audits, legal compliances, and large corpus fund allocations.",
    },
    {
      image: "/images/team/trustees/rajani-sharma.png",
      name: "Smt. Rajani Sharma",
      location: "Delhi, NCR",
      desc: "Overseeing volunteer mobilization, corporate social responsibility (CSR) tie-ups, and cultural events.",
    },
    {
      image: "/images/team/trustees/devendra-singh.png",
      name: "Shri Devendra Singh",
      location: "Indore, Madhya Pradesh",
      desc: "Coordinating food distribution networks and mobile health clinics across central India.",
    },
    {
      image: "/images/team/trustees/shanti-poddar.png",
      name: "Smt. Shanti Devi Poddar",
      location: "Kolkata, West Bengal",
      desc: "Patronizing standard spiritual literature publication and bhajan artist coordination.",
    },
    {
      image: "/images/team/trustees/kamal-vyas.png",
      name: "Shri Kamal Kishor Vyas",
      location: "Bikaner, Rajasthan",
      desc: "Managing heritage preservation of ancient manuscripts and temple music traditions.",
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
          <span className="font-semibold text-primary">{"Trustees"}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-maroon px-6 py-16 text-center lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-5">
          <h1 className="font-serif text-4xl font-bold text-[#f2c75c] sm:text-5xl">
            {"Our Trustees"}
          </h1>
          <p className="max-w-[700px] text-base text-white/80">
            {"The Shree Shyam Jagat board of trustees comprises prominent leaders, spiritual reformists, and philanthropists governing our transparent social programs."}
          </p>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Trustees grid */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-[60px]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRUSTEES.map((trustee) => (
              <div
                key={trustee.name}
                className="flex flex-col gap-5 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6"
              >
                <div className="relative h-[220px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={trustee.image}
                    alt={trustee.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-[22px] font-bold text-maroon">
                    {trustee.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase text-primary">
                    {trustee.location}
                  </p>
                </div>
                <p className="h-[40px] text-[13px] leading-5 text-[#595656]">{trustee.desc}</p>
                <Link
                  href="#"
                  className="w-fit rounded-lg bg-cream px-5 py-2.5 text-[13px] font-semibold text-maroon"
                >
                  {"View Profile"}
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="flex items-center justify-center gap-2" aria-label={"Trustees pagination"}>
            <button
              type="button"
              aria-label={"Previous page"}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-maroon transition hover:bg-cream"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
                  page === 1 ? "bg-primary text-white" : "text-maroon hover:bg-cream"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              aria-label={"Next page"}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-maroon transition hover:bg-cream"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}
