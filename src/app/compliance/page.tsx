import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CFIA Compliance & Food Safety | Headstart Foods",
  description: "Headstart Foods is a CFIA licensed importer, ensuring full traceability and uncompromising food safety standards for every mango shipment from India to Canada.",
};

const CompliancePage = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* SECTION 1 — HERO */}
      <section className="bg-[#F7F7F2] relative pt-20 pb-15 md:pt-28 md:pb-24 px-4 overflow-hidden">
        {/* Subtle repeating leaf pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-5 10-15 15-15 25 0 8.28 6.72 15 15 15s15-6.72 15-15c0-10-10-15-15-25z' fill='%232D3748' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }}></div>
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <span className="inline-block font-inter font-semibold text-[12px] text-[#FF8C00] tracking-[0.1em] uppercase mb-4">
            FOOD SAFETY & COMPLIANCE
          </span>
          <h1 className="font-dm-sans font-bold text-[calc(26px+1.5vw)] md:text-[44px] text-[#1A1A2E] leading-tight max-w-[720px]">
            CFIA Compliant. Fully Traceable. Uncompromising Quality.
          </h1>
          <p className="font-inter font-normal text-[16px] md:text-[18px] text-[#2D3748] leading-[1.7] max-w-[640px] mt-6">
            As a licensed Canadian food importer, Headstart Foods operates under strict CFIA regulatory oversight. Every shipment is documented, certified, and traceable from the orchard to your doorstep.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <div className="bg-white border border-[#059669] rounded-full px-5 py-2.5 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#059669]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-1 14.5l-3.5-3.5 1.41-1.41L11 14.67l6.09-6.09 1.41 1.41L11 16.5z"/></svg>
              <span className="font-inter font-semibold text-[14px] text-[#059669]">CFIA Licensed Importer</span>
            </div>
            <div className="bg-white border border-[#1D6FB8] rounded-full px-5 py-2.5 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#1D6FB8]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              <span className="font-inter font-semibold text-[14px] text-[#1D6FB8]">FSSAI Certified Sources</span>
            </div>
            <div className="bg-white border border-[#7C3AED] rounded-full px-5 py-2.5 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#7C3AED]" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C8 10 9 20 9 20s-1 0-1-1c0-5 10-15 10-15s0 1-1 4zM5 8c9 2 8 12 8 12s1 0 1-1c0-5-10-15-10-15s0 1 1 4z"/></svg>
              <span className="font-inter font-semibold text-[14px] text-[#7C3AED]">Phytosanitary Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CERTIFICATE DISPLAY CARDS */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-dm-sans font-bold text-[22px] md:text-[32px] text-[#1A1A2E]">
              Our Certifications & Licences
            </h2>
            <p className="font-inter font-normal text-[16px] text-[#2D3748] mt-3">
              Valid, active, and independently verified
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 - CFIA */}
            <div className="bg-white border border-[#F3F4F6] border-t-4 border-t-[#059669] rounded-[16px] p-8 shadow-sm">
              <div className="w-[56px] h-[56px] flex items-center justify-center bg-[#EEF8F3] text-[#059669] rounded-full mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <span className="inline-block px-3 py-1 bg-[#059669] text-white font-inter font-semibold text-[11px] rounded-full mb-4">VALID & ACTIVE</span>
              <h3 className="font-dm-sans font-bold text-[18px] text-[#1A1A2E] mb-2 leading-tight">CFIA Fresh Fruit & Vegetable Import Licence</h3>
              <p className="font-inter font-normal text-[13px] text-[#2D3748] opacity-80 mb-2">Canadian Food Inspection Agency (CFIA)</p>
              <p className="font-inter font-normal text-[13px] text-[#2D3748] mb-6 leading-relaxed">Licence maintained with annual renewal and full compliance audits</p>
              
              <div className="border-t border-[#F3F4F6] my-6"></div>
              
              <ul className="space-y-3 mb-8">
                {['Fresh mango importation from India', 'South Asian produce distribution', 'Full regulatory compliance documentation'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span className="font-inter font-normal text-[13px] text-[#2D3748]">{item}</span>
                  </li>
                ))}
              </ul>
              
              <a href="https://www.inspection.gc.ca" target="_blank" rel="noopener noreferrer" className="inline-block font-inter font-semibold text-[14px] text-[#FF8C00] hover:translate-x-1 transition-transform">
                Learn More About CFIA
              </a>
            </div>

            {/* Card 2 - PCP */}
            <div className="bg-white border border-[#F3F4F6] border-t-4 border-t-[#FF8C00] rounded-[16px] p-8 shadow-sm">
              <div className="w-[56px] h-[56px] flex items-center justify-center bg-[#FFF7ED] text-[#FF8C00] rounded-full mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
              </div>
              <span className="inline-block px-3 py-1 bg-[#FF8C00] text-white font-inter font-semibold text-[11px] rounded-full mb-4 uppercase">FULLY DOCUMENTED</span>
              <h3 className="font-dm-sans font-bold text-[18px] text-[#1A1A2E] mb-2 leading-tight">Preventive Control Plan (PCP)</h3>
              <p className="font-inter font-normal text-[13px] text-[#2D3748] opacity-80 mb-2">Safe Food for Canadians Regulations (SFCR)</p>
              <p className="font-inter font-normal text-[13px] text-[#2D3748] mb-6 leading-relaxed">Comprehensive PCP covering all import and distribution activities</p>
              
              <div className="border-t border-[#F3F4F6] my-6"></div>
              
              <ul className="space-y-3 mb-8">
                {['Sanitation and hygiene protocols', 'Pest control program', 'Recall and traceability procedures', 'Supplier verification program'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#FF8C00] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span className="font-inter font-normal text-[13px] text-[#2D3748]">{item}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full flex items-center justify-center gap-2 border border-[#FF8C00] text-[#FF8C00] font-inter font-semibold text-[14px] h-[48px] rounded-xl hover:bg-[#FFF7ED] transition-colors">
                Download PCP Overview (PDF)
              </button>
            </div>

            {/* Card 3 - Phytosanitary */}
            <div className="bg-white border border-[#F3F4F6] border-t-4 border-t-[#7C3AED] rounded-[16px] p-8 shadow-sm">
              <div className="w-[56px] h-[56px] flex items-center justify-center bg-[#F5F3FF] text-[#7C3AED] rounded-full mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </div>
              <span className="inline-block px-3 py-1 bg-[#7C3AED] text-white font-inter font-semibold text-[11px] rounded-full mb-4 uppercase">PER SHIPMENT</span>
              <h3 className="font-dm-sans font-bold text-[18px] text-[#1A1A2E] mb-2 leading-tight">Phytosanitary Certificate (Per Shipment)</h3>
              <p className="font-inter font-normal text-[13px] text-[#2D3748] opacity-80 mb-2">National Plant Protection Organization India</p>
              <p className="font-inter font-normal text-[13px] text-[#2D3748] mb-6 leading-relaxed">Issued per shipment confirming pest and disease-free produce</p>
              
              <div className="border-t border-[#F3F4F6] my-6"></div>
              
              <ul className="space-y-3 mb-8">
                {['Pest-free certification at origin', 'CFIA border inspection clearance', 'Treatment records (if applicable)'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#7C3AED] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span className="font-inter font-normal text-[13px] text-[#2D3748]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — TRACEABILITY SYSTEM */}
      <section className="py-20 md:py-32 px-4 bg-[#F7F7F2]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <span className="inline-block font-inter font-semibold text-[12px] text-[#FF8C00] tracking-wider uppercase mb-2">
              TRACEABILITY
            </span>
            <h2 className="font-dm-sans font-bold text-[24px] md:text-[36px] text-[#1A1A2E] leading-tight">
              One Step Forward. One Step Back.
            </h2>
            <p className="font-inter font-normal text-[16px] text-[#2D3748] mt-4 leading-[1.7] max-w-[640px]">
              Our traceability system meets and exceeds CFIA&apos;s one-step-forward, one-step-back requirement. Every batch is documented with complete chain of custody.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#F3F4F6]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Left Flow - Backward */}
              <div>
                <h4 className="font-dm-sans font-semibold text-[16px] text-[#1A1A2E] mb-10 pb-2 border-b-2 border-[#FFB300] inline-block">
                  Where did it come from? (Backward)
                </h4>
                <div className="relative pl-8 space-y-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:border-l-2 before:border-dashed before:border-[#FFB300]">
                  {[
                    { label: "Indian Orchard (Origin)", sub: "Batch Harvest Location" },
                    { label: "CFIA Entry Point", sub: "Import Clearance Documentation" },
                    { label: "Surrey Warehouse (Batch #)", sub: "Quality Control & Storage" },
                    { label: "Your Order", sub: "Delivery Endpoint" }
                  ].reverse().map((step, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[37px] top-1.5 w-[12px] h-[12px] bg-[#FFB300] rounded-full border-2 border-white"></div>
                      <h5 className="font-inter font-medium text-[14px] text-[#1A1A2E]">{step.label}</h5>
                      <p className="font-inter text-[12px] text-[#2D3748] mt-0.5">{step.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Flow - Forward */}
              <div>
                <h4 className="font-dm-sans font-semibold text-[16px] text-[#1A1A2E] mb-10 pb-2 border-b-2 border-[#FFB300] inline-block">
                  Where did it go? (Forward)
                </h4>
                <div className="relative pl-8 space-y-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:border-l-2 before:border-dashed before:border-[#FFB300]">
                  {[
                    { label: "Orchard Batch #HSF-2026-0412", sub: "Source Identification" },
                    { label: "Export Documentation", sub: "Transit Verification" },
                    { label: "CFIA Clearance Entry", sub: "Regulatory Approval" },
                    { label: "Retailer/Customer Delivery", sub: "Distribution Endpoint" }
                  ].map((step, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[37px] top-1.5 w-[12px] h-[12px] bg-[#FFB300] rounded-full border-2 border-white"></div>
                      <h5 className="font-inter font-medium text-[14px] text-[#1A1A2E]">{step.label}</h5>
                      <p className="font-inter text-[12px] text-[#2D3748] mt-0.5">{step.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Table */}
            <div className="mt-16">
              <h4 className="font-dm-sans font-semibold text-[16px] text-[#1A1A2E] mb-6">Sample Traceability Record</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { field: "Batch Code", val: "#HSF-2026-0412" },
                  { field: "Orchard", val: "Konkan Mango Farm, Ratnagiri" },
                  { field: "Harvest Date", val: "April 15, 2026" },
                  { field: "Export Date", val: "April 17, 2026" },
                  { field: "CFIA Entry #", val: "YVR-2026-04-891" },
                  { field: "CFIA Clearance", val: "April 19, 2026" },
                  { field: "Warehouse Arrival", val: "April 20, 2026" },
                ].map((row, idx) => (
                  <div key={idx} className="flex justify-between p-4 bg-[#F7F7F2] rounded-xl sm:bg-transparent sm:border-b sm:border-[#F3F4F6] sm:rounded-none">
                    <span className="font-inter font-medium text-[13px] text-[#2D3748]">{row.field}</span>
                    <span className="font-inter text-[13px] text-[#1A1A2E] font-semibold">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FOOD SAFETY COMMITMENTS */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto text-center mb-16">
          <h2 className="font-dm-sans font-bold text-[22px] md:text-[32px] text-[#1A1A2E]">
            Our Food Safety Commitments
          </h2>
          <p className="font-inter font-normal text-[16px] text-[#2D3748] mt-3">
            Non-negotiable standards we uphold on every single shipment.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {[
            { 
              title: "Sanitation & Hygiene", 
              body: "Our Surrey warehouse follows strict sanitation schedules. All surfaces, equipment, and packaging materials are cleaned and sanitized to CFIA standards before every shipment.",
              bullets: ["Daily cleaning and sanitizing schedules", "Employee hygiene training program", "Third-party facility audit compliance"]
            },
            { 
              title: "Integrated Pest Control", 
              body: "A licensed pest control operator conducts regular inspections. Our facility maintains zero tolerance for pest activity with documented prevention and response protocols.",
              bullets: ["Licensed pest control operator on contract", "Monthly inspection and documentation", "Immediate corrective action protocol"]
            },
            { 
              title: "Recall & Response Readiness", 
              body: "We can initiate a full product recall within 24 hours. Our traceability system enables us to identify, isolate, and communicate affected batches to all distribution points immediately.",
              bullets: ["24-hour recall capability", "Batch-level tracking on all products", "CFIA recall notification procedures"]
            },
            { 
              title: "Supplier Verification Program", 
              body: "Every orchard we source from undergoes a formal verification process. We review FSSAI certification, farming practices, pesticide records, and export history before approval.",
              bullets: ["FSSAI certification required", "Annual supplier re-evaluation", "On-site farm visit documentation"]
            }
          ].map((card, idx) => (
            <div key={idx} className="bg-white border border-[#F3F4F6] border-l-4 border-l-[#059669] rounded-2xl p-7 md:p-8 shadow-sm">
              <h3 className="font-dm-sans font-semibold text-[17px] text-[#1A1A2E]">{card.title}</h3>
              <p className="font-inter font-normal text-[14px] text-[#2D3748] leading-[1.6] mt-4">
                {card.body}
              </p>
              <ul className="mt-6 space-y-2">
                {card.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex items-center gap-2 text-[13px] text-[#2D3748]">
                    <svg className="w-4 h-4 text-[#059669]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — PCP DOWNLOAD BANNER */}
      <section className="bg-[#1A1A2E] py-16 md:py-20 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="font-dm-sans font-bold text-[20px] md:text-[28px] text-white">Read Our Preventive Control Plan Summary</h2>
            <p className="font-inter font-normal text-[15px] text-white/75 mt-2">Our PCP outlines every food safety measure we maintain as a licensed CFIA importer.</p>
          </div>
          <button className="flex items-center justify-center gap-3 bg-white text-[#FF8C00] font-dm-sans font-semibold text-[16px] h-[56px] w-full md:w-[260px] rounded-xl shadow-lg hover:bg-white/95 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Download PCP Overview
          </button>
        </div>
      </section>

      {/* SECTION 6 — FAQ */}
      <section className="py-20 md:py-32 px-4 bg-[#F7F7F2]">
        <div className="max-w-[720px] mx-auto">
          <h2 className="font-dm-sans font-bold text-[24px] md:text-[32px] text-[#1A1A2E] text-center mb-12">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is Headstart Foods a licensed CFIA importer?", a: "Yes. We hold a valid CFIA fresh fruit and vegetable import licence and comply with all Safe Food for Canadians Regulations (SFCR) requirements." },
              { q: "How do you ensure mango freshness on arrival?", a: "All our mangoes are air-imported within 24–48 hours of harvest. Our cold chain logistics maintain optimal temperature from orchard to warehouse to delivery." },
              { q: "Can I see traceability records for my order?", a: "Yes. Every product page includes a traceability section with the batch code, orchard, harvest date, and CFIA clearance date for that specific shipment." },
              { q: "Do your products have phytosanitary certificates?", a: "Every shipment is accompanied by a phytosanitary certificate issued by India&apos;s NPPO and cleared by CFIA at the Canadian port of entry." },
              { q: "How do you handle a product recall?", a: "We maintain a 24-hour recall capability. Our batch-level traceability system allows us to immediately identify and isolate affected products and notify all distribution points and customers." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white border-b border-[#F3F4F6] transition-all duration-300">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-dm-sans font-semibold text-[16px] text-[#1A1A2E] hover:text-[#FF8C00]">
                  {faq.q}
                  <span className="text-[#FF8C00] transition-transform duration-300 group-open:rotate-45">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 font-inter font-normal text-[15px] text-[#2D3748] leading-[1.7]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CompliancePage;
