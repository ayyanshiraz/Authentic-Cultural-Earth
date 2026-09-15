// src/components/CookieBanner.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outfit } from "next/font/google";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function CookieBanner() {
  const [hasConsent, setHasConsent] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("ace_cookie_consent");
    if (!consent) {
      setHasConsent(false);
    }
  }, []);

  const handleConsent = (decision: string) => {
    localStorage.setItem("ace_cookie_consent", decision);
    setHasConsent(true);
  };

  if (hasConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[950px]"
      >
        <div className={`${outfit.className} bg-[#e5e5e5] text-black rounded-[24px] md:rounded-full p-4 md:px-5 md:py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/80 backdrop-blur-2xl`}>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-start">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
              <svg className="w-5 h-5 text-black stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm">
              <span className="font-bold tracking-wider text-black">PRIVACY LOGIC</span>
              <span className="text-black/50 font-light">Technical cookies optimized.</span>
              <Link href="/privacy" className="font-bold text-black hover:opacity-70 transition-opacity">
                Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleConsent("rejected")}
              className="px-7 py-2.5 rounded-full bg-white text-black/60 hover:text-black font-semibold text-xs tracking-widest uppercase transition-all shadow-sm"
            >
              Reject
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleConsent("accepted")}
              className="px-7 py-2.5 rounded-full bg-black text-white font-semibold text-xs tracking-widest uppercase transition-all shadow-md"
            >
              Accept
            </motion.button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}