"use client";
import React, { useEffect } from "react";
import { useCart } from "../components/context/cardContext"; 
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

const CartSidebar = () => {
  const {
    items,                 
    removeFromCart,
    updateQuantity,
    cartItemCount,
    subtotal,
  } = useCart();

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSidebar = () => setIsOpen((v) => !v);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="relative p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Cart"
      >
        <span className="w-6 h-6 block">🛒</span>
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 p-4"
              onClick={toggleSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg text-black font-bold">
                  Your Cart ({cartItemCount})
                </h2>
                <button
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-black transition-colors"
                  aria-label="Close cart"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <p className="mb-4">Your cart is empty</p>
                    <Link
                      href="/allproducts"
                      onClick={toggleSidebar}
                      className="text-black underline hover:no-underline"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded">
                          <Link href="/detail">
                            <Image
                              src={item.image ?? "/placeholder.png"}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </Link>
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between text-gray-400">
                            <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label={`Remove ${item.name}`}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>

                          <p className="text-sm text-gray-600 mt-1">${item.price.toFixed(2)}</p>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-200 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="px-2 text-sm w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>

                            <p className="text-sm font-medium">
                              NGN{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-bold">NGN{subtotal.toFixed(2)}</span>
                  </div>
                  <Link href="/checkout-page" onClick={toggleSidebar}>
                    <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors">
                      Proceed to Checkout
                    </button>
                  </Link>
                  <Link href="/allproducts">
                    <button
                      onClick={toggleSidebar}
                      className="w-full mt-2 text-gray-800 py-3 border-2 border-black rounded transition-colors "
                    >
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;
