"use client";
import Image from "next/image";
import { type FC, useState, useEffect , useRef} from "react";

interface ProductCard {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage?: string;
}

interface NewArrivalProps {
  title?: string;
}

const sampleProducts: ProductCard[] = [
  {
    id: 1,
    title: "Sunblast Solar Humid",
    price: 19.12,
    oldPrice: 29.99,
    image: "/images/vintage.webp",
    hoverImage:
      "/images/dc3bdd3c05f257f5b216fc83a0a73794.png-removebg-preview.png",
  },
  {
    id: 2,
    title: "Cam Scope Natiopia",
    price: 28.72,
    oldPrice: 44.0,
    image: "/images/vintage.webp",
    hoverImage: "/placeholder.svg?height=400&width=320",
  },
  {
    id: 3,
    title: "Suspended Alexa Hula",
    price: 29.0,
    image: "/images/vintage.webp",
    hoverImage: "/placeholder.svg?height=400&width=320",
  },
  {
    id: 4,
    title: "Juno Nexus Commodo Tool",
    price: 29.0,
    image: "/images/vintage.webp",
    hoverImage: "/placeholder.svg?height=400&width=320",
  },
  {
    id: 5,
    title: "Digital Camera Pro",
    price: 45.99,
    oldPrice: 59.99,
    image: "/images/vintage.webp",
    hoverImage: "/placeholder.svg?height=400&width=320",
  },
  {
    id: 6,
    title: "Wireless Headphones",
    price: 89.99,
    image: "/images/vintage.webp",
    hoverImage: "/placeholder.svg?height=400&width=320",
  },
  {
    id: 7,
    title: "Smart Watch Elite",
    price: 199.99,
    oldPrice: 249.99,
    image: "/images/vintage.webp",
    hoverImage: "/placeholder.svg?height=400&width=320",
  },
  {
    id: 8,
    title: "Bluetooth Speaker",
    price: 39.99,
    image: "/images/vintage.webp",
    hoverImage: "/placeholder.svg?height=400&width=320",
  },
];

const NewArrival: FC<NewArrivalProps> = ({ title = "You Might Also Like" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchedProduct, setTouchedProduct] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const getItemsPerSlide = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 640) return 2;
    if (window.innerWidth <= 1024) return 2;
    return 4;
  };

  const totalSlides = Math.ceil(sampleProducts.length / getItemsPerSlide());

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const handleQuickView = (id: number) => console.log("Quick View:", id);
  const handleAddToCart = (id: number) => console.log("Add to Cart:", id);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, isHovered, totalSlides]);

  return (
    <section className="px-4 py-10 md:px-10 w-full mx-auto bg-[#fafbfc]">
      <div className="max-w-[85%] mx-auto">
        <div className="flex items-center justify-between mb-6">
           <div className="mb-8 flex items-center">
          <div className="w-1 h-6 bg-[#a77354] mr-3 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
          <div className="flex gap-2">
            <button onClick={prevSlide} className="p-2 border rounded-full">‹</button>
            <button onClick={nextSlide} className="p-2 border rounded-full">›</button>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={sliderRef}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className={`grid gap-4 ${isMobile ? "grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
                  {sampleProducts
                    .slice(
                      slideIndex * getItemsPerSlide(),
                      (slideIndex + 1) * getItemsPerSlide()
                    )
                    .map((product) => {
                      const isTouched = touchedProduct === product.id;
                      return (
                        <div
                          key={product.id}
                          className="rounded-md p-4 text-center"
                          onTouchStart={() => setTouchedProduct(product.id)}
                          onTouchEnd={() => setTimeout(() => setTouchedProduct(null), 1200)}
                        >
                          <div className="relative aspect-[4/5] mb-4 group cursor-pointer overflow-hidden rounded">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className={`object-cover transition-opacity duration-300 ${isTouched ? "opacity-0" : "group-hover:opacity-0"}`}
                            />
                            <Image
                              src={product.hoverImage || product.image}
                              alt={`${product.title} hover`}
                              fill
                              className={`object-cover transition-opacity duration-300 ${isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <button
                                onClick={() => handleQuickView(product.id)}
                                className={`bg-white text-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                              >
                                Quick View
                              </button>
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-gray-900 mb-1">{product.title}</h3>
                          <div className="text-sm">
                            <span className="text-gray-900 font-semibold">${product.price.toFixed(2)}</span>
                            {product.oldPrice && (
                              <span className="ml-2 text-xs text-gray-400 line-through">
                                ${product.oldPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {(isTouched || !isMobile) && (
                            <div className="mt-3">
                              <button
                                onClick={() => handleAddToCart(product.id)}
                                className="bg-black text-white w-full py-2 rounded-md text-sm hover:bg-gray-800"
                              >
                                Add to Cart
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? "bg-black w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;


