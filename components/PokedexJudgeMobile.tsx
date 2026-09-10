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
  linkedinUrl: "https://www.linkedin.com/in/palakawasthi/",
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
                  left: "7.5%",   // Horizontal alignment relative to SVG frame
                  width: "85%",   // Width relative to SVG frame
                  height: "46%",  // Height relative to SVG frame
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

              {/* 2. HER NAME, DETAILS, AND LINKEDIN BUTTON */}
              <div
                className="absolute z-20 flex flex-col items-center text-center px-2 pointer-events-auto"
                style={{
                  top: "72%",      // Positioned directly under photo relative to SVG frame
                  left: "10%",
                  width: "80%",
                  height: "22%",
                }}
              >
                <div className="flex flex-col items-center w-full">
                  <h2 className="text-black font-pixeboy text-2xl sm:text-3xl uppercase tracking-wider truncate w-full leading-none mb-1">
                    {currentJudge.name}
                  </h2>

                  <div className="flex flex-col gap-0.5 w-full text-black font-pixeboy text-xs sm:text-sm leading-tight">
                    <p className="truncate">{currentJudge.line1}</p>
                    <p className="truncate">{currentJudge.line2}</p>
                    <p className="truncate">{currentJudge.line3}</p>
                  </div>
                </div>

                {/* LinkedIn Button with Font Isolation Fix */}
                <div className="mt-1 font-sans">
                  <a
                    href={currentJudge.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0077b5] hover:bg-[#005582] text-white rounded-md border border-black transition-transform hover:scale-105 active:scale-95 shadow-md"
                    aria-label="LinkedIn Profile"
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current shrink-0"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.2.98-2.18 2.18-2.18s2.18.98 2.18 2.18v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span className="font-sans text-xs font-bold tracking-wide">
                      LinkedIn
                    </span>
                  </a>
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