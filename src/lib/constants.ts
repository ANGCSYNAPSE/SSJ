export const SITE = {
  name: "Shyam Jagat",
  description: "Shyam Jagat — Faith, Service, Humanity",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

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

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/baba-shyam", label: "Baba Shyam" },
  { href: "/about", label: "About Us" },
  { href: "/initiatives", label: "Our Initiatives" },
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
