import React from "react";
import Image from "next/image";

const PokedexJudgeMobile: React.FC = () => {
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

      {/* Main Relative Container */}
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
          className="select-none text-center mb-4"
        >
          JUDGE
        </h1>

        {/* Mobile Judge SVG Asset */}
        <div className="relative w-full h-[580px] mt-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
          <Image
            src="/mobilejudge.svg"
            alt="Mobile Judge Panel"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </div>
  );
};

export default PokedexJudgeMobile;
