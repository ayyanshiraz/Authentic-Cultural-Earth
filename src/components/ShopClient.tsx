"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";
import { useCartStore } from "../../store/cartStore";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

type Product = {
  id: string;
  title: string;
  price: number;
  heroImage: string;
  quote: string;
  paragraphs: string[];
  gridImages: string[];
};

export default function ShopClient({ products }: { products: Product[] }) {
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.heroImage,
      quantity: 1
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <main className="bg-white min-h-screen text-black pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto selection:bg-black selection:text-white">
      
      {/* Intro Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-32 border-b border-black/10 pb-16">
        <p className={`${outfit.className} text-[10px] md:text-xs text-black/40 uppercase tracking-[0.4em] font-bold`}>
          SECURE ACQUISITION
        </p>
        <h1 className={`${playfair.className} text-5xl md:text-7xl font-medium tracking-tight text-black leading-none`}>
          Procure the Archive.
        </h1>
        <p className={`${outfit.className} text-sm text-black/50 font-light max-w-lg mt-6 leading-relaxed`}>
          Scroll to explore the Master Archive and individual continental collections. Add directly to your acquisition queue.
        </p>
      </div>

      {/* Product List */}
      <div className="flex flex-col space-y-40">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col w-full">
            
            {/* Top Section: Hero Image & Controls */}
            <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[70vh] gap-8 mb-24">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-[70%] h-[50vh] lg:h-full relative overflow-hidden bg-[#f5f5f5]"
              >
                <img
                  src={product.heroImage}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-[30%] flex flex-col justify-between py-4 lg:py-12 pl-0 lg:pl-8"
              >
                <div className="flex flex-col items-end text-right space-y-4">
                  <span className={`${outfit.className} text-[10px] tracking-[0.4em] uppercase font-bold text-black/50`}>
                    AUTHENTIC COLLECTION
                  </span>
                  <h2 className={`${outfit.className} text-3xl md:text-4xl uppercase tracking-[0.2em] font-medium`}>
                    {product.title}
                  </h2>
                  <span className={`${playfair.className} text-2xl text-black/70 italic`}>
                    ${product.price} USD
                  </span>
                </div>

                <div className="flex flex-col items-end mt-12 lg:mt-0 w-full space-y-6">
                  <div className="w-full h-px bg-black/10 hidden lg:block" />
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`${outfit.className} w-full lg:w-auto border border-black text-black hover:bg-black hover:text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] transition-colors cursor-pointer`}
                  >
                    {addedId === product.id ? "ADDED TO CART" : "ACQUIRE NOW"}
                  </button>
                </div>
              </motion.div>

            </div>

            {/* Bottom Section: Details & Grid */}
            <div className="flex flex-col lg:flex-row w-full gap-12 lg:gap-8">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-[40%] flex flex-col pr-0 lg:pr-12"
              >
                <h3 className={`${outfit.className} text-xl md:text-2xl uppercase tracking-[0.3em] mb-10 font-medium`}>
                  A VISUAL JOURNEY
                </h3>
                <div className="flex flex-col space-y-6">
                  {product.paragraphs.map((para, i) => (
                    <p key={i} className={`${outfit.className} text-[13px] md:text-sm text-black/80 font-light leading-loose uppercase tracking-wide text-justify`}>
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>

              <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#050505] text-white flex items-center justify-center p-12 aspect-square"
                >
                  <h4 className={`${outfit.className} text-xl md:text-2xl uppercase tracking-[0.3em] leading-loose text-center font-medium`}>
                    {product.quote}
                  </h4>
                </motion.div>

                {product.gridImages.map((imgUrl, i) => (
                  <motion.div
                    key={`${product.id}-img-${i}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
                    className="w-full aspect-square bg-[#f5f5f5]"
                  >
                    <img src={imgUrl} alt="Detail" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
                
              </div>

            </div>

            {/* Section Divider */}
            <div className="w-full h-px bg-black/10 mt-32" />
          </div>
        ))}
      </div>

    </main>
  );
}