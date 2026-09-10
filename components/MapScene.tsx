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
      className={styles.section}
    >
      <div className={styles.landscape} />

      {/* Centered Header with adjusted button offset */}
      <header className="relative flex flex-col md:flex-row items-center justify-center mb-8 px-4 w-full">
        <h2
          id="problems-heading"
          className={`${styles.tracksTitle} text-center`}
        >
          TRACKS
        </h2>

        <a
          href="/HB-26-Tracks.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 md:mt-0 md:absolute md:right-4 md:top-8 inline-flex items-center gap-2 rounded-xl border-2 border-[#163e54] bg-[#ffdb37] px-5 py-2.5 font-pixeboy text-xl text-[#153e53] shadow-[0_4px_0_#163e54] transition-transform active:translate-y-0.5 hover:bg-[#ffe156]"
        >
           DOWNLOAD TRACKS PDF
        </a>
      </header>

      <div className={styles.scene}>
        <div
          className={styles.islands}
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
