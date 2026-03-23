"use client";
import { useState } from 'react';
import AutoCarousel from '@/components/AutoCarousel';

export default function KurtasPage() {
  const initialProducts = [
    { name: "Royal Blue Silk Kaftan", price: 12499, category: "Straight Cut", img: "/images/blue_dress_1773723443478.png" },
    { name: "Emerald Anarkali Suit", price: 14999, category: "Anarkalis", img: "/images/emerald_dress_1773723403267.png" },
    { name: "Burgundy Velvet Kurta Set", price: 18500, category: "Straight Cut", img: "/images/burgundy_dress_1773723369596.png" },
    { name: "Ivory Chanderi Kurta", price: 8900, category: "Anarkalis", img: "/images/hero_banner_1773723337466.png" },
    { name: "Mustard Yellow Festive Suit", price: 11000, category: "Straight Cut", img: "/images/blue_dress_1773723443478.png" },
    { name: "Mint Green Sharara Set", price: 16500, category: "Sharara Sets", img: "/images/emerald_dress_1773723403267.png" }
  ];

  const [filter, setFilter] = useState("View All");

  const filteredProducts = filter === "View All" 
    ? initialProducts 
    : initialProducts.filter(p => p.category === filter);

  return (
    <div className="w-full">
      {/* Category Header */}
      <section className="bg-brand-cream/30 pt-32 pb-16 px-8 text-center border-b border-brand-burgundy/10">
         <h1 className="font-serif text-5xl md:text-6xl mb-6 text-gray-900">Festive Kurtas</h1>
         <p className="max-w-2xl mx-auto text-lg text-gray-600">Discover our collection of deeply rooted yet modern silhouettes. From regal Anarkalis to elegant straight cut Kurtas designed for everyday celebrations.</p>
         <div className="mt-12 flex flex-wrap justify-center gap-4">
            {["Anarkalis", "Straight Cut", "Sharara Sets", "View All"].map(cat => (
               <span 
                 key={cat}
                 onClick={() => setFilter(cat)}
                 className={`px-6 py-2 border border-brand-burgundy/30 rounded-full text-sm font-medium cursor-pointer transition-colors ${filter === cat ? 'bg-brand-burgundy text-white' : 'text-brand-burgundy hover:bg-brand-burgundy hover:text-white'}`}
               >
                 {cat}
               </span>
            ))}
         </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
         <div className="mb-6 text-sm text-gray-500 font-medium">{filteredProducts.length} Products</div>
         {filteredProducts.length === 0 ? (
           <div className="text-center py-20 text-gray-500">No products found in this category.</div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
               {filteredProducts.map((item, idx) => {
                 const slug = item.name.toLowerCase().replace(/\s+/g, '-');
                 return (
                 <a href={`/product/${slug}`} key={idx} className="group cursor-pointer flex flex-col items-center text-center block">
                   <div className="aspect-[3/4] bg-slate-100 w-full mb-6 overflow-hidden relative rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                        <AutoCarousel 
                          images={[item.img, "/images/hero_banner_1773723337466.png", "/images/emerald_dress_1773723403267.png"]}
                          imgClassName="transition-transform duration-700 group-hover:scale-105"
                        />

                   </div>
                   <h4 className="font-serif text-xl mb-1 text-gray-900 group-hover:text-brand-gold transition-colors">{item.name}</h4>
                   <div className="flex items-center justify-center gap-1 mb-2">
                     <div className="flex text-brand-gold text-xs">★★★★★</div>
                     <span className="text-xs text-gray-400">({((idx * 17) % 80) + 12})</span>
                   </div>
                   <p className="font-medium text-gray-500">₹{item.price.toLocaleString('en-IN')}</p>
                   <div className="flex gap-2 mt-4">
                      <div className="w-3 h-3 rounded-full bg-brand-burgundy ring-1 ring-offset-2 ring-brand-burgundy cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-800 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-800 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"></div>
                   </div>
                 </a>
               );
               })}
           </div>
         )}
      </section>
    </div>
  );
}
