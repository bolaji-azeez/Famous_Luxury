import { Button } from "@/components/ui/button";
import { HeroSlider } from "./HeroSlider";
import { ArrowRight} from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroSlider />
  
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto px-6 animate-fade-in">
          
          
          <h1 className="text-5xl md:text-7xl font-bold text-luxury-light mb-6 leading-tight">
            Luxury <span className="text-[#fcc330]">Timepieces</span>
            <br />
            & <span className="text-[#fcc330]">Eyewear</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-luxury-light/80 mb-8 max-w-4xl mx-auto text-[#ffffff]">
            Discover our curated collection of premium watches and designer glasses. 
            Where craftsmanship meets elegance.
            Elevate your style with timeless pieces from world-renowned brands.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="default" size="lg" className=" bg:translate-x-1 transition-transform">
              Shop Watches
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="default" size="lg" className=" bg:translate-x-1 transition-transform">
              Shop Glasses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-luxury-light/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-luxury-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};