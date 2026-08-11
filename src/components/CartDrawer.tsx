import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, CheckCircle2, Printer, Truck, Crown } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const safeCartItems = cartItems || [];

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');

  // Shipping Form State (India Defaults)
  const [fullName, setFullName] = useState('Ananya Sen');
  const [email, setEmail] = useState('ananya.sen@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('42 Park Street, Flat 3B');
  const [city, setCity] = useState('Kolkata');
  const [state, setState] = useState('West Bengal');
  const [pincode, setPincode] = useState('700016');
  const [paymentMethod, setPaymentMethod] = useState('UPI / Razorpay (Instant)');

  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);

  const subtotal = safeCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1999;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 150;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'RAGINI10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setPromoSuccessMsg('Promo RAGINI10 Applied! 10% Discount Saved.');
    } else {
      setPromoSuccessMsg('Try code "RAGINI10" for 10% off.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `RG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderDetails = {
      orderId,
      items: [...cartItems],
      subtotal,
      discount: discountAmount,
      shippingFee,
      total,
      customer: { fullName, email, phone, address, city, state, pincode },
      paymentMethod,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'Processing',
      trackingNumber: `BD-${Math.floor(100000 + Math.random() * 900000)}`,
      courierPartner: 'Bluedart Express',
      estimatedDelivery: 'Within 2-3 Business Days'
    };

    setPlacedOrder(newOrder);
    onOrderPlaced(newOrder);
    setCheckoutStep('confirmation');
    onClearCart();
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDFD] border-l border-[#F0E2DF] text-[#2D1A20] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#FAF5F5] border-b border-[#F0E2DF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <h2 className="font-serif text-lg font-bold text-[#4A1525]">
                {checkoutStep === 'cart' && 'Your Shopping Bag'}
                {checkoutStep === 'shipping' && 'Shipping Address (India)'}
                {checkoutStep === 'payment' && 'Select Payment Option'}
                {checkoutStep === 'confirmation' && 'Order Confirmed!'}
              </h2>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#E8D7D3] text-[#4A1525] hover:bg-[#F3E2E6] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* STEP 1: CART ITEMS LIST */}
          {checkoutStep === 'cart' && (
            <div className="flex-1 flex flex-col justify-between overflow-y-auto">
              {/* Free Shipping Progress */}
              <div className="p-4 bg-[#FAF0F2] border-b border-[#E8C5CE] text-xs">
                {subtotal >= freeShippingThreshold ? (
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Unlocked FREE Express Shipping Across India!</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[#5A3E46]">
                      Add <strong className="text-[#4A1525]">₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')}</strong> more for FREE Shipping
                    </span>
                    <div className="w-full h-1.5 bg-[#E8D7D3] rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-[#4A1525]"
                        style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-[#C5A059] mx-auto opacity-50" />
                    <p className="text-[#8C6B75] text-xs font-bold">Your shopping bag is empty.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 bg-[#FAF5F5] rounded-2xl border border-[#E8D7D3] flex gap-3 items-center"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl bg-white flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif text-xs font-bold text-[#4A1525] truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-[#C5A059] block">
                          ₹{item.product.price.toLocaleString('en-IN')} each • 0 Stones
                        </span>

                        <div className="flex items-center justify-between pt-1">
                          {/* Quantity modifier */}
                          <div className="flex items-center border border-[#E8D7D3] rounded-lg bg-white text-xs">
                            <button
                              id={`cart-minus-${item.product.id}`}
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="px-2 py-0.5 text-[#4A1525] hover:bg-[#F3E2E6] font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 font-bold text-[#4A1525]">{item.quantity}</span>
                            <button
                              id={`cart-plus-${item.product.id}`}
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="px-2 py-0.5 text-[#4A1525] hover:bg-[#F3E2E6] font-bold"
                            >
                              +
                            </button>
                          </div>

                          <button
                            id={`cart-remove-${item.product.id}`}
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#8C6B75] hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo & Summary Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 bg-[#FFFDFD] border-t border-[#F0E2DF] space-y-3">
                  {/* Promo Form */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (e.g. RAGINI10)"
                      className="flex-1 bg-[#FAF5F5] text-[#2D1A20] text-xs rounded-xl px-3 py-2 border border-[#E8D7D3] focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      id="apply-promo-btn"
                      className="bg-[#FAF5F5] hover:bg-[#F3E2E6] text-[#4A1525] text-xs font-bold px-3 py-2 rounded-xl border border-[#E8D7D3] cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {promoSuccessMsg && (
                    <p className="text-[11px] text-[#4A1525] font-semibold">{promoSuccessMsg}</p>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-[#5A3E46] border-t border-[#F0E2DF] pt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#4A1525]">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Discount (10%)</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Express Courier Shipping</span>
                      <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-[#4A1525] pt-1 border-t border-[#F0E2DF]">
                      <span>Total (INR)</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    id="proceed-to-checkout-btn"
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold py-3 px-4 rounded-full text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Enter Shipping Address</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SHIPPING FORM */}
          {checkoutStep === 'shipping' && (
            <form onSubmit={() => setCheckoutStep('payment')} className="flex-1 flex flex-col justify-between p-6 overflow-y-auto space-y-4">
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#5A3E46] font-semibold mb-1">Full Customer Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5A3E46] font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5A3E46] font-semibold mb-1">Phone Number (India +91)</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5A3E46] font-semibold mb-1">Street Address / House No</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[#5A3E46] font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A3E46] font-semibold mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A3E46] font-semibold mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0E2DF] flex gap-2">
                <button
                  type="button"
                  id="back-to-cart-btn"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-2.5 bg-[#FAF5F5] text-[#4A1525] rounded-xl text-xs font-bold border border-[#E8D7D3] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  id="go-to-payment-btn"
                  className="flex-1 bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {checkoutStep === 'payment' && (
            <form onSubmit={handleCompleteOrder} className="flex-1 flex flex-col justify-between p-6 overflow-y-auto space-y-4">
              <div className="space-y-3 text-xs">
                <label className="block text-[#5A3E46] font-semibold mb-1">Select India Payment Method</label>

                {[
                  'UPI / Razorpay (GPay, PhonePe, Paytm)',
                  'Cash on Delivery (COD India)',
                  'Credit / Debit Card (Visa, Mastercard, RuPay)',
                ].map((method) => (
                  <label
                    key={method}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                      paymentMethod === method
                        ? 'border-[#4A1525] bg-[#FAF0F2] text-[#4A1525] font-bold'
                        : 'border-[#E8D7D3] bg-[#FAF5F5] text-[#5A3E46]'
                    }`}
                  >
                    <span className="font-semibold">{method}</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="text-[#4A1525] focus:ring-[#C5A059]"
                    />
                  </label>
                ))}

                <div className="p-4 rounded-2xl bg-[#FAF5F5] border border-[#E8D7D3] space-y-2 mt-4 text-xs text-[#5A3E46]">
                  <div className="flex justify-between font-bold text-[#4A1525]">
                    <span>Total Amount Payable:</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[11px] text-[#8C6B75]">
                    Includes 22K Micro Gold Plating guarantee, anti-tarnish velvet pouch, and Bluedart express tracking across India.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0E2DF] flex gap-2">
                <button
                  type="button"
                  id="back-to-shipping-btn"
                  onClick={() => setCheckoutStep('shipping')}
                  className="px-4 py-2.5 bg-[#FAF5F5] text-[#4A1525] rounded-xl text-xs font-bold border border-[#E8D7D3] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  id="place-order-final-btn"
                  className="flex-1 bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold py-3 rounded-xl text-xs tracking-wider uppercase shadow-md cursor-pointer"
                >
                  Place Order (₹{total.toLocaleString('en-IN')})
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: ORDER CONFIRMATION INVOICE */}
          {checkoutStep === 'confirmation' && placedOrder && (
            <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs font-sans">
              <div className="text-center space-y-2 bg-[#FAF0F2] p-4 rounded-2xl border border-[#E8C5CE]">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-[#4A1525]">Order Confirmed!</h3>
                <p className="text-[11px] text-[#5A3E46]">
                  Ragini Garodia Order ID: <strong className="text-[#4A1525] font-mono">{placedOrder.orderId}</strong>
                </p>
              </div>

              {/* Invoice Printable Sheet */}
              <div id="printable-invoice" className="bg-[#FAF5F5] p-4 rounded-2xl border border-[#E8D7D3] space-y-3">
                <div className="border-b border-[#E8D7D3] pb-2 flex justify-between items-center">
                  <div>
                    <h4 className="font-serif font-bold text-[#4A1525]">RAGINI GARODIA RECEIPT</h4>
                    <span className="text-[10px] text-[#8C6B75]">{placedOrder.date}</span>
                  </div>
                  <button
                    onClick={printInvoice}
                    className="p-1.5 rounded-xl bg-white text-[#4A1525] border border-[#E8D7D3] flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print Invoice</span>
                  </button>
                </div>

                {/* Items Summary */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-[#8C6B75] uppercase block">Purchased Gold Items:</span>
                  {placedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-[#2D1A20]">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span className="font-bold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8D7D3] pt-2 space-y-1">
                  <div className="flex justify-between text-[#5A3E46]">
                    <span>Subtotal:</span>
                    <span>₹{placedOrder.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {placedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount:</span>
                      <span>-₹{placedOrder.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5A3E46]">
                    <span>Shipping:</span>
                    <span>{placedOrder.shippingFee === 0 ? 'FREE' : `₹${placedOrder.shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between font-serif font-bold text-[#4A1525] text-sm pt-1 border-t border-[#E8D7D3]">
                    <span>Total Paid:</span>
                    <span>₹{placedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="border-t border-[#E8D7D3] pt-2 text-[10px] text-[#5A3E46]">
                  <p><strong>Deliver To:</strong> {placedOrder.customer.fullName}, {placedOrder.customer.address}, {placedOrder.customer.city} - {placedOrder.customer.pincode}</p>
                  <p><strong>Payment Option:</strong> {placedOrder.paymentMethod}</p>
                </div>
              </div>

              <button
                id="finish-order-btn"
                onClick={onClose}
                className="w-full py-3 rounded-full bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold text-xs cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
