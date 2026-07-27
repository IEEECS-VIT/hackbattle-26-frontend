import Hero from '@/components/home';
import FAQ from '@/components/FAQ';
import AboutPage from '@/components/about';
import PokedexJudge from '@/components/judges';
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden snap-y snap-proximity overflow-y-auto">
<section className="min-h-screen w-full snap-start">
      <Hero />
      </section>

      <AboutPage />

      <PokedexJudge />

      <section className="w-full snap-start">
        <FAQ />
      </section>
      <Footer />
    </main>
  );
}
