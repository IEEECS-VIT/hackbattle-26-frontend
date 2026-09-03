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
        /* Preserved original size */
        w-[30vw]
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
          /* Preserved original font scaling */
          text-[3.1vw]
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
      "
    >
      {/* ================================================= */}
      {/* SIMPLE BACK TO HOME LINK */}
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
          text-2xl 
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
      <img
        src="/bg-landscape.svg"
        alt=""
        aria-hidden="true"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
          z-0
          pointer-events-none
          select-none
        "
      />

      {/* ================================================= */}
      {/* BLUE LAPTOP + BUILD TEAM BUBBLE GROUP */}
      {/* ================================================= */}
      <div
        className="
          absolute
          z-10
          /* Preserved exact laptop positioning and width constraints */
          w-[50vw]
          max-w-[650px]
          min-w-[360px]
          left-[0.5vw]
          bottom-[-5vh]
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

        {/* Anchored relative to the Blue Laptop wrapper */}
        <div
          className="
            absolute
            left-[45%]
            top-[5%]
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

      {/* ================================================= */}
      {/* RED LAPTOP + JOIN TEAM BUBBLE GROUP */}
      {/* ================================================= */}
      <div
        className="
          absolute
          z-10
          /* Preserved exact laptop positioning and width constraints */
          w-[50vw]
          max-w-[650px]
          min-w-[360px]
          right-[0.5vw]
          bottom-[-5vh]
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

        {/* Anchored relative to the Red Laptop wrapper */}
        <div
          className="
            absolute
            right-[45%]
            top-[5%]
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
    </main>
  );
};

export default HackathonSelectionScreen;