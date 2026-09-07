"use client";

import { useEffect, useState, type CSSProperties } from "react";

type MarqueeLayerConfig = {
  /** Path to this layer's image, placed in /public. */
  src: string;
  /** Rendered height of this layer in px. Layer with the tallest height drives the overlap. */
  height: number;
  /** Seconds for one full loop of ONE tile-width. Lower = faster scroll. */
  speed?: number;
  /** Scroll direction */
  direction?: "left" | "right";
  /** 0-1, defaults to 1. Fade a background layer slightly if it competes with the front one. */
  opacity?: number;
  /**
   * Vertical nudge in px from center, positive = down, negative = up.
   * All layers are centered on the same line by default (0) — pushing
   * layers to different offsets is what makes them visually cross/overlap
   * instead of sitting in flat, separate horizontal bands.
   */
  offsetY?: number;
};

type MarqueeDividerProps = {
  /** One or more vine layers, back-to-front (first = furthest back). */
  layers: MarqueeLayerConfig[];
  /**
   * How much of the TALLEST layer's height overlaps into the sections
   * above/below, split evenly. Defaults to that layer's full height, i.e.
   * centered right on the section seam. Pass 0 to disable overlap.
   */
  overlap?: number;
  /** Extra classes for the wrapping section */
  className?: string;
};

function MarqueeLayer({
  src,
  height,
  speed = 20,
  direction = "left",
  opacity = 1,
  offsetY = 0,
  zIndex,
}: MarqueeLayerConfig & { zIndex: number }) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

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

  if (!aspectRatio) return null;

  const tileWidth = Math.round(height * aspectRatio);
  const animName =
    direction === "right" ? "marquee-scroll-rev" : "marquee-scroll";

  return (
    <div
      className="absolute inset-x-0 w-full overflow-hidden select-none"
      style={{
        top: "50%",
        height,
        zIndex,
        opacity,
        transform: `translateY(calc(-50% + ${offsetY}px))`,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: `${tileWidth}px ${height}px`,
        backgroundPosition: "0 center",
        animationName: animName,
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

/**
 * Layered, seamless vine/leaf marquee sitting on the seam between two
 * sections (transparent background) — masking the boundary with irregular
 * leaf silhouettes instead of color matching. Supports stacking multiple
 * vine assets at independent speeds/directions/vertical offsets so they
 * visually cross and overlap for a tangled, layered look.
 *
 * Usage — place flush between two sections, no manual spacing needed:
 *
 *   <Hero />
 *   <MarqueeDivider
 *     layers={[
 *       { src: "/vine-marquee-thick.png", height: 140, speed: 34, direction: "right", opacity: 0.85, offsetY: -10 },
 *       { src: "/vine-marque.svg", height: 90, speed: 20, direction: "left", offsetY: 14 },
 *     ]}
 *   />
 *   <AboutPage />
 *
 * Requires the sections it overlaps into to not clip overflow (no
 * `overflow-hidden` on Hero/AboutPage's own wrapping element).
 */
export default function MarqueeDivider({
  layers,
  overlap,
  className = "",
}: MarqueeDividerProps) {
  const maxHeight = Math.max(...layers.map((l) => l.height));
  const effectiveOverlap = overlap ?? maxHeight;
  const halfOverlap = effectiveOverlap / 2;

  return (
    <div
      className={`relative w-full pointer-events-none ${className}`}
      style={{
        height: maxHeight,
        marginTop: -halfOverlap,
        marginBottom: -halfOverlap,
        zIndex: 20,
      }}
      aria-hidden="true"
    >
      {layers.map((layer, i) => (
        <MarqueeLayer key={i} {...layer} zIndex={10 + i} />
      ))}
    </div>
  );
}
