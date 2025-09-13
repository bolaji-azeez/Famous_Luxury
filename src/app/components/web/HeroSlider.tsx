import { useState, useEffect } from "react";
import Image from "next/image";
import luxuryWatch1 from '../../../../public/image/download.jpg';
import luxuryWatch2 from '../../../../public/image/photo-1511499767150-a48a237f0083.jpeg';
import luxuryWatch3 from '../../../../public/image/photo-1523275335684-37898b6baf30.jpeg';
import luxuryWatch4 from '../../../../public/image/photo-1509695507497-903c140c43b0.jpeg';

const luxuryImages = [
  luxuryWatch1,
  luxuryWatch2,
  luxuryWatch3,
  luxuryWatch4
];

export const HeroSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === luxuryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {luxuryImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Luxury timepiece ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
      ))}
      
      {/* Slider indicators */}
      <div className="absolute bottom-6 left-6 flex space-x-2">
        {luxuryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};