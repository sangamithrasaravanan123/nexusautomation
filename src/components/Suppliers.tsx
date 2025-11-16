import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';


const Suppliers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRef = useRef(null);


  const suppliers = [
    {
      name: 'ISCAR',
      url: 'https://www.iscar.com/',
      logo: 'https://cdn.brandfetch.io/iscar.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed',
      description: 'World leader in metalworking and cutting tool solutions with innovative technology',
      specialties: ['Cutting Tools', 'Milling', 'Turning', 'Threading']
    },
    {
      name: 'Ingersoll Cutting Tools',
      url: 'https://www.ingersoll-imc.com/',
      logo: '/ingersol.jpeg',
      description: 'Premium cutting tools engineered for demanding aerospace and automotive applications',
      specialties: ['High-Performance Tools', 'Aerospace', 'Automotive', 'Medical']
    },
    {
      name: 'Master Fluids',
      url: 'https://www.masterfluids.com/',
      logo: '/master.jpeg',
      description: 'Advanced metalworking fluids and chemical solutions for optimal machining performance',
      specialties: ['Metalworking Fluids', 'Coolants', 'Lubricants', 'Chemical Solutions']
    },
    /*{
      name: 'Spectra Tools',
      url: 'http://spectratools.in/',
      logo: '/spectra.jpg',
      description: "One of India's leading cutting tool manufacturers, known for precision-engineered tooling.",
      specialties: [
        'Precision Cutting Tools',
        'Custom Tool Design',
        'Tooling Solutions',
        'High-Performance Reamers'
      ]
    }*/
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
      id="suppliers"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Pattern */}
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
              Trusted Partners
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We partner with industry-leading manufacturers who share our commitment to quality, innovation, and technical excellence. These trusted brands deliver cutting-edge solutions for precision machining.
          </p>
        </div>


        {/* Suppliers Grid - Centered for 3 items */}
        <div className={`flex justify-center mb-24 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
            {suppliers.map((supplier, index) => (
              <div
                key={index}
                className={`glass-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: isVisible ? `${400 + index * 100}ms` : '0ms' }}
              >
                {/* Logo Section */}
                <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 p-6 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={supplier.logo}
                    alt={`${supplier.name} logo`}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>


                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Title and Link */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">{supplier.name}</h3>
                    {supplier.url !== '#' && (
                      <a
                        href={supplier.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all duration-300 flex-shrink-0 ml-2 group-hover:scale-110"
                      >
                        <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </a>
                    )}
                  </div>


                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 flex-1">
                    {supplier.description}
                  </p>


                  {/* Specialties */}
                  <div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Specialties</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800/50"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Partnership CTA - Simplified */}
        <div className={`glass-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-12 shadow-lg dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 text-center transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
            Interested in Partnering With Us?
          </h3>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto">
            We're open to collaborating with premium cutting tool manufacturers who value quality and reliable technical support. Let's grow together and deliver the best machining solutions to our customers.
          </p>
          
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 gap-2"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </a>
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


export default Suppliers;
