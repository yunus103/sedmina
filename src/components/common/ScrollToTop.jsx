import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on route change (forward navigation).
 * Browser back/forward uses native scroll restoration.
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Only scroll to top on push/replace navigation, not on pop (back/forward)
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }

        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
}
