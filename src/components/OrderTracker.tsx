import React, { useState } from 'react';
import { OrderDetails, OrderStatus } from '../types';
import { Search, Truck, CheckCircle2, Phone, ShieldCheck, Crown, Package, AlertCircle } from 'lucide-react';

interface OrderTrackerProps {
  orders?: OrderDetails[];
  navigate: (path: string) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orders = [], navigate }) => {
  const safeOrders = orders || [];
  const [phoneNumber, setPhoneNumber] = useState('');
  const [matchedOrders, setMatchedOrders] = useState<OrderDetails[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = phoneNumber.trim().toLowerCase();
    if (!query) return;

    setHasSearched(true);

    const cleanQuery = query.replace(/\D/g, '');

    const found = safeOrders.filter((o) => {
      const cleanPhone = o.customer.phone.replace(/\D/g, '');
      const phoneMatch = cleanPhone.length > 0 && cleanQuery.length > 0 && (cleanPhone.includes(cleanQuery) || cleanQuery.includes(cleanPhone));
      const idMatch = o.orderId.toLowerCase() === query;
      const emailMatch = o.customer.email.toLowerCase() === query;
      return phoneMatch || idMatch || emailMatch;
    });

    setMatchedOrders(found);
    if (found.length > 0) {
      setSelectedOrder(found[0]);
    } else {
      setSelectedOrder(null);
    }
  };

  const getStatusStep = (status: OrderStatus) => {
    switch (status) {
      case 'Processing':
        return 1;
      case 'Shipped':
        return 2;
      case 'Out for Delivery':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = selectedOrder ? getStatusStep(selectedOrder.status) : 1;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in">
      
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#F3E2E6] text-[#4A1525] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>RAGINI GARODIA Fulfillment Services</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1525]">
          Track Your Gold Plated Jewelry Order
        </h1>
        <p className="text-xs sm:text-sm text-[#5A3E46] max-w-lg mx-auto">
          Please enter your registered 10-digit mobile number or Order ID below to view your live dispatch status and shipment details.
        </p>
      </div>

      {/* Phone / Order ID Input Form */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Phone className="w-4 h-4 text-[#A0828C] absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter 10-digit Mobile Number or Order ID..."
              className="w-full bg-[#FFFDFD] text-[#2D1A20] text-xs sm:text-sm rounded-full pl-10 pr-4 py-3 border border-[#E8D7D3] focus:outline-none focus:border-[#C5A059] shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md cursor-pointer whitespace-nowrap"
          >
            Fetch Orders
          </button>
        </div>
        <p className="text-[11px] text-[#8C6B75] text-center font-medium">
          Note: Orders are mapped directly to your registered mobile number provided during checkout.
        </p>
      </form>

      {/* Multiple Orders Selector */}
      {matchedOrders.length > 1 && (
        <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] max-w-xl mx-auto space-y-2">
          <p className="text-xs font-bold text-[#4A1525] uppercase tracking-wider">
            Found {matchedOrders.length} orders associated with this number:
          </p>
          <div className="flex flex-wrap gap-2">
            {matchedOrders.map((ord) => (
              <button
                key={ord.orderId}
                onClick={() => setSelectedOrder(ord)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedOrder?.orderId === ord.orderId
                    ? 'bg-[#4A1525] text-rose-50 shadow-xs'
                    : 'bg-white text-[#4A1525] border border-[#E8D7D3] hover:bg-[#FAF0F2]'
                }`}
              >
                {ord.orderId} • ₹{ord.total.toLocaleString('en-IN')} ({ord.status})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Order Status Display */}
      {selectedOrder ? (
        <div className="bg-[#FFFDFD] rounded-3xl border border-[#F0E2DF] p-6 sm:p-8 shadow-xs space-y-8">
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0E2DF] pb-6">
            <div>
              <span className="text-[10px] text-[#8C6B75] uppercase tracking-wider block font-semibold">
                Order Reference
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#4A1525]">{selectedOrder.orderId}</h2>
              <p className="text-xs text-[#8C6B75]">Placed on {selectedOrder.date}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#8C6B75] uppercase tracking-wider block font-semibold">
                Live Status
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FAF0F2] text-[#4A1525] border border-[#E8C5CE]">
                {selectedOrder.status}
              </span>
            </div>
          </div>

          {/* Timeline Tracker */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C6B75]">Dispatch & Delivery Progress</h3>
            
            <div className="grid grid-cols-4 gap-2 relative">
              {/* Step 1: Placed */}
              <div className="text-center space-y-1">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep >= 1 ? 'bg-[#4A1525] text-amber-300' : 'bg-[#FAF5F5] text-[#A0828C]'
                }`}>
                  <Package className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-bold text-[#4A1525]">Order Confirmed</p>
                <p className="text-[9px] text-[#8C6B75]">Vault Inspection</p>
              </div>

              {/* Step 2: Quality Check */}
              <div className="text-center space-y-1">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep >= 2 ? 'bg-[#4A1525] text-amber-300' : 'bg-[#FAF5F5] text-[#A0828C]'
                }`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-bold text-[#4A1525]">Gold Quality Seal</p>
                <p className="text-[9px] text-[#8C6B75]">Anti-tarnish Check</p>
              </div>

              {/* Step 3: Shipped */}
              <div className="text-center space-y-1">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep >= 3 ? 'bg-[#4A1525] text-amber-300' : 'bg-[#FAF5F5] text-[#A0828C]'
                }`}>
                  <Truck className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-bold text-[#4A1525]">In Transit</p>
                <p className="text-[9px] text-[#8C6B75]">{selectedOrder.courierPartner || 'Bluedart Express'}</p>
              </div>

              {/* Step 4: Delivered */}
              <div className="text-center space-y-1">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-[#FAF5F5] text-[#A0828C]'
                }`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-bold text-[#4A1525]">Delivered</p>
                <p className="text-[9px] text-[#8C6B75]">Safe Arrival</p>
              </div>
            </div>
          </div>

          {/* AWB details */}
          <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5A3E46]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C5A059]" />
              <span>
                Air Waybill (AWB): <strong>{selectedOrder.trackingNumber || 'BD-8910234-IN'}</strong> ({selectedOrder.courierPartner || 'Bluedart Express'})
              </span>
            </div>
            <span className="text-[11px] text-[#8C6B75] font-medium">
              Estimated Delivery: {selectedOrder.estimatedDelivery || 'Within 2-3 Business Days'}
            </span>
          </div>

          {/* Items & Address Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Shipping Address */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B75]">Shipping Destination</h4>
              <div className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] space-y-1 text-xs text-[#2D1A20]">
                <p className="font-bold text-[#4A1525]">{selectedOrder.customer.fullName}</p>
                <p className="text-[#5A3E46]">{selectedOrder.customer.address}</p>
                <p className="text-[#5A3E46]">{selectedOrder.customer.city} - {selectedOrder.customer.pincode}, {selectedOrder.customer.state}</p>
                <p className="text-[#8C6B75] text-[11px] pt-1">Phone: {selectedOrder.customer.phone}</p>
              </div>
            </div>

            {/* Ordered Jewelry Items */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B75]">Ordered Items ({selectedOrder.items.length})</h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#FAF5F5] p-2.5 rounded-2xl border border-[#E8D7D3]">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 object-cover rounded-xl bg-white"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-[#4A1525] truncate">{item.product.name}</p>
                      <p className="text-[10px] text-[#C5A059]">100% Gold Plated • Zero Stones</p>
                      <div className="flex justify-between text-[11px] text-[#8C6B75] pt-0.5">
                        <span>Qty: {item.quantity}</span>
                        <span className="font-bold text-[#4A1525]">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#F0E2DF] text-xs font-bold text-[#4A1525]">
                <span>Total Paid (INR):</span>
                <span className="font-serif text-base">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-12 bg-[#FFFDFD] rounded-3xl border border-[#F0E2DF] text-[#8C6B75] space-y-3 max-w-xl mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-700 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#4A1525]">No Orders Found</h3>
          <p className="text-xs text-[#5A3E46] max-w-md mx-auto">
            We couldn't find any orders linked to <strong>"{phoneNumber}"</strong>. Please verify your 10-digit mobile number or check the Order ID in your confirmation SMS.
          </p>
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FFFDFD] rounded-3xl border border-[#F0E2DF] text-[#8C6B75] space-y-3 max-w-xl mx-auto">
          <Package className="w-12 h-12 text-[#C5A059] mx-auto opacity-70" />
          <h3 className="font-serif text-lg font-bold text-[#4A1525]">Track Order Status</h3>
          <p className="text-xs font-medium text-[#5A3E46] max-w-md mx-auto">
            No order is loaded by default. Enter your registered mobile number above to fetch your active dispatch details.
          </p>
        </div>
      )}
    </div>
  );
};
