import React from "react";
import Link from "next/link";
import Image from "./OptimizedImage";
import {
  Phone,
  MapPin,
  Mail,
  Inbox,
  Instagram,
  Linkedin,
  Palette,
  CircleDot,
} from "lucide-react";
import { servicesPageData, propertiesPageData, contactConfig } from "../Data/AppData";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/About", label: "About" },
  { href: "/Services", label: "Services" },
  { href: "/Properties", label: "Properties" },
  { href: "/Contact", label: "Contact Us" },
];

const socialLinks = [
  { href: "https://behance.net", label: "Behance", icon: Palette },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://dribbble.com", label: "Dribbble", icon: CircleDot },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
];

const Footer: React.FC = () => {
  const footerLinkClass =
    "text-white/90 hover:text-white text-sm md:text-base transition-all duration-200 hover:translate-x-1 inline-block";

  return (
    <footer
      className="footer w-full bg-[#191723] text-white font-mona"
      role="contentinfo"
    >
      <div className="footer_content mx-[5%] md:mx-[8%] xl:mx-[10%] py-12 md:py-16 xl:py-20">
        {/* Top Section - 5 Columns */}
        <div className="footer_columns grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 xl:gap-12">
          {/* Column 1 - Brand */}
          <div className="footer_brand flex flex-col gap-4">
            <Link href="/" className="inline-block w-fit transition-transform duration-200 hover:scale-[1.02]">
              <Image
                src="/Main_Assets/Main_Logo.svg"
                alt="NASQO Properties"
                width={192}
                height={144}
                className="w-24 sm:w-28 md:w-36 lg:w-40 xl:w-44 2xl:w-48 h-auto object-contain"
              />
            </Link>
            <Link
              href="/"
              className="font-bricolage font-semibold text-white uppercase tracking-wide text-sm md:text-base hover:text-white/90 hover:underline underline-offset-4 transition-all duration-200 w-fit"
            >
              NASQO PROPERTIES
            </Link>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="footer_links">
            <h3 className="font-bricolage font-semibold text-base md:text-lg mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={footerLinkClass}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Our Services */}
          <div className="footer_services">
            <h3 className="font-bricolage font-semibold text-base md:text-lg mb-4">
              Our Services
            </h3>
            <ul className="flex flex-col gap-2">
              {servicesPageData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/Services/${service.slug}`}
                    className={footerLinkClass}
                  >
                    {service.heroTitle ?? "Service"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Properties */}
          <div className="footer_properties">
            <h3 className="font-bricolage font-semibold text-base md:text-lg mb-4">
              Properties
            </h3>
            <ul className="flex flex-col gap-2">
              {propertiesPageData.slice(0, 4).map((property) => (
                <li key={property.id}>
                  <Link
                    href={`/Properties/${property.slug}`}
                    className={footerLinkClass}
                  >
                    {property.heroTitle ?? property.title ?? "Property"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 - Contact Us */}
          <div className="footer_contact">
            <h3 className="font-bricolage font-semibold text-base md:text-lg mb-4">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 text-white/90 text-sm md:text-base">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                <a href={`tel:${contactConfig.phone.replace(/\s/g, "")}`} className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">
                  {contactConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/90 text-sm md:text-base">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                <span>Kumasi-Ashanti Region</span>
              </li>
              <li className="flex items-start gap-3 text-white/90 text-sm md:text-base">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                <a
                  href="mailto:homely@gmail.com"
                  className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  homely@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/90 text-sm md:text-base">
                <Inbox className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                <span>PO Box 1324</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/20 my-8 md:my-10 xl:my-12" />

        {/* Bottom Section - Copyright & Social */}
        <div className="footer_bottom flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-white/60 text-sm md:text-base order-2 sm:order-1">
            Copyright © 2025. All Rights Reserved
          </p>
          <div className="flex items-center gap-4 order-1 sm:order-2">
            <span className="text-white/60 text-sm md:text-base">Find us on</span>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#4361EE] flex items-center justify-center text-white hover:opacity-90 hover:scale-105 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
