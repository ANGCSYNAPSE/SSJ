"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown, FileText, Image as ImageIcon } from "lucide-react";

function AdLeaderboard() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#f7f7f7] py-6">
      <div className="h-px w-full bg-[#e0e0e0]" />
      <div className="flex flex-col items-center justify-center gap-2 py-3 text-center">
        <p className="text-[10px] font-medium tracking-[1.5px] text-[#8c8c8c]">
          SHYAM JAGAT SANSKRUTIK PARTNER ADVERTISEMENT
        </p>
        <div
          className="flex max-w-full flex-col items-center justify-center gap-1 rounded border border-[#e0e0e0] bg-[#ebebeb]"
          style={{ width: 728, height: 90, maxWidth: "92vw" }}
        >
          <p className="text-[13px] font-semibold text-[#8c8c8c]">Devotional Ad Space (728 × 90)</p>
          <p className="text-[11px] text-[#b4b4b4]">Sponsor a Temple Seva or Cultural Event</p>
        </div>
      </div>
      <div className="h-px w-full bg-[#e0e0e0]" />
    </div>
  );
}

function AdMediumRectangle() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#f7f7f7] py-8">
      <div className="h-px w-full bg-[#e0e0e0]" />
      <div className="flex flex-col items-center justify-center gap-2 py-4 text-center">
        <p className="text-[10px] font-medium tracking-[1.5px] text-[#8c8c8c]">
          SANSKRUTIK PARTNER ADVERTISEMENT
        </p>
        <div
          className="flex flex-col items-center justify-center gap-2 rounded border border-[#e0e0e0] bg-[#ebebeb]"
          style={{ width: 300, height: 250, maxWidth: "92vw" }}
        >
          <p className="text-sm font-semibold text-[#8c8c8c]">Medium Ad Space (300 × 250)</p>
          <p className="text-[11px] text-[#b4b4b4]">Promote Your Religious Publications</p>
          <span className="rounded bg-maroon px-4 py-1.5 text-[11px] font-semibold text-white">
            Book Ad Space
          </span>
        </div>
      </div>
      <div className="h-px w-full bg-[#e0e0e0]" />
    </div>
  );
}

const stepTracker = [
  { n: 1, label: "Mandal Identity" },
  { n: 2, label: "Office Bearers" },
  { n: 3, label: "Seva Details" },
  { n: 4, label: "Media & Verification" },
];

