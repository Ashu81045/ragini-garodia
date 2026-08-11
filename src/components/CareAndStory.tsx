import React, { useState } from 'react';
import { ShieldCheck, Award, ChevronDown, Sparkles, Crown, Package, Truck, Phone } from 'lucide-react';

export const CareAndStory: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does Ragini Garodia jewelry contain any gemstones or synthetic crystals?',
      a: 'No. Ragini Garodia specializes strictly in 100% pure gold-plated metalwork with ZERO stones. Our pieces showcase the pristine, radiant luster of pure 22K/18K micro-gold plating through intricate Indian metal filigree, coin embossing, and hand-carved textures.',
    },
    {
      q: 'Will Ragini Garodia gold plating tarnish or lose color over time?',
      a: 'All our pieces undergo a 3-micron electro-sealed anti-tarnish micro-plating process over high-grade jeweler copper and brass alloys. With proper care (keeping away from direct moisture, alcohol, and perfume), your gold jewelry maintains its brilliant shine for years.',
    },
    {
      q: 'Is the jewelry safe for sensitive Indian skin types?',
      a: 'Yes! All base metals used by Ragini Garodia are 100% nickel-free, lead-free, and hypoallergenic, making them safe for sensitive skin during day-long weddings and festive celebrations.',
    },
    {
      q: 'How long does shipping take across India?',
      a: 'Orders are dispatched within 24 hours from our Kolkata/Mumbai vault via courier partners like Bluedart Express. Standard delivery takes 2 to 4 business days across major Indian cities with full live order tracking.',
    },
    {
      q: 'Can I request custom adjustments or special gold sizing?',
      a: 'Yes! We offer custom dori adjustments and length modifications for brides and custom occasions across India. Simply click "Custom Request" in our store navigation or contact support@raginigarodia.com.',
    },
  ];

  return (
    <section className="py-12 bg-[#FFFDFD] text-[#2D1A20] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Brand Story Hero */}
        <div className="bg-[#FFFDFD] border border-[#F0E2DF] rounded-3xl p-8 lg:p-12 shadow-xs relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] text-xs font-bold uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Heritage & Gold Craftsmanship</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A1525] leading-tight">
              The Heritage of <span className="italic text-[#C5A059]">RAGINI GARODIA</span>
            </h2>

            <p className="text-[#5A3E46] text-sm sm:text-base font-normal leading-relaxed">
              Rooted in the royal jewelry traditions of India, Ragini Garodia celebrates the timeless elegance of unadorned pure gold metalwork. We reject synthetic stones and fake crystals, focusing entirely on high-micron 22K gold micro-plating over hand-carved filigree, coin harams, and textured kangans.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-3 bg-[#FAF5F5] rounded-2xl border border-[#E8D7D3]">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] mb-1" />
                <span className="font-bold text-[#4A1525] block">3-Micron Gold Seal</span>
                <span className="text-[10px] text-[#8C6B75]">Anti-tarnish protective coating</span>
              </div>
              <div className="p-3 bg-[#FAF5F5] rounded-2xl border border-[#E8D7D3]">
                <Award className="w-5 h-5 text-[#C5A059] mb-1" />
                <span className="font-bold text-[#4A1525] block">22K/18K Gold Plating</span>
                <span className="text-[10px] text-[#8C6B75]">Authentic Indian gold luster</span>
              </div>
              <div className="p-3 bg-[#FAF5F5] rounded-2xl border border-[#E8D7D3] col-span-2 sm:col-span-1">
                <Crown className="w-5 h-5 text-[#C5A059] mb-1" />
                <span className="font-bold text-[#4A1525] block">Zero Stones</span>
                <span className="text-[10px] text-[#8C6B75]">100% Pure Metal Artistry</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF5F5] border border-[#E8D7D3] p-6 rounded-3xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#4A1525] border-b border-[#E8D7D3] pb-2 flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#C5A059]" />
              <span>Gold Plating Care Instructions</span>
            </h3>
            <ul className="space-y-3 text-xs text-[#5A3E46]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#4A1525] text-amber-300 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span><strong>Wear Last:</strong> Put on your gold jewelry AFTER applying makeup, perfumes, and hairsprays.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#4A1525] text-amber-300 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span><strong>Avoid Moisture:</strong> Remove before bathing, swimming, or intense physical workouts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#4A1525] text-amber-300 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span><strong>Velvet Pouch Storage:</strong> Store in our signature anti-tarnish velvet pouch to protect micro-plating.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#4A1525] text-amber-300 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <span><strong>Gentle Wipe:</strong> Clean gently with a soft micro-fiber cloth after each wear.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1525]">
              Frequently Asked Questions
            </h3>
            <p className="text-[#5A3E46] text-xs sm:text-sm">
              Learn about Ragini Garodia pure gold-plated craftsmanship, zero stone policy & India dispatch.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDFD] border border-[#F0E2DF] rounded-2xl overflow-hidden shadow-xs"
              >
                <button
                  id={`faq-toggle-${idx}`}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 text-xs sm:text-sm font-bold text-[#4A1525] flex items-center justify-between gap-4 hover:text-[#5C1D2E] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A059] transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-[#5A3E46] font-normal border-t border-[#F0E2DF] leading-relaxed bg-[#FAF5F5]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
