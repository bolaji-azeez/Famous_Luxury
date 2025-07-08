"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const scrollTexts = [
  {
    id: 1,
    text: "Timeless elegance meets Swiss precision in every timepiece we craft",
    category: "watches",
  },
  {
    id: 2,
    text: "Premium eyewear that combines style, comfort, and cutting-edge technology",
    category: "glasses",
  },
  {
    id: 3,
    text: "Handcrafted luxury accessories for the discerning connoisseur",
    category: "luxury",
  },
  {
    id: 4,
    text: "Where tradition meets innovation in the world of fine timepieces",
    category: "heritage",
  },
  {
    id: 5,
    text: "Exceptional quality and unmatched craftsmanship in every detail",
    category: "quality",
  },
  {
    id: 6,
    text: "Discover the perfect fusion of form and function in our collections",
    category: "design",
  },
]

export default function ScrollTextSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth
    const containerWidth = scrollContainer.clientWidth
    let scrollPosition = 0

    const scroll = () => {
      scrollPosition += 0.5 // Adjust speed here
      if (scrollPosition >= scrollWidth - containerWidth) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, 16) // ~60fps

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/background.webp"
          alt="Luxury Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Glass Morphism Container */}
      <div className="relative h-full flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content with Glass Effect */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-16 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-6xl font-light text-white mb-6 leading-tight">
                Crafting Excellence
                <br />
                <span className="text-3xl lg:text-5xl text-white/80">Since 1985</span>
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Experience the pinnacle of luxury with our meticulously curated collection of timepieces and eyewear
              </p>
            </div>

            {/* Scrolling Text Container */}
            <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6">
              <div
                ref={scrollRef}
                className="flex gap-12 overflow-hidden whitespace-nowrap"
                style={{ scrollBehavior: "auto" }}
              >
                {/* Duplicate the array to create seamless loop */}
                {[...scrollTexts, ...scrollTexts, ...scrollTexts].map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex-shrink-0">
                    <span className="text-2xl lg:text-3xl font-light text-white/90 tracking-wide">{item.text}</span>
                    <span className="mx-8 text-white/40">•</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-light text-white mb-2">50K+</div>
                <div className="text-white/70 text-lg">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-light text-white mb-2">1985</div>
                <div className="text-white/70 text-lg">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-light text-white mb-2">500+</div>
                <div className="text-white/70 text-lg">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-light text-white mb-2">99%</div>
                <div className="text-white/70 text-lg">Satisfaction</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-white/30 transition-all duration-300 shadow-lg">
                Explore Our Heritage
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-500" />
      <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-white/25 rounded-full animate-pulse delay-1500" />
    </section>
  )
}
