"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function TermsClient() {
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

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-white min-h-screen text-black relative overflow-hidden flex flex-col items-center"
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(109, 40, 217, 0.08), transparent 80%)`
        }}
      />

      <div className="w-full flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 relative z-10">
        <motion.p 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${outfit.className} text-[10px] md:text-xs text-black/50 uppercase tracking-[0.5em] font-semibold mb-6`}
        >
          LEGAL FRAMEWORK
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] max-w-5xl text-black`}
        >
          Terms of Service
        </motion.h1>
      </div>

      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 pb-32 flex flex-col gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-medium text-black`}>
            01. Acceptance of Terms
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            By accessing and utilizing this platform, you agree to comply with and be bound by these terms. If you disagree with any portion of these conditions, you must discontinue platform use immediately.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-medium text-black`}>
            02. Intellectual Property
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            All visual assets, typography selections, structural card designs, and proprietary code repositories remain the exclusive property of Authentic Cultural Earth and are protected under international copyright laws.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-medium text-black`}>
            03. User Conduct
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            Users agree not to engage in unauthorized data extraction, reverse engineering, or any activity that compromises platform security or disrupts service availability for other visitors.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-medium text-black`}>
            04. Modifications
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            We reserve the right to modify these terms at any time. Continued platform usage following policy updates constitutes formal acceptance of the revised conditions.
          </p>
        </motion.div>
      </div>
    </main>
  );
}