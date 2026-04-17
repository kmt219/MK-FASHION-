'use client';
import { useState } from 'react';
import { Plus, ChevronRight, ChevronDown, Edit2, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  children?: CategoryNode[];
  image?: string;
}

const INITIAL_CATEGORIES: CategoryNode[] = [
  {
    id: '1',
    name: 'Sarees',
    slug: 'sarees',
    itemCount: 42,
    children: [
      { id: '1-1', name: 'Silk Sarees', slug: 'silk-sarees', itemCount: 18 },
      { id: '1-2', name: 'Banarasi', slug: 'banarasi', itemCount: 12 },
      { id: '1-3', name: 'Chiffon', slug: 'chiffon', itemCount: 12 },
    ]
  },
  {
    id: '2',
    name: 'Lehengas',
    slug: 'lehengas',
    itemCount: 25,
    children: [
      { id: '2-1', name: 'Bridal', slug: 'bridal-lehengas', itemCount: 15 },
      { id: '2-2', name: 'Party Wear', slug: 'party-lehengas', itemCount: 10 },
    ]
  },
  {
    id: '3',
    name: 'Kurtas',
    slug: 'kurtas',
    itemCount: 38,
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    itemCount: 112,
  }
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryNode[]>(INITIAL_CATEGORIES);
  const [expanded, setExpanded] = useState<string[]>(['1', '2']);

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDelete = (id: string) => {
    toast.error('Delete functionality disabled in demo');
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Category Management</h1>
          <p className="text-slate-400 text-sm mt-0.5">Organize your product hierarchy and navigation</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-purple-900/20">
          <Plus size={16} /> Add Root Category
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[24px] overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.02]">
          <h2 className="text-sm font-semibold text-purple-300 uppercase tracking-widest">Category Tree</h2>
        </div>
        
        <div className="p-4 space-y-2">
          {categories.map(cat => (
            <CategoryItem 
              key={cat.id} 
              category={cat} 
              expanded={expanded} 
              onToggle={toggleExpand} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5">
          <h3 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
             <Edit2 size={16} /> Pro Tip
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Drag and drop categories to reorder them or change their nesting level. Changes to slugs will automatically update the product navigation links.
          </p>
        </div>
        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5">
           <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
             <ImageIcon size={16} /> Media Assets
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Categories with banner images perform 40% better on mobile views. Ensure your category banners are optimized for fast loading (WebP recommended).
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoryItem({ 
  category, 
  expanded, 
  onToggle, 
  onDelete, 
  level = 0 
}: { 
  category: CategoryNode; 
  expanded: string[]; 
  onToggle: (id: string) => void; 
  onDelete: (id: string) => void;
  level?: number;
}) {
  const isExpanded = expanded.includes(category.id);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="space-y-1">
      <div className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border border-transparent hover:bg-white/[0.04] hover:border-white/5 ${level > 0 ? 'ml-8' : ''}`}>
        <div className="cursor-grab active:cursor-grabbing text-slate-700 group-hover:text-slate-500">
          <GripVertical size={16} />
        </div>
        
        <button 
          onClick={() => hasChildren && onToggle(category.id)}
          className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${hasChildren ? 'text-purple-400 hover:bg-purple-400/10' : 'text-transparent'}`}
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-purple-400 transition-colors`}>
               <ImageIcon size={16} />
             </div>
             <div>
               <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">{category.name}</div>
               <div className="text-[11px] text-slate-500 font-mono tracking-tight">/{category.slug}</div>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-xs text-slate-500 font-medium hidden sm:block">
              {category.itemCount} Products
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Plus size={14} />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Edit2 size={14} />
              </button>
              <button onClick={() => onDelete(category.id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-1">
          {category.children!.map(child => (
            <CategoryItem 
              key={child.id} 
              category={child} 
              expanded={expanded} 
              onToggle={onToggle} 
              onDelete={onDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
