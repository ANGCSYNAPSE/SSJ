import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "About - Shyam Jagat" };

export default function AboutPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative -mt-[72px] min-h-screen w-full overflow-hidden pt-[72px]">
        <Image
          src="/images/about/Hero.png"
          alt="Shyam Jagat - About Us"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
        <div className="relative flex min-h-screen w-full items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <p className="text-lg text-white/80 font-medium tracking-wide">|| जय श्री श्याम ||</p>
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            <h1 className="mt-8 font-serif text-6xl sm:text-7xl font-bold leading-tight text-white">
              About Shyam Jagat
            </h1>
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            <p className="mt-8 text-lg text-white/90 font-medium">
              Serving Humanity with Faith, Compassion, and Purpose
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-maroon">
                Who We <span className="text-primary">Are</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Shyam Jagat is a spiritual and social organization inspired by the divine teachings and blessings of Baba Shyam. Our mission is to transform lives by combining devotion with meaningful social service, creating a community where compassion, dignity, and opportunity are accessible to everyone.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We believe that true devotion is expressed through selfless service. Every initiative we undertake is driven by the values of kindness, equality, and humanity, helping individuals and families build a brighter future.
              </p>
            </div>
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/about/Rectangle.png"
                alt="Who We Are"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Vision Card */}
            <div className="rounded-2xl bg-white p-8 border-t-4 border-primary">
              <h3 className="font-serif text-2xl font-bold text-maroon">
                Our Vision
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                To build a compassionate, empowered, and self-reliant society where every individual has access to education, healthcare, food, shelter, employment opportunities, and a life of dignity under the blessings of Baba Shyam.
              </p>
            </div>

            {/* Mission Card */}
            <div className="rounded-2xl bg-white p-8 border-t-4 border-primary">
              <h3 className="font-serif text-2xl font-bold text-maroon">
                Our Mission
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Our mission is to serve society through sustainable initiatives that uplift lives, strengthen communities, and inspire people to contribute towards a better tomorrow. We strive to create lasting social impact by empowering individuals with the resources, support, and opportunities they need to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR BELIEF SECTION */}
      <section className="bg-maroon py-16 text-white lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl font-bold">Our Belief</h2>
            <p className="mt-8 text-base leading-relaxed text-white/90">
              At Shyam Jagat, we believe that even the smallest act of kindness can create a lasting impact. Guided by the blessings of Baba Shyam, we encourage every individual to become a part of this journey of service, compassion, and positive change. Together, we are not just serving people—we are building hope, creating opportunities, and shaping a stronger, kinder society for generations to come.
            </p>
            <Link
              href="/signup"
              className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Join the Shyam Family
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM ECOSYSTEM SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              PLATFORM ECOSYSTEM OVERVIEW
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-maroon">
              One Platform. Every Role. <span className="text-primary">Infinite Devotion.</span>
            </h2>
            <p className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto">
              A multi-role spiritual ecosystem seamlessly connecting Devotees, Temples, Artists, Event Organizers, and Administrators — all under the blessings of Baba Shyam.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Temple Registration & Management",
                desc: "Temples can manage profiles, update schedules, and showcase offerings to thousands of devotees online.",
              },
              {
                title: "Artist Registration & Slot Booking",
                desc: "Singers, musicians, speakers, and performers can register, set availability, and get booked for events seamlessly.",
              },
              {
                title: "Live Darshan & Aarti Feed",
                desc: "Stream live aarti and darshan in real time, allowing devotees worldwide to participate in sacred rituals from anywhere.",
              },
              {
                title: "Puja / Seva / Darshan Booking",
                desc: "Devotees can book personalized pujas, sevas, and darshan slots at their preferred temple with ease.",
              },
              {
                title: "Center Dashboard",
                desc: "A unified control center for managing all platform activity — content, users, bookings, and operations — in one place.",
              },
              {
                title: "Events & Activities",
                desc: "Discover, create, and manage spiritual events, satsangs, bhajan programs, and community gatherings.",
              },
              {
                title: "Donations & Fundraising",
                desc: "Enable transparent, secure donations to temples, causes, and relief initiatives with compassion tracking.",
              },
              {
                title: "Spiritual Content",
                desc: "Access a rich library of bhajans, kathan, articles, and devotional videos curated for every seeker.",
              },
              {
                title: "Analytics & Reports",
                desc: "Real-time dashboards and detailed reports for administrators and organizers to track impact and engagement.",
              },
            ].map((feature, index) => (
              <div key={index} className="rounded-xl bg-cream p-6 border-l-4 border-primary">
                <h3 className="font-semibold text-maroon">{feature.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className=" flex justify-between items-center mt-12 rounded-2xl bg-maroon p-4 text-center text-white">
            <p className="text-base">
              Join thousands of devotees, temples, and artists already on the platform.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
