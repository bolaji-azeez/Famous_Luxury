import React, { ReactNode } from "react";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className="95deg,
  #000000 0%,
  #1A1A2E 100%"
        cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
