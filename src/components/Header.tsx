import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Track active section
      const sections = ['about', 'solutions', 'services', 'suppliers', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { name: 'Home', href: '/', type: 'link' },
    { name: 'About', href: '#about', type: 'scroll' },
    { name: 'Solutions', href: '#solutions', type: 'scroll' },
    { name: 'Services', href: '#services', type: 'scroll' },
    { name: 'Suppliers', href: '#suppliers', type: 'scroll' },
    { name: 'Contact', href: '#contact', type: 'scroll' },
  ];

  const handleNavClick = (item) => {
    setIsMenuOpen(false);
    if (item.type === 'scroll' && location.pathname !== '/') {
      window.location.href = '/' + item.href;
    }
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@700&display=swap');
        
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-slide-down {
          animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .logo-float:hover {
          animation: float 1s ease-in-out infinite;
        }
        
        .theme-toggle-icon {
          transition: transform 0.3s ease;
        }
        
        .theme-toggle-icon.rotating {
          animation: rotate 0.5s ease-in-out;
        }
        
        .nav-link {
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #2563eb;
          transform: translateX(-50%);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .dark .nav-link::before {
          background: #60a5fa;
        }
        
        .nav-link:hover::before,
        .nav-link.active::before {
          width: 80%;
        }

        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          letter-spacing: 0.08em;
        }

        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .dark .glass-morphism {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(51, 65, 85, 0.3);
        }
        
        .mobile-menu-enter {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .ripple-effect {
          position: relative;
          overflow: hidden;
        }
        
        .ripple-effect::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(37, 99, 235, 0.5);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1);
          transform-origin: center;
        }
        
        .dark .ripple-effect::after {
          background: rgba(96, 165, 250, 0.5);
        }
        
        .ripple-effect:active::after {
          animation: ripple 0.6s ease-out;
        }
      `}</style>

      <header className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-2' 
          : 'py-4'
      }`}>
        <div className={`mx-auto transition-all duration-500 ${
          isScrolled ? 'max-w-7xl px-6' : 'max-w-7xl px-6'
        }`}>
          <nav className={`glass-morphism rounded-2xl shadow-2xl transition-all duration-500 px-6 py-4 ${
            isScrolled ? 'shadow-xl' : ''
          }`}>
            <div className="flex justify-between items-center">
              {/* Logo Section */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative logo-float">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-110">
                    <img
                      src="/nexus.jpg"
                      alt="Nexus"
                      className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl logo-text font-bold tracking-tight text-slate-800 dark:text-white transition-colors duration-300">
                    NEXUS AUTOMATION
                  </h1>
                </div>
                </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href || 
                                 (item.type === 'scroll' && activeSection === item.href.replace('#', ''));
                  
                  return (
                    <div key={item.name} className="animate-slide-down" style={{ animationDelay: `${index * 0.05}s` }}>
                      {item.type === 'link' ? (
                        <Link
                          to={item.href}
                          className={`nav-link ripple-effect px-5 py-2.5 font-medium text-sm rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'text-blue-600 dark:text-blue-400 active bg-blue-50/50 dark:bg-blue-900/20' 
                              : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => handleNavClick(item)}
                          className={`nav-link ripple-effect px-5 py-2.5 font-medium text-sm rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'text-blue-600 dark:text-blue-400 active bg-blue-50/50 dark:bg-blue-900/20' 
                              : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  );
                })}
                
                {/* Theme Toggle Button - Desktop */}
                <button
                  onClick={toggleTheme}
                  className="ml-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-amber-500 theme-toggle-icon" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-700 theme-toggle-icon" />
                  )}
                </button>
              </div>

              {/* Mobile Menu Button & Theme Toggle */}
              <div className="lg:hidden flex items-center space-x-2">
                {/* Theme Toggle Button - Mobile */}
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl glass-morphism hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-amber-500 theme-toggle-icon" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300 theme-toggle-icon" />
                  )}
                </button>
                
                <button
                  className="p-3 rounded-xl glass-morphism hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  ) : (
                    <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="lg:hidden mt-6 mobile-menu-enter">
                <div className="flex flex-col space-y-2 pb-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => handleNavClick(item)}
                        className={`block px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                            : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
