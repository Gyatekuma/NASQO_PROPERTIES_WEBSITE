"use client";

import Image from "next/image";
import React, { useState } from "react";
import SectionTags from "./SectionTags";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface faqItemProps {
  id: string;
  number: string;
  question: string;
  answer: string;
}

interface FaqProps {
  faqs: faqItemProps[];
  imageSrc?: string;
  className?: string;
}

const Faq: React.FC<FaqProps> = ({ faqs, imageSrc = "/HomeAssets/Img11.jpg", className }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`main_faq_container flex flex-col xl:flex-row xl:gap-12 2xl:gap-16 xl:items-stretch xl:justify-start text-left ${className ?? ""}`.trim()}>
      {/* Left Column - Image: visible only on xl and 2xl */}
      <div className="faq-reveal faq_image_container hidden xl:block xl:flex-1 xl:min-w-0 xl:max-w-[50%]">
        <div className="image_container relative overflow-hidden w-full h-[30vh] xl:h-full xl:min-h-[400px] 2xl:min-h-[500px] rounded-3xl">
          <Image
            src={imageSrc}
            alt="FAQ"
            fill
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Column - FAQ Content */}
      <div className="faq_content xl:flex-1 xl:min-w-0 xl:flex xl:flex-col xl:justify-center">
        <div className="faq-reveal tag_section">
          <SectionTags
            name="FAQs"
            imageSrc="/Main_Assets/Tag_Icon_blue.svg"
            header="Everything about Nasqo"
            subtext="We know that buying, selling, or investing in real estate can be overwhelming. Here are some frequently asked questions to help guide you through the process."
          />
        </div>

        <div className="main_list-content mt-4 xl:mt-0">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="faq-reveal list_card border-b border-neutral-200 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="list_item w-full flex items-start justify-between gap-4 py-4 xl:py-5 text-left hover:opacity-80 transition-opacity"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-question-${faq.id}`}
                >
                  <div className="list_text flex gap-2 xl:gap-3 font-mona font-semibold md:text-xl 2xl:text-lg text-neutral-800 tracking-tight flex-1 min-w-0">
                    <span className="text-neutral-500 shrink-0">
                      {faq.number}.
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <div className="arrow shrink-0 text-neutral-500">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" aria-hidden />
                    ) : (
                      <ChevronDown className="w-5 h-5" aria-hidden />
                    )}
                  </div>
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="font-mona text-neutral-500 text-base md:text-lg 2xl:text-lg leading-6 pb-4 xl:pb-5 pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
