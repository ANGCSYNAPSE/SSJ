/**
 * Marigold petals drifting down behind a section. Purely decoration: it carries no meaning, is hidden from screen readers,
 * never takes a click, and stops for people who prefer less motion. The petals' positions come from their number (not from
 * Math.random), so the server and the browser draw the same thing.
 */
const COLOURS = ["#ffb347", "#ff8c1a", "#f9d65c", "#ff6f61", "#ffd9a0"];

export default function SevaPetals({ count = 16, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const size = 9 + ((i * 7) % 5) * 4;
        return (
          <span
            key={i}
            className="gs-petal"
            style={
              {
                left: `${(i * 37 + 11) % 100}%`,
                width: size,
                height: size,
                background: COLOURS[i % COLOURS.length],
                opacity: 0.75,
                "--dur": `${10 + ((i * 3) % 7) * 2}s`,
                "--delay": `-${(i * 1.7) % 12}s`,
                "--sway": `${((i % 2 ? 1 : -1) * (24 + ((i * 11) % 40)))}px`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

/** A small oil lamp with a flickering flame: a quiet devotional mark for headings. */
export function Diya({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <radialGradient id="gs-flame-fill" cx="50%" cy="70%" r="60%">
          <stop offset="0" stopColor="#fff6c8" />
          <stop offset="0.55" stopColor="#ffb02e" />
          <stop offset="1" stopColor="#ff6a00" />
        </radialGradient>
      </defs>
      <g className="gs-flame">
        <path d="M24 4c4 6 7 9 7 14a7 7 0 0 1-14 0c0-5 3-8 7-14z" fill="url(#gs-flame-fill)" />
      </g>
      <path d="M6 28h36c0 8-7.5 14-18 14S6 36 6 28z" fill="#c2570c" />
      <path d="M6 28h36" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="24" cy="28" rx="18" ry="3" fill="#8a3b06" />
    </svg>
  );
}
