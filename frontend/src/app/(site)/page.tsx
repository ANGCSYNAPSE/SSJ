"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  Users,
  HeartHandshake,
  Building2,
  Map,
  MapPin,
  Video,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  BadgeCheck,
  Headphones,
  Leaf,
  Check,
  Mail,
  Phone,
  Clock,
  Lock,
  ChevronUp,
} from "lucide-react";
import { INITIATIVES, type Initiative } from "@/lib/data/initiatives";
import AdSlot from "@/components/ui/AdSlot";

/** Underline-arrow accent used next to hero and about-section CTAs. */
function CtaArrow({ src, className = "" }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={className} aria-hidden />
  );
}

export default function HomePage() {
  const initiatives = INITIATIVES;
  const [openFaqLeft, setOpenFaqLeft] = useState(0);
  const [openFaqRight, setOpenFaqRight] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const testimonials = [
    { name: "Rahul Sharma", program: "Education Support", text: "The scholarship from Shyam Jagat changed my life. Today I am a software engineer and I owe it all to their support and faith in me.", photo: "/images/home/success-1.png" },
    { name: "Priya Verma", program: "Employment Portal", text: "Through the Employment Portal, I found a job that matches my skills. Shyam Jagat didn't just give me work — they gave me purpose and confidence.", photo: "/images/home/success-2.png" },
    { name: "Rameshwar Ji", program: "Old Age Home", text: "I was alone and struggling. The Old Age Home gave me a family again. The warmth, care, and respect I receive here is beyond words.", photo: "/images/home/success-3.png" },
  ];

  const whyChoose = [
    {
      icon: <Image src="/images/home/namaste.png" alt="" width={36} height={36} className="object-contain" />,
      title: "Faith Driven",
      desc: "Every initiative is rooted in the divine teachings of Baba Shyam - service as devotion.",
    },
    { icon: <Eye className="h-7 w-7 text-white" aria-hidden />, title: "Transparent", desc: "We maintain full financial transparency and accountability across all our programs and donations." },
    { icon: <Users className="h-7 w-7 text-white" aria-hidden />, title: "Community Focused", desc: "Our work is guided by the community, for the community - built on trust and collective participation." },
    { icon: <BadgeCheck className="h-7 w-7 text-white" aria-hidden />, title: "Verified Volunteers", desc: "All our volunteers are verified, trained, and committed to the highest standards of service." },
    { icon: <Headphones className="h-7 w-7 text-white" aria-hidden />, title: "Dedicated Support", desc: "24/7 support for our members, beneficiaries, and partners - we are always here when you need us." },
    { icon: <Leaf className="h-7 w-7 text-white" aria-hidden />, title: "Long-term Impact", desc: "We focus on sustainable change - not just short-term relief but building lasting opportunities." },
  ];

  const stats = [
    { icon: Clock, title: "Requests within 24 hours", sub: "Fast response" },
    { icon: Headphones, title: "Dedicated Support", sub: "Human help" },
    { icon: Users, title: "Community 1000+", sub: "Strong network" },
    { icon: Lock, title: "100% Confidential", sub: "Secure" },
  ];

  const faqsLeft = [
    { q: "How can I donate to Shyam Jagat?", a: "You can donate online through our website, via UPI, bank transfer, or in person at our offices. All donations are receipted and 80G tax exempt." },
    { q: "How do I become a member of Shyam Jagat?" },
    { q: "How can I volunteer with Shyam Jagat?" },
    { q: "Is the Marriage Bureau service free?" },
  ];

  const faqsRight = [
    { q: "How does the Employment Portal work?", a: "Register on our portal, upload your profile and skills, and our team will connect you with verified employers and job opportunities." },
    { q: "Who qualifies for education scholarships?" },
    { q: "How can a senior citizen apply for the Old Age Home?" },
    { q: "Is Shyam Jagat a registered organization?" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative -mt-[140px] min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
        <Image
          src="/images/home/hero.png"
          alt="Devotees gathered at the Khatu Shyam temple at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent sm:via-black/50 sm:to-transparent" />

        {/* location badge */}
        <div className="absolute right-6 bottom-10 z-10 flex items-center gap-2 rounded-full bg-[#1a1a1a]/70 px-3.5 py-2.5 backdrop-blur-sm sm:bottom-20 lg:right-10">
          <MapPin className="h-4 w-4 text-white" aria-hidden />
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-white">श्री खाटू श्याम मंदिर</p>
            <p className="text-[11px] text-[#d9d9d9]">राजस्थान</p>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-8 px-6 pb-16 pt-[168px] lg:gap-10 lg:px-[94px] lg:pt-[200px]">
          <div className="max-w-xl">
            <p className="text-2xl leading-[0.95] text-[#f2c75c]">|| जय श्री श्याम ||</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-[64px]">
              <span className="block text-[#f29926]">सहयोग</span>
              <span className="mt-2 block text-white">सेवा</span>
              <span className="mt-2 block text-[#f2c75c]">समर्पण</span>
            </h1>
            <p className="mt-6 max-w-md text-base font-medium leading-[25px] text-[#d9d9d9]">
              {"Shree Shyam Jagat is a platform dedicated to spreading devotion and serving humanity"}
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Link
                href="/signup"
                className="group flex h-9 w-fit p-5 items-center justify-center gap-3 rounded-[13px] bg-[#e47105] text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                {"Become a Member"}
                <CtaArrow src="/images/home/arrow-member.svg" className="h-3 w-6" />
              </Link>

            </div>
          </div>

          {/* stats row */}
          <div className="flex flex-wrap gap-3.5">
            {[
              { icon: Users, value: "50K+", label: ["Devotees", "Connected"] },
              { icon: HeartHandshake, value: "250+", label: ["Seva", "Initiatives"] },
              { icon: Building2, value: "1200+", label: ["Temples", "Associated"] },
              { icon: Map, value: "15+", label: ["States", "Covered"] },
            ].map((s) => (
              <div
                key={s.value}
                className="flex flex-col items-center gap-1.5 rounded-[14px] border border-white/15 bg-white/10 px-[18px] py-3.5 backdrop-blur-sm"
              >
                <s.icon className="h-[22px] w-[22px] text-white" aria-hidden />
                <p className="text-xl font-bold text-white">{s.value}</p>
                <div className="text-center text-[11px] leading-tight text-[#d9d9d9]">
                  <p>{s.label[0]}</p>
                  <p>{s.label[1]}</p>
                </div>
              </div>
            ))}
          </div>

          {/* mission card */}
          <div className="flex max-w-[380px] items-center gap-3.5 rounded-[18px] bg-gradient-to-r from-[#fdf0dc] to-[#fae3b8] p-5">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="h-7 w-1 shrink-0 rounded bg-[#e47105]" />
                <p className="text-[15px] font-bold text-[#1a1a1a]">{"Our Mission"}</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#4a3800]">
                {"To create a global community of devotees united by faith, service and compassion."}
              </p>
            </div>
            <CtaArrow src="/images/home/feather.svg" className="h-16 w-12 shrink-0" />
          </div>
        </div>
      </section>

      {/* AD - LEADERBOARD */}
      <AdSlot size="leaderboard" />

      {/* ABOUT SHYAM JAGAT SECTION */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative order-2 h-96 overflow-hidden rounded-[35px] shadow-[-16px_18px_50px_rgba(0,0,0,0.25)] lg:order-1 lg:h-[543px]">
              <Image
                src="/images/home/about-shyam.png"
                alt="Volunteers serving food at a Shyam Jagat seva event"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-4xl font-semibold text-[#583939] lg:text-[42px]">
                {"About"} <span className="text-[#e47105]">Shyam Jagat</span>
              </h2>
              <p className="mt-6 text-lg leading-[37px] text-[#8c8c8c]">
                {"Shyam Jagat is a spiritual and social organization inspired by Baba Shyam, dedicated to serving humanity through faith and action. We uplift communities across areas: quality education for children, skill training for employment, free meals for food security, safe shelter for the homeless, free healthcare camps, and women empowerment programs. Together, we aim to build a compassionate and self-reliant society where everyone can thrive with dignity."}
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex h-[38px] w-[177px] items-center justify-center gap-3 rounded-[14px] bg-[#e47105] text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                {"Know More"}
                <CtaArrow src="/images/home/arrow-about.svg" className="h-3 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT BABA SHYAM SECTION */}
      <section className="relative overflow-hidden bg-[#fdf6ec] py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[87px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="font-serif text-4xl font-semibold text-black lg:text-[42px]">
                {"About"} <span className="text-[#e47105]">Baba Shyam</span>
              </h2>
              <p className="mt-6 max-w-[504px] text-lg leading-[37px] text-[#8c8c8c]">
                {"\"Born as Barbarik, the legendary grandson of Bhima, he possessed unparalleled warrior strength. Yet, his greatest act was the supreme sacrifice of his own head for the victory of Dharma (truth). Pleased by his selfless devotion, Lord Krishna blessed him with his own name—Shyam—decreeing that he would be revered in Kalyug as the ultimate savior of the defeated.\""}
              </p>
              <Link
                href="/baba-shyam"
                className="mt-8 inline-flex h-[38px] w-[177px] items-center justify-center gap-3 rounded-[14px] bg-[#e47105] text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                {"Know More"}
                <CtaArrow src="/images/home/arrow-about.svg" className="h-3 w-6" />
              </Link>
            </div>
            <div className="relative h-96 overflow-hidden rounded-2xl lg:h-[550px] shadow-[16px_18px_50px_rgba(0,0,0,0.25)] ">
              <Image
                src="/images/home/about-baba.png"
                alt="Baba Shyam"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LIVE AARTI & DARSHAN SECTION */}
      <section className="bg-maroon py-16 text-white lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 lg:flex-row lg:gap-16 lg:px-[80px]">
          <div className="flex flex-1 flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[#d4af37]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                  {"Darshan"}
                </p>
                <span className="h-px w-6 bg-[#d4af37]" />
              </div>
              <h2 className="font-serif text-4xl font-semibold leading-[1.1] lg:text-[48px]">
                {"Live Aarti & Darshan"}
              </h2>
            </div>
            <div className="rounded-xl bg-white p-6 text-[#3e1815] lg:p-8">
              {[
                { time: "05:00 AM", aarti: "Mangala Aarti" },
                { time: "08:30 AM", aarti: "Shringaar Aarti" },
                { time: "12:00 PM", aarti: "Rajbhog Aarti" },
                { time: "06:30 PM", aarti: "Sandhya Aarti" },
                { time: "09:00 PM", aarti: "Shayan Aarti" },
              ].map((item, i, arr) => (
                <div
                  key={item.time}
                  className={`flex items-center justify-between py-4 ${
                    i < arr.length - 1 ? "border-b border-[#3e1815]/20" : ""
                  }`}
                >
                  <span className="font-bold">{item.time}</span>
                  <span>{item.aarti}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-8 rounded-2xl bg-white p-8 text-center text-[#3e1815] lg:w-[480px] lg:p-12">
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#e47105]">
              <Video className="h-[60px] w-[60px] text-white" aria-hidden />
            </div>
            <h3 className="font-serif text-[28px] font-extrabold">{"Currently Streaming"}</h3>
            <p className="text-base text-[#6b4f4f]">
              {"Join thousands of devotees in our continuous live stream of the temple sanctum."}
            </p>
            <button className="rounded bg-[#e47105] px-8 py-4 text-sm font-bold uppercase text-white shadow-lg transition-opacity hover:opacity-90">
              {"Watch Live"}
            </button>
          </div>
        </div>
      </section>

      {/* OUR INITIATIVES - BENTO */}
      <section className="bg-[#fdf6ec] py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.96px] text-[#e87722]">
              {"WHAT WE DO"}
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-[1.1] text-[#6b1f1f] lg:text-[52px]">
              {"Our"} <span className="text-[#e87722]">{"Initiatives"}</span>
            </h2>
            <div className="h-0.5 w-[120px] bg-[#e87722] opacity-60" />
            <p className="text-base leading-relaxed text-[#6b4a4a] opacity-85">
              {"Driven by faith, sustained by compassion - serving lives across every dimension of society."}
            </p>
          </div>

          <div className="mx-auto mt-16 flex max-w-[1300px] flex-col gap-5">
            <div className="grid gap-5 lg:grid-cols-[1.78fr_1fr]">
              {initiatives.slice(0, 2).map((it) => (
                <InitiativeCard key={it.id} item={it} height="h-[380px]" />
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {initiatives.slice(2, 5).map((it) => (
                <InitiativeCard key={it.id} item={it} height="h-[300px]" />
              ))}
            </div>
            <div className="grid">
              {initiatives.slice(5).map((it) => (
                <div
                  key={it.id}
                  className="group relative h-[240px] overflow-hidden rounded-[20px] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.08)]"
                >
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-maroon/0 to-maroon/80" />
                  <span className="absolute left-5 top-5 rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-maroon shadow">
                    {it.tag}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-7 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-serif text-3xl font-semibold">{it.title}</p>
                      <p className="mt-1 text-sm opacity-90">{it.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/initiatives"
              className="inline-flex items-center gap-2 rounded-full bg-[#e87722] px-3.5 py-2.5 text-sm font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              {"Learn More"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* AD - LARGE BANNER */}
      <AdSlot size="banner" cta={"Explore"} />

      {/* SUCCESS STORIES */}
      <section className="bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">
              {"Success Stories"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e47105]" />
            <p className="text-lg leading-7 text-[#595656]">
              {"Real lives, real impact — stories of hope and transformation."}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="flex gap-6 rounded-2xl border border-[#d4af37]/25 bg-[#fffbf3] p-6 shadow-[0_12px_16px_rgba(139,0,0,0.05)]"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
                  <Image src={item.photo} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#7b2d2d] px-2.5 py-1.5 text-xs font-semibold text-white">
                      {item.program}
                    </span>
                    <div className="flex shrink-0 gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#e47105] text-[#e47105]" aria-hidden />
                      ))}
                    </div>
                  </div>
                  <p className="italic leading-[26px] text-[#3e1815]">&ldquo;{item.text}&rdquo;</p>
                  <p className="font-serif text-xl font-bold text-[#3e1815]">{item.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/25 bg-white transition-colors hover:bg-cream"
            >
              <ChevronLeft className="h-5 w-5 text-[#3e1815]" aria-hidden />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-6 rounded-full bg-[#e47105]" />
              <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
              <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/25 bg-white transition-colors hover:bg-cream"
            >
              <ChevronRight className="h-5 w-5 text-[#3e1815]" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SHYAM JAGAT */}
      <section className="bg-[#faf7f2] px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">
              {"Why Choose Shyam Jagat"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e47105]" />
            <p className="text-lg leading-7 text-[#595656]">
              {"Built on faith, driven by purpose, and committed to lasting change."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-4 rounded-2xl border border-[#d4af37]/25 bg-white p-6 shadow-[0_12px_16px_rgba(139,0,0,0.05)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e87722] shadow-[0_10px_12px_rgba(232,119,34,0.2)]">
                  {f.icon}
                </div>
                <p className="font-serif text-[22px] font-bold text-[#3e1815]">{f.title}</p>
                <p className="text-sm leading-[22px] text-[#595656]">{f.desc}</p>
                <div className="h-0.5 w-full rounded-full bg-[#e47105]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD - MEDIUM RECTANGLE */}
      <AdSlot size="rectangle" />

      {/* TEMPLE REGISTRATION CTA */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative order-2 h-[360px] lg:order-1 lg:h-[520px]">
            <Image
              src="/images/home/temple-cta.png"
              alt="A temple at sunset"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div className="order-1 flex flex-col gap-6 bg-[#fdf6ec] px-6 py-14 lg:order-2 lg:justify-center lg:px-20 lg:py-20">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.96px] text-[#e87722]">
                {"FOR TEMPLES"}
              </p>
              <h2 className="font-serif text-[32px] font-semibold leading-[1.1] text-[#3e1815] lg:text-[44px]">
                {"Register Your Temple"}
              </h2>
              <p className="max-w-[560px] text-base leading-[26px] text-[#595656]">
                {"List your temple on Shyam Jagat and connect with millions of devotees. Help pilgrims discover your sacred space, darshan timings, and upcoming events."}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {["Reach millions of devotees online", "Manage events & donations digitally", "Free listing with premium options"].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <Check className="h-[18px] w-[18px] shrink-0 text-[#e87722]" aria-hidden />
                  <p className="text-sm leading-[22px] text-[#3e1815]">{b}</p>
                </div>
              ))}
            </div>
            <Link
              href="/temple-registration"
              className="inline-flex h-14 w-fit min-w-[196px] items-center justify-center whitespace-nowrap rounded-lg bg-[#e87722] px-6 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              {"Register as Temple →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ARTIST REGISTRATION CTA */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col gap-6 bg-[#fdf6ec] px-6 py-14 lg:justify-center lg:px-20 lg:py-20">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.96px] text-[#e87722]">
                {"FOR ARTISTS"}
              </p>
              <h2 className="font-serif text-[32px] font-semibold leading-[1.1] text-[#3e1815] lg:text-[44px]">
                {"Share Your Art with the World"}
              </h2>
              <p className="max-w-[560px] text-base leading-[26px] text-[#595656]">
                {"Join Shyam Jagat as a devotional artist. Showcase your talent at spiritual events, cultural programs, and sacred gatherings across India."}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {["Get discovered by event organizers", "Perform at prestigious temples & festivals", "Fair compensation & timely payments"].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <Check className="h-[18px] w-[18px] shrink-0 text-[#e87722]" aria-hidden />
                  <p className="text-sm leading-[22px] text-[#3e1815]">{b}</p>
                </div>
              ))}
            </div>
            <Link
              href="/artist-registration"
              className="inline-flex h-14 w-fit min-w-[196px] items-center justify-center whitespace-nowrap rounded-lg bg-[#e87722] px-6 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              {"Register as Artist →"}
            </Link>
          </div>
          <div className="relative h-[360px] lg:h-[520px]">
            <Image
              src="/images/home/artist-cta.png"
              alt="Devotional dancers performing at an evening event"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white py-8">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-8 px-6 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-[#e5e7eb]">
          {stats.map((s) => (
            <div key={s.title} className="flex flex-col items-center gap-1.5 px-4 text-center">
              <s.icon className="h-5 w-5 text-[#4a0e0e]" aria-hidden />
              <p className="text-sm font-bold text-[#4a0e0e]">{s.title}</p>
              <p className="text-xs text-[#6b7280]">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN THE SHYAM FAMILY */}
      <section className="bg-white px-6 py-8 lg:px-[90px]">
        <div className="mx-auto flex max-w-[1224px] flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#ef851f] via-[#e58330] to-[#db791a] px-8 py-9 text-white sm:flex-row sm:gap-8">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white">
              <CtaArrow src="/images/home/family-icon.svg" className="h-12 w-12" />
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold sm:text-[33px]">
                {"Join the Shyam Family"}
              </p>
              <p className="mt-1 max-w-[420px] font-light text-white/95 sm:text-lg">
                {"Be a part of our mission and help us create a better society."}
              </p>
            </div>
          </div>
          <Link
            href="/signup"
            className="flex shrink-0 items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-lg font-semibold text-[#e47105] shadow-lg transition-opacity hover:opacity-90"
          >
            {"Become a Member"}
            <CtaArrow src="/images/home/arrow-join.svg" className="h-3 w-4" />
          </Link>
        </div>
      </section>

      {/* AD - LEADERBOARD 2 */}
      <AdSlot size="leaderboard" cta={"Learn More"} />

      {/* FAQ */}
      <section className="bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">
              {"Frequently Asked Questions"}
            </h2>
            <div className="h-[3px] w-[100px] bg-[#e47105]" />
            <p className="text-lg leading-7 text-[#595656]">
              {"Have questions? We have answers."}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              {faqsLeft.map((item, i) => (
                <FaqItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  open={openFaqLeft === i}
                  onToggle={() => setOpenFaqLeft(openFaqLeft === i ? -1 : i)}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {faqsRight.map((item, i) => (
                <FaqItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  open={openFaqRight === i}
                  onToggle={() => setOpenFaqRight(openFaqRight === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative flex flex-col gap-8 overflow-hidden bg-[#fdf6ec] px-6 py-14 lg:px-24 lg:py-24">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="/images/home/contact-bg.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative flex flex-col gap-6">
              <h2 className="font-serif text-4xl font-semibold leading-[1.1] text-[#4a0e0e] lg:text-[56px]">
                {"Need Assistance?"}
                <br />
                {"We're here to help."}
              </h2>
              <p className="max-w-[500px] text-base leading-relaxed text-[#4b5563]">
                {"We are always here to help you. Whether you have a question, want to volunteer, make a donation, or need assistance - our helpdesk is here for you."}
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Mail, text: "contact@shyamjagat.org" },
                  { icon: Phone, text: "+91 12345 67890" },
                  { icon: MapPin, text: "Jaipur, Rajasthan, India" },
                  { icon: Clock, text: "Mon-Sat : 9 AM - 6 PM" },
                ].map((row) => (
                  <div key={row.text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e87722]">
                      <row.icon className="h-[18px] w-[18px] text-white" aria-hidden />
                    </div>
                    <p className="text-base text-[#4b5563]">{row.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-white px-6 py-14 lg:px-12 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.96px] text-[#e87722]">
              {"GET IN TOUCH"}
            </p>
            <h2 className="font-serif text-[32px] font-semibold leading-[1.2] text-[#4a0e0e] lg:text-[40px]">
              {"Send Us Your Query"}
            </h2>
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#4b5563]">{"First Name"}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={"First Name"}
                    className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#4b5563]">{"Last Name"}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={"Last Name"}
                    className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#4b5563]">{"Email Address"}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={"Email Address"}
                    className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#4b5563]">{"Mobile Number"}</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder={"Mobile Number"}
                    className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#4b5563]">{"Subject"}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={"Subject"}
                  className="h-12 rounded-lg border border-[#e5e7eb] px-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#4b5563]">{"Message"}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={"Write your message here..."}
                  rows={4}
                  className="resize-none rounded-lg border border-[#e5e7eb] p-3.5 text-sm text-[#4a0e0e] placeholder-[#9ca3af] focus:border-[#e87722] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 flex h-14 items-center justify-center rounded-lg bg-[#e87722] text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                {"Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function InitiativeCard({
  item,
  height,
}: {
  item: Initiative;
  height: string;
}) {
  return (
    <div
      className={`group relative ${height} overflow-hidden rounded-[20px] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.08)]`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon/0 to-maroon/80" />
      <span className="absolute left-5 top-5 rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-maroon shadow">
        {item.tag}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 px-5 pb-[22px] pt-[18px] text-white">
        <p className="font-serif text-[28px] font-semibold leading-[1.2] lg:text-[32px]">
          {item.title}
        </p>
        <p className="text-sm opacity-90">{item.desc}</p>
        <p className="text-sm font-semibold">{"Explore →"}</p>
      </div>
    </div>
  );
}

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a?: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-[#d4af37]/25 bg-white p-5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-bold text-[#3e1815]">{q}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-[#7b2d2d]" aria-hidden />
        ) : (
          <span className="shrink-0 text-xl text-[#7b2d2d]">›</span>
        )}
      </button>
      {open && a && (
        <p className="mt-3 text-sm leading-[22px] text-[#595656]">{a}</p>
      )}
    </div>
  );
}
