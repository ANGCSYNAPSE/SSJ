import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/ui/AdSlot";
import { STATE_CHAPTERS, getStateDetail, type Person } from "@/lib/stateTeams";

const SECONDARY_NAV = [
  { label: "Overview", href: "/team" },
  { label: "Chairman", href: "/team/chairman" },
  { label: "Mukhya Trustee", href: "/team/mukhya-trustee" },
  { label: "Trustees", href: "/team/trustees" },
  { label: "Management Team", href: "/team/management-team" },
  { label: "Advisory Board", href: "/team/advisory-board" },
  { label: "State Team", href: "/team/state-team", active: true },
];

export function generateStaticParams() {
  return STATE_CHAPTERS.map((state) => ({ state: state.slug }));
}

function PersonCard({ person, imageHeight = 240 }: { person: Person; imageHeight?: number }) {
  return (
    <div className="flex flex-1 flex-col gap-5 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6 shadow-[0px_8px_8px_rgba(0,0,0,0.04)]">
      <div className="relative w-full overflow-hidden rounded-xl" style={{ height: imageHeight }}>
        <Image
          src={person.image}
          alt={person.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-2xl font-bold text-maroon">{person.name}</h3>
        <p className="text-sm font-semibold uppercase text-primary">{person.role}</p>
        <div className="flex items-center gap-2 text-[13px] whitespace-nowrap">
          <span className="font-medium text-[#3e1815]">{person.unit}</span>
          <span className="text-[#9ca3af]">•</span>
          <span className="text-[#595656]">{person.location}</span>
        </div>
      </div>
      <p className="text-sm leading-[22px] text-[#595656]">{person.desc}</p>
      <Link
        href="#"
        className="w-fit rounded-lg bg-[#fff3e0] px-5 py-3 text-sm font-semibold text-primary"
      >
        View Profile →
      </Link>
    </div>
  );
}

export default function StateDetailPage({ params }: { params: { state: string } }) {
  const detail = getStateDetail(params.state);
  if (!detail) notFound();

  return (
    <>
      {/* Secondary team nav */}
      <div className="border-b border-[#e5e7eb] bg-cream">
        <div className="mx-auto flex max-w-[1280px] gap-10 overflow-x-auto px-6 lg:px-20">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`shrink-0 whitespace-nowrap border-b-4 py-5 text-sm ${
                item.active
                  ? "border-primary font-bold text-primary"
                  : "border-transparent font-medium text-[#3e1815]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white px-6 pb-2 pt-6 lg:px-20">
        <div className="mx-auto flex max-w-[1280px] items-center gap-2 text-[13px]">
          <Link href="/" className="text-[#8c8c8c]">
            Home
          </Link>
          <span className="text-[#9ca3af]">/</span>
          <Link href="/team/state-team" className="text-[#8c8c8c]">
            State Team
          </Link>
          <span className="text-[#9ca3af]">/</span>
          <span className="font-semibold text-primary">{detail.name}</span>
        </div>
      </div>

      {/* Hero with stats */}
      <section className="bg-maroon px-6 py-16 text-center lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6">
          <h1 className="font-serif text-4xl font-bold text-[#f2c75c] sm:text-5xl lg:text-[56px]">
            {detail.name} State Team
          </h1>
          <div className="flex w-full max-w-[700px] flex-col items-center justify-center gap-6 rounded-xl border border-primary bg-white p-5 sm:flex-row sm:gap-10">
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs uppercase text-[#595656]">Total Members</p>
              <p className="font-serif text-[28px] font-bold text-primary">
                {detail.stats.totalMembers}
              </p>
            </div>
            <div className="hidden h-10 w-px bg-[#e5e7eb] sm:block" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs uppercase text-[#595656]">Districts Covered</p>
              <p className="font-serif text-[28px] font-bold text-primary">
                {detail.stats.districtsCovered}
              </p>
            </div>
            <div className="hidden h-10 w-px bg-[#e5e7eb] sm:block" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs uppercase text-[#595656]">Established</p>
              <p className="font-serif text-[28px] font-bold text-primary">
                {detail.stats.established}
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      {/* State leadership */}
      <section className="bg-white px-6 pb-10 pt-5 lg:px-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
          <h2 className="font-serif text-[32px] font-bold text-[#4a0e0e]">
            {detail.name} State Leadership
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row">
            {detail.leadership.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* District teams */}
      {detail.districtTeams.map((team, i) => (
        <section key={team.title} className="bg-white px-6 py-10 lg:px-20">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
            <div>
              <h2 className="font-serif text-3xl font-bold text-maroon">{team.title}</h2>
              <div className="mt-3 h-1 w-20 rounded-full bg-primary" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.members.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
          </div>

          {i === 0 && detail.districtTeams.length > 1 && (
            <div className="mx-auto mt-10 max-w-[1280px]">
              <AdSlot size="leaderboard" />
            </div>
          )}
        </section>
      ))}

      <AdSlot size="leaderboard" />
    </>
  );
}
