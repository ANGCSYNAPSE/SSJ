import Link from "next/link";
import Container from "@/components/ui/Container";
import { CONTACT, SITE } from "@/lib/constants";

export interface LegalSection {
  id: string;
  title: string;
  /** Paragraphs and bullet lists, in order. A string is a paragraph; an array is a bullet list. */
  body: (string | string[])[];
}

/** Dates are written out in full so they can never be misread. */
export const LEGAL_UPDATED = "20 November 2026";

/** The shared layout of the Privacy Policy, Terms of Service and Refund Policy pages. */
export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-[#fffaf1]">
      <section className="border-b border-[#d4af37]/30 bg-gradient-to-b from-[#fff1d8] to-[#fffaf1]">
        <Container className="py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#e47105]">{SITE.name}</p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-maroon sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#595656]">{intro}</p>
          <p className="mt-4 text-sm text-[#8a8580]">{`Last updated: ${LEGAL_UPDATED}`}</p>
        </Container>
      </section>

      <Container className="grid gap-10 py-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-14">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-[132px] rounded-2xl border border-[#d4af37]/30 bg-white p-4 text-sm shadow-sm">
            <p className="mb-2 font-serif text-base font-bold text-maroon">{"On this page"}</p>
            <ol className="flex flex-col gap-1.5">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[#595656] transition-colors hover:text-[#e47105]">
                    {`${i + 1}. ${s.title}`}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="min-w-0 rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm sm:p-10">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-[132px] [&:not(:first-child)]:mt-9">
              <h2 className="font-serif text-2xl font-bold text-maroon">{`${i + 1}. ${s.title}`}</h2>
              <div className="mt-3 flex flex-col gap-3 text-[15px] leading-relaxed text-[#444]">
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

          <div className="mt-10 rounded-xl bg-[#fff4e8] p-5 text-[15px] text-maroon">
            <p className="font-semibold">{"Questions about this page?"}</p>
            <p className="mt-1 text-[#595656]">
              {"Write to us at "}
              <a href={`mailto:${CONTACT.email}`} className="font-semibold text-[#e47105] underline">
                {CONTACT.email}
              </a>
              {" or use the "}
              <Link href="/contact" className="font-semibold text-[#e47105] underline">
                {"Contact page"}
              </Link>
              {"."}
            </p>
          </div>

          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#8a8580]">
            <Link href="/privacy-policy" className="hover:text-[#e47105]">{"Privacy Policy"}</Link>
            <Link href="/terms" className="hover:text-[#e47105]">{"Terms of Service"}</Link>
            <Link href="/refund-policy" className="hover:text-[#e47105]">{"Refund Policy"}</Link>
          </p>
        </article>
      </Container>
    </div>
  );
}
