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
      className={`${styles.section} w-full min-h-screen py-4 px-3 sm:px-6 flex flex-col items-center`}
    >
      <div className={styles.landscape} />

      {/* Header Container */}
      <header className="relative flex flex-col md:flex-row items-center justify-between mb-4 px-4 w-full max-w-5xl mx-auto gap-3 pt-2 z-10">
        <div className="hidden md:block w-[180px]" />

        <h2
          id="problems-heading"
          className="font-pixeboy text-center text-white text-4xl sm:text-6xl md:text-7xl tracking-wider select-none drop-shadow-[0_4px_0_#163e54]"
        >
          TRACKS
        </h2>

        <a
          href="/HB-26-Tracks.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-[#163e54] bg-[#ffdb37] px-3.5 py-1.5 font-pixeboy text-xs sm:text-sm md:text-base text-[#153e53] shadow-[0_3px_0_#163e54] transition-all active:translate-y-0.5 hover:bg-[#ffe156] whitespace-nowrap shrink-0 z-20"
        >
          DOWNLOAD TRACKS PDF
        </a>
      </header>

      {/* Main Grid Viewport */}
      <div
        className={`${styles.scene} w-full max-w-5xl mx-auto flex flex-col items-center gap-4`}
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
