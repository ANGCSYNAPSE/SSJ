"use client";

import { useState } from "react";
import { ExternalLink, Pause, Play } from "lucide-react";

export interface Bhajan {
  title: string;
  hindi: string;
  artist: string;
  /** The YouTube video, on the artist's own or the label's channel. */
  youtubeId: string;
  channel: string;
}

function Waveform({ seed, live }: { seed: number; live: boolean }) {
  const bars = Array.from({ length: 22 }, (_, i) => 4 + ((seed * (i + 3) * 37) % 20));
  return (
    <div className="flex h-6 items-center gap-[2px] pt-1" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-sm bg-[#d4a017] ${live ? "animate-pulse" : ""}`}
          style={{ height: `${h}px`, animationDelay: live ? `${(i % 7) * 90}ms` : undefined, animationDuration: live ? `${700 + (i % 5) * 120}ms` : undefined }}
        />
      ))}
    </div>
  );
}

/**
 * The bhajans of the "Bhajans & Spiritual Wisdom" section: press play and the bhajan plays right there, from the artist's own
 * channel on YouTube (nothing is copied to this site). One plays at a time; the card of the one playing opens its player.
 */
export default function BhajanPlayer({ bhajans }: { bhajans: Bhajan[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {bhajans.map((b, i) => {
        const on = playing === b.youtubeId;
        return (
          <div key={b.youtubeId} className={`flex flex-col gap-4 rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${on ? "border-[#d4a017] bg-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.3)]" : "border-transparent bg-white/5 hover:-translate-y-1 hover:bg-white/10"}`}>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setPlaying(on ? null : b.youtubeId)}
                aria-label={on ? `Close ${b.title}` : `Play ${b.title}`}
                aria-pressed={on}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d4a017] text-maroon shadow-[0_8px_20px_rgba(212,160,23,0.35)] transition-transform hover:scale-110 active:scale-95"
              >
                {on ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="ml-0.5 h-5 w-5" aria-hidden />}
              </button>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="font-serif text-xl font-bold leading-snug text-white">{b.title}</p>
                <p className="notranslate hindi-sub text-sm text-[#f3dfb0]/80" translate="no">{b.hindi}</p>
                <p className="text-xs text-[#d4a017]/90">{b.artist}</p>
                <Waveform seed={i + 1} live={on} />
              </div>
            </div>

            {on && (
              <div className="gs-slide flex flex-col gap-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#d4a017]/40 bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${b.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${b.title} by ${b.artist}`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <a href={`https://www.youtube.com/watch?v=${b.youtubeId}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 self-end text-xs font-semibold text-[#d4a017] hover:underline">
                  {`Watch on ${b.channel} on YouTube`} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
