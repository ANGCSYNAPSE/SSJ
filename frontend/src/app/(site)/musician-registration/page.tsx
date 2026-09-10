"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import {
  Camera,
  Check,
  ChevronDown,
  Cloud,
  FileImage,
  Video,
  Volume2,
  XCircle,
} from "lucide-react";
import {
  artistRegistrationValidationSchema,
  type ArtistRegistrationFormData,
} from "@/lib/validations/artist-registration";
import AdSlot from "@/components/ui/AdSlot";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6 shadow-[0px_12px_16px_rgba(139,0,0,0.03)] sm:p-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl font-semibold text-maroon sm:text-[28px]">
          {title}
        </h2>
        <div className="h-[2px] w-[60px] bg-primary" />
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <div className="flex items-center gap-1 text-sm font-semibold text-maroon">
      <p>{label}</p>
      {required && <p className="font-bold text-primary">*</p>}
    </div>
  );
}

function inputClasses(hasError?: boolean) {
  return `h-12 w-full rounded-lg border px-4 text-sm text-[#444] placeholder:text-[#9ca3af] focus:outline-none ${
    hasError ? "border-red-500 bg-red-50" : "border-[#e5e7eb] focus:border-primary"
  }`;
}

function Select({
  options,
  value,
  onChange,
  hasError,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
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
        className={`flex h-12 w-full items-center justify-between rounded-lg border px-4 text-sm text-[#444] ${
          hasError ? "border-red-500 bg-red-50" : "border-[#e5e7eb]"
        }`}
      >
        {value}
        <ChevronDown
          className={`h-4 w-4 text-[#444] transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                value === option ? "bg-primary text-white" : "text-[#444] hover:bg-cream"
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

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-left"
    >
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded border-[1.5px] ${
          checked ? "border-primary bg-primary" : "border-[#e5e7eb] bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      <span className="text-sm text-[#444]">{label}</span>
    </button>
  );
}

function AgreementCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`flex size-5 shrink-0 items-center justify-center rounded border-[1.5px] ${
          checked ? "border-primary bg-primary" : "border-[#e5e7eb] bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </button>
      <span className="flex-1 text-sm text-[#444]">{children}</span>
    </label>
  );
}

function Radio({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button type="button" onClick={onChange} className="flex items-center gap-3">
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] ${
          checked ? "border-primary" : "border-[#e5e7eb]"
        }`}
      >
        {checked && <span className="size-2.5 rounded-full bg-primary" />}
      </span>
      <span className="whitespace-nowrap text-sm text-[#444]">{label}</span>
    </button>
  );
}

const genderOptions = ["Select Gender", "Male", "Female", "Other", "Prefer Not to Say"];
const instrumentGenres = ["Vocals / Bhajan Singing", "Tabla", "Harmonium", "Sitar", "Flute", "Dholak", "Violin", "Other"];
const experienceOptions = ["0-1 Years", "1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"];
const indianStates = [
  "Rajasthan", "Uttar Pradesh", "Maharashtra", "Gujarat", "Delhi", "Karnataka",
  "Tamil Nadu", "West Bengal", "Punjab", "Haryana", "Madhya Pradesh", "Andhra Pradesh",
];
const honorariumOptions = ["₹15,000-50,000", "₹50,000-100,000", "₹100,000-250,000", "₹250,000-500,000", "₹500,000+"];
const eventOptions = ["Bhajan Sandhya", "Temple Festivals", "Cultural Programs", "Private Events", "Weddings & Celebrations", "Online Events"];
const regionOptions = ["Rajasthan", "Delhi NCR", "Uttar Pradesh", "Madhya Pradesh", "Gujarat", "Maharashtra", "Pan India"];
const travelOptions = ["Within City", "Within State", "Across India"];

const whyFeatures = [
  { emoji: "🌐", title: "Reach Thousands", desc: "Get discovered by temple boards and premier event organizers across India." },
  { emoji: "🛕", title: "Sacred Stages", desc: "Perform at prestigious temple festivals, continuous satsangs, and major cultural gatherings." },
  { emoji: "🤝", title: "Grow Your Craft", desc: "Connect with veteran devotional masters, exchange techniques, and expand your spiritual network." },
  { emoji: "💳", title: "Fair Compensation", desc: "Experience transparent booking terms and fast, verified digital payments directly to your account." },
];

const workFileIcons: Record<string, typeof Volume2> = {
  audio: Volume2,
  image: FileImage,
  video: Video,
};

export default function MusicianRegistrationPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [secondaryInstrument, setSecondaryInstrument] = useState("Select Secondary Instrument / Genre");
  const [guruName, setGuruName] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [workFiles, setWorkFiles] = useState<{ name: string; size: string; type: keyof typeof workFileIcons }[]>([]);
  const [availableEvents, setAvailableEvents] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [honorarium, setHonorarium] = useState(honorariumOptions[0]);
  const [travelWillingness, setTravelWillingness] = useState("Across India");
  const [consentContact, setConsentContact] = useState(false);

  const formik = useFormik<Partial<ArtistRegistrationFormData>>({
    initialValues: {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: genderOptions[0],
      city: "",
      state: indianStates[0],
      profilePhoto: undefined,
      artistType: instrumentGenres[0],
      experience: experienceOptions[0],
      bio: "",
      agreeToTerms: false,
    },
    validationSchema: artistRegistrationValidationSchema,
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      alert("Musician registration submitted successfully!");
    },
  });

  function toggleFromList(list: string[], setList: (v: string[]) => void, item: string) {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setUploadedFile(file);
      formik.setFieldValue("profilePhoto", file);
    }
  }

  function removeWorkFile(index: number) {
    setWorkFiles((files) => files.filter((_, i) => i !== index));
  }

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden px-6 py-16 lg:px-20 lg:py-20">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/artist-registration/hero.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgba(61,16,16,0.75)]" />
        </div>
        <div className="relative flex flex-col items-center gap-6 text-center">
          <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl lg:text-[52px]">
            Register as a Musician
          </h1>
          <p className="max-w-[800px] text-base leading-7 text-cream sm:text-lg">
            Join Shyam Jagat&apos;s growing community of devotional musicians.
            Bring divine melodies — kirtan, bhajan, and classical music — to
            spiritual events and sacred gatherings across India.
          </p>
        </div>
      </section>

      <AdSlot size="leaderboard" />

      <form onSubmit={formik.handleSubmit} className="bg-cream px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
          {/* Personal Information */}
          <Card title="Personal Information">
            <div className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Full Name" required />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...formik.getFieldProps("fullName")}
                    className={inputClasses(formik.touched.fullName && !!formik.errors.fullName)}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-sm text-red-500">{formik.errors.fullName}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Email Address" required />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...formik.getFieldProps("emailAddress")}
                    className={inputClasses(formik.touched.emailAddress && !!formik.errors.emailAddress)}
                  />
                  {formik.touched.emailAddress && formik.errors.emailAddress && (
                    <p className="text-sm text-red-500">{formik.errors.emailAddress}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Phone Number" required />
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#444]">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      {...formik.getFieldProps("phoneNumber")}
                      className={`${inputClasses(formik.touched.phoneNumber && !!formik.errors.phoneNumber)} pl-12`}
                    />
                  </div>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="text-sm text-red-500">{formik.errors.phoneNumber}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Date of Birth" required />
                  <input
                    type="text"
                    placeholder="DD / MM / YYYY"
                    {...formik.getFieldProps("dateOfBirth")}
                    className={inputClasses(formik.touched.dateOfBirth && !!formik.errors.dateOfBirth)}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <p className="text-sm text-red-500">{formik.errors.dateOfBirth}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Gender" required />
                  <Select
                    options={genderOptions}
                    value={formik.values.gender ?? genderOptions[0]}
                    onChange={(v) => formik.setFieldValue("gender", v)}
                    hasError={formik.touched.gender && !!formik.errors.gender}
                  />
                  {formik.touched.gender && formik.errors.gender && (
                    <p className="text-sm text-red-500">{formik.errors.gender}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="City" required />
                  <input
                    type="text"
                    placeholder="Enter your city of residence"
                    {...formik.getFieldProps("city")}
                    className={inputClasses(formik.touched.city && !!formik.errors.city)}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="text-sm text-red-500">{formik.errors.city}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="State" required />
                  <Select
                    options={indianStates}
                    value={formik.values.state ?? indianStates[0]}
                    onChange={(v) => formik.setFieldValue("state", v)}
                    hasError={formik.touched.state && !!formik.errors.state}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <p className="text-sm text-red-500">{formik.errors.state}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Profile Photo" required />
                  <label
                    className={`relative flex h-12 cursor-pointer items-center gap-3 rounded-lg border-[1.5px] border-dashed px-4 ${
                      formik.touched.profilePhoto && formik.errors.profilePhoto
                        ? "border-red-500 bg-red-50"
                        : "border-primary bg-cream"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleFileChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <Camera className="h-6 w-6 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-primary">
                        {uploadedFile ? uploadedFile.name : "Upload Photo"}
                      </p>
                      <p className="text-xs text-[#6b7280]">
                        {uploadedFile
                          ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`
                          : "JPG, PNG format (Max 2MB)"}
                      </p>
                    </div>
                  </label>
                  {formik.touched.profilePhoto && formik.errors.profilePhoto && (
                    <p className="text-sm text-red-500">{formik.errors.profilePhoto}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Your Music & Expertise */}
          <Card title="Your Music & Expertise">
            <div className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Primary Instrument / Genre" required />
                  <Select
                    options={instrumentGenres}
                    value={formik.values.artistType ?? instrumentGenres[0]}
                    onChange={(v) => formik.setFieldValue("artistType", v)}
                    hasError={formik.touched.artistType && !!formik.errors.artistType}
                  />
                  {formik.touched.artistType && formik.errors.artistType && (
                    <p className="text-sm text-red-500">{formik.errors.artistType}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Secondary Instrument / Genre (Optional)" />
                  <Select
                    options={["Select Secondary Instrument / Genre", ...instrumentGenres]}
                    value={secondaryInstrument}
                    onChange={setSecondaryInstrument}
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Years of Experience" required />
                  <Select
                    options={experienceOptions}
                    value={formik.values.experience ?? experienceOptions[0]}
                    onChange={(v) => formik.setFieldValue("experience", v)}
                    hasError={formik.touched.experience && !!formik.errors.experience}
                  />
                  {formik.touched.experience && formik.errors.experience && (
                    <p className="text-sm text-red-500">{formik.errors.experience}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Guru / Music Academy Name (Optional)" />
                  <input
                    type="text"
                    placeholder="Name of your Guru or Academy"
                    value={guruName}
                    onChange={(e) => setGuruName(e.target.value)}
                    className={inputClasses()}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Brief Bio / About Your Music" required />
                <textarea
                  placeholder="Tell us about your journey as a musician, your training, and what inspires your devotional music..."
                  {...formik.getFieldProps("bio")}
                  rows={5}
                  className={`w-full resize-none rounded-lg border p-4 text-sm text-[#444] placeholder:text-[#9ca3af] focus:outline-none ${
                    formik.touched.bio && formik.errors.bio
                      ? "border-red-500 bg-red-50"
                      : "border-[#e5e7eb] focus:border-primary"
                  }`}
                />
                {formik.touched.bio && formik.errors.bio && (
                  <p className="text-sm text-red-500">{formik.errors.bio}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel label="Portfolio Link (YouTube, Instagram or Website)" />
                <input
                  type="url"
                  placeholder="https://youtube.com/yourchannel"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className={inputClasses()}
                />
              </div>
            </div>
          </Card>

          {/* Upload Your Work */}
          <Card title="Upload Your Work">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[rgba(212,175,55,0.25)] bg-cream-light p-10 text-center">
                <Cloud className="h-12 w-12 text-primary" />
                <div className="flex flex-col items-center gap-1">
                  <p className="text-base font-semibold text-maroon">
                    Drag &amp; drop your photos, videos, or audio files here
                  </p>
                  <p className="flex items-center gap-1 text-sm">
                    <span className="text-[#6b7280]">or</span>
                    <span className="font-semibold text-primary">Browse Files</span>
                  </p>
                </div>
                <p className="text-xs text-[#6b7280]">
                  Accepted formats: JPG, PNG, MP4, MP3. Max 10MB per file. Upload up to
                  5 files.
                </p>
              </div>
              {workFiles.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-3">
                  {workFiles.map((file, index) => {
                    const Icon = workFileIcons[file.type];
                    return (
                      <div
                        key={file.name}
                        className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] bg-white p-4"
                      >
                        <Icon className="h-6 w-6 shrink-0 text-primary" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[#444]">
                            {file.name}
                          </p>
                          <p className="text-xs text-[#6b7280]">{file.size}</p>
                        </div>
                        <button type="button" onClick={() => removeWorkFile(index)}>
                          <XCircle className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>

          {/* Availability & Preferences */}
          <Card title="Availability & Preferences">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <FieldLabel label="Available for Events" required />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {eventOptions.map((event) => (
                    <Checkbox
                      key={event}
                      label={event}
                      checked={availableEvents.includes(event)}
                      onChange={() => toggleFromList(availableEvents, setAvailableEvents, event)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <FieldLabel label="Preferred Performance Regions" required />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {regionOptions.map((region) => (
                    <Checkbox
                      key={region}
                      label={region}
                      checked={regions.includes(region)}
                      onChange={() => toggleFromList(regions, setRegions, region)}
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel label="Expected Honorarium Range" required />
                  <Select options={honorariumOptions} value={honorarium} onChange={setHonorarium} />
                </div>
                <div className="flex flex-col gap-4">
                  <FieldLabel label="Travel Willingness" required />
                  <div className="flex h-12 items-center gap-6">
                    {travelOptions.map((option) => (
                      <Radio
                        key={option}
                        label={option}
                        checked={travelWillingness === option}
                        onChange={() => setTravelWillingness(option)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Submission & Agreement */}
          <Card title="Submission & Agreement">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <AgreementCheckbox
                  checked={formik.values.agreeToTerms ?? false}
                  onChange={(v) => formik.setFieldValue("agreeToTerms", v)}
                >
                  I agree to the Terms of Service and Privacy Policy of Shyam Jagat.
                </AgreementCheckbox>
                <AgreementCheckbox checked={consentContact} onChange={setConsentContact}>
                  I consent to being contacted for event opportunities via email and
                  phone.
                </AgreementCheckbox>
              </div>
              <div className="flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full rounded-lg bg-primary py-4 text-base font-bold text-white shadow-[0px_8px_8px_rgba(232,119,34,0.2)] transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit Registration →"}
                </button>
                <p className="flex items-center gap-1.5 text-sm text-[#595656]">
                  Already registered?{" "}
                  <Link href="/login" className="font-semibold text-maroon">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </form>

      <AdSlot size="rectangle" />

      {/* Why Join */}
      <section className="border-y border-[rgba(212,175,55,0.25)] bg-[#fffbf3] px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1224px] flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-3xl font-bold leading-[1.1] text-maroon sm:text-[48px]">
              Why Join Shyam Jagat as a Musician?
            </h2>
            <div className="h-[3px] w-[100px] bg-primary" />
            <p className="max-w-[760px] text-base leading-7 text-[#595656] sm:text-lg">
              Devotion meets showcase. Step onto a platform built to honor your sacred
              craft and connect you with global devotees.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-4 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6 shadow-[0px_12px_16px_rgba(139,0,0,0.03)]"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-maroon text-2xl">
                  {feature.emoji}
                </div>
                <h3 className="font-serif text-[22px] font-bold text-maroon">
                  {feature.title}
                </h3>
                <p className="text-sm leading-[22px] text-[#595656]">{feature.desc}</p>
                <div className="h-0.5 w-full rounded-full bg-primary" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
