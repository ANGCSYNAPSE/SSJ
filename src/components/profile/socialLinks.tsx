import type { ComponentType } from "react";
import { Facebook, Globe, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import type { LinkKey, SocialLinks } from "@/lib/api";

/** The places a person can link to from their profile and card. The order here is the order they are shown in. */
export const PLATFORMS: { key: LinkKey; label: string; icon: ComponentType<{ className?: string; size?: number | string; color?: string }>; colour: string; placeholder: string }[] = [
  { key: "youtube", label: "YouTube", icon: Youtube, colour: "#e62117", placeholder: "https://youtube.com/@yourchannel" },
  { key: "instagram", label: "Instagram", icon: Instagram, colour: "#d62976", placeholder: "https://instagram.com/yourname" },
  { key: "facebook", label: "Facebook", icon: Facebook, colour: "#1877f2", placeholder: "https://facebook.com/yourname" },
  { key: "x", label: "X (Twitter)", icon: Twitter, colour: "#16181c", placeholder: "https://x.com/yourname" },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, colour: "#0a66c2", placeholder: "https://linkedin.com/in/yourname" },
  { key: "website", label: "Website", icon: Globe, colour: "#e47105", placeholder: "https://yourwebsite.com" },
];

/** The links a person has filled in, in display order. */
export const filledLinks = (links?: SocialLinks | null) => PLATFORMS.filter((p) => links?.[p.key]).map((p) => ({ ...p, href: links![p.key]! }));

/** A row of round icon buttons, one per link the person has. Renders nothing when there are none. */
export function SocialIcons({ links, size = 40, className = "" }: { links?: SocialLinks | null; size?: number; className?: string }) {
  const items = filledLinks(links);
  if (items.length === 0) return null;
  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {items.map((p) => (
        <li key={p.key}>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label={p.label}
            title={p.label}
            className="flex items-center justify-center rounded-full text-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
            style={{ width: size, height: size, background: p.colour }}
          >
            <p.icon size={Math.round(size * 0.48)} />
          </a>
        </li>
      ))}
    </ul>
  );
}
