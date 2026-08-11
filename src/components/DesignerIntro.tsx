import React from 'react';
import { Crown, Sparkles, Award, ArrowRight, Heart } from 'lucide-react';
import raginiHeroImg from '../assets/images/ragini_gold_hero_1786370846007.jpg';

interface DesignerIntroProps {
  navigate: (path: string) => void;
}

export const DesignerIntro: React.FC<DesignerIntroProps> = ({ navigate }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#FFFDFD] text-[#2D1A20] border-b border-[#F0E2DF] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAF0F2] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Designer Portrait & Atelier Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#E8C5CE] shadow-2xl group">
              <img
                src={raginiHeroImg}
                alt="Ragini Garodia Atelier"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] sm:h-[480px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A1525] via-transparent to-transparent opacity-80" />

              {/* Floating Quote Stamp */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#FFFDFD]/95 backdrop-blur-md border border-[#E8D7D3] shadow-lg space-y-2">
                <div className="flex items-center gap-2 text-[#C5A059] font-serif text-xs font-bold uppercase tracking-wider">
                  <Crown className="w-4 h-4" />
                  <span>Atelier Philosophy</span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-[#4A1525] leading-relaxed">
                  "True luxury needs no synthetic stones — the raw, unadulterated brilliance of 22K pure micro-gold metal speaks for itself."
                </p>
                <span className="block text-right font-serif text-xs font-bold text-[#8C6B75]">
                  — Ragini Garodia, Founder & Chief Designer
                </span>
              </div>
            </div>

            {/* Decorative Gold Badge */}
            <div className="absolute -top-4 -left-4 bg-[#4A1525] text-amber-300 px-4 py-2 rounded-2xl border border-amber-300/40 shadow-xl flex items-center gap-2 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Haute Gold Artisan</span>
            </div>
          </div>

          {/* Designer Narrative & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>Meet The Designer</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1525] leading-tight">
              Ragini Garodia — <span className="italic text-[#C5A059] block sm:inline">Pioneering Pure Gold Artistry</span>
            </h2>

            <p className="text-[#5A3E46] text-sm sm:text-base leading-relaxed font-normal">
              For over a decade, Ragini Garodia has championed the revival of royal Indian metalcraft. Rejecting plastic stones and artificial embellishments, her design house focuses exclusively on 100% pure 22K and 18K micro-gold plated fine jewelry with zero stone purity.
            </p>

            <p className="text-[#5A3E46] text-sm sm:text-base leading-relaxed font-normal">
              Every choker, coin haram, and carved kangan is handcrafted in collaboration with master goldsmiths across Kolkata, Jaipur, and Hyderabad — fusing ancient repoussé and filigree techniques with modern anti-tarnish micro-plating.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3]">
                <span className="font-serif text-2xl font-bold text-[#4A1525] block">100%</span>
                <span className="text-xs text-[#5A3E46] font-semibold">Pure Micro Gold Plated</span>
              </div>
              <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3]">
                <span className="font-serif text-2xl font-bold text-[#4A1525] block">Zero</span>
                <span className="text-xs text-[#5A3E46] font-semibold">Stones Metal Purity</span>
              </div>
              <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3]">
                <span className="font-serif text-2xl font-bold text-[#4A1525] block">3-Micron</span>
                <span className="text-xs text-[#5A3E46] font-semibold">Anti-Tarnish Lifetime Seal</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="designer-intro-care-btn"
                onClick={() => navigate('/care')}
                className="bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold px-7 py-3 rounded-full text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Discover Heritage & Craft</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                id="designer-intro-gallery-btn"
                onClick={() => navigate('/gallery')}
                className="bg-[#FAF5F5] hover:bg-[#F3E2E6] text-[#4A1525] font-bold px-6 py-3 rounded-full text-xs sm:text-sm border border-[#E8D7D3] flex items-center gap-2 transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#C5A059]" />
                <span>Explore Lookbook</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
