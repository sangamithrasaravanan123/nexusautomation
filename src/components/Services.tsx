import React, { useState, useEffect, useRef } from 'react';
import { Package, Users, TrendingUp, Award, CheckCircle, DollarSign, Target, Zap } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRef = useRef(null);

  const mainServices = [
    {
      icon: Package,
      title: 'Tool Supply & Distribution',
      description: 'Wide range of cutting tools including indexable inserts, tool holders, carbide drills, end mills, and special tools for every machining requirement.'
    },
    {
      icon: Users,
      title: 'Application Support & Tool Selection',
      description: 'Expert engineering team recommending the right tools based on material, cutting parameters, and machining goals to improve tool life and quality.'
    },
    {
      icon: TrendingUp,
      title: 'On-Site Trials & Technical Assistance',
      description: 'Shop floor support with tool trials, performance validation, and solutions to achieve better efficiency and consistent accuracy.'
    },
    {
      icon: Award,
      title: 'Tooling Consultancy',
      description: 'Practical consultancy focused on cost optimization, productivity improvement, tooling strategy, and cycle time reduction.'
    }
  ];

  const consultancyPoints = [
    { label: 'Cost-per-component optimization', icon: DollarSign },
    { label: 'Productivity improvement', icon: TrendingUp },
    { label: 'Tooling strategy selection', icon: Target },
    { label: 'Cycle time reduction', icon: Zap }
  ];

  const whyChooseUs = [
    { label: '20+ Years Serving CNC & manufacturing', icon: Award },
    { label: 'Strong Partnerships with trusted brands', icon: Users },
    { label: 'Reliable Delivery with dedicated support', icon: CheckCircle }
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
      { threshold: 0.1, rootMargin: '0px' }
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
      id="services"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-500"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-600 dark:bg-slate-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-500 dark:bg-slate-400 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-6">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
              Services
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Complete tooling supply and expert machining support to enhance productivity
          </p>
        </div>

        {/* Services - Simple 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className={`glass-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms' }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{service.title}</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Consultancy Section */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-slate-800 dark:text-white mb-12 text-center">
            Tooling Consultancy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultancyPoints.map((point, index) => (
              <div
                key={index}
                className={`glass-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-xl shadow-lg dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: isVisible ? `${700 + index * 100}ms` : '0ms' }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <point.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{point.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className={`glass-card bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 p-12 rounded-2xl shadow-xl text-white text-center mb-20 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-3xl font-bold text-white mb-4">Dedicated Customer Support</h3>
          <p className="text-lg text-white/95 max-w-2xl mx-auto mb-4">
            Beyond supply, we stay connected — ensuring smooth operations, quick resolution of issues, and continuous improvement.
          </p>
          <p className="text-white/85 italic">Our goal: help you produce more, waste less, and improve profitability.</p>
        </div>

        {/* Why Choose Us */}
        <div className={`transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-4xl font-bold text-slate-800 dark:text-white mb-12 text-center">
            Why NEXUS AUTOMATION?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className={`glass-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: isVisible ? `${1100 + index * 100}ms` : '0ms' }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};

export default Services;
