"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Banner from "../ui/Banner";
import ProductCard from "../ui/productcard";

import { useGetBrandsQuery } from "@/features/brand/brandApi";
import { useGetProductsQuery } from "@/features/products/productApi";

type AnyProduct = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  images?: { url?: string }[];
  slug?: string;
};

type Brand = {
  _id: string;
  name: string;
};

function slugifyName(name: string, id?: string) {
  const base = (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return id ? `${base}-${id.slice(-6)}` : base;
}

const ProductCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="border rounded-lg overflow-hidden h-[340px]">
    <div className="aspect-square bg-gray-100 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-100 rounded w-4/5 animate-pulse" />
      <div className="h-4 bg-gray-100 rounded w-3/5 animate-pulse" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-gray-100 rounded w-1/3 animate-pulse" />
        <div className="h-9 bg-gray-100 rounded w-16 animate-pulse" />
      </div>
    </div>
  </motion.div>
);

function AllProductsSection({
  sortOption,
}: {
  sortOption: "default" | "price-low" | "price-high" | "name-asc" | "name-desc";
}) {
  const {
    data: productsRaw = [],
    isLoading,
    isFetching,
  } = useGetProductsQuery();
  const [visibleCount, setVisibleCount] = useState(8);

  const products = useMemo(() => {
    const arr = (productsRaw as AnyProduct[]) ?? [];
    const normalized = arr.map((p) => {
      const img = p.image || p.images?.[0]?.url || "";
      const slug = p.slug || slugifyName(p.name, p._id);
      return { ...p, image: img, slug };
    });
    const sorted = [...normalized];
    switch (sortOption) {
      case "price-low":
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-high":
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [productsRaw, sortOption]);

  const showAll = visibleCount >= products.length;

  const handleQuickView = (id: string) => console.log("Quick view:", id);
  const handleAddToCart = (id: string) => console.log("Add to cart:", id);

  return (
    <section id="all-products">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">All Products</h2>

      {(isLoading || isFetching) && products.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={`all-skel-${i}`} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products yet.</p>
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
                transition: { staggerChildren: 0.06, delayChildren: 0.12 },
              },
            }}>
            {products.slice(0, visibleCount).map((p) => (
              <ProductCard
                key={p._id}
                product={{
                  _id: p._id,
                  name: p.name,
                  price: p.price,
                  images: (p.images ?? [])
                    .map((it) => (typeof it === "string" ? it : it?.url))
                    .filter((v): v is string => typeof v === "string"),
                }}
                onQuickView={() => handleQuickView(p._id)}
                onAddToCart={() => handleAddToCart(p._id as string)}
              />
            ))}
          </motion.div>

          {!showAll && products.length > 8 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount(products.length)}
                className="px-6 py-2 border bg-[#232c3b] border-gray-300 text-sm rounded-md text-white hover:opacity-90 transition-colors">
                See More Products ({products.length - 8})
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function BrandSection({
  brandId,
  title,
  slug,
  sortOption,
}: {
  brandId: string;
  title: string;
  slug: string;
  sortOption: "default" | "price-low" | "price-high" | "name-asc" | "name-desc";
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  // 👉 Fetch this brand's products
  const sortParam = useMemo(() => {
    switch (sortOption) {
      case "price-low":
        return "price";
      case "price-high":
        return "-price"; 
      case "name-asc":
        return "name";
      case "name-desc":
        return "-name";
      default:
        return undefined;
    }
  }, [sortOption]);

  const { data: productsRaw = [], isFetching } = useGetProductsQuery({
    brandId,
    limit: 100,
    sort: sortParam,
  });

  const products = useMemo(() => {
    const arr: AnyProduct[] = productsRaw ?? [];
    const normalized = arr.map((p) => ({
      ...p,
      image: p.image || p.images?.[0]?.url || "",
      slug: p.slug || slugifyName(p.name, p._id),
    }));
    const sorted = [...normalized];
    switch (sortOption) {
      case "price-low":
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-high":
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [productsRaw, sortOption]);

  const showAll = visibleCount >= products.length;
  const handleQuickView = (id: string) => console.log("Quick view:", id);
  const handleAddToCart = (id: string) => console.log("Add to cart:", id);

  return (
    <motion.section
      ref={sectionRef}
      id={slug}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.5 }}>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>

      {isFetching && products.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={`s-${slug}-${i}`} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products for this brand yet.</p>
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
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}>
            {products.slice(0, visibleCount).map((p) => (
              <ProductCard
                key={p._id}
                product={{
                  _id: p._id,
                  name: p.name,
                  price: p.price,
                  images: (p.images ?? [])
                    .map((it) => (typeof it === "string" ? it : it?.url))
                    .filter((v): v is string => typeof v === "string"),
                }}
                onQuickView={() => handleQuickView(p._id)}
                onAddToCart={() => handleAddToCart(p._id)}
              />
            ))}
          </motion.div>

          {!showAll && products.length > 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount(products.length)}
                className="px-6 py-2 border bg-[#232c3b] border-gray-300 text-sm rounded-md text-white hover:opacity-90 transition-colors">
                See More {title} Products ({products.length - 4})
              </button>
            </motion.div>
          )}
        </>
      )}
    </motion.section>
  );
}

export default function BrandSections() {
  const { data: brandsRaw = [], isLoading: loadingBrands } =
    useGetBrandsQuery();

 const brands = useMemo(
    () =>
      ((brandsRaw as Brand[]) ?? []).map((b) => ({
        ...b,
        slug: slugifyName(b.name, b._id),
      })),
    [brandsRaw]
  );

  const [sortOption, setSortOption] = useState<
    "default" | "price-low" | "price-high" | "name-asc" | "name-desc"
  >("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter((b) => b.name.toLowerCase().includes(q));
  }, [brands, searchQuery]);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActiveSlug(e.target.id));
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0.1 }
    );
    filtered.forEach((b) => {
      const el = document.getElementById(b.slug);
      if (el) {
        sectionRefs.current[b.slug] = el as HTMLElement;
        obs.observe(el);
      }
    });
    return () => obs.disconnect();
  }, [filtered]);

  const scrollToBrand = (slug: string) => {
    const section = document.getElementById(slug);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-[#f9fafb] min-h-screen flex flex-col items-center">
      <Banner
        title="All Products"
        breadcrumbs={[{ label: "Home", href: "/" }]}
        titleColor="#a77354"
      />

      {/* Controls */}
      <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200 w-[85%]">
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
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="border border-gray-300 rounded-sm px-4 py-2 text-sm text-gray-700">
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
          </div>
        </div>

        {/* Brand nav */}
        <div className="w-full py-3 px-4 border-t border-gray-200">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {loadingBrands ? (
              <div className="w-full text-center py-2 text-gray-500">
                Loading brands…
              </div>
            ) : filtered.length === 0 ? (
              <div className="w-full text-center py-2 text-gray-500">
                No matching brands
              </div>
            ) : (
              filtered.map((b) => (
                <button
                  key={b._id}
                  onClick={() => scrollToBrand(b.slug)}
                  className={`px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition ${
                    activeSlug === b.slug
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}>
                  {b.name}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="w-[85%] mx-auto py-10 space-y-16">
        <AllProductsSection sortOption={sortOption} />
        {loadingBrands ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={`loading-${i}`} />
            ))}
          </div>
        ) : (
          filtered.map((b) => (
            <BrandSection
              key={b._id}
              brandId={b._id}
              title={b.name}
              slug={b.slug}
              sortOption={sortOption}
            />
          ))
        )}
      </div>
    </main>
  );
}
