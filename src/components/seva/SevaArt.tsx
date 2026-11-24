import { Mandala, SEVA_ICONS } from "@/components/seva/DharmaIcons";
import type { SevaType } from "@/lib/data/seva";

const GOLD = "#f6dc8c";
/** The one special seva is drawn light, in deep gold on cream, so it stands apart from the coloured ones. */
const DEEP_GOLD = "#a8730a";

/**
 * The artwork of a seva, in a devotional style: a deep, rich colour of its own, a slowly turning mandala of lotus petals,
 * and the seva's symbol in gold line-work inside a temple arch (a jharokha), standing on a small plinth. It is drawn, not
 * photographed, so every card is clear at a glance and none repeats a picture used elsewhere on the site.
 *
 * It scales with the box it sits in (cqw and cqh), so the same art works as a small tile or as a wide banner. The box needs a
 * width and a height (aspect ratio, h-* or inset-0). The drawing keeps to the top of the box and is centred, so a tile can
 * lay its title along the bottom without touching it.
 */
export default function SevaArt({ seva, className = "", float = true }: { seva: SevaType; className?: string; float?: boolean }) {
  const [light, deep] = seva.tone;
  const Icon = SEVA_ICONS[seva.icon];
  const lightLook = !!seva.special;
  const ink = lightLook ? DEEP_GOLD : GOLD;
  return (
    <div
      aria-hidden
      className={`${/\babsolute\b/.test(className) ? "" : "relative"} overflow-hidden ${className}`}
      style={{
        containerType: "size",
        background: lightLook ? "radial-gradient(110% 85% at 50% 38%, #fffdf6 0%, #fbeec8 58%, #efd18a 125%)" : `radial-gradient(110% 85% at 50% 38%, ${light} 0%, ${deep} 62%, #2a0a0a 130%)`,
      }}
    >
      <div className="absolute inset-0" style={{ ["--u" as string]: "min(1cqw, 1cqh)" }}>
        {/* a fine dot grid across the whole box */}
        <span className="absolute inset-0 opacity-60" style={{ backgroundImage: lightLook ? "radial-gradient(rgba(168,115,10,0.30) 1px, transparent 1.3px)" : "radial-gradient(rgba(255,235,170,0.35) 1px, transparent 1.3px)", backgroundSize: "15px 15px" }} />

        {/* the mandala, turning very slowly */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2" style={{ width: "calc(var(--u) * 100)", height: "calc(var(--u) * 100)", color: ink }}>
          <Mandala className={`absolute left-0 top-0 h-full w-full opacity-45 ${float ? "gs-spin-slow" : ""}`} />
        </div>

        {/* the temple arch and its plinth */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMin meet" className="absolute inset-0 h-full w-full" fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
          <path d="M31 74V47a19 19 0 0 1 38 0v27z" fill={lightLook ? "rgba(168,115,10,0.07)" : "rgba(255,255,255,0.10)"} strokeWidth="1.1" />
          <path d="M34.500 74V47a15.500 15.500 0 0 1 31 0v27" strokeWidth="0.45" opacity="0.7" />
          <path d="M26 74h48M28.500 77h43" strokeWidth="1" />
          <path d="M50 24.500v-3.500M48.200 21.800h3.600" strokeWidth="0.9" />
        </svg>

        {/* the symbol, in the middle of the arch */}
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: "calc(var(--u) * 52)", width: "calc(var(--u) * 31)", height: "calc(var(--u) * 31)", color: ink }}>
          <Icon className={`h-full w-full ${lightLook ? "" : "drop-shadow-[0_0_6px_rgba(255,214,120,0.55)]"}`} />
        </div>
      </div>
    </div>
  );
}
