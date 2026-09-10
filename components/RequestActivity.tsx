"use client";

import { useSyncExternalStore } from "react";
import {
  getPendingRequests,
  getServerPendingRequests,
  getServerSiteReady,
  getSiteReady,
  subscribeToRequests,
} from "@/lib/request-activity";
import { getIntroSeen, getServerIntroSeen, subscribeToIntro } from "@/lib/intro-session";
import SimpleLoader from "./SimpleLoader";
import styles from "./SimpleLoader.module.css";

export default function RequestActivity() {
  const pending = useSyncExternalStore(subscribeToRequests, getPendingRequests, getServerPendingRequests);
  const siteReady = useSyncExternalStore(subscribeToRequests, getSiteReady, getServerSiteReady);
  const introSeen = useSyncExternalStore<boolean | null>(subscribeToIntro, getIntroSeen, getServerIntroSeen);

  // The first visit belongs entirely to the intro; API activity must not layer
  // a second loader over it.
  return introSeen === true && siteReady && pending > 0
    ? <div className={styles.activity}><SimpleLoader label="Just a moment…" /></div>
    : null;
}
