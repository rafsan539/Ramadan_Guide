
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Fix: Imported React to resolve 'Cannot find namespace React' error when using React.FC
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smoothly scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
