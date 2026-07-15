import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface UseEngagementTrackerProps {
  logEvent: (label: string) => void;
}

export const useEngagementTracker = ({ logEvent }: UseEngagementTrackerProps) => {
  const location = useLocation();
  const state = useRef({
    scrolled50: false,
    scrolled75: false,
    scrolled100: false,
    time60s: false,
    time120s: false,
  });

  // Reset tracking state on route change
  useEffect(() => {
    state.current = {
      scrolled50: false,
      scrolled75: false,
      scrolled100: false,
      time60s: false,
      time120s: false,
    };
  }, [location.pathname]);

  // Time-on-page tracker
  useEffect(() => {
    const timer60 = setTimeout(() => {
      if (!state.current.time60s) {
        logEvent('Spent 60 seconds on page');
        state.current.time60s = true;
      }
    }, 60000);

    const timer120 = setTimeout(() => {
      if (!state.current.time120s) {
        logEvent('Spent 120 seconds on page');
        state.current.time120s = true;
      }
    }, 120000);

    return () => {
      clearTimeout(timer60);
      clearTimeout(timer120);
    };
  }, [location.pathname, logEvent]);

  // Scroll depth tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercentage = (window.scrollY / scrollHeight) * 100;

      if (scrollPercentage >= 50 && !state.current.scrolled50) {
        logEvent('Scrolled 50% of page');
        state.current.scrolled50 = true;
      }
      if (scrollPercentage >= 75 && !state.current.scrolled75) {
        logEvent('Scrolled 75% of page');
        state.current.scrolled75 = true;
      }
      if (scrollPercentage >= 95 && !state.current.scrolled100) { // 95% is effectively 100% since sometimes bounding box isn't perfect
        logEvent('Scrolled to bottom of page');
        state.current.scrolled100 = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, logEvent]);
};
