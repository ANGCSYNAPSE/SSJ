"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const GATE = "/hero/final-day-gate.png";

/**
 * "Get the App" popup: a phone floats in the middle; on its screen the website's
 * front page (the gateway) opens like a pair of doors and "Coming Soon" shines
 * through. The loop is plain CSS (one 8s timeline), and stops for visitors who
 * ask their device for reduced motion — the doors then simply stay open.
 */
export default function AppComingSoonDialog({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12060a]/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <style>{`
        @keyframes app-float { 0%,100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-12px) rotate(1.5deg); } }
        @keyframes app-door-l { 0%,14% { transform: translateX(0); } 34%,84% { transform: translateX(-102%); } 98%,100% { transform: translateX(0); } }
        @keyframes app-door-r { 0%,14% { transform: translateX(0); } 34%,84% { transform: translateX(102%); } 98%,100% { transform: translateX(0); } }
        @keyframes app-dim { 0%,10% { opacity: 1; } 22%,88% { opacity: .1; } 100% { opacity: 1; } }
        @keyframes app-soon { 0%,22% { opacity: 0; transform: scale(.85); } 38%,82% { opacity: 1; transform: scale(1); } 92%,100% { opacity: 0; transform: scale(.85); } }
        @keyframes app-glow { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        .app-phone { animation: app-float 6s ease-in-out infinite; }
        .app-door-l { animation: app-door-l 8s cubic-bezier(.65,0,.35,1) infinite; }
        .app-door-r { animation: app-door-r 8s cubic-bezier(.65,0,.35,1) infinite; }
        .app-dim { animation: app-dim 8s ease-in-out infinite; }
        .app-soon { animation: app-soon 8s ease-in-out infinite; }
        .app-glow { animation: app-glow 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .app-phone, .app-door-l, .app-door-r, .app-dim, .app-soon, .app-glow { animation: none; }
          .app-door-l { transform: translateX(-102%); }
          .app-door-r { transform: translateX(102%); }
          .app-dim { opacity: .1; }
          .app-soon { opacity: 1; }
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shyam Jagat app, coming soon"
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[420px] flex-col items-center gap-5 rounded-3xl border border-[#d4af37]/40 bg-gradient-to-b from-[#fff8ec] to-[#fde9c8] px-6 pb-7 pt-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-maroon transition-colors hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Phone: a miniature of the home page hero, whose gate opens to show Coming Soon */}
        <div className="app-phone relative h-[440px] w-[214px] rounded-[38px] bg-[#1b1b1f] p-[9px] shadow-[0_24px_50px_rgba(62,24,21,0.45),inset_0_0_0_2px_#3a3a40]">
          <div className="absolute left-1/2 top-[13px] z-40 h-[17px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
          <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-[#06183f]">
            {/* Mini header, like the site's */}
            <div className="relative z-30 flex h-[34px] items-end justify-between bg-white px-3 pb-1">
              <span className="font-serif text-[11px] font-bold leading-none text-maroon">श्याम जगत</span>
              <span className="mb-0.5 h-3 w-3 rounded bg-[#e47105]" />
            </div>

            {/* The gate picture, full width, as in the mobile hero (top of the hero) */}
            <div className="relative" style={{ aspectRatio: "1672 / 941" }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,#3f86e0_0%,#1d4e9a_60%,#0b2a63_100%)]" />
              <div className="app-door-l absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-[192px] bg-cover bg-center" style={{ backgroundImage: `url(${GATE})` }} />
              </div>
              <div className="app-door-r absolute inset-y-0 right-0 z-10 w-1/2 overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-[192px] bg-cover bg-center" style={{ backgroundImage: `url(${GATE})` }} />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-[#06183f] to-transparent" />
            </div>

            {/* The hero content under the gate, same as the real mobile hero */}
            <div className="app-dim flex flex-col items-center gap-2 px-3 pt-1 text-center">
              <span className="font-serif text-[18px] font-extrabold leading-tight text-white">
                <span className="text-[#ff9b19]">सहयोग</span> सेवा <span className="text-[#ffd04f]">समर्पण</span>
              </span>
              <span className="text-[7.5px] font-semibold leading-snug text-white/90">
                Shree Shyam Jagat is a platform dedicated to spreading devotion and serving humanity
              </span>
              <span className="rounded-lg bg-gradient-to-r from-[#f47700] to-[#ff9417] px-3.5 py-1.5 text-[8.5px] font-bold text-white">
                Become a Member
              </span>
              <div className="mt-1 grid w-full grid-cols-2 gap-1.5">
                {["Devotees", "Seva", "Temples", "States"].map((s) => (
                  <span key={s} className="rounded-md border border-white/25 bg-[#0b3970]/60 py-1.5 text-[8px] font-bold text-white">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Coming Soon, in the middle of the screen once the gate has opened */}
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
              <div className="app-glow absolute h-36 w-36 rounded-full bg-[#ffb347]/35 blur-2xl" />
              <div className="app-soon relative flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold tracking-[0.3em] text-[#ffd66b] [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                  SHYAM JAGAT
                </span>
                <span className="bg-gradient-to-b from-[#fff3c4] via-[#ffc94d] to-[#f08a00] bg-clip-text font-serif text-[34px] font-extrabold leading-[1.05] text-transparent [filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.7))]">
                  Coming
                  <br />
                  Soon
                </span>
                <span className="h-[2px] w-12 rounded-full bg-[#ffd66b]" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="font-serif text-2xl font-bold text-maroon">Our app is on its way</h2>
          <p className="text-sm leading-relaxed text-[#595656]">
            We are building the Shyam Jagat app so you can stay close to Baba Shyam, wherever you are. It is coming soon.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-8 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(244,119,0,0.35)] transition-transform hover:-translate-y-0.5"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body,
  );
}
