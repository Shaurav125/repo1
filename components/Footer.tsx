import React, { useEffect, useState, useRef } from 'react';
import { Users } from 'lucide-react';
import { getAndIncrementVisitorCount, getCurrentCount } from '../utils/visitorCounter';

const Footer: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<string>("Loading...");
  const hasCounted = useRef(false);

  useEffect(() => {
    // Prevent double counting in React Strict Mode
    if (!hasCounted.current) {
        const count = getAndIncrementVisitorCount();
        setVisitorCount(count);
        hasCounted.current = true;
    } else {
        // If already counted in this session lifecycle (e.g. fast remount), just get current
        setVisitorCount(getCurrentCount());
    }
  }, []);

  return (
    <footer className="bg-secondary text-blue-200 py-12 border-t border-blue-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h5 className="text-white font-serif font-bold text-xl mb-2">Dr. Mithilesh Kumar</h5>
            <p className="text-sm">Pain Management Specialist | Sir Ganga Ram Hospital</p>
          </div>

          <div className="text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
        </div>

        {/* Visitor Counter Section */}
        <div className="mt-10 pt-6 border-t border-blue-900 flex justify-center md:justify-end">
          <div className="inline-flex items-center gap-3 bg-blue-900/50 px-4 py-2 rounded-full border border-blue-800/50 backdrop-blur-sm">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 animate-blink"></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-300">
               <Users size={14} className="text-primary" />
               <span className="font-mono font-medium tracking-wide text-white">{visitorCount}</span>
               <span className="text-xs uppercase tracking-wider text-blue-400">People Visited</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;