export type Language = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';
export type Currency = 'EGP' | 'USD' | 'EUR' | 'SAR' | 'AED';
export type UserRole = 'admin' | 'manager' | 'customer' | 'support';

export interface ProductColor {
  nameEn: string;
  nameAr: string;
  hex: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  commentEn: string;
  commentAr: string;
  isVerified: boolean;
  likesCount: number;
  images?: string[];
  replyEn?: string;
  replyAr?: string;
}

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  sku: string;
  barcode: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  category: string;
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex';
  subcategory: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
  isFlashSale: boolean;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  videoUrl?: string;
  descriptionEn: string;
  descriptionAr: string;
  compositionEn: string;
  compositionAr: string;
  careEn: string;
  careAr: string;
  tags: string[];
  materialEn?: string;
  materialAr?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface OrderTrackingStep {
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Packed' | 'Shipping' | 'Delivered' | 'Cancelled' | 'Returned' | 'Refunded';
  time: string;
  messageEn: string;
  messageAr: string;
}

export interface OrderItem {
  id: string;
  nameEn: string;
  nameAr: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  governorate: string;
  city?: string;
  paymentMethod: 'fawry' | 'instapay' | 'visa' | 'mastercard' | 'meeza' | 'applepay' | 'cod';
  paymentStatus: string;
  fawryReference?: string;
  instapayHandle?: string;
  orderStatus: 'Pending' | 'Confirmed' | 'Preparing' | 'Packed' | 'Shipping' | 'Delivered' | 'Cancelled' | 'Returned' | 'Refunded';
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  items: OrderItem[];
  trackingHistory: OrderTrackingStep[];
  courierName?: string;
  trackingNumber?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  gender: 'male' | 'female' | 'other';
  birthDate?: string;
  country: string;
  governorate: string;
  city: string;
  addresses: Address[];
  avatarUrl?: string;
  savedPaymentMethods?: SavedPaymentMethod[];
}

export interface SavedPaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'meeza';
  cardLast4: string;
  expiryMonth: string;
  expiryYear: string;
  cardHolderName: string;
  isDefault: boolean;
}

export interface Address {
  id: string;
  title: string;
  recipientName: string;
  phone: string;
  governorate: string;
  city: string;
  streetAddress: string;
  buildingNo: string;
  apartmentNo: string;
  isDefault: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  maxUsage: number;
  usedCount: number;
  isActive: boolean;
  expiryDate?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Order' | 'Return' | 'Payment' | 'General';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  userEmail: string;
  userName: string;
  messages: {
    sender: 'user' | 'support';
    text: string;
    timestamp: string;
  }[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
}

export interface NotificationItem {
  id: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  date: string;
  read: boolean;
  type: 'order' | 'offer' | 'coupon' | 'stock' | 'system';
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedGender: string;
  selectedBrand: string;
  selectedSize: string;
  selectedColorHex: string;
  priceRange: [number, number];
  onlyInStock: boolean;
  onlySale: boolean;
  onlyNew: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'discount';
  viewMode?: 'grid' | 'list';
}
