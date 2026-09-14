"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";
import { BlogPost } from "../data/blogs";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function BlogDetailClient({ post }: { post: BlogPost }) {
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

      <div className="w-full max-w-[900px] mx-auto px-6 pt-32 pb-16 relative z-10 flex flex-col items-start">
        <Link href="/blogs" className={`${outfit.className} text-xs uppercase tracking-[0.3em] text-black/50 hover:text-black mb-8 flex items-center gap-2 group transition-colors`}>
          <span className="text-black/30 group-hover:text-black transition-colors">&lt;</span> Back to Journal
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <span className={`${outfit.className} text-xs uppercase tracking-[0.2em] text-[#6d28d9] font-semibold`}>
            {post.category}
          </span>
          <span className={`${outfit.className} text-xs text-black/40`}>
            {post.date}
          </span>
        </div>

        <h1 className={`${playfair.className} text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-12 text-black`}>
          {post.title}
        </h1>

        <div className="w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl mb-16 bg-[#f9f8f6]">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-8 w-full pb-32">
          {post.content.map((paragraph: string, index: number) => (
            <p key={index} className={`${outfit.className} text-lg md:text-xl text-black/75 font-light leading-relaxed`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}