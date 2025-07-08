"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Cases {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

interface LuxuryShowcaseProps {
  products: Cases[];
  title?: string;
  description?: string;
  cardsPerPage?: number;
}

const LuxuryShowcase = ({
  products,
  cardsPerPage = 3,
}: LuxuryShowcaseProps) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + cardsPerPage < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleCards = products.slice(startIndex, startIndex + cardsPerPage);

  return (
    <section className="w-[90%] mx-auto relative flex flex-col items-center "> 
    
      <div className="relative overflow-hidden">
        {/* Desktop Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={startIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex gap-8">
            {visibleCards.map((product) => (
              <div
                key={product.id}
                className="relative group w-[300px] h-[400px] flex-shrink-0">
                <div className="relative w-full h-full rounded-t-full overflow-hidden shadow-sm shadow-teal-150">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3b5e3e]/90 via-[#d4af37]/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-4 text-white">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm mt-1">{product.description}</p>
                    <a
                      href={product.link}
                      aria-label={`Shop ${product.name}`}
                      className="mt-3 text-sm hover:underline underline-offset-2 hover:text-white flex gap-1">
                      Shop Now{" "}
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
                <h2 className="font-semibold text-lg text-[#4A5568] transition-all duration-300 flex items-center gap-3 hover:gap-4 hover:text-[black]">
                  Explore more collections
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </h2>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Layout */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#f9fafb] rounded-t-full shadow-sm overflow-hidden border border-gray-200">
              <div className="relative w-full overflow-hidden rounded-t-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png" // Replace with real blurDataURL if needed
                  priority
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {product.description}
                </p>
                <a
                  href={product.link}
                  className="mt-3 inline-block text-sm font-medium text-teal-600 hover:underline">
                  See More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            aria-label="Previous">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}
        {startIndex + cardsPerPage < products.length && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            aria-label="Next">
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>
    </section>
  );
};

export default LuxuryShowcase;
