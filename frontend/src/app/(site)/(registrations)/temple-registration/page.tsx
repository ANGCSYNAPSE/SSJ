"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, ChevronDown, UploadCloud, Check } from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

function FormSelect({
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
        className="flex h-12 w-full items-center justify-between rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#3e1815]"
      >
        {value}
        <ChevronDown
          className={`h-3 w-3 text-[#3e1815] transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm ${
                value === option
                  ? "bg-primary text-white"
                  : "text-[#3e1815] hover:bg-cream"
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

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <div className="flex items-start gap-1 text-sm font-semibold text-[#3e1815]">
      <p>{label}</p>
      {required && <p className="text-primary">*</p>}
    </div>
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
      className="h-12 w-full rounded-lg border border-[#e5e7eb] px-4 text-sm text-[#3e1815] placeholder:text-[#9ca3af] focus:border-primary focus:outline-none"
    />
  );
}

function TextArea({
  placeholder,
  value,
  onChange,
  rows = 3,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full resize-none rounded-lg border border-[#e5e7eb] p-4 text-sm text-[#3e1815] placeholder:text-[#9ca3af] focus:border-primary focus:outline-none"
    />
  );
}

function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2 border-primary ${
          checked ? "bg-primary" : "bg-white"
        }`}
        aria-pressed={checked}
      >
        {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
      </button>
      <div className="flex-1 text-sm text-[#3e1815]">{children}</div>
    </label>
  );
}

function FormCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 rounded-[20px] border border-[rgba(212,175,55,0.25)] bg-white p-8 shadow-[0px_12px_16px_rgba(139,0,0,0.05)] sm:p-12">
      {title && (
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-serif text-[32px] font-semibold leading-[1.1] text-maroon sm:text-[44px]">
            {title}
          </h2>
          <div className="h-[3px] w-[100px] rounded-full bg-[#e47105]" />
        </div>
      )}
      {children}
    </div>
  );
}

const templeTypes = ["Mandir", "Dham", "Ashram", "Shrine", "Temple Complex"];
const states = ["Rajasthan", "Delhi", "Gujarat", "Maharashtra", "Uttar Pradesh"];

const services = [
  { title: "Daily Darshan", desc: "Regular public viewing hours" },
  { title: "Prasad Distribution", desc: "Daily offering of sacred food" },
  { title: "Marriage Ceremonies", desc: "Space/services for holy matrimony" },
  { title: "Annapurna Seva (Free Meals)", desc: "Free community kitchen / Bhandara" },
  { title: "Spiritual Discourses", desc: "Pravachan, satsang or katha facilities" },
  { title: "Festival Celebrations", desc: "Special arrangements for big occasions like Falgun Mela" },
  { title: "Meditation Hall", desc: "Quiet prayer/dhyana space" },
  { title: "Dharamshala / Guest Stay", desc: "Lodging for visiting pilgrims" },
  { title: "Gaushala (Cow Shelter)", desc: "Caring for sacred cows on premises" },
  { title: "Vedic Pathshala", desc: "Education programs for scriptures" },
];

const whyFeatures = [
  {
    emoji: "🫂",
    title: "Reach Devotees",
    desc: "Connect with millions of devotees searching for temples near them, guiding them to your holy site.",
  },
  {
    emoji: "📅",
    title: "Manage Events",
    desc: "Announce regular festivals, special poojas, and bhandaras to a wider, highly engaged audience.",
  },
  {
    emoji: "🪙",
    title: "Receive Donations",
    desc: "Accept online donations securely and transparently, generating direct financial support for temple maintenance.",
  },
  {
    emoji: "✨",
    title: "Build Community",
    desc: "Grow your temple audience digital-first, sending blessings and sharing spiritual teachings smoothly.",
  },
];

