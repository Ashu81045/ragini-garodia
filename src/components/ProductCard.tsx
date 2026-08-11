import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check, ShieldCheck, Crown } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="group bg-[#FFFDFD] rounded-2xl border border-[#F0E2DF] hover:border-[#E8C5CE] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#FAF5F5]">
        <img
          src={product.images[currentImageIdx] || product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-[#4A1525] text-amber-300 font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <Crown className="w-3 h-3 text-amber-300" />
            100% Gold Plated
          </span>
          {discountPercent && (
            <span className="bg-rose-100 text-[#4A1525] font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-rose-200">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-white/80 text-[#8C6B75] hover:text-[#4A1525] hover:bg-white'
          }`}
          title="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-x-0 bottom-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="w-full bg-[#FFFDFD]/95 hover:bg-[#FAF5F5] text-[#4A1525] text-xs font-bold py-2 px-3 rounded-full border border-[#E8D7D3] backdrop-blur-md flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Quick View & Gold Specs</span>
          </button>
        </div>

        {/* Thumbnail Dots if multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.map((_, idx) => (
              <span
                key={idx}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setCurrentImageIdx(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full ${
                  idx === currentImageIdx ? 'bg-[#4A1525] w-3' : 'bg-[#C5A059]'
                } transition-all`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metal & Tag Info */}
          <div className="flex items-center justify-between text-[10px] text-[#C5A059] font-semibold uppercase tracking-wider mb-1">
            <span>{product.specifications.plating}</span>
            <span className="flex items-center gap-0.5 text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">
              0 Stones
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-sm font-bold text-[#4A1525] group-hover:text-[#5C1D2E] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[11px] font-bold text-[#2D1A20] ml-1">{product.rating}</span>
            </div>
            <span className="text-[10px] text-[#8C6B75]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="pt-2 border-t border-[#F0E2DF] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-base font-bold text-[#4A1525]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-[#8C6B75] line-through font-serif">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleAddToCart}
            className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 shadow-xs'
            }`}
            title="Add to Shopping Bag"
          >
            {addedAnimation ? (
              <Check className="w-4 h-4 animate-bounce" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-amber-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
