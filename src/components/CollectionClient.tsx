"use client";

import React, { useRef, MouseEvent, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

// --- DATA STRUCTURES ---

const continentsData = [
  { id: "africa", title: "Africa", color: "#f97316", glow: "rgba(249, 115, 22, 0.15)", desc: "From landscapes and languages to ideas, craftsmanship, belief and architecture.", cardCount: "54 CARDS", countNum: 54 },
  { id: "asia", title: "Asia", color: "#eab308", glow: "rgba(234, 179, 8, 0.15)", desc: "A vast visual journey through one of the worlds richest and most varied cultural regions.", cardCount: "49 CARDS", countNum: 49 },
  { id: "europe", title: "Europe", color: "#3b82f6", glow: "rgba(59, 130, 246, 0.15)", desc: "History, philosophies, music, urban identity and living traditions across the continent.", cardCount: "46 CARDS", countNum: 46 },
  { id: "north-america", title: "North America & Caribbean", color: "#14b8a6", glow: "rgba(20, 184, 166, 0.15)", desc: "Continental, Central American and Caribbean identities connected through visual discovery.", cardCount: "23 CARDS", countNum: 23 },
  { id: "south-america", title: "South America", color: "#f59e0b", glow: "rgba(245, 158, 11, 0.15)", desc: "Indigenous heritage, landscapes, creative expression and modern national identities.", cardCount: "12 CARDS", countNum: 12 },
  { id: "oceania", title: "Oceania", color: "#a855f7", glow: "rgba(168, 85, 247, 0.15)", desc: "Island cultures, indigenous knowledge, oceanic identity and distinctive environments.", cardCount: "13 CARDS", countNum: 13 }
];

const generateContinentSlides = (continentId: string, count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${continentId}-card-${index + 1}`,
    continent: continentId,
    title: `${continentId.toUpperCase()} — CARD ${index + 1}`,
    frontImage: "",
    backImage: ""
  }));
};

const gallerySlides = continentsData.flatMap(c => generateContinentSlides(c.id, c.countNum));

// --- COMPONENTS ---

const ContinentCard = ({ 
  data, 
  onClick 
}: { 
  data: typeof continentsData[0]; 
  onClick: () => void 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const cardZ = useSpring(useTransform(y, [-0.5, 0.5], [10, 30]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-[#0a0a0a] rounded-3xl border border-black/10 shadow-2xl cursor-pointer flex flex-col md:flex-row p-6 md:p-8 gap-8 group transition-all duration-500 relative overflow-hidden perspective-[1000px]"
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${data.glow}, transparent 70%)` }}
      />
      <div className="w-full md:w-1/2 h-[240px] md:h-[300px] relative flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        <motion.div 
          className="w-3/5 aspect-[3/4] border border-white/10 rounded-lg flex flex-col items-center justify-center relative bg-[#050505] shadow-2xl"
          style={{ transform: "translateZ(0px)" }}
        >
          <span className={`${playfair.className} text-4xl text-white/20 mb-2`}>W</span>
          <span className={`${outfit.className} text-[8px] uppercase tracking-widest text-white/30 text-center px-2`}>{data.title}</span>
          <div className="absolute inset-4 border border-white/5 rounded opacity-50" />
        </motion.div>
        <motion.div 
          style={{ translateZ: cardZ, x: useTransform(x, [-0.5, 0.5], [-15, 15]), y: useTransform(y, [-0.5, 0.5], [-15, 15]) }}
          className="absolute bottom-0 left-4 md:left-8 w-2/5 aspect-[2.5/3.5] bg-neutral-800 rounded-md shadow-[20px_20px_30px_rgba(0,0,0,0.8)] border border-white/20 overflow-hidden z-10"
        >
          <img 
            src="" 
            alt="Sample" 
            className="w-full h-full object-cover scale-110 group-hover:scale-100 group-active:scale-100 transition-transform duration-700"
          />
        </motion.div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 relative z-20" style={{ transform: "translateZ(20px)" }}>
        <span style={{ color: data.color }} className={`${outfit.className} text-xs uppercase tracking-[0.2em] font-semibold -mb-2`}>
          {data.cardCount}
        </span>
        <h3 className={`${playfair.className} text-3xl md:text-4xl text-white font-medium`}>
          {data.title}
        </h3>
        <p className={`${outfit.className} text-sm text-white/50 font-light leading-relaxed mb-6 flex-1`}>
          {data.desc}
        </p>
        <button 
          style={{ borderColor: data.color }}
          className={`${outfit.className} self-start border bg-transparent text-white text-xs uppercase tracking-widest font-medium px-6 py-3 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white group-active:bg-white group-active:text-black group-active:border-white`}
        >
          Explore {data.title}
        </button>
      </div>
    </motion.div>
  );
};


