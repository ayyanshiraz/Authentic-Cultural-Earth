"use client";

import React from "react";
import { motion } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const unifiedSlides = [
  { id: 1, title: "ALGERIA — VISUAL", image: "" },
  { id: 2, title: "ALGERIA — DESCRIPTIVE", image: "" },
  { id: 3, title: "QATAR — VISUAL", image: "" },
  { id: 4, title: "QATAR — DESCRIPTIVE", image: "" },
  { id: 5, title: "PERU — VISUAL", image: "" },
  { id: 6, title: "PERU — DESCRIPTIVE", image: "" },
  { id: 7, title: "AFRICA — FRONT", image: "" },
  { id: 8, title: "AFRICA — BACK", image: "" },
  { id: 9, title: "ASIA — FRONT", image: "" },
  { id: 10, title: "EUROPE — FRONT", image: "" },
  { id: 11, title: "NORTH AMERICA — FRONT", image: "" },
  { id: 12, title: "SOUTH AMERICA — FRONT", image: "" },
  { id: 13, title: "OCEANIA — FRONT", image: "" }
];

export default function CombinedPresentation() {
  return (
    <section id="collection" className="bg-white text-black pt-32 pb-12 w-full relative z-10 overflow-hidden border-t border-black/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-black/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-6 mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${outfit.className} text-[10px] md:text-xs text-black/50 uppercase tracking-[0.3em] font-semibold`}
          >
            THE COLLECTION, PROPERLY SHOWN
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight max-w-4xl leading-tight text-black`}
          >
            Artwork. Continental packs. The complete experience.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${outfit.className} text-sm md:text-base text-black/60 font-light max-w-2xl leading-relaxed`}
          >
            See the actual supplied artwork at full proportion and continental fronts followed by the product film.
          </motion.p>
        </div>

        <div className="mb-12 w-full">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-baseline gap-4"
            >
              <span className={`${playfair.className} text-black/30 text-2xl font-medium`}>01</span>
              <div className="space-y-1">
                <h3 className={`${playfair.className} text-3xl font-medium tracking-wide text-black`}>
                  Complete Collection
                </h3>
                <p className={`${outfit.className} text-sm text-black/50 font-light`}>
                  Full visual cards and continental sorting indexes.
                </p>
              </div>
            </motion.div>

            <motion.a
              href="/collection"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className={`${outfit.className} inline-block px-8 py-3 border border-black text-xs font-semibold uppercase tracking-widest text-black hover:bg-black hover:text-white active:bg-black active:text-white transition-all duration-300 rounded-full`}
            >
              See all collection
            </motion.a>
          </div>

          <div className="relative w-full overflow-hidden pb-12">
            <motion.div className="flex gap-6 w-max animate-scroll">
              {[...unifiedSlides, ...unifiedSlides].map((slide, index) => (
                <div key={`slide-${index}`} className="flex flex-col gap-4 shrink-0">
                  <div className="w-[280px] md:w-[320px] h-[440px] md:h-[480px] bg-black rounded-xl p-2 shadow-sm border-4 border-black">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <span className={`${outfit.className} text-[10px] md:text-xs tracking-[0.2em] text-black/40 uppercase pl-2`}>
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
        .animate-scroll { animation: scroll 60s linear infinite; }
        .animate-scroll:hover, .animate-scroll:active { animation-play-state: paused; cursor: pointer; }
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}