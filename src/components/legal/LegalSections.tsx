import type { LegalSection } from "@/lib/legal/types";
import { cn } from "@/lib/utils";

/** The numbered sections of a policy: used on the full page and in the pop-up, so both read the same. */
export default function LegalSections({
  sections,
  compact = false,
  idPrefix = "",
}: {
  sections: LegalSection[];
  /** Smaller type and tighter spacing, for the pop-up. */
  compact?: boolean;
  /** Keeps section ids unique when more than one policy is on the screen. */
  idPrefix?: string;
}) {
  return (
    <>
      {sections.map((s, i) => (
        <section key={s.id} id={`${idPrefix}${s.id}`} className={cn("scroll-mt-[132px]", i > 0 && (compact ? "mt-6" : "mt-9"))}>
          <h2 className={cn("font-serif font-bold text-maroon", compact ? "text-lg" : "text-2xl")}>{`${i + 1}. ${s.title}`}</h2>
          <div className={cn("mt-3 flex flex-col gap-3 leading-relaxed text-[#444]", compact ? "text-sm" : "text-[15px]")}>
            {s.body.map((block, j) =>
              Array.isArray(block) ? (
                <ul key={j} className="list-disc space-y-1.5 pl-6 marker:text-[#e47105]">
                  {block.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={j}>{block}</p>
              ),
            )}
          </div>
        </section>
      ))}
    </>
  );
}
