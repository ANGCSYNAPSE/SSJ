export const SITE = {
  name: "Shyam Jagat",
  description: "Shree Shyam Jagat — Faith, Service, Humanity",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/initiatives", label: "Our Initiatives" },
  { href: "/baba-shyam", label: "Baba Shyam" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
] as const;

/** Overflow links tucked behind the header's "More" dropdown. */
export const MORE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/temple-directory", label: "Temple Directory" },
  { href: "/temple-registration", label: "Temple Registration" },
  { href: "/artists", label: "Artists" },
  { href: "/artist-registration", label: "Artist Registration" },
  // { href: "/gallery", label: "Gallery" },
  // { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
] as const;
