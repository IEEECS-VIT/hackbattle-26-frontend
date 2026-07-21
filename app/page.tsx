"use client";

import PokedexJudge from "@/components/judges";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <main className="flex flex-col items-center justify-center w-full">
        <PokedexJudge />
      </main>
    </div>
  );
}