"use client";
import { Header } from "./static";
import { Jost } from "next/font/google";
import HeroSlider from "./components/web/heroslider";
import NewArrivals from "./components/web/NewArrival";
import BestSeller from "./components/web/BestSeller";
import CategoryShowcase from "./components/web/CategoryShowcase";
import ServicesSection from "./components/web/ServicesSection";
import { motion } from "framer-motion";
// import ScrollTextSection from "./components/web/ScrollTextSection";
// Configure Jost with required weights/styles
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Light (300), Regular (400), Medium (500), Bold (700)
  variable: "--font-jost", // Optional: CSS variable for flexibility
});
import ScrollToTop from "./static/scrollToTop";

export default function Page() {
  return (
    <main className={`${jost.className}`}>
      <Header />

      {/* HeroSlider with fade-in animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}>
        <HeroSlider />
      </motion.div>

      {/* CategoryShowcase with slide-up animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <CategoryShowcase />
      </motion.div>

           <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        <ServicesSection />
      </motion.div>

      {/* NewArrivals with slide-from-left animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}>
        <NewArrivals />
      </motion.div>

      {/* BestSeller with slide-from-right animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}>
        <BestSeller />
      </motion.div>

      {/* ServicesSection with scale-up animation */}
 
      {/* ScrollTextSection with fade-in animation */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 100 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}>
        <ScrollTextSection />
      </motion.div> */}

      <ScrollToTop />
    </main>
  );
}
