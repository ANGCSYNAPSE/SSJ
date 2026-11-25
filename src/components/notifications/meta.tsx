import { BadgeCheck, CalendarDays, HandHeart, Megaphone, Newspaper, ReceiptIndianRupee, Flower2, type LucideIcon } from "lucide-react";
import type { NotificationCategory } from "@/lib/api";

/** How each kind of message looks: its icon, a plain label, and a soft colour that groups them at a glance. */
export const CATEGORY_META: Record<NotificationCategory, { label: string; Icon: LucideIcon; tint: string }> = {
  announcement: { label: "Announcement", Icon: Megaphone, tint: "bg-[#fde9c8] text-[#b45309]" },
  event: { label: "Event", Icon: CalendarDays, tint: "bg-rose-100 text-rose-700" },
  update: { label: "Update", Icon: Newspaper, tint: "bg-sky-100 text-sky-700" },
  seva: { label: "Seva", Icon: HandHeart, tint: "bg-emerald-100 text-emerald-700" },
  payment: { label: "Payment", Icon: ReceiptIndianRupee, tint: "bg-green-100 text-green-700" },
  registration: { label: "Registration", Icon: BadgeCheck, tint: "bg-violet-100 text-violet-700" },
  system: { label: "Shyam Jagat", Icon: Flower2, tint: "bg-amber-100 text-amber-700" },
};

export const FILTER_CATEGORIES: NotificationCategory[] = ["announcement", "event", "seva", "update", "payment", "registration"];

/** "just now", "5 min ago", "3 h ago", "yesterday", then a date. */
export function timeAgo(iso: string, now = Date.now()): string {
  const seconds = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: days > 300 ? "numeric" : undefined });
}
