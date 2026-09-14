"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function ReturnsClient() {
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

      <div className="w-full flex flex-col items-center justify-center text-center px-6 pt-32 pb-12 relative z-10">
        <motion.p 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${outfit.className} text-[10px] md:text-xs text-black/50 uppercase tracking-[0.5em] font-semibold mb-6`}
        >
          CUSTOMER CARE
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] max-w-5xl text-black`}
        >
          Return Policy
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
            01. Eligibility Window
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            We accept returns within 30 days of the original delivery date. To qualify for a complete refund, the continental packs must remain entirely unopened and in their original pristine condition.
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
            02. Initiation Process
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            To begin a return request, please reach out to our support team through the official contact channels. You will receive a designated return authorization number alongside detailed shipping instructions.
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
            03. Refund Processing
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            Once our archive division receives and inspects the returned items, we will process the refund to your original payment method. Please allow up to seven business days for the funds to reflect in your account.
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
            04. Damaged Deliveries
          </h2>
          <p className={`${outfit.className} text-base md:text-lg text-black/70 font-light leading-relaxed`}>
            If your collection arrives damaged, please notify us within 48 hours of delivery. We will arrange a prompt replacement to ensure your visual study experience remains completely uninterrupted.
          </p>
        </motion.div>
      </div>
    </main>
  );
}