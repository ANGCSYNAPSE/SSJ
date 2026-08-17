"use client";

import { useState, useRef, useEffect, type ComponentType } from "react";
import { ChevronDown, Search, MapPin, Grid3X3, List, Star, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CustomSelectProps = {
  icon: ComponentType<any>;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function CustomSelect({ icon: Icon, options, value, onChange, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative group" ref={dropdownRef} style={{ zIndex: isOpen ? 9999 : 40 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 rounded-lg border-2 border-[#E0E0E0] bg-white px-3 py-2.5 text-sm transition-all duration-300 hover:border-[#E07C2D] hover:shadow-md focus:border-[#E07C2D] focus:bg-[#FFF0E6] focus:shadow-lg focus:outline-none"
      >
        <Icon className="h-4 w-4 text-[#E07C2D] flex-shrink-0 transition-transform duration-300" aria-hidden />
        <span className="flex-1 text-left font-medium text-[#583939]">{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 pointer-events-none text-[#999] transition-all duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-[#E07C2D] scale-110" : ""}`} aria-hidden />
      </button>

      {isOpen && (
        <div className="absolute z-[9999] w-full mt-2 bg-white border-2 border-[#E07C2D] rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
          <div className="max-h-60 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                  value === option
                    ? "bg-[#E07C2D] text-white"
                    : "text-[#583939] hover:bg-[#FFF0E6] hover:text-[#E07C2D]"
                }`}
              >
                {value === option && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const artistsData = [
  {
    id: 1,
    name: "Radha Sharma",
    category: "Bhajan Singer",
    image: "/images/artist/singer.png",
    location: "Jaipur, Rajasthan",
    rating: 5.0,
    description: "Renowned devotional vocalist specializing in emotional Krishna bhajans...",
  },
  {
    id: 2,
    name: "Vikram Patel",
    category: "Tabla Maestro",
    image: "/images/artist/tabla.png",
    location: "Ahmedabad, Gujarat",
    rating: 4.8,
    description: "Vibrant rhythmist with over 15 years of accompaniment in major devotional e...",
  },
  {
    id: 3,
    name: "Meera Joshi",
    category: "Kathak Dancer",
    image: "/images/artist/dancer.png",
    location: "Varanasi, UP",
    rating: 5.0,
    description: "Graceful exponent of Kathak, expressing spiritual tales of Lord Krishna through e...",
  },
  {
    id: 4,
    name: "Arjun Malhotra",
    category: "Flute Player",
    image: "/images/artist/flute.png",
    location: "Delhi",
    rating: 4.0,
    description: "Spiritual flute player who recreates the divine, mesmerizing melodies of Vrind...",
  },
  {
    id: 5,
    name: "Sunita Devi",
    category: "Devotional Painter",
    image: "/images/artist/painter.png",
    location: "Udaipur, Rajasthan",
    rating: 5.0,
    description: "Acclaimed heritage artist painting detailed Shrinathji and Shyam Ji...",
  },
  {
    id: 6,
    name: "Krishna Bhajan Mandali",
    category: "Kirtan Group",
    image: "/images/artist/kirtan.png",
    location: "Khaitu, Rajasthan",
    rating: 4.8,
    description: "High-energy collective bringing continuous kirtan and traditional chant...",
  },
  {
    id: 7,
    name: "Deepak Verma",
    category: "Spiritual Speaker",
    image: "/images/artist/speaker.png",
    location: "Lucknow, UP",
    rating: 4.0,
    description: "Vedic scholar expounding scriptures, the divine pastimes of Radhik, and life les...",
  },
  {
    id: 8,
    name: "Anjali Tripathi",
    category: "Classical Vocalist",
    image: "/images/artist/vocalist.png",
    location: "Bhopal, MP",
    rating: 4.5,
    description: "Master of unusual and devotional classical ragas dedicated to the ultim...",
  },
];

export default function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [artistType, setArtistType] = useState("All Types");
  const [region, setRegion] = useState("All India");
  const [sortBy, setSortBy] = useState("Popular");
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const artistsPerPage = 8;
  const totalPages = Math.ceil(artistsData.length / artistsPerPage);
  const startIndex = (currentPage - 1) * artistsPerPage;
  const endIndex = startIndex + artistsPerPage;
  const paginatedArtists = artistsData.slice(startIndex, endIndex);

  const artistTypes = ["All Types", "Bhajan Singer", "Musician", "Dancer", "Speaker", "Composer"];
  const regions = ["All India", "Rajasthan", "Delhi", "Gujarat", "Maharashtra", "UP", "Karnataka", "Tamil Nadu"];
  const sortOptions = ["Popular", "Newest", "Most Followed", "Rating High to Low"];

  const handleSearch = () => {
    console.log("Search:", { searchQuery, artistType, region, sortBy });
    setActiveFilters([]);
    setCurrentPage(1);
    if (artistType !== "All Types") setActiveFilters(prev => [...prev, artistType]);
    if (region !== "All India") setActiveFilters(prev => [...prev, region]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setArtistType("All Types");
    setRegion("All India");
    setSortBy("Popular");
    setActiveFilters([]);
    setCurrentPage(1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxPages = 5;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[680px] py-10 sm:h-[600px] sm:py-0 lg:h-[750px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/artist/hero.png"
          alt="Artists Directory"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          {/* Top Content - Heading and Description */}
          <div className="flex flex-col items-center justify-center text-center mb-8">
            {/* Main Heading */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
              Our Artists Directory
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover talented devotional artists, musicians, dancers, and speakers who bring the spirit of Baba Shyam to life through their art.
            </p>
          </div>

          {/* Bottom Content - Search Filters */}
          <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E07C2D]" />
                  <input
                    type="text"
                    placeholder="Search by artist name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#E0E0E0] focus:border-[#E07C2D] focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* Artist Type Dropdown */}
              <div className="w-full sm:w-auto sm:flex-1">
                <CustomSelect
                  icon={() => <span className="text-lg">🎤</span>}
                  options={artistTypes}
                  value={artistType}
                  onChange={setArtistType}
                  placeholder="Bhajan Singer"
                />
              </div>

              {/* Region Dropdown */}
              <div className="w-full sm:w-auto sm:flex-1">
                <CustomSelect
                  icon={MapPin}
                  options={regions}
                  value={region}
                  onChange={setRegion}
                  placeholder="All India"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="w-full sm:w-auto sm:flex-1">
                <CustomSelect
                  icon={() => <span className="text-lg">⬇️</span>}
                  options={sortOptions.map(opt => `Sort By: ${opt}`)}
                  value={`Sort By: ${sortBy}`}
                  onChange={(val) => setSortBy(val.replace("Sort By: ", ""))}
                  placeholder="Sort By: Popular"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto bg-[#E07C2D] hover:bg-[#D46B1B] text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Grid Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header with Filters and View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
            <div className="flex-1">
              <p className="text-lg font-semibold text-[#583939] mb-3">
                Showing {artistsData.length} Artists
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                {activeFilters.length > 0 && (
                  <>
                    {activeFilters.map((filter, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2 bg-[#FFF0E6] text-[#E07C2D] px-3 py-1.5 rounded-lg text-sm font-medium">
                        {filter}
                        <X className="w-4 h-4 cursor-pointer hover:text-[#D46B1B]" />
                      </span>
                    ))}
                    <button
                      onClick={clearFilters}
                      className="text-[#E07C2D] hover:text-[#D46B1B] text-sm font-semibold"
                    >
                      Clear All
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* View Toggle Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-[#E07C2D] text-white"
                    : "bg-[#F5F5F5] text-[#583939] hover:bg-[#FFF0E6]"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-[#E07C2D] text-white"
                    : "bg-[#F5F5F5] text-[#583939] hover:bg-[#FFF0E6]"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Artists Grid */}
          <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"} gap-6`}>
            {paginatedArtists.map((artist) => (
              <div key={artist.id} className="bg-[#FBF6F1] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category Tag */}
                  <div className="inline-block bg-orange-50 text-[#E07C2D] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {artist.category}
                  </div>

                  {/* Name */}
                  <h3 className="font-serif text-xl font-bold text-[#583939] mb-2">
                    {artist.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-[#666] mb-3">
                    <MapPin className="w-4 h-4 text-[#E07C2D]" />
                    {artist.location}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#666] mb-4 line-clamp-2">
                    {artist.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(artist.rating) ? "fill-[#E07C2D] text-[#E07C2D]" : "text-[#DDD]"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-[#E07C2D]">{artist.rating}</span>
                  </div>

                  {/* View Profile Link */}
                  <button className="flex items-center gap-2 text-[#E07C2D] hover:text-[#D46B1B] font-semibold text-sm">
                    View Profile
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border-2 border-[#E0E0E0] hover:border-[#E07C2D] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ArrowRight className="w-5 h-5 text-[#583939] rotate-180" />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {generatePageNumbers().map((page, idx) => (
                <div key={idx}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-[#999]">...</span>
                  ) : (
                    <button
                      onClick={() => setCurrentPage(page as number)}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                        currentPage === page
                          ? "bg-[#E07C2D] text-white"
                          : "bg-white border-2 border-[#E0E0E0] text-[#583939] hover:border-[#E07C2D]"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border-2 border-[#E0E0E0] hover:border-[#E07C2D] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ArrowRight className="w-5 h-5 text-[#583939]" />
            </button>
          </div>
        </div>
      </section>

      {/* Join Our Spiritual Ecosystem CTA Section */}
      <section className="bg-[#FBF6F1] py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          {/* Label */}
          <p className="text-sm font-bold text-[#E07C2D] mb-4 tracking-wide">
            JOIN OUR SPIRITUAL ECOSYSTEM
          </p>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#583939] mb-6">
            Are You an Artist?
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#666] max-w-2xl mx-auto leading-relaxed mb-8">
            Join our growing community of devotional artists. Register today and showcase your talent at spiritual events, kirtans, and yatras across India.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/artist-registration"
              className="bg-[#E07C2D] hover:bg-[#D46B1B] text-white px-8 py-3 rounded-lg font-semibold transition-all inline-block"
            >
              Register as Artist
            </Link>
            <button className="bg-white hover:bg-[#FFF0E6] text-[#583939] px-8 py-3 rounded-lg font-semibold border-2 border-[#583939] transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
