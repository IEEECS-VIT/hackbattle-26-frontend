import Hero from '@/components/home';
import FAQ from '@/components/FAQ';
import AboutPage from '@/components/about';
import PokedexJudge from '@/components/judges';
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      <section className="h-screen w-full snap-start overflow-hidden">
        <Hero />
      </section>

      <AboutPage />

      <PokedexJudge />

      <section className="h-screen w-full snap-start overflow-hidden">
        <FAQ />
      </section>
      <Footer />
    </main>
  );
}