
export default function AboutPage() {
  return (
    <section
      id = "about"
      className="relative min-h-[110vh] md:min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "url('/AboutUs/about_us_bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center 50px",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div
      className="
        absolute
        top-0
        left-0
        w-full
        h-50
        -z-10
        bg-[#4FB5E5]
      "
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
          pt-2
          md:pt-2
          lg:pt-0          
          text-center
        "
      >
        {/* Heading */}
        <h1
          className="
            font-pixeboy
            font-normal

            text-white

            text-[96px]
            leading-[100px]
            md:text-[140px]
            md:leading-none
            lg:text-[180px]
            xl:text-[220px]
          "
        >
          ABOUT US
        </h1>

        {/* Description Box */}
        <div
          className="
            mt-8
            md:mt-6
            lg:-mt-8
            xl:-mt-10

            w-full
            max-w-[787px]

            border-0
            md:border
            md:border-black

            px-0
            md:px-2

            py-0
            md:py-8
          "
        >
          <p
            className="
              mx-auto
              max-w-[337px]
              md:max-w-[600px]
              lg:max-w-[759px]

              font-pixeboy
              font-normal

              text-black

              text-[34px]
              leading-[36px]

              md:text-[28px]
              md:leading-[32px]

              lg:text-[35px]
              lg:leading-[35px]

              xl:text-[40px]
              xl:leading-[40px]

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