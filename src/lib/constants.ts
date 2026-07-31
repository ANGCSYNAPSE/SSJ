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
  { href: "/temple-directory", label: "Temple Directory" },
  { href: "/artists", label: "Artists" },
] as const;
