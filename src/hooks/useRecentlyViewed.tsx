"use client";
import { useState, useEffect, useCallback } from "react";

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  // Add a new product to the recently viewed list
  const addProduct = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      const updated = [
        product,
        ...prev.filter((p) => p.id !== product.id),
      ].slice(0, 6);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recentlyViewed, addProduct };
}
