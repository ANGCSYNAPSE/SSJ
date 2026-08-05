import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, PlayCircle } from "lucide-react";

const initiatives = [
  {
    id: 1,
    tag: "COMMUNITY",
    title: "Marriage Bureau",
    desc: "Connecting hearts through trusted values—driven matrimonial platform built for the community.",
    image: "/images/initiatives/card-01.png",
  },
  {
    id: 2,
    tag: "EDUCATION",
    title: "Education Support",
    desc: "Scholarships, mentorships, and resources — because every child deserves to dream.",
    image: "/images/initiatives/card-02.png",
  },
  {
    id: 3,
    tag: "EMPLOYMENT",
    title: "Employment Portal",
    desc: "Connecting talent with opportunity through skill-based placements and career guidance.",
    image: "/images/initiatives/card-03.png",
  },
  {
    id: 4,
    tag: "WOMEN",
    title: "Women Empowerment",
    desc: "Building confidence, independence, and leadership in every woman we serve.",
    image: "/images/initiatives/card-04.png",
  },
  {
    id: 5,
    tag: "FOOD SEVA",
    title: "Annadan (Food Seva)",
    desc: "Ensuring no one sleeps hungry — one meal, one life at a time.",
    image: "/images/initiatives/card-05.png",
  },
  {
    id: 6,
    tag: "CARE & SHELTER",
    title: "Old Age Home",
    desc: "A safe, dignified, and loving home for our elders — because they deserve nothing less.",
    image: "/images/initiatives/card-06.png",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    program: "Education Support",
    text: "The scholarship from Shyam Jagat changed my life. Today I am a software engineer and I owe it all to their support and faith in me.",
    rating: 5,
  },
  {
    name: "Priya Verma",
    program: "Employment Portal",
    text: "Through the Employment Portal, I found a job that matches my skills. Shyam Jagat didn't just give me work — they gave me purpose and confidence.",
    rating: 5,
  },
  {
    name: "Kameshwar Ji",
    program: "Old Age Home",
    text: "I was alone and struggling. The Old Age Home gave me a family again. The warmth, care, and respect I receive here is beyond words.",
    rating: 5,
  },
  {
    name: "Anjali Singh",
    program: "Volunteer",
    text: "Volunteering at Annadan events opened my heart. Seeing smiles on hungry faces is the most fulfilling experience of my life.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    program: "Women Empowerment",
    text: "The Women Empowerment program taught me tailoring and helped me start my own boutique. I am now financially independent.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative -mt-[72px] min-h-screen w-full overflow-hidden">
        <Image
          src="/images/home/hero.png"
          alt="Devotees gathered at the Khatu Shyam temple at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 to-transparent" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-6 pt-[72px] lg:px-[98px]">
          <div className="max-w-xl py-16">
            <p className="text-2xl text-[#583939]">|| जय श्री श्याम ||</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-[64px]">
              <span className="block text-[#583939]">Faith</span>
              <span className="mt-2 block text-[#E07C2D]">Service</span>
              <span className="mt-2 block text-[#8D3135]">Humanity</span>
            </h1>
            <p className="mt-8 max-w-md text-base font-medium leading-[25px] text-[#595656]">
              Shree Shyam Jagat is a platform dedicated to spreading devotion and serving humanity
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

      {/* ABOUT SHYAM JAGAT SECTION */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="relative h-96 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src="/images/home/about-shyam.png"
                alt="Khatu Shyam Temple"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-4xl font-bold text-maroon">
                About <span className="text-primary">Shyam Jagat</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Shyam Jagat is a spiritual and social organization inspired by Baba Shyam, dedicated to serving humanity through faith and action. We uplift communities across areas: quality education for children, skill training for employment, free meals for food security, safe shelter for the homeless, free healthcare camps, and women empowerment programs. Together, we aim to build a compassionate and self-reliant society where everyone can thrive with dignity.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Know More
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT BABA SHYAM SECTION */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <h2 className="font-serif text-4xl font-bold text-maroon">
                About <span className="text-primary">Baba Shyam</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                &quot;Born as Barbark, the legendary grandson of Bhima, he possessed unparalleled warrior strength. Yet, his greatest act was the supreme sacrifice of his own head for the victory of Dharma (truth). Pleased by his selfless devotion, Lord Krishna blessed him with his own name&mdash; Shyam&mdash;decreeing that he would be revered in Kalyug as the ultimate savior of the defeated.&quot;
              </p>
              <Link
                href="/baba-shyam"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Know More
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative h-96 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src="/images/home/about-baba.png"
                alt="Baba Shyam"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LIVE AARTI & DARSHAN SECTION */}
      <section className="bg-maroon py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <h2 className="text-center font-serif text-4xl font-bold">
            Live Aarti & Darshan
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Schedule */}
            <div className="rounded-2xl bg-white p-8 text-maroon">
              <h3 className="font-serif text-2xl font-bold">Daily Schedule</h3>
              <div className="mt-6 space-y-4">
                {[
                  { time: "05:00 AM", aarti: "Mangala Aarti" },
                  { time: "08:30 AM", aarti: "Shringaar Aarti" },
                  { time: "12:00 PM", aarti: "Rajbhog Aarti" },
                  { time: "06:30 PM", aarti: "Sandhya Aarti" },
                  { time: "09:00 PM", aarti: "Shayan Aarti" },
                ].map((item) => (
                  <div key={item.time} className="flex justify-between border-b border-maroon/20 pb-3">
                    <span className="font-semibold">{item.time}</span>
                    <span>{item.aarti}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Streaming */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 text-maroon">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                <PlayCircle className="h-12 w-12 text-white" aria-hidden />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-bold">Currently Streaming</h3>
              <p className="mt-4 text-center text-muted-foreground">
                Join thousands of devotees in our continuous live stream of the temple sanctum.
              </p>
              <button className="mt-8 rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90">
                WATCH LIVE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OUR INITIATIVES SECTION */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              WHAT WE DO
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-maroon">
              Our <span className="text-primary">Initiatives</span>
            </h2>
            <p className="mt-6 text-base text-muted-foreground">
              Driven by faith, sustained by compassion — serving lives across every dimension of society.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative) => (
              <div key={initiative.id} className="group overflow-hidden rounded-2xl">
                <div className="relative h-80 overflow-hidden bg-maroon">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {initiative.tag}
                    </span>
                    <h3 className="mt-4 font-serif text-2xl font-bold text-white">
                      {initiative.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/90">{initiative.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/initiatives"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore All Initiatives
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              12+ active programs across Rajasthan
            </p>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-maroon">
              Success <span className="text-primary">Stories</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Real lives, real impact — stories of hope and transformation.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl bg-cream p-8">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-lg text-primary">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-4 italic text-muted-foreground">&quot;{testimonial.text}&quot;</p>
                <div className="mt-6">
                  <p className="font-semibold text-maroon">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.program}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {testimonials.slice(3).map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl bg-cream p-8">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-lg text-primary">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-4 italic text-muted-foreground">&quot;{testimonial.text}&quot;</p>
                <div className="mt-6">
                  <p className="font-semibold text-maroon">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </>
  );
}
