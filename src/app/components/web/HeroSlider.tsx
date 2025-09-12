import { useState, useEffect } from "react";
import heroWatch from "../../../../public/image/hero-collection1.jpeg";
import heroGlasses from "../../../../public/image/hero-glasses-1.jpeg";
import heroCollection from "../../../../public/image/hero-watch-.jpeg";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: heroWatch,
    title: "Luxury Timepieces",
    subtitle: "Crafted for Excellence"
  },
  {
    id: 2,
    image: heroGlasses,
    title: "Designer Eyewear",
    subtitle: "Style Meets Function"
  },
  {
    id: 3,
    image: heroCollection,
    title: "Premium Collection",
    subtitle: "Curated for You"
  }
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-overlay" />
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-luxury-gold scale-110" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;