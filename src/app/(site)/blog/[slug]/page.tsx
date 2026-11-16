"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
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
  tags?: string[];
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

/**
 * The `content` column is plain TEXT (no rich-text/HTML validation on the
 * backend), but posts authored through the admin panel come through already
 * wrapped in block tags (e.g. "<p>...</p>"). Detect that case and render it
 * as markup; otherwise fall back to splitting plain text into paragraphs,
 * with two lightweight conventions matching the Figma article body's mix of
 * subheadings and pull-quotes:
 *   "## Heading text"  -> section heading
 *   "> Quoted text"    -> pull-quote
 */
type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "paragraph"; text: string };

const HTML_BLOCK_PATTERN = /<(p|h[1-6]|blockquote|ul|ol|img|br|div)[\s>]/i;

function isHtmlContent(content: string): boolean {
  return HTML_BLOCK_PATTERN.test(content);
}

function parseArticleBody(content: string): ArticleBlock[] {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) return { type: "heading", text: block.slice(3).trim() };
      if (block.startsWith("> ")) return { type: "quote", text: block.slice(2).trim() };
      return { type: "paragraph", text: block };
    });
}

/** Article body typography for the HTML path — mirrors the plain-text block styles below via child selectors. */
const articleHtmlClassName =
  "flex w-full max-w-[780px] flex-col gap-6 py-10 text-[16px] leading-[26px] text-[#595656] " +
  "[&_h2]:font-serif [&_h2]:text-[32px] [&_h2]:font-bold [&_h2]:leading-normal [&_h2]:text-maroon " +
  "[&_h3]:font-serif [&_h3]:text-[24px] [&_h3]:font-bold [&_h3]:leading-normal [&_h3]:text-maroon " +
  "[&_p]:text-[16px] [&_p]:leading-[26px] [&_p]:text-[#595656] " +
  "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-[#fffbf3] [&_blockquote]:py-3 [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:text-[22px] [&_blockquote]:italic [&_blockquote]:leading-[30px] [&_blockquote]:text-[#8d3135] " +
  "[&_a]:text-primary [&_a]:underline [&_strong]:font-semibold [&_em]:italic " +
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 " +
  "[&_img]:w-full [&_img]:rounded-2xl";

