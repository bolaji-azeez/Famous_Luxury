// data/watches.ts

// watches.ts
export interface Watch {
  id: string;
  name: string;
  description: string;
  amount: number;
  initialImage: string; // Make sure this exists
  hoverImage: string; // And this too
}

export const watches: Watch[] = [
  {
    id: "1",
    name: "Classic Chronograph",
    initialImage: "/placeholder.svg?height=300&width=300&text=Smart+Watches",
    hoverImage: "/images/watch1_hover.jpg",
    amount: 499.99,
    description:
      "A sophisticated timepiece with precise chronograph functionality and a timeless design.",
  },
  {
    id: "2",
    name: "Minimalist Elite",
    initialImage: "/placeholder.svg?height=300&width=300&text=Smart+Watches",
    hoverImage: "/images/watch2_hover.jpg",
    amount: 349.99,
    description:
      "Elegance in simplicity. This watch offers a clean, uncluttered dial for the modern minimalist.",
  },
  {
    id: "3",
    name: "Sport Master Pro",
    initialImage: "/placeholder.svg?height=300&width=300&text=Smart+Watches",
    hoverImage: "/images/watch3_hover.jpg",
    amount: 679.99,
    description:
      "Built for performance and durability. Perfect for the active individual with robust features.",
  },
  {
    id: "4",
    name: "Luxury Diver",
    initialImage: "/placeholder.svg?height=300&width=300&text=Smart+Watches",
    hoverImage: "/images/watch4_hover.jpg",
    amount: 899.99,
    description:
      "Dive into luxury with this high-performance water-resistant watch, perfect for adventurers.",
  },
  {
    id: "5",
    name: "Vintage Explorer",
    initialImage: "/placeholder.svg?height=300&width=300&text=Smart+Watches",
    hoverImage: "/images/watch5_hover.jpg",
    amount: 529.99,
    description:
      "Rediscover classic charm. A vintage-inspired watch designed for the modern explorer.",
  },
  {
    id: "6",
    name: "Smart Hybrid",
    initialImage: "/placeholder.svg?height=300&width=300&text=Smart+Watches",
    hoverImage: "/images/watch6_hover.jpg",
    amount: 429.99,
    description:
      "The best of both worlds. Combines traditional watch aesthetics with smart features.",
  },
];

// Placeholder images - you'll need to add these to your public/images folder
// For example:
// public/images/watch1_initial.jpg
// public/images/watch1_hover.jpg
// ... and so on for all watches
