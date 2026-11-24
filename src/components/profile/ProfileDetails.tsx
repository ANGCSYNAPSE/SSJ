"use client";

import { BadgeCheck, CircleDashed, Link2, Mail, MapPin, Phone, Plus, ShieldCheck, Smartphone, UserRound } from "lucide-react";
import Ornament from "@/components/ui/Ornament";
import { PLATFORMS } from "@/components/profile/socialLinks";
import type { Dashboard } from "@/lib/api";

/** One fact about the person, as a small tile: an icon, what it is, and the value (or an invitation to add it). */
function Tile({ icon: Icon, label, value, onAdd, wide = false }: { icon: typeof Mail; label: string; value?: string | null; onAdd?: () => void; wide?: boolean }) {
  return (
    <div className={`group flex items-center gap-3.5 rounded-2xl border border-[#f0e3cc] bg-gradient-to-br from-[#fffdf8] to-[#fff6e3] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e0b94f] hover:shadow-[0_10px_24px_rgba(194,87,12,0.12)] ${wide ? "sm:col-span-2" : ""}`}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffe7b0] to-[#ffd27a] text-[#9a4b06] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a08b76]">{label}</p>
        {value ? (
          <p className="notranslate truncate text-[15px] font-semibold text-[#3e1815]" translate="no">{value}</p>
        ) : onAdd ? (
          <button type="button" onClick={onAdd} className="text-sm font-semibold text-[#e47105] hover:underline">{"+ Add"}</button>
        ) : (
          <p className="text-sm text-gray-400">{"Not added yet"}</p>
        )}
      </div>
    </div>
  );
}

function CardShell({ title, hint, action, children, className = "" }: { title: string; hint?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col overflow-hidden rounded-[28px] border border-[#e0b94f]/40 bg-white p-6 shadow-[0_16px_40px_rgba(107,31,31,0.08)] sm:p-8 ${className}`}>
      <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#e47105] via-[#ffd04f] to-[#e47105]" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#6b1f1f]">{title}</h2>
          <Ornament className="mt-2" />
          {hint && <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b]">{hint}</p>}
        </div>
        {action}
      </div>
      <div className="mt-5 flex flex-1 flex-col">{children}</div>
    </section>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="shrink-0 rounded-full border border-[#e0b94f] px-4 py-2 text-xs font-bold text-[#6b1f1f] transition-all hover:-translate-y-0.5 hover:bg-[#fff4d6]">
      {"Edit"}
    </button>
  );
}

/** A small pill saying whether one thing has been checked. */
function Check({ icon: Icon, ok, yes, no, action }: { icon: typeof Mail; ok: boolean; yes: string; no: string; action?: () => void }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors ${ok ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      <span>{ok ? yes : no}</span>
      {ok ? <BadgeCheck className="h-4 w-4 shrink-0 text-green-600" aria-label="Verified" /> : action ? <button type="button" onClick={action} className="rounded-full bg-[#e87722] px-2.5 py-0.5 text-[11px] font-bold text-white hover:opacity-90">{"Verify now"}</button> : <CircleDashed className="h-4 w-4 shrink-0 text-amber-500" aria-label="Not verified yet" />}
    </div>
  );
}

/** Name, email, phone and city as tiles, then three small marks that say how much of the account has been checked. */
export function DetailsCard({ account, onEdit, onVerifyPhone }: { account: Dashboard["account"]; onEdit: () => void; onVerifyPhone: () => void }) {
  return (
    <CardShell title="Details" action={<EditButton onClick={onEdit} />}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Tile icon={UserRound} label="Full name" value={account.fullName} />
        <Tile icon={MapPin} label="City" value={account.location} onAdd={onEdit} />
        <Tile icon={Mail} label="Email" value={account.email} wide />
        <Tile icon={Phone} label="Mobile" value={account.mobile ? `+91 ${account.mobile}` : null} wide />
      </div>
      <div className="mt-auto pt-6">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a08b76]">{"Verification"}</p>
        <div className="flex flex-wrap gap-2">
          <Check icon={Mail} ok={Boolean(account.emailVerified)} yes="Email verified" no="Email not verified" />
          <Check icon={Smartphone} ok={Boolean(account.mobileVerified)} yes="Phone verified" no="Phone not verified" action={onVerifyPhone} />
          <Check icon={ShieldCheck} ok={Boolean(account.isVerified)} yes="Verified by the team" no="Awaiting team verification" />
        </div>
      </div>
    </CardShell>
  );
}

/**
 * The places a person can be found. With none yet, a lively invitation: the six round logos float, and one button opens the
 * editor. With some, one tile per link (filled ones open the link; empty ones invite the person to add it).
 */
export function LinksCard({ account, onEdit }: { account: Dashboard["account"]; onEdit: () => void }) {
  const links = account.socialLinks ?? {};
  const filled = PLATFORMS.filter((p) => links[p.key]).length;

  if (filled === 0) {
    return (
      <CardShell title="Links" action={<EditButton onClick={onEdit} />}>
        <div className="flex flex-1 flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-[#e0b94f]/70 bg-gradient-to-b from-[#fffdf8] to-[#fff4dc] px-5 py-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3" aria-hidden>
            {PLATFORMS.map((p, i) => (
              <span key={p.key} className="gs-float flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg" style={{ background: p.colour, animationDelay: `${i * 0.35}s` }}>
                <p.icon size={22} />
              </span>
            ))}
          </div>
          <div>
            <p className="font-serif text-xl font-bold text-[#6b1f1f]">{"Let people find you"}</p>
            <p className="mx-auto mt-1.5 max-w-[320px] text-sm leading-relaxed text-[#6b6b6b]">{"Add your YouTube channel, Instagram or website. They appear on your profile and on your digital card."}</p>
          </div>
          <button type="button" onClick={onEdit} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f47700] to-[#ff9417] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(244,119,0,0.35)] transition-transform hover:-translate-y-0.5">
            <Plus className="h-4 w-4" aria-hidden />
            {"Add my links"}
          </button>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell title="Links" hint="These show on your profile and on your digital card." action={<EditButton onClick={onEdit} />}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {PLATFORMS.map((p) => {
          const href = links[p.key];
          const inner = (
            <>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]" style={{ background: href ? p.colour : "#d8cfc4" }}>
                <p.icon size={20} />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-sm font-bold text-[#3e1815]">{p.label}</span>
                <span className={`notranslate block truncate text-xs ${href ? "text-[#6b6b6b]" : "text-[#a39a92]"}`} translate="no">
                  {href ? href.replace(/^https?:\/\/(www\.)?/, "") : "Not added yet"}
                </span>
              </span>
              {href ? <Link2 className="h-4 w-4 shrink-0 text-[#e47105]" aria-hidden /> : <Plus className="h-4 w-4 shrink-0 text-[#a39a92]" aria-hidden />}
            </>
          );
          return (
            <li key={p.key}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="group flex items-center gap-3 rounded-2xl border border-[#eadfd2] bg-[#fffaf3] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e0b94f] hover:shadow-md">
                  {inner}
                </a>
              ) : (
                <button type="button" onClick={onEdit} className="group flex w-full items-center gap-3 rounded-2xl border border-dashed border-[#d8cfc4] p-3 transition-colors hover:border-[#e47105] hover:bg-[#fffaf3]">
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </CardShell>
  );
}
