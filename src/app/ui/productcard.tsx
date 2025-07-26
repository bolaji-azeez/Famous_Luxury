"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../components/context/cardContext";
import Swal from "sweetalert2";
import { saveToRecentlyViewed } from "@/utils/recentViewed";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage?: string;
}

interface ProductCardProps {
  product: Product;
  onQuickView?: (id: number) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Auto-flip effect on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer = setTimeout(() => {
              setFlipped(true);
              setTimeout(() => setFlipped(false), 3000);
            }, 3000);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${product.title} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: "#4BB543",
      color: "white",
    });
  };

  const handleViewProduct = () => {
    saveToRecentlyViewed(product);
    router.push(`/detail`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="rounded-md p-4 text-center relative group"
      initial="rest">
      {/* Flip Animation Container */}
      <div
        className="relative aspect-[4/5] mb-2 cursor-pointer overflow-hidden rounded [perspective:1000px]"
        onClick={handleViewProduct}
        onMouseEnter={() => !isMobile && setFlipped(true)}
        onMouseLeave={() => !isMobile && setFlipped(false)}>
        {/* Hot New & Discount Labels */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            New
          </span>
        </div>

        <motion.div
          className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500"
          animate={{ rotateY: flipped ? 180 : 0 }}>
          {/* Front Side */}
          <div className="absolute w-full h-full [backface-visibility:hidden]">
            <Image
              src={product.image}
              alt={`${product.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center bg-gray-100">
            <Image
              src={product.hoverImage || product.image}
              alt={`${product.title}`}
              fill
              className="object-cover opacity-70"
            />
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click
                saveToRecentlyViewed(product);
                router.push(`/detail`);
              }}
              className="absolute bg-[#232c3b] text-[#fefefe] py-2 px-2 rounded-sm shadow-sm hover:bg-gray-800">
              Quick View
            </button>
          </div>
        </motion.div>
      </div>

      {/* Product Info */}
      <h3 className="text-sm font-medium text-gray-900 mb-1">
        {product.title}
      </h3>
      <div className="text-sm mb-2">
        <span className="text-gray-900 font-semibold">
          ${product.price.toFixed(2)}
        </span>
        {product.oldPrice && (
          <span className="ml-2 text-xs text-gray-400 line-through">
            ${product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-[#232c3b] text-white w-full py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
        Add to Cart
      </button>
    </motion.div>
  );
}
