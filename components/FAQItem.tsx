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
    <div className="group relative z-[9999] mb-4 w-full overflow-hidden border border-[#FF0000] bg-[#FF0000]/2 shadow-md backdrop-blur-[2rem] transition-colors duration-300 hover:bg-white/[0.13] last:mb-0 pointer-events-auto">
      <button
        type="button"
        onClick={() => {
          onClick();
        }}
        aria-expanded={isOpen}
        className="relative z-[9999] flex w-full cursor-pointer pointer-events-auto items-center gap-4 px-[clamp(1rem,2vw,2rem)] py-[clamp(1rem,2vw,2rem)]"
      >
        <div
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <svg
            className="h-[clamp(1.2rem,2vw,2.5rem)] w-[clamp(1.2rem,2vw,2.5rem)]"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5L24 15.5L8 26V5Z" fill="white" />
          </svg>
        </div>

        <span className="flex-1 text-left font-pixeboy text-white leading-tight break-words text-[clamp(1.15rem,2vw,3rem)]">
          {question}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="font-pixeboy text-white leading-relaxed px-[clamp(1rem,2vw,2rem)] pb-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,1.5vw,2rem)]">
          {answer}
        </div>
      </div>
    </div>
  );
}