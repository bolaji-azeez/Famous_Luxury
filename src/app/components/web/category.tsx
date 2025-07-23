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
  size: "large" | "medium" | "small";
  buttonText?: string;
}

const productItems: ProductGridItem[] = [
  {
    id: 1,
    title: "Luxury Watches",
    subtitle: "Sale up to 30% Off",
    image: "/images/cartiergold.webp",
    size: "large",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    title: "Luxury Glasses",
    discount: "20% Off",
    image: "/images/fresh.webp",
    size: "medium",
  },
  {
    id: 3,
    title: "G-shock Series",
    image: "/images/G-shock.png",
    size: "small",
  },
  {
    id: 4,
    title: "Smart Glasses",
    image: "/images/bluerray.webp",
    size: "small",
  },
  {
    id: 5,
    title: "Cartier",
    image: "/images/dc3bdd3c05f257f5b216fc83a0a73794.png-removebg-preview.png",
    size: "medium",
  },
];

const Category: FC = () => {
  const handleProductClick = (productId: number) => {
    console.log(`Clicked product ${productId}`);
  };


  
  return (
    <section className="px-4 py-8 md:px-8 mx-auto w-full bg-[#fafbfc]">
      {/* Desktop and Tablet Grid */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-3 px-4 py-8 gap-4 h-[600px] w-[85%] mx-auto">
        {/* Large Card */}
        <motion.div
          className="col-span-2 row-span-3 relative rounded-2xl overflow-hidden cursor-pointer"
          initial={false}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={() => handleProductClick(productItems[0].id)}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${productItems[0].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm font-medium mb-2 text-gray-200">
              {productItems[0].subtitle}
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
              {productItems[0].title}
            </h2>
            <div className="flex gap-3">
              {productItems[0].buttonText}
              <Link href="/allproducts" className="group">
                  <FaArrowRightLong className="text-2xl transition-all cursor-pointer group-hover:translate-x-2" />
                </Link>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 bg-black/10 opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Medium Card 1 */}
        <motion.div
          className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer"
          initial={false}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={() => handleProductClick(productItems[1].id)}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${productItems[1].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 text-white">
            <p className="text-lg font-bold text-[#a77153]">
              {productItems[1].discount}
            </p>
            <h3 className="text-lg font-semibold">{productItems[1].title}</h3>
          </div>
          <motion.div
            className="absolute inset-0 bg-black/10 opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Small Card 1 */}
        <motion.div
          className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer"
          initial={false}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={() => handleProductClick(productItems[2].id)}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${productItems[2].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-sm font-semibold">{productItems[2].title}</h3>
          </div>
          <motion.div
            className="absolute inset-0 bg-black/10 opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Small Card 2 */}
        <motion.div
          className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer"
          initial={false}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={() => handleProductClick(productItems[3].id)}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${productItems[3].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-sm font-semibold">{productItems[3].title}</h3>
          </div>
          <motion.div
            className="absolute inset-0 bg-black/10 opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Medium Card 2 */}
        <motion.div
          className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer"
          initial={false}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={() => handleProductClick(productItems[4].id)}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${productItems[4].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-semibold">{productItems[4].title}</h3>
          </div>
          <motion.div
            className="absolute inset-0 bg-black/10 opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      {/* Mobile Grid */}
      <div className="md:hidden space-y-4 px-5">
        {productItems.map((item) => (
          <motion.div
            key={item.id}
            className="relative h-48 rounded-2xl overflow-hidden cursor-pointer"
            initial={false}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            onClick={() => handleProductClick(item.id)}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${item.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              {item.discount && (
                <p className="text-sm font-bold text-[#151515] mb-1">
                  {item.discount}
                </p>
              )}
              {item.subtitle && (
                <p className="text-sm font-medium mb-1 text-gray-200">
                  {item.subtitle}
                </p>
              )}
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              {item.buttonText && (
                <button className="bg-[#151515]c cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  {item.buttonText}
                </button>
              )}
            </div>
            <motion.div
              className="absolute inset-0 bg-black/10 opacity-0"
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Category;
