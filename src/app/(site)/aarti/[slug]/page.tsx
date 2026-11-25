import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import DevotionHero from "@/components/darshan/DevotionHero";
import SourceNote from "@/components/ui/SourceNote";
import { DEVOTION_ITEMS, findDevotion } from "@/lib/data/devotion";

export function generateStaticParams() {
  return DEVOTION_ITEMS.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = findDevotion(params.slug);
  return item ? { title: `${item.title} - ${item.hindi}`, description: item.blurb } : {};
}

export default function DevotionPage({ params }: { params: { slug: string } }) {
  const item = findDevotion(params.slug);
  if (!item) notFound();

  const hymn = item.verses !== undefined;
  const hasText = Boolean(item.verses && item.verses.length > 0);

  return (
    <>
      <DevotionHero title={item.title} hindi={item.hindi} intro={item.blurb} crumbs={[{ href: "/aarti", label: "All Aarti" }, { label: item.title }]} />

      <section className="bg-[#fdf6ec] px-6 py-14 lg:px-[108px] lg:py-20">
        <div className="mx-auto flex max-w-[860px] flex-col gap-8">
          {item.sections.map((section) => (
            <article key={section.heading} className="rounded-2xl border border-[#d4af37]/25 bg-white p-7 shadow-[0_12px_16px_rgba(139,0,0,0.05)]">
              <h2 className="font-serif text-2xl font-bold text-[#3e1815]">{section.heading}</h2>
              <div className="mt-3 flex flex-col gap-3 text-base leading-[1.8] text-[#595656]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}

          {hymn && (
            <article className="rounded-2xl border border-[#d4af37]/25 bg-white p-7 shadow-[0_12px_16px_rgba(139,0,0,0.05)]">
              <h2 className="font-serif text-2xl font-bold text-[#3e1815]">{"The full text"}</h2>
              {hasText ? (
                <div className="mt-4 flex flex-col gap-2 text-center text-lg leading-[1.9] text-[#3e1815]">
                  {item.verses!.map((line, i) => (
                    <p key={i} className="notranslate" translate="no">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-3 rounded-lg bg-[#fdf6ec] px-4 py-3 text-base leading-relaxed text-[#6b4f4f]">
                  {"The full text will be published here soon."}
                </p>
              )}
            </article>
          )}

          {item.links && item.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {item.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#e87722] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-lg bg-[#e87722] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          )}

          <SourceNote />

          <Link href="/aarti" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#e47105] hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {"Back to All Aarti"}
          </Link>
        </div>
      </section>
    </>
  );
}
