import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Award, Users, Zap, Target, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Intersection observer to trigger animations when section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset animation by setting to false first
            setIsVisible(false);
            // Then trigger animation
            setTimeout(() => {
              setIsVisible(true);
            }, 50);
          } else {
            // Reset when leaving viewport
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="home"
      ref={sectionRef}
      className="pt-32 pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-500 min-h-screen flex items-center"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 dark:bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 dark:bg-teal-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 dark:bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
  
            {/* Main Heading with Gradient Text */}
            <div className={`space-y-4 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-800 dark:text-white leading-tight">
                Pioneering{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                  Precision Tooling
                </span>
              </h1>
              
              {/* Innovation Tagline */}
              <div className="space-y-3">
                <p className={`text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-300 italic transition-all duration-1000 delay-500 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                  Where Innovation Meets Precision
                </p>
                <div className={`flex items-center space-x-2 transition-all duration-1000 delay-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                }`}>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full"></div>
                  <span className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200">Since 2003</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className={`text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Leading supplier of Advanced Cutting Tools across Tamil Nadu and Kerala, empowering engineering excellence.
            </p>
            
            {/* Enhanced Key Points Card with Glassmorphism */}
            <div className={`glass-card bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '1100ms' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 font-semibold">Precision Engineering</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 font-semibold">Operational Efficiency</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                We bring over two decades of application experience, continuously optimizing production and maximizing your manufacturing potential.
              </p>
            </div>

            {/* Enhanced Action Button - Centered */}
            <div className={`flex justify-center transition-all duration-1000 delay-1300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-12 py-4 bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-900 dark:hover:from-slate-700 dark:hover:to-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl dark:shadow-slate-900/50 transform hover:-translate-y-1 hover:scale-105 group"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>

            {/* Enhanced Stats */}
            <div className={`grid grid-cols-2 gap-12 pt-8 border-t border-slate-200/60 dark:border-slate-700/60 transition-all duration-1000 delay-1500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">20+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Years Experience</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300">100+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Proportional Image Section */}
          <div className={`relative transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Floating Glass Card Frame */}
            <div className="relative animate-float">
              {/* Subtle Glass Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-2xl"></div>
              
              {/* Main Image Container - Proportional to content */}
              <div className="relative aspect-[4/5] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl dark:shadow-slate-900/50 border-4 border-white/50 dark:border-slate-700/50 backdrop-blur-sm">
                <img
                  src="https://emitech.ae/wp-content/uploads/ISCAR-tools.jpg"
                  alt="ISCAR Cutting Tools - Precision Manufacturing Equipment"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent dark:from-black/50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
        
        .dark .glass-card {
          background: rgba(30, 41, 59, 0.6);
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .dark .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};

export default Hero;
