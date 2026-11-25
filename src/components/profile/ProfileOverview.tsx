"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, CheckCircle2, ClipboardList, Clock, HandHeart, MessageCircle } from "lucide-react";
import SevaArt from "@/components/seva/SevaArt";
import { SEVA_TYPES } from "@/lib/data/seva";
import type { Dashboard } from "@/lib/api";

const rupees = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const when = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export type OverviewTab = "profile" | "registrations" | "payments" | "messages";

/** The card of three numbers that overlaps the foot of the banner. Each number opens the part of the profile it belongs to. */
export function StatCard({ data, onGo }: { data: Dashboard; onGo: (tab: OverviewTab) => void }) {
  const { donations, profiles, completion } = data;
  const items: { label: string; value: string; tab: OverviewTab }[] = [
    { label: "Given in seva", value: rupees(donations.total), tab: "payments" },
    { label: "Registrations", value: String(profiles.length), tab: "registrations" },
    { label: "Profile", value: `${completion.percent}%`, tab: "profile" },
  ];
  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-[720px] px-4 sm:px-6">
      <div className="grid grid-cols-3 divide-x divide-[#f0e3cc] rounded-3xl border border-[#e0b94f]/40 bg-white py-5 shadow-[0_22px_50px_rgba(58,15,15,0.22)]">
        {items.map((it) => (
          <button key={it.label} type="button" onClick={() => onGo(it.tab)} className="group flex flex-col items-center gap-1 px-2 transition-transform duration-300 hover:-translate-y-0.5">
            <span className="font-serif text-2xl font-bold text-[#6b1f1f] transition-colors group-hover:text-[#e47105] sm:text-3xl">{it.value}</span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#8a7a6a]">{it.label}</span>
          </button>
        ))}
      </div>
      <div className="mx-auto mt-2 h-1.5 w-[60%] overflow-hidden rounded-full bg-[#f0e3cc]">
        <div className="h-full rounded-full bg-gradient-to-r from-[#f47700] to-[#ffb347] transition-all duration-700" style={{ width: `${completion.percent}%` }} />
      </div>
    </div>
  );
}

