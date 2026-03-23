"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import HeroComponent from "./components/HeroComponent";
import Metrics from "./components/Metrics";
import SectionTags from "./components/SectionTags";
import Button from "./components/button";
import ServicesCard from "./components/ServicesCard";
import PropertyCards from "./components/PropertyCards";
import { coreValuesData, propertiesData, propertiesPageData, servicesPageData, testimonialData, faqData } from "./Data/AppData";
import { coreValueProps, propertiesProps } from "./Types/types";
import {
  Cctv,
  CctvIcon,
  Eye,
  Flag,
  MapPin,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import Image from "next/image";
import Testimonial from "./components/Testimonial";
import Faq from "./components/Faq";
import ServicesBanner from "./components/ServicesBanner";
import ParallaxPropertyImage from "./components/ParallaxPropertyImage";
import ScrollRevealSection from "./components/ScrollRevealSection";

function HomePage() {
  const coreValues: coreValueProps[] = coreValuesData;
  const properties: propertiesProps[] = propertiesData;
  const servicesCards = servicesPageData.map((service) => ({
    id: service.id,
    imageSrc: service.heroImages?.[0] ?? "/HomeAssets/Img111.webp",
    title: service.heroTitle ?? "Service",
    subtext: service.description,
    slug: service.slug,
  }));
  const servicesCount = servicesCards.length;
  const servicesGridCols =
    servicesCount >= 6
      ? "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
      : servicesCount >= 4
        ? "md:grid-cols-2 lg:grid-cols-2"
        : servicesCount === 3
          ? "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
          : servicesCount === 2
            ? "lg:grid-cols-2"
            : "lg:grid-cols-1";
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const currentProperty = properties[currentPropertyIndex];
  const goToPrev = () =>
    setCurrentPropertyIndex((i) => (i === 0 ? properties.length - 1 : i - 1));
  const goToNext = () =>
    setCurrentPropertyIndex((i) => (i === properties.length - 1 ? 0 : i + 1));

  const aboutSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const section = aboutSectionRef.current;
      if (!section) return;

      const reveals = gsap.utils.toArray<HTMLElement>(".about-reveal", section);
      if (!reveals.length) return;

      gsap.set(reveals, { opacity: 0, y: 48 });
      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          once: true,
        },
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }, aboutSectionRef);

    return () => ctx.revert();
  }, []);

  const servicesSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const section = servicesSectionRef.current;
      if (!section) return;

      const reveals = gsap.utils.toArray<HTMLElement>(".services-reveal", section);
      if (!reveals.length) return;

      gsap.set(reveals, { opacity: 0, y: 48 });
      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          once: true,
        },
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }, servicesSectionRef);

    return () => ctx.revert();
  }, []);

  const propertiesSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const section = propertiesSectionRef.current;
      if (!section) return;

      const reveals = gsap.utils.toArray<HTMLElement>(".properties-reveal", section);
      if (!reveals.length) return;

      gsap.set(reveals, { opacity: 0, y: 48 });
      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          once: true,
        },
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }, propertiesSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <HeroComponent />
      {/* About Section */}

      <div ref={aboutSectionRef} className="about_section_container">
        <div className="about_section_main_content mx-[5%] mt-[10%] xl:mt-[6%] 2xl:mt-[5%] flex flex-col md:flex-row md:gap-[6%] 2xl:mx-[10%] lg:gap-[2%] xl:items-stretch xl:gap-0">
          {/* Left section */}
          <div className="left_section md:flex md:flex-col md:justify-between 2xl:w-1/2 lg:w-full">
            <div className="about-reveal">
              <SectionTags
                name="about us"
                imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                header="Assisting individuals in locating the appropriate real estate."
                subtext="Helping you find the perfect property that matches your lifestyle and goals.We make your real estate journey simple, stress-free, and rewarding."
              />
            </div>
            <div className="core_values xl:flex-1 xl:flex xl:flex-col xl:justify-evenly xl:gap-3">
              {coreValues.map((coreValue) => {
                const Icon = coreValue.icon;
                return (
                  <div
                    key={coreValue.id}
                    className="about-reveal core_value_card flex items-center md:w-[80%] lg:w-[80%] xl:w-[80%] gap-[4%] px-[4%] py-[4%] xl:py-[2.5%] xl:px-[3%] bg-white rounded-3xl xl:rounded-2xl shadow-lg my-[4%] xl:my-0"
                  >
                    <div className="core_value_icon">
                      <Icon className="w-8 h-auto text-[#4361EE]" />
                    </div>
                    <div className="card_title">
                      <p className="font-bricolage tracking-tighter font-semibold text-lg lg:text-xl xl:text-base text-[#4361EE] ">
                        {coreValue.title}
                      </p>
                      <p className="font-mona tracking-tight text-neutral-500 lg:text-base xl:text-xs 2xl:text-sm">
                        {coreValue.subtext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right section */}

            <div className="right_section md:flex md:flex-col md:justify-between xl:flex xl:items-end xl:mt-0 2xl:w-1/2 2xl:mt-0">
            <div className="section_container border border-neutral-200 py-[3%] px-[3%] xl:py-[2%] xl:px-[2%] rounded-4xl xl:rounded-3xl xl:w-[85%] mt-[10%] md:mt-[10%] xl:mt-0 mb-[5%] xl:mb-4 2xl:mb-4">
              <div className="about-reveal banner_container relative overflow-hidden rounded-3xl xl:rounded-2xl w-full xl:w-full h-[30vh] md:h-[20vh] xl:h-[26vh] 2xl:h-[28vh]">
                <Image
                  src="/PropertiesAssets/ImgSC3.webp"
                  alt="banner"
                  fill
                  priority
                  sizes="(max-width: 1280px) 85vw, 42vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAQEA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="vision_mission_container flex flex-col xl:flex-row xl:gap-[4%] xl:w-full">
                <div className="about-reveal vision_statement bg-[#f3f3f3e2] mt-[4%] xl:mt-[3%] py-[7%] px-[7%] xl:py-[3%] xl:px-[4%] 2xl:py-[4%] rounded-3xl xl:rounded-2xl ">
                  <Eye className="w-5 xl:w-4 h-auto text-[#4361EE]" />
                  <p className="font-bricolage tracking-tigher font-semibold xl:text-sm">
                    Our vision
                  </p>
                  <p className="text-sm md:text-xs xl:text-xs text-neutral-500 font-mona">
                    A trusted real estate brand leading the market, simplifying
                    property ownership for everyone, while building strong and
                    thriving communities
                  </p>
                </div>
                <div className="about-reveal mission_statement bg-[#f3f3f3e2] mt-[4%] xl:mt-[3%] py-[7%] px-[7%] xl:py-[3%] xl:px-[4%] rounded-3xl xl:rounded-2xl">
                  <Flag className="w-5 xl:w-4 h-auto text-[#4361EE]" />
                  <p className="font-bricolage tracking-tigher font-semibold xl:text-sm">
                    Our Mission
                  </p>
                  <p className="text-sm md:text-xs xl:text-xs text-neutral-500 font-mona">
                    Reliable property solutions delivered with professionalism,
                    connecting clients with the right opportunities, and
                    maintaining integrity in every transaction.
                  </p>
                </div>
              </div>
            </div>

            <div className="metrics_container mb-[6%] xl:mb-0 gap-4 xl:gap-2 grid grid-cols-2 xl:w-[85%] ">
              <div className="about-reveal">
                <Metrics title="120+" subtext="Projects Completed" />
              </div>
              <div className="about-reveal">
                <Metrics title="250+" subtext="Happy Clients" />
              </div>
              <div className="about-reveal">
                <Metrics title="$10M+" subtext="Project Value" />
              </div>
              <div className="about-reveal">
                <Metrics title="90%" subtext="Properties Sold" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories section */}
      <div className="categories_container">
        <div className="categories_content mt-[20%] md:mt-[10%] 2xl:mt-[10%] mx-[5%] 2xl:mx-[10%] ">
          <div className="initial_section_container flex flex-col gap-0  xl:flex-row 2xl:gap-20 2xl:justify-center ">
            <div className="tag-button-container 2xl:mt-[1.4%]">
              <div className="tag_container md:w-[80%] 2xl:w-full xl:mt-[10%]">
                <SectionTags
                  name="categories"
                  imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                  header="Explore best properties with expert services."
                  subtext="We offer a wide range of properties to choose from, including residential, commercial, and industrial properties."
                />
              </div>
              <div className="button_container xl:w-[70%] 2xl:w-[90%] mt-4 md:mt-6">
                <Button
                  text="Learn more"
                  variants="primary"
                  href="/Properties"
                />
              </div>
            </div>
            {propertiesPageData.slice(0, 1).map((property) => (
              <PropertyCards
                key={property.id}
                title={property.heroTitle ?? property.title ?? "Property"}
                subtext={property.description.slice(0, 140).trim() + (property.description.length > 140 ? "…" : "")}
                imageSrc={property.heroImages?.[0] ?? property.imageSrc ?? "/HomeAssets/Img111.webp"}
                href={`/Properties/${property.slug}`}
                cardSize="small"
                className="lg:h-[26vh] xl:h-[26vh] 2xl:h-[28vh]"
                alt={property.heroTitle ?? property.title ?? "Property"}
              />
            ))}
          </div>

          <div className="final_section_container mt-[-11%] md:mt-[-5%] xl:mt-[-8%] xl:flex xl:gap-6 ">
            {propertiesPageData.slice(1, 4).map((property) => (
              <PropertyCards
                key={property.id}
                title={property.heroTitle ?? property.title ?? "Property"}
                subtext={property.description.slice(0, 140).trim() + (property.description.length > 140 ? "…" : "")}
                imageSrc={property.heroImages?.[1] ?? property.imageSrc ?? "/HomeAssets/Img222.webp"}
                href={`/Properties/${property.slug}`}
                className="lg:h-[24vh] xl:h-[24vh] 2xl:h-[26vh]"
                alt={property.heroTitle ?? property.title ?? "Property"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Properties Tag_section */}
      {/* <div className="tag_section_container mx-[5%] 2xl:mx-[10%] mt-[30%] xl:mt-[15%] mb-[11%] xl:w-[50%] 2xl:w-[40%] xl:mb-0 2xl:mt-[6%]">
        <div className="tag content">
          <SectionTags
            name="properties"
            imageSrc="/Main_Assets/Tag_Icon_blue.svg"
            header="Explore premium properties with trusted real estate expertise."
            subtext="We offer a wide range of properties to choose from, including residential, commercial, and industrial properties."
          />
        </div>

        <div className="button_container xl:w-[60%] 2xl:w-[55%] mt-4 md:mt-6">
          <Button text="Learn more" variants="primary" href="/categories" />
        </div>
      </div> */}

      {/* Properties Section */}
      <div ref={propertiesSectionRef} className="properties-container xl:my-[10%]">
        <div
          className="main_content mx-[5%] 2xl:mx-[10%] xl:w-full flex flex-col xl:flex-row xl:items-stretch gap-20 md:gap-0 xl:gap-20"
        >
          <div className="left_section w-full xl:w-[42%] xl:shrink-0 xl:min-h-[66vh] 2xl:mt-[-1%]">
            {/* <div className="tag-section-container md:w-[80%]  my-[20%] mx-[5%]">
                <SectionTags
                    name="Properties"
                    imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                    header="Explore premium properties with trusted real estate expertise." 
                    subtext="Discover a diverse range of premium properties, from luxurious apartments to spacious villas, tailored to your needs."
                    
                    />
                </div> */}
            <div className="properties-reveal left_section relative xl:mt-0 h-full">
              <ParallaxPropertyImage
                imageSrc={currentProperty.imageSrc}
                alt={currentProperty.title}
              />
              <div className="arrows absolute top-1/2 -translate-y-1/2 left-0 right-0 text-white flex items-center justify-between z-20 pointer-events-none">
                <button
                  type="button"
                  onClick={goToPrev}
                  className="arrow-left bg-black rounded-full p-2 lg:p-[3%] 2xl:p-[2%] cursor-pointer pointer-events-auto -translate-x-1/2"
                  aria-label="Previous property"
                >
                  <MoveLeft />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="arrow-right bg-black rounded-full p-2 lg:p-[3%] 2xl:p-[2%] cursor-pointer pointer-events-auto translate-x-1/2"
                  aria-label="Next property"
                >
                  <MoveRight />
                </button>
              </div>
              <div className="indicators absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {properties.map((_, index) => (
                  <button
                    key={_.id}
                    type="button"
                    onClick={() => setCurrentPropertyIndex(index)}
                    aria-label={`Go to property ${index + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentPropertyIndex
                        ? "w-6 h-2.5 bg-white"
                        : "w-2.5 h-2.5 bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* right section */}
          <div className="right_section mt-[10%] md:mt-[8%] xl:mt-0 xl:flex xl:items-stretch xl:min-h-[66vh]">
            <div className="content xl:w-[80%] 2xl:w-[60%] flex flex-col gap-4 xl:gap-0 xl:justify-between h-full">
              <div className="properties-reveal">
              <SectionTags
                name="properties"
                imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                header={currentProperty.title}
              />
              </div>
              <div className="properties-reveal location_details flex mt-1 xl:mt-2">
                <div className="location_icon">
                  <MapPin className="text-neutral-500" />
                </div>
                <div className="location_text text-neutral-500">
                  <p className="font-bricolage tracking-tigher font-semibold">
                    {currentProperty.location}
                  </p>
                </div>
              </div>
              <div className="properties-reveal subtext text-neutral-500 font-mona text-lg md:text-xl lg:text-2xl xl:text-sm 2xl:text-sm tracking-tight leading-6 xl:leading-[1.2rem] 2xl:leading-[1.2rem] md:leading-7 mt-[8%] mb-[6%] md:mt-[4%] md:mb-[3%] xl:mt-[3%] xl:mb-[2%]">
                {currentProperty.description}
              </div>
              <div className="amenities_container">
                {currentProperty.amenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <div
                      key={amenity.id}
                      className="properties-reveal amenity-item flex items-center gap-6 xl:gap-3 my-[2%] md:my-[0.9%] xl:my-[0.4%]"
                    >
                      <div className="icon_container bg-black rounded-full p-[2%] md:p-[1.2%] xl:p-[0.7%]">
                        <Icon className="text-white w-5 xl:w-3.5 h-auto" />
                      </div>
                      <p className="font-mona text-lg md:text-xl lg:text-2xl xl:text-sm font-medium tracking-tighter">
                        {amenity.name}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="properties-reveal button-price-section mt-[10%] md:mt-[4%] lg:mt-[7%] xl:mt-4 flex flex-col-reverse xl:flex-row xl:items-center xl:justify-between gap-4">
                <div className="button xl:w-full">
                  <Button
                    text="Get in touch"
                    variants="primary"
                    href={currentProperty.href}
                  />
                </div>
                <div className="price_container whitespace-nowrap">
                  <p className="font-bricolage tracking-tigher font-semibold text-3xl md:text-4xl lg:text-5xl xl:text-xl 2xl:text-2xl md:tracking-tight">
                    {currentProperty.price}
                  </p>
                  <p className="font-mona font-semibold text-lg lg:text-2xl xl:text-sm text-neutral-500 tracking-tight mt-[-2%] md:mt-[-1%] lg:mt-0">
                    Discounted Price
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div ref={servicesSectionRef} className="main_services_container">
        <div className="main_services-content mx-[5%]  2xl:mx-[10%] mt-[30%] xl:mt-[18%] 2xl:mt-0">
          <div className="tag_section xl:w-[60%]">
            <div className="services-reveal tag content 2xl:w-[75%]">
              <SectionTags
                name="services"
                imageSrc="/Main_Assets/Tag_Icon_blue.svg"
                header="Take a look at some of the services we proudly provide."
                subtext="We offer a wide range of properties to choose from, including residential, commercial, and industrial properties."
              />
            </div>
            <div className="services-reveal button_container xl:w-[60%] 2xl:w-[50%] mt-4 md:mt-6">
              <Button text="Learn more" variants="primary" href="/categories" />
            </div>
          </div>

          <div className="services-reveal">
          <ServicesBanner />
          </div>

          <div
            className={`services_container grid grid-cols-1 ${servicesGridCols} gap-6 lg:gap-8 mt-6 xl:mt-10`}
          >
            {servicesCards.map((card) => (
              <div key={card.id} className="services-reveal">
              <ServicesCard
                id={card.id}
                imageSrc={card.imageSrc}
                title={card.title}
                subtext={card.subtext}
                href={`/Services/${card.slug}`}
              />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="testimonial_section_container flex items-center text-white bg-[#191723] mt-[20%] 2xl:mt-[10%] 2xl:h-[85vh] md:py-[5%]">
        <Testimonial testimonials={testimonialData} />
      </div>


      {/* Faq Section */}
      <ScrollRevealSection
        selector=".faq-reveal"
        groupReveal
        triggerStart="top 80%"
        duration={0.5}
        staggerDelay={0.04}
        className="faq_section_container mx-[5%] xl:mx-[8%] 2xl:mx-[10%] py-[10%] xl:py-[8%]"
      >
        <Faq faqs={faqData} imageSrc="/HomeAssets/Img222.webp" />
      </ScrollRevealSection>
    </div>
  );
}

export default HomePage;
