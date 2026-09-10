"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode, type RefObject } from "react";
import { usePathname } from "next/navigation";
import { getIntroSeen, getServerIntroSeen, markIntroSeen, subscribeToIntro } from "@/lib/intro-session";
import SimpleLoader from "./SimpleLoader";
import styles from "./SiteLoader.module.css";

const LOADER_CYCLE_MS = 1700;

export default function SiteLoader({ children }: { children: ReactNode }) {
  const seen = useSyncExternalStore<boolean | null>(subscribeToIntro, getIntroSeen, getServerIntroSeen);
  const pathname = usePathname();
  const content = useRef<HTMLDivElement>(null);
  const showIntro = seen === false && pathname === "/";
  const blocked = seen === null || showIntro;

  useEffect(() => {
    // Direct dashboard/login arrivals use plain loading too.
    if (seen === false && pathname !== "/") markIntroSeen();
  }, [seen, pathname]);

  return (
    <>
      {seen === null && <SimpleLoader fullScreen />}
      {showIntro && <IntroLoader content={content} />}
      <div ref={content} className="flex flex-1 flex-col" inert={blocked} aria-hidden={blocked || undefined}>
        {children}
      </div>
    </>
  );
}

function IntroLoader({ content }: { content: RefObject<HTMLDivElement | null> }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const root = content.current;
    if (!root) return;
    const controller = new AbortController();
    const { signal } = controller;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Count every point, even with cached assets. Only asset readiness unlocks
    // 100%; the animation duration is never a timeout for slow requests.
    let displayedProgress = 0;
    let targetProgress = 90;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const progressTimer = setInterval(() => {
      if (displayedProgress >= targetProgress || signal.aborted) return;
      displayedProgress += 1;
      setProgress(displayedProgress);
      if (displayedProgress === 100) {
        clearInterval(progressTimer);
        revealTimer = setTimeout(() => {
          if (signal.aborted) return;
          document.body.style.overflow = previousOverflow;
          setReady(true);
          markIntroSeen();
        }, 400);
      }
    }, LOADER_CYCLE_MS / 100);

    const waitFor = (target: EventTarget, event: string, check: () => boolean) =>
      new Promise<void>((resolve, reject) => {
        if (check()) return resolve();
        const cleanup = () => {
          target.removeEventListener(event, success);
          target.removeEventListener("error", failure, true);
          signal.removeEventListener("abort", failure);
        };
        const success = () => { cleanup(); resolve(); };
        const failure = () => { cleanup(); reject(new Error("Asset unavailable")); };
        target.addEventListener(event, success, { once: true });
        target.addEventListener("error", failure, { once: true, capture: true });
        signal.addEventListener("abort", failure, { once: true });
      });

    const load = async () => {
      const tasks: Promise<unknown>[] = [];
      // Eagerly request below-the-fold images: window.load alone skips lazy images.
      root.querySelectorAll("img").forEach((img) => {
        img.loading = "eager";
        tasks.push((async () => {
          await waitFor(img, "load", () => img.complete);
          if (!img.naturalWidth) throw new Error("Image unavailable");
          await img.decode();
        })());
      });

      // CSS artwork is not represented in document.images.
      const backgrounds = new Set<string>();
      root.querySelectorAll("*").forEach((element) => {
        const background = getComputedStyle(element).backgroundImage;
        for (const match of background.matchAll(/url\(["']?(.*?)["']?\)/g)) {
          backgrounds.add(match[1]);
        }
      });
      backgrounds.forEach((src) => {
        const img = new Image();
        img.src = src;
        tasks.push((async () => {
          await waitFor(img, "load", () => img.complete);
          if (!img.naturalWidth) throw new Error("Background unavailable");
          await img.decode();
        })());
      });

      root.querySelectorAll("video").forEach((video) => {
        // Only buffer the video used at this viewport, not its hidden counterpart.
        if (!video.getClientRects().length) return;
        video.preload = "auto";
        tasks.push(video.error
          ? Promise.reject(new Error("Video unavailable"))
          : waitFor(video, "canplaythrough", () => video.readyState >= 4));
      });
      tasks.push(document.fonts.ready);
      tasks.push(waitFor(window, "load", () => document.readyState === "complete"));

      const results = await Promise.allSettled(tasks);
      if (signal.aborted) return;
      if (results.some((result) => result.status === "rejected")) {
        setFailed(true);
        return;
      }
      targetProgress = 100;
    };
    void load();
    return () => {
      controller.abort();
      clearInterval(progressTimer);
      clearTimeout(revealTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [content]);

  return (
    <>
      {!ready && (
        <div className={styles.screen} style={{ "--loader-cycle": `${LOADER_CYCLE_MS}ms` } as CSSProperties}>
          <div className={styles.scenery} aria-hidden="true">
            <div className={styles.clouds}><i /><i /><i /></div>
            <div className={styles.hills} />
            <div className={styles.trees}><i /><i /><i /><i /><i /><i /></div>
            <div className={styles.grass} />
            <div className={styles.pikachu} />
            <div className={styles.bulbasaur} />
          </div>
          <div className={styles.grid} aria-hidden="true" />
          <section className={styles.scene} aria-label="Loading HackBattle">
            <div className={styles.orbit} aria-hidden="true">
              <span className={styles.ring} />
              <span className={styles.beam} />
              <span className={styles.platform} />
              <span className={styles.particles}><i /><i /><i /><i /><i /><i /></span>
              <span className={styles.ball}><span /></span>
              <span className={styles.spark}>✦</span>
            </div>
            <p className={styles.eyebrow}>YOUR NEXT ADVENTURE AWAITS</p>
            <h1 className={styles.title}>{progress === 100 ? "BATTLE READY!" : <>BATTLE LOADING<span>...</span></>}</h1>
            {failed && <p className={styles.message} role="status">A connection escaped. Let&apos;s try again!</p>}
            <div className={styles.progressLabel}><span>{failed ? "CONNECTION INTERRUPTED" : progress === 100 ? "LET'S GO, TRAINER" : "PREPARING THE WORLD"}</span><span className={styles.percentage}>{progress}<small>%</small></span></div>
            <div className={styles.track} role="progressbar" aria-label="Website loading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
              <div style={{ width: `${progress}%` }} />
            </div>
            {failed && <button className={styles.retry} onClick={() => window.location.reload()}>TRY AGAIN ↗</button>}
          </section>
        </div>
      )}
    </>
  );
}
