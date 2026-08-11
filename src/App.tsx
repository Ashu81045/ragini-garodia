import React, { useState, useEffect } from 'react';
import { useRouter } from './lib/useRouter';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroSlider } from './components/HeroSlider';
import { DesignerIntro } from './components/DesignerIntro';
import { WhyUs } from './components/WhyUs';
import { FeaturedProducts } from './components/FeaturedProducts';
import { NewArrivals } from './components/NewArrivals';
import { CelebritySection } from './components/CelebritySection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { GalleryLookbook } from './components/GalleryLookbook';
import { AiStylist } from './components/AiStylist';
import { CareAndStory } from './components/CareAndStory';
import { OrderTracker } from './components/OrderTracker';
import { Dashboard } from './components/Dashboard';
import { CartDrawer } from './components/CartDrawer';
import { CustomOrderModal } from './components/CustomOrderModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { Product, CartItem, JewelryCategory, OrderDetails, UserProfile } from './types';
import {
  subscribeToProducts,
  subscribeToOrders,
  seedProductsIfEmpty,
  seedOrdersIfEmpty,
  createOrderInFirestore,
  updateOrderStatusInFirestore,
  auth,
  getUserProfile
} from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Filter, Sparkles, Heart, ShoppingBag, ArrowUpDown, X, CheckCircle2, Crown } from 'lucide-react';
import raginiLogo from './assets/images/ragini_clean_rg_logo_1786439183195.jpg';

