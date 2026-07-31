"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Problem } from "../types/problem";

type Phase = "drop" | "shake" | "burst" | "reveal";

interface Props {
  problem: Problem | null;
  onClose: () => void;
}

// Fixed particle angles (degrees). Deterministic on purpose -- random angles
// look "sparklier" but re-render differently every open, which makes the
// animation feel unpolished/inconsistent across replays. Pick a pattern
// once, keep it.
const PARTICLE_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const PARTICLE_RADIUS = 170; // px traveled outward from center — bumped to match the larger ball below

// Smoke puffs for the burst phase. Same "fixed, not random" reasoning as
// PARTICLE_ANGLES above -- each puff gets its own small x drift and a
// slight stagger (delay) so they don't all move in lockstep, but the set
// is deterministic so replays look consistent. Unlike the yellow sparkle
// burst (which flies outward radially and shrinks), these drift mostly
// upward and slowly grow while fading, since smoke puffs up and dissipates
// rather than shooting outward.
const SMOKE_PUFFS = [
  { x: -46, y: -120, size: 22, delay: 0 },
  { x: -22, y: -150, size: 30, delay: 0.05 },
  { x: 4, y: -170, size: 26, delay: 0.02 },
  { x: 28, y: -145, size: 32, delay: 0.09 },
  { x: -34, y: -95, size: 18, delay: 0.14 },
  { x: 20, y: -100, size: 20, delay: 0.11 },
];

