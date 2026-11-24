"use client";

import { useRef } from "react";
import Image from "next/image";
import { BadgeCheck, Calendar, Camera, HandHeart, Loader2, MapPin, Pencil, QrCode, ShieldCheck } from "lucide-react";
import NaamRings from "@/components/profile/NaamRings";
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

/**
 * The top of the profile, in the style of a phone app's profile: a photograph of the temple at dusk as the banner, two round
 * buttons in the corner (edit, my card), the person's photo in the middle with the name "श्री श्याम" going out from it in rings,
 * then their name, city, what they are on Shyam Jagat, a line about them and their links. The card of numbers that overlaps the
 * banner's foot is drawn by the page, just below.
 */
export default function ProfileHero({
  data,
  kinds,
  onEdit,
  onCard,
  onPhoto,
  uploading,
  photoError,
}: {
  data: Dashboard;
  kinds: string[];
  onEdit: () => void;
  onCard: () => void;
  onPhoto: (file: File) => void;
  uploading: boolean;
  photoError: string | null;
}) {
  const { account } = data;
  const input = useRef<HTMLInputElement>(null);
  const joined = new Date(account.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <section className="relative isolate overflow-hidden px-4 pb-28 pt-6 text-white sm:px-6 lg:pb-32 lg:pt-8">
      {/* the banner: the temple at dusk, under a deep wash so the words stay clear */}
      <Image src="/images/baba-shyam/abode/evening.png" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[50%_28%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1b0707]/55 via-[#3a0f0f]/70 to-[#2a0a0a]/95" />
      <SevaPetals count={8} />

      {/* the two round buttons in the corner */}
      <div className="mx-auto flex max-w-[1240px] justify-end gap-2.5">
        <button type="button" onClick={onCard} aria-label="My digital card" title="My digital card" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/25">
          <QrCode className="h-5 w-5" aria-hidden />
        </button>
        <button type="button" onClick={onEdit} aria-label="Edit profile" title="Edit profile" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/25">
          <Pencil className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
        {/* the photo, with the name "श्री श्याम" going out from it in rings */}
        <div className="relative -mt-3 h-[260px] w-[260px] shrink-0 sm:h-[310px] sm:w-[310px]">
          <NaamRings className="pointer-events-none absolute inset-0 h-full w-full" id="hero-naam" />
          <div className="absolute left-1/2 top-1/2 aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2">
            <div className="h-full w-full rounded-full bg-gradient-to-br from-[#ffe08a] via-[#e0b94f] to-[#b8860b] p-[4px] shadow-[0_18px_44px_rgba(0,0,0,0.5)]">
              {account.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={account.avatarUrl} alt={account.fullName} className="h-full w-full rounded-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#fdf0d5] font-serif text-4xl font-bold text-[#7a1f1f] sm:text-5xl">{initialsOf(account.fullName)}</div>
              )}
            </div>
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/55">
                <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
              </div>
            )}
            <button type="button" onClick={() => input.current?.click()} disabled={uploading} aria-label="Change profile photo" className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#3a0f0f] bg-[#f47700] text-white shadow-lg transition-transform hover:scale-110 disabled:opacity-60">
              <Camera className="h-[18px] w-[18px]" aria-hidden />
            </button>
          </div>
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

        <p className="-mt-4 text-sm font-semibold tracking-wide text-[#ffd66b]">{"|| Jai Shri Shyam ||"}</p>
        <h1 className="notranslate mt-1 break-words font-serif text-4xl font-bold leading-[1.1] sm:text-5xl" translate="no">
          {account.fullName}
        </h1>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white/85">
          {account.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#ffd66b]" aria-hidden />
              <span className="notranslate" translate="no">{account.location}</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-[#ffd66b]" aria-hidden />
            {"Since "}{joined}
          </span>
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
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

        {account.bio ? (
          <p className="mt-4 max-w-[560px] font-serif text-lg italic leading-relaxed text-white/95">&ldquo;{account.bio}&rdquo;</p>
        ) : (
          <button type="button" onClick={onEdit} className="mt-4 text-sm font-semibold text-[#ffd66b] underline-offset-4 hover:underline">
            {"+ Write a line about yourself"}
          </button>
        )}

        <SocialIcons links={account.socialLinks} className="mt-5 justify-center" />
        {photoError && <p className="mt-3 rounded-lg bg-red-500/25 px-3 py-2 text-sm text-white">{photoError}</p>}
      </div>
    </section>
  );
}
