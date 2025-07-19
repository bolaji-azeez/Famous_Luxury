"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "../components/context/cardContext";
import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
import { CartItem } from "@/types";

export default function CheckoutPage() {
   const { cart = [], cartItemCount = 0 } = useCart() || {};
  
  // Safely calculate totals
  const subtotal = (cart || []).reduce(
    (sum: number, item: CartItem) => sum + (item?.price || 0) * (item?.quantity || 0), 
    0
  );
  const shipping = 5.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/cart" className="flex items-center text-[#a77354] hover:text-black">
            <PiArrowLeft className="mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Checkout</h1>
          <p className="text-gray-600">{cartItemCount} items in your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input id="first-name" type="text" required />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input id="last-name" type="text" required />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input id="email" type="email" required />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Address
                </label>
                <Input id="address" type="text" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <Input id="city" type="text" required />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <Input id="zip" type="text" required />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                <RadioGroup defaultValue="card" className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="card" id="card" />
                    <label htmlFor="card" className="text-sm font-medium leading-none">
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <label htmlFor="paypal" className="text-sm font-medium leading-none">
                      PayPal
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        {/* Replace with your Image component */}
                        <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-8 py-3 bg-[#a77354] hover:bg-[#8a5c40] text-white rounded-lg text-lg font-semibold shadow-lg transition-colors duration-300">
                Complete Order
              </Button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-4">
                Contact our customer support team for assistance with your order.
              </p>
              <Button variant="outline" className="w-full text-[#a77354] border-[#a77354] hover:bg-[#f8f1eb]">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}