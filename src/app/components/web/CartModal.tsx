"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../context/cardContext" // Make sure this path is correct based on your project structure

export default function CartModal() {
  const { isCartOpen, toggleCart, cart } = useCart()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Dialog open={isCartOpen} onOpenChange={toggleCart}>
      <DialogContent className="sm:max-w-[480px] md:max-w-[650px] lg:max-w-[800px] h-[90vh] max-h-[700px] flex flex-col p-6 bg-white rounded-xl shadow-2xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=closed]:fade-out-0 duration-300">
        <DialogHeader className="pb-4 text-center">
          <DialogTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Shopping Cart</DialogTitle>
          <DialogDescription className="text-lg text-gray-600 mt-2">
            Review your selected items and proceed to checkout.
          </DialogDescription>
        </DialogHeader>

        <Separator className="mb-6 bg-gray-200" />

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow text-gray-500 p-8">
            <svg
              className="w-20 h-20 mb-6 text-gray-300 animate-bounce-slow"
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
            <p className="text-xl font-semibold mb-4">Your cart feels a little light!</p>
            <p className="text-md text-center mb-6">Start adding some amazing products to fill it up.</p>
            <Button
              onClick={toggleCart}
              className="mt-4 bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-8 py-3 rounded-lg text-base font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-4">
              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg hover:border-gray-200"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={item.image || "/placeholder.svg?height=96&width=96"}
                        alt={item.name} // Assuming 'name' is the product title from your context
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow text-left">
                      <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-xl font-extrabold text-gray-900 mt-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-6 bg-gray-200" />

            <div className="flex justify-between items-center text-2xl font-extrabold text-gray-900 pb-4">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                onClick={toggleCart}
                variant="outline"
                className="flex-grow py-3 text-gray-700 border-gray-300 hover:bg-gray-100 bg-transparent rounded-lg text-base font-semibold transition-all duration-300"
              >
                Continue Shopping
              </Button>
              <Button className="flex-grow py-3 bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white rounded-lg text-base font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
