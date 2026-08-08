import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

// In-memory backend database for demo/production reactivity
let mockProducts = [
  {
    id: 'z-001',
    nameEn: 'OVERSIZED TRENCH COAT WITH BELT',
    nameAr: 'معطف ترينش فضفاض بفيونكة ورابطة',
    sku: 'ZR-8829-102',
    barcode: '8438192039121',
    price: 3490,
    originalPrice: 4290,
    discountPercent: 18,
    category: 'Outerwear',
    gender: 'Women',
    subcategory: 'Coats',
    brand: 'ZARA Woman',
    rating: 4.9,
    reviewCount: 38,
    stock: 24,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    isFlashSale: true,
    colors: [
      { nameEn: 'Ecru', nameAr: 'بيج فاتح', hex: '#EBE6DD' },
      { nameEn: 'Black', nameAr: 'أسود', hex: '#111111' },
      { nameEn: 'Camel', nameAr: 'جمَلي', hex: '#C19A6B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-long-coat-41525-large.mp4',
    descriptionEn: 'Long coat made of a spun cotton blend. Featuring a lapel collar, long sleeves with tab details on the shoulders, front welt pockets, and belt in the same fabric. Double-breasted button fastening at the front.',
    descriptionAr: 'معطف طويل مصنوع من مزيج القطن المغزول. يتميز بياقة متساقطة، وأكمام طويلة مع تفاصيل شريطية على الكتفين، وجيوب بحاشية أماميّة، وحزام من نفس القماش. إغلاق مزدوج الصدر بأزرار في الأمام.',
    compositionEn: '65% Cotton, 35% Recycled Polyester. Lining: 100% Viscose.',
    compositionAr: '65% قطن، 35% بوليستر معاد تدويره. البطانة: 100% فيسكوز.',
    careEn: 'Machine wash max 30ºC/86ºF gentle cycle. Do not bleach. Iron max 110ºC/230ºF.',
    careAr: 'غسيل آلي في درجة حرارة أقصاها 30 مئوية. لا تستخدم المبيضات. كوي بدرجة حرارة أقصاها 110 مئوية.',
    tags: ['coat', 'trench', 'winter', 'outerwear', 'beige', 'elegance']
  },
  {
    id: 'z-002',
    nameEn: 'TEXTURED DOUBLE-BREASTED BLAZER',
    nameAr: 'بليزر مموج مزدوج الصدر',
    sku: 'ZR-4192-504',
    barcode: '8438192039122',
    price: 2890,
    originalPrice: 2890,
    discountPercent: 0,
    category: 'Formal Wear',
    gender: 'Men',
    subcategory: 'Blazers',
    brand: 'ZARA Man',
    rating: 4.8,
    reviewCount: 24,
    stock: 18,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    isFlashSale: false,
    colors: [
      { nameEn: 'Charcoal', nameAr: 'رمادي داكن', hex: '#333333' },
      { nameEn: 'Navy', nameAr: 'كحلي', hex: '#1B263B' }
    ],
    sizes: ['48', '50', '52', '54', '56'],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionEn: 'Blazer made of structured fabric. Peak lapels, buttoned cuffs, chest welt pocket, and flap pockets at the hip. Double-breasted button fastening.',
    descriptionAr: 'بليزر مصنوع من قماش محبوك بقوام بارز. ياقة حادة، وأطراف أكمام بأزرار، وجيب بحاشية على الصدر، وجيوب بقلاب عند الورك. إغلاق زر مزدوج الصدر.',
    compositionEn: '72% Polyester, 26% Viscose, 2% Elastane.',
    compositionAr: '72% بوليستر، 26% فيسكوز، 2% إيلاستين.',
    careEn: 'Dry clean only. Iron low heat.',
    careAr: 'تنظيف جاف فقط. كوي على حرارة منخفضة.',
    tags: ['blazer', 'suit', 'men', 'formal', 'navy']
  },
  {
    id: 'z-003',
    nameEn: 'LEATHER MINI CITY BAG WITH CROSSBODY STRAP',
    nameAr: 'حقيبة ميني جلدية للمدينة مع حزام كروس',
    sku: 'ZR-9901-003',
    barcode: '8438192039123',
    price: 1990,
    originalPrice: 2490,
    discountPercent: 20,
    category: 'Bags',
    gender: 'Women',
    subcategory: 'Handbags',
    brand: 'ZARA Leather',
    rating: 5.0,
    reviewCount: 52,
    stock: 12,
    isNew: false,
    isBestSeller: true,
    isTrending: true,
    isFlashSale: true,
    colors: [
      { nameEn: 'Black', nameAr: 'أسود', hex: '#000000' },
      { nameEn: 'Cream', nameAr: 'كريمي', hex: '#FFFDD0' }
    ],
    sizes: ['ONE SIZE'],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionEn: 'Real bovine leather city bag. Main compartment with metallic zip closure and magnetic flap over. Tubular top handles and adjustable detachable strap.',
    descriptionAr: 'حقيبة مدنيّة من الجلد البقري الطبيعي. مقصورة رئيسية بإنهاء معدني وسحاب علوي. مقابض دائرية أنيقة وحزام كتف قابل للتعديل والإزالة.',
    compositionEn: '100% Bovine Leather. Lining: 100% Cotton.',
    compositionAr: '100% جلد بقري طبيعي. البطانة: 100% قطن.',
    careEn: 'Wipe clean with a damp cloth. Apply leather moisturizer twice yearly.',
    careAr: 'يُسح بمنديل رطب. يُفضل وضع مرطب الجلد مرتين سنوياً.',
    tags: ['leather', 'bag', 'handbag', 'luxury', 'black']
  },
  {
    id: 'z-004',
    nameEn: 'EAU DE PARFUM NIGHTPOUR HOMME V 100 ML',
    nameAr: 'عطر نايت بور أوم V سعة 100 مل',
    sku: 'ZR-7712-881',
    barcode: '8438192039124',
    price: 1290,
    originalPrice: 1290,
    discountPercent: 0,
    category: 'Perfumes',
    gender: 'Men',
    subcategory: 'Eau De Parfum',
    brand: 'ZARA Beauty',
    rating: 4.7,
    reviewCount: 41,
    stock: 35,
    isNew: true,
    isBestSeller: true,
    isTrending: false,
    isFlashSale: false,
    colors: [
      { nameEn: 'Amber', nameAr: 'عنبر', hex: '#FFBF00' }
    ],
    sizes: ['100ML'],
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionEn: 'Sensual, masculine scent featuring amberwood, bergamot, and cardamom. Long-lasting luxury projection designed for evening wear.',
    descriptionAr: 'رائحة رجالية جذابة وفاخرة تجمع بين خشب العنبر، والبرغموت، والاهيل. ثبات يدوم طويلاً مصمم خصيصاً للسهرات.',
    compositionEn: 'Alcohol Denat., Water, Fragrance (Parfum), Limonene, Linalool.',
    compositionAr: 'كحول نقي، ماء معطر، نوتات البرغموت والعنبر.',
    careEn: 'Keep away from direct sunlight and store in a cool dry place.',
    careAr: 'يحفظ بعيداً عن أشعة الشمس المباشرة وفي مكان بارد.',
    tags: ['perfume', 'fragrance', 'men', 'zara', 'beauty']
  },
  {
    id: 'z-005',
    nameEn: 'CHUNKY LEATHER LOAFERS WITH BUCKLE',
    nameAr: 'حذاء لوفر جلدي سميك مع إبزيم معدني',
    sku: 'ZR-3321-109',
    barcode: '8438192039125',
    price: 2490,
    originalPrice: 2990,
    discountPercent: 16,
    category: 'Shoes',
    gender: 'Women',
    subcategory: 'Loafers',
    brand: 'ZARA Shoes',
    rating: 4.8,
    reviewCount: 29,
    stock: 15,
    isNew: false,
    isBestSeller: true,
    isTrending: true,
    isFlashSale: false,
    colors: [
      { nameEn: 'Black', nameAr: 'أسود', hex: '#111111' },
      { nameEn: 'Burgundy', nameAr: 'نبيتي', hex: '#800020' }
    ],
    sizes: ['37', '38', '39', '40', '41'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionEn: 'Leather loafers featuring a metallic buckle detailing on the upper strap. Track lug sole with AIRFIT® flexible technical latex foam insole designed to offer greater comfort.',
    descriptionAr: 'حذاء لوفر جلدي مع إبزيم معدني تزيني في الأعلى. نعل سميك ومريح ومبطن بتقنية AIRFIT المريحة للقدم.',
    compositionEn: '100% Bovine Leather Upper. Polyurethane Sole.',
    compositionAr: '100% جلد طبيعي علوي. نعل من البولي يوريثان.',
    careEn: 'Clean with a soft brush or leather cream.',
    careAr: 'ينظف بفرشاة ناعمة أو كريم مخصص للجلد.',
    tags: ['shoes', 'loafers', 'leather', 'black', 'women']
  },
  {
    id: 'z-006',
    nameEn: 'KIDS HEAVYWEIGHT COTTON SWEATSHIRT',
    nameAr: 'سويت شيرت قطني ثقيل للأطفال',
    sku: 'ZR-1102-301',
    barcode: '8438192039126',
    price: 990,
    originalPrice: 1290,
    discountPercent: 23,
    category: 'Casual Wear',
    gender: 'Kids',
    subcategory: 'Sweatshirts',
    brand: 'ZARA Kids',
    rating: 4.9,
    reviewCount: 19,
    stock: 40,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    isFlashSale: true,
    colors: [
      { nameEn: 'Sage Green', nameAr: 'أخضر مريمي', hex: '#9CAF88' },
      { nameEn: 'Beige', nameAr: 'بيج', hex: '#F5F5DC' }
    ],
    sizes: ['6-7 YRS', '8-9 YRS', '10-11 YRS', '12-14 YRS'],
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionEn: 'Loose fit crewneck sweatshirt made of soft brush-back heavyweight cotton. Ribbed trims on collar, cuffs, and hem.',
    descriptionAr: 'سويت شيرت بياقة مستديرة وقصة مريحة مصنوع من القطن الثقيل الناعم جداً. أطراف مضلعة على الياقة والأكمام.',
    compositionEn: '100% Organic Cotton.',
    compositionAr: '100% قطن عضوي نقي.',
    careEn: 'Wash inside out with similar colors.',
    careAr: 'يُغسل مقلوباً مع ألوان مماثلة.',
    tags: ['kids', 'sweatshirt', 'cotton', 'green']
  }
];

let mockOrders = [
  {
    id: 'Z-EG-94821',
    createdAt: '2026-08-02T14:30:00Z',
    customerName: 'Ahmad Al-Mansoor',
    customerEmail: 'ahmad@example.com',
    customerPhone: '+20 100 123 4567',
    address: '12 Al-Tahrir Square, Downtown, Cairo, Egypt',
    governorate: 'Cairo',
    paymentMethod: 'fawry',
    paymentStatus: 'Paid',
    fawryReference: '982736152',
    orderStatus: 'Shipping',
    subtotal: 3490,
    shippingFee: 60,
    discountAmount: 0,
    total: 3550,
    items: [
      {
        id: 'z-001',
        nameEn: 'OVERSIZED TRENCH COAT WITH BELT',
        nameAr: 'معطف ترينش فضفاض بفيونكة ورابطة',
        size: 'M',
        color: 'Ecru',
        price: 3490,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    trackingHistory: [
      { status: 'Pending', time: '2026-08-02T14:30:00Z', messageEn: 'Order received', messageAr: 'تم استلام الطلب' },
      { status: 'Confirmed', time: '2026-08-02T15:00:00Z', messageEn: 'Payment verified via Fawry', messageAr: 'تم التأكد من الدفع عبر فوري' },
      { status: 'Preparing', time: '2026-08-03T09:15:00Z', messageEn: 'Packed at Cairo Fulfilment Hub', messageAr: 'تم تجهيز الشحنة بمركز القاهرة' },
      { status: 'Shipping', time: '2026-08-04T08:00:00Z', messageEn: 'Handed to Courier Express', messageAr: 'تم التسليم لشركة الشحن' }
    ]
  }
];

let mockCoupons = [
  { code: 'ZARA20', discountType: 'percentage', value: 20, maxUsage: 500, usedCount: 142, isActive: true },
  { code: 'EGYPTFREE', discountType: 'free_shipping', value: 60, maxUsage: 1000, usedCount: 310, isActive: true },
  { code: 'LUXURY500', discountType: 'fixed', value: 500, maxUsage: 100, usedCount: 18, isActive: true }
];

// API Routes
app.get('/api/products', (req, res) => {
  const { gender, category, search, minPrice, maxPrice, sortBy, isNew, isSale } = req.query;
  let result = [...mockProducts];

  if (gender) {
    result = result.filter(p => p.gender.toLowerCase() === (gender as string).toLowerCase());
  }
  if (category) {
    result = result.filter(p => p.category.toLowerCase() === (category as string).toLowerCase());
  }
  if (isNew === 'true') {
    result = result.filter(p => p.isNew);
  }
  if (isSale === 'true') {
    result = result.filter(p => p.discountPercent > 0);
  }
  if (search) {
    const q = (search as string).toLowerCase();
    result = result.filter(p =>
      p.nameEn.toLowerCase().includes(q) ||
      p.nameAr.includes(q) ||
      p.tags.some(t => t.includes(q)) ||
      p.category.toLowerCase().includes(q)
    );
  }
  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  if (sortBy === 'price_asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else {
    // Default newest
    result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/products/:id', (req, res) => {
  const product = mockProducts.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: `zara-${Date.now().toString().slice(-4)}`,
    rating: 5.0,
    reviewCount: 0,
    sku: `ZR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`,
    barcode: `8438192${Math.floor(1000000 + Math.random() * 9000000)}`,
    ...req.body
  };
  mockProducts.unshift(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const index = mockProducts.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  mockProducts[index] = { ...mockProducts[index], ...req.body };
  res.json({ success: true, data: mockProducts[index] });
});

app.delete('/api/products/:id', (req, res) => {
  mockProducts = mockProducts.filter(p => p.id !== req.params.id);
  res.json({ success: true, message: 'Product deleted successfully' });
});

// Orders API
app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: mockOrders });
});

app.get('/api/orders/:id', (req, res) => {
  const order = mockOrders.find(o => o.id.toLowerCase() === req.params.id.toLowerCase());
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

app.post('/api/orders', (req, res) => {
  const orderId = `ZR-EG-${Math.floor(10000 + Math.random() * 90000)}`;
  const fawryCode = req.body.paymentMethod === 'fawry' ? `${Math.floor(100000000 + Math.random() * 900000000)}` : undefined;

  const newOrder = {
    id: orderId,
    createdAt: new Date().toISOString(),
    fawryReference: fawryCode,
    paymentStatus: req.body.paymentMethod === 'cod' ? 'Pending COD' : 'Paid/Authorized',
    orderStatus: 'Pending',
    trackingHistory: [
      {
        status: 'Pending',
        time: new Date().toISOString(),
        messageEn: 'Order placed successfully',
        messageAr: 'تم تقديم الطلب بنجاح'
      }
    ],
    ...req.body
  };

  mockOrders.unshift(newOrder);
  res.status(201).json({ success: true, data: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const order = mockOrders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  const { newStatus, noteEn, noteAr } = req.body;
  order.orderStatus = newStatus;
  order.trackingHistory.push({
    status: newStatus,
    time: new Date().toISOString(),
    messageEn: noteEn || `Status updated to ${newStatus}`,
    messageAr: noteAr || `تم تغيير الحالة إلى ${newStatus}`
  });
  res.json({ success: true, data: order });
});

// Coupon validation
app.post('/api/coupons/validate', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ success: false, message: 'Coupon code required' });

  const coupon = mockCoupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
  if (!coupon) {
    return res.status(404).json({ success: false, messageEn: 'Invalid or expired promo code', messageAr: 'كود الخصم غير صالح أو منتهي الصلاحية' });
  }

  res.json({ success: true, data: coupon });
});

// AI Personal Stylist & Support Endpoint (Gemini API)
app.post('/api/ai/chat', async (req, res) => {
  const { message, language = 'en', userContext } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  const catalogSummary = mockProducts.map(p => `- ${p.nameEn} (${p.category}, ${p.gender}, Price: ${p.price} EGP, Sizes: ${p.sizes.join(', ')})`).join('\n');

  const systemPrompt = `You are ZARA's High-Fashion AI Personal Stylist and Luxury Client Advisor for Egypt & Worldwide.
Your goal is to assist customers with:
1. High-fashion outfit recommendations, trend advice, and matching items.
2. Answering questions about current ZARA products in store.
3. Helping with sizing advice, materials, and care instructions.
4. Providing friendly assistance in ${language === 'ar' ? 'Arabic' : 'English'}.

Available Products in Store Catalog:
${catalogSummary}

Guidelines:
- Maintain an elegant, sophisticated, helpful tone like a luxury fashion consultant.
- Keep responses concise, clear, and structured with bullet points where appropriate.
- Recommend relevant products by exact name when appropriate.`;

  try {
    if (process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: message,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });
      return res.json({
        success: true,
        reply: response.text || (language === 'ar' ? 'يسعدنا مساعدتك في ZARA. كيف يمكنني خدمتك اليوم؟' : 'Welcome to ZARA. How may I assist your style journey today?'),
      });
    } else {
      // Smart Fallback when key is not configured
      let reply = '';
      const q = message.toLowerCase();
      if (q.includes('size') || q.includes('مقاس')) {
        reply = language === 'ar'
          ? 'تتميز تشكيلات ZARA بإنهاء دقيق. نوصي باختيار مقاسك المعتاد في البليزر والمعاطف، أو استخدام أداة حساب المقاس المتاحة بصفحة المنتج.'
          : 'ZARA garments fit true to European standards. For oversized coats and blazers, choose your standard size or utilize our instant Size Calculator on product pages.';
      } else if (q.includes('ship') || q.includes('order') || q.includes('شحن') || q.includes('طلب')) {
        reply = language === 'ar'
          ? 'نوفر شحن سريع لجميع محافظات مصر عبر أرامكس وبوستا خلال 1-3 أيام عمل. والشحن مجاني للطلبات فوق 3,000 ج.م.'
          : 'We offer express delivery across all Egypt governorates via Aramex & Bosta in 1-3 business days. Free shipping on orders over 3,000 EGP.';
      } else {
        reply = language === 'ar'
          ? 'أهلاً بك في ZARA! يسعدني إفادتك بأحدث صيحات الموضة، وتنسيق الإطلالات، والتوصيات المناسبة لمناسبتك.'
          : 'Welcome to ZARA Personal Styling! I am here to curate personalized looks, recommend luxury pairings, and guide your shopping experience.';
      }
      return res.json({ success: true, reply });
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.json({
      success: true,
      reply: language === 'ar'
        ? 'يسعدنا مساعدتك في ZARA. يمكنك استعراض تشكيلة الصيف من القائمة الرئيسية.'
        : 'Welcome to ZARA. Please feel free to explore our editorial collection or ask for sizing guidance.'
    });
  }
});

// Admin Coupons Endpoints
app.get('/api/admin/coupons', (req, res) => {
  res.json({ success: true, data: mockCoupons });
});

app.post('/api/admin/coupons', (req, res) => {
  const { code, discountType, value, maxUsage } = req.body;
  const newCoupon = {
    code: code.toUpperCase(),
    discountType,
    value: Number(value),
    maxUsage: Number(maxUsage) || 100,
    usedCount: 0,
    isActive: true
  };
  mockCoupons.push(newCoupon);
  res.status(201).json({ success: true, data: newCoupon });
});

app.delete('/api/admin/coupons/:code', (req, res) => {
  mockCoupons = mockCoupons.filter(c => c.code.toLowerCase() !== req.params.code.toLowerCase());
  res.json({ success: true, message: 'Coupon deleted successfully' });
});

// Inventory stock adjustment API
app.post('/api/admin/stock/adjust', (req, res) => {
  const { productId, newStock } = req.body;
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  product.stock = Number(newStock);
  res.json({ success: true, data: product });
});

// Support Tickets In-Memory DB & APIs
let mockSupportTickets = [
  {
    id: 'TCK-9901',
    subject: 'Exchange Request for Blazer Size 50',
    category: 'Return',
    status: 'In Progress',
    createdAt: '2026-08-03T11:20:00Z',
    userEmail: 'ahmad@example.com',
    userName: 'Ahmad Al-Mansoor',
    messages: [
      { sender: 'user', text: 'I received the blazer yesterday but need size 52.', timestamp: '2026-08-03T11:20:00Z' },
      { sender: 'support', text: 'Hello Ahmad, courier pick-up has been scheduled for exchange.', timestamp: '2026-08-03T12:05:00Z' }
    ]
  }
];

app.get('/api/support/tickets', (req, res) => {
  res.json({ success: true, data: mockSupportTickets });
});

app.post('/api/support/tickets', (req, res) => {
  const { subject, category, message, userEmail, userName } = req.body;
  const newTicket = {
    id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    subject,
    category,
    status: 'Open',
    createdAt: new Date().toISOString(),
    userEmail: userEmail || 'customer@zara.eg',
    userName: userName || 'Valued Customer',
    messages: [
      { sender: 'user', text: message, timestamp: new Date().toISOString() }
    ]
  };
  mockSupportTickets.unshift(newTicket);
  res.status(201).json({ success: true, data: newTicket });
});

// Admin Analytics Stats
app.get('/api/admin/stats', (req, res) => {
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = mockOrders.length;
  const totalProducts = mockProducts.length;
  const lowStockCount = mockProducts.filter(p => p.stock < 15).length;

  res.json({
    success: true,
    data: {
      revenue: totalRevenue + 148500, // simulated historic total
      salesCount: totalOrders + 82,
      profitEstimated: Math.round((totalRevenue + 148500) * 0.38),
      totalVisitorsToday: 1429,
      totalCustomers: 640,
      totalProducts,
      lowStockCount
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');

    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `ZARA Luxury E-Commerce Server running on http://0.0.0.0:${PORT}`
    );
  });
}

// Local development
if (process.env.NODE_ENV !== 'production') {
  startServer();
}

// Vercel
export default app;
