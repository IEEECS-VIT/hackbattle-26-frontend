/** Position a section's heading below the visible, collapsed navigation bar. */
export function scrollToSection(hash: string): boolean {
  if (!hash.startsWith("#")) return false;
  const section = document.getElementById(hash.slice(1));
  if (!section || section.closest("[inert]")) return false;

  const heading = section.querySelector<HTMLElement>("h1, h2") ?? section;
  const bars = document.querySelectorAll<HTMLElement>("[data-navigation-bar]");
  const navbarBottom = Array.from(bars).reduce((bottom, bar) => {
    if (!bar.getClientRects().length) return bottom;
    return Math.max(bottom, bar.getBoundingClientRect().bottom);
  }, 0);
  const gap = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--section-heading-inset"),
  ) || 24;

  window.scrollTo({
    top: Math.max(0, window.scrollY + heading.getBoundingClientRect().top - navbarBottom - gap),
    behavior: "instant",
  });
  return true;
}
