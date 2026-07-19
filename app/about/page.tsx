export default function AboutPage() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "url('/AboutUs/about_us_bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center 80px",
      }}
    >
      {/* Gradient 1 */}
      <div
        className="absolute top-0 left-0 z-10 h-[33px] w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(80,181,227,0.82) 0%, rgba(147,184,91,0.82) 100%)",
        }}
      />

      {/* Gradient 2 (overlaps background) */}
      <div
        className="absolute left-0 top-[16px] z-10 h-[66px] w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(80,183,230,0.82) 0%, rgba(145,181,90,0.82) 100%)",
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

          pt-[30px]
          md:pt-[40px]
          lg:pt-[50px]
          xl:pt-[60px]

          px-6

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

            text-[80px]
            md:text-[140px]
            lg:text-[180px]
            xl:text-[220px]
          "
        >
          ABOUT US
        </h1>

        {/* Description Box */}
        <div
          className="
            -mt-6

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

              text-xl
              md:text-2xl
              lg:text-[35px]
              xl:text-[40px]

              leading-7
              lg:leading-[35px]

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