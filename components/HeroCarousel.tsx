import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// --- CONFIGURATION ---
const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1580281657521-7c8e6e4b70f9?q=80&w=2600&auto=format&fit=crop",
    title: "Expert Pain Management",
    subtitle: "Regain your mobility and reclaim your life with specialized care."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2600&auto=format&fit=crop",
    title: "Advanced Medical Treatment",
    subtitle: "State-of-the-art diagnostic and therapeutic procedures."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2600&auto=format&fit=crop",
    title: "Compassionate Care",
    subtitle: "Your well-being is our top priority at every step of recovery."
  }
];

const AUTOPLAY_DELAY = 6000;

const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play Logic
  useEffect(() => {
    if (SLIDES.length <= 1) return; // Don't autoplay if single slide

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  // Defensive check for empty content
  if (!SLIDES || SLIDES.length === 0) return <div className="h-screen bg-gray-900" />;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Image with Ken Burns Effect */}
          <motion.img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            className="w-full h-full object-cover opacity-60"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 8, ease: "linear" }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 md:px-20">
        <div className="max-w-4xl mx-auto overflow-hidden">
             <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                    {SLIDES[current].title}
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    {SLIDES[current].subtitle}
                    </p>
                    <a
                    href="#contact"
                    className="inline-block px-8 py-4 bg-primary hover:bg-secondary text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(15,118,110,0.5)] hover:shadow-[0_0_30px_rgba(15,118,110,0.7)] transform hover:-translate-y-1"
                    >
                    Consult Now
                    </a>
                </motion.div>
            </AnimatePresence>
        </div>
      </div>

      {/* Controls - Only show if more than 1 slide */}
      {SLIDES.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/30 text-white/70 hover:bg-white/10 hover:text-white transition-all z-20 hidden md:block"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/30 text-white/70 hover:bg-white/10 hover:text-white transition-all z-20 hidden md:block"
          >
            <ChevronRight size={32} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === current ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;