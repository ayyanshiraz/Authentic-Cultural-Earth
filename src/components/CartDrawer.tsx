import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, CartItem } from "../../store/cartStore";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity } = useCartStore();

  const totalAmount = items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#050505] border-l border-white/10 z-[210] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className={`${playfair.className} text-2xl text-white`}>Your Selection</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white">
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <p className={`${outfit.className} text-white/50 text-center mt-12`}>No collections added yet.</p>
              ) : (
                items.map((item: CartItem) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-20 h-24 bg-white/5 rounded-lg overflow-hidden shrink-0">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`${outfit.className} text-sm text-white font-medium`}>{item.title}</h3>
                      <p className={`${outfit.className} text-xs text-white/50 mb-2`}>${item.price} USD</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))} className="text-white/50 hover:text-white">-</button>
                        <span className={`${outfit.className} text-sm text-white`}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white/50 hover:text-white">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
              <div className="flex justify-between items-center mb-6">
                <span className={`${outfit.className} text-sm text-white/50 uppercase tracking-widest`}>Subtotal</span>
                <span className={`${playfair.className} text-2xl text-white`}>${totalAmount}</span>
              </div>
              <Link 
                href="/checkout"
                onClick={onClose}
                className={`${outfit.className} w-full block text-center bg-white text-black py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors`}
              >
                Proceed to Secure Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}