// components/cart/CartSidebar.tsx
"use client";
import React from "react";
import { useCart } from "../components/context/cardContext";
import { motion, AnimatePresence } from "framer-motion";

const CartSidebar = () => {
  const { isCartModalOpen, setIsCartModalOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartModalOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsCartModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Cart Sidebar */}
          <motion.div
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button
                onClick={() => setIsCartModalOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                X
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <p>Your cart items will appear here...</p>
            </div>

            <div className="p-4 border-t">
              <button className="w-full bg-black text-white py-2 rounded">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
