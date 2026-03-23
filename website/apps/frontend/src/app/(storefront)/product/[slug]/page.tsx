import { reader } from '@/lib/keystatic';
import ProductClient from './ProductClient';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Fetch from the local Keystatic CMS
  const cmsProduct = await reader.collections.products.read(params.slug);
  
  // Format the CMS response to match our ProductClient structured object
  // If the product doesn't exist yet in the CMS, use stunning fallback mock data to keep the prototype impressive
  const product = cmsProduct ? {
    name: cmsProduct.title,
    price: cmsProduct.price,
    category: cmsProduct.category,
    shortDesc: cmsProduct.shortDesc || "A timeless masterpiece curated by MK Fashion, featuring intricate hand-details, impeccable silhouette, and the finest fabrics locally sourced.",
    images: cmsProduct.images?.length ? cmsProduct.images : ["/images/burgundy_dress_1773723369596.png"],
    details: cmsProduct.details?.length ? cmsProduct.details : ["Material: Premium Micro-Velvet / Pure Silk blend", "Care Instructions: Dry Clean Only to preserve thread-work"],
    about: cmsProduct.about || "Our master artisans in Jaipur spend over 200 hours hand-embroidering each individual piece. This collection pays homage to long-standing royal heritage while seamlessly offering a comfortable, modern silhouette. Every stitch, every thread tells a unique story of cultural authenticity and artisan traceability.",
    reviews: {
      rating: cmsProduct.reviewRating || 5,
      count: cmsProduct.reviewCount || 10,
      items: [
        { name: "Priya S.", rating: 5, date: "October 12, 2025", comment: "Absolutely stunning craftsmanship. I wore this to my brother's wedding and received non-stop compliments! The fabric flows perfectly and the fit is incredibly flattering.", images: ["/images/burgundy_dress_1773723369596.png", "/images/emerald_dress_1773723403267.png"] },
        { name: "Anita M.", rating: 5, date: "September 04, 2025", comment: "The material feels incredibly luxurious and the embroidery is flawless. Worth every penny. MK Fashion has gained a lifetime customer.", images: ["/images/blue_dress_1773723443478.png"] }
      ]
    }
  } : {
    name: params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    price: 24500,
    category: 'lehengas',
    shortDesc: "A timeless masterpiece curated by MK Fashion, featuring intricate hand-details, impeccable silhouette, and the finest fabrics locally sourced to ensure you make a statement at any royal occasion.",
    images: ["/images/burgundy_dress_1773723369596.png", "/images/emerald_dress_1773723403267.png", "/images/blue_dress_1773723443478.png"],
    reviews: {
      rating: 4.8, count: 124, items: [
        { name: "Priya S.", rating: 5, date: "October 12, 2025", comment: "Absolutely stunning craftsmanship.", images: ["/images/burgundy_dress_1773723369596.png", "/images/emerald_dress_1773723403267.png"] },
        { name: "Anita M.", rating: 5, date: "September 04, 2025", comment: "The material feels incredibly luxurious.", images: ["/images/blue_dress_1773723443478.png"] },
        { name: "Smriti R.", rating: 4, date: "July 12, 2025", comment: "Beautiful attire, received numerous compliments.", images: ["/images/hero_banner_1773723337466.png", "/images/burgundy_dress_1773723369596.png", "/images/blue_dress_1773723443478.png"] },
      ]
    },
    about: "Our master artisans in Jaipur spend over 200 hours hand-embroidering each individual piece. This collection pays homage to long-standing royal heritage while seamlessly offering a comfortable, modern silhouette. Every stitch, every thread tells a unique story of cultural authenticity and artisan traceability.",
    details: ["Material: Premium Micro-Velvet / Pure Silk blend", "Work: Authentic Gold Zari & Sequins Hand Embroidery", "Care Instructions: Dry Clean Only to preserve thread-work", "Includes: Fully stitched attire, matching blouse piece, and Dupatta"]
  };

  return <ProductClient product={product} />;
}
