import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Crown, 
  Truck, 
  RotateCcw, 
  Share2,
  Package,
  Check
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  products?: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  navigate: (path: string) => void;
  showToast?: (msg: string) => void;
  onConsultStylistForProduct?: (prod: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  products = PRODUCTS,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  navigate,
  showToast = (_msg: string) => {},
  onConsultStylistForProduct
}) => {
  const safeProducts = products || PRODUCTS;
  const product = safeProducts.find((p) => p.id === productId) || safeProducts[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeSpecTab, setActiveSpecTab] = useState<'specs' | 'care' | 'reviews'>('specs');

  // New review state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#4A1525]">Product Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-[#4A1525] text-white rounded-full text-xs font-bold"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    product.reviews.unshift({
      id: `rev-${Date.now()}`,
      userName: newReviewName,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment,
      verifiedPurchase: true
    });

    setNewReviewName('');
    setNewReviewComment('');
    showToast('Thank you! Your review was published.');
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#4A1525] hover:text-[#5C1D2E] bg-[#FAF5F5] hover:bg-[#F3E2E6] px-4 py-2 rounded-full border border-[#E8D7D3] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        <span className="text-xs text-[#8C6B75] font-medium hidden sm:inline">
          RAGINI GARODIA / <span className="capitalize">{product.category.replace('-', ' ')}</span> / {product.name}
        </span>
      </div>

      {/* Main Product Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#FAF5F5] border border-[#F0E2DF] shadow-md group">
            <img
              src={product.images[activeImgIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <span className="bg-[#4A1525] text-amber-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Crown className="w-3 h-3" />
                100% Gold Plated
              </span>
              <span className="bg-rose-100 text-[#4A1525] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-rose-200 shadow-xs">
                Zero Stones
              </span>
            </div>

            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-md text-[#4A1525] hover:scale-110 shadow-md transition-all cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'text-rose-600 fill-current' : 'text-[#8C6B75]'}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImgIndex === idx
                      ? 'border-[#4A1525] scale-105 shadow-md'
                      : 'border-[#E8D7D3] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Purchase */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-bold uppercase tracking-widest">
              <Crown className="w-4 h-4" />
              <span>RAGINI GARODIA FINE JEWELRY</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1525]">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-bold text-[#2D1A20]">{product.rating}</span>
              </div>
              <span className="text-[#8C6B75]">({product.reviewCount} Verified Ratings)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full text-[10px]">
                In Vault: {product.stockQuantity} Units Left
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#FAF5F5] p-5 rounded-2xl border border-[#E8D7D3] flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#4A1525]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-base text-[#8C6B75] line-through font-serif">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent && (
              <span className="bg-[#4A1525] text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full">
                Save {discountPercent}%
              </span>
            )}
            <span className="block text-[11px] text-[#8C6B75] w-full pt-1">
              Inclusive of all taxes & free express shipping across India.
            </span>
          </div>

          {/* Zero Stones Certificate Notice */}
          <div className="bg-[#FFFDFD] p-4 rounded-2xl border border-[#F0E2DF] flex items-start gap-3 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <span className="font-bold text-[#4A1525] block">Pure Gold Plated Guarantee</span>
              <p className="text-[#5A3E46]">
                Zero stones, zero glass beads, zero synthetic crystals. 100% solid micro-gold plated metalwork with 3-micron anti-tarnish protective sealant.
              </p>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#5A3E46] leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#5A3E46]">Quantity:</span>
              <div className="flex items-center border border-[#E8D7D3] rounded-xl bg-[#FAF5F5]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 font-bold text-[#4A1525] hover:bg-[#F3E2E6] rounded-l-xl cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-[#4A1525]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 font-bold text-[#4A1525] hover:bg-[#F3E2E6] rounded-r-xl cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="add-to-bag-pdp-btn"
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold py-3.5 px-6 rounded-full text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Add to Shopping Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </button>

              <button
                id="consult-stylist-pdp-btn"
                onClick={() => navigate('/stylist')}
                className="bg-[#FAF5F5] hover:bg-[#F3E2E6] text-[#4A1525] font-bold py-3.5 px-6 rounded-full text-xs sm:text-sm border border-[#E8D7D3] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Consult Stylist</span>
              </button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#F0E2DF] text-center text-[10px] font-semibold text-[#5A3E46]">
            <div className="p-2 bg-[#FAF5F5] rounded-xl border border-[#E8D7D3]">
              <Truck className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
              <span>Free Delivery in India</span>
            </div>
            <div className="p-2 bg-[#FAF5F5] rounded-xl border border-[#E8D7D3]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
              <span>Anti-Tarnish Seal</span>
            </div>
            <div className="p-2 bg-[#FAF5F5] rounded-xl border border-[#E8D7D3]">
              <RotateCcw className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
              <span>Easy 7-Day Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specifications, Care & Customer Reviews */}
      <div className="bg-[#FFFDFD] rounded-3xl border border-[#F0E2DF] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-4 border-b border-[#F0E2DF] pb-3">
          <button
            onClick={() => setActiveSpecTab('specs')}
            className={`text-xs sm:text-sm font-bold pb-2 transition-all border-b-2 cursor-pointer ${
              activeSpecTab === 'specs'
                ? 'border-[#4A1525] text-[#4A1525]'
                : 'border-transparent text-[#8C6B75] hover:text-[#4A1525]'
            }`}
          >
            Gold Specifications
          </button>
          <button
            onClick={() => setActiveSpecTab('care')}
            className={`text-xs sm:text-sm font-bold pb-2 transition-all border-b-2 cursor-pointer ${
              activeSpecTab === 'care'
                ? 'border-[#4A1525] text-[#4A1525]'
                : 'border-transparent text-[#8C6B75] hover:text-[#4A1525]'
            }`}
          >
            Plating Care Instructions
          </button>
          <button
            onClick={() => setActiveSpecTab('reviews')}
            className={`text-xs sm:text-sm font-bold pb-2 transition-all border-b-2 cursor-pointer ${
              activeSpecTab === 'reviews'
                ? 'border-[#4A1525] text-[#4A1525]'
                : 'border-transparent text-[#8C6B75] hover:text-[#4A1525]'
            }`}
          >
            Reviews ({product.reviews.length})
          </button>
        </div>

        {/* Tab 1: Specifications */}
        {activeSpecTab === 'specs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] space-y-1">
              <span className="text-[#8C6B75] font-semibold block uppercase text-[10px]">Base Metal</span>
              <p className="font-bold text-[#4A1525]">{product.specifications.baseMetal}</p>
            </div>
            <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] space-y-1">
              <span className="text-[#8C6B75] font-semibold block uppercase text-[10px]">Gold Plating Quality</span>
              <p className="font-bold text-[#4A1525]">{product.specifications.plating}</p>
            </div>
            <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] space-y-1">
              <span className="text-[#8C6B75] font-semibold block uppercase text-[10px]">Stone Type</span>
              <p className="font-bold text-[#4A1525]">{product.specifications.stoneType}</p>
            </div>
            <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] space-y-1">
              <span className="text-[#8C6B75] font-semibold block uppercase text-[10px]">Closure Mechanism</span>
              <p className="font-bold text-[#4A1525]">{product.specifications.closureType}</p>
            </div>
          </div>
        )}

        {/* Tab 2: Care */}
        {activeSpecTab === 'care' && (
          <div className="text-xs text-[#5A3E46] space-y-3 leading-relaxed">
            <p>
              Ragini Garodia jewelry is coated with high-micron anti-tarnish micro-gold plating. To preserve the brilliant pure gold luster for years:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#2D1A20]">
              <li>Keep away from direct contact with perfumes, hairsprays, and sanitizers.</li>
              <li>Wipe gently with a soft micro-fiber cloth after each wear to remove residual skin oils.</li>
              <li>Store in the provided airtight Ragini Garodia velvet pouch when not in use.</li>
            </ul>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeSpecTab === 'reviews' && (
          <div className="space-y-6">
            <div className="space-y-3">
              {product.reviews.length === 0 ? (
                <p className="text-xs text-[#8C6B75]">Be the first customer to leave a review for this gold piece!</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#4A1525]">{rev.userName}</span>
                      <span className="text-[10px] text-[#8C6B75]">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#5A3E46] pt-1">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Leave Review Form */}
            <form onSubmit={handleAddReview} className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] space-y-3 text-xs">
              <h4 className="font-bold text-[#4A1525]">Write a Customer Review</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="Your Name..."
                  className="bg-white p-2 rounded-xl border border-[#E8D7D3] focus:outline-none"
                />
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                  className="bg-white p-2 rounded-xl border border-[#E8D7D3]"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                </select>
              </div>
              <textarea
                rows={2}
                required
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="How does the gold plating look and feel?"
                className="w-full bg-white p-2 rounded-xl border border-[#E8D7D3] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#4A1525] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#5C1D2E]"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
