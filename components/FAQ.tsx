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

      {/* Mobile top characters - spec % */}
      <div className="absolute z-20 block md:hidden left-[7.0%] top-[29.6%] w-[13.7%] h-[6.9%]">
        <Image
          src="/faq-background/pikachu.png"
          alt="pikachu"
          width={67}
          height={91}
          className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>
      <div className="absolute z-20 block md:hidden left-[78.3%] top-[29.2%] w-[16.1%] h-[7.5%]">
        <Image
          src="/faq-background/eve.png"
          alt="eve"
          width={92}
          height={95}
          className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>

      {/* Mobile bottom characters - spec % */}
      <div className="absolute z-20 block md:hidden left-[2.7%] top-[90.8%] w-[22.1%] h-[9.1%]">
        <Image
          src="/faq-background/bulbasaur.png"
          alt="bulbasaur"
          width={104}
          height={115}
          className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>
      <div className="absolute z-20 block md:hidden left-[40.5%] top-[90.8%] w-[19.7%] h-[9.1%]">
        <Image
          src="/faq-background/trainer.png"
          alt="trainer"
          width={87}
          height={136}
          className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>
      <div className="absolute z-20 block md:hidden left-[73.9%] top-[90.6%] w-[22.4%] h-[9.2%]">
        <Image
          src="/faq-background/pokeball.png"
          alt="pokeball"
          width={107}
          height={83}
          className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          style={{ imageRendering: "pixelated" } as React.CSSProperties}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[130rem] flex-col gap-[clamp(1rem,2vw,2rem)] px-[clamp(1rem,3vw,3rem)] pt-[clamp(1rem,2vw,2rem)] pb-[clamp(2rem,6vw,5rem)] max-md:max-w-none max-md:w-full max-md:h-full max-md:px-0 max-md:pt-0 max-md:pb-0 max-md:gap-0">
        <h1 className="font-pixeboy text-center text-white leading-none drop-shadow-[0_6px_8px_rgba(0,0,0,0.9)] text-[clamp(4rem,12vw,15rem)] max-md:absolute max-md:left-[27.4%] max-md:top-[4.9%] max-md:w-[41.8%] max-md:h-[9.2%] max-md:flex max-md:items-center max-md:justify-center max-md:text-[clamp(48px,18vw,72px)] max-md:tracking-[1px] max-md:drop-shadow-[0_4px_6px_rgba(0,0,0,0.85)] max-md:pt-0">
          FAQ
        </h1>

        <div className="mx-auto flex w-full flex-col gap-4 max-md:absolute max-md:left-[4.7%] max-md:top-[36.7%] max-md:w-[88.3%] max-md:mx-0 max-md:gap-[clamp(14px,7.36vw,42px)]">
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
