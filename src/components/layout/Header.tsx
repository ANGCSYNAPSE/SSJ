"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, UserPlus, CircleUserRound, ChevronDown, LogOut, UserRound, Pointer } from "lucide-react";
import { useAuth, WELCOME_KEY } from "@/components/auth/AuthProvider";
import { NAV_LINKS, MORE_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { categoryByKey } from "@/components/auth/signup/categories";
import type { UserProfileSummary } from "@/lib/api";

/** First name only — the header has room for one word. */
/** "primarySpecialty" -> "Primary specialty", for a detail the form has no label for. */
const humanize = (key: string) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim();

/** What is still blank in the user's registrations: a total, and the detail names per category. */
function pendingDetails(profiles: UserProfileSummary[] | undefined, fee?: "paid" | "partial" | "pending") {
  const groups = (profiles ?? [])
    .filter((p) => p.missing && p.missing.length > 0)
    .map((p) => {
      const category = categoryByKey(p.category);
      const labels = new Map(
        (category?.steps ?? []).flatMap((step) => step.fields).map((field) => [field.key, field.label.replace(" (Optional)", "")]),
      );
      return {
        label: category?.label ?? humanize(p.category),
        items: (p.missing ?? []).map((key) => labels.get(key) ?? humanize(key)),
      };
    });
  if (fee === "pending" || fee === "partial") {
    groups.unshift({
      label: "Registration fee",
      items: [fee === "partial" ? "Balance of the fee is due" : "Payment pending (₹501 minimum)"],
    });
  }
  return { total: groups.reduce((sum, g) => sum + g.items.length, 0), groups };
}

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
  const pending = pendingDetails(user?.profiles, user?.registrationFee);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Right after signing in: the account menu opens by itself for 4 seconds, with a pointing hint.
  const [welcome, setWelcome] = useState(false);
  const welcomeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    let flagged = false;
    try {
      flagged = window.sessionStorage.getItem(WELCOME_KEY) === "1";
      if (flagged) window.sessionStorage.removeItem(WELCOME_KEY);
    } catch {
      /* storage blocked: no hint */
    }
    if (!flagged) return;
    setWelcome(true);
    setUserMenuOpen(true);
    // Never cleared by an effect cleanup: React development mode runs every effect, cleans it up and runs it
    // again, and by the second run the flag is already used up. The callback only sets state, so it is safe
    // even if the header has gone away by then.
    if (welcomeTimer.current) clearTimeout(welcomeTimer.current);
    welcomeTimer.current = setTimeout(() => {
      setWelcome(false);
      setUserMenuOpen(false);
    }, 4000);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // On a mouse, the account menu opens by itself when the pointer is over the name and
  // stays for a moment after it leaves (so it can be reached). Taps still toggle it.
  const openUserMenuOnHover = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setUserMenuOpen(true);
  };
  const closeUserMenuSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setUserMenuOpen(false), 180);
  };

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
    <header className="fixed inset-x-0 top-10 z-50 h-[72px] border-b border-[#d4af37]/25 bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6 xl:px-20">
        <Link href="/" className="relative block h-[72px] w-[72px] shrink-0">
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
            <div
              ref={userMenuRef}
              className="relative"
              onMouseEnter={openUserMenuOnHover}
              onMouseLeave={closeUserMenuSoon}
            >
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-lg border border-[#d4af37]/30 bg-[#fff8ec] px-3 py-2 text-sm transition-all duration-200 hover:border-[#e87722]/50 hover:bg-[#fde9c8] hover:shadow-sm",
                  userMenuOpen && "border-[#e87722]/50 bg-[#fde9c8]",
                )}
              >
                <span className="hidden text-[#595656] xl:inline">{"Jai Shri Shyam,"}</span>
                <span className="font-medium text-maroon">{firstName(user.fullName)}</span>
                {pending.total > 0 && (
                  <span
                    aria-label={`${pending.total} profile details left`}
                    className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-red-500"
                  />
                )}
                <ChevronDown
                  className={cn("h-4 w-4 text-[#595656] transition-transform", userMenuOpen && "rotate-180")}
                  aria-hidden
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] w-[220px] rounded-xl border border-[#d4af37]/30 bg-white p-1.5 shadow-[0px_16px_32px_-8px_rgba(0,0,0,0.18)]">
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="group/item relative flex h-11 w-full items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-maroon transition-colors hover:bg-[#fde9c8] hover:font-semibold"
                  >
                    <UserRound className="h-4 w-4 text-[#e87722]" aria-hidden />
                    {"View profile"}
                    {pending.total > 0 && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
                        {pending.total}
                      </span>
                    )}
                    {welcome && (
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute right-full top-1/2 z-10 mr-3 flex -translate-y-1/2 animate-bounce items-center gap-1.5 whitespace-nowrap rounded-md bg-[#2563eb] px-2 py-1 text-[11px] font-semibold text-white shadow-xl"
                      >
                        <Pointer className="h-3.5 w-3.5" aria-hidden />
                        {"Open profile"}
                        <span className="absolute left-full top-1/2 -ml-1 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-[#2563eb]" />
                      </span>
                    )}
                    {pending.total > 0 ? (
                      <span
                        role="tooltip"
                        className={cn(
                          "pointer-events-none absolute right-full top-1/2 mr-3 hidden w-[170px] -translate-y-1/2 rounded-lg bg-red-600 px-3 py-2 text-left text-xs text-white shadow-lg",
                          !welcome && "group-hover/item:block",
                        )}
                      >
                        <span className="block font-bold">{pending.total} pending</span>
                        {pending.groups.map((group) => (
                          <span key={group.label} className="mt-0.5 block font-normal leading-snug">
                            {group.label === "Registration fee"
                              ? "Fee balance due"
                              : `${group.label}: ${group.items.length} detail${group.items.length === 1 ? "" : "s"}`}
                          </span>
                        ))}
                        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-white/80">Click to see the list</span>
                        <span className="absolute left-full top-1/2 -ml-1 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-red-600" />
                      </span>
                    ) : (
                      <span
                        role="tooltip"
                        className={cn(
                          "pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-semibold text-white shadow-lg",
                          !welcome && "group-hover/item:block",
                        )}
                      >
                        See your dashboard and what is left to fill
                        <span className="absolute left-full top-1/2 -ml-1 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-[#2563eb]" />
                      </span>
                    )}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="group/item relative flex h-11 w-full items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-maroon transition-colors hover:bg-[#fde9c8] hover:font-semibold"
                  >
                    <LogOut className="h-4 w-4 text-[#e87722]" aria-hidden />
                    {"Sign out"}
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-semibold text-white shadow-lg group-hover/item:block"
                    >
                      Sign out of this device
                      <span className="absolute left-full top-1/2 -ml-1 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-[#2563eb]" />
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-md border border-[#e87722] px-4 py-2.5 text-xs font-semibold text-[#e87722] transition-colors hover:bg-[#fde9c8] xl:px-5 xl:text-[15px]"
              >
                <CircleUserRound className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
                {"Login"}
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-md bg-[#e87722] px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 xl:px-5 xl:text-[15px]"
              >
                <UserPlus className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
                {"Sign Up"}
              </Link>
            </div>
          )}
          {/* REGISTRATION button — hidden for now
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-md bg-[#8b0000] px-5 py-2.5 text-xs xl:text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <UserPlus className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
            {"REGISTRATION"}
          </Link>
          */}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {/* Icon only on small phones, icon + label from tablet width up. */}
          {!loading && !user && (
            <Link
              href="/login"
              aria-label="Login"
              className="flex h-10 items-center justify-center gap-1.5 rounded-md border border-[#e87722] px-3 text-sm font-semibold text-[#e87722] transition-colors hover:bg-[#fde9c8] sm:px-4"
            >
              <CircleUserRound className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
              <span className="hidden sm:inline">{"Login"}</span>
            </Link>
          )}
          {!loading && !user && (
            <Link
              href="/signup"
              aria-label="Sign Up"
              className="flex h-10 items-center justify-center gap-1.5 rounded-md bg-[#e87722] px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-4"
            >
              <UserPlus className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
              <span className="hidden sm:inline">{"Sign Up"}</span>
            </Link>
          )}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-maroon hover:bg-maroon/5"
          >
            {open ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="absolute inset-x-0 top-full max-h-[calc(100vh-112px)] overflow-y-auto border-t border-[#d4af37]/25 bg-white lg:hidden">
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
                  <>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-md bg-[#fff8ec] py-2.5 text-[15px] font-semibold text-maroon"
                  >
                    <UserRound className="h-4 w-4" aria-hidden />
                    {"View profile"}
                    {pending.total > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
                        {pending.total}
                      </span>
                    )}
                  </Link>
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
                </>
                ) : (
                  <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-md border border-[#e87722] py-2.5 text-[15px] font-semibold text-[#e87722]"
                  >
                    <CircleUserRound className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
                    {"Login"}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-md bg-[#e87722] py-2.5 text-[15px] font-semibold text-white"
                  >
                    <UserPlus className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
                    {"Sign Up"}
                  </Link>
                  </>
                ))}
              {/* REGISTRATION button (mobile menu) — hidden for now
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md bg-[#8b0000] py-2.5 text-[15px] font-semibold text-white"
              >
                <UserPlus className="h-4 w-4" aria-hidden />
                {"REGISTRATION"}
              </Link>
              */}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