export default function TempleRegistrationPage() {
  const [templeName, setTempleName] = useState("");
  const [deity, setDeity] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [templeType, setTempleType] = useState(templeTypes[0]);
  const [trustName, setTrustName] = useState("");
  const [regNumber, setRegNumber] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(states[0]);
  const [pinCode, setPinCode] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [aartiTimings, setAartiTimings] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const [certifyAccurate, setCertifyAccurate] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [consentComms, setConsentComms] = useState(false);

  function toggleService(title: string) {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden px-6 py-20 lg:px-[120px] lg:py-24">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/temple-registration/hero.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgba(61,16,16,0.75)]" />
        </div>
        <div className="relative flex flex-col items-center gap-6 text-center">
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-[56px]">
            Register Your Temple
          </h1>
          <p className="max-w-[800px] text-base leading-7 text-cream sm:text-lg">
            List your temple on Shyam Jagat and connect with millions of devotees.
            Help pilgrims discover your sacred space, services, daily darshan
            timings, and upcoming festivals.
          </p>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      <form onSubmit={handleSubmit} className="bg-cream px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-8">
          {/* Temple Information */}
          <FormCard title="Temple Information">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <FieldLabel label="Temple Name" required />
                <TextInput
                  placeholder="e.g. Shree Khatu Shyam Ji Temple"
                  value={templeName}
                  onChange={setTempleName}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Deity / Presiding God" required />
                <TextInput
                  placeholder="e.g. Khatu Shyam Ji, Hanuman Ji, Shiv Ji"
                  value={deity}
                  onChange={setDeity}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Year of Establishment" required />
                <TextInput
                  placeholder="e.g. 1956 or ancient"
                  value={yearEstablished}
                  onChange={setYearEstablished}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Temple Type" required />
                <FormSelect options={templeTypes} value={templeType} onChange={setTempleType} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Temple Trust / Organization Name" required />
                <TextInput
                  placeholder="e.g. Shree Shyam Mandir Committee"
                  value={trustName}
                  onChange={setTrustName}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Registration Number (Optional)" />
                <TextInput
                  placeholder="Trust/Society Registration No."
                  value={regNumber}
                  onChange={setRegNumber}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#3e1815]">
                Upload Primary Temple Photo
              </p>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border-[1.5px] border-dashed border-[#e47105] bg-cream p-6"
              >
                <Camera className="h-8 w-8 text-primary" />
                <p className="text-sm font-semibold text-primary">Upload Temple Photo</p>
                <p className="text-xs text-[#8c8c8c]">
                  This will be featured as the primary image of your temple profile (Max
                  5MB)
                </p>
              </button>
            </div>
          </FormCard>

          {/* Location & Contact */}
          <FormCard title="Location & Contact Details">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <FieldLabel label="Full Address" required />
                <TextArea
                  placeholder="Enter complete physical address of the temple..."
                  value={address}
                  onChange={setAddress}
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="City / Town" required />
                  <TextInput placeholder="e.g. Sikar" value={city} onChange={setCity} />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="State" required />
                  <FormSelect options={states} value={state} onChange={setState} />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="PIN Code" required />
                  <TextInput placeholder="e.g. 332602" value={pinCode} onChange={setPinCode} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-[#3e1815]">
                  Google Maps Link (Optional)
                </p>
                <TextInput
                  placeholder="Paste the share link or coordinates URL from Google Maps"
                  value={mapsLink}
                  onChange={setMapsLink}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Contact Person Name" required />
                  <TextInput
                    placeholder="e.g. Pujari Ji / Secretary"
                    value={contactName}
                    onChange={setContactName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Contact Phone" required />
                  <TextInput
                    placeholder="e.g. +91 9876543210"
                    value={contactPhone}
                    onChange={setContactPhone}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Contact Email" required />
                  <TextInput
                    placeholder="e.g. mandir@shyamjagat.org"
                    value={contactEmail}
                    onChange={setContactEmail}
                  />
                </div>
              </div>
            </div>
          </FormCard>

          {/* Temple Details & Services */}
          <FormCard title="Temple Details & Services">
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Daily Opening Time" required />
                  <TextInput
                    placeholder="e.g. 05:00 AM"
                    value={openingTime}
                    onChange={setOpeningTime}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Daily Closing Time" required />
                  <TextInput
                    placeholder="e.g. 09:00 PM"
                    value={closingTime}
                    onChange={setClosingTime}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Special Aarti Timings" required />
                <TextArea
                  placeholder="e.g. Mangla Aarti 5:00 AM, Shringaar Aarti 8:30 AM, Sandhya Aarti 7:00 PM"
                  value={aartiTimings}
                  onChange={setAartiTimings}
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-[#3e1815]">Services Offered</p>
                <div className="grid grid-cols-3 gap-3">
                  {services.map((service) => (
                    <Checkbox
                      key={service.title}
                      checked={selectedServices.includes(service.title)}
                      onChange={() => toggleService(service.title)}
                    >
                      <p className="font-medium text-[#3e1815]">{service.title}</p>
                      <p className="text-xs text-[#8c8c8c]">{service.desc}</p>
                    </Checkbox>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Brief Description of Temple" required />
                <TextArea
                  placeholder="Tell devotees about your temple history, significance, legendary miracles, and what makes this sacred space special..."
                  value={description}
                  onChange={setDescription}
                  rows={5}
                />
              </div>
            </div>
          </FormCard>

          {/* Upload Gallery */}
          <FormCard title="Temple Photo Gallery">
            <button
              type="button"
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-[1.5px] border-dashed border-[#e47105] bg-cream p-8"
            >
              <UploadCloud className="h-10 w-10 text-primary" />
              <p className="flex items-center gap-1 text-base font-semibold text-[#3e1815]">
                Drag &amp; drop photos of your temple here or{" "}
                <span className="text-primary underline">Browse Files</span>
              </p>
              <p className="max-w-[760px] text-center text-[13px] text-[#8c8c8c]">
                Upload up to 10 photos. Accepted formats: JPG, PNG. Max 5MB per photo.
                Include photos of the main deity, temple exterior, interior, and
                premises.
              </p>
            </button>
          </FormCard>

          {/* Terms & Submit */}
          <FormCard>
            <div className="flex flex-col gap-5">
              <Checkbox checked={certifyAccurate} onChange={setCertifyAccurate}>
                I certify that the information provided is accurate and I am
                authorized to register this temple on behalf of the temple trust.
              </Checkbox>
              <Checkbox checked={agreeTerms} onChange={setAgreeTerms}>
                I agree to the Terms of Service and Privacy Policy of Shyam Jagat
                spiritual platform.
              </Checkbox>
              <Checkbox checked={consentComms} onChange={setConsentComms}>
                I consent to receiving communications about platform updates and
                devotee inquiries.
              </Checkbox>
            </div>
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-[#e47105] py-4 text-base font-bold text-white shadow-[0px_8px_8px_rgba(228,113,5,0.15)] transition hover:bg-primary-dark"
              >
                Submit Temple Registration
              </button>
              <p className="flex items-center gap-1 text-sm text-[#595656]">
                Already registered?{" "}
                <Link href="/login" className="font-semibold text-maroon underline">
                  Login here
                </Link>
              </p>
            </div>
          </FormCard>
        </div>
      </form>

      <AdSlot size="rectangle" />

      {/* Why Choose */}
      <section className="bg-[#fffbf3] px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1224px] flex-col gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-serif text-[32px] font-semibold leading-[1.1] text-maroon sm:text-[44px]">
              Why List Your Temple on Shyam Jagat?
            </h2>
            <div className="h-[3px] w-[100px] rounded-full bg-[#e47105]" />
            <p className="max-w-[760px] text-base leading-relaxed text-[#595656]">
              Connecting sacred places of devotion with millions of seekers
              worldwide. Simplify communication, organize events, and manage
              community support effortlessly.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-4 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6 shadow-[0px_12px_16px_rgba(139,0,0,0.05)]"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-cream text-2xl">
                  {feature.emoji}
                </div>
                <h3 className="font-serif text-[22px] font-bold text-[#3e1815]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-[22px] text-[#595656]">{feature.desc}</p>
                <div className="h-0.5 w-full rounded-full bg-[#e47105]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
