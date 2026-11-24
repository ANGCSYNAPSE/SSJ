"use client";

import { useRef } from "react";
import { BadgeCheck, Calendar, Camera, HandHeart, Loader2, MapPin, Pencil, QrCode, ShieldCheck } from "lucide-react";
import { Mandala } from "@/components/seva/DharmaIcons";
import SevaPetals from "@/components/seva/SevaPetals";
import { SocialIcons } from "@/components/profile/socialLinks";
import type { Dashboard } from "@/lib/api";

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/** A circular progress ring with the percentage in the middle. */
function Ring({ percent }: { percent: number }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[96px] w-[96px] shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#ring-g)" strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (percent / 100) * c} style={{ transition: "stroke-dashoffset 1s ease" }} />
        <defs>
          <linearGradient id="ring-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffd04f" />
            <stop offset="1" stopColor="#ff8c1a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-2xl font-bold leading-none">{percent}%</span>
      </div>
    </div>
  );
}

/**
 * The top of the profile: a deep maroon-and-saffron banner with a slowly turning mandala, the person's photo in a gold ring (with
 * a camera button to change it), their name, what they are on Shyam Jagat, a line about them, their links, and how complete
 * their profile is.
 */
export default function ProfileHero({
  data,
  kinds,
  onEdit,
  onPhoto,
  uploading,
  photoError,
}: {
  data: Dashboard;
  kinds: string[];
  onEdit: () => void;
  onPhoto: (file: File) => void;
  uploading: boolean;
  photoError: string | null;
}) {
  const { account, completion } = data;
  const input = useRef<HTMLInputElement>(null);
  const joined = new Date(account.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const todo = completion.missingAccount.map((k) => (k === "avatarUrl" ? "Add a profile photo" : k === "location" ? "Add your city" : k));
  if (!account.bio) todo.push("Write a line about yourself");

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#2e0a0a] via-[#6b1f1f] to-[#c2570c] px-6 pb-28 pt-12 text-white lg:px-[88px] lg:pb-32 lg:pt-14">
      <Mandala className="gs-spin-slow pointer-events-none absolute -right-28 -top-36 -z-10 h-[560px] w-[560px] text-[#ffe9a8]/25" />
      <Mandala petals={12} className="hl-spin-rev pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[440px] w-[440px] text-white/15" />
      <SevaPetals count={9} />

      <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
        {/* the photo */}
        <div className="relative mx-auto h-[168px] w-[168px] shrink-0 lg:mx-0">
          <span aria-hidden className="absolute -inset-2.5 rounded-full border border-dashed border-[#ffe08a]/50" />
          <div className="h-full w-full rounded-full bg-gradient-to-br from-[#ffe08a] via-[#e0b94f] to-[#b8860b] p-[5px] shadow-[0_18px_44px_rgba(0,0,0,0.45)]">
            {account.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={account.avatarUrl} alt={account.fullName} className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#fdf0d5] font-serif text-6xl font-bold text-[#7a1f1f]">{initialsOf(account.fullName)}</div>
            )}
            {uploading && (
              <div className="absolute inset-[5px] flex items-center justify-center rounded-full bg-black/55">
                <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={uploading}
            aria-label="Change profile photo"
            className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#6b1f1f] bg-[#f47700] text-white shadow-lg transition-transform hover:scale-110 disabled:opacity-60"
          >
            <Camera className="h-5 w-5" aria-hidden />
          </button>
          <input
            ref={input}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) onPhoto(file);
            }}
          />
        </div>

        {/* who they are */}
        <div className="min-w-0 text-center lg:text-left">
          <p className="text-sm font-semibold tracking-wide text-[#ffd66b]">{"|| Jai Shri Shyam ||"}</p>
          <h1 className="notranslate mt-1 break-words font-serif text-4xl font-bold leading-[1.1] sm:text-5xl" translate="no">
            {account.fullName}
          </h1>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-bold lg:justify-start">
            {account.isMember && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffd66b] px-3.5 py-1.5 text-[#4a1414]">
                <BadgeCheck className="h-4 w-4" aria-hidden /> Member
              </span>
            )}
            {account.isVerified && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/90 px-3.5 py-1.5 text-white">
                <ShieldCheck className="h-4 w-4" aria-hidden /> Verified
              </span>
            )}
            {data.volunteer && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ffd66b]/60 bg-white/10 px-3.5 py-1.5 text-[#ffe9b0]">
                <HandHeart className="h-4 w-4" aria-hidden /> Volunteer
              </span>
            )}
            {kinds.map((k) => (
              <span key={k} className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-white">
                {k}
              </span>
            ))}
          </div>

          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-white/85 lg:justify-start">
            {account.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#ffd66b]" aria-hidden />
                <span className="notranslate" translate="no">{account.location}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#ffd66b]" aria-hidden />
              {"With Shyam Jagat since "}{joined}
            </span>
          </p>

          {account.bio ? (
            <p className="mx-auto mt-4 max-w-[620px] border-l-2 border-[#ffd66b]/70 pl-4 text-left font-serif text-lg italic leading-relaxed text-white/95 lg:mx-0">{account.bio}</p>
          ) : (
            <button type="button" onClick={onEdit} className="mt-4 text-sm font-semibold text-[#ffd66b] underline-offset-4 hover:underline">
              {"+ Write a line about yourself"}
            </button>
          )}

          <SocialIcons links={account.socialLinks} className="mt-5 justify-center lg:justify-start" />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button type="button" onClick={onEdit} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f47700] to-[#ff9417] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_26px_rgba(244,119,0,0.45)] transition-transform hover:-translate-y-0.5">
              <Pencil className="h-4 w-4" aria-hidden />
              {"Edit profile"}
            </button>
            <a href="#my-card" className="inline-flex items-center gap-2 rounded-full border-2 border-[#ffd66b]/80 bg-white/10 px-6 py-[10px] text-sm font-bold text-[#ffe9b0] backdrop-blur transition-colors hover:bg-[#ffd66b] hover:text-[#4a1414]">
              <QrCode className="h-4 w-4" aria-hidden />
              {"My digital card"}
            </a>
          </div>
          {photoError && <p className="mt-3 rounded-lg bg-red-500/25 px-3 py-2 text-sm text-white">{photoError}</p>}
        </div>

        {/* how complete it is */}
        <div className="mx-auto w-full max-w-[300px] rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-md lg:mx-0">
          <div className="flex items-center gap-4">
            <Ring percent={completion.percent} />
            <div>
              <p className="text-sm font-bold">{"Profile completion"}</p>
              <p className="mt-0.5 text-xs text-white/80">{completion.percent >= 100 ? "Everything is filled in. Thank you." : "A complete profile helps people trust your card."}</p>
            </div>
          </div>
          {todo.length > 0 && (
            <ul className="mt-4 flex flex-col gap-1.5 border-t border-white/15 pt-3 text-xs text-white/90">
              {todo.slice(0, 3).map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffd04f]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
