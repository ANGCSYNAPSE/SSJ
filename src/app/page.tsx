import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] w-full overflow-hidden">
      <Image
        src="/images/home/hero.png"
        alt="Devotees gathered at the Khatu Shyam temple at sunrise"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Warm scrim so the copy stays legible over the temple photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1440px] items-center px-6 lg:px-[98px]">
        <div className="max-w-xl py-16">
          <p className="text-2xl text-[#583939]">|| जय श्री श्याम ||</p>

          <h1 className="mt-4 font-serif text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-[64px]">
            <span className="block text-[#583939]">Faith</span>
            <span className="mt-2 block text-[#E07C2D]">Service</span>
            <span className="mt-2 block text-[#8D3135]">Humanity</span>
          </h1>

          <p className="mt-8 max-w-md text-base font-medium leading-[25px] text-[#595656]">
            Shree Shyam Jagat is a platform dedicated to spreading devotion and
            serving humanity
          </p>

          <div className="mt-8 flex flex-col items-start gap-3">
            <Link
              href="/signup"
              className="flex h-9 w-[230px] items-center justify-center gap-3 rounded-[13px] bg-[#E47105] text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Become a Member
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>

            <Link
              href="/donate"
              className="flex h-9 w-[145px] items-center justify-center gap-2 rounded-[13px] bg-[#E47105] text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Donate Now
              <Heart className="h-4 w-4 fill-white" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
