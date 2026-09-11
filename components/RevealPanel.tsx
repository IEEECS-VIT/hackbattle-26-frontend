"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import type { Problem } from "@/types/problem";
import SmokeEffect from "./SmokeEffect";
import styles from "./ProblemScene.module.css";

export default function RevealPanel({
  problem,
  replay,
  reducedMotion,
}: {
  problem: Problem;
  replay: number;
  reducedMotion: boolean;
}) {
  const revealRef = useRef<HTMLDivElement>(null);
  const inView = useInView(revealRef, { amount: 0.2, once: true });
  const openArt = `/problems/reveal_open-${problem.ballColor}.webp`;
  const sequence = `${problem.id}-${replay}`;
  const active = inView || reducedMotion;
  const openTransition = {
    delay: reducedMotion ? 0 : 1.05,
    duration: 0.85,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  const renderFormattedDescription = (text: string) => {
    const parts = text.split("\n\n");
    return parts.map((part, index) => {
      if (part.startsWith("The Problem:")) {
        return (
          <div key={index} className="mb-2.5">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#ffdf50] font-sans">
              The Problem
            </span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/90 font-sans font-normal">
              {part.replace("The Problem:", "").trim()}
            </p>
          </div>
        );
      }
      if (part.startsWith("The Challenge:")) {
        return (
          <div key={index} className="mb-2.5">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#77dce7] font-sans">
              The Challenge
            </span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/90 font-sans font-normal">
              {part.replace("The Challenge:", "").trim()}
            </p>
          </div>
        );
      }
      if (part.startsWith("Subtracks:")) {
        const subtrackList = part
          .replace("Subtracks:", "")
          .split(",")
          .map((item) => item.trim());

        return (
          <div
            key={index}
            className="mt-2 pt-2 border-t border-white/10 font-sans"
          >
            <span className="block text-xs font-bold uppercase tracking-wider text-[#ffdf50] mb-1">
              Subtracks
            </span>
            <div className="flex flex-wrap gap-1">
              {subtrackList.map((sub, i) => (
                <span
                  key={i}
                  className="inline-block rounded-md bg-white/10 px-1.5 py-0.5 text-[11px] sm:text-xs text-white/90 border border-white/15"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        );
      }
      return (
        <p
          key={index}
          className="mb-2.5 text-xs sm:text-sm leading-relaxed text-white/90 font-sans font-normal"
        >
          {part}
        </p>
      );
    });
  };

  return (
    <div
      ref={revealRef}
      id="problem-reveal"
      className={`${styles.reveal} flex flex-col items-center w-full px-2 mt-2`}
      style={{ "--track-color": problem.smokeColor } as CSSProperties}
    >
      {/* Pokeball Art Graphic */}
      <div className={styles.artwork}>
        <div className={styles.groundShadow} />
        {!reducedMotion && (
          <motion.img
            key={`closed-${sequence}`}
            src={`/problems/pokeballs-${problem.ballColor}.webp`}
            alt=""
            aria-hidden="true"
            className={styles.closedBall}
            initial={{ opacity: 0, y: -90, scale: 0.62, rotate: -12 }}
            animate={
              inView
                ? {
                    opacity: [0, 1, 1, 1, 0],
                    y: [-90, 0, -9, 0, 0],
                    scale: [0.62, 1, 1, 1.04, 1.15],
                    rotate: [-12, 0, -7, 7, 0],
                  }
                : {}
            }
            transition={{
              duration: 1.25,
              times: [0, 0.4, 0.65, 0.84, 1],
              ease: "easeInOut",
            }}
          />
        )}
        <motion.div
          key={`open-${sequence}`}
          className={styles.openBall}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.84, y: 18 }}
          animate={active ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={openTransition}
        >
          <Image
            src={openArt}
            width={240}
            height={240}
            className={`${styles.shell} ${styles.shellBowl}`}
            alt=""
            draggable={false}
          />
          <motion.div
            initial={
              reducedMotion ? false : { rotateX: -48, y: 25, opacity: 0 }
            }
            animate={active ? { rotateX: 0, y: 0, opacity: 1 } : {}}
            transition={{
              delay: reducedMotion ? 0 : 1.08,
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Image
              src={openArt}
              width={240}
              height={240}
              className={`${styles.shell} ${styles.shellLid}`}
              alt=""
              draggable={false}
            />
          </motion.div>
        </motion.div>
        <SmokeEffect
          color={problem.smokeColor}
          reducedMotion={reducedMotion}
          replay={replay}
          active={active}
        />
        <motion.div
          key={`rim-${sequence}`}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.84, y: 18 }}
          animate={active ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={openTransition}
        >
          <Image
            src={openArt}
            width={240}
            height={240}
            className={styles.frontShell}
            alt=""
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Structured Card Content with Constrained Height & Y-Scroll */}
      <motion.div
        key={`copy-${sequence}`}
        className="relative z-30 w-full max-w-md rounded-2xl border-2 border-[#163e54] bg-[#075568]/95 p-4 sm:p-5 shadow-[0_6px_0_#163e54] backdrop-blur-lg my-2 max-h-[380px] sm:max-h-[460px] flex flex-col"
        initial={
          reducedMotion ? false : { opacity: 0, y: 10, filter: "blur(5px)" }
        }
        animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ delay: reducedMotion ? 0 : 1.65, duration: 0.7 }}
        role="region"
        aria-label={`Problem statement ${problem.index}: ${problem.title}`}
      >
        {/* Track Title */}
        <div className="flex-shrink-0 items-center justify-between border-b border-white/20 pb-2 mb-2">
          <span className="font-pixeboy text-base sm:text-xl md:text-2xl text-[#ffdf50] tracking-wide block break-words">
            TRACK {String(problem.index).padStart(2, "0")}: {problem.title}
          </span>
        </div>

        {/* Scrollable Container */}
        <div className="text-left font-sans overflow-y-auto pr-1 flex-1">
          {renderFormattedDescription(problem.description)}
        </div>
      </motion.div>

      <p className={`${styles.hint} mt-1 text-[11px] sm:text-xs text-white/80`}>
        SELECT A POKÉBALL TO EXPLORE
      </p>
    </div>
  );
}
