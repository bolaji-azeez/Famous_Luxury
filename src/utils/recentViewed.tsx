export const saveToRecentlyViewed = (product: any) => {
  if (!product || !product.id) return;

  const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

  // Remove duplicate entries
  const updated = [product, ...stored.filter((p: any) => p.id !== product.id)].slice(0, 8);

  localStorage.setItem("recentlyViewed", JSON.stringify(updated));
};
