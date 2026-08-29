"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SmokeEffectProps {
  color: string;
  size: number;
  startOffset?: number;
}

const PUFFS = [
  { x: -0.9, y: 0.18, w: 0.75, h: 0.48, r: "60% 40% 55% 45%" },
  { x: -0.7, y: 0.05, w: 0.95, h: 0.56, r: "45% 55% 60% 40%" },
  { x: -0.45, y: -0.02, w: 1.0, h: 0.62, r: "52% 48% 42% 58%" },
  { x: -0.15, y: -0.08, w: 1.1, h: 0.7, r: "42% 58% 50% 50%" },
  { x: 0.15, y: -0.04, w: 1.12, h: 0.68, r: "55% 45% 48% 52%" },
  { x: 0.45, y: 0.0, w: 1.0, h: 0.62, r: "48% 52% 58% 42%" },
  { x: 0.72, y: 0.08, w: 0.88, h: 0.55, r: "58% 42% 45% 55%" },

  { x: -0.78, y: 0.34, w: 1.0, h: 0.65, r: "50% 50% 40% 60%" },
  { x: -0.45, y: 0.30, w: 1.2, h: 0.72, r: "40% 60% 55% 45%" },
  { x: -0.10, y: 0.28, w: 1.28, h: 0.78, r: "56% 44% 48% 52%" },
  { x: 0.25, y: 0.30, w: 1.25, h: 0.76, r: "46% 54% 58% 42%" },
  { x: 0.58, y: 0.34, w: 1.05, h: 0.68, r: "60% 40% 50% 50%" },

  { x: -0.62, y: 0.62, w: 1.0, h: 0.56, r: "45% 55% 52% 48%" },
  { x: -0.28, y: 0.58, w: 1.25, h: 0.64, r: "58% 42% 46% 54%" },
  { x: 0.08, y: 0.60, w: 1.3, h: 0.68, r: "50% 50% 60% 40%" },
  { x: 0.42, y: 0.62, w: 1.16, h: 0.62, r: "42% 58% 48% 52%" },
  { x: 0.72, y: 0.64, w: 0.9, h: 0.52, r: "55% 45% 55% 45%" },
];

export default function SmokeEffect({
  color,
  size,
  startOffset = 0,
}: SmokeEffectProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: size * 3,
        height: size * 2,
        left: "50%",
        top: startOffset,
        transform: "translateX(-50%)",
        overflow: "visible",
      }}
    >
      {/* Soft underlying mass */}
      <motion.div
        className="absolute"
        style={{
          width: size * 2.2,
          height: size * 1.1,
          left: "50%",
          top: size * 0.25,
          transform: "translateX(-50%)",

          borderRadius: "48% 52% 55% 45%",

          background: `
            radial-gradient(
              ellipse at center,
              ${color}B8 0%,
              ${color}7A 42%,
              ${color}38 68%,
              transparent 88%
            )
          `,

          filter: "blur(18px)",
        }}
        initial={{
          opacity: 0,
          scale: 0.65,
        }}
        animate={{
          opacity: [0, 0.65, 0.55, 0],
          scale: [0.65, 1, 1.12, 1.28],
          y: [0, size * 0.08, size * 0.18, size * 0.32],
        }}
        transition={{
          duration: 4,
          ease: "easeOut",
        }}
      />

      {/* Irregular dense cloud */}
      {PUFFS.map((puff, index) => {
        const width = size * puff.w;
        const height = size * puff.h;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width,
              height,

              left: `calc(50% + ${puff.x * size}px)`,
              top: puff.y * size,

              marginLeft: -width / 2,

              borderRadius: puff.r,

              background: `
                radial-gradient(
                  ellipse at 48% 48%,
                  ${color}D8 0%,
                  ${color}B0 38%,
                  ${color}6A 64%,
                  ${color}22 80%,
                  transparent 100%
                )
              `,

              filter: "blur(10px)",
            }}
            initial={{
              opacity: 0,
              scale: 0.55,
              x: 0,
              y: -size * 0.08,
            }}
            animate={{
              opacity: [0, 0.82, 0.68, 0],
              scale: [0.55, 1, 1.12, 1.28],

              x:
                puff.x < 0
                  ? [0, -size * 0.04, -size * 0.09, -size * 0.14]
                  : [0, size * 0.04, size * 0.09, size * 0.14],

              y: [
                -size * 0.08,
                0,
                size * 0.12,
                size * 0.26,
              ],
            }}
            transition={{
              duration: 3.8,
              delay: (index % 5) * 0.06,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Dense center */}
      <motion.div
        className="absolute"
        style={{
          width: size * 1.5,
          height: size * 0.85,
          left: "50%",
          top: size * 0.35,
          marginLeft: -(size * 1.5) / 2,

          borderRadius: "46% 54% 52% 48%",

          background: `
            radial-gradient(
              ellipse,
              ${color}CC 0%,
              ${color}8F 48%,
              ${color}35 76%,
              transparent 100%
            )
          `,

          filter: "blur(16px)",
        }}
        initial={{
          opacity: 0,
          scale: 0.6,
        }}
        animate={{
          opacity: [0, 0.7, 0.58, 0],
          scale: [0.6, 1, 1.12, 1.3],
          y: [
            0,
            size * 0.06,
            size * 0.15,
            size * 0.3,
          ],
        }}
        transition={{
          duration: 3.9,
          ease: "easeOut",
        }}
      />
    </div>
  );
}