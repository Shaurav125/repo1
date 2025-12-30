import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle } from 'lucide-react';

// --- CONFIGURATION ---
const CONTENT = {
  heroImage: "https://images.unsplash.com/photo-1584467735871-b0e87b74c1f4?q=80&w=1600&auto=format&fit=crop",
  badgeTitle: "Pain Free Life",
  badgeSubtitle: "Proven track record",
  sectionLabel: "Specialized Treatment",
  headingFirst: "Comprehensive Care for",
  headingHighlight: "Chronic Pain",
  description: "We specialize in diagnosing and treating chronic back pain, knee pain, headaches, and complex facial pain syndromes. Our approach combines advanced medical technology with personalized care plans to restore your quality of life.",
  treatmentsList: [
    'Chronic Back Pain',
    'Knee Joint Pain',
    'Migraine & Headaches',
    'Sciatica',
    'Facial Pain (Trigeminal)',
    'Sports Injuries'
  ],
  ctaText: "Explore Treatments"
};

const TreatmentHero: React.FC = () => {
  return (
    <section id="treatments" className="py-20 md:py-32 bg-medical-bg-teal overflow-hidden border-t border-teal-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={CONTENT.heroImage}
                alt="Back Pain Treatment"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-medical-teal-dark/30 to-transparent pointer-events-none" />
            </div>
            
            {/* Floating Card */}
            <div 
              className="animate-float absolute -bottom-8 -right-4 md:-right-8 bg-white p-6 rounded-xl shadow-xl border border-teal-50 max-w-xs hidden md:block z-20"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-teal-100 text-medical-teal rounded-full">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{CONTENT.badgeTitle}</h4>
                  <p className="text-xs text-gray-500">{CONTENT.badgeSubtitle}</p>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-medical-teal w-4/5 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-medical-teal font-bold tracking-wider uppercase text-sm mb-2 block">
              {CONTENT.sectionLabel}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {CONTENT.headingFirst} <br />
              <span className="animate-gradient-teal relative inline-block font-extrabold pb-2">
                {CONTENT.headingHighlight}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-medical-teal/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {CONTENT.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {CONTENT.treatmentsList.map((item) => (
                <div key={item} className="flex items-center gap-3 text-gray-800">
                  <CheckCircle size={20} className="text-medical-teal flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="px-8 py-3 bg-medical-teal text-white font-semibold rounded-lg hover:bg-medical-teal-dark transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 group transform hover:-translate-y-1">
              {CONTENT.ctaText} 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentHero;