import React, { useState } from 'react';
import { ShieldCheck, Mail, Heart, Check, Phone, MapPin, Clock, MessageSquare, Instagram, Facebook, Youtube } from 'lucide-react';
import raginiLogo from '../assets/images/ragini_clean_rg_logo_1786439183195.jpg';

interface FooterProps {
  navigate: (path: string) => void;
  openCustomOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, openCustomOrderModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#FAF5F5] text-[#2D1A20] border-t border-[#F0E2DF] font-sans text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Column 1 & 2: Brand Info & Social Links (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#E8C5CE]">
                <img
                  src={raginiLogo}
                  alt="Ragini Garodia Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-[0.18em] text-[#4A1525] block">
                  RAGINI GARODIA
                </span>
                <span className="text-[8px] text-[#8C6B75] uppercase tracking-[0.22em] font-bold block mt-0.5">
                  Haute Gold-Plated Fine Jewelry
                </span>
              </div>
            </div>

            <p className="text-[#5A3E46] font-normal leading-relaxed">
              India's premier house of 100% pure micro-gold plated fine jewelry with zero stones. Handcrafted 22K/18K coin harams, filigree chokers, and textured kangans with 3-micron anti-tarnish guarantee.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#4A1525] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>3-Micron Anti-Tarnish • Zero-Stone Guarantee</span>
            </div>

            {/* Official Social Links */}
            <div className="pt-2 space-y-2">
              <span className="block text-[11px] font-bold text-[#4A1525] uppercase tracking-wider">
                Follow Official Handles
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/raginigarodiaofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF0F2] hover:bg-[#F3E2E6] border border-[#E8C5CE] text-[#4A1525] font-semibold text-[11px] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-700" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.facebook.com/raginigarodiaofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF0F2] hover:bg-[#F3E2E6] border border-[#E8C5CE] text-[#4A1525] font-semibold text-[11px] transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-700" />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://wa.me/919830000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF0F2] hover:bg-[#F3E2E6] border border-[#E8C5CE] text-[#4A1525] font-semibold text-[11px] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Address & Flagship Atelier Placeholders (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#4A1525] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>Boutique & Atelier</span>
            </h4>
            
            <div className="space-y-3 text-[#5A3E46] text-xs">
              <div className="bg-[#FFFDFD] p-3 rounded-2xl border border-[#E8D7D3]">
                <strong className="text-[#4A1525] block font-serif text-xs mb-0.5">
                  Kolkata Flagship Atelier
                </strong>
                <p className="text-[11px] leading-snug">
                  14/1 Royal Opera House, Camac Street, Kolkata, WB - 700016
                </p>
                <span className="text-[10px] text-[#8C6B75] block mt-1">Mon - Sat: 10:30 AM - 7:30 PM IST</span>
              </div>

              <div className="bg-[#FFFDFD] p-3 rounded-2xl border border-[#E8D7D3]">
                <strong className="text-[#4A1525] block font-serif text-xs mb-0.5">
                  Mumbai Exclusive Experience Center
                </strong>
                <p className="text-[11px] leading-snug">
                  42 Waterfield Road, Bandra West, Mumbai, MH - 400050
                </p>
                <span className="text-[10px] text-[#8C6B75] block mt-1">Tue - Sun: 11:00 AM - 8:00 PM IST</span>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-[#4A1525]">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Concierge: +91 98300 00000 / +91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Nav & Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#4A1525] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-[#5A3E46]">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-[#4A1525] cursor-pointer">
                  Storefront Catalog
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/all')} className="hover:text-[#4A1525] cursor-pointer">
                  All Gold Collections
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-[#4A1525] cursor-pointer">
                  Gallery Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/stylist')} className="hover:text-[#4A1525] cursor-pointer">
                  Gemini AI Stylist
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/care')} className="hover:text-[#4A1525] cursor-pointer">
                  Craftsmanship & Care
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/orders')} className="hover:text-[#4A1525] cursor-pointer">
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: VIP Newsletter & Custom Orders (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#4A1525] uppercase tracking-wider">VIP Gold Club</h4>
            <p className="text-[#5A3E46] font-normal">
              Subscribe for early access to new gold launches and exclusive 10% discount codes across India.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-[#FFFDFD] border border-[#E8D7D3] text-[#2D1A20] rounded-full px-3.5 py-2.5 text-xs pr-14 focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                  <button
                    type="submit"
                    id="newsletter-submit-btn"
                    className="absolute right-1 top-1 bottom-1 bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold px-3.5 rounded-full text-xs cursor-pointer transition-colors"
                  >
                    Join
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-2.5 rounded-2xl bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You are subscribed! Code RAGINI10 unlocked.</span>
              </div>
            )}

            <button
              onClick={openCustomOrderModal}
              className="mt-2 text-[#4A1525] hover:underline text-[11px] font-bold block cursor-pointer"
            >
              Request Custom Sizing & Gold Orders →
            </button>
          </div>

        </div>

        {/* Bottom copyright & Hallmark guarantees */}
        <div className="pt-8 border-t border-[#E8D7D3] flex flex-col sm:flex-row items-center justify-between text-[#8C6B75] text-[11px] gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} RAGINI GARODIA. All rights reserved. Fine Pure Gold Plated Jewelry (India).</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[#4A1525] font-semibold">
            <span>22K Micro Gold Seal</span>
            <span>•</span>
            <span>Zero Stones Guarantee</span>
            <span>•</span>
            <span>Pan-India Insured Shipping</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
