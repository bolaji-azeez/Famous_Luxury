import React from "react";
import TrendingLuxuryShowcase from "./TrendingLuxuryShowcase";
import { ChevronRight } from "lucide-react";


const BestSeller = () => {
  return (
    <div className="width-full h-full flex flex-col items-center justify-center bg-gray-100 p-8 py-16 lg:py-16 gap-6">
     
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">
          Trending Products
        </h2>
      
      <div className="flex  justify-center items-center">
        <TrendingLuxuryShowcase />
      </div>
      <h3 className="font-semibold text-lg text-[#4A5568] transition-all duration-300 flex items-center gap-3 hover:gap-4 hover:text-[black] text-center mt-8 hover:underline">
        Discover collections
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 " />
      </h3>
    </div>
  );
};

export default BestSeller;
