"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Problem } from "../types/problem";
import SmokeEffect from "./SmokeEffect";
import useIsMobile from "./useIsMobile";

const REVEAL_SMOKE_CONFIG = {
  black_ball: {
    x: 0,
    y: -250,
    size: 0.55,
  },

  blue_red: {
    x: 0,
    y: -200,
    size: 0.55,
  },

  green_ball: {
    x: 0,
    y: 300,
    size: 0.895,
  },

  purple_ball: {
    x: 0,
    y: -50,
    size: 0.75,
  },

  red_ball: {
    x: 0,
    y: -459,
    size: 0.35,
  },

  white_ball: {
    x: 40,
    y: 0,
    size: 0.65,
  },

  white_black_ball: {
    x: 0,
    y: 0,
    size: 0.65,
  },
};

type Phase = "drop" | "shake" | "burst" | "reveal";

interface Props {
  problem: Problem | null;
  onClose: () => void;
}

const PARTICLE_ANGLES = [
  0,
  30,
  60,
  90,
  120,
  150,
  180,
  210,
  240,
  270,
  300,
  330,
];

const PARTICLE_RADIUS = 170;

const SMOKE_PUFFS = [
  { x: -46, y: -120, size: 22, delay: 0 },
  { x: -22, y: -150, size: 30, delay: 0.05 },
  { x: 4, y: -170, size: 26, delay: 0.02 },
  { x: 28, y: -145, size: 32, delay: 0.09 },
  { x: -34, y: -95, size: 18, delay: 0.14 },
  { x: 20, y: -100, size: 20, delay: 0.11 },
];

const REVEAL_SMOKE_COLORS: Record<string, string> = {
  black_ball: "#8B6CFF",
  blue_red: "#4FC3FF",
  green_ball: "#7DFF8A",
  purple_ball: "#D66BFF",
  red_ball: "#FF6B55",
  white_ball: "#D9F6FF",
  white_black_ball: "#FFD76B",
};

