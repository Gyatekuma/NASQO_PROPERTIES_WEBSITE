"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "../components/button";
import SectionTags from "../components/SectionTags";
import Metrics from "../components/Metrics";
import Image from "../components/OptimizedImage";
import { coreValuesDataAboutPage, faqData } from "../Data/AppData";
import { coreValueProps } from "../Types/types";
import Faq from "../components/Faq";
import DescriptionHero from "../components/DescriptionHero";
import ScrollRevealSection from "../components/ScrollRevealSection";
import Testimonial from "../components/Testimonial";
import { testimonialData } from "../Data/AppData";

const ABOUT_DESCRIPTION_FULL =
  "At Homely, we are committed to helping individuals, families, and investors discover properties that truly match their dreams and long-term goals. With a strong focus on transparency, professionalism, and client satisfaction, we simplify the entire real estate journey—from property search and acquisition to documentation and ownership support—ensuring every transaction is smooth and stress-free. Our team combines deep market expertise, trusted partnerships, and personalized service to deliver carefully verified properties in prime and fast-growing locations, giving our clients confidence in every decision they make. We also believe that finding the right property should be an empowering experience, which is why we provide clear guidance, honest recommendations, and ongoing support even after the purchase is completed. Whether you are purchasing your first home, investing in land, or expanding your property portfolio, we are dedicated to providing reliable guidance, secure opportunities, and lasting value. At the heart of everything we do is a simple promise: to build lasting relationships through trust, deliver quality properties that meet modern standards, and help our clients secure a future they can proudly and confidently call their own.";

const ABOUT_DESCRIPTION_SHORT =
  "At Homely, we are committed to helping individuals, families, and investors discover properties that truly match their dreams and long-term goals. With a strong focus on transparency, professionalism, and client satisfaction, we simplify the entire real estate journey—from property search and acquisition to documentation and ownership support—ensuring every transaction is smooth and stress-free.";

const ABOUT_DESCRIPTION_SENTENCES = ABOUT_DESCRIPTION_FULL.split(/(?<=\.)\s+/).filter(Boolean);

function setupReveal(
  scope: Element | null,
  selector: string,
  opts: { y?: number; duration?: number; stagger?: number; rootMargin?: string }
) {
  if (!scope) return () => {};
  const reveals = scope.querySelectorAll<HTMLElement>(selector);
  if (!reveals.length) return () => {};
  const { y = 32, duration = 0.7, stagger = 0.06, rootMargin = "-10% 0px" } = opts;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * (stagger * 1000));
      });
    },
    { rootMargin, threshold: 0 }
  );
  reveals.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = `translateY(${opts.y ?? 32}px)`;
    el.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
    obs.observe(el);
  });
  return () => obs.disconnect();
}

function setupSectionReveal(
  scope: Element | null,
  selectors: { tag?: string; cards?: string },
  opts: { y?: number; duration?: number; stagger?: number }
) {
  if (!scope) return () => {};
  const { y = 48, duration = 0.8, stagger = 0.18 } = opts;
  const rootMargin = "-12% 0px";
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      const tag = selectors.tag ? scope.querySelector<HTMLElement>(selectors.tag) : null;
      const cards = selectors.cards ? scope.querySelectorAll<HTMLElement>(selectors.cards) : [];
      if (tag) {
        tag.style.opacity = "1";
        tag.style.transform = "translateY(0)";
      }
      cards.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, (i + 1) * (stagger * 1000));
      });
    },
    { rootMargin, threshold: 0 }
  );
  const tag = selectors.tag ? scope.querySelector<HTMLElement>(selectors.tag) : null;
  const cards = selectors.cards ? scope.querySelectorAll<HTMLElement>(selectors.cards) : [];
  if (tag) {
    tag.style.opacity = "0";
    tag.style.transform = `translateY(40px)`;
    tag.style.transition = `opacity 0.7s ease-out, transform 0.7s ease-out`;
  }
  cards.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
  });
  obs.observe(scope);
  return () => obs.disconnect();
}

