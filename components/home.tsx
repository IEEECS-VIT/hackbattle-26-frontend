import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center font-['Pixeboy',_sans-serif]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/hackbattle-video.webm" type="video/webm" />
        <div className="w-full h-full bg-cyan-600"></div>
      </video>

      <div className="absolute inset-0 bg-blue-900/10 z-10"></div>

      { }
      <div className="absolute top-20 sm:top-22 md:top-24 right-4 sm:right-6 md:right-8 z-20">
        <Image
          src="/hackbattle-logo.svg"
          alt="Hack Battle Logo"
          width={200}
          height={150}
          className="object-contain w-[80px] sm:w-[120px] md:w-[160px] lg:w-[200px] h-auto"
        />
      </div>

      { }
      <div className="absolute bottom-[12%] sm:bottom-[15%] md:bottom-[18%] lg:bottom-[20%] left-3 sm:left-6 md:left-12 lg:left-16 z-30 flex flex-col items-start max-w-[92vw] sm:max-w-[90vw] md:max-w-none">
        <h2
          className="text-white text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl tracking-widest mb-[-0.2rem] sm:mb-[-0.3rem] md:mb-[-0.5rem] ml-3 sm:ml-5 md:ml-7 z-10"
          style={{ textShadow: '2px 2px 0 #1a4a60, -1px -1px 0 #1a4a60, 1px -1px 0 #1a4a60, -1px 1px 0 #1a4a60, 1px 1px 0 #1a4a60, 0px 2px 0 #1a4a60, 2px 0px 0 #1a4a60' }}
        >
          PRESENTS
        </h2>

        <div className="relative my-0 ml-3 sm:ml-5 md:ml-7" data-text="HACKBATTLE">
          <h1
            className="text-[2.5rem] sm:text-5xl md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] leading-[0.85] font-bold tracking-wider hackbattle-title"
            style={{
              background: 'radial-gradient(circle at 65% 55%, #ffffff 0%, #ffffff 15%, #f8c61c 30%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(3px 5px 0px rgba(26,74,96,0.9))'
            }}
          >
            HACKBATTLE
          </h1>
          <h1
            className="text-[2.5rem] sm:text-5xl md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] leading-[0.85] font-bold tracking-wider absolute top-0 left-0 w-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 65% 50%, #ffffff 0%, #ffffff 18%, #f8c61c 32%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            HACKBATTLE
          </h1>
        </div>

        <h3
          className="text-white text-sm sm:text-lg md:text-xl lg:text-3xl xl:text-5xl 2xl:text-6xl tracking-widest mt-1 sm:mt-1.5 md:mt-2 ml-3 sm:ml-5 md:ml-7"
          style={{ textShadow: '2px 2px 0 #1a4a60, -1px -1px 0 #1a4a60, 1px -1px 0 #1a4a60, -1px 1px 0 #1a4a60, 1px 1px 0 #1a4a60, 0px 2px 0 #1a4a60, 2px 0px 0 #1a4a60' }}
        >
          THE ULTIMATE 36-HOUR HACKATHON
        </h3>
      </div>
    </div>
  );
};

export default Hero;
