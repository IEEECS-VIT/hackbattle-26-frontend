
export default function AboutPage() {
  return (
    <section
      id = "about"
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "url('/AboutUs/about_us_bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center 80px",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Gradient(overlaps background) */}
      <div
        className="absolute left-0 top-[16px] z-10 h-[66px] w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(80,153,230,0.82) 0%, rgba(145,151,90,0.82) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="
          relative
          z-20

          mx-auto
          flex
          max-w-[1290px]
          flex-col
          items-center
          pt-[clamp(90px,5vw,120px)]
          px-[clamp(16px,2vw,24px)]
          text-center
        "
      >
        {/* Heading */}
        <h1
          className="
            font-pixeboy
            font-normal

            text-white

            leading-none

            text-[clamp(80px,12vw,220px)]
          "
        >
          ABOUT US
        </h1>

        {/* Description Box */}
        <div
          className="
            mt-[clamp(8px,1vw,20px)]

            w-full
            max-w-[787px]

            border
            border-black

            px-2
            py-8
          "
        >
          <p
            className="
              mx-auto
              max-w-[759px]

              font-pixeboy
              font-normal

              text-black

              text-[clamp(20px,2.8vw,40px)]

              leading-[clamp(28px,2.5vw,35px)]

              tracking-[-0.02em]

              text-left
            "
          >
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