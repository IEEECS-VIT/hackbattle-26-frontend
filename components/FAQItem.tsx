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
    <div
      className="
    group relative mb-4 w-full overflow-hidden
    border border-[#B8E8E8]/70
    bg-[#0B5960]/35
    backdrop-blur-[2px]
    shadow-[0_4px_20px_rgba(0,40,50,0.25)]
    transition-all duration-300
    hover:border-[#D8FFFF]
    hover:bg-[#0B5960]/50
    hover:shadow-[0_0_20px_rgba(120,230,230,0.25)]
    last:mb-0
  "
    >
      {/* Overlay */}
      {/* Hover overlay */}
      <div
        className="
    pointer-events-none
    absolute inset-0
    bg-gradient-to-r
    from-[#7DE2E2]/15
    via-[#B6A5E8]/10
    to-transparent
    opacity-0
    transition-opacity duration-300
    group-hover:opacity-100
  "
      />

      {/* Content */}
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="
      relative z-10
      flex w-full items-center gap-4
      px-[clamp(1rem,2vw,2rem)]
      py-[clamp(1rem,2vw,2rem)]
      max-md:px-[clamp(8px,4vw,16px)]
      max-md:py-[clamp(8px,4.68vw,18px)]
      max-md:gap-[clamp(6px,3vw,12px)]
    "
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