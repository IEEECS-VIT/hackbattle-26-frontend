import React from 'react';

const Hero = () => {
  return (
    <div id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center font-['Pixeboy',_sans-serif]">
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

      <div className="absolute bottom-[12%] sm:bottom-[15%] md:bottom-[18%] lg:bottom-[20%] left-3 sm:left-6 md:left-12 lg:left-16 z-30 flex flex-col items-start max-w-[92vw] sm:max-w-[90vw] md:max-w-none">
        <h2
          className="text-white
text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl
tracking-normal
mt-4 sm:mt-5 md:mt-6
mb-0
ml-3 sm:ml-5 md:ml-10"
          style={{ textShadow: '2px 2px 0 #1a4a60, -1px -1px 0 #1a4a60, 1px -1px 0 #1a4a60, -1px 1px 0 #1a4a60, 1px 1px 0 #1a4a60, 0px 2px 0 #1a4a60, 2px 0px 0 #1a4a60' }}
        >
          PRESENTS
        </h2>

        <div className="relative mt-[-0.6rem] sm:mt-[-0.8rem] md:mt-[-1.2rem] lg:mt-[-1.8rem] xl:mt-[-2.2rem] mb-0 ml-3 sm:ml-5 md:ml-10" data-text="HACKBATTLE">
          <h1
            className="text-[2.5rem] sm:text-5xl md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] leading-[0.85] font-bold tracking-wider hackbattle-title"
            style={{
              background: 'radial-gradient(circle at 53% 50%, #ffffff 0%, #ffffff 6%, #fff6d0 10%, #ffd54f 13%, #f8c61c 16%, #f8c61c 100%)',
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
              background: 'radial-gradient(circle at 70% 50%, #ffffff 0%, #ffffff 18%, #f8c61c 32%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            HACKBATTLE
          </h1>
        </div>

        <h3
          className="text-white text-lg sm:text-2xl md:text-3xl lg:text-[2.8rem] xl:text-[3.6rem] 2xl:text-[4rem] tracking-normal mt-[-0.5rem] sm:mt-[-0.6rem] md:mt-[-0.8rem] lg:mt-[-1rem] xl:mt-[-1.2rem] ml-3 sm:ml-5 md:ml-10"
          style={{ textShadow: '2px 2px 0 #1a4a60, -1px -1px 0 #1a4a60, 1px -1px 0 #1a4a60, -1px 1px 0 #1a4a60, 1px 1px 0 #1a4a60, 0px 2px 0 #1a4a60, 2px 0px 0 #1a4a60' }}
        >
          THE ULTIMATE 36-HOUR HACKATHON
        </h3>
      </div>
    </div>
  );
};

export default Hero;
