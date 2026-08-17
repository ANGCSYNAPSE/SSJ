"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import { artistRegistrationValidationSchema, type ArtistRegistrationFormData } from "@/lib/validations/artist-registration";
import { Upload, X, FileText } from "lucide-react";

export default function ArtistRegistrationPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedWorkFiles, setUploadedWorkFiles] = useState<File[]>([]);

  const formik = useFormik<Partial<ArtistRegistrationFormData>>({
    initialValues: {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "Select Gender",
      city: "",
      state: "Rajasthan",
      profilePhoto: undefined,
      artistType: "Singer",
      experience: "0-1 years",
      bio: "",
      agreeToTerms: false,
    },
    validationSchema: artistRegistrationValidationSchema,
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      alert("Artist registration submitted successfully!");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setUploadedFile(file);
      formik.setFieldValue("profilePhoto", file);
    }
  };

  const genderOptions = ["Male", "Female", "Other", "Prefer Not to Say"];
  const artistTypes = ["Singer", "Musician", "Dancer", "Speaker", "Painter", "Composer", "Other"];
  const experienceOptions = ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"];
  const indianStates = [
    "Rajasthan", "Uttar Pradesh", "Maharashtra", "Gujarat", "Delhi", "Karnataka",
    "Tamil Nadu", "West Bengal", "Punjab", "Haryana", "Madhya Pradesh", "Andhra Pradesh",
    "Telangana", "Kerala", "Bihar", "Jharkhand", "Odisha", "Assam", "Himachal Pradesh",
    "Jammu & Kashmir", "Ladakh", "Uttarakhand", "Chhattisgarh", "Goa", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura", "Arunachal Pradesh"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/artist-reg/hero.png"
          alt="Artist Registration"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          {/* Main Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Register as an Artist
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join Shyam Jagat's growing community of devotional artists. Showcase your talent at spiritual events, cultural programs, and sacred gatherings across India.
          </p>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="bg-[#FBF6F1] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="bg-white rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">Personal Information</h2>
              <div className="h-1 w-20 bg-[#E07C2D] mx-auto"></div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-8">
              {/* Row 1: Full Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...formik.getFieldProps("fullName")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.fullName && formik.errors.fullName
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...formik.getFieldProps("emailAddress")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.emailAddress && formik.errors.emailAddress
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  />
                  {formik.touched.emailAddress && formik.errors.emailAddress && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.emailAddress}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone Number and Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 10-digit mobile number"
                    {...formik.getFieldProps("phoneNumber")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="DD / MM / YYYY"
                    {...formik.getFieldProps("dateOfBirth")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.dateOfBirth}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Gender and City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("gender")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.gender && formik.errors.gender
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  >
                    <option value="Select Gender">Select Gender</option>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city of residence"
                    {...formik.getFieldProps("city")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.city && formik.errors.city
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
                  )}
                </div>
              </div>

              {/* Row 4: State and Profile Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("state")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.state && formik.errors.state
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  >
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {formik.touched.state && formik.errors.state && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
                  )}
                </div>

                {/* Profile Photo */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Profile Photo <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                      formik.touched.profilePhoto && formik.errors.profilePhoto
                        ? "border-red-500 bg-red-50"
                        : "border-[#E07C2D] bg-[#FFF0E6]"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {uploadedFile ? (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-[#583939] font-semibold text-sm">{uploadedFile.name}</p>
                        <p className="text-xs text-[#666]">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedFile(null);
                            formik.setFieldValue("profilePhoto", undefined);
                          }}
                          className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                        >
                          <X className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-[#E07C2D] mb-2" />
                        <p className="text-[#E07C2D] font-semibold text-sm">Upload Photo</p>
                        <p className="text-xs text-[#666] mt-1">JPG, PNG format, (Max 2MB)</p>
                      </div>
                    )}
                  </div>
                  {formik.touched.profilePhoto && formik.errors.profilePhoto && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.profilePhoto}</p>
                  )}
                </div>
              </div>

              <p className="text-xs text-[#666] text-center">
                * Required fields. Your information is secure and will only be used for artist profile verification.
              </p>
            </form>
          </div>

          {/* Your Art & Expertise Section */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 mt-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">Your Art & Expertise</h2>
              <div className="h-1 w-20 bg-[#E07C2D] mx-auto"></div>
            </div>

            <div className="space-y-8">
              {/* Row 1: Primary Art Form and Secondary Art Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Primary Art Form */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Primary Art Form <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("artistType")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.artistType && formik.errors.artistType
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  >
                    {artistTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {formik.touched.artistType && formik.errors.artistType && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.artistType}</p>
                  )}
                </div>

                {/* Secondary Art Form */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Secondary Art Form (Optional)
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] focus:border-[#E07C2D] focus:outline-none transition-all">
                    <option value="">Select Secondary Art Form</option>
                    {artistTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Years of Experience and Guru/Teacher Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("experience")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.experience && formik.errors.experience
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  >
                    {experienceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {formik.touched.experience && formik.errors.experience && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.experience}</p>
                  )}
                </div>

                {/* Guru / Teacher Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Guru / Teacher Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Name of your Guru or Academy"
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] focus:border-[#E07C2D] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Brief Bio / About Your Art */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Brief Bio / About Your Art <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Tell us about your journey as an artist, your training, and what inspires your devotional art..."
                  {...formik.getFieldProps("bio")}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all resize-none ${
                    formik.touched.bio && formik.errors.bio
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.bio && formik.errors.bio && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.bio}</p>
                )}
              </div>

              {/* Portfolio Link */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Portfolio Link (YouTube, Instagram or Website)
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/yourchannel"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] focus:border-[#E07C2D] focus:outline-none transition-all"
                />
              </div>

              <p className="text-xs text-[#666] text-center">
                Your information will help us understand your artistic background and connect you with the right opportunities.
              </p>
            </div>
          </div>

          {/* Upload Your Work Section */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 mt-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">Upload Your Work</h2>
              <div className="h-1 w-20 bg-[#E07C2D] mx-auto"></div>
            </div>

            <div className="space-y-8">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-[#E07C2D] rounded-xl p-8 sm:p-12 bg-[#FFF0E6] text-center">
                <div
                  className="cursor-pointer"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    const newFiles = [...uploadedWorkFiles, ...files].slice(0, 5);
                    setUploadedWorkFiles(newFiles);
                  }}
                >
                  <Upload className="w-12 h-12 text-[#E07C2D] mx-auto mb-3" />
                  <p className="text-[#583939] font-semibold mb-1">
                    Drag & drop your photos, videos, or audio files here
                  </p>
                  <label className="text-[#E07C2D] cursor-pointer font-semibold hover:underline">
                    or Browse Files
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.mp4,.mp3,.mid,.midi"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        const newFiles = [...uploadedWorkFiles, ...files].slice(0, 5);
                        setUploadedWorkFiles(newFiles);
                      }}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-[#999] mt-2">
                    Accepted formats: JPG, PNG, MP4, MP3, Max MIDI per file. Upload up to 5 files.
                  </p>
                </div>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedWorkFiles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                  {uploadedWorkFiles.map((file, idx) => (
                    <div key={idx} className="bg-[#FBF6F1] rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="w-6 h-6 text-[#E07C2D] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#583939] truncate">{file.name}</p>
                          <p className="text-xs text-[#666]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedWorkFiles(uploadedWorkFiles.filter((_, i) => i !== idx));
                        }}
                        className="ml-2 p-1 hover:bg-red-100 rounded-full transition-all flex-shrink-0"
                      >
                        <X className="w-5 h-5 text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Availability & Preferences Section */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 mt-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">Availability & Preferences</h2>
              <div className="h-1 w-20 bg-[#E07C2D] mx-auto"></div>
            </div>

            <div className="space-y-8">
              {/* Available for Events */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-4">
                  Available for Events <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {["Bhajan Sandhya", "Temple Festivals", "Cultural Programs", "Private Events", "Weddings & Celebrations", "Online Events"].map((event) => (
                    <div key={event} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={event}
                        className="w-4 h-4 accent-[#E07C2D] cursor-pointer"
                      />
                      <label htmlFor={event} className="text-sm text-[#583939] cursor-pointer">
                        {event}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferred Performance Regions */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-4">
                  Preferred Performance Regions <span className="text-red-500">*</span>
                </label>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {["Rajasthan", "Delhi NCR", "Uttar Pradesh", "Madhya Pradesh", "Gujarat", "Maharashtra", "Pan India"].map((region) => (
                    <div key={region} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={region}
                        className="w-4 h-4 accent-[#E07C2D] cursor-pointer"
                      />
                      <label htmlFor={region} className="text-sm text-[#583939] cursor-pointer">
                        {region}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row: Expected Honorarium Range and Travel Willingness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Expected Honorarium Range */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Expected Honorarium Range <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] focus:border-[#E07C2D] focus:outline-none transition-all">
                    <option>₹15,000-50,000</option>
                    <option>₹50,000-100,000</option>
                    <option>₹100,000-250,000</option>
                    <option>₹250,000-500,000</option>
                    <option>₹500,000+</option>
                  </select>
                </div>

                {/* Travel Willingness */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-4">
                    Travel Willingness <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    {["Within City", "Within State", "Across India"].map((option) => (
                      <div key={option} className="flex items-center gap-3">
                        <input
                          type="radio"
                          id={option}
                          name="travelWillingness"
                          className="w-4 h-4 accent-[#E07C2D] cursor-pointer"
                        />
                        <label htmlFor={option} className="text-sm text-[#583939] cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission & Agreement Section */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 mt-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">Submission & Agreement</h2>
              <div className="h-1 w-20 bg-[#E07C2D] mx-auto"></div>
            </div>

            <div className="space-y-6">
              {/* Agreement Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    {...formik.getFieldProps("agreeToTerms")}
                    className="mt-1 w-4 h-4 accent-[#E07C2D] cursor-pointer"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-[#583939] cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy of Shyam Jagat.
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consentContact"
                    className="mt-1 w-4 h-4 accent-[#E07C2D] cursor-pointer"
                  />
                  <label htmlFor="consentContact" className="text-sm text-[#583939] cursor-pointer">
                    I consent to being contacted for event opportunities via email and phone.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-[#E07C2D] hover:bg-[#D46B1B] text-white px-8 py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {formik.isSubmitting ? "Submitting..." : "Submit Registration →"}
              </button>

              {/* Login Link */}
              <p className="text-sm text-[#666] text-center">
                Already registered?{" "}
                <Link href="/login" className="text-[#E07C2D] font-semibold hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Shyam Jagat as an Artist Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#583939] mb-4">
              Why Join Shyam Jagat as an Artist?
            </h2>
            <p className="text-base lg:text-lg text-[#666] max-w-2xl mx-auto">
              Devotion meets showcase. Step onto a platform built to honor your sacred craft and connect you with global devotees.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Reach Thousands */}
            <div className="text-center bg-[#FBF6F1] p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-[#583939] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-2">Reach Thousands</h3>
              <div className="h-1 w-16 bg-[#E07C2D] mx-auto mb-4"></div>
              <p className="text-sm text-[#666] leading-relaxed">
                Get discovered by temple boards and premier event organizers across India.
              </p>
            </div>

            {/* Card 2: Sacred Platform */}
            <div className="text-center bg-[#FBF6F1] p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-[#583939] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-2">Sacred Platform</h3>
              <div className="h-1 w-16 bg-[#E07C2D] mx-auto mb-4"></div>
              <p className="text-sm text-[#666] leading-relaxed">
                Perform at prestigious temple festivals, continuous satsangs, and major cultural gatherings.
              </p>
            </div>

            {/* Card 3: Grow Your Art */}
            <div className="text-center bg-[#FBF6F1] p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-[#583939] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.584 2.376a.75.75 0 01.832 0l9 5.25a.75.75 0 11-.832 1.248L12 4.622 3.416 8.874a.75.75 0 01-.832-1.248l9-5.25z" />
                    <path fillRule="evenodd" d="M20.75 10.04a.75.75 0 00-.416-.672l-9-5.25a.75.75 0 00-.668 0l-9 5.25a.75.75 0 00-.416.672v8.42a.75.75 0 00.416.672l9 5.25a.75.75 0 00.668 0l9-5.25a.75.75 0 00.416-.672V10.04zM12 13a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-2">Grow Your Art</h3>
              <div className="h-1 w-16 bg-[#E07C2D] mx-auto mb-4"></div>
              <p className="text-sm text-[#666] leading-relaxed">
                Connect with veteran devotional masters, exchange techniques, and expand your spiritual network.
              </p>
            </div>

            {/* Card 4: Fair Compensation */}
            <div className="text-center bg-[#FBF6F1] p-4 rounded-lg shadow-md hover:shadow-lg transition-all ">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-[#583939] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-2">Fair Compensation</h3>
              <div className="h-1 w-16 bg-[#E07C2D] mx-auto mb-4"></div>
              <p className="text-sm text-[#666] leading-relaxed">
                Experience transparent booking terms and fast, verified digital payments directly to your account.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
