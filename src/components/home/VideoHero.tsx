"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface VideoSlide {
  id: number;
  url: string;
  title: string;
  subtitle: string;
  accent: string;
}

const VIDEO_SLIDES: VideoSlide[] = [
  {
    id: 1,
    url: "/videos/Premium_Mango_Commercial_Video.mp4",
    title: "Orchard to Doorstep.",
    subtitle: "Experience the ultimate B2B gateway for India's finest seasonal exports. Cold-chain fresh, weekly air-imported.",
    accent: "The Heritage Collection"
  },
  {
    id: 2,
    url: "/videos/Premium_Mango_Video_Generation.mp4",
    title: "Taste the Sunshine.",
    subtitle: "Premium Grade A Alphonso and Kesar mangoes, curated from the heart of Indian orchards for the Canadian palate.",
    accent: "Seasonal Perfection"
  }
];

export default function VideoHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % VIDEO_SLIDES.length);
    }, 8000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-navy">
      {/* Background Videos (Layered for Gapless Transition) */}
      <div className="absolute inset-0 w-full h-full">
        {VIDEO_SLIDES.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-110 transform-gpu"
            >
              <source src={slide.url} type="video/mp4" />
            </video>
          </motion.div>
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/70 z-[1]" />
      <div className="absolute inset-0 bg-black/10 z-[1]" />

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center z-10">
        {VIDEO_SLIDES.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6 max-w-4xl"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-primary" />
                <span className="text-[10px] md:text-xs font-display font-black uppercase tracking-[0.4em] text-primary">
                  {slide.accent}
                </span>
                <div className="h-[1px] w-8 bg-primary" />
              </div>

              <h1 className="text-5xl md:text-8xl font-display font-black text-white leading-[0.95] uppercase tracking-tighter">
                {slide.title.split(" ").map((word, i) => (
                  <span key={i} className={word === "Sunshine." || word === "Doorstep." ? "text-primary italic block md:inline" : "block md:inline"}>
                    {word}{" "}
                  </span>
                ))}
              </h1>

              <p className="text-sm md:text-lg font-body text-white/70 max-w-xl mx-auto leading-relaxed font-medium">
                {slide.subtitle}
              </p>

              <div className="pt-10 flex flex-wrap items-center justify-center gap-6">
                <Link
                  href="/products"
                  className="group relative px-10 h-16 bg-primary text-white rounded-full font-display font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Harvest <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>

                <Link
                   href="/wholesale"
                   className="h-16 px-10 rounded-full border border-white/20 backdrop-blur-md text-white font-display font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:text-navy transition-all active:scale-95"
                >
                  Wholesale Gateway
                </Link>
              </div>
            </motion.div>
          )
        ))}
      </div>

      {/* Visual Indicators */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-10">
        {VIDEO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              currentSlide === i ? "w-12 bg-primary" : "w-6 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Side Decorative elements */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 z-10">
         <div className="rotate-90 origin-left text-[10px] font-display font-black text-white/20 uppercase tracking-[0.5em] whitespace-nowrap">
            EST. 2026 / PREMIO QUALITY
         </div>
      </div>
    </section>
  );
}
