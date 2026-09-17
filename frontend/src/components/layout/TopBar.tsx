"use client";

import { useState } from "react";
import Link from "next/link";
import { Headphones, Instagram, Linkedin, Smartphone, Twitter } from "lucide-react";
import { LOCALES, DEFAULT_LOCALE, type LocaleCode, switchLanguage } from "@/lib/gtranslate";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "LinkedIn", icon: Linkedin },
];

/**
 * Thin utility bar above the main header: language switcher, app promo, and
 * support contact. Hidden below `lg` — mobile users get the same language
 * switcher inside the header's mobile menu instead, so nothing is lost.
 *
 * The app link and support number are placeholders until real values are
 * available (no app or support line is live yet).
 */
export default function TopBar() {
  // Tracks which pill is highlighted only — content translation is handled
  // entirely by GTranslate (see lib/gtranslate.ts), not by this app's own
  // locale/dictionary system, so the two never fight over the same DOM text.
  const [activeLang, setActiveLang] = useState<LocaleCode>(DEFAULT_LOCALE);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] hidden h-10 items-center border-b border-[#d4af37]/30 bg-maroon px-6 text-xs text-white/90 lg:flex lg:px-20">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6">
        <nav aria-label={"Select language"} className="notranslate flex items-center gap-3">
          {LOCALES.map((option, i) => (
            <span key={option.code} className="flex items-center gap-3">
              {i > 0 && <span className="text-white/30">|</span>}
              <button
                type="button"
                onClick={() => {
                  setActiveLang(option.code);
                  switchLanguage(option.code);
                }}
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

        <div className="flex items-center gap-5">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 font-semibold text-white transition-opacity hover:opacity-90"
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