export default function RevealPanel({
  problem,
  onClose,
}: Props) {
  const isMobile = useIsMobile();

  const [phase, setPhase] = useState<Phase>("drop");

  useEffect(() => {
    if (problem) {
      setPhase("drop");
    }
  }, [problem?.id]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  /*
   * ---------------------------------------------------------
   * Desktop reveal values
   * ---------------------------------------------------------
   */
  const desktopClosedBallSize =
    problem?.revealClosedBallSize ?? 300;

  const desktopOpenBallSize =
    problem?.revealOpenBallSize ?? 340;

  const desktopRevealTop =
    problem?.revealTop ?? "50%";

  const desktopRevealLeft =
    problem?.revealLeft ?? "66%";

  const desktopStageSize =
    problem?.revealStageSize ?? 360;

  /*
   * ---------------------------------------------------------
   * Mobile reveal values
   * ---------------------------------------------------------
   *
   * Mobile intentionally ignores the large desktop values
   * from problems.ts so the opened Pokéball stays inside the
   * phone viewport.
   */
  const closedBallSize = isMobile
  ? 190
  : desktopClosedBallSize;

const openBallSize = isMobile
  ? 205
  : desktopOpenBallSize;

const revealTop = isMobile
  ? "50%"
  : desktopRevealTop;

const revealLeft = isMobile
  ? "50%"
  : desktopRevealLeft;

const stageSize = isMobile
  ? 240
  : desktopStageSize;

  /*
   * ---------------------------------------------------------
   * Shared ball positioning
   * ---------------------------------------------------------
   */
  const ballX = problem?.revealBallX ?? 0;
  const ballY = problem?.revealBallY ?? 0;

  const flipStyle = {
    scaleX: problem?.reverseOpen ? -1 : 1,
  };

  const ballSizeNow =
    phase === "reveal" || phase === "burst"
      ? openBallSize
      : closedBallSize;

  return (
    <AnimatePresence>
      {problem && (
        <motion.div
          className="absolute z-50"
          style={{
            top: revealTop,
            left: revealLeft,
            transform: "translateY(-50%)",
          }}
          initial={{
            opacity: 0,
            scale: 0.85,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.85,
          }}
        >
          <div
            className="
              relative
              flex
              items-center
              justify-center
            "
            style={{
              width: stageSize,
              height: stageSize,
            }}
          >
            {/* =================================================
                BURST FLASH
               ================================================= */}
            {phase === "burst" && (
              <motion.div
                className="
                  absolute
                  rounded-full
                  bg-white
                "
                style={{
                  width: 60,
                  height: 60,
                }}
                initial={{
                  scale: 0,
                  opacity: 0.9,
                }}
                animate={{
                  scale: 7,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
              />
            )}

            {/* =================================================
                BURST PARTICLES
                ================================================= */}
            {phase === "burst" &&
              PARTICLE_ANGLES.map((angle) => {
                const rad = (angle * Math.PI) / 180;

                const dx =
                  Math.cos(rad) * PARTICLE_RADIUS;

                const dy =
                  Math.sin(rad) * PARTICLE_RADIUS;

                return (
                  <motion.span
                    key={angle}
                    className="
                      absolute
                      w-2
                      h-2
                      rounded-full
                      bg-yellow-200
                    "
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    animate={{
                      x: dx,
                      y: dy,
                      opacity: 0,
                      scale: 0.3,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: "easeOut",
                    }}
                  />
                );
              })}

            {/* =================================================
                BURST SMOKE
                Desktop only
               ================================================= */}
            {phase === "burst" &&
              !isMobile &&
              SMOKE_PUFFS.map((puff, i) => (
                <motion.span
                  key={`smoke-${i}`}
                  className="
                    absolute
                    rounded-full
                    bg-gray-200/70
                  "
                  style={{
                    width: puff.size,
                    height: puff.size,
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0.6,
                    scale: 0.5,
                  }}
                  animate={{
                    x: puff.x,
                    y: puff.y,
                    opacity: 0,
                    scale: 1.5,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: "easeOut",
                    delay: puff.delay,
                  }}
                />
              ))}

            {/* =================================================
                POKÉBALL
               ================================================= */}
            <motion.img
              key={
                phase === "reveal" || phase === "burst"
                  ? "open"
                  : "closed"
              }
              src={
                phase === "reveal" || phase === "burst"
                  ? `/reveal_open/${problem.ballColor}.svg`
                  : `/pokeballs/${problem.ballColor}.svg`
              }
              alt=""
              aria-hidden
              className="
                object-contain
                drop-shadow-[0_14px_26px_rgba(0,0,0,0.6)]
              "
              style={{
                width: ballSizeNow,
                height: ballSizeNow,
                marginLeft: ballX,
                marginTop: ballY,
                ...flipStyle,
              }}
              initial={
                phase === "drop"
                  ? {
                      y: -300,
                      opacity: 0,
                    }
                  : false
              }
              animate={
                phase === "drop"
                  ? {
                      y: 0,
                      opacity: 1,
                    }
                  : phase === "shake"
                  ? {
                      rotate: [
                        0,
                        -14,
                        14,
                        -10,
                        10,
                        -5,
                        5,
                        0,
                      ],
                    }
                  : {
                      y: 0,
                      opacity: 1,
                    }
              }
              transition={
                phase === "drop"
                  ? {
                      type: "spring",
                      stiffness: 300,
                      damping: 14,
                    }
                  : phase === "shake"
                  ? {
                      duration: 0.7,
                      ease: "easeInOut",
                    }
                  : {
                      duration: 0.2,
                    }
              }
              onAnimationComplete={() => {
                if (phase === "drop") {
                  setPhase("shake");
                } else if (phase === "shake") {
                  setPhase("burst");
                }
              }}
            />

            {/* =================================================
                MAIN COLORED SMOKE
                Desktop only
               ================================================= */}
            {phase === "reveal" && !isMobile && (
              <div
                className="
                  absolute
                  pointer-events-none
                  z-10
                "
                style={{
                  top:
                    openBallSize * 0.62 +
                    REVEAL_SMOKE_CONFIG[
                      problem.ballColor
                    ].y,

                  left: `calc(
                    50% +
                    ${REVEAL_SMOKE_CONFIG[
                      problem.ballColor
                    ].x}px
                  )`,

                  width: openBallSize * 0.9,
                  height: openBallSize * 0.75,

                  transform: "translateX(-50%)",

                  overflow: "visible",
                }}
              >
                <SmokeEffect
                  color={
                    REVEAL_SMOKE_COLORS[
                      problem.ballColor
                    ]
                  }
                  size={
                    openBallSize *
                    0.55 *
                    REVEAL_SMOKE_CONFIG[
                      problem.ballColor
                    ].size
                  }
                  startOffset={0}
                />
              </div>
            )}

            {/* =================================================
                TRANSITION TIMER
               ================================================= */}
            {phase === "burst" && (
              <BurstTimer
                onDone={() => setPhase("reveal")}
              />
            )}

            {/* =================================================
                PROBLEM DESCRIPTION
               ================================================= */}
            <AnimatePresence>
              {phase === "reveal" && (
                <motion.p
                  className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  text-center
                  px-6
                  sm:px-16
                  pixeboy
                  text-white
                  text-[13px]
                  sm:text-[20px]  
                  leading-[1.3]
                  sm:leading-[1.45]
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
                "
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.35,
                  }}
                >
                  {problem.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BurstTimer({
  onDone,
}: {
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 550);

    return () => clearTimeout(t);
  }, [onDone]);

  return null;
}