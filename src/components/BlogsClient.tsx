"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";
import { blogsData, BlogPost } from "../data/blogs";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function BlogsClient() {
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
          JOURNAL AND DISPATCHES
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] max-w-5xl text-black`}
        >
          Stories of global heritage.
        </motion.h1>
      </div>

      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-12 relative z-20 pb-32 grid grid-cols-1 md:grid-cols-3 gap-10">
        {blogsData.map((post: BlogPost, i: number) => (
          <Link key={post.id} href={`/blogs/${post.id}`}>
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col gap-6 group cursor-pointer"
            >
              <div className="w-full h-[320px] rounded-3xl overflow-hidden shadow-xl bg-[#f9f8f6]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className={`${outfit.className} text-xs uppercase tracking-[0.2em] text-[#6d28d9] font-semibold`}>
                    {post.category}
                  </span>
                  <span className={`${outfit.className} text-xs text-black/40`}>
                    {post.date}
                  </span>
                </div>
                <h2 className={`${playfair.className} text-2xl md:text-3xl font-medium text-black group-hover:text-black/70 transition-colors`}>
                  {post.title}
                </h2>
                <p className={`${outfit.className} text-sm md:text-base text-black/70 font-light leading-relaxed`}>
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </main>
  );
}