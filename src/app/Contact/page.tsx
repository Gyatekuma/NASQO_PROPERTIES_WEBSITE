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
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import ScrollRevealSection from "../components/ScrollRevealSection";
import { contactConfig } from "../Data/AppData";

const CONTACT_WHATSAPP_URL = `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(contactConfig.whatsappIntroMessage)}`;

type FieldErrors = Record<string, string>;

const validateField = (name: string, value: string): string => {
  const trimmed = value.trim();
  switch (name) {
    case "name":
      if (!trimmed) return "Name is required.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      if (!/^[a-zA-Z\s\-'.]+$/.test(trimmed))
        return "Name can only contain letters, spaces, hyphens, and apostrophes.";
      return "";
    case "company":
      return "";
    case "phone":
      if (!trimmed) return "Phone number is required.";
      if (!/^[\d\s+\-().]+$/.test(trimmed))
        return "Phone number can only contain numbers, spaces, +, -, (, ), and dots.";
      if (trimmed.replace(/\D/g, "").length < 10)
        return "Please enter a valid phone number (at least 10 digits).";
      return "";
    case "email":
      if (!trimmed) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
        return "Please enter a valid email address.";
      return "";
    case "subject":
      if (!trimmed) return "Subject is required.";
      if (trimmed.length < 3) return "Subject must be at least 3 characters.";
      return "";
    case "message":
      if (!trimmed) return "Message is required.";
      if (trimmed.length < 10) return "Message must be at least 10 characters.";
      return "";
    default:
      return "";
  }
};

const validateForm = (data: Record<string, string>): FieldErrors => {
  const errors: FieldErrors = {};
  (Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
    const err = validateField(key, data[key] ?? "");
    if (err) errors[key] = err;
  });
  return errors;
};

const inputBaseClasses =
  "w-full px-4 py-3 font-mona text-neutral-900 bg-neutral-100 border rounded-xl placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all";
const inputErrorClasses =
  "border-red-500 focus:ring-red-500 focus:border-red-500";
