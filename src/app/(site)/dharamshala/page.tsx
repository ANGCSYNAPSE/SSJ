"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Coffee,
  ChevronDown,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

type SelectProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function FilterSelect({ icon: Icon, label, options, value, onChange }: SelectProps) {
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
    <div className="relative w-full sm:w-[220px] shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center gap-2 rounded-lg border border-[rgba(212,175,55,0.25)] bg-cream px-4 py-3 text-sm"
      >
        <Icon className="h-4 w-4 shrink-0 text-[#3e1815]" aria-hidden />
        <span className="flex-1 text-left text-[#3e1815]">
          {label}: {value}
        </span>
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

const cityOptions = [
  "All",
  "Vrindavan",
  "Mathura",
  "Khatushyamji",
  "Ayodhya",
  "Puri",
  "Varanasi",
  "Salasar",
  "Jaipur",
];

const amenityOptions = [
  "Food Seva",
  "AC Rooms",
  "Parking Area",
  "Free Wifi",
  "Wheelchair Access",
];

const cityChips = ["All Stays", "Vrindavan", "Mathura", "Khatushyamji", "Ayodhya", "Puri", "Varanasi"];

const dharamshalas = [
  {
    name: "Shree Krishna Bhavan",
    city: "Vrindavan",
    rating: 4.8,
    rooms: "110 Rooms",
    price: "₹300/night",
    image: "/images/dharamshala-directory/shree-krishna-bhavan.png",
  },
  {
    name: "Shyam Seva Ashram",
    city: "Khatushyamji",
    rating: 4.9,
    rooms: "180 Rooms",
    price: "Free Bhojan",
    image: "/images/dharamshala-directory/shyam-seva-ashram.png",
  },
  {
    name: "Sri Ayodhya guest house",
    city: "Ayodhya",
    rating: 4.7,
    rooms: "90 Rooms",
    price: "₹400/night",
    image: "/images/dharamshala-directory/sri-ayodhya-guest-house.png",
  },
  {
    name: "Radhe Radhe Dharamshala",
    city: "Vrindavan",
    rating: 4.5,
    rooms: "70 Rooms",
    price: "₹250/night",
    image: "/images/dharamshala-directory/radhe-radhe-dharamshala.png",
  },
  {
    name: "Shyam Bagichi Lodge",
    city: "Khatushyamji",
    rating: 4.6,
    rooms: "100 Rooms",
    price: "₹350/night",
    image: "/images/dharamshala-directory/shyam-bagichi-lodge.png",
  },
  {
    name: "Balaji Seva Sadan",
    city: "Salasar",
    rating: 4.8,
    rooms: "150 Rooms",
    price: "Contribution-based",
    image: "/images/dharamshala-directory/balaji-seva-sadan.png",
  },
  {
    name: "Ram Mandir pilgrim ashram",
    city: "Ayodhya",
    rating: 4.9,
    rooms: "200 Rooms",
    price: "Free Lodging",
    image: "/images/dharamshala-directory/ram-mandir-pilgrim-ashram.png",
  },
  {
    name: "Gopal Lal Ji Dharamshala",
    city: "Jaipur",
    rating: 4.4,
    rooms: "65 Rooms",
    price: "₹200/night",
    image: "/images/dharamshala-directory/gopal-lal-ji-dharamshala.png",
  },
  {
    name: "Mahaprabhu Seva Sadan",
    city: "Puri",
    rating: 4.7,
    rooms: "120 Rooms",
    price: "₹500/night",
    image: "/images/dharamshala-directory/mahaprabhu-seva-sadan.png",
  },
];

export default function DharamshalaDirectoryPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(cityOptions[0]);
  const [amenity, setAmenity] = useState(amenityOptions[0]);
  const [activeChip, setActiveChip] = useState("All Stays");

  const filtered = dharamshalas.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesChip = activeChip === "All Stays" || d.city === activeChip;
    return matchesSearch && matchesChip;
  });

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-start gap-6 bg-maroon px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-6">
          <p className="text-sm font-semibold tracking-[2px] text-[#d4af37]">
            COMFORTABLE PILGRIM ACCOMMODATIONS
          </p>
          <h1 className="max-w-[900px] font-serif text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[52px]">
            Dharamshala Directory — Find Pilgrim Stays Across India
          </h1>
          <p className="max-w-[800px] text-base leading-7 text-white/85 sm:text-lg">
            Sustained by devotion, built for service. Discover verified community
            dharamshalas, ashrams, and guest houses near your favorite temples for a
            peaceful and dignified stay.
          </p>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Search & filters */}
      <section className="border-b border-[rgba(212,175,55,0.25)] bg-white px-6 py-6 lg:px-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[rgba(212,175,55,0.25)] bg-cream px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-[#595656]" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Dharamshala name..."
              className="w-full bg-transparent text-sm text-[#595656] placeholder:text-[#595656] focus:outline-none"
            />
          </div>
          <FilterSelect icon={MapPin} label="Select City" options={cityOptions} value={city} onChange={setCity} />
          <FilterSelect icon={Coffee} label="Amenity" options={amenityOptions} value={amenity} onChange={setAmenity} />
          <button
            type="button"
            className="flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-primary-dark"
          >
            Search
          </button>
        </div>
      </section>

      {/* City chips */}
      <section className="px-6 pt-6 lg:px-20">
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-3">
          {cityChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveChip(chip)}
              className={`rounded-full border border-[rgba(212,175,55,0.25)] px-4 py-2 text-[13px] font-semibold transition ${
                activeChip === chip
                  ? "bg-primary text-white"
                  : "bg-white text-[#3e1815] hover:bg-cream"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* Listing grid */}
      <section className="px-6 pb-12 pt-8 lg:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((stay) => (
            <div
              key={stay.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_6px_18px_rgba(0,0,0,0.04)]"
            >
              <div className="relative h-[200px] w-full">
                <Image
                  src={stay.image}
                  alt={stay.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#fff3e0] px-2.5 py-1 text-[11px] font-semibold text-primary">
                    {stay.city}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                    <span className="ml-1 text-xs font-semibold text-[#595656]">{stay.rating}</span>
                  </div>
                </div>
                <h3 className="truncate font-serif text-xl font-bold text-[#3e1815]">
                  {stay.name}
                </h3>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-[13px] text-[#595656]">{stay.rooms}</p>
                  <p className="text-sm font-semibold text-primary">{stay.price}</p>
                </div>
                <Link
                  href="#"
                  className="flex items-center justify-center rounded-lg bg-primary py-2.5 text-[13px] font-semibold text-white transition hover:bg-primary-dark"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mx-auto max-w-[1280px] py-12 text-center text-sm text-[#8c8c8c]">
            No dharamshalas match your search.
          </p>
        )}

        {/* Pagination */}
        <nav
          className="mx-auto flex max-w-[1280px] items-center justify-center gap-2 pt-8"
          aria-label="Dharamshala directory pagination"
        >
          <button
            type="button"
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.25)] bg-white text-[#3e1815] transition hover:bg-cream"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3].map((page) => (
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
          <span className="px-1 text-sm text-[#595656]">...</span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.25)] bg-white text-sm font-semibold text-[#595656] transition hover:bg-cream"
          >
            8
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

    </>
  );
}
