import type { CSSProperties } from "react";
import styles from "./FancyLoader.module.css";

export default function FancyLoader({ progress }: { progress: number }) {
  return (
    <div
      className={styles.screen}
      style={{ "--loader-cycle": "1.7s" } as CSSProperties}
      role="status"
      aria-live="polite"
      aria-label={`Loading HackBattle: ${progress}%`}
    >
      <div className={styles.scenery} aria-hidden="true">
        <div className={styles.clouds}><i /><i /><i /></div>
        <div className={styles.hills} />
        <div className={styles.trees}><i /><i /><i /><i /><i /><i /></div>
        <div className={styles.grass} />
        <div className={styles.pikachu} />
        <div className={styles.bulbasaur} />
      </div>
      <div className={styles.grid} aria-hidden="true" />
      <section className={styles.scene} aria-hidden="true">
        <div className={styles.orbit}>
          <span className={styles.ring} />
          <span className={styles.beam} />
          <span className={styles.platform} />
          <span className={styles.particles}><i /><i /><i /><i /><i /><i /></span>
          <span className={styles.ball}><span /></span>
          <span className={styles.spark}>✦</span>
        </div>
        <p className={styles.eyebrow}>YOUR NEXT ADVENTURE AWAITS</p>
        <h1 className={styles.title}>
          {progress === 100 ? "BATTLE READY!" : <>BATTLE LOADING<span>...</span></>}
        </h1>
        <div className={styles.progressLabel}>
          <span>{progress === 100 ? "LET'S GO, TRAINER" : "PREPARING THE WORLD"}</span>
          <span className={styles.percentage}>{progress}<small>%</small></span>
        </div>
        <div
          className={styles.track}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div style={{ width: `${progress}%` }} />
        </div>
      </section>
    </div>
  );
}
