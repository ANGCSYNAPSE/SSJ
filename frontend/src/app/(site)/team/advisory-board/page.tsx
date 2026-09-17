"use client";

import Image from "next/image";
import Link from "next/link";
import AdSlot from "@/components/ui/AdSlot";

export default function AdvisoryBoardPage() {

  const SECONDARY_NAV = [
    { label: "Overview", href: "/team" },
    { label: "Chairman", href: "/team/chairman" },
    { label: "Mukhya Trustee", href: "/team/mukhya-trustee" },
    { label: "Trustees", href: "/team/trustees" },
    { label: "Management Team", href: "/team/management-team" },
    { label: "Advisory Board", href: "/team/advisory-board", active: true },
    { label: "State Team", href: "/team/state-team" },
  ];

  const ADVISORY_BOARD = [
    {
      image: "/images/team/advisory/h-s-vashisht.png",
      name: "Justice (Retd) H.S. Vashisht",
      role: "Chief Legal Advisor",
      dept: "Trust Laws & Dharma Code",
      location: "New Delhi, DL",
      desc: "Guides global spiritual operations to keep trust frameworks legally resilient and ethically pure.",
    },
    {
      image: "/images/team/advisory/anand-swarup.png",
      name: "Shri Anand Swarup",
      role: "Strategic Finance Consultant",
      dept: "Asset Management",
      location: "Mumbai, MH",
      desc: "Advises on building sustainable healthcare corpora and micro-finance sevas for artists.",
    },
    {
      image: "/images/team/advisory/shrikant-shastri.png",
      name: "Dr. Acharya Shrikant Shastri",
      role: "Cultural & Ritual Advisor",
      dept: "Vedic Philosophy & Sevas",
      location: "Varanasi, UP",
      desc: "Safeguards traditional decorum, festive calendar audits, and authentic bhajan metrics.",
    },
    {
      image: "/images/team/advisory/sn-deshpande.png",
      name: "Prof. S. N. Deshpande",
      role: "Education Consultant",
      dept: "Sanskrit & Philosophy",
      location: "Pune, MH",
      desc: "Heads curatorial updates for Sanskrit schools and free children education programs.",
    },
    {
      image: "/images/team/advisory/shashi-kiran.png",
      name: "Smt. Shashi Kiran",
      role: "Technology Advisor",
      dept: "Digital Platforms & Trust",
      location: "Bengaluru, KA",
      desc: "Assists in deploying scalable biometric crowd setups and high-speed live feed grids.",
    },
    {
      image: "/images/team/advisory/arvind-jha.png",
      name: "Dr. Arvind K. Jha",
      role: "Healthcare Advisory Chair",
      dept: "Rural Medical Camps",
      location: "Jaipur, RJ",
      desc: "Designs baseline health checkup setups and free generic medicine supply chains.",
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
          <span className="font-semibold text-primary">{"Advisory Board"}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-maroon px-6 py-16 text-center lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6">
          <h1 className="font-serif text-4xl font-bold text-[#f2c75c] sm:text-5xl lg:text-[56px]">
            {"ADVISORY BOARD"}
          </h1>
          <p className="max-w-[800px] text-base text-white/90 sm:text-lg">
            {"Meet the seasoned veterans, sages, legal luminaries, and industry experts steering our operations with strict commitment to statutory compliances and Sanatana values."}
          </p>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Advisory Board grid */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-[60px]">
        <div className="mx-auto grid max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADVISORY_BOARD.map((person) => (
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
