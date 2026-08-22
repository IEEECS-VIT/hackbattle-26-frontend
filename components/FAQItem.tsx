"use client";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

export default function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: FAQItemProps) {
  return (
    <div className="group relative mb-4 w-full overflow-hidden border border-[#FF0000] bg-[#FF0000]/2 shadow-md transition-colors duration-300 hover:bg-white/[0.13] last:mb-0 max-md:mb-0 max-md:w-[92%] max-md:mx-auto max-md:border max-md:border-[#e8d9a0]/55 max-md:bg-transparent max-md:bg-gradient-to-r max-md:from-[#aabf8e]/60 max-md:via-[#b8c39e]/40 max-md:to-[#d7c46e]/55 max-md:backdrop-blur-[5px] max-md:shadow-[0_1px_3px_rgba(0,0,0,0.22)] max-md:hover:bg-white/[0.08] max-md:min-h-[48px] max-md:rounded-[2px]">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-[clamp(1rem,2vw,2rem)] py-[clamp(1rem,2vw,2rem)] max-md:px-3 max-md:py-[14px] max-md:gap-3"
      >
        <div
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <svg
            className="h-[clamp(1.2rem,2vw,2.5rem)] w-[clamp(1.2rem,2vw,2.5rem)] max-md:h-[14px] max-md:w-[14px]"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5L24 15.5L8 26V5Z" fill="white" />
          </svg>
        </div>

        <span className="flex-1 text-left font-pixeboy text-white leading-tight break-words text-[clamp(1.15rem,2vw,3rem)] max-md:text-[11.5px] max-md:leading-[1.2] max-md:tracking-[0.3px]">
          {question}
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="font-pixeboy text-white leading-relaxed px-[clamp(1rem,2vw,2rem)] pb-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,1.5vw,2rem)] max-md:px-3 max-md:pb-3 max-md:pt-0 max-md:text-[11px] max-md:leading-[1.45]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}