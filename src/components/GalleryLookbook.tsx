import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../data/lookbook';
import { PRODUCTS } from '../data/products';
import { LookbookItem, Product } from '../types';
import { Sparkles, ShoppingBag, Eye, Tag, ArrowRight, ShieldCheck, Crown } from 'lucide-react';

interface GalleryLookbookProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  navigate: (path: string) => void;
}

export const GalleryLookbook: React.FC<GalleryLookbookProps> = ({
  onSelectProduct,
  onAddToCart,
  navigate,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [activeHotspotProduct, setActiveHotspotProduct] = useState<Product | null>(null);

  const filteredLookbook = selectedOccasion === 'all'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter((item) => item.occasion === selectedOccasion);

  const handleHotspotClick = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const matched = (PRODUCTS || []).find((p) => p.id === productId);
    if (matched) {
      setActiveHotspotProduct(matched);
    }
  };

  return (
    <section className="py-12 bg-[#FFFDFD] text-[#2D1A20] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] text-xs uppercase tracking-widest font-bold">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Pure Gold Plated Interactive Lookbook</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A1525] tracking-tight">
            RAGINI GARODIA <span className="italic text-[#C5A059]">Gallery</span>
          </h2>

          <p className="text-[#5A3E46] text-sm sm:text-base font-normal">
            Explore our high-fashion curated galleries across India. Tap on the glowing numbered hotspots on any lookbook model photo to reveal and shop the exact 100% gold-plated (zero stone) pieces worn in the look.
          </p>

          {/* Occasion Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Pure Gold Looks' },
              { id: 'bridal', label: 'Bridal Grandeur' },
              { id: 'festive', label: 'Festive & Sangeet' },
              { id: 'cocktail', label: 'Royal Temple & Coin' },
              { id: 'casual', label: 'Daily Minimalist Gold' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`gallery-filter-${tab.id}`}
                onClick={() => setSelectedOccasion(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  selectedOccasion === tab.id
                    ? 'bg-[#4A1525] text-rose-50 shadow-md scale-105'
                    : 'bg-[#FAF5F5] text-[#4A1525] hover:bg-[#F3E2E6] border border-[#E8D7D3]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Cards Grid */}
        <div className="space-y-16">
          {filteredLookbook.map((look) => (
            <div
              key={look.id}
              className="bg-[#FFFDFD] rounded-3xl border border-[#F0E2DF] overflow-hidden shadow-xs p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              
              {/* Image Container with Hotspots */}
              <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#FAF5F5] border border-[#E8D7D3] group">
                <img
                  src={look.image}
                  alt={look.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1A20]/80 via-transparent to-transparent opacity-60" />

                {/* Hotspot Pins */}
                {look.hotspots.map((spot, idx) => (
                  <button
                    key={idx}
                    id={`hotspot-${look.id}-${idx}`}
                    onClick={(e) => handleHotspotClick(spot.productId, e)}
                    style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 cursor-pointer"
                    title={`Shop ${spot.title}`}
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-[#4A1525] text-amber-300 font-bold text-xs items-center justify-center shadow-md border border-amber-300">
                        {idx + 1}
                      </span>
                    </span>

                    {/* Hover Tag */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:flex flex-col items-center pointer-events-none z-30 min-w-max">
                      <div className="bg-[#4A1525] text-rose-50 text-[11px] font-bold py-1 px-3 rounded-xl border border-amber-300/40 shadow-xl">
                        {spot.title} <span className="text-amber-300 ml-1">₹{spot.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-2 h-2 bg-[#4A1525] rotate-45 -mt-1 border-r border-b border-amber-300/40" />
                    </div>
                  </button>
                ))}

                <div className="absolute bottom-3 left-3 bg-[#4A1525]/90 backdrop-blur-md text-[10px] font-semibold uppercase tracking-widest text-rose-100 px-3 py-1 rounded-full border border-amber-300/30">
                  Tap pins (1-3) to shop 100% gold pieces
                </div>
              </div>

              {/* Look Description & Featured Items List */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
                    Occasion: {look.occasion.toUpperCase()}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1525]">
                    {look.title}
                  </h3>
                  <p className="text-xs text-[#5A3E46] font-bold mt-1">
                    {look.subtitle}
                  </p>
                  <p className="text-[#5A3E46] text-xs sm:text-sm font-normal mt-2 leading-relaxed">
                    {look.description}
                  </p>
                </div>

                {/* Hotspot Products Quick List */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B75] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Pure Gold Jewelry in this Look:</span>
                  </h4>

                  <div className="space-y-2">
                    {look.hotspots.map((spot, idx) => {
                      const matchedProd = PRODUCTS.find((p) => p.id === spot.productId);
                      if (!matchedProd) return null;

                      return (
                        <div
                          key={idx}
                          onClick={() => onSelectProduct(matchedProd)}
                          className="bg-[#FAF5F5] hover:bg-[#F3E2E6] p-3 rounded-2xl border border-[#E8D7D3] flex items-center justify-between gap-3 cursor-pointer group/item transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#4A1525] text-amber-300 text-xs font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div>
                              <h5 className="text-xs font-bold text-[#4A1525] group-hover/item:text-[#5C1D2E] transition-colors">
                                {matchedProd.name}
                              </h5>
                              <span className="text-[10px] text-[#C5A059] font-medium">
                                22K Micro Gold • 0 Stones
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-serif text-sm font-bold text-[#4A1525]">
                              ₹{matchedProd.price.toLocaleString('en-IN')}
                            </span>
                            <button
                              id={`lookbook-add-cart-${matchedProd.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(matchedProd);
                              }}
                              className="p-1.5 rounded-lg bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold transition-colors cursor-pointer"
                              title="Add to Bag"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id={`lookbook-consult-stylist-${look.id}`}
                    onClick={() => navigate('/stylist')}
                    className="w-full py-2.5 rounded-2xl bg-[#FAF5F5] hover:bg-[#F3E2E6] text-[#4A1525] border border-[#E8D7D3] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Get AI Styling Advice for this Gold Look</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Hotspot Preview Quick Drawer / Modal */}
        {activeHotspotProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-[#FFFDFD] border border-[#F0E2DF] rounded-3xl max-w-md w-full p-6 space-y-4 text-[#2D1A20] shadow-2xl relative">
              <button
                id="close-hotspot-modal-btn"
                onClick={() => setActiveHotspotProduct(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FAF5F5] text-[#8C6B75] hover:text-[#4A1525] cursor-pointer"
              >
                ✕
              </button>

              <div className="aspect-square rounded-2xl overflow-hidden bg-[#FAF5F5]">
                <img
                  src={activeHotspotProduct.images[0]}
                  alt={activeHotspotProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest block">Featured Piece</span>
                <h3 className="font-serif text-lg font-bold text-[#4A1525]">{activeHotspotProduct.name}</h3>
                <p className="text-xs text-[#5A3E46] font-normal mt-1">{activeHotspotProduct.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-[#F0E2DF] pt-3">
                <span className="font-serif text-xl font-bold text-[#4A1525]">₹{activeHotspotProduct.price.toLocaleString('en-IN')}</span>
                <div className="flex gap-2">
                  <button
                    id="hotspot-view-full-details-btn"
                    onClick={() => {
                      onSelectProduct(activeHotspotProduct);
                      setActiveHotspotProduct(null);
                    }}
                    className="px-3 py-2 rounded-xl bg-[#FAF5F5] text-[#4A1525] text-xs font-bold border border-[#E8D7D3] cursor-pointer"
                  >
                    View Specs
                  </button>
                  <button
                    id="hotspot-add-to-bag-btn"
                    onClick={() => {
                      onAddToCart(activeHotspotProduct);
                      setActiveHotspotProduct(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#4A1525] text-rose-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
