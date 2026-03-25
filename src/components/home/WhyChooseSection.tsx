"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Sparkles, MapPin } from "lucide-react";
import Image from "next/image";

const PILLARS = [
  {
    icon: Sparkles,
    title: "Grade A Only",
    body: "We only source the finest seasonal fruits from vetted orchards in India's most renowned growing regions.",
    image: "/home/trust-1.png"
  },
  {
    icon: Truck,
    title: "Freshness Gate",
    body: "Weekly air-imported shipments ensure your mangoes go from tree to your table in record time.",
    image: "/home/trust-2.png"
  },
  {
    icon: ShieldCheck,
    title: "CFIA Licensed",
    body: "Operating as a fully licensed Canadian importer, meeting rigorous food safety and traceability standards.",
    image: "/home/trust-3.png"
  },
  {
    icon: MapPin,
    title: "Pan-Canada",
    body: "Fast and reliable shipping across BC, AB, MB, ON, and QC with optimized cold-chain logistics.",
    image: "/home/trust-4.png"
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 space-y-4"
        >
          <h2 className="text-5xl md:text-7xl font-display font-black text-navy uppercase tracking-tighter leading-none">
            Why Canada Trusts <span className="text-primary italic">Headstart Foods</span>
          </h2>
          <p className="text-slate text-sm font-body max-w-2xl mx-auto opacity-50 font-medium tracking-wide">
            Uncompromising standards, certified safety, and an obsession with quality at every step of the supply chain.
          </p>
        </motion.div>

        {/* Desktop Grid / Mobile Slideshow Container */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative min-w-[85vw] md:min-w-0 aspect-[1.2/1] rounded-[2rem] overflow-hidden group border border-gray-100 shadow-xl snap-center"
            >
              {/* Background Image */}
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                className="object-cover transition-transform duration-slow group-hover:scale-110"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/20 group-hover:backdrop-blur-[2px] transition-all" />

              {/* Content (Visible Always) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                 <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary mb-6 transition-all group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    <pillar.icon size={22} />
                 </div>
                 
                 <h3 className="font-display font-black text-2xl uppercase tracking-tight mb-3 transition-transform group-hover:-translate-y-2">
                   {pillar.title}
                 </h3>

                 {/* Hover Text (Reveals) */}
                 <div className="h-0 opacity-0 md:group-hover:h-auto md:group-hover:opacity-100 overflow-hidden transition-all duration-500">
                    <p className="text-[13px] font-body text-white/70 leading-relaxed font-medium">
                      {pillar.body}
                    </p>
                 </div>
                 
                 {/* Mobile Always Semi-visible Text */}
                 <div className="md:hidden">
                    <p className="text-[11px] font-body text-white/60 leading-relaxed font-medium line-clamp-2">
                       {pillar.body}
                    </p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
