"use client";
import ProductCard from "../ui/productcard";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Banner from "../ui/Banner";
import { FiSearch } from "react-icons/fi";

const ProductCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="border rounded-lg overflow-hidden h-[340px]">
    <div className="aspect-square bg-gray-100 animate-pulse"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-100 rounded w-4/5 animate-pulse"></div>
      <div className="h-4 bg-gray-100 rounded w-3/5 animate-pulse"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-gray-100 rounded w-1/3 animate-pulse"></div>
        <div className="h-9 bg-gray-100 rounded w-16 animate-pulse"></div>
      </div>
    </div>
  </motion.div>
);

const allProductsByBrand = {
  Casio: [
    {
      id: 1,
      name: "Casio Classic",
      price: 59.99,
      image: "/images/cartiergold.webp",
      hoverImage:
        "/images/dc3bdd3c05f257f5b216fc83a0a73794.png-removebg-preview.png",
    },
    // ... rest of Casio products
  ],
  Gucci: [
    {
      id: 10,
      name: "Gucci Leather Bag",
      price: 890.0,
      image: "/images/gucci1.jpg",
      hoverImage: "/images/gucci1-hover.jpg",
      link: "/cart",
    },
     {
      id: 11,
      name: "Gucci Leather Bag",
      price: 890.0,
      image: "/images/gucci1.jpg",
      hoverImage: "/images/gucci1-hover.jpg",
      link: "/cart",
    },
     {
      id: 12,
      name: "Gucci Leather Bag",
      price: 890.0,
      image: "/images/gucci1.jpg",
      hoverImage: "/images/gucci1-hover.jpg",
      link: "/cart",
    },
     {
      id: 13,
      name: "Gucci Leather Bag",
      price: 890.0,
      image: "/images/gucci1.jpg",
      hoverImage: "/images/gucci1-hover.jpg",
      link: "/cart",
    },
    // ... rest of Gucci products
  ],
  Cartier: [
    {
      id: 20,
      name: "Cartier Tank",
      price: 2500.0,
      image: "/images/cartier1.jpg",
      hoverImage: "/images/cartier1-hover.jpg",
      link: "/cart",
    },
     {
      id: 21,
      name: "Cartier Tank",
      price: 200.0,
      image: "/images/cartier1.jpg",
      hoverImage: "/images/cartier1-hover.jpg",
      link: "/cart",
    },
     {
      id: 22,
      name: "Cartier Tank",
      price: 20.0,
      image: "/images/cartier1.jpg",
      hoverImage: "/images/cartier1-hover.jpg",
      link: "/cart",
    },
     {
      id: 23,
      name: "Cartier Tank",
      price: 200.0,
      image: "/images/cartier1.jpg",
      hoverImage: "/images/cartier1-hover.jpg",
      link: "/cart",
    },
    {
      id: 23,
      name: "Cartier Tank",
      price: 200.0,
      image: "/images/cartier1.jpg",
      hoverImage: "/images/cartier1-hover.jpg",
      link: "/cart",
    },
    // ... rest of Cartier products
  ],
  Rolex: [
    {
      id: 30,
      name: "Rolex Submariner",
      price: 8000.0,
      image: "/images/rolex1.jpg",
      hoverImage: "/images/rolex1-hover.jpg",
      link: "/cart",
    },
    // ... rest of Rolex products
  ],
};

const BrandSections = () => {
  const [activeBrand, setActiveBrand] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [visibleCounts, setVisibleCounts] = useState<{
    [brand: string]: number;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBrands, setFilteredBrands] = useState<string[]>(
    Object.keys(allProductsByBrand)
  );
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleQuickView = (id: number) => console.log("Quick view:", id);
  const handleAddToCart = (id: number) => console.log("Add to cart:", id);

  const scrollToBrand = (brand: string) => {
    const section = document.getElementById(brand);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSeeMore = (brand: string, total: number) => {
    setVisibleCounts((prev) => ({ ...prev, [brand]: total }));
  };

  const sortProducts = (products: typeof allProductsByBrand.Casio) => {
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
          const brand = entry.target.id;
          if (entry.isIntersecting) setActiveBrand(brand);
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

    const timer = setTimeout(() => setIsLoading(false), 1500);

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBrands(Object.keys(allProductsByBrand));
      return;
    }

    const filtered = Object.keys(allProductsByBrand).filter((brand) =>
      brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredBrands(filtered.length > 0 ? filtered : ["OUT OF STOCK"]);
  }, [searchQuery]);

  return (
    <main className="bg-[#f9fafb] min-h-screen flex flex-col items-center">
      <Banner
        title="All Products"
        breadcrumbs={[
          { label: "Home", href: "/" },
        ]}
        titleColor="#a77354"
      />

      {/* Filter and Search Section */}
      <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200 w-[85%]">
        {/* First Div - Filter and Search */}
        <div className="flex justify-between py-3 px-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search brands..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-sm px-4 py-2 text-sm text-gray-700">
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
          </div>
        </div>

        {/* Second Div - Brand Navigation */}
        <div className="w-full py-3 px-4 border-t border-gray-200">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {filteredBrands.length > 0 ? (
              filteredBrands[0] === "OUT OF STOCK" ? (
                <div className="w-full text-center py-2 text-gray-500">
                  Brand not available - Out of Stock
                </div>
              ) : (
                filteredBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => scrollToBrand(brand)}
                    className={`px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition ${
                      activeBrand === brand
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}>
                    {brand}
                  </button>
                ))
              )
            ) : null}
          </div>
        </div>
      </div>

      {/* Brand Sections with Skeleton Loading */}
      <div className="w-[85%] mx-auto py-10 space-y-16">
        {Object.entries(allProductsByBrand)
          .filter(([brand]) => filteredBrands.includes(brand))
          .map(([brand, items]) => {
            const sortedItems = sortProducts(items);
            const visibleCount = visibleCounts[brand] ?? 4;
            const showAll = visibleCount >= sortedItems.length;

            return (
              <motion.div
                key={brand}
                id={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.5 }}>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {isLoading ? (
                    <div className="h-6 bg-gray-100 rounded w-1/4 animate-pulse"></div>
                  ) : (
                    brand
                  )}
                </h2>

                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <ProductCardSkeleton key={`skeleton-${brand}-${i}`} />
                    ))}
                  </div>
                ) : (
                  <>
                    <motion.div
                      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.2,
                          },
                        },
                      }}>
                      {sortedItems.slice(0, visibleCount).map((product) => (
                        <ProductCard
                          key={product.id}
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
                        className="flex justify-center mt-8">
                        <button
                          onClick={() =>
                            handleSeeMore(brand, sortedItems.length)
                          }
                          className="px-6 py-2 border bg-[#232c3b] border-gray-300 text-sm rounded-md hover:text-white transition-colors">
                          See More {brand} Products ({sortedItems.length - 4})
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            );
          })}
      </div>
    </main>
  );
};

export default BrandSections;
