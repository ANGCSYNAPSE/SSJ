const WORDS = ["Jai Shree Shyam", "Annadan", "Gau Seva", "Jal Seva", "Bal Vidya", "Juta Seva", "Health Care", "Haare Ka Sahara"];

/**
 * A slow, endless ribbon of the words of our seva. It is a tilted saffron strip that crosses between two sections, the way
 * a festival banner is strung across a street. Hover to pause. Decoration only: it is hidden from screen readers, and it
 * stands still for people who prefer less motion.
 */
export default function TickerBand({ className = "" }: { className?: string }) {
  const row = (
    <ul className="flex shrink-0 items-center">
      {WORDS.map((word) => (
        <li key={word} className="flex items-center gap-6 pr-6 font-serif text-xl font-bold tracking-wide text-white sm:text-2xl">
          {word}
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#ffe08a]" fill="currentColor" aria-hidden>
            <path d="M12 1.5l3 7.5 7.5 3-7.5 3-3 7.5-3-7.5-7.5-3 7.5-3z" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden data-no-reveal className={`relative z-10 overflow-hidden py-5 ${className}`}>
      <div className="-mx-4 -rotate-[1.2deg] bg-gradient-to-r from-[#c2570c] via-[#e87722] to-[#c2570c] py-3.5 shadow-[0_10px_30px_rgba(194,87,12,0.35)]">
        <div className="gs-marquee flex w-max hover:[animation-play-state:paused]">
          {row}
          {row}
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
