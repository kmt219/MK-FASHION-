import type { StatData, Product, Order, Customer, Review, Coupon } from './types/admin';

const days = ['Jan 1','Jan 2','Jan 3','Jan 4','Jan 5','Jan 6','Jan 7','Jan 8','Jan 9','Jan 10','Jan 11','Jan 12','Jan 13','Jan 14','Jan 15','Jan 16','Jan 17','Jan 18','Jan 19','Jan 20','Jan 21','Jan 22','Jan 23','Jan 24','Jan 25','Jan 26','Jan 27','Jan 28','Jan 29','Jan 30'];

export const mockStats: StatData = {
  revenue: 420500,
  orders: 142,
  products: 86,
  customers: 3842,
  revenueChart: days.map((day, i) => ({ day, revenue: Math.floor(8000 + Math.sin(i / 3) * 4000 + Math.random() * 3000) })),
  ordersChart: Array.from({ length: 14 }, (_, i) => ({ day: `Apr ${i + 1}`, orders: Math.floor(3 + Math.random() * 15) })),
  orderStatusChart: [
    { name: 'Pending', value: 30 },
    { name: 'Processing', value: 25 },
    { name: 'Shipped', value: 45 },
    { name: 'Delivered', value: 120 },
    { name: 'Cancelled', value: 8 },
    { name: 'Refunded', value: 4 },
  ],
};

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Royal Red Banarasi Saree', category: 'sarees', price: 12500, compareAtPrice: 15000, stock: 8, status: 'Active', image: '/images/hero_banner_1773723337466.png', sku: 'SKU-SAR-001', sold: 34, shortDesc: 'Pure silk Banarasi with intricate zari work.' },
  { id: 'p2', name: 'Emerald Bridal Lehenga', category: 'lehengas', price: 45000, compareAtPrice: 52000, stock: 3, status: 'Active', image: '/images/emerald_dress_1773723403267.png', sku: 'SKU-LEH-001', sold: 12, shortDesc: 'Heavy embroidery bridal lehenga for the perfect wedding look.' },
  { id: 'p3', name: 'Midnight Blue Anarkali', category: 'kurtas', price: 8900, stock: 0, status: 'Draft', image: '/images/blue_dress_1773723443478.png', sku: 'SKU-KUR-001', sold: 0, shortDesc: 'Floor-length anarkali suit in rich midnight blue.' },
  { id: 'p4', name: 'Burgundy Silk Saree', category: 'sarees', price: 9800, compareAtPrice: 11000, stock: 15, status: 'Active', image: '/images/burgundy_dress_1773723369596.png', sku: 'SKU-SAR-002', sold: 56, shortDesc: 'Pure Kanjivaram silk saree in rich burgundy.' },
  { id: 'p5', name: 'Golden Festive Kurta Set', category: 'kurtas', price: 6500, stock: 22, status: 'Active', image: '/images/hero_banner_1773723337466.png', sku: 'SKU-KUR-002', sold: 28, shortDesc: 'Gold thread work festive kurta set.' },
  { id: 'p6', name: 'Pearl Drop Earrings', category: 'accessories', price: 1800, stock: 40, status: 'Active', image: '/images/blue_dress_1773723443478.png', sku: 'SKU-ACC-001', sold: 90, shortDesc: 'Handcrafted pearl drop earrings.' },
  { id: 'p7', name: 'Pink Banarasi Lehenga', category: 'lehengas', price: 32000, stock: 5, status: 'Archived', image: '/images/burgundy_dress_1773723369596.png', sku: 'SKU-LEH-002', sold: 7, shortDesc: 'Pastel pink Banarasi lehenga.' },
];

export const mockOrders: Order[] = [
  { id: '#4021', customer: 'Anjali Mehta', email: 'anjali@example.com', date: '2026-04-16', items: 2, total: 22300, paymentStatus: 'Paid', status: 'Pending', address: '12 MG Road, Bengaluru, Karnataka 560001', phone: '+91 98765 43210', products: [{ name: 'Royal Red Banarasi Saree', qty: 1, price: 12500, image: '/images/hero_banner_1773723337466.png' }, { name: 'Pearl Drop Earrings', qty: 2, price: 1800, image: '/images/blue_dress_1773723443478.png' }] },
  { id: '#4020', customer: 'Priya Sharma', email: 'priya@example.com', date: '2026-04-15', items: 1, total: 45000, paymentStatus: 'Paid', status: 'Processing', address: '5 Lokhandwala, Mumbai, Maharashtra 400053', phone: '+91 99887 65432', products: [{ name: 'Emerald Bridal Lehenga', qty: 1, price: 45000, image: '/images/emerald_dress_1773723403267.png' }], trackingNumber: 'DTDC4021000' },
  { id: '#4019', customer: 'Kavita Singh', email: 'kavita@example.com', date: '2026-04-14', items: 3, total: 18900, paymentStatus: 'Paid', status: 'Shipped', address: '88 Civil Lines, Jaipur, Rajasthan 302006', phone: '+91 91234 56789', products: [{ name: 'Burgundy Silk Saree', qty: 1, price: 9800, image: '/images/burgundy_dress_1773723369596.png' }, { name: 'Golden Festive Kurta Set', qty: 1, price: 6500, image: '/images/hero_banner_1773723337466.png' }, { name: 'Pearl Drop Earrings', qty: 1, price: 1800, image: '/images/blue_dress_1773723443478.png' }], trackingNumber: 'BLUEDART40190' },
  { id: '#4018', customer: 'Sunita Rao', email: 'sunita@example.com', date: '2026-04-13', items: 1, total: 9800, paymentStatus: 'Paid', status: 'Delivered', address: '3 Gandhi Nagar, Hyderabad, Telangana 500080', phone: '+91 94567 89012', products: [{ name: 'Burgundy Silk Saree', qty: 1, price: 9800, image: '/images/burgundy_dress_1773723369596.png' }] },
  { id: '#4017', customer: 'Rekha Patel', email: 'rekha@example.com', date: '2026-04-12', items: 2, total: 15300, paymentStatus: 'Unpaid', status: 'Cancelled', address: '7 Navrangpura, Ahmedabad, Gujarat 380009', phone: '+91 93456 78901', products: [{ name: 'Royal Red Banarasi Saree', qty: 1, price: 12500, image: '/images/hero_banner_1773723337466.png' }, { name: 'Pearl Drop Earrings', qty: 1, price: 1800, image: '/images/blue_dress_1773723443478.png' }] },
  { id: '#4016', customer: 'Deepa Nair', email: 'deepa@example.com', date: '2026-04-11', items: 1, total: 32000, paymentStatus: 'Refunded', status: 'Refunded', address: '22 Koramangala, Bengaluru, Karnataka 560034', phone: '+91 98012 34567', products: [{ name: 'Pink Banarasi Lehenga', qty: 1, price: 32000, image: '/images/burgundy_dress_1773723369596.png' }] },
];

