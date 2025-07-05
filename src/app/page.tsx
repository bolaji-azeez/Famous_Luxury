"use client";
import { Header } from "./static";
import { Jost } from "next/font/google";
import HeroSlider from "./components/web/heroslider";
// Configure Jost with required weights/styles
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Light (300), Regular (400), Medium (500), Bold (700)
  variable: "--font-jost", // Optional: CSS variable for flexibility
});
// import ScrollToTop from "./static/scrollToTop";

export default function Page() {
  return (
    <main className={`${jost.className}`}>
      <Header />
      <HeroSlider />
    </main>
  );
}
