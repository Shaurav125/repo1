import React, { useState, useEffect } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';

// --- CONFIGURATION ---
const NAV_CONFIG = {
  brandName: "Dr. Mithilesh",
  brandSubtitle: "Pain Specialist",
  links: [
    { name: 'Home', href: '#' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ]
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Edge Case: Handle Resize (Close mobile menu if switching to desktop view)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group z-50 relative">
          <div className="p-2.5 bg-primary rounded-xl text-white group-hover:bg-secondary transition-colors shadow-lg">
            <Stethoscope size={28} />
          </div>
          <div className="flex flex-col">
            <span className={`block font-serif font-bold text-2xl md:text-3xl leading-none tracking-tight transition-colors ${scrolled || isOpen ? 'text-gray-900' : 'text-gray-900 lg:text-white'}`}>
              {NAV_CONFIG.brandName}
            </span>
            <span className={`text-xs md:text-sm uppercase tracking-[0.2em] font-medium mt-1 transition-colors ${scrolled || isOpen ? 'text-gray-500' : 'text-gray-600 lg:text-blue-100'}`}>
              {NAV_CONFIG.brandSubtitle}
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {NAV_CONFIG.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-base font-medium tracking-wide transition-all relative hover:opacity-100 opacity-90
                ${scrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-blue-100'}
                group py-2
              `}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${scrolled ? 'bg-primary' : 'bg-white'}`}></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-gray-800 focus:outline-none z-50 relative rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X size={32} className="text-gray-900" />
          ) : (
            <Menu size={32} className={scrolled ? 'text-gray-900' : 'text-gray-900 lg:text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-10 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center space-y-8">
          {NAV_CONFIG.links.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-serif font-bold text-gray-900 hover:text-primary transition-colors transform hover:-translate-y-1"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;