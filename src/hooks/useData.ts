import { useState, useEffect } from 'react';
import { DataLoadingState } from '@/types';

// Generic hook for data fetching with loading states
function useData<T>(fetchFn: () => Promise<T>, dependencies: any[] = []): [T | null, DataLoadingState] {
  const [data, setData] = useState<T | null>(null);
  const [loadingState, setLoadingState] = useState<DataLoadingState>({
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoadingState({ isLoading: true, error: null });
      
      try {
        const result = await fetchFn();
        
        if (isMounted) {
          setData(result);
          setLoadingState({ isLoading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
          setLoadingState({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return [data, loadingState];
}

export default useData;