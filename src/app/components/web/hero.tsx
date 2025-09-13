import { Button } from "@/components/ui/button";
import { HeroSlider } from "./HeroSlider";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Text Content - First on mobile, Right on desktop */}
        <div className="flex items-center justify-center px-6 lg:px-12 py-12 lg:py-0 order-1 lg:order-2 min-h-[50vh] lg:min-h-screen">
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Luxury <span className="text-[#a97254]">Timepieces</span>
              <br />& <span className="text-[#a97254]">Eyewear</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover our curated collection of premium watches and designer
              glasses. Where craftsmanship meets elegance. Elevate your style
              with timeless pieces from world-renowned brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="default"
                size="lg"
                className="hover:translate-x-1 transition-transform">
                <a href="/shop" className="group flex items-center">
                  Explore our collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Image Slider - Second on mobile, Left on desktop */}
        <div className="relative overflow-hidden order-2 lg:order-1 min-h-[50vh] lg:min-h-screen">
          <HeroSlider />
        </div>
      </div>
    </section>
  );
};