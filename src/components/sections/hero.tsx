import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
const Hero: React.FC = () => {
  const {
    user
  } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return <div className="bg-gradient-to-b from-accent to-background py-16 md:py-24">
      <div className="container-custom">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Left Content */}
          <div className="flex flex-col text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Find Your Perfect Job Match with <span className="text-transparent bg-clip-text bg-hero-gradient">SkillNavigator</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700">
              Enter your skills and discover companies and jobs that are looking for professionals just like you. Fast, simple, and effective job matching.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {user ? <Button asChild size="lg" className="bg-hero-gradient hover:opacity-90 transition-all duration-300 hover:scale-105">
                  <Link to="/search">Search Jobs</Link>
                </Button> : <>
                  <Button asChild size="lg" className="bg-hero-gradient hover:opacity-90 transition-all duration-300 hover:scale-105">
                    <Link to="/auth">Get Started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="hover:bg-accent/50 transition-all duration-300">
                    <Link to="/auth?mode=signin">Sign In</Link>
                  </Button>
                </>}
            </div>
            
            <div className="mt-12">
              <p className="text-sm text-gray-600 mb-4">Trusted by professionals from leading companies</p>
              <div className="flex flex-wrap gap-8 items-center">
                {['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook'].map((company, index) => <img key={company} src={`https://cdn-icons-png.flaticon.com/512/5969/${5969170 + index * 20}.png`} alt={company} className="h-8 opacity-50 hover:opacity-75 transition-opacity duration-300" loading="lazy" />)}
              </div>
            </div>
          </div>

          {/* Right Content - YouTube Video Embed */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm">
          <iframe
  className="w-full aspect-video rounded-2xl"src="https://www.youtube.com/embed/D0UnqGm_miA?autoplay=1&mute=1&loop=1&controls=0&playlist=D0UnqGm_miA"title="Dummy Video For Website"frameBorder="0"
  allowFullScreen
  allow="autoplay; encrypted-media; picture-in-picture"
  loading="lazy"
/>
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-accent/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;