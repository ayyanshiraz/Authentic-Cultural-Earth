"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
};

type OrderData = {
  id: string;
  firstName: string;
  lastName: string;
  customerEmail: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
};

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Call the hook here, BEFORE any early returns
  const backgroundTemplate = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(109, 40, 217, 0.08), transparent 80%)`;
  
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setOrder(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
    
    return () => {
      document.body.style.backgroundColor = "#050505";
    };
  }, [orderId]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <p className={`${outfit.className} text-xs uppercase tracking-[0.3em] text-black/50`}>
          Retrieving Archive Record...
        </p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <p className={`${outfit.className} text-xs uppercase tracking-[0.3em] text-black/50`}>
          Record Not Found
        </p>
      </main>
    );
  }

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-white min-h-screen text-black relative overflow-hidden flex flex-col items-center pt-32 pb-24"
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{ background: backgroundTemplate }}
      />

      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-4 mb-16 border-b border-black/10 pb-16 w-full"
        >
          <p className={`${outfit.className} text-[10px] md:text-xs text-black/50 uppercase tracking-[0.4em] font-semibold`}>
            SECURE ACQUISITION COMPLETE
          </p>
          <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]`}>
            Archive Confirmed.
          </h1>
          <p className={`${outfit.className} text-sm text-black/60 font-light mt-4`}>
            Transaction Identifier: {order.id}
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-12"
          >
            <div className="flex flex-col space-y-4">
              <span className={`${outfit.className} text-xs uppercase tracking-[0.2em] text-black font-semibold`}>
                Live Fulfillment Status
              </span>
              <div className="bg-[#fbfaf8] border border-black/10 rounded-2xl p-6 shadow-sm">
                <p className={`${playfair.className} text-xl text-black`}>
                  {order.status.replace(/_/g, " ")}
                </p>
                <p className={`${outfit.className} text-sm text-black/50 font-light mt-2`}>
                  Your cultural packs are currently being prepared for dispatch.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <span className={`${outfit.className} text-xs uppercase tracking-[0.2em] text-black font-semibold`}>
                Shipping Destination
              </span>
              <div className="flex flex-col space-y-1">
                <p className={`${playfair.className} text-lg text-black`}>
                  {order.firstName} {order.lastName}
                </p>
                <p className={`${outfit.className} text-sm text-black/70 font-light leading-relaxed`}>
                  {order.address1} <br />
                  {order.address2 && <>{order.address2} <br /></>}
                  {order.city}, {order.state} {order.zip} <br />
                  {order.country}
                </p>
                <p className={`${outfit.className} text-sm text-black/50 font-light mt-4`}>
                  Receipt dispatched to {order.customerEmail}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col space-y-6 bg-[#fbfaf8] border border-black/10 rounded-3xl p-8 shadow-xl"
          >
            <span className={`${outfit.className} text-xs uppercase tracking-[0.2em] text-black font-semibold mb-2`}>
              Acquisition Summary
            </span>
            
            <div className="flex flex-col space-y-4 flex-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-black/5 pb-4 last:border-0">
                  <div className="flex flex-col">
                    <span className={`${outfit.className} text-sm font-medium text-black`}>
                      Product ID: {item.productId}
                    </span>
                    <span className={`${outfit.className} text-xs text-black/50`}>
                      Quantity: {item.quantity}
                    </span>
                  </div>
                  <span className={`${playfair.className} text-lg text-black`}>
                    ${item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-black/10 mt-auto">
              <span className={`${outfit.className} text-xs uppercase tracking-[0.2em] text-black font-semibold`}>
                Total Value
              </span>
              <span className={`${playfair.className} text-3xl text-black`}>
                ${order.totalAmount} USD
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}