export const mockCustomers: Customer[] = [
  { id: 'c1', name: 'Anjali Mehta', email: 'anjali@example.com', phone: '+91 98765 43210', totalOrders: 5, totalSpent: 68000, joined: '2025-11-12', status: 'Active', avatar: 'AM' },
  { id: 'c2', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 99887 65432', totalOrders: 2, totalSpent: 53900, joined: '2026-01-05', status: 'Active', avatar: 'PS' },
  { id: 'c3', name: 'Kavita Singh', email: 'kavita@example.com', phone: '+91 91234 56789', totalOrders: 8, totalSpent: 124500, joined: '2025-08-22', status: 'Active', avatar: 'KS' },
  { id: 'c4', name: 'Sunita Rao', email: 'sunita@example.com', phone: '+91 94567 89012', totalOrders: 3, totalSpent: 27400, joined: '2025-12-30', status: 'Active', avatar: 'SR' },
  { id: 'c5', name: 'Rekha Patel', email: 'rekha@example.com', phone: '+91 93456 78901', totalOrders: 1, totalSpent: 0, joined: '2026-03-18', status: 'Blocked', avatar: 'RP' },
  { id: 'c6', name: 'Deepa Nair', email: 'deepa@example.com', phone: '+91 98012 34567', totalOrders: 4, totalSpent: 81200, joined: '2025-10-05', status: 'Active', avatar: 'DN' },
];

export const mockReviews: Review[] = [
  { id: 'r1', productName: 'Royal Red Banarasi Saree', productImage: '/images/hero_banner_1773723337466.png', customer: 'Anjali Mehta', rating: 5, text: 'Absolutely stunning saree! The quality is beyond my expectations. The zari work is exquisite.', date: '2026-04-10', status: 'Approved' },
  { id: 'r2', productName: 'Emerald Bridal Lehenga', productImage: '/images/emerald_dress_1773723403267.png', customer: 'Priya Sharma', rating: 4, text: 'Beautiful lehenga, looked very regal on my wedding day. Delivery was prompt.', date: '2026-04-09', status: 'Pending' },
  { id: 'r3', productName: 'Burgundy Silk Saree', productImage: '/images/burgundy_dress_1773723369596.png', customer: 'Kavita Singh', rating: 5, text: 'Pure Kanjivaram quality is unmatched. Perfect for festivals.', date: '2026-04-08', status: 'Approved' },
  { id: 'r4', productName: 'Golden Festive Kurta Set', productImage: '/images/hero_banner_1773723337466.png', customer: 'Sunita Rao', rating: 2, text: 'Colour was different from the photo. A bit disappointed.', date: '2026-04-07', status: 'Pending' },
  { id: 'r5', productName: 'Pearl Drop Earrings', productImage: '/images/blue_dress_1773723443478.png', customer: 'Deepa Nair', rating: 5, text: 'Super elegant and lightweight. Got so many compliments!', date: '2026-04-06', status: 'Rejected' },
];

export const mockCoupons: Coupon[] = [
  { id: 'cp1', code: 'WELCOME20', type: 'percent', value: 20, minOrder: 5000, uses: 45, maxUses: 100, expiry: '2026-06-30', active: true },
  { id: 'cp2', code: 'FLAT500', type: 'fixed', value: 500, minOrder: 3000, uses: 120, maxUses: 200, expiry: '2026-05-15', active: true },
  { id: 'cp3', code: 'BRIDE10', type: 'percent', value: 10, minOrder: 20000, uses: 18, maxUses: 50, expiry: '2026-12-31', active: true },
  { id: 'cp4', code: 'SUMMER15', type: 'percent', value: 15, minOrder: 4000, uses: 200, maxUses: 200, expiry: '2026-03-31', active: false },
];
