import Hero from "@/components/home";
import MapScene from "@/components/MapScene";
import FAQ from "@/components/FAQ";
import AboutPage from "@/components/about";
import PokedexJudge from "@/components/judges";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <section className="min-h-screen w-full">
        <Hero />
      </section>

      <AboutPage />
      <MapScene/>
    
   
      <section id="judge" className="w-full scroll-mt-16 md:scroll-mt-[84px]">
        <PokedexJudge />
      </section>

      <section className="w-full">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}
