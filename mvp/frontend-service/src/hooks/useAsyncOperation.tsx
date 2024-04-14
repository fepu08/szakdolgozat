import { useState } from 'react';

/**
 * A custom hook to handle the common logic of executing asynchronous operations such as API calls with loading state and error handling.
 *
 * @param operation A function that returns a promise (e.g., an async function).
 * @returns An object containing the execute function, loading state, and error state.
 */
export function useAsyncOperation<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (operation: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation();
      return result;
    } catch (error) {
      setError(error as Error);
      console.error('Operation failed', error);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}
