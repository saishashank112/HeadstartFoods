'use client';

import React, { useState } from 'react';

const ContactPage = () => {
  const [inquiryType, setInquiryType] = useState('Product Inquiry');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* SECTION 1 — CONTACT HERO */}
      <section className="bg-[#F7F7F2] pt-18 pb-12 md:pt-24 md:pb-16 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block font-inter font-semibold text-[12px] text-[#FF8C00] tracking-wider uppercase mb-3">
            GET IN TOUCH
          </span>
          <h1 className="font-dm-sans font-bold text-[calc(28px+1.5vw)] md:text-[44px] text-[#1A1A2E] leading-tight mb-4">
            We&apos;d Love to Hear from You
          </h1>
          <p className="font-inter font-normal text-[16px] md:text-[18px] text-[#2D3748] max-w-[560px] mx-auto leading-relaxed">
            Whether you&apos;re a retail customer, a wholesale buyer, or just curious about our products — we respond to every message within 24 business hours.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a href="mailto:headstartfoods@gmail.com" className="bg-white border border-[#F3F4F6] rounded-full px-5 h-[48px] flex items-center gap-2 hover:border-[#FF8C00] transition-colors">
              <svg className="w-5 h-5 text-[#FF8C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
              <span className="font-inter font-medium text-[14px] text-[#2D3748]">headstartfoods@gmail.com</span>
            </a>
            <a href="tel:7788770923" className="bg-white border border-[#F3F4F6] rounded-full px-5 h-[48px] flex items-center gap-2 hover:border-[#FF8C00] transition-colors">
              <svg className="w-5 h-5 text-[#FF8C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
              <span className="font-inter font-medium text-[14px] text-[#2D3748]">778-877-0923</span>
            </a>
            <div className="bg-white border border-[#F3F4F6] rounded-full px-5 h-[48px] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#FF8C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
              <span className="font-inter font-medium text-[14px] text-[#2D3748]">Surrey, BC, Canada</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — MAIN CONTACT SECTION */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Contact Form */}
          <div className="order-1">
            <div className="bg-white border border-[#F3F4F6] rounded-[24px] p-6 md:p-10 shadow-lg shadow-black/5">
              {!isSuccess ? (
                <>
                  <h2 className="font-dm-sans font-bold text-[22px] text-[#1A1A2E] mb-2">Send Us a Message</h2>
                  <p className="font-inter font-normal text-[14px] text-[#2D3748] mb-7 opacity-80">We&apos;ll respond within 24 business hours.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block font-dm-sans font-semibold text-[14px] text-[#1A1A2E] mb-3">What&apos;s your inquiry about?</label>
                      <div className="flex flex-wrap gap-2">
                        {['Product Inquiry', 'Wholesale', 'Support', 'Partnership'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setInquiryType(type)}
                            className={`px-5 h-[48px] font-inter font-medium text-[14px] rounded-full border transition-all ${
                              inquiryType === type 
                              ? 'bg-[#FF8C00] text-white border-[#FF8C00]' 
                              : 'bg-white text-[#2D3748] border-[#F3F4F6] hover:border-[#FF8C00]/30'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-inter font-medium text-[14px] text-[#1A1A2E] mb-1.5">Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Your full name"
                          className="w-full h-[56px] px-4 bg-white border border-[#F3F4F6] rounded-xl font-inter text-[16px] text-[#1A1A2E] placeholder:text-slate-400 focus:border-[#FF8C00] outline-none focus:ring-4 focus:ring-[#FF8C00]/10 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-inter font-medium text-[14px] text-[#1A1A2E] mb-1.5">Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="your@email.com"
                          className="w-full h-[56px] px-4 bg-white border border-[#F3F4F6] rounded-xl font-inter text-[16px] text-[#1A1A2E] placeholder:text-slate-400 focus:border-[#FF8C00] outline-none focus:ring-4 focus:ring-[#FF8C00]/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className={inquiryType === 'Wholesale' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
                      <div>
                        <label className="block font-inter font-medium text-[14px] text-[#1A1A2E] mb-1.5">Phone Number (Optional)</label>
                        <input 
                          type="tel" 
                          inputMode="tel"
                          placeholder="778-000-0000"
                          className="w-full h-[56px] px-4 bg-white border border-[#F3F4F6] rounded-xl font-inter text-[16px] text-[#1A1A2E] placeholder:text-slate-400 focus:border-[#FF8C00] outline-none focus:ring-4 focus:ring-[#FF8C00]/10 transition-all"
                        />
                      </div>
                      {inquiryType === 'Wholesale' && (
                        <div>
                          <label className="block font-inter font-medium text-[14px] text-[#1A1A2E] mb-1.5">Company / Business Name</label>
                          <input 
                            type="text" 
                            placeholder="Your company name"
                            className="w-full h-[56px] px-4 bg-white border border-[#F3F4F6] rounded-xl font-inter text-[16px] text-[#1A1A2E] placeholder:text-slate-400 focus:border-[#FF8C00] outline-none focus:ring-4 focus:ring-[#FF8C00]/10 transition-all"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-inter font-medium text-[14px] text-[#1A1A2E] mb-1.5">Subject *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Brief subject line"
                        className="w-full h-[56px] px-4 bg-white border border-[#F3F4F6] rounded-xl font-inter text-[16px] text-[#1A1A2E] placeholder:text-slate-400 focus:border-[#FF8C00] outline-none focus:ring-4 focus:ring-[#FF8C00]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-inter font-medium text-[14px] text-[#1A1A2E] mb-1.5">Message *</label>
                      <textarea 
                        required 
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className="w-full min-h-[140px] p-4 bg-white border border-[#F3F4F6] rounded-xl font-inter text-[16px] text-[#1A1A2E] placeholder:text-slate-400 focus:border-[#FF8C00] outline-none focus:ring-4 focus:ring-[#FF8C00]/10 transition-all resize-y"
                      ></textarea>
                    </div>

                    <p className="font-inter font-normal text-[12px] text-slate-400">
                      By submitting, you agree to our Privacy Policy. We never share your information.
                    </p>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-[56px] bg-[#FF8C00] text-white font-dm-sans font-semibold text-[16px] rounded-xl flex items-center justify-center hover:bg-[#E67E00] active:scale-[0.98] transition-all disabled:opacity-80 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message →"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-[80px] h-[80px] bg-[#EEF8F3] text-[#059669] rounded-full flex items-center justify-center mx-auto mb-6 scale-100 animate-in zoom-in-0 duration-500">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </div>
                  <h2 className="font-dm-sans font-bold text-[24px] text-[#1A1A2E] mb-2">Message Sent!</h2>
                  <p className="font-inter font-normal text-[16px] text-[#2D3748] mb-8">Thank you! We&apos;ll get back to you within 24 business hours.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="font-inter font-semibold text-[14px] text-[#FF8C00] hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Info & Map */}
          <div className="flex flex-col gap-6 order-2">
            {/* Business Hours */}
            <div className="bg-white border border-[#F3F4F6] rounded-[24px] p-6 shadow-sm">
              <h3 className="font-dm-sans font-semibold text-[16px] text-[#1A1A2E] mb-4">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[14px] text-[#2D3748] pb-3 border-b border-[#F3F4F6]">
                  <span className="font-medium">Monday – Friday</span>
                  <span>9:00 AM – 6:00 PM PST</span>
                </div>
                <div className="flex justify-between items-center text-[14px] text-[#2D3748] pb-3 border-b border-[#F3F4F6]">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM – 4:00 PM PST</span>
                </div>
                <div className="flex justify-between items-center text-[14px] text-[#2D3748]">
                  <span className="font-medium">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="font-inter font-normal text-[13px] text-slate-400 mt-4">We respond to emails within 24 business hours</p>
            </div>

            {/* Location Card */}
            <div className="bg-white border border-[#F3F4F6] rounded-[24px] p-6 shadow-sm">
              <h3 className="font-dm-sans font-semibold text-[16px] text-[#1A1A2E] mb-4">Find Us</h3>
              <div>
                <p className="font-dm-sans font-semibold text-[14px] text-[#1A1A2E]">Headstart Foods Inc.</p>
                <p className="font-inter font-normal text-[14px] text-[#2D3748]">Surrey, British Columbia</p>
                <p className="font-inter font-normal text-[14px] text-[#2D3748]">Canada</p>
              </div>
              <a href="https://maps.google.com/?q=Surrey+BC+Canada" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 font-inter font-semibold text-[14px] text-[#FF8C00] hover:translate-x-1 transition-transform">
                Get Directions →
              </a>
            </div>

            {/* Google Map */}
            <div className="w-full h-[240px] rounded-[16px] overflow-hidden border border-[#F3F4F6]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83327.57806791543!2d-122.87997!3d49.10441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d9536dd66555%3A0x3a4a4c7cba50b3f!2sSurrey%2C%20BC!5e0!3m2!1sen!2sca!4v1234567890" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>

            {/* Direct Contact */}
            <div className="bg-white border border-[#F3F4F6] rounded-[24px] p-6 shadow-sm">
              <h3 className="font-dm-sans font-semibold text-[16px] text-[#1A1A2E] mb-6">Direct Contact</h3>
              <div className="space-y-4">
                <a href="mailto:headstartfoods@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#FFF7ED] text-[#FF8C00] rounded-full flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  </div>
                  <div>
                    <p className="font-inter font-normal text-[12px] text-slate-400">Email</p>
                    <p className="font-dm-sans font-medium text-[14px] text-[#1A1A2E] group-hover:text-[#FF8C00] transition-colors">headstartfoods@gmail.com</p>
                  </div>
                </a>
                <a href="tel:7788770923" className="flex items-center gap-4 group">
                  <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#FFF7ED] text-[#FF8C00] rounded-full flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  </div>
                  <div>
                    <p className="font-inter font-normal text-[12px] text-slate-400">Phone</p>
                    <p className="font-dm-sans font-medium text-[14px] text-[#1A1A2E] group-hover:text-[#FF8C00] transition-colors">778-877-0923</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#FFF7ED] text-[#FF8C00] rounded-full flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  </div>
                  <div>
                    <p className="font-inter font-normal text-[12px] text-slate-400">Wholesale</p>
                    <p className="font-dm-sans font-medium text-[14px] text-[#1A1A2E]">Via email only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — INQUIRY TYPE FEATURE CARDS */}
      <section className="py-20 px-4 bg-[#F7F7F2]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-dm-sans font-bold text-[22px] md:text-[32px] text-[#1A1A2E] text-center mb-12">How Can We Help?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { 
                icon: '🛒', 
                title: "Product Inquiries", 
                body: "Questions about availability, freshness, seasonal stock, or specific mango varieties.", 
                cta: "Ask a Question",
                type: "Product Inquiry"
              },
              { 
                icon: '🏢', 
                title: "Wholesale & Bulk", 
                body: "Interested in wholesale pricing, MOQ tiers, or becoming a registered retail partner.", 
                cta: "Wholesale Inquiry",
                link: "/wholesale"
              },
              { 
                icon: '🎧', 
                title: "Order Support", 
                body: "Issues with your order, delivery questions, returns, or any post-purchase concerns.", 
                cta: "Get Support",
                type: "Support"
              },
              { 
                icon: '🤝', 
                title: "Partnership", 
                body: "Distribution partnerships, media inquiries, or collaboration opportunities.", 
                cta: "Discuss Partnership",
                type: "Partnership"
              }
            ].map((card, i) => (
              <div key={i} className="bg-white border border-[#F3F4F6] rounded-2xl p-6 shadow-sm flex flex-col items-start text-left">
                <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#FFF7ED] text-[24px] rounded-full mb-4">
                  {card.icon}
                </div>
                <h3 className="font-dm-sans font-semibold text-[16px] text-[#1A1A2E] mb-2">{card.title}</h3>
                <p className="font-inter font-normal text-[14px] text-[#2D3748] leading-[1.6] mb-6 flex-grow">
                  {card.body}
                </p>
                <button 
                  onClick={() => {
                    if (card.type) {
                      setInquiryType(card.type);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }
                  }}
                  className="font-inter font-semibold text-[14px] text-[#FF8C00] hover:translate-x-1 transition-transform"
                >
                  {card.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHOLESALE CTA */}
      <section className="bg-[#1A1A2E] py-16 md:py-20 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="font-dm-sans font-bold text-[20px] md:text-[28px] text-white">Are You a Retailer or Distributor?</h2>
            <p className="font-inter font-normal text-[15px] text-white/75 mt-2">Our wholesale team handles all B2B inquiries with a dedicated response within 24 hours.</p>
          </div>
          <a href="/wholesale" className="flex items-center justify-center bg-[#FF8C00] text-white font-dm-sans font-semibold text-[16px] h-[56px] w-full lg:w-[260px] rounded-xl shadow-lg hover:bg-[#E67E00] transition-all">
            Go to Wholesale Portal →
          </a>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