export default function App() {
  const { currentPath, routeInfo, navigate } = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<JewelryCategory>('all');
  const [sortOption, setSortOption] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // User Authentication & Role State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ragini_garodia_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ragini_garodia_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ragini_garodia_user');
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setCurrentUser(profile);
        } else {
          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            role: 'customer'
          });
        }
      }
    });
    return () => unsubAuth();
  }, []);

  // Cart & Wishlist local state with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ragini_garodia_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ragini_garodia_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Products store synced with Firestore
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Orders store for OrderTracker & Dashboard
  const [allOrders, setAllOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('ragini_garodia_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        orderId: 'RG-2026-1001',
        items: [{ product: PRODUCTS[0], quantity: 1 }],
        subtotal: 18500,
        discount: 1850,
        shippingFee: 0,
        total: 16650,
        customer: {
          fullName: 'Ananya Sen',
          email: 'ananya.sen@example.com',
          phone: '+91 98765 43210',
          address: '42 Park Street, Flat 3B',
          city: 'Kolkata',
          state: 'West Bengal',
          pincode: '700016',
        },
        paymentMethod: 'UPI / Razorpay (Instant)',
        date: '10 Feb 2026',
        status: 'Processing',
        trackingNumber: 'BD-849201',
        courierPartner: 'Bluedart Express',
        estimatedDelivery: '12 Feb 2026',
      },
    ];
  });

  // Firestore Realtime Subscriptions & Initial Seeding
  useEffect(() => {
    // Seed initial products and orders if Firestore is empty
    const seedInitialData = async () => {
      console.log('[App Boot] Checking Firestore database initialization...');
      await seedProductsIfEmpty(PRODUCTS, false, (msg, level) => {
        console.log(`[App Boot Products] [${level?.toUpperCase() || 'INFO'}] ${msg}`);
      });
      await seedOrdersIfEmpty(allOrders, false, (msg, level) => {
        console.log(`[App Boot Orders] [${level?.toUpperCase() || 'INFO'}] ${msg}`);
      });
    };
    seedInitialData();

    const unsubProducts = subscribeToProducts((items) => {
      if (items && items.length > 0) {
        // Map local products by ID for instant lookup
        const localProductMap = new Map(PRODUCTS.map((p) => [p.id, p]));

        const mergedItems = items.map((fItem) => {
          const localItem = localProductMap.get(fItem.id);
          if (localItem) {
            // Merge Firestore item with local item, prioritizing local imported images if valid
            const localHasImages = localItem.images && localItem.images.length > 0;
            return {
              ...localItem,
              ...fItem,
              images: localHasImages ? localItem.images : (fItem.images && fItem.images.length > 0 ? fItem.images : localItem.images),
            };
          }
          return fItem;
        });

        // Ensure any local PRODUCTS not yet in Firestore are also retained
        const firestoreIds = new Set(items.map((i) => i.id));
        const missingLocal = PRODUCTS.filter((p) => !firestoreIds.has(p.id));

        setProducts([...mergedItems, ...missingLocal]);
      } else {
        setProducts(PRODUCTS);
      }
    });

    const unsubOrders = subscribeToOrders((items) => {
      if (items && items.length > 0) {
        setAllOrders(items);
      }
    });

    return () => {
      unsubProducts();
      unsubOrders();
    };
  }, []);

  // Modal states
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [stylistPrefillProduct, setStylistPrefillProduct] = useState<Product | null>(null);

  // Toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('ragini_garodia_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('ragini_garodia_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('ragini_garodia_orders', JSON.stringify(allOrders));
  }, [allOrders]);

  // Sync category route with selectedCategory
  useEffect(() => {
    if (routeInfo.view === 'category' && routeInfo.categorySlug) {
      setSelectedCategory(routeInfo.categorySlug as JewelryCategory);
    }
  }, [routeInfo]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to Bag`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from Bag');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  // Order created handler
  const handleOrderPlaced = (order: OrderDetails) => {
    setAllOrders((prev) => [order, ...prev]);
    createOrderInFirestore(order);
    showToast(`Order ${order.orderId} Confirmed!`);
  };

  // Filtering & Sorting Products
  const currentCategoryFilter = routeInfo.view === 'category' && routeInfo.categorySlug ? (routeInfo.categorySlug as JewelryCategory) : selectedCategory;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = currentCategoryFilter === 'all' || product.category === currentCategoryFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const categoryTabs: { id: JewelryCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Pure Gold', count: products.length },
    { id: 'chokers-necklaces', label: 'Pure Gold Chokers', count: products.filter((p) => p.category === 'chokers-necklaces').length },
    { id: 'chains-harams', label: 'Bridal Harams & Chains', count: products.filter((p) => p.category === 'chains-harams').length },
    { id: 'bangles-kangans', label: 'Kangans & Bangles', count: products.filter((p) => p.category === 'bangles-kangans').length },
    { id: 'rings-cuffs', label: 'Gold Finger Rings', count: products.filter((p) => p.category === 'rings-cuffs').length },
    { id: 'earrings-jhumkas', label: 'Filigree Jhumkas', count: products.filter((p) => p.category === 'earrings-jhumkas').length },
    { id: 'bridal-ensembles', label: 'Complete Bridal Sets', count: products.filter((p) => p.category === 'bridal-ensembles').length },
  ];

  // Auto-redirect authenticated admins/staff to default route (/dashboard)
  useEffect(() => {
    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff')) {
      if (routeInfo.view !== 'dashboard') {
        navigate('/dashboard');
      }
    }
  }, [currentUser, routeInfo.view, navigate]);

  // Active view map for Navbar
  const activeNavbarTab =
    routeInfo.view === 'gallery' ? 'gallery' :
    routeInfo.view === 'stylist' ? 'stylist' :
    routeInfo.view === 'care' ? 'care' :
    routeInfo.view === 'orders' ? 'orders' :
    routeInfo.view === 'dashboard' ? 'dashboard' : 'storefront';

  // Dedicated view for /admin or /dashboard route (or when admin user is logged in)
  if (routeInfo.view === 'dashboard' || (currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff'))) {
    return (
      <div className="min-h-screen bg-[#FFFDFD] text-[#2D1A20] flex flex-col font-sans selection:bg-[#F3E2E6] selection:text-[#4A1525]">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#4A1525] text-rose-50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-bold border border-amber-300/40">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Minimal Admin Operations Topbar */}
        <header className="bg-[#4A1525] text-rose-50 border-b border-[#5C1D2E] px-6 py-2.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <img
                src={raginiLogo}
                alt="Ragini Garodia Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-sm tracking-[0.18em] block text-white">RAGINI GARODIA</span>
              <span className="text-[8.5px] text-amber-200 tracking-[0.2em] uppercase block font-semibold">Admin & Operations Portal</span>
            </div>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-rose-200 hidden sm:inline-block">
                Logged in as <strong className="text-amber-300">{currentUser.displayName || currentUser.email}</strong> ({currentUser.role?.toUpperCase()})
              </span>
              <button
                onClick={async () => {
                  try {
                    await signOut(auth);
                  } catch (e) {
                    console.warn(e);
                  }
                  setCurrentUser(null);
                  showToast('Signed out from portal');
                }}
                className="text-xs text-rose-200 hover:text-white bg-white/10 hover:bg-white/20 border border-rose-200/20 px-3.5 py-1.5 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <span className="text-xs text-rose-200 font-medium">Operations Login Required</span>
          )}
        </header>

        {/* Admin Dashboard */}
        <main className="flex-1 py-6">
          <Dashboard
            products={products}
            orders={allOrders}
            onUpdateOrderStatus={(orderId, newStatus) => {
              updateOrderStatusInFirestore(orderId, newStatus);
              showToast(`Updated status for ${orderId} to ${newStatus}`);
            }}
            navigate={navigate}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            showToast={showToast}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDFD] text-[#2D1A20] flex flex-col font-sans selection:bg-[#F3E2E6] selection:text-[#4A1525]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4A1525] text-rose-50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-bold border border-amber-300/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        cartItems={cartItems}
        wishlistIds={wishlistIds}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentUser={currentUser}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* ROUTE 1: HOME PAGE */}
        {routeInfo.view === 'home' && (
          <div>
            {/* 1. Hero Image Slider (Clicking image redirects to collection page) */}
            <HeroSlider navigate={navigate} />

            {/* 2. Designer's Intro Section */}
            <DesignerIntro navigate={navigate} />

            {/* 3. Why Us Section */}
            <WhyUs openCustomOrderModal={() => setIsCustomOrderOpen(true)} />

            {/* 4. Featured Products Section */}
            <FeaturedProducts
              products={products}
              navigate={navigate}
              handleAddToCart={handleAddToCart}
              wishlistIds={wishlistIds}
              handleToggleWishlist={handleToggleWishlist}
            />

            {/* 5. New Arrivals Section */}
            <NewArrivals
              products={products}
              navigate={navigate}
              handleAddToCart={handleAddToCart}
              wishlistIds={wishlistIds}
              handleToggleWishlist={handleToggleWishlist}
            />

            {/* 6. Celeb / As Seen On Section */}
            <CelebritySection navigate={navigate} />
          </div>
        )}

        {/* ROUTE 2: CATEGORY / COLLECTION CATALOG VIEW */}
        {routeInfo.view === 'category' && (
          <div>
            <Hero
              navigate={navigate}
              openCustomOrderModal={() => setIsCustomOrderOpen(true)}
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
              
              {/* Category Pills Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1525] flex items-center gap-2">
                    <span>100% Pure Micro Gold Catalog</span>
                  </h2>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-[#C5A059]" />
                    <select
                      value={sortOption}
                      onChange={(e: any) => setSortOption(e.target.value)}
                      className="bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="featured">Featured Gold Collections</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>

                {/* Category Pills Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {categoryTabs.map((cat) => (
                    <button
                      key={cat.id}
                      id={`category-tab-${cat.id}`}
                      onClick={() => {
                        if (cat.id === 'all') {
                          navigate('/category/all');
                        } else {
                          navigate(`/category/${cat.id}`);
                        }
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                        currentCategoryFilter === cat.id
                          ? 'bg-[#4A1525] text-rose-50 shadow-md scale-105'
                          : 'bg-[#FAF5F5] text-[#5A3E46] hover:bg-[#F3E2E6] border border-[#E8D7D3]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          currentCategoryFilter === cat.id
                            ? 'bg-amber-300 text-[#4A1525]'
                            : 'bg-[#E8D7D3] text-[#4A1525]'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-[#FAF5F5] rounded-3xl border border-[#E8D7D3] space-y-3">
                  <Filter className="w-10 h-10 text-[#C5A059] mx-auto opacity-50" />
                  <h3 className="font-serif text-xl font-bold text-[#4A1525]">No gold jewelry items match your selection</h3>
                  <p className="text-xs text-[#5A3E46]">Try resetting search filters or browse all gold categories.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      navigate('/category/all');
                    }}
                    className="mt-2 px-5 py-2.5 rounded-full bg-[#4A1525] text-rose-50 text-xs font-bold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
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

            </section>
          </div>
        )}

        {/* ROUTE 3: PRODUCT DETAIL PAGE (/product/:id) */}
        {routeInfo.view === 'product' && routeInfo.productId && (
          <ProductDetailPage
            productId={routeInfo.productId}
            products={products}
            navigate={navigate}
            onAddToCart={handleAddToCart}
            isWishlisted={wishlistIds.includes(routeInfo.productId)}
            onToggleWishlist={handleToggleWishlist}
            onConsultStylistForProduct={(prod) => {
              setStylistPrefillProduct(prod);
              navigate('/stylist');
            }}
          />
        )}

        {/* ROUTE 4: GALLERY LOOKBOOK (/gallery) */}
        {routeInfo.view === 'gallery' && (
          <GalleryLookbook
            onSelectProduct={(p) => navigate(`/product/${p.id}`)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            navigate={navigate}
          />
        )}

        {/* ROUTE 5: AI STYLIST (/stylist) */}
        {routeInfo.view === 'stylist' && (
          <AiStylist
            onSelectProduct={(p) => navigate(`/product/${p.id}`)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            prefillProduct={stylistPrefillProduct}
          />
        )}

        {/* ROUTE 6: CRAFT & CARE (/care) */}
        {routeInfo.view === 'care' && <CareAndStory />}

        {/* ROUTE 7: ORDER TRACKING (/orders) */}
        {routeInfo.view === 'orders' && (
          <OrderTracker
            orders={allOrders}
            navigate={navigate}
          />
        )}
      </main>

      {/* Auth & Role Portal Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showToast={showToast}
      />

      {/* Optional Quick Product Detail Modal */}
      <ProductModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProductModal ? wishlistIds.includes(selectedProductModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onConsultStylistForProduct={(prod) => {
          setStylistPrefillProduct(prod);
          navigate('/stylist');
        }}
      />

      {/* Wishlist Drawer Modal */}
      {isWishlistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FFFDFD] border border-[#F0E2DF] rounded-3xl max-w-2xl w-full p-6 space-y-4 text-[#2D1A20] shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              id="close-wishlist-modal-btn"
              onClick={() => setIsWishlistModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FAF5F5] text-[#8C6B75] hover:text-[#4A1525] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-[#F0E2DF] pb-3">
              <Heart className="w-5 h-5 text-[#4A1525] fill-current" />
              <h3 className="font-serif text-xl font-bold text-[#4A1525]">
                Saved Gold Wishlist ({wishlistIds.length})
              </h3>
            </div>

            {wishlistIds.length === 0 ? (
              <p className="text-[#5A3E46] text-xs py-8 text-center">Your wishlist is currently empty. Click the heart icon on any gold product to save it!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {PRODUCTS.filter((p) => wishlistIds.includes(p.id)).map((p) => (
                  <div key={p.id} className="bg-[#FAF5F5] p-3 rounded-2xl border border-[#E8D7D3] flex gap-3 items-center">
                    <img src={p.images[0]} alt="" className="w-16 h-16 object-cover rounded-xl bg-white" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-bold text-[#4A1525] truncate">{p.name}</h4>
                      <span className="font-serif text-xs font-bold text-[#4A1525] block">₹{p.price.toLocaleString('en-IN')}</span>
                      <div className="flex gap-2 pt-1.5">
                        <button
                          onClick={() => {
                            handleAddToCart(p, 1);
                            setIsWishlistModalOpen(false);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#4A1525] text-rose-50 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3 text-amber-300" />
                          <span>Add to Bag</span>
                        </button>
                        <button
                          onClick={() => handleToggleWishlist(p.id)}
                          className="px-2 py-1 rounded-lg bg-[#E8D7D3] text-[#4A1525] text-[10px] font-bold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Custom Order Request Modal */}
      <CustomOrderModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
      />

      {/* Footer */}
      <Footer
        navigate={navigate}
        openCustomOrderModal={() => setIsCustomOrderOpen(true)}
      />
    </div>
  );
}
