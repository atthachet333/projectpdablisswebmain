import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — instantly scrolls to top on every route change.
 * Respects reduced-motion preference (behavior: 'auto' is already instant).
 * Does not render any UI.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use 'auto' (instant) rather than 'smooth' so the page doesn't
    // visually scroll while the new page is fading in.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
