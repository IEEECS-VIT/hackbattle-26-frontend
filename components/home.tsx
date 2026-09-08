"use client";

import React, { useEffect, useRef } from "react";

const titleGradient = {
  background:
    "radial-gradient(circle at 53% 50%, #fff 0%, #fff 6%, #fff6d0 10%, #ffd54f 14%, #f8c61c 18%, #f8c61c 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const Hero = () => {
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;

    video.muted = true;
    const playVideo = () => void video.play().catch(() => undefined);
    playVideo();
    video.addEventListener("canplay", playVideo);
    document.addEventListener("visibilitychange", playVideo);

    return () => {
      video.removeEventListener("canplay", playVideo);
      document.removeEventListener("visibilitychange", playVideo);
    };
  }, []);

  return (
    <div id="home" className="w-full max-w-full select-none overflow-x-clip">
      {/* Mobile hero */}
      <section className="font-pixeboy relative flex min-h-[100svh] w-full items-end overflow-hidden bg-[#08798b] pt-16 sm:pt-[72px] md:hidden">
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          draggable={false}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover object-center"
        >
          <source src="/hackbattle-mobile-video.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#06364b]/10 via-transparent to-[#052f44]/75" />
        <div className="retro-scanlines pointer-events-none absolute inset-0 z-20 opacity-10" />

        <div className="relative z-30 mx-auto flex w-full flex-col items-center px-4 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-12">
          <div className="flex w-full max-w-[38rem] flex-col items-start gap-0">
            <p
              className="text-[clamp(1.55rem,7vw,2.25rem)] leading-none tracking-normal text-white"
              style={{
                textShadow:
                  "2px 2px 0 #1a4a60, -1px -1px 0 #1a4a60, 1px -1px 0 #1a4a60, -1px 1px 0 #1a4a60",
              }}
            >
              PRESENTS
            </p>
            <div className="relative w-full">
              <h1
                className="hackbattle-title w-full whitespace-nowrap text-left text-[clamp(2.75rem,14.2vw,5.8rem)] font-bold leading-[0.8] tracking-[0.015em]"
                style={{
                  ...titleGradient,
                  filter: "drop-shadow(3px 5px 0 rgba(26,74,96,.9))",
                }}
              >
                HACKBATTLE
              </h1>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 w-full whitespace-nowrap text-left text-[clamp(2.75rem,14.2vw,5.8rem)] font-bold leading-[0.8] tracking-[0.015em]"
                style={{
                  background:
                    "radial-gradient(circle at 70% 50%, #fff 0%, #fff 16%, #f8c61c 34%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                HACKBATTLE
              </span>
            </div>
            <h2
              className="max-w-[min(23rem,92vw)] text-left text-[clamp(1.55rem,7vw,2.25rem)] leading-[0.95] tracking-wide text-white sm:max-w-none"
              style={{
                textShadow:
                  "2px 2px 0 #1a4a60, -1px -1px 0 #1a4a60, 1px -1px 0 #1a4a60, -1px 1px 0 #1a4a60, 0 3px 0 #1a4a60",
              }}
            >
              THE ULTIMATE 36-HOUR HACKATHON
            </h2>
          </div>
        </div>
      </section>

      {/* Desktop hero */}
      <div className="relative w-full h-screen overflow-hidden items-center justify-center font-['Pixeboy',_sans-serif] hidden md:flex">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          draggable={false}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full select-none object-cover"
        >
          <source src="/hackbattle-video.webm" type="video/webm" />
          <div className="w-full h-full bg-cyan-600"></div>
        </video>
        <div className="absolute inset-0 bg-blue-900/10 z-10"></div>
        <div className="absolute bottom-[clamp(3rem,18svh,12rem)] left-[clamp(1.5rem,4vw,4rem)] z-30 flex w-[min(92vw,100rem)] max-w-[calc(100vw-3rem)] flex-col items-start">
          {/* Bank of Baroda Logo (Desktop) */}
          <div className="ml-3 sm:ml-2 md:ml-0 mb-10">
        
          </div>

          <h2
            className="ml-[clamp(.75rem,2vw,2.5rem)] text-[clamp(1.8rem,min(3.2vw,5.5svh),3.75rem)] leading-none tracking-normal text-white"
            style={{
              textShadow:
                "2px 2px 0 #1a4a60, -1px -1px 0 #1a4a60, 1px -1px 0 #1a4a60, -1px 1px 0 #1a4a60, 1px 1px 0 #1a4a60, 0px 2px 0 #1a4a60, 2px 0px 0 #1a4a60",
            }}
          >
            PRESENTS
          </h2>
          <div
            className="relative ml-[clamp(.75rem,2vw,2.5rem)] mt-[clamp(-2rem,-1.5vw,-.8rem)] max-w-full"
            data-text="HACKBATTLE"
          >
            <h1
              className="hackbattle-title text-[clamp(5rem,min(10.5vw,18svh),12rem)] font-bold leading-[0.85] tracking-wider"
              style={{
                background:
                  "radial-gradient(circle at 53% 50%, #ffffff 0%, #ffffff 6%, #fff6d0 10%, #ffd54f 13%, #f8c61c 16%, #f8c61c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(3px 5px 0px rgba(26,74,96,0.9))",
              }}
            >
              HACKBATTLE
            </h1>
            <h1
              className="pointer-events-none absolute top-0 left-0 w-full text-[clamp(5rem,min(10.5vw,18svh),12rem)] font-bold leading-[0.85] tracking-wider"
              style={{
                background:
                  "radial-gradient(circle at 70% 50%, #ffffff 0%, #ffffff 18%, #f8c61c 32%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HACKBATTLE
            </h1>
          </div>
          <h3
            className="ml-[clamp(.75rem,2vw,2.5rem)] mt-[clamp(-1rem,-.8vw,-.35rem)] max-w-full text-[clamp(1.7rem,min(3vw,5svh),4rem)] leading-[.95] tracking-normal text-white"
            style={{
              textShadow:
                "2px 2px 0 #1a4a60, -1px -1px 0 #1a4a60, 1px -1px 0 #1a4a60, -1px 1px 0 #1a4a60, 1px 1px 0 #1a4a60, 0px 2px 0 #1a4a60, 2px 0px 0 #1a4a60",
            }}
          >
            THE ULTIMATE 36-HOUR HACKATHON
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Hero;
