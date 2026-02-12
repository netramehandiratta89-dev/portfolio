'use client';

import { useState, useEffect } from 'react';

export function ScrollProgressBar() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight === clientHeight) {
        setScroll(0);
        return;
      }
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScroll(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-transparent">
      <div
        className="h-full bg-primary shadow-[0_0_10px_theme(colors.primary)]"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
}
