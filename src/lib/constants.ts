export const SITE = {
  name: "Shyam Jagat",
  description: "Shyam Jagat — Faith, Service, Humanity",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/**
 * The address links we hand out should start with (a card's link, its QR code, a "share" text). When the site's own address is
 * set (NEXT_PUBLIC_SITE_URL on the live site), that one is used, so every link uses the one proper domain. While it is not set,
 * or is still the localhost of development, the address the visitor is on is used, so a link is never "localhost" on the live
 * site and always opens the site it was made on while developing.
 */
export function siteOrigin(): string {
  const configured = SITE.url.replace(/\/+$/, "");
  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(configured);
  if (typeof window === "undefined") return configured;
  return isLocal ? window.location.origin : configured;
}

/** Where people reach the team. Shown on the policy pages. */
export const CONTACT = {
  email: "shyamjagatindia@gmail.com",
  phone: "+91 99900 53600",
} as const;

/** A phone number as a dialable link: digits only, with the country code, e.g. tel:+919990053600. */
export const telHref = (phone: string) => {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  // A bare 10-digit Indian number gets the country code.
  return `tel:+${digits.length === 10 ? `91${digits}` : digits}`;
};

/**
 * Which hero the homepage shows. Change this one word to switch; both heroes stay in the code, so nothing has to be rebuilt.
 *   "parda" : the temple curtain that opens to Baba Shyam's darshan (components/home/HeroParda.tsx)
 *   "gate"  : the carved gateway, in daylight or at night by the hour (components/home/HeroGateway.tsx, in app/(site)/page.tsx)
 */
export const HOME_HERO: "parda" | "gate" = "parda";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/baba-shyam", label: "Baba Shyam" },
  { href: "/about", label: "About Us" },
  { href: "/initiatives", label: "Our Initiatives" },
  { href: "/#give-seva", label: "Seva" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
] as const;

/** Overflow links tucked behind the header's "More" dropdown. */
export const MORE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/temple-directory", label: "Temples" },
  // { href: "/aarti", label: "All Aarti" }, // hidden for now; the pages are built (src/app/(site)/aarti) and come back with this line
  { href: "/dharamshala", label: "Dharamshala" },
  { href: "/organisations", label: "Organisations" },
  // { href: "/temple-registration", label: "Temple Registration" },
  { href: "/artists", label: "Artists" },
  // { href: "/artist-registration", label: "Artist Registration" },
  // { href: "/gallery", label: "Gallery" },
  // { href: "/faq", label: "FAQ" },
  { href: "/donation", label: "Donation" },
  { href: "/contact", label: "Contact Us" },
] as const;
