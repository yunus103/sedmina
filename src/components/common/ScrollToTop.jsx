import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Scrolls to top on route change (forward navigation).
 * Browser back/forward uses native scroll restoration.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // PUSH: Normal navigation
    // REPLACE: Redirects
    // POP: Back/Forward button - let browser handle scroll restoration
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, navigationType]);

  return null;
}
