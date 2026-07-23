import Hero from '@/components/home';
import FAQ from '@/components/FAQ';
import AboutPage from '@/components/about';
import PokedexJudge from '@/components/judges';

export default function Home() {
  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      <section className="h-screen w-full snap-start overflow-hidden">
        <Hero />
      </section>

      <section className="h-screen w-full snap-start overflow-hidden">
        <AboutPage />
      </section>

      <section className="h-screen w-full snap-start overflow-hidden">
        <PokedexJudge />
      </section>

      <section className="h-screen w-full snap-start overflow-hidden">
        <FAQ />
      </section>
    </main>
  );
}