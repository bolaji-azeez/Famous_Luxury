"use client";
import type { FC } from "react";

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
    title: "Latest Sound System",
    subtitle: "Sale up to 30% Off",
    image: "/images/cartiergold.webp",
    size: "large",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    title: "Smart Watch",
    discount: "20% Off",
    image: "/images/abbs.png",
    size: "medium",
  },
  {
    id: 3,
    title: "Tablet Computer",
    image: "/placeholder.svg?height=200&width=200",
    size: "small",
  },
  {
    id: 4,
    title: "Smart Speaker",
    image: "/placeholder.svg?height=200&width=200",
    size: "small",
  },
  {
    id: 5,
    title: "Game Controller",
    image: "/placeholder.svg?height=200&width=200",
    size: "medium",
  },
];

const Category: FC = () => {
  const handleProductClick = (productId: number) => {
    console.log(`Clicked product ${productId}`);
  };

  return (
    <section className="px-4 py-8 md:px-8  mx-auto w-full bg-[#fafbfc]">
      {/* Desktop and Tablet Grid */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-3 px-4 py-8 gap-4 h-[600px] w-[85%] mx-auto">
        {/* Large Card - Headphones */}
        <div
          className="col-span-2 row-span-3 relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${productItems[0].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => handleProductClick(productItems[0].id)}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm font-medium mb-2 text-gray-200">
              {productItems[0].subtitle}
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
              {productItems[0].title}
            </h2>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              {productItems[0].buttonText}
            </button>
          </div>
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Smart Watch */}
        <div
          className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${productItems[1].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => handleProductClick(productItems[1].id)}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 text-white">
            <p className="text-lg font-bold text-orange-400 mb-1">
              {productItems[1].discount}
            </p>
            <h3 className="text-lg font-semibold">{productItems[1].title}</h3>
          </div>
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Tablet Computer */}
        <div
          className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${productItems[2].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => handleProductClick(productItems[2].id)}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-sm font-semibold">{productItems[2].title}</h3>
          </div>
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Smart Speaker */}
        <div
          className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${productItems[3].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => handleProductClick(productItems[3].id)}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-sm font-semibold">{productItems[3].title}</h3>
          </div>
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Game Controller */}
        <div
          className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer group "
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${productItems[4].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => handleProductClick(productItems[4].id)}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-semibold">{productItems[4].title}</h3>
          </div>
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Mobile Grid */}
      <div className="md:hidden space-y-4">
        {productItems.map((item) => (
          <div
            key={item.id}
            className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${item.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => handleProductClick(item.id)}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              {item.discount && (
                <p className="text-sm font-bold text-orange-400 mb-1">
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
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  {item.buttonText}
                </button>
              )}
            </div>
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
