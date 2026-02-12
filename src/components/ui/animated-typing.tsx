'use client';

import { useState, useEffect, useMemo } from 'react';

type AnimatedTypingProps = {
  strings: string[];
  className?: string;
};

export default function AnimatedTyping({ strings, className }: AnimatedTypingProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  const memoizedStrings = useMemo(() => strings, [strings]);

  useEffect(() => {
    if (memoizedStrings.length === 0) return;

    if (subIndex === memoizedStrings[index].length + 1 && !reverse) {
      setTimeout(() => {
        setReverse(true);
      }, 1000); // Pause before deleting
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % memoizedStrings.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 75 : subIndex === memoizedStrings[index].length ? 1000 : 150
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, memoizedStrings]);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(blinkTimeout);
  }, [blink]);

  return (
    <span className={className}>
      {`${memoizedStrings[index]?.substring(0, subIndex) || ''}`}
      <span className={`transition-opacity duration-300 ${blink ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  );
}
