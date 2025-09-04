"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "../components/context/cardContext"; // (check this isn't a typo)
import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
import { CartItem } from "@/types";
import Image from "next/image";
import clsx from "clsx";
import { useCreateOrderMutation } from "@/features/order/orderApi";

type ErrorMap = Record<string, string>;

import { useRouter } from "next/navigation";

type CreateOrderInput = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
  };
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    currency: "NGN";
  };
  paymentMethod: "cash_on_delivery";
};

export default function CheckoutPage() {
  const { cart = [], cartItemCount } = useCart() || {};

  const totalItems =
    cart?.reduce((n: number, item: CartItem) => n + (item?.quantity || 0), 0) ??
    cartItemCount ??
    0;

  const subtotal = cart.reduce(
    (sum: number, item: CartItem) =>
      sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );
  const shipping = cart.length > 0 ? 5.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [createOrder, { isLoading: creating }] = useCreateOrderMutation();
  const router = useRouter();

  function validate(form: HTMLFormElement): ErrorMap {
    const fd = new FormData(form);
    const required = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
    ] as const;
    const next: ErrorMap = {};

    for (const name of required) {
      const val = String(fd.get(name) ?? "").trim();
      if (!val) next[name] = "This field is required.";
    }

    const email = String(fd.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }

    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Validate required fields
    const nextErrors = validate(form);
    if (cart.length === 0) {
      nextErrors["_cart"] = "Your cart is empty.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setShowErrorBanner(true);
      requestAnimationFrame(() => {
        bannerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        bannerRef.current?.focus();
      });
      return;
    }

    setShowErrorBanner(false);
    setErrors({});
    setIsSubmitting(true);

    // Build payload
    const fd = new FormData(form);
    const payload: CreateOrderInput = {
      customer: {
        firstName: String(fd.get("firstName") ?? ""),
        lastName: String(fd.get("lastName") ?? ""),
        email: String(fd.get("email") ?? ""),
        address: String(fd.get("address") ?? ""),
        city: String(fd.get("city") ?? ""),
      },
      items: cart.map((item) => ({
        productId: String(item.id),
        name: item.name,
        quantity: Number(item.quantity || 0),
        unitPrice: Number(item.price || 0),
      })),
      totals: {
        subtotal: Number(subtotal.toFixed(2)),
        shipping: Number(shipping.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        total: Number(total.toFixed(2)),
        currency: "NGN",
      },
      paymentMethod: "cash_on_delivery",
    };

    try {
      // Call RTKQ mutation
      const created = await createOrder(payload as any).unwrap();

      // Optional: redirect to a success page if you have one
      const createdId = (created as any)?.id ?? (created as any)?._id ?? "";
      alert("Order placed successfully!");
      if (createdId) {
        router.push(`/order/success?orderId=${createdId}`);
      } else {
        router.push(`/order/success`);
      }

      // TODO: clear cart here if your context exposes an action (e.g., clearCart())
    } catch (err: any) {
      // RTKQ error format: { data?: { message?: string | Record }, status?: number }
      console.error("Create order failed:", err);
      const apiMessage =
        err?.data?.message ||
        (typeof err?.data === "string" ? err.data : "") ||
        "Something went wrong placing your order.";
      setShowErrorBanner(true);
      setErrors({ _api: apiMessage });
      requestAnimationFrame(() => {
        bannerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        bannerRef.current?.focus();
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 sm:px-8 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/cart"
            className="flex items-center text-[#a77354] hover:text-black">
            <PiArrowLeft className="mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Checkout</h1>
          {/* Use computed totalItems here */}
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Right column — Summary */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </p>
                  </div>
                ))}
                {cart.length === 0 && (
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                )}
              </div>

              <div className="border-t border-gray-200 my-6" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span className="text-gray-600">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-600">₦{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-600">₦{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-600">₦{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span className="text-gray-600">₦{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit button is associated to the form via form attribute */}
              <Button
                form="checkout-form"
                type="submit"
                disabled={isSubmitting || creating || cart.length === 0}
                className="w-full mt-8 py-3 bg-[#a77354] hover:bg-[#8a5c40] text-white rounded-lg text-lg font-semibold shadow-lg transition-colors duration-300 disabled:opacity-60">
                {isSubmitting || creating
                  ? "Placing order..."
                  : "Complete Order"}
              </Button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Need Help?
              </h2>
              <p className="text-gray-600 mb-4">
                Contact our customer support team for assistance with your
                order.
              </p>
              <Button
                variant="outline"
                className="w-full text-[#a77354] border-[#a77354] hover:bg-[#f8f1eb]">
                Contact Support
              </Button>
            </div>
          </div>

          {/* Left column — Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 order-2 lg:order-1">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>

            {/* Error banner */}
            {showErrorBanner && (
              <div
                ref={bannerRef}
                tabIndex={-1}
                className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800"
                aria-live="assertive">
                <p className="font-semibold">
                  Please complete the order summary.
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {errors["_cart"] && <li>{errors["_cart"]}</li>}
                  {errors.firstName && <li>First Name: {errors.firstName}</li>}
                  {errors.lastName && <li>Last Name: {errors.lastName}</li>}
                  {errors.email && <li>Email: {errors.email}</li>}
                  {errors.address && (
                    <li>Delivery Address: {errors.address}</li>
                  )}
                  {errors.city && <li>City: {errors.city}</li>}
                </ul>
              </div>
            )}

            <form
              id="checkout-form"
              className="space-y-6"
              onSubmit={handleSubmit}
              noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input
                    id="first-name"
                    name="firstName"
                    type="text"
                    required
                    aria-invalid={Boolean(errors.firstName)}
                    className={clsx(
                      "text-gray-700",
                      errors.firstName &&
                        "border-red-500 focus-visible:ring-red-300"
                    )}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    id="last-name"
                    name="lastName"
                    type="text"
                    required
                    aria-invalid={Boolean(errors.lastName)}
                    className={clsx(
                      "text-gray-700",
                      errors.lastName &&
                        "border-red-500 focus-visible:ring-red-300"
                    )}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  className={clsx(
                    "text-gray-700",
                    errors.email && "border-red-500 focus-visible:ring-red-300"
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  aria-invalid={Boolean(errors.address)}
                  className={clsx(
                    "text-gray-700",
                    errors.address &&
                      "border-red-500 focus-visible:ring-red-300"
                  )}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required
                  aria-invalid={Boolean(errors.city)}
                  className={clsx(
                    "text-gray-700",
                    errors.city && "border-red-500 focus-visible:ring-red-300"
                  )}
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Payment Method
                </h2>
                <p className="text-red-700 mb-1">
                  Only Payment On Delivery Available For Now
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
