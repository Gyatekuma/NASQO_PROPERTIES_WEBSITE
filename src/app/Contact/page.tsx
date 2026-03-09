"use client";

import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", icon: Facebook },
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://instagram.com", label: "Instagram", icon: Instagram },
    { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  ];

  return (
    <div className="contact_page min-h-screen">
      {/* Top Banner - Dark blurred header */}
      <div
        className="relative w-full min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-16 sm:py-20"
        style={{
          backgroundImage: `url(/HomeAssets/Img2.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] z-0" />
        <div className="relative z-10 text-center text-white">
          <h1 className="font-bricolage text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Contact us
          </h1>
          <p className="font-mona mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-white/95">
            NASQO Properties is ready to provide the right solution according to
            your needs
          </p>
        </div>
      </div>

      {/* White card - overlaps banner, two columns */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 relative z-20 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
              {/* Left Column - Get in touch */}
              <div className="p-6 sm:p-8 lg:p-10 xl:p-12 lg:border-r border-neutral-200">
                <h2 className="font-bricolage text-2xl sm:text-3xl font-semibold text-neutral-900 mb-4">
                  Get in touch
                </h2>
                <p className="font-mona text-neutral-500 text-sm sm:text-base mb-8 leading-relaxed">
                  Sociosqu viverra lectus placerat sem efficitur molestie vehicula
                  cubilia leo etiam nam.
                </p>

                {/* Contact blocks */}
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-[#4361EE] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bricolage font-semibold text-neutral-900 mb-1">
                        Head Office
                      </p>
                      <p className="font-mona text-neutral-600 text-sm sm:text-base">
                        Jalan Cempaka Wangi No 22
                      </p>
                      <p className="font-mona text-neutral-600 text-sm sm:text-base">
                        Jakarta - Indonesia
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-[#4361EE] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bricolage font-semibold text-neutral-900 mb-1">
                        Email Us
                      </p>
                      <p className="font-mona text-neutral-600 text-sm sm:text-base">
                        support@yourdomain.tid
                      </p>
                      <p className="font-mona text-neutral-600 text-sm sm:text-base">
                        hello@yourdomain.tid
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-[#4361EE] flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bricolage font-semibold text-neutral-900 mb-1">
                        Call Us
                      </p>
                      <p className="font-mona text-neutral-600 text-sm sm:text-base">
                        Phone: +6221.2002.2012
                      </p>
                      <p className="font-mona text-neutral-600 text-sm sm:text-base">
                        Fax: +6221.2002.2013
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social media */}
                <div className="mt-10 sm:mt-12 pt-8 border-t border-neutral-200">
                  <p className="font-bricolage font-semibold text-neutral-900 mb-4">
                    Follow our social media
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4361EE] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Send us a message form */}
              <div className="p-6 sm:p-8 lg:p-10 xl:p-12 bg-neutral-50/50 lg:bg-white">
                <h2 className="font-bricolage text-2xl sm:text-3xl font-semibold text-neutral-900 mb-6">
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 font-mona text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-xl placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-transparent transition-all"
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 font-mona text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-xl placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 font-mona text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-xl placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-transparent transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 font-mona text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-xl placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-transparent transition-all"
                    />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 font-mona text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-xl placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-transparent transition-all"
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 font-mona text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-xl placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-transparent transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#4361EE] text-white font-bricolage font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity duration-200"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Map Section */}
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.6506532888974!2d-0.11954368422947938!3d51.50072927963566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1640000000000!5m2!1sen!2suk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default ContactPage;
