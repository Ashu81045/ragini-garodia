import React, { useState } from 'react';
import { Product, JewelryCategory } from '../types';
import { ProductCard } from './ProductCard';
import { Crown, ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  navigate: (path: string) => void;
  handleAddToCart: (product: Product, quantity?: number) => void;
  wishlistIds: string[];
  handleToggleWishlist: (productId: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  navigate,
  handleAddToCart,
  wishlistIds,
  handleToggleWishlist
}) => {
  const [activeCategory, setActiveCategory] = useState<JewelryCategory | 'all'>('all');

  // Filter products for featured display (e.g. isBestSeller or featuredInLookbook or top rated)
  const featuredList = products.filter((p) => {
    const isFeatured = p.isBestSeller || p.featuredInLookbook || p.rating >= 4.8;
    if (activeCategory === 'all') return isFeatured;
    return isFeatured && p.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: 'All Featured' },
    { id: 'chokers-necklaces', label: 'Chokers & Collars' },
    { id: 'chains-harams', label: 'Temple Harams' },
    { id: 'bangles-kangans', label: 'Kangans & Cuffs' },
    { id: 'earrings-jhumkas', label: 'Dome Jhumkas' }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FFFDFD] text-[#2D1A20] border-b border-[#F0E2DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F0E2DF] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Curated Fine Gold Jewelry</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1525]">
              Featured <span className="italic text-[#C5A059]">Signature Creations</span>
            </h2>
            <p className="text-[#5A3E46] text-xs sm:text-sm">
              Handpicked 22K/18K micro-gold masterpieces with zero stones and 3-micron anti-tarnish finish.
            </p>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#4A1525] text-rose-50 shadow-md scale-105'
                    : 'bg-[#FAF5F5] text-[#5A3E46] hover:bg-[#F3E2E6] border border-[#E8D7D3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {featuredList.length === 0 ? (
          <div className="text-center py-12 bg-[#FAF5F5] rounded-3xl border border-[#E8D7D3]">
            <p className="text-xs text-[#5A3E46]">No featured items currently in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredList.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => navigate(`/product/${p.id}`)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

        {/* View All Collection Button */}
        <div className="text-center pt-4">
          <button
            id="featured-products-view-all-btn"
            onClick={() => navigate('/category/all')}
            className="inline-flex items-center gap-2 bg-[#FAF5F5] hover:bg-[#F3E2E6] text-[#4A1525] font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm border border-[#E8D7D3] transition-all cursor-pointer transform hover:scale-105 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>View Complete Pure Gold Collection</span>
            <ArrowRight className="w-4 h-4 text-[#4A1525]" />
          </button>
        </div>

      </div>
    </section>
  );
};
