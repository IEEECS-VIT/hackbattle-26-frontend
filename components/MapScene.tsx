"use client";

import { useState } from "react";
import { problems } from "../data/problems";
import { Problem } from "../types/problem";
import PokeballIsland from "./PokeballIsland";
import RevealPanel from "./RevealPanel";

export default function MapScene() {
  const [selected, setSelected] = useState<Problem | null>(
    problems[0] ?? null
  );

  function handleBallClick(problem: Problem) {
    setSelected((prev) =>
      prev?.id === problem.id ? null : problem
    );
  }

  return (
    <section
  id="problems"
  className="relative w-full overflow-hidden"
>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block relative w-full aspect-[850/567]">

        {/* Background */}
        <img
          src="/background/map.svg"
          alt=""
          aria-hidden
          draggable={false}
          className="
            absolute inset-0
            w-full h-full
            object-fill
            select-none
            pointer-events-none
          "
        />

        {/* Title */}
        <h1
          className="
            absolute
            top-[2%]
            left-0 right-0
            z-20
            pixeboy
            text-white
            text-center
            whitespace-nowrap
            text-[28px]
            sm:text-[44px]
            lg:text-[56px]
            drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]
            pointer-events-none
          "
        >
          PROBLEM STATEMENTS
        </h1>

        {/* Interactive layer */}
        <div className="absolute inset-0 z-10">
          {problems.map((problem) => (
            <PokeballIsland
              key={problem.id}
              problem={problem}
              onSelect={handleBallClick}
              isActive={selected?.id === problem.id}
            />
          ))}

          <RevealPanel
            key={selected?.id ?? "closed"}
            problem={selected}
            onClose={() => setSelected(null)}
          />
        </div>
      </div>


      {/* ================= MOBILE ================= */}
      <div
  className="
    md:hidden
    relative
    w-full
    h-[100svh]
    overflow-hidden
  "
>
  {/* Mobile background */}
  <img
  src="/background/map.svg"
  alt=""
  aria-hidden
  draggable={false}
  className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    select-none
    pointer-events-none
  "
  style={{
    objectPosition: "15% center",
  }}
/>

  {/* Mobile title */}
  <h1
    className="
      absolute
      top-[28px]
      left-0
      right-0
      z-20
      pixeboy
      text-white
      text-center
      text-[28px]
      leading-none
      drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)]
      pointer-events-none
    "
    style = {{
      fontSize : "45px"
    }}
  >
    PROBLEM STATEMENTS
  </h1>

  {/* Mobile islands */}
  <div className="absolute inset-0 z-10">
    {problems.map((problem) => (
      <PokeballIsland
        key={problem.id}
        problem={problem}
        onSelect={handleBallClick}
        isActive={selected?.id === problem.id}
      />
    ))}

    <RevealPanel
      key={selected?.id ?? "closed"}
      problem={selected}
      onClose={() => setSelected(null)}
    />
  </div>
</div>

    </section>
  );
}
