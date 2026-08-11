import React from 'react';
import { Crown, Sparkles, Star, ArrowRight, BookOpen } from 'lucide-react';
import bridalLookbookImg from '../assets/images/bridal_lookbook_1786368204421.jpg';
import raginiHeroImg from '../assets/images/ragini_gold_hero_1786370846007.jpg';
import raginiBanglesImg from '../assets/images/ragini_gold_bangles_1786370859091.jpg';

interface CelebritySectionProps {
  navigate: (path: string) => void;
}

export const CelebritySection: React.FC<CelebritySectionProps> = ({ navigate }) => {
  const celebrityFeatures = [
    {
      id: 'celeb-1',
      name: 'Sonam Kapoor Ahuja',
      publication: 'Vogue India Cover Feature',
      jewelryWorn: "'Aura' Molten Gold Sculptural Choker",
      quote: "Ragini Garodia's zero-stone gold pieces possess a sculptural drama that elevates contemporary saree draping to museum-worthy art.",
      image: raginiHeroImg,
      targetCategory: '/category/chokers-necklaces'
    },
    {
      id: 'celeb-2',
      name: 'Kiara Advani',
      publication: 'Harper’s Bazaar Bride Gala',
      jewelryWorn: 'Royal 22K Filigree Temple Set',
      quote: 'Pure gold finish with zero heavy stones allowed me to move with effortless royal poise throughout the reception gala.',
      image: bridalLookbookImg,
      targetCategory: '/category/bridal-ensembles'
    },
    {
      id: 'celeb-3',
      name: 'Ananya Panday',
      publication: 'Elle Wedding Special Editorial',
      jewelryWorn: "'Aethel' Imperfect Gold Wrist Cuffs",
      quote: 'The satin gold texture on these cuffs is breathtaking. It feels like wearing pure gold sunshine on your wrists.',
      image: raginiBanglesImg,
      targetCategory: '/category/bangles-kangans'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FFFDFD] text-[#2D1A20] border-b border-[#F0E2DF] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FAF0F2] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
            <span>Red Carpet & Editorial Feature</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1525]">
            As Seen On — <span className="italic text-[#C5A059]">Celebrity Styling</span>
          </h2>
          <p className="text-[#5A3E46] text-xs sm:text-sm leading-relaxed">
            Gracing Vogue covers, red carpet galas, and high-fashion bridal editorials.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {celebrityFeatures.map((celeb) => (
            <div
              key={celeb.id}
              className="bg-[#FAF5F5] rounded-3xl overflow-hidden border border-[#E8D7D3] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Box */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#2D1A20]">
                <img
                  src={celeb.image}
                  alt={celeb.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1A20] via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 left-4 bg-[#4A1525]/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300/40 text-rose-100 text-[10px] font-bold uppercase tracking-wider">
                  {celeb.publication}
                </div>
              </div>

              {/* Editorial Quote & Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#4A1525]">
                    {celeb.name}
                  </h3>
                  <span className="text-xs font-bold text-[#C5A059] block">
                    Styled in: {celeb.jewelryWorn}
                  </span>
                  <p className="text-xs text-[#5A3E46] italic leading-relaxed pt-1">
                    "{celeb.quote}"
                  </p>
                </div>

                <button
                  id={`shop-look-btn-${celeb.id}`}
                  onClick={() => navigate(celeb.targetCategory)}
                  className="w-full mt-2 bg-[#FFFDFD] hover:bg-[#4A1525] text-[#4A1525] hover:text-rose-50 border border-[#E8D7D3] font-bold px-4 py-2.5 rounded-full text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>Shop Her Look</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Gallery Lookbook Callout */}
        <div className="bg-[#FAF0F2] rounded-3xl p-6 sm:p-8 border border-[#E8C5CE] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold text-[#4A1525] flex items-center justify-center sm:justify-start gap-2">
              <Crown className="w-4 h-4 text-[#C5A059]" />
              <span>Explore High-Fashion Lookbook & Editorial Styling</span>
            </h3>
            <p className="text-xs text-[#5A3E46]">
              Browse high-resolution bridal styling campaigns and red-carpet jewelry inspirations.
            </p>
          </div>
          <button
            id="celeb-lookbook-nav-btn"
            onClick={() => navigate('/gallery')}
            className="bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold px-6 py-3 rounded-full text-xs shrink-0 flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Open Lookbook</span>
          </button>
        </div>

      </div>
    </section>
  );
};
