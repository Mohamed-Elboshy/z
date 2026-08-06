import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Language, ThemeMode, Currency, FilterState, Order, UserProfile, NotificationItem, Coupon, AiChatMessage, SupportTicket } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: any, selectedSize: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  updateCartQuantity: (productId: string, size: string, colorHex: string, delta: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscountAmount: number;
  cartShippingFee: number;
  cartGrandTotal: number;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  sizeCalcProduct: Product | null;
  setSizeCalcProduct: (product: Product | null) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  activePage: string;
  navigateTo: (page: string, productId?: string) => void;
  selectedProductId: string | null;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  toasts: ToastMessage[];
  addToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  formatPrice: (amountInEgp: number) => string;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  isAiChatOpen: boolean;
  setIsAiChatOpen: (open: boolean) => void;
  aiMessages: AiChatMessage[];
  sendAiMessage: (text: string) => Promise<void>;
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: { subject: string; category: any; message: string }) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialFilters: FilterState = {
  searchQuery: '',
  selectedCategory: 'All',
  selectedGender: 'All',
  selectedBrand: 'All',
  selectedSize: 'All',
  selectedColorHex: 'All',
  priceRange: [0, 10000],
  onlyInStock: false,
  onlySale: false,
  onlyNew: false,
  sortBy: 'newest',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [currency, setCurrency] = useState<Currency>('EGP');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeCalcProduct, setSizeCalcProduct] = useState<Product | null>(null);
