import { Plane } from "lucide-react";
import heroImage from "@/assets/hero-airplane.jpg";

const HeroSection = () => {
  return (
    <div className="relative min-h-[400px] bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center space-x-2 bg-card/90 backdrop-blur px-4 py-2 rounded-full mb-6 shadow-card">
          <Plane className="h-5 w-5 text-primary animate-float" />
          <span className="text-sm font-medium text-foreground">Kenya Airways</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-slide-in">
          Book Your Flight
          <span className="block text-primary">With Confidence</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-in">
          Experience the comfort and reliability of Kenya Airways. 
          Book your tickets online with our easy-to-use system.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground animate-slide-in">
          <div className="flex items-center space-x-2 bg-card/80 backdrop-blur px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-kenya-gold rounded-full"></div>
            <span>Executive Class</span>
          </div>
          <div className="flex items-center space-x-2 bg-card/80 backdrop-blur px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-kenya-blue rounded-full"></div>
            <span>Middle Class</span>
          </div>
          <div className="flex items-center space-x-2 bg-card/80 backdrop-blur px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
            <span>Economy Class</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;