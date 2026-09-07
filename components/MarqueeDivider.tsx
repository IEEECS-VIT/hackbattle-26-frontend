"use client";

import { useEffect, useState, type CSSProperties } from "react";

type MarqueeDividerProps = {
  /** Path to the vine/leaf strip image, placed in /public. */
  src?: string;
  /** Seconds for one full loop of ONE tile-width. Lower = faster scroll. */
  speed?: number;
  /** Scroll direction */
  direction?: "left" | "right";
  /** Rendered height of the strip in px */
  height?: number;
  /**
   * How much of the strip's height overlaps INTO the sections above/below,
   * split evenly (half up, half down). Defaults to `height` itself, i.e.
   * the vine sits centered right on the section boundary line, masking it
   * with its irregular leaf silhouette instead of needing a color match.
   * Pass 0 to disable overlap and just stack it normally between sections.
   */
  overlap?: number;
  /** Extra classes for the wrapping section */
  className?: string;
};

/**
 * Seamless vine/leaf marquee that sits directly ON TOP of the seam between
 * two sections (transparent background), rather than as its own colored
 * block between them. Because the art has irregular leaf/flower edges
 * instead of a straight rectangle, it visually hides a hard color-transition
 * line without needing the two sections' colors to match exactly.
 *
 * Usage — place it flush right between the two sections; no manual
 * spacing/margin needed, the component handles the overlap itself:
 *
 *   <Hero />
 *   <MarqueeDivider />
 *   <AboutPage />
 *
 * Requires the elements it's placed between to not clip overflow (no
 * `overflow-hidden` on Hero/AboutPage's own wrapping element), since it
 * needs to visually spill slightly into both.
 */
export default function MarqueeDivider({
  src = "/vine-marque.svg",
  speed = 20,
  direction = "left",
  height = 90,
  overlap,
  className = "",
}: MarqueeDividerProps) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const effectiveOverlap = overlap ?? height;
  const halfOverlap = effectiveOverlap / 2;

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (cancelled) return;
      if (img.naturalWidth && img.naturalHeight) {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  const wrapperStyle: CSSProperties = {
    height,
    marginTop: -halfOverlap,
    marginBottom: -halfOverlap,
    position: "relative",
    zIndex: 20,
  };

  if (!aspectRatio) {
    // Nothing rendered until we know the real aspect ratio, to avoid a
    // squished/cropped flash — the overlap still reserves its space via
    // the negative margins so layout doesn't jump once it loads.
    return (
      <div
        className={`w-full ${className}`}
        style={wrapperStyle}
        aria-hidden="true"
      />
    );
  }

  const tileWidth = Math.round(height * aspectRatio);

  return (
    <div
      className={`w-full overflow-hidden select-none block pointer-events-none ${className}`}
      style={{
        ...wrapperStyle,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: `${tileWidth}px ${height}px`,
        backgroundPosition: "0 center",
        animationName:
          direction === "right" ? "marquee-scroll-rev" : "marquee-scroll",
        animationDuration: `${speed}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      }}
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes marquee-scroll {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: -${tileWidth}px;
          }
        }
        @keyframes marquee-scroll-rev {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: ${tileWidth}px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
