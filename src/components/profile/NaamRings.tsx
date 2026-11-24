/**
 * Rings of the name "श्री श्याम" spreading outward from the photo, each ring a little larger, a little fainter and a little
 * blurrier than the one inside it, like a chant going out in waves. Draws only the rings; the photo sits on top of it, in the
 * middle. Everything is in a box 120 wide, with the centre at 0,0, so it scales to any size by the width given.
 *
 * It is pure SVG: it stays sharp at any size, it is saved with the card picture, and the rings turn slowly (each the other way
 * round to its neighbour) unless the visitor prefers less motion.
 */
const FONT = '"Noto Sans Devanagari","Nirmala UI","Mangal","Kohinoor Devanagari",sans-serif';
const WORD = "श्री श्याम";

// radius, text size, opacity, blur: all growing outward from the photo, which has a radius of about 22
const RINGS = [
  { r: 28.5, size: 6, o: 1, blur: 0 },
  { r: 35, size: 7.4, o: 0.92, blur: 0.15 },
  { r: 42.5, size: 9, o: 0.78, blur: 0.4 },
  { r: 50.5, size: 10.8, o: 0.6, blur: 0.8 },
  { r: 59, size: 12.8, o: 0.42, blur: 1.3 },
];

export default function NaamRings({ rings = 5, color = "#ffd66b", className = "", animate = true, id = "naam" }: { rings?: number; color?: string; className?: string; animate?: boolean; id?: string }) {
  const used = RINGS.slice(0, rings);
  return (
    <svg viewBox="-62 -62 124 124" aria-hidden="true" role="presentation" className={`${className} notranslate`} style={{ overflow: "visible" }}>
      <defs>
        {used.map((ring, i) => (
          <g key={i}>
            <path id={`${id}-p${i}`} d={`M ${-ring.r} 0 a ${ring.r} ${ring.r} 0 1 1 ${ring.r * 2} 0 a ${ring.r} ${ring.r} 0 1 1 ${-ring.r * 2} 0`} />
            {ring.blur > 0 && (
              <filter id={`${id}-f${i}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation={ring.blur} />
              </filter>
            )}
          </g>
        ))}
      </defs>
      {used.map((ring, i) => {
        const circumference = 2 * Math.PI * ring.r;
        const repeats = Math.max(4, Math.round(circumference / (ring.size * 4.4)));
        return (
          <g key={i} className={animate ? (i % 2 ? "gs-spin-slow-rev" : "gs-spin-slow") : undefined} filter={ring.blur > 0 ? `url(#${id}-f${i})` : undefined} style={{ animationDuration: `${70 + i * 18}s` }}>
            <text fill={color} fillOpacity={ring.o} fontFamily={FONT} fontWeight={800} fontSize={ring.size} className="notranslate">
              <textPath href={`#${id}-p${i}`} textLength={circumference - 1} lengthAdjust="spacing">
                {Array.from({ length: repeats }, () => WORD).join("  ")}
              </textPath>
            </text>
          </g>
        );
      })}
    </svg>
  );
}