function FormStepTracker({ active }: { active: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-4 border-b border-[#e5e7eb] pb-6">
      {stepTracker.map((step, i) => (
        <div key={step.n} className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-[14px] text-[13px] font-bold ${
                step.n < active
                  ? "bg-maroon text-white"
                  : step.n === active
                    ? "bg-primary text-white"
                    : "border border-[#e5e7eb] bg-white text-[#8c8c8c]"
              }`}
            >
              {step.n}
            </span>
            <span
              className={`whitespace-nowrap text-sm ${
                step.n <= active ? "font-semibold text-[#3d1010]" : "font-medium text-[#595656]"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < stepTracker.length - 1 && (
            <div
              className={`hidden h-0 w-[60px] border-t sm:block lg:w-[120px] ${
                step.n < active ? "border-primary" : "border-dashed border-[#e5e7eb]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-5 w-1 shrink-0 rounded-sm bg-primary" />
      <h2 className="font-serif text-[22px] font-bold text-maroon">{children}</h2>
    </div>
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <p className="text-[13px] font-semibold text-[#3d1010]">
      {label} {required && <span className="text-primary">*</span>}
    </p>
  );
}

function TextInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-[45px] w-full rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#3d1810] placeholder:text-[#8c8c8c] focus:border-primary focus:outline-none"
    />
  );
}

function Select({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-[45px] w-full items-center justify-between rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#595656]"
      >
        {value}
        <ChevronDown
          className={`h-4 w-4 text-[#595656] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-[#e5e7eb] bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm ${
                value === option ? "bg-primary text-white" : "text-[#3d1810] hover:bg-cream"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CheckOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <button
        type="button"
        onClick={onChange}
        className={`flex size-[18px] shrink-0 items-center justify-center rounded ${
          checked ? "bg-primary" : "border border-[#e5e7eb] bg-white"
        }`}
      >
        {checked && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />}
      </button>
      <span className="text-sm text-[#3d1810]">{label}</span>
    </label>
  );
}

function UploadBox({
  icon: Icon,
  label,
  hint,
}: {
  icon: typeof ImageIcon;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[rgba(212,175,55,0.4)] bg-[#fffbf3] px-6 py-8 text-center"
    >
      <Icon className="h-8 w-8 text-primary" />
      <p className="text-sm font-semibold text-[#3d1010]">{label}</p>
      <p className="text-[11px] text-[#8c8c8c]">{hint}</p>
    </button>
  );
}

const mandalTypeOptions = [
  "Bhajan Mandal & Kirtan Samiti",
  "Religious / Charitable Trust",
  "Devotee Community Group",
  "Nishan Yatra Committee",
  "Seva & Social Welfare Society",
];
const stateOptions = [
  "Rajasthan", "Delhi", "Uttar Pradesh", "Gujarat", "Maharashtra", "Madhya Pradesh", "Haryana", "Punjab",
];
const memberCountOptions = [
  "25 - 50 Active Members",
  "Fewer than 25 Members",
  "50 - 100 Active Members",
  "More than 100 Members",
];
const sevaOptions = [
  "Bhajan Sandhya & Jagran",
  "Bhandara & Prasadi Seva",
  "Nishan Yatra Organisation",
  "Medical & Social Camps",
];

const stepsHow = [
  {
    number: "01",
    title: "Submit Details",
    desc: "Complete the digital application with authentic member numbers, location, and past event history.",
  },
  {
    number: "02",
    title: "Verification Call",
    desc: "Our regional coordinators connect with the President to understand key seva and schedule details.",
  },
  {
    number: "03",
    title: "Live Listing",
    desc: "Mandal gets registered in our master directory, allowing millions of devotees to discover and invite you.",
  },
];

const testimonials = [
  {
    quote:
      "Registering our Mandal with Shyam Jagat was the best spiritual milestone for our group. It simplified our event planning, Nishan Yatra permits, and reached out to wider devotees.",
    avatar: "/images/mandal-registration/avatar-giriraj.png",
    name: "Pandit Giriraj Shastri",
    role: "Pradhan, Khatu Prem Mandli",
  },
  {
    quote:
      "Our weekly Bhajan Sandhyas and monthly Ekadashi Bhandaras are now broadcast and discovered by thousands. The community sync is truly majestic and satisfying.",
    avatar: "/images/mandal-registration/avatar-ramesh.png",
    name: "Shri Ramesh Goyal",
    role: "Founder, Shyam Seva Mandal (Delhi)",
  },
];

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[1.12px] text-primary">{eyebrow}</p>
      <h2 className="font-serif text-4xl font-semibold leading-[1.1] text-maroon sm:text-[42px]">
        {title}
      </h2>
      <div className="h-[3px] w-[100px] bg-primary" />
      {desc && <p className="max-w-[800px] text-base leading-relaxed text-[#595656]">{desc}</p>}
    </div>
  );
}

export default function MandalRegistrationPage() {
  const [mandalName, setMandalName] = useState("");
  const [mandalType, setMandalType] = useState(mandalTypeOptions[0]);
  const [foundingYear, setFoundingYear] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const [state, setState] = useState(stateOptions[0]);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [presidentName, setPresidentName] = useState("");
  const [presidentPhone, setPresidentPhone] = useState("");
  const [memberCount, setMemberCount] = useState(memberCountOptions[0]);
  const [spokespersonName, setSpokespersonName] = useState("");

  const [sevaTypes, setSevaTypes] = useState<string[]>([]);
  const [recurringEvents, setRecurringEvents] = useState("");

  const [consent, setConsent] = useState(false);

  function toggleSeva(item: string) {
    setSevaTypes((prev) => (prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  function handleReset() {
    setMandalName("");
    setMandalType(mandalTypeOptions[0]);
    setFoundingYear("");
    setRegistrationNumber("");
    setState(stateOptions[0]);
    setCity("");
    setAddress("");
    setPhone("");
    setEmail("");
    setPresidentName("");
    setPresidentPhone("");
    setMemberCount(memberCountOptions[0]);
    setSpokespersonName("");
    setSevaTypes([]);
    setRecurringEvents("");
    setConsent(false);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden px-6 py-20 lg:px-20">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/mandal-registration/hero.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(61,16,16,0.8)] to-[rgba(20,5,5,0.95)]" />
        </div>
        <div className="relative flex flex-col items-center gap-5 text-center">
          <p className="text-lg font-semibold tracking-[0.72px] text-[#d4af37]">
            || जय श्री श्याम ||
          </p>
          <h1 className="font-serif text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[54px]">
            Mandal &amp; Organisation Registration
          </h1>
          <p className="max-w-[850px] text-base leading-7 text-[#fffbf3] sm:text-lg">
            Register your local Bhajan Mandal, Religious Organisation, Kirtan Committee, or
            Devotee Community with Shyam Jagat. Connect, coordinate, and orchestrate sacred
            services for Baba Shyam on a global platform.
          </p>
        </div>
      </section>

      {/* Ad - Leaderboard */}
      <AdLeaderboard />

      {/* Registration form section */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1212px] flex-col gap-12">
          <SectionHeader
            eyebrow="Official Enrollment"
            title="Organisation Registration Form"
            desc="Please fill in accurate details regarding your Mandal's leadership, spiritual lineage, and community initiatives. Verified mandals will receive an official Shyam Jagat partner badge."
          />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-white p-6 sm:p-12"
          >
            <FormStepTracker active={2} />

            <div className="flex flex-col gap-6">
              <BlockTitle>1. Organisation &amp; Mandal Identity</BlockTitle>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Mandal / Organisation Name" required />
                  <TextInput
                    placeholder="e.g. Shree Shyam Bhajan Mandal Vrindavan"
                    value={mandalName}
                    onChange={setMandalName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Mandal Type / Category" />
                  <Select options={mandalTypeOptions} value={mandalType} onChange={setMandalType} />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Establishment / Founding Year" required />
                  <TextInput placeholder="e.g. 2012" value={foundingYear} onChange={setFoundingYear} />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Government Registration Number (If registered)" />
                  <TextInput
                    placeholder="e.g. RJ/JPR/2023/1109"
                    value={registrationNumber}
                    onChange={setRegistrationNumber}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-[rgba(212,175,55,0.25)] pt-8">
              <BlockTitle>2. Location &amp; Main Headquarters</BlockTitle>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="State" />
                  <Select options={stateOptions} value={state} onChange={setState} />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="City / Region" required />
                  <TextInput placeholder="e.g. Khatu Dham, Sikar" value={city} onChange={setCity} />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <FieldLabel label="Complete Head Office Address" required />
                  <TextInput
                    placeholder="e.g. Plot No. 12, Temple Road, Opp. Shyam Kund, Khatu Dham, Sikar, Rajasthan"
                    value={address}
                    onChange={setAddress}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Official Contact Phone" required />
                  <TextInput
                    placeholder="e.g. +91 98290 XXXXX"
                    value={phone}
                    onChange={setPhone}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Official Email Address" required />
                  <TextInput
                    placeholder="e.g. contact@shreeshyammandal.org"
                    value={email}
                    onChange={setEmail}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-[rgba(212,175,55,0.25)] pt-8">
              <BlockTitle>3. Lead Office Bearer (President / Pradhan)</BlockTitle>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Chief / President Name" required />
                  <TextInput
                    placeholder="e.g. Shri Satyanarayan Shastri"
                    value={presidentName}
                    onChange={setPresidentName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="President Phone Number" required />
                  <TextInput
                    placeholder="e.g. +91 94140 XXXXX"
                    value={presidentPhone}
                    onChange={setPresidentPhone}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Active Member Count (In Mandal)" />
                  <Select options={memberCountOptions} value={memberCount} onChange={setMemberCount} />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Key Spokesperson Name" required />
                  <TextInput
                    placeholder="e.g. Mukesh Kumar Agarwal"
                    value={spokespersonName}
                    onChange={setSpokespersonName}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-[rgba(212,175,55,0.25)] pt-8">
              <BlockTitle>4. Spiritual Seva &amp; Community Activities</BlockTitle>
              <div className="flex flex-col gap-4">
                <p className="text-[13px] font-semibold text-[#3d1010]">
                  Select the types of Seva &amp; Cultural Programs your Mandal actively organises:
                </p>
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                  {sevaOptions.map((item) => (
                    <CheckOption
                      key={item}
                      label={item}
                      checked={sevaTypes.includes(item)}
                      onChange={() => toggleSeva(item)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Key Recurring Events / Festivals Managed" required />
                <TextInput
                  placeholder="e.g. Phalgun Ekadashi Kirtan, Kartik Purnima Bhandara"
                  value={recurringEvents}
                  onChange={setRecurringEvents}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-[rgba(212,175,55,0.25)] pt-8">
              <BlockTitle>5. Official Logo &amp; Document Upload</BlockTitle>
              <div className="flex flex-col gap-6 sm:flex-row">
                <UploadBox
                  icon={ImageIcon}
                  label="Upload Official Logo / Banner"
                  hint="Supports JPG, PNG up to 5MB"
                />
                <UploadBox
                  icon={FileText}
                  label="Upload Registration Cert / ID Proof"
                  hint="PDF, Word, or Scanned Image"
                />
              </div>
            </div>

            <div className="flex flex-col gap-8 border-t border-[rgba(212,175,55,0.25)] pt-8">
              <label className="flex cursor-pointer items-start gap-3">
                <button
                  type="button"
                  onClick={() => setConsent((v) => !v)}
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded ${
                    consent ? "bg-primary" : "border border-[#e5e7eb] bg-white"
                  }`}
                >
                  {consent && <Check className="h-3 w-3 text-white" strokeWidth={4} />}
                </button>
                <span className="flex-1 text-sm text-[#595656]">
                  We solemnly declare that all details provided above are true to our knowledge.
                  We promise to abide by the spiritual ethos, discipline, and Seva guidelines of
                  Shree Shyam Jagat Organization.
                </span>
              </label>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  type="submit"
                  className="rounded-lg bg-[#e47105] px-10 py-4 text-base font-bold text-white transition hover:bg-primary-dark"
                >
                  Register &amp; Book Consultation
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg border border-[#e5e7eb] bg-white px-10 py-4 text-base font-bold text-[#595656] transition hover:bg-cream"
                >
                  Reset Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* How onboarding works */}
      <section className="border-t border-[#e5e7eb] bg-white px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <SectionHeader
            eyebrow="Verification Flow"
            title="How Onboarding Works"
            desc="Join our spiritual directory after a brief verification by our regional committee."
          />
          <div className="grid gap-10 lg:grid-cols-3">
            {stepsHow.map((step, i) => (
              <div key={step.number} className="flex items-center gap-6">
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-5xl font-extrabold text-[#8b0000]">
                      {step.number}
                    </p>
                    {i < stepsHow.length - 1 && (
                      <ArrowRight className="hidden h-4 w-8 shrink-0 text-primary lg:block" />
                    )}
                  </div>
                  <h3 className="font-serif text-[22px] font-bold text-[#3d1010]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-[1.5] text-[#595656]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad - Medium Rectangle */}
      <AdMediumRectangle />

      {/* Testimonials */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <SectionHeader
            eyebrow="Our Shared Strength"
            title="Experiences of Registered Mandals"
            desc="Hear from community leads and pradhans who integrated their devotional groups with Shree Shyam Jagat."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-5 rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#fffbf3] p-8 shadow-[0px_6px_8px_rgba(107,31,31,0.02)]"
              >
                <p className="font-serif text-6xl font-extrabold leading-[0.8] text-[#8b0000]">
                  &ldquo;
                </p>
                <p className="text-[15px] italic leading-[1.6] text-[#444]">{t.quote}</p>
                <div className="h-px w-full bg-[#e5e7eb]" />
                <div className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold text-[#3d1010]">{t.name}</p>
                    <p className="text-[13px] text-[#8c8c8c]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
