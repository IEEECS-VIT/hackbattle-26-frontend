"use client";

import { useState } from "react";
import { problems } from "../data/problems";
import { Problem } from "../types/problem";
import PokeballIsland from "./PokeballIsland";
import RevealPanel from "./RevealPanel";

export default function MapScene() {
  // CHANGED: was `useState<Problem | null>(null)` — the page loaded with
  // every pokeball closed. Seeding with `problems[0]` means one island
  // is already open/revealed on first paint, same as if the user had
  // just clicked it. Everything downstream (isActive comparison,
  // toggle-closing via handleBallClick, RevealPanel's phase reset on
  // problem.id change) already works off this same `selected` state, so
  // no other logic needs to change — it just starts non-null instead of
  // null.
  const [selected, setSelected] = useState<Problem | null>(problems[0] ?? null);

  // CHANGED: was `setSelected` passed straight through, so clicking a
  // ball always opened it — including re-clicking the one that's
  // already open. Toggle logic lives here, in the one place that
  // actually holds the "which one is open" state, rather than pushing
  // isActive-comparison logic down into PokeballIsland (which would mean
  // two components independently deciding what "already open" means).
  function handleBallClick(problem: Problem) {
    setSelected((prev) => (prev?.id === problem.id ? null : problem));
  }

  return (
    // REVERTED to natural-height: the real bug wasn't here, it was
    // globals.css's body background always being >= 100vh regardless of
    // content (see globals.css for the actual fix). Forcing this section
    // to exactly h-screen/min-h-screen + object-cover "solved" the
    // symptom by making content never shorter than one screen — which
    // also meant it could never be TALLER either, killing the scrollbar
    // entirely. That's not a fix, that's just a different bug.
    //
    // Back to: image renders at its own natural aspect ratio, full
    // width, and this section is exactly as tall as that image is — no
    // more, no less, no cropping. If the image (uncropped) is taller
    // than the viewport, the page scrolls exactly that much further —
    // real scroll behavior, not a synthetic 100vh cap. And since the
    // image is no longer being cropped by object-cover, whatever was
    // clipping island #7 before is also gone — you're seeing the whole
    // image now, top to bottom.
    <section className="relative w-full">
      <img
        src="/background/map.svg"
        alt=""
        aria-hidden
        className="w-full h-auto block select-none"
        draggable={false}
      />

      {/*
        Title overlay — unchanged from before, still absolute/percentage
        positioned so it stays where it was.
      */}
      <h1
        className="
          absolute top-[2%] inset-x-0 z-10
          pixeboy text-white text-center whitespace-nowrap
          text-[28px] sm:text-[44px] lg:text-[56px]
          drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]
          pointer-events-none
        "
      >
        PROBLEM STATEMENTS
      </h1>

      {/*
        NOTE: because the section's height basis just changed again (from
        "however tall the image naturally renders" to "always exactly
        100vh, image cropped to fit"), every island's `position.top` in
        data/problems.ts is now measured against a DIFFERENT box than it
        was tuned against. In particular, whatever was sitting near the
        very bottom (your last island, currently clipped in the
        screenshot) will need its top% nudged up so its full stageSize
        footprint lands inside this box instead of running past its
        bottom edge. This should be the last time this specific
        retune is needed — h-screen is a fixed, exact value, not another
        guess that can quietly stop matching reality the way "natural
        image height" or an arbitrary aspect-ratio class did.
      */}
      <div className="absolute inset-0 max-w-[1300px] mx-auto">
        {problems.map((problem) => (
          <PokeballIsland
            key={problem.id}
            problem={problem}
            onSelect={handleBallClick}
            isActive={selected?.id === problem.id}
          />
        ))}

        <RevealPanel problem={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}