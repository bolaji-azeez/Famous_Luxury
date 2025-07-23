"use client";
import React, { useState } from "react";
import Link from "next/link";

interface DropdownMenuProps {
  name: string;
  items: { name: string; path: string }[];
  baseClasses: string;
  isMobile: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  name,
  items,
  baseClasses,
  isMobile,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  if (isMobile) {
    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className={`${baseClasses} flex items-center gap-1`}
          aria-expanded={isOpen}
          aria-controls={`${name.toLowerCase()}-dropdown`}>
          {name}
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            id={`${name.toLowerCase()}-dropdown`}
            className="pl-2 mt-2 space-y-2">
            {items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block py-1 text-gray-700 hover:text-black text-sm">
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      <button
        className={`${baseClasses} flex items-center gap-1`}
        aria-haspopup="true"
        aria-expanded={isOpen}>
        {name}
        <svg
          className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20"
        role="menu">
        {items.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            role="menuitem">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