export default function RevealPanel({ problem, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("drop");

  useEffect(() => {
    if (problem) setPhase("drop");
  }, [problem?.id]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // NEW: closed and open ball now size independently (px) instead of
  // sharing one Tailwind class — "adjust the opening pokeball images and
  // the outer closed pokeball [separately]". Defaults are deliberately
  // smaller than the last pass (was 420/480 flat) since the panel was
  // reported as covering too much of the screen; these are a reasonable
  // starting point, not a final answer — tune per-problem via
  // revealClosedBallSize / revealOpenBallSize in data/problems.ts the same
  // way ballSize/stageSize already work for the map icons.
  // CHANGED: open ball is now deliberately ~13% bigger than closed
  // (300 -> 340) instead of matching 1:1. That's inside the ~15-20%
  // ceiling noted above, so it reads as the "ball opening up" cue
  // rather than a broken size jump.
  const closedBallSize = problem?.revealClosedBallSize ?? 300;
  const openBallSize = problem?.revealOpenBallSize ?? 340;
  const ballSizeNow = phase === "reveal" || phase === "burst" ? openBallSize : closedBallSize;

  // NEW: shared x/y offset (px), same position used for both the closed
  // and open ball — no more phase-branching here, since you want one
  // consistent spot rather than the ball jumping to a different position
  // the instant it opens.
  const ballX = problem?.revealBallX ?? 0;
  const ballY = problem?.revealBallY ?? 0;

  // NEW: reverseOpen flip. Framer Motion tracks x/y/scale/rotate/scaleX
  // etc. as independent transform channels and composes them into one
  // `transform` at render time — so setting scaleX here via `style`
  // doesn't fight the `animate={{ rotate: [...] }}` shake keyframes or
  // the drop's y/opacity tween below; it just multiplies in alongside
  // them every frame.
  //
  // This ALSO automatically covers both the closed ball (drop/shake
  // phases) and the open ball (burst/reveal phases) with one line,
  // because — despite the `key={...}` swap making React remount the
  // <img> when the sprite changes — it's still the same single JSX
  // element below with one `style` prop, not two separate images for
  // open/closed. If this ever gets split into two <motion.img> elements
  // (e.g. to crossfade instead of hard-swap), the scaleX line has to be
  // copied onto both or the flip will only apply on one side of the
  // transition.
  const flipStyle = { scaleX: problem?.reverseOpen ? -1 : 1 };

  // NEW: reveal panel's own anchor point + box size, previously hardcoded
  // as Tailwind classes shared by every problem.
  const revealTop = problem?.revealTop ?? "50%";
  const revealLeft = problem?.revealLeft ?? "66%";
  const stageSize = problem?.revealStageSize ?? 360;

  return (
    <AnimatePresence>
      {problem && (
        <motion.div
          // Position comes from data (revealTop/revealLeft) instead of a
          // fixed `left-[66%]` class, via `style` rather than a Tailwind
          // arbitrary-value class since the value is dynamic per-problem,
          // not a build-time constant.
          className="absolute z-50"
          style={{ top: revealTop, left: revealLeft, transform: "translateY(-50%)" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: stageSize, height: stageSize }}
          >
            {phase === "burst" && (
              <motion.div
                className="absolute rounded-full bg-white"
                style={{ width: 60, height: 60 }}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 7, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            )}

            {phase === "burst" &&
              PARTICLE_ANGLES.map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const dx = Math.cos(rad) * PARTICLE_RADIUS;
                const dy = Math.sin(rad) * PARTICLE_RADIUS;
                return (
                  <motion.span
                    key={angle}
                    className="absolute w-2 h-2 rounded-full bg-yellow-200"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: dx, y: dy, opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />
                );
              })}

            {/* Smoke puff, same "burst" phase as the yellow sparkle burst
                above and structured the same way (a fixed list mapped to
                motion.span elements), but styled as soft gray/white smoke
                drifting upward and fading rather than sparkle flying
                outward. */}
            {phase === "burst" &&
              SMOKE_PUFFS.map((puff, i) => (
                <motion.span
                  key={`smoke-${i}`}
                  className="absolute rounded-full bg-gray-200/70"
                  style={{ width: puff.size, height: puff.size }}
                  initial={{ x: 0, y: 0, opacity: 0.6, scale: 0.5 }}
                  animate={{ x: puff.x, y: puff.y, opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: puff.delay }}
                />
              ))}

            {/* The ball itself. Swaps sprite (closed -> open) the instant
                we enter "burst", timed to land under the flash.
                `flipStyle` is applied here once and covers both the
                closed and open sprite for exactly the reason described
                in the comment above the constant. */}
            <motion.img
              key={phase === "reveal" || phase === "burst" ? "open" : "closed"}
              src={
                phase === "reveal" || phase === "burst"
                  ? `/reveal_open/${problem.ballColor}.svg`
                  : `/pokeballs/${problem.ballColor}.svg`
              }
              alt=""
              aria-hidden
              className="object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.6)]"
              // width/height/margin driven by JS now (not Tailwind
              // classes) because they need to differ per-phase (closed
              // vs open) AND per-problem. marginLeft/marginTop (NOT
              // Framer's x/y style keys) carry the manual position
              // offset — the drop phase already animates `y` itself (the
              // -300 -> 0 fall-in), so reusing `y` for a second, static
              // purpose would fight that animation. Plain CSS margin
              // shifts the element without touching any transform
              // channel at all, so it can't conflict with y (drop),
              // rotate (shake), or scaleX (flip) — same reasoning
              // ballOffsetTop/Left in PokeballIsland already relies on.
              style={{
                width: ballSizeNow,
                height: ballSizeNow,
                marginLeft: ballX,
                marginTop: ballY,
                ...flipStyle,
              }}
              initial={phase === "drop" ? { y: -300, opacity: 0 } : false}
              animate={
                phase === "drop"
                  ? { y: 0, opacity: 1 }
                  : phase === "shake"
                  ? { rotate: [0, -14, 14, -10, 10, -5, 5, 0] }
                  : { y: 0, opacity: 1 }
              }
              transition={
                phase === "drop"
                  ? { type: "spring", stiffness: 300, damping: 14 }
                  : phase === "shake"
                  ? { duration: 0.7, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              onAnimationComplete={() => {
                if (phase === "drop") setPhase("shake");
                else if (phase === "shake") setPhase("burst");
              }}
            />

            {phase === "burst" && <BurstTimer onDone={() => setPhase("reveal")} />}

            <AnimatePresence>
              {phase === "reveal" && (
                <motion.p
                  className="absolute inset-0 flex items-center justify-center text-center
                             px-16 pixeboy text-white text-[18px] sm:text-[20px] leading-[1.45]
                             drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                >
                  {problem.description}
                </motion.p>
              )}
            </AnimatePresence>

          </div>

          {/* REMOVED: the visible × close button. Closing now happens by
              re-clicking the already-open island's ball on the map
              (toggle logic lives in MapScene's handleBallClick) or
              pressing Escape — both still call `onClose`/the toggle
              under the hood, there's just no dedicated button for it
              anymore. */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BurstTimer({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 550);
    return () => clearTimeout(t);
  }, [onDone]);
  return null;
}