import { Ambulance, BookOpen, HandHeart, HeartPulse, Home } from "lucide-react";

/**
 * The line-drawn symbols of our seva, all in one stroke style so they sit together: a thali of food, the face of a cow, a
 * kalash of water, a pair of paduka (the wooden sandals), the lamp, and so on. They take their colour from the text colour.
 */
export type SevaIcon = "thali" | "cow" | "book" | "kalash" | "paduka" | "health" | "ambulance" | "elder" | "shelter" | "diya";

type IconProps = { className?: string };

const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** A thali seen from above: the plate, three small bowls, and steam rising. */
function Thali({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="12" cy="14.5" r="8" />
      <circle cx="12" cy="14.5" r="5.8" />
      <circle cx="12" cy="11.8" r="1.5" />
      <circle cx="9.4" cy="16.3" r="1.5" />
      <circle cx="14.6" cy="16.3" r="1.5" />
      <path d="M8.5 2.5c-.9 1 .9 1.7 0 2.8M12 1.5c-.9 1 .9 1.7 0 2.8M15.5 2.5c-.9 1 .9 1.7 0 2.8" />
    </svg>
  );
}

/** The face of a cow, with its horns and ears. */
function Cow({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M7.5 8C7.5 6.6 9 6 12 6s4.500.6 4.500 2l-.4 4.600c-.1 1.400.9 2.900.9 4.900 0 2.200-2 3.500-5 3.500s-5-1.300-5-3.500c0-2 1-3.500.9-4.900z" />
      <path d="M7.700 8.500 3.500 7.200c-.5 1.700 1.100 3.500 4 3.800M16.300 8.500l4.200-1.300c.5 1.700-1.100 3.500-4 3.800" />
      <path d="M8.800 6.500C8 4.600 6.800 3.500 5 3.500M15.200 6.500C16 4.600 17.200 3.500 19 3.500" />
      <ellipse cx="12" cy="17.300" rx="3.200" ry="2" />
      <path d="M10.900 17.300h.01M13.100 17.300h.01M9.600 11.600h.01M14.400 11.600h.01" strokeWidth="2.200" />
    </svg>
  );
}

/** A kalash: the pot of water with mango leaves and a coconut. */
function Kalash({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M8 9.500c-2 1.400-3 3.300-3 5.500 0 3.300 3 5.500 7 5.500s7-2.200 7-5.500c0-2.200-1-4.100-3-5.500" />
      <path d="M8.500 9.500h7M9.200 7.500h5.600v2H9.200z" />
      <circle cx="12" cy="4.600" r="2" />
      <path d="M9.200 7.500C7.600 6.600 6.500 5.500 6 3.500M14.800 7.500c1.600-.9 2.700-2 3.200-4" />
      <path d="M12 12.800c1 1.200 1.700 2.100 1.700 2.900a1.700 1.700 0 0 1-3.400 0c0-.8.700-1.700 1.700-2.900z" />
    </svg>
  );
}

/** Paduka: a pair of wooden sandals, each with its small knob. */
function Paduka({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <g transform="rotate(-7 7.500 12)">
        <path d="M7.500 21c-1.900 0-2.800-1.600-2.300-4.200l1.200-6.900c.4-2.200 1.200-3.300 2.200-3.300s1.800 1.100 2.200 3.300l1 6.900c.4 2.600-.4 4.200-2.300 4.200z" />
        <circle cx="7.600" cy="8.600" r="1" />
      </g>
      <g transform="rotate(7 16.500 12)">
        <path d="M16.500 21c1.900 0 2.800-1.600 2.300-4.200l-1.200-6.900c-.4-2.200-1.200-3.300-2.200-3.300s-1.800 1.100-2.200 3.300l-1 6.900c-.4 2.600.4 4.200 2.300 4.200z" />
        <circle cx="16.400" cy="8.600" r="1" />
      </g>
    </svg>
  );
}

/** An oil lamp with its flame. */
function Diya({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M12 2.500c2.600 3 3.600 4.600 3.600 6.600a3.600 3.600 0 0 1-7.200 0c0-2 1-3.600 3.600-6.600z" />
      <path d="M12 8.500v2" />
      <path d="M3 13.500h18c0 4.200-3.600 7-9 7s-9-2.800-9-7z" />
      <path d="M8 21.500h8" />
    </svg>
  );
}

const lucide = (Icon: typeof BookOpen) =>
  function LucideIcon({ className }: IconProps) {
    return <Icon className={className} strokeWidth={1.4} aria-hidden />;
  };

export const SEVA_ICONS: Record<SevaIcon, (props: IconProps) => JSX.Element> = {
  thali: Thali,
  cow: Cow,
  book: lucide(BookOpen),
  kalash: Kalash,
  paduka: Paduka,
  health: lucide(HeartPulse),
  ambulance: lucide(Ambulance),
  elder: lucide(HandHeart),
  shelter: lucide(Home),
  diya: Diya,
};

/** A mandala of lotus petals: rings and petals in a thin line, drawn from the centre. Colour comes from the text colour. */
export function Mandala({ className = "", petals = 16 }: { className?: string; petals?: number }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="0.45" aria-hidden>
      <circle cx="50" cy="50" r="48" strokeDasharray="1 2.200" />
      <circle cx="50" cy="50" r="41" />
      <circle cx="50" cy="50" r="23" />
      {Array.from({ length: petals }, (_, i) => (
        <g key={i} transform={`rotate(${(360 / petals) * i} 50 50)`}>
          <path d="M50 9c4.200 7 4.200 14 0 20-4.200-6-4.200-13 0-20z" />
          <path d="M50 29c2 4 2 8 0 11-2-3-2-7 0-11z" />
        </g>
      ))}
    </svg>
  );
}
