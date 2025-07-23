"use client";
import React, { forwardRef } from "react";
import { Separator } from "@/components/ui/separator";
import { IoSearch } from "react-icons/io5";
import type { NavItem } from "../../types"; 
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSearching: boolean;
  navItems: NavItem[];
  actionItems: NavItem[];
  renderNavItem: (item: NavItem, isMobile: boolean) => React.ReactNode;
  firstMenuItemRef: React.RefObject<HTMLAnchorElement>;
}

const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
    
    
  (
    {
      isOpen,
      onClose,
      searchQuery,
      onSearchChange,
      isSearching,
      navItems,
      actionItems,
      renderNavItem,
      firstMenuItemRef,
    },
    ref
  ) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className="lg:hidden fixed inset-0 bg-white z-20 flex flex-col py-2 px-2 shadow-lg overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex justify-end mb-6">
          <button
            className="text-gray-700"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 mb-6">
          <div className="relative flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50 focus-within:border-black transition-colors duration-200">
            <IoSearch className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none w-full"
              value={searchQuery}
              onChange={onSearchChange}
              aria-label="Search products"
            />
            {isSearching && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="animate-spin h-4 w-4 text-gray-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            )}
          </div>
        </div>
        <nav className="flex flex-col space-y-4 px-4">
          {navItems.map((item) => renderNavItem(item, true))}
          <Separator className="my-2 bg-gray-200" />
          {actionItems
            .filter((item) => item.name !== "Search" && item.name !== "Cart")
            .map((item) => renderNavItem(item, true))}
          <Link
            href="/profile"
            className="py-2 text-gray-700 hover:text-black text-sm font-medium"
            ref={firstMenuItemRef}
          >
            My Profile
          </Link>
          <Link
            href="/wishlist"
            className="py-2 text-gray-700 hover:text-black text-sm font-medium"
          >
            My Wishlist
          </Link>
        </nav>
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;