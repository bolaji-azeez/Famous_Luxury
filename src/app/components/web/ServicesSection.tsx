"use client"

import { Truck, Shield, RotateCcw, Headphones } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description: "Free shipping on all orders over $200. Express delivery available.",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Comprehensive warranty coverage on all watches and glasses.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Not satisfied? Return your purchase within 30 days for a full refund.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Our expert team is here to help you anytime, anywhere.",
  },
]

export default function ServicesSection() {
  return (
    <section className=" text-white">
      <div className="container py-12 lg:py-12 rounded-sm mx-auto bg-green-950  px-4 sm:px-6 lg:px-8 w-[80%]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Why Choose Us</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're committed to providing exceptional service and quality products
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
