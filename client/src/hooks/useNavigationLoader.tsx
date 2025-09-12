
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '@/contexts/LoadingContext';

export const useNavigationLoader = () => {
  const location = useLocation();
  const { setIsLoading, setLoadingText } = useLoading();

  useEffect(() => {
    // Show loader when route changes
    setIsLoading(true);
    setLoadingText('Loading page...');

    // Hide loader after a short delay to allow page to render
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading, setLoadingText]);
};
