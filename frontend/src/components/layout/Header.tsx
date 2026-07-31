"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, LogOut } from "lucide-react";
import Container from "@/components/ui/Container";
import { useAuth } from "@/components/auth/AuthProvider";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** First name only — the header has room for one word. */
function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0];
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/brand/logo.png" alt={SITE.name} width={40} height={40} />
          <span className="font-serif text-xl font-bold text-maroon">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {/* Reserve the slot while the session restores so the bar does not jump */}
          {loading ? (
            <span className="h-10 w-[92px] animate-pulse rounded-md bg-cream" />
          ) : user ? (
            <>
              <span className="text-sm text-muted-foreground">
                Jai Shri Shyam,{" "}
                <span className="font-medium text-maroon">
                  {firstName(user.fullName)}
                </span>
              </span>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-maroon transition-colors hover:bg-cream"
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Sign In
            </Link>
          )}
          <Link
            href="/donate"
            className="flex items-center gap-2 rounded-md bg-maroon px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-maroon-light"
          >
            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
            DONATION
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-cream lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <nav className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 text-sm transition-colors hover:text-primary",
                  pathname === link.href
                    ? "font-medium text-primary"
                    : "text-muted-foreground",
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
          </Container>
        </nav>
      )}
    </header>
  );
}
