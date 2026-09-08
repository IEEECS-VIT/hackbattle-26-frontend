"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import PokedexJudgeMobile from "./PokedexJudgeMobile";

interface JudgeInfo {
  name: string;
  image: string;
}

const SINGLE_JUDGE: JudgeInfo = {
  name: "Palak Awasthi",
  image: "/judges/judge1.jpg",
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

  // 1. Screen size detector: true ONLY for small mobile devices (<640px)
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

  // 2. Render mobile view if under 640px viewport width
  if (isMobile) {
    return <PokedexJudgeMobile />;
  }

  // 3. Render desktop and iPad/Tablet layout for screen sizes >= 640px
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
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl h-full pt-1 md:pt-2 pb-8 portrait-inner-wrapper">
        
        {/* HEADER */}
        <div className="mb-4 z-20 portrait-header-box">
          <h1
            className="text-white text-7xl md:text-[10rem] lg:text-[12rem] font-pixeboy leading-none tracking-normal drop-shadow-[0_6px_6px_rgba(0,0,0,0.8)] filter transition-all duration-300 select-none text-center portrait-header-text"
            style={{ fontWeight: 400 }}
          >
            JUDGE
          </h1>
        </div>

        {/* POKEDEX CARD CONTAINER */}
        <div className="w-full max-w-[95%] sm:max-w-xl md:max-w-none flex justify-center origin-center transition-transform duration-300 portrait-card-scaler">
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
            <div className="w-full max-w-[360px] md:max-w-[400px] min-h-[480px] sm:min-h-[510px] bg-[#D30A40] border-4 border-black rounded-2xl md:rounded-l-2xl md:rounded-r-none p-4 sm:p-5 flex flex-col justify-between relative z-10 shadow-[0_20px_45px_rgba(0,0,0,0.45)] overflow-hidden">
              <div className="flex items-center gap-3 z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#85d7ff] via-[#31a5ee] to-[#005c9e] border-4 border-white rounded-full ring-2 ring-black shadow-inner relative flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/70 rounded-full absolute top-1 left-1.5 filter blur-[0.5px]" />
                </div>

                <div className="flex gap-1.5 ml-1">
                  <div className="w-3 h-3 bg-[#ff3b30] border border-black rounded-full shadow-[0_0_4px_#ff3b30] animate-pulse" />
                  <div className="w-3 h-3 bg-[#ffcc00] border border-black rounded-full shadow-[0_0_4px_#ffcc00]" />
                  <div className="w-3 h-3 bg-[#4cd964] border border-black rounded-full shadow-[0_0_4px_#4cd964]" />
                </div>
              </div>

              {/* Decorative Header Cutout */}
              <div
                className="absolute top-0 left-0 right-0 h-20 border-b-4 border-black pointer-events-none bg-transparent"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 70px, 60% 70px, 45% 44px, 0 44px)",
                }}
              />

              {/* SCREEN CONTAINER */}
              <div
                className="bg-black p-1 mt-4 mb-2 w-full flex flex-col items-center justify-center"
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 88%)",
                }}
              >
                <div
                  className="bg-[#dedede] p-3 sm:p-4 relative shadow-inner w-full flex flex-col items-center justify-center"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 88%)",
                  }}
                >
                  <div
                    className="bg-black p-0.75 w-full"
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
                        <div className="text-[#ffcc00] font-pixeboy text-8xl sm:text-9xl font-bold animate-spin-perpendicular select-none filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.85)] will-change-transform">
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
              <div className="flex justify-between items-center px-1 mt-3 mb-1">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-zinc-800 border-2 border-black rounded-full shadow-[0_3px_0_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer" />

                <div className="flex gap-2">
                  <span className="w-12 sm:w-15 h-3.5 sm:h-4 bg-[#ff3b30] border border-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]" />
                  <span className="w-12 sm:w-15 h-3.5 sm:h-4 bg-[#31a5ee] border border-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]" />
                </div>

                <div className="w-8 sm:w-12 h-4" />
              </div>

              {/* LOWER HARDWARE HUB */}
              <div className="flex items-end justify-between w-full relative px-0.5 gap-2">
                <div className="flex items-center bg-black rounded-md h-11 sm:h-12 p-1 overflow-hidden flex-1 relative border border-zinc-700 transform -translate-y-4 sm:-translate-y-6">
                  <button
                    onClick={handleScanJudge}
                    className="bg-[#ff9500] text-black border border-white rounded-full w-7 h-7 sm:w-8 sm:h-8 font-black text-base sm:text-lg flex items-center justify-center cursor-pointer hover:bg-[#ffb03a] hover:scale-105 active:scale-95 transition-all z-20 absolute left-1 shadow-inner"
                  >
                    &gt;
                  </button>

                  <button
                    onClick={handleScanJudge}
                    className="w-full bg-transparent text-white font-pixeboy text-lg sm:text-xl tracking-widest text-center py-2 pl-6 outline-none cursor-pointer hover:text-[#ff9500] active:scale-[0.98] transition-all truncate"
                  >
                    Surprise Me!
                  </button>
                </div>

                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 mb-2 sm:mb-[20px]">
                  <div className="absolute w-5 sm:w-7 h-16 sm:h-20 bg-zinc-800 border-2 border-black rounded-sm shadow-md" />
                  <div className="absolute w-16 sm:w-20 h-5 sm:h-7 bg-zinc-800 border-2 border-black rounded-sm shadow-md" />
                  <div className="absolute w-5 sm:w-7 h-5 sm:h-7 bg-zinc-800 z-10" />
                </div>
              </div>
            </div>

            {/* HINGES (Desktop & Landscape) */}
            <div className="hidden md:flex flex-col justify-around h-[260px] w-5 z-20 -mx-[9px] relative mb-12 shrink-0 portrait-hinge">
              <div className="w-5 h-12 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-900 border-2 border-black rounded-md shadow-lg z-20" />
              <div className="w-5 h-12 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-900 border-2 border-black rounded-md shadow-lg z-20" />
            </div>

            {/* RIGHT INFO PANEL */}
            <div className="w-full max-w-[360px] md:max-w-[340px] bg-transparent -mt-2 md:mt-0 relative z-0 portrait-right-panel">
              {/* Outer Black Border Wrapper for Cut Angles */}
              <div
                className="w-full bg-black p-[4px] rounded-b-2xl md:rounded-b-none md:rounded-r-2xl shadow-[0_20px_45px_rgba(0,0,0,0.45)] portrait-right-panel-inner"
                style={{
                  clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 8%)",
                }}
              >
                {/* Inner Red Container */}
                <div
                  className="w-full h-full bg-[#D30A40] rounded-b-[12px] md:rounded-b-none md:rounded-r-[12px] p-3 sm:p-4 flex flex-col justify-between"
                  style={{
                    clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 8%)",
                  }}
                >
                  <div
                    className="bg-black p-0.75 flex-grow flex"
                    style={{
                      clipPath:
                        "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 6%)",
                    }}
                  >
                    <div
                      className="bg-[#c2c2c2] w-full h-full p-3 sm:p-4 flex flex-col items-center justify-center font-pixeboy text-[#1d1d1d] relative shadow-[inset_0_2px_5px_rgba(0,0,0,0.25)] min-h-[260px] md:min-h-[340px]"
                      style={{
                        clipPath:
                          "polygon(7% 0, 100% 0, 100% 100%, 0 100%, 0 5%)",
                      }}
                    >
                      <div className="absolute top-0 right-0 bg-[#D30A40] border-b-2 border-l-2 border-black px-2 py-1 flex items-center gap-1.5 rounded-bl-md">
                        <span className="w-2.5 h-2.5 bg-[#ff3b30] border border-black rounded-full shadow-sm" />
                        <span className="w-2.5 h-2.5 bg-[#ffcc00] border border-black rounded-full shadow-sm" />
                        <span className="w-2.5 h-2.5 bg-[#4cd964] border border-black rounded-full shadow-sm" />
                      </div>

                      {currentJudge && (
                        <div
                          key={`info-${loadKey}`}
                          className="flex flex-col items-center justify-center w-full flex-grow text-center"
                        >
                          <h2 className="text-4xl sm:text-5xl uppercase tracking-normal text-[#0c0c0c] animate-text-slide font-pixeboy font-normal break-words">
                            {currentJudge.name}
                          </h2>
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
            justify-content: space-between !important;
            overflow: hidden !important;
            padding-top: 3rem !important;
            padding-bottom: 2rem !important;
            background-position: center bottom !important;
          }

          .portrait-header-text {
            font-size: clamp(8rem, 18vw, 18rem) !important;
            line-height: 0.85 !important;
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
                calc(85vw / 740px),
                calc(55vh / 510px),
                1.05
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
            max-width: 340px !important;
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