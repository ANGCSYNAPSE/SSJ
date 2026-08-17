import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Container from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "#", label: "History" },
  { href: "#", label: "Our Vision" },
  { href: "#", label: "Seva List" },
  { href: "#", label: "Gallery" },
];

const SUPPORT_LINKS = [
  { href: "/contact", label: "Contact Us" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Donation FAQ" },
  { href: "#", label: "Volunteer" },
  { href: "#", label: "Live Help" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", icon: Facebook },
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "YouTube", icon: Youtube },
  { href: "#", label: "Twitter", icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="bg-maroon text-white">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/images/brand/logo.png" alt={SITE.name} width={44} height={44} />
              <span className="font-serif text-xl font-bold">{SITE.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Preserving our timeless traditions while serving the contemporary needs of our global devotee community.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/80"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-primary">Quick Links</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-primary">Support</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-primary">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <li>contact@shreeshyamjagat.org</li>
              <li>+91 1234 567 890</li>
              <li>123 Temple Road, Rajasthan, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/20 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE.name} Organization. All Rights Reserved.</p>
          <p>Design by ANGC Synapse</p>
        </div>
      </Container>
    </footer>
  );
}
