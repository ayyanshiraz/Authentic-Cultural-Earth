"use client";

import React from "react";
import { motion } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const artworkSlides = [
  { id: 1, title: "ALGERIA — VISUAL", image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600" },
  { id: 2, title: "ALGERIA — DESCRIPTIVE", image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=600" },
  { id: 3, title: "QATAR — VISUAL", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600" },
  { id: 4, title: "QATAR — DESCRIPTIVE", image: "https://images.unsplash.com/photo-1610977271815-5d9dcbf968c3?auto=format&fit=crop&q=80&w=600" },
  { id: 5, title: "PERU — VISUAL", image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=600" },
  { id: 6, title: "PERU — DESCRIPTIVE", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=600" },
];

const continentalSlides = [
  { id: 1, title: "AFRICA — FRONT", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=600" },
  { id: 2, title: "AFRICA — BACK", image: "https://images.unsplash.com/photo-1523805009056-2448a5e5a2db?auto=format&fit=crop&q=80&w=600" },
  { id: 3, title: "ASIA — FRONT", image: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?auto=format&fit=crop&q=80&w=600" },
  { id: 4, title: "EUROPE — FRONT", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=600" },
  { id: 5, title: "NORTH AMERICA — FRONT", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600" },
  { id: 6, title: "SOUTH AMERICA — FRONT", image: "https://images.unsplash.com/photo-1619546952812-520e9806f87d?auto=format&fit=crop&q=80&w=600" },
  { id: 7, title: "OCEANIA — FRONT", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=600" }
];

export default function Collection() {
  return (
    <section className="bg-[#050505] text-white py-32 w-full relative z-10 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-6 mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${outfit.className} text-[10px] md:text-xs text-white/50 uppercase tracking-[0.3em] font-semibold`}
          >
            THE COLLECTION, PROPERLY SHOWN
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight max-w-4xl leading-tight text-white/90`}
          >
            Artwork. Continental packs. The complete experience.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${outfit.className} text-sm md:text-base text-white/60 font-light max-w-2xl leading-relaxed`}
          >
            See the actual supplied artwork at full proportion — not cropped into decorative boxes — followed by the product film.
          </motion.p>
        </div>

        <div className="mb-24 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-baseline gap-4 mb-12"
          >
            <span className={`${playfair.className} text-white/30 text-2xl font-medium`}>01</span>
            <div className="space-y-1">
              <h3 className={`${playfair.className} text-3xl font-medium tracking-wide text-white/90`}>
                Designed artwork
              </h3>
              <p className={`${outfit.className} text-sm text-white/50 font-light`}>
                Full visual and descriptive cultural cards.
              </p>
            </div>
          </motion.div>

          <div className="relative w-full overflow-hidden pb-12">
            <motion.div className="flex gap-6 w-max animate-scroll">
              {[...artworkSlides, ...artworkSlides].map((slide, index) => (
                <div key={`art-${index}`} className="flex flex-col gap-4 shrink-0">
                  <div className="w-[280px] md:w-[320px] h-[440px] md:h-[480px] bg-white rounded-xl p-2 shadow-xl border border-black/10">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <span className={`${outfit.className} text-[10px] md:text-xs tracking-[0.2em] text-white/40 uppercase pl-2`}>
                    {slide.title}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="w-full">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-baseline gap-4 mb-12 border-t border-white/5 pt-12"
            >
              <span className={`${playfair.className} text-white/30 text-2xl font-medium`}>02</span>
              <div className="space-y-1">
                <h3 className={`${playfair.className} text-3xl font-medium tracking-wide text-white/90`}>
                  Continental presentation
                </h3>
                <p className={`${outfit.className} text-sm text-white/50 font-light`}>
                  Fronts, backs and sorting indexes from the supplied files.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="relative w-full overflow-hidden pb-12">
            <motion.div className="flex gap-6 w-max animate-scroll">
              {[...continentalSlides, ...continentalSlides].map((slide, index) => (
                <div key={`cont-${index}`} className="flex flex-col gap-4 shrink-0">
                  <div className="w-[280px] md:w-[320px] h-[440px] md:h-[480px] bg-white rounded-xl p-2 shadow-xl border border-black/10">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <span className={`${outfit.className} text-[10px] md:text-xs tracking-[0.2em] text-white/40 uppercase pl-2`}>
                    {slide.title}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-scroll { animation: scroll 40s linear infinite; }
        .animate-scroll:hover { animation-play-state: paused; cursor: pointer; }
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}