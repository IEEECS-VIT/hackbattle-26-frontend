import React, { useState, useEffect } from "react";
import Link from "next/link";

interface TypewriterTextProps {
  text: string;
  speed?: number; // Delay in ms between each character
  delay?: number; // Delay before typing starts
}

// ----------------------------------------------------------------------
// Typewriter Text Component for Video Game Retro Effect
// ----------------------------------------------------------------------
const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 80,
  delay = 200,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    // Optional delay before typing begins
    const startTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);

      // Store interval reference on timeoutId for cleanup
      timeoutId = intervalId as unknown as NodeJS.Timeout;
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutId) clearInterval(timeoutId);
    };
  }, [text, speed, delay]);

  return <span>{displayedText}</span>;
};

interface ActionBubbleProps {
  label: string;
  onClick?: () => void;
  frameSrc: string;
  typingDelay?: number; // Custom delay option per bubble
}

const ActionBubble: React.FC<ActionBubbleProps> = ({
  label,
  onClick,
  frameSrc,
  typingDelay = 200,
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

      {/* TEXT WITH GRADUAL TYPEWRITER EFFECT */}
      <span
        className="
          absolute
          inset-0
          z-20
          flex
          items-center
          justify-center

          font-pixieboy
          font-normal
          text-[5.5vw]
          sm:text-[4.5vw]
          md:text-[3.8vw]
          leading-none
          tracking-[-0.02em]

          text-black
          uppercase
          select-none
          pb-[3%]
        "
      >
        <TypewriterText text={label} speed={70} delay={typingDelay} />
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

        inline-flex
        items-center
        gap-2

        px-5
        py-2

        bg-white
        rounded-[6px]
        border-4
        border-black
        shadow-[4px_4px_0px_#000]

        font-pixeboy
        text-xl
        sm:text-2xl
        text-black

        transition
        hover:bg-[#ffdf50]
        hover:shadow-[2px_2px_0px_#000]
        active:translate-x-[2px]
        active:translate-y-[2px]
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
          className="
            absolute
            z-20
            pointer-events-auto

            /* MOBILE POSITION */
            left-[10%]
            top-[0%]

            /* DESKTOP POSITION */
            md:left-auto
            md:right-[45%]
            md:top-[5%]
          "
        >
          <ActionBubble
            label="JOIN TEAM"
            onClick={onJoinTeam}
            frameSrc="/speech-bubble-frame.svg"
            typingDelay={300} // Starts typing 300ms after load
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
          className="
            absolute
            z-20
            pointer-events-auto

            /* MOBILE POSITION */
            left-[55%]
            top-[40%]

            /* DESKTOP POSITION */
            md:right-auto
            md:left-[45%]
            md:top-[5%]
          "
        >
          <ActionBubble
            label="BUILD TEAM"
            onClick={onBuildTeam}
            frameSrc="/speech-bubble-frame-right.svg"
            typingDelay={300} // Staggered delay to start typing after the first bubble
          />
        </div>
      </div>
    </main>
  );
};

export default HackathonSelectionScreen;