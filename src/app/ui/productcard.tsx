"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import QuickViewModal from "./QuickViewModal";
import { useCart } from "../components/context/cardContext";
import Swal from "sweetalert2";

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

export default function ProductCard({
  product,
  onQuickView,
}: ProductCardProps) {
  const [touched, setTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });

    // Show SweetAlert notification
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added to cart!",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: "#4BB543",
      color: "white",
    });
  };

  return (
    <>
      <motion.div
        className="rounded-md p-4 text-center relative group"
        onTouchStart={() => setTouched(true)}
        onTouchEnd={() => setTimeout(() => setTouched(false), 1200)}
        whileHover={!isMobile ? "hover" : undefined}
        initial="rest">
        {/* Image Container */}
        <div className="relative items-center aspect-[4/5] mb-4 cursor-pointer overflow-hidden rounded">
          <Image
            src={product.image}
            alt={`${product.title}`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              touched ? "opacity-0" : "group-hover:opacity-0"
            }`}
            priority
          />
          <Image
            src={product.hoverImage || product.image}
            alt={`${product.title}`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              touched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          />
          <motion.div
            className="absolute left-20 bottom-10 flex flex-col space-y-2 z-10"
            variants={{
              rest: { opacity: 0, y: -20 },
              hover: { opacity: 1, y: 0 },
            }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className="bg-[#232c3b] text-[#fefefe] py-3 px-2 rounded-sm shadow-sm transition-colors hover:bg-gray-800"
              aria-label="Quick view">
              Quick View
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <h3 className="text-sm font-medium text-gray-900 mb-1">
          {product.title}
        </h3>
        <div className="text-sm">
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
        <motion.div
          className="mt-3"
          variants={{
            rest: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", damping: 10 }}>
          <button
            onClick={handleAddToCart}
            className="bg-[#232c3b] text-white w-full py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
        </motion.div>
      </motion.div>

      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}
