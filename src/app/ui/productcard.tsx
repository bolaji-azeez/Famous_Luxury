// components/ProductCard.tsx
"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  hoverImage?: string
}

interface Props {
  product: Product
  onQuickView: (id: number) => void
  onAddToCart: (id: number) => void
}

export default function ProductCard({ product, onQuickView, onAddToCart }: Props) {
  const [touched, setTouched] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  return (
    <div
      className="rounded-md p-4 text-center"
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTimeout(() => setTouched(false), 1200)}
    >
      <div className="relative aspect-[4/5] mb-4 group cursor-pointer overflow-hidden rounded">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-300 ${touched ? "opacity-0" : "group-hover:opacity-0"}`}
        />
        <Image
          src={product.hoverImage || product.image}
          alt={`${product.name} hover`}
          fill
          className={`object-cover transition-opacity duration-300 ${touched ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Link
            onClick={() => onQuickView(product.id)}
            href="/cart"
            className={`bg-white text-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              touched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            Quick View
          </Link>
        </div>
      </div>

      <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
      <div className="text-sm">
        <span className="text-gray-900 font-semibold">${product.price.toFixed(2)}</span>
        {product.oldPrice && (
          <span className="ml-2 text-xs text-gray-400 line-through">
            ${product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      {(touched || !isMobile) && (
        <div className="mt-3">
          <button
            onClick={() => onAddToCart(product.id)}
            className="bg-black text-white w-full py-2 rounded-md text-sm hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  )
}
