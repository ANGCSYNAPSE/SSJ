import { BookOpen, Flag, Flame, Music, Route, ScrollText, Sunrise, type LucideIcon } from "lucide-react";
import type { DevotionIcon as Kind } from "@/lib/data/devotion";

const ICONS: Record<Kind, LucideIcon> = {
  darshan: Sunrise,
  chalisa: ScrollText,
  aarti: Flame,
  bhajan: Music,
  katha: BookOpen,
  mela: Flag,
  yatra: Route,
};

export default function DevotionIcon({ kind, className = "h-6 w-6" }: { kind: Kind; className?: string }) {
  const Icon = ICONS[kind];
  return <Icon className={className} aria-hidden />;
}
