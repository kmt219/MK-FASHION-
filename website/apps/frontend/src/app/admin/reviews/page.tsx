'use client';
import { useState } from 'react';
import { mockReviews } from '@/lib/mockData';
import type { Review, ReviewStatus } from '@/lib/types/admin';
import { Check, X, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_STYLES: Record<ReviewStatus, string> = {
  Approved: 'bg-emerald-500/20 text-emerald-400',
  Pending:  'bg-amber-500/20 text-amber-400',
  Rejected: 'bg-red-500/20 text-red-400',
};

const TABS: Array<ReviewStatus | 'All'> = ['All', 'Pending', 'Approved', 'Rejected'];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [tab, setTab] = useState<ReviewStatus | 'All'>('All');

  const filtered = tab === 'All' ? reviews : reviews.filter(r => r.status === tab);

  const updateStatus = (id: string, status: ReviewStatus) => {
    setReviews(rs => rs.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Review ${status.toLowerCase()}`);
  };
  const remove = (id: string) => { setReviews(rs => rs.filter(r => r.id !== id)); toast.success('Review deleted'); };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Reviews</h1>
        <p className="text-slate-400 text-sm mt-0.5">Moderate customer reviews</p>
      </div>

      <div className="flex gap-2">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${tab === t ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
            {t} <span className="opacity-60">({t === 'All' ? reviews.length : reviews.filter(r => r.status === t).length})</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex gap-4">
              <img src={r.productImage} alt={r.productName} className="w-12 h-12 rounded-xl object-cover shrink-0 bg-white/5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="text-white font-medium text-sm">{r.productName}</div>
                    <div className="text-slate-500 text-xs">{r.customer} · {r.date}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${STATUS_STYLES[r.status]}`}>{r.status}</span>
                </div>
                <div className="flex gap-0.5 my-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{r.text}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
              {r.status !== 'Approved' && (
                <button onClick={() => updateStatus(r.id, 'Approved')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-xs font-medium">
                  <Check size={12} /> Approve
                </button>
              )}
              {r.status !== 'Rejected' && (
                <button onClick={() => updateStatus(r.id, 'Rejected')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-xs font-medium">
                  <X size={12} /> Reject
                </button>
              )}
              <button onClick={() => remove(r.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-xs font-medium ml-auto">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">No reviews in this category</div>
        )}
      </div>
    </div>
  );
}
