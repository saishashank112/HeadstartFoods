"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback } from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    rating: 5,
    quote: "The quality of Alphonso mangoes from Headstart Foods is consistently Grade A. Our customers wait for their weekly shipments every season.",
    name: "Sunil S.",
    store: "Fine Foods Mart (Surrey, BC)",
    logo: "FFM",
  },
  {
    rating: 5,
    quote: "Exceptional service and full traceability. Being able to show my customers the CFIA clearance and harvest dates builds immense trust.",
    name: "Anita R.",
    store: "Indo-Canadian Spices (Brampton, ON)",
    logo: "ICS",
  },
  {
    rating: 5,
    quote: "Fastest air-imported mangoes we've ever stocked. The freshness is unbeatable compared to other importers we've used in the past.",
    name: "David K.",
    store: "Global Fruit Wholesalers (Calgary, AB)",
    logo: "GFW",
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="bg-off-white py-16 md:py-24 border-y border-gray-soft overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-h2 text-navy"
            >
              Trusted by <span className="text-primary italic">Canadian Retailers</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              viewport={{ once: true }} 
              className="text-slate text-body-lg max-w-xl opacity-70"
            >
              Hear from the businesses that rely on us for their premium seasonal inventory. 
            </motion.p>
          </div>

          <div className="flex items-center gap-4">
            <button
               onClick={scrollPrev}
               className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white border border-gray-soft text-navy hover:text-primary transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <button
               onClick={scrollNext}
               className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white border border-gray-soft text-navy hover:text-primary transition-all shadow-sm"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                <div className="bg-white rounded-2xl shadow-md border border-gray-soft p-8 h-full flex flex-col justify-between group hover:shadow-lg transition-all duration-base">
                  <div className="space-y-6">
                    <div className="flex gap-1 text-accent-gold">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="italic text-slate text-base md:text-[17px] font-body leading-relaxed opacity-80 group-hover:text-navy transition-colors">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>
                  
                  <div className="mt-10 flex items-center gap-4 border-t border-gray-soft pt-6">
                    <div className="w-12 h-12 rounded-xl bg-navy text-accent-gold flex items-center justify-center font-display font-bold text-sm tracking-widest shrink-0">
                      {testimonial.logo}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-navy text-sm md:text-base">{testimonial.name}</span>
                      <span className="font-body text-xs text-slate opacity-60">{testimonial.store}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
