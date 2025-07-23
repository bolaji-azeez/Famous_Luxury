"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-black">
        <Image
          src="/luxury-watch-bg.jpg"
          alt="Luxury Watch Background"
          fill
          className="object-cover opacity-50"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-wide">
            About Our Luxury Timepieces
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Where timeless elegance meets modern craftsmanship.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded on a passion for fine craftsmanship and innovation, we have 
              spent decades perfecting the art of creating luxury wristwatches. Each 
              piece is a testament to precision engineering and sophisticated design.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-64 md:h-96"
          >
            <Image
              src="/about-watch.jpg"
              alt="About our watches"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-16 bg-gray-100 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Unparalleled Craftsmanship</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our watches are meticulously handcrafted using the finest materials, 
            blending traditional techniques with modern innovations to ensure that 
            every timepiece tells a story of elegance and excellence.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "/craft1.jpg",
            "/craft2.jpg",
            "/craft3.jpg",
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative h-64 rounded-lg overflow-hidden shadow-md"
            >
              <Image src={img} alt={`Craft ${i + 1}`} fill className="object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to create more than just watches; we create experiences that 
            embody sophistication and timeless style. Our mission is to redefine 
            luxury, blending heritage with innovation.
          </p>
        </div>
      </section>
    </div>
  );
}
