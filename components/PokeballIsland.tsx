'use client';

import type { CSSProperties } from 'react';
import type { Problem } from '@/types/problem';
import styles from './ProblemScene.module.css';

interface Props {
  problem: Problem;
  onSelect: (problem: Problem) => void;
  isActive: boolean;
}

export default function PokeballIsland({ problem, onSelect, isActive }: Props) {
  return (
    <button type="button" className={styles.island}
      style={{ '--track-color': problem.smokeColor } as CSSProperties}
      data-track={problem.index} data-active={isActive}
      aria-label={`Open problem statement ${problem.index}`}
      aria-pressed={isActive} aria-controls="problem-reveal"
      onClick={() => onSelect(problem)}>
      <span className={styles.number}>{String(problem.index).padStart(2, '0')}</span>
      {/* Pre-cropped art has intentional, predictable transparent boundaries. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.stageArt} src={`/problems/stages-${problem.island}.webp`} alt="" draggable={false} />
      <span className={styles.islandLight} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.islandBall} src={`/problems/pokeballs-${problem.ballColor}.webp`} alt="" draggable={false} />
      <span className={styles.selectedMark} aria-hidden="true" />
    </button>
  );
}
