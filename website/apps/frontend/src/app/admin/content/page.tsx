'use client';
import { useState } from 'react';
import { Upload, Save, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContentPage() {
  const [headline, setHeadline] = useState('Celebrate Tradition. Own the Moment.');
  const [subheadline, setSubheadline] = useState('Explore our curated collection of premium ethnic wear.');
  const [ctaText, setCtaText] = useState('Shop Now');
  const [announcement, setAnnouncement] = useState('🎉 Free shipping on orders above ₹2000! Use code WELCOME20 for 20% off.');
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Content Management</h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage banners, announcements and featured content</p>
      </div>

      {/* Announcement Bar */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-purple-300 uppercase tracking-widest">Announcement Bar</h2>
          <button onClick={() => setShowAnnouncement(s => !s)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${showAnnouncement ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-400'}`}>
            {showAnnouncement ? <Eye size={12} /> : <EyeOff size={12} />}
            {showAnnouncement ? 'Visible' : 'Hidden'}
          </button>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-slate-400">Announcement Text</label>
          <textarea value={announcement} onChange={e => setAnnouncement(e.target.value)} rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none" />
        </div>
        {/* Preview */}
        {showAnnouncement && (
          <div className="bg-purple-700 text-white text-center text-sm py-2 rounded-lg">{announcement}</div>
        )}
        <button onClick={() => toast.success('Announcement updated!')} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          <Save size={14} /> Save
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-purple-300 uppercase tracking-widest">Homepage Hero Banner</h2>

        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer group">
          <Upload size={24} className="mx-auto text-slate-500 group-hover:text-purple-400 transition-colors mb-2" />
          <p className="text-slate-400 text-sm">Click to upload hero image</p>
          <p className="text-slate-600 text-xs mt-1">Recommended: 1920×600px, JPG/PNG</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-slate-400">Headline</label>
          <input value={headline} onChange={e => setHeadline(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-slate-400">Subheadline</label>
          <input value={subheadline} onChange={e => setSubheadline(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-slate-400">CTA Button Text</label>
          <input value={ctaText} onChange={e => setCtaText(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
        </div>

        {/* Preview */}
        <div>
          <label className="text-xs text-slate-400 mb-2 block">Preview</label>
          <div className="bg-gradient-to-r from-[#1a0a2e] to-[#3b0764] rounded-xl p-8 text-white">
            <div className="text-2xl font-bold mb-2">{headline}</div>
            <div className="text-sm opacity-75 mb-4">{subheadline}</div>
            <button className="bg-white text-purple-900 px-5 py-2 rounded-lg text-sm font-bold">{ctaText}</button>
          </div>
        </div>

        <button onClick={() => toast.success('Hero banner saved!')} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          <Save size={14} /> Publish Changes
        </button>
      </div>

      {/* Featured Collections */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-purple-300 uppercase tracking-widest">Featured Collections</h2>
        <p className="text-slate-400 text-sm">Select which categories appear on the homepage</p>
        <div className="grid grid-cols-2 gap-3">
          {['Bridal Lehengas', 'Silk Sarees', 'Festive Kurtas', 'Accessories'].map(cat => (
            <label key={cat} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:border-purple-500/30 transition-colors">
              <input type="checkbox" defaultChecked={['Bridal Lehengas','Silk Sarees'].includes(cat)} className="accent-purple-500 w-4 h-4" />
              <span className="text-sm text-slate-300">{cat}</span>
            </label>
          ))}
        </div>
        <button onClick={() => toast.success('Featured collections updated!')} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          <Save size={14} /> Save
        </button>
      </div>
    </div>
  );
}
