'use client';

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { problems } from '@/data/problems';
import type { Problem } from '@/types/problem';
import PokeballIsland from './PokeballIsland';
import RevealPanel from './RevealPanel';
import styles from './ProblemScene.module.css';

export default function MapScene() {
  const [selected, setSelected] = useState<Problem>(problems[2]);
  const [replay, setReplay] = useState(0);
  const reducedMotion = useReducedMotion();

  function selectProblem(problem: Problem) {
    setSelected(problem);
    setReplay((value) => value + 1);
  }

  return (
    <section id="problems" aria-labelledby="problems-heading" className={styles.section}>
      <div className={styles.landscape} />
      <header className={styles.heading}>
        <h2 id="problems-heading">PROBLEM<br />STATEMENTS</h2>
      </header>
      <div className={styles.scene}>
        <div className={styles.islands} role="group" aria-label="Choose a problem statement">
          {problems.map((problem) => (
            <PokeballIsland key={problem.id} problem={problem}
              onSelect={selectProblem} isActive={selected.id === problem.id} />
          ))}
        </div>
        <RevealPanel replay={replay} problem={selected}
          reducedMotion={Boolean(reducedMotion)} />
      </div>
    </section>
  );
}
