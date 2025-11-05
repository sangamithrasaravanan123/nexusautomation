import React, { useState, useEffect, useRef } from 'react';
import { Cog, TrendingUp, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const Solutions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentImageSlide, setCurrentImageSlide] = useState(0);
  const sectionRef = useRef(null);

  const solutions = [
    {
      icon: Cog,
      title: 'Advanced Tooling Solutions',
      description: 'We supply high-precision cutting tools for turning, milling, drilling, and grooving — improving productivity, minimizing wear, and tackling demanding machining tasks efficiently.'
    },
    {
      icon: TrendingUp,
      title: 'Technology-Driven Product Innovation',
      description: 'Through global brand partnerships, we provide the latest insert geometries, advanced coatings, and optimized cutting solutions for modern CNC applications.'
    },
    {
      icon: Shield,
      title: 'Trusted Quality & Performance',
      description: 'All supplied tools meet strict quality standards, ensuring durability, consistent accuracy, and better surface finish with reduced downtime and tooling costs.'
    },
    {
      icon: Zap,
      title: 'Quick Supply & Technical Support',
      description: 'Our strong local inventory and expert engineering team ensure fast delivery, correct tool selection, and smooth adoption into existing machining processes.'
    }
  ];

  const carouselImages = [
    {
      url: "https://emitech.ae/wp-content/uploads/ISCAR-tools.jpg",
      alt: "Advanced Cutting Tools - Premium Quality Tools"
    },
    {
      url: "https://geetatools.com/images/resource/R3.png",
      alt: "Precision Manufacturing Equipment"
    },
    {
      url: "https://img.freepik.com/premium-photo/measuring-tool-setting-cutters-checking-parts-cnc-milling-turning-machine_598320-2486.jpg",
      alt: "CNC Milling and Turning Machines"
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8OC3d30XJJTBN9SiEnvM4GGZxTBp6a-iHrQ&s",
      alt: "Professional Tooling Solutions"
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0A9oI0y-wgcMPArxHXxQDUYLe_HsiGeTJyw&s",
      alt: "Advanced Manufacturing Technology"
    },
  ];

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
            setTimeout(() => {
              setIsVisible(true);
            }, 50);
          } else {
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

  // Auto-play image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextImageSlide = () => {
    setCurrentImageSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImageSlide = () => {
    setCurrentImageSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section 
      id="solutions"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-600 dark:bg-slate-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-500 dark:bg-slate-400 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center space-y-4 mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white leading-tight">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
              Solutions
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            NEXUS AUTOMATION ensures reliable access to high-performance cutting tools designed to meet the increasingly complex machining requirements of today's industry.
          </p>
        </div>

        {/* Main Content Grid - Center vertically aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Text Grid - Left Section */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="space-y-5">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className={`glass-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${400 + index * 120}ms` : '0ms'
                  }}
                >
                  {/* Icon and Content Container */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <solution.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-slate-800 dark:text-white mb-2 leading-tight">{solution.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Carousel - Right Section - Centered Vertically */}
          <div className={`transition-all duration-1000 delay-500 flex items-center justify-center ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative w-full max-w-lg">
              {/* Carousel Container */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl dark:shadow-slate-900/50 border-4 border-white/50 dark:border-slate-700/50 group">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentImageSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-black/60"></div>
                  </div>
                ))}

                {/* Navigation Buttons */}
                <button
                  onClick={prevImageSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>
                
                <button
                  onClick={nextImageSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentImageSlide
                          ? 'w-8 h-2 bg-white dark:bg-slate-300'
                          : 'w-2 h-2 bg-white/50 dark:bg-slate-500/50 hover:bg-white/80 dark:hover:bg-slate-400/80'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Image Counter */}
              <div className="mt-6 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
                {currentImageSlide + 1} / {carouselImages.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
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

export default Solutions;
