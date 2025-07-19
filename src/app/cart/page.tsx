"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../components/context/cardContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  oldPrice?: number;
}

export default function CartPage() {
  // Add proper type checking and default empty array
  const { cart = [], removeFromCart, updateQuantity } = useCart() as {
    cart: CartItem[];
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
  };

  // Safely calculate totals with fallback for empty cart
  const subtotal = (cart || []).reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const estimatedShipping = 5.0; // Dummy shipping
  const estimatedTax = subtotal * 0.08; // Dummy tax
  const grandTotal = subtotal + estimatedShipping + estimatedTax;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Your Shopping Cart</h1>

        {!cart || cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 p-8 bg-white rounded-xl shadow-lg">
            <svg
              className="w-24 h-24 mb-8 text-gray-300 animate-bounce-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-2xl font-semibold mb-4">Your cart is empty!</p>
            <p className="text-lg text-center mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/" passHref>
              <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Items in your cart ({cart.length})</h2>
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-100 rounded-lg transition-all duration-200 hover:shadow-md"
                  >
                    {/* Rest of your cart item rendering */}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 text-gray-700">
                {/* Rest of your order summary */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}