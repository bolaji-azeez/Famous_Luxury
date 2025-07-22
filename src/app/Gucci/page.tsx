
'use client'

import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../ui/productcard";
import Banner from "../ui/Banner";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  link?: string;
}

interface ProductsByBrand {
  [brand: string]: Product[];
}

const allProductsByBrand: ProductsByBrand = {
  Gucci: [
    {
      id: 1,
      name: "Gucci Classic",
      price: 599.99,
      image: "/images/gucci1.jpg",
      hoverImage: "/images/gucci1-hover.jpg",
    },
    {
      id: 2,
      name: "Gucci Modern",
      price: 799.99,
      image: "/images/gucci2.jpg",
      hoverImage: "/images/gucci2-hover.jpg",
    },
    // Add more Gucci products here
  ],
  // Other brands can be added similarly
};

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const Gucci = () => {
  const [activeBrand, setActiveBrand] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleQuickView = (id: number) => console.log("Quick view:", id);
  const handleAddToCart = (id: number) => console.log("Add to cart:", id);

  const handleSeeMore = (brand: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [brand]: allProductsByBrand[brand].length,
    }));
  };

  const sortProducts = (products: Product[]) => {
    const sorted = [...products];
    switch (sortOption) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveBrand(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0.1 }
    );

    Object.keys(allProductsByBrand).forEach((brand) => {
      const section = document.getElementById(brand);
      if (section) {
        sectionRefs.current[brand] = section;
        observer.observe(section);
      }
    });

    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-[#f9fafb] min-h-screen flex flex-col items-center">
      <Banner
        title="Gucci"
        breadcrumbs={[{ label: "Home", href: "/" }]}
        titleColor="#a77354"
      />
      
      <div className="w-[85%] mx-auto py-10 space-y-16">
        {Object.entries(allProductsByBrand).map(([brand, items]) => {
          const sortedItems = sortProducts(items);
          const visibleCount = visibleCounts[brand] ?? 4;
          const showAll = visibleCount >= sortedItems.length;

          return (
            <motion.section
              key={brand}
              id={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {isLoading ? (
                  <div className="h-6 bg-gray-100 rounded w-1/4 animate-pulse" />
                ) : (
                  brand
                )}
              </h2>

              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <ProductCardSkeleton key={`skeleton-${brand}-${i}`} />
                  ))}
                </div>
              ) : (
                <>
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.2,
                        },
                      },
                    }}
                  >
                    {sortedItems.slice(0, visibleCount).map((product) => (
                      <ProductCard
                        key={`${brand}-${product.id}`}
                        product={product}
                        onQuickView={handleQuickView}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </motion.div>

                  {!showAll && sortedItems.length > 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center mt-8"
                    >
                      <button
                        onClick={() => handleSeeMore(brand)}
                        className="px-6 py-2 bg-[#232c3b] text-white text-sm rounded-md hover:bg-[#3a4a5f] transition-colors"
                      >
                        View All {brand} Products ({sortedItems.length - 4}+)
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
};

export default Gucci;