"use client";

// import { Hero } from "./components/web/hero";
import Category from "./components/web/category";
import WhyChooseUs from "./components/web/WhyChooseUs";
import NewArrival from "./components/web/NewArrival";
import PopularProducts from "./components/web/Popular-product";
// import VideoDisplaySection from "./components/web/VideoDisplaySection";
import NewsletterPopup from "./components/web/NewsletterPopup";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* <Hero /> */}
      <Category />

      <NewArrival />
      <WhyChooseUs />
      <PopularProducts />
      <NewsletterPopup />
    </div>
  );
}
