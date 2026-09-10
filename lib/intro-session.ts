const KEY = "hackbattle-intro-seen";
let seenInMemory = false;
const listeners = new Set<() => void>();

export function getIntroSeen(): boolean {
  try { return seenInMemory || sessionStorage.getItem(KEY) === "1"; }
  catch { return seenInMemory; }
}
export const getServerIntroSeen = () => null;
export const subscribeToIntro = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
export function markIntroSeen() {
  seenInMemory = true;
  try { sessionStorage.setItem(KEY, "1"); } catch { /* Storage may be disabled. */ }
  listeners.forEach((listener) => listener());
}
