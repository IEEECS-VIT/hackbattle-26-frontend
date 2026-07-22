import AboutPage from "@/app/components/about";
import PokedexJudge from "@/app/components/judges";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      <section className="w-full h-screen snap-start">
        <AboutPage />
      </section>
      <section className="w-full h-screen snap-start">
        <PokedexJudge />
      </section>
    </main>
  );
}