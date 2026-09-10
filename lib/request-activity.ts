let pending = 0;
let siteReady = false;
const listeners = new Set<() => void>();
export const subscribeToRequests = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
export const getPendingRequests = () => pending;
export const getServerPendingRequests = () => 0;
export const getSiteReady = () => siteReady;
export const getServerSiteReady = () => false;

export function markSiteReady() {
  siteReady = true;
  listeners.forEach((listener) => listener());
}

/** Count overlapping requests and always release the indicator on failure. */
export async function withRequestActivity<T>(request: () => Promise<T>): Promise<T> {
  pending += 1;
  listeners.forEach((listener) => listener());
  try {
    return await request();
  } finally {
    pending -= 1;
    listeners.forEach((listener) => listener());
  }
}
