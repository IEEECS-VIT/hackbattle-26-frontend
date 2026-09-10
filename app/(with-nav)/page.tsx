import Hero from "@/components/home";
import MapScene from "@/components/MapScene";
import FAQ from "@/components/FAQ";
import AboutPage from "@/components/about";
import PokedexJudge from "@/components/judges";
import Footer from "@/components/footer";
import MarqueeDivider from "@/components/MarqueeDivider";


export default function Home() {
  return (
    <main className="landing-page min-h-screen w-full overflow-x-clip">
      <Hero />
      <MarqueeDivider
        layers={[
          {
            src: "/vine-marquee-thick.png",
            height: 140,
            speed: 34,
            direction: "right",
            opacity: 0.85,
            offsetY: -10,
          },
          
        ]}
      />
      <AboutPage />
      {/* <MarqueeDivider
        layers={[
          {
            src: "/vine-marquee-thick.png",
            height: 140,
            speed: 34,
            direction: "right",
            opacity: 0.85,
          },
         
        ]}
      />

      <MapScene />
     */ }
      <MarqueeDivider
        layers={[
          {
            src: "/vine-marquee-thick.png",
            height: 140,
            speed: 34,
            direction: "right",
            opacity: 0.85,
          },
         
        ]}
      />

      <section id="judge" className="landing-section w-full">
        <PokedexJudge />
      </section>
      <MarqueeDivider
        layers={[
          {
            src: "/vine-marquee-thick.png",
            height: 140,
            speed: 34,
            direction: "right",
            opacity: 0.85,
          },
        ]}
      />
      <section className="w-full">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}
