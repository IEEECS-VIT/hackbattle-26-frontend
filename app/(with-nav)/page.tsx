import Hero from "@/components/home";
import FAQ from "@/components/FAQ";
import AboutPage from "@/components/about";
import PokedexJudge from "@/components/judges";
import Footer from "@/components/footer";
import MarqueeDivider from "@/components/MarqueeDivider";
import Chatbot from "@/components/Chatbot";

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
     */}
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

      <section id="judge" className="w-full scroll-mt-16 md:scroll-mt-[84px]">
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

      {/* Floating Chatbot Widget 
      <Chatbot /> */}
    </main>
  );
}
