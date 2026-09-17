"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Container from "@/components/ui/Container";
import AdSlot from "@/components/ui/AdSlot";
import { SITE } from "@/lib/constants";

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", icon: Facebook },
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "YouTube", icon: Youtube },
  { href: "#", label: "Twitter", icon: Twitter },
];

export default function Footer() {

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "#", label: "History" },
    { href: "#", label: "Our Vision" },
    { href: "#", label: "Seva List" },
    { href: "#", label: "Gallery" },
  ];

  const supportLinks = [
    { href: "/contact", label: "Contact Us" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Donation FAQ" },
    { href: "#", label: "Volunteer" },
    { href: "#", label: "Live Help" },
  ];

  return (
    <>
      <AdSlot size="leaderboard" />
      <footer className="bg-maroon text-white">
        <Container className="px-[27px] pb-10 pt-[100px] lg:px-[108px]">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
            <div className="flex w-full max-w-[320px] flex-col items-start gap-8">
              <Image src="/images/brand/logo-footer.svg" alt={SITE.name} width={174} height={174} />
              <p className="w-full text-sm leading-[22px] text-white/80">
                {"Preserving our timeless traditions while serving the contemporary needs of our global devotee community."}
              </p>
              <div className="flex items-start gap-4">
                {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-[18px] bg-[#e47105] text-white transition-colors hover:bg-[#e47105]/80"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-start gap-x-20 gap-y-10">
              <div className="flex flex-col items-start gap-6">
                <h3 className="font-serif text-[22px] font-bold text-[#e47105]">{"Quick Links"}</h3>
                <ul className="flex flex-col items-start gap-3 whitespace-nowrap">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/90 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-start gap-6">
                <h3 className="font-serif text-[22px] font-bold text-[#e47105]">{"Support"}</h3>
                <ul className="flex flex-col items-start gap-3 whitespace-nowrap">
                  {supportLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/90 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-start gap-6">
                <h3 className="font-serif text-[22px] font-bold text-[#e47105]">{"Contact"}</h3>
                <ul className="flex flex-col items-start gap-3 text-sm text-white/90">
                  <li className="w-[232px]">contact@shreeshyamjagat.org</li>
                  <li className="w-[200px]">+91 1234 567 890</li>
                  <li className="w-[200px]">123 Temple Road, Rajasthan, India</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-3 border-t border-[#e47105] pt-10 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} {SITE.name} {"Organization. All Rights Reserved."}</p>
            <p>Design by ANGC Synapse</p>
          </div>
        </Container>
      </footer>
    </>
  );
}