const inputValidClasses =
  "border-neutral-200 focus:ring-[#4361EE] focus:border-transparent";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name] || submitAttempted) {
      const err = validateField(name, value);
      setErrors((prev) =>
        err ? { ...prev, [name]: err } : { ...prev, [name]: "" },
      );
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) =>
      err ? { ...prev, [name]: err } : { ...prev, [name]: "" },
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched(
      Object.keys(formData).reduce(
        (acc, k) => ({ ...acc, [k]: true }),
        {} as Record<string, boolean>,
      ),
    );
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    try {
      setSubmitting(true);
      setSubmitMessage(null);
      setSubmitSuccess(null);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitMessage("Email Successfully sent");
      setSubmitSuccess(true);
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
      setTouched({});
      setSubmitAttempted(false);
    } catch (err) {
      console.error(err);
      setSubmitMessage(
        "Something went wrong while sending your message. Please try again.",
      );
      setSubmitSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  const getInputClasses = (name: string) => {
    const hasError = errors[name];
    return `${inputBaseClasses} ${hasError ? inputErrorClasses : inputValidClasses}`;
  };

  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", icon: Facebook },
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://instagram.com", label: "Instagram", icon: Instagram },
    { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  ];

  return (
    <div className="contact_page min-h-screen relative">
      {/* Top Banner - Dark blurred header */}
      <div
        className="relative w-full min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-16 sm:py-20"
        style={{
          backgroundImage: `url(/HomeAssets/Img2.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] z-0" />
        <ScrollRevealSection
          selector=".contact-reveal"
          className="relative z-10 text-center text-white"
        >
          <h1 className="contact-reveal font-bricolage text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Contact us
          </h1>
          <p className="contact-reveal font-mona mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-white/95">
            NASQO Properties is ready to provide the right solution according to
            your needs
          </p>
        </ScrollRevealSection>
      </div>

      {/* White card - overlaps banner, two columns */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 relative z-20 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <ScrollRevealSection
            selector=".contact-reveal"
            className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
              {/* Left Column - Get in touch */}
              <div className="contact-reveal p-6 sm:p-8 lg:p-10 xl:p-12 lg:border-r border-neutral-200">
                <h2 className="font-bricolage text-2xl sm:text-3xl font-semibold text-neutral-900 mb-4">
                  Get in touch
                </h2>
                <p className="font-mona text-neutral-500 text-sm sm:text-base mb-8 leading-relaxed">
                  Have questions or ready to take the next step? Contact us
                  today and let’s help you secure your ideal property.
                </p>

                {/* Contact blocks */}
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#4361EE] flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bricolage font-semibold text-neutral-900 mb-1">
                        Head Office
                      </p>
                      <p className="font-mona text-neutral-600 text-sm sm:text-base leading-relaxed">
                        Kasoa Nyanyano Road, <br />
                        Nasqo Plaza building last floor,
                        <br />
                        Adjacent the post office
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#4361EE] flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bricolage font-semibold text-neutral-900 mb-1">
                        Email Us
                      </p>
                      <a
                        href="mailto:nasqoproperties@gmail.com"
                        className="font-mona text-neutral-600 text-sm sm:text-base hover:text-[#4361EE] transition-colors"
                      >
                        nasqoproperties@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#4361EE] flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bricolage font-semibold text-neutral-900 mb-1">
                        WhatsApp
                      </p>
                      <a
                        href={CONTACT_WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mona text-neutral-600 text-sm sm:text-base hover:text-[#4361EE] transition-colors"
                      >
                        Chat on WhatsApp with {contactConfig.whatsappDisplayName}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#4361EE] flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bricolage font-semibold text-neutral-900 mb-1">
                        Call Us
                      </p>
                      <p className="font-mona text-neutral-600 text-sm sm:text-base">
                        Cell:{" "}
                        <a
                          href="tel:+233240221212"
                          className="text-inherit underline-offset-2 hover:underline hover:text-[#4361EE] transition-colors"
                        >
                          0240221212
                        </a>
                        {" / "}
                        <a
                          href="tel:+233277071717"
                          className="text-inherit underline-offset-2 hover:underline hover:text-[#4361EE] transition-colors"
                        >
                          0277071717
                        </a>
                      </p>
                      <p className="font-mona text-neutral-600 text-sm sm:text-base">
                        Office:{" "}
                        <a
                          href="tel:+233302864956"
                          className="text-inherit underline-offset-2 hover:underline hover:text-[#4361EE] transition-colors"
                        >
                          0302864956
                        </a>
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
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4361EE] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Send us a message form */}
              <div className="contact-reveal p-6 sm:p-8 lg:p-10 xl:p-12 bg-neutral-50/50 lg:bg-white">
                <h2 className="font-bricolage text-2xl sm:text-3xl font-semibold text-neutral-900 mb-6">
                  Send us a message
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 font-mona"
                          role="alert"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses("company")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone (e.g. +62 21 2002 2012)"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses("phone")}
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                      />
                      {errors.phone && (
                        <p
                          id="phone-error"
                          className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 font-mona"
                          role="alert"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses("email")}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 font-mona"
                          role="alert"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClasses("subject")}
                      aria-invalid={!!errors.subject}
                      aria-describedby={
                        errors.subject ? "subject-error" : undefined
                      }
                    />
                    {errors.subject && (
                      <p
                        id="subject-error"
                        className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 font-mona"
                        role="alert"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClasses("message")}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 font-mona"
                        role="alert"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#4361EE] text-white font-bricolage font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : "Send"}
                  </button>
                  {/* Inline fallback message for errors on smaller screens */}
                  {submitMessage && submitSuccess === false && (
                    <p className="mt-3 text-sm font-mona text-red-600 text-center">
                      {submitMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </div>

      {/* Full-width Map Section */}
      <ScrollRevealSection
        selector=".contact-reveal"
        className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
      >
        <div className="contact-reveal w-full h-full">
          <iframe
            src="https://www.google.com/maps?q=Kasoa+Nyanyano+Road,+Kasoa,+Ghana&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="NASQO Properties — Kasoa Nyanyano Road, Ghana"
            className="w-full h-full"
          />
        </div>
      </ScrollRevealSection>

      {/* Success toast / modal */}
      {submitSuccess === true && submitMessage && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 sm:px-0">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          {/* Toast card */}
          <div className="relative bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.30)] px-8 py-7 sm:px-10 sm:py-8 max-w-lg w-full mx-auto flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-emerald-600 text-xl font-bold">✓</span>
            </div>
            <div className="text-center">
              <p className="font-bricolage text-lg sm:text-xl font-semibold text-neutral-900">
                {submitMessage}
              </p>
              <p className="font-mona text-sm sm:text-base text-neutral-500 mt-2">
                We’ve received your message and will get back to you shortly.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitMessage(null);
                setSubmitSuccess(null);
              }}
              className="mt-2 px-4 py-1.5 rounded-full border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 font-mona text-sm sm:text-base transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error toast / modal */}
      {submitSuccess === false && submitMessage && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 sm:px-0">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          {/* Toast card */}
          <div className="relative bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.30)] px-8 py-7 sm:px-10 sm:py-8 max-w-lg w-full mx-auto flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <span className="text-red-600 text-xl font-bold">!</span>
            </div>
            <div className="text-center">
              <p className="font-bricolage text-lg sm:text-xl font-semibold text-neutral-900">
                Something went wrong
              </p>
              <p className="font-mona text-sm sm:text-base text-neutral-500 mt-2">
                {submitMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitMessage(null);
                setSubmitSuccess(null);
              }}
              className="mt-2 px-4 py-1.5 rounded-full border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 font-mona text-sm sm:text-base transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactPage;
