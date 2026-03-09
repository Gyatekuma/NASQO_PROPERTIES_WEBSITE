"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
import Button from "../components/button";
import SectionTags from "../components/SectionTags";
import Metrics from "../components/Metrics";
import Image from "next/image";
import { coreValuesDataAboutPage, faqData } from "../Data/AppData";
import { coreValueProps } from "../Types/types";
import Faq from "../components/Faq";
import DescriptionHero from "../components/DescriptionHero";

const ABOUT_DESCRIPTION_FULL =
  "At Homely, we are committed to helping individuals, families, and investors discover properties that truly match their dreams and long-term goals. With a strong focus on transparency, professionalism, and client satisfaction, we simplify the entire real estate journey—from property search and acquisition to documentation and ownership support—ensuring every transaction is smooth and stress-free. Our team combines deep market expertise, trusted partnerships, and personalized service to deliver carefully verified properties in prime and fast-growing locations, giving our clients confidence in every decision they make. We also believe that finding the right property should be an empowering experience, which is why we provide clear guidance, honest recommendations, and ongoing support even after the purchase is completed. Whether you are purchasing your first home, investing in land, or expanding your property portfolio, we are dedicated to providing reliable guidance, secure opportunities, and lasting value. At the heart of everything we do is a simple promise: to build lasting relationships through trust, deliver quality properties that meet modern standards, and help our clients secure a future they can proudly and confidently call their own.";

const ABOUT_DESCRIPTION_SHORT =
  "At Homely, we are committed to helping individuals, families, and investors discover properties that truly match their dreams and long-term goals. With a strong focus on transparency, professionalism, and client satisfaction, we simplify the entire real estate journey—from property search and acquisition to documentation and ownership support—ensuring every transaction is smooth and stress-free.";

const ABOUT_DESCRIPTION_SENTENCES = ABOUT_DESCRIPTION_FULL.split(/(?<=\.)\s+/).filter(Boolean);

