"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/cardContext";
import { useGetProductsQuery } from "@/features/products/productApi";

type AnyImage = { url?: string } | string;
type AnyProduct = {
  _id: string;
  name: string;
  price: number;
  images?: AnyImage[] | null;
  // optional fields you may have:
  // oldPrice?: number;
  // brand?: { _id: string; name: string };
};

export default function PopularProducts() {
  const router = useRouter();
  const { addToCart } = useCart();
  const {
    data: productsRaw = [],
    isLoading,
    isFetching,
  } = useGetProductsQuery();
  const loading = isLoading || isFetching;

  // Normalize backend products -> ensure we always have string[] of urls
  const products = useMemo(() => {
    const arr = (productsRaw as AnyProduct[]) ?? [];
    return arr.map((p) => {
      const urls =
        (p.images ?? [])
          .map((it) => (typeof it === "string" ? it : it?.url))
          .filter((u): u is string => !!u) || [];
      return {
        _id: p._id,
        name: p.name,
        price: p.price,
        images: urls, // first = front, second = hover
      };
    });
  }, [productsRaw]);

  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    show: boolean;
    productId: string | null;
  }>({
    show: false,
    productId: null,
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleCardFlip = (productId: string) => {
    if (!isMobile) return;
    setFlippedCards((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleQuickView = (productId: string) => {
    // Go to detail page
    router.push(`/detail/${productId}`);
  };

  const handleAddToCart = (product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  }) => {
    addToCart({
      id: product._id, // ✅ real Mongo id
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.png",
      quantity: 1,
    });

    setNotification({ show: true, productId: product._id });
    setTimeout(() => setNotification({ show: false, productId: null }), 2000);
  };

  return (
    <section className="px-4 py-10 md:px-10 w-full mx-auto bg-[#fafbfc] relative">
      {notification.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md z-50 animate-fade-in-out">
          Added to cart!
        </div>
      )}

      <div className="max-w-[93.5%] mx-auto">
        <div className="mb-8 flex items-center">
          <div className="w-1 h-6 bg-[#a77354] mr-3 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Popular Products</h2>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`skel-${i}`}
                className="relative border rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-100 animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse" />
                  <div className="h-9 bg-gray-100 rounded w-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No popular products available.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.slice(7).map((p) => {
              const front = p.images[0] ?? "/placeholder.png";
              const hover = p.images[1] ?? front;
              const isFlipped = flippedCards.includes(p._id);

              return (
                <div key={p._id} className="group relative">
                  {/* Labels */}
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 pointer-events-none">
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      Hot
                    </span>
                  </div>

                  {/* Mobile flip / Desktop hover */}
                  <div
                    className={`relative aspect-square mb-3 overflow-hidden rounded transition-all duration-500 ${
                      isMobile ? "cursor-pointer" : ""
                    }`}
                    onClick={() => isMobile && handleCardFlip(p._id)}>
                    {/* Front image */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isMobile
                          ? isFlipped
                            ? "opacity-0"
                            : "opacity-100"
                          : "group-hover:opacity-0"
                      }`}>
                      <Image
                        src={front}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Hover / Back image */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isMobile
                          ? isFlipped
                            ? "opacity-100"
                            : "opacity-0"
                          : "opacity-0 group-hover:opacity-100"
                      }`}>
                      <Image
                        src={hover}
                        alt={`${p.name} hover`}
                        fill
                        className="object-cover"
                      />
                      <Link
                        href={`/detail/${p._id}`}
                        className="absolute inset-0">
                        <div className="w-full h-full flex items-center justify-center bg-black/20">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleQuickView(p._id);
                            }}
                            className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium">
                            Quick View
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                      {p.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm font-semibold text-gray-900">
                        ₦{p.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="px-2 pb-2">
                    <button
                      onClick={() =>
                        handleAddToCart({
                          _id: p._id,
                          name: p.name,
                          price: p.price,
                          image: front,
                        })
                      }
                      className="w-full bg-gray-800 text-white py-2 rounded-md text-sm transition-colors hover:bg-gray-900">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/allproducts"
            className="inline-block px-8 py-3 bg-gray-800 text-white rounded-md transition-colors duration-200 hover:bg-gray-900">
            Discover More Products
          </Link>
        </div>
      </div>
    </section>
  );
}