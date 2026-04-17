'use client';
import { useState, useCallback } from 'react';
import { mockProducts } from '@/lib/mockData';
import type { ProductStatus } from '@/lib/types/admin';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, Plus, X, AlertCircle, CheckCircle2, Tag, Package, DollarSign, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

const tabs = ['Basic Info', 'Pricing', 'Inventory', 'SEO'];

export default function ProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const existing = id === 'new' ? null : mockProducts.find(p => p.id === id);

  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState(existing?.name ?? '');
  const [price, setPrice] = useState(String(existing?.price ?? ''));
  const [compareAt, setCompareAt] = useState(String(existing?.compareAtPrice ?? ''));
  const [stock, setStock] = useState(String(existing?.stock ?? ''));
  const [sku, setSku] = useState(existing?.sku ?? '');
  const [category, setCategory] = useState(existing?.category ?? 'sarees');
  const [status, setStatus] = useState<ProductStatus>(existing?.status ?? 'Draft');
  const [shortDesc, setShortDesc] = useState(existing?.shortDesc ?? '');
  const [tags, setTags] = useState<string[]>(existing?.tags ?? []);
  const [tagInput, setTagInput] = useState('');
  const [weight, setWeight] = useState(existing?.weight ?? '');
  const [imagePreview, setImagePreview] = useState(existing?.image ?? '');
  const [metaTitle, setMetaTitle] = useState(existing?.name ?? '');
  const [metaDesc, setMetaDesc] = useState(existing?.shortDesc ?? '');
  const [slug, setSlug] = useState(existing?.name?.toLowerCase().replace(/\s+/g, '-') ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!name || !price || !sku) { toast.error('Name, price, and SKU are required'); return; }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(id === 'new' ? '🎉 Product created!' : '✅ Product saved!');
      router.push('/admin/products');
    }, 800);
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags(ts => [...ts, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (t: string) => setTags(ts => ts.filter(x => x !== t));

  const discount = price && compareAt ? Math.round((1 - Number(price) / Number(compareAt)) * 100) : 0;
  const isComplete = name && price && sku && stock;

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.push('/admin/products')} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{id === 'new' ? 'Add New Product' : 'Edit Product'}</h1>
          <p className="text-slate-500 text-xs mt-0.5">{id === 'new' ? 'Fill in details and publish when ready' : `Editing: ${existing?.name}`}</p>
        </div>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <span className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-400/10 px-2.5 py-1 rounded-full font-semibold">
              <CheckCircle2 size={12} /> Ready to publish
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-400 text-xs bg-amber-400/10 px-2.5 py-1 rounded-full font-semibold">
              <AlertCircle size={12} /> Incomplete
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1">
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${activeTab === i ? 'bg-purple-600 text-white' : 'bg-white/[0.04] text-slate-400 hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Basic Info */}
          {activeTab === 0 && (
            <>
              <Card title="Core Details" icon={<Package size={14} />}>
                <Field label="Product Name *">
                  <TextInput value={name} onChange={v => { setName(v); setSlug(v.toLowerCase().replace(/\s+/g, '-')); setMetaTitle(v); }} placeholder="e.g. Royal Red Banarasi Saree" />
                </Field>
                <Field label="Short Description">
                  <textarea value={shortDesc} onChange={e => { setShortDesc(e.target.value); setMetaDesc(e.target.value); }} rows={3}
                    placeholder="A brief, compelling description (shown in product listings)..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 resize-none transition-colors" />
                  <p className="text-slate-600 text-[10px] text-right">{shortDesc.length}/200</p>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="SKU *">
                    <TextInput value={sku} onChange={setSku} placeholder="SKU-SAR-001" />
                  </Field>
                  <Field label="Category">
                    <select value={category} onChange={e => setCategory(e.target.value)} className={selectCls}>
                      <option value="sarees">Sarees</option>
                      <option value="lehengas">Lehengas</option>
                      <option value="kurtas">Kurtas</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </Field>
                </div>
              </Card>

              <Card title="Tags" icon={<Tag size={14} />}>
                <div className="flex gap-2">
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Type a tag and press Enter..."
                    className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors" />
                  <button onClick={addTag} className="bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-xl transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tags.map(t => (
                    <span key={t} className="flex items-center gap-1.5 bg-purple-500/15 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-lg text-xs font-medium">
                      #{t}
                      <button onClick={() => removeTag(t)} className="hover:text-white transition-colors"><X size={11} /></button>
                    </span>
                  ))}
                  {tags.length === 0 && <span className="text-slate-600 text-xs italic">No tags yet</span>}
                </div>
              </Card>
            </>
          )}

          {/* Pricing */}
          {activeTab === 1 && (
            <Card title="Pricing Details" icon={<DollarSign size={14} />}>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Selling Price (₹) *">
                  <TextInput type="number" value={price} onChange={setPrice} placeholder="12500" />
                </Field>
                <Field label="Compare-at Price (₹)">
                  <TextInput type="number" value={compareAt} onChange={setCompareAt} placeholder="15000" />
                </Field>
              </div>
              {discount > 0 && (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span className="text-emerald-300 text-sm font-semibold">{discount}% discount will be displayed on the product page</span>
                </div>
              )}
              <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <div className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Margin Preview</div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-white font-bold text-sm">₹{Number(price || 0).toLocaleString()}</div>
                    <div className="text-slate-600 text-[10px]">Sell Price</div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-bold text-sm">₹{Math.round(Number(price || 0) * 0.18).toLocaleString()}</div>
                    <div className="text-slate-600 text-[10px]">GST (18%)</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold text-sm">₹{Math.round(Number(price || 0) * 0.82).toLocaleString()}</div>
                    <div className="text-slate-600 text-[10px]">Net Revenue</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Inventory */}
          {activeTab === 2 && (
            <Card title="Inventory & Status" icon={<BarChart3 size={14} />}>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stock Count *">
                  <TextInput type="number" value={stock} onChange={setStock} placeholder="0" />
                </Field>
                <Field label="Weight (grams)">
                  <TextInput type="number" value={weight} onChange={setWeight} placeholder="500" />
                </Field>
              </div>
              <Field label="Visibility Status">
                <div className="grid grid-cols-3 gap-2">
                  {(['Active', 'Draft', 'Archived'] as ProductStatus[]).map(s => (
                    <button key={s} onClick={() => setStatus(s)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${status === s
                        ? s === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : s === 'Draft' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                        : 'bg-white/[0.04] text-slate-500 border-white/[0.07] hover:text-white'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </Field>
              {Number(stock) <= 5 && Number(stock) > 0 && (
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-300 text-sm">
                  <AlertCircle size={14} /> Low stock warning: only {stock} units remaining
                </div>
              )}
              {Number(stock) === 0 && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                  <AlertCircle size={14} /> Product is out of stock — listing will show "Out of Stock"
                </div>
              )}
            </Card>
          )}

          {/* SEO */}
          {activeTab === 3 && (
            <Card title="SEO & Metadata" icon={<Tag size={14} />}>
              <Field label="URL Slug">
                <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden">
                  <span className="text-slate-600 text-xs px-3 py-2.5 border-r border-white/[0.08]">/products/</span>
                  <input value={slug} onChange={e => setSlug(e.target.value)}
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none" />
                </div>
              </Field>
              <Field label="Meta Title">
                <TextInput value={metaTitle} onChange={setMetaTitle} placeholder="Product page title for search engines" />
                <p className="text-slate-600 text-[10px] text-right">{metaTitle.length}/60</p>
              </Field>
              <Field label="Meta Description">
                <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3}
                  placeholder="1–2 sentences describing the product for search snippets..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 resize-none transition-colors" />
                <p className="text-slate-600 text-[10px] text-right">{metaDesc.length}/160</p>
              </Field>
              {/* SERP Preview */}
              <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Google Preview</div>
                <div className="text-blue-400 text-sm font-medium">{metaTitle || 'Product Title'}</div>
                <div className="text-emerald-600 text-[11px]">mkfashion.in/products/{slug || 'product-slug'}</div>
                <div className="text-slate-400 text-xs mt-1 leading-relaxed">{metaDesc || 'Product description will appear here in search results...'}</div>
              </div>
            </Card>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Image upload */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 space-y-3">
            <div className="text-xs font-semibold text-white flex items-center gap-2"><Upload size={13} className="text-purple-400" /> Product Image</div>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="preview" className="w-full h-40 object-cover rounded-xl" />
                <button onClick={() => setImagePreview('')} className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red-500/60 transition-colors">
                  <X size={13} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-purple-500/40 transition-colors cursor-pointer group" onClick={() => setImagePreview(existing?.image || '/images/hero_banner_1773723337466.png')}>
                <Upload size={22} className="mx-auto text-slate-600 group-hover:text-purple-400 transition-colors mb-2" />
                <p className="text-slate-500 text-xs">Click or drop image here</p>
                <p className="text-slate-700 text-[10px] mt-1">JPG, PNG, WebP · Max 5MB</p>
              </div>
            )}
          </div>

          {/* Status card */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 space-y-3">
            <div className="text-xs font-semibold text-white">Publish Settings</div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Status</span>
              <span className={`font-bold px-2 py-0.5 rounded-md ${status === 'Active' ? 'bg-emerald-500/15 text-emerald-400' : status === 'Draft' ? 'bg-amber-500/15 text-amber-400' : 'bg-slate-500/15 text-slate-400'}`}>{status}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Category</span>
              <span className="text-white font-semibold capitalize">{category}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Price</span>
              <span className="text-emerald-400 font-bold">₹{Number(price || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Stock</span>
              <span className={`font-bold ${Number(stock) === 0 ? 'text-red-400' : Number(stock) <= 5 ? 'text-amber-400' : 'text-white'}`}>{stock || 0} units</span>
            </div>
          </div>

          {/* Save actions */}
          <div className="space-y-2">
            <button onClick={handleSave} disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-900/20 disabled:opacity-70">
              {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={14} /> {id === 'new' ? 'Create Product' : 'Save Changes'}</>}
            </button>
            <button onClick={() => router.push('/admin/products')}
              className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] text-slate-400 font-semibold text-sm transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 space-y-4">
      <h2 className="text-xs font-bold text-purple-300 uppercase tracking-widest flex items-center gap-2">{icon} {title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors" />
  );
}

const selectCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors";
