"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

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
      buttonLink: "/Gucci",
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
        threshold: 0.3,
        rootMargin: "-50px 0px",
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
    }, 5000);

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

      {/* Hero Content - Positioned higher up */}
      <div className="z-10 min-h-screen flex items-start pt-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-[85%]">
          <div className="max-w-3xl">
            {/* Animated content that changes with slides */}
            <div
              key={`${currentSlide}-${isVisible}`}
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] gap-5 flex flex-col ${
                isVisible
                  ? "opacity-100 transform translate-x-0 translate-y-0"
                  : "opacity-0 transform -translate-x-5 translate-y-2"
              } text-left sm:text-left`}>
              <h1 className="text-6xl font-bold ">
                {heroSlides[currentSlide].title
                  .split(" ")
                  .map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className="inline-block overflow-hidden">
                      <span
                        className="inline-block transition-all duration-500 ease-[cubic-bezier(0.5,1,0.89,1)]"
                        style={{
                          transform: isVisible
                            ? "translateY(0)"
                            : "translateY(100%)",
                          opacity: isVisible ? 1 : 0,
                          transitionDelay: `${wordIndex * 0.05}s`,
                        }}>
                        {word +
                          (wordIndex <
                          heroSlides[currentSlide].title.split(" ").length - 1
                            ? " "
                            : "")}
                      </span>
                    </span>
                  ))}
              </h1>

             
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed w-[540px]">
                <span className="inline-block overflow-hidden">
                  <span
                    className="inline-block transition-all duration-500 ease-[cubic-bezier(0.5,1,0.89,1)]"
                    style={{
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(20px)",
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: "0.3s",
                    }}>
                    {heroSlides[currentSlide].description}
                  </span>
                </span>
              </p>

              <div
                className="flex items-center gap-4"
                style={{
                  transition: "all 0.5s ease-out",
                  transitionDelay: "0.4s",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                }}>
                <h2 className="text-3xl">Discover more</h2>
                <Link href="/allproducts" className="group">
                  <FaArrowRightLong className="text-3xl transition-all cursor-pointer group-hover:translate-x-2" />
                </Link>
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
