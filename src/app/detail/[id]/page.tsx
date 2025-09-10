"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { useCart } from "../../components/context/cardContext";
import NewArrivals from "../../components/web/NewArrival";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import {
  useGetProductByIdQuery, 
  type Product,
} from "../../../features/products/productApi";

function money(n?: number) {
  if (typeof n !== "number") return "";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "NGN",
    }).format(n);
  } catch {
    return `${n.toFixed(2)}`;
  }
}

export default function ModernProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  // ✅ REAL fetch
  const {
    data: product,
    isLoading,
    isFetching,
    isError,
  } = useGetProductByIdQuery(id!, { skip: !id });
  
  const loading = isLoading || isFetching;
  const p = product as Product | undefined;

  // Safe gallery from backend only (no mock)
  const gallery = useMemo(() => {
    const arr = Array.isArray(p?.images) ? p!.images : [];
    const urls = arr.map((it) => it?.url).filter((u): u is string => !!u);
    return Array.from(new Set(urls));
  }, [p]);

  const [mainImage, setMainImage] = useState<string>("");
  useEffect(() => {
    setMainImage(gallery[0] || "");
  }, [gallery]);

  const features = useMemo(() => {
    const raw = Array.isArray(p?.features) ? p!.features : [];
    return raw
      .flatMap((line) => String(line).split(/\r?\n/))
      .map((s) => s.trim())
      .filter(Boolean);
  }, [p]);

  const inStock = typeof p?.quantity === "number" ? p!.quantity > 0 : true;

  const { addProduct } = useRecentlyViewed();
  useEffect(() => {
    if (!p) return;
    addProduct({
      id: p._id,
      name: p.name,
      price: p.price,
      image: mainImage || gallery[0] || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p?._id, mainImage]);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (!p) return;
    addToCart({
      id: p._id,
      name: p.name,
      price: p.price,
      quantity,
      image: mainImage || gallery[0] || "",
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Added ${quantity} item(s) to cart!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: "#4BB543",
      color: "white",
    });
  };

  return (
    <section className="bg-[#fafbfc] relative">
      <div className="w-[90%] md:w-[85%] mx-auto pt-4">
        <button
          onClick={() => router.push("/allproducts")}
          className="bg-white border rounded-full px-4 text-[#a77354] py-2 shadow hover:bg-gray-100 text-sm"
          aria-label="Back to All Products">
          ← Home
        </button>
      </div>

      <main className="w-[90%] md:w-[85%] mx-auto p-4 md:p-10 text-gray-900">
        {isError && (
          <div className="p-4 mb-6 rounded bg-red-50 text-red-700">
            Failed to load product.
          </div>
        )}
        {!loading && !p && !isError && (
          <div className="p-4 mb-6 rounded bg-yellow-50 text-yellow-800">
            Product not found.
          </div>
        )}

        {p && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Gallery */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex md:flex-col gap-3 md:order-1 order-2">
                {(loading ? Array.from({ length: 4 }) : gallery).map(
                  (src, i) => (
                    <div
                      key={i}
                      className={`w-16 h-16 relative border shadow-sm rounded-sm ${
                        loading ? "bg-gray-100 animate-pulse" : "cursor-pointer"
                      } ${
                        !loading && typeof src === "string" && mainImage === src
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() =>
                        !loading && typeof src === "string" && setMainImage(src)
                      }>
                      {!loading && typeof src === "string" ? (
                        <Image
                          src={src}
                          alt={`Thumbnail ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : null}
                    </div>
                  )
                )}
              </div>

              <div className="flex-1 aspect-[5/5] relative w-full md:order-2 order-1 group overflow-hidden rounded">
                {loading ? (
                  <div className="w-full h-full bg-gray-100 animate-pulse rounded" />
                ) : mainImage ? (
                  <Image
                    src={mainImage}
                    alt={p.name}
                    fill
                    className="object-cover rounded transition-transform duration-500 ease-in-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 border rounded">
                    No images available
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div className="text-xs text-zinc-900 px-4 py-2 bg-gray-200 inline-block rounded-full">
                {p.brand?.name ? `Brand: ${p.brand.name}` : null}
              </div>

              <h1 className="text-2xl font-semibold">{p.name}</h1>

              <p className="text-lg text-rose-500 font-bold">
                {money(p.price)}
              </p>

              {p.description && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {p.description}
                </p>
              )}

              {features.length > 0 && (
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}

              {/* Quantity / CTA */}
              <div className="flex flex-col gap-4 mt-4">
                <label className="text-sm font-medium mb-1">
                  {inStock ? "Quantity" : "Out of stock"}
                </label>
                <div className="flex items-center gap-4 ">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="px-3 py-1 text-lg disabled:opacity-50"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={!inStock}>
                      -
                    </button>
                    <span className="px-4 py-1 text-lg">{quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="px-3 py-1 text-lg disabled:opacity-50"
                      onClick={() => setQuantity((q) => q + 1)}
                      disabled={!inStock}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="px-6 py-3 bg-black text-white text-sm rounded hover:bg-gray-900 disabled:opacity-50"
                    disabled={!inStock}>
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

    
      <NewArrivals title="Recently Viewed" />
    </section>
  );
}
