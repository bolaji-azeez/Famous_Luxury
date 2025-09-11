'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;

          setIsVisible(window.scrollY > 300);
          setScrollProgress(progress);
          ticking.current = false;
        });
      }
    };

    onScroll(); // initialize on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            relative p-3 bg-gray-600 text-white rounded-full shadow-lg
            hover:bg-primary-600 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          "
          aria-label="Scroll to top"
          // Simple circular progress using conic-gradient
          style={{
            background: `conic-gradient(currentColor ${scrollProgress}%, rgba(255,255,255,0.15) 0)`,
            color: '#14b8a6' /* teal-ish ring; inherits for gradient only */
          }}
        >
          {/* inner disc to keep the icon on a solid background */}
          <span
            className="absolute inset-0 m-[2px] rounded-full bg-gray-600 grid place-items-center"
            aria-hidden
          />
          <FaArrowUp className="relative w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
