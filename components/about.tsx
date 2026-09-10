
export default function AboutPage() {
  return (
    <section
      id = "about"
      className="relative min-h-[110vh] md:min-h-screen w-full overflow-hidden pb-24"
      style={{
        backgroundImage: "url('/grass.webp')",
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

      {/* Pokémon-style Wind Swirl
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <svg
          className="
            absolute
            left-[-300px]
            top-[5%]
            w-[450px]
            h-[180px]
            animate-wind-swirl
          "
          viewBox="0 0 450 180"
          fill="none"
        >
          <path
            d="M30 145
               C100 80, 170 70, 230 110
               C280 145, 340 120, 400 55"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.3"
          />        Wavy wind 
          
        </svg> 

        <svg
          className="
            absolute
            left-[-300px]
            top-[10%]
            w-[450px]
            h-[180px]
            animate-loop-wind
          "
          viewBox="0 0 450 180"
          fill="none"
        > 
        <path
            d="
              M0 35

              C10 22, 20 48, 30 35
              C40 22, 50 48, 60 35
              C70 22, 80 48, 90 35

              C100 22, 108 8, 120 12
              C134 17, 138 38, 126 47
              C116 55, 104 47, 108 35
              C111 27, 120 26, 126 32

              C136 45, 146 22, 156 35
              C166 48, 176 22, 186 35
              C196 48, 206 22, 216 35
              C226 48, 236 22, 246 35
            "
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.4"
        />         
        </svg>

        <svg
          className="
            absolute
            left-[-300px]
            top-[20%]
            w-[450px]
            h-[180px]
            animate-small-wind-1          
          "
          viewBox="0 0 450 180"
          fill="none"
        >
        <path
            d="
              M0 35
              C10 22, 20 48, 30 35
              C40 22, 50 48, 60 35
              C70 22, 80 48, 90 35
              C100 22, 110 48, 120 35
              C130 22, 140 48, 150 35
              C160 22, 170 48, 180 35
            "
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />        
          </svg>

           <svg
          className="
            absolute
            left-[-300px]
            top-[30%]
            w-[450px]
            h-[180px]
            animate-small-wind-2          
          "
          viewBox="0 0 450 180"
          fill="none"
        >
        <path
            d="
              M0 35
              C10 22, 20 48, 30 35
              C40 22, 50 48, 60 35
              C70 22, 80 48, 90 35
              C100 22, 110 48, 120 35
              C130 22, 140 48, 150 35
              C160 22, 170 48, 180 35
            "
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />       
          </svg>

          <svg
          className="
            absolute
            left-[-300px]
            top-[55%]
            w-[450px]
            h-[180px]
            animate-small-wind-2          
          "
          viewBox="0 0 450 180"
          fill="none"
        >
        <path
            d="
              M0 35
              C10 22, 20 48, 30 35
              C40 22, 50 48, 60 35
              C70 22, 80 48, 90 35
              C100 22, 110 48, 120 35
              C130 22, 140 48, 150 35
              C160 22, 170 48, 180 35
            "
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />        
          </svg>


           <svg
          className="
            absolute
            left-[-300px]
            top-[50%]
            w-[450px]
            h-[180px]
            animate-small-wind-1          
          "
          viewBox="0 0 450 180"
          fill="none"
        >
        <path
            d="
              M0 35
              C10 22, 20 48, 30 35
              C40 22, 50 48, 60 35
              C70 22, 80 48, 90 35
              C100 22, 110 48, 120 35
              C130 22, 140 48, 150 35
              C160 22, 170 48, 180 35
            "
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />        
          </svg>

          <svg
          className="
            absolute
            left-[-300px]
            top-[40%]
            w-[450px]
            h-[180px]
            animate-main-wind-1
          "
          viewBox="0 0 450 180"
          fill="none"
          > 
          <path
            d="
              M0 35

              C10 22, 20 48, 30 35
              C40 22, 50 48, 60 35
              C70 22, 80 48, 90 35

              C100 22, 108 8, 120 12
              C134 17, 138 38, 126 47
              C116 55, 104 47, 108 35
              C111 27, 120 26, 126 32

              C136 45, 146 22, 156 35
              C166 48, 176 22, 186 35
              C196 48, 206 22, 216 35
              C226 48, 236 22, 246 35
            "
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.4"
        />          
        </svg>

      </div>
*/}



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

            text-[70px]
            leading-[80px]
            md:text-[111px]
            md:leading-none
            lg:text-[148px]
            xl:text-[185px]
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

            px-5
            sm:px-6
            md:px-7
            lg:px-5
            xl:px-4
            
            py-0
            md:py-8
          "
        >
          <p
            className="
              w-full
              max-w-[720px]
              xl:max-w-[759px]
              mx-auto

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
            JOIN THE ADRENALINE-PUMPING 36-HOUR HACK BATTLE BY
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
