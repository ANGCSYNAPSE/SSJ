"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, MapPin, Star, Upload, Users } from "lucide-react";

function AdPlaceholder() {
  return (
    <div className="mx-auto flex max-w-[1212px] flex-col items-center gap-3 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#f3f4f6] p-6 text-center">
      <span className="rounded-full bg-[#e5e7eb] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-maroon">
        Ad Placeholder
      </span>
      <p className="font-serif text-[28px] font-bold text-maroon">Premium Ad Space</p>
      <p className="max-w-[640px] text-sm leading-[22px] text-[#595656]">
        Reserve this high-visibility placement for sponsorships, pilgrim services, or
        sacred travel offers.
      </p>
    </div>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-maroon text-sm font-bold text-white">
      {n}
    </span>
  );
}

function FormSection({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 border-t border-[rgba(212,175,55,0.25)] pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3">
        <StepNumber n={step} />
        <h2 className="font-serif text-2xl font-bold text-[#3d1010]">{title}</h2>
      </div>
      {children}
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

function AmenityToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition ${
        checked
          ? "border-primary bg-primary/[0.06] text-primary"
          : "border-[#e5e7eb] bg-white text-[#595656]"
      }`}
    >
      <span
        className={`flex size-4 shrink-0 items-center justify-center rounded ${
          checked ? "border border-primary bg-primary" : "border border-[#e5e7eb] bg-white"
        }`}
      >
        {checked && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />}
      </span>
      {label}
    </button>
  );
}

function UploadBox({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <FieldLabel label={label} required />
      <button
        type="button"
        className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[rgba(212,175,55,0.4)] bg-[#fffbf3] p-5 text-center"
      >
        <Upload className="h-6 w-6 text-primary" />
        <p className="text-sm font-semibold text-primary">Upload Document</p>
        <p className="text-[11px] text-[#8c8c8c]">{hint}</p>
      </button>
    </div>
  );
}

const distanceOptions = ["Within 500 Meters", "Within 1 Km", "Within 2 Km", "More than 2 Km"];
const stateOptions = [
  "Rajasthan", "Delhi", "Uttar Pradesh", "Gujarat", "Maharashtra", "Madhya Pradesh", "Haryana", "Punjab",
];
const pricingModeOptions = ["Voluntary Donation (Seva)", "Fixed Price", "Both Options Available"];
const amenitiesList = [
  "AC Rooms",
  "Geyser / Hot Water",
  "In-house Bhojnalaya (Mess)",
  "Lift Facility",
  "Parking Area",
  "CCTV Security",
  "Wheelchair / Ramp Access",
  "Free RO Drinking Water",
];

const steps = [
  {
    number: "01",
    title: "Fill Guesthouse Details",
    desc: "Provide your room counts, pricing, contact details, and precise location relative to Khatu Shyam Mandir.",
  },
  {
    number: "02",
    title: "Verification & Approval",
    desc: "Shyam Jagat trust coordinators will review the uploaded Trust documents and photos for quick validation.",
  },
  {
    number: "03",
    title: "Host Blessed Devotees",
    desc: "Once approved, your dharamshala appears in the directory for thousands of pilgrims seeking lodging.",
  },
];

const lodgings = [
  {
    image: "/images/dharamshala-registration/lodging-kripa-bhawan.png",
    name: "Shree Shyam Kripa Bhawan",
    location: "Ringas Road, Khatu (200m from Temple)",
    capacity: "Capacity: 250 Devotees",
  },
  {
    image: "/images/dharamshala-registration/lodging-marwari-trust.png",
    name: "Marwari Dharamshala Trust",
    location: "Khatushyamji, Rajasthan (400m from Temple)",
    capacity: "Capacity: 400 Devotees",
  },
  {
    image: "/images/dharamshala-registration/lodging-seva-sadan.png",
    name: "Shree Shyam Seva Sadan",
    location: "Near Main Pond, Khatu (100m from Temple)",
    capacity: "Capacity: 150 Devotees",
  },
];

const testimonials = [
  {
    quote:
      "Listing our trust dharamshala on Shyam Jagat significantly increased our occupancy, helping us direct our free mess facilities (Bhojnalaya) to thousands of genuine devotees who needed it.",
    avatar: "/images/dharamshala-registration/avatar-ghanshyam.png",
    name: "Ghanshyam Das Poddar",
    role: "President, Shree Radhe Shyam Trust",
  },
  {
    quote:
      "The verification and list approvals are completely free, managed with pure devotional transparency. Devotees write back to us expressing extreme gratitude for our clean shelters.",
    avatar: "/images/dharamshala-registration/avatar-mahendra.png",
    name: "Mahendra Sikarwar",
    role: "Chief Coordinator, Khatu Dham Guesthouse",
  },
];

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[1.12px] text-primary">{eyebrow}</p>
      <h2 className="font-serif text-4xl font-semibold leading-[1.1] text-maroon sm:text-[48px]">
        {title}
      </h2>
      <div className="h-[3px] w-[100px] bg-primary" />
      {desc && <p className="max-w-[760px] text-base leading-relaxed text-[#595656]">{desc}</p>}
    </div>
  );
}

export default function DharamshalaRegistrationPage() {
  const [name, setName] = useState("");
  const [trustName, setTrustName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [distance, setDistance] = useState(distanceOptions[0]);
  const [address, setAddress] = useState("");
  const [state, setState] = useState(stateOptions[0]);
  const [managerName, setManagerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [dormitoryBeds, setDormitoryBeds] = useState("");
  const [pricingMode, setPricingMode] = useState(pricingModeOptions[0]);
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);

  function toggleAmenity(item: string) {
    setAmenities((prev) => (prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden px-6 py-20 lg:px-20">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/dharamshala-registration/hero.png"
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
          <h1 className="font-serif text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[56px]">
            Register Your Dharamshala
          </h1>
          <p className="max-w-[800px] text-base leading-7 text-cream sm:text-lg">
            List your pilgrim accommodation on Shyam Jagat to help visiting devotees
            find safe, clean, and reliable shelter during their sacred pilgrimage to
            Khatu Dham.
          </p>
        </div>
      </section>

      {/* Registration form section */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1212px] flex-col gap-12">
          <AdPlaceholder />

          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[1.12px] text-primary">
              Pilgrim Service Seva
            </p>
            <h1 className="max-w-[850px] font-serif text-4xl font-bold text-maroon sm:text-[40px]">
              Accommodation Details &amp; Application
            </h1>
            <div className="h-[3px] w-[100px] bg-primary" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-[#fffbf3] p-6 sm:p-12"
          >
            <FormSection step={1} title="Trust & Property Information">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Dharamshala / Guesthouse Name" required />
                  <TextInput
                    placeholder="e.g., Shree Shyam Kripa Dharamshala"
                    value={name}
                    onChange={setName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Governing Trust / Society Name" />
                  <TextInput
                    placeholder="e.g., Shree Shyam Seva Trust"
                    value={trustName}
                    onChange={setTrustName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Trust Registration / License Number" required />
                  <TextInput
                    placeholder="e.g., TRUST/2024/RJ/45612"
                    value={licenseNumber}
                    onChange={setLicenseNumber}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Distance from Khatu Shyam Temple" required />
                  <Select options={distanceOptions} value={distance} onChange={setDistance} />
                </div>
              </div>
            </FormSection>

            <FormSection step={2} title="Contact & Address Details">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Full Address" required />
                  <TextInput
                    placeholder="e.g., Temple Road, Khatu Dham, Sikar, Rajasthan"
                    value={address}
                    onChange={setAddress}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="State" required />
                  <Select options={stateOptions} value={state} onChange={setState} />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Manager / Contact Person Name" required />
                  <TextInput
                    placeholder="e.g., Ramesh Chand Sharma"
                    value={managerName}
                    onChange={setManagerName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Mobile / WhatsApp Number" required />
                  <TextInput
                    placeholder="e.g., +91 98765 43210"
                    value={mobile}
                    onChange={setMobile}
                  />
                </div>
              </div>
            </FormSection>

            <FormSection step={3} title="Accommodation & Pricing Details">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Total Number of Rooms" required />
                  <TextInput
                    placeholder="e.g., 45 Rooms"
                    value={totalRooms}
                    onChange={setTotalRooms}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Dormitory Beds (If available)" />
                  <TextInput
                    placeholder="e.g., 2 Dormitories (20 Beds each)"
                    value={dormitoryBeds}
                    onChange={setDormitoryBeds}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Pricing Mode" required />
                  <Select options={pricingModeOptions} value={pricingMode} onChange={setPricingMode} />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Suggested Price / Donation Per Night (INR)" required />
                  <TextInput
                    placeholder="e.g., Rs. 500 / Day (Non-AC)"
                    value={suggestedPrice}
                    onChange={setSuggestedPrice}
                  />
                </div>
              </div>
            </FormSection>

            <FormSection step={4} title="Amenities Provided">
              <div className="flex flex-wrap gap-3">
                {amenitiesList.map((item) => (
                  <AmenityToggle
                    key={item}
                    label={item}
                    checked={amenities.includes(item)}
                    onChange={() => toggleAmenity(item)}
                  />
                ))}
              </div>
            </FormSection>

            <FormSection step={5} title="Verification & Photos">
              <div className="flex flex-col gap-6 sm:flex-row">
                <UploadBox
                  label="Trust Certificate / Society Registration Copy"
                  hint="PDF or JPG up to 5MB"
                />
                <UploadBox
                  label="Property Front & Room Photos"
                  hint="Upload 3-5 images in a ZIP or individually"
                />
                <UploadBox
                  label="Manager Government ID Proof"
                  hint="Aadhar Card, PAN, or Passport"
                />
              </div>
            </FormSection>

            <div className="flex flex-col gap-8 border-t border-[rgba(212,175,55,0.25)] pt-8">
              <label className="flex cursor-pointer items-start gap-3">
                <button
                  type="button"
                  onClick={() => setConsent((v) => !v)}
                  className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded ${
                    consent ? "bg-primary" : "border border-[#e5e7eb] bg-white"
                  }`}
                >
                  {consent && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />}
                </button>
                <span className="flex-1 text-sm text-[#595656]">
                  We declare that the information provided is correct and the
                  accommodation is clean, secure, and maintained according to pilgrim
                  comfort standards. We authorize Shyam Jagat to verify the details.
                </span>
              </label>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded-lg bg-[#e47105] px-12 py-4 text-base font-bold text-white transition hover:bg-primary-dark"
                >
                  Submit Registration Details
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <SectionHeader eyebrow="Simple Process" title="Register Guesthouse in 3 Steps" />
          <div className="grid gap-10 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-center gap-6">
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-5xl font-extrabold text-[#8b0000]">
                      {step.number}
                    </p>
                    {i < steps.length - 1 && (
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

      {/* Registered dharamshalas */}
      <section className="bg-white px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <SectionHeader
            eyebrow="Sacred Accommodations"
            title="Registered Dharamshalas"
            desc="A small glimpse of our existing, highly trusted pilgrim rest houses actively serving the community."
          />
          <div className="grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lodgings.map((lodging) => (
              <div
                key={lodging.name}
                className="w-full max-w-[360px] overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#fffbf3] shadow-[0px_8px_12px_rgba(107,31,31,0.03)]"
              >
                <div className="relative h-[220px] w-full">
                  <Image
                    src={lodging.image}
                    alt={lodging.name}
                    fill
                    className="object-cover"
                    sizes="360px"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-maroon px-2.5 py-1 text-[11px] font-semibold text-white">
                      Pilgrim Shelter
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#e87722] text-[#e87722]" />
                      ))}
                    </div>
                  </div>
                  <h3 className="truncate font-serif text-[22px] font-bold text-[#3d1010]">
                    {lodging.name}
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#595656]">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{lodging.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#595656]">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      {lodging.capacity}
                    </div>
                  </div>
                  <div className="h-px w-full bg-[#e5e7eb]" />
                  <Link
                    href="#"
                    className="flex items-center justify-between text-sm font-semibold text-primary"
                  >
                    View Lodging Info <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <SectionHeader eyebrow="Service Tributes" title="Trustees & Manager Words" />
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
