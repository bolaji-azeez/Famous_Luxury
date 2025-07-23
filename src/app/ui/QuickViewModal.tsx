"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage?: string;
}

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.image);

  const colors = [
    product.image,
    product.hoverImage || product.image,
    "/images/s-l1600.webp",
    "/images/cartiergold.webp",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto"
          onClick={onClose}>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-white"
            onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white shadow-lg"
              aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="h-full flex flex-col lg:flex-row">
              {/* Image Gallery - Takes full width on mobile, half on desktop */}
              <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <Image
                    src={mainImage}
                    alt={product.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Thumbnails - Bottom on mobile, side on desktop */}
                <div className="absolute bottom-0 left-0 right-0 lg:right-auto lg:top-0 lg:bottom-0 lg:w-20 p-2 bg-white/90 backdrop-blur-sm overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto">
                  <div className="flex lg:flex-col gap-2">
                    {colors.map((src, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-16 h-16 relative border rounded-sm cursor-pointer transition-all ${
                          mainImage === src
                            ? "ring-2 ring-blue-500"
                            : "hover:ring-1 hover:ring-gray-300"
                        }`}
                        onClick={() => setMainImage(src)}>
                        <Image src={src} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info - Takes full width on mobile, half on desktop */}
              <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto p-6">
                <div className="max-w-md mx-auto">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    {product.title}
                  </h1>

                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-xl sm:text-2xl text-rose-500 font-bold">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.oldPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        ${product.oldPrice.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6">
                    Premium luxury watch with sapphire crystal glass and
                    stainless steel casing. Water resistant up to 50 meters.
                    Includes 2-year international warranty.
                  </p>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          className="px-4 py-2 text-lg hover:bg-gray-50"
                          onClick={() =>
                            setQuantity((q) => Math.max(1, q - 1))
                          }>
                          -
                        </button>
                        <span className="px-4 py-2">{quantity}</span>
                        <button
                          className="px-4 py-2 text-lg hover:bg-gray-50"
                          onClick={() => setQuantity((q) => q + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 mb-4">
                    Add to Bag - ${(product.price * quantity).toFixed(2)}
                  </button>

                  <button className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
