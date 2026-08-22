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
      className="relative w-full overflow-hidden flex flex-col max-md:min-h-[860px] max-md:py-0"
    >
      {/* Desktop background - unchanged */}
      <Image
        src="/faq-background/faq-bottom.svg"
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
        className="block md:hidden object-cover object-center"
      />

      {/* Mobile top characters */}
      <div className="absolute z-20 block md:hidden left-[16px] top-[78px] w-[52px] h-[52px]">
        <Image
          src="/faq-background/pikachu.png"
          alt="pikachu"
          width={67}
          height={91}
          className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>
      <div className="absolute z-20 block md:hidden right-[16px] top-[78px] w-[54px] h-[54px]">
        <Image
          src="/faq-background/eve.png"
          alt="eve"
          width={92}
          height={95}
          className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>

      {/* Mobile bottom characters */}
      <div className="absolute z-20 block md:hidden left-[12px] bottom-[10px] w-[60px] h-[60px]">
        <Image
          src="/faq-background/bulbasaur.png"
          alt="bulbasaur"
          width={104}
          height={115}
          className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>
      <div className="absolute z-20 block md:hidden left-1/2 -translate-x-1/2 bottom-[12px] w-[52px] h-[52px]">
        <Image
          src="/faq-background/trainer.png"
          alt="trainer"
          width={87}
          height={136}
          className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>
      <div className="absolute z-20 block md:hidden right-[12px] bottom-[12px] w-[60px] h-[60px]">
        <Image
          src="/faq-background/pokeball.png"
          alt="pokeball"
          width={107}
          height={83}
          className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[130rem] flex-col gap-[clamp(1rem,2vw,2rem)] px-[clamp(1rem,3vw,3rem)] pt-[clamp(1rem,2vw,2rem)] pb-[clamp(2rem,6vw,5rem)] max-md:max-w-[420px] max-md:gap-3 max-md:px-4 max-md:pt-5 max-md:pb-[78px]">
        <h1 className="font-pixeboy text-center text-white leading-none drop-shadow-[0_6px_8px_rgba(0,0,0,0.9)] text-[clamp(4rem,12vw,15rem)] max-md:text-[68px] max-md:tracking-[2px] max-md:drop-shadow-[0_4px_6px_rgba(0,0,0,0.85)] max-md:pt-1">
          FAQ
        </h1>

        <div className="mx-auto flex w-full flex-col gap-4 max-md:gap-[14px] max-md:mt-[28px]">
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
      </div>
    </section>
  );
}
