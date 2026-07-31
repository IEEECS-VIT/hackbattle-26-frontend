"use client";

import { motion } from "framer-motion";
import { BallColor, Problem } from "../types/problem";

interface Props {
  problem: Problem;
  onSelect: (problem: Problem) => void;
  isActive: boolean; // true while its own reveal panel is open
}

// WHY THIS EXISTS: the 7 files in /public/pokeballs are not cropped
// consistently -- e.g. white_ball.svg's ball only fills ~48% of its own
// canvas while green_ball.svg's fills ~99%. Rendered at the same box size
// with backgroundSize: contain, that made some balls look roughly twice as
// big as others (measured directly from the source PNGs). This table
// scales each one back to a common apparent size. This is a correction for
// the *asset's own crop*, independent of the per-problem `ballSize` below
// (which controls the overall box the ball renders in).
const BALL_SCALE: Record<BallColor, number> = {
  black_ball: 0.98,
  blue_red: 1.01,
  green_ball: 1.000000001,
  purple_ball: 1.07,
  red_ball: 0.999,
  white_ball: 1.064,
  white_black_ball: 0.99,
};

// Fallback box size (px) when a problem doesn't set its own `ballSize`.
const DEFAULT_BALL_SIZE = 62;

// NEW: fallback island-platform footprint (px) when a problem doesn't set
// its own `stageSize`. Was previously hardcoded to 150 directly in the
// JSX below — pulled out to a named default so it's obvious where the
// fallback value lives when you're scanning for it.
const DEFAULT_STAGE_SIZE = 150;

export default function PokeballIsland({ problem, onSelect, isActive }: Props) {
  const ballSize = problem.ballSize ?? DEFAULT_BALL_SIZE;
  const stageSize = problem.stageSize ?? DEFAULT_STAGE_SIZE;
  // NEW: both now overridable per-problem instead of hardcoded — see the
  // comments on these fields in types/problem.ts for why.
  const ballOffsetTop = problem.ballOffsetTop ?? "40%";
  const ballOffsetLeft = problem.ballOffsetLeft ?? "60%";
  const numberX = problem.numberX ?? -4;
  const numberY = problem.numberY ?? -4;

  return (
    <div
      className="absolute"
      style={{ top: problem.position.top, left: problem.position.left }}
    >
      {/*
        CHANGED: this used to be `flex flex-col items-center` with the
        number as a sibling <span> below the stage box. That centered the
        number under the *whole* stage horizontally and pushed it below
        the island's visual footprint entirely — it never actually sat on
        the island the way the reference art shows (numbers tucked into
        the island's top-left corner, overlapping the platform itself).

        Fix: the number is now an absolutely-positioned child *inside*
        this same relative box as the island image and the ball button,
        pinned to a fixed corner offset. Because it's pinned in px (not a
        percentage), it lands in the same visual spot relative to the
        island's edge regardless of `stageSize`, which is what you want —
        a bigger island doesn't need a proportionally bigger numeral, it
        needs the numeral in the same relative corner.
      */}
      <div className="relative" style={{ width: stageSize, height: stageSize }}>
        <img
          src={problem.island}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
          draggable={false}
        />

        <span
          className="absolute z-10 pixeboy text-white text-[22px]
                     drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none"
          style={{ top: numberY, left: numberX }}
        >
          {String(problem.index).padStart(2, "0")}
        </span>

        {/* Anchored to ballOffsetTop/ballOffsetLeft (defaults 40%/60%)
            rather than flow layout, so it sits on the island's landing pad
            consistently across every stage image regardless of stageSize —
            these are percentages of the box above, so they scale with it.
            Per-problem override lets you nudge it for islands whose
            landing pad art isn't at that same relative spot. */}
        <motion.button
          type="button"
          aria-label={`Open problem statement ${problem.index}`}
          onClick={() => onSelect(problem)}
          className="absolute rounded-full cursor-pointer focus-visible:outline
                     focus-visible:outline-2 focus-visible:outline-white"
          style={{
            top: ballOffsetTop,
            left: ballOffsetLeft,
            width: ballSize,
            height: ballSize,
            marginTop: -ballSize / 2,
            marginLeft: -ballSize / 2,
            backgroundImage: `url(/pokeballs/${problem.ballColor}.svg)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          // CHANGED: dropped the `y: [0, -6, 0], repeat: Infinity` idle bob —
          // the map pokeballs now sit still instead of continuously floating.
          // isActive/hover/tap feedback is untouched; only the perpetual
          // loop is gone, so there's just one static target state now
          // instead of two branches that only differed in that loop.
          animate={{ y: 0, scale: BALL_SCALE[problem.ballColor] }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: BALL_SCALE[problem.ballColor] * 1.12 }}
          whileTap={{ scale: BALL_SCALE[problem.ballColor] * 0.94 }}
        />
      </div>
    </div>
  );
}