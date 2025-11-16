import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, ArrowUp, Linkedin, Facebook, Instagram, Copy, Check, X } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('sangamithrasaravanan2003@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900 transition-colors duration-500 relative overflow-hidden border-t border-slate-200 dark:border-slate-700">
      {/* Background Decorative Elements - Only in Dark Mode */}
      <div className="absolute inset-0 opacity-0 dark:opacity-5">
        <div className="absolute -top-20 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={scrollToTop}
          className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-slate-200 dark:border-slate-700">
          
          {/* Brand - With Gradient */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
              NEXUS AUTOMATION
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs font-semibold tracking-wider">Where Innovation Meets Precision</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-widest">Contact</h3>
            
            <div className="flex gap-3 text-sm">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                23, 8th Street, Tatabad<br />Coimbatore - 641012
              </p>
            </div>

            <div className="flex gap-3 text-sm">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <a 
                href="mailto:nexusautomation.in@gmail.com"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                nexusautomation.in@gmail.com
              </a>
            </div>

            <div className="flex gap-3 text-sm">
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <a 
                href="tel:+919994094443"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                +91-99940 94443
              </a>
            </div>
          </div>

          {/* Social & Coverage */}
          <div className="space-y-6">
            {/* Social Links */}
            <div>
              <p className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest mb-3">Connect With Us</p>
              <div className="flex gap-2">
                <a 
                  href="https://www.linkedin.com/company/nexusautomationcbe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-200 dark:bg-slate-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/nexusautomation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-200 dark:bg-slate-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
            
                <a 
                  href="https://wa.me/919994094443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-200 dark:bg-slate-700 hover:bg-green-600 dark:hover:bg-green-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.057.574 4.033 1.564 5.724l-1.485 5.43 5.565-1.428C7.959 23.308 9.878 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.725-.514-5.285-1.41l-.854.219-2.922.749.762-2.78-.197-.898C1.642 15.887 1 13.978 1 12 1 6.925 5.925 2 12 2s11 4.925 11 11-4.925 11-11 11zm5.897-8.326c-.321-.163-1.901-.94-2.198-1.048-.297-.107-.514-.158-.73.158-.215.317-.836 1.048-.975 1.265-.138.216-.277.243-.595.079-.318-.162-1.343-.495-2.557-1.578-1.045-.928-1.75-2.074-1.956-2.391-.205-.317-.022-.488.154-.646.157-.154.35-.401.524-.6.174-.2.232-.343.348-.571.116-.228.058-.427-.029-.6-.087-.172-.73-1.754-.996-2.4-.255-.61-.512-.527-.73-.527-.188 0-.403-.005-.618-.005-.215 0-.565.082-.861.401-.297.32-1.131 1.103-1.131 2.687s1.159 3.116 1.32 3.333c.16.216 2.26 3.45 5.476 4.836 1.096.473 1.902.672 2.55.83.715.178 1.367.153 1.88.092.575-.068 1.762-.72 2.009-1.414.247-.695.247-1.29.173-1.413-.074-.122-.272-.195-.57-.334z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Coverage */}
            <div>
              <p className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest mb-3">Service Area</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Tamil Nadu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Kerala</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            © {currentYear} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 font-bold">NEXUS AUTOMATION</span>
          </p>
          
          {/* Developer Credit - Clickable with Underline */}
          <button
            onClick={() => setShowModal(true)}
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-semibold transition-colors cursor-pointer underline"
          >
            Developed by Sangamithra Saravanan
          </button>

          <p className="text-slate-500 dark:text-slate-500 text-xs">
            All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Modal Backdrop */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          {/* Modal */}
          <div 
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full z-50 relative animate-in fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 mb-2">
                  Sangamithra Saravanan
                </h3>
              </div>

              <div className="space-y-3">
                <p className="text-slate-700 dark:text-slate-200 text-sm font-semibold">Ping me at:</p>
                
                {/* Email Display Box */}
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                  <p className="text-slate-800 dark:text-slate-100 font-mono text-sm break-all">
                    sangamithrasaravanan2003@gmail.com
                  </p>
                </div>

                {/* Copy Button */}
                <button
                  onClick={copyEmail}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy Email
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
