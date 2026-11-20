"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, ShieldCheck, Twitter, Youtube } from "lucide-react";
import Container from "@/components/ui/Container";
import AdSlot from "@/components/ui/AdSlot";
import { CONTACT, SITE } from "@/lib/constants";

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", icon: Facebook },
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "YouTube", icon: Youtube },
  { href: "#", label: "Twitter", icon: Twitter },
];

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "About",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/baba-shyam", label: "Baba Shyam" },
      { href: "/initiatives", label: "Our Initiatives" },
      { href: "/team", label: "Our Team" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/events", label: "Events" },
      { href: "/temple-directory", label: "Temples" },
      { href: "/dharamshala", label: "Dharamshalas" },
      { href: "/organisations", label: "Organisations" },
      { href: "/artists", label: "Artists" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { href: "/donation", label: "Donate" },
      { href: "/signup", label: "Join the Community" },
      { href: "/login", label: "Sign In" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
];

const linkClass = "text-sm text-white/80 transition-colors hover:text-white";

export default function Footer() {
  return (
    <>
      <AdSlot size="leaderboard" />
      <footer className="bg-maroon text-white">
        <Container className="pb-8 pt-16 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2.6fr)]">
            {/* Who we are */}
            <div className="flex max-w-sm flex-col items-start gap-6">
              <Image src="/images/brand/logo-footer.svg" alt={SITE.name} width={150} height={150} />
              <p className="text-sm leading-relaxed text-white/80">
                {"Preserving our timeless traditions while serving the contemporary needs of our global devotee community."}
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e47105] text-white transition-colors hover:bg-white hover:text-[#e47105]"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links and contact */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.5fr)]">
              {COLUMNS.map((column) => (
                <nav key={column.title} aria-label={column.title}>
                  <h3 className="font-serif text-lg font-bold text-[#e47105]">{column.title}</h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

              <div className="col-span-2 sm:col-span-1">
                <h3 className="font-serif text-lg font-bold text-[#e47105]">{"Contact"}</h3>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-white/80">
                  <li className="flex items-start gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#e47105]" aria-hidden />
                    <a href={`mailto:${CONTACT.email}`} className="break-words transition-colors hover:text-white">
                      {CONTACT.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#e47105]" aria-hidden />
                    <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                      {CONTACT.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-col gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#e47105]" aria-hidden />
              {"Payments are processed securely by Razorpay. We never see or store your card or UPI details."}
            </p>
            <Link href="/refund-policy" className="shrink-0 font-semibold text-[#e47105] transition-colors hover:text-white">
              {"How refunds work →"}
            </Link>
          </div>

          {/* Legal bar */}
          <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/60 lg:flex-row lg:items-center lg:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {SITE.name}
              {". All rights reserved."}
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              {"Design by "}
              <a
                href="https://angcsynapse.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#e47105] transition-colors hover:text-white"
              >
                {"ANGC Synapse"}
              </a>
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}
