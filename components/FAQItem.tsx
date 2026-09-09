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
    max-md:mb-3
    max-md:bg-[#50BDDC]/40
    max-md:backdrop-blur-md
    max-md:border-2
    max-md:border-white/85
    max-md:shadow-[0_4px_20px_rgba(0,50,70,0.25),0_0_12px_rgba(255,255,255,0.4)]
    max-md:rounded-md
  "
    >
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
      max-md:px-4
      max-md:py-3.5
      max-md:gap-3
    "
      >
        <div
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-90 text-white" : "rotate-0 text-white/90"
          }`}
        >
          <svg
            className="h-[clamp(1.2rem,2vw,2.5rem)] w-[clamp(1.2rem,2vw,2.5rem)] max-md:h-4 max-md:w-4 max-md:drop-shadow-[0_1px_3px_rgba(0,30,40,0.8)]"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5L24 15.5L8 26V5Z" fill="currentColor" />
          </svg>
        </div>

        <span className="flex-1 text-left font-pixeboy text-white leading-tight break-words text-[clamp(1.15rem,2vw,3rem)] max-md:text-[clamp(13px,4vw,16px)] max-md:leading-snug max-md:tracking-[0.4px] max-md:font-bold max-md:drop-shadow-[0_2px_4px_rgba(0,35,50,0.85)]">
          {question}
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden max-md:border-t-2 max-md:border-white/50 max-md:bg-[#0E5260]/65">
          <div className="font-pixeboy text-white leading-relaxed px-[clamp(1rem,2vw,2rem)] pb-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,1.5vw,2rem)] max-md:px-4 max-md:py-3.5 max-md:text-[clamp(12px,3.8vw,15px)] max-md:leading-relaxed max-md:tracking-[0.3px] max-md:text-white max-md:drop-shadow-[0_1px_3px_rgba(0,25,35,0.8)]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}