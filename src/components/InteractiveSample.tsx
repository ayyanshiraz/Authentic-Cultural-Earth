"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const sampleData = [
  {
    name: "Algeria",
    front: "",
    back: ""
  },
  {
    name: "Qatar",
    front: "",
    back: ""
  },
  {
    name: "Monaco",
    front: "",
    back: ""
  },
  {
    name: "Saint Kitts & Nevis",
    front: "",
    back: ""
  },
  {
    name: "Peru",
    front: "",
    back: ""
  },
  {
    name: "New Zealand",
    front: "",
    back: ""
  }
];

export default function InteractiveSample() {
  const [activeCountry, setActiveCountry] = useState(sampleData[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 30 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], [100, 0]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [100, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCountryChange = (country: typeof sampleData[0]) => {
    if (activeCountry.name === country.name) return;
    setIsFlipped(false);
    setActiveCountry(country);
  };

  return (
    <section className="bg-[#f9f8f6] text-[#050505] py-32 w-full relative z-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-6 mb-24 w-full max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${outfit.className} text-xs text-[#050505]/50 uppercase tracking-[0.3em] font-medium`}
          >
            LOOK • GUESS • FLIP • DISCOVER
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, type: "spring", bounce: 0.4 }}
            className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]`}
          >
            One card. Fifteen connected cultural elements.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`${outfit.className} text-base md:text-lg text-[#050505]/60 font-light leading-relaxed max-w-2xl`}
          >
            Study the visual side, make your guess, then flip the card to reveal the country and explore the same elements through description.
          </motion.p>
        </div>

        {/* Interactive Split View */}
        <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start justify-between">
          
          {/* Gyroscopic Card Engine */}
          <div className="w-full lg:w-5/12 flex flex-col items-center">
            <div className="relative w-full max-w-[400px] aspect-[2.5/3.5] perspective-[1500px]">
              
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full cursor-crosshair group relative"
              >
                {/* Shadow Anchor */}
                <motion.div 
                  animate={{ scale: isFlipped ? 1.05 : 1, opacity: 0.3 }}
                  className="absolute -inset-4 bg-black/40 blur-2xl rounded-3xl -z-10 translate-y-8"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCountry.name}
                    initial={{ opacity: 0, z: 400, rotateZ: -15, scale: 0.8 }}
                    animate={{ opacity: 1, z: 0, rotateZ: 0, scale: 1 }}
                    exit={{ opacity: 0, z: -400, rotateZ: 15, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1 }}
                    className="w-full h-full absolute inset-0"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="w-full h-full relative"
                    >
                      {/* Front Visual Layer */}
                      <div 
                        className="absolute inset-0 w-full h-full rounded-2xl border border-black/10 overflow-hidden bg-white shadow-xl"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <motion.div
                          className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: useTransform(
                              [glareX, glareY],
                              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.7) 0%, transparent 50%)`
                            )
                          }}
                        />
                        <img src={activeCountry.front} alt={`${activeCountry.name} Visual`} className="w-full h-full object-cover" />
                      </div>

                      {/* Back Descriptive Layer */}
                      <div 
                        className="absolute inset-0 w-full h-full rounded-2xl border border-black/10 overflow-hidden bg-white shadow-xl"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      >
                        <motion.div
                          className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: useTransform(
                              [glareX, glareY],
                              ([gx, gy]) => `radial-gradient(circle at ${100 - (gx as number)}% ${gy}%, rgba(255,255,255,0.7) 0%, transparent 50%)`
                            )
                          }}
                        />
                        <img src={activeCountry.back} alt={`${activeCountry.name} Descriptive`} className="w-full h-full object-cover" />
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFlipped(!isFlipped)}
              className={`${outfit.className} mt-12 px-8 py-3 border border-[#050505] text-xs font-semibold uppercase tracking-widest text-[#050505] hover:bg-[#050505] hover:text-white active:bg-[#050505] active:text-white transition-all duration-300 rounded-full`}
            >
              Flip card
            </motion.button>
          </div>

          {/* Controls & Text */}
          <div className="w-full lg:w-7/12 flex flex-col pt-8 lg:pt-16">
            <span className={`${outfit.className} text-xs text-[#050505]/50 uppercase tracking-[0.2em] font-semibold mb-6`}>
              TRY A SAMPLE
            </span>
            <h3 className={`${playfair.className} text-3xl md:text-4xl font-medium text-[#050505] mb-6`}>
              Move from observation to understanding.
            </h3>
            <p className={`${outfit.className} text-base text-[#050505]/70 font-light leading-relaxed mb-10 max-w-2xl`}>
              The same 15 elements connect both sides: Geography, Language, Philosophy, Clothing, Craft, Emblem, Central Core, Music, Faith, Infrastructure, Map, Mythology / Symbolism, National Currency Figure, Festival and Architecture.
            </p>

            {/* Elastic Pill Navigation */}
            <div className="flex flex-wrap gap-3 mb-16 relative">
              {sampleData.map((country) => {
                const isActive = activeCountry.name === country.name;
                return (
                  <button
                    key={country.name}
                    onClick={() => handleCountryChange(country)}
                    className={`${outfit.className} relative px-6 py-2.5 text-sm rounded-full transition-colors duration-300 z-10 overflow-hidden ${isActive ? "text-white" : "text-[#050505] border border-[#050505]/10 hover:border-[#050505]/30 hover:bg-black/5 active:border-[#050505]/30 active:bg-black/5"}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="liquidLens"
                        className="absolute inset-0 bg-[#050505] rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
                      />
                    )}
                    <span className="relative z-10">{country.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="w-full h-px bg-[#050505]/10 mb-10 max-w-2xl relative overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-black/20 to-transparent"
              />
            </div>

            <span className={`${outfit.className} text-xs text-[#050505]/50 uppercase tracking-[0.2em] font-semibold mb-6`}>
              DIRECTION GUIDE — INCLUDED IN EVERY PACK
            </span>
            <p className={`${outfit.className} text-base text-[#050505]/70 font-light leading-relaxed max-w-2xl`}>
              The guide is seen immediately when a pack is opened. Its front explains the three ways to explore; its back shows the 15-element blueprint.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}