function page() {
  const coreValues: coreValueProps[] = coreValuesDataAboutPage;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const visionSectionRef = useRef<HTMLDivElement>(null);
  const missionSectionRef = useRef<HTMLDivElement>(null);
  const coreValuesSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c1 = setupReveal(aboutSectionRef.current, ".about-page-reveal", { y: 32, stagger: 0.06 });
    const c2 = setupReveal(metricsRef.current, ".about-page-metric-reveal", { y: 32, stagger: 0.15 });
    const c3 = setupReveal(visionSectionRef.current, ".vision-reveal", { y: 48, duration: 0.8, stagger: 0.08 });
    const c4 = setupReveal(missionSectionRef.current, ".mission-reveal", { y: 48, duration: 0.8, stagger: 0.08 });
    const c5 = setupSectionReveal(coreValuesSectionRef.current, { tag: ".core-values-tag", cards: ".core-values-card" }, { stagger: 0.18 });
    return () => { c1(); c2(); c3(); c4(); c5(); };
  }, []);

  return (
    <div className="about_page_container">
      <div className="about_page_content">
        {/* Hero Section */}
        <div
          className="Main_Hero_Container relative w-screen h-screen bg-cover bg-center"
          style={{ backgroundImage: "url(/PropertiesAssets/ImgSC3.webp)" }}
        >
          <div className="overlay_section inset-0 absolute bg-black/50 z-0" />

          <div className="relative z-10 flex flex-col h-full text-white justify-center items-center text-center px-[5%] md:px-[8%] xl:px-0 xl:items-start xl:text-left">
            <div className="hero-texts xl:ml-[5%] 2xl:ml-[10%] font-bricolage">
              <p className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-semibold tracking-tight">
                We are Nasqo Properties
              </p>

              <div className="button w-full flex justify-center xl:block xl:w-[25%] 2xl:w-[35%] mt-[8%] 2xl:mt-[2%]">
                <Button text="learn more" variants="secondary" href="/about" />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div ref={aboutSectionRef} className="about_section_container">
          <div className="about_section_main_content mx-[5%] mt-[10%] xl:mt-[3%] 2xl:mx-[10%] 2xl:py-[5%]">
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
              <p className="about_description hidden font-bricolage font-semibold text-neutral-500 lg:block xl:text-xl xl:mt-6 2xl:text-2xl 2xl:tracking-tight 2xl:mt-8 leading-relaxed">
                {ABOUT_DESCRIPTION_SENTENCES.map((sentence, i) => (
                  <span key={i} className="about-page-reveal">
                    {sentence}{i < ABOUT_DESCRIPTION_SENTENCES.length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
            </div>

            <div ref={metricsRef} className="metrics_container flex flex-col gap-5 my-[10%] w-[48%] md:grid md:grid-cols-2 md:w-full lg:flex-row lg:gap-4 xl:gap-6 2xl:gap-8 xl:grid-cols-4 xl:mt-[5%] xl:mb-0 2xl:mb-[1%]">
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
          <div ref={visionSectionRef} className="flex flex-col xl:flex-row w-full min-h-screen xl:min-h-0 xl:py-[3%] xl:gap-10 xl:items-stretch 2xl:py-[4%] 2xl:gap-14 2xl:items-center">
            <div className="xl:w-1/2">
              <div className="vision-reveal image_container relative overflow-hidden h-[50vh] xl:h-[70vh] rounded-3xl">
                <Image
                  src="/HomeAssets/Img111.webp"
                  alt="mission"
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="xl:w-1/2 flex flex-col xl:h-[70vh] xl:justify-evenly 2xl:h-auto 2xl:gap-14 2xl:mt-[-3%]">
              <div className="vision-reveal section_tags xl:w-[85%] 2xl:w-[70%]">
                <SectionTags
                  name="mission and vision"
                  imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                  header="What drives us"
                  subtext="We began with a vision to connect people to premium properties that suit their lifestyles and needs."
                />
              </div>

              <div className="vision-reveal vision_statement font-bricolage font-bold text-lg leading-5 mt-4 xl:mt-0 md:text-2xl md:leading-7 xl:text-xl xl:leading-7 2xl:text-3xl 2xl:leading-10 xl:w-[90%] 2xl:w-[85%] 2xl:tracking-tighter">
                A trusted real estate brand leading the market, simplifying
                property ownership for everyone, while building strong and
                thriving communities
              </div>

              <div className="vision-reveal description_container font-mona text-neutral-500 text-xs p-[5%] md:text-sm md:p-[3%] xl:text-xs xl:p-[3%] xl:w-[90%] bg-[#f7f7f7] border border-neutral-200 2xl:w-[88%] 2xl:text-sm rounded-3xl 2xl:p-[3%]">
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
          <div ref={missionSectionRef} className="flex flex-col xl:flex-row-reverse w-full min-h-screen xl:min-h-0 xl:py-[3%] xl:gap-10 xl:items-stretch 2xl:py-[4%] 2xl:gap-14 2xl:items-center">
            <div className="xl:w-1/2">
              <div className="mission-reveal image_container relative overflow-hidden h-[50vh] mt-[25%] md:mt-[4%] xl:mt-0 xl:h-[70vh] rounded-3xl">
                <Image
                  src="/HomeAssets/Img999.webp"
                  alt="mission"
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="xl:w-1/2 flex flex-col xl:h-[70vh] xl:justify-evenly 2xl:h-auto 2xl:gap-14 2xl:mt-[-3%]">
              <div className="mission-reveal section_tags xl:w-[85%] 2xl:w-[70%]">
                <SectionTags
                  name="mission and vision"
                  imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                  header="Our Mission and Vision"
                  subtext="We began with a vision to connect people to premium properties that suit their lifestyles and needs."
                />
              </div>

              <div className="mission-reveal vision_statement font-bricolage font-bold text-lg leading-5 mt-4 xl:mt-0 md:text-2xl md:leading-7 xl:text-xl xl:leading-7 2xl:text-3xl 2xl:leading-10 xl:w-[90%] 2xl:w-[85%] 2xl:tracking-tighter">
                Reliable property solutions delivered with professionalism,
                connecting clients with the right opportunities, and maintaining
                integrity in every transaction.
              </div>

              <div className="mission-reveal description_container font-mona text-neutral-500 text-xs p-[5%] md:text-sm md:p-[3%] xl:text-xs xl:p-[3%] xl:w-[90%] bg-[#f7f7f7] border border-neutral-200 2xl:w-[88%] 2xl:text-sm rounded-3xl 2xl:p-[3%]">
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
          <div ref={coreValuesSectionRef} className="core_value_container">
            <div className="core_value_main_content mx-[5%] my-[30%] md:my-[20%] xl:mx-0 xl:mt-[8%] xl:mb-[2%] 2xl:mx-0 2xl:mt-[10%]">
              <div className="core-values-tag tag_section xl:w-[40%] 2xl:w-[28%]">
                <SectionTags
                  name="core values"
                  imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                  header="Our Core Values"
                  subtext="We are committed to delivering the best possible service to our clients."
                />
              </div>

              <div className="core_value_cards_container grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:gap-10 xl:my-[20%%] 2xl:mt-10">
                {coreValues.map((coreValue) => {
                  const Icon = coreValue.icon;
                  return (
                    <div
                      key={coreValue.id}
                      className="core-values-card core_value_card_item border-2 border-neutral-200 rounded-3xl py-[6%] px-[6%] flex flex-col items-center gap-6 xl:flex-col xl:items-start xl:py-[5%] xl:px-[5%] xl:gap-3 2xl:flex-row 2xl:items-center 2xl:px-[8%] 2xl:py-[8%] 2xl:gap-6 group cursor-pointer transition-all duration-300 ease-out hover:border-[#4361EE] hover:shadow-lg"
                    >
                      <div className="icon">
                        <Icon className="w-5 xl:w-5 h-auto text-[#4361EE]" />
                      </div>

                      <div className="text font-mona flex flex-col gap-2 text-center xl:text-left xl:gap-2 2xl:gap-3">
                        <p className="text-[#4361EE] font-bricolage font-semibold text-lg xl:text-sm 2xl:text-base">
                          {coreValue.title}
                        </p>
                        <p className="text-neutral-500 text-sm xl:text-xs 2xl:text-sm xl:w-full 2xl:w-[95%]">
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
            imageSrc="/HomeAssets/Img333.webp"
            imageAlt="about"
            title={["Your Home,", "Simplified"]}
            subtitle="Every search leads closer to a place where comfort meets convenience. From the first glance to the final say, finding the perfect property becomes effortless, turning dreams into a home that truly feels like yours. Spaces that inspire, neighborhoods that welcome, and opportunities that grow with every choice. Every detail, from light-filled rooms to thoughtfully designed layouts, comes together to create a life well-lived. A home isn't just walls and roofs—it's where stories unfold, memories are made, and futures are built."
            tagline="Smart, Elegant"
          />

          {/* Testimonial Section */}
          <div className="testimonial_section_container relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen flex items-center text-white bg-[#191723] mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-16 2xl:min-h-[85vh] md:py-[5%]">
            <Testimonial testimonials={testimonialData} />
          </div>


          <ScrollRevealSection selector=".faq-reveal" className="mb-16 2xl:my-[15%] w-full">
            <Faq faqs={faqData} className="w-full" />
          </ScrollRevealSection>
        </div>
      </div>
    </div>
  );
}

export default page;
