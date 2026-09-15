"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const MagneticWord = ({ children }: { children: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 10 });
  const springY = useSpring(y, { stiffness: 100, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - rect.left - rect.width / 2;
    const cursorY = e.clientY - rect.top - rect.height / 2;
    x.set(cursorX * 0.3);
    y.set(cursorY * 0.3);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.touches[0].clientX - rect.left - rect.width / 2;
    const cursorY = e.touches[0].clientY - rect.top - rect.height / 2;
    x.set(cursorX * 0.3);
    y.set(cursorY * 0.3);
  };

  return (
    <motion.span
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onTouchEnd={() => { x.set(0); y.set(0); }}
      className="origin-center hover:text-black/60 active:text-black/60 transition-colors duration-300 cursor-crosshair"
    >
      {children}&nbsp;
    </motion.span>
  );
};

export default function AboutClient() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.backgroundColor = "#050505";
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.touches[0].clientX - rect.left);
    mouseY.set(e.touches[0].clientY - rect.top);
  };

  const headline = "Curating the essence of global heritage.".split(" ");

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="bg-white min-h-screen text-black relative overflow-hidden flex flex-col items-center"
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(109, 40, 217, 0.08), transparent 80%)`
        }}
      />

      <div className="w-full flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-24 pb-16 relative z-10">
        <motion.p 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${outfit.className} text-[10px] md:text-xs text-black/50 uppercase tracking-[0.5em] font-semibold mb-6`}
        >
          OUR STORY
        </motion.p>

        <h1 className={`${playfair.className} text-4xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] max-w-5xl flex flex-wrap justify-center text-black`}>
          {headline.map((word, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, type: "spring", bounce: 0.4 }}
            >
              <MagneticWord>{word}</MagneticWord>
            </motion.div>
          ))}
        </h1>
      </div>

      <section className="w-full py-12 md:py-20 px-6 md:px-12 relative z-20">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
            className="w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="" 
              alt="The Vision" 
              className="w-full h-full object-cover hover:scale-105 active:scale-105 transition-transform duration-700"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <span className={`${outfit.className} text-xs tracking-[0.2em] text-black/40 uppercase block`}>01. Architecture</span>
            <h2 className={`${playfair.className} text-4xl md:text-6xl font-medium text-black`}>
              The Vision
            </h2>
            <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
              Authentic Cultural Earth was founded on a singular premise to transform vast cultural knowledge into tactile visual experiences. We bridge the gap between academic geography and artistic exploration, utilizing deep structural aesthetics.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 px-6 md:px-12 relative z-20 bg-[#fbfaf8]">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 order-2 md:order-1"
          >
            <span className={`${outfit.className} text-xs tracking-[0.2em] text-black/40 uppercase block`}>02. Synthesis</span>
            <h2 className={`${playfair.className} text-4xl md:text-6xl font-medium text-black`}>
              The Process
            </h2>
            <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
              Every element undergoes rigorous research to ensure accurate representation. From mythological symbols to architectural marvels, we synthesize detailed global attributes into stunning cohesive designs mapped across multiple dimensions.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
            className="w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2"
          >
            <img 
              src="" 
              alt="The Process" 
              className="w-full h-full object-cover hover:scale-105 active:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}