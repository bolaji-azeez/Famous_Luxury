"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  title?: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  image: string;
  hoverImage?: string;
  size?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Apple Watch Series 8",
    price: 188.0,
    image: "/images/apple-watch.png",
    hoverImage: "/images/apple-watch-hover.png",
  },
  {
    id: 2,
    name: "TECLAST Tablet Protective Cover Case",
    price: 791.12,
    oldPrice: 899.0,
    discountPercentage: 12,
    image: "/images/teclast-tablet.png",
    hoverImage: "/images/teclast-tablet-hover.png",
  },
  {
    id: 3,
    name: "ViewSonic Professional Monitor",
    price: 281.06,
    oldPrice: 299.0,
    discountPercentage: 6,
    image: "/images/viewsonic-monitor.png",
    hoverImage: "/images/viewsonic-monitor-hover.png",
  },
  {
    id: 4,
    name: "Buy Guild Planer - 900w",
    price: 239.0,
    image: "/images/guild-planer.png",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    price: 75.0,
    oldPrice: 90.0,
    discountPercentage: 17,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 75.0,
    oldPrice: 90.0,
    discountPercentage: 17,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    price: 75.0,
    oldPrice: 90.0,
    discountPercentage: 17,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function PopularProducts() {
  const [touchedProduct, setTouchedProduct] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleQuickView = (productId: number) => {
    console.log("Quick view:", productId);
  };

  const handleAddToCart = (productId: number) => {
    console.log("Add to cart:", productId);
  };

  return (
    <section className="px-4 py-10 md:px-10 w-full mx-auto bg-[#fafbfc]">
      <div className="max-w-[85%] mx-auto">
        <div className="mb-8 flex items-center">
          <div className="w-1 h-6 bg-[#a77354] mr-3 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Popular Products</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            const isTouched = touchedProduct === product.id;

            return (
              <div
                key={product.id}
                className="group relative"
                onTouchStart={() => setTouchedProduct(product.id)}
                onTouchEnd={() =>
                  setTimeout(() => setTouchedProduct(null), 1200)
                }>
                <div className="relative aspect-square mb-3 overflow-hidden rounded">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      isTouched ? "opacity-0" : "group-hover:opacity-0"
                    }`}
                  />
                  <Image
                    src={product.hoverImage || product.image}
                    alt={`${product.name} hover`}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      isTouched
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickView(product.id);
                      }}
                      className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium">
                      Quick View
                    </button>
                  </div>
                </div>

                <div className="p-2">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-semibold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="ml-2 text-xs text-gray-400 line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition-colors ${
                      isMobile && !isTouched ? "hidden" : "block"
                    }`}>
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/allproducts"
            className="inline-block px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200">
            Discover More Products
          </Link>
        </div>
      </div>
    </section>
  );
}