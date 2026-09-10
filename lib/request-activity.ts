let pending = 0;
const listeners = new Set<() => void>();
export const subscribeToRequests = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
export const getPendingRequests = () => pending;
export const getServerPendingRequests = () => 0;

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
