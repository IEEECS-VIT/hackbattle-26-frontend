"use client";

import { useSyncExternalStore } from "react";
import { getPendingRequests, getServerPendingRequests, subscribeToRequests } from "@/lib/request-activity";
import SimpleLoader from "./SimpleLoader";
import styles from "./SimpleLoader.module.css";

export default function RequestActivity() {
  const pending = useSyncExternalStore(subscribeToRequests, getPendingRequests, getServerPendingRequests);
  return pending > 0 ? <div className={styles.activity}><SimpleLoader label="Just a moment…" /></div> : null;
}
