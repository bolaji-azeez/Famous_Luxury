"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/cardContext";

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
    image: "/image/shoc1.jpg",
    hoverImage: "/image/shoc16.jpg",
  },
  {
    id: 2,
    name: "TECLAST Tablet Protective Cover Case",
    price: 791.12,
    oldPrice: 899.0,
    discountPercentage: 12,
    image: "/image/shoc2.jpg",
    hoverImage: "/image/shoc15.jpg",
  },
  {
    id: 3,
    name: "ViewSonic Professional Monitor",
    price: 281.06,
    oldPrice: 299.0,
    discountPercentage: 6,
    image: "/image/shoc3.jpg",
    hoverImage: "/image/shoc14.jpg",
  },
  {
    id: 4,
    name: "Buy Guild Planer - 900w",
    price: 239.0,
    image: "/image/shoc4.jpg",
    hoverImage: "/image/shoc12.jpg",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 49.99,
  image: "/image/shoc5.jpg",
    hoverImage: "/image/shoc11.jpg",
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    price: 75.0,
    oldPrice: 90.0,
    image: "/image/shoc6.jpg",
    hoverImage: "/image/shoc10.jpg",
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 75.0,
    oldPrice: 90.0,
    discountPercentage: 17,
    image: "/image/shoc7.jpg",
    hoverImage: "/image/shoc9.jpg",
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    price: 75.0,
    oldPrice: 90.0,
    discountPercentage: 17,
   image: "/image/shoc8.jpg",
    hoverImage: "/image/shoc6.jpg",
  },
];

export default function PopularProducts() {
  const { addToCart } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [notification, setNotification] = useState({
    show: false,
    productId: null,
  });

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleCardFlip = (productId: number) => {
    if (!isMobile) return;
    setFlippedCards((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleQuickView = (productId: number) => {
    console.log("Quick view for product:", productId);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setNotification({ show: true, productId: product.id });
    setTimeout(() => setNotification({ show: false, productId: null }), 2000);
  };

  return (
    <section className="px-4 py-10 md:px-10 w-full mx-auto bg-[#fafbfc] relative">
      {notification.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md z-50 animate-fade-in-out">
          Added to cart!
        </div>
      )}

      <div className="max-w-[85%] mx-auto">
        <div className="mb-8 flex items-center">
          <div className="w-1 h-6 bg-[#a77354] mr-3 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Popular Products</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            const isFlipped = flippedCards.includes(product.id);

            return (
              <div key={product.id} className="group relative">
                {/* Hot New & Discount Labels */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Hot
                  </span>
                  <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                    -20% Discount
                  </span>
                </div>

                {/* Mobile Flip Card Container */}
                <div
                  className={`relative aspect-square mb-3 overflow-hidden rounded transition-all duration-500 ${
                    isMobile ? "cursor-pointer" : ""
                  }`}
                  onClick={() => isMobile && handleCardFlip(product.id)}>
                  {/* Front of Card (Main Image) */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isMobile
                        ? isFlipped
                          ? "opacity-0"
                          : "opacity-100"
                        : "group-hover:opacity-0"
                    }`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Back of Card (Hover Image + Quick View) */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isMobile
                        ? isFlipped
                          ? "opacity-100"
                          : "opacity-0"
                        : "opacity-0 group-hover:opacity-100"
                    }`}>
                    <Image
                      src={product.hoverImage || product.image}
                      alt={`${product.name} hover`}
                      fill
                      className="object-cover"
                    />
                    <Link href="/detail">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickView(product.id);
                          }}
                          className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium">
                          Quick View
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
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

                {/* Add to Cart Button */}
                <div className="px-2 pb-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
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
