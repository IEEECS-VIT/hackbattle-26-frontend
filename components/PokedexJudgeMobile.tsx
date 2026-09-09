"use client";

import React, { useState } from "react";
import Image from "next/image";

// SINGLE JUDGE DATA
const SINGLE_JUDGE = {
  name: "Palak Awasthi",
  image: "/judges/judge1.jpg", // Replace with your actual image path in /public
  line1: "SOFTWARE ENGINEERING MTS @ SALESFORCE",
  line2: "GOOGLE WOMEN TECHMAKERS AMBASSADOR",
  line3: "LINKEDIN TOP 100 INFLUENTIAL VOICE IN AI",
  line4: "MIT APPLIED AI & DATA SCIENCE",
};

const PokedexJudgeMobile: React.FC = () => {
  // Initialize state directly with default value (no useEffect required)
  const [currentJudge] = useState<typeof SINGLE_JUDGE | null>(SINGLE_JUDGE);

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 select-none overflow-y-auto overflow-x-hidden"
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
            fontSize: "128px",
            lineHeight: "36px",
            letterSpacing: "-0.02em",
            color: "#DA0E2F",
            width: "284px",
            height: "36px",
          }}
          className="select-none text-center mb-4 font-pixeboy"
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

              {/* 2. HER NAME AND DETAILS (Positioned Relative to mobilejudge.svg) */}
              <div
                className="absolute z-20 flex flex-col items-center justify-start text-center pointer-events-none px-2"
                style={{
                  top: "72%",      // Positioned directly under photo relative to SVG frame
                  left: "10%",
                  width: "80%",
                  height: "22%",
                }}
              >
                <h2 className="text-black font-pixeboy text-2xl sm:text-3xl uppercase tracking-wider truncate w-full leading-none mb-1">
                  {currentJudge.name}
                </h2>

                <div className="flex flex-col gap-0.5 w-full text-black font-pixeboy text-xs sm:text-sm leading-tight">
                  <p className="truncate">{currentJudge.line1}</p>
                  <p className="truncate">{currentJudge.line2}</p>
                  <p className="truncate">{currentJudge.line3}</p>
                  <p className="truncate">{currentJudge.line4}</p>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default PokedexJudgeMobile;