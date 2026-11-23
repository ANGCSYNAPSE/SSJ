import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** The maroon title band at the top of the All Aarti pages. */
export default function DevotionHero({
  title,
  hindi,
  intro,
  crumbs = [],
}: {
  title: string;
  hindi?: string;
  intro?: string;
  crumbs?: { href?: string; label: string }[];
}) {
  return (
    <section className="bg-maroon px-6 py-14 text-white lg:px-[108px] lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/75">
          <Link href="/" className="hover:text-white">
            {"Home"}
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" aria-hidden />
              {c.href ? (
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="mt-6 flex items-center gap-3">
          <span className="h-px w-6 bg-[#d4af37]" />
          <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">{"Shri Shyam Mandir, Khatushyamji"}</p>
          <span className="h-px w-6 bg-[#d4af37]" />
        </div>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] lg:text-[52px]">{title}</h1>
        {hindi && (
          <p className="notranslate hindi-sub mt-2 text-xl text-[#ffd04f]" translate="no">
            {hindi}
          </p>
        )}
        {intro && <p className="mt-5 max-w-[680px] text-base leading-relaxed text-white/85 lg:text-lg">{intro}</p>}
      </div>
    </section>
  );
}
