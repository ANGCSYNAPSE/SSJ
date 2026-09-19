"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, UserPlus, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { NAV_LINKS, MORE_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** First name only — the header has room for one word. */
function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0];
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const moreRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const moreActive = MORE_LINKS.some((link) => link.href === pathname);

  // Close the "More" dropdown on outside click.
  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [moreOpen]);

  // Close the user menu on outside click.
  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!userMenuRef.current?.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [userMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-10 z-50 h-[100px] border-b border-[#d4af37]/25 bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6 xl:px-20">
        <Link href="/" className="relative block h-[100px] w-[100px] shrink-0">
          <Image
            src="/images/brand/logo.svg"
            alt={SITE.name}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </Link>

        <nav className="hidden items-center gap-8 xl:gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-sm xl:text-base font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-[#595656]",
              )}
            >
              {link.label}
            </Link>
          ))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 text-base font-medium transition-colors hover:text-primary",
                moreActive || moreOpen ? "text-primary" : "text-[#595656]",
              )}
            >
              {"More"}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  moreOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-[calc(100%+16px)] w-[280px] overflow-hidden rounded-xl border border-[#d4af37]/25 bg-white shadow-[0px_12px_28px_-8px_rgba(0,0,0,0.08)]">
                {MORE_LINKS.map((link, i) => (
                  <div key={link.href}>
                    {i > 0 && <div className="h-px w-full bg-[#d4af37]/25" />}
                    <Link
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        "flex h-11 w-full items-center px-4 text-sm transition-colors hover:bg-[#f7f1e8] hover:font-semibold hover:text-[#3e1815]",
                        pathname === link.href
                          ? "bg-[#f7f1e8] font-semibold text-[#3e1815]"
                          : "font-medium text-[#595656]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          {loading ? (
            <span className="h-[41px] w-[100px] animate-pulse rounded-md bg-maroon/10" />
          ) : user ? (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border border-transparent px-3 py-2.5 text-sm transition-colors hover:border-[#d4af37]/25 hover:bg-cream",
                  userMenuOpen && "border-[#d4af37]/25 bg-cream",
                )}
              >
                <span className="hidden text-[#595656] xl:inline">{"Jai Shri Shyam,"}</span>
                <span className="font-medium text-maroon">{firstName(user.fullName)}</span>
                <ChevronDown
                  className={cn("h-4 w-4 text-[#595656] transition-transform", userMenuOpen && "rotate-180")}
                  aria-hidden
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] w-[200px] overflow-hidden rounded-xl border border-[#d4af37]/25 bg-white shadow-[0px_12px_28px_-8px_rgba(0,0,0,0.08)]">
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="flex h-11 w-full items-center gap-2 px-4 text-sm font-medium text-maroon transition-colors hover:bg-[#f7f1e8] hover:font-semibold"
                  >
                    <LogOut className="h-4 w-4" aria-hidden />
                    {"Sign out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signup"
              className="rounded-md bg-[#e87722] px-5 py-2.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {"Sign Up"}
            </Link>
          )}
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-md bg-[#8b0000] px-5 py-2.5 text-xs xl:text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <UserPlus className="h-4 w-4" aria-hidden />
            {"REGISTRATION"}
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-maroon hover:bg-maroon/5 lg:hidden"
        >
          {open ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {open && (
        <nav className="absolute inset-x-0 top-full max-h-[calc(100vh-140px)] overflow-y-auto border-t border-[#d4af37]/25 bg-white lg:hidden">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 text-sm transition-colors hover:text-primary",
                  pathname === link.href
                    ? "font-medium text-primary"
                    : "text-[#595656]",
                )}
              >
                {link.label}
              </Link>
            ))}

            {MORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 text-sm transition-colors hover:text-primary",
                  pathname === link.href
                    ? "font-medium text-primary"
                    : "text-[#595656]",
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-3 border-t border-[#d4af37]/25 py-4">
              {!loading &&
                (user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="flex items-center justify-center gap-2 rounded-md border border-[#d4af37]/25 py-2.5 text-[15px] font-semibold text-maroon"
                  >
                    <LogOut className="h-4 w-4" aria-hidden />
                    {"Sign out"} ({firstName(user.fullName)})
                  </button>
                ) : (
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-[#e87722] py-2.5 text-center text-[15px] font-semibold text-white"
                  >
                    {"Sign Up"}
                  </Link>
                ))}
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md bg-[#8b0000] py-2.5 text-[15px] font-semibold text-white"
              >
                <UserPlus className="h-4 w-4" aria-hidden />
                {"REGISTRATION"}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
