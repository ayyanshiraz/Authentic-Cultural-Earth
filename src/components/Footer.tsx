"use client";

import React, { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

function MagneticWrapper({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  const springX = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.4);
    position.y.set(middleY * 0.4);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="relative flex items-center justify-center p-2"
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const spotlightX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const logoRotateX = useTransform(spotlightY, [0, 800], [15, -15]);
  const logoRotateY = useTransform(spotlightX, [0, 1400], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-[#030303] text-white pt-32 pb-16 relative z-50 overflow-hidden border-t border-white/10"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(139, 92, 246, 0.15), transparent 80%)`
        }}
      />

      <div className="absolute bottom-0 right-[-10%] pointer-events-none select-none z-0 opacity-[0.03]">
        <motion.span 
          style={{ x: useTransform(spotlightX, [0, 1400], [-30, 30]) }}
          className={`${playfair.className} text-[40vw] font-bold leading-none block`}
        >
          ACE
        </motion.span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
        
        <div className="lg:col-span-4 flex flex-col items-start space-y-8 perspective-[1000px]">
          <motion.div style={{ rotateX: logoRotateX, rotateY: logoRotateY, transformStyle: "preserve-3d" }}>
            <Link href="/" className={`${playfair.className} text-6xl font-semibold tracking-wider inline-block origin-center`}>
              W
            </Link>
          </motion.div>
          <div className="space-y-3">
            <h3 className={`${outfit.className} text-xs uppercase tracking-[0.5em] font-semibold text-white/90`}>
              Authentic Cultural Earth
            </h3>
            <p className={`${outfit.className} text-sm text-white/50 font-light leading-relaxed max-w-sm`}>
              Bridging academic geography and artistic exploration. We transform global heritage into living visual systems designed for the modern era.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h4 className={`${outfit.className} text-xs uppercase tracking-[0.3em] font-semibold text-white/40 mb-2`}>
            Quick Links
          </h4>
          {[
            { label: "About", path: "/about" },
            { label: "Collection", path: "/collection" },
            { label: "Contact Us", path: "/contact-us" },
            { label: "Blogs", path: "/blogs" },
            { label: "FAQs", path: "/faqs" }
          ].map((link) => (
            <Link key={link.label} href={link.path} className={`${outfit.className} text-sm text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2.5 group w-max`}>
              <motion.svg whileHover={{ x: 5 }} className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </motion.svg>
              <span className="group-hover:translate-x-1 transition-transform duration-300 block">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h4 className={`${outfit.className} text-xs uppercase tracking-[0.3em] font-semibold text-white/40 mb-2`}>
            Customer Care
          </h4>
          {[
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Terms of Service", path: "/terms" },
            { label: "Return Policy", path: "/returns" }
          ].map((link) => (
            <Link key={link.label} href={link.path} className={`${outfit.className} text-sm text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2.5 group w-max`}>
              <motion.svg whileHover={{ x: 5 }} className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </motion.svg>
              <span className="group-hover:translate-x-1 transition-transform duration-300 block">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="lg:col-span-4 flex flex-col space-y-6">
          <h4 className={`${outfit.className} text-xs uppercase tracking-[0.3em] font-semibold text-white/40`}>
            Join the Dispatch
          </h4>
          <p className={`${outfit.className} text-sm text-white/60 font-light leading-relaxed`}>
            Receive curated cultural dispatches, scholarly breakdowns, and priority release notices.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
            <motion.div whileFocus={{ scale: 1.02 }} className="relative overflow-hidden rounded-full p-[1px] bg-gradient-to-r from-white/25 via-purple-500/50 to-white/25 transition-transform duration-300 group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`${outfit.className} w-full bg-[#0a0a0a] rounded-full px-6 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:bg-[#111111] transition-colors`}
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#000000" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`${outfit.className} w-full bg-white/10 text-white border border-white/20 font-medium py-4 rounded-full text-xs uppercase tracking-[0.3em] transition-all duration-300`}
            >
              {subscribed ? "Subscribed successfully" : "Subscribe"}
            </motion.button>
          </form>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className={`${outfit.className} text-[10px] text-white/30 uppercase tracking-[0.25em]`}>
          2026 Authentic Cultural Earth - All rights reserved
        </p>
        <div className="flex items-center gap-2">
          <MagneticWrapper>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current pointer-events-none" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5 fill-current pointer-events-none" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-current pointer-events-none" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </MagneticWrapper>
        </div>
      </div>
    </footer>
  );
}