import type { Metadata } from "next";
import DevotionHero from "@/components/darshan/DevotionHero";
import DarshanSchedule from "@/components/darshan/DarshanSchedule";
import LiveDarshanCard from "@/components/darshan/LiveDarshanCard";
import { DARSHAN_ITEM } from "@/lib/data/devotion";
import { SEASONS, TEMPLE } from "@/lib/data/darshan";

export const metadata: Metadata = {
  title: "Shyam Baba Darshan - Aarti timings and darshan aarti",
  description: "The daily aarti timings of Shri Shyam Mandir, Khatushyamji, for winter and summer, and the darshan aarti.",
};

export default function DarshanPage() {
  return (
    <>
      <DevotionHero
        title={DARSHAN_ITEM.title}
        hindi={DARSHAN_ITEM.hindi}
        intro="The daily aarti timings of Shri Shyam Mandir, with the winter and summer times side by side, and the darshan aarti."
        crumbs={[{ href: "/aarti", label: "All Aarti" }, { label: DARSHAN_ITEM.title }]}
      />

      <section className="bg-maroon px-6 pb-16 text-white lg:px-[108px] lg:pb-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <DarshanSchedule />
            <div className="rounded-xl border border-white/20 bg-white/5 p-5 text-sm leading-relaxed text-white/85">
              <p className="font-semibold text-white">{"Winter and summer timings"}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  {SEASONS.winter.label} ({SEASONS.winter.months}): {"the aartis are later in the morning and earlier in the evening."}
                </li>
                <li>
                  {SEASONS.summer.label} ({SEASONS.summer.months}): {"the morning aartis are earlier and the evening aartis later."}
                </li>
                <li>{"The Bhog Aarti is at 12:30 PM in both seasons."}</li>
                <li>
                  {"The change of season is announced by the temple. For the exact date, call the temple office on "}
                  <a href={`tel:${TEMPLE.phone.replace(/\D/g, "")}`} className="font-semibold text-[#ffd04f] hover:underline">
                    {TEMPLE.phone}
                  </a>
                  {" or see "}
                  <a href={TEMPLE.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ffd04f] hover:underline">
                    {"shrishyammandir.com"}
                  </a>
                  {"."}
                </li>
              </ul>
            </div>
          </div>
          <LiveDarshanCard className="lg:self-start" />
        </div>
      </section>
    </>
  );
}
