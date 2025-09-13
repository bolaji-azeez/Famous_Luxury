"use Client";

import Link from "next/link";
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// --- Enhanced Footer Links ---
const footerLinks = {
  shop: [
    { name: "G-shock", href: "/products" }, // More evocative
    { name: "Cartier", href: "/products" }, // Specific luxury category
    { name: "Podeegar", href: "/products" }, // Luxury tech
  ],
  company: [
    { name: "Our Heritage", href: "/About" }, // More
  ],
  legal: [
    { name: "Privacy Policy " },
    { name: "Terms of Service" },
    { name: "Cookie Policy" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/YourLuxuryBrand",
  }, // Use specific brand handles
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/YourLuxuryBrand",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/YourLuxuryBrand",
  }, // Or X
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/YourLuxuryBrand",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container w-[93.5%] max-w-7xl mx-auto px-4 py-10 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-extrabold tracking-tight">
                Famous Luxuries
              </span>{" "}
            </Link>
            <p className="text-gray-300 mb-5 text-sm leading-relaxed">
              Experience unparalleled craftsmanship and timeless sophistication.
              Elysian Timepieces curates the worlds most exquisite watches and
              artisanal accessories, for those who appreciate the finer moments.
            </p>
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" /> famousstore@gmail.com{" "}
                {/* More premium contact */}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" /> +1 (555) ELEGANT{" "}
                {/* Stylized phone number */}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" /> Flagship Atelier,
                Fifth Avenue, Idumota, Lagos 10001{" "}
                {/* More descriptive location */}
              </div>
            </div>
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {" "}
              {/* Slightly more padding */}
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out" // Added duration/ease
                  aria-label={social.name}>
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Discover</h3>{" "}
            {/* More engaging heading */}
            <ul className="space-y-3 text-sm">
              {" "}
              {/* Slightly more spacing */}
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:underline transition-colors duration-300 ease-in-out">
                    {" "}
                    {/* Added underline hover */}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Our World</h3>{" "}
            {/* More evocative heading */}
            <ul className="space-y-3 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:underline transition-colors duration-300 ease-in-out">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup (Optional but good for luxury) */}
          <div className="lg:col-span-1">
            {" "}
            {/* Ensure this div fits correctly in the grid */}
            <h3 className="font-bold mb-4 text-lg">Stay Inspired</h3>
            <p className="text-gray-400 mb-3 text-sm">
              Join our exclusive mailing list for the latest arrivals and
              insider access.
            </p>
            <div className="flex items-center">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 mr-2 border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-primary focus:border-primary" // Styling for input
              />
              <Button className="bg-primary hover:bg-primary-hover">
                Subscribe
              </Button>{" "}
              {/* Assuming a primary color */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container w-[90%] max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400">
            © 2025 Famous Store. All rights reserved.
          </p>{" "}
          {/* Updated brand name */}
          <div className="flex flex-wrap justify-center gap-5">
            {" "}
            {/* Allow wrapping on small screens */}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Use React.memo for performance optimization if this footer is rendered frequently
export default React.memo(Footer);
