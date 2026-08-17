"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import { templeRegistrationValidationSchema, type TempleRegistrationFormData } from "@/lib/validations/temple-registration";
import { Upload, X, Users, Calendar, Gift, Sparkles } from "lucide-react";

export default function TempleRegistrationPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const formik = useFormik<Partial<TempleRegistrationFormData>>({
    initialValues: {
      templeName: "",
      deityName: "",
      yearOfEstablishment: "",
      templeType: "Mandir",
      templeTrust: "",
      registrationNumber: "",
      templePhoto: undefined,
      fullAddress: "",
      city: "",
      state: "Rajasthan",
      pinCode: "",
      googleMapsLink: "",
      contactPersonName: "",
      contactPhone: "",
      contactEmail: "",
      dailyOpeningTime: "",
      dailyClosingTime: "",
      specialAartiTimings: "",
      servicesOffered: [],
      templeDescription: "",
      templePhotos: [],
      certification1: false,
      certification2: false,
      certification3: false,
    },
    validationSchema: templeRegistrationValidationSchema,
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      alert("Temple registration submitted successfully!");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setUploadedFile(file);
      formik.setFieldValue("templePhoto", file);
    }
  };

  const templeTypes = ["Mandir", "Gurudwara", "Mosque", "Church", "Monastery", "Shrine", "Other"];
  const availableServices = [
    { id: "daily-darshan", label: "Daily Darshan", description: "Regular public viewing hours" },
    { id: "prasad-distribution", label: "Prasad Distribution", description: "Daily offerings of sacred food" },
    { id: "marriage-ceremonies", label: "Marriage Ceremonies", description: "Specialized services for holy matrimony" },
    { id: "annapoorna-seva", label: "Annapoorna Seva (Free Meals)", description: "Free community kitchen / Bhandarai" },
    { id: "spiritual-discourses", label: "Spiritual Discourses", description: "Pravaachan, satsang or katha facilities" },
    { id: "festival-celebrations", label: "Festival Celebrations", description: "Special arrangements for big occasions" },
    { id: "meditation-hall", label: "Meditation Hall", description: "Quiet prayer/meditative space" },
    { id: "dharamshala", label: "Dharamshala / Guest Stay", description: "Lodging for visiting pilgrims" },
    { id: "goushala", label: "Goushala (Cow Shelter)", description: "Caring for sacred cows on premises" },
    { id: "vedic-pathshala", label: "Vedic Pathshala", description: "Education programs for scriptures" },
  ];
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
          src="/images/temple-reg/hero.png"
          alt="Temple Registration"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

          {/* Main Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Register Your Temple
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            List your temple on Shyam Jagat and connect with millions of devotees. Help pilgrims discover your sacred space, services, daily darshan timings, and upcoming festivals.
          </p>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="bg-[#FBF6F1] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="bg-white rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">Temple Information</h2>
              <div className="h-1 w-20 bg-[#E07C2D] mx-auto"></div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Temple Name */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Temple Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shree Khatu Shyam Ji Temple"
                  {...formik.getFieldProps("templeName")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.templeName && formik.errors.templeName
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.templeName && formik.errors.templeName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.templeName}</p>
                )}
              </div>

              {/* Deity Name */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Deity / Presiding God <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Khatu Shyam, Hanuman Ji, Shiv Ji"
                  {...formik.getFieldProps("deityName")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.deityName && formik.errors.deityName
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.deityName && formik.errors.deityName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.deityName}</p>
                )}
              </div>

              {/* Year of Establishment */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Year of Establishment <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1956 or ancient"
                  {...formik.getFieldProps("yearOfEstablishment")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.yearOfEstablishment && formik.errors.yearOfEstablishment
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.yearOfEstablishment && formik.errors.yearOfEstablishment && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.yearOfEstablishment}</p>
                )}
              </div>

              {/* Temple Type */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Temple Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...formik.getFieldProps("templeType")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.templeType && formik.errors.templeType
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                >
                  {templeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {formik.touched.templeType && formik.errors.templeType && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.templeType}</p>
                )}
              </div>

              {/* Temple Trust / Organization Name */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Temple Trust / Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shree Shyam Mandir Committee"
                  {...formik.getFieldProps("templeTrust")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.templeTrust && formik.errors.templeTrust
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.templeTrust && formik.errors.templeTrust && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.templeTrust}</p>
                )}
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Registration Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Trust/Society Registration No."
                  {...formik.getFieldProps("registrationNumber")}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] focus:border-[#E07C2D] focus:outline-none transition-all"
                />
              </div>

              {/* Upload Primary Temple Photo */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Upload Primary Temple Photo
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    formik.touched.templePhoto && formik.errors.templePhoto
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
                  <div className="flex flex-col items-center">
                    {uploadedFile ? (
                      <>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-[#583939] font-semibold">{uploadedFile.name}</p>
                        <p className="text-sm text-[#666]">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedFile(null);
                            formik.setFieldValue("templePhoto", undefined);
                          }}
                          className="mt-3 text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          <X className="w-4 h-4" /> Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-[#E07C2D]/20 rounded-full flex items-center justify-center mb-3">
                          <Upload className="w-6 h-6 text-[#E07C2D]" />
                        </div>
                        <p className="text-[#E07C2D] font-semibold">Upload Temple Photo</p>
                        <p className="text-sm text-[#666] mt-1">This will be featured as the primary image of your temple profile (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
                {formik.touched.templePhoto && formik.errors.templePhoto && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.templePhoto}</p>
                )}
              </div>
            </form>
          </div>

          {/* Location & Contact Details Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 mt-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">Location & Contact Details</h2>
              <div className="h-1 w-20 bg-[#E07C2D] mx-auto"></div>
            </div>

            <div className="space-y-6">
              {/* Full Address */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Enter complete physical address of the temple..."
                  {...formik.getFieldProps("fullAddress")}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all resize-none ${
                    formik.touched.fullAddress && formik.errors.fullAddress
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.fullAddress && formik.errors.fullAddress && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.fullAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* City / Town */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    City / Town <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sikar"
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
              </div>

              {/* PIN Code */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 332002"
                  {...formik.getFieldProps("pinCode")}
                  maxLength={6}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.pinCode && formik.errors.pinCode
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.pinCode && formik.errors.pinCode && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.pinCode}</p>
                )}
              </div>

              {/* Google Maps Link */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Google Maps Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="Paste the share link or coordinates URL from Google Maps"
                  {...formik.getFieldProps("googleMapsLink")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.googleMapsLink && formik.errors.googleMapsLink
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.googleMapsLink && formik.errors.googleMapsLink && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.googleMapsLink}</p>
                )}
              </div>

              {/* Contact Person Name */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Contact Person Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pujari Ji / Secretary"
                  {...formik.getFieldProps("contactPersonName")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.contactPersonName && formik.errors.contactPersonName
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.contactPersonName && formik.errors.contactPersonName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.contactPersonName}</p>
                )}
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 9876543210"
                  {...formik.getFieldProps("contactPhone")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.contactPhone && formik.errors.contactPhone
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.contactPhone && formik.errors.contactPhone && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.contactPhone}</p>
                )}
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. mandir@shyamjagat.org"
                  {...formik.getFieldProps("contactEmail")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.contactEmail && formik.errors.contactEmail
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.contactEmail && formik.errors.contactEmail && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.contactEmail}</p>
                )}
              </div>
            </div>
          </div>

          {/* Temple Details & Services Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 mt-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">Temple Details & Services</h2>
              <div className="h-1 w-20 bg-[#E07C2D] mx-auto"></div>
            </div>

            <div className="space-y-6">
              {/* Daily Opening & Closing Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Daily Opening Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    {...formik.getFieldProps("dailyOpeningTime")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.dailyOpeningTime && formik.errors.dailyOpeningTime
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  />
                  {formik.touched.dailyOpeningTime && formik.errors.dailyOpeningTime && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.dailyOpeningTime}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">
                    Daily Closing Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    {...formik.getFieldProps("dailyClosingTime")}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                      formik.touched.dailyClosingTime && formik.errors.dailyClosingTime
                        ? "border-red-500 bg-red-50"
                        : "border-[#E0E0E0] focus:border-[#E07C2D]"
                    }`}
                  />
                  {formik.touched.dailyClosingTime && formik.errors.dailyClosingTime && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.dailyClosingTime}</p>
                  )}
                </div>
              </div>

              {/* Special Aarti Timings */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Special Aarti Timings <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mangla Aarti 5:00 AM, Shringaar Aarti 8:30 AM, Sandhya Aarti 7:00 PM"
                  {...formik.getFieldProps("specialAartiTimings")}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    formik.touched.specialAartiTimings && formik.errors.specialAartiTimings
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.specialAartiTimings && formik.errors.specialAartiTimings && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.specialAartiTimings}</p>
                )}
              </div>

              {/* Services Offered */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-4">
                  Services Offered <span className="text-red-500">*</span>
                </label>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                  {availableServices.map((service) => (
                    <div key={service.id} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id={service.id}
                        value={service.id}
                        checked={formik.values.servicesOffered?.includes(service.id) || false}
                        onChange={(e) => {
                          const updatedServices = formik.values.servicesOffered || [];
                          if (e.target.checked) {
                            formik.setFieldValue("servicesOffered", [...updatedServices, service.id]);
                          } else {
                            formik.setFieldValue(
                              "servicesOffered",
                              updatedServices.filter((s) => s !== service.id)
                            );
                          }
                        }}
                        className="mt-1 w-4 h-4 accent-[#E07C2D] cursor-pointer"
                      />
                      <div className="flex-1">
                        <label htmlFor={service.id} className="font-medium text-[#583939] cursor-pointer">
                          {service.label}
                        </label>
                        <p className="text-sm text-[#666]">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {formik.touched.servicesOffered && formik.errors.servicesOffered && (
                  <p className="text-red-500 text-sm mt-2">{formik.errors.servicesOffered}</p>
                )}
              </div>

              {/* Brief Description of Temple */}
              <div>
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Brief Description of Temple <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Tell devotees about your temple history, significance, legendary miracles, and what makes this sacred space special..."
                  {...formik.getFieldProps("templeDescription")}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all resize-none ${
                    formik.touched.templeDescription && formik.errors.templeDescription
                      ? "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] focus:border-[#E07C2D]"
                  }`}
                />
                {formik.touched.templeDescription && formik.errors.templeDescription && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.templeDescription}</p>
                )}
              </div>

            </div>
          </div>

          {/* Temple Photo Gallery Section */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 mt-8">
            <h3 className="font-serif text-3xl font-bold text-[#583939] text-center mb-8">Temple Photo Gallery</h3>

            {/* Photo Upload Area */}
            <div className="border-2 border-dashed border-[#E07C2D] rounded-xl p-8 bg-[#FBF6F1] text-center mb-8">
              <svg className="w-12 h-12 text-[#E07C2D] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <p className="text-[#583939] font-semibold mb-1">
                Drag & drop photos of your temple here or{" "}
                <label className="text-[#E07C2D] cursor-pointer font-semibold hover:underline">
                  Browse Files
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      formik.setFieldValue("templePhotos", files);
                    }}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-sm text-[#999]">
                Upload up to 10 photos. Accepted formats: JPG, PNG, Max 5MB per photo. Include photos of the main deity, temple exterior, interior, and premises.
              </p>
            </div>

            {/* Photo Preview */}
            {formik.values.templePhotos && formik.values.templePhotos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {formik.values.templePhotos.map((file: any, idx: number) => (
                  <div key={idx} className="relative group">
                    <div className="bg-[#F5F5F5] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Temple photo ${idx + 1}`}
                        width={150}
                        height={150}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (formik.values.templePhotos ?? []).filter((_: any, i: number) => i !== idx);
                        formik.setFieldValue("templePhotos", updated);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-[#666] mt-1 truncate">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ))}
              </div>
            )}

            {/* Certification Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="certification1"
                  checked={formik.values.certification1 || false}
                  onChange={(e) => formik.setFieldValue("certification1", e.target.checked)}
                  className="mt-1 w-5 h-5 accent-[#E07C2D] cursor-pointer flex-shrink-0"
                />
                <label htmlFor="certification1" className="text-sm text-[#583939] cursor-pointer">
                  I certify that the information provided is accurate and I am authorized to register this temple on behalf of the temple trust.
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="certification2"
                  checked={formik.values.certification2 || false}
                  onChange={(e) => formik.setFieldValue("certification2", e.target.checked)}
                  className="mt-1 w-5 h-5 accent-[#E07C2D] cursor-pointer flex-shrink-0"
                />
                <label htmlFor="certification2" className="text-sm text-[#583939] cursor-pointer">
                  I agree to the Terms of Service and Privacy Policy of Shyam Jagot spiritual platform.
                </label>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <input
                  type="checkbox"
                  id="certification3"
                  checked={formik.values.certification3 || false}
                  onChange={(e) => formik.setFieldValue("certification3", e.target.checked)}
                  className="mt-1 w-5 h-5 accent-[#E07C2D] cursor-pointer flex-shrink-0"
                />
                <label htmlFor="certification3" className="text-sm text-[#583939] cursor-pointer">
                  I consent to receiving communications about platform updates and devotee inquiries.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#E07C2D] text-white px-8 py-4 rounded-lg font-semibold transition-all hover:bg-[#D46B1B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Registering..." : "Submit Temple Registration"}
            </button>

            <p className="text-sm text-[#666] text-center mt-4">
              Already registered?{" "}
              <Link href="/login" className="text-[#E07C2D] font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>
        {/* Why List Your Temple Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">
              Why List Your Temple on Shyam Jagat?
            </h2>
            <div className="h-1 w-20 bg-[#E07C2D] mx-auto mb-6"></div>
            <p className="text-base text-[#666] max-w-3xl mx-auto leading-relaxed">
              Connecting sacred places of devotion with millions of seekers worldwide. Simplify communication, organize events, and manage community support effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Reach Devotees Card */}
            <div className="bg-[#FBF6F1] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E07C2D]/10 rounded-lg mb-4">
                <Users className="w-6 h-6 text-[#583939]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-3">Reach Devotees</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                Connect with millions of devotees searching for temples near them, guiding them to your site.
              </p>
              <div className="h-1 w-12 bg-[#E07C2D] mx-auto mt-4"></div>
            </div>

            {/* Manage Events Card */}
            <div className="bg-[#FBF6F1] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E07C2D]/10 rounded-lg mb-4">
                <Calendar className="w-6 h-6 text-[#583939]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-3">Manage Events</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                Announce regular festivals, special pujas, and bhandaras to a wider, highly engaged audience.
              </p>
              <div className="h-1 w-12 bg-[#E07C2D] mx-auto mt-4"></div>
            </div>

            {/* Receive Donations Card */}
            <div className="bg-[#FBF6F1] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E07C2D]/10 rounded-lg mb-4">
                <Gift className="w-6 h-6 text-[#583939]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-3">Receive Donations</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                Accept online donations securely and transparently, generating direct financial support for temple maintenance.
              </p>
              <div className="h-1 w-12 bg-[#E07C2D] mx-auto mt-4"></div>
            </div>

            {/* Build Community Card */}
            <div className="bg-[#FBF6F1] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E07C2D]/10 rounded-lg mb-4">
                <Sparkles className="w-6 h-6 text-[#583939]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#583939] mb-3">Build Community</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                Grow your temple audience digital-first, sending blessings and sharing spiritual teachings smoothly.
              </p>
              <div className="h-1 w-12 bg-[#E07C2D] mx-auto mt-4"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
