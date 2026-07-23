"use client";

import Image from "next/image";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const pokeballPositions = [
  "-left-2 -top-2",
  "-right-2 -top-2",
  "-bottom-2 -left-2",
  "-bottom-2 -right-2",
];

export default function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: FAQItemProps) {
  return (
    <div className="group relative mb-4 flex min-h-[6rem] w-full flex-col overflow-visible border border-[#FF0000] bg-[#FF0000]/15 shadow-md backdrop-blur-[2rem] transition-colors duration-300 hover:bg-white/[0.03] last:mb-0 sm:mb-5 sm:min-h-[7rem] md:min-h-[8rem] lg:min-h-[9.4375rem]">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-8"
      >
        <div
          className={`mr-3 shrink-0 transition-transform duration-300 sm:mr-4 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <svg
            className="h-[2.5rem] w-[2.5rem]"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M8 5L24 15.5L8 26V5Z" fill="white" />
          </svg>
        </div>

        <span className="font-pixeboy text-[1.6rem] text-center pt-[2rem]leading-none text-white sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem]">
          {question}
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="font-pixeboy px-4 pb-4 text-[1.1rem] leading-relaxed text-white sm:px-5 sm:pb-5 sm:text-[1.4rem] md:px-6 md:pb-6 md:text-[1.75rem] lg:px-8 lg:pb-8 lg:text-[2.1rem]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
