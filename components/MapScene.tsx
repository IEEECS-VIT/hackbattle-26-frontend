"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { problems } from "@/data/problems";
import type { Problem } from "@/types/problem";
import PokeballIsland from "./PokeballIsland";
import RevealPanel from "./RevealPanel";
import styles from "./ProblemScene.module.css";

export default function MapScene() {
  const [selected, setSelected] = useState<Problem>(problems[0]);
  const [replay, setReplay] = useState(0);
  const reducedMotion = useReducedMotion();

  function selectProblem(problem: Problem) {
    setSelected(problem);
    setReplay((value) => value + 1);
  }

  return (
    <section
      id="problems"
      aria-labelledby="problems-heading"
      className={`${styles.section} w-full overflow-x-hidden min-h-screen py-6 px-3 sm:px-6`}
    >
      <div className={styles.landscape} />

      {/* Header Container - Fixed Overlap on Mobile */}
      {/* Header Container */}
      <header className="relative z-30 flex flex-col items-center justify-center gap-2 mb-6 px-4 w-full max-w-5xl mx-auto pt-4">
        {/* Heading without absolute positioning constraints */}
        <h2
          id="problems-heading"
          className="font-pixeboy text-center text-4xl sm:text-6xl text-[#ffdf50] tracking-widest drop-shadow-[0_4px_0_#163e54] m-0 p-0 leading-none"
        >
          TRACKS
        </h2>

        {/* Downscaled, stacked Download Button */}
        <a
          href="/HB-26-Tracks.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2 inline-flex items-center justify-center rounded-md border-2 border-[#163e54] bg-[#ffdb37] px-3 py-1 font-pixeboy text-xs sm:text-sm text-[#153e53] shadow-[0_2.5px_0_#163e54] transition-transform active:translate-y-0.5 hover:bg-[#ffe156] whitespace-nowrap"
        >
          DOWNLOAD TRACKS PDF
        </a>
      </header>
      <div
        className={`${styles.scene} flex flex-col items-center w-full max-w-5xl mx-auto`}
      >
        <div
          className={`${styles.islands} w-full`}
          role="group"
          aria-label="Choose a problem statement"
        >
          {problems.map((problem) => (
            <PokeballIsland
              key={problem.id}
              problem={problem}
              onSelect={selectProblem}
              isActive={selected.id === problem.id}
            />
          ))}
        </div>

        <RevealPanel
          replay={replay}
          problem={selected}
          reducedMotion={Boolean(reducedMotion)}
        />
      </div>
    </section>
  );
}
