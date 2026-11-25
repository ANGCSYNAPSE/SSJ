"use client";

import { useEffect, useState } from "react";
import { HandHeart } from "lucide-react";
import { API_URL } from "@/lib/api";

interface Offering {
  name: string;
  amount: number;
  cause: string;
  time: string;
}

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const ago = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "S";

/**
 * The latest offerings, from the site's own public feed of paid ones (a person who chose to keep theirs private shows as
 * "Anonymous"). It fills by itself. Until there is one, it says so instead of showing anyone made up.
 */
export default function RecentOfferings() {
  const [items, setItems] = useState<Offering[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${API_URL}/api/v1/donations/feed`)
      .then((r) => (r.ok ? r.json() : null))
      .then((payload) => alive && setItems(Array.isArray(payload?.data) ? payload.data.slice(0, 5) : []))
      .catch(() => alive && setItems([]));
    return () => {
      alive = false;
    };
  }, []);

  if (items === null) return <div aria-hidden className="h-28 animate-pulse rounded-2xl bg-[#f0e3cc]/60" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[560px] items-start gap-3 rounded-2xl border border-dashed border-[#e0b94f]/70 bg-white p-5 text-sm leading-relaxed text-[#6b4f4f]">
        <HandHeart className="mt-0.5 h-5 w-5 shrink-0 text-[#e87722]" aria-hidden />
        <p>{"The first offerings will appear here as they come in. Yours could be the first. (If you would rather not be shown, choose to keep your offering private when you give.)"}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((d, i) => (
        <div key={`${d.time}-${i}`} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_8px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd9a0] to-[#ffb347] font-serif text-lg font-bold text-[#6b1f1f]">{initials(d.name)}</span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="notranslate truncate text-xs font-bold text-[#444]" translate="no">{d.name}</p>
              <p className="text-xs text-[#8c8c8c]">{ago(d.time)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-serif text-2xl font-bold text-[#6b1f1f]">{inr(d.amount)}</p>
            <p className="text-[13px] font-medium text-[#e87722]">{d.cause}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
