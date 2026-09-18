"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/contact/hero.png"
          alt="Contact Us"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          {/* Sanskrit Text */}
          <p className="font-serif text-lg sm:text-xl text-[#E07C2D] mb-4 tracking-wider">
            || जय श्री श्यामा ||
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Contact Us
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Reach out to Shree Shyam Jagat for any queries regarding temple listings, darshan schedules, volunteer services, or donation support. We are here to serve.
          </p>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section className=" bg-white">
        <div className="mx-auto max-w-7xl px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 py-2">
            {/* Left Side - Contact Information */}
            <div className="bg-[#FBF6F1] px-6 lg:px-10 py-16 lg:py-24 rounded-2xl">
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-4">
                Connect With Us
              </h2>
              <p className="text-base text-[#666] mb-10 leading-relaxed">
                Have questions or need assistance? Our support team and volunteers are dedicated to ensuring a seamless experience for every devotee.
              </p>

              {/* Contact Info Items */}
              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#E07C2D]">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#E07C2D] uppercase tracking-wide">Email Helpline</p>
                    <p className="text-[#583939] font-semibold">contact@shreeshyamjagat.org</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#E07C2D]">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l2.498 12.092a1 1 0 00.502.242h6.612a1 1 0 00.5-.242l2.498-12.092a1 1 0 00-.948-.684H19a2 2 0 01-2-2m0 0V5m0 0H9m11 0v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5m9 -3v0m0 0h.01v.01H13v-.01z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#E07C2D] uppercase tracking-wide">Phone Support</p>
                    <p className="text-[#583939] font-semibold">+91 141 2345 678, +91 98765 43210</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#E07C2D]">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#E07C2D] uppercase tracking-wide">Central Office</p>
                    <p className="text-[#583939] font-semibold">Shree Shyam Jagat Trust, Sector 3, Vidhyadhar Nagar, Jaipur, Rajasthan - 302039</p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#E07C2D]">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#E07C2D] uppercase tracking-wide">Office Hours</p>
                    <p className="text-[#583939] font-semibold">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-12 pt-8 border-t border-[#E0E0E0] bg-white p-6 rounded-lg shadow-md">
                <p className="text-[#583939] italic text-lg leading-relaxed mb-3">
                  &quot;He who serves humanity with selfless devotion, worships Lord Krishna in the truest form.&quot;
                </p>
                <p className="text-[#E07C2D] font-semibold text-sm uppercase">— Baba Shyam Teachings</p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white px-6 lg:px-10 py-16 lg:py-24">
              <div className="inline-block bg-[#E07C2D] text-white px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                Get In Touch
              </div>
              <h2 className="font-serif text-4xl font-bold text-[#583939] mb-2">
                Send Us Your Query
              </h2>
              <div className="h-1 w-16 bg-[#E07C2D] mb-8"></div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#583939] mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] bg-[#F9F9F9] text-[#583939] placeholder-[#AAAAAA] focus:outline-none focus:border-[#E07C2D] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#583939] mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] bg-[#F9F9F9] text-[#583939] placeholder-[#AAAAAA] focus:outline-none focus:border-[#E07C2D] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#583939] mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] bg-[#F9F9F9] text-[#583939] placeholder-[#AAAAAA] focus:outline-none focus:border-[#E07C2D] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#583939] mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="+91 12345 67890"
                      className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] bg-[#F9F9F9] text-[#583939] placeholder-[#AAAAAA] focus:outline-none focus:border-[#E07C2D] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is your query regarding?"
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E0E0] bg-white text-[#583939] placeholder-[#999] focus:outline-none focus:border-[#E07C2D]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#583939] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] bg-[#F9F9F9] text-[#583939] placeholder-[#AAAAAA] focus:outline-none focus:border-[#E07C2D] focus:bg-white resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#E07C2D] text-white py-4 rounded-lg font-semibold hover:bg-[#D46B1B] transition-all flex items-center justify-center gap-2"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Our Location Map Section */}
      <section className="py-16 lg:py-24 bg-[#FBF6F1]">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-[#583939] mb-3">
              Our Location
            </h2>
            <p className="text-base text-[#666] max-w-2xl mx-auto">
              Visit our central office located in the spiritual heart of Jaipur, Rajasthan
            </p>
          </div>

          {/* Map Container */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            {/* Google Map Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.8669459822626!2d75.78745!3d26.93486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4b5c5c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2sVidhyadhar%20Nagar%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1691234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />

            {/* Location Info Overlay Card */}
            <div className="absolute top-6 right-6 z-10 bg-white rounded-2xl shadow-lg p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#E07C2D]">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#583939] text-base">
                    Shree Shyam Jagat HQ
                  </h3>
                  <p className="text-xs text-[#E07C2D] font-semibold uppercase">Gurugram</p>
                </div>
              </div>
              <p className="text-sm text-[#666] leading-relaxed">
                Sector 37, Vidhyadhar Nagar, Gurugram, Haryana - 302039
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
