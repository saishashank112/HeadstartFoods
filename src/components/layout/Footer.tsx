import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Globe, Shield, Info, ChevronDown } from "lucide-react";
import Logo from "../shared/Logo";

const FOOTER_LINKS = {
  quickLinks: [
    { label: "Products", href: "/products" },
    { label: "Wholesale", href: "/wholesale" },
    { label: "Compliance", href: "/compliance" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  deliveryRegions: [
    { label: "British Columbia", href: "/delivery/british-columbia" },
    { label: "Alberta", href: "/delivery/alberta" },
    { label: "Ontario", href: "/delivery/ontario" },
    { label: "Quebec", href: "/delivery/quebec" },
    { label: "Manitoba", href: "/delivery/manitoba" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Globe, href: "#" },
  { icon: Shield, href: "#" },
  { icon: Info, href: "#" },
];

function MobileAccordion({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden border-b border-white/5 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group"
      >
        <h4 className="font-display text-[10px] font-black text-primary uppercase tracking-[0.25em]">{title}</h4>
        <div className={`p-2 rounded-full border border-white/5 transition-all ${isOpen ? 'rotate-180 bg-primary/10 border-primary/20' : ''}`}>
          <ChevronDown size={14} className={isOpen ? 'text-primary' : 'text-white/40'} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="space-y-3 pb-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-[13px] font-medium font-body block pl-2 border-l border-white/10">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0D18] text-white pt-6 pb-20 md:pb-8 border-t border-white/5 px-6 md:px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-4 md:space-y-6">
          <Logo light={true} />
          <p className="text-white/40 text-[11px] md:text-[13px] font-body leading-relaxed max-w-xs uppercase font-medium tracking-tight">
            Canada&apos;s premium importer of Grade A Indian mangoes. Freshness and quality guaranteed from orchard to your doorstep.
          </p>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social, i) => (
              <Link key={i} href={social.href} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary transition-all duration-500 group">
                <social.icon size={14} className="text-white/40 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links (Mobile Accordion / Desktop List) */}
        <div className="hidden md:block space-y-4">
          <h4 className="font-display text-[10px] font-black text-primary uppercase tracking-[0.25em] opacity-30">Quick Exploration</h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.quickLinks.slice(0, 5).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-[13px] font-medium font-body group flex items-center gap-2">
                  <div className="w-0.5 h-0.5 bg-primary/40 rounded-full group-hover:w-1.5 transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <MobileAccordion title="Quick Exploration" links={FOOTER_LINKS.quickLinks.slice(0, 5)} />

        {/* Regions (Mobile Accordion / Desktop List) */}
        <div className="hidden md:block space-y-4">
          <h4 className="font-display text-[10px] font-black text-primary uppercase tracking-[0.25em] opacity-30">Strategic Ports</h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.deliveryRegions.slice(0, 4).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-[13px] font-medium font-body group flex items-center gap-2">
                  <div className="w-0.5 h-0.5 bg-primary/40 rounded-full group-hover:w-1.5 transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <MobileAccordion title="Strategic Ports" links={FOOTER_LINKS.deliveryRegions.slice(0, 4)} />

        {/* Col 4: Contact */}
        <div className="space-y-6">
          <h4 className="font-display text-[10px] font-black text-primary uppercase tracking-[0.25em] opacity-30">Get in Touch</h4>
          <div className="space-y-3 md:space-y-4">
            <Link href="mailto:headstartfoods@gmail.com" className="flex items-center gap-3 p-2 md:p-3 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mail size={12} />
              </div>
              <span className="text-[11px] md:text-[13px] text-white/60 group-hover:text-white">headstartfoods@gmail.com</span>
            </Link>
            <Link href="tel:+17788770923" className="flex items-center gap-3 p-2 md:p-3 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone size={12} />
              </div>
              <span className="text-[11px] md:text-[13px] text-white/60 group-hover:text-white">778-877-0923</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/20 text-[10px] font-body font-black uppercase tracking-widest text-center md:text-left">
          &copy; {new Date().getFullYear()} Headstart Foods Inc.
        </p>
        <div className="flex flex-wrap justify-center gap-5 text-[10px] text-white/20 font-black uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
