'use client';
import { useState } from 'react';
import { mockOrders } from '@/lib/mockData';
import type { OrderStatus } from '@/lib/types/admin';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Package, CheckCircle, Truck, Home, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ALL_STATUSES: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const STATUS_BADGE: Record<OrderStatus, string> = {
  Pending:    'bg-amber-500/20 text-amber-400',
  Processing: 'bg-blue-500/20 text-blue-400',
  Shipped:    'bg-purple-500/20 text-purple-400',
  Delivered:  'bg-emerald-500/20 text-emerald-400',
  Cancelled:  'bg-red-500/20 text-red-400',
  Refunded:   'bg-slate-500/20 text-slate-400',
};

const STEP_ICONS: Record<string, React.ReactNode> = {
  Pending:    <Package size={16} />,
  Processing: <CheckCircle size={16} />,
  Shipped:    <Truck size={16} />,
  Delivered:  <Home size={16} />,
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const order = mockOrders.find(o => o.id === `#${id}` || o.id === id);

  const [status, setStatus] = useState<OrderStatus>(order?.status ?? 'Pending');
  const [tracking, setTracking] = useState(order?.trackingNumber ?? '');
  const [note, setNote] = useState('');

  if (!order) return (
    <div className="text-center py-32">
      <p className="text-slate-400">Order not found.</p>
      <button onClick={() => router.push('/admin/orders')} className="mt-4 text-purple-400 hover:underline">Back to orders</button>
    </div>
  );

  const stepIndex = ALL_STATUSES.indexOf(status);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push('/admin/orders')} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Order {order.id}</h1>
          <p className="text-slate-400 text-sm">{order.date} · {order.customer}</p>
        </div>
        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[status]}`}>{status}</span>
      </div>

      {/* Stepper */}
      {!['Cancelled','Refunded'].includes(status) && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-purple-300 uppercase tracking-widest mb-5">Order Progress</h2>
          <div className="flex items-center">
            {ALL_STATUSES.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center relative">
                {i < ALL_STATUSES.length - 1 && (
                  <div className={`absolute top-4 left-1/2 w-full h-0.5 ${i < stepIndex ? 'bg-purple-500' : 'bg-white/10'}`} />
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-sm transition-colors
                  ${i <= stepIndex ? 'bg-purple-600 text-white' : 'bg-white/10 text-slate-500'}`}>
                  {STEP_ICONS[s]}
                </div>
                <span className={`text-xs mt-2 font-medium ${i <= stepIndex ? 'text-purple-300' : 'text-slate-500'}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-purple-300 uppercase tracking-widest mb-4">Order Items</h2>
        <div className="space-y-3">
          {order.products.map((p, i) => (
            <div key={i} className="flex items-center gap-4">
              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-white/5" />
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{p.name}</div>
                <div className="text-slate-500 text-xs">Qty: {p.qty}</div>
              </div>
              <div className="text-white font-semibold">₹{(p.price * p.qty).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
          <span className="text-slate-400 text-sm">Order Total</span>
          <span className="text-white font-bold text-lg">₹{order.total.toLocaleString()}</span>
        </div>
      </div>

      {/* Customer + Update */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
          <h2 className="text-sm font-semibold text-purple-300 uppercase tracking-widest mb-3">Customer</h2>
          <p className="text-white font-medium">{order.customer}</p>
          <p className="text-slate-400 text-sm">{order.email}</p>
          <p className="text-slate-400 text-sm">{order.phone}</p>
          <p className="text-slate-400 text-sm mt-2">{order.address}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-purple-300 uppercase tracking-widest">Update Order</h2>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as OrderStatus)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500">
              {(['Pending','Processing','Shipped','Delivered','Cancelled','Refunded'] as OrderStatus[]).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Tracking Number</label>
            <input value={tracking} onChange={e => setTracking(e.target.value)} placeholder="e.g. DTDC4021000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Internal Note</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Private admin note..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none" />
          </div>
          <button onClick={() => toast.success('Order updated!')}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors">
            Save Changes
          </button>
          <button onClick={() => toast.error('Order cancelled')}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            <XCircle size={14} /> Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}
