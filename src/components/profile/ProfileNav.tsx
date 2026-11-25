"use client";

import Link from "next/link";
import { HandHeart, type LucideIcon } from "lucide-react";
import { Mandala } from "@/components/seva/DharmaIcons";
import { cn } from "@/lib/utils";

export type NavTab<K extends string = string> = { key: K; label: string; short: string; icon: LucideIcon; badge?: number; dot?: boolean };

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/**
 * The navigation of the profile on a computer: a deep maroon panel down the left side with the person at the top (photo, name,
 * how much of the profile is filled), the four places of the account under it, and the round "give seva" call at the foot. On a
 * phone it is replaced by ProfileBottomNav.
 */
export function ProfileSidebar<K extends string>({
  tabs,
  tab,
  onChoose,
  name,
  avatarUrl,
  percent,
  tag,
}: {
  tabs: NavTab<K>[];
  tab: K;
  onChoose: (key: K) => void;
  name: string;
  avatarUrl: string | null;
  percent: number;
  tag: string;
}) {
  return (
    <aside aria-label="Profile sections" className="fixed bottom-0 left-0 top-16 z-30 hidden w-[264px] flex-col overflow-hidden border-r border-[#d4af37]/25 bg-gradient-to-b from-[#4d1313] via-[#3a0f0f] to-[#240707] text-white lg:flex">
      <Mandala className="gs-spin-slow pointer-events-none absolute -bottom-24 -left-24 h-[330px] w-[330px] text-[#f6dc8c]/10" />

      {/* the person */}
      <div className="relative px-5 pb-5 pt-6">
        <div className="flex items-center gap-3.5">
          <span className="h-[52px] w-[52px] shrink-0 rounded-full bg-gradient-to-br from-[#ffe08a] via-[#e0b94f] to-[#b8860b] p-[2.5px] shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="" className="h-full w-full rounded-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center rounded-full bg-[#fdf0d5] font-serif text-lg font-bold text-[#7a1f1f]">{initialsOf(name)}</span>
            )}
          </span>
          <span className="min-w-0">
            <span className="notranslate block truncate font-serif text-[17px] font-bold leading-tight" translate="no">{name}</span>
            <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd66b]">{tag}</span>
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-white/70">
            <span>{"Profile filled"}</span>
            <span className="text-[#ffd66b]">{percent}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-gradient-to-r from-[#f47700] to-[#ffd04f] transition-all duration-700" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <span aria-hidden className="mx-5 h-px bg-gradient-to-r from-transparent via-[#e0b94f]/50 to-transparent" />

      {/* the places of the account */}
      <nav className="relative flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-5">
        <p className="px-3 pb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#e0b94f]/80">{"My account"}</p>
        {tabs.map((t) => {
          const on = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChoose(t.key)}
              aria-current={on ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-all duration-300",
                on ? "bg-gradient-to-r from-[#f47700] to-[#ff9417] text-white shadow-[0_10px_22px_rgba(244,119,0,0.35)]" : "text-[#f3dfc0] hover:translate-x-0.5 hover:bg-white/10",
              )}
            >
              <t.icon className={cn("h-[18px] w-[18px] transition-transform duration-300", !on && "group-hover:scale-110")} aria-hidden />
              <span className="flex-1">{t.label}</span>
              {t.badge ? (
                <span className={cn("flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold", on ? "bg-white text-[#e47105]" : "bg-red-500 text-white")}>{t.badge}</span>
              ) : null}
              {t.dot && <span aria-label="Fee balance due" className="h-2.5 w-2.5 rounded-full border-2 border-[#3a0f0f] bg-red-500" />}
            </button>
          );
        })}
      </nav>

      {/* the call at the foot */}
      <div className="relative p-4">
        <Link href="/seva#give-seva" className="group flex items-center gap-3 rounded-2xl border border-[#e0b94f]/50 bg-white/10 px-4 py-3.5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15">
          <span className="gs-glow flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f47700] to-[#ff9417] shadow-[0_8px_18px_rgba(244,119,0,0.5)]">
            <HandHeart className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-serif text-[17px] font-bold">{"Give seva"}</span>
            <span className="block text-[11px] text-white/70">{"Food, cows, children and more"}</span>
          </span>
        </Link>
      </div>
    </aside>
  );
}

/**
 * The navigation of the profile on a phone: a floating bar near the foot of the screen, rounded and frosted, with a saffron
 * pill that slides to the place you choose.
 */
export function ProfileBottomNav<K extends string>({ tabs, tab, onChoose }: { tabs: NavTab<K>[]; tab: K; onChoose: (key: K) => void }) {
  const index = Math.max(0, tabs.findIndex((t) => t.key === tab));
  return (
    <nav aria-label="Profile sections" className="fixed inset-x-3 bottom-3 z-40 lg:hidden" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
      <div className="relative mx-auto grid max-w-[440px] rounded-[26px] border border-[#e0b94f]/50 bg-white/90 p-1.5 shadow-[0_18px_40px_rgba(58,15,15,0.3)] backdrop-blur-xl" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
        <span
          aria-hidden
          className="absolute bottom-1.5 left-1.5 top-1.5 rounded-[20px] bg-gradient-to-br from-[#f47700] to-[#ff9d2e] shadow-[0_8px_18px_rgba(244,119,0,0.4)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.35,0.64,1)]"
          style={{ width: `calc((100% - 0.75rem) / ${tabs.length})`, transform: `translateX(${index * 100}%)` }}
        />
        {tabs.map((t) => {
          const on = tab === t.key;
          return (
            <button key={t.key} type="button" onClick={() => onChoose(t.key)} aria-current={on ? "page" : undefined} className="relative z-10 flex flex-col items-center gap-0.5 rounded-[20px] px-1 py-2 active:scale-95 transition-transform">
              <span className="relative">
                <t.icon className={cn("h-[22px] w-[22px] transition-all duration-300", on ? "scale-110 text-white" : "text-[#8a7a6a]")} aria-hidden />
                {t.badge ? <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">{t.badge}</span> : null}
                {t.dot && <span aria-label="Fee balance due" className="absolute -right-1 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />}
              </span>
              <span className={cn("text-[10.5px] font-bold transition-colors duration-300", on ? "text-white" : "text-[#8a7a6a]")}>{t.short}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
