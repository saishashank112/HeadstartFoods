"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The consistency in grading is what sets Headstart apart. Every shipment arrives at peak maturity.",
    author: "Surrey Premium Grocers",
    location: "Surrey, BC",
    rating: 5,
    side: "left" as const,
    offsetY: 0,
    depth: 1,
  },
  {
    id: 2,
    quote: "Direct orchard access gives us a massive edge in freshness. Our customers notice the difference immediately.",
    author: "Kitchen Table Specialty",
    location: "Vancouver, BC",
    rating: 5,
    side: "right" as const,
    offsetY: 120,
    depth: 1.2,
  },
  {
    id: 3,
    quote: "Unparalleled logistics. Cold-chain transparency is a game changer for seasonal fruit imports.",
    author: "Ontario Harvest Dist.",
    location: "Mississauga, ON",
    rating: 5,
    side: "left" as const,
    offsetY: 280,
    depth: 0.8,
  },
  {
    id: 4,
    quote: "The best Alphonso mangoes we've ever sourced for our high-end dessert boutiques. Pure excellence.",
    author: "Patisserie Reine",
    location: "Montreal, QC",
    rating: 5,
    side: "right" as const,
    offsetY: 420,
    depth: 1.1,
  },
  {
    id: 5,
    quote: "Reliable, professional, and obsessed with quality. They aren't just suppliers; they are partners.",
    author: "Global Fusion Foods",
    location: "Calgary, AB",
    rating: 5,
    side: "left" as const,
    offsetY: 580,
    depth: 0.9,
  },
];

export default function LivingTrustTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    <section ref={containerRef} className="relative bg-white py-12 md:py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-gold/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-navy/40 font-display font-black text-[9px] uppercase tracking-[0.3em]">
              World-Class Network
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-display font-black text-navy uppercase tracking-tighter leading-[0.85]"
          >
            A Legacy of <br />
            <span className="text-primary italic">Growing Trust</span>
          </motion.h2>
        </div>

        {/* Mobile: Side-by-Side Reviews Grid */}
        <div className="md:hidden grid grid-cols-2 gap-3 pb-24">
          {TESTIMONIALS.slice(0, 4).map((node) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between"
            >
               <Quote className="text-primary/10 w-5 h-5 mb-1" />
               <p className="text-[10px] font-serif text-navy leading-relaxed italic mb-2 line-clamp-4">
                 &quot;{node.quote}&quot;
               </p>
               <div className="flex flex-col">
                  <span className="font-display font-black text-[8px] uppercase tracking-wider text-navy">
                    {node.author.split(' ')[0]}
                  </span>
                  <span className="text-[7px] font-display font-black text-primary uppercase tracking-widest opacity-40">
                    {node.location.split(',')[1]}
                  </span>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: The Tree Structure */}
        <div className="hidden md:block relative max-w-6xl mx-auto h-[800px]">
          {/* Central Trunk (Spine) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 z-0">
            <motion.div
              style={{ scaleY: smoothProgress }}
              className="absolute top-0 left-0 w-full h-full bg-primary origin-top"
            />
          </div>

          {/* Testimonial Nodes & Branches */}
          {TESTIMONIALS.map((node, index) => (
            <TestimonialBranch
              key={node.id}
              node={node}
              index={index}
              globalProgress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialBranch({ node, index, globalProgress }: { node: typeof TESTIMONIALS[0], index: number, globalProgress: MotionValue<number> }) {
  const isLeft = node.side === "left";
  const branchStartFactor = index * 0.12;
  const branchEndFactor = branchStartFactor + 0.18;

  const yParallax = useTransform(globalProgress, [0, 1], [0, node.depth * 120]);
  const branchPathLength = useTransform(globalProgress, [branchStartFactor, branchEndFactor], [0, 1]);

  return (
    <motion.div
      style={{ top: node.offsetY, y: yParallax }}
      className={`absolute w-full h-auto flex items-center z-10 ${isLeft ? "justify-end" : "justify-start"}`}
    >
      <div className={`relative flex items-center ${isLeft ? "flex-row pr-[50%]" : "flex-row-reverse pl-[50%]"}`}>
        
        {/* Branch SVG Connectors - Now with Offset */}
        <svg className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-0 ${isLeft ? "right-[100%] mr-8 w-[140px] md:w-[220px]" : "left-[100%] ml-8 w-[140px] md:w-[220px]"} h-32 overflow-visible`} viewBox="0 0 200 100">
          <motion.path
            d={isLeft ? "M 200,50 Q 140,50 80,40 T 0,10" : "M 0,50 Q 60,50 120,40 T 200,10"}
            fill="none"
            stroke={node.depth < 1 ? "#E2E8F0" : "#fb923c"}
            strokeWidth="1.2"
            strokeDasharray="4 6"
            style={{ pathLength: branchPathLength }}
            className="transition-colors duration-1000 opacity-30"
          />
        </svg>

        {/* Floating Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            y: { repeat: Infinity, duration: 4 + index, ease: "easeInOut" },
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 }
          }}
          className={`group relative max-w-[280px] md:max-w-[340px] p-6 transition-all duration-700 ${isLeft ? "mr-12 md:mr-16" : "ml-12 md:ml-16"} ${
            node.depth < 1 ? "opacity-90 scale-95" : "hover:scale-105"
          }`}
        >
          <div className="relative z-10 space-y-4">
            {/* Author */}
            <div className="flex flex-col mb-4">
              <span className="font-display font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-navy">
                {node.author}
              </span>
              <span className="text-[9px] font-display font-black text-primary uppercase tracking-widest opacity-40">
                {node.location}
              </span>
            </div>

            {/* Quote */}
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 text-primary/10 w-8 h-8 rotate-180" />
              <p className="text-[14px] md:text-[16px] font-serif text-navy leading-relaxed font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                &quot;{node.quote}&quot;
              </p>
            </div>
          </div>

          {/* Glass Layer */}
          <div className="absolute inset-0 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.04)] rounded-[1.5rem] border border-gray-100 group-hover:shadow-[0_50px_100px_rgba(255,140,0,0.12)] group-hover:border-primary/20 transition-all duration-700" />
        </motion.div>
      </div>
    </motion.div>
  );
}
