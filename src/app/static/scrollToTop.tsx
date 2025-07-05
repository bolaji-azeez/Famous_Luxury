
'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
  const handleScroll = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    setScrollProgress((window.scrollY / totalHeight) * 100);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);



  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            p-3 bg-primary-500 text-white rounded-full shadow-lg
            hover:bg-primary-600 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          `}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;