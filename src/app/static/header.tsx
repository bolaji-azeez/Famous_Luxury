"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "../../types";
import { PiUser, PiHeartLight } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import MobileMenu from "./MobileMenu";
import DropdownMenu from "./DropdownMenu";
import Image from "next/image";
import logo from "../../../public/logo.jpg";
import CartSidebar from "../CartSidebar/page"; // <-- Import CartSidebar

const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      firstMenuItemRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems: NavItem[] = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Shop", path: "/allproducts" },
      {
        name: "Watches",
        dropdown: true,
        dropdownItems: [
          { name: "Cartier", path: "/Gucci" },
          
        ],
      },
      {
        name: "Glasses",
        dropdown: true,
        dropdownItems: [
          { name: "About Page", path: "/pages/about" },
          { name: "FAQ", path: "/pages/faq" },
        ],
      },
    ],
    []
  );

  const actionItems: NavItem[] = useMemo(
    () => [
      {
        name: "User",
        path: "/login",
        icon: <PiUser className="w-5 h-5" />,
      },
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
      <div className="container h-[80px] w-[85%] mx-auto px-4 sm:px-6 flex justify-between items-center">
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu">
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

        <div className="flex items-center gap-4">
          <div className="relative w-[120px] h-[40px]">
            <Image
              src={logo}
              alt="Famous Stores"
              fill
              className="object-cover rounded-sm"
              priority
            />
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => renderNavItem(item))}
          </nav>
        </div>
        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50 focus-within:border-black">
            <IoSearch className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Cart Sidebar Component */}
          <CartSidebar />

          <nav
            className="flex items-center font-semibold text-7xl space-x-4"
            aria-label="User actions">
            {actionItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="hidden md:block text-gray-700 hover:text-black"
                aria-label={item.name}>
                {item.icon}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          isSearching={isSearching}
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
