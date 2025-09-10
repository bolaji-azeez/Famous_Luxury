import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/dmrqqaapc/image/upload/v1756733099/ecommerce_products/" },
    ],
  },
};

export default nextConfig;
