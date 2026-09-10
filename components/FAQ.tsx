"use client";

import { useState } from "react";
import Image from "next/image";
import FAQItem from "./FAQItem";
import { faqData } from "./faqData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden flex flex-col max-md:min-h-0 max-md:h-auto max-md:py-0"
    >
      {/* Desktop background */}
      <Image
        src="/faq-background/faq.png"
        alt=""
        fill
        priority
        className="hidden md:block object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/15 hidden md:block" />

      {/* Mobile background */}
      <Image
        src="/faq-background/faq-mobile-bg.png"
        alt=""
        fill
        priority
        className="block md:hidden object-cover object-top"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[130rem] flex-col gap-[clamp(1rem,2vw,2rem)] px-[clamp(1rem,3vw,3rem)] pt-8 md:pt-12 pb-[clamp(2rem,6vw,5rem)] max-md:max-w-none max-md:w-full max-md:h-auto max-md:px-4 max-md:pb-6 max-md:gap-0 max-md:items-center">
        {/* Scaled FAQ Title */}
        <h1 className="font-pixeboy text-center text-white text-3xl sm:text-5xl md:text-6xl tracking-wider select-none drop-shadow-[0_4px_0_#163e54]">
          FAQ
        </h1>

        {/* Mobile Subtitle */}
        <p className="hidden max-md:block text-center font-pixeboy text-white text-[clamp(11px,3.5vw,14px)] tracking-[1.5px] uppercase mt-1.5 mb-2 drop-shadow-[0_2px_4px_rgba(0,30,40,0.85)]">
          GOT QUESTIONS? WE’VE GOT ANSWERS!
        </p>

        {/* Mobile Pikachu & Eevee decorative area */}
        <div className="hidden max-md:flex items-center justify-between w-full max-w-[340px] px-4 my-2 relative z-20">
          <div className="w-[50px] h-[68px] shrink-0">
            <Image
              src="/faq-background/pikachu.png"
              alt="pikachu"
              width={67}
              height={91}
              className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              style={{ imageRendering: "pixelated" } as React.CSSProperties}
            />
          </div>
          <div className="flex items-center gap-1.5 opacity-80">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            <div className="w-2 h-2 bg-white rotate-45 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
          </div>
          <div className="w-[60px] h-[62px] shrink-0">
            <Image
              src="/faq-background/eve.png"
              alt="eve"
              width={92}
              height={95}
              className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              style={{ imageRendering: "pixelated" } as React.CSSProperties}
            />
          </div>
        </div>

        {/* FAQ Cards List */}
        <div className="mx-auto flex w-full flex-col gap-4 max-md:relative max-md:inset-auto max-md:w-full max-md:max-w-[560px] max-md:mx-auto max-md:px-0 max-md:gap-3 max-md:mt-1">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* Mobile bottom characters */}
        <div className="hidden max-md:flex items-center justify-around w-full max-w-[340px] mt-5 mb-1 relative z-20">
          <div className="w-[60px] h-[66px]">
            <Image
              src="/faq-background/bulbasaur.png"
              alt="bulbasaur"
              width={104}
              height={115}
              className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              style={{ imageRendering: "pixelated" } as React.CSSProperties}
            />
          </div>
          <div className="w-[50px] h-[78px]">
            <Image
              src="/faq-background/trainer.png"
              alt="trainer"
              width={87}
              height={136}
              className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              style={{ imageRendering: "pixelated" } as React.CSSProperties}
            />
          </div>
          <div className="w-[60px] h-[46px]">
            <Image
              src="/faq-background/pokeball.png"
              alt="pokeball"
              width={107}
              height={83}
              className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              style={{ imageRendering: "pixelated" } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
