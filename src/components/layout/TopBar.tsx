"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Headphones, Instagram, Linkedin, Smartphone, Twitter } from "lucide-react";
import { LOCALES, DEFAULT_LOCALE, type LocaleCode, switchLanguage } from "@/lib/gtranslate";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "LinkedIn", icon: Linkedin },
];

/**
 * Thin utility bar above the main header: language switcher, app promo, and
 * support contact. Visible at every screen size — below `lg` the language
 * pill row collapses into a dropdown to save horizontal space.
 *
 * The app link and support number are placeholders until real values are
 * available (no app or support line is live yet).
 */
export default function TopBar() {
  // Tracks which pill is highlighted only — content translation is handled
  // entirely by GTranslate (see lib/gtranslate.ts), not by this app's own
  // locale/dictionary system, so the two never fight over the same DOM text.
  const [activeLang, setActiveLang] = useState<LocaleCode>(DEFAULT_LOCALE);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const activeOption = LOCALES.find((option) => option.code === activeLang) ?? LOCALES[0];

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [langOpen]);

  const selectLang = (code: LocaleCode) => {
    setActiveLang(code);
    switchLanguage(code);
    setLangOpen(false);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex h-10 items-center border-b border-[#d4af37]/30 bg-maroon px-4 text-xs text-white/90 sm:px-6 lg:px-20">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4">
        {/* Desktop: flat pill row */}
        <nav aria-label={"Select language"} className="notranslate hidden items-center gap-3 lg:flex">
          {LOCALES.map((option, i) => (
            <span key={option.code} className="flex items-center gap-3">
              {i > 0 && <span className="text-white/30">|</span>}
              <button
                type="button"
                onClick={() => selectLang(option.code)}
                className={cn(
                  "whitespace-nowrap transition-colors hover:text-white",
                  activeLang === option.code
                    ? "font-semibold text-primary"
                    : "text-white/80",
                )}
                aria-current={activeLang === option.code || undefined}
              >
                {option.nativeLabel}
              </button>
            </span>
          ))}
        </nav>

        {/* Mobile/tablet: dropdown */}
        <div ref={langRef} className="notranslate relative lg:hidden">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            aria-label={"Select language"}
            aria-expanded={langOpen}
            className="flex items-center gap-1.5 whitespace-nowrap font-semibold text-white"
          >
            {activeOption.nativeLabel}
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform", langOpen && "rotate-180")}
              aria-hidden
            />
          </button>

          {langOpen && (
            <div className="absolute left-0 top-[calc(100%+8px)] w-[160px] overflow-hidden rounded-lg border border-[#d4af37]/25 bg-white text-[#3e1815] shadow-[0px_12px_28px_-8px_rgba(0,0,0,0.2)]">
              {LOCALES.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => selectLang(option.code)}
                  className={cn(
                    "flex h-10 w-full items-center px-4 text-sm transition-colors hover:bg-[#f7f1e8]",
                    activeLang === option.code
                      ? "bg-[#f7f1e8] font-semibold text-primary"
                      : "font-medium",
                  )}
                  aria-current={activeLang === option.code || undefined}
                >
                  {option.nativeLabel}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="#"
            className="hidden items-center gap-2 rounded-md bg-primary px-3 py-1.5 font-semibold text-white transition-opacity hover:opacity-90 sm:flex"
          >
            <Smartphone className="h-3.5 w-3.5" aria-hidden />
            {"Get the App"}
            <span className="rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-bold">
              {"Now"}
            </span>
          </Link>

          <span className="hidden items-center gap-1.5 whitespace-nowrap xl:flex">
            <Headphones className="h-3.5 w-3.5" aria-hidden />
            {"24x7 Support"} · +91-XXXXXXXXXX
          </span>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-white/80 transition-colors hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
