"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { PiShoppingBagLight, PiWatchLight, PiUser } from "react-icons/pi";
import { IoSearch, IoClose } from "react-icons/io5";

interface NavItem {
  name: string;
  path?: string;
  action?: () => void;
  icon?: React.ReactNode;
  hideOnMobile?: boolean;
}

const Header = () => {
  const [state, setState] = useState({
    isScrolled: false,
    mobileMenuOpen: false,
    searchOpen: false,
    searchQuery: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Combined navigation data
  const navItems: NavItem[] = [
    { name: "Watches", path: "/our-world" },
    { name: "Glasses", path: "/stories" },
    { name: "Contact Us", path: "/services" },
  ];

  const actionItems: NavItem[] = [
    {
      name: "Search",
      icon: (
        <IoSearch
          className={`w-6 h-6 transition-transform ${
            state.searchOpen ? "rotate-90" : ""
          }`}
        />
      ),
      action: () =>
        setState((prev) => ({
          ...prev,
          searchOpen: !prev.searchOpen,
          searchQuery: "",
        })),
      hideOnMobile: true,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: <PiShoppingBagLight className="w-6 h-6" />,
      hideOnMobile: true,
    },
    {
      name: "Watch",
      path: "/watches",
      icon: <PiWatchLight className="w-6 h-6" />,
      hideOnMobile: true,
    },
    {
      name: "User",
      path: "/profile",
      icon: <PiUser className="w-6 h-6" />,
      hideOnMobile: true,
    },
  ];

  const mobileItems: NavItem[] = [
    ...navItems,
    {
      name: "Search",
      action: () =>
        setState((prev) => ({
          ...prev,
          mobileMenuOpen: false,
          searchOpen: true,
        })),
    },
    { name: "My Bag", path: "/cart" },
    { name: "My Profile", path: "/profile" },
  ];

  // Combined effects
  useEffect(() => {
    const handleScroll = () =>
      setState((prev) => ({ ...prev, isScrolled: window.scrollY > 10 }));
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape")
        setState((prev) => ({ ...prev, searchOpen: false }));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    if (state.searchOpen && inputRef.current) inputRef.current.focus();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", state.searchQuery);
  };

  const updateState = (updates: Partial<typeof state>) =>
    setState((prev) => ({ ...prev, ...updates }));

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const baseClasses = `text-sm uppercase tracking-wider font-medium transition-colors ${
      pathname === item.path
        ? "text-gold-500"
        : "text-white hover:text-gold-400"
    }`;

    if (item.path) {
      return (
        <Link
          key={item.name}
          href={item.path}
          className={`${baseClasses} ${isMobile ? "py-2" : ""}`}
          onClick={() => isMobile && updateState({ mobileMenuOpen: false })}>
          {item.icon || item.name}
        </Link>
      );
    }

    return (
      <button
        key={item.name}
        onClick={item.action}
        className={`${baseClasses} ${isMobile ? "py-2 text-left" : ""}`}>
        {item.icon || item.name}
      </button>
    );
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        state.isScrolled ? "bg-black/90 py-2" : "bg-green-950 py-4"
      }`}>
      <div className="container h-[80px] mx-auto px-4 sm:px-6 bg-transparent">
        <div className="flex justify-between items-center h-full">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => renderNavItem(item))}
          </nav>

          {/* Logo */}
          <Link href="/" className="text-2xl text-white font-bold">
            Famous Luxuries
          </Link>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-6">
            {/* Search Input */}
            {state.searchOpen && (
              <form
                onSubmit={handleSearch}
                className="hidden lg:flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={state.searchQuery}
                  onChange={(e) => updateState({ searchQuery: e.target.value })}
                  placeholder="Search our collection..."
                  className="bg-transparent border-b border-white text-white py-1 px-2 focus:outline-none w-64"
                />
                <button
                  type="button"
                  onClick={() => updateState({ searchOpen: false })}
                  className="ml-2 text-white">
                  <IoClose className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* Action Icons - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex space-x-6">
              {actionItems
                .filter((item) => !state.searchOpen || item.name !== "Search")
                .map((item) => renderNavItem(item))}
            </nav>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white"
            onClick={() =>
              updateState({ mobileMenuOpen: !state.mobileMenuOpen })
            }
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
                  state.mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {state.mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 py-4">
            <div className="px-4 mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/10 text-white p-2 rounded focus:outline-none focus:bg-white/20"
              />
            </div>
            <div className="flex flex-col space-y-4 px-4">
              {mobileItems.map((item) => renderNavItem(item, true))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
