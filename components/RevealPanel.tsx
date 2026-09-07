'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type CSSProperties } from 'react';
import type { Problem } from '@/types/problem';
import SmokeEffect from './SmokeEffect';
import styles from './ProblemScene.module.css';

export default function RevealPanel({ problem, replay, reducedMotion }: {
  problem: Problem; replay: number; reducedMotion: boolean;
}) {
  const revealRef = useRef<HTMLDivElement>(null);
  const inView = useInView(revealRef, { amount: 0.2, once: true });
  const openArt = `/problems/reveal_open-${problem.ballColor}.webp`;
  const sequence = `${problem.id}-${replay}`;
  const active = inView || reducedMotion;
  const openTransition = { delay: reducedMotion ? 0 : 1.05, duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <div ref={revealRef} id="problem-reveal" className={styles.reveal} style={{ '--track-color': problem.smokeColor } as CSSProperties}>
      <div className={styles.groundShadow} />
      {!reducedMotion && (
        <motion.img key={`closed-${sequence}`} src={`/problems/pokeballs-${problem.ballColor}.webp`} alt="" aria-hidden="true"
          className={styles.closedBall}
          initial={{ opacity: 0, y: -90, scale: 0.62, rotate: -12 }}
          animate={inView ? { opacity: [0, 1, 1, 1, 0], y: [-90, 0, -9, 0, 0],
            scale: [0.62, 1, 1, 1.04, 1.15], rotate: [-12, 0, -7, 7, 0] } : {}}
          transition={{ duration: 1.25, times: [0, 0.4, 0.65, 0.84, 1], ease: 'easeInOut' }} />
      )}
      <motion.div key={`open-${sequence}`} className={styles.openBall}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.84, y: 18 }}
        animate={active ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={openTransition}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={openArt} className={`${styles.shell} ${styles.shellBowl}`} alt="" draggable={false} />
        <motion.img src={openArt} className={`${styles.shell} ${styles.shellLid}`} alt="" draggable={false}
          initial={reducedMotion ? false : { rotateX: -48, y: 25, opacity: 0 }}
          animate={active ? { rotateX: 0, y: 0, opacity: 1 } : {}}
          transition={{ delay: reducedMotion ? 0 : 1.08, duration: 1.05, ease: [0.16, 1, 0.3, 1] }} />
      </motion.div>
      {/* Keep one canvas/context alive across selections, even during rapid clicks. */}
      <SmokeEffect color={problem.smokeColor} reducedMotion={reducedMotion} replay={replay} active={active} />
      <motion.img key={`rim-${sequence}`} src={openArt} className={styles.frontShell} alt="" draggable={false}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.84, y: 18 }}
        animate={active ? { opacity: 1, scale: 1, y: 0 } : {}} transition={openTransition} />
      <motion.div key={`copy-${sequence}`} className={styles.description}
        initial={reducedMotion ? false : { opacity: 0, y: 10, filter: 'blur(5px)' }}
        animate={active ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ delay: reducedMotion ? 0 : 1.65, duration: 0.7 }}
        role="region" aria-label={`Problem statement ${problem.index}: ${problem.title}`} aria-live="polite" aria-atomic="true">
        <span className={styles.trackLabel}>TRACK {String(problem.index).padStart(2, '0')}</span>
        <p>{problem.description}</p>
      </motion.div>
      <p className={styles.hint}>SELECT A POKÉBALL TO EXPLORE</p>
    </div>
  );
}
