"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoSearch, IoClose } from "react-icons/io5";
import { PiUser } from "react-icons/pi";
import logo from "../../../public/Famous Store logo 2.jpg";

import MobileMenu from "./MobileMenu";
import DropdownMenu from "./DropdownMenu";
import CartSidebar from "../CartSidebar/page";

import { useGetBrandsQuery } from "@/features/brand/brandApi";
import { useGetProductsQuery } from "@/features/products/productApi";
import type { Product } from "@/features/products/productApi";
import { skipToken } from "@reduxjs/toolkit/query";

type NavItem = {
  name: string;
  path?: string;
  dropdown?: boolean;
  dropdownItems?: Array<{ name: string; path: string }>;
  icon?: React.ReactNode;
};

// Define a type for Brand
type Brand = {
  _id: string;
  name: string;
};

function slugifyName(name: string, id?: string) {
  const base = (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return id ? `${base}-${id.slice(-6)}` : base;
}

function useDebouncedValue<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

const brandNameOf = (
  brand: string | { _id: string; name?: string } | null | undefined
) => (typeof brand === "string" ? "" : brand?.name ?? "");

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null!);

  // Close mobile menu on route change
  useEffect(() => setMobileMenuOpen(false), [pathname]);

  // Close search on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [searchOpen]);

  const { data: brands = [] } = useGetBrandsQuery();

  const brandDropdownItems = useMemo(() => {
    // Use the Brand type here
    const top4 = (brands ?? []).slice(0, 4).map((b: Brand) => ({
      name: b.name,
      path: `/allproducts#${slugifyName(b.name, b._id)}`,
    }));
    // Always append "See all brands"
    return [...top4, { name: "See all brands →", path: "/allproducts" }];
  }, [brands]);

  const debounced = useDebouncedValue(searchQuery, 250);
  const shouldSearch = debounced.trim().length >= 2;

  const { data: searchResults = [], isFetching: searching } =
    useGetProductsQuery(
      shouldSearch ? { search: debounced.trim(), limit: 8 } : skipToken
    );

  const productResults = (searchResults as Product[]) ?? [];

  const navItems: NavItem[] = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Shop", path: "/allproducts" },
      {
        name: "Watches",
        dropdown: true,
        dropdownItems: brandDropdownItems,
      },
      {
        name: "Glasses",
        dropdown: true,
        dropdownItems: brandDropdownItems,
      },
     
    ],
    [brandDropdownItems]
  );

  const actionItems: NavItem[] = useMemo(
    () => [
      { name: "User", path: "/login", icon: <PiUser className="w-5 h-5" /> },
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
            viewBox="0 0 24 24">
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
        <div className="relative w-[170px] h-[55px]">
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
          {/* Search button */}
          <motion.button
            onClick={() => setSearchOpen((v) => !v)}
            className="text-gray-700 hover:text-black"
            aria-label="Search"
            whileTap={{ scale: 0.85 }}
            animate={{
              scale: searchOpen ? 1.2 : 1,
              rotate: searchOpen ? 90 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}>
            <IoSearch className="w-5 h-5" />
          </motion.button>

          {/* Search dropdown */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-10 right-0 bg-white border border-gray-200 shadow-lg w-[22rem] rounded-lg p-4 z-50">
                <div className="flex items-center border-b border-gray-300 mb-3">
                  <input
                    type="text"
                    placeholder="Search products…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 text-gray-700 outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        router.push(
                          `/allproducts?search=${encodeURIComponent(
                            searchQuery.trim()
                          )}`
                        );
                        setSearchOpen(false);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }}
                    className="text-gray-600 hover:text-black"
                    aria-label="Close search">
                    <IoClose className="w-5 h-5" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-auto">
                  {!shouldSearch ? (
                    <p className="text-gray-500 text-sm">
                      Type at least 2 characters…
                    </p>
                  ) : searching ? (
                    <p className="text-gray-500 text-sm">Searching…</p>
                  ) : productResults.length === 0 ? (
                    <p className="text-gray-500 text-sm">No products found.</p>
                  ) : (
                    <ul className="space-y-2">
                      {productResults.map((p) => {
                        const img = p.images?.[0]?.url || "/placeholder.png";
                        // Use the Brand type here and handle undefined/null cases
                        const brand = brandNameOf(
                          p.brand as Brand | undefined | null
                        );
                        return (
                          <li key={p._id}>
                            <Link
                              href={`/detail/${p._id}`}
                              className="flex items-center gap-3 hover:bg-gray-50 rounded px-2 py-2"
                              onClick={() => setSearchOpen(false)}>
                              <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100 border">
                                <Image
                                  src={img}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {p.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {brand ? `Brand: ${brand}` : "\u00A0"}
                                </p>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {/* View all link */}
                {shouldSearch && (
                  <div className="pt-3 border-t mt-3">
                    <Link
                      href={`/allproducts?search=${encodeURIComponent(
                        searchQuery.trim()
                      )}`}
                      className="block text-center text-sm font-medium text-[#111] hover:underline"
                      onClick={() => setSearchOpen(false)}>
                      View all results for “{searchQuery.trim()}”
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cart (desktop) */}
          <div className="hidden md:block">
            <CartSidebar />
          </div>

          {/* User */}
          <nav
            className="flex items-center space-x-4"
            aria-label="User actions">
            {actionItems.map((item) => (
              <Link
                key={item.name}
                href={item.path!}
                className="text-gray-700 hover:text-black"
                aria-label={item.name}>
                {item.icon}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Floating Cart (mobile) */}
      <div className="fixed bottom-5 right-5 md:hidden z-50">
        <CartSidebar />
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navItems={navItems}
          actionItems={actionItems}
          renderNavItem={renderNavItem}
          firstMenuItemRef={firstMenuItemRef}
          // ✅ add these 3 required props:
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          isSearching={searching}
        />
      )}
    </header>
  );
};

export default React.memo(Header);
