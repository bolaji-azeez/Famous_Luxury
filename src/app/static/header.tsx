"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "../../types";
import { PiUser, PiHeartLight } from "react-icons/pi";
import { IoSearch, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import DropdownMenu from "./DropdownMenu";
import Image from "next/image";
import logo from "../../../public/Famous Store logo 2.jpg";
import CartSidebar from "../CartSidebar/page";

// Mock data (replace with your product data)
const allProducts = [
  { id: 1, brand: "Cartier", title: "Cartier Gold Watch", path: "/products/1" },
  { id: 2, brand: "G-shock", title: "G-shock Classic", path: "/products/2" },
  { id: 3, brand: "Ray-Ban", title: "Ray-Ban Aviator", path: "/products/3" },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  const filteredBrands = useMemo(() => {
    if (!searchQuery) return [];
    return allProducts.filter((item) =>
      item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  const navItems: NavItem[] = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Shop", path: "/allproducts" },
      {
        name: "Watches",
        dropdown: true,
        dropdownItems: [
          { name: "Cartier", path: "/Gucci" },
          { name: "G-shock", path: "/pages/faq-1" },
          { name: "G-shock", path: "/pages/faq-2" },
        ],
      },
      {
        name: "Glasses",
        dropdown: true,
        dropdownItems: [
          { name: "Cartier", path: "/cart" },
          { name: "G-shock", path: "/pages/faq-1" },
          { name: "G-shock", path: "/pages/faq-2" },
        ],
      },
    ],
    []
  );

  const actionItems: NavItem[] = useMemo(
    () => [
      { name: "User", path: "/login", icon: <PiUser className="w-5 h-5" /> },
      {
        name: "Wishlist",
        path: "/wishlist",
        icon: <PiHeartLight className="w-5 h-5" />,
      },
    ],
    []
  );

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const baseClasses = `text-sm font-medium ${
      pathname === item.path
        ? "text-black font-semibold"
        : "text-gray-700 hover:text-black"
    } ${isMobile ? "py-2" : ""}`;
    if (item.path) {
      return (
        <Link
          key={item.name}
          href={item.path}
          className={baseClasses}
          ref={isMobile && item.name === "Home" ? firstMenuItemRef : null}
          aria-current={pathname === item.path ? "page" : undefined}>
          {item.name}
        </Link>
      );
    }
    if (item.dropdown) {
      return (
        <DropdownMenu
          key={item.name}
          name={item.name}
          items={item.dropdownItems || []}
          baseClasses={baseClasses}
          isMobile={isMobile}
        />
      );
    }
    return null;
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-30 bg-white shadow-sm border-b border-gray-100">
      <div className="container h-[80px] w-[90%] mx-auto px-2 flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => renderNavItem(item))}
        </nav>

        {/* Logo */}
        <div className="relative w-[110px] h-[55px]">
          <Image
            src={logo}
            alt="Famous Stores"
            fill
            className="object-cover rounded-sm"
            priority
          />
        </div>

        {/* Actions */}
        <div className="relative flex items-center space-x-4" ref={searchRef}>
          {/* Search Icon */}
          <motion.button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-700 hover:text-black"
            aria-label="Search"
            whileTap={{ scale: 0.85 }}
            animate={{ scale: searchOpen ? 1.2 : 1, rotate: searchOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}>
            <IoSearch className="w-5 h-5" />
          </motion.button>

          {/* Search Dropdown */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute top-10 right-0 bg-white border border-gray-200 shadow-lg w-64 rounded-lg p-4 z-50">
                <div className="flex items-center border-b border-gray-300 mb-3">
                  <input
                    type="text"
                    placeholder="Search brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 text-gray-700 outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }}
                    className="text-gray-600 hover:text-black">
                    <IoClose className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  {searchQuery && filteredBrands.length === 0 ? (
                    <p className="text-gray-500 text-sm">Brand out of stock</p>
                  ) : (
                    <ul className="space-y-2">
                      {filteredBrands.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.path}
                            className="block text-gray-700 hover:text-black">
                            <span className="font-semibold">{item.brand}</span>{" "}
                            - {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cart Sidebar (Desktop Only) */}
          <div className="hidden md:block">
            <CartSidebar />
          </div>

          {/* User Actions */}
          <nav
            className="flex items-center font-semibold text-7xl space-x-4"
            aria-label="User actions">
            {actionItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-gray-700 hover:text-black"
                aria-label={item.name}>
                {item.icon}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Floating Cart (Mobile Only) */}
      <div className="fixed bottom-5 right-5 md:hidden z-50">
        <CartSidebar />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navItems={navItems}
          actionItems={actionItems}
          renderNavItem={renderNavItem}
          firstMenuItemRef={firstMenuItemRef}
        />
      )}
    </header>
  );
};

export default React.memo(Header);
