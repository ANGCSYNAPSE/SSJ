"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { LIVE_DARSHAN_URL } from "@/lib/data/darshan";

interface Darshan {
  live: boolean;
  videoId: string;
  title: string;
  embeddable: boolean;
}

/** Shown straight away, until the temple's channel has been asked: the latest aarti we know of. */
const FIRST: Darshan = { live: false, videoId: "6n5ag4iptcY", title: "Live प्रातः श्रृंगार आरती - श्री श्याम दर्शन", embeddable: true };

/**
 * The darshan player. While the temple is streaming an aarti live on its YouTube channel, that live stream is shown (with a
 * red LIVE NOW mark); at any other time the latest aarti from the channel is shown instead. The page asks every minute, so
 * the live stream appears by itself when an aarti starts. The video loads only when the visitor presses play.
 */
export default function LiveDarshanCard({ className = "" }: { className?: string }) {
  const [darshan, setDarshan] = useState<Darshan>(FIRST);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const ask = () =>
      fetch("/api/darshan")
        .then((res) => (res.ok ? res.json() : null))
        .then((data: Darshan | null) => {
          if (cancelled || !data?.videoId) return;
          // A video that is already playing is not swapped from under the visitor.
          setDarshan((current) => (playing && current.videoId !== data.videoId ? current : data));
        })
        .catch(() => undefined);
    void ask();
    const timer = window.setInterval(() => {
      if (!document.hidden) void ask();
    }, 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [playing]);

  const watchUrl = darshan.live ? LIVE_DARSHAN_URL : `https://www.youtube.com/watch?v=${darshan.videoId}`;

  return (
    <div className={`w-full overflow-hidden rounded-2xl bg-white text-[#3e1815] ${className}`}>
      <div className="relative aspect-video w-full bg-black">
        {playing && darshan.embeddable ? (
          <iframe
            key={darshan.videoId}
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${darshan.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={darshan.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <a
            href={darshan.embeddable ? undefined : watchUrl}
            target={darshan.embeddable ? undefined : "_blank"}
            rel="noopener noreferrer"
            onClick={darshan.embeddable ? () => setPlaying(true) : undefined}
            role={darshan.embeddable ? "button" : undefined}
            tabIndex={0}
            aria-label="Play the aarti darshan"
            className="group absolute inset-0 block cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${darshan.videoId}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/25">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e47105] shadow-xl transition-transform group-hover:scale-110">
                <Play className="ml-1 h-7 w-7 fill-white text-white" aria-hidden />
              </span>
            </span>
          </a>
        )}

        <span
          className={`pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg ${darshan.live ? "bg-red-600" : "bg-black/70"}`}
        >
          {darshan.live && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
          )}
          {darshan.live ? "Aarti now" : "Latest aarti"}
        </span>
      </div>

      <div className="p-6 text-center lg:p-7">
        <h3 className="font-serif text-2xl font-extrabold leading-tight">{"Aarti Darshan"}</h3>
        <p className="notranslate mt-2 text-sm font-medium text-[#6b4f4f]" translate="no">
          {darshan.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#6b4f4f]">
          {darshan.live
            ? "The aarti is being streamed live from Shri Shyam Mandir, Khatushyamji."
            : "The latest aarti from Shri Shyam Mandir, Khatushyamji. When the next aarti begins, it appears here by itself."}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#e47105] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-90"
          >
            {"Watch on YouTube"}
          </a>
        </div>
      </div>
    </div>
  );
}
