"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../components/context/cardContext";
import Swal from "sweetalert2";
import NewArrivals from "../components/web/NewArrival";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

export default function ModernProductPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>(
    "/images/cartiergold.webp"
  );
  const { addToCart } = useCart();
  const router = useRouter();

  const colors = [
    "/images/vintage.webp",
    "/images/s-l1600.webp",
    "/images/dc3bdd3c05f257f5b216fc83a0a73794.png-removebg-preview.png",
    "/images/cartiergold.webp",
  ];

  const handleThumbnailClick = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  const handleAddToCart = () => {
    addToCart({
      id: "cartier-rolex",
      name: "Cartier Rolex",
      price: 200,
      quantity,
      image: mainImage,
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

  const { addProduct } = useRecentlyViewed();
  useEffect(() => {
    const product = {
      id: "cartier-rolex",
      name: "Cartier Rolex",
      price: 200,
      image: mainImage,
    };
    addProduct(product);
  }, [mainImage]);

  return (
    <section className="bg-[#fafbfc] relative">
      {/* Back to All Products Button */}
      <div className="w-[90%] md:w-[85%] mx-auto pt-4">
        <button
          onClick={() => router.push("/allproducts")}
          className="bg-white border rounded-full px-4 text-[#a77354] py-2 shadow hover:bg-gray-100 text-sm"
          aria-label="Back to All Products">
          ← Home
        </button>
      </div>

      <main className="w-[90%] md:w-[85%] mx-auto p-4 md:p-10 text-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image Gallery */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 md:order-1 order-2">
              {colors.map((src, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 relative border shadow-sm rounded-sm cursor-pointer ${
                    mainImage === src ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => handleThumbnailClick(src)}>
                  <Image
                    src={src}
                    alt={`Color ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-[5/5] relative w-full md:order-2 order-1 group overflow-hidden rounded">
              <Image
                src={mainImage}
                alt="Selected Product"
                fill
                className="object-cover rounded transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
              Sale
            </span>
            <h1 className="text-2xl font-semibold">Cartier Rolex</h1>
            <p className="text-lg text-rose-500 font-bold">$200.00</p>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
              euismod est magna.
            </p>

            {/* Variants */}
            <div className="flex flex-col gap-4 mt-4">
              <label className="text-sm font-medium mb-1">Quantity</label>
              <div className="flex items-center gap-4 ">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="px-3 py-1 text-lg"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                    -
                  </button>
                  <span className="px-4 py-1 text-lg">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="px-3 py-1 text-lg"
                    onClick={() => setQuantity((q) => q + 1)}>
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-black text-white text-sm rounded hover:bg-gray-900">
                  Add to Bag
                </button>
              </div>
            </div>

            <button className="block mt-3 text-sm text-gray-500 underline hover:text-gray-700">
              + Add to Wishlist
            </button>

            {/* Description Tabs */}
            <div className="mt-10">
              <div className="flex gap-6 border-b border-gray-300 mb-4">
                <button className="pb-2 border-b-2 border-black text-sm font-medium">
                  Description
                </button>
                <button className="pb-2 text-sm text-gray-500 hover:text-black">
                  Additional Info
                </button>
                <button className="pb-2 text-sm text-gray-500 hover:text-black">
                  Reviews
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Arbitrary stylistic triggers. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Integer nec odio. Praesent libero.
                Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                elementum imperdiet.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Cart Button for Mobile */}
      <button
        onClick={() => router.push("/cart")}
        className="fixed bottom-5 right-5 md:hidden bg-black text-white p-4 rounded-full shadow-lg z-50 hover:bg-gray-900"
        aria-label="Go to Cart">
        🛒
      </button>

      <NewArrivals title="Related Product" />
      <NewArrivals title="Recently Viewed" />
    </section>
  );
}
