"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../components/context/cardContext";
import { NavItem } from "../../types";
import { PiShoppingBagLight, PiUser, PiHeartLight } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import MobileMenu from "./MobileMenu";
import DropdownMenu from "./DropdownMenu";
import Image from "next/image";
import logo from "../../../public/logo.jpg"; //

const Header: React.FC = () => {
  const { setIsCartModalOpen, cartItemCount } = useCart() || {};
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Manage body overflow
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
          { name: "Cartier", path: "/pages/about" },
          { name: "G-shock A", path: "/pages/faq-a" },
          { name: "G-shock B", path: "/pages/faq-b" },
          { name: "G-shock C", path: "/pages/faq-c" },
          { name: "G-shock D", path: "/pages/faq-d" },
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
        path: "/profile",
        icon: <PiUser className="w-5 h-5" />,
      },
      {
        name: "Wishlist",
        path: "/wishlist",
        icon: <PiHeartLight className="w-5 h-5" />,
      },
      {
        name: "Cart",
        action: () => setIsCartModalOpen?.(true),
        icon: (
          <div className="relative">
            <PiShoppingBagLight className="w-5 h-5" />
            {cartItemCount && cartItemCount > 0 && (
              <span className="absolute  bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        ),
      },
    ],
    [cartItemCount, setIsCartModalOpen]
  );
  const renderNavItem = (item: NavItem, isMobile = false) => {
    const baseClasses = `text-sm font-medium ${
      pathname === item.path
        ? "text-[#a77354] font-semibold"
        : "text-[#a77354] hover:text-black"
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

    if (item.action) {
      return (
        <button
          key={item.name}
          onClick={item.action}
          className={`${baseClasses} ${isMobile ? "text-left" : ""}`}
          aria-label={item.name}>
          {item.icon || item.name}
        </button>
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
      <div className="container h-[90px] w-[85%] mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Mobile menu button */}
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

        <div className="relative w-[120px] h-[40px]">
          <Image
            src={logo}
            alt="Famous Stores"
            fill
            className="object-cover rounded-sm"
            priority
          />
        </div>

        <nav className="hidden lg:flex items-center space-x-8 text-[#a77354]">
          {navItems.map((item) => renderNavItem(item))}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center border border-[#a77354] rounded-full px-4 py-2 bg-gray-50 ">
            <IoSearch className="w-5 h-5 text-[#a77354] mr-2" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent text-gray-500 placeholder-gray-500 focus:outline-none w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <nav
            className="flex items-center space-x-4"
            aria-label="User actions">
            {actionItems.map((item) =>
              item.path ? (
                <Link
                  key={item.name}
                  href={item.path}
                  className="hidden md:block text-gray-700 hover:text-black"
                  aria-label={item.name}>
                  {item.icon}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-gray-700 hover:text-black"
                  aria-label={item.name}>
                  {item.icon}
                </button>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
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
