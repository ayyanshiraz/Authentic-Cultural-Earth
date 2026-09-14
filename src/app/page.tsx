import React from "react";
import { Playfair_Display, Outfit } from "next/font/google";
import Hero from "../components/Hero";
import Stats from "../components/Stats";

import CombinedPresentation from "../components/CombinedPresentation";
import Purpose from "../components/Purpose";
import RotatingEarth from "../components/ui/wireframe-dotted-globe";
import InteractiveSample from "../components/InteractiveSample";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function Page() {
  return (
    <main className="bg-[#050505] min-h-screen flex flex-col">
      <Hero />
      <Stats />
      
      <CombinedPresentation />
      <Purpose />
      
      {/* Integrated Globe Section */}
      <section className="bg-[#050505] py-32 w-full relative z-20 flex flex-col items-center border-t border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="col-span-1 lg:col-span-5 flex flex-col space-y-8 lg:pr-8 z-10">
            <div className="flex flex-col space-y-4">
              <span className={`${outfit.className} text-[10px] md:text-xs text-white/50 uppercase tracking-[0.4em] font-semibold`}>
                INTERACTIVE TOPOLOGY
              </span>
              <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.1]`}>
                A Global Perspective
              </h2>
            </div>
            
            <p className={`${outfit.className} text-white/50 text-base md:text-lg font-light leading-relaxed max-w-md`}>
              Interact with the wireframe topology to visualize the geographic interconnectedness of the 199 cultural profiles included in the collection. Search specific regions to see them illuminated on the digital mapping interface.
            </p>

            <div className="flex flex-col space-y-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-6">
                <span className={`${playfair.className} text-4xl text-white w-16`}>199</span>
                <span className={`${outfit.className} text-xs uppercase tracking-[0.2em] text-white/40 font-semibold leading-relaxed`}>
                  Nations <br />Documented
                </span>
              </div>
              
              <div className="flex items-center gap-6">
                <span className={`${playfair.className} text-4xl text-white w-16`}>15</span>
                <span className={`${outfit.className} text-xs uppercase tracking-[0.2em] text-white/40 font-semibold leading-relaxed`}>
                  Shared Cultural <br />Elements
                </span>
              </div>
            </div>
          </div>

          {/* Right Globe Column */}
          <div className="col-span-1 lg:col-span-7 relative flex justify-center lg:justify-end items-center">
            {/* Subtle Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative w-full max-w-[800px] flex justify-center">
              <RotatingEarth className="w-full h-auto" width={800} height={800} />
            </div>
          </div>
          
        </div>
      </section>

      <InteractiveSample />
    </main>
  );
}