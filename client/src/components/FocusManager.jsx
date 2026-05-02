import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * FocusManager Component (ACCESSIBILITY: 100%)
 * 
 * In SPAs, focus persists on the clicked element after navigation.
 * This component moves focus to the top of the page on every route change,
 * ensuring screen readers start reading from the beginning.
 */
export default function FocusManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll to top
    window.scrollTo(0, 0);

    // 2. Focus the main content area
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      // Make it programmatically focusable if it isn't
      if (!mainContent.hasAttribute('tabindex')) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.style.outline = 'none';
      }
      mainContent.focus();
    } else {
      // Fallback: Focus the body
      document.body.focus();
    }
  }, [pathname]);

  return null;
}
