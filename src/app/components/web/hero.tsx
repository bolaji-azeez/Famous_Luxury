"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const heroSlides = [
    {
      id: 2,
      backgroundImage: "/images/two.png",
      title: "Crystal Grandeur",

      description:
        "Elevate every moment with dazzling crystalware designed to impress and inspire.",
      buttonLink: "/glass",
    },
    {
      id: 3,
      backgroundImage: "/images/three.png",
      title: "Elite Exclusives",

      description:
        "Discover limited treasures reserved for the select few who appreciate true distinction.",
      buttonLink: "/limited-edition",
    },
    {
      id: 4,
      backgroundImage: "/images/four.png",
      title: "Legacy Icons",

      description:
        "Celebrate enduring craftsmanship and innovation with pieces that define luxury.",
      buttonLink: "/heritage",
    },
    {
      id: 5,
      backgroundImage: "/images/five.png",
      title: "Majestic Rarities",

      description:
        "Own a masterpiece that embodies grandeur, exclusivity, and impeccable taste.",
      buttonLink: "/majesty",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "-50px 0px", // Add some margin for better timing
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section ref={heroRef} className="relative h-[80vh] overflow-hidden">
      {/* Background Images Slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}>
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slide.backgroundImage}')`,
              }}>
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Content - Positioned on the left */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8  w-[85%]">
          <div className="max-w-2xl">
            {/* Animated content that changes with slides */}
            <div
              key={`${currentSlide}-${isVisible}`}
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 transform translate-x-0 translate-y-0"
                  : "opacity-0 transform -translate-x-10 translate-y-5"
              } text-left sm:text-left`}>
              <h1 className="text-7xl font-bold  mb-5">
                {heroSlides[currentSlide].title}
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-3xl text-gold font-medium mb-6">
                {heroSlides[currentSlide].subtitle}
              </h2>

              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed w-[540px]">
                <span>
                  {heroSlides[currentSlide].description
                    .split("")
                    .map((char, i) => (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          opacity: 0,
                          animation: `fadeInChar 0.03s forwards`,
                          animationDelay: `${i * 0.03}s`,
                        }}>
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                </span>
                <style jsx>{`
                  @keyframes fadeInChar {
                    to {
                      opacity: 1;
                    }
                  }
                `}</style>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-luxury-gold hover:bg-luxury-gold-dark text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"></Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-luxury-charcoal px-8 py-6 text-lg font-semibold bg-transparent transition-all duration-300">
                  <Link href="/about">Discover more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Previous slide">
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Next slide">
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
    </section>
  );
}
