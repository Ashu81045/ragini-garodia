import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
  navigate: (path: string) => void;
  handleAddToCart: (product: Product, quantity?: number) => void;
  wishlistIds: string[];
  handleToggleWishlist: (productId: string) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  navigate,
  handleAddToCart,
  wishlistIds,
  handleToggleWishlist
}) => {
  // Select products marked or suited for New Arrivals (e.g., last 4 products or tagged)
  const newArrivalsList = products.slice().reverse().slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#FAF5F5] text-[#2D1A20] border-b border-[#F0E2DF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] text-[#4A1525] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>New In Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1525]">
            Fresh <span className="italic text-[#C5A059]">Seasonal Gold Arrivals</span>
          </h2>
          <p className="text-[#5A3E46] text-xs sm:text-sm leading-relaxed">
            Discover the latest 22K micro-gold plated designs fresh off our artisan forge.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivalsList.map((product) => (
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

        {/* Banner CTA */}
        <div className="text-center pt-2">
          <button
            id="new-arrivals-all-btn"
            onClick={() => navigate('/category/all')}
            className="inline-flex items-center gap-2 bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Explore All New Gold Additions</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
