"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import NotificationBell from "@/components/notifications/NotificationBell";
import RegistrationGate from "@/components/payments/RegistrationGate";
import { SITE } from "@/lib/constants";

/**
 * The frame around the profile page: a slim header with the logo, a way back to the website, the notification bell and sign out,
 * and nothing else. None of the website's menu is here, so the profile feels like a place of its own, as if the person has
 * stepped out of the site into their own account.
 */
export default function ProfileShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  return (
    <div className="flex min-h-screen flex-col bg-[#fffaf1]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d4af37]/30 bg-white/95 shadow-[0_6px_24px_rgba(107,31,31,0.06)] backdrop-blur">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#e47105] via-[#ffd04f] to-[#e47105]" />
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-[88px]">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${SITE.name}: back to the website`}>
            <span className="relative block h-11 w-11 shrink-0">
              <Image src="/images/brand/logo.svg" alt="" fill unoptimized className="object-contain" />
            </span>
            <span className="hidden min-w-0 leading-tight sm:block">
              <span className="block font-serif text-lg font-bold text-maroon">{SITE.name}</span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e47105]">{"My profile"}</span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-1.5 rounded-full border border-[#e0b94f] px-3 py-2 text-xs font-bold text-maroon transition-all hover:-translate-y-0.5 hover:bg-[#fff4d6] sm:px-4">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{"Back to website"}</span>
              <span className="sm:hidden">{"Back"}</span>
            </Link>
            {user && <NotificationBell />}
            {user && (
              <button type="button" onClick={() => void logout()} className="flex items-center gap-1.5 rounded-full bg-[#fff1d8] px-3 py-2 text-xs font-bold text-maroon transition-colors hover:bg-[#fde0b0] sm:px-4">
                <LogOut className="h-4 w-4 text-[#e87722]" aria-hidden />
                <span className="hidden sm:inline">{"Sign out"}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <RegistrationGate>{children}</RegistrationGate>
      </main>

      <footer className="border-t border-[#d4af37]/25 bg-white px-4 py-5 text-center text-xs text-[#8a8580]">
        &copy; {new Date().getFullYear()} {SITE.name} · {"Faith, Service, Humanity"}
      </footer>
    </div>
  );
}
