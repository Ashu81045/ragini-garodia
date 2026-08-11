import React, { useState } from 'react';
import { Sparkles, ShoppingBag, ArrowRight, CheckCircle, RefreshCw, AlertCircle, Crown } from 'lucide-react';
import { Product, StylistRequest, StylistRecommendation } from '../types';
import { PRODUCTS } from '../data/products';

interface AiStylistProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  prefillProduct?: Product | null;
}

export const AiStylist: React.FC<AiStylistProps> = ({
  onSelectProduct,
  onAddToCart,
  prefillProduct,
}) => {
  const [outfitType, setOutfitType] = useState('Bridal Lehenga');
  const [outfitColor, setOutfitColor] = useState('Deep Crimson Red & Zari');
  const [necklineStyle, setNecklineStyle] = useState('Sweetheart V-Neck');
  const [occasion, setOccasion] = useState('Wedding Reception');
  const [additionalNotes, setAdditionalNotes] = useState(
    prefillProduct ? `Looking for matching 100% gold-plated set for ${prefillProduct.name}` : ''
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<StylistRecommendation | null>(null);

  const handleGenerateAdvice = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outfitType,
          outfitColor,
          necklineStyle,
          occasion,
          additionalNotes,
        } as StylistRequest),
      });

      if (!res.ok) {
        throw new Error('Failed to reach AI Stylist service');
      }

      const data: StylistRecommendation = await res.json();
      setRecommendation(data);
    } catch (err: any) {
      console.error('Stylist fetch error:', err);
      setError('AI Stylist is temporarily calculating options. Trying offline match...');
    } finally {
      setLoading(false);
    }
  };

  const presetLooks = [
    {
      title: 'Royal Bridal Lehenga',
      type: 'Bridal Lehenga',
      color: 'Deep Crimson Red & Zari',
      neckline: 'Wide Sweetheart V-Neck',
      event: 'Grand Wedding Reception',
    },
    {
      title: 'Kanjeevaram Gold Silk Saree',
      type: 'Kanjeevaram Saree',
      color: 'Emerald & Gold Brocade',
      neckline: 'Traditional Square Neck',
      event: 'Traditional Temple Ceremony',
    },
    {
      title: 'Blush Pink Sangeet Anarkali',
      type: 'Anarkali Suit',
      color: 'Rose Gold & Pastel Pink',
      neckline: 'Boat Neck',
      event: 'Festive Sangeet Night',
    },
    {
      title: 'Minimalist Ivory Indo-Western',
      type: 'Indo-Western Fusion',
      color: 'Ivory & Raw Silk Gold',
      neckline: 'Off-Shoulder Cut',
      event: 'Cocktail & Evening Gala',
    },
  ];

  const applyPreset = (preset: typeof presetLooks[0]) => {
    setOutfitType(preset.type);
    setOutfitColor(preset.color);
    setNecklineStyle(preset.neckline);
    setOccasion(preset.event);
  };

  const matchedProducts = recommendation
    ? PRODUCTS.filter((p) => recommendation.matchingProductIds.includes(p.id))
    : [];

  return (
    <section className="py-12 bg-[#FFFDFD] text-[#2D1A20] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] text-xs uppercase tracking-widest font-bold">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Ragini Garodia Gemini AI Stylist</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A1525] tracking-tight">
            AI Pure Gold Jewelry <span className="italic text-[#C5A059]">Stylist</span>
          </h2>

          <p className="text-[#5A3E46] text-sm sm:text-base font-normal">
            Unsure which 22K gold micro-plated choker, coin haram, or textured kangans best elevate your ensemble? Tell our Gemini AI Stylist your outfit details for personalized zero-stone gold recommendations.
          </p>

          {/* Preset Buttons */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase text-[#8C6B75] block mb-2">Try an Outfit Preset:</span>
            <div className="flex flex-wrap justify-center gap-2">
              {presetLooks.map((p, idx) => (
                <button
                  key={idx}
                  id={`preset-outfit-${idx}`}
                  onClick={() => applyPreset(p)}
                  className="px-3.5 py-1.5 rounded-full bg-[#FAF5F5] hover:bg-[#F3E2E6] text-[#4A1525] border border-[#E8D7D3] text-xs font-bold transition-colors cursor-pointer"
                >
                  ✨ {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 bg-[#FFFDFD] border border-[#F0E2DF] p-6 sm:p-8 rounded-3xl shadow-xs space-y-5">
            <h3 className="font-serif text-xl font-bold text-[#4A1525] border-b border-[#F0E2DF] pb-3 flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#C5A059]" />
              <span>Describe Your Outfit</span>
            </h3>

            <form onSubmit={handleGenerateAdvice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#5A3E46] uppercase tracking-wider mb-1">
                  Outfit Type
                </label>
                <select
                  value={outfitType}
                  onChange={(e) => setOutfitType(e.target.value)}
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Bridal Lehenga">Bridal / Festive Lehenga</option>
                  <option value="Kanjeevaram Saree">Traditional / Silk Saree</option>
                  <option value="Anarkali Suit">Anarkali / Salwar Kameez</option>
                  <option value="Indo-Western Fusion">Indo-Western Fusion Gown</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5A3E46] uppercase tracking-wider mb-1">
                  Outfit Color Palette
                </label>
                <input
                  type="text"
                  value={outfitColor}
                  onChange={(e) => setOutfitColor(e.target.value)}
                  placeholder="e.g. Deep Crimson Red, Emerald Green, Mustard Yellow"
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5A3E46] uppercase tracking-wider mb-1">
                  Neckline Style
                </label>
                <select
                  value={necklineStyle}
                  onChange={(e) => setNecklineStyle(e.target.value)}
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Sweetheart V-Neck">Sweetheart / Deep V-Neck</option>
                  <option value="High Collar Cut">High Collar / Chanderi Neck</option>
                  <option value="Off-Shoulder Cut">Off-Shoulder / Strapless</option>
                  <option value="Boat Neck">Boat Neck / Round Neck</option>
                  <option value="Square Cut">Square Cut</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5A3E46] uppercase tracking-wider mb-1">
                  Occasion Formality
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Grand Wedding Reception">Grand Wedding Reception</option>
                  <option value="Sangeet & Mehendi Night">Sangeet & Mehendi Night</option>
                  <option value="Temple Puja / Ceremony">Temple Puja / Traditional Ceremony</option>
                  <option value="Festive Gathering">Festive / Holiday Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5A3E46] uppercase tracking-wider mb-1">
                  Preferences / Notes
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Prefer 22K coin harams, lightweight jhumkas..."
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] text-xs rounded-xl p-3 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                id="submit-ai-stylist-btn"
                disabled={loading}
                className="w-full bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Gemini AI Matching Gold Pieces...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Get Pure Gold Jewelry Match</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: AI Results & Matched Jewelry */}
          <div className="lg:col-span-7 space-y-6">
            {!recommendation && !loading && (
              <div className="bg-[#FFFDFD] border border-[#F0E2DF] rounded-3xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] mx-auto flex items-center justify-center">
                  <Crown className="w-8 h-8 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#4A1525]">Personalized Gold Styling Concierge</h3>
                <p className="text-[#5A3E46] text-sm max-w-md mx-auto font-normal">
                  Select your outfit details on the left or tap a preset to receive tailored 100% gold-plated styling recommendations from our Gemini AI engine.
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-[#FFFDFD] border border-[#E8C5CE] rounded-3xl p-12 text-center space-y-4 animate-pulse">
                <Sparkles className="w-12 h-12 text-[#C5A059] mx-auto animate-spin" />
                <h3 className="font-serif text-xl font-bold text-[#4A1525]">Matching Pure Gold Pieces...</h3>
                <p className="text-xs text-[#8C6B75] font-mono">Verifying zero stone gold plating and neckline proportions</p>
              </div>
            )}

            {recommendation && !loading && (
              <div className="space-y-6 animate-fade-in">
                
                {/* AI Advice Summary Card */}
                <div className="bg-[#FFFDFD] border border-[#E8C5CE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#F0E2DF] pb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C5A059]" />
                      <span>Gemini AI Recommendation</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FAF0F2] text-[#4A1525] text-xs font-bold border border-[#E8C5CE]">
                      {recommendation.styleVibe}
                    </span>
                  </div>

                  <p className="text-[#2D1A20] text-sm sm:text-base font-normal leading-relaxed">
                    "{recommendation.overallAdvice}"
                  </p>

                  {/* Styling Tips */}
                  {recommendation.stylingTips && recommendation.stylingTips.length > 0 && (
                    <div className="pt-2 border-t border-[#F0E2DF] space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B75]">Wearing & Care Guidance:</h4>
                      <ul className="space-y-1.5">
                        {recommendation.stylingTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-[#5A3E46]">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Matched Product Cards */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#4A1525] mb-4 flex items-center gap-2">
                    <span>Curated Gold Matches ({matchedProducts.length})</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-[#FFFDFD] rounded-2xl border border-[#F0E2DF] hover:border-[#E8C5CE] p-4 flex gap-4 items-center shadow-xs"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 object-cover rounded-xl bg-[#FAF5F5] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider block">
                            22K Micro Gold • 0 Stones
                          </span>
                          <h4 className="font-serif text-sm font-bold text-[#4A1525] truncate">
                            {prod.name}
                          </h4>
                          <span className="font-serif text-sm font-bold text-[#4A1525] block">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>

                          <div className="flex gap-2 pt-1">
                            <button
                              id={`stylist-view-details-${prod.id}`}
                              onClick={() => onSelectProduct(prod)}
                              className="px-2.5 py-1 rounded-lg bg-[#FAF5F5] text-[#4A1525] text-[11px] font-bold hover:bg-[#F3E2E6] cursor-pointer"
                            >
                              Specs
                            </button>
                            <button
                              id={`stylist-add-to-bag-${prod.id}`}
                              onClick={() => onAddToCart(prod)}
                              className="px-3 py-1 rounded-lg bg-[#4A1525] text-rose-50 text-[11px] font-bold flex items-center gap-1 hover:bg-[#5C1D2E] cursor-pointer"
                            >
                              <ShoppingBag className="w-3 h-3 text-amber-300" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
