"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const faqs = [
  {
    question: "What is Authentic Cultural Earth?",
    answer: "It is a premium visual cultural discovery collection bringing together cinematic art and cultural knowledge across 199 cards."
  },
  {
    question: "How many elements are on each card?",
    answer: "There are 15 connected cultural elements on every single card to explore."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we dispatch our continental packs to worldwide destinations."
  },
  {
    question: "What is included in a continental pack?",
    answer: "Each pack contains full visual and descriptive cultural cards along with a direction guide."
  },
  {
    question: "What materials are used for the cultural cards?",
    answer: "Our cards are crafted from premium, heavy-weight archival paper with a matte finish to ensure durability and prevent glare during visual study."
  },
  {
    question: "How long does shipping usually take?",
    answer: "Domestic orders typically arrive within 3-5 business days, while international shipping can take between 10-14 business days depending on the destination and customs processing."
  },
  {
    question: "Can these cards be used for educational purposes?",
    answer: "Absolutely. Many educators and institutions utilize our collection as a tactile learning tool to teach global heritage, geography, and cultural interconnectedness."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of delivery, provided the continental packs remain unopened and in their original pristine condition."
  },
  {
    question: "Are digital versions of the cards available?",
    answer: "Currently, we focus exclusively on the physical, tactile experience of the cards to maintain the authenticity of the artwork and do not offer digital downloads."
  }
];

export default function FaqsClient() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-white min-h-screen text-black relative overflow-hidden flex flex-col items-center pt-32 pb-24"
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(109, 40, 217, 0.08), transparent 80%)`
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-4 mb-16"
        >
          <p className={`${outfit.className} text-[10px] md:text-xs text-black/50 uppercase tracking-[0.4em] font-semibold`}>
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h1 className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]`}>
            Answers to common inquiries.
          </h1>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="w-full bg-black border border-white/10 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                >
                  <h3 className={`${playfair.className} text-xl md:text-2xl text-white font-medium pr-8 group-hover:text-white/70 transition-colors`}>
                    {faq.question}
                  </h3>
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <motion.span
                      animate={{ rotate: isActive ? 180 : 0, opacity: isActive ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-4 h-[2px] bg-white/50"
                    />
                    <motion.span
                      animate={{ rotate: isActive ? 180 : 90 }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-4 h-[2px] bg-white/50"
                    />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-white border-t border-black/10"
                    >
                      <div className="px-6 md:px-8 py-6 md:py-8">
                        <p className={`${outfit.className} text-base md:text-lg text-black/80 font-light leading-relaxed`}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}