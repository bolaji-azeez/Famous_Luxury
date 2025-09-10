// Define a type for the product that will be stored
type RecentlyViewedProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  // You can add other properties that your product object has
};

export const saveToRecentlyViewed = (product: RecentlyViewedProduct) => {
  if (!product || !product.id) return;

  const storedItems: RecentlyViewedProduct[] = JSON.parse(
    localStorage.getItem("recentlyViewed") || "[]"
  );

  // Remove duplicate entries
  const updated = [
    product,
    ...storedItems.filter((p: RecentlyViewedProduct) => p.id !== product.id),
  ].slice(0, 8);

  localStorage.setItem("recentlyViewed", JSON.stringify(updated));
};

export const getRecentlyViewed = () => {
  return JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
};