function page() {
  const coreValues: coreValueProps[] = coreValuesDataAboutPage;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>(".about-page-reveal");
      reveals.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.06,
        });
      });
    },
    { scope: aboutSectionRef, dependencies: [] }
  );

  const metricsRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const metrics = gsap.utils.toArray<HTMLElement>(".about-page-metric-reveal");
      metrics.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.15,
        });
      });
    },
    { scope: metricsRef, dependencies: [] }
  );

  const visionSectionRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>(".vision-reveal");
      reveals.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.08,
        });
      });
    },
    { scope: visionSectionRef, dependencies: [] }
  );

  const missionSectionRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>(".mission-reveal");
      reveals.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.08,
        });
      });
    },
    { scope: missionSectionRef, dependencies: [] }
  );

  return (
    <div className="about_page_container">
      <div className="about_page_content">
        {/* Hero Section */}
        <div
          className="Main_Hero_Container relative w-screen h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(/HomeAssets/Img9.jpg)` }}
        >
          <div className="overlay_section inset-0 absolute bg-black/50 z-0" />

          <div className="relative z-10 flex flex-col items-left h-full text-white justify-center">
            <div className="hero-texts ml-[5%] md:ml-[5%] 2xl:ml-[10%] font-bricolage">
              <p className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-semibold tracking-tight">
                We are Nasqo Properties
              </p>

              <div className="button w-[90%] xl:w-[25%] 2xl:w-[35%] mt-[8%] 2xl:mt-[2%]">
                <Button text="learn more" variants="secondary" href="/about" />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div ref={aboutSectionRef} className="about_section_container">
          <div className="about_section_main_content mx-[5%] 2xl:mx-[10%] 2xl:py-[5%]">
            <div className="about-page-reveal section_tag 2xl:w-[40%]">
              <SectionTags
                name="about us"
                imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                header="About Nasqo Properties"
              />
            </div>

            <div className="about_section_text">
              {/* Mobile & md: shortened with Show more */}
              <div className="lg:hidden">
                <p className="about-page-reveal about_description font-bricolage font-semibold text-neutral-500">
                  {isDescriptionExpanded
                    ? ABOUT_DESCRIPTION_FULL
                    : ABOUT_DESCRIPTION_SHORT}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  className="mt-3 font-bricolage font-semibold text-[#4361EE] hover:underline"
                >
                  {isDescriptionExpanded ? "Show less" : "Show more"}
                </button>
              </div>
              {/* lg+: full description - each sentence reveals inline, flows as one paragraph */}
              <p className="about_description hidden font-bricolage font-semibold text-neutral-500 lg:block xl:text-xl xl:mt-[-8%] 2xl:text-2xl 2xl:tracking-tight 2xl:mt-8 leading-relaxed">
                {ABOUT_DESCRIPTION_SENTENCES.map((sentence, i) => (
                  <span key={i} className="about-page-reveal">
                    {sentence}{i < ABOUT_DESCRIPTION_SENTENCES.length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
            </div>

            <div ref={metricsRef} className="metrics_container flex flex-col gap-5 my-[10%] w-[48%] md:grid md:grid-cols-2 md:w-full lg:flex-row lg:gap-4 xl:gap-6 2xl:gap-8 xl:grid-cols-4 xl:my-[5%] 2xl:my-[5%]">
              <div className="about-page-metric-reveal">
                <Metrics title="120+" subtext="Projects Completed" />
              </div>
              <div className="about-page-metric-reveal">
                <Metrics title="250+" subtext="Happy Clients" />
              </div>
              <div className="about-page-metric-reveal">
                <Metrics title="$10M+" subtext="Project Value" />
              </div>
              <div className="about-page-metric-reveal">
                <Metrics title="90%" subtext="Properties Sold" />
              </div>
            </div>
          </div>
        </div>

        {/* -------------------VISION AND MISSION SECTION------------------- */}

        <div className="mission_and_vision_container mx-[5%] border-t border-t-neutral-200 2xl:mx-[10%]">
          {/* -------------------VISION SECTION------------------- */}
          <div ref={visionSectionRef} className="flex flex-col xl:flex-row w-full min-h-screen 2xl:gap-14 2xl:items-center">
            <div className="xl:w-1/2">
              <div className="vision-reveal image_container relative overflow-hidden h-[50vh] 2xl:h-[80vh] rounded-3xl">
                <Image
                  src="/HomeAssets/Img10.jpg"
                  alt="mission"
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="xl:w-1/2 flex flex-col  gap-y-[23] 2xl:gap-14 2xl:mt-[-3%]">
              <div className="vision-reveal section_tags 2xl:w-[70%]">
                <SectionTags
                  name="mission and vision"
                  imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                  header="What drives us"
                  subtext="We began with a vision to connect people to premium properties that suit their lifestyles and needs."
                />
              </div>

              <div className="vision-reveal vision_statement font-bricolage font-bold  text-lg leading-5 mt-[-6%] md:text-2xl md:leading-7 2xl:leading-10 2xl:text-4xl 2xl:w-[85%] 2xl:mt-[-8%] 2xl:tracking-tighter">
                A trusted real estate brand leading the market, simplifying
                property ownership for everyone, while building strong and
                thriving communities
              </div>

              <div className="vision-reveal description_container font-mona text-neutral-500 text-xs mt p-[5%] md:text-sm md:p-[3%] 2xl:text-base bg-[#f7f7f7] border border-neutral-200 2xl:w-[88%] rounded-3xl 2xl:p-[3%]">
                We aim to create a reliable property ecosystem where individuals
                and businesses can confidently acquire secure, well-verified
                properties through transparent processes, expert guidance, and
                community-focused developments that promote long-term growth and
                sustainable living. By combining market expertise with
                innovative solutions, we ensure every client experiences a
                seamless property journey from search to ownership. Our
                commitment is to build lasting value, strengthen communities,
                and make quality property investment accessible to all.
              </div>
            </div>
          </div>

          {/* -------------------MISSION SECTION------------------- */}
          <div ref={missionSectionRef} className="flex flex-col  xl:flex-row-reverse w-full min-h-screen 2xl:gap-14 2xl:items-center">
            <div className="xl:w-1/2">
              <div className="mission-reveal image_container relative overflow-hidden h-[50vh] mt-[25%] md:mt-[4%] 2xl:h-[80vh] rounded-3xl">
                <Image
                  src="/HomeAssets/Img9.jpg"
                  alt="mission"
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="xl:w-1/2 flex flex-col gap-y-[23] 2xl:gap-14 2xl:mt-[-3%]">
              <div className="mission-reveal section_tags 2xl:w-[70%]">
                <SectionTags
                  name="mission and vision"
                  imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                  header="Our Mission and Vision"
                  subtext="We began with a vision to connect people to premium properties that suit their lifestyles and needs."
                />
              </div>

              <div className="mission-reveal vision_statement font-bricolage font-bold text-lg leading-5 xl:leading-9 mt-[-6%] md:text-2xl md:leading-7 2xl:leading-10 2xl:text-4xl 2xl:w-[85%] 2xl:mt-[-8%] 2xl:tracking-tighter">
                Reliable property solutions delivered with professionalism,
                connecting clients with the right opportunities, and maintaining
                integrity in every transaction.
              </div>

              <div className="mission-reveal description_container font-mona text-neutral-500 text-xs p-[5%] md:text-sm md:p-[3%] 2xl:text-base bg-[#f7f7f7] border border-neutral-200 2xl:w-[88%] rounded-3xl 2xl:p-[3%]">
                We aim to create a reliable property ecosystem where individuals
                and businesses can confidently acquire secure, well-verified
                properties through transparent processes, expert guidance, and
                community-focused developments that promote long-term growth and
                sustainable living. By combining market expertise with
                innovative solutions, we ensure every client experiences a
                seamless property journey from search to ownership. Our
                commitment is to build lasting value, strengthen communities,
                and make quality property investment accessible to all.
              </div>
            </div>
          </div>

          {/* -------------------CORE VALUES SECTION------------------- */}
          <div className="core_value_container">
            <div className="core_value_main_content xl:h-screen mx-[5%] my-[30%] md:my-[20%] xl:mx-0 2xl:mx-0 2xl:mt-[5%]">
              <div className="tag_section 2xl:w-[28%]">
                <SectionTags
                  name="core values"
                  imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                  header="Our Core Values"
                  subtext="We are committed to delivering the best possible service to our clients."
                />
              </div>

              <div className="core_value_cards_container grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
                {coreValues.map((coreValue) => {
                  const Icon = coreValue.icon;
                  return (
                    <div
                      key={coreValue.id}
                      className="core_value_card_item border-2 border-neutral-200 rounded-3xl py-[6%] px-[6%] flex flex-col items-center gap-6 xl:flex-row xl:items-center xl:h-[20vh] 2xl:h-auto 2xl:px-[8%] 2xl:py-[8%] group cursor-pointer transition-all duration-300 ease-out hover:border-[#4361EE] hover:shadow-lg"
                    >
                      <div className="icon">
                        <Icon className="w-6 h-auto text-[#4361EE]" />
                      </div>

                      <div className="text font-mona flex flex-col gap-3 text-center xl:text-left xl:gap-5">
                        <p className="text-[#4361EE] font-bricolage font-semibold text-lg">
                          {coreValue.title}
                        </p>
                        <p className="text-neutral-500 text-sm xl:text-base xl:w-[95%]">
                          {coreValue.subtext}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


          {/* about_description_hero section */}

          <DescriptionHero
            imageSrc="/HomeAssets/Img31.jpg"
            imageAlt="about"
            title={["Your Home,", "Simplified"]}
            subtitle="Every search leads closer to a place where comfort meets convenience. From the first glance to the final say, finding the perfect property becomes effortless, turning dreams into a home that truly feels like yours. Spaces that inspire, neighborhoods that welcome, and opportunities that grow with every choice. Every detail, from light-filled rooms to thoughtfully designed layouts, comes together to create a life well-lived. A home isn't just walls and roofs—it's where stories unfold, memories are made, and futures are built."
            tagline="Smart, Elegant"
          />


          <div className="mb-16 2xl:my-[15%] w-full">
            <Faq faqs={faqData} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