const [user, setUser] = useState<UserProfile | null>({
  id: 'user-01',
  firstName: 'Amira',
  lastName: 'El-Sayed',
  email: 'amira.sayed@zara.eg',
  phone: '+20 101 882 9912',
  gender: 'female',
  country: 'Egypt',
  governorate: 'Cairo',
  role: 'customer', 
  city: 'New Cairo',

  addresses: [
    {
      id: 'addr-1',
      title: 'Home Address',
      recipientName: 'Amira El-Sayed',
      phone: '+20 101 882 9912',
      governorate: 'Cairo',
      city: '5th Settlement',
      streetAddress: '90th North Street, Villa 14',
      buildingNo: '14',
      apartmentNo: '2',
      isDefault: true
    }
  ]
});
  const [orders, setOrders] = useState<Order[]>([]);
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('zara-001');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync RTL / LTR document direction and theme class
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Fetch products from backend server on mount if available
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setProducts(data.data);
        }
      })
      .catch(() => {
        // Fallback to initial local products
      });

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const addToast = (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const navigateTo = (page: string, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, selectedColor: any, selectedSize: string, qty: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor.hex === selectedColor.hex
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      } else {
        return [...prev, { product, selectedColor, selectedSize, quantity: qty }];
      }
    });
    addToast(language === 'ar' ? 'تمت إضافة المنتج إلى حقيبة التسوق' : 'Added to Shopping Bag');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    setCart(prev =>
      prev.filter(
        item =>
          !(item.product.id === productId && item.selectedSize === size && item.selectedColor.hex === colorHex)
      )
    );
    addToast(language === 'ar' ? 'تم إزالة المنتج من الحقيبة' : 'Item removed from bag', 'info');
  };

  const updateCartQuantity = (productId: string, size: string, colorHex: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.hex === colorHex
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCouponCode = async (code: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (data.success) {
        setAppliedCoupon(data.data);
        addToast(language === 'ar' ? 'تم تطبيق كود الخصم بنجاح!' : 'Promo code applied!', 'success');
        return true;
      } else {
        addToast(language === 'ar' ? data.messageAr || 'كود غير صالح' : data.messageEn || 'Invalid code', 'error');
        return false;
      }
    } catch {
      // Offline fallback check
      if (code.toUpperCase() === 'ZARA20') {
        const c: Coupon = { code: 'ZARA20', discountType: 'percentage', value: 20, maxUsage: 100, usedCount: 5, isActive: true };
        setAppliedCoupon(c);
        addToast('Promo code ZARA20 applied (20% Off)', 'success');
        return true;
      } else if (code.toUpperCase() === 'EGYPTFREE') {
        const c: Coupon = { code: 'EGYPTFREE', discountType: 'free_shipping', value: 60, maxUsage: 500, usedCount: 12, isActive: true };
        setAppliedCoupon(c);
        addToast('Free Shipping applied!', 'success');
        return true;
      }
      addToast(language === 'ar' ? 'كود الخصم غير صالح' : 'Invalid coupon code', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast(language === 'ar' ? 'تم إزالة كود الخصم' : 'Coupon removed', 'info');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let cartDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.discountType === 'fixed') {
      cartDiscountAmount = appliedCoupon.value;
    }
  }

  const cartShippingFee = cartSubtotal >= 3000 || (appliedCoupon && appliedCoupon.discountType === 'free_shipping') ? 0 : 60;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscountAmount + cartShippingFee);

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        addToast(language === 'ar' ? 'تم إزالة المنتج من المفضلة' : 'Removed from Wishlist', 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        addToast(language === 'ar' ? 'تمت إضافة المنتج إلى المفضلة' : 'Saved to Wishlist');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(p => p.id === productId);

  // Compare
  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        addToast(language === 'ar' ? 'تم إزالة المنتج من المقارنة' : 'Removed from Comparison', 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          addToast(language === 'ar' ? 'يمكن مقارنة 4 منتجات كحد أقصى' : 'Max 4 products can be compared', 'warning');
          return prev;
        }
        addToast(language === 'ar' ? 'تمت الإضافة لجدول المقارنة' : 'Added to Comparison');
        return [...prev, product];
      }
    });
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);
  const clearCompare = () => setCompareList([]);

  // Create Order API
  const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const fullOrder: Partial<Order> = {
      ...orderData,
      items: cart.map(ci => ({
        id: ci.product.id,
        nameEn: ci.product.nameEn,
        nameAr: ci.product.nameAr,
        size: ci.selectedSize,
        color: ci.selectedColor.nameEn,
        price: ci.product.price,
        quantity: ci.quantity,
        image: ci.product.images[0]
      })),
      subtotal: cartSubtotal,
      shippingFee: cartShippingFee,
      discountAmount: cartDiscountAmount,
      total: cartGrandTotal,
      couponCode: appliedCoupon?.code
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullOrder)
      });
      const data = await res.json();
      if (data.success) {
        const created: Order = data.data;
        setOrders(prev => [created, ...prev]);
        clearCart();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        return created;
      }
      throw new Error('Order creation failed');
    } catch {
      // Fallback local order
      const created: Order = {
        id: `ZR-EG-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: new Date().toISOString(),
        customerName: orderData.customerName || 'Customer',
        customerEmail: orderData.customerEmail || 'customer@zara.eg',
        customerPhone: orderData.customerPhone || '+201000000000',
        address: orderData.address || 'Cairo, Egypt',
        governorate: orderData.governorate || 'Cairo',
        paymentMethod: orderData.paymentMethod || 'fawry',
        paymentStatus: orderData.paymentMethod === 'cod' ? 'Pending COD' : 'Paid',
        fawryReference: orderData.paymentMethod === 'fawry' ? `${Math.floor(100000000 + Math.random() * 900000000)}` : undefined,
        orderStatus: 'Pending',
        subtotal: cartSubtotal,
        shippingFee: cartShippingFee,
        discountAmount: cartDiscountAmount,
        total: cartGrandTotal,
        items: fullOrder.items || [],
        trackingHistory: [
          {
            status: 'Pending',
            time: new Date().toISOString(),
            messageEn: 'Order received',
            messageAr: 'تم تسجيل الطلب بنجاح'
          }
        ]
      };
      setOrders(prev => [created, ...prev]);
      clearCart();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      return created;
    }
  };

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [aiMessages, setAiMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Bonjour! I am your ZARA Luxury Personal Stylist. How may I assist your style or wardrobe selection today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const sendAiMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: AiChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAiMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language })
      });
      const data = await res.json();

      const aiMsg: AiChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || (language === 'ar' ? 'أهلاً بك في ZARA.' : 'Welcome to ZARA.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAiMessages(prev => [...prev, aiMsg]);
    } catch {
      const aiMsg: AiChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: language === 'ar'
          ? 'يسعدنا مساعدتك في ZARA! يسعدني إفادتك بالمقاسات وتنسيق المظهر.'
          : 'I am here to assist you with ZARA styling recommendations and order details.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAiMessages(prev => [...prev, aiMsg]);
    }
  };

  const createSupportTicket = async (ticket: { subject: string; category: any; message: string }) => {
    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...ticket,
          userEmail: user?.email || 'customer@zara.eg',
          userName: `${user?.firstName || 'Valued'} ${user?.lastName || 'Customer'}`
        })
      });
      const data = await res.json();
      if (data.success) {
        setSupportTickets(prev => [data.data, ...prev]);
        addToast(language === 'ar' ? 'تم فتح تذكرة الدعم بنجاح' : 'Support ticket opened successfully', 'success');
      }
    } catch {
      const newT: SupportTicket = {
        id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: ticket.subject,
        category: ticket.category,
        status: 'Open',
        createdAt: new Date().toISOString(),
        userEmail: user?.email || 'customer@zara.eg',
        userName: `${user?.firstName || 'Valued'} ${user?.lastName || 'Customer'}`,
        messages: [{ sender: 'user', text: ticket.message, timestamp: new Date().toISOString() }]
      };
      setSupportTickets(prev => [newT, ...prev]);
      addToast(language === 'ar' ? 'تم تقديم تذكرة الدعم' : 'Support ticket submitted', 'success');
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const formatPrice = (amountInEgp: number): string => {
    if (currency === 'USD') {
      return `$${(amountInEgp / 50).toFixed(2)}`;
    }
    if (currency === 'EUR') {
      return `€${(amountInEgp / 54).toFixed(2)}`;
    }
    if (currency === 'SAR') {
      return `${(amountInEgp / 13.3).toFixed(2)} SAR`;
    }
    if (currency === 'AED') {
      return `${(amountInEgp / 13.6).toFixed(2)} AED`;
    }
    return `${amountInEgp.toLocaleString('en-US')} ${language === 'ar' ? 'ج.م' : 'EGP'}`;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        currency,
        setCurrency,
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        cartSubtotal,
        cartDiscountAmount,
        cartShippingFee,
        cartGrandTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        quickViewProduct,
        setQuickViewProduct,
        sizeCalcProduct,
        setSizeCalcProduct,
        user,
        setUser,
        orders,
        createOrder,
        activePage,
        navigateTo,
        selectedProductId,
        filters,
        setFilters,
        resetFilters,
        toasts,
        addToast,
        formatPrice,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        recentlyViewed,
        addToRecentlyViewed,
        isAiChatOpen,
        setIsAiChatOpen,
        aiMessages,
        sendAiMessage,
        supportTickets,
        createSupportTicket
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  return context;
};
