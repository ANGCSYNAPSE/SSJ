"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Flower2,
  Landmark,
  HeartHandshake,
  ScrollText,
  Mic2,
  HandHelping,
  MapPin,
  XCircle,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

const categories = [
  {
    icon: Flower2,
    title: "Spiritual Journeys",
    desc: "Personal stories of transformation, inner peace, and discovery under the grace of Baba Shyam.",
  },
  {
    icon: Landmark,
    title: "Temple Events & News",
    desc: "Updates on upcoming Melas, major festivals, special Darshans, and development works.",
  },
  {
    icon: HeartHandshake,
    title: "Devotional Stories",
    desc: "Tales of pure faith, miraculous intervention, and deep devotee experiences from Khatu and beyond.",
  },
  {
    icon: ScrollText,
    title: "Cultural Heritage",
    desc: "Deep dives into Vedic traditions, sacred rituals, bhajan traditions, and regional art forms.",
  },
  {
    icon: Mic2,
    title: "Artist Spotlights",
    desc: "Interviews with renowned bhajan singers, traditional painters, and local temple artisans.",
  },
  {
    icon: HandHelping,
    title: "Community Impact",
    desc: "Highlighting our non-profit initiatives: education help, free food distribution (Annadan), and health camps.",
  },
  {
    icon: MapPin,
    title: "Sacred Places",
    desc: "Comprehensive travel guides, historical maps, and spiritual routes across Rajasthan and India.",
  },
  {
    icon: XCircle,
    title: "Meditation & Wellness",
    desc: "Daily tips on keeping your mind calm, simple meditation practices, and traditional yoga methods.",
  },
];

const featuredPost = {
  category: "Spiritual Journeys",
  title: "My Journey to Khatu Shyam: Finding Miracles in Silence",
  desc: "In the midst of life's deepest challenges, a sudden pilgrim walk to the Khatu temple transformed my heart. Read about the quiet moments before Baba Shyam that answered questions I hadn't even dared to vocalize.",
  image: "/images/blog/featured-cover.png",
  avatar: "/images/blog/avatar-aditya.png",
  author: "Aditya Singhania",
  authorMeta: "Devotee since 2012",
  date: "Oct 14, 2026",
  readTime: "6 min read",
};

const recentPosts = [
  {
    category: "Artist Spotlights",
    readTime: "5 min read",
    title: "Sustaining Faith: The Story behind Lakhbir Singh's Famous Shyam Bhajans",
    desc: "An exclusive conversation with Lakhbir Singh on the timeless melodies of devotion, exploring how raw folk tunes translate the heart of a devotee directly to Baba Shyam.",
    image: "/images/blog/post-lakhbir-cover.png",
    avatar: "/images/blog/avatar-rajesh.png",
    author: "Rajesh Vyas",
    date: "Oct 20, 2026",
  },
  {
    category: "Community Impact",
    readTime: "8 min read",
    title: "The True Spirit of Seva: Over 50,000 Served Daily in Annadan Project",
    desc: "Inside our largest food security program operating daily in rural areas. Read how simple donations are helping fight hunger while restoring social hope.",
    image: "/images/blog/post-annadan-cover.png",
    avatar: "/images/blog/avatar-meera.png",
    author: "Meera Deshmukh",
    date: "Oct 18, 2026",
  },
  {
    category: "Cultural Heritage",
    readTime: "4 min read",
    title: "Decoding the Sandhya Aarti: Rituals, Significance & Mantra Recitations",
    desc: "Explore the profound meaning behind the evening sacred fire rituals, the specific Vedic hymns used, and how to create a similar spiritual center inside your home.",
    image: "/images/blog/post-aarti-cover.png",
    avatar: "/images/blog/avatar-ram-prasad.png",
    author: "Pandit Ram Prasad",
    date: "Oct 15, 2026",
  },
  {
    category: "Sacred Places",
    readTime: "7 min read",
    title: "A Complete Pilgrim Guide to the Historic Ringas to Khatu Route",
    desc: "An exhaustive travel manual covering transportation, traditional rests, historical sights, and health guidelines for the sacred Ringas walk.",
    image: "/images/blog/post-pilgrim-cover.png",
    avatar: "/images/blog/avatar-vikas.png",
    author: "Vikas Gupta",
    date: "Oct 11, 2026",
  },
  {
    category: "Community Impact",
    readTime: "6 min read",
    title: "Shyam Shiksha: Brightening Futures of Underprivileged Children",
    desc: "Read how the collective spiritual community of Shyam Jagat is funding quality education, providing free school supplies, and giving child mentors a pathway.",
    image: "/images/blog/post-shiksha-cover.png",
    avatar: "/images/blog/avatar-sunita.png",
    author: "Sunita Devi",
    date: "Oct 08, 2026",
  },
  {
    category: "Meditation & Wellness",
    readTime: "5 min read",
    title: "Connecting to the Divine: 5 Morning Rituals for Daily Inner Peace",
    desc: "Practical, non-intrusive tips that combine ancient meditation strategies with modern fast-paced morning routines for absolute mental balance.",
    image: "/images/blog/post-meditation-cover.png",
    avatar: "/images/blog/avatar-anjali.png",
    author: "Anjali Singh",
    date: "Oct 05, 2026",
  },
];

