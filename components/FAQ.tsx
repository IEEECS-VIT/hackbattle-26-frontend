"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FAQItem from "./FAQItem";
import { faqData } from "./faqData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  useEffect(() => {
    if (openIndex !== -1) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  return (
    <section id="faq" className="relative w-full overflow-hidden">
      <Image
        src="/faq-background/faq-bottom.svg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 mx-auto flex w-full max-w-[130rem] flex-col justify-start gap-4 px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-14 md:px-8 lg:px-10 xl:px-12">
        <h1 className="-mt-4 font-pixeboy text-center text-white text-[6.5rem] leading-none drop-shadow-[0_6px_8px_rgba(0,0,0,0.9)] sm:-mt-6 sm:text-[8.5rem] md:text-[10.5rem] lg:text-[12.5rem] xl:text-[15rem]">
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
