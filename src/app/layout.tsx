'use client';

import React, { ReactNode } from "react";
import "./globals.css";
import Header from "./static/header";
import Footer from "./static/footer";
import { CartProvider } from "./components/context/cardContext";
import CartSidebar from "./CartSidebar/page";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
          <Header />
         <CartSidebar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </CartProvider>
    </html>
  );
}
