import { RefObject, useEffect } from 'react';

export function useEscapeKeyPress(
  ref: RefObject<HTMLElement>,
  callback: () => void,
) {
  useEffect(() => {
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.key === 'Escape' &&
        ref.current &&
        ref.current.contains(target)
      ) {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => document.removeEventListener('keydown', handleEscapeKeyPress);
  }, [callback, ref]);
}
