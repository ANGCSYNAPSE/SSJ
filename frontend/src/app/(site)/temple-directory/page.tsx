"use client";

import { useState, useRef, useEffect, type ComponentType } from "react";
import { ChevronDown, Search, MapPin, Zap, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

// Hide scrollbar CSS
const scrollbarHideCss = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

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

const cities = ["Select City", "Khatu", "Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Pushkar", "Mathura", "Vrindavan"];
const templeTypes = ["All Types", "Ancient Temple", "Modern Temple", "Pilgrimage Site", "Monastery", "Shrine"];
const pujaTypes = ["Puja, Darshan, Seva", "Puja Only", "Darshan Only", "Seva Only", "All Services"];
const ratings = ["Any Rating", "4.8+ Stars", "4.5+ Stars", "4.0+ Stars", "3.0+ Stars"];

const regions = ["All", "Rajasthan", "Delhi", "Gujarat", "Maharashtra", "UP"];

const temples = [
  {
    id: 1,
    name: "Khatu Shyam Temple",
    location: "Khatu, Rajasthan",
    region: "Rajasthan",
    rating: 4.8,
    image: "/images/temple/khatu-shyam.png",
    description: "The sacred abode of Radha Shyam — India's most revered pilgrimage.",
    services: ["Darshan", "Puja", "Live Aarti"],
  },
  {
    id: 2,
    name: "Salasar Balaji Temple",
    location: "Churu, Rajasthan",
    region: "Rajasthan",
    rating: 4.8,
    image: "/images/temple/salasar-balaji.png",
    description: "Ancient Hanuman temple known for miraculous blessings and devotion.",
    services: ["Darshan", "Seva"],
  },
  {
    id: 3,
    name: "Mehandipur Balaji",
    location: "Dausa, Rajasthan",
    region: "Rajasthan",
    rating: 4.7,
    image: "/images/temple/mehandipur.png",
    description: "A powerful spiritual destination for healing and divine intervention.",
    services: ["Puja", "Healing"],
  },
  {
    id: 4,
    name: "ISKCON Temple",
    location: "Delhi",
    region: "Delhi",
    rating: 4.8,
    image: "/images/temple/iskcon.png",
    description: "A grand Krishna temple promoting devotion, education, and community.",
    services: ["Darshan", "Bhajan", "Food"],
  },
  {
    id: 5,
    name: "Akshardham Temple",
    location: "Delhi",
    region: "Delhi",
    rating: 4.9,
    image: "/images/temple/akshardam.png",
    description: "Magnificent temple showcasing Indian culture, spirituality, and architecture.",
    services: ["Darshan", "Exhibition"],
  },
  {
    id: 6,
    name: "Somnath Temple",
    location: "Veraval, Gujarat",
    region: "Gujarat",
    rating: 4.9,
    image: "/images/temple/somnath.png",
    description: "One of the 12 Jyotirlingas — a timeless symbol of faith and resilience.",
    services: ["Darshan", "Puja", "Aarti"],
  },
];

const faqs = [
  {
    id: 1,
    question: "How do I register my temple?",
    answer: "Our platform allows full management of temple assets, schedules, darshan timings, online puja bookings, and direct communication channels with thousands of active devotees.",
  },
  {
    id: 2,
    question: "Is temple registration free?",
    answer: "Yes, temple registration is completely free. There are no hidden charges or subscription fees to get started.",
  },
  {
    id: 3,
    question: "How long does approval take?",
    answer: "Most temple registrations are approved within 24-48 hours. Our team reviews each submission to ensure quality and authenticity.",
  },
  {
    id: 4,
    question: "Can I manage multiple temples?",
    answer: "Yes, you can register and manage multiple temples through a single account. Each temple will have its own profile and dashboard.",
  },
  {
    id: 5,
    question: "How do devotees find my temple?",
    answer: "Devotees can discover your temple through our search and filter system, region-based browsing, and personalized recommendations based on their preferences.",
  },
  {
    id: 6,
    question: "Can I offer live darshan?",
    answer: "Yes, registered temples can stream live aarti and darshan to devotees worldwide. Our platform provides easy streaming integration.",
  },
  {
    id: 7,
    question: "What payment methods are supported?",
    answer: "We support all major payment methods including credit/debit cards, UPI, net banking, and digital wallets for seamless transactions.",
  },
  {
    id: 8,
    question: "How do I update temple timings?",
    answer: "You can update your temple timings anytime through your dashboard. Changes are reflected immediately and devotees will see the updated schedule.",
  },
];

export default function TempleDirectoryPage() {
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedPuja, setSelectedPuja] = useState("Puja, Darshan, Seva");
  const [selectedRating, setSelectedRating] = useState("Any Rating");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(1);

  const handleSearch = () => {
    console.log("Search clicked with:", { selectedCity, selectedType, selectedPuja, selectedRating });
  };

  const filteredTemples = selectedRegion === "All" ? temples : temples.filter(t => t.region === selectedRegion);

  return (
    <>
      <style>{scrollbarHideCss}</style>
      <section className="relative min-h-[650px] w-full overflow-hidden bg-gradient-to-br from-[#FBF6F1] to-[#F5EDDE]">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E07C2D]">TEMPLE DIRECTORY</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-[#583939] sm:text-5xl">
            Find & Register a <span className="block text-[#E07C2D]">Temple</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[#666]">
            Discover the perfect temple for darshan, book pujas, or register your temple on our growing spiritual platform.
          </p>
        </div>

        {/* Filters Section */}
        <div className="rounded-2xl bg-white p-6 shadow-md lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <CustomSelect icon={MapPin} options={cities} value={selectedCity} onChange={setSelectedCity} placeholder="Select City" />
            <CustomSelect icon={Zap} options={templeTypes} value={selectedType} onChange={setSelectedType} placeholder="All Types" />
            <CustomSelect icon={MapPin} options={pujaTypes} value={selectedPuja} onChange={setSelectedPuja} placeholder="Puja, Darshan, Seva" />
            <CustomSelect icon={Star} options={ratings} value={selectedRating} onChange={setSelectedRating} placeholder="Any Rating" />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#E07C2D] px-6 py-2.5 font-semibold text-white transition-all hover:bg-[#D46B1B] active:scale-95 sm:col-span-2 lg:col-span-1"
            >
              <Search className="h-4 w-4" aria-hidden />
              <span>Search Temples</span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-4 border-t border-[#E0E0E0] pt-6 text-sm text-[#666] lg:gap-8">
            <div>
              <span className="font-semibold text-[#583939]">500+</span> Temples Listed
            </div>
            <div>
              <span className="font-semibold text-[#583939]">50+</span> Cities
            </div>
            <div>
              <span className="font-semibold text-[#583939]">10,000+</span> Bookings
            </div>
            <div>
              <span className="font-semibold text-[#583939]">4.8</span> ⭐ Avg rating
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold text-[#583939] sm:text-4xl">Featured Temples</h2>
          <a href="#" className="text-sm font-semibold text-[#E07C2D] hover:opacity-80 flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Region Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedRegion === region ? "bg-[#E07C2D] text-white" : "bg-[#F5F5F5] text-[#666] hover:bg-[#E0E0E0]"
              }`}
            >
              {region === "All" && <span>🏛️</span>}
              {region}
            </button>
          ))}
        </div>

        {/* Temple Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemples.map((temple) => (
            <div key={temple.id} className="overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <Image
                  src={temple.image}
                  alt={temple.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-sm font-semibold text-[#583939]">
                  <Star className="h-4 w-4 fill-[#E07C2D] text-[#E07C2D]" />
                  {temple.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Temple Name */}
                <h3 className="font-serif text-lg font-bold text-[#583939]">{temple.name}</h3>

                {/* Location */}
                <div className="mt-2 flex items-center gap-2 text-sm text-[#E07C2D] font-medium">
                  <MapPin className="h-4 w-4" />
                  {temple.location}
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-[#666] line-clamp-2">{temple.description}</p>

                {/* Services */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {temple.services.map((service) => (
                    <span
                      key={service}
                      className="inline-block rounded-full bg-[#FFF0E6] px-3 py-1 text-xs font-medium text-[#E07C2D]"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* View Details Link */}
                <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E07C2D] hover:opacity-80">
                  View Details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#FBF6F1] py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E07C2D] mb-4">SUPPORTING DEVOTION</p>
          <h2 className="font-serif text-3xl font-bold text-[#583939] sm:text-4xl mb-6">Temple Services</h2>
          <p className="text-base text-[#666] max-w-2xl mx-auto">
            Everything you need to manage, discover, and connect with temples.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Register Temple */}
          <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="text-5xl">🏛️</div>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#583939] mb-4">Register Your Temple</h3>
            <p className="text-sm text-[#666] mb-6">
              List your temple on our platform — manage profiles, schedules, offerings, and connect with thousands of devotees online.
            </p>
            <a href="#" className="text-[#E07C2D] font-semibold text-sm hover:opacity-80 flex items-center justify-center gap-1">
              Learn More <span>→</span>
            </a>
          </div>

          {/* Book Puja */}
          <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="text-5xl">📅</div>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#583939] mb-4">Book Puja & Seva</h3>
            <p className="text-sm text-[#666] mb-6">
              Browse available pujas, sevass, and special rituals at registered temples. Book puja with instant confirmation.
            </p>
            <a href="#" className="text-[#E07C2D] font-semibold text-sm hover:opacity-80 flex items-center justify-center gap-1">
              Learn More <span>→</span>
            </a>
          </div>

          {/* Live Darshan */}
          <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="text-5xl">📺</div>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#583939] mb-4">Live Darshan</h3>
            <p className="text-sm text-[#666] mb-6">
              Watch live aarti and darshan streams from temples across India. Stay connected to your faith from anywhere.
            </p>
            <a href="#" className="text-[#E07C2D] font-semibold text-sm hover:opacity-80 flex items-center justify-center gap-1">
              Learn More <span>→</span>
            </a>
          </div>

          {/* Book Artists */}
          <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="text-5xl">🎨</div>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#583939] mb-4">Book Artists</h3>
            <p className="text-sm text-[#666] mb-6">
              Find and book bhajan singers, katha speakers, and performers for temple events and collaborations.
            </p>
            <a href="#" className="text-[#E07C2D] font-semibold text-sm hover:opacity-80 flex items-center justify-center gap-1">
              Learn More <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E07C2D] mb-4">SIMPLE PROCESS</p>
          <h2 className="font-serif text-3xl font-bold text-[#583939] sm:text-4xl mb-6">Register Your Temple in 3 Steps</h2>
          <p className="text-base text-[#666]">Simple, free, and takes less than 5 minutes.</p>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 mb-12">
          {/* Step 1 */}
          <div className="flex-1 bg-[#FBF6F1] rounded-xl p-8 text-center">
            <div className="w-14 h-14 bg-[#583939] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
              01
            </div>
            <h3 className="font-serif text-xl font-bold text-[#583939] mb-4">Create Profile</h3>
            <p className="text-sm text-[#666]">
              Fill in your temples name, location, history, timings and upload photos to create a stunning temple profile.
            </p>
          </div>

          {/* Arrow 1 */}
          <div className="hidden lg:flex text-3xl text-[#E07C2D]">→</div>
          <div className="lg:hidden text-3xl text-[#E07C2D]">↓</div>

          {/* Step 2 */}
          <div className="flex-1 bg-[#FBF6F1] rounded-xl p-8 text-center">
            <div className="w-14 h-14 bg-[#583939] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
              02
            </div>
            <h3 className="font-serif text-xl font-bold text-[#583939] mb-4">Add Services</h3>
            <p className="text-sm text-[#666]">
              List the pujas, sevas, darshan slots, and events your temple offers. Set availability and pricing.
            </p>
          </div>

          {/* Arrow 2 */}
          <div className="hidden lg:flex text-3xl text-[#E07C2D]">→</div>
          <div className="lg:hidden text-3xl text-[#E07C2D]">↓</div>

          {/* Step 3 */}
          <div className="flex-1 bg-[#FBF6F1] rounded-xl p-8 text-center">
            <div className="w-14 h-14 bg-[#583939] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
              03
            </div>
            <h3 className="font-serif text-xl font-bold text-[#583939] mb-4">Go Live</h3>
            <p className="text-sm text-[#666]">
              Once approved, your temple is live on the platform — start receiving bookings and connecting with devotees.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="/temple-registration"
            className="inline-flex items-center gap-2 rounded-full bg-[#E07C2D] px-8 py-3 font-semibold text-white transition-all hover:bg-[#D46B1B]"
          >
            Register Your Temple Now <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>

    <section className="bg-[#FBF6F1] py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E07C2D] mb-4">UPDATES & BLOG</p>
            <h2 className="font-serif text-3xl font-bold text-[#583939] sm:text-4xl">Latest from the Community</h2>
          </div>
          <a href="#" className="text-sm font-semibold text-[#E07C2D] hover:opacity-80">
            View All →
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="overflow-hidden rounded-lg bg-white hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <Image
                src="/images/temple/khatu-shyam.png"
                alt="Khatu Shyam Temple Renovations"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4 bg-[#E07C2D] text-white px-3 py-1 rounded-full text-xs font-semibold">
                TEMPLE NEWS
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-3">
                Khatu Shyam Temple Renovations Complete — New Darshan Hall Opens
              </h3>
              <p className="text-sm text-[#666] mb-4">
                The newly renovated darshan hall welcomes devotees with improved facilities, and an interactive museum experience.
              </p>
              <a href="#" className="text-[#E07C2D] font-semibold text-sm hover:opacity-80 flex items-center gap-1">
                Read More →
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden rounded-lg bg-white hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <Image
                src="/images/temple/mehandipur.png"
                alt="Shyam Jagat Seva Updates"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4 bg-[#E07C2D] text-white px-3 py-1 rounded-full text-xs font-semibold">
                SEVA UPDATES
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-3">
                How Shyam Jagat Served 50,000 Meals in Falguna Mela 2024
              </h3>
              <p className="text-sm text-[#666] mb-4">
                A record-breaking devotion seva during this years Falguna Mela, serving thousands of weary pilgrims.
              </p>
              <a href="#" className="text-[#E07C2D] font-semibold text-sm hover:opacity-80 flex items-center gap-1">
                Read More →
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="overflow-hidden rounded-lg bg-white hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <Image
                src="/images/temple/salasar-balaji.png"
                alt="Spiritual Guidance"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4 bg-[#E07C2D] text-white px-3 py-1 rounded-full text-xs font-semibold">
                SPIRITUAL GUIDANCE
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-3">
                5 Practices for Deepening Your Daily Devotion to Radha Shyam
              </h3>
              <p className="text-sm text-[#666] mb-4">
                Simple yet powerful ways to strengthen your spiritual connection and bring peace to your home.
              </p>
              <a href="#" className="text-[#E07C2D] font-semibold text-sm hover:opacity-80 flex items-center gap-1">
                Read More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E07C2D] mb-4">REVIEWS</p>
          <h2 className="font-serif text-3xl font-bold text-[#583939] sm:text-4xl mb-4">What Temple Administrators Say</h2>
          <div className="h-1 w-16 bg-[#E07C2D] mx-auto"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Review 1 */}
          <div className="bg-[#FBF6F1] rounded-lg p-8">
            <div className="text-4xl text-[#E07C2D] mb-4">&quot;</div>
            <p className="text-sm text-[#666] mb-6">
              Registering on Shyam Jagat brought our temple online. We now receive 3x more bookings and connect with devotees we never could before.
            </p>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#E07C2D]">★</span>
              ))}
            </div>
            <div>
              <p className="font-semibold text-[#583939]">Pundit Ramesh Ji</p>
              <p className="text-xs text-[#666]">Khatu Shyam Temple, Sikar</p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-[#FBF6F1] rounded-lg p-8">
            <div className="text-4xl text-[#E07C2D] mb-4">&#34;</div>
            <p className="text-sm text-[#666] mb-6">
              The booking system is smooth and the support team is always helpful. Our temple visibility has increased tremendously.
            </p>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#E07C2D]">★</span>
              ))}
            </div>
            <div>
              <p className="font-semibold text-[#583939]">Mahant Suresh Das</p>
              <p className="text-xs text-[#666]">Salasar Balaji Temple, Churu</p>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-[#FBF6F1] rounded-lg p-8">
            <div className="text-4xl text-[#E07C2D] mb-4">&quot;</div>
            <p className="text-sm text-[#666] mb-6">
              The live darshan feature has been a blessing for elderly devotees who can not travel. Technology serving devotion beautifully.
            </p>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#E07C2D]">★</span>
              ))}
            </div>
            <div>
              <p className="font-semibold text-[#583939]">Acharya Vinod Ji</p>
              <p className="text-xs text-[#666]">ISKCON, Delhi</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#FBF6F1] py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E07C2D] mb-4">HAVE QUESTIONS?</p>
          <h2 className="font-serif text-3xl font-bold text-[#583939] sm:text-4xl mb-2">Frequently Asked Questions</h2>
          <div className="h-1 w-16 bg-[#E07C2D] mx-auto"></div>
        </div>

        {/* FAQ Grid */}
        <div className="grid gap-6 sm:grid-cols-2 mb-16">
          {/* Left Column */}
          <div className="space-y-6">
            {faqs.slice(0, 4).map((faq) => (
              <button
                key={faq.id}
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full text-left bg-white rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#583939]">{faq.question}</h3>
                  <span className="text-[#E07C2D] text-xl font-bold">{expandedFAQ === faq.id ? "−" : "+"}</span>
                </div>
                {expandedFAQ === faq.id && (
                  <p className="mt-3 text-sm text-[#666]">{faq.answer}</p>
                )}
              </button>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {faqs.slice(4).map((faq) => (
              <button
                key={faq.id}
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full text-left bg-white rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#583939]">{faq.question}</h3>
                  <span className="text-[#E07C2D] text-xl font-bold">{expandedFAQ === faq.id ? "−" : "+"}</span>
                </div>
                {expandedFAQ === faq.id && (
                  <p className="mt-3 text-sm text-[#666]">{faq.answer}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className=" rounded-xl p-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#583939] sm:text-4xl mb-4">
            Ready to Bring Your Temple Online?
          </h2>
          <p className="text-base text-[#666] mb-8 max-w-2xl mx-auto">
            Join 500+ temples already connecting with millions of devotees through Shyam Jagat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="/temple-registration"
              className="bg-[#E07C2D] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#D46B1B] transition-colors"
            >
              Register Your Temple
            </a>
            <a
              href="#"
              className="border-2 border-[#583939] text-[#583939] px-8 py-3 rounded-lg font-semibold hover:bg-[#583939] hover:text-white transition-colors"
            >
              Contact Our Team
            </a>
          </div>
          <p className="text-xs text-[#666]">
            Questions? Call +91 12345 67890 • temples@shyamjagat.org
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