export default function BlogPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center gap-10 bg-cream px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-base font-bold text-primary">|| जय श्री श्याम ||</p>
          <h1 className="max-w-[900px] font-serif text-4xl font-extrabold leading-tight text-maroon sm:text-5xl lg:text-[56px] lg:leading-[62px]">
            Stories, Journeys &amp; Sacred Wisdom
          </h1>
          <p className="max-w-[720px] text-base leading-7 text-[#595656] sm:text-lg">
            A space for sharing deep spiritual experiences, divine miracles of
            Baba Shyam, upcoming temple events, and rich cultural insights from
            our global community.
          </p>
        </div>

        <div className="flex w-full max-w-[600px] items-center justify-between gap-4 rounded-full border border-[rgba(212,175,55,0.25)] bg-white py-1.5 pl-6 pr-1.5 shadow-[0px_12px_12px_rgba(139,0,0,0.06)]">
          <div className="flex flex-1 items-center gap-3">
            <Search className="h-5 w-5 shrink-0 text-[#8c8c8c]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search spiritual stories, temples, festivals..."
              className="w-full bg-transparent text-[15px] text-[#3e1815] placeholder:text-[#8c8c8c] focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Search
          </button>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* Categories */}
      <section className="flex flex-col items-center gap-12 bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-maroon sm:text-4xl lg:text-[44px]">
            Explore Sacred Knowledge
          </h2>
          <div className="h-[3px] w-[100px] bg-[#e47105]" />
          <p className="max-w-[700px] text-base text-[#595656]">
            Select a category to discover tailored content written by devotees,
            priests, and social volunteers.
          </p>
        </div>

        <div className="grid w-full max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="flex flex-col gap-4 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6 shadow-[0px_8px_12px_rgba(139,0,0,0.03)]"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-cream">
                <category.icon className="h-[22px] w-[22px] text-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-bold text-maroon">
                  {category.title}
                </h3>
                <p className="text-[13px] leading-5 text-[#595656]">{category.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSlot size="rectangle" />

      {/* Featured post */}
      <section className="bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-14">
          <div className="flex flex-col gap-6 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-3xl font-bold text-maroon sm:text-4xl lg:text-[44px]">
                Featured Divine Insights
              </h2>
              <p className="text-base text-[#595656]">
                Editor&apos;s choice of must-read stories of the week
              </p>
            </div>
            <Link href="#" className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              View all featured <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Link
            href="#"
            className="flex flex-col overflow-hidden rounded-[24px] border border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_16px_40px_rgba(139,0,0,0.05)] lg:flex-row"
          >
            <div className="relative h-[280px] w-full lg:h-auto lg:min-h-[450px] lg:flex-1">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-8 lg:p-12">
              <div className="flex flex-col gap-4">
                <span className="w-fit rounded-full bg-cream px-3 py-1.5 text-xs font-semibold uppercase text-primary">
                  {featuredPost.category}
                </span>
                <h3 className="font-serif text-2xl font-bold leading-[1.15] text-maroon sm:text-[32px] sm:leading-[38px]">
                  {featuredPost.title}
                </h3>
                <p className="text-[15px] leading-6 text-[#595656]">{featuredPost.desc}</p>
              </div>
              <div className="flex flex-col gap-4 border-t border-[#e5e7eb] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
                    <Image src={featuredPost.avatar} alt={featuredPost.author} fill className="object-cover" sizes="44px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-maroon">{featuredPost.author}</p>
                    <p className="text-xs text-[#8c8c8c]">{featuredPost.authorMeta}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[13px] text-[#595656]">
                  <span>{featuredPost.date}</span>
                  <span className="size-1 rounded-full bg-[#8c8c8c]" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Recent posts */}
      <section className="flex flex-col items-center gap-12 bg-cream px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-maroon sm:text-4xl lg:text-[44px]">
            Recent Devotional Wisdom
          </h2>
          <div className="h-[3px] w-[100px] bg-[#e47105]" />
          <p className="max-w-[700px] text-base text-[#595656]">
            Fresh spiritual content updated daily by members of the Shyam family
            worldwide.
          </p>
        </div>

        <div className="grid w-full max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              key={post.title}
              href="#"
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_12px_32px_rgba(139,0,0,0.05)]"
            >
              <div>
                <div className="relative h-[220px] w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-cream px-3 py-1.5 text-xs font-semibold uppercase text-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#8c8c8c]">{post.readTime}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="line-clamp-2 font-serif text-2xl font-bold leading-7 text-maroon">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-[22px] text-[#595656]">
                      {post.desc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[#e5e7eb] px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
                    <Image src={post.avatar} alt={post.author} fill className="object-cover" sizes="32px" />
                  </div>
                  <p className="text-[13px] font-semibold text-maroon">{post.author}</p>
                </div>
                <p className="text-xs text-[#8c8c8c]">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-[rgba(212,175,55,0.25)] bg-white px-9 py-3.5 text-base font-semibold text-maroon transition hover:bg-cream"
        >
          Load More Stories <ArrowDown className="h-4 w-4" />
        </button>
      </section>

      {/* Write a Blog CTA */}
      <section className="bg-cream px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col items-start gap-6">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase text-primary">
              Share Your Light
            </span>
            <h2 className="font-serif text-3xl font-bold leading-[1.1] text-maroon sm:text-4xl lg:text-[48px] lg:leading-[54px]">
              Has Baba Shyam Blessed Your Life? Write and Share Your Devotion
            </h2>
            <p className="text-base leading-[26px] text-[#595656]">
              Shyam Jagat is a platform of, by, and for the global devotee
              family. We invite you to document your spiritual growth, submit
              local temple news, or highlight acts of compassion in your town.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="rounded-lg bg-[#e47105] px-7 py-3.5 text-base font-bold text-white shadow-[0px_8px_8px_rgba(232,119,34,0.2)] transition hover:bg-primary-dark"
              >
                Start Writing Today →
              </Link>
              <Link
                href="#"
                className="rounded-lg border border-maroon px-6 py-3.5 text-base font-semibold text-maroon transition hover:bg-maroon hover:text-white"
              >
                Submission Guidelines
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] w-full flex-1 overflow-hidden rounded-[24px] shadow-[0px_16px_16px_rgba(62,24,21,0.1)]">
            <Image
              src="/images/blog/write-blog-cta.png"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="flex flex-col items-center gap-8 border-y border-[rgba(212,175,55,0.25)] bg-white px-6 py-16 text-center lg:px-[108px]">
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-serif text-2xl font-bold text-maroon sm:text-[32px]">
            Subscribe to our Weekly Spiritual Digest
          </h2>
          <p className="max-w-[600px] text-[15px] text-[#595656]">
            Get the most read spiritual journeys, upcoming major temple
            schedules, and positive community updates delivered straight to
            your inbox.
          </p>
        </div>
        <div className="flex w-full max-w-[500px] flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 rounded-lg border border-[#e5e7eb] bg-[#faf7f2] px-5 py-3.5 text-sm text-[#3e1815] placeholder:text-[#8c8c8c] focus:outline-none"
          />
          <button
            type="button"
            className="rounded-lg bg-primary px-7 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            Subscribe
          </button>
        </div>
        <p className="text-xs text-[#8c8c8c]">
          We value your privacy. No spam. Unsubscribe at any time.
        </p>
      </section>

      <AdSlot size="banner" />
    </>
  );
}
