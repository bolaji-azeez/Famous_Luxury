"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Luxury Watches",
    slug: "luxury-watches",
    image: "/images/cartierr.webp",
    productCount: 45,
    type: "watches",
  },
  {
    id: 2,
    name: "Sport Watches",
    slug: "sport-watches",
    image: "/images/gshock.webp",
    productCount: 32,
    type: "watches",
  },
  {
    id: 3,
    name: "Smart Watches",
    slug: "smart-watches",
    image: "/images/smartwatch.webp",
    productCount: 28,
    type: "watches",
  },
  {
    id: 4,
    name: "Vintage Collection",
    slug: "vintage-watches",
    image: "/images/vintage.webp",
    productCount: 19,
    type: "watches",
  },
  {
    id: 5,
    name: "Sunglasses",
    slug: "sunglasses",
    image: "/images/raybams.webp",
    productCount: 67,
    type: "glasses",
  },
  {
    id: 6,
    name: "Prescription",
    slug: "prescription",
    image: "/images/tomford.webp",
    productCount: 89,
    type: "glasses",
  },
  {
    id: 7,
    name: "Blue Light",
    slug: "blue-light",
    image: "/images/bluerray.webp",
    productCount: 34,
    type: "glasses",
  },
  {
    id: 8,
    name: "Designer Frames",
    slug: "designer-frames",
    image: "/images/view.webp",
    productCount: 56,
    type: "glasses",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-[85%]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of luxury timepieces and
            premium eyewear
          </p>
        </div>

        {/* Main Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Watches */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 text-white">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            <Image
              src="/images/cartiergold.webp"
              alt="Luxury Watches"
              width={800}
              height={600}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative p-8 lg:p-12 h-96 flex flex-col justify-end">
              <h3 className="text-3xl lg:text-4xl font-light mb-4">
                Luxury Watches
              </h3>
              <p className="text-gray-200 mb-6 max-w-md">
                Timeless elegance meets Swiss precision in our exclusive
                collection of luxury timepieces
              </p>
              <Link
                href="/watches"
                className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors group/link">
                <span className="font-medium">Explore Watches</span>
                <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Glasses */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900 to-amber-700 text-white">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            <Image
              src="/images/s-l1601.webp"
              alt="Designer Glasses"
              width={800}
              height={600}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative p-8 lg:p-12 h-96 flex flex-col justify-end">
              <h3 className="text-3xl lg:text-4xl font-light mb-4">
                Designer Glasses
              </h3>
              <p className="text-gray-200 mb-6 max-w-md">
                Premium eyewear that combines style, comfort, and cutting-edge
                lens technology
              </p>
              <Link
                href="/glasses"
                className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors group/link">
                <span className="font-medium">Explore Glasses</span>
                <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-t-full bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-square relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                {/* Overlay for better text visibility */}
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#aacd6a]/90 via-transparent to-transparent pointer-events-none " />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-medium mb-2">{category.name}</h4>
                  <p className="text-xs text-gray-200">
                    {category.productCount} products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
