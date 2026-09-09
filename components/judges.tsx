"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import PokedexJudgeMobile from "./PokedexJudgeMobile";

interface JudgeInfo {
  name: string;
  image: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
}

const SINGLE_JUDGE: JudgeInfo = {
  name: "Palak Awasthi",
  image: "/judges/judge1.jpg",
  line1: "SOFTWARE ENGINEERING MTS @ SALESFORCE",
  line2: "GOOGLE WOMEN TECHMAKERS AMBASSADOR",
  line3: "LINKEDIN TOP 100 INFLUENTIAL VOICE IN AI",
  line4: "MIT APPLIED AI & DATA SCIENCE",
};

export default function PokedexJudge() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentJudge, setCurrentJudge] = useState<JudgeInfo>(SINGLE_JUDGE);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [showQuestionMark, setShowQuestionMark] = useState<boolean>(false);
  const [loadKey, setLoadKey] = useState<number>(0);

  // 3D Card Tilt State
  const [tiltStyle, setTiltStyle] = useState<string>(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScanJudge = useCallback(() => {
    setIsFlashing(true);
    setShowQuestionMark(true);

    setTimeout(() => {
      setCurrentJudge(SINGLE_JUDGE);
      setLoadKey((prev) => prev + 1);
      setIsFlashing(false);
      setShowQuestionMark(false);
    }, 400);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const maxTilt = 5;
    const rotateX = -((y - height / 2) / (height / 2)) * maxTilt;
    const rotateY = ((x - width / 2) / (width / 2)) * maxTilt;

    setTiltStyle(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
    );
  };

  const handleMouseLeave = () => {
    setTiltStyle(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  if (isMobile) {
    return <PokedexJudgeMobile />;
  }

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-start p-2 sm:p-4 select-none overflow-y-auto overflow-x-hidden portrait-section-container"
      style={{
        backgroundImage: `url('/judgesbg.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Outer Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl h-full pt-1 md:pt-2 pb-8 portrait-inner-wrapper">
        
        {/* HEADER */}
        <div className="mb-2 z-20 portrait-header-box">
          <h1
            className="text-white text-[70px] leading-[80px] md:text-[111px] md:leading-none lg:text-[148px] xl:text-[185px] font-pixeboy tracking-normal drop-shadow-[0_6px_6px_rgba(0,0,0,0.8)] filter transition-all duration-300 select-none text-center portrait-header-text"
            style={{ fontWeight: 400 }}
          >
            JUDGE
          </h1>
        </div>

        {/* POKEDEX CARD CONTAINER */}
        <div className="w-full max-w-[90%] sm:max-w-lg md:max-w-none flex justify-center origin-center transition-transform duration-300 portrait-card-scaler">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: tiltStyle,
              transition:
                "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            className="flex flex-col md:flex-row items-center md:items-end justify-center w-full relative rounded-3xl gap-0"
          >
            {/* LEFT PANEL */}
            <div className="w-full max-w-[290px] md:max-w-[320px] min-h-[400px] sm:min-h-[430px] bg-[#D30A40] border-4 border-black rounded-2xl md:rounded-l-2xl md:rounded-r-none p-3.5 sm:p-4 flex flex-col justify-between relative z-10 shadow-[0_20px_45px_rgba(0,0,0,0.45)] overflow-hidden">
              <div className="flex items-center gap-2.5 z-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#85d7ff] via-[#31a5ee] to-[#005c9e] border-3 border-white rounded-full ring-2 ring-black shadow-inner relative flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/70 rounded-full absolute top-1 left-1 filter blur-[0.5px]" />
                </div>

                <div className="flex gap-1.5 ml-1">
                  <div className="w-2.5 h-2.5 bg-[#ff3b30] border border-black rounded-full shadow-[0_0_4px_#ff3b30] animate-pulse" />
                  <div className="w-2.5 h-2.5 bg-[#ffcc00] border border-black rounded-full shadow-[0_0_4px_#ffcc00]" />
                  <div className="w-2.5 h-2.5 bg-[#4cd964] border border-black rounded-full shadow-[0_0_4px_#4cd964]" />
                </div>
              </div>

              {/* Decorative Header Cutout */}
              <div
                className="absolute top-0 left-0 right-0 h-16 border-b-4 border-black pointer-events-none bg-transparent"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 55px, 60% 55px, 45% 36px, 0 36px)",
                }}
              />

              {/* SCREEN CONTAINER */}
              <div
                className="bg-black p-1 mt-3 mb-1.5 w-full flex flex-col items-center justify-center"
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 88%)",
                }}
              >
                <div
                  className="bg-[#dedede] p-2.5 sm:p-3 relative shadow-inner w-full flex flex-col items-center justify-center"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 88%)",
                  }}
                >
                  <div
                    className="bg-black p-0.5 w-full"
                    style={{
                      clipPath:
                        "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 88%)",
                    }}
                  >
                    <div
                      className="bg-[#232323] w-full aspect-square overflow-hidden relative flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)]"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 88%)",
                        perspective: "600px",
                      }}
                    >
                      <div className="absolute inset-0 retro-scanlines pointer-events-none z-10 opacity-40" />
                      <div className="absolute top-0 right-0 w-[200%] h-full bg-gradient-to-bl from-white/10 to-transparent -translate-y-1/2 skew-x-12 pointer-events-none z-15" />
                      <div
                        className={`absolute inset-0 z-30 pointer-events-none bg-yellow-400/20 mix-blend-screen ${
                          isFlashing ? "animate-lcd-flash" : "hidden"
                        }`}
                      />

                      {showQuestionMark || !currentJudge ? (
                        <div className="text-[#ffcc00] font-pixeboy text-6xl sm:text-7xl font-bold animate-spin-perpendicular select-none filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.85)] will-change-transform">
                          ?
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <Image
                            key={loadKey}
                            src={currentJudge.image}
                            alt={currentJudge.name}
                            fill
                            className="object-cover animate-image-pop"
                            priority
                            unoptimized
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* MID PADS PANEL */}
              <div className="flex justify-between items-center px-1 mt-2 mb-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-zinc-800 border-2 border-black rounded-full shadow-[0_2.5px_0_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer" />

                <div className="flex gap-1.5">
                  <span className="w-10 sm:w-12 h-3 bg-[#ff3b30] border border-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]" />
                  <span className="w-10 sm:w-12 h-3 bg-[#31a5ee] border border-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]" />
                </div>

                <div className="w-6 sm:w-10 h-3" />
              </div>

              {/* LOWER HARDWARE HUB */}
              <div className="flex items-end justify-between w-full relative px-0.5 gap-2">
                <div className="flex items-center bg-black rounded-md h-9 sm:h-10 p-1 overflow-hidden flex-1 relative border border-zinc-700 transform -translate-y-3 sm:-translate-y-4">
                  <button
                    onClick={handleScanJudge}
                    className="bg-[#ff9500] text-black border border-white rounded-full w-6 h-6 sm:w-7 sm:h-7 font-black text-sm sm:text-base flex items-center justify-center cursor-pointer hover:bg-[#ffb03a] hover:scale-105 active:scale-95 transition-all z-20 absolute left-1 shadow-inner"
                  >
                    &gt;
                  </button>

                  <button
                    onClick={handleScanJudge}
                    className="w-full bg-transparent text-white font-pixeboy text-base sm:text-lg tracking-widest text-center py-1 pl-5 outline-none cursor-pointer hover:text-[#ff9500] active:scale-[0.98] transition-all truncate"
                  >
                    Surprise Me!
                  </button>
                </div>

                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 mb-1 sm:mb-[12px]">
                  <div className="absolute w-4 sm:w-5 h-12 sm:h-16 bg-zinc-800 border-2 border-black rounded-sm shadow-md" />
                  <div className="absolute w-12 sm:w-16 h-4 sm:h-5 bg-zinc-800 border-2 border-black rounded-sm shadow-md" />
                  <div className="absolute w-4 sm:w-5 h-4 sm:h-5 bg-zinc-800 z-10" />
                </div>
              </div>
            </div>

            {/* HINGES (Desktop & Landscape) */}
            <div className="hidden md:flex flex-col justify-around h-[210px] w-4.5 z-20 -mx-[8px] relative mb-10 shrink-0 portrait-hinge">
              <div className="w-4.5 h-10 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-900 border-2 border-black rounded-md shadow-lg z-20" />
              <div className="w-4.5 h-10 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-900 border-2 border-black rounded-md shadow-lg z-20" />
            </div>

            {/* RIGHT INFO PANEL */}
            <div className="w-full max-w-[290px] md:max-w-[270px] bg-transparent -mt-2 md:mt-0 relative z-0 portrait-right-panel">
              {/* Outer Black Border Wrapper */}
              <div
                className="w-full bg-black p-[3.5px] rounded-b-2xl md:rounded-b-none md:rounded-r-2xl shadow-[0_20px_45px_rgba(0,0,0,0.45)] portrait-right-panel-inner"
                style={{
                  clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 8%)",
                }}
              >
                {/* Inner Red Container */}
                <div
                  className="w-full h-full bg-[#D30A40] rounded-b-[12px] md:rounded-b-none md:rounded-r-[12px] p-2.5 sm:p-3 flex flex-col justify-between"
                  style={{
                    clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 8%)",
                  }}
                >
                  <div
                    className="bg-black p-0.5 flex-grow flex"
                    style={{
                      clipPath:
                        "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 6%)",
                    }}
                  >
                    <div
                      className="bg-[#c2c2c2] w-full h-full p-3 sm:p-4 flex flex-col items-center justify-start font-pixeboy text-[#1d1d1d] relative shadow-[inset_0_2px_5px_rgba(0,0,0,0.25)] min-h-[200px] md:min-h-[270px]"
                      style={{
                        clipPath:
                          "polygon(7% 0, 100% 0, 100% 100%, 0 100%, 0 5%)",
                      }}
                    >
                      <div className="absolute top-0 right-0 bg-[#D30A40] border-b-2 border-l-2 border-black px-1.5 py-0.5 flex items-center gap-1 rounded-bl-md z-10">
                        <span className="w-2 h-2 bg-[#ff3b30] border border-black rounded-full shadow-sm" />
                        <span className="w-2 h-2 bg-[#ffcc00] border border-black rounded-full shadow-sm" />
                        <span className="w-2 h-2 bg-[#4cd964] border border-black rounded-full shadow-sm" />
                      </div>

                      {currentJudge && (
                        <div
                          key={`info-${loadKey}`}
                          className="flex flex-col items-center justify-start w-full flex-grow text-center pt-2 animate-text-slide"
                        >
                          {/* Name at the Top */}
                          <h2 className="text-3xl sm:text-4xl uppercase tracking-normal text-[#0c0c0c] font-pixeboy font-normal break-words border-b-2 border-black/20 pb-1.5 mb-2.5 w-full">
                            {currentJudge.name}
                          </h2>

                          {/* 4-Line Intro matching exact background color */}
                          <div className="flex flex-col gap-1 w-full text-[#0c0c0c] text-base sm:text-lg font-normal leading-tight tracking-wide">
                            <p className="bg-[#c2c2c2] py-0.5 px-1">
                              {currentJudge.line1}
                            </p>
                            <p className="bg-[#c2c2c2] py-0.5 px-1">
                              {currentJudge.line2}
                            </p>
                            <p className="bg-[#c2c2c2] py-0.5 px-1">
                              {currentJudge.line3}
                            </p>
                            <p className="bg-[#c2c2c2] py-0.5 px-1">
                              {currentJudge.line4}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (orientation: portrait) and (max-width: 1366px) {
          .portrait-section-container {
            height: 100vh !important;
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-between: space-between !important;
            overflow: hidden !important;
            padding-top: 2rem !important;
            padding-bottom: 1.5rem !important;
            background-position: center bottom !important;
          }

          .portrait-inner-wrapper {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            height: 100% !important;
            justify-content: space-between !important;
          }

          .portrait-header-box {
            margin-bottom: 0 !important;
          }

          .portrait-card-scaler {
            transform: scale(
              min(
                calc(85vw / 600px),
                calc(55vh / 430px),
                1.0
              )
            ) !important;
            transform-origin: center center !important;
            margin-top: auto !important;
            margin-bottom: auto !important;
          }

          .portrait-card-scaler > div {
            flex-direction: row !important;
            align-items: flex-end !important;
          }

          .portrait-hinge {
            display: flex !important;
          }

          .portrait-right-panel {
            margin-top: 0 !important;
            max-width: 270px !important;
          }

          .portrait-right-panel-inner {
            border-left-width: 0 !important;
            border-top-right-radius: 1rem !important;
            border-bottom-right-radius: 1rem !important;
            border-bottom-left-radius: 0 !important;
          }
        }

        .animate-image-pop {
          animation: imagePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2)
            forwards;
        }
        .animate-text-slide {
          opacity: 0;
          animation: textSlideIn 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .animate-spin-perpendicular {
          animation: perpendicularSpin 0.45s linear infinite;
          transform-style: preserve-3d;
        }

        @keyframes perpendicularSpin {
          0% {
            transform: rotateY(0deg) scale(1.1);
          }
          50% {
            transform: rotateY(180deg) scale(1.35);
          }
          100% {
            transform: rotateY(360deg) scale(1.1);
          }
        }

        @keyframes imagePop {
          0% {
            transform: scale(0.6);
            filter: brightness(1.8) contrast(1.2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            filter: none;
            opacity: 1;
          }
        }

        @keyframes textSlideIn {
          0% {
            transform: translateY(8px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
