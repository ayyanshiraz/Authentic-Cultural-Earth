"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const purposeData = [
  {
    id: 0,
    num: "01",
    title: "Understanding",
    desc: "Encounter cultures as layered systems of geography, language, ideas, creativity, belief and daily life.",
  },
  {
    id: 1,
    num: "02",
    title: "Curiosity",
    desc: "Let visual observation become a doorway to asking better questions and discovering more.",
  },
  {
    id: 2,
    num: "03",
    title: "Connection",
    desc: "Notice difference without losing sight of the shared human experiences behind it.",
  }
];

export default function Purpose() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="purpose" className="bg-white text-black py-16 w-full relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-24 items-start">
        
        {/* Sticky Header Section */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-40 flex flex-col space-y-6">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${outfit.className} text-[10px] md:text-xs text-black/50 uppercase tracking-[0.4em] font-semibold`}
          >
            WHY IT EXISTS
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05] text-black pr-4`}
          >
            Inspiring A More Understanding World.
          </motion.h2>
        </div>

        {/* Interactive List Section */}
        <div className="w-full lg:w-7/12 flex flex-col border-t border-black/10 mt-4 md:mt-12 lg:mt-0">
          {purposeData.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <motion.div
                key={item.id}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(index)}
                onTouchEnd={() => setHoveredIndex(null)}
                animate={{ opacity: isDimmed ? 0.25 : 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="group border-b border-black/10 py-12 md:py-16 cursor-pointer relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-12 items-start"
              >
                {/* Left Column of Row */}
                <div className="w-full md:w-5/12 flex flex-col gap-4 relative z-10">
                  <span className={`${outfit.className} text-xs tracking-widest text-black/40 font-semibold uppercase flex items-center gap-4`}>
                    {item.num}
                    
                    {/* Animated Line Indicator */}
                    <motion.span 
                      initial={{ width: 0 }}
                      animate={{ width: isHovered ? 40 : 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-[1px] bg-black block"
                    />
                  </span>
                  
                  <motion.h3 
                    animate={{ x: isHovered ? 15 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`${playfair.className} text-3xl md:text-4xl xl:text-5xl font-medium text-black`}
                  >
                    {item.title}
                  </motion.h3>
                </div>

                {/* Right Column of Row */}
                <motion.div 
                  animate={{ x: isHovered ? 10 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
                  className="w-full md:w-7/12 relative z-10 md:pt-10"
                >
                  <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}