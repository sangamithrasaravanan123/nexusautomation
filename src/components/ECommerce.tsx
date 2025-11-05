import React from 'react';
import { ShoppingCart, Package, Truck, Clock, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from './useScrollAnimation';

const ECommerce = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  const features = [
    {
      icon: Package,
      title: 'Comprehensive Catalog',
      description: 'Access our full range of cutting tools and automation solutions'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Order anytime, anywhere with our always-available platform'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick shipping across Tamil Nadu and Kerala'
    }
  ];

  // Navigation function
  const navigateToEcommerce = () => {
    window.location.href = '/ecommerce'; // or use your router navigation
    // If using React Router: navigate('/ecommerce');
    // If using Next.js: router.push('/ecommerce');
  };

  return (
    <section 
      id="ecommerce"
      ref={ref}
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            {/* Header */}
            <div className={`space-y-4 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold">
                <ShoppingCart className="w-4 h-4" />
                <span>eCommerce Platform</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Advanced Manufacturing Tools, 
                <span className="text-slate-700 block">Just a Click Away</span>
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Access our comprehensive range of cutting tools and automation solutions anytime, anywhere. Our eCommerce platform makes it simple to find and order the products you need to keep your manufacturing operations running at peak efficiency.
              </p>
            </div>

            {/* Features */}
            <div className={`space-y-6 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-md ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
                  }`}
                  style={{ animationDelay: `${700 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{feature.title}</h3>
                    <p className="text-slate-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons - UPDATED */}
            <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              {/* Main Order Button - Now navigates to EcommercePage */}
              <button 
                onClick={navigateToEcommerce}
                className="inline-flex items-center justify-center px-10 py-4 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 group cursor-pointer"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Order Online
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              {/* Secondary button - can also link to ecommerce or contact */}
              <button
                onClick={navigateToEcommerce}
                className="inline-flex items-center justify-center px-10 py-4 bg-white/80 backdrop-blur-sm text-slate-700 font-semibold rounded-xl border border-slate-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <Package className="mr-2 w-5 h-5" />
                Browse Catalog
              </button>
            </div>

            {/* Trust Indicators - Made clickable too */}
            <div className={`bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/50 transition-all duration-1000 delay-1200 hover:bg-white/90 cursor-pointer ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} onClick={navigateToEcommerce}>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-slate-700 mb-1">1000+</div>
                  <div className="text-sm text-slate-600 font-medium">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-700 mb-1">Fast</div>
                  <div className="text-sm text-slate-600 font-medium">Delivery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-700 mb-1">20+</div>
                  <div className="text-sm text-slate-600 font-medium">Years Trust</div>
                </div>
              </div>
              
              {/* Add a subtle "Click to explore" indicator */}
              <div className="flex items-center justify-center mt-4 text-slate-500 text-sm">
                <span>Click to explore our catalog</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>

          {/* Image - Also made clickable */}
          <div className={`relative transition-all duration-1000 delay-400 cursor-pointer ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`} onClick={navigateToEcommerce}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src="https://img.freepik.com/premium-photo/measuring-tool-setting-cutters-checking-parts-cnc-milling-turning-machine_598320-2486.jpg"
                  alt="Cutting tools warehouse with CNC milling and turning machines"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Professional Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 to-transparent rounded-3xl"></div>
                
                {/* Click indicator overlay */}
                <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/10 rounded-3xl transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-slate-800 font-semibold text-sm">View Catalog</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className={`absolute -top-6 -right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 transition-all duration-1000 delay-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">In Stock</div>
                  </div>
                </div>
              </div>
              
              <div className={`absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 transition-all duration-1000 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Fast Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ECommerce;
