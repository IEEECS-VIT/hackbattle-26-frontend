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
    <div className="group relative mb-4 w-full overflow-hidden border border-[#FF0000] bg-[#FF0000]/2 shadow-md transition-colors duration-300 hover:bg-white/[0.13] last:mb-0 max-md:mb-0 max-md:w-full max-md:mx-0 max-md:border max-md:border-[#d8c99a]/35 max-md:bg-transparent max-md:bg-gradient-to-r max-md:from-[#aabf8e]/55 max-md:via-[#c4d0a8]/38 max-md:to-[#d7c46e]/52 max-md:backdrop-blur-[6px] max-md:shadow-[0_1px_2px_rgba(0,0,0,0.18)] max-md:hover:bg-white/[0.06] max-md:min-h-[clamp(36px,15.4vw,62px)] max-md:rounded-[2px]">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-[clamp(1rem,2vw,2rem)] py-[clamp(1rem,2vw,2rem)] max-md:px-[clamp(8px,4vw,16px)] max-md:py-[clamp(8px,4.68vw,18px)] max-md:gap-[clamp(6px,3vw,12px)]"
      >
        <div
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <svg
            className="h-[clamp(1.2rem,2vw,2.5rem)] w-[clamp(1.2rem,2vw,2.5rem)] max-md:h-[clamp(10px,4.68vw,18px)] max-md:w-[clamp(10px,4.68vw,18px)]"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5L24 15.5L8 26V5Z" fill="white" />
          </svg>
        </div>

        <span className="flex-1 text-left font-pixeboy text-white leading-tight break-words text-[clamp(1.15rem,2vw,3rem)] max-md:text-[clamp(9px,3.85vw,14px)] max-md:leading-[1.2] max-md:tracking-[0.3px]">
          {question}
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="font-pixeboy text-white leading-relaxed px-[clamp(1rem,2vw,2rem)] pb-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,1.5vw,2rem)] max-md:px-[clamp(8px,4vw,16px)] max-md:pb-[clamp(6px,3vw,12px)] max-md:pt-0 max-md:text-[clamp(9px,3.68vw,13px)] max-md:leading-[1.45]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}