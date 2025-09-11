"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "../context/cardContext";

export default function CartModal() {
  // now these exist in the context
  const { isCartOpen, setIsCartOpen, items, subtotal } = useCart();

  return (
    <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
      <DialogContent className="sm:max-w-[480px] md:max-w-[650px] lg:max-w-[800px] h-[90vh] max-h-[700px] flex flex-col p-6 bg-white rounded-xl shadow-2xl">
        <DialogHeader className="pb-4 text-center">
          <DialogTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Your Shopping Cart
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600 mt-2">
            Review your selected items and proceed to checkout.
          </DialogDescription>
        </DialogHeader>

        <Separator className="mb-6 bg-gray-200" />

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow text-gray-500 p-8">
            {/* Empty state ... */}
            <Button onClick={() => setIsCartOpen(false)} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-4">
              <div className="space-y-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={
                          item.image || "/placeholder.svg?height=96&width=96"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow text-left">
                      <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xl font-extrabold text-gray-900 mt-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    {/* remove button here if you want */}
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
                onClick={() => setIsCartOpen(false)}
                variant="outline"
                className="flex-grow">
                Continue Shopping
              </Button>
              <Button className="flex-grow">Proceed to Checkout</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
