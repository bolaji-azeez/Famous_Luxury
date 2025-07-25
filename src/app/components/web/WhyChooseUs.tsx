"use client";

import { Clock, Shield, Award, Truck } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Swift Service",
    description:
      "Lightning-fast processing and same-day shipping on all orders",
  },
  {
    icon: Shield,
    title: "100% Authentic",
    description:
      "Guaranteed genuine products with certificates of authenticity",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handpicked luxury items from world-renowned brands",
  },
  {
    icon: Truck,
    title: "Global Delivery",
    description: "Secure worldwide shipping with real-time tracking",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-16 lg:py-12 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/background.webp')", //
      }}>
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative container bg-transparent w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-4 drop-shadow-lg">
            Why Choose Us
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto drop-shadow-md">
            Experience luxury shopping redefined with our commitment to
            excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30 group-hover:bg-white/30 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-white drop-shadow-md" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-md">
                {feature.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed drop-shadow-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
