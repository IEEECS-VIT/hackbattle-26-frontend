"use client";

import React, { useState } from "react";
import Image from "next/image";

// SINGLE JUDGE DATA
const SINGLE_JUDGE = {
  name: "Palak Awasthi",
  image: "/judges/judge1.jpg", // Replace with your actual image path in /public
};

const PokedexJudgeMobile: React.FC = () => {
  // Initialize state directly with default value (no useEffect required)
  const [currentJudge] = useState<typeof SINGLE_JUDGE | null>(SINGLE_JUDGE);

  return (
    <div
      className="section-heading-inset relative w-full min-h-screen flex flex-col items-center justify-start px-4 pb-4 select-none overflow-y-auto overflow-x-hidden"
      style={{
        backgroundImage: `url('/judgesbg.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs sm:max-w-sm">
        
        {/* Pixel Header Title */}
        <h1
          style={{
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "#DA0E2F",
          }}
          className="font-pixeboy mb-4 w-full select-none text-center text-[70px] leading-[80px]"
        >
          JUDGE
        </h1>

        {/* Mobile Judge SVG Asset Container (Relative Anchor) */}
        <div className="relative w-full h-[580px] mt-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">

          {/* Base SVG Frame */}
          <Image
            src="/mobilejudge.svg"
            alt="Mobile Judge Panel"
            fill
            className="object-contain"
            priority
          />

          {currentJudge && (
            <>
              {/* 1. HER PICTURE (Positioned Relative to mobilejudge.svg) */}
              <div
                className="absolute z-20 flex items-center justify-center pointer-events-none"
                style={{
                  top: "24%",    // Vertical alignment relative to SVG frame
                  left: "7.5%",     // Horizontal alignment relative to SVG frame
                  width: "85%",    // Width relative to SVG frame
                  height: "46%",   // Height relative to SVG frame
                }}
              >
                <Image
                  src={currentJudge.image}
                  alt={currentJudge.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* 2. HER NAME (Positioned Relative to mobilejudge.svg) */}
              <div
                className="absolute z-20 flex items-center justify-center text-center pointer-events-none"
                style={{
                  top: "75%",      // Positioned directly under photo relative to SVG frame
                  left: "12%",
                  width: "76%",
                  height: "8%",
                }}
              >
                <h2 className="text-black font-pixeboy text-4xl sm:text-4xl uppercase tracking-wider truncate w-full">
                  {currentJudge.name}
                </h2>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}; //fix PR

export default PokedexJudgeMobile;