const shareIcons = [Facebook, Twitter, Linkedin];

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  // null = still loading; undefined = loaded, no such post; ApiBlogPost = found.
  const [post, setPost] = useState<ApiBlogPost | null | undefined>(null);
  const [relatedPosts, setRelatedPosts] = useState<ApiBlogPost[]>([]);
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

        const posts: ApiBlogPost[] = postsRes.ok ? (postsPayload?.data ?? []) : [];
        const found = posts.find((p) => p.slug === slug);
        setPost(found ?? undefined);

        if (found) {
          const others = posts.filter((p) => p.slug !== slug);
          const sameCategory = others.filter((p) => p.categoryId === found.categoryId);
          const rest = others.filter((p) => p.categoryId !== found.categoryId);
          setRelatedPosts([...sameCategory, ...rest].slice(0, 3));
        }

        const map: Record<string, string> = {};
        if (categoriesRes.ok) {
          for (const category of (categoriesPayload?.data ?? []) as ApiBlogCategory[]) {
            map[category.id] = category.title;
          }
        }
        setCategoryTitleById(map);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load blog post", err);
          setPost(undefined);
        }
      }
    }

    if (slug) load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (post === null) {
    return (
      <div className="flex h-[400px] items-center justify-center text-[#8c8c8c]">
        Loading story…
      </div>
    );
  }

  if (post === undefined) {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
        <p className="font-serif text-3xl font-bold text-maroon">Story not found</p>
        <p className="text-base text-[#595656]">
          This devotional story may have been moved or unpublished.
        </p>
        <Link
          href="/blog"
          className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all stories
        </Link>
      </div>
    );
  }

  const articleBlocks = parseArticleBody(post.content);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[520px] flex-col items-center justify-end overflow-hidden px-6 py-16 lg:px-[108px]">
        <div aria-hidden className="absolute inset-0">
          {post.coverImage ? (
            <Image
              src={resolveCoverImageUrl(post.coverImage)}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-maroon" />
          )}
          <div className="absolute inset-0 bg-[rgba(62,24,21,0.65)]" />
        </div>

        <div className="relative flex w-full max-w-[960px] flex-col items-center gap-6">
          <span className="rounded-[20px] bg-[#e47105] px-4 py-1.5 text-sm font-semibold text-white">
            || जय श्री श्याम ||
          </span>
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold uppercase text-[#d4af37]">
              {categoryTitleById[post.categoryId ?? ""] ?? "Story"}
            </p>
            <span className="size-1 rounded-full bg-[#d4af37]" />
            <p className="text-sm text-white/90">{estimateReadTime(post.content)}</p>
          </div>
          <h1 className="max-w-[960px] text-center font-serif text-4xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-[52px] lg:leading-[60px]">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <AuthorInitial name={post.author} size={48} />
            <div className="flex flex-col gap-0.5 text-left">
              <p className="text-[15px] font-semibold text-white">{post.author}</p>
              <p className="text-[13px] text-white/80">
                Published on {formatPostDate(post.publishedAt ?? post.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="flex flex-col items-center px-6 pb-20 pt-14 lg:px-[108px]">
        <div className="flex w-full max-w-[1224px] items-start justify-center">
          <div className="relative flex w-full max-w-[1000px] flex-col items-center">
            {/* Social share */}
            <div className="absolute left-0 top-2 hidden w-[120px] flex-col items-start gap-3 lg:flex">
              <p className="text-[11px] font-semibold uppercase text-[#595656]">Share</p>
              {shareIcons.map((Icon, i) => (
                <a
                  key={i}
                  href={
                    Icon === Facebook
                      ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
                      : Icon === Twitter
                        ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`
                        : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-[rgba(212,175,55,0.25)] bg-white transition hover:bg-cream"
                >
                  <Icon className="h-[18px] w-[18px] text-maroon" aria-hidden />
                </a>
              ))}
            </div>

            <div className="flex w-full flex-col items-center gap-10">
              {/* Article body */}
              {isHtmlContent(post.content) ? (
                <div className={articleHtmlClassName} dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <article className="flex w-full max-w-[780px] flex-col gap-8 py-10">
                  {articleBlocks.map((block, i) =>
                    block.type === "heading" ? (
                      <h2 key={i} className="font-serif text-[32px] font-bold text-maroon">
                        {block.text}
                      </h2>
                    ) : block.type === "quote" ? (
                      <blockquote
                        key={i}
                        className="border-l-4 border-primary bg-[#fffbf3] py-3 pl-6 font-serif text-[22px] italic leading-[30px] text-[#8d3135]"
                      >
                        {block.text}
                      </blockquote>
                    ) : (
                      <p key={i} className="text-[16px] leading-[26px] text-[#595656]">
                        {block.text}
                      </p>
                    ),
                  )}
                </article>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex w-full max-w-[780px] flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[rgba(212,175,55,0.25)] bg-[#fdf6ec] px-3.5 py-1.5 text-[13px] font-medium text-[#8d3135]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author bio */}
              <div className="flex w-full max-w-[780px] items-center gap-6 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#fffbf3] p-8">
                <AuthorInitial name={post.author} size={96} />
                <div className="flex flex-1 flex-col gap-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-serif text-[22px] font-bold text-maroon">
                      Written by {post.author}
                    </p>
                    <span className="rounded bg-primary px-3 py-1 text-xs font-semibold text-white">
                      Contributor
                    </span>
                  </div>
                  <p className="text-sm leading-[22px] text-[#595656]">{post.excerpt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdSlot size="rectangle" />

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="flex flex-col items-center gap-10 bg-cream px-6 py-20 lg:px-[108px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-serif text-4xl font-bold text-maroon">Related Divine Wisdom</h2>
            <div className="h-[3px] w-[100px] bg-[#e47105]" />
            <p className="max-w-[600px] text-base text-[#595656]">
              Continue your spiritual journey with these curated recommendations
            </p>
          </div>

          <div className="grid w-full max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white shadow-[0px_12px_32px_rgba(139,0,0,0.05)]"
              >
                <div>
                  <div className="relative h-[220px] w-full">
                    {rel.coverImage ? (
                      <Image
                        src={resolveCoverImageUrl(rel.coverImage)}
                        alt={rel.title}
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
                        {categoryTitleById[rel.categoryId ?? ""] ?? "Story"}
                      </span>
                      <span className="text-xs text-[#595656]">{estimateReadTime(rel.content)}</span>
                    </div>
                    <h3 className="line-clamp-2 font-serif text-[22px] font-bold leading-[26px] text-maroon">
                      {rel.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-[#e5e7eb] px-6 py-4">
                  <p className="text-[13px] text-[#595656]">
                    {formatPostDate(rel.publishedAt ?? rel.createdAt)}
                  </p>
                  <span className="flex items-center gap-1 text-[13px] font-semibold text-[#e47105]">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="flex flex-col items-center gap-8 border-y border-[rgba(212,175,55,0.25)] bg-white px-6 py-16 text-center lg:px-[108px]">
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-serif text-2xl font-bold text-maroon sm:text-[32px]">
            Subscribe to our Weekly Spiritual Digest
          </h2>
          <p className="max-w-[600px] text-[15px] text-[#595656]">
            Get the most read spiritual journeys, upcoming major temple schedules, and
            positive community updates delivered straight to your inbox.
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
        <p className="text-xs text-[#8c8c8c]">We value your privacy. No spam. Unsubscribe at any time.</p>
      </section>
    </>
  );
}
