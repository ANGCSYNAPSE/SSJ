"use client";

import { useEffect, useState } from "react";
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
  BookOpen,
} from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";
import { API_URL } from "@/lib/api";

type ApiBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  categoryId?: string | null;
  author: string;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
};

type ApiBlogCategory = {
  id: string;
  title: string;
  slug: string;
};

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/** The backend's /uploads endpoint returns a path relative to itself (e.g. "/uploads/x.png"), not a full URL — resolve it against the backend's own origin, not the frontend's. */
function resolveCoverImageUrl(coverImage: string): string {
  return coverImage.startsWith("http") ? coverImage : `${API_URL}${coverImage}`;
}

function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

/** First letter of the author's name — used in place of an avatar photo, since posts created via the API don't have one. */
function AuthorInitial({ name, size = 44 }: { name: string; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif font-bold text-primary"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}

/** Shown in place of a cover image for posts that don't have one yet. */
function CoverPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-cream to-[#f0e4d0] ${className ?? ""}`}>
      <BookOpen className="h-10 w-10 text-primary/40" aria-hidden />
    </div>
  );
}

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

export default function BlogPage() {
  const [search, setSearch] = useState("");
  // null = still loading; [] = loaded, nothing published yet.
  const [posts, setPosts] = useState<ApiBlogPost[] | null>(null);
  const [categoryTitleById, setCategoryTitleById] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/api/v1/blog-posts`),
          fetch(`${API_URL}/api/v1/blog-categories`),
        ]);
        const postsPayload = await postsRes.json().catch(() => null);
        const categoriesPayload = await categoriesRes.json().catch(() => null);
        if (cancelled) return;

        setPosts(postsRes.ok ? (postsPayload?.data ?? []) : []);

        const map: Record<string, string> = {};
        if (categoriesRes.ok) {
          for (const category of (categoriesPayload?.data ?? []) as ApiBlogCategory[]) {
            map[category.id] = category.title;
          }
        }
        setCategoryTitleById(map);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load blog posts", err);
          setPosts([]);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredPost = posts?.[0];
  const recentPosts = posts?.slice(1) ?? [];

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

          {posts === null ? (
            <div className="flex h-[300px] items-center justify-center rounded-[24px] border border-[rgba(212,175,55,0.25)] bg-white text-[#8c8c8c]">
              Loading stories…
            </div>
          ) : !featuredPost ? (
            <div className="flex h-[220px] flex-col items-center justify-center gap-2 rounded-[24px] border border-[rgba(212,175,55,0.25)] bg-white text-center">
              <p className="font-serif text-xl font-bold text-maroon">No stories published yet</p>
              <p className="text-sm text-[#8c8c8c]">Check back soon for the first devotional story.</p>
            </div>
          ) : (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="flex flex-col overflow-hidden rounded-[24px] border border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_16px_40px_rgba(139,0,0,0.05)] lg:flex-row"
            >
              <div className="relative h-[280px] w-full lg:h-auto lg:min-h-[450px] lg:flex-1">
                {featuredPost.coverImage ? (
                  <Image
                    src={resolveCoverImageUrl(featuredPost.coverImage)}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                ) : (
                  <CoverPlaceholder className="absolute inset-0" />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-8 lg:p-12">
                <div className="flex flex-col gap-4">
                  <span className="w-fit rounded-full bg-cream px-3 py-1.5 text-xs font-semibold uppercase text-primary">
                    {categoryTitleById[featuredPost.categoryId ?? ""] ?? "Story"}
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-[1.15] text-maroon sm:text-[32px] sm:leading-[38px]">
                    {featuredPost.title}
                  </h3>
                  <p className="text-[15px] leading-6 text-[#595656]">{featuredPost.excerpt}</p>
                </div>
                <div className="flex flex-col gap-4 border-t border-[#e5e7eb] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <AuthorInitial name={featuredPost.author} />
                    <div>
                      <p className="text-lg font-semibold text-maroon">{featuredPost.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[13px] text-[#595656]">
                    <span>{formatPostDate(featuredPost.publishedAt ?? featuredPost.createdAt)}</span>
                    <span className="size-1 rounded-full bg-[#8c8c8c]" />
                    <span>{estimateReadTime(featuredPost.content)}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
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

        {recentPosts.length > 0 && (
          <div className="grid w-full max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_12px_32px_rgba(139,0,0,0.05)]"
              >
                <div>
                  <div className="relative h-[220px] w-full">
                    {post.coverImage ? (
                      <Image
                        src={resolveCoverImageUrl(post.coverImage)}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <CoverPlaceholder className="absolute inset-0" />
                    )}
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-cream px-3 py-1.5 text-xs font-semibold uppercase text-primary">
                        {categoryTitleById[post.categoryId ?? ""] ?? "Story"}
                      </span>
                      <span className="text-xs text-[#8c8c8c]">{estimateReadTime(post.content)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="line-clamp-2 font-serif text-2xl font-bold leading-7 text-maroon">
                        {post.title}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-[22px] text-[#595656]">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-[#e5e7eb] px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <AuthorInitial name={post.author} size={32} />
                    <p className="text-sm font-semibold text-maroon">{post.author}</p>
                  </div>
                  <p className="text-xs text-[#8c8c8c]">
                    {formatPostDate(post.publishedAt ?? post.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {recentPosts.length > 0 && (
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[rgba(212,175,55,0.25)] bg-white px-9 py-3.5 text-base font-semibold text-maroon transition hover:bg-cream"
          >
            Load More Stories <ArrowDown className="h-4 w-4" />
          </button>
        )}
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
          <div className="relative h-[280px] w-full overflow-hidden rounded-[24px] shadow-[0px_16px_16px_rgba(62,24,21,0.1)] lg:h-[400px] lg:flex-1">
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
