"use client";
import { usePathname } from "next/navigation";
import Header from "./static/header";
import Footer from "./static/footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