/** Three coloured tiles, each a number and where to go with it. */
export function ReportTiles({ data, onGo }: { data: Dashboard; onGo: (tab: OverviewTab) => void }) {
  const toFill = data.profiles.reduce((n, p) => n + p.missing.length, 0) + data.completion.missingAccount.length;
  const tiles: { label: string; value: string; icon: typeof Bell; tone: string; tab: OverviewTab }[] = [
    { label: "Offerings made", value: String(data.donations.count), icon: HandHeart, tone: "from-[#ff8a5b] to-[#ff4d6d]", tab: "payments" },
    { label: "Details to fill", value: String(toFill), icon: ClipboardList, tone: "from-[#7a1f2f] to-[#2d0b3a]", tab: toFill > 0 && data.profiles.some((p) => p.missing.length) ? "registrations" : "profile" },
    { label: "New messages", value: String(data.notifications.unread), icon: Bell, tone: "from-[#8a5cff] to-[#4a2fbd]", tab: "messages" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {tiles.map((t) => (
        <button key={t.label} type="button" onClick={() => onGo(t.tab)} className={`group flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br ${t.tone} px-2 py-5 text-white shadow-[0_14px_28px_rgba(58,15,15,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(58,15,15,0.28)] sm:py-6`}>
          <t.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-125" aria-hidden />
          <span className="font-serif text-3xl font-bold leading-none">{t.value}</span>
          <span className="text-center text-[11px] font-medium leading-tight text-white/90">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

type Activity = { id: string; at: string; title: string; sub: string; kind: "seva" | "message"; cause?: string };

/** "My Activities": what the person has done lately (their seva) and what the team has told them, newest first. */
export function ActivityList({ data, onGo }: { data: Dashboard; onGo: (tab: OverviewTab) => void }) {
  const items = useMemo<Activity[]>(() => {
    const seva: Activity[] = data.donations.recent.map((d) => ({ id: `d-${d.id}`, at: d.createdAt, title: d.cause, sub: `An offering of ${rupees(d.amount)}`, kind: "seva", cause: d.cause }));
    const messages: Activity[] = data.notifications.recent.map((n) => ({ id: `n-${n.id}`, at: n.createdAt, title: n.title || "A message from the team", sub: n.message, kind: "message" }));
    return [...seva, ...messages].sort((a, b) => +new Date(b.at) - +new Date(a.at)).slice(0, 6);
  }, [data]);

  return (
    <section className="rounded-3xl border border-[#e0b94f]/40 bg-white p-5 shadow-[0_16px_40px_rgba(107,31,31,0.08)] sm:p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-[#6b1f1f]">{"My Activities"}</h2>
        <button type="button" onClick={() => onGo("payments")} className="inline-flex items-center gap-1 text-xs font-bold text-[#e47105] hover:underline">
          {"See all"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#e0b94f]/70 bg-[#fffaf1] px-5 py-9 text-center">
          <HandHeart className="h-7 w-7 text-[#e47105]" aria-hidden />
          <p className="max-w-[300px] text-sm text-[#6b6b6b]">{"Nothing here yet. When you give seva or the team writes to you, it appears here."}</p>
          <Link href="/seva#give-seva" className="rounded-full bg-gradient-to-r from-[#f47700] to-[#ff9417] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(244,119,0,0.3)] transition-transform hover:-translate-y-0.5">
            {"Give seva"}
          </Link>
        </div>
      ) : (
        <ul className="mt-5 flex flex-col gap-3">
          {items.map((a) => {
            const seva = a.cause ? SEVA_TYPES.find((s) => s.title === a.cause || (s.slug === "your-choice" && a.cause === "Seva of My Choice")) : undefined;
            return (
              <li key={a.id} className="group flex items-center gap-4 rounded-2xl border border-[#f0e3cc] bg-[#fffdf8] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e0b94f] hover:shadow-[0_10px_24px_rgba(194,87,12,0.12)]">
                {a.kind === "seva" ? (
                  seva ? (
                    <SevaArt seva={seva} float={false} className="h-[60px] w-[60px] shrink-0 rounded-xl" />
                  ) : (
                    <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8a5b] to-[#ff4d6d] text-white">
                      <HandHeart className="h-6 w-6" aria-hidden />
                    </span>
                  )
                ) : (
                  <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8a5cff] to-[#4a2fbd] text-white">
                    <MessageCircle className="h-6 w-6" aria-hidden />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-bold text-[#3e1815]">{a.title}</p>
                  <p className="truncate text-xs text-[#6b6b6b]">{a.sub}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#a39a92]">
                    <Clock className="h-3 w-3" aria-hidden /> {when(a.at)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

const monthName = (key: string) => new Date(Number(key.slice(0, 4)), Number(key.slice(5, 7)) - 1, 1).toLocaleDateString("en-IN", { month: "short" });
/** A tidy top for the chart: 1, 2, 5 times a power of ten. */
const niceMax = (n: number) => {
  if (n <= 0) return 100;
  const p = Math.pow(10, Math.floor(Math.log10(n)));
  const f = n / p;
  return ([1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((step) => f <= step) ?? 10) * p;
};

/**
 * "My seva": what the person gave in each of the last six months, as a smooth area chart with a bubble over the month being
 * looked at (the highest to begin with; move over the chart, or touch it, to look at another).
 */
export function SevaChart({ monthly }: { monthly: { month: string; total: number }[] }) {
  const W = 520;
  const H = 250;
  const P = { l: 50, r: 16, t: 34, b: 34 };
  const totals = monthly.map((m) => m.total);
  const top = niceMax(Math.max(...totals, 0));
  const peak = totals.indexOf(Math.max(...totals));
  const [picked, setPicked] = useState<number | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const active = picked ?? (Math.max(...totals) > 0 ? peak : -1);
  const empty = Math.max(...totals) === 0;

  const x = (i: number) => P.l + (i * (W - P.l - P.r)) / Math.max(1, monthly.length - 1);
  const y = (v: number) => P.t + (1 - v / top) * (H - P.t - P.b);
  const pts = monthly.map((m, i) => [x(i), y(m.total)] as const);
  // a smooth line through the points
  const line = pts.reduce((d, [px, py], i) => {
    if (i === 0) return `M ${px} ${py}`;
    const [qx, qy] = pts[i - 1];
    const mx = (qx + px) / 2;
    return `${d} C ${mx} ${qy}, ${mx} ${py}, ${px} ${py}`;
  }, "");
  const area = `${line} L ${x(monthly.length - 1)} ${H - P.b} L ${x(0)} ${H - P.b} Z`;
  const average = totals.reduce((a, b) => a + b, 0) / Math.max(1, totals.length);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * top);

  function pointer(e: React.PointerEvent) {
    const box = svg.current?.getBoundingClientRect();
    if (!box) return;
    const px = ((e.clientX - box.left) / box.width) * W;
    let best = 0;
    for (let i = 1; i < pts.length; i += 1) if (Math.abs(pts[i][0] - px) < Math.abs(pts[best][0] - px)) best = i;
    setPicked(best);
  }

  return (
    <section className="rounded-3xl border border-[#e0b94f]/40 bg-white p-5 shadow-[0_16px_40px_rgba(107,31,31,0.08)] sm:p-7">
      <h2 className="font-serif text-2xl font-bold text-[#6b1f1f]">{"My Seva"}</h2>
      <p className="mt-1 flex flex-wrap gap-x-5 text-xs text-[#6b6b6b]">
        <span>{"Average "}<strong className="text-[#2f8f4e]">{rupees(average)}</strong></span>
        <span>{"This month "}<strong className="text-[#e47105]">{rupees(totals[totals.length - 1] ?? 0)}</strong></span>
      </p>

      <div className="relative mt-4">
        <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full touch-pan-y select-none" onPointerMove={pointer} onPointerLeave={() => setPicked(null)} role="img" aria-label="What you gave in seva in each of the last six months">
          <defs>
            <linearGradient id="seva-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f47700" stopOpacity="0.5" />
              <stop offset="1" stopColor="#ffb347" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="#f0e3cc" strokeDasharray={t === 0 ? undefined : "3 5"} />
              <text x={P.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#a39a92">{t >= 1000 ? `${t / 1000}k` : Math.round(t)}</text>
            </g>
          ))}
          <path d={area} fill="url(#seva-fill)" />
          <path d={line} fill="none" stroke="#e47105" strokeWidth="3" strokeLinecap="round" />
          {monthly.map((m, i) => (
            <text key={m.month} x={x(i)} y={H - 10} textAnchor="middle" fontSize="11" fill={i === active ? "#6b1f1f" : "#a39a92"} fontWeight={i === active ? 700 : 400}>{monthName(m.month)}</text>
          ))}
          {active >= 0 && !empty && (
            <g>
              <line x1={x(active)} x2={x(active)} y1={y(totals[active])} y2={H - P.b} stroke="#e47105" strokeOpacity="0.35" strokeDasharray="3 4" />
              <circle cx={x(active)} cy={y(totals[active])} r="6" fill="#fff" stroke="#e47105" strokeWidth="3" />
              <g transform={`translate(${Math.min(Math.max(x(active), P.l + 36), W - P.r - 36)} ${Math.max(y(totals[active]) - 18, 14)})`}>
                <rect x="-36" y="-22" width="72" height="26" rx="8" fill="#3a0f0f" />
                <path d="M -6 4 L 0 10 L 6 4 Z" fill="#3a0f0f" />
                <text x="0" y="-5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffe08a">{rupees(totals[active])}</text>
              </g>
            </g>
          )}
        </svg>
        {empty && (
          <div className="pointer-events-none absolute inset-x-0 top-[28%] flex flex-col items-center gap-2 text-center">
            <p className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#6b1f1f] shadow">{"Your seva will rise here, month by month"}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/** A gentle reminder of what is left to fill, shown on the overview only while something is. */
export function CompleteNudge({ data, onEdit }: { data: Dashboard; onEdit: () => void }) {
  const todo = data.completion.missingAccount.map((k) => (k === "avatarUrl" ? "Add a profile photo" : k === "location" ? "Add your city" : k));
  if (!data.account.bio) todo.push("Write a line about yourself");
  if (data.completion.percent >= 100 && todo.length === 0) {
    return (
      <p className="flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
        <CheckCircle2 className="h-4 w-4" aria-hidden /> {"Your profile is complete. Thank you."}
      </p>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5">
      <div className="min-w-0 text-sm text-amber-900">
        <p className="font-bold">{"A few things to finish your profile"}</p>
        <p className="mt-0.5 text-xs">{todo.slice(0, 3).join(" · ")}</p>
      </div>
      <button type="button" onClick={onEdit} className="rounded-full bg-[#e87722] px-4 py-2 text-xs font-bold text-white transition-transform hover:-translate-y-0.5">
        {"Edit profile"}
      </button>
    </div>
  );
}
