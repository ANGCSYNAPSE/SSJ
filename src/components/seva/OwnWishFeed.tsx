"use client";

import { useEffect, useState } from "react";
import { Flower2, Quote } from "lucide-react";
import { API_URL } from "@/lib/api";

interface Wish {
  wish: string;
  name: string;
  amount: number;
  time: string;
}

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const ago = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

/**
 * "Seva of Own Wish": what other devotees have chosen to give for, in their own words (from the public feed of paid offerings;
 * a person who chose to keep their offering private never appears here). It fills by itself as offerings come in. Until the first
 * one, or while the feed cannot be reached, it says so kindly instead of showing anything made up.
 */
export default function OwnWishFeed({ compact = false, limit = 6 }: { compact?: boolean; limit?: number }) {
  const [wishes, setWishes] = useState<Wish[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${API_URL}/api/v1/donations/feed?sevaType=your-choice`)
      .then((r) => (r.ok ? r.json() : null))
      .then((payload) => {
        if (!alive) return;
        const rows: { sevaType?: string | null; wish?: string | null; name: string; amount: number; time: string }[] = payload?.data ?? [];
        setWishes(rows.filter((r) => r.sevaType === "your-choice" && r.wish).slice(0, limit).map((r) => ({ wish: r.wish as string, name: r.name, amount: r.amount, time: r.time })));
      })
      .catch(() => alive && setWishes([]));
    return () => {
      alive = false;
    };
  }, [limit]);

  if (wishes === null) return <div aria-hidden className={`h-24 animate-pulse rounded-2xl bg-[#f0e3cc]/60 ${compact ? "" : "max-w-[760px]"}`} />;

  if (wishes.length === 0) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-dashed border-[#e0b94f]/70 bg-[#fffaf0] p-4 text-sm leading-relaxed text-[#6b4f4f]">
        <Flower2 className="mt-0.5 h-5 w-5 shrink-0 text-[#e47105]" aria-hidden />
        <p>{"No one has shared their own wish yet. Yours could be the first, and it will be shown here for others to see (unless you choose to keep it private)."}</p>
      </div>
    );
  }

  return (
    <ul className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
      {wishes.map((w, i) => (
        <li key={`${w.time}-${i}`} className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[#e0b94f]/50 bg-gradient-to-br from-[#fffdf8] to-[#fdf0d8] p-5 shadow-[0_10px_24px_rgba(107,31,31,0.08)]">
          <Quote aria-hidden className="absolute -right-2 -top-2 h-16 w-16 rotate-180 text-[#e47105]/10" />
          <p className="relative font-serif text-[17px] italic leading-snug text-[#3e1815]">&ldquo;{w.wish}&rdquo;</p>
          <p className="relative mt-auto text-xs text-[#6b4f4f]">
            <span className="notranslate font-semibold" translate="no">{w.name}</span>
            {" · "}
            <span className="font-bold text-[#9a4b06]">{inr(w.amount)}</span>
            {" · "}
            {ago(w.time)}
          </p>
        </li>
      ))}
    </ul>
  );
}
