import LuxuryShowcase, { Cases } from "./LuxuryShowcase";

const products: Cases[] = [
  {
    id: 1,
    name: "G-Shock Premium",
    description: "A rugged yet luxury wristwatch, built for extremes.",
    image: "/images/Gg.png",
    link: "/products/gshock-premium",
  },
  {
    id: 2,
    name: "Rolex Horizon",
    description: "Timeless elegance redefined in the Rolex Horizon.",
    image: "/images/glasses.png",
    link: "/products/rolex-horizon",
  },
  {
    id: 3,
    name: "Tag Heuer Carrera",
    description: "Performance meets luxury in every tick.",
    image: "/images/Two.png",
    link: "/products/tag-heuer-carrera",
  },
  {
    id: 4,
    name: "Cartier Santos",
    description: "Where French style meets watchmaking tradition.",
    image: "/images/artier4.png",
    link: "/products/cartier-santos",
  },
   {
    id: 5,
    name: "Tag Heuer Carrera",
    description: "Performance meets luxury in every tick.",
    image: "/images/Two.png",
    link: "/products/tag-heuer-carrera",
  },
];

export default function TrendingLuxuryShowcase() {
  return (
    <LuxuryShowcase
      products={products}
      title="Explore Iconic Luxury Watches"
      description="Handpicked timepieces that define legacy and precision."
      cardsPerPage={4}
     
    />
    
  );
}
