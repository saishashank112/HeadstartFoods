"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

export default function MangoSeasonUnlock() {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setUnlocked(true);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden py-12 bg-[#FEFBF6]"
    >
      {/* Ethereal Background Gradient */}
      <motion.div
        animate={{
          background: "radial-gradient(circle at center, #FFF9EA 0%, #FEFBF6 100%)",
        }}
        className="absolute inset-0 z-0"
      />

      {/* Atmospheric Breathing Effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-[#FFF4DE]/20 via-transparent to-[#FFF9EA]/30 z-1 pointer-events-none"
      />

      {/* Museum-Grade Particles (Light Dust) */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 800,
              opacity: Math.random() * 0.2
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-[2px] h-[2px] bg-primary/20 rounded-full blur-[0.5px]"
          />
        ))}

        {/* Soft Horizontal Shimmer */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/5 to-transparent -rotate-3"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="subscription"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{
                opacity: 1,
                scale: focused ? 1.01 : 1,
                y: [0, -4, 0]
              }}
              transition={{
                opacity: { duration: 1 },
                scale: { duration: 0.6, ease: "easeOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
              className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-8"
            >
              {/* Headline - Elegant & Breathable */}
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, letterSpacing: "0.2em" }}
                  animate={{ opacity: 0.3, letterSpacing: "0.2em" }}
                  className="block text-[9px] md:text-[11px] font-display font-black uppercase text-navy/60"
                >
                  The Wait Transforms
                </motion.span>
                <h2 className="text-3xl md:text-8xl font-display font-black text-navy uppercase tracking-tighter leading-none">
                  THE <span className="text-primary italic">ANTICIPATION</span>
                </h2>
                <p className="text-navy/40 text-xs md:text-sm font-body max-w-lg mx-auto font-medium tracking-wide uppercase leading-relaxed">
                  The first air-imported harvest is nearing its peak. <br />
                  Secure your access to the limited seasonal allocation.
                </p>
              </div>

              {/* Seamless Pill UI */}
              <div className="relative w-full max-w-lg mx-auto">
                <motion.div
                  className={`relative p-1.5 rounded-full bg-white transition-all duration-700 ${focused
                      ? "shadow-[0_30px_60px_rgba(255,140,0,0.08)] scale-[1.02]"
                      : "shadow-[0_15px_40px_rgba(0,0,0,0.03)]"
                    }`}
                >
                  <form onSubmit={handleUnlock} className="flex items-center">
                    <input
                      type="email"
                      required
                      value={email}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email to unlock the season"
                      className="flex-1 bg-transparent border-none outline-none px-8 py-3 text-navy font-body text-sm md:text-base placeholder:text-navy/20 focus:ring-0"
                    />

                    {/* Embedded Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="relative h-12 md:h-14 px-8 bg-gradient-to-r from-primary to-[#FFB300] text-white rounded-full font-display font-black uppercase tracking-[0.25em] text-[10px] shadow-lg shadow-primary/10 overflow-hidden group transition-all"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Unlock <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      />
                    </motion.button>
                  </form>
                </motion.div>

                {/* Interaction Glow */}
                {focused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -inset-10 bg-primary/5 blur-[80px] -z-10 rounded-full"
                  />
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="activated"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-primary/10">
                <Sparkles className="text-primary w-6 h-6 animate-pulse" />
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-display font-black text-navy uppercase tracking-tighter">
                  SEASON <span className="text-primary italic">ACTIVATED</span>
                </h2>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-primary font-display font-black text-[11px] md:text-[13px] uppercase tracking-[0.4em]">
                    Access Granted.
                  </p>
                  <p className="text-navy/20 font-body text-[10px] font-black uppercase tracking-widest leading-none">
                    You are on the premier allocation list.
                  </p>
                </div>
              </div>

              {/* Light Ripple Wave Effect */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 m-auto w-32 h-32 border border-primary/10 rounded-full pointer-events-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
