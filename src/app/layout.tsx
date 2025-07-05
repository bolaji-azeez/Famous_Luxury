import React, { ReactNode } from "react";
import "./globals.css";


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">{children}</body>
    </html>
  );
}
