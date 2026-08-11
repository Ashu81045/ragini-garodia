import React from 'react';
import { ShieldCheck, Sparkles, Award, Truck, HeartHandshake, CheckCircle2, Crown, RefreshCw } from 'lucide-react';

interface WhyUsProps {
  openCustomOrderModal: () => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ openCustomOrderModal }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '3-Micron Heavy Gold Plating',
      subtitle: 'Micro-Gold Seal',
      description: 'Layered with genuine 22K & 18K micro gold and sealed with anti-tarnish protective lacquer to resist oxidation, moisture, and daily wear.'
    },
    {
      icon: Sparkles,
      title: '100% Zero-Stone Metal Purity',
      subtitle: 'Pure Metal Heritage',
      description: 'Zero plastic or glass stones. Every design celebrates unadulterated metal elegance — featuring pure filigree, coins, and carved gold motifs.'
    },
    {
      icon: Award,
      title: 'Hereditary Artisan Handcraft',
      subtitle: 'Master Goldsmiths',
      description: 'Forged by generational goldsmiths across Kolkata, Jaipur, and South India, preserving centuries of royal Indian jewelry art.'
    },
    {
      icon: HeartHandshake,
      title: 'Hypoallergenic & Skin-Safe',
      subtitle: 'Nickel-Free Assurance',
      description: 'Crafted on premium eco-friendly jeweler brass base that is 100% lead-free and skin-safe for long festive wear.'
    },
    {
      icon: RefreshCw,
      title: 'Bespoke Custom Orders',
      subtitle: 'Tailored Sizing',
      description: 'Request custom collar dimensions, extended haram links, or bespoke bridal modifications directly with our master atelier.'
    },
    {
      icon: Truck,
      title: 'Complimentary Insured Express Delivery',
      subtitle: 'Pan-India Insured Delivery',
      description: 'Dispatched in tamper-evident royal velvet boxes with full transit insurance across all pincodes in India.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF5F5] text-[#2D1A20] border-b border-[#F0E2DF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Ragini Garodia Promise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1525]">
            Why Choose <span className="italic text-[#C5A059]">Ragini Garodia</span> Fine Jewelry?
          </h2>
          <p className="text-[#5A3E46] text-xs sm:text-sm leading-relaxed">
            Uncompromising standards, pure micro-gold finishing, and lifelong anti-tarnish elegance created for the discerning woman.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFDFD] p-6 sm:p-7 rounded-3xl border border-[#E8D7D3] shadow-xs hover:shadow-md transition-all duration-300 space-y-3.5 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] flex items-center justify-center shrink-0 group-hover:bg-[#4A1525] group-hover:text-amber-300 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#4A1525]">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-[#5A3E46] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Custom Order Callout Banner */}
        <div className="bg-[#4A1525] text-rose-50 rounded-3xl p-6 sm:p-8 border border-amber-300/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Looking for Bespoke Sizing or Custom Bridal Gold?</span>
            </h3>
            <p className="text-xs sm:text-sm text-rose-200">
              Consult directly with Ragini Garodia's master atelier for customized lengths, custom motifs, or bridal modifications.
            </p>
          </div>
          <button
            id="why-us-custom-modal-btn"
            onClick={openCustomOrderModal}
            className="bg-[#C5A059] hover:bg-[#D4AF67] text-[#2D1A20] font-bold px-7 py-3 rounded-full text-xs sm:text-sm tracking-wide whitespace-nowrap shadow-md transition-all cursor-pointer transform hover:scale-105 shrink-0"
          >
            Request Custom Gold Order
          </button>
        </div>

      </div>
    </section>
  );
};
