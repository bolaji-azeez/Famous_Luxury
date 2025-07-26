"use client";
import { type FC, useState, useEffect, useRef } from "react";
import ProductCard from "@/app/ui/productcard";


interface NewArrivalProps {
  title?: string;
}

const sampleProducts: ProductCard[] = [
  {
    id: 1,
    title: "Sunblast Solar Humid",
    price: 19.12,
    oldPrice: 29.99,
    image: "/image/cas1.jpg",
    hoverImage:
      "/images/G-shock.png",
      size: "medium"
  },
  {
    id: 2,
    title: "Cam Scope Natiopia",
    price: 28.72,
    oldPrice: 44.0,
    image: "/image/cas2.jpg",
    hoverImage: "/image/cas5.jpg",
  },
  {
    id: 3,
    title: "Suspended Alexa Hula",
    price: 29.0,
    image: "/images/4.jpg",
    hoverImage: "/image/cas11.jpg",
  },
  {
    id: 4,
    title: "Juno Nexus Commodo Tool",
    price: 29.0,
    image: "/image/cas5.jpg",
    hoverImage: "/image/cas11.jpg",
  },
  {
    id: 5,
    title: "Digital Camera Pro",
    price: 45.99,
    oldPrice: 59.99,
    image: "/image/cas6",
    hoverImage: "/image/cas4",
  },
  {
    id: 6,
    title: "Wireless Headphones",
    price: 89.99,
    image: "/image/cas7",
    hoverImage: "/image/cas3",
  },
  {
    id: 7,
    title: "Smart Watch Elite",
    price: 199.99,
    oldPrice: 249.99,
    image: "/image/cas8",
    hoverImage: "/image/cas2",
  },
  {
    id: 8,
    title: "Bluetooth Speaker",
    price: 39.99,
    image: "/image/cas9",
    hoverImage: "/image/cas1",
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


  const handleAddToCart = (id: number) => {
    console.log("Add to cart:", id);
    
  }
  const getItemsPerSlide = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 640) return 2;
    if (window.innerWidth <= 1024) return 2;
    return 4;
  };

  const totalSlides = Math.ceil(sampleProducts.length / getItemsPerSlide());

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

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
            <button onClick={prevSlide} className="p-2 border text-[#101828] rounded-full">
              ‹
            </button>
            <button onClick={nextSlide} className="p-2 border rounded-full text-[#101828]">
              ›
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={sliderRef}>
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div
                  className={`grid gap-4 ${
                    isMobile ? "grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"
                  }`}>
                  {sampleProducts
                    .slice(
                      slideIndex * getItemsPerSlide(),
                      (slideIndex + 1) * getItemsPerSlide()
                    )
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
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
