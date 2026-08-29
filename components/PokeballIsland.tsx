"use client";

import { motion } from "framer-motion";
import { BallColor, Problem } from "../types/problem";
import useIsMobile from "./useIsMobile";

interface Props {
  problem: Problem;
  onSelect: (problem: Problem) => void;
  isActive: boolean;
}

const BALL_SCALE: Record<BallColor, number> = {
  black_ball: 0.98,
  blue_red: 1.01,
  green_ball: 1.000000001,
  purple_ball: 1.07,
  red_ball: 0.999,
  white_ball: 1.064,
  white_black_ball: 0.99,
};

const DEFAULT_BALL_SIZE = 62;
const DEFAULT_STAGE_SIZE = 150;

export default function PokeballIsland({
  problem,
  onSelect,
  isActive,
}: Props) {
  const isMobile = useIsMobile();

  const ballSize = isMobile
    ? problem.mobileBallSize ?? 55
    : problem.ballSize ?? DEFAULT_BALL_SIZE;

  const stageSize = isMobile
    ? problem.mobileStageSize ?? 110
    : problem.stageSize ?? DEFAULT_STAGE_SIZE;

  const ballOffsetTop = problem.ballOffsetTop ?? "40%";
  const ballOffsetLeft = problem.ballOffsetLeft ?? "60%";

  const numberX = problem.numberX ?? -4;
  const numberY = problem.numberY ?? -4;

  const position = isMobile
    ? problem.mobilePosition ?? problem.position
    : problem.position;

  return (
    <div
      className="absolute"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div
        className="relative"
        style={{
          width: stageSize,
          height: stageSize,
        }}
      >
        {/* Island */}
        <img
          src={problem.island}
          alt=""
          aria-hidden
          className="
            absolute
            inset-0
            w-full
            h-full
            object-contain
            select-none
            pointer-events-none
          "
          draggable={false}
        />

        {/* Problem number */}
        <span
          className="
            absolute
            z-10
            pixeboy
            text-white
            text-[22px]
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
            pointer-events-none
          "
          style={{
            top: numberY,
            left: numberX,
          }}
        >
          {String(problem.index).padStart(2, "0")}
        </span>

        {/* Pokéball */}
        <motion.button
          type="button"
          aria-label={`Open problem statement ${problem.index}`}
          onClick={() => onSelect(problem)}
          className="
            absolute
            z-20
            rounded-full
            cursor-pointer
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-white
          "
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
          animate={{
            y: 0,
            scale: BALL_SCALE[problem.ballColor],
          }}
          transition={{
            duration: 0.2,
          }}
          whileHover={{
            scale: BALL_SCALE[problem.ballColor] * 1.12,
          }}
          whileTap={{
            scale: BALL_SCALE[problem.ballColor] * 0.94,
          }}
        />
      </div>
    </div>
  );
}