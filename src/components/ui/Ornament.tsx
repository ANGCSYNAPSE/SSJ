/**
 * The divider under a section heading: two fading lines with a small lotus-diamond between them, in place of a plain bar.
 * It takes its colour from the text colour (set it with className, e.g. "text-[#ffb347]"), and sits wherever its parent aligns it.
 */
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex h-4 w-[132px] shrink-0 items-center gap-1.5 text-[#e47105] ${className}`}>
      <span className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-transparent to-current opacity-80" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
        <path d="M12 1.5l3 7.5 7.5 3-7.5 3-3 7.5-3-7.5-7.5-3 7.5-3z" />
        <circle cx="12" cy="12" r="2.2" fill="#fff" />
      </svg>
      <span className="h-[2px] flex-1 rounded-full bg-gradient-to-l from-transparent to-current opacity-80" />
    </span>
  );
}
