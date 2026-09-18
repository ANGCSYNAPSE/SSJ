"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

type SelectProps = {
  icon?: ComponentType<{ className?: string }>;
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
    <div className="relative w-full sm:w-[200px] shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center gap-2 rounded-lg border border-[rgba(212,175,55,0.25)] bg-cream px-4 py-3 text-sm"
      >
        {Icon && <Icon className="h-4 w-4 shrink-0 text-[#3e1815]" aria-hidden />}
        <span className="flex-1 text-left text-[#3e1815]">{value}</span>
        <ChevronDown
          className={`h-3 w-3 shrink-0 text-[#3e1815] transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                  : "text-[#3e1815] hover:bg-cream"
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

const typeFilters = ["All", "Bhajan Mandals", "Seva Samitis", "Cultural Trusts", "Youth Wings"];
const typeOptions = ["All Types", "Bhajan Mandal", "Seva Samiti", "Cultural Trust", "Youth Wing"];
const regionOptions = ["All India", "Rajasthan", "Delhi", "Gujarat", "Maharashtra", "West Bengal", "Uttar Pradesh"];

const organisations = [
  {
    name: "Jaipur Kirtan Mandal",
    type: "Bhajan Mandal",
    established: "Est: 2010",
    location: "Jaipur, India",
    members: "450 Active Members",
    image: "/images/organisation-directory/jaipur-kirtan-mandal.png",
  },
  {
    name: "Sewa Dharma Samiti",
    type: "Seva Samiti",
    established: "Est: 2015",
    location: "Sikar, India",
    members: "1200 Active Members",
    image: "/images/organisation-directory/sewa-dharma-samiti.png",
  },
  {
    name: "Shri Shyam Matri Trust",
    type: "Cultural Trust",
    established: "Est: 2008",
    location: "Kolkata, India",
    members: "850 Active Members",
    image: "/images/organisation-directory/shri-shyam-matri-trust.png",
  },
  {
    name: "Sanatan Bal Parishad",
    type: "Youth Wing",
    established: "Est: 2021",
    location: "Indore, India",
    members: "320 Active Members",
    image: "/images/organisation-directory/sanatan-bal-parishad.png",
  },
  {
    name: "Baba Shyam Kirtan Sangha",
    type: "Bhajan Mandal",
    established: "Est: 2012",
    location: "Delhi, India",
    members: "600 Active Members",
    image: "/images/organisation-directory/baba-shyam-kirtan-sangha.png",
  },
  {
    name: "Shyam Seva Dal Trust",
    type: "Seva Samiti",
    established: "Est: 1999",
    location: "Ahmedabad, India",
    members: "2100 Active Members",
    image: "/images/organisation-directory/shyam-seva-dal-trust.png",
  },
  {
    name: "Khatu Devotee United",
    type: "Youth Wing",
    established: "Est: 2018",
    location: "Mumbai, India",
    members: "430 Active Members",
    image: "/images/organisation-directory/khatu-devotee-united.png",
  },
  {
    name: "Vrindavan Lila Mandal",
    type: "Bhajan Mandal",
    established: "Est: 2005",
    location: "Mathura, India",
    members: "500 Active Members",
    image: "/images/organisation-directory/vrindavan-lila-mandal.png",
  },
  {
    name: "Sita Ram Annadan Samiti",
    type: "Seva Samiti",
    established: "Est: 2019",
    location: "Ayodhya, India",
    members: "1500 Active Members",
    image: "/images/organisation-directory/sita-ram-annadan-samiti.png",
  },
];

const typeToChip: Record<string, string> = {
  "Bhajan Mandal": "Bhajan Mandals",
  "Seva Samiti": "Seva Samitis",
  "Cultural Trust": "Cultural Trusts",
  "Youth Wing": "Youth Wings",
};

export default function OrganisationDirectoryPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [region, setRegion] = useState(regionOptions[0]);
  const [activeChip, setActiveChip] = useState("All");

  const filtered = organisations.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(search.toLowerCase());
    const matchesChip = activeChip === "All" || typeToChip[org.type] === activeChip;
    return matchesSearch && matchesChip;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[500px] items-center overflow-hidden bg-maroon px-6 lg:px-20">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/organisation-directory/hero-background.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(61,16,16,0.65)]" />
        </div>
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-3">
            <h1 className="font-serif text-4xl font-bold leading-[1.15] text-[#f2c75c] sm:text-5xl lg:text-[56px]">
              Organisations &amp; Mandals
            </h1>
            <p className="font-serif text-2xl font-semibold text-white sm:text-[32px]">
              Unite in Devotion &amp; Seva
            </p>
            <div className="h-1 w-[120px] bg-primary" />
          </div>
          <p className="max-w-[800px] text-base leading-[1.6] text-cream">
            Connect with verified bhajan mandals, charity trusts, and community groups
            across India. Together, under the grace of Baba Shyam, we amplify our
            collective impact.
          </p>
          <Link
            href="/mandal-registration"
            className="rounded-full border-2 border-white px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white hover:text-maroon"
          >
            Register Group
          </Link>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Filters overview */}
      <section className="flex flex-col gap-4 border-b border-[rgba(212,175,55,0.25)] bg-cream px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-20">
        <div className="flex flex-wrap gap-3">
          {typeFilters.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveChip(chip)}
              className={`rounded-full border border-[rgba(212,175,55,0.25)] px-4 py-2 text-[13px] font-medium transition ${
                activeChip === chip
                  ? "bg-maroon text-white"
                  : "bg-white text-maroon hover:bg-cream"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
        <p className="text-sm font-semibold text-[#3e1815]">
          Showing {filtered.length} Groups
        </p>
      </section>

      {/* Search & filters */}
      <section className="border-b border-[rgba(212,175,55,0.25)] bg-white px-6 py-6 lg:px-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[rgba(212,175,55,0.25)] bg-[#fff8f0] px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-[#8c8c8c]" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search organisations by name..."
              className="w-full bg-transparent text-sm text-[#3e1815] placeholder:text-[#8c8c8c] focus:outline-none"
            />
          </div>
          <FilterSelect options={typeOptions} value={type} onChange={setType} />
          <FilterSelect icon={MapPin} options={regionOptions} value={region} onChange={setRegion} />
          <button
            type="button"
            className="flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-primary-dark"
          >
            Search
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 py-12 lg:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((org) => (
            <div
              key={org.name}
              className="flex flex-col overflow-hidden rounded-2xl border-[1.5px] border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_6px_18px_rgba(62,24,21,0.04)]"
            >
              <div className="relative h-[180px] w-full">
                <Image
                  src={org.image}
                  alt={org.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-cream px-2 py-1 text-[11px] font-semibold text-primary">
                    {org.type}
                  </span>
                  <p className="text-xs text-[#8c8c8c]">{org.established}</p>
                </div>
                <h3 className="truncate font-serif text-[22px] font-bold text-[#3e1815]">
                  {org.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#595656]" aria-hidden />
                  <p className="text-[13px] text-[#595656]">{org.location}</p>
                </div>
                <p className="text-xs text-[#8c8c8c]">{org.members}</p>
                <div className="h-px w-full bg-[#e5e7eb]" />
                <Link
                  href="#"
                  className="text-sm font-semibold text-primary"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mx-auto max-w-[1280px] py-12 text-center text-sm text-[#8c8c8c]">
            No organisations match your search.
          </p>
        )}

        {/* Pagination */}
        <nav
          className="mx-auto flex max-w-[1280px] items-center justify-center gap-2 pt-12"
          aria-label="Organisation directory pagination"
        >
          <button
            type="button"
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.25)] bg-white text-[#3e1815] transition hover:bg-cream"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
                page === 1
                  ? "bg-primary text-white"
                  : "border border-[rgba(212,175,55,0.25)] bg-white text-[#595656] hover:bg-cream"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-sm text-[#8c8c8c]">...</span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.25)] bg-white text-sm font-semibold text-[#595656] transition hover:bg-cream"
          >
            12
          </button>
          <button
            type="button"
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.25)] bg-white text-[#3e1815] transition hover:bg-cream"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-6 bg-maroon px-6 py-20 text-center lg:px-20">
        <p className="text-sm font-semibold uppercase text-[#f2c75c]">
          Join Our Spiritual Ecosystem
        </p>
        <h2 className="font-serif text-[32px] font-bold text-white sm:text-[40px]">
          Register Your Mandal or Samiti Today
        </h2>
        <p className="max-w-[800px] text-base leading-[1.6] text-white/80">
          Get verified, showcase your devotional services, coordinates yatras, invite
          devotees, and accept digital contributions transparently under our secure tax
          benefit framework.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <Link
            href="/mandal-registration"
            className="rounded-lg bg-primary px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-primary-dark"
          >
            Register Group Now
          </Link>
          <Link
            href="#"
            className="rounded-lg border-[1.5px] border-[#f2c75c] px-8 py-3.5 text-[15px] font-semibold text-[#f2c75c] transition hover:bg-[#f2c75c] hover:text-maroon"
          >
            Learn Benefits
          </Link>
        </div>
      </section>

    </>
  );
}
