import Ornament from "@/components/ui/Ornament";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AdSlot from "@/components/ui/AdSlot";
import InitiativeShowcase from "@/components/initiatives/InitiativeShowcase";
import { COMING_SOON, INITIATIVES } from "@/lib/data/initiatives";

export const metadata: Metadata = {
  title: "Our Initiatives - Seva we are working towards",
  description: "Food seva, night shelter, drinking water, ambulance help, gaushala, education, health care and more: the seva Shyam Jagat aims to do.",
};

const contributions = [
  {
    emoji: "🤲",
    title: "Volunteer",
    desc: "Give your time and skills to seva in your own neighbourhood, however much or little you can.",
    cta: "Join as Volunteer",
    href: "/signup?register=volunteer",
  },
  {
    emoji: "💛",
    title: "Donate",
    desc: "Your donation helps us begin and carry on seva such as meals, water, shelter and care.",
    cta: "Donate Now",
    href: "/donation",
  },
  {
    emoji: "🪪",
    title: "Become a Member",
    desc: "Become a Shyam Jagat member and be part of a growing family that believes in seva.",
    cta: "Become a Member",
    href: "/signup",
  },
  {
    emoji: "📚",
    title: "Support Education",
    desc: "Help children with books, school supplies and learning support.",
    cta: "Support a Child",
    href: "/donation",
  },
  {
    emoji: "🍱",
    title: "Share Meals",
    desc: "Help us share simple meals with people who need them.",
    cta: "Share Meals",
    href: "/donation",
  },
  {
    emoji: "🤝",
    title: "Partner With Us",
    desc: "Organisations and businesses that would like to help with seva are welcome to get in touch.",
    cta: "Partner With Us",
    href: "/contact",
  },
];

export default function InitiativesPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative -mt-[112px] flex min-h-[674px] w-full items-center justify-center overflow-hidden pt-[112px]">
        <Image
          src="/images/initiatives-page/hero.png"
          alt="Volunteers serving the community at a Shyam Jagat seva event"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0505]/80 to-[#1a0505]/0" />
        <div className="relative flex flex-col items-center gap-4 px-6 py-16 text-center">
          <p className="text-2xl text-[#fff8f0]/80">{"|| जय श्री श्याम ||"}</p>
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-serif text-4xl font-bold text-white md:text-7xl lg:text-[90px]">{"Our Initiatives"}</h1>
            <div className="h-1 w-[120px] rounded-sm bg-[#e47105]" />
          </div>
          <p className="text-base font-semibold text-[#ffb266] sm:text-2xl">{"Serving Society Through Compassion & Seva"}</p>
          <p className="max-w-[800px] text-sm leading-8 text-[#fff8f0]/90 md:text-lg">
            {"At Shyam Jagat, our work is driven by the spirit of selfless service (Seva) and inspired by the teachings of Baba Shyam. Below is the seva we are working towards, step by step, together with our volunteers, members and supporters."}
          </p>
        </div>
      </section>

      {/* AD - LEADERBOARD */}
      <AdSlot size="leaderboard" />

      {/* THE SEVA WE WORK TOWARDS */}
      <section className="bg-[#fdf6ec] px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-14">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.96px] text-[#e87722]">{"WHAT WE AIM TO DO"}</p>
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">{"Our Seva"}</h2>
            <Ornament />
            <p className="text-lg leading-7 text-[#595656]">
              {"Choose any card to read, in a few words, what we aim to do. Each service begins place by place, as support allows."}
            </p>
          </div>

          <InitiativeShowcase items={INITIATIVES} layout="grid" />
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* COMING SOON */}
      <section className="bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[44px]">{"Coming Soon"}</h2>
            <Ornament />
            <p className="text-lg leading-7 text-[#595656]">{"Seva we hope to start in time. We will share it here when it begins."}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMING_SOON.map((item) => (
              <div key={item.title} className="flex flex-col gap-2 rounded-2xl border border-dashed border-[#d4af37]/60 bg-[#fffbf3] p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold text-[#3e1815]">{item.title}</h3>
                  <span className="shrink-0 rounded-full bg-[#fdf0d5] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#8a6100]">{"Coming soon"}</span>
                </div>
                <div className="notranslate hindi-sub text-sm text-[#8a6b6b]" translate="no">
                  {item.hindi}
                </div>
                <p className="text-sm leading-[22px] text-[#595656]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT BANNER */}
      <section className="bg-[#fffbf3] px-6 py-16 lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-serif text-4xl font-bold text-[#3e1815] sm:text-[56px]">{"Our Approach"}</h2>
            <Ornament />
          </div>
          <p className="max-w-[900px] text-center text-lg leading-8 text-[#595656]">
            {"We believe seva grows best when it grows slowly and honestly. We begin with what we can do well, with the help of volunteers, members and supporters, and we share openly where and when each service is available. Thank you for being part of it."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/signup?register=volunteer" className="rounded-lg bg-[#e47105] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90">
              {"Join as Volunteer"}
            </Link>
            <Link
              href="/donation"
              className="rounded-lg border border-[#e47105] px-6 py-3 text-base font-semibold text-[#e47105] transition-colors hover:bg-[#e47105]/10"
            >
              {"Make a Donation"}
            </Link>
          </div>
        </div>
      </section>

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta={"Explore"} />

      {/* HOW YOU CAN CONTRIBUTE */}
      <section className="relative overflow-hidden bg-[#fdf6ec] px-6 py-16 lg:px-[108px] lg:py-24">
        <Image
          src="/images/initiatives-page/flower-1.svg"
          alt=""
          width={320}
          height={320}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -left-[120px] -top-[120px] hidden opacity-70 lg:block"
        />
        <Image
          src="/images/initiatives-page/atom-1.svg"
          alt=""
          width={220}
          height={220}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -right-[120px] -top-[120px] hidden opacity-70 lg:block"
        />
        <Image
          src="/images/initiatives-page/flower-2.svg"
          alt=""
          width={280}
          height={280}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -bottom-[68px] -left-[140px] hidden opacity-70 lg:block"
        />
        <Image
          src="/images/initiatives-page/atom-2.svg"
          alt=""
          width={200}
          height={200}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -bottom-[68px] -right-[140px] hidden opacity-70 lg:block"
        />

        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3d1010] lg:text-[48px]">{"How You Can Contribute"}</h2>
            <Ornament />
            <p className="text-lg leading-7 text-[#666]">{"Every act of giving, big or small, helps."}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contributions.map((item) => (
              <div key={item.title} className="flex flex-col gap-4 rounded-[20px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_12px_rgba(0,0,0,0.08)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#e87722] text-2xl">{item.emoji}</div>
                <h3 className="font-serif text-2xl font-bold text-[#3d1010]">{item.title}</h3>
                <p className="text-sm leading-[22px] text-[#444]">{item.desc}</p>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex w-fit items-center justify-center rounded-lg bg-[#e87722] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
