"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";
import { useCartStore } from "../../store/cartStore";
import CartDrawer from "./CartDrawer";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Collection", href: "/collection" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "FAQs", href: "/faqs" },
];

export default function Navbar() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { items } = useCartStore();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center w-full pointer-events-none">
        <nav className="pointer-events-auto w-[min(90vw,1200px)] bg-[#050505] rounded-[24px] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden flex items-center h-[60px] px-2 backdrop-blur-xl relative z-50">
          <div className="flex items-center justify-between w-full h-full px-2">
            
            <div className="flex items-center justify-center h-full w-[44px] shrink-0">
              <Link href="/" className="flex items-center justify-center">
                <Image 
                  src="/your-logo.png" 
                  alt="Brand Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center justify-end md:justify-between flex-1 pl-2 md:pl-4 pr-0 md:pr-2">
              <div className={`${outfit.className} text-white text-[10px] tracking-[0.25em] font-medium uppercase hidden md:block shrink-0`}>
                Authentic Cultural Earth
              </div>

              <div className="hidden lg:flex items-center gap-2 relative" onMouseLeave={() => setHoveredTab(null)}>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredTab(link.name)}
                    className="relative px-4 py-2 z-10"
                  >
                    <span className={`${outfit.className} text-xs tracking-widest uppercase transition-colors duration-300 relative z-20 ${hoveredTab === link.name ? "text-white" : "text-white/80"}`}>
                      {link.name}
                    </span>
                    {hoveredTab === link.name && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-full z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2 md:gap-4 shrink-0">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(true)}
                  className={`${outfit.className} text-white text-[10px] tracking-[0.2em] uppercase bg-white/5 border border-white/10 rounded-full px-3 md:px-5 py-2 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm`}
                >
                  Cart
                  <span className="bg-white text-black rounded-full px-2 py-0.5 font-bold flex items-center justify-center min-w-[20px] h-[20px]">
                    {totalItems}
                  </span>
                </motion.button>

                <Link href="/shop" passHref className="hidden sm:block">
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "rgba(0,0,0,1)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`${outfit.className} text-white text-[10px] tracking-[0.2em] uppercase border border-white/20 rounded-full px-4 md:px-6 py-2 transition-colors duration-300 bg-transparent cursor-pointer`}
                  >
                    Shop Now
                  </motion.button>
                </Link>

                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden text-white p-1 ml-1"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {isMobileMenuOpen ? (
                      <>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </>
                    ) : (
                      <>
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pointer-events-auto absolute top-[70px] w-[min(90vw,1200px)] bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-[24px] p-4 flex flex-col gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.4)] lg:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${outfit.className} text-white text-sm tracking-widest uppercase py-3 px-4 text-center hover:bg-white/10 rounded-full transition-colors`}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/shop" passHref className="sm:hidden w-full">
                <button className={`${outfit.className} w-full text-black text-sm tracking-widest uppercase bg-white rounded-full py-3 px-4 transition-colors duration-300 mt-2`}>
                  Shop Now
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}