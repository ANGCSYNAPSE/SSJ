"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** First name only — the header has room for one word. */
function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0];
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  // The bar starts transparent so the hero shows through, and picks up its
  // background once the page moves. Initialised from the current offset too,
  // since a reload can restore a scrolled position without firing an event.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile drawer needs a solid backdrop even at the top of the page.
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid
          ? "border-border bg-cream-light/95 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/brand/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            aria-hidden
          />
          <span className="font-serif text-xl font-bold text-maroon">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-maroon",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {/* Hold the slot while the session restores so the bar does not jump */}
          {loading ? (
            <span className="h-10 w-[88px] animate-pulse rounded-md bg-maroon/10" />
          ) : user ? (
            <>
              <span className="hidden text-sm text-maroon/70 xl:inline">
                Jai Shri Shyam,{" "}
                <span className="font-medium text-maroon">
                  {firstName(user.fullName)}
                </span>
              </span>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-2 rounded-lg border border-border bg-white/70 px-4 py-2.5 text-sm font-medium text-maroon transition-colors hover:bg-white"
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-primary bg-white/70 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Sign In
            </Link>
          )}
          <Link
            href="/donate"
            className="flex items-center gap-2 rounded-lg bg-maroon px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-maroon-light"
          >
            <Heart className="h-4 w-4 fill-current" aria-hidden />
            DONATION
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-maroon hover:bg-maroon/5 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-cream-light lg:hidden">
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
                    : "text-maroon",
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-maroon"
            >
              Donation
            </Link>

            {!loading &&
              (user ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="py-3 text-left text-sm font-medium text-primary"
                >
                  Sign out ({firstName(user.fullName)})
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium text-primary"
                >
                  Sign In
                </Link>
              ))}
          </div>
        </nav>
      )}
    </header>
  );
}
