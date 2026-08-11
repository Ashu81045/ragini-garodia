import React, { useState } from 'react';
import { ShoppingBag, Heart, Sparkles, Search, Menu, X, Crown, LayoutDashboard, Truck, ShieldCheck, User, ShieldAlert } from 'lucide-react';
import { CartItem, UserProfile } from '../types';

import raginiLogo from '../assets/images/ragini_clean_rg_logo_1786439183195.jpg';

interface NavbarProps {
  currentPath?: string;
  navigate: (path: string) => void;
  cartItems: CartItem[];
  wishlistIds: string[];
  openCart: () => void;
  openWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentUser?: UserProfile | null;
  openAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath = '/',
  navigate,
  cartItems = [],
  wishlistIds = [],
  openCart,
  openWishlist,
  searchQuery = '',
  setSearchQuery,
  currentUser,
  openAuthModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = (cartItems || []).reduce((acc, item) => acc + item.quantity, 0);

  const path = currentPath || '/';
  const isStore = path === '/' || path.startsWith('/category/') || path.startsWith('/product/');
  const isDashboard = path === '/dashboard';
  const isOrders = path === '/orders';
  const isGallery = path === '/gallery';
  const isStylist = path === '/stylist';
  const isCare = path === '/care';

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDFD]/95 backdrop-blur-md text-[#2D1A20] border-b border-[#F0E2DF] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 sm:py-3">
          
          {/* Brand Logo - Sleek Horizontal Compact Layout */}
          <button
            id="brand-logo-btn"
            onClick={() => navigate('/')}
            className="flex items-center gap-3 sm:gap-3.5 group cursor-pointer text-left py-1"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full shadow-sm group-hover:scale-105 transition-all duration-300 overflow-hidden shrink-0">
              <img
                src={raginiLogo}
                alt="Ragini Garodia Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-serif text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#3B0E1B] group-hover:text-[#5C1D2E] transition-colors leading-tight block">
                RAGINI GARODIA
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Clean URLs) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              id="nav-storefront-btn"
              onClick={() => navigate('/')}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                isStore
                  ? 'bg-[#F3E2E6] text-[#4A1525] font-bold border border-[#E8C5CE]'
                  : 'text-[#5A3E46] hover:text-[#4A1525] hover:bg-[#FAF0F2]'
              }`}
            >
              Collection
            </button>

            <button
              id="nav-gallery-btn"
              onClick={() => navigate('/gallery')}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                isGallery
                  ? 'bg-[#F3E2E6] text-[#4A1525] font-bold border border-[#E8C5CE]'
                  : 'text-[#5A3E46] hover:text-[#4A1525] hover:bg-[#FAF0F2]'
              }`}
            >
              Lookbook
            </button>

            <button
              id="nav-stylist-btn"
              onClick={() => navigate('/stylist')}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                isStylist
                  ? 'bg-[#F3E2E6] text-[#4A1525] font-bold border border-[#E8C5CE]'
                  : 'text-[#5A3E46] hover:text-[#4A1525] hover:bg-[#FAF0F2]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              AI Stylist
            </button>

            <button
              id="nav-orders-btn"
              onClick={() => navigate('/orders')}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                isOrders
                  ? 'bg-[#F3E2E6] text-[#4A1525] font-bold border border-[#E8C5CE]'
                  : 'text-[#5A3E46] hover:text-[#4A1525] hover:bg-[#FAF0F2]'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
              Track Order
            </button>

            <button
              id="nav-care-btn"
              onClick={() => navigate('/care')}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                isCare
                  ? 'bg-[#F3E2E6] text-[#4A1525] font-bold border border-[#E8C5CE]'
                  : 'text-[#5A3E46] hover:text-[#4A1525] hover:bg-[#FAF0F2]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              Gold Care
            </button>
          </nav>

          {/* Search Bar & Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="relative hidden lg:block w-44 xl:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Gold Plated Jhumka, Haram..."
                className="w-full bg-[#FAF5F5] text-[#2D1A20] placeholder-[#A0828C] text-xs rounded-full pl-8 pr-3 py-2 border border-[#E8D7D3] focus:outline-none focus:border-[#C5A059] transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-[#A0828C] absolute left-2.5 top-2.5" />
            </div>

            {/* Wishlist Button */}
            <button
              id="wishlist-trigger-btn"
              onClick={openWishlist}
              className="relative p-2 text-[#5A3E46] hover:text-[#4A1525] hover:bg-[#FAF0F2] rounded-full transition-colors cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5 text-[#8C6B75]" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4A1525] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Account / User Portal Button */}
            <button
              id="auth-portal-btn"
              onClick={openAuthModal}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full border border-[#E8D7D3] hover:border-[#C5A059] bg-[#FAF5F5] hover:bg-[#FAF0F2] text-[#4A1525] font-bold text-xs transition-colors cursor-pointer"
              title="User & Staff Portal Access"
            >
              <User className="w-4 h-4 text-[#C5A059]" />
              <span className="hidden sm:inline">
                {currentUser ? currentUser.displayName.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Shopping Bag Button */}
            <button
              id="cart-trigger-btn"
              onClick={openCart}
              className="relative p-2.5 bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 rounded-full transition-all transform active:scale-95 cursor-pointer shadow-md shadow-rose-950/20 flex items-center justify-center"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span className="absolute -top-1 -right-1 bg-amber-300 text-[#4A1525] font-extrabold text-[10px] leading-none h-4.5 min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-xs border border-[#4A1525]">
                {totalCartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A1525] hover:bg-[#FAF0F2] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDFD] border-b border-[#F0E2DF] px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gold choker, bangles, rings..."
              className="w-full bg-[#FAF5F5] text-[#2D1A20] placeholder-[#A0828C] text-xs rounded-full pl-8 pr-3 py-2 border border-[#E8D7D3]"
            />
            <Search className="w-3.5 h-3.5 text-[#A0828C] absolute left-2.5 top-2.5" />
          </div>

          <button
            id="mobile-nav-storefront"
            onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold ${
              isStore ? 'bg-[#F3E2E6] text-[#4A1525] font-bold' : 'text-[#5A3E46]'
            }`}
          >
            Collection Catalog
          </button>
          <button
            id="mobile-nav-gallery"
            onClick={() => { navigate('/gallery'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold ${
              isGallery ? 'bg-[#F3E2E6] text-[#4A1525] font-bold' : 'text-[#5A3E46]'
            }`}
          >
            Gallery Lookbook
          </button>
          <button
            id="mobile-nav-stylist"
            onClick={() => { navigate('/stylist'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              isStylist ? 'bg-[#F3E2E6] text-[#4A1525] font-bold' : 'text-[#5A3E46]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            AI Jewelry Stylist
          </button>
          <button
            id="mobile-nav-orders"
            onClick={() => { navigate('/orders'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              isOrders ? 'bg-[#F3E2E6] text-[#4A1525] font-bold' : 'text-[#5A3E46]'
            }`}
          >
            <Truck className="w-4 h-4 text-[#C5A059]" />
            Track Order
          </button>
          <button
            id="mobile-nav-care"
            onClick={() => { navigate('/care'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              isCare ? 'bg-[#F3E2E6] text-[#4A1525] font-bold' : 'text-[#5A3E46]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            Gold Plating Care
          </button>
        </div>
      )}
    </header>
  );
};
