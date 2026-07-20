"use client";

import React, { useState, useEffect, useRef } from 'react';

const BACKGROUND_IMAGE_URL = "/judgesbg.svg"; 

interface JudgeInfo {
  name: string;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  image: string;
}

export default function PokedexJudge() {
  const [currentJudge, setCurrentJudge] = useState<JudgeInfo | null>(null);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [showQuestionMark, setShowQuestionMark] = useState<boolean>(false);
  const [loadKey, setLoadKey] = useState<number>(0);

  // 3D Card Tilt State
  const [tiltStyle, setTiltStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const cardRef = useRef<HTMLDivElement>(null);

  const fetchRandomPokemon = async () => {
    setIsFlashing(true);
    setShowQuestionMark(true);

    try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();

      const types = data.types.map((t: any) => t.type.name.toUpperCase()).join(" / ");
      const primaryAbility = data.abilities[0]?.ability.name.toUpperCase() || "UNKNOWN";

      const fetchedJudge: JudgeInfo = {
        name: data.name,
        label1: `INFO: #${data.id}`,
        label2: `INFO: ${types}`,
        label3: `SOCIAL MEDIA: ${primaryAbility}`,
        label4: `SOCIAL MEDIA: ${data.base_experience || '???'}`,
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
      };

      setTimeout(() => {
        setCurrentJudge(fetchedJudge);
        setLoadKey(prev => prev + 1);
        setIsFlashing(false);
        setShowQuestionMark(false);
      }, 800);

    } catch (error) {
      console.error("Error fetching from PokeAPI:", error);
      setIsFlashing(false);
      setShowQuestionMark(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = rect.width;
    const height = rect.height;
    
    const maxTilt = 5;
    const rotateX = -((y - height / 2) / (height / 2)) * maxTilt;
    const rotateY = ((x - width / 2) / (width / 2)) * maxTilt;
    
    setTiltStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => {
    setTiltStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-start p-4 select-none overflow-y-auto overflow-x-hidden"
      style={{
        width: '100dvw',
        height: '100dvh',
        backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl h-full pt-6 pb-4">
        
        {/* HEADER */}
        <div className="-mt-8 md:-mt-14 mb-2 z-20">
          <h1 
            className="text-white text-7xl md:text-[150px] font-pixeboy leading-15 md:leading-25 tracking-normal drop-shadow-[0_6px_6px_rgba(0,0,0,0.8)] filter transition-all duration-300 select-none text-center"
            style={{ fontWeight: 400 }}
          >
            JUDGE
          </h1>
        </div>

        {/* CONTAINER */}
        <div className="my-auto max-w-full origin-center transition-transform duration-300 scale-90 sm:scale-95 md:scale-100 min-[768px]:max-[1100px]:scale-[0.85]">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              transform: tiltStyle,
              transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-0 justify-center relative rounded-3xl"
          >
            {/* LEFT PANEL */}
            <div className="w-87.5 md:w-95 h-122.5 md:h-127.5 bg-[#D30A40] border-4 border-black rounded-2xl md:rounded-l-2xl md:rounded-r-none p-5 flex flex-col justify-between relative z-10 shadow-[0_20px_45px_rgba(0,0,0,0.45)] overflow-hidden">
              
              <div className="flex items-center gap-3 z-10">
                <div className="w-12 h-12 bg-linear-to-br from-[#85d7ff] via-[#31a5ee] to-[#005c9e] border-4 border-white rounded-full ring-2 ring-black shadow-inner relative flex items-center justify-center">
                  <div className="w-3 h-3 bg-white/70 rounded-full absolute top-1 left-1.5 filter blur-[0.5px]"></div>
                </div>
                
                <div className="flex gap-1.5 ml-1">
                  <div className="w-3 h-3 bg-[#ff3b30] border border-black rounded-full shadow-[0_0_4px_#ff3b30] animate-pulse"></div>
                  <div className="w-3 h-3 bg-[#ffcc00] border border-black rounded-full shadow-[0_0_4px_#ffcc00]"></div>
                  <div className="w-3 h-3 bg-[#4cd964] border border-black rounded-full shadow-[0_0_4px_#4cd964]"></div>
                </div>
              </div>

              <div 
                className="absolute top-0 left-0 right-0 h-20 border-b-4 border-black pointer-events-none bg-transparent"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 70px, 240px 70px, 175px 44px, 0 44px)'
                }}
              />

              {/* SCREEN CONTAINER */}
              <div 
                className="bg-black p-1 mt-6 mb-2 w-full flex flex-col items-center justify-center"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 45px 100%, 0% calc(100% - 45px))'
                }}
              >
                <div 
                  className="bg-[#dedede] p-5 relative shadow-inner w-full h-full flex flex-col items-center justify-center"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 42px 100%, 0% calc(100% - 42px))'
                  }}
                >
                  <div 
                    className="bg-black p-0.75 w-full"
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 36px 100%, 0% calc(100% - 36px))'
                    }}
                  >
                    <div 
                      className="bg-[#232323] h-45 w-full overflow-hidden relative flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)]"
                      style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 34px 100%, 0% calc(100% - 34px))',
                        perspective: '600px'
                      }}
                    >
                      <div className="absolute inset-0 retro-scanlines pointer-events-none z-10 opacity-40"></div>
                      <div className="absolute top-0 right-0 w-[200%] h-full bg-linear-to-bl from-white/10 to-transparent -translate-y-1/2 skew-x-12 pointer-events-none z-15"></div>
                      <div className={`absolute inset-0 z-30 pointer-events-none bg-yellow-400/20 mix-blend-screen ${isFlashing ? 'animate-lcd-flash' : 'hidden'}`}></div>

                      {showQuestionMark || !currentJudge ? (
                        <div className="text-[#ffcc00] font-pixeboy text-9xl font-bold animate-spin-perpendicular select-none filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.85)] will-change-transform">
                          ?
                        </div>
                      ) : (
                        <img 
                          key={loadKey}
                          src={currentJudge.image} 
                          alt={currentJudge.name} 
                          className="w-full h-full object-contain p-2 animate-image-pop" 
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* MID PADS PANEL */}
              <div className="flex justify-between items-center px-1 mt-3 mb-1">
                <div className="w-11 h-11 bg-zinc-800 border-2 border-black rounded-full shadow-[0_3px_0_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"></div>
                
                <div className="flex gap-2">
                  <span className="w-15 h-4 bg-[#ff3b30] border border-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"></span>
                  <span className="w-15 h-4 bg-[#31a5ee] border border-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"></span>
                </div>
                
                <div className="w-12 h-4"></div>
              </div>

              {/* LOWER HARDWARE HUB */}
              <div className="flex items-end justify-between w-full relative px-0.5">
                <div className="flex items-center bg-black rounded-md h-12 p-1 overflow-hidden w-[185px] md:w-[210px] flex-shrink-0 relative border border-zinc-700 transform -translate-y-6 -translate-x-2">
                  <button 
                    onClick={fetchRandomPokemon}
                    className="bg-[#ff9500] text-black border border-white rounded-full w-8 h-8 font-black text-lg flex items-center justify-center cursor-pointer hover:bg-[#ffb03a] hover:scale-105 active:scale-95 transition-all z-20 absolute left-1 shadow-inner"
                  >
                    &gt;
                  </button>
                  
                  <button 
                    onClick={fetchRandomPokemon}
                    className="w-full bg-transparent text-white font-pixeboy text-xl tracking-widest text-center py-2 pl-6 outline-none cursor-pointer hover:text-[#ff9500] active:scale-[0.98] transition-all"
                  >
                    Surprise me!
                  </button>
                </div>

                <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0 mb-[20px] mr-1">
                  <div className="absolute w-7 h-20 bg-zinc-800 border-2 border-black rounded-sm shadow-md"></div>
                  <div className="absolute w-20 h-7 bg-zinc-800 border-2 border-black rounded-sm shadow-md"></div>
                  <div className="absolute w-7 h-7 bg-zinc-800 z-10"></div>
                </div>
              </div>

            </div>

            {/* HINGES */}
            <div className="hidden md:flex flex-col justify-around h-[260px] w-5 z-20 -mx-[9px] relative mb-12">
              <div className="w-5 h-12 bg-linear-to-r from-zinc-800 via-zinc-600 to-zinc-900 border-2 border-black rounded-md shadow-lg z-20"></div>
              <div className="w-5 h-12 bg-linear-to-r from-zinc-800 via-zinc-600 to-zinc-900 border-2 border-black rounded-md shadow-lg z-20"></div>
            </div>

            {/* RIGHT INFO PANEL */}
            <div 
              className="w-80 md:w-75 h-85 md:h-100 bg-black p-1 md:border-l-0 rounded-b-2xl md:rounded-b-none md:rounded-r-2xl shadow-[0_20px_45px_rgba(0,0,0,0.45)] relative z-0"
              style={{ 
                clipPath: 'polygon(30px 0, 100% 0, 100% 100%, 0 100%, 0 30px)'
              }}
            >
              <div 
                className="w-full h-full bg-[#D30A40] p-4 flex flex-col justify-between"
                style={{
                  clipPath: 'polygon(27px 0, 100% 0, 100% 100%, 0 100%, 0 27px)'
                }}
              >
                <div 
                  className="bg-black p-0.75 flex-grow flex"
                  style={{
                    clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)'
                  }}
                >
                  <div 
                    className="bg-[#c2c2c2] w-full h-full p-4 flex flex-col justify-between font-pixeboy text-[#1d1d1d] relative shadow-[inset_0_2px_5px_rgba(0,0,0,0.25)] border border-black/10"
                    style={{
                      clipPath: 'polygon(18px 0, 100% 0, 100% 100%, 0 100%, 0 18px)'
                    }}
                  >
                    <div className="absolute top-0 right-0 bg-[#D30A40] border-b-2 border-l-2 border-black px-2 py-1 flex items-center gap-1.5 rounded-bl-md">
                      <span className="w-2.5 h-2.5 bg-[#ff3b30] border border-black rounded-full shadow-sm"></span>
                      <span className="w-2.5 h-2.5 bg-[#ffcc00] border border-black rounded-full shadow-sm"></span>
                      <span className="w-2.5 h-2.5 bg-[#4cd964] border border-black rounded-full shadow-sm"></span>
                    </div>
                    
                    {currentJudge && (
                      <>
                        {/* Upper Group */}
                        <div key={`info-${loadKey}`} className="flex flex-col items-end w-full mt-8 flex-grow justify-start pt-2">
                          <h2 className="text-4xl uppercase tracking-normal text-[#0c0c0c] mb-2 text-right w-full animate-text-slide font-pixeboy font-normal">
                            {currentJudge.name}
                          </h2>
                          <p 
                            style={{ animationDelay: '0.1s' }}
                            className="text-2xl uppercase text-zinc-800 text-right w-full leading-tight animate-text-slide font-pixeboy"
                          >
                            {currentJudge.label1}
                          </p>
                          <p 
                            style={{ animationDelay: '0.2s' }}
                            className="text-2xl uppercase text-zinc-800 text-right w-full leading-tight animate-text-slide font-pixeboy"
                          >
                            {currentJudge.label2}
                          </p>
                        </div>

                        {/* Lower Group */}
                        <div 
                          key={`social-${loadKey}`}
                          className="w-full flex flex-col items-end text-right mt-2 pb-1 text-zinc-900 font-pixeboy text-2xl tracking-wide gap-0.5"
                        >
                          <p 
                            style={{ animationDelay: '0.3s' }}
                            className="w-full truncate uppercase animate-text-slide"
                          >
                            {currentJudge.label3}
                          </p>
                          <p 
                            style={{ animationDelay: '0.4s' }}
                            className="w-full truncate uppercase animate-text-slide"
                          >
                            {currentJudge.label4}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <style jsx global>{`
        .animate-image-pop {
          animation: imagePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards;
        }
        .animate-text-slide {
          opacity: 0;
          animation: textSlideIn 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-spin-perpendicular {
          animation: perpendicularSpin 0.45s linear infinite;
          transform-style: preserve-3d;
        }

        @keyframes perpendicularSpin {
          0% { transform: rotateY(0deg) scale(1.1); }
          50% { transform: rotateY(180deg) scale(1.35); }
          100% { transform: rotateY(360deg) scale(1.1); }
        }

        @keyframes imagePop {
          0% {
            transform: scale(0.6);
            filter: brightness(1.8) contrast(1.2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            filter: none;
            opacity: 1;
          }
        }

        @keyframes textSlideIn {
          0% {
            transform: translateY(8px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}