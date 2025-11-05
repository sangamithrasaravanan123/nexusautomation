import React, { useState, useEffect, useRef } from 'react';
import { Factory, Award, Users, MapPin } from 'lucide-react';

const About = () => {
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
      id="about"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 dark:bg-slate-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 dark:bg-slate-400 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Content Section - Centered */}
        <div className={`space-y-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Header - Centered */}
          <div className={`text-center space-y-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Excellence Since 2003</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white leading-tight">
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                NEXUS AUTOMATION
              </span>
            </h2>
          </div>
          
          {/* Stats Cards - Centered at Top */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="glass-card bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-1">2003</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Established</div>
            </div>
            <div className="glass-card bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-1">20+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Years Experience</div>
            </div>
          </div>

          {/* Content Paragraphs - Centered */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className={`text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '600ms' }}>
              Established in 2003, NEXUS AUTOMATION has grown into a trusted supplier of world-class cutting tools. We specialize in delivering high-performance tooling solutions including indexable inserts, solid carbide tools, tool holders, and advanced machining accessories which are designed to enhance precision, productivity, and cost-efficiency on the shop floor.
            </p>

            <p className={`text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '800ms' }}>
              As an authorized dealer of leading global cutting tool brands, we ensure our customers gain access to the latest advancements. Our team of experienced engineering professionals provides complete technical support, from tool selection and machining optimization to on-site evaluation and cost-saving recommendations.
            </p>
            
            <div className={`glass-card bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-blue-200/50 dark:border-blue-800/50 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '1000ms' }}>
              <p className="italic text-slate-700 dark:text-slate-300 text-lg leading-relaxed text-center">
                "Our driving force is straightforward: precision, reliability and genuine commitment to our customers success."
              </p>
            </div>
          </div>

          {/* Features Grid - Centered */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`} style={{ transitionDelay: '1200ms' }}>
            {[
              { icon: Factory, title: "Advanced Manufacturing", desc: "Cutting-edge solutions" },
              { icon: Award, title: "Quality Assured", desc: "Premium brands" },
              { icon: Users, title: "Expert Team", desc: "Skilled engineers" },
              { icon: MapPin, title: "Strategic Location", desc: "TN & Kerala" }
            ].map((feature, index) => (
              <div
                key={index}
                className={`glass-card bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-5 rounded-xl shadow-md dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-105 transition-all duration-500 group text-center ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${1400 + index * 100}ms` }}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <feature.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
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

export default About;
