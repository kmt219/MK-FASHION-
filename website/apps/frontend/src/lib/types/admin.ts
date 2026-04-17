export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
export type ProductStatus = 'Active' | 'Draft' | 'Archived';
export type CustomerStatus = 'Active' | 'Blocked';
export type ReviewStatus = 'Approved' | 'Pending' | 'Rejected';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  status: ProductStatus;
  image: string;
  sku: string;
  sold: number;
  shortDesc?: string;
  tags?: string[];
  weight?: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  paymentStatus: 'Paid' | 'Unpaid' | 'Refunded';
  status: OrderStatus;
  products: { name: string; qty: number; price: number; image: string }[];
  address: string;
  phone: string;
  trackingNumber?: string;
  notes?: string;
  shippingMethod?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joined: string;
  status: CustomerStatus;
  avatar: string;
  city?: string;
  lastOrder?: string;
}

export interface Review {
  id: string;
  productName: string;
  productImage: string;
  customer: string;
  rating: number;
  text: string;
  date: string;
  status: ReviewStatus;
  helpful?: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minOrder: number;
  uses: number;
  maxUses: number;
  expiry: string;
  active: boolean;
  description?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Viewer';
  avatar: string;
  lastLogin: string;
  status: 'Active' | 'Invited';
}

export interface StatData {
  revenue: number;
  orders: number;
  products: number;
  customers: number;
  revenueChart: { day: string; revenue: number }[];
  ordersChart: { day: string; orders: number }[];
  orderStatusChart: { name: OrderStatus; value: number }[];
}
