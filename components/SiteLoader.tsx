"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import FancyLoader from "./FancyLoader";
import SimpleLoader from "./SimpleLoader";
import { useAuth } from "./AuthProvider";
import styles from "./SiteLoader.module.css";

const FANCY_LOADER_SEEN_KEY = "hackbattle-fancy-loader-seen-this-tab";
const FANCY_LOADER_TIME_MS = 1700;
const SIMPLE_LOADER_TIME_MS = 700;
const MAXIMUM_PAGE_WAIT_MS = 4000;

type LoaderKind = "checking" | "fancy" | "simple";

const subscribeToLoaderKind = () => () => undefined;
const getServerLoaderKind = (): LoaderKind => "checking";
let cachedLoaderKind: LoaderKind | undefined;

function getBrowserLoaderKind(): LoaderKind {
  if (!cachedLoaderKind) {
    const initialLoader = document.documentElement.dataset.initialLoader;
    cachedLoaderKind =
      initialLoader === "fancy" || initialLoader === "simple"
        ? initialLoader
        : window.sessionStorage.getItem(FANCY_LOADER_SEEN_KEY)
          ? "simple"
          : "fancy";
  }
  return cachedLoaderKind;
}

export default function SiteLoader({ children }: { children: ReactNode }) {
  const { loading: authLoading } = useAuth();
  const authLoadingRef = useRef(authLoading);
  const loaderKind = useSyncExternalStore(
    subscribeToLoaderKind,
    getBrowserLoaderKind,
    getServerLoaderKind
  );
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    authLoadingRef.current = authLoading;
  }, [authLoading]);

  useEffect(() => {
    if (loaderKind === "fancy") {
      window.sessionStorage.setItem(FANCY_LOADER_SEEN_KEY, "true");
      document.documentElement.dataset.initialLoader = "simple";
    }
  }, [loaderKind]);

  useEffect(() => {
    if (loaderKind === "checking") return;

    let cancelled = false;
    let minimumTimer: number | undefined;
    let maximumTimer: number | undefined;
    let progressTimer: number | undefined;
    let revealTimer: number | undefined;
    let authTimer: number | undefined;
    let handleLoad: (() => void) | undefined;
    const previousOverflow = document.body.style.overflow;
    const minimumTime =
      loaderKind === "fancy" ? FANCY_LOADER_TIME_MS : SIMPLE_LOADER_TIME_MS;

    document.body.style.overflow = "hidden";

    const minimumDisplayTime = new Promise<void>((resolve) => {
      minimumTimer = window.setTimeout(resolve, minimumTime);
    });

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }

      handleLoad = () => {
        window.clearTimeout(maximumTimer);
        resolve();
      };
      window.addEventListener("load", handleLoad, { once: true });
      maximumTimer = window.setTimeout(handleLoad, MAXIMUM_PAGE_WAIT_MS);
    });

    const authReady = new Promise<void>((resolve) => {
      const checkAuth = () => {
        if (!authLoadingRef.current) {
          resolve();
          return;
        }
        authTimer = window.setTimeout(checkAuth, 50);
      };
      checkAuth();
    });

    if (loaderKind === "fancy") {
      const startedAt = window.performance.now();
      progressTimer = window.setInterval(() => {
        const elapsed = window.performance.now() - startedAt;
        setProgress(Math.min(94, Math.round((elapsed / minimumTime) * 94)));
      }, 34);
    }

    void Promise.all([minimumDisplayTime, pageReady, authReady]).then(() => {
      if (cancelled) return;
      window.clearInterval(progressTimer);
      setProgress(100);

      revealTimer = window.setTimeout(
        () => {
          if (cancelled) return;
          document.body.style.overflow = previousOverflow;
          setReady(true);
        },
        loaderKind === "fancy" ? 350 : 0
      );
    });

    return () => {
      cancelled = true;
      window.clearTimeout(minimumTimer);
      window.clearTimeout(maximumTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(authTimer);
      window.clearInterval(progressTimer);
      if (handleLoad) window.removeEventListener("load", handleLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, [loaderKind]);

  return (
    <>
      <div
        className={`flex flex-1 flex-col ${styles.content} ${
          ready ? "" : styles.contentLoading
        }`}
        inert={!ready}
        aria-hidden={!ready || undefined}
      >
        {children}
      </div>

      {!ready && loaderKind === "fancy" && <FancyLoader progress={progress} />}
      {!ready && loaderKind === "simple" && (
        <SimpleLoader fullScreen label="Loading…" />
      )}
      {!ready && loaderKind === "checking" && (
        <>
          <div className={styles.initialFancy}>
            <FancyLoader progress={0} />
          </div>
          <div className={styles.initialSimple}>
            <SimpleLoader fullScreen label="Loading…" />
          </div>
        </>
      )}
    </>
  );
}
