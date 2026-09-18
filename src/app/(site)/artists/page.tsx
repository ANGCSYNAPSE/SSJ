"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Music,
  MapPin,
  ChevronDown,
  X,
  Grid3X3,
  List,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-[rgba(212,175,55,0.25)] bg-cream-light px-4 py-3 text-sm"
      >
        <span className="flex items-center gap-2 font-medium text-maroon">
          <Icon className="h-4 w-4 shrink-0" aria-hidden />
          {value}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-maroon transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                value === option ? "bg-primary text-white" : "text-maroon hover:bg-cream"
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

const artistTypes = ["Bhajan Singer", "Musician", "Dancer", "Speaker", "Composer"];
const regions = ["All India", "Rajasthan", "Delhi", "Gujarat", "Maharashtra", "UP"];
const sortOptions = ["Popular", "Newest", "Most Followed", "Rating High to Low"];

const artists = [
  {
    id: 1,
    name: "Radha Sharma",
    category: "Bhajan Singer",
    region: "Rajasthan",
    image: "/images/artists/singer.png",
    location: "Jaipur, Rajasthan",
    rating: 5.0,
    description: "Renowned devotional vocalist specializing in emotional Krishna bhajans and traditional kirtans.",
  },
  {
    id: 2,
    name: "Vikram Patel",
    category: "Tabla Maestro",
    region: "Gujarat",
    image: "/images/artists/tabla.png",
    location: "Ahmedabad, Gujarat",
    rating: 4.5,
    description: "Vibrant rhythmist with over 15 years of accompaniment in major devotional events and classical concerts.",
  },
  {
    id: 3,
    name: "Meera Joshi",
    category: "Kathak Dancer",
    region: "UP",
    image: "/images/artists/dancer.png",
    location: "Varanasi, UP",
    rating: 5.0,
    description: "Graceful exponent of Kathak, expressing spiritual tales of Lord Krishna through expressive mudras.",
  },
  {
    id: 4,
    name: "Arjun Malhotra",
    category: "Flute Player",
    region: "Delhi",
    image: "/images/artists/flute.png",
    location: "Delhi",
    rating: 4.0,
    description: "Spiritual flute player who recreates the divine, mesmerizing melodies of Vrindavan on bamboo bansuri.",
  },
  {
    id: 5,
    name: "Sunita Devi",
    category: "Devotional Painter",
    region: "Rajasthan",
    image: "/images/artists/painter.png",
    location: "Udaipur, Rajasthan",
    rating: 5.0,
    description: "Acclaimed heritage artist painting detailed Shrinathji and Khatu Shyam Ji miniature portraits.",
  },
  {
    id: 6,
    name: "Krishna Bhajan Mandali",
    category: "Kirtan Group",
    region: "Rajasthan",
    image: "/images/artists/kirtan.png",
    location: "Khatu, Rajasthan",
    rating: 4.5,
    description: "High-energy collective bringing continuous kirtan and traditional chanting to devotees worldwide.",
  },
  {
    id: 7,
    name: "Deepak Verma",
    category: "Spiritual Speaker",
    region: "UP",
    image: "/images/artists/speaker.png",
    location: "Lucknow, UP",
    rating: 4.0,
    description: "Vedic scholar explaining scriptures, the divine pastimes of Barbarik, and life lessons of Dharma.",
  },
  {
    id: 8,
    name: "Anjali Tripathi",
    category: "Classical Vocalist",
    region: "MP",
    image: "/images/artists/vocalist.png",
    location: "Bhopal, MP",
    rating: 4.5,
    description: "Master of dhrupad and devotional classical raagas dedicated to the ultimate worship of Baba Shyam.",
  },
  {
    id: 9,
    name: "Ramesh Suthar",
    category: "Harmonium Player",
    region: "Rajasthan",
    image: "/images/artists/harmonium.png",
    location: "Jodhpur, Rajasthan",
    rating: 4.0,
    description: "Accomplished melodist supporting legendary bhajan events with traditional harmonium playing.",
  },
  {
    id: 10,
    name: "Priya Nair",
    category: "Bharatanatyam Dancer",
    region: "Maharashtra",
    image: "/images/artists/bharatanatyam.png",
    location: "Mumbai, Maharashtra",
    rating: 5.0,
    description: "Exponent of ancient temple dances, presenting visual worship dedicated to Lord Krishna's glory.",
  },
  {
    id: 11,
    name: "Govind Das",
    category: "Dhol Player",
    region: "Rajasthan",
    image: "/images/artists/dhol.png",
    location: "Sikar, Rajasthan",
    rating: 4.5,
    description: "Energetic folk percussionist leading festive processions and grand aarti celebrations in Rajasthan.",
  },
  {
    id: 12,
    name: "Kavita Singh",
    category: "Devotional Poet",
    region: "MP",
    image: "/images/artists/poet.png",
    location: "Indore, MP",
    rating: 4.0,
    description: "Expressive poet compiling moving, contemporary lyrics and verses in deep devotion of Baba Shyam.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-[13px] font-bold text-[#d4af37]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < Math.round(rating) ? "fill-[#d4af37] text-[#d4af37]" : "text-[#e5d9b6]"}`}
        />
      ))}
      <span className="ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function ArtistsPage() {
  const [search, setSearch] = useState("");
  const [artistType, setArtistType] = useState(artistTypes[0]);
  const [region, setRegion] = useState(regions[0]);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    artistTypes[0],
    regions[0],
  ]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  function removeFilter(filter: string) {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  }

  function clearFilters() {
    setSearch("");
    setArtistType(artistTypes[0]);
    setRegion(regions[0]);
    setSortBy(sortOptions[0]);
    setActiveFilters([]);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 lg:px-20 lg:py-16">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/artists/hero.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(107,31,31,0.8)] via-[rgba(107,31,31,0)] via-[55%] to-[rgba(107,31,31,0.8)]" />
        </div>

        <div className="relative mx-auto flex max-w-[1280px] flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold uppercase text-[#d4af37]">
              || जय श्री श्याम ||
            </p>
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-[56px]">
              Our Artists Directory
            </h1>
            <p className="max-w-[800px] text-base leading-relaxed text-cream-light sm:text-lg">
              Discover talented devotional artists, musicians, dancers, and speakers
              who bring the spirit of Baba Shyam to life through their art.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-[0px_8px_12px_rgba(62,24,21,0.1)] lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-[rgba(212,175,55,0.25)] bg-cream-light px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-[#6b4a4a]" aria-hidden />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by artist name..."
                className="w-full bg-transparent text-sm text-[#3e1815] placeholder:text-[#6b4a4a] focus:outline-none"
              />
            </div>
            <div className="lg:w-[260px]">
              <FilterSelect icon={Music} options={artistTypes} value={artistType} onChange={setArtistType} />
            </div>
            <div className="lg:w-[220px]">
              <FilterSelect icon={MapPin} options={regions} value={region} onChange={setRegion} />
            </div>
            <div className="lg:w-[200px]">
              <FilterSelect
                icon={ChevronDown}
                options={sortOptions.map((o) => `Sort By: ${o}`)}
                value={`Sort By: ${sortBy}`}
                onChange={(v) => setSortBy(v.replace("Sort By: ", ""))}
              />
            </div>
            <button
              type="button"
              className="rounded-lg bg-primary px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-primary-dark"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Filters overview */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-[rgba(212,175,55,0.25)] bg-cream px-6 py-6 sm:flex-row sm:items-center lg:px-20">
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-base font-semibold text-[#3e1815]">
            Showing {artists.length} Artists
          </p>
          {activeFilters.length > 0 && (
            <>
              <span className="hidden h-4 w-px bg-[rgba(212,175,55,0.4)] sm:block" />
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="flex items-center gap-1.5 rounded-full border border-[rgba(212,175,55,0.25)] bg-white px-3 py-1.5 text-[13px] text-maroon"
                >
                  {filter}
                  <button type="button" onClick={() => removeFilter(filter)} aria-label={`Remove ${filter} filter`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={clearFilters}
                className="text-[13px] font-medium text-primary underline"
              >
                Clear All
              </button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`rounded-md border p-2 ${
              viewMode === "grid" ? "border-primary bg-white" : "border-transparent bg-cream-light"
            }`}
          >
            <Grid3X3 className="h-4 w-4 text-maroon" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`rounded-md border p-2 ${
              viewMode === "list" ? "border-primary bg-white" : "border-transparent bg-cream-light"
            }`}
          >
            <List className="h-4 w-4 text-maroon" />
          </button>
        </div>
      </div>

      {/* Artists grid */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_6px_18px_rgba(62,24,21,0.04)]"
              >
                <div className="relative h-[260px] w-full">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-cream px-2.5 py-1 text-xs font-semibold text-primary">
                      {artist.category}
                    </span>
                    <StarRating rating={artist.rating} />
                  </div>
                  <h3 className="truncate font-serif text-2xl font-bold text-[#3e1815]">
                    {artist.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#6b4a4a]">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{artist.location}</span>
                  </div>
                  <p className="line-clamp-2 text-[13px] leading-[1.4] text-[#444]">
                    {artist.description}
                  </p>
                  <div className="h-px w-full bg-border" />
                  <Link
                    href="#"
                    className="flex items-center justify-between text-sm font-semibold text-maroon"
                  >
                    View Profile
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-[rgba(212,175,55,0.25)] bg-white p-2.5"
            >
              <ChevronLeft className="h-4 w-4 text-maroon" />
            </button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-[rgba(212,175,55,0.25)] bg-white text-[#444]"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-3 py-2.5 text-sm text-[#6b4a4a]">...</span>
            <button
              type="button"
              onClick={() => setCurrentPage(6)}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                currentPage === 6
                  ? "bg-primary text-white"
                  : "border border-[rgba(212,175,55,0.25)] bg-white text-[#444]"
              }`}
            >
              6
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(6, p + 1))}
              className="rounded-lg border border-[rgba(212,175,55,0.25)] bg-white p-2.5"
            >
              <ChevronRight className="h-4 w-4 text-maroon" />
            </button>
          </div>
        </div>
      </section>

      <AdSlot size="banner" />

      {/* Become an Artist CTA */}
      <section className="flex flex-col items-center gap-8 border-y border-[rgba(212,175,55,0.25)] bg-cream px-6 py-16 lg:px-20 lg:py-20">
        <div className="flex max-w-[800px] flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase text-primary">
            Join our spiritual ecosystem
          </p>
          <h2 className="font-serif text-3xl font-bold text-[#3e1815] sm:text-4xl">
            Are You an Artist?
          </h2>
          <p className="text-base leading-relaxed text-[#444]">
            Join our growing community of devotional artists. Register today and
            showcase your talent at spiritual events, kirtans, and yatras across
            India.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/artist-registration"
            className="rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition hover:bg-primary-dark"
          >
            Register as Artist
          </Link>
          <Link
            href="#"
            className="rounded-lg border-[1.5px] border-maroon px-7 py-3.5 text-base font-semibold text-maroon transition hover:bg-maroon hover:text-white"
          >
            Learn More
          </Link>
        </div>
      </section>
    </>
  );
}
