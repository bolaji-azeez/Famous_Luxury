"use client";
import type { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

interface ProductGridItem {
  id: number;
  title: string;
  subtitle?: string;
  discount?: string;
  image: string;
  buttonText?: string;
}

const productItems: ProductGridItem[] = [
  {
    id: 1,
    title: "Luxury Watches",
    subtitle: "Sale up to 30% Off",
    image: "/image/podeegar.jpg",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    title: "Luxury Glasses",
    discount: "20% Off",
    image: "/images/glasses.avif",
  },
];

const Category: FC = () => {
  const handleProductClick = (productId: number) => {
    console.log(`Clicked product ${productId}`);
  };

  return (
    <section className="px-4 py-12 md:px-8 mx-auto w-full bg-[#fafbfc]">
      {/* Desktop Grid - 2 columns x 2 rows */}
      <div className="hidden md:grid grid-cols-2  gap-6 w-[85%] mx-auto">
        {productItems.map((item) => (
          <motion.div
            key={item.id}
            className="relative rounded-sm overflow-hidden cursor-pointer h-[450px]"
            initial={false}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={() => handleProductClick(item.id)}
            style={{
              backgroundImage: ` url('${item.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              {item.discount && (
                <p className="text-lg font-bold text-[#a77153] mb-2">
                  {item.discount}
                </p>
              )}
              {item.subtitle && (
                <p className="text-sm font-medium mb-1 text-gray-200">
                  {item.subtitle}
                </p>
              )}
              <h2 className="text-xl lg:text-2xl font-bold mb-4 leading-tight">
                {item.title}
              </h2>
              {item.buttonText && (
                <div className="flex gap-3 items-center">
                  {item.buttonText}
                  <Link href="/allproducts" className="group">
                    <FaArrowRightLong className="text-2xl transition-all cursor-pointer group-hover:translate-x-2" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Grid - One Card Per Row (Poster Style) */}
      <div className="md:hidden flex flex-col gap-4 px-4">
        {productItems.map((item) => (
          <motion.div
            key={item.id}
            className="relative h-56 rounded-2xl overflow-hidden cursor-pointer"
            initial={false}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            onClick={() => handleProductClick(item.id)}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${item.image}')`,
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              {item.discount && (
                <p className="text-xs font-bold text-[#a77153] mb-1">
                  {item.discount}
                </p>
              )}
              {item.subtitle && (
                <p className="text-xs mb-1 text-gray-200">{item.subtitle}</p>
              )}
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Category;
