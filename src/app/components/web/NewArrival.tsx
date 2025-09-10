"use client";
import { type FC, useEffect, useMemo, useRef, useState, useCallback } from "react";
import ProductCard from "@/app/ui/productcard";
import { useGetProductsQuery } from "@/features/products/productApi";

interface NewArrivalProps {
  title?: string;
}


type AnyProduct = {
  _id: string;
  name: string;
  price: number;
  images?: Array<{ url?: string } | string> | null;
};

const NewArrival: FC<NewArrivalProps> = ({ title = "You Might Also Like" }) => {
  const {
    data: productsRaw = [],
    isLoading,
    isFetching,
  } = useGetProductsQuery();
  const loading = isLoading || isFetching;

  // Normalize products -> ensure images is string[]
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
        images: urls, // ProductCard will use images[0] and images[1] for hover
      };
    });
  }, [productsRaw]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Responsive items per slide
  useEffect(() => {
    const compute = () => {
      if (window.innerWidth <= 640) return 2;
      if (window.innerWidth <= 1024) return 2;
      return 4;
    };
    const apply = () => setItemsPerSlide(compute());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  // Slides count from real products
  const totalSlides = useMemo(() => {
    if (!products.length) return 1;
    return Math.ceil(products.length / itemsPerSlide);
  }, [products.length, itemsPerSlide]);

  useEffect(() => {
    setCurrentSlide((prev) => Math.min(prev, Math.max(0, totalSlides - 1)));
  }, [totalSlides]);

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % totalSlides),
    [totalSlides]
  );

  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides),
    [totalSlides]
  );

  // Autoplay (pause on hover)
  useEffect(() => {
    if (isHovered || totalSlides <= 1) return;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
}, [isHovered, totalSlides, nextSlide]);

  return (
    <section className="px-4 py-10 md:px-10 w-full mx-auto bg-[#fafbfc]">
      <div className="max-w-[85%] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="mb-8 flex items-center">
            <div className="w-1 h-6 bg-[#a77354] mr-3 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 border text-[#101828] rounded-full"
              aria-label="Previous">
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="p-2 border rounded-full text-[#101828]"
              aria-label="Next">
              ›
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={sliderRef}>
          {loading ? (
            <div
              className={`grid gap-4 ${
                itemsPerSlide === 4 ? "grid-cols-4" : "grid-cols-2"
              }`}>
              {Array.from({ length: itemsPerSlide }).map((_, i) => (
                <div
                  key={`skel-${i}`}
                  className="border rounded-lg overflow-hidden h-[340px]">
                  <div className="aspect-square bg-gray-100 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-100 rounded w-4/5 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-3/5 animate-pulse" />
                    <div className="h-9 bg-gray-100 rounded w-16 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products available.</p>
          ) : (
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className={`grid gap-4 ${
                      itemsPerSlide === 4 ? "grid-cols-4" : "grid-cols-2"
                    }`}>
                    {products
                      .slice(
                        slideIndex * itemsPerSlide,
                        (slideIndex + 1) * itemsPerSlide
                      )
                      .map((p) => (
                        <ProductCard
                          key={p._id}
                          product={{
                            _id: p._id,
                            name: p.name,
                            price: p.price,
                            
                            images: p.images as string[],
                          }}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-black w-6" : "bg-gray-300 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
