import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-maroon text-white">
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-2">
            <Image src="/images/brand/logo.png" alt={SITE.name} width={36} height={36} />
            <span className="font-serif text-lg font-bold">{SITE.name}</span>
          </div>
          <nav className="flex flex-wrap gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
