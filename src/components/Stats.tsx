"use client";

import React, { useEffect, useRef } from "react";
import { Playfair_Display, Outfit } from "next/font/google";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        duration: 2.5,
        ease: "easeOut",
      });
    }
  }, [count, value, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default function Stats() {
  return (
    <section className="bg-white border-t border-black/5 py-24 px-6 md:px-12 w-full z-20 relative">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-black/10 gap-y-16">
        
        <div className="flex flex-col items-center text-center px-4 md:px-8">
          <div className={`${playfair.className} text-6xl md:text-7xl text-black mb-4 tracking-tight`}>
            <AnimatedNumber value={199} />
          </div>
          <span className={`${outfit.className} text-xs md:text-sm text-black/70 tracking-[0.15em] uppercase font-semibold`}>
            CULTURAL CARDS
          </span>
        </div>

        <div className="flex flex-col items-center text-center px-4 md:px-8">
          <div className={`${playfair.className} text-6xl md:text-7xl text-black mb-4 tracking-tight`}>
            <AnimatedNumber value={15} />
          </div>
          <span className={`${outfit.className} text-xs md:text-sm text-black/70 tracking-[0.15em] uppercase font-semibold`}>
            ELEMENTS PER CARD
          </span>
        </div>

        <div className="flex flex-col items-center text-center px-4 md:px-8">
          <div className={`${playfair.className} text-6xl md:text-7xl text-black mb-4 tracking-tight`}>
            <AnimatedNumber value={6} />
          </div>
          <span className={`${outfit.className} text-xs md:text-sm text-black/70 tracking-[0.15em] uppercase font-semibold`}>
            CONTINENTAL PACKS
          </span>
        </div>

      </div>
    </section>
  );
}