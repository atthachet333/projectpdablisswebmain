import { useState, useEffect } from 'react';

interface UseCounterOptions {
  end: number;
  duration?: number;
  start?: number;
}

export function useCounter({ end, duration = 2000, start = 0 }: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    const startTime = Date.now();
    const range = end - start;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + range * eased);
      
      setCount(current);
      
      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  };

  return { count, startAnimation, isAnimating };
}

export function useScrollTrigger(threshold = 0.1) {
  const [triggered, setTriggered] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref || triggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTriggered(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, triggered, threshold]);

  return { triggered, setRef };
}
