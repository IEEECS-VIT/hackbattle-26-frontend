"use client";

import { useState } from "react";
import Image from "next/image";
import FAQItem from "./FAQItem";
import { faqData } from "./faqData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <section id="faq" className="relative w-full overflow-hidden flex flex-col">
      <Image
        src="/faq-background/faq-bottom.svg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 mx-auto flex w-full max-w-[130rem] flex-col gap-[clamp(1rem,2vw,2rem)] px-[clamp(1rem,3vw,3rem)] pt-[clamp(1rem,2vw,2rem)] pb-[clamp(2rem,6vw,5rem)]">
        <h1 className="font-pixeboy text-center text-white leading-none drop-shadow-[0_6px_8px_rgba(0,0,0,0.9)] text-[clamp(4rem,12vw,15rem)]">
          FAQ
        </h1>

        <div className="mx-auto flex w-full flex-col gap-4">
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
