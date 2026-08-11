export type JewelryCategory =
  | 'all'
  | 'chokers-necklaces'
  | 'earrings-jhumkas'
  | 'bangles-kangans'
  | 'rings-cuffs'
  | 'chains-harams'
  | 'bridal-ensembles';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: JewelryCategory;
  price: number; // in INR ₹
  originalPrice?: number; // in INR ₹
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  stockQuantity: number;
  isLowStock?: boolean;
  specifications: {
    baseMetal: string;
    plating: string; // e.g. "22K Micro Gold Plated (Anti-Tarnish)"
    stoneType: string; // Always "None (100% Solid Gold Plated Craftsmanship)"
    closureType: string;
    weight: string;
    hypoallergenic: boolean;
    antiTarnish: boolean;
    goldPurity?: string;
  };
  tags: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  featuredInLookbook?: boolean;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface LookbookHotspot {
  xPercent: number;
  yPercent: number;
  productId: string;
  title: string;
  price: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  occasion: 'bridal' | 'festive' | 'cocktail' | 'casual' | 'office';
  image: string;
  description: string;
  hotspots: LookbookHotspot[];
  themeColor: string;
}

export interface StylistRequest {
  outfitType: string;
  outfitColor: string;
  necklineStyle: string;
  occasion: string;
  additionalNotes?: string;
}

export interface StylistRecommendation {
  overallAdvice: string;
  styleVibe: string;
  matchingProductIds: string[];
  stylingTips: string[];
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export type UserRole = 'admin' | 'staff' | 'customer' | 'guest' | 'pending';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  createdAt?: string;
}

export interface OrderDetails {
  orderId: string;
  status: OrderStatus;
  trackingNumber?: string;
  courierPartner?: string;
  estimatedDelivery?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
  };
  paymentMethod: string; // e.g. "UPI / Net Banking (Razorpay)", "Cash on Delivery (COD)"
  date: string;
  notes?: string;
}
