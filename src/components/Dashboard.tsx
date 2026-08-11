import React, { useState, useEffect } from 'react';
import { Product, OrderDetails, OrderStatus, JewelryCategory, UserProfile, UserRole } from '../types';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  Search, 
  Plus, 
  CheckCircle2, 
  Truck, 
  Clock, 
  DollarSign, 
  Edit2, 
  Save, 
  Trash2, 
  Filter, 
  X,
  Crown,
  ChevronDown,
  RefreshCw,
  Phone,
  MapPin,
  Tag,
  ShieldCheck,
  Users,
  UserCheck,
  UserX,
  HelpCircle,
  ShieldAlert,
  Mail,
  Lock,
  LogOut,
  Copy,
  Terminal
} from 'lucide-react';

import { PRODUCTS } from '../data/products';
import {
  updateOrderStatusInFirestore,
  updateOrderTrackingInFirestore,
  updateProductStockInFirestore,
  updateProductPriceInFirestore,
  saveProductToFirestore,
  subscribeToAllUsers,
  updateUserRoleInFirestore,
  saveUserProfile,
  forceSeedAllData,
  auth,
  getUserProfile,
  LogLevel
} from '../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

interface DashboardProps {
  products?: Product[];
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
  orders?: OrderDetails[];
  setOrders?: React.Dispatch<React.SetStateAction<OrderDetails[]>>;
  onUpdateOrderStatus?: (orderId: string, newStatus: OrderStatus) => void;
  showToast?: (msg: string) => void;
  navigate: (path: string) => void;
  currentUser?: UserProfile | null;
  setCurrentUser?: (user: UserProfile | null) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  products: initialProducts,
  setProducts: externalSetProducts,
  orders: propOrders = [],
  setOrders: externalSetOrders,
  onUpdateOrderStatus,
  showToast = (_msg: string) => {},
  navigate,
  currentUser,
  setCurrentUser
}) => {
  const [internalProducts, setInternalProducts] = useState<Product[]>(initialProducts || PRODUCTS);
  const [internalOrders, setInternalOrders] = useState<OrderDetails[]>(propOrders);

  const products = initialProducts || internalProducts;
  const setProducts = externalSetProducts || setInternalProducts;

  const orders = propOrders.length > 0 ? propOrders : internalOrders;
  const setOrders = externalSetOrders || setInternalOrders;

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'roles'>('orders');

  // Admin Portal Login State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginLoading, setAdminLoginLoading] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState('');

  const handleAdminPortalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    setAdminLoginLoading(true);

    try {
      let uid = `admin-${Date.now()}`;
      let userEmail = adminEmail.trim();

      try {
        const userCred = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        uid = userCred.user.uid;
        userEmail = userCred.user.email || adminEmail;
      } catch (authErr: any) {
        console.warn('Firebase signin fallback:', authErr);
      }

      const existingProfile = await getUserProfile(uid);

      let assignedRole: UserRole = 'pending';
      if (existingProfile) {
        assignedRole = existingProfile.role;
      } else {
        if (userEmail.toLowerCase().includes('admin') || userEmail.toLowerCase() === 'admin@raginigarodia.com') {
          assignedRole = 'admin';
        } else if (userEmail.toLowerCase().includes('staff') || userEmail.toLowerCase() === 'staff@raginigarodia.com') {
          assignedRole = 'staff';
        } else {
          assignedRole = 'pending';
        }
      }

      const profile: UserProfile = {
        uid: uid,
        email: userEmail,
        displayName: existingProfile?.displayName || userEmail.split('@')[0] || 'Store Operations',
        role: assignedRole,
        createdAt: existingProfile?.createdAt || new Date().toISOString()
      };

      if (setCurrentUser) {
        setCurrentUser(profile);
      }
      await saveUserProfile(profile);

      if (assignedRole === 'pending') {
        showToast('Login successful (Role pending mapping)');
      } else {
        showToast(`Welcome! Logged in as ${assignedRole.toUpperCase()}`);
      }

    } catch (err: any) {
      setAdminLoginError('Authentication failed. Check email and password.');
    } finally {
      setAdminLoginLoading(false);
    }
  };

  const handleAdminSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Signout error:', e);
    }
    if (setCurrentUser) {
      setCurrentUser(null);
    }
    showToast('Signed out from portal');
  };
  
  // Users & Role Mapping State
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<UserRole>('staff');

  useEffect(() => {
    const unsub = subscribeToAllUsers((usersData) => {
      setAllUsers(usersData);
    });
    return () => unsub();
  }, []);

  const handleAssignRole = async (targetUid: string, role: UserRole) => {
    await updateUserRoleInFirestore(targetUid, role);
    showToast(`Role updated to ${role.toUpperCase()}`);
  };

  const handleAddStaffAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffEmail.trim()) return;

    const newProfile: UserProfile = {
      uid: `staff-${Date.now()}`,
      email: newStaffEmail.trim(),
      displayName: newStaffName.trim() || newStaffEmail.split('@')[0],
      role: newStaffRole,
      createdAt: new Date().toISOString()
    };

    await saveUserProfile(newProfile);
    showToast(`Mapped staff role (${newStaffRole.toUpperCase()}) for ${newStaffEmail}`);
    setNewStaffEmail('');
    setNewStaffName('');
  };
  
  // Orders State
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [editingTrackingOrderId, setEditingTrackingOrderId] = useState<string | null>(null);
  const [tempTrackingNum, setTempTrackingNum] = useState('');

  // Inventory State
  const [inventorySearchQuery, setInventorySearchQuery] = useState('');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState<string>('all');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // Firestore Seed Modal State & Handler
  const [isSeedModalOpen, setIsSeedModalOpen] = useState(false);
  const [seedLogs, setSeedLogs] = useState<{ msg: string; level: LogLevel; time: string }[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);

  const runSeedingWithLogs = async () => {
    setIsSeeding(true);
    setIsSeedModalOpen(true);
    setSeedLogs([]);

    const logHandler = (msg: string, level: LogLevel = 'info') => {
      setSeedLogs((prev) => [...prev, { msg, level, time: new Date().toLocaleTimeString() }]);
    };

    try {
      logHandler('Starting Firestore database seed procedure...', 'info');
      const result = await forceSeedAllData(PRODUCTS, safeOrders, logHandler);
      if (result.success) {
        showToast(`Database seeded! (${result.totalWritten} records created)`);
      } else {
        showToast('Seeding finished with warnings or errors. View logs.');
      }
    } catch (err: any) {
      logHandler(`Fatal exception during seeding: ${err?.message || err}`, 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<JewelryCategory>('chokers-necklaces');
  const [newProdPrice, setNewProdPrice] = useState<number>(2499);
  const [newProdStock, setNewProdStock] = useState<number>(15);
  const [newProdPlating, setNewProdPlating] = useState('22K Micro-Gold Micron Finish');
  const [newProdBaseMetal, setNewProdBaseMetal] = useState('High-Grade Copper Alloy');
  const [newProdDescription, setNewProdDescription] = useState('Exquisite 22K micro-gold plated handcrafted design with anti-tarnish protective seal. 0 stones, 100% pure gold metal craftsmanship.');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800');

  // Safe collections
  const safeOrders = orders || [];
  const safeProducts = products || [];

  // Order Metrics
  const totalRevenue = safeOrders.reduce((acc, o) => acc + o.total, 0);
  const processingCount = safeOrders.filter((o) => o.status === 'Processing').length;
  const shippedCount = safeOrders.filter((o) => o.status === 'Shipped' || o.status === 'Out for Delivery').length;
  const deliveredCount = safeOrders.filter((o) => o.status === 'Delivered').length;

  // Inventory Metrics
  const totalStockUnits = safeProducts.reduce((acc, p) => acc + p.stockQuantity, 0);
  const lowStockProducts = safeProducts.filter((p) => p.stockQuantity > 0 && p.stockQuantity <= 5);
  const outOfStockProducts = safeProducts.filter((p) => p.stockQuantity === 0);

  // Order Status Handler
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatusInFirestore(orderId, newStatus);
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, newStatus);
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
    }
    showToast(`Order ${orderId} updated to ${newStatus}`);
  };

  const handleSaveTracking = (orderId: string) => {
    updateOrderTrackingInFirestore(orderId, tempTrackingNum, 'Bluedart Express');
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, trackingNumber: tempTrackingNum, courierPartner: 'Bluedart Express' } : o))
    );
    setEditingTrackingOrderId(null);
    showToast(`Tracking saved for ${orderId}`);
  };

  // Inventory Handlers
  const handleUpdateStock = (productId: string, delta: number) => {
    const currentProd = safeProducts.find((p) => p.id === productId);
    if (currentProd) {
      const newQty = Math.max(0, currentProd.stockQuantity + delta);
      updateProductStockInFirestore(productId, newQty);
    }
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newQty = Math.max(0, p.stockQuantity + delta);
          return { ...p, stockQuantity: newQty, isLowStock: newQty > 0 && newQty <= 5 };
        }
        return p;
      })
    );
  };

  const handleUpdatePrice = (productId: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice < 0) return;
    updateProductPriceInFirestore(productId, newPrice);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
    showToast('Price updated successfully');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newSKU: Product = {
      id: `prod-ragini-${Date.now().toString().slice(-4)}`,
      name: newProdName,
      category: newProdCategory,
      price: newProdPrice,
      originalPrice: Math.round(newProdPrice * 1.3),
      rating: 5.0,
      reviewCount: 1,
      stockQuantity: newProdStock,
      isLowStock: newProdStock <= 5,
      images: [newProdImage],
      description: newProdDescription,
      specifications: {
        baseMetal: newProdBaseMetal,
        plating: newProdPlating,
        stoneType: 'None (100% Pure Solid Gold Plated Craftsmanship)',
        closureType: 'Adjustable Silk Dori / Push Lock',
        weight: '65g',
        hypoallergenic: true,
        antiTarnish: true,
        goldPurity: newProdPlating
      },
      tags: ['Gold Plated', 'Zero Stones', newProdCategory],
      isNewArrival: true,
      reviews: []
    };

    saveProductToFirestore(newSKU);
    setProducts((prev) => [newSKU, ...prev]);
    setIsAddProductModalOpen(false);
    showToast(`Added new Gold SKU: ${newProdName}`);

    // Reset form
    setNewProdName('');
    setNewProdPrice(2499);
    setNewProdStock(15);
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customer.phone.includes(orderSearchQuery);
    const matchesStatus = orderStatusFilter === 'all' || o.status.toLowerCase() === orderStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filtered Inventory
  const filteredInventory = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(inventorySearchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(inventorySearchQuery.toLowerCase());
    const matchesCat = inventoryCategoryFilter === 'all' || p.category === inventoryCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const userRole: UserRole = currentUser?.role || 'customer';
  const isStaff = userRole === 'staff';

  // 1. Unauthenticated Guard
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 animate-fade-in">
        <div className="bg-[#FFFDFD] p-8 rounded-3xl border border-[#F0E2DF] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#4A1525] flex items-center justify-center text-amber-300 shadow-md">
              <Crown className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#4A1525]">Admin & Staff Portal Login</h2>
            <p className="text-xs text-[#8C6B75]">
              Enter your management credentials to access store operations, fulfillments, and inventory.
            </p>
          </div>

          <form onSubmit={handleAdminPortalLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4A1525] uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@raginigarodia.com"
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#2D1A20] focus:outline-none focus:border-[#C5A059]"
                />
                <Mail className="w-4 h-4 text-[#8C6B75] absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4A1525] uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#2D1A20] focus:outline-none focus:border-[#C5A059]"
                />
                <Lock className="w-4 h-4 text-[#8C6B75] absolute left-3 top-3" />
              </div>
            </div>

            {adminLoginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{adminLoginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={adminLoginLoading}
              className="w-full bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold py-3 rounded-2xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {adminLoginLoading ? 'Verifying Credentials...' : 'Sign In to Operations Portal'}
            </button>
          </form>

          <div className="pt-2 border-t border-[#F0E2DF] text-center space-y-2">
            <span className="text-[10px] text-[#8C6B75] uppercase tracking-wider block font-semibold">Or for testing</span>
            <button
              type="button"
              onClick={async () => {
                const profile: UserProfile = {
                  uid: 'admin-demo-1001',
                  email: 'admin@raginigarodia.com',
                  displayName: 'Store Administrator',
                  role: 'admin',
                  createdAt: new Date().toISOString()
                };
                if (setCurrentUser) {
                  setCurrentUser(profile);
                }
                await saveUserProfile(profile);
                showToast('Signed in as Administrator');
                navigate('/dashboard');
              }}
              className="w-full bg-[#FAF0F2] hover:bg-[#F3E2E6] text-[#4A1525] border border-[#E8C5CE] font-bold py-2.5 rounded-2xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Instant Admin Sign-In</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unassigned or Customer Role Guard
  if (userRole === 'pending' || userRole === 'customer') {
    return (
      <div className="max-w-md mx-auto py-16 px-4 animate-fade-in text-center">
        <div className="bg-[#FFFDFD] p-8 rounded-3xl border border-amber-300 shadow-2xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border-2 border-amber-300 text-amber-800 flex items-center justify-center shadow-inner">
            <HelpCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#4A1525]">Role Mapping Required</h2>
            <p className="text-xs text-[#5A3E46] leading-relaxed">
              Please reach out to your administrator for role mapping. Once assigned to <strong>Staff</strong> or <strong>Admin</strong> in the Admin Operations Dashboard, your staff permissions will automatically activate.
            </p>
          </div>

          <div className="p-3 bg-[#FAF5F5] rounded-2xl border border-[#E8D7D3] text-left text-xs space-y-1.5 text-[#5A3E46]">
            <div className="flex justify-between">
              <span>Account Email:</span>
              <span className="font-bold text-[#4A1525]">{currentUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Status:</span>
              <span className="font-bold text-amber-700 uppercase">
                {currentUser.role === 'pending' ? 'Role Unassigned' : 'Customer Account'}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-[#4A1525] text-rose-50 font-bold py-2.5 rounded-xl text-xs cursor-pointer hover:bg-[#5C1D2E]"
            >
              Back to Collection
            </button>
            <button
              onClick={handleAdminSignOut}
              className="px-4 py-2.5 border border-rose-300 text-rose-700 font-bold rounded-xl text-xs hover:bg-rose-50 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Role Banner Notification */}
      {isStaff && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 px-4 py-3 rounded-2xl flex items-center justify-between text-xs font-semibold shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Staff Portal Mode:</strong> You have permissions to update Order Fulfillments, Tracking Numbers, and Inventory Stock Quantities. Price edits and Financial Analytics are restricted to Super Admin.
            </span>
          </div>
          <span className="bg-blue-200 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            Staff Access
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#4A1525] via-[#5C1D2E] to-[#4A1525] text-rose-50 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#8C3A4F]/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-1">
              <Crown className="w-4 h-4" />
              <span>Ragini Garodia Store Operations ({userRole.toUpperCase()})</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Orders & Dedicated Inventory Hub
            </h1>
            <p className="text-xs text-rose-200 mt-1 max-w-2xl">
              Track live customer fulfillments across India and manage stock levels for 100% pure gold-plated jewelry collections in real time.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex flex-wrap items-center gap-2 bg-[#3B121E]/80 p-1.5 rounded-2xl border border-rose-300/20">
            <button
              id="tab-orders-btn"
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-amber-300 text-[#4A1525] shadow-md'
                  : 'text-rose-200 hover:text-white hover:bg-rose-900/40'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Track Orders ({orders.length})</span>
            </button>
            <button
              id="tab-inventory-btn"
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-amber-300 text-[#4A1525] shadow-md'
                  : 'text-rose-200 hover:text-white hover:bg-rose-900/40'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Inventory ({products.length} SKUs)</span>
            </button>
            {!isStaff && (
              <button
                id="tab-roles-btn"
                onClick={() => setActiveTab('roles')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'roles'
                    ? 'bg-amber-300 text-[#4A1525] shadow-md'
                    : 'text-rose-200 hover:text-white hover:bg-rose-900/40'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Staff Roles ({allUsers.length})</span>
              </button>
            )}

            {!isStaff && (
              <button
                id="seed-db-btn"
                onClick={runSeedingWithLogs}
                disabled={isSeeding}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-300/30 hover:bg-amber-400/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                title="Seed / Reset initial products and orders to Firestore with live logs console"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-300 ${isSeeding ? 'animate-spin' : ''}`} />
                <span>{isSeeding ? 'Seeding...' : 'Seed Database'}</span>
              </button>
            )}

            <button
              id="admin-signout-btn"
              onClick={handleAdminSignOut}
              className="px-3 py-2 rounded-xl text-xs font-bold text-rose-200 hover:text-white hover:bg-rose-900/40 transition-all flex items-center gap-1 cursor-pointer ml-1"
              title="Sign Out of Operations Portal"
            >
              <LogOut className="w-4 h-4 text-rose-300" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: LIVE ORDERS TRACKING & FULFILLMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Order Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#FFFDFD] p-5 rounded-2xl border border-[#F0E2DF] shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[#8C6B75]">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="font-serif text-2xl font-bold text-[#4A1525]">
                {isStaff ? '₹ •••••• (Admin)' : `₹${totalRevenue.toLocaleString('en-IN')}`}
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium inline-block">
                {orders.length} Completed Orders
              </span>
            </div>

            <div className="bg-[#FFFDFD] p-5 rounded-2xl border border-[#F0E2DF] shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[#8C6B75]">
                <span className="text-xs font-semibold uppercase tracking-wider">Processing</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="font-serif text-2xl font-bold text-[#4A1525]">{processingCount}</div>
              <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-medium inline-block">
                Awaiting Dispatch
              </span>
            </div>

            <div className="bg-[#FFFDFD] p-5 rounded-2xl border border-[#F0E2DF] shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[#8C6B75]">
                <span className="text-xs font-semibold uppercase tracking-wider">In Transit</span>
                <Truck className="w-4 h-4 text-blue-600" />
              </div>
              <div className="font-serif text-2xl font-bold text-[#4A1525]">{shippedCount}</div>
              <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-medium inline-block">
                With Courier Partner
              </span>
            </div>

            <div className="bg-[#FFFDFD] p-5 rounded-2xl border border-[#F0E2DF] shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[#8C6B75]">
                <span className="text-xs font-semibold uppercase tracking-wider">Delivered</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="font-serif text-2xl font-bold text-[#4A1525]">{deliveredCount}</div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium inline-block">
                Successful Delivery
              </span>
            </div>
          </div>

          {/* Orders Filter & Search Bar */}
          <div className="bg-[#FFFDFD] p-4 rounded-2xl border border-[#F0E2DF] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A0828C] absolute left-3 top-3" />
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Search by Order ID (RG-2026-...), Customer Name, or Phone..."
                className="w-full bg-[#FAF5F5] text-[#2D1A20] text-xs rounded-xl pl-9 pr-4 py-2.5 border border-[#E8D7D3] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#8C6B75]" />
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-[#FAF5F5] text-[#2D1A20] text-xs font-medium rounded-xl px-3 py-2.5 border border-[#E8D7D3] focus:outline-none"
              >
                <option value="all">All Order Statuses</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 bg-[#FFFDFD] rounded-2xl border border-[#F0E2DF] text-[#8C6B75] space-y-2">
                <ShoppingBag className="w-8 h-8 text-[#C5A059] mx-auto opacity-60" />
                <p className="text-xs font-semibold">No matching customer orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.orderId} className="bg-[#FFFDFD] rounded-2xl border border-[#F0E2DF] p-5 shadow-xs space-y-4">
                  {/* Top Row: Order ID, Date, Payment & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0E2DF] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-bold text-[#4A1525]">{order.orderId}</span>
                        <span className="text-[10px] bg-[#FAF0F2] text-[#4A1525] px-2 py-0.5 rounded-full font-semibold">
                          {order.paymentMethod}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8C6B75]">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status Selector */}
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value as OrderStatus)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : order.status === 'Shipped' || order.status === 'Out for Delivery'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => navigate('/orders')}
                        className="text-xs text-[#8C6B28] font-bold hover:underline"
                      >
                        Track View →
                      </button>
                    </div>
                  </div>

                  {/* Customer Details & Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Customer Info */}
                    <div className="space-y-1.5 text-xs text-[#5A3E46] bg-[#FAF5F5] p-3.5 rounded-xl border border-[#E8D7D3]">
                      <div className="font-bold text-[#4A1525] flex items-center gap-1.5">
                        <span>{order.customer.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#8C6B75]">
                        <Phone className="w-3 h-3 text-[#C5A059]" />
                        <span>{order.customer.phone}</span>
                      </div>
                      <div className="flex items-start gap-1 text-[11px] text-[#8C6B75]">
                        <MapPin className="w-3 h-3 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{order.customer.address}, {order.customer.city} - {order.customer.pincode}, {order.customer.state}</span>
                      </div>
                    </div>

                    {/* Purchased Items List */}
                    <div className="md:col-span-2 space-y-2">
                      <span className="text-[11px] font-semibold text-[#8C6B75] uppercase tracking-wider block">
                        Ordered Gold Items ({order.items.length}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-[#FFFDFD] p-2 rounded-lg border border-[#F0E2DF]">
                            <img
                              src={item.product.images[0]}
                              alt=""
                              className="w-10 h-10 object-cover rounded-md bg-[#FAF5F5]"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0 flex-1 text-xs">
                              <p className="font-medium text-[#2D1A20] truncate">{item.product.name}</p>
                              <div className="flex justify-between text-[11px] text-[#8C6B75]">
                                <span>Qty: {item.quantity}</span>
                                <span className="font-bold text-[#4A1525]">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total Amount */}
                      <div className="flex items-center justify-between pt-2 text-xs border-t border-[#F0E2DF]">
                        <span className="text-[#8C6B75]">Total Paid Amount:</span>
                        <span className="font-serif text-sm font-bold text-[#4A1525]">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Courier Tracking Section */}
                      <div className="flex items-center justify-between text-xs bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                        <div className="flex items-center gap-1.5 text-amber-900">
                          <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>
                            {order.courierPartner || 'Bluedart Express'}:{' '}
                            <strong>{order.trackingNumber || 'Tracking AWB Pending'}</strong>
                          </span>
                        </div>

                        {editingTrackingOrderId === order.orderId ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={tempTrackingNum}
                              onChange={(e) => setTempTrackingNum(e.target.value)}
                              placeholder="e.g. BD-98213"
                              className="bg-white text-xs px-2 py-1 rounded border border-amber-300 w-28"
                            />
                            <button
                              onClick={() => handleSaveTracking(order.orderId)}
                              className="bg-[#4A1525] text-white px-2 py-1 rounded text-[10px] font-bold"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingTrackingOrderId(order.orderId);
                              setTempTrackingNum(order.trackingNumber || '');
                            }}
                            className="text-[10px] text-[#8C6B28] font-bold hover:underline"
                          >
                            Edit AWB
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DEDICATED GOLD INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Inventory Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#FFFDFD] p-5 rounded-2xl border border-[#F0E2DF] shadow-xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B75]">Total SKUs</span>
              <div className="font-serif text-2xl font-bold text-[#4A1525]">{products.length}</div>
              <span className="text-[10px] text-[#8C6B75] font-medium block">Catalog Collections</span>
            </div>

            <div className="bg-[#FFFDFD] p-5 rounded-2xl border border-[#F0E2DF] shadow-xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B75]">Total In-Stock Units</span>
              <div className="font-serif text-2xl font-bold text-[#4A1525]">{totalStockUnits}</div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium inline-block">
                Ready in Vault
              </span>
            </div>

            <div className="bg-[#FFFDFD] p-5 rounded-2xl border border-[#F0E2DF] shadow-xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B75]">Low Stock Alert</span>
              <div className="font-serif text-2xl font-bold text-amber-600">{lowStockProducts.length}</div>
              <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-medium inline-block">
                Below 5 Units
              </span>
            </div>

            <div className="bg-[#FFFDFD] p-5 rounded-2xl border border-[#F0E2DF] shadow-xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B75]">Out of Stock</span>
              <div className="font-serif text-2xl font-bold text-rose-600">{outOfStockProducts.length}</div>
              <span className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full font-medium inline-block">
                Needs Reorder
              </span>
            </div>
          </div>

          {/* Action Bar & Search */}
          <div className="bg-[#FFFDFD] p-4 rounded-2xl border border-[#F0E2DF] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A0828C] absolute left-3 top-3" />
              <input
                type="text"
                value={inventorySearchQuery}
                onChange={(e) => setInventorySearchQuery(e.target.value)}
                placeholder="Search inventory by Gold SKU, name, or plating..."
                className="w-full bg-[#FAF5F5] text-[#2D1A20] text-xs rounded-xl pl-9 pr-4 py-2.5 border border-[#E8D7D3] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={inventoryCategoryFilter}
                onChange={(e) => setInventoryCategoryFilter(e.target.value)}
                className="bg-[#FAF5F5] text-[#2D1A20] text-xs font-medium rounded-xl px-3 py-2.5 border border-[#E8D7D3] focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="chokers-necklaces">Chokers & Necklaces</option>
                <option value="earrings-jhumkas">Earrings & Jhumkas</option>
                <option value="bangles-kangans">Bangles & Kangans</option>
                <option value="rings-cuffs">Rings & Cuffs</option>
                <option value="chains-harams">Chains & Harams</option>
                <option value="bridal-ensembles">Bridal Ensembles</option>
              </select>

              <button
                id="add-gold-sku-btn"
                onClick={() => setIsAddProductModalOpen(true)}
                className="bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Add Gold SKU</span>
              </button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-[#FFFDFD] rounded-2xl border border-[#F0E2DF] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF5F5] border-b border-[#F0E2DF] text-[11px] font-semibold text-[#8C6B75] uppercase tracking-wider">
                    <th className="p-4">SKU & Item Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price (₹)</th>
                    <th className="p-4">Stock Level</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Quick Stock Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E2DF] text-xs text-[#2D1A20]">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF7F7] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images[0]}
                            alt=""
                            className="w-12 h-12 object-cover rounded-xl bg-[#FAF5F5] border border-[#F0E2DF]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-serif font-bold text-[#4A1525] text-sm">{item.name}</div>
                            <div className="text-[10px] text-[#8C6B75] font-mono">{item.id}</div>
                            <span className="text-[10px] text-[#C5A059] font-medium block">
                              {item.specifications.plating} • 0 Stones
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-medium text-[#5A3E46]">
                        <span className="bg-[#FAF0F2] text-[#4A1525] px-2.5 py-1 rounded-full text-[10px] font-bold">
                          {item.category}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1 font-serif font-bold text-[#4A1525]">
                          <span>₹</span>
                          <input
                            type="number"
                            value={item.price}
                            disabled={isStaff}
                            onChange={(e) => handleUpdatePrice(item.id, parseInt(e.target.value))}
                            className={`w-20 border rounded px-1.5 py-0.5 text-xs font-bold focus:outline-none ${
                              isStaff 
                                ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-[#FAF5F5] border-[#E8D7D3] text-[#4A1525]'
                            }`}
                            title={isStaff ? 'Price edits are restricted to Admin users' : 'Edit price'}
                          />
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-sm text-[#4A1525]">{item.stockQuantity} units</div>
                      </td>

                      <td className="p-4">
                        {item.stockQuantity === 0 ? (
                          <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Out of Stock
                          </span>
                        ) : item.stockQuantity <= 5 ? (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Low Stock
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            In Stock
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleUpdateStock(item.id, -1)}
                            className="w-7 h-7 bg-[#FAF5F5] border border-[#E8D7D3] text-[#4A1525] rounded-lg font-bold hover:bg-[#F3E2E6] flex items-center justify-center cursor-pointer"
                            title="Decrease stock"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#4A1525]">
                            {item.stockQuantity}
                          </span>
                          <button
                            onClick={() => handleUpdateStock(item.id, 1)}
                            className="w-7 h-7 bg-[#4A1525] text-white rounded-lg font-bold hover:bg-[#5C1D2E] flex items-center justify-center cursor-pointer"
                            title="Increase stock"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleUpdateStock(item.id, 10)}
                            className="ml-2 px-2 py-1 bg-amber-100 text-[#8C6B28] rounded text-[10px] font-bold hover:bg-amber-200 cursor-pointer"
                          >
                            +10 Stock
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STAFF ROLE MAPPING & USER MANAGEMENT */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          
          {/* Header Banner for Role Mapping */}
          <div className="bg-[#FFFDFD] p-6 rounded-3xl border border-[#F0E2DF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#4A1525] text-xs font-bold uppercase tracking-wider mb-1">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>Super Admin Staff Role Assignment</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-[#4A1525]">
                Staff Role Mapping & User Access Portal
              </h2>
              <p className="text-xs text-[#8C6B75] mt-1 max-w-xl">
                Assign and map staff privileges to employee accounts. Registered staff members awaiting role assignment will see a prompt to contact administration until mapped here.
              </p>
            </div>

            {/* Quick Staff Role Creation Form */}
            <form onSubmit={handleAddStaffAccount} className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] flex flex-col sm:flex-row gap-2.5 items-end text-xs shrink-0">
              <div>
                <label className="text-[10px] font-bold text-[#4A1525] uppercase tracking-wider block mb-1">
                  Staff Email
                </label>
                <input
                  type="email"
                  required
                  value={newStaffEmail}
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                  placeholder="staff@raginigarodia.com"
                  className="bg-white border border-[#E8D7D3] rounded-xl px-3 py-1.5 text-xs text-[#2D1A20] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#4A1525] uppercase tracking-wider block mb-1">
                  Role
                </label>
                <select
                  value={newStaffRole}
                  onChange={(e: any) => setNewStaffRole(e.target.value)}
                  className="bg-white border border-[#E8D7D3] rounded-xl px-3 py-1.5 text-xs text-[#2D1A20]"
                >
                  <option value="staff">Staff Operations</option>
                  <option value="admin">Super Admin</option>
                  <option value="pending">Pending Mapping</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold px-4 py-1.5 rounded-xl text-xs transition-colors cursor-pointer shrink-0"
              >
                + Map Staff Email
              </button>
            </form>
          </div>

          {/* User Search & List Table */}
          <div className="bg-[#FFFDFD] rounded-3xl border border-[#F0E2DF] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#F0E2DF] flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#A0828C] absolute left-3 top-3" />
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Search user accounts by email or name..."
                  className="w-full bg-[#FAF5F5] text-[#2D1A20] text-xs rounded-xl pl-9 pr-4 py-2 border border-[#E8D7D3] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <span className="text-xs font-semibold text-[#8C6B75]">
                Total Users: {allUsers.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF5F5] text-[#4A1525] text-[11px] font-bold uppercase tracking-wider border-b border-[#F0E2DF]">
                    <th className="py-3 px-4">User Details</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Current Role</th>
                    <th className="py-3 px-4">Role Status</th>
                    <th className="py-3 px-4 text-right">Map Role Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E2DF] text-xs text-[#2D1A20]">
                  {allUsers
                    .filter(
                      (u) =>
                        u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                        u.displayName.toLowerCase().includes(userSearchQuery.toLowerCase())
                    )
                    .map((usr) => (
                      <tr key={usr.uid} className="hover:bg-[#FAF5F5]/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#4A1525] flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#FAF0F2] border border-[#E8C5CE] flex items-center justify-center font-bold text-[#4A1525] text-xs shrink-0">
                            {usr.displayName ? usr.displayName.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div>{usr.displayName || 'Registered User'}</div>
                            <div className="text-[10px] text-[#8C6B75] font-normal">UID: {usr.uid.slice(0, 12)}...</div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#5A3E46] font-medium">{usr.email}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              usr.role === 'admin'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : usr.role === 'staff'
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : usr.role === 'pending'
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {usr.role === 'admin' && <Crown className="w-3 h-3 text-amber-600" />}
                            {usr.role === 'staff' && <ShieldCheck className="w-3 h-3 text-blue-600" />}
                            {usr.role === 'pending' && <HelpCircle className="w-3 h-3 text-rose-600" />}
                            <span>{usr.role === 'pending' ? 'Pending Mapping' : usr.role.toUpperCase()}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#8C6B75] text-[11px]">
                          {usr.role === 'pending' ? (
                            <span className="text-rose-700 font-semibold flex items-center gap-1">
                              <ShieldAlert className="w-3.5 h-3.5" /> Reach Admin for Mapping
                            </span>
                          ) : (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Mapped & Active
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleAssignRole(usr.uid, 'staff')}
                              disabled={usr.role === 'staff'}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                                usr.role === 'staff'
                                  ? 'bg-blue-50 text-blue-400 border-blue-200 cursor-default'
                                  : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
                              }`}
                            >
                              Map Staff
                            </button>
                            <button
                              onClick={() => handleAssignRole(usr.uid, 'admin')}
                              disabled={usr.role === 'admin'}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                                usr.role === 'admin'
                                  ? 'bg-amber-50 text-amber-400 border-amber-200 cursor-default'
                                  : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'
                              }`}
                            >
                              Map Admin
                            </button>
                            <button
                              onClick={() => handleAssignRole(usr.uid, 'pending')}
                              disabled={usr.role === 'pending'}
                              className="px-2 py-1 rounded-lg text-[10px] font-semibold text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                              title="Unassign Role / Set Pending"
                            >
                              Unassign
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  {allUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#8C6B75] text-xs">
                        No user accounts registered in Firestore yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* MODAL: ADD NEW GOLD SKU */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FFFDFD] border border-[#F0E2DF] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-[#2D1A20]">
            <button
              onClick={() => setIsAddProductModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FAF5F5] text-[#8C6B75] hover:text-[#4A1525]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-[#F0E2DF] pb-3">
              <Crown className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif text-lg font-bold text-[#4A1525]">
                Add New Gold Plated SKU
              </h3>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#5A3E46] block mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Maharani 22K Gold Plated Coin Necklace"
                  className="w-full bg-[#FAF5F5] text-[#2D1A20] p-2.5 rounded-xl border border-[#E8D7D3] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#5A3E46] block mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e: any) => setNewProdCategory(e.target.value)}
                    className="w-full bg-[#FAF5F5] text-[#2D1A20] p-2.5 rounded-xl border border-[#E8D7D3]"
                  >
                    <option value="chokers-necklaces">Chokers & Necklaces</option>
                    <option value="earrings-jhumkas">Earrings & Jhumkas</option>
                    <option value="bangles-kangans">Bangles & Kangans</option>
                    <option value="rings-cuffs">Rings & Cuffs</option>
                    <option value="chains-harams">Chains & Harams</option>
                    <option value="bridal-ensembles">Bridal Ensembles</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#5A3E46] block mb-1">Price in ₹ (INR)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(parseInt(e.target.value))}
                    className="w-full bg-[#FAF5F5] text-[#2D1A20] p-2.5 rounded-xl border border-[#E8D7D3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#5A3E46] block mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(parseInt(e.target.value))}
                    className="w-full bg-[#FAF5F5] text-[#2D1A20] p-2.5 rounded-xl border border-[#E8D7D3]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#5A3E46] block mb-1">Gold Plating Spec</label>
                  <input
                    type="text"
                    value={newProdPlating}
                    onChange={(e) => setNewProdPlating(e.target.value)}
                    className="w-full bg-[#FAF5F5] text-[#2D1A20] p-2.5 rounded-xl border border-[#E8D7D3]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#5A3E46] block mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full bg-[#FAF5F5] text-[#2D1A20] p-2.5 rounded-xl border border-[#E8D7D3]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#5A3E46] block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  className="w-full bg-[#FAF5F5] text-[#2D1A20] p-2.5 rounded-xl border border-[#E8D7D3]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF5F5] text-[#8C6B75] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4A1525] text-white font-bold hover:bg-[#5C1D2E] cursor-pointer"
                >
                  Save Gold SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FIRESTORE SEEDING & DIAGNOSTIC LOG CONSOLE MODAL */}
      {isSeedModalOpen && (
        <div id="firestore-seed-modal" className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-700/60 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 font-mono text-xs">
            {/* Modal Header */}
            <div className="bg-[#1E293B] px-5 py-3.5 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <RefreshCw className={`w-4 h-4 ${isSeeding ? 'animate-spin' : ''}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Firestore Seeding & Console Log Engine
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Project Target: <span className="text-amber-300 font-semibold">ragini-garodia</span> | Database: <span className="text-cyan-300 font-semibold">(default)</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    const text = seedLogs.map((l) => `[${l.time}] [${l.level.toUpperCase()}] ${l.msg}`).join('\n');
                    await navigator.clipboard.writeText(text);
                    showToast('Seeding logs copied to clipboard!');
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-600 transition-all text-[11px] flex items-center gap-1 cursor-pointer"
                  title="Copy logs to clipboard"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Logs</span>
                </button>
                <button
                  onClick={() => setIsSeedModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 flex-1 overflow-y-auto space-y-1.5 bg-[#020617] text-slate-200 select-text font-mono">
              {seedLogs.length === 0 ? (
                <div className="text-slate-500 text-center py-8 italic">
                  Initializing seeding procedure logs...
                </div>
              ) : (
                seedLogs.map((log, idx) => {
                  let colorClass = 'text-cyan-300';
                  if (log.level === 'error') colorClass = 'text-rose-400 font-bold bg-rose-950/40 border-l-2 border-rose-500 pl-2';
                  if (log.level === 'warn') colorClass = 'text-amber-300 bg-amber-950/30 border-l-2 border-amber-500 pl-2';
                  if (log.level === 'success') colorClass = 'text-emerald-400 font-semibold bg-emerald-950/30 border-l-2 border-emerald-500 pl-2';

                  return (
                    <div key={idx} className={`leading-relaxed py-0.5 whitespace-pre-wrap ${colorClass}`}>
                      <span className="text-slate-500 mr-2 text-[10px]">[{log.time}]</span>
                      <span>{log.msg}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-[#1E293B] px-5 py-3 border-t border-slate-700 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Target: <code className="text-amber-300">ragini-garodia / (default)</code></span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={runSeedingWithLogs}
                  disabled={isSeeding}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 text-amber-200 border border-amber-300/30 hover:bg-amber-400/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
                  <span>{isSeeding ? 'Seeding...' : 'Re-Run Seed'}</span>
                </button>
                <button
                  onClick={() => setIsSeedModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Close Console
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
