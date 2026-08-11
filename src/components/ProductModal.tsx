import React, { useState } from 'react';
import { X, Star, ShieldCheck, Heart, ShoppingBag, Sparkles, Check, Truck, RotateCcw, Crown } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onConsultStylistForProduct: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onConsultStylistForProduct,
}) => {
  if (!product) return null;

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'reviews'>('specs');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative bg-[#FFFDFD] border border-[#F0E2DF] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-[#2D1A20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF5F5] text-[#8C6B75] hover:text-[#4A1525] hover:bg-[#F3E2E6] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF5F5] border border-[#F0E2DF]">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <button
                id={`modal-wishlist-toggle-${product.id}`}
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                  isWishlisted ? 'bg-rose-600 text-white' : 'bg-white/80 text-[#8C6B75] hover:text-[#4A1525]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                      idx === selectedImageIdx ? 'border-[#4A1525] scale-105 shadow-sm' : 'border-[#E8D7D3] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-[#5A3E46] border-t border-[#F0E2DF]">
              <div className="p-2 rounded-xl bg-[#FAF5F5] flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] mb-1" />
                <span>100% Gold Plated</span>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF5F5] flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#C5A059] mb-1" />
                <span>Free Delivery India</span>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF5F5] flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-[#C5A059] mb-1" />
                <span>Zero Stone Seal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Title */}
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] mb-1">
                RAGINI GARODIA • {product.category.replace('-', ' ')}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1525] leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-[#2D1A20] ml-1">{product.rating}</span>
                </div>
                <span className="text-[#8C6B75] text-xs">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#4A1525]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#8C6B75] line-through font-serif">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  In Stock in Vault
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-[#5A3E46] text-xs leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Quantity Selector & Add To Cart */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-[#5A3E46]">Quantity:</span>
                  <div className="flex items-center border border-[#E8D7D3] rounded-xl bg-[#FAF5F5]">
                    <button
                      id="modal-qty-minus"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-[#4A1525] hover:bg-[#F3E2E6] font-bold rounded-l-xl cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-[#4A1525]">{quantity}</span>
                    <button
                      id="modal-qty-plus"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-[#4A1525] hover:bg-[#F3E2E6] font-bold rounded-r-xl cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    id={`modal-add-to-cart-${product.id}`}
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 rounded-full font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Added to Shopping Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-amber-300" />
                        <span>Add to Bag (₹{(product.price * quantity).toLocaleString('en-IN')})</span>
                      </>
                    )}
                  </button>

                  <button
                    id={`modal-stylist-btn-${product.id}`}
                    onClick={() => {
                      onConsultStylistForProduct(product);
                      onClose();
                    }}
                    className="p-3 rounded-full bg-[#FAF5F5] hover:bg-[#F3E2E6] text-[#4A1525] border border-[#E8D7D3] flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap cursor-pointer"
                    title="Ask AI Stylist how to wear this"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Stylist</span>
                  </button>
                </div>
              </div>

              {/* Tabs: Specs, Care, Reviews */}
              <div className="mt-6 border-t border-[#F0E2DF] pt-3">
                <div className="flex gap-4 border-b border-[#F0E2DF] pb-2">
                  <button
                    id="modal-tab-specs"
                    onClick={() => setActiveTab('specs')}
                    className={`text-xs font-bold pb-1 transition-colors border-b-2 cursor-pointer ${
                      activeTab === 'specs' ? 'text-[#4A1525] border-[#4A1525]' : 'text-[#8C6B75]'
                    }`}
                  >
                    Gold Specs
                  </button>
                  <button
                    id="modal-tab-care"
                    onClick={() => setActiveTab('care')}
                    className={`text-xs font-bold pb-1 transition-colors border-b-2 cursor-pointer ${
                      activeTab === 'care' ? 'text-[#4A1525] border-[#4A1525]' : 'text-[#8C6B75]'
                    }`}
                  >
                    Plating Care
                  </button>
                  <button
                    id="modal-tab-reviews"
                    onClick={() => setActiveTab('reviews')}
                    className={`text-xs font-bold pb-1 transition-colors border-b-2 cursor-pointer ${
                      activeTab === 'reviews' ? 'text-[#4A1525] border-[#4A1525]' : 'text-[#8C6B75]'
                    }`}
                  >
                    Reviews ({product.reviews.length})
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#5A3E46] space-y-2">
                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#FAF5F5] p-2 rounded-xl border border-[#E8D7D3]">
                        <span className="text-[#8C6B75] block text-[9px] uppercase font-semibold">BASE METAL</span>
                        <span className="text-[#2D1A20] font-bold">{product.specifications.baseMetal}</span>
                      </div>
                      <div className="bg-[#FAF5F5] p-2 rounded-xl border border-[#E8D7D3]">
                        <span className="text-[#8C6B75] block text-[9px] uppercase font-semibold">PLATING</span>
                        <span className="text-[#4A1525] font-bold">{product.specifications.plating}</span>
                      </div>
                      <div className="bg-[#FAF5F5] p-2 rounded-xl border border-[#E8D7D3]">
                        <span className="text-[#8C6B75] block text-[9px] uppercase font-semibold">STONE TYPE</span>
                        <span className="text-[#2D1A20] font-bold">{product.specifications.stoneType}</span>
                      </div>
                      <div className="bg-[#FAF5F5] p-2 rounded-xl border border-[#E8D7D3]">
                        <span className="text-[#8C6B75] block text-[9px] uppercase font-semibold">CLOSURE</span>
                        <span className="text-[#2D1A20] font-bold">{product.specifications.closureType}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <ul className="list-disc list-inside space-y-1 text-[#2D1A20]">
                      <li>Avoid direct contact with perfumes, sanitizers, and moisture.</li>
                      <li>Store in the provided velvet anti-tarnish pouch after wearing.</li>
                      <li>Clean gently with a soft micro-fiber cloth to preserve gold shine.</li>
                    </ul>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {product.reviews.length === 0 ? (
                        <p className="text-[#8C6B75] italic">Be the first to review this gold piece!</p>
                      ) : (
                        product.reviews.map((rev) => (
                          <div key={rev.id} className="p-2 rounded-xl bg-[#FAF5F5] border border-[#E8D7D3]">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#4A1525]">{rev.userName}</span>
                              <div className="flex text-amber-500 text-[10px]">
                                {'★'.repeat(rev.rating)}
                              </div>
                            </div>
                            <p className="text-[#5A3E46] text-[11px] mt-0.5">{rev.comment}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
