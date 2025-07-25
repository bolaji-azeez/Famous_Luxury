"use client";

import React, { ReactNode } from "react";
import "./globals.css";
import Header from "./static/header";
import Footer from "./static/footer";
import { CartProvider } from "./components/context/cardContext";
import { usePathname } from "next/navigation";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  // List of routes where you don't want Header/Footer
  const hideHeaderFooter =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Store Name</title>
        <meta name="description" content="Your store description" />
      </head>
      <CartProvider>
        <body
          className="min-h-screen flex flex-col"
          style={{
            background: "linear-gradient(95deg, #000000 0%, #1A1A2E 100%)",
            color: "#ffffff",
          }}>
          {!hideHeaderFooter && <Header />}

          <main className="flex-grow">{children}</main>
          {!hideHeaderFooter && <Footer />}
        </body>
      </CartProvider>
    </html>
  );
}
