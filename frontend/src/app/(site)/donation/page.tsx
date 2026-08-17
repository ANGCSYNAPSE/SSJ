"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Lock,
  Check,
  Utensils,
  GraduationCap,
  HeartHandshake,
  Home,
  Briefcase,
  Landmark,
} from "lucide-react";

function ProgressCircle({
  percent,
  children,
}: {
  percent: number;
  children: React.ReactNode;
}) {
  const size = 96;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative mb-4 h-24 w-24">
      <svg className="h-24 w-24 -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="#7A4A52"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E07C2D"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[#E07C2D]">
        {children}
      </div>
    </div>
  );
}

export default function DonationPage() {
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donateFor, setDonateFor] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [receive80G, setReceive80G] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [expandedFaq, setExpandedFaq] = useState<string | null>("security");

  const presetAmounts = [
    { label: "₹501", value: "501" },
    { label: "₹1,100", value: "1100" },
    { label: "₹2,100", value: "2100" },
    { label: "₹5,300", value: "5300" },
    { label: "₹11,000", value: "11000" },
  ];

  const donateForOptions = [
    { id: "annadan", label: "Annadan" },
    { id: "old-age", label: "Old Age Support" },
    { id: "education", label: "Education" },
    { id: "women", label: "Women Empowerment" },
    { id: "improvement", label: "Improvement" },
    { id: "heritage", label: "Heritage Samvit" },
    { id: "medical", label: "Medical Support" },
    { id: "temple", label: "Temple Dev" },
  ];

  const handleDonateForChange = (id: string) => {
    setDonateFor((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDonate = () => {
    const finalAmount = donationAmount || customAmount;
    if (!finalAmount) {
      alert("Please select or enter an amount");
      return;
    }
    console.log("Donation submitted:", {
      amount: finalAmount,
      donateFor,
      fullName,
      phoneNumber,
      email,
      panNumber,
      message,
      isAnonymous,
      receive80G,
      paymentMethod,
    });
    alert("Processing donation of ₹" + finalAmount);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/donation/hero.png"
          alt="Support a Noble Cause"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center px-6 lg:px-10">
          <div className="mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                {/* Heading */}
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
                  Support a Noble Cause
                </h1>

                {/* Orange Divider */}
                <div className="h-1 w-20 bg-[#E07C2D] mb-6"></div>

                {/* Description */}
                <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed mb-8">
                  Every contribution helps us serve society through education, healthcare, women empowerment, old age care, annadan, and spiritual initiatives.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#donate-form"
                    className="inline-block bg-[#E07C2D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#D46B1B] transition-all text-center"
                  >
                    Donate Now
                  </Link>
                  <button className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all">
                    See Our Impact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#FBF6F1] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#E07C2D] rounded-full flex items-center justify-center mb-2 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#583939] mb-1">25,000+</p>
              <p className="text-xs sm:text-sm lg:text-base text-[#666]">Community Members</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#E07C2D] rounded-full flex items-center justify-center mb-2 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#583939] mb-1">₹1.8 Cr+</p>
              <p className="text-xs sm:text-sm lg:text-base text-[#666]">Donations Raised</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#E07C2D] rounded-full flex items-center justify-center mb-2 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#583939] mb-1">4,50,000+</p>
              <p className="text-xs sm:text-sm lg:text-base text-[#666]">Meals Served</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#E07C2D] rounded-full flex items-center justify-center mb-2 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#583939] mb-1">850+</p>
              <p className="text-xs sm:text-sm lg:text-base text-[#666]">Students Supported</p>
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#E07C2D] rounded-full flex items-center justify-center mb-2 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#583939] mb-1">120+</p>
              <p className="text-xs sm:text-sm lg:text-base text-[#666]">Families Assisted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donate-form" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Donation Form */}
            <div className="bg-[#FBF6F1] rounded-2xl p-8 lg:p-10">
              {/* Header */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-[#E07C2D] uppercase tracking-wide mb-2">
                  Make a Donation
                </p>
                <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">
                  Choose Your Offering
                </h2>
                <div className="h-1 w-16 bg-[#E07C2D]"></div>
              </div>

              {/* Donation Amount */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[#583939] mb-4">
                  Donation Amount
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount.value}
                      onClick={() => {
                        setDonationAmount(amount.value);
                        setCustomAmount("");
                      }}
                      className={`py-3 rounded-lg font-semibold transition-all ${
                        donationAmount === amount.value
                          ? "bg-[#E07C2D] text-white border-2 border-[#E07C2D]"
                          : "bg-white text-[#583939] border-2 border-[#E0E0E0] hover:border-[#E07C2D]"
                      }`}
                    >
                      {amount.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Custom Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter custom amount in ₹"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setDonationAmount("");
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] bg-white text-[#583939] placeholder-[#999] focus:outline-none focus:border-[#E07C2D]"
                />
              </div>

              {/* Donate For */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[#583939] mb-4">
                  Donate For
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {donateForOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleDonateForChange(option.id)}
                      className={`py-3 px-4 rounded-lg font-semibold text-center transition-all text-sm ${
                        donateFor.includes(option.id)
                          ? "bg-[#E07C2D] text-white border-2 border-[#E07C2D]"
                          : "bg-white text-[#583939] border-2 border-[#E0E0E0] hover:border-[#E07C2D]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] bg-white text-[#583939] placeholder-[#999] focus:outline-none focus:border-[#E07C2D]"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] bg-white text-[#583939] placeholder-[#999] focus:outline-none focus:border-[#E07C2D]"
                />
              </div>

              {/* Email Address */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] bg-white text-[#583939] placeholder-[#999] focus:outline-none focus:border-[#E07C2D]"
                />
              </div>

              {/* PAN Number */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  PAN Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="ABCDEF1234"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] bg-white text-[#583939] placeholder-[#999] focus:outline-none focus:border-[#E07C2D]"
                />
              </div>

              {/* Message / Prayer */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#583939] mb-2">
                  Message / Prayer
                </label>
                <textarea
                  placeholder="I seek Babaji Shyam's blessings for my family..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] bg-white text-[#583939] placeholder-[#999] focus:outline-none focus:border-[#E07C2D] resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 mb-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 accent-[#E07C2D] cursor-pointer"
                  />
                  <span className="text-sm text-[#583939]">
                    Make my donation anonymous
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={receive80G}
                    onChange={(e) => setReceive80G(e.target.checked)}
                    className="w-4 h-4 accent-[#E07C2D] cursor-pointer"
                  />
                  <span className="text-sm text-[#583939]">
                    Receive 80G Tax Receipt
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleDonate}
                className="w-full bg-[#E07C2D] text-white py-4 rounded-lg font-semibold hover:bg-[#D46B1B] transition-all mb-3 flex items-center justify-center gap-2"
              >
                Donate Securely →
              </button>

              {/* Security Note */}
              <p className="text-xs text-center text-[#666]">
                <Lock className="w-3 h-3 inline mr-1" />
                100% bill SSL encrypted Payment
              </p>
            </div>

            {/* Right Side - Payment Options */}
            <div className="sticky top-20 h-fit">
              {/* Payment Options Header */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-[#E07C2D] uppercase tracking-wide mb-2">
                  Payment Options
                </p>
                <h2 className="font-serif text-4xl font-bold text-[#583939]">
                  Choose Payment Method
                </h2>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 mb-8">
                {/* Credit / Debit Card */}
                <label className="flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all" style={{
                  borderColor: paymentMethod === 'card' ? '#E07C2D' : '#E0E0E0',
                  backgroundColor: paymentMethod === 'card' ? '#FFF0E6' : '#F9F9F9'
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-[#E07C2D]"
                  />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#583939]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h10m4 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                    <span className="font-semibold text-[#583939]">Credit / Debit Card</span>
                  </div>
                </label>

                {/* Net Banking */}
                <label className="flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all" style={{
                  borderColor: paymentMethod === 'netbanking' ? '#E07C2D' : '#E0E0E0',
                  backgroundColor: paymentMethod === 'netbanking' ? '#FFF0E6' : '#F9F9F9'
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-[#E07C2D]"
                  />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#583939]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6h-6m0 0H6" />
                    </svg>
                    <span className="font-semibold text-[#583939]">Net Banking</span>
                  </div>
                </label>

                {/* UPI */}
                <label className="flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all" style={{
                  borderColor: paymentMethod === 'upi' ? '#E07C2D' : '#E0E0E0',
                  backgroundColor: paymentMethod === 'upi' ? '#FFF0E6' : '#F9F9F9'
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-[#E07C2D]"
                  />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#583939]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-[#583939]">UPI</span>
                  </div>
                </label>

                {/* UPI Input Field */}
                {paymentMethod === 'upi' && (
                  <div className="ml-10 mb-4">
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#E07C2D] bg-white text-[#583939] placeholder-[#999] focus:outline-none"
                    />
                  </div>
                )}

                {/* QR Code */}
                <label className="flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all" style={{
                  borderColor: paymentMethod === 'qr' ? '#E07C2D' : '#E0E0E0',
                  backgroundColor: paymentMethod === 'qr' ? '#FFF0E6' : '#F9F9F9'
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-[#E07C2D]"
                  />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#583939]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                    </svg>
                    <span className="font-semibold text-[#583939]">QR Code</span>
                  </div>
                </label>

                {/* Wallet */}
                <label className="flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all" style={{
                  borderColor: paymentMethod === 'wallet' ? '#E07C2D' : '#E0E0E0',
                  backgroundColor: paymentMethod === 'wallet' ? '#FFF0E6' : '#F9F9F9'
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-[#E07C2D]"
                  />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#583939]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h10m4 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                    <span className="font-semibold text-[#583939]">Wallet</span>
                  </div>
                </label>
              </div>

              {/* Security Box */}
              <div className="bg-[#583939] text-white rounded-lg p-6 space-y-3">
                <p className="text-sm leading-relaxed">
                  Your donation is 100% secure. We use 256-bit SSL encryption and are registered under 80G, 12A and FCRA.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>SSL Secure Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>80G Tax Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Transparent Reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories of Faith & Service Section */}
      <section className="bg-[#FBF6F1] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#583939] mb-4">
              Stories of Faith & Service
            </h2>
            <div className="h-1 w-24 bg-[#E07C2D] mx-auto mb-4"></div>
            <p className="text-base lg:text-lg text-[#666] max-w-2xl mx-auto">
              Join thousands who are making a difference every day.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg p-8">
              <svg className="w-8 h-8 text-[#E07C2D] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.3-2-2.5s-4.313 2.467-4.313 5.4c0 1.625.75 3 1.972 3.5.672.25 1.328.5 2.016.5.5 0 1-.5-.5-1s-.802-.5-1.206-.5C5.627 10.5 5 11.847 5 13c0 1.48.711 2.888 2.313 2.95H5c-1.25 0-3 .75-3 2.972C2 20 2.75 21 3 21z" />
              </svg>
              <p className="text-[#583939] mb-6 leading-relaxed">
                Supporting Shyam Jagat gave me immense peace. Knowing that my donation helped educate children and feed families is truly fulfilling.
              </p>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="font-semibold text-[#583939] mb-1">Amit Verma</p>
              <p className="text-sm text-[#666]">Delhi</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg p-8">
              <svg className="w-8 h-8 text-[#E07C2D] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.3-2-2.5s-4.313 2.467-4.313 5.4c0 1.625.75 3 1.972 3.5.672.25 1.328.5 2.016.5.5 0 1-.5-.5-1s-.802-.5-1.206-.5C5.627 10.5 5 11.847 5 13c0 1.48.711 2.888 2.313 2.95H5c-1.25 0-3 .75-3 2.972C2 20 2.75 21 3 21z" />
              </svg>
              <p className="text-[#583939] mb-6 leading-relaxed">
                The transparency and regular updates make me feel connected to every initiative. Proud to contribute.
              </p>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="font-semibold text-[#583939] mb-1">Priya Sharma</p>
              <p className="text-sm text-[#666]">Jaipur</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg p-8">
              <svg className="w-8 h-8 text-[#E07C2D] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.3-2-2.5s-4.313 2.467-4.313 5.4c0 1.625.75 3 1.972 3.5.672.25 1.328.5 2.016.5.5 0 1-.5-.5-1s-.802-.5-1.206-.5C5.627 10.5 5 11.847 5 13c0 1.48.711 2.888 2.313 2.95H5c-1.25 0-3 .75-3 2.972C2 20 2.75 21 3 21z" />
              </svg>
              <p className="text-[#583939] mb-6 leading-relaxed">
                Serving through donations is another form of devotion. Shyam Jagat has created a wonderful platform.
              </p>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="font-semibold text-[#583939] mb-1">Sunil Agarwal</p>
              <p className="text-sm text-[#666]">Mumbai</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Your Donation Goes Section */}
      <section className="bg-[#583939] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Where Your Donation Goes
            </h2>
            <p className="text-base lg:text-lg text-white/80">
              Complete transparency in how every rupee is utilized.
            </p>
          </div>

          {/* Fund Allocation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {/* Annadan - 35% */}
            <div className="bg-white/10 rounded-2xl p-8 flex flex-col items-center border border-white/20">
              <ProgressCircle percent={35}>
                <Utensils className="w-10 h-10" strokeWidth={2} />
              </ProgressCircle>
              <p className="text-3xl font-bold text-white mb-1">35%</p>
              <p className="text-white/80 text-center text-sm">Annadan</p>
            </div>

            {/* Education - 25% */}
            <div className="bg-white/10 rounded-2xl p-8 flex flex-col items-center border border-white/20">
              <ProgressCircle percent={25}>
                <GraduationCap className="w-10 h-10" strokeWidth={2} />
              </ProgressCircle>
              <p className="text-3xl font-bold text-white mb-1">25%</p>
              <p className="text-white/80 text-center text-sm">Education</p>
            </div>

            {/* Women Empowerment - 15% */}
            <div className="bg-white/10 rounded-2xl p-8 flex flex-col items-center border border-white/20">
              <ProgressCircle percent={15}>
                <HeartHandshake className="w-10 h-10" strokeWidth={2} />
              </ProgressCircle>
              <p className="text-3xl font-bold text-white mb-1">15%</p>
              <p className="text-white/80 text-center text-sm">Women Empowerment</p>
            </div>

            {/* Old Age Home - 10% */}
            <div className="bg-white/10 rounded-2xl p-8 flex flex-col items-center border border-white/20">
              <ProgressCircle percent={10}>
                <Home className="w-10 h-10" strokeWidth={2} />
              </ProgressCircle>
              <p className="text-3xl font-bold text-white mb-1">10%</p>
              <p className="text-white/80 text-center text-sm">Old Age Home</p>
            </div>

            {/* Employment - 10% */}
            <div className="bg-white/10 rounded-2xl p-8 flex flex-col items-center border border-white/20">
              <ProgressCircle percent={10}>
                <Briefcase className="w-10 h-10" strokeWidth={2} />
              </ProgressCircle>
              <p className="text-3xl font-bold text-white mb-1">10%</p>
              <p className="text-white/80 text-center text-sm">Employment</p>
            </div>

            {/* Temple Dev - 5% */}
            <div className="bg-white/10 rounded-2xl p-8 flex flex-col items-center border border-white/20">
              <ProgressCircle percent={5}>
                <Landmark className="w-10 h-10" strokeWidth={2} />
              </ProgressCircle>
              <p className="text-3xl font-bold text-white mb-1">5%</p>
              <p className="text-white/80 text-center text-sm">Temple Dev.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans Section */}
      <section className="bg-[#FBF6F1] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-[#E07C2D] text-white px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              Membership Plans
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#583939] mb-4">
              Choose Your Path of Devotion
            </h2>
            <p className="text-base lg:text-lg text-[#666] max-w-2xl mx-auto">
              Join the Shyam Jagat family and be a part of something truly meaningful.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Plan 1: Free */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#E0E0E0] flex flex-col relative">
              <div className="w-12 h-12 bg-[#583939] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </div>
              <p className="text-[#583939] font-serif text-lg font-bold mb-1">सदस्य</p>
              <p className="text-[#E07C2D] text-xs font-semibold uppercase tracking-wide mb-4">Begin Your Journey</p>
              <p className="text-4xl font-bold text-[#583939] mb-1">Free</p>
              <p className="text-sm text-[#666] mb-6">Forever</p>
              <div className="space-y-3 flex-grow mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Monthly Newsletter</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Event Notifications</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Live Darshan Access</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Digital Wallpapers</span>
                </div>
              </div>
              <button className="w-full border-2 border-[#583939] text-[#583939] py-3 rounded-lg font-semibold hover:bg-[#583939] hover:text-white transition-all">
                REGISTER NOW
              </button>
            </div>

            {/* Plan 2: Most Popular */}
            <div className="bg-[#583939] rounded-2xl p-8 text-white flex flex-col relative lg:scale-105 lg:z-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#E07C2D] text-white px-4 py-1 rounded-full text-xs font-semibold uppercase">
                Most Popular
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 mt-4">
                <svg className="w-6 h-6 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </div>
              <p className="font-serif text-lg font-bold mb-1">कार्यकर्ता</p>
              <p className="text-[#E07C2D] text-xs font-semibold uppercase tracking-wide mb-4">Serve & Grow</p>
              <p className="text-4xl font-bold mb-1">₹ 1,100</p>
              <p className="text-sm text-white/80 mb-6">/year</p>
              <div className="space-y-3 flex-grow mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#E07C2D] rounded-full mt-1 flex-shrink-0"></div>
                  <span className="text-sm">Special Darshan Access</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#E07C2D] rounded-full mt-1 flex-shrink-0"></div>
                  <span className="text-sm">Sewo Opportunities</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#E07C2D] rounded-full mt-1 flex-shrink-0"></div>
                  <span className="text-sm">Temple Prasadam Monthly</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#E07C2D] rounded-full mt-1 flex-shrink-0"></div>
                  <span className="text-sm">VIP Entry in Events</span>
                </div>
              </div>
              <button className="w-full bg-[#E07C2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D46B1B] transition-all mb-3">
                REGISTER NOW →
              </button>
              <p className="text-xs text-white/70 text-center">Cancel anytime. No hidden fees</p>
            </div>

            {/* Plan 3: Ultimate Devotion */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#E0E0E0] flex flex-col">
              <div className="w-12 h-12 bg-[#583939] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </div>
              <p className="text-[#583939] font-serif text-lg font-bold mb-1">संरक्षक</p>
              <p className="text-[#E07C2D] text-xs font-semibold uppercase tracking-wide mb-4">Ultimate Devotion</p>
              <p className="text-4xl font-bold text-[#583939] mb-1">₹ 11,000</p>
              <p className="text-sm text-[#666] mb-6">/year</p>
              <div className="space-y-3 flex-grow mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Priority Seatings</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Name on Donor Wall</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Family Prayer Slot</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Annual Retreat Invite</span>
                </div>
              </div>
              <button className="w-full bg-[#E07C2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D46B1B] transition-all mb-3">
                REGISTER NOW
              </button>
              <p className="text-xs text-center text-[#666]">Limited spots available</p>
            </div>

            {/* Plan 4: Premium */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#E0E0E0] flex flex-col relative">
              <div className="absolute -top-4 right-8 bg-[#E07C2D] text-white px-4 py-1 rounded-full text-xs font-semibold uppercase">
                Premium
              </div>
              <div className="w-12 h-12 bg-[#583939] rounded-full flex items-center justify-center mb-4 mt-4">
                <svg className="w-6 h-6 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </div>
              <p className="text-[#583939] font-serif text-lg font-bold mb-1">सेवाधार</p>
              <p className="text-[#E07C2D] text-xs font-semibold uppercase tracking-wide mb-4">Ultimate Protector</p>
              <p className="text-4xl font-bold text-[#583939] mb-1">₹ 51,000</p>
              <p className="text-sm text-[#666] mb-6">/year</p>
              <div className="space-y-3 flex-grow mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">All Patron Benefits</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Personal Pujari for Family Events</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Exclusive Temple Tours</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Direct Line to Trust Members</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#E07C2D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-[#583939]">Name on Temple Plaque</span>
                </div>
              </div>
              <button className="w-full bg-[#E07C2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D46B1B] transition-all mb-3">
                REGISTER NOW
              </button>
              <p className="text-xs text-center text-[#666]">Unlimited spots available</p>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center text-sm text-[#666]">
            <svg className="w-4 h-4 inline mr-1 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            Secure payment. 100% transparent. 80G tax benefits available
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#583939] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-24 bg-[#E07C2D] mx-auto"></div>
          </div>

          {/* FAQ Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              {/* FAQ 1: Is my donation secure? */}
              <div className="border-b border-[#E0E0E0]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === "security" ? null : "security")}
                  className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <p className="font-semibold text-[#583939] text-left">Is my donation secure?</p>
                  <span className="text-[#E07C2D] text-xl">{expandedFaq === "security" ? "−" : "+"}</span>
                </button>
                {expandedFaq === "security" && (
                  <p className="text-sm text-[#666] pb-4">
                    Yes, all transactions are processed through 256-bit SSL encrypted gateways.
                  </p>
                )}
              </div>

              {/* FAQ 2: Can I donate monthly? */}
              <div className="border-b border-[#E0E0E0]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === "monthly" ? null : "monthly")}
                  className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <p className="font-semibold text-[#583939] text-left">Can I donate monthly?</p>
                  <span className="text-[#E07C2D] text-xl">{expandedFaq === "monthly" ? "−" : "+"}</span>
                </button>
                {expandedFaq === "monthly" && (
                  <p className="text-sm text-[#666] pb-4">
                    Yes, you can set up recurring monthly donations through our secure payment gateway. You can manage or cancel anytime.
                  </p>
                )}
              </div>

              {/* FAQ 3: Will I receive an 80G receipt? */}
              <div className="border-b border-[#E0E0E0]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === "80g" ? null : "80g")}
                  className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <p className="font-semibold text-[#583939] text-left">Will I receive an 80G receipt?</p>
                  <span className="text-[#E07C2D] text-xl">{expandedFaq === "80g" ? "−" : "+"}</span>
                </button>
                {expandedFaq === "80g" && (
                  <p className="text-sm text-[#666] pb-4">
                    Yes, all donors receive 80G tax-exempt receipts within 7 business days of their donation.
                  </p>
                )}
              </div>

              {/* FAQ 4: Can I donate anonymously? */}
              <div className="border-b border-[#E0E0E0]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === "anonymous" ? null : "anonymous")}
                  className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <p className="font-semibold text-[#583939] text-left">Can I donate anonymously?</p>
                  <span className="text-[#E07C2D] text-xl">{expandedFaq === "anonymous" ? "−" : "+"}</span>
                </button>
                {expandedFaq === "anonymous" && (
                  <p className="text-sm text-[#666] pb-4">
                    Yes, you can check the &quot;Make my donation anonymous&quot; option during the donation process.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* FAQ 5: How is the money utilized? */}
              <div className="border-b border-[#E0E0E0]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === "utilized" ? null : "utilized")}
                  className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <p className="font-semibold text-[#583939] text-left">How is the money utilized?</p>
                  <span className="text-[#E07C2D] text-xl">{expandedFaq === "utilized" ? "−" : "+"}</span>
                </button>
                {expandedFaq === "utilized" && (
                  <p className="text-sm text-[#666] pb-4">
                    We maintain 100% transparency. Funds are allocated across our 12+ active initiatives including Annadan, Education, Healthcare, and more.
                  </p>
                )}
              </div>

              {/* FAQ 6: What is the minimum donation? */}
              <div className="border-b border-[#E0E0E0]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === "minimum" ? null : "minimum")}
                  className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <p className="font-semibold text-[#583939] text-left">What is the minimum donation?</p>
                  <span className="text-[#E07C2D] text-xl">{expandedFaq === "minimum" ? "−" : "+"}</span>
                </button>
                {expandedFaq === "minimum" && (
                  <p className="text-sm text-[#666] pb-4">
                    There is no minimum donation amount. You can donate any amount starting from ₹1.
                  </p>
                )}
              </div>

              {/* FAQ 7: Can I donate from outside India? */}
              <div className="border-b border-[#E0E0E0]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === "outside" ? null : "outside")}
                  className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <p className="font-semibold text-[#583939] text-left">Can I donate from outside India?</p>
                  <span className="text-[#E07C2D] text-xl">{expandedFaq === "outside" ? "−" : "+"}</span>
                </button>
                {expandedFaq === "outside" && (
                  <p className="text-sm text-[#666] pb-4">
                    Yes, we accept international donations through our secure payment gateway. Please contact us for assistance.
                  </p>
                )}
              </div>

              {/* FAQ 8: How do I track my donation? */}
              <div className="border-b border-[#E0E0E0]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === "track" ? null : "track")}
                  className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <p className="font-semibold text-[#583939] text-left">How do I track my donation?</p>
                  <span className="text-[#E07C2D] text-xl">{expandedFaq === "track" ? "−" : "+"}</span>
                </button>
                {expandedFaq === "track" && (
                  <p className="text-sm text-[#666] pb-4">
                    You can track your donation through your account dashboard. We send regular updates on how your contribution is making a difference.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FBF6F1] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          {/* Heading */}
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#583939] mb-6">
            Together, We Can Make a Difference
          </h2>

          {/* Subheading */}
          <p className="text-base lg:text-lg text-[#666] italic mb-10 max-w-2xl mx-auto">
            &quot;Your contribution is more than a donation–it is a blessing that helps transform lives.&quot;
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button className="bg-[#E07C2D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#D46B1B] transition-all">
              Donate Today
            </button>
            <button className="border-2 border-[#583939] text-[#583939] px-8 py-3 rounded-full font-semibold hover:bg-[#583939] hover:text-white transition-all">
              Become a Volunteer
            </button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-[#666]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>+91 12345 67890</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#E07C2D]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>contact@shyamjagat.org</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
