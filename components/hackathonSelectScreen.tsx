import React from "react";
import Link from "next/link";

interface ActionBubbleProps {
  label: string;
  onClick?: () => void;
  frameSrc: string;
}

const ActionBubble: React.FC<ActionBubbleProps> = ({
  label,
  onClick,
  frameSrc,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        relative
        /* Responsive sizing */
        w-[45vw]
        sm:w-[40vw]
        md:w-[30vw]
        aspect-[1.45]

        transition-transform
        duration-150
        hover:scale-105
        active:scale-95

        focus:outline-none
        shrink-0
      "
    >
      {/* SVG BUBBLE */}
      <img
        src={frameSrc}
        alt=""
        aria-hidden="true"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-fill
          z-10
          pointer-events-none
          select-none
        "
      />

      {/* TEXT */}
      <span
        className="
          absolute
          inset-0
          z-20
          flex
          items-center
          justify-center

          font-['Jersey_20']
          font-normal
          text-[4.5vw]
          sm:text-[3.8vw]
          md:text-[3.1vw]
          leading-none
          tracking-[-0.02em]

          text-black
          uppercase
          select-none
          pb-[3%]
        "
      >
        {label}
      </span>
    </button>
  );
};

export const HackathonSelectionScreen: React.FC<{
  onBuildTeam?: () => void;
  onJoinTeam?: () => void;
}> = ({ onBuildTeam, onJoinTeam }) => {
  return (
    <main
      className="
        relative
        w-screen
        h-[100dvh]
        min-h-[100vh]
        overflow-hidden
        select-none
        bg-black
        md:block
      "
    >
      {/* ================================================= */}
      {/* BACK TO LOGIN LINK */}
      {/* ================================================= */}
      <Link
        href="/login"
        className="
          absolute 
          top-6 
          left-6 
          z-50 
          font-pixeboy 
          inline-flex 
          items-center 
          gap-2 
          text-xl
          sm:text-2xl 
          text-black/80 
          transition 
          hover:text-[#ffdf50]
        "
      >
        <span aria-hidden="true">←</span> BACK TO LOGIN
      </Link>

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}
      <picture className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
        <source media="(min-width: 768px)" srcSet="/bg-landscape.svg" />
        <img
          src="/HackathonSelectScreenbg.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
      </picture>

      {/* ================================================= */}
      {/* RED GBA (Top Right on Mobile / Bottom Right on Desktop) */}
      {/* ================================================= */}
      <div
        className="
          absolute
          z-10
          /* Mobile: Top-Right position */
          w-[100vw]
          max-w-[500px]
          right-[-5%]
          top-[28%]

          /* Desktop: Bottom-Right position */
          md:w-[50vw]
          md:max-w-[650px]
          md:min-w-[360px]
          md:left-auto
          md:right-[0.5vw]
          md:top-auto
          md:bottom-[-5vh]
        "
      >
        <img
          src="/gba-red.svg"
          alt=""
          aria-hidden="true"
          className="
            w-full
            h-auto
            object-contain
            pointer-events-none
            select-none
          "
        />

        {/* Action Bubble positioning */}
        <div
          /* AFTER */
className="
  hidden md:block
  absolute
  md:left-auto
  md:right-[45%]
  md:top-[5%]
  z-20
  pointer-events-auto
"
        >
          <ActionBubble
            label="JOIN TEAM"
            onClick={onJoinTeam}
            frameSrc="/speech-bubble-frame.svg"
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* BLUE GBA (Bottom Left on Mobile / Bottom Left on Desktop) */}
      {/* ================================================= */}
      <div
        className="
          absolute
          z-10
          /* Mobile: Bottom-Left position */
          w-[110vw]
          max-w-[800px]
          left-[-5%]
          bottom-[0%]

          /* Desktop: Bottom-Left position */
          md:w-[50vw]
          md:max-w-[650px]
          md:min-w-[360px]
          md:left-[0.5vw]
          md:right-auto
          md:top-auto
          md:bottom-[-5vh]
        "
      >
        <img
          src="/gba-blue.svg"
          alt=""
          aria-hidden="true"
          className="
            w-full
            h-auto
            object-contain
            pointer-events-none
            select-none
          "
        />

        {/* Action Bubble positioning */}
        <div
          /* AFTER */
className="
  hidden md:block
  absolute
  md:right-auto
  md:left-[45%]
  md:top-[5%]
  z-20
  pointer-events-auto
"
        >
          <ActionBubble
            label="BUILD TEAM"
            onClick={onBuildTeam}
            frameSrc="/speech-bubble-frame-right.svg"
          />
        </div>
      </div>
    </main>
  );
};

export default HackathonSelectionScreen;