"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Heart, ArrowRight, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  hoverImage: string
  isNew?: boolean
}

const NewArrivals = () => {
  const [favorites, setFavorites] = useState<number[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [mobileSlide, setMobileSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const cardsPerPage = 4
  const mobileCardsPerSlide = 2

  const products: Product[] = [
    {
      id: 1,
      name: "Sartosea",
      description: "Low boots - Palinated calf leather - Havane - Men",
      price: 1795.0,
      image: "/images/One.png",
      hoverImage: "/placeholder.svg?height=400&width=400&text=Sartosea+Side+View",
    },
    {
      id: 2,
      name: "Retero",
      description: "Sneakers - Grained calf leather - Cuivin - Men",
      price: 895.0,
      image: "/images/Two.png",
      hoverImage: "/placeholder.svg?height=400&width=400&text=Retero+Back+View",
      isNew: true,
    },
    {
      id: 3,
      name: "Chambellmoc",
      description: "Loafers - Nubuck leather - Cuir - Men",
      price: 1195.0,
      image: "/images/Three.png",
      hoverImage: "/placeholder.svg?height=400&width=400&text=Chambellmoc+Detail+View",
      isNew: true,
    },
    {
      id: 4,
      name: "Naville",
      description: "High boots - Pebbled leather - Noir - Men",
      price: 2095.0,
      image: "/images/Four.png",
      hoverImage: "/placeholder.svg?height=400&width=400&text=Naville+Side+View",
    },
    {
      id: 5,
      name: "Lunova",
      description: "Slip-ons - Patent leather - Noir - Men",
      price: 1595.0,
      image: "/images/Four.png",
      hoverImage: "/placeholder.svg?height=400&width=400&text=Lunova+Back+View",
      isNew: true,
    },
    {
      id: 6,
      name: "Meronix",
      description: "Derby - Full grain leather - Burgundy - Men",
      price: 1395.0,
      image: "/images/Three.png",
      hoverImage: "/placeholder.svg?height=400&width=400&text=Meronix+Profile",
    },
    {
      id: 7,
      name: "Velaro",
      description: "Lace-ups - Suede leather - Tobacco - Men",
      price: 1095.0,
      image: "/images/Two.png",
      hoverImage: "/placeholder.svg?height=400&width=400&text=Velaro+Detail",
      isNew: true,
    },
    {
      id: 8,
      name: "Carvello",
      description: "Chelsea boots - Smooth leather - Nero - Men",
      price: 1895.0,
      image: "/images/One.png",
      hoverImage: "/placeholder.svg?height=400&width=400&text=Carvello+Side",
    },
  ]

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleFavorite = (id: number) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)

  // Desktop navigation
  const handleNext = () => {
    if (startIndex + cardsPerPage < products.length) {
      setStartIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1)
    }
  }

  // Mobile navigation
  const maxMobileSlides = Math.ceil(products.length / mobileCardsPerSlide)

  const handleMobileNext = () => {
    setMobileSlide((prev) => (prev + 1) % maxMobileSlides)
  }

  const handleMobilePrev = () => {
    setMobileSlide((prev) => (prev - 1 + maxMobileSlides) % maxMobileSlides)
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleMobileNext()
    } else if (isRightSwipe) {
      handleMobilePrev()
    }
  }

  const visibleProducts = products.slice(startIndex, startIndex + cardsPerPage + 1) // +1 for peek

  return (
    <section className="py-16 lg:py-24 bg-white w-[80%] mx-auto relative overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">New arrivals</h2>
      </div>

      {isMobile ? (
        /* Mobile Carousel */
        <div className="relative">
          {/* Mobile Cards Container */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileSlide}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex gap-4"
              >
                {products
                  .slice(mobileSlide * mobileCardsPerSlide, mobileSlide * mobileCardsPerSlide + mobileCardsPerSlide)
                  .map((product) => (
                    <div key={product.id} className="w-[calc(50%-8px)] flex-shrink-0 group relative">
                      <div className="relative aspect-square bg-gray-50 rounded-t-full overflow-hidden mb-3">
                        {product.isNew && (
                          <div className="absolute top-2 left-2 z-10">
                            <span className="bg-black text-white text-xs font-medium px-1.5 py-0.5 rounded">New</span>
                          </div>
                        )}
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-2 right-2 z-10 p-1.5 hover:bg-white/80 rounded-full"
                          aria-label="Add to favorites"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.includes(product.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400 hover:text-red-500"
                            }`}
                          />
                        </button>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                        <Image
                          src={product.hoverImage || "/placeholder.svg"}
                          alt={`${product.name} hover`}
                          fill
                          className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                        <div className="pt-1 space-y-2">
                          <div className="flex flex-col gap-2">
                            <span className="text-sm font-semibold text-gray-900">{formatPrice(product.price)}</span>
                            <button className="text-xs text-white bg-black px-2 py-1 rounded hover:bg-gray-800 transition">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Buttons */}
          <button
            onClick={handleMobilePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </button>

          <button
            onClick={handleMobileNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4 text-gray-700" />
          </button>

          {/* Mobile Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: maxMobileSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setMobileSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === mobileSlide ? "bg-gray-900 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop Carousel */
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={startIndex}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-6"
            >
              {visibleProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={`w-[250px] flex-shrink-0 group relative ${
                    i === cardsPerPage ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <div className="relative aspect-square bg-gray-50 rounded-t-full overflow-hidden mb-4">
                    {product.isNew && (
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-black text-white text-xs font-medium px-2 py-1 rounded">New</span>
                      </div>
                    )}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 z-10 p-2 hover:bg-white/80 rounded-full"
                      aria-label="Add to favorites"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      />
                    </button>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />
                    <Image
                      src={product.hoverImage || "/placeholder.svg"}
                      alt={`${product.name} hover`}
                      fill
                      className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="pt-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-gray-900">{formatPrice(product.price)}</span>
                        <button className="text-sm text-white bg-black px-3 py-1 rounded hover:bg-gray-800 transition">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Desktop Floating Arrow Buttons */}
          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
              aria-label="Previous"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
          {startIndex + cardsPerPage < products.length && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
              aria-label="Next"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      )}
    </section>
  )
}

export default NewArrivals
