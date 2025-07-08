"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SlideData[] = [
    {
      id: 1,
      title: "Cartier",
      subtitle: "Timeless Luxury",
      description:
        "Experience the epitome of sophistication with Cartier wristwatches—where iconic design meets masterful craftsmanship. Each Cartier timepiece is a symbol of prestige, blending refined elegance with enduring quality. Adorn your wrist with a legacy of luxury that transcends generations.",
      image: "/images/s-l1600-removebg-preview.png", // Place your image in /public/images/watch1.jpg
      alt: "Luxury Cartier Wrist Watch",
    },
    {
      id: 5,
      title: "Modern luxury",
      subtitle: "meets tradition",
      description:
        "Discover our contemporary collection where cutting-edge technology meets timeless design. These exceptional timepieces are engineered for the modern connoisseur who values both style and substance.",
      image: "/images/preview1.png", // Place your image in /public/images/watch3.jpg
      alt: "Modern Luxury Watch",
    },
    {
      id: 2,
      title: "Crafted for",
      subtitle: "perfection",
      description:
        "Experience the pinnacle of horological excellence with our meticulously crafted timepieces. Each watch represents decades of Swiss tradition and innovation, designed for those who appreciate the finer things in life.",
      image: "/images/watch1.png", // Place your image in /public/images/watch2.jpg
      alt: "Premium Gold Watch",
    },
    {
      id: 3,
      title: "Modern luxury",
      subtitle: "meets tradition",
      description:
        "Discover our contemporary collection where cutting-edge technology meets timeless design. These exceptional timepieces are engineered for the modern connoisseur who values both style and substance.",
      image: "/images/watch3.png", // Place your image in /public/images/watch3.jpg
      alt: "Modern Luxury Watch",
    },
    {
      id: 4,
      title: "G-Shock",
      subtitle: "meets tradition",
      description:
        "Discover our contemporary collection where cutting-edge technology meets timeless design. These exceptional timepieces are engineered for the modern connoisseur who values both style and substance.",
      image: "/images/barriel-removebg-preview.png", // Place your image in /public/images/watch3.jpg
      alt: "Modern Luxury Watch",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen bg-[#FFFFF7]  overflow-hidden flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 " />
      </div>

      {/* Slider Container */}
      <div className="relative h-full w-[85%]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-20">
                {/* Content Section */}
                <div className="space-y-8 text-white order-2 lg:order-1">
                  <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight text-[#5C3A21]">
                      <span className="block">{slide.title}</span>
                      <span className="block font-normal">
                        {slide.subtitle}
                      </span>
                    </h1>

                    <p className="text-[#4A5568] text-lg sm:text-xl max-w-2xl leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <h3 className="font-semibold text-lg text-[#4A5568] transition-all duration-300 flex items-center gap-3 hover:gap-4 hover:text-[black]">
                    Discover collections
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </h3>
                </div>

                {/* Image Section */}
                <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                  <div className="relative w-full bg-[#f2f2f2] max-w-lg lg:max-w-xl xl:max-w-2xl">
                    <div className="absolute inset-0 bg-[#f2f2f2] rounded-full blur-3xl scale-150" />
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.alt}
                      width={600}
                      height={600}
                      className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
