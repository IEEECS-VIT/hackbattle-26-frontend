export default function AboutPage() {
  return (
    <section
      id="about"
      className="relative min-h-[110vh] md:min-h-screen w-full scroll-mt-16 overflow-hidden pb-24 md:scroll-mt-[84px]"
      style={{
        backgroundImage: "url('/grass.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center 50px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-50 -z-10 bg-[#4FB5E5]" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex max-w-[1290px] flex-col items-center pt-8 md:pt-12 text-center">
        {/* Heading matched to previous TRACKS title size */}
        <h1 className="font-pixeboy font-normal text-center text-white text-4xl sm:text-6xl md:text-7xl tracking-wider select-none drop-shadow-[0_4px_0_#163e54]">
          ABOUT US
        </h1>

        {/* Description Box */}
        <div className="mt-8 md:mt-10 w-full max-w-[787px] border-none px-5 sm:px-6 md:px-7 lg:px-5 xl:px-4 py-0">
          <p className="w-full max-w-[720px] xl:max-w-[759px] mx-auto font-pixeboy font-normal text-black text-[34px] leading-[36px] md:text-[28px] md:leading-[32px] lg:text-[35px] lg:leading-[35px] xl:text-[40px] xl:leading-[40px] tracking-[-0.02em] text-left">
            JOIN THE ADRENALINE-PUMPING 36-HOUR HACK BATTLE BY{" "}
            <span className="text-[#FFD84D]">IEEE CS VIT</span>, WHERE TECH
            INNOVATORS GATHER FOR GROUNDBREAKING{" "}
            <span className="text-[#FFD84D]">CHALLENGES</span>, KEYNOTE
            SESSIONS, AND ENGAGING ACTIVITIES THAT IGNITE CREATIVITY AND DRIVE{" "}
            <span className="text-[#FFD84D]">INNOVATION</span>
          </p>
        </div>
      </div>
    </section>
  );
}