const GalleryItem = ({ slide, index }: { slide: any, index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, rotateY: 90, z: -200, scale: 0.8 }}
      animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      transition={{ 
        duration: 0.6, 
        type: "spring", 
        bounce: 0.3,
        delay: index * 0.02 
      }}
      className="w-full aspect-[2.5/3.5] perspective-[1200px]"
    >
      <motion.div 
        className="w-full h-full cursor-pointer relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="absolute inset-0 w-full h-full bg-black/5 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-black/10 overflow-hidden group"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full rounded-xl overflow-hidden relative bg-black">
            <img src={slide.frontImage} alt={slide.title} className="w-full h-full object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 group-active:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 flex items-end p-5">
              <span className={`${outfit.className} text-[10px] tracking-[0.2em] text-white uppercase font-semibold`}>
                {slide.title} (FRONT)
              </span>
            </div>
          </div>
        </div>

        <div 
          className="absolute inset-0 w-full h-full bg-black/5 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-black/10 overflow-hidden group"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-full rounded-xl overflow-hidden relative bg-black">
            <img src={slide.backImage} alt={`${slide.title} Back`} className="w-full h-full object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 group-active:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 flex items-end p-5">
              <span className={`${outfit.className} text-[10px] tracking-[0.2em] text-white uppercase font-semibold`}>
                {slide.title} (BACK)
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CollectionClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const [activeContinent, setActiveContinent] = useState<string | null>(null);

  const handleGlobalMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const activeColor = continentsData.find(c => c.id === activeContinent)?.color ?? "rgba(0,0,0,0.05)";

  const filteredGallery = activeContinent
    ? gallerySlides.filter(slide => slide.continent === activeContinent)
    : gallerySlides;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="w-full relative z-10 overflow-hidden bg-white min-h-screen text-black transition-colors duration-1000"
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-multiply transition-colors duration-1000"
        style={{
          background: useMotionTemplate`radial-gradient(900px circle at ${mouseX}px ${mouseY}px, ${activeColor}, transparent 80%)`
        }}
      />

      <div className="relative z-10 w-full pt-32 pb-24">
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-6 mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className={`${outfit.className} text-[10px] md:text-xs text-black/50 uppercase tracking-[0.4em] font-semibold`}
          >
            GLOBAL ARCHIVE
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
            className={`${playfair.className} text-5xl md:text-7xl font-medium tracking-tight max-w-4xl leading-[1.1]`}
          >
            The Complete Collection.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className={`${outfit.className} text-sm md:text-base text-black/60 font-light max-w-2xl leading-relaxed`}
          >
            Filter by region to explore our entire repository of curated cultural artifacts and visual displays.
          </motion.p>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 flex flex-wrap justify-center gap-3 mb-24">
          <button
            onClick={() => setActiveContinent(null)}
            className={`${outfit.className} px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 border ${
              activeContinent === null 
                ? "bg-black text-white border-black shadow-[0_5px_20px_rgba(0,0,0,0.2)]" 
                : "bg-transparent text-black/70 border-black/20 hover:border-black/50 hover:text-black active:border-black/50 active:text-black"
            }`}
          >
            All
          </button>
          
          {continentsData.map((continent) => {
            const isActive = activeContinent === continent.id;
            return (
              <button
                key={continent.id}
                onClick={() => setActiveContinent(continent.id)}
                style={{ 
                  borderColor: isActive ? continent.color : undefined,
                  backgroundColor: isActive ? continent.color : "transparent",
                  color: isActive ? "#fff" : undefined,
                  boxShadow: isActive ? `0 5px 20px ${continent.color}60` : "none"
                }}
                className={`${outfit.className} px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 border ${
                  !isActive ? "text-black/70 border-black/20 hover:border-black/50 hover:text-black active:border-black/50 active:text-black" : ""
                }`}
              >
                {continent.title}
              </button>
            );
          })}
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {activeContinent === null ? (
              
              <motion.div 
                key="continent-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-16"
              >
                
                <div className="flex flex-col lg:flex-row gap-12 items-center bg-[#fbfaf8] p-8 md:p-12 rounded-3xl border border-black/5 shadow-sm">
                  <div className="w-full lg:w-1/3 flex flex-col space-y-6">
                    <span className={`${outfit.className} text-[10px] md:text-xs text-black/50 uppercase tracking-[0.3em] font-semibold`}>
                      UNDERSTAND IT AT A GLANCE
                    </span>
                    <h2 className={`${playfair.className} text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-black`}>
                      The Direction Guide, front and back.
                    </h2>
                    <p className={`${outfit.className} text-sm md:text-base text-black/70 font-light leading-relaxed`}>
                      The folded guide sits at the front of each continental pack. The first side explains Quick Guess, Discovery Points and Discover Together. The reverse maps the same 15 cultural elements used on every visual and descriptive card.
                    </p>
                  </div>
                  <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-6 justify-center">
                    <div className="flex flex-col gap-4 items-center w-full sm:w-1/2 max-w-[320px]">
                      <div className="w-full aspect-[2.5/3.5] bg-white rounded-xl shadow-xl border border-black/10 overflow-hidden p-2">
                         <img src="/guide-front.jpg" alt="Direction Guide Front" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <span className={`${outfit.className} text-[10px] tracking-[0.2em] text-black/40 uppercase text-center`}>
                        FRONT — HOW TO EXPLORE
                      </span>
                    </div>
                    <div className="flex flex-col gap-4 items-center w-full sm:w-1/2 max-w-[320px]">
                      <div className="w-full aspect-[2.5/3.5] bg-white rounded-xl shadow-xl border border-black/10 overflow-hidden p-2">
                         <img src="/guide-back.jpg" alt="Direction Guide Back" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <span className={`${outfit.className} text-[10px] tracking-[0.2em] text-black/40 uppercase text-center`}>
                        BACK — THE 15-ELEMENT BLUEPRINT
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {continentsData.map((continent) => (
                    <ContinentCard 
                      key={continent.id} 
                      data={continent} 
                      onClick={() => setActiveContinent(continent.id)}
                    />
                  ))}
                </div>

              </motion.div>

            ) : (

              <motion.div 
                key="artifact-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-12 border-b border-black/10 pb-6">
                  <h2 className={`${playfair.className} text-3xl font-medium text-black`}>
                    {continentsData.find(c => c.id === activeContinent)?.title} Artifacts
                  </h2>
                  <span className={`${outfit.className} text-xs text-black/40 uppercase tracking-widest`}>
                    {filteredGallery.length} results
                  </span>
                </div>
                
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                  <AnimatePresence mode="popLayout">
                    {filteredGallery.map((slide, index) => (
                      <GalleryItem key={slide.id} slide={slide} index={index} />
                    ))}
                  </AnimatePresence>
                </motion.div>
                
                {filteredGallery.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                    className="flex flex-col items-center justify-center py-32 text-center"
                  >
                    <p className={`${outfit.className} text-black/40 text-sm tracking-widest uppercase mb-4`}>Archive Empty</p>
                    <p className={`${playfair.className} text-2xl text-black/60 font-light`}>
                      No artifacts currently digitized for this region.
                    </p>
                  </motion.div>
                )}
              </motion.div>

            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}