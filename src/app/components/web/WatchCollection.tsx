"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";



interface Watch {
  id: string;
  name: string;
  description: string;
  price: number;
  initialImage: string;
  hoverImage: string;
  features?: string[];
}

const WatchCollection = () => {
  const [watches, setWatches] = useState<Watch[]>([
    {
      id: "1",
      name: "Classic Elegance",
      description:
        "Timeless design for every occasion with premium materials and craftsmanship.",
      price: 249.99,
      initialImage: "/images/vintage.webp",
      hoverImage: "/images/cartiergold.webp",
    },

    {
      id: "1",
      name: "Classic Elegance",
      description:
        "Timeless design for every occasion with premium materials and craftsmanship.",
      price: 249.99,
      initialImage: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
    },

    {
      id: "1",
      name: "Classic Elegance",
      description:
        "Timeless design for every occasion with premium materials and craftsmanship.",
      price: 249.99,
      initialImage: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
    },

    {
      id: "1",
      name: "Classic Elegance",
      description:
        "Timeless design for every occasion with premium materials and craftsmanship.",
      price: 249.99,
      initialImage: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "1",
      name: "Classic Elegance",
      description:
        "Timeless design for every occasion with premium materials and craftsmanship.",
      price: 249.99,
      initialImage: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "1",
      name: "Classic Elegance",
      description:
        "Timeless design for every occasion with premium materials and craftsmanship.",
      price: 249.99,
      initialImage: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "1",
      name: "Classic Elegance",
      description:
        "Timeless design for every occasion with premium materials and craftsmanship.",
      price: 249.99,
      initialImage: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "1",
      name: "Classic Elegance",
      description:
        "Timeless design for every occasion with premium materials and craftsmanship.",
      price: 249.99,
      initialImage: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
    },
  ]);

  const [visibleWatches, setVisibleWatches] = useState(4);

  return (
    <section className="py-8 px-4 sm:px-8 lg:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 font-serif">
          Luxury Timepieces
        </h2>

        {/* Responsive wrapper around the grid */}
        <div className="mx-auto w-[90%] lg:w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 relative z-0">
            {watches.slice(0, visibleWatches).map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        </div>

        {visibleWatches < watches.length && (
          <div className="text-center mt-4">
            <button
              onClick={() => setVisibleWatches((prev) => prev + 4)}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Discover More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const WatchCard = ({ watch }: { watch: Watch }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group h-[280px] rounded-xl w-full transition-all duration-500 z-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Main Card Container */}
      <div className="relative h-full w-full rounded-xl overflow-hidden bg-white ">
        {/* Image Container */}
        <div className="relative  w-full overflow-hidden">
          <Image
            src={isHovered ? watch.hoverImage : watch.initialImage}
            alt={watch.name}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? "scale-110 brightness-90" : "scale-100 brightness-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Card Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-semibold mb-1">{watch.name}</h3>
          <p className="text-xl font-bold">${watch.price.toFixed(2)}</p>
        </div>

        {/* Hover Border Effect */}
        <div
          className={`absolute inset-0 border-2 rounded-xl transition-all duration-500 pointer-events-none ${
            isHovered ? "bg-[#111112]0/50" : "border-transparent"
          }`}
        />
      </div>

      {/* Dropdown Panel */}
      <div
        className={`absolute top-3/4 left-0 z-40 right-0 bg-[#111112] rounded-b-xl shadow-2xl border border-gray-100  transition-all duration-500 ease-out ${
          isHovered
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}>
        <div className="pt- px-6 pb-6">
          {/* Product Info */}
          <div className="mb-4">
            <h4 className="text-lg font-bold text-gray-300 mb-2">
              {watch.name}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {watch.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-sm">
              Add to Cart
            </button>
            <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm font-medium">
              Quick View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchCollection;
