import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Crown, BookOpen, Truck, LayoutDashboard } from 'lucide-react';
import raginiHeroImg from '../assets/images/ragini_gold_hero_1786370846007.jpg';

interface HeroProps {
  navigate: (path: string) => void;
  openCustomOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ navigate, openCustomOrderModal }) => {
  return (
    <section className="relative overflow-hidden bg-[#FFFDFD] text-[#2D1A20] py-10 lg:py-16 border-b border-[#F0E2DF]">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text & Content */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] text-xs font-bold tracking-wider uppercase">
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>100% Pure Micro-Gold Plated Fine Jewelry • India</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A1525] tracking-tight leading-tight">
              Handcrafted Pure <span className="italic text-[#C5A059]">22K Gold Plated</span> Fine Jewelry
            </h1>

            {/* Subtext */}
            <p className="text-[#5A3E46] text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Exquisite 18K & 22K micro-gold plated chokers, coin harams, textured kangans, and dome jhumkas crafted with zero stones for pristine pure gold metal luster and lifelong anti-tarnish elegance.
            </p>

            {/* Feature Pills */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-[#4A1525]">
              <div className="flex items-center gap-1.5 bg-[#FAF5F5] px-3 py-1.5 rounded-full border border-[#E8D7D3]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>3-Micron Anti-Tarnish Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF5F5] px-3 py-1.5 rounded-full border border-[#E8D7D3]">
                <Award className="w-4 h-4 text-[#C5A059]" />
                <span>Zero Stones (Pure Gold Finish)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF5F5] px-3 py-1.5 rounded-full border border-[#E8D7D3]">
                <Truck className="w-4 h-4 text-[#C5A059]" />
                <span>Free Shipping Across India</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                id="hero-explore-storefront-btn"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold px-7 py-3 rounded-full text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Browse Gold Collection</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                id="hero-explore-gallery-btn"
                onClick={() => navigate('/gallery')}
                className="w-full sm:w-auto bg-[#FAF5F5] hover:bg-[#F3E2E6] text-[#4A1525] font-bold px-5 py-3 rounded-full text-xs sm:text-sm border border-[#E8D7D3] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#C5A059]" />
                <span>Lookbook</span>
              </button>

              <button
                id="hero-ai-stylist-btn"
                onClick={() => navigate('/stylist')}
                className="w-full sm:w-auto bg-[#FAF5F5] hover:bg-[#F3E2E6] text-[#4A1525] font-bold px-5 py-3 rounded-full text-xs sm:text-sm border border-[#E8D7D3] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>AI Stylist</span>
              </button>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E8C5CE] shadow-lg group">
              <img
                src={raginiHeroImg}
                alt="Ragini Garodia Gold Plated Choker Set"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1A20] via-transparent to-transparent opacity-70" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#FFFDFD]/95 backdrop-blur-md border border-[#F0E2DF] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059] block">
                    Signature Creation
                  </span>
                  <h3 className="font-serif text-sm font-bold text-[#4A1525]">
                    Royal 22K Filigree Gold Set
                  </h3>
                  <p className="text-[11px] text-[#5A3E46]">
                    ₹4,999 • 22K Micro Plating • Zero Stones
                  </p>
                </div>
                <button
                  id="hero-custom-order-btn"
                  onClick={openCustomOrderModal}
                  className="bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap shadow transition-colors cursor-pointer"
                >
                  Custom Request
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
