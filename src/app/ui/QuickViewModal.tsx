"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";



interface Product {
  id: number;
  title: string;  // Consistent with ProductCard
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

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Image Gallery */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex md:flex-col gap-3">
                  {colors.map((src, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 relative border shadow-sm rounded-sm cursor-pointer ${
                        mainImage === src ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setMainImage(src)}
                    >
                      <Image
                        src={src}
                        alt={`Color ${index}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex-1 aspect-[5/5] relative w-full">
                  <Image
                    src={mainImage}
                    alt={product.title}
                    fill
                    className="object-center rounded"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                  ✕
                </button>

                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <div className="flex items-center gap-2">
                  <p className="text-lg text-rose-500 font-bold">${product.price.toFixed(2)}</p>
                  {product.oldPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </p>
                  )}
                </div>

                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <div className="flex flex-col gap-4 mt-4">
                  <label className="text-sm font-medium">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="px-3 py-1 text-lg"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-lg">{quantity}</span>
                      <button
                        type="button"
                        className="px-3 py-1 text-lg"
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="px-6 py-3 bg-black text-white text-sm rounded hover:bg-gray-900">
                      Add to Bag
                    </button>
                  </div>
                </div>

                <button className="block mt-3 text-sm text-gray-500 underline hover:text-gray-700">
                  + Add to Wishlist
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}