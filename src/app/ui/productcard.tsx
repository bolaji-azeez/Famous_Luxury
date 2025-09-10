"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../components/context/cardContext";
import Swal from "sweetalert2";
import { saveToRecentlyViewed } from "@/utils/recentViewed";
import { useRouter } from "next/navigation";

// Accept both shapes: {_id, images[]} or {id, image}
type ProductLike = {
  _id?: string; // Mongo id
  id?: string | number; // fallback id
  name: string;
  price: number;
  oldPrice?: number;
  images?: Array<{ url?: string } | string>; 
  image?: string; 
  hoverImage?: string;
};

type ProductCardProps = {
  product: ProductLike;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void; //
};

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  const productId =
    typeof product._id === "string"
      ? product._id
      : product.id != null
      ? String(product.id)
      : "";

  // normalize url array
  const urls = (product.images ?? [])
    .map((it) => (typeof it === "string" ? it : it?.url))
    .filter((u): u is string => !!u);

  // pick first & second
  const mainImg = urls[0] ?? product.image ?? "/placeholder.png";
  const hoverImg = urls[1] ?? product.hoverImage ?? mainImg;

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleAddToCart = () => {
    if (!productId) {
      Swal.fire({
        icon: "error",
        title: "Missing product id",
        text: "Unable to add this item to cart.",
        toast: true,
        timer: 1800,
        showConfirmButton: false,
        position: "top-end",
      });
      return;
    }

    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: mainImg,
    });

     onAddToCart?.(productId);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: "#4BB543",
      color: "white",
    });
  };

  const handleViewProduct = () => {
    if (!productId) return;
    saveToRecentlyViewed({
      id: productId,
      name: product.name,
      price: product.price,
      image: mainImg,
    });
    router.push(`/detail/${productId}`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="rounded-md p-4 text-center relative group"
      initial="rest">
      {/* Flip Animation Container */}
      <div
        className="relative aspect-[4/5] mb-2 cursor-pointer overflow-hidden rounded [perspective:1000px]"
        onClick={handleViewProduct}
        onMouseEnter={() => !isMobile && setFlipped(true)}
        onMouseLeave={() => !isMobile && setFlipped(false)}>
        {/* Labels */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            New
          </span>
        </div>

        <motion.div
          className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500"
          animate={{ rotateY: flipped ? 180 : 0 }}>
          {/* Front */}
          <div className="absolute w-full h-full [backface-visibility:hidden]">
            <Image
              src={mainImg}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Back */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center bg-gray-100">
            <Image
              src={hoverImg}
              alt={product.name}
              fill
              className="object-cover opacity-70"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!productId) return;
                saveToRecentlyViewed({ ...product, id: productId });
                router.push(`/detail/${productId}`);
                onQuickView?.(productId);
              }}
              className="absolute bg-[#232c3b] text-[#fefefe] py-2 px-2 rounded-sm shadow-sm hover:bg-gray-800">
              Quick View
            </button>
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <h3 className="text-[18px]  text-left font-semibold text-gray-600 mb-1">{product.name}</h3>
      <div className="text-sm mb-2 text-left">
        <span className="text-gray-900 font-semibold">
          ₦{product.price.toFixed(2)}
        </span>
        {product.oldPrice && (
          <span className="ml-2 text-xs text-gray-400 line-through">
            ₦{product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="bg-[#232c3b] text-white w-full py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
        Add to Cart
      </button>
    </motion.div>
  );
}
