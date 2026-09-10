const API_ACTIVITY_EVENT = "hackbattle:api-activity";

let activeRequests = 0;

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<number>(API_ACTIVITY_EVENT, { detail: activeRequests })
    );
  }
}

export function beginApiActivity() {
  activeRequests += 1;
  notify();

  let finished = false;
  return () => {
    if (finished) return;
    finished = true;
    activeRequests = Math.max(0, activeRequests - 1);
    notify();
  };
}

export function getActiveRequestCount() {
  return activeRequests;
}

export function subscribeToApiActivity(listener: (count: number) => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleActivity = (event: Event) => {
    listener((event as CustomEvent<number>).detail);
  };

  window.addEventListener(API_ACTIVITY_EVENT, handleActivity);
  listener(activeRequests);
  return () => window.removeEventListener(API_ACTIVITY_EVENT, handleActivity);
}
