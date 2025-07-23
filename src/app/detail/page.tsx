"use client";

import Image from "next/image";
import { useState } from "react";
import NewArrivals from "../components/web/NewArrival";


export default function ModernProductPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>(
    "/images/cartiergold.webp"
  ); // State for main image

  const colors = [
    "/images/vintage.webp",
    "/images/s-l1600.webp",
    "/images/dc3bdd3c05f257f5b216fc83a0a73794.png-removebg-preview.png",
    "/images/cartiergold.webp",
  ];

  // Function to handle thumbnail click
  const handleThumbnailClick = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  return (
    <section className="bg-[#fafbfc]">
      <main className=" w-[85%] mx-auto p-6 md:p-10 text-gray-900">
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
            <div className="flex-1 aspect-[5/5] relative w-full md:order-2 order-1">
              <Image
                src={mainImage} // Now using the state variable
                alt="Selected Product"
                fill
                className="object-center rounded"
              />
            </div>
          </div>

          {/* Product Info (rest of your code remains the same) */}
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
                    className="px-3 py-1 text-lg"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                    -
                  </button>
                  <span className="px-4 py-1 text-lg">{quantity}</span>
                  <button
                    type="button"
                    className="px-3 py-1 text-lg"
                    onClick={() => setQuantity((q) => q + 1)}>
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
                elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
              </p>
            </div>
          </div>
        </div>
      </main>
      <NewArrivals title="Related Product" />
  
    </section>
  );
}
