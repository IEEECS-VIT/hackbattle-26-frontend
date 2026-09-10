const KEY = "hackbattle-intro-seen";
let seenInMemory = false;
const listeners = new Set<() => void>();

export function getIntroSeen(): boolean {
  try {
    return seenInMemory
      || localStorage.getItem(KEY) === "1"
      || sessionStorage.getItem(KEY) === "1";
  }
  catch { return seenInMemory; }
}
export const getServerIntroSeen = () => null;
export const subscribeToIntro = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
export function markIntroSeen() {
  seenInMemory = true;
  try {
    localStorage.setItem(KEY, "1");
    sessionStorage.setItem(KEY, "1");
    document.documentElement.dataset.hackbattleIntroSeen = "true";
  } catch { /* Storage may be disabled. */ }
  listeners.forEach((listener) => listener());
}
