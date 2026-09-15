"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function Hero() {
  return (
    <section className="relative w-full bg-[#050505] text-white overflow-hidden flex items-center min-h-screen m-0 p-0 border-none outline-none">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-2.png" 
          alt="Authentic Cultural Earth Background" 
          fill 
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-10 pt-30 pb-20">
        <div className="space-y-8 max-w-3xl flex flex-col items-center relative z-20 pointer-events-none lg:pointer-events-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="flex flex-col items-center"
          >
            <p className={`${outfit.className} text-white/80 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-4 drop-shadow-md`}>
              AUTHENTIC CULTURAL EARTH
            </p>
            <h1 className={`${playfair.className} text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-semibold text-white tracking-tight drop-shadow-2xl`}>
              Discover the world <br />
              one culture at a time.
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className={`${outfit.className} space-y-6 flex flex-col items-center`}
          >
            <p className="text-white/90 text-base md:text-lg leading-relaxed font-light max-w-xl drop-shadow-md">
              A premium visual cultural discovery collection bringing together cinematic art, cultural knowledge and an interactive country guessing experience across 199 cards.
            </p>
            
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            className="pt-4 pointer-events-auto"
          >
            <button onClick={() => { window.location.href = `/collection`; }} className={`${outfit.className} bg-white hover:bg-gray-200 text-black rounded-full px-8 py-4 font-semibold text-sm md:text-base flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]`}>
  Explore the Complete Collection
</button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}