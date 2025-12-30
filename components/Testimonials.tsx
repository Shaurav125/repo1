import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

// --- CONFIGURATION ---
const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "Life-changing experience. Dr. Kumar identified the root cause of my pain when others couldn't.",
    author: "Rajesh Sharma",
    role: "IT Professional",
    rating: 5
  },
  {
    id: 2,
    quote: "Highly professional & knowledgeable. The treatment plan was effective and minimally invasive.",
    author: "Anjali Verma",
    role: "Teacher",
    rating: 5
  },
  {
    id: 3,
    quote: "Finally pain-free after years of struggle. I can play with my grandkids again.",
    author: "Suresh Gupta",
    role: "Retired Army Officer",
    rating: 5
  },
  {
    id: 4,
    quote: "Best pain specialist in Delhi. The clinic environment is so calming and supportive.",
    author: "Neha Kapoor",
    role: "Architect",
    rating: 5
  },
  {
    id: 5,
    quote: "I was skeptical about pain management, but the results speak for themselves. Truly grateful.",
    author: "Amit Malhotra",
    role: "Entrepreneur",
    rating: 5
  },
  {
    id: 6,
    quote: "The facility is world-class and the staff is extremely caring. Highly recommended.",
    author: "Priya Singh",
    role: "Homemaker",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Guard: Don't animate if no data or no refs
    if (!TESTIMONIALS_DATA.length || !trackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      const progressBar = progressBarRef.current;

      if (!track || !section) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Calculate the distance the track needs to move
        // Track width - Viewport width + padding
        const scrollAmount = Math.max(0, track.scrollWidth - window.innerWidth + 100); 

        // Horizontal Scroll Animation
        gsap.to(track, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBar) {
                gsap.set(progressBar, { width: `${self.progress * 100}%` });
              }
            }
          }
        });
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (TESTIMONIALS_DATA.length === 0) return null;

  return (
    <section ref={sectionRef} id="testimonials" className="bg-trust-dark text-white relative overflow-hidden border-t border-slate-800">
        
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-trust-blue/10 rounded-full blur-[80px]" />
      </div>

      {/* Title Section */}
      <div className="lg:absolute lg:top-24 lg:left-24 z-20 px-6 pt-20 lg:pt-0 pointer-events-none">
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Patient Stories
        </h2>
        <div className="h-1 w-24 bg-action-amber mb-4 rounded-full" />
        <p className="text-slate-300 text-lg md:text-xl max-w-md font-light">
          Real stories of recovery and relief from our valued patients.
        </p>
      </div>

      {/* Desktop Wrapper (Horizontal Scroll Track) */}
      <div className="hidden lg:flex h-screen items-center relative overflow-hidden">
        <div ref={trackRef} className="flex gap-8 px-[600px] items-center">
          {TESTIMONIALS_DATA.map((item) => (
            <div 
              key={item.id} 
              className="w-[450px] flex-shrink-0 group relative"
            >
              <div className="bg-slate-800/40 backdrop-blur-md p-10 rounded-3xl border border-slate-700/50 hover:bg-slate-800/60 hover:border-trust-blue/30 transition-all duration-300 shadow-2xl transform hover:-translate-y-2">
                <div className="absolute -top-6 -right-6 text-trust-blue/30 group-hover:text-trust-blue/50 transition-colors">
                  <Quote size={120} />
                </div>
                
                <div className="flex gap-1 mb-6">
                    {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={18} className="fill-action-amber text-action-amber" />
                    ))}
                </div>

                <p className="text-xl font-light italic mb-8 leading-relaxed text-slate-100 relative z-10">
                  "{item.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center font-bold text-xl shadow-lg border border-white/10 text-white">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-white">{item.author}</h5>
                    <span className="text-trust-blue text-sm uppercase tracking-wide font-medium">{item.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* End Spacer */}
          <div className="w-[10vw]"></div>
        </div>

        {/* Progress Bar Container */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white/5">
            <div ref={progressBarRef} className="h-full bg-trust-blue w-0 transition-all duration-75 ease-linear shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
        </div>
      </div>

      {/* Mobile Wrapper (Vertical Layout) */}
      <div className="lg:hidden pb-20 px-6 pt-10">
        <div className="flex flex-col gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div key={item.id} className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-action-amber text-action-amber" />
                ))}
              </div>
              <p className="text-lg font-light italic mb-6 text-slate-100">"{item.quote}"</p>
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center font-bold text-lg text-white">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-base text-white">{item.author}</h5>
                  <span className="text-trust-blue text-xs uppercase">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;