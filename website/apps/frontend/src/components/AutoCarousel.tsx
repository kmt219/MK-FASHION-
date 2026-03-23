"use client";
import React, { useState, useEffect } from 'react';

export default function AutoCarousel({ images, imgClassName = "" }: { images: string[], imgClassName?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1 || !isHovered) {
      if (!isHovered && currentIndex !== 0) {
        setCurrentIndex(0);
      }
      return;
    }
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1500); // 1.5 seconds per slide during hover
    return () => clearInterval(interval);
  }, [images, isHovered, currentIndex]);

  return (
     <div 
        className="relative w-full h-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
     >
        {images.map((src, i) => (
           <img 
              key={i} 
              src={src} 
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${imgClassName} ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
              alt={`Carousel image ${i + 1}`} 
           />
        ))}
     </div>
  );
}
