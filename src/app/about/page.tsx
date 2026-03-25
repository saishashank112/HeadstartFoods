import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About Headstart Foods | Canada's Premium Mango Importer",
  description: "Learn about Headstart Foods - our mission to bring India's finest mangoes to Canada, our commitment to quality, and our journey as a premium importer.",
};

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* SECTION 1 — HERO */}
      <section className="bg-[#F7F7F2] pt-20 pb-15 md:pt-28 md:pb-24 px-4 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <span className="inline-block font-inter font-semibold text-[12px] text-[#FF8C00] tracking-[0.1em] uppercase mb-4">
            OUR STORY
          </span>
          <h1 className="font-dm-sans font-bold text-[calc(28px+1.5vw)] md:text-[48px] text-[#1A1A2E] leading-tight max-w-[700px]">
            Canada&apos;s Most Trusted Premium Mango Importer
          </h1>
          <p className="font-inter font-normal text-[16px] md:text-[18px] text-[#2D3748] leading-[1.7] max-w-[640px] mt-6">
            Headstart Foods Inc. was founded with a single mission — to bring the world&apos;s finest mangoes directly from India&apos;s premium orchards to Canadian tables. Based in Surrey, British Columbia, we combine deep agricultural expertise with rigorous food safety compliance to deliver an unmatched premium experience.
          </p>

          <div className="flex flex-wrap gap-8 md:gap-12 mt-12">
            <div className="flex flex-col">
              <span className="font-dm-sans font-bold text-[32px] md:text-[48px] text-[#FF8C00] leading-none">50+</span>
              <span className="font-inter font-normal text-[14px] text-[#2D3748] mt-2">Retail Partners Across Canada</span>
            </div>
            <div className="flex flex-col">
              <span className="font-dm-sans font-bold text-[32px] md:text-[48px] text-[#FF8C00] leading-none">5</span>
              <span className="font-inter font-normal text-[14px] text-[#2D3748] mt-2">Provinces Served</span>
            </div>
            <div className="flex flex-col">
              <span className="font-dm-sans font-bold text-[32px] md:text-[48px] text-[#FF8C00] leading-none">Weekly</span>
              <span className="font-inter font-normal text-[14px] text-[#2D3748] mt-2">Air Shipments from India</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — MISSION & VALUES */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column - Mission */}
          <div>
            <span className="inline-block font-inter font-semibold text-[12px] text-[#FF8C00] tracking-wider uppercase">
              OUR MISSION
            </span>
            <h2 className="font-dm-sans font-bold text-[24px] md:text-[32px] text-[#1A1A2E] mt-3 leading-tight">
              Bringing India&apos;s Finest to Canadian Tables
            </h2>
            <p className="font-inter font-normal text-[16px] text-[#2D3748] leading-[1.7] mt-6">
              Every mango we import is Grade A certified, sourced from vetted orchards in Ratnagiri, Devgad, and Junagadh — the most celebrated mango-growing regions in India. Our direct relationships with farmers allow us to ensure freshness, traceability, and quality at every step.
            </p>
          </div>

          {/* Right Column - Values */}
          <div className="flex flex-col">
            {[
              { title: "Quality Without Compromise", desc: "Only Grade A produce from FSSAI certified orchards passes our selection process." },
              { title: "Full Traceability", desc: "Every shipment is traceable from the orchard to your doorstep with batch-level records." },
              { title: "Regulatory Excellence", desc: "We hold a valid CFIA import licence and maintain a full Preventive Control Plan." },
              { title: "Canadian Community", desc: "Proudly supporting Canadian retailers, restaurants, and families with premium South Asian produce." }
            ].map((value, idx) => (
              <div key={idx} className="bg-white border-l-[3px] border-[#FF8C00] p-5 mb-4 rounded-r-lg">
                <h3 className="font-dm-sans font-semibold text-[16px] text-[#1A1A2E]">{value.title}</h3>
                <p className="font-inter font-normal text-[14px] text-[#2D3748] mt-1">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR JOURNEY TIMELINE */}
      <section className="py-20 md:py-32 px-4 bg-[#F7F7F2]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block font-inter font-semibold text-[12px] text-[#FF8C00] tracking-wider uppercase">
              OUR JOURNEY
            </span>
            <h2 className="font-dm-sans font-bold text-[24px] md:text-[36px] text-[#1A1A2E] mt-3">
              Built on Trust, Grown with Purpose
            </h2>
          </div>

          <div className="relative">
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#FFB300] -translate-x-1/2"></div>
            {/* Left Line for Mobile */}
            <div className="md:hidden absolute left-[23px] top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#FFB300]"></div>

            <div className="space-y-12 md:space-y-24">
              {[
                { year: "2022", title: "Company Founded", desc: "Headstart Foods Inc. incorporated in Surrey, BC with a vision to bridge India's finest produce with Canadian consumers." },
                { year: "2023", title: "CFIA Licence Obtained", desc: "Successfully obtained our CFIA fresh fruit and vegetable import licence, enabling legal importation of fresh produce from India." },
                { year: "2024", title: "First Air Shipment", desc: "Launched weekly air-cargo shipments of Alphonso mangoes from Ratnagiri directly to our Surrey temperature-controlled warehouse." },
                { year: "2026", title: "Pan-Canadian Expansion", desc: "Expanded distribution network across BC, Alberta, Manitoba, Ontario, and Quebec, serving 50+ retail and restaurant partners." }
              ].map((event, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Circle Node */}
                  <div className="absolute left-0 md:left-1/2 flex items-center justify-center w-[48px] h-[48px] bg-[#FF8C00] text-white font-dm-sans font-bold text-[14px] rounded-full z-10 md:-translate-x-1/2 shadow-lg">
                    {event.year}
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <h4 className="font-dm-sans font-semibold text-[18px] text-[#1A1A2E] mb-2">{event.title}</h4>
                    <p className="font-inter font-normal text-[15px] text-[#2D3748] leading-relaxed max-w-[440px] md:mx-0 inline-block">
                      {event.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY HEADSTART FOODS */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-dm-sans font-bold text-[24px] md:text-[36px] text-[#1A1A2E]">
              The Headstart Difference
            </h2>
            <p className="font-inter font-normal text-[16px] text-[#2D3748] mt-3">
              What sets us apart from every other importer
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '✈', title: "Air Imported Weekly", body: "Not weeks-old produce — every shipment arrives in Canada within 48 hours of harvest." },
              { icon: '🌿', title: "Farm-Direct Relationships", body: "We work directly with certified orchards — no middlemen, no quality compromise." },
              { icon: '🛡', title: "CFIA Licensed & Compliant", body: "Every import cleared through CFIA with full phytosanitary documentation." },
              { icon: '🌡', title: "Cold Chain Logistics", body: "Temperature-controlled from orchard to warehouse to ensure peak ripeness on arrival." },
              { icon: '📋', title: "Full Traceability", body: "Batch-level records from harvest date to CFIA clearance — one step forward, one step back." },
              { icon: '🍁', title: "Proudly Canadian", body: "Surrey, BC based — supporting Canadian communities, retailers, and families." }
            ].map((card, idx) => (
              <div key={idx} className="bg-white border border-[#F3F4F6] rounded-[16px] p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#FFF7ED] text-[#FF8C00] rounded-full text-[20px]">
                  {card.icon}
                </div>
                <h3 className="font-dm-sans font-semibold text-[17px] text-[#1A1A2E] mt-4">{card.title}</h3>
                <p className="font-inter font-normal text-[14px] text-[#2D3748] leading-[1.6] mt-2">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — TEAM / LOCATION */}
      <section className="py-20 md:py-32 px-4 bg-[#1A1A2E]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="font-dm-sans font-bold text-[24px] md:text-[36px] text-white mb-4">
            Based in Surrey, British Columbia
          </h2>
          <p className="font-inter font-normal text-[16px] text-white/80 max-w-[560px] mx-auto mb-16 leading-relaxed">
            Our warehouse and operations hub is located in Surrey, BC — strategically positioned to serve all major Canadian markets.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/5 border border-white/10 rounded-[16px] p-6 min-w-[200px] flex-1 text-left">
              <div className="text-[#FF8C00] mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" /></svg>
              </div>
              <span className="block font-inter font-normal text-[13px] text-white/60 mb-1">Headquarters</span>
              <span className="block font-dm-sans font-semibold text-[15px] text-white">Surrey, British Columbia, Canada</span>
            </div>

            <a href="mailto:headstartfoods@gmail.com" className="bg-white/5 border border-white/10 rounded-[16px] p-6 min-w-[200px] flex-1 text-left group transition-all hover:bg-white/10">
              <div className="text-[#FF8C00] mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </div>
              <span className="block font-inter font-normal text-[13px] text-white/60 mb-1">Email Us</span>
              <span className="block font-dm-sans font-semibold text-[15px] text-white group-hover:text-[#FF8C00] transition-colors">headstartfoods@gmail.com</span>
            </a>

            <a href="tel:7788770923" className="bg-white/5 border border-white/10 rounded-[16px] p-6 min-w-[200px] flex-1 text-left group transition-all hover:bg-white/10">
              <div className="text-[#FF8C00] mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              </div>
              <span className="block font-inter font-normal text-[13px] text-white/60 mb-1">Call Us</span>
              <span className="block font-dm-sans font-semibold text-[15px] text-white group-hover:text-[#FF8C00] transition-colors">778-877-0923</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA BANNER */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-[#FF8C00] to-[#FFB300] text-center">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-dm-sans font-bold text-[22px] md:text-[36px] text-white mb-4">
            Ready to Experience Premium Indian Mangoes?
          </h2>
          <p className="font-inter font-normal text-[16px] text-white/90 mb-10 max-w-[600px] mx-auto">
            Shop our seasonal collection or inquire about wholesale partnerships.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products"
              className="px-8 h-[56px] min-w-[200px] bg-white text-[#FF8C00] font-dm-sans font-semibold text-[16px] rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-[0.97]"
            >
              Shop Mangoes Now
            </Link>
            <Link
              href="/wholesale"
              className="px-8 h-[56px] min-w-[200px] bg-transparent border-2 border-white text-white font-dm-sans font-semibold text-[16px] rounded-xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-[0.97]"
            >
              Wholesale Inquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
