"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function PrivacyClient() {
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

      <div className="w-full flex flex-col items-center justify-center text-center px-6 pt-35 pb-12 relative z-10">
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
          Privacy Policy
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
            01. Information Collection
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            We collect information you provide directly when placing orders, subscribing to dispatches, or communicating with our team. This data includes names, email addresses, shipping destinations, and correspondence records necessary to fulfill cultural pack deliveries.
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
            02. Utilization of Data
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            Collected details are utilized exclusively to process transactions, dispatch curated cultural updates, and maintain platform security. We do not sell, rent, or trade personal data with external commercial entities under any circumstances.
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
            03. Security Protocols
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            We deploy advanced encryption standards and secure server architecture to safeguard your personal records against unauthorized access, alteration, or disclosure.
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
            04. Contact Inquiries
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            For inquiries regarding personal data retention or privacy practices, please contact our administrative office through official communication channels.
          </p>
        </motion.div>
      </div>
    </main>
  